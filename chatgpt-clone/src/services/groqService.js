const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY

/**
 * Send a chat message to Groq API and get AI response
 * @param {Array} messages - Array of message objects with role and text
 * @returns {Promise<string>} - AI response text
 */
export async function sendChatMessage(messages) {
    // Check if API key is configured
    if (!GROQ_API_KEY || GROQ_API_KEY === 'your_groq_api_key_here') {
        throw new Error('GROQ_API_KEY_MISSING')
    }

    try {
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.1-70b-versatile',
                messages: messages.map(msg => ({
                    role: msg.role === 'bot' ? 'assistant' : msg.role,
                    content: msg.text
                })),
                temperature: 0.7,
                max_tokens: 1024,
                top_p: 1,
                stream: false
            })
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))

            if (response.status === 401) {
                throw new Error('INVALID_API_KEY')
            } else if (response.status === 429) {
                throw new Error('RATE_LIMIT_EXCEEDED')
            } else {
                throw new Error(`API_ERROR: ${errorData.error?.message || response.statusText}`)
            }
        }

        const data = await response.json()

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('INVALID_RESPONSE')
        }

        return data.choices[0].message.content
    } catch (error) {
        // Re-throw custom errors
        if (error.message.startsWith('GROQ_') || error.message.startsWith('INVALID_') || error.message.startsWith('RATE_') || error.message.startsWith('API_')) {
            throw error
        }

        // Network or other errors
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('NETWORK_ERROR')
        }

        throw new Error(`UNKNOWN_ERROR: ${error.message}`)
    }
}

/**
 * Generate a short title for a conversation based on the first message
 * @param {string} firstMessage - The first user message
 * @returns {Promise<string>} - Generated title
 */
export async function generateConversationTitle(firstMessage) {
    try {
        const response = await sendChatMessage([
            {
                role: 'system',
                text: 'Generate a short 3-5 word title for a conversation that starts with the following message. Only respond with the title, nothing else.'
            },
            {
                role: 'user',
                text: firstMessage
            }
        ])

        return response.trim().replace(/^["']|["']$/g, '') // Remove quotes if present
    } catch (error) {
        // If title generation fails, create a simple title from the message
        return firstMessage.slice(0, 30) + (firstMessage.length > 30 ? '...' : '')
    }
}
