import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { VideoCard, VideoModal } from '../components/VideoCard'
import videos from '../data/videos'
import useDocumentMeta from '../hooks/useDocumentMeta'

export default function Films() {
  useDocumentMeta('Wedding Films', 'Cinematic wedding and pre-wedding films by Lumora Studios, Hyderabad.')
  const [open, setOpen] = useState(null)
  return (
    <section className="bg-charcoal pb-24 pt-36 text-cream">
      <div className="container-x">
        <h1 className="h-display">Films</h1>
        <p className="mt-4 max-w-md text-cream/70">Short, cinematic films that sound as good as they look. Press play when you are ready for sound.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2"><VideoCard video={videos[0]} onOpen={setOpen} large /></div>
          {videos.slice(1).map((v) => <VideoCard key={v.id} video={v} onOpen={setOpen} />)}
        </div>
      </div>
      <AnimatePresence>{open && <VideoModal video={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  )
}
