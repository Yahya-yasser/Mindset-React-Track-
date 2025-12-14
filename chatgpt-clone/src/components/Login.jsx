import React, { useState } from 'react'

export default function Login({ onBack, onContinue, onGoogle, onMicrosoft }) {
  const [email, setEmail] = useState('')
  const [notRobot, setNotRobot] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!email) return alert('Please enter your email')
    if (!notRobot) return alert('Please confirm you are not a robot (mock)')
    onContinue && onContinue(email)
  }

  function handleSignup() {
    window.open('https://platform.openai.com/signup', '_blank')
  }

  return (
    <div className="login-screen">
      <button className="back-link" onClick={onBack}>← Back</button>
      <div className="login-container">
        <div className="login-logo" aria-hidden>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.2819 9.8211C22.9532 10.4924 22.9532 11.5811 22.2819 12.2524L13.7476 20.7867C13.0763 21.458 11.9876 21.458 11.3163 20.7867L2.78198 12.2524C2.11068 11.5811 2.11068 10.4924 2.78198 9.8211L11.3163 1.28677C11.9876 0.615472 13.0763 0.615472 13.7476 1.28677L22.2819 9.8211Z" fill="#202123" fillOpacity="0.95" />
            <path d="M12.0322 1.91016L20.3677 10.2457C20.7582 10.6362 20.7582 11.2694 20.3677 11.6599L12.0322 19.9954L3.69667 11.6599C3.30614 11.2694 3.30614 10.6362 3.69667 10.2457L12.0322 1.91016Z" stroke="#202123" strokeWidth="0.5" strokeOpacity="0.9" />
          </svg>
        </div>
        <h2>Welcome back</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="label">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <div className="captcha-placeholder">
            <label>
              <input
                type="checkbox"
                checked={notRobot}
                onChange={(e) => setNotRobot(e.target.checked)}
              />
              I'm not a robot
            </label>
          </div>

          <button className="continue" type="submit">Continue</button>
        </form>

        <div className="signup-link">
          Don't have an account? <a href="#" onClick={handleSignup}>Sign up</a>
        </div>

        <div className="divider">OR</div>

        <div className="socials">
          <button className="social google" onClick={onGoogle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>
          <button className="social ms" onClick={onMicrosoft}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.4 11.4H2V2h9.4v9.4zM22 11.4h-9.4V2H22v9.4zM11.4 22H2v-9.4h9.4V22zM22 22h-9.4v-9.4H22V22z" fill="#F25022" />
              <path d="M22 11.4h-9.4V2H22v9.4z" fill="#7FBA00" />
              <path d="M11.4 22H2v-9.4h9.4V22z" fill="#00A4EF" />
              <path d="M22 22h-9.4v-9.4H22V22z" fill="#FFB900" />
            </svg>
            Continue with Microsoft Account
          </button>
        </div>
      </div>
    </div>
  )
}

