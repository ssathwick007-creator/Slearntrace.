const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const cors = require('cors')({ origin: true });
const OpenAI = require('openai');

setGlobalOptions({ maxInstances: 10 });

const openaiApiKey = defineSecret("OPENAI_API_KEY");
const judge0ApiKey = defineSecret("JUDGE0_API_KEY");

exports.askAI = onRequest({ cors: false, secrets: [openaiApiKey] }, (req, res) => {
    cors(req, res, async () => {
        if (req.method !== "POST") {
            res.status(405).json({ error: "Method Not Allowed" });
            return;
        }

        try {
            const { message } = req.body;
            if (!message) {
                res.status(400).json({ error: "Message is required" });
                return;
            }

            const openai = new OpenAI({
                apiKey: openaiApiKey.value(),
            });

            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful Study Assistant. Respond in plain natural text only. Do NOT use Markdown, hashtags, bullets, numbering, or bold syntax. Respond in normal conversational paragraphs, exactly like a human tutor in a chat window."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ],
            });

            let reply = response.choices[0]?.message?.content || "";

            if (reply) {
                // Server-side strict Markdown sanitization
                reply = reply
                    .replace(/(\*\*|\*|__|`)/g, '')        // Remove bold, italic, inline code
                    .replace(/^#+\s*/gm, '')               // Remove headings
                    .replace(/^[-*]\s+/gm, '')             // Remove bullets
                    .replace(/^\d+\.\s+/gm, '')            // Remove numbered lists
                    .replace(/\n{3,}/g, '\n\n')            // Clean up lines
                    .trim();
            } else {
                reply = "Sorry, I received an empty response.";
            }

            res.status(200).json({ reply });

        } catch (err) {
            logger.error('[Backend] askAI Error:', err.message);
            res.status(500).json({ error: 'Backend AI Error' });
        }
    });
});

exports.executeCode = onRequest({ cors: false, secrets: [judge0ApiKey] }, (req, res) => {
    cors(req, res, async () => {
        if (req.method !== "POST") {
            res.status(405).json({ error: "Method Not Allowed" });
            return;
        }

        try {
            const { language, sourceCode, stdin } = req.body;
            if (!language || !sourceCode) {
                res.status(400).json({ error: "Missing language or sourceCode in payload." });
                return;
            }

            // Standard Judge0 CE Language IDs
            const langMap = {
                'c': 50,
                'cpp': 54,
                'java': 62,
                'python': 71,
                'javascript': 93
            };

            const language_id = langMap[language];
            if (!language_id) {
                res.status(400).json({ error: `Unsupported language flag: ${language}` });
                return;
            }

            const payload = {
                language_id,
                source_code: sourceCode,
                stdin: stdin || ""
            };

            const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";
            const JUDGE0_HOST = "judge0-ce.p.rapidapi.com";

            const jResponse = await fetch(JUDGE0_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-rapidapi-host": JUDGE0_HOST,
                    "x-rapidapi-key": judge0ApiKey.value()
                },
                body: JSON.stringify(payload)
            });

            if (!jResponse.ok) {
                logger.error('[Backend] Judge0 fetch failed:', jResponse.status, jResponse.statusText);
                return res.status(502).json({ error: "Execution engine currently unavailable." });
            }

            const result = await jResponse.json();

            res.status(200).json({
                status: result.status?.description || "Unknown Status",
                stdout: result.stdout,
                stderr: result.stderr,
                compile_output: result.compile_output,
                time: result.time,
                memory: result.memory
            });

        } catch (err) {
            logger.error('[Backend] executeCode Error:', err.message);
            res.status(500).json({ error: 'Internal secure execution failure.' });
        }
    });
});
