// Helper: build an Unsplash URL from a photo id. Replace with your own URLs any time.
export const unsplash = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`
