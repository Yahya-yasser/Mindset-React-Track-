import React from 'react'

export default function Welcome({ onLogin, onSignup }) {
  return (
    <div className="welcome-screen">
      <div className="welcome-card">
        <div className="welcome-logo" aria-hidden>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.2819 9.8211C22.9532 10.4924 22.9532 11.5811 22.2819 12.2524L13.7476 20.7867C13.0763 21.458 11.9876 21.458 11.3163 20.7867L2.78198 12.2524C2.11068 11.5811 2.11068 10.4924 2.78198 9.8211L11.3163 1.28677C11.9876 0.615472 13.0763 0.615472 13.7476 1.28677L22.2819 9.8211Z" fill="white" fillOpacity="0.95"/>
            <path d="M12.0322 1.91016L20.3677 10.2457C20.7582 10.6362 20.7582 11.2694 20.3677 11.6599L12.0322 19.9954L3.69667 11.6599C3.30614 11.2694 3.30614 10.6362 3.69667 10.2457L12.0322 1.91016Z" stroke="white" strokeWidth="0.5" strokeOpacity="0.9"/>
          </svg>
        </div>
        <h1>Welcome to ChatGPT</h1>
        <p className="lead">Log in with your OpenAI account to continue</p>
        <div className="welcome-actions">
          <button className="primary" onClick={onLogin}>Log in</button>
          <button className="secondary" onClick={onSignup}>Sign up</button>
        </div>
      </div>
    </div>
  )
}

