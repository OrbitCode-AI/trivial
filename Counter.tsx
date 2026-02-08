import { useVar } from 'orbitcode'
import './Counter.css'

interface CounterProps {
  defaultCount?: number
  compact?: boolean
}

export default function Counter({ defaultCount = 0, compact = false }: CounterProps = {}) {
  const [count, setCount] = useVar('counter', defaultCount)

  if (compact) {
    return (
      <div className="counter-compact">
        <button
          type="button"
          className="counter-compact-btn"
          onClick={() => setCount(c => c - 1)}
          aria-label="Decrement"
        >
          −
        </button>
        <span className="counter-compact-badge">{count}</span>
        <button
          type="button"
          className="counter-compact-btn"
          onClick={() => setCount(c => c + 1)}
          aria-label="Increment"
        >
          +
        </button>
      </div>
    )
  }

  return (
    <div className="counter-container">
      <h2 className="counter-header">
        <span className="counter-badge">{count}</span>
        Counter
      </h2>
      <div className="counter-buttons">
        <button type="button" className="counter-btn-primary" onClick={() => setCount(c => c + 1)}>
          + Increment
        </button>
        <button type="button" className="counter-btn-outline" onClick={() => setCount(c => c - 1)}>
          − Decrement
        </button>
        <button type="button" className="counter-btn-subtle" onClick={() => setCount(0)}>
          ↺ Reset
        </button>
      </div>
    </div>
  )
}
