import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Monogram from './Monogram'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-obsidian/95 backdrop-blur-sm border-b border-white/5' : ''
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <Monogram size={32} className="text-gold group-hover:text-gold-light transition-colors duration-300" />
          <span className="font-display text-lg tracking-widest text-ivory group-hover:text-gold transition-colors duration-300">
            MAVRIKIS DESIGNS
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {[
            { to: '/collection', label: 'Collection' },
            { to: '/about', label: 'The Craft' },
            { to: '/waitlist', label: 'Waitlist' },
          ].map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`text-xs tracking-widest uppercase font-light transition-colors duration-300 ${
                  location.pathname === to
                    ? 'text-gold'
                    : 'text-ivory/60 hover:text-ivory'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-ivory transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-ivory transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-ivory transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-charcoal border-t border-white/5 px-6 py-8 flex flex-col gap-6">
          {[
            { to: '/collection', label: 'Collection' },
            { to: '/about', label: 'The Craft' },
            { to: '/waitlist', label: 'Waitlist' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-sm tracking-widest uppercase text-ivory/70 hover:text-gold transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
