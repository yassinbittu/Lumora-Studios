import { useState } from 'react'

// Lazy-loaded image with a soft placeholder and graceful fallback if the URL fails.
export default function ImageCard({ src, alt, className = '', imgClassName = '', eager = false }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      {failed ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sand to-clay/30 p-4 text-center font-serif text-lg italic text-stone">
          {alt}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        />
      )}
    </div>
  )
}
