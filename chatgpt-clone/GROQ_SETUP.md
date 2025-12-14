# ChatGPT Clone - Groq API Setup

## 🚀 Quick Start

Your ChatGPT clone is now integrated with **Groq API** for real AI responses! Follow these steps to get started:

### Step 1: Get Your Free Groq API Key

1. Visit [console.groq.com](https://console.groq.com)
2. Sign up for a free account (no credit card required)
3. Navigate to **API Keys** in the dashboard
4. Click **Create API Key**
5. Copy your API key

### Step 2: Configure the API Key

1. In your project root directory (`d:/React.js Training/chatgpt-clone/chatgpt-clone`), create a file named `.env`
2. Add the following line to the `.env` file:
   ```
   VITE_GROQ_API_KEY=your_actual_api_key_here
   ```
3. Replace `your_actual_api_key_here` with the API key you copied from Groq

### Step 3: Restart the Development Server

1. Stop the current dev server (Ctrl+C in the terminal)
2. Start it again:
   ```bash
   npm run dev
   ```

### Step 4: Start Chatting!

Open your browser to `http://localhost:5174` and start chatting with real AI!

## ✨ Features

- **Real AI Responses**: Powered by Llama 3.1 70B model via Groq
- **Fast Inference**: Groq's LPU technology provides ultra-fast responses
- **Automatic Titles**: Conversation titles are generated automatically
- **Loading States**: See typing animation while waiting for responses
- **Error Handling**: Friendly error messages for common issues
- **Free Tier**: 14,400 requests per day on the free tier

## 🔧 Troubleshooting

### "API key not configured" Error
- Make sure you created the `.env` file in the project root
- Check that the file contains `VITE_GROQ_API_KEY=your_key`
- Restart the dev server after creating/modifying `.env`

### "Invalid API key" Error
- Verify your API key is correct
- Make sure there are no extra spaces or quotes around the key
- Try generating a new API key from the Groq console

### "Rate limit exceeded" Error
- Free tier limit: 14,400 requests/day
- Wait a moment and try again
- Consider upgrading to a paid plan if needed

### "Network error" Error
- Check your internet connection
- Verify Groq's API is accessible (check status.groq.com)

## 📝 Technical Details

- **Model**: `llama-3.1-70b-versatile`
- **API Endpoint**: `https://api.groq.com/openai/v1/chat/completions`
- **Temperature**: 0.7
- **Max Tokens**: 1024
- **Context**: Full conversation history is sent for context

## 🔒 Security Note

The `.env` file is already added to `.gitignore` to prevent accidentally committing your API key to version control.

## 📚 Resources

- [Groq Documentation](https://console.groq.com/docs)
- [Groq API Reference](https://console.groq.com/docs/api-reference)
- [Supported Models](https://console.groq.com/docs/models)

---

Enjoy your ChatGPT clone with real AI! 🎉
