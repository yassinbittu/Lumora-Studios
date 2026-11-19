import { unsplash } from './images'

// Replace "src" with your own MP4 URLs (or files in /public/videos, e.g. '/videos/ananya.mp4').
const base = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/'
const videos = [
  { id: 1, title: 'Ananya & Rohit – Wedding Film', description: 'A three-day celebration in Hyderabad, told in four minutes.', duration: '4:12', src: base + 'ForBiggerBlazes.mp4', poster: unsplash('photo-1519741497674-611481863552', 1400) },
  { id: 2, title: 'Karthik & Divya – Pre-Wedding', description: 'Golden hour, old forts and quiet laughter.', duration: '2:48', src: base + 'ForBiggerJoyrides.mp4', poster: unsplash('photo-1537633552985-df8429e8048b', 1400) },
  { id: 3, title: 'Baby Aarav – First Month', description: 'A tender short film for a brand-new family.', duration: '1:55', src: base + 'ForBiggerEscapes.mp4', poster: unsplash('photo-1544126592-807ade215a0b', 1400) },
]
export default videos
