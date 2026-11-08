import { Link } from 'react-router-dom'
import { boards } from '../data/boards'

export default function Collection() {
  return (
    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20">
          <p className="section-label mb-4">All boards</p>
          <h1 className="font-display text-5xl md:text-7xl font-light text-ivory">
            The Collection
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {boards.map((board) => (
            <Link
              key={board.id}
              to={`/collection/${board.id}`}
              className="card-luxury group"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={board.images[0]}
                  alt={board.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-8 md:p-10">
                <p className="section-label mb-3">{board.year} · {board.style}</p>
                <h2 className="font-display text-3xl font-light text-ivory group-hover:text-gold transition-colors duration-300 mb-3">
                  {board.name}
                </h2>
                <p className="text-ivory/50 font-light leading-relaxed mb-6 line-clamp-3">
                  {board.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ivory/30">{board.edition}</span>
                  <span className={`text-xs tracking-widest uppercase ${board.available ? 'text-gold/70' : 'text-ivory/20'}`}>
                    {board.available ? 'Available' : 'Sold out'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
