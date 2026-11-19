import { Link } from 'react-router-dom'
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react'
import siteConfig from '../config/siteConfig'
import { Logo } from './Navbar'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="container-x grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-6 max-w-sm font-serif text-2xl italic text-cream/80">{siteConfig.tagline}</p>
          <div className="mt-6 flex gap-3">
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full border border-cream/30 p-3 transition hover:bg-clay"><Instagram size={18} /></a>
            <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-full border border-cream/30 p-3 transition hover:bg-clay"><Facebook size={18} /></a>
          </div>
        </div>
        <div>
          <h3 className="font-serif text-xl">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            {[['Gallery', '/gallery'], ['What We Shoot', '/services'], ['Films', '/films'], ['About', '/about'], ['Book a Session', '/booking'], ['Contact', '/contact']].map(([l, to]) => (
              <li key={l}><Link to={to} className="transition hover:text-cream">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-xl">Visit & call</h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/70">
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0" />{siteConfig.address}</li>
            <li className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0" /><a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>{siteConfig.phone}</a></li>
            <li className="flex gap-2"><Mail size={16} className="mt-0.5 shrink-0" /><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} {siteConfig.name}. Demo brand for presentation purposes.
      </div>
    </footer>
  )
}
