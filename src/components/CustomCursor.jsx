import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Desktop-only ring cursor that grows over images and links. Hidden on touch devices.
export default function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 400, damping: 35 })
  const sy = useSpring(y, { stiffness: 400, damping: 35 })
  const [mode, setMode] = useState('idle')
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target.closest ? e.target : null
      if (t?.closest('[data-cursor="view"]')) setMode('view')
      else if (t?.closest('a, button, input, select, textarea')) setMode('link')
      else setMode('idle')
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  if (!enabled) return null
  const size = mode === 'view' ? 84 : mode === 'link' ? 48 : 18
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[150] flex items-center justify-center rounded-full border border-clay bg-clay/10 text-[11px] font-medium text-cream mix-blend-normal"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%', backgroundColor: mode === 'view' ? 'rgba(181,96,63,0.9)' : undefined }}
      animate={{ width: size, height: size }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {mode === 'view' && 'View'}
    </motion.div>
  )
}
