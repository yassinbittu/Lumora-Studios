import { useEffect } from 'react'
import siteConfig from '../config/siteConfig'

// Sets page <title> and meta description for each route (SEO-friendly).
export default function useDocumentMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${siteConfig.shortName} Studios` : `${siteConfig.name} – ${siteConfig.tagline}`
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    if (description) meta.content = description
  }, [title, description])
}
