import { Link } from 'react-router-dom'
import Monogram from './Monogram'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 opacity-40">
          <Monogram size={24} className="text-ivory" />
          <span className="font-display text-base tracking-widest text-ivory">MAVRIKIS DESIGNS</span>
        </div>
        <p className="text-xs text-ivory/50 tracking-wide">
          Handcrafted Tavli (backgammon) boards, made one at a time in South Africa
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <Link
            to="/how-to-play"
            className="text-xs tracking-widest uppercase text-ivory/60 hover:text-gold transition-colors duration-300"
          >
            How to play
          </Link>
          <Link
            to="/faq"
            className="text-xs tracking-widest uppercase text-ivory/60 hover:text-gold transition-colors duration-300"
          >
            Questions
          </Link>
          <a
            href="https://www.instagram.com/mavrikisdesigns/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase text-ivory/60 hover:text-gold transition-colors duration-300"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  )
}
