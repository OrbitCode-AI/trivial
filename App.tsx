import { useVar } from 'orbitcode'
import Counter from './Counter'
import TodoList from './TodoList'
import StyleToggle from './StyleToggle'
import './App.css'

interface AppProps {
  defaultName?: string
  defaultSkin?: 'modern' | 'todomvc'
}

export default function App({ defaultName = 'World', defaultSkin = 'modern' }: AppProps = {}) {
  const [name, setName] = useVar('name', defaultName)
  const [skin] = useVar('skin', defaultSkin)

  return (
    <div className={`skin-${skin}`}>
      <StyleToggle />
      <div className="app-background">
        <div className="app-container">
        {skin === 'todomvc' ? (
          <>
            <h1 className="app-title">todos</h1>
            <TodoList />
          </>
        ) : (
          <>
            <h1 className="app-title">Hello {name}! 👋</h1>

            <div className="name-input-group">
              <label htmlFor="name-input" className="name-input-label">
                Your name
              </label>
              <input
                id="name-input"
                type="text"
                value={name}
                onInput={e => setName((e.target as HTMLInputElement).value)}
                placeholder="Enter your name"
                className="name-input"
              />
            </div>

            <Counter />
            <TodoList />

            <div className="info-box">
              <p className="info-text">
                💡 <strong>Multi-file editing!</strong> Counter and TodoList are in separate files.
                Check the file tree on the left to see all files.
              </p>
            </div>
          </>
        )}
      </div>
      </div>
      {skin === 'todomvc' && (
        <footer className="info-footer">
          <p>Double-click to edit a todo</p>
        </footer>
      )}
    </div>
  )
}
