import React, { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import MessageInput from './components/MessageInput'
import Welcome from './components/Welcome'
import Login from './components/Login'
import StartScreen from './components/StartScreen'
import { sendChatMessage, generateConversationTitle } from './services/groqService'

const STORAGE_KEY = 'cgpt_clone_conversations_v1'

function makeId() {
  return Math.random().toString(36).slice(2, 9)
}

const defaultConversations = [
  {
    id: 'c1',
    title: 'New chat',
    messages: [],
  },
]

function App() {
  const [conversations, setConversations] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : defaultConversations
    } catch (e) {
      return defaultConversations
    }
  })
  const [selectedId, setSelectedId] = useState(conversations[0]?.id ?? null)
  const [authenticated, setAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('cgpt_clone_auth') === '1'
    } catch (e) {
      return false
    }
  })
  const [view, setView] = useState('welcome')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations))
  }, [conversations])

  useEffect(() => {
    try { localStorage.setItem('cgpt_clone_auth', authenticated ? '1' : '0') } catch (e) { }
  }, [authenticated])

  function handleSelect(id) {
    setSelectedId(id)
  }

  function handleNew() {
    const id = makeId()
    const title = 'New chat'
    const newConv = { id, title, messages: [] }
    setConversations((s) => [newConv, ...s])
    setSelectedId(id)
  }

  function handleGotoLogin() {
    setView('login')
  }

  function handleSignup() {
    window.open('https://platform.openai.com/signup', '_blank')
  }

  function handleLoginComplete(email) {
    // mock complete login
    setAuthenticated(true)
    if (!selectedId && conversations[0]) setSelectedId(conversations[0].id)
    setView('chat')
  }

  function handleBackToWelcome() {
    setView('welcome')
  }

  async function handleSend(text) {
    if (!selectedId || isLoading) return

    // Add user message immediately
    const userMsg = { role: 'user', text }
    setConversations((prev) => {
      return prev.map((c) => {
        if (c.id !== selectedId) return c
        return { ...c, messages: [...c.messages, userMsg] }
      })
    })

    // Set loading state
    setIsLoading(true)

    try {
      // Get current conversation messages for context
      const currentConv = conversations.find(c => c.id === selectedId)
      const conversationHistory = currentConv ? [...currentConv.messages, userMsg] : [userMsg]

      // Call Groq API
      const botResponse = await sendChatMessage(conversationHistory)

      // Add bot response
      const botMsg = { role: 'bot', text: botResponse }
      setConversations((prev) => {
        return prev.map((c) => {
          if (c.id !== selectedId) return c
          const updatedMessages = [...c.messages, botMsg]

          // Generate title if this is the first message
          if (c.title === 'New chat' && updatedMessages.length === 2) {
            generateConversationTitle(text).then(title => {
              setConversations((prev2) => {
                return prev2.map((c2) => {
                  if (c2.id !== selectedId) return c2
                  return { ...c2, title }
                })
              })
            }).catch(() => {
              // If title generation fails, use truncated first message
              setConversations((prev2) => {
                return prev2.map((c2) => {
                  if (c2.id !== selectedId) return c2
                  return { ...c2, title: text.slice(0, 30) + (text.length > 30 ? '...' : '') }
                })
              })
            })
          }

          return { ...c, messages: updatedMessages }
        })
      })
    } catch (error) {
      // Handle errors
      let errorMessage = 'Sorry, I encountered an error. Please try again.'

      if (error.message === 'GROQ_API_KEY_MISSING') {
        errorMessage = '⚠️ API key not configured. Please add your Groq API key to the .env file and restart the server.'
      } else if (error.message === 'INVALID_API_KEY') {
        errorMessage = '⚠️ Invalid API key. Please check your Groq API key in the .env file.'
      } else if (error.message === 'RATE_LIMIT_EXCEEDED') {
        errorMessage = '⚠️ Rate limit exceeded. Please wait a moment and try again.'
      } else if (error.message === 'NETWORK_ERROR') {
        errorMessage = '⚠️ Network error. Please check your internet connection.'
      }

      const errorMsg = { role: 'bot', text: errorMessage, isError: true }
      setConversations((prev) => {
        return prev.map((c) => {
          if (c.id !== selectedId) return c
          return { ...c, messages: [...c.messages, errorMsg] }
        })
      })
    } finally {
      setIsLoading(false)
    }
  }

  const current = conversations.find((c) => c.id === selectedId) || null

  if (!authenticated) {
    if (view === 'login') {
      return (
        <Login
          onBack={handleBackToWelcome}
          onContinue={handleLoginComplete}
          onGoogle={() => window.open('https://accounts.google.com/', '_blank')}
          onMicrosoft={() => window.open('https://login.microsoftonline.com/', '_blank')}
        />
      )
    }

    return <Welcome onLogin={handleGotoLogin} onSignup={handleSignup} />
  }

  // Show StartScreen if no messages in current conversation
  const showStartScreen = current && current.messages.length === 0

  return (
    <div className="app">
      <Sidebar
        conversations={conversations}
        selectedId={selectedId}
        onSelect={handleSelect}
        onNew={handleNew}
      />
      <div className="main-area">
        {showStartScreen ? (
          <StartScreen onSendMessage={handleSend} />
        ) : (
          <>
            <ChatWindow conversation={current} isLoading={isLoading} />
            <MessageInput onSend={handleSend} />
          </>
        )}
      </div>
    </div>
  )
}

export default App
