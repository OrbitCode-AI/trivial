import { useVar } from 'orbitcode'
import StyleToggle from './StyleToggle'
import Counter from './Counter'
import './BottomBar.css'

interface BottomBarProps {
  skin?: 'modern' | 'todomvc'
  onToggleSkin?: (skin: 'modern' | 'todomvc') => void
  defaultSkin?: 'modern' | 'todomvc'
  defaultName?: string
}

export default function BottomBar({
  skin: skinProp,
  onToggleSkin,
  defaultSkin = 'modern',
  defaultName = 'World'
}: BottomBarProps = {}) {
  const [skinState] = useVar('skin', defaultSkin)
  const [name, setName] = useVar('name', defaultName)

  // Use prop if provided (controlled mode), otherwise use internal state (standalone mode)
  const skin = skinProp ?? skinState

  return (
    <div className="bottom-bar">
      <div className="bottom-bar-section bottom-bar-left">
        <StyleToggle skin={skin} onToggle={onToggleSkin} defaultSkin={defaultSkin} />
      </div>

      <div className="bottom-bar-section bottom-bar-center">
        <label htmlFor="bottom-name-input" className="bottom-name-label">
          Hello {name}!
        </label>
        <input
          id="bottom-name-input"
          type="text"
          value={name}
          onInput={e => setName((e.target as HTMLInputElement).value)}
          placeholder="Your name"
          className="bottom-name-input"
        />
      </div>

      <div className="bottom-bar-section bottom-bar-right">
        <Counter compact={true} />
      </div>
    </div>
  )
}
