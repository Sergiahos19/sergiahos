import { useEffect, useState } from 'react'
import { Icon } from './Icon'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 360)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  if (!visible) return null

  return (
    <button
      className="back-to-top"
      type="button"
      aria-label="Retour en haut de la page"
      title="Retour en haut"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <Icon name="arrow-up" size={20} />
    </button>
  )
}
