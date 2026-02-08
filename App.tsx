import { useVar } from 'orbitcode'
import TodoList from './TodoList'
import BottomBar from './BottomBar'
import './App.css'

interface AppProps {
  defaultName?: string
  defaultSkin?: 'modern' | 'todomvc'
}

export default function App({ defaultName = 'World', defaultSkin = 'modern' }: AppProps = {}) {
  const [name] = useVar('name', defaultName)
  const [skin, setSkin] = useVar('skin', defaultSkin)

  return (
    <div className={`skin-${skin}`}>
      <div className="app-background">
        <div className="app-container">
          <h1 className="todomvc-title">todos</h1>

          <h1 className="app-title modern-only">Hello {name}!</h1>

          <TodoList />
        </div>
      </div>
      <footer className="info-footer">
        <p>Double-click to edit a todo</p>
      </footer>
      <BottomBar skin={skin} onToggleSkin={setSkin} defaultSkin={defaultSkin} defaultName={defaultName} />
    </div>
  )
}
