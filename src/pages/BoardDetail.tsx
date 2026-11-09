import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { boards, soldLabel } from '../data/boards'
import Lightbox from '../components/Lightbox'

export default function BoardDetail() {
  const { id } = useParams<{ id: string }>()
  const board = boards.find((b) => b.id === id)
  const [activeImage, setActiveImage] = useState(0)
  const [viewerOpen, setViewerOpen] = useState(false)

  // Start each board on its first photo when moving between boards
  useEffect(() => {
    setActiveImage(0)
    setViewerOpen(false)
  }, [id])

  if (!board) {
    return (
      <main className="pt-40 pb-24 text-center">
        <p className="text-ivory/40 mb-6">Board not found.</p>
        <Link to="/collection" className="btn-ghost">
          Back to collection
        </Link>
      </main>
    )
  }

  const currentIndex = boards.findIndex((b) => b.id === id)
  const prev = boards[currentIndex - 1]
  const next = boards[currentIndex + 1]

  return (
    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Back */}
        <Link
          to="/collection"
          className="inline-block text-xs tracking-widest uppercase text-ivory/40 hover:text-ivory mb-16 transition-colors"
        >
          ← Collection
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Image gallery */}
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={() => setViewerOpen(true)}
              aria-label={`View ${board.name} full screen`}
              className="aspect-square w-full overflow-hidden border border-white/5 cursor-zoom-in"
            >
              <img
                src={board.images[activeImage]}
                alt={`${board.name}, handmade Tavli board, photo ${activeImage + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
            </button>
            {viewerOpen && (
              <Lightbox
                images={board.images}
                index={activeImage}
                alt={board.name}
                onChange={setActiveImage}
                onClose={() => setViewerOpen(false)}
              />
            )}
            {board.images.length > 1 && (
              <div className="flex gap-3">
                {board.images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setActiveImage(i)}
                    className={`flex-1 aspect-square overflow-hidden border transition-colors duration-300 ${
                      i === activeImage ? 'border-gold/60' : 'border-white/5 hover:border-white/20'
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="section-label mb-4">{board.year}</p>
            <h1 className="font-display text-5xl md:text-6xl font-light text-ivory mb-6">
              {board.name}
            </h1>
            <p className="text-ivory/60 font-light leading-relaxed text-lg mb-8">
              {board.description}
            </p>

            <dl className="border-t border-white/5 pt-8 grid grid-cols-2 gap-6 mb-10">
              <div>
                <dt className="section-label mb-1">Material</dt>
                <dd className="text-ivory/70 text-sm font-light">{board.material}</dd>
              </div>
              <div>
                <dt className="section-label mb-1">Edition</dt>
                <dd className="text-ivory/70 text-sm font-light">{board.edition}</dd>
              </div>
            </dl>

            {board.available ? (
              <div className="flex flex-col gap-3">
                <Link to={`/waitlist?board=${board.id}`} className="btn-primary self-start">
                  Enquire about this board
                </Link>
                <p className="text-xs text-ivory/30 font-light">
                  All boards are made to order. We'll respond personally within 48 hours.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <p className="text-xs text-ivory/30 tracking-widest uppercase">
                  {soldLabel(board) === 'Sold' ? 'This piece has been sold' : 'This board has sold out'}
                </p>
                <Link to="/waitlist" className="btn-ghost self-start">
                  Join the waitlist for future work
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Prev / Next */}
        <div className="border-t border-white/5 mt-24 pt-8 flex items-center justify-between">
          {prev ? (
            <Link
              to={`/collection/${prev.id}`}
              className="text-xs tracking-widest uppercase text-ivory/40 hover:text-gold transition-colors"
            >
              ← {prev.name}
            </Link>
          ) : <span />}
          {next ? (
            <Link
              to={`/collection/${next.id}`}
              className="text-xs tracking-widest uppercase text-ivory/40 hover:text-gold transition-colors"
            >
              {next.name} →
            </Link>
          ) : <span />}
        </div>
      </div>
    </main>
  )
}
