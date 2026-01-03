import { useState } from 'react';
import './Counter.css';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-container">
      <h2 className="counter-header">
        <span className="counter-badge">{count}</span>
        Counter
      </h2>
      <div className="counter-buttons">
        <button className="counter-btn-primary" onClick={() => setCount(c => c + 1)}>
          + Increment
        </button>
        <button className="counter-btn-outline" onClick={() => setCount(c => c - 1)}>
          − Decrement
        </button>
        <button className="counter-btn-subtle" onClick={() => setCount(0)}>
          ↺ Reset
        </button>
      </div>
    </div>
  );
}
