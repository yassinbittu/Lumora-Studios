import { useEffect, useState } from 'react'

export default function useWindowWidth() {
  const [w, setW] = useState(typeof window === 'undefined' ? 1200 : window.innerWidth)
  useEffect(() => {
    const onResize = () => setW(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return w
}
