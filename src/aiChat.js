/**
 * src/aiChat.js
 * AI Chatbot Integration
 */

let isRequestPending = false;

export async function sendMessageToAI(userMessage, context = {}) {
    if (isRequestPending) {
        return "Please wait for the current response to finish.";
    }

    if (!userMessage || typeof userMessage !== 'string') {
        return "I didn't quite catch that. Could you rephrase?";
    }

    isRequestPending = true;

    try {
        const response = await fetch('/api/ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        });

        if (!response.ok) {
            throw new Error(`Backend Error ${response.status}`);
        }

        const data = await response.json();
        return data.reply || "I received an empty response.";

    } catch (e) {
        console.error('[aiChat] Fetch Error:', e.message);
        return "Sorry, there was an error communicating with the AI API.";
    } finally {
        isRequestPending = false;
    }
}
