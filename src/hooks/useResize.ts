import { useEffect, useState } from 'react'

const useResize = () => {
  const [width, setwidth] = useState(window.innerWidth < 900)

  function size() {
    setwidth(window.innerWidth < 900)
  }
  useEffect(() => {
    window.addEventListener('resize', size)
    return () => window.removeEventListener('resize', size)
  }, [])

  return width
}

export default useResize
