import { useVar } from 'orbitcode'
import './StyleToggle.css'

interface StyleToggleProps {
  defaultSkin?: 'modern' | 'todomvc'
}

export default function StyleToggle({ defaultSkin = 'modern' }: StyleToggleProps = {}) {
  const [skin, setSkin] = useVar('skin', defaultSkin)

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
