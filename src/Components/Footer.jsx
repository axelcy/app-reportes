import useTest from '../Hooks/useTest'
import './Footer.css'

export function Footer () {
  const { test } = useTest()

  return (test &&
    <footer className='test-footer'>
      <span>{JSON.stringify(test)}</span>
    </footer>
  )
}