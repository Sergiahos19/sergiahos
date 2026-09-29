import { Link } from 'react-router-dom'
import logo from '../../images/logo.jpeg'
import { profile } from '../data/profile'

export function Brand({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`brand-mark ${className}`} aria-label={`${profile.name}, accueil`}>
      <img className="brand-logo" src={logo} alt="" />
      <span>{profile.name}</span>
    </Link>
  )
}
