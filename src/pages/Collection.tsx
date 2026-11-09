import { Link } from 'react-router-dom'
import { boards, soldLabel } from '../data/boards'

export default function Collection() {
  return (
    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20">
          <p className="section-label mb-4">All boards</p>
          <h1 className="font-display text-5xl md:text-7xl text-ivory">
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
                  alt={`${board.name}, handmade Tavli board`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-8 md:p-10">
                <p className="section-label mb-3">{board.year} · {board.style}</p>
                <h2 className="font-display text-3xl text-ivory group-hover:text-gold transition-colors duration-300 mb-3">
                  {board.name}
                </h2>
                <p className="text-ivory/70 leading-relaxed mb-6 line-clamp-3">
                  {board.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ivory/50">{board.edition}</span>
                  <span className={`text-xs tracking-widest uppercase ${board.available ? 'text-gold' : 'text-ivory/40'}`}>
                    {board.available ? 'Available' : soldLabel(board)}
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
