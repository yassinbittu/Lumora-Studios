import { Link } from 'react-router-dom'
import ImageCard from './ImageCard'

// Compact card used on the homepage services grid.
export default function ServiceCard({ service }) {
  return (
    <Link to={`/gallery?cat=${encodeURIComponent(service.category)}`} data-cursor="view" className="group block">
      <ImageCard src={service.image} alt={service.title} className="aspect-[4/5] rounded-2xl" imgClassName="transition duration-700 group-hover:scale-105" />
      <h3 className="mt-4 text-2xl transition group-hover:text-clay">{service.title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-stone">{service.description}</p>
    </Link>
  )
}
