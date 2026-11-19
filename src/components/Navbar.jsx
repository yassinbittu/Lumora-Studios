import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import siteConfig from '../config/siteConfig'

const left = [
  { label: 'Weddings', to: '/gallery?cat=Weddings' },
  { label: 'Pre-Wedding', to: '/gallery?cat=Pre-Wedding' },
  { label: 'Newborn', to: '/gallery?cat=Newborn' },
  { label: 'Toddlers', to: '/gallery?cat=Toddlers' },
]
const right = [
  { label: 'Films', to: '/films' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export function Logo({ light = false }) {
  return (
    <Link to="/" aria-label={`${siteConfig.name} home`} className="flex flex-col items-center leading-none">
      <span className={`font-serif text-2xl tracking-[0.28em] sm:text-3xl ${light ? 'text-cream' : 'text-charcoal'}`}>LUMORA</span>
      <span className={`mt-1 text-[10px] tracking-[0.5em] ${light ? 'text-cream/70' : 'text-clay'}`}>STUDIOS</span>
    </Link>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => setOpen(false), [location])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const linkCls = 'text-sm text-charcoal/80 transition hover:text-clay'

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition duration-500 ${scrolled ? 'bg-cream/90 py-3 shadow-sm backdrop-blur-md' : 'bg-transparent py-5'}`}>
      <nav className="container-x grid grid-cols-[1fr_auto_1fr] items-center" aria-label="Main navigation">
        <ul className="hidden items-center gap-6 lg:flex">
          {left.map((l) => (
            <li key={l.label}><Link to={l.to} className={linkCls}>{l.label}</Link></li>
          ))}
        </ul>
        <div className="col-start-2 lg:col-start-2"><Logo /></div>
        <div className="col-start-3 flex items-center justify-end gap-6">
          <ul className="hidden items-center gap-6 lg:flex">
            {right.map((l) => (
              <li key={l.label}>
                <NavLink to={l.to} className={({ isActive }) => `${linkCls} ${isActive ? 'text-clay' : ''}`}>{l.label}</NavLink>
              </li>
            ))}
          </ul>
          <Link to="/booking" className="btn btn-dark hidden !px-5 !py-2.5 lg:inline-flex">Book Now</Link>
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-charcoal px-8 py-6 text-cream"
          >
            <div className="flex items-center justify-between">
              <Logo light />
              <button onClick={() => setOpen(false)} aria-label="Close menu"><X size={30} /></button>
            </div>
            <ul className="mt-12 flex flex-1 flex-col gap-5 overflow-y-auto">
              {[...left, ...right, { label: 'Services', to: '/services' }, { label: 'Gallery', to: '/gallery' }].map((l, i) => (
                <motion.li key={l.label} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.04 }}>
                  <Link to={l.to} className="font-serif text-4xl transition hover:text-clay">{l.label}</Link>
                </motion.li>
              ))}
            </ul>
            <Link to="/booking" className="btn btn-clay w-full">Book Now</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
