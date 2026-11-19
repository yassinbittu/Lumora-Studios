import { Link } from 'react-router-dom'
import { Heart, Eye, Sparkles, Clock } from 'lucide-react'
import Reveal from '../components/Reveal'
import ImageCard from '../components/ImageCard'
import { unsplash } from '../data/images'
import siteConfig from '../config/siteConfig'
import useDocumentMeta from '../hooks/useDocumentMeta'

const team = [
  { name: 'Aditya Rao', role: 'Lead photographer, weddings', bio: 'Trained in photojournalism; he reads a room before he lifts the camera.', src: unsplash('photo-1507003211169-0a1dd7228f2d', 900) },
  { name: 'Nisha Menon', role: 'Newborn & family photographer', bio: 'Patient, soft-spoken and endlessly creative with the smallest clients.', src: unsplash('photo-1494790108377-be9c29b29330', 900) },
  { name: 'Farhan Ali', role: 'Cinematographer & editor', bio: 'Turns three days of footage into four minutes that make people cry happily.', src: unsplash('photo-1500648767791-00dcc994a43e', 900) },
]
const journey = [
  ['2014', 'Aditya shoots his first wedding with a borrowed camera in Secunderabad.'],
  ['2017', 'Lumora Studios opens its Jubilee Hills studio.'],
  ['2020', 'Newborn and family photography joins the studio.'],
  ['2023', 'Our films team launches, and we cross 400 weddings.'],
  ['Today', 'A team of twelve, still shooting every story as if it were our first.'],
]
const why = [
  [Eye, 'Candid by design', 'We direct gently and shoot the moments in between.'],
  [Heart, 'Family-safe sessions', 'Trained, patient handling for newborns and toddlers.'],
  [Sparkles, 'Consistent editing', 'A warm, timeless palette that will not date.'],
  [Clock, 'Delivered on time', 'Previews in 48 hours, full gallery in three weeks.'],
]

export default function About() {
  useDocumentMeta('About', 'Meet the photographers of Lumora Studios, Hyderabad – our philosophy, journey and why couples and families choose us.')
  const stats = [[`${siteConfig.stats.years}+`, 'Years of experience'], [`${siteConfig.stats.weddings}+`, 'Weddings captured'], [`${siteConfig.stats.clients.toLocaleString('en-IN')}+`, 'Happy clients']]
  return (
    <>
      <section className="grid min-h-screen lg:grid-cols-2">
        <div className="flex items-center bg-sand/60 px-5 pb-16 pt-36 sm:px-12 lg:pt-20">
          <div className="max-w-lg lg:ml-auto lg:pr-8">
            <h1 className="h-display">A studio built on paying attention.</h1>
            <p className="mt-6 leading-relaxed text-charcoal/70">{siteConfig.name} began with a simple belief: the best photographs are not arranged, they are noticed. From Hyderabad, we photograph weddings, newborns and families with patience, warm light and a lot of listening.</p>
            <Link to="/booking" className="btn btn-dark mt-8">Book a session</Link>
          </div>
        </div>
        <ImageCard src={unsplash('photo-1519741497674-611481863552', 1400)} alt="Couple at their wedding" className="min-h-[60vh] lg:min-h-full" eager />
      </section>

      <section className="section">
        <div className="container-x grid gap-10 sm:grid-cols-3">
          {stats.map(([n, l], i) => (
            <Reveal key={l} delay={i * 0.1} className="border-t border-charcoal/20 pt-6">
              <p className="font-serif text-6xl text-clay">{n}</p>
              <p className="mt-2 text-stone">{l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section bg-charcoal text-cream">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <ImageCard src={unsplash('photo-1537633552985-df8429e8048b', 1200)} alt="Couple at golden hour" className="aspect-[4/5] rounded-2xl" />
          <Reveal>
            <h2 className="h-section">Our philosophy</h2>
            <p className="mt-6 max-w-lg leading-relaxed text-cream/75">We do not chase trends. We chase honesty: the tilt of a head, a grandmother's hand on a shoulder, a baby's first yawn. Every frame is lit simply, composed with care and edited so that the people in it still look like themselves.</p>
            <p className="mt-4 max-w-lg leading-relaxed text-cream/75">Your photographs should feel the same in thirty years as they do today.</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal><h2 className="h-section mb-12">The people behind the lens</h2></Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {team.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <ImageCard src={p.src} alt={`Portrait of ${p.name}`} className="aspect-[4/5] rounded-2xl" />
                <h3 className="mt-4 text-2xl">{p.name}</h3>
                <p className="text-sm text-clay">{p.role}</p>
                <p className="mt-2 text-sm text-stone">{p.bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-sand/50">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <h2 className="h-section">Our journey</h2>
          <ol className="space-y-8 border-l border-clay/40 pl-8">
            {journey.map(([y, t]) => (
              <li key={y} className="relative">
                <span className="absolute -left-[37px] top-2 h-3 w-3 rounded-full bg-clay" />
                <p className="font-serif text-3xl">{y}</p>
                <p className="text-stone">{t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <h2 className="h-section mb-12">Why choose us</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {why.map(([Icon, t, d], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <Icon className="text-clay" size={30} />
                <h3 className="mt-4 text-2xl">{t}</h3>
                <p className="mt-1 text-sm text-stone">{d}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 text-center"><Link to="/booking" className="btn btn-clay">Book a session</Link></div>
        </div>
      </section>
    </>
  )
}
