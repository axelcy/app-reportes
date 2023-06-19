import { useEffect, useRef, useState } from 'react'
import useFooter from '../Hooks/useFooter'
import './Footer.css'

export function Footer () {
  const { footer } = useFooter()
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
    if (typeof footer != 'string') return false
    // const src = footer.split(import.meta.env.VITE_URL_API)[1]
    const imgPath = '/img/'
    if (!footer.startsWith(import.meta.env.VITE_URL_API + imgPath)) return false
    return true
  }

  return (footer &&
    <footer className='test-footer'  onMouseLeave={handleMouseLeave}>
      <img ref={imgId} src={isAnImg() ? footer : '/logo.png'} onMouseEnter={handleMouseEnter} />
      <span className='footer-text'>{typeof footer == 'string' ? footer : JSON.stringify(footer)}</span>
    </footer>
  )
}