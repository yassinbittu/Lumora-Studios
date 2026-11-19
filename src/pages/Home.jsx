import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Quote } from 'lucide-react'
import Hero from '../components/Hero'
import Reveal from '../components/Reveal'
import ImageCard from '../components/ImageCard'
import ServiceCard from '../components/ServiceCard'
import GalleryGrid from '../components/GalleryGrid'
import Lightbox from '../components/Lightbox'
import gallery from '../data/gallery'
import services from '../data/services'
import testimonials from '../data/testimonials'
import { unsplash } from '../data/images'
import siteConfig from '../config/siteConfig'
import useDocumentMeta from '../hooks/useDocumentMeta'

const featured = [
  { title: 'Wedding Stories', category: 'Weddings', src: unsplash('photo-1604017011826-d3b4c23f8914', 1200), cls: 'md:col-span-2 md:row-span-2 aspect-[4/5] md:aspect-auto' },
  { title: 'Pre-Wedding', category: 'Pre-Wedding', src: unsplash('photo-1529634806980-85c3dd6d34ac', 900), cls: 'aspect-[4/3]' },
  { title: 'Little Ones', category: 'Newborn', src: unsplash('photo-1544126592-807ade215a0b', 900), cls: 'aspect-[4/3]' },
]

export default function Home() {
  useDocumentMeta('', 'Premium wedding, pre-wedding, newborn, toddler and portrait photography in Hyderabad by Lumora Studios.')
  const [lb, setLb] = useState(null)
  const selected = gallery.filter((_, i) => [0, 5, 12, 15, 8, 18, 1, 20].includes(i))
  const [t, setT] = useState(0)

  return (
    <>
      <Hero />

      <section className="section">
        <div className="container-x">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <h2 className="h-section max-w-xl">Featured work from this season</h2>
            <Link to="/gallery" className="btn btn-line">View all work <ArrowRight size={16} /></Link>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3 md:grid-rows-2">
            {featured.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1} className={f.cls.includes('row-span-2') ? 'md:col-span-2 md:row-span-2' : ''}>
                <Link to={`/gallery?cat=${encodeURIComponent(f.category)}`} data-cursor="view" className="group relative block h-full overflow-hidden rounded-2xl">
                  <ImageCard src={f.src} alt={f.title} className={`${f.cls.includes('row-span-2') ? 'aspect-[4/5] md:aspect-auto md:h-full md:min-h-[640px]' : 'aspect-[4/3]'}`} imgClassName="transition duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                  <span className="absolute bottom-5 left-5 font-serif text-3xl text-cream">{f.title}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand/50 section">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <ImageCard src={unsplash('photo-1606800052052-a08af7148866', 1200)} alt="Wedding rings on flowers" className="aspect-[4/5] rounded-t-[999px] rounded-b-3xl" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="h-section">We photograph what it felt like, not just what it looked like.</h2>
            <p className="mt-6 max-w-lg leading-relaxed text-charcoal/70">
              For over {siteConfig.stats.years} years our small team has stayed close to the moment: the nervous laugh before a pheras, the first weight of a newborn, a toddler's refusal to sit still. We light gently, direct lightly and edit with restraint.
            </p>
            <Link to="/about" className="btn btn-dark mt-8">Meet the studio</Link>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal className="mb-12 max-w-xl">
            <h2 className="h-section">What we shoot</h2>
            <p className="mt-3 text-stone">From the big day to the small firsts, each session is planned around your story.</p>
          </Reveal>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 8).map((s, i) => (
              <Reveal key={s.id} delay={(i % 4) * 0.08}><ServiceCard service={s} /></Reveal>
            ))}
          </div>
          <div className="mt-12 text-center"><Link to="/services" className="btn btn-line">See all 10 services</Link></div>
        </div>
      </section>

      <section className="section bg-charcoal text-cream">
        <div className="container-x">
          <Reveal className="mb-10 text-center"><h2 className="h-section">Selected frames</h2></Reveal>
          <GalleryGrid items={selected} onOpen={setLb} />
        </div>
      </section>
      <AnimatePresence>
        {lb !== null && <Lightbox items={selected} index={lb} onChange={setLb} onClose={() => setLb(null)} />}
      </AnimatePresence>

      <section className="section">
        <div className="container-x mx-auto max-w-3xl text-center">
          <Quote className="mx-auto text-clay" size={40} />
          <div className="relative mt-6 min-h-[240px]">
            <AnimatePresence mode="wait">
              <motion.blockquote key={testimonials[t].id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45 }}>
                <p className="font-serif text-3xl leading-snug sm:text-4xl">{testimonials[t].quote}</p>
                <footer className="mt-6 text-sm text-stone"><strong className="text-charcoal">{testimonials[t].name}</strong>, {testimonials[t].detail}</footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Testimonials">
            {testimonials.map((x, i) => (
              <button key={x.id} role="tab" aria-selected={i === t} aria-label={`Testimonial from ${x.name}`} onClick={() => setT(i)} className={`h-2.5 rounded-full transition-all ${i === t ? 'w-8 bg-clay' : 'w-2.5 bg-charcoal/25'}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-clay py-24 text-center text-cream">
        <div className="container-x">
          <Reveal>
            <h2 className="h-section mx-auto max-w-2xl">Your story deserves to be told beautifully.</h2>
            <p className="mx-auto mt-4 max-w-md text-cream/85">Share your date and we'll check availability and send a tailored quote.</p>
            <Link to="/booking" className="btn mt-8 bg-cream text-charcoal hover:bg-charcoal hover:text-cream">Book a Session</Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
