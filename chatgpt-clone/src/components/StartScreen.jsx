import React from 'react'

export default function StartScreen({ onSendMessage }) {
    const examples = [
        "Explain quantum computing in simple terms →",
        "Got any creative ideas for a 10 year old's birthday? →",
        "How do I make an HTTP request in Javascript? →"
    ]

    const capabilities = [
        "Remembers what user said earlier in the conversation",
        "Allows user to provide follow-up corrections",
        "Trained to decline inappropriate requests"
    ]

    const limitations = [
        "May occasionally generate incorrect information",
        "May occasionally produce harmful instructions or biased content",
        "Limited knowledge of world and events after 2021"
    ]

    function handleExampleClick(example) {
        const text = example.replace(' →', '')
        onSendMessage && onSendMessage(text)
    }

    return (
        <div className="start-screen">
            <div className="start-content">
                <h1 className="start-title">ChatGPT</h1>

                <div className="start-columns">
                    <div className="start-column">
                        <div className="column-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 1v6M12 17v6M23 12h-6M7 12H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h3 className="column-title">Examples</h3>
                        <div className="column-items">
                            {examples.map((example, i) => (
                                <button
                                    key={i}
                                    className="example-card"
                                    onClick={() => handleExampleClick(example)}
                                >
                                    {example}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="start-column">
                        <div className="column-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="column-title">Capabilities</h3>
                        <div className="column-items">
                            {capabilities.map((capability, i) => (
                                <div key={i} className="info-card">
                                    {capability}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="start-column">
                        <div className="column-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h3 className="column-title">Limitations</h3>
                        <div className="column-items">
                            {limitations.map((limitation, i) => (
                                <div key={i} className="info-card">
                                    {limitation}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
