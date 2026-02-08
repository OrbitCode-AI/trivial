import { useVar } from 'orbitcode'
import './StyleToggle.css'

interface StyleToggleProps {
  skin?: 'modern' | 'todomvc'
  onToggle?: (skin: 'modern' | 'todomvc') => void
  defaultSkin?: 'modern' | 'todomvc'
}

export default function StyleToggle({ skin: skinProp, onToggle, defaultSkin = 'modern' }: StyleToggleProps = {}) {
  const [skinState, setSkinState] = useVar('skin', defaultSkin)

  // Use prop if provided (controlled mode), otherwise use internal state (standalone mode)
  const skin = skinProp ?? skinState
  const setSkin = onToggle ?? setSkinState

  return (
    <div className="style-toggle">
      <button
        type="button"
        className="toggle-button"
        onClick={() => setSkin(skin === 'modern' ? 'todomvc' : 'modern')}
        aria-label="Toggle skin"
      >
        <span className={`toggle-option ${skin === 'modern' ? 'active' : ''}`}>
          Modern
        </span>
        <span className={`toggle-slider ${skin === 'todomvc' ? 'right' : ''}`} />
        <span className={`toggle-option ${skin === 'todomvc' ? 'active' : ''}`}>
          TodoMVC
        </span>
      </button>
    </div>
  )
}
