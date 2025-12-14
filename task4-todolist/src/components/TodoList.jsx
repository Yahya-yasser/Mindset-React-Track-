import React from 'react'

export default function TodoList({ tasks, onToggle, onDelete }) {
  return (
    <ul className="todo-list">
      {tasks.map(task => (
        <li key={task.id} className={`todo-item ${task.done ? 'done' : ''}`}>
          <button className={`check ${task.done ? 'checked' : ''}`} onClick={() => onToggle(task.id)} aria-label="Toggle done">
            {task.done ? '✔' : ''}
          </button>
          <div className="text">{task.text}</div>
          <button className="del" onClick={() => onDelete(task.id)} aria-label="Delete">🗑️</button>
        </li>
      ))}
      {tasks.length === 0 && <li className="empty">No tasks yet — add one above.</li>}
    </ul>
  )
}
