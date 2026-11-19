import { unsplash } from './images'

// To add a photo: add a line [photo-id-or-full-url, category, shape, alt text].
// shape: 'tall' | 'wide' | 'square' – controls the masonry height.
// Categories: Weddings, Pre-Wedding, Newborn, Toddlers, Maternity, Birthday, Modelling
const raw = [
  ['photo-1583939003579-730e3918a45a', 'Weddings', 'tall', 'Indian bride in red lehenga'],
  ['photo-1519741497674-611481863552', 'Weddings', 'wide', 'Wedding couple celebrating'],
  ['photo-1606800052052-a08af7148866', 'Weddings', 'square', 'Wedding rings and flowers'],
  ['photo-1604017011826-d3b4c23f8914', 'Weddings', 'tall', 'Bride and groom ceremony'],
  ['photo-1511285560929-80b456fea0bc', 'Weddings', 'wide', 'Wedding table décor'],
  ['photo-1537633552985-df8429e8048b', 'Pre-Wedding', 'tall', 'Couple portrait at golden hour'],
  ['photo-1529634806980-85c3dd6d34ac', 'Pre-Wedding', 'square', 'Couple walking together'],
  ['photo-1522673607200-164d1b6ce486', 'Pre-Wedding', 'wide', 'Couple embracing outdoors'],
  ['photo-1544005313-94ddf0286df2', 'Modelling', 'tall', 'Portrait of a woman'],
  ['photo-1515886657613-9f3515b0c78f', 'Modelling', 'tall', 'Fashion portrait'],
  ['photo-1524504388940-b1c1722653e1', 'Modelling', 'square', 'Studio model portrait'],
  ['photo-1492562080023-ab3db95bfbce', 'Modelling', 'wide', 'Editorial portrait'],
  ['photo-1544126592-807ade215a0b', 'Newborn', 'square', 'Sleeping newborn baby'],
  ['photo-1555252333-9f8e92e65df9', 'Newborn', 'tall', 'Newborn in soft blanket'],
  ['photo-1519689680058-324335c77eba', 'Newborn', 'wide', 'Baby portrait'],
  ['photo-1503454537195-1dcabb73ffb9', 'Toddlers', 'tall', 'Toddler smiling'],
  ['photo-1471286174890-9c112ffca5b4', 'Toddlers', 'square', 'Toddler playing outdoors'],
  ['photo-1476703993599-0035a21b17a9', 'Toddlers', 'wide', 'Child in a field'],
  ['photo-1493894473891-10fc1e5dbd22', 'Maternity', 'tall', 'Maternity portrait'],
  ['photo-1531983412531-1f49a365ffed', 'Maternity', 'square', 'Expecting mother at sunset'],
  ['photo-1464349153735-7db50ed83c84', 'Birthday', 'wide', 'Birthday celebration with balloons'],
  ['photo-1530103862676-de8c9debad1d', 'Birthday', 'tall', 'Birthday cake and candles'],
]

const sizes = { tall: 1200, wide: 900, square: 900 }

const gallery = raw.map(([id, category, shape, alt], i) => ({
  id: i + 1,
  category,
  shape,
  alt,
  src: id.startsWith('http') ? id : unsplash(id, sizes[shape]),
  full: id.startsWith('http') ? id : unsplash(id, 1800),
}))

export const categories = ['All', 'Weddings', 'Pre-Wedding', 'Newborn', 'Toddlers', 'Maternity', 'Birthday', 'Modelling']
export const aspectClass = { tall: 'aspect-[3/4]', wide: 'aspect-[4/3]', square: 'aspect-square' }
export default gallery
