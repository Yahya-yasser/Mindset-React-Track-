import React, { useState } from 'react'

export default function TodoInput({ onAdd }) {
  const [value, setValue] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onAdd(value)
    setValue('')
  }

  return (
    <form className="todo-input" onSubmit={submit}>
      <input
        aria-label="Add task"
        placeholder={`Write your note and press “Enter” ...`}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button type="submit" className="add-btn">Add</button>
    </form>
  )
}
