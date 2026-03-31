import { useMap, useVar } from 'orbitcode'
import { useState, useRef } from 'preact/hooks'
import './TodoList.css'

interface Todo {
  text: string
  completed: boolean
}

type Filter = 'all' | 'active' | 'completed'

export default function TodoList() {
  const [todosMap, actions, loading] = useMap<Todo>('todos')
  const [input, setInput] = useVar('todoInput', '')
  const [filter, setFilter] = useVar<Filter>('todoFilter', 'all')
  const [skin] = useVar('skin', 'modern')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const activeEditRef = useRef<string | null>(null)

  const entries = Object.entries(todosMap)
  const todos = entries.map(([id, todo]) => ({ id, ...todo }))

  const addTodo = async () => {
    if (!input.trim()) return
    await actions.set(Date.now().toString(), { text: input, completed: false })
    setInput('')
  }

  const toggleAll = () => {
    const allCompleted = todos.length > 0 && todos.every(t => t.completed)
    for (const todo of todos) {
      actions.set(todo.id, { text: todo.text, completed: !allCompleted })
    }
  }

  const startEditing = (id: string) => {
    const todo = todosMap[id]
    if (!todo) return
    activeEditRef.current = id
    setEditingId(id)
    setEditText(todo.text)
  }

  const submitEdit = (id: string) => {
    if (activeEditRef.current !== id) return

    const todo = todosMap[id]
    const nextText = editText.trim()

    activeEditRef.current = null
    setEditingId(null)
    setEditText('')

    if (!todo) return
    if (!nextText) {
      actions.remove(id)
      return
    }
    if (nextText !== todo.text) {
      actions.set(id, { text: nextText, completed: todo.completed })
    }
  }

  const cancelEdit = () => {
    activeEditRef.current = null
    setEditingId(null)
    setEditText('')
  }

  const clearCompleted = () => {
    for (const todo of todos) {
      if (todo.completed) {
        actions.remove(todo.id)
      }
    }
  }

  const activeTodos = todos.filter(t => !t.completed).length
  const completedCount = todos.length - activeTodos
  const allCompleted = todos.length > 0 && activeTodos === 0

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  if (loading) {
    return (
      <div className="todo-container">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="todo-container">
      <h2 className="todo-header">Todo List</h2>
      <p className="todo-stats">
        {activeTodos} active · {todos.length} total
      </p>

      <div className="todo-input-group">
        <input
          type="text"
          value={input}
          onInput={e => setInput((e.target as HTMLInputElement).value)}
          onKeyPress={e => e.key === 'Enter' && addTodo()}
          placeholder={skin === 'todomvc' ? 'What needs to be done?' : 'Add a new todo...'}
          className="todo-input"
        />
        <button type="button" className="todo-add-btn" onClick={addTodo}>
          Add
        </button>
      </div>

      {todos.length > 0 && (
        <>
          <div className="toggle-all-container">
            <input
              id="toggle-all"
              className="toggle-all"
              type="checkbox"
              checked={allCompleted}
              onChange={toggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </div>

          <ul className="todo-list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={`todo-item ${todo.completed ? 'completed' : ''} ${
                  editingId === todo.id ? 'editing' : ''
                }`}>
                <div className="view">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => actions.set(todo.id, { text: todo.text, completed: !todo.completed })}
                    className="todo-checkbox"
                  />
                  <label className="todo-label" onDblClick={() => startEditing(todo.id)}>
                    <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                      {todo.text}
                    </span>
                  </label>
                  <button
                    type="button"
                    className="todo-delete-btn"
                    onClick={() => actions.remove(todo.id)}
                    aria-label="Delete todo">
                    ×
                  </button>
                </div>
                {editingId === todo.id && (
                  <input
                    className="edit"
                    value={editText}
                    onInput={e => setEditText((e.target as HTMLInputElement).value)}
                    onBlur={() => submitEdit(todo.id)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        submitEdit(todo.id)
                      } else if (e.key === 'Escape') {
                        e.preventDefault()
                        cancelEdit()
                      }
                    }}
                  />
                )}
              </li>
            ))}
          </ul>

          <footer className="footer">
            <span className="todo-count">
              <strong>{activeTodos}</strong> {activeTodos === 1 ? 'item' : 'items'} left
            </span>

            <ul className="filters">
              <li>
                <a
                  href="#/"
                  className={filter === 'all' ? 'selected' : ''}
                  onClick={e => {
                    e.preventDefault()
                    setFilter('all')
                  }}>
                  All
                </a>
              </li>
              <li>
                <a
                  href="#/active"
                  className={filter === 'active' ? 'selected' : ''}
                  onClick={e => {
                    e.preventDefault()
                    setFilter('active')
                  }}>
                  Active
                </a>
              </li>
              <li>
                <a
                  href="#/completed"
                  className={filter === 'completed' ? 'selected' : ''}
                  onClick={e => {
                    e.preventDefault()
                    setFilter('completed')
                  }}>
                  Completed
                </a>
              </li>
            </ul>

            {completedCount > 0 && (
              <button type="button" className="clear-completed" onClick={clearCompleted}>
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}

      {todos.length === 0 && (
        <ul className="todo-list">
          <li className="todo-empty">No todos yet. Add one above to get started!</li>
        </ul>
      )}
    </div>
  )
}
