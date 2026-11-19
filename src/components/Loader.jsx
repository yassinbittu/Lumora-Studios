import { motion } from 'framer-motion'
import siteConfig from '../config/siteConfig'

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-charcoal text-cream"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      role="status"
      aria-label="Loading"
    >
      <motion.div
        initial={{ scale: 0.4, rotate: -90, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-clay"
      >
        <div className="h-4 w-4 rounded-full bg-cream" />
      </motion.div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="font-serif text-3xl tracking-[0.3em]">
        {siteConfig.name}
      </motion.p>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.8 }} className="mt-2 font-serif text-lg italic">
        {siteConfig.tagline}
      </motion.p>
    </motion.div>
  )
}
