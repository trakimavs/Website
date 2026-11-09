import { useEffect, useRef } from 'react'

interface LightboxProps {
  images: string[]
  index: number
  alt: string
  onChange: (index: number) => void
  onClose: () => void
}

// Full-screen photo viewer. Close with the X, the Escape key or a click on
// the dark background. Move between photos with the arrows, the keyboard's
// left/right keys, or a swipe on touch screens.
export default function Lightbox({ images, index, alt, onChange, onClose }: LightboxProps) {
  const touchStartX = useRef<number | null>(null)
  const count = images.length
  const hasMany = count > 1

  const go = (step: number) => onChange((index + step + count) % count)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight' && hasMany) onChange((index + 1) % count)
      else if (e.key === 'ArrowLeft' && hasMany) onChange((index - 1 + count) % count)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, count, hasMany, onChange, onClose])

  // Stop the page behind from scrolling while the viewer is open
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !hasMany) return
    const distance = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(distance) < 50) return
    go(distance < 0 ? 1 : -1)
  }

  const arrowClass =
    'absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center ' +
    'text-ivory/75 hover:text-gold border border-white/10 hover:border-gold/50 bg-black/40 ' +
    'transition-colors duration-200 text-2xl'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${alt}, photo viewer`}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center select-none"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-12 h-12 flex items-center justify-center text-ivory/75 hover:text-gold text-3xl transition-colors"
      >
        ×
      </button>

      {hasMany && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); go(-1) }}
            aria-label="Previous photo"
            className={`${arrowClass} left-3 md:left-8`}
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); go(1) }}
            aria-label="Next photo"
            className={`${arrowClass} right-3 md:right-8`}
          >
            ›
          </button>
        </>
      )}

      <img
        src={images[index]}
        alt={`${alt}, image ${index + 1} of ${count}`}
        onClick={(e) => e.stopPropagation()}
        className="max-w-[92vw] max-h-[85vh] object-contain"
        draggable={false}
      />

      {hasMany && (
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest text-ivory/60">
          {index + 1} / {count}
        </p>
      )}
    </div>
  )
}
