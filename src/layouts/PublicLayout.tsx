import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { profile } from '../data/profile'
import { Brand } from '../components/Brand'
import BackToTop from '../components/BackToTop'

const links = [
  ['/', 'Accueil'],
  ['/about', 'À propos'],
  ['/services#services-list', 'Services'],
  ['/projects', 'Réalisations'],
  ['/partners', 'Partenaires'],
  ['/seo-audit', 'Audit SEO'],
  ['/faq', 'FAQ'],
  ['/contact', 'Contact'],
]

export default function PublicLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen text-ink">
      <a className="skip-link" href="#main-content">Aller au contenu</a>
      <header className="site-header sticky top-0 z-50">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Brand />

          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="primary-navigation"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>

          <nav
            id="primary-navigation"
            className={`site-nav ${open ? 'site-nav-open' : ''}`}
            aria-label="Navigation principale"
          >
            {links.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
            <Link className="btn nav-cta" to="/request" onClick={() => setOpen(false)}>
              Parlons de votre projet <Icon name="arrow-up-right" size={16} />
            </Link>
          </nav>
        </div>
      </header>

      <main id="main-content"><Outlet /></main>

      <footer className="site-footer">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Brand className="brand-mark-light" />
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">
              Développement web et mobile, SEO et automatisation : des expériences numériques pensées pour vos objectifs.
            </p>
          </div>
          <div>
            <h2 className="footer-heading">Explorer</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {links.slice(1).map(([to, label]) => <Link key={to} className="footer-link" to={to}>{label}</Link>)}
            </div>
          </div>
          <div>
            <h2 className="footer-heading">Restons en contact</h2>
            <a className="footer-link inline-flex items-center gap-2" href={`mailto:${profile.email}`}>
              <Icon name="mail" size={17} />{profile.email}
            </a>
            {profile.phone && (
              <a className="footer-link mt-3 flex items-center gap-2" href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`}>
                <Icon name="phone" size={17} />{profile.phone}
              </a>
            )}
            {profile.socials.length > 0 && (
              <div className="mt-5 flex gap-3">
                {profile.socials.map(social => (
                  <a key={social.label} className={`social-link${social.url ? '' : ' social-link-disabled'}`} href={social.url || undefined} aria-label={social.url ? social.label : `${social.label}, lien à ajouter`} title={social.url ? social.label : 'Lien à ajouter'} target={social.url ? '_blank' : undefined} rel={social.url ? 'noreferrer' : undefined}>
                    <Icon name={social.icon} size={18} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-white/50 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Sergiahos - Tous droits réservés.</p>
            <Link className="footer-link" to="/admin/login">Espace administrateur</Link>
          </div>
        </div>
      </footer>
      <BackToTop />
    </div>
  )
}
