import React, { useRef, useEffect } from 'react'

export default function ChatWindow({ conversation, isLoading }) {
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation])

  if (!conversation) {
    return (
      <main className="chat-window empty">
        <div className="empty-state">Select a chat or start a new conversation.</div>
      </main>
    )
  }

  return (
    <main className="chat-window">
      <header className="chat-header">
        <h3>{conversation.title}</h3>
      </header>
      <div className="messages">
        {conversation.messages.map((m, i) => (
          <div key={i} className={`message ${m.role} ${m.isError ? 'error' : ''}`}>
            <div className="msg-text">{m.text}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot loading">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
    </main>
  )
}
