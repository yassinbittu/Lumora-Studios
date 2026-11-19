import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ImageCard from './ImageCard'
import { unsplash } from '../data/images'
import siteConfig from '../config/siteConfig'

const cards = [
  { label: 'Weddings', to: '/gallery?cat=Weddings', src: unsplash('photo-1583939003579-730e3918a45a', 900), cls: 'left-0 top-10 w-[46%] rotate-[-4deg] z-10', delay: 1.9 },
  { label: 'Toddlers', to: '/gallery?cat=Toddlers', src: unsplash('photo-1503454537195-1dcabb73ffb9', 900), cls: 'right-0 top-0 w-[42%] rotate-[3deg] z-20', delay: 2.1 },
  { label: 'Newborn', to: '/gallery?cat=Newborn', src: unsplash('photo-1555252333-9f8e92e65df9', 900), cls: 'left-[30%] bottom-0 w-[44%] rotate-[-1deg] z-30', delay: 2.3 },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sand/60 to-cream pt-32 sm:pt-40">
      <div className="container-x grid items-center gap-14 pb-24 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="mb-5 font-serif text-xl italic text-clay">
            {siteConfig.city}
          </motion.p>
          <motion.h1
            className="h-display"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.85, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Real People. Real Emotions. Timeless Memories.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.8 }} className="mt-6 max-w-md text-lg leading-relaxed text-charcoal/70">
            {siteConfig.name} is a Hyderabad photography studio that documents weddings, newborns and growing families with honest, unposed and beautifully lit frames.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4 }} className="mt-9 flex flex-wrap gap-4">
            <Link to="/gallery" className="btn btn-dark">Explore Our Work</Link>
            <Link to="/booking" className="btn btn-line">Book a Session</Link>
          </motion.div>
        </div>

        <div className="relative mx-auto h-[420px] w-full max-w-[560px] sm:h-[560px]">
          {cards.map((c) => (
            <motion.div
              key={c.label}
              className={`absolute ${c.cls}`}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: c.delay - 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, rotate: 0, zIndex: 40 }}
            >
              <Link to={c.to} data-cursor="view" className="group relative block overflow-hidden rounded-t-[999px] rounded-b-2xl shadow-2xl shadow-charcoal/20" aria-label={`${c.label} photography`}>
                <ImageCard src={c.src} alt={`${c.label} photography sample`} className="aspect-[3/4]" imgClassName="transition duration-700 group-hover:scale-105" eager />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/70 to-transparent p-4 pt-10 text-center font-serif text-xl text-cream">{c.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-stone sm:flex" aria-hidden="true">
        <span>Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-charcoal/20">
          <span className="scrollcue absolute inset-0 bg-clay" />
        </span>
      </div>
    </section>
  )
}
