import { useState } from 'react'
import { Clock, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import siteConfig from '../config/siteConfig'
import useDocumentMeta from '../hooks/useDocumentMeta'

export default function Contact() {
  useDocumentMeta('Contact', 'Call, email or visit Lumora Studios in Jubilee Hills, Hyderabad.')
  const [f, setF] = useState({ name: '', email: '', message: '' })
  const [err, setErr] = useState('')
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    if (!f.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email) || f.message.trim().length < 5) {
      setErr('Please enter your name, a valid email and a short message.')
      return
    }
    setErr('')
    const text = `*Message from website – ${siteConfig.name}*\n\n*Name:* ${f.name}\n*Email:* ${f.email}\n*Message:* ${f.message}`
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    setF({ name: '', email: '', message: '' })
  }
  const wa = `https://wa.me/${siteConfig.whatsappNumber}`
  const info = [
    [Phone, 'Call', siteConfig.phone, `tel:${siteConfig.phone.replace(/\s/g, '')}`],
    [Mail, 'Email', siteConfig.email, `mailto:${siteConfig.email}`],
    [MapPin, 'Studio', siteConfig.address, null],
  ]
  return (
    <section className="pb-24 pt-36">
      <div className="container-x">
        <h1 className="h-display">Say hello</h1>
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            {info.map(([Icon, label, val, href]) => (
              <div key={label} className="flex gap-4">
                <Icon className="mt-1 shrink-0 text-clay" size={22} />
                <div><p className="text-sm text-stone">{label}</p>{href ? <a href={href} className="text-lg hover:text-clay">{val}</a> : <p className="text-lg">{val}</p>}</div>
              </div>
            ))}
            <div className="flex gap-4">
              <Clock className="mt-1 shrink-0 text-clay" size={22} />
              <div className="w-full max-w-xs"><p className="text-sm text-stone">Business hours</p>
                {siteConfig.hours.map(([d, h]) => <p key={d} className="flex justify-between gap-4"><span>{d}</span><span className="text-stone">{h}</span></p>)}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={wa} target="_blank" rel="noreferrer" className="btn btn-clay"><MessageCircle size={18} />WhatsApp us</a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="btn btn-line" aria-label="Instagram"><Instagram size={18} />Instagram</a>
              <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" className="btn btn-line" aria-label="Facebook"><Facebook size={18} />Facebook</a>
            </div>
          </div>

          <form onSubmit={submit} noValidate className="space-y-4 rounded-3xl bg-white p-6 shadow-xl shadow-charcoal/5 sm:p-8">
            <h2 className="text-3xl">Send a message</h2>
            <div><label htmlFor="c-name" className="mb-1 block text-sm">Name</label><input id="c-name" className="field" value={f.name} onChange={set('name')} /></div>
            <div><label htmlFor="c-email" className="mb-1 block text-sm">Email</label><input id="c-email" type="email" className="field" value={f.email} onChange={set('email')} /></div>
            <div><label htmlFor="c-msg" className="mb-1 block text-sm">Message</label><textarea id="c-msg" rows="4" className="field" value={f.message} onChange={set('message')} /></div>
            {err && <p role="alert" className="text-sm text-clay">{err}</p>}
            <button className="btn btn-dark w-full">Send via WhatsApp</button>
          </form>
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl bg-sand">
          {siteConfig.mapEmbedUrl ? (
            <iframe title="Studio location map" src={siteConfig.mapEmbedUrl} loading="lazy" className="h-[420px] w-full border-0" />
          ) : (
            <div className="flex h-[320px] flex-col items-center justify-center gap-2 p-6 text-center text-stone">
              <MapPin size={32} className="text-clay" />
              <p className="font-serif text-2xl text-charcoal">Google Maps embed goes here</p>
              <p className="text-sm">Set <code>mapEmbedUrl</code> in src/config/siteConfig.js.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
