import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ImageCard from './ImageCard'
import useWindowWidth from '../hooks/useWindowWidth'

// Horizontal carousel: the centre card is larger, neighbours shrink and fade.
export default function ServiceCarousel({ services }) {
  const [active, setActive] = useState(0)
  const w = useWindowWidth()
  const cardW = w < 640 ? 250 : w < 1024 ? 300 : 340
  const gap = 24
  const x = w / 2 - cardW / 2 - active * (cardW + gap)
  const go = (d) => setActive((a) => Math.min(services.length - 1, Math.max(0, a + d)))
  const current = services[active]

  return (
    <div>
      <div className="overflow-hidden py-6" role="region" aria-roledescription="carousel" aria-label="Photography services">
        <motion.div className="flex items-center" style={{ gap }} animate={{ x }} transition={{ type: 'spring', stiffness: 120, damping: 20 }}>
          {services.map((s, i) => {
            const isActive = i === active
            return (
              <motion.button
                key={s.id}
                onClick={() => setActive(i)}
                aria-label={`Show ${s.title}`}
                aria-current={isActive}
                animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0.5 }}
                transition={{ duration: 0.4 }}
                className="shrink-0 overflow-hidden rounded-[1.5rem] text-left shadow-xl shadow-charcoal/10"
                style={{ width: cardW }}
                data-cursor="view"
              >
                <ImageCard src={s.image} alt={s.title} className="aspect-[3/4]" />
              </motion.button>
            )
          })}
        </motion.div>
      </div>

      <div className="container-x mx-auto mt-6 max-w-2xl text-center">
        <motion.div key={current.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="h-section">{current.title}</h2>
          <p className="mx-auto mt-3 max-w-lg text-stone">{current.description}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to={`/gallery?cat=${encodeURIComponent(current.category)}`} className="btn btn-line">View Gallery</Link>
            <Link to={`/booking?service=${encodeURIComponent(current.title)}`} className="btn btn-dark">Book This Service</Link>
          </div>
        </motion.div>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={() => go(-1)} disabled={active === 0} aria-label="Previous service" className="rounded-full border border-charcoal/30 p-3 transition hover:bg-charcoal hover:text-cream disabled:opacity-30"><ChevronLeft size={18} /></button>
          <span className="text-sm text-stone">{active + 1} of {services.length}</span>
          <button onClick={() => go(1)} disabled={active === services.length - 1} aria-label="Next service" className="rounded-full border border-charcoal/30 p-3 transition hover:bg-charcoal hover:text-cream disabled:opacity-30"><ChevronRight size={18} /></button>
        </div>
      </div>
    </div>
  )
}
