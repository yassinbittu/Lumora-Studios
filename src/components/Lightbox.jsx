import { useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export default function Lightbox({ items, index, onClose, onChange }) {
  const prev = useCallback(() => onChange((index - 1 + items.length) % items.length), [index, items.length, onChange])
  const next = useCallback(() => onChange((index + 1) % items.length), [index, items.length, onChange])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  const item = items[index]
  if (!item) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-charcoal/95 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
    >
      <button onClick={onClose} aria-label="Close viewer" className="absolute right-4 top-4 rounded-full bg-cream/10 p-3 text-cream transition hover:bg-clay"><X size={22} /></button>
      <button onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-cream/10 p-3 text-cream transition hover:bg-clay sm:left-6"><ChevronLeft size={24} /></button>
      <button onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-cream/10 p-3 text-cream transition hover:bg-clay sm:right-6"><ChevronRight size={24} /></button>
      <motion.figure key={item.id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }} className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img src={item.full} alt={item.alt} className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain" onError={(e) => { e.currentTarget.src = item.src }} />
        <figcaption className="mt-3 flex justify-between text-sm text-cream/70">
          <span>{item.alt}</span>
          <span>{index + 1} / {items.length}</span>
        </figcaption>
      </motion.figure>
    </motion.div>
  )
}
