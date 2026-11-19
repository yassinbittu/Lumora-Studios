import { unsplash } from './images'

// To add a service: copy one object. "category" links View Gallery to a gallery filter.
const services = [
  { id: 'wedding', title: 'Wedding Photography', category: 'Weddings', image: unsplash('photo-1583939003579-730e3918a45a', 900), description: 'Full-day coverage of every ritual, glance and celebration, delivered as a story you can relive.' },
  { id: 'pre-wedding', title: 'Pre-Wedding Photography', category: 'Pre-Wedding', image: unsplash('photo-1537633552985-df8429e8048b', 900), description: 'Relaxed, cinematic couple sessions at locations that feel like you.' },
  { id: 'engagement', title: 'Engagement Photography', category: 'Pre-Wedding', image: unsplash('photo-1522673607200-164d1b6ce486', 900), description: 'Ring ceremonies and engagement portraits with warmth and elegance.' },
  { id: 'maternity', title: 'Maternity Photography', category: 'Maternity', image: unsplash('photo-1493894473891-10fc1e5dbd22', 900), description: 'Soft, graceful portraits that celebrate the wait before your little one arrives.' },
  { id: 'newborn', title: 'Newborn Photography', category: 'Newborn', image: unsplash('photo-1555252333-9f8e92e65df9', 900), description: 'Gentle, safe sessions in the first weeks, with natural light and quiet patience.' },
  { id: 'baby', title: 'Baby Photography', category: 'Newborn', image: unsplash('photo-1519689680058-324335c77eba', 900), description: 'Milestone portraits from first smiles to first steps.' },
  { id: 'birthday', title: 'Birthday Photography', category: 'Birthday', image: unsplash('photo-1530103862676-de8c9debad1d', 900), description: 'Candid party coverage plus styled portraits of the birthday star.' },
  { id: 'toddler', title: 'Toddler Photography', category: 'Toddlers', image: unsplash('photo-1503454537195-1dcabb73ffb9', 900), description: 'Playful, unposed sessions that capture real personality.' },
  { id: 'modelling', title: 'Modelling & Portfolio Photography', category: 'Modelling', image: unsplash('photo-1515886657613-9f3515b0c78f', 900), description: 'Polished portfolios and editorial looks for models and creators.' },
  { id: 'family', title: 'Family Photography', category: 'Toddlers', image: unsplash('photo-1476703993599-0035a21b17a9', 900), description: 'Generations together, photographed naturally and beautifully.' },
]
export default services
