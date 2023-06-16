import { useEffect, useRef, useState } from 'react'
import useTest from '../Hooks/useTest'
import './Footer.css'

export function Footer () {
  const { test } = useTest()
  const imgId = useRef()
  const [isOnHover, setIsOnHover] = useState(false)
  useEffect(() => {
    if (isOnHover) {
      imgId.current?.parentElement?.classList.add('footer-img-hover')
    } else {
      imgId.current?.parentElement?.classList.remove('footer-img-hover')
    }
  }, [isOnHover])

  // img on hover: footer 100% width, texto vertical-align: top;
  const handleMouseEnter = () => setIsOnHover(true)
  const handleMouseLeave = () => setIsOnHover(false)
  
  const isAnImg = () => {
    if (typeof test != 'string') return false
    const src = test.split(import.meta.env.VITE_URL_API)[1]
    const imgPath = '/img/'
    if (!src.startsWith(imgPath)) return false
    return true
  }

  return (test &&
    <footer className='test-footer'  onMouseLeave={handleMouseLeave}>
      <img ref={imgId} src={isAnImg() ? test : '/info.png'} onMouseEnter={handleMouseEnter} />
      <span className='footer-text'>{JSON.stringify(test)}</span>
    </footer>
  )
}