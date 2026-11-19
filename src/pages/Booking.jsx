import { useSearchParams } from 'react-router-dom'
import BookingForm from '../components/BookingForm'
import siteConfig from '../config/siteConfig'
import useDocumentMeta from '../hooks/useDocumentMeta'

export default function Booking() {
  useDocumentMeta('Book a Session', 'Send a photography enquiry to Lumora Studios in Hyderabad and get a reply within one working day.')
  const [params] = useSearchParams()
  return (
    <section className="bg-sand/50 pb-24 pt-36">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h1 className="h-display">Let's plan your session.</h1>
          <p className="mt-5 max-w-sm leading-relaxed text-charcoal/70">Tell us about the occasion. Your details open as a ready-to-send WhatsApp message, and we reply within one working day with availability and a quote.</p>
          <p className="mt-8 text-sm text-stone">Prefer to talk? Call <a className="text-clay underline" href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>{siteConfig.phone}</a>.</p>
        </div>
        <BookingForm defaultService={params.get('service') || ''} />
      </div>
    </section>
  )
}
