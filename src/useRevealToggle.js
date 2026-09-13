import { useEffect, useRef, useState } from 'react'

// Like useReveal, but keeps observing and flips both ways instead of
// disconnecting after the first trigger — for effects that should
// disappear again when scrolled back out of view.
export function useRevealToggle(options) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: '0px 0px -15% 0px', ...options },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}
