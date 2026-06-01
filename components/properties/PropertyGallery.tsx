'use client'

import { useState, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  images: string[]
  title: string
}

export default function PropertyGallery({ images, title }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const open = useCallback((i: number) => {
    setLightbox(i)
    document.body.classList.add('lightbox-open')
  }, [])

  const close = useCallback(() => {
    setLightbox(null)
    document.body.classList.remove('lightbox-open')
  }, [])

  const prev = useCallback(() => setLightbox((i) => (i !== null ? Math.max(0, i - 1) : 0)), [])
  const next = useCallback(() => setLightbox((i) => (i !== null ? Math.min(images.length - 1, i + 1) : 0)), [images.length])

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video bg-[var(--bg-soft)] rounded-2xl flex items-center justify-center text-[var(--ink-3)] text-sm">
        No photos available
      </div>
    )
  }

  return (
    <>
      {/* Gallery grid */}
      <div className="grid grid-cols-4 gap-2 rounded-2xl overflow-hidden">
        <button
          onClick={() => open(0)}
          className="col-span-4 sm:col-span-3 row-span-2 relative overflow-hidden group"
        >
          <div
            className="w-full aspect-[16/10] bg-cover bg-center bg-[#1a1f1b] group-hover:scale-105 transition-transform duration-300"
            style={{ backgroundImage: `url("${images[0]}")` }}
          />
        </button>
        {images.slice(1, 3).map((img, i) => (
          <button
            key={i}
            onClick={() => open(i + 1)}
            className="col-span-2 sm:col-span-1 relative overflow-hidden group hidden sm:block"
          >
            <div
              className="w-full aspect-square bg-cover bg-center bg-[#1a1f1b] group-hover:scale-105 transition-transform duration-300"
              style={{ backgroundImage: `url("${img}")` }}
            />
          </button>
        ))}
        {images.length > 3 && (
          <button
            onClick={() => open(3)}
            className="col-span-2 sm:col-span-1 relative overflow-hidden group hidden sm:block"
          >
            <div
              className="w-full aspect-square bg-cover bg-center bg-[#1a1f1b] group-hover:scale-105 transition-transform duration-300"
              style={{ backgroundImage: `url("${images[3]}")` }}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">+{images.length - 3} more</span>
            </div>
          </button>
        )}
      </div>

      {/* Mobile thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto sm:hidden mt-2 pb-1">
          {images.slice(1).map((img, i) => (
            <button key={i} onClick={() => open(i + 1)} className="shrink-0 w-20 h-20 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${img}")` }} />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          <button
            onClick={(e) => { e.stopPropagation(); close() }}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>

          {lightbox > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          <img
            src={images[lightbox]}
            alt={`${title} — photo ${lightbox + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {lightbox < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-4 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={22} />
            </button>
          )}

          <div className="absolute bottom-4 text-white/60 text-sm">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
