import { useState } from 'react';
import Counter from './Counter';
import TodoList from './TodoList';
import './App.css';

export default function App() {
  const [name, setName] = useState('World');

  return (
    <div className="app-background">
      <div className="app-container">
        <h1 className="app-title">Hello {name}! 👋</h1>

        <div className="name-input-group">
          <label className="name-input-label">Your name</label>
          <input
            type="text"
            value={name}
            onInput={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="name-input"
          />
        </div>

        <Counter />
        <TodoList />

        <div className="info-box">
          <p className="info-text">
            💡 <strong>Multi-file editing!</strong> Counter and TodoList are
            in separate files. Check the file tree on the left to see all files.
          </p>
        </div>
      </div>
    </div>
  );
}
