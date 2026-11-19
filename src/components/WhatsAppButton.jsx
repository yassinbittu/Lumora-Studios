import { MessageCircle } from 'lucide-react'
import siteConfig from '../config/siteConfig'

export default function WhatsAppButton() {
  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hi ${siteConfig.shortName} Studios, I'd like to know more about your photography services.`)}`
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-110"
    >
      <MessageCircle size={26} />
    </a>
  )
}
