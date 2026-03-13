// Vite configuration for LearnTrace
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const aiProxy = () => ({
  name: 'ai-proxy',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url === '/api/assistant' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const { message } = JSON.parse(body);
            const env = loadEnv(server.config.mode, process.cwd(), '');
            const apiKey = env.VITE_AI_API_KEY || process.env.VITE_AI_API_KEY;

            if (!apiKey) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Missing VITE_AI_API_KEY in .env' }));
              return;
            }

            const geminiRes = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  systemInstruction: {
                    parts: [{ text: 'You are a helpful Study Assistant. Respond in plain natural text only. Do NOT use Markdown, hashtags, bullets, numbering, or bold syntax. Respond in normal conversational paragraphs.' }]
                  },
                  contents: [{ role: 'user', parts: [{ text: message }] }]
                })
              }
            );

            if (!geminiRes.ok) throw new Error(`Gemini ${geminiRes.status}`);
            const data = await geminiRes.json();
            let reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

            if (reply) {
              reply = reply
                .replace(/(\*\*|\*|__|`)/g, '')
                .replace(/^#+\s*/gm, '')
                .replace(/^[-*]\s+/gm, '')
                .replace(/^\d+\.\s+/gm, '')
                .replace(/\n{3,}/g, '\n\n')
                .trim();
            } else {
              reply = 'Sorry, I received an empty response.';
            }

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ reply }));
          } catch (err) {
            console.error('[AI Proxy]', err.message);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'AI proxy error' }));
          }
        });
        return;
      }
      next();
    });
  }
});

export default defineConfig({
  server: {
    port: 5173,
    open: false,
    proxy: {
      '/api/reflection': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/api/run': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  plugins: [react(), aiProxy()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
});

