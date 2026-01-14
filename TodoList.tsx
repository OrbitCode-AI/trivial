import { useState, useEffect } from 'react';
import './TodoList.css';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// Declare the global db API (injected by platform)
declare const db: {
  get(store: string, key: string): Promise<any>;
  put(store: string, key: string, value: any): Promise<void>;
  getAll(store: string): Promise<Array<{ key: string; value: any }>>;
  delete(store: string, key: string): Promise<void>;
};

const STORE = 'todos';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [ready, setReady] = useState(false);

  // Wait for db to be ready, then load todos
  useEffect(() => {
    const loadTodos = async () => {
      const entries = await db.getAll(STORE);
      setTodos(entries.map(e => e.value));
    };

    const onReady = () => {
      setReady(true);
      loadTodos();
    };

    // Check if db is already available
    if (typeof db !== 'undefined') {
      onReady();
    } else {
      window.addEventListener('dbready', onReady);
      return () => window.removeEventListener('dbready', onReady);
    }
  }, []);

  const addTodo = async () => {
    if (!input.trim() || !ready) return;

    const todo: Todo = {
      id: crypto.randomUUID(),
      text: input,
      completed: false
    };

    await db.put(STORE, todo.id, todo);
    setTodos([...todos, todo]);
    setInput('');
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const updated = { ...todo, completed: !todo.completed };
    await db.put(STORE, id, updated);
    setTodos(todos.map(t => t.id === id ? updated : t));
  };

  const deleteTodo = async (id: string) => {
    await db.delete(STORE, id);
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
          onInput={(e) => setInput((e.target as HTMLInputElement).value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          className="todo-input"
          disabled={!ready}
        />
        <button className="todo-add-btn" onClick={addTodo} disabled={!ready}>
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
            {ready ? "No todos yet. Add one above to get started!" : "Loading..."}
          </li>
        )}
      </ul>
    </div>
  );
}
