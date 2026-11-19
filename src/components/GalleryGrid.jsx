import { AnimatePresence, motion } from 'framer-motion'
import ImageCard from './ImageCard'
import { aspectClass } from '../data/gallery'

// Masonry grid using CSS columns; items animate in/out when the filter changes.
export default function GalleryGrid({ items, onOpen }) {
  return (
    <motion.div layout className="columns-2 gap-3 sm:gap-5 lg:columns-3 xl:columns-4">
      <AnimatePresence mode="popLayout">
        {items.map((item, i) => (
          <motion.button
            layout
            key={item.id}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.4 }}
            onClick={() => onOpen(i)}
            aria-label={`Open photo: ${item.alt}`}
            data-cursor="view"
            className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl text-left sm:mb-5"
          >
            <ImageCard src={item.src} alt={item.alt} className={aspectClass[item.shape]} imgClassName="transition duration-700 group-hover:scale-110" />
            <span className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/70 via-transparent to-transparent p-4 opacity-0 transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="font-serif text-lg text-cream">{item.category}</span>
            </span>
          </motion.button>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
