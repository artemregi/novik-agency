import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="custom-cursor">
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}
