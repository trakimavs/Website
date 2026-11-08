import { Link } from 'react-router-dom'
import { boards, soldLabel } from '../data/boards'

const FEATURED_IDS = ['emerald', 'noir-argent', 'greek-cross']
const featured = boards.filter((b) => FEATURED_IDS.includes(b.id))

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Hero background image */}
        <img
          src="/Website/images/board-noir-2.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          style={{ filter: 'brightness(0.28)' }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-transparent to-obsidian pointer-events-none" />
        {/* Warm centre glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="section-label mb-8">Handcrafted in South Africa</p>
          <h1 className="font-display text-6xl md:text-8xl font-light text-ivory leading-none mb-6">
            Boards made<br />
            <em className="text-gold not-italic">to outlast you</em>
          </h1>
          <p className="text-ivory/50 font-light text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-12">
            Each Mavrikis Tavli board is a singular object: carved, fitted,
            and finished by one pair of hands. Not a production run. Not a
            reproduction. A board.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/collection" className="btn-primary">
              View Collection
            </Link>
            <Link to="/waitlist" className="btn-ghost">
              Join the Waitlist
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest uppercase text-ivory/60">Scroll</span>
          <span className="block w-px h-12 bg-gradient-to-b from-ivory/40 to-transparent" />
        </div>
      </section>

      {/* Featured boards strip */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="section-label mb-3">Current Work</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-ivory">
              The Collection
            </h2>
          </div>
          <Link
            to="/collection"
            className="hidden md:inline text-xs tracking-widest uppercase text-gold/70 hover:text-gold transition-colors"
          >
            All boards →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {featured.map((board) => (
            <Link
              key={board.id}
              to={`/collection/${board.id}`}
              className="card-luxury group flex flex-col"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={board.images[0]}
                  alt={board.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-8 md:p-10 flex flex-col gap-2 flex-1">
                <p className="section-label">{board.style}</p>
                <h3 className="font-display text-2xl font-light text-ivory group-hover:text-gold transition-colors duration-300">
                  {board.name}
                </h3>
                <p className="text-ivory/50 text-sm font-light leading-relaxed line-clamp-2">
                  {board.tagline}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <span className="text-xs text-ivory/30 tracking-wide">{board.edition}</span>
                  <span className={`text-xs tracking-widest uppercase ${board.available ? 'text-gold/70' : 'text-ivory/20'}`}>
                    {board.available ? 'Available' : soldLabel(board)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 md:hidden text-center">
          <Link to="/collection" className="btn-ghost">
            All boards
          </Link>
        </div>
      </section>

      {/* Philosophy strip */}
      <section
        className="border-y border-white/5 py-24 px-6 relative"
        style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label mb-8">The philosophy</p>
          <blockquote className="font-display text-3xl md:text-4xl font-light italic text-ivory/80 leading-relaxed">
            "Tavli is not chess. It does not pretend to be timeless.
            But the board can be."
          </blockquote>
          <p className="mt-6 text-xs text-ivory/30 tracking-widest uppercase">Mavrikis Design</p>
        </div>
      </section>

      {/* Craft image strip — 3 detail shots side by side */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <p className="section-label mb-10 text-center">The details</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {[
            { src: '/Website/images/board-emerald-2.jpg', caption: 'Laser-engraved maker\'s mark' },
            { src: '/Website/images/board-jade-closed.jpg', caption: 'Hand-turned resin pieces' },
            { src: '/Website/images/board-greek-cross-3.jpg', caption: 'Cobalt & pearl resin points' },
          ].map(({ src, caption }) => (
            <div key={src} className="relative overflow-hidden aspect-square bg-charcoal group">
              <img
                src={src}
                alt={caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: 'brightness(0.9)' }}
              />
              <p className="absolute bottom-0 left-0 right-0 px-6 py-4 text-xs text-ivory/50 tracking-widest uppercase bg-gradient-to-t from-obsidian/80 to-transparent">
                {caption}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-32 text-center">
        <p className="section-label mb-6">Limited production</p>
        <h2 className="font-display text-4xl md:text-6xl font-light text-ivory mb-6">
          Next board ships<br />when it's ready
        </h2>
        <p className="text-ivory/50 max-w-lg mx-auto mb-10 font-light leading-relaxed">
          We make boards in small batches. Join the waitlist to be notified
          before a new piece is released to the public.
        </p>
        <Link to="/waitlist" className="btn-primary">
          Join the Waitlist
        </Link>
      </section>
    </main>
  )
}
