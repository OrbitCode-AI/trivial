import { useVar } from 'orbitcode'
import './StyleToggle.css'

export default function StyleToggle() {
  const [skin, setSkin] = useVar('skin', 'modern')

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
