// Every business detail on the site comes from here.
const siteConfig = {
  name: 'LUMORA STUDIOS',
  shortName: 'Lumora',
  tagline: 'Every Frame Tells a Story.',
  city: 'Hyderabad, Telangana, India',
  whatsappNumber: '919876543210', // country code + number, no "+" or spaces
  phone: '+91 98765 43210',
  email: 'hello@lumorastudios.example',
  address: 'Plot 24, Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033',
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
  },
  hours: [
    ['Monday – Friday', '10:00 am – 7:00 pm'],
    ['Saturday', '10:00 am – 5:00 pm'],
    ['Sunday', 'By appointment'],
  ],
  // Paste the src from Google Maps > Share > Embed a map. Leave '' to show a placeholder.
  mapEmbedUrl: '',
  // Optional: POST booking JSON here (e.g. Formspree/your backend). Leave '' for local demo storage.
  bookingApiUrl: import.meta.env.VITE_BOOKING_API_URL || '',
  stats: { years: 12, weddings: 480, clients: 1350 },
}
export default siteConfig
