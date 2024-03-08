import { useEffect, useRef, useState } from 'react'

export const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const throttleInProgress = useRef()

  useEffect(() => {
    const resizeHandler = () => {
      if (throttleInProgress.current) {
        return
      }

      throttleInProgress.current = true
      setTimeout(() => {
        setWidth(window.innerWidth)
        throttleInProgress.current = false
      }, 500)
    }

    window.addEventListener('resize', resizeHandler)

    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  return { width }
}
