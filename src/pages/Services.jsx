import { Link } from 'react-router-dom'
import ServiceCarousel from '../components/ServiceCarousel'
import services from '../data/services'
import useDocumentMeta from '../hooks/useDocumentMeta'

export default function Services() {
  useDocumentMeta('What We Shoot', 'Wedding, pre-wedding, engagement, maternity, newborn, baby, birthday, toddler, modelling and family photography in Hyderabad.')
  return (
    <>
      <section className="overflow-hidden pb-24 pt-36">
        <div className="container-x mb-10 text-center">
          <h1 className="h-display">What we shoot</h1>
          <p className="mx-auto mt-4 max-w-md text-stone">Ten kinds of sessions, one consistent way of seeing.</p>
        </div>
        <ServiceCarousel services={services} />
      </section>
      <section className="bg-sand/50 py-16 text-center">
        <p className="font-serif text-3xl">Not sure which session fits?</p>
        <Link to="/contact" className="btn btn-dark mt-6">Talk to us</Link>
      </section>
    </>
  )
}
