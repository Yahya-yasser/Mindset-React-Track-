import { useState } from 'react'
import './App.css'

function App() {
  // Game state
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [scores, setScores] = useState({ x: 0, o: 0, draw: 0 })
  
  // Calculate winner
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ]
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }
  
  // Check if board is full (draw)
  const isBoardFull = (squares) => {
    return squares.every(square => square !== null)
  }
  
  const winner = calculateWinner(board)
  const isDraw = !winner && isBoardFull(board)
  const gameOver = winner || isDraw
  
  // Handle cell click
  const handleClick = (index) => {
    if (board[index] || gameOver) return
    
    const newBoard = [...board]
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)
    
    // Check if this move resulted in a win or draw
    const newWinner = calculateWinner(newBoard)
    const newIsDraw = !newWinner && isBoardFull(newBoard)
    
    if (newWinner) {
      setScores(prev => ({
        ...prev,
        [newWinner.toLowerCase()]: prev[newWinner.toLowerCase()] + 1
      }))
    } else if (newIsDraw) {
      setScores(prev => ({ ...prev, draw: prev.draw + 1 }))
    }
    
    setIsXNext(!isXNext)
  }
  
  // Start new game
  const handleNewGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
  }
  
  // Reset scores
  const handleResetScore = () => {
    setScores({ x: 0, o: 0, draw: 0 })
  }
  
  // Get game over message
  const getGameOverMessage = () => {
    if (winner) return `Game over. ${winner}`
    if (isDraw) return 'Game over. Draw'
    return ''
  }

  return (
    <div className="app-container">
      <div className="branding">
        <span className="branding-line">tic.</span>
        <span className="branding-line">tac.</span>
        <span className="branding-line">toe.</span>
      </div>
      
      <div className="game-container">
        {gameOver && (
          <div className="game-over-banner">
            {getGameOverMessage()}
          </div>
        )}
        
        <div className="score-container">
          <div className="score-box player-x">
            <div className="score-label">Player X</div>
            <div className="score-value">{scores.x}</div>
          </div>
          <div className="score-box draw">
            <div className="score-label">Draw</div>
            <div className="score-value">{scores.draw}</div>
          </div>
          <div className="score-box player-o">
            <div className="score-label">Player O</div>
            <div className="score-value">{scores.o}</div>
          </div>
        </div>
        
        <div className="board">
          {board.map((cell, index) => (
            <button
              key={index}
              className={`cell ${cell ? cell.toLowerCase() : ''}`}
              onClick={() => handleClick(index)}
              disabled={gameOver}
            >
              {cell}
            </button>
          ))}
        </div>
        
        {!gameOver && (
          <div className={`turn-indicator ${isXNext ? 'x-turn' : 'o-turn'}`}>
            {isXNext ? 'X' : 'O'} turn
          </div>
        )}
        
        <div className="button-container">
          <button className="btn btn-new-game" onClick={handleNewGame}>
            New Game
          </button>
          <button className="btn btn-reset" onClick={handleResetScore}>
            Reset Score
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
