import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Pause, Play, Volume2, VolumeX, X } from 'lucide-react'
import ImageCard from './ImageCard'

export function VideoCard({ video, onOpen, large = false }) {
  return (
    <button onClick={() => onOpen(video)} data-cursor="view" className="group relative block w-full overflow-hidden rounded-2xl text-left" aria-label={`Play film: ${video.title}`}>
      <ImageCard src={video.poster} alt={video.title} className={large ? 'aspect-[16/9]' : 'aspect-video'} imgClassName="transition duration-700 group-hover:scale-105" />
      <span className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
      <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-charcoal transition group-hover:scale-110 group-hover:bg-clay group-hover:text-cream"><Play size={24} className="ml-1" /></span>
      <span className="absolute inset-x-0 bottom-0 p-5 text-cream">
        <span className="block font-serif text-2xl">{video.title}</span>
        <span className="mt-1 block text-sm text-cream/75">{video.description}</span>
      </span>
      <span className="absolute right-4 top-4 rounded-full bg-charcoal/60 px-3 py-1 text-xs text-cream">{video.duration}</span>
    </button>
  )
}

// Modal player. Never autoplays with sound: it starts muted, the viewer unmutes.
export function VideoModal({ video, onClose }) {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [volume, setVolume] = useState(0.8)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) v.play().catch(() => {}); else v.pause()
  }
  const changeVolume = (val) => {
    const v = ref.current
    setVolume(val)
    if (v) { v.volume = val; v.muted = val === 0 }
    setMuted(val === 0)
  }
  const toggleMute = () => {
    const v = ref.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] flex items-center justify-center bg-charcoal/95 p-4" role="dialog" aria-modal="true" aria-label={video.title} onClick={onClose}>
      <button onClick={onClose} aria-label="Close video" className="absolute right-4 top-4 rounded-full bg-cream/10 p-3 text-cream transition hover:bg-clay"><X size={22} /></button>
      <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <video
          ref={ref}
          src={video.src}
          poster={video.poster}
          muted
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onClick={toggle}
          className="aspect-video w-full rounded-xl bg-black"
        />
        <div className="mt-4 flex flex-wrap items-center gap-4 text-cream">
          <button onClick={toggle} aria-label={playing ? 'Pause' : 'Play'} className="rounded-full bg-clay p-3 transition hover:bg-cream hover:text-charcoal">{playing ? <Pause size={20} /> : <Play size={20} />}</button>
          <button onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'} className="rounded-full border border-cream/40 p-3 transition hover:bg-cream hover:text-charcoal">{muted ? <VolumeX size={20} /> : <Volume2 size={20} />}</button>
          <input type="range" min="0" max="1" step="0.05" value={muted ? 0 : volume} onChange={(e) => changeVolume(Number(e.target.value))} aria-label="Volume" className="w-28 accent-[#B5603F]" />
          <div className="ml-auto text-right">
            <p className="font-serif text-xl">{video.title}</p>
            <p className="text-sm text-cream/70">{video.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default VideoCard
