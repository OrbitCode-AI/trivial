import { useState } from 'react';
import './TodoList.css';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const activeTodos = todos.filter(t => !t.completed).length;

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
          onInput={(e) => setInput(e.target.value)}
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
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                {todo.text}
              </span>
            </label>
            <button className="todo-delete-btn" onClick={() => deleteTodo(todo.id)}>
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
