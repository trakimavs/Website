import { useState } from 'react'
import { Link } from 'react-router-dom'
import Lightbox from '../components/Lightbox'

// /collection/poulia — a gallery of the pieces (πούλια).
// Pieces are not sold on their own; they come with every board. This page
// shows what they look like. Source photos: Pictures/1 - On Site/08 Poulia.

const photos = [
  { src: '/images/poulia-1.jpg', caption: 'Cobalt and pearl, with matching coasters' },
  { src: '/images/poulia-2.jpg', caption: 'Wood faces with cobalt and pearl eyes, and a coaster carrying the Mavrikis mark' },
  { src: '/images/poulia-3.jpg', caption: 'Charcoal and pearl, fifteen of each, resin faces up' },
  { src: '/images/poulia-4.jpg', caption: 'The same set turned over: wood faces with charcoal and pearl eyes' },
  { src: '/images/poulia-5.jpg', caption: 'Charcoal and pearl, set out in rows' },
  { src: '/images/poulia-6.jpg', caption: 'Charcoal and pearl, resin and wood faces together' },
  { src: '/images/poulia-7.jpg', caption: 'Copper and charcoal' },
]

export default function Poulia() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Link
          to="/collection"
          className="inline-block mb-10 text-xs tracking-widest uppercase text-ivory/60 hover:text-gold transition-colors"
        >
          ← The Collection
        </Link>

        <div className="mb-16 max-w-2xl">
          <p className="section-label mb-4">Poulia · πούλια</p>
          <h1 className="font-display text-5xl md:text-7xl text-ivory mb-8 leading-none">The pieces</h1>
          <p className="text-lg leading-relaxed text-ivory/75">
            Thirty pieces to a board, fifteen of each colour, every one made by hand. Each piece has
            two faces: poured resin, swirled so no two settle the same way, and turned wood with a
            resin eye set into its centre. The resin face is dished, so a finger finds its place.
          </p>
        </div>

        {/* Fills row by row, left to right: a new photo goes in the next free spot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {photos.map((photo, i) => (
            <figure key={photo.src}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="block w-full overflow-hidden group"
                aria-label={`Enlarge: ${photo.caption}`}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading={i < 3 ? 'eager' : 'lazy'}
                  className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </button>
              <figcaption className="mt-3 text-sm text-ivory/60">{photo.caption}</figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-20 border-t border-white/10 pt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p className="font-display text-2xl md:text-3xl text-ivory/90 leading-snug max-w-xl">
            Every board comes with its pieces. Heritage pieces are poured in resin to match the
            points, and Classic pieces are half wood, half resin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/collection" className="btn-primary">See the boards</Link>
            <Link to="/waitlist" className="btn-ghost">Ask about a commission</Link>
          </div>
        </div>
      </div>

      {open !== null && (
        <Lightbox
          images={photos.map((p) => p.src)}
          index={open}
          alt={photos[open].caption}
          onChange={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </main>
  )
}
