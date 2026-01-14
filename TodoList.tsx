import { useState } from 'react';
import './TodoList.css';

// Platform hook type (injected on window by platform)
declare global {
  interface Window {
    useCollection<T>(store: string): [
      Array<T & { id: string }>,
      { add: (item: T) => Promise<string>; update: (id: string, item: T) => Promise<void>; remove: (id: string) => Promise<void> },
      boolean
    ];
  }
}

interface Todo {
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, { add, update, remove }, loading] = window.useCollection<Todo>('todos');
  const [input, setInput] = useState('');

  const addTodo = async () => {
    if (!input.trim()) return;
    await add({ text: input, completed: false });
    setInput('');
  };

  const toggleTodo = (todo: Todo & { id: string }) => {
    update(todo.id, { text: todo.text, completed: !todo.completed });
  };

  const activeTodos = todos.filter(t => !t.completed).length;

  if (loading) {
    return <div className="todo-container"><p>Loading...</p></div>;
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
          onInput={(e) => setInput((e.target as HTMLInputElement).value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <button className="todo-add-btn" onClick={addTodo}>
          Add
        </button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <label className="todo-label">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo)}
                className="todo-checkbox"
              />
              <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                {todo.text}
              </span>
            </label>
            <button className="todo-delete-btn" onClick={() => remove(todo.id)}>
              ×
            </button>
          </li>
        ))}
        {todos.length === 0 && (
          <li className="todo-empty">
            No todos yet. Add one above to get started!
          </li>
        )}
      </ul>
    </div>
  );
}
