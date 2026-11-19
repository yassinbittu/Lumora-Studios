import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, MessageCircle } from 'lucide-react'
import services from '../data/services'
import siteConfig from '../config/siteConfig'

const budgets = ['Under ₹25,000', '₹25,000 – ₹50,000', '₹50,000 – ₹1,00,000', '₹1,00,000 – ₹2,50,000', 'Above ₹2,50,000', 'Not sure yet']
const empty = { name: '', mobile: '', email: '', service: '', date: '', location: '', budget: '', message: '' }

const validate = (v) => {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Enter your full name.'
  const digits = v.mobile.replace(/[\s-]/g, '').replace(/^(\+91|91|0)/, '')
  if (!/^[6-9]\d{9}$/.test(digits)) e.mobile = 'Enter a valid 10-digit Indian mobile number.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = 'Enter a valid email address.'
  if (!v.service) e.service = 'Choose a photography service.'
  if (!v.date) e.date = 'Choose your event date.'
  else {
    const d = new Date(v.date)
    const today = new Date(); today.setHours(0, 0, 0, 0)
    if (Number.isNaN(d.getTime()) || d < today) e.date = 'Choose a date that is today or later.'
  }
  if (v.location.trim().length < 2) e.location = 'Enter the event location.'
  return e
}

export const buildWhatsAppUrl = (v) => {
  const text = [
    `*New Photography Enquiry – ${siteConfig.name}*`,
    '',
    `*Name:* ${v.name}`,
    `*Mobile:* ${v.mobile}`,
    `*Email:* ${v.email}`,
    `*Service:* ${v.service}`,
    `*Event date:* ${v.date}`,
    `*Location:* ${v.location}`,
    `*Budget:* ${v.budget || 'Not specified'}`,
    `*Message:* ${v.message || '–'}`,
  ].join('\n')
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`
}

function Field ({ id, label, error, children }) {
  return (
  <div>
    <label htmlFor={`bk-${id}`} className="mb-1.5 block text-sm font-medium">{label}</label>
    {children}
    {error && <p className="mt-1 text-xs text-clay" role="alert">{error}</p>}
  </div>
)
}

export default function BookingForm({ defaultService = '' }) {
  const [values, setValues] = useState({ ...empty, service: defaultService })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(null)
  const [busy, setBusy] = useState(false)

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length) {
      document.getElementById(`bk-${Object.keys(errs)[0]}`)?.focus()
      return
    }
    setBusy(true)
    const record = { ...values, submittedAt: new Date().toISOString() }
    try {
      // Demo storage: browser localStorage. Swap for a real API via siteConfig.bookingApiUrl.
      const all = JSON.parse(localStorage.getItem('lumora_enquiries') || '[]')
      localStorage.setItem('lumora_enquiries', JSON.stringify([...all, record]))
    } catch { /* storage unavailable – ignore */ }
    if (siteConfig.bookingApiUrl) {
      try {
        await fetch(siteConfig.bookingApiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(record) })
      } catch { /* network error – WhatsApp still opens */ }
    }
    const url = buildWhatsAppUrl(values)
    window.open(url, '_blank', 'noopener')
    setSent({ url, name: values.name.split(' ')[0] })
    setValues({ ...empty })
    setBusy(false)
  }

  const cls = (k) => `field ${errors[k] ? '!border-clay' : ''}`

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl bg-white p-10 text-center shadow-xl shadow-charcoal/5" role="status">
          <CheckCircle2 size={56} className="mx-auto text-clay" />
          <h3 className="mt-5 text-4xl">Thank you, {sent.name}.</h3>
          <p className="mx-auto mt-3 max-w-md text-stone">Your enquiry is saved and WhatsApp has opened with the details. If it did not open, use the button below. We reply within one working day.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={sent.url} target="_blank" rel="noreferrer" className="btn btn-clay"><MessageCircle size={18} />Open WhatsApp</a>
            <button onClick={() => setSent(null)} className="btn btn-line">Send another enquiry</button>
          </div>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={submit} noValidate className="grid gap-5 rounded-3xl bg-white p-6 shadow-xl shadow-charcoal/5 sm:grid-cols-2 sm:p-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Field id="name" label="Full name *" error={errors.name}><input id="bk-name" className={cls('name')} value={values.name} onChange={set('name')} autoComplete="name" /></Field>
          <Field id="mobile" label="Mobile number *" error={errors.mobile}><input id="bk-mobile" type="tel" inputMode="tel" placeholder="98765 43210" className={cls('mobile')} value={values.mobile} onChange={set('mobile')} autoComplete="tel" /></Field>
          <Field id="email" label="Email address *" error={errors.email}><input id="bk-email" type="email" className={cls('email')} value={values.email} onChange={set('email')} autoComplete="email" /></Field>
          <Field id="service" label="Photography service *" error={errors.service}>
            <select id="bk-service" className={cls('service')} value={values.service} onChange={set('service')}>
              <option value="">Select a service</option>
              {services.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
            </select>
          </Field>
          <Field id="date" label="Event date *" error={errors.date}><input id="bk-date" type="date" min={new Date().toISOString().split('T')[0]} className={cls('date')} value={values.date} onChange={set('date')} /></Field>
          <Field id="location" label="Event location *" error={errors.location}><input id="bk-location" className={cls('location')} value={values.location} onChange={set('location')} placeholder="Venue or city" /></Field>
          <div className="sm:col-span-2">
            <Field id="budget" label="Estimated budget">
              <select id="bk-budget" className="field" value={values.budget} onChange={set('budget')}>
                <option value="">Select a range</option>
                {budgets.map((b) => <option key={b}>{b}</option>)}
              </select>
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field id="message" label="Additional message"><textarea id="bk-message" rows="4" className="field" value={values.message} onChange={set('message')} placeholder="Tell us about the occasion, style you like, number of guests…" /></Field>
          </div>
          <button type="submit" disabled={busy} className="btn btn-dark sm:col-span-2">{busy ? 'Sending…' : 'Send enquiry on WhatsApp'}</button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
