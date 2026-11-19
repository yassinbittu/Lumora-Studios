import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import GalleryGrid from '../components/GalleryGrid'
import Lightbox from '../components/Lightbox'
import gallery, { categories } from '../data/gallery'
import useDocumentMeta from '../hooks/useDocumentMeta'

export default function Gallery() {
  useDocumentMeta('Portfolio', 'Browse wedding, pre-wedding, newborn, toddler, maternity, birthday and modelling photography by Lumora Studios.')
  const [params, setParams] = useSearchParams()
  const requested = params.get('cat')
  const active = categories.includes(requested) ? requested : 'All'
  const [lb, setLb] = useState(null)
  const items = useMemo(() => (active === 'All' ? gallery : gallery.filter((g) => g.category === active)), [active])

  return (
    <section className="pb-24 pt-36">
      <div className="container-x">
        <h1 className="h-display">Portfolio</h1>
        <div className="my-10 flex gap-2 overflow-x-auto pb-2 no-scrollbar sm:flex-wrap" role="tablist" aria-label="Filter photos by category">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={c === active}
              onClick={() => setParams(c === 'All' ? {} : { cat: c })}
              className={`shrink-0 rounded-full border px-5 py-2 text-sm transition ${c === active ? 'border-charcoal bg-charcoal text-cream' : 'border-charcoal/25 hover:border-clay hover:text-clay'}`}
            >
              {c}
            </button>
          ))}
        </div>
        <GalleryGrid items={items} onOpen={setLb} />
      </div>
      <AnimatePresence>
        {lb !== null && <Lightbox items={items} index={lb} onChange={setLb} onClose={() => setLb(null)} />}
      </AnimatePresence>
    </section>
  )
}
