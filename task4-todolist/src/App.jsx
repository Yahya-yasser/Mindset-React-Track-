import React, { useState, useEffect } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem('todo:tasks')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('todo:tasks', JSON.stringify(tasks))
    } catch (e) {}
  }, [tasks])

  const addTask = (text) => {
    if (!text || !text.trim()) return
    const newTask = { id: Date.now().toString() + Math.random().toString(36).slice(2), text: text.trim(), done: false }
    setTasks(prev => [newTask, ...prev])
  }

  const toggleTask = (id) => {
    setTasks(prev => {
      const idx = prev.findIndex(t => t.id === id)
      if (idx === -1) return prev
      const task = prev[idx]
      const toggled = { ...task, done: !task.done }
      const others = prev.filter(t => t.id !== id)
      if (toggled.done) {
        // when marked done, place at the end
        return [...others, toggled]
      } else {
        // when marked undone, place at the front
        return [toggled, ...others]
      }
    })
  }
  const deleteTask = (id) => setTasks(prev => prev.filter(t => t.id !== id))

  const doneCount = tasks.filter(t => t.done).length

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <img src="/src/assets/logo.svg" alt="todo logo" className="logo-img" />
        </div>
      </header>
      <main className="container">
        <TodoInput onAdd={addTask} />

        <div className="meta">
          <div className="meta-left"><span className="label">Tasks</span> <span className="badge">{tasks.length}</span></div>
          <div className="meta-right"><span className="label done">Done</span> <span className="badge">{doneCount} of {tasks.length}</span></div>
        </div>

        <TodoList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      </main>
    </div>
  )
}
