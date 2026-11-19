import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta'

export default function NotFound() {
  useDocumentMeta('Page not found', 'This page could not be found.')
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-serif text-[9rem] leading-none text-clay sm:text-[13rem]">404</p>
      <h1 className="text-4xl">This frame is out of focus.</h1>
      <p className="mt-3 text-stone">The page you are looking for does not exist or has moved.</p>
      <div className="mt-8 flex gap-3">
        <Link to="/" className="btn btn-dark">Back home</Link>
        <Link to="/gallery" className="btn btn-line">View portfolio</Link>
      </div>
    </section>
  )
}
