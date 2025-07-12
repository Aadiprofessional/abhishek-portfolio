import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const BottomNavbar = () => {
  const [isVisible, setIsVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'MG', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Work', path: '/projects' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
     <motion.nav
  initial={{ y: 100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  exit={{ y: 100, opacity: 0 }}
  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
  className="fixed bottom-6 right-1/2 z-50"
  style={{ marginRight: '-200px' }} // adjust this value based on your navbar width
>
  <div className="flex items-center gap-6 px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl">
    {navItems.map((item) => (
      <Link
        key={item.name}
        to={item.path}
        className={`text-white text-sm font-medium transition duration-200 hover:text-white/80 ${
          location.pathname === item.path ? 'underline underline-offset-4' : ''
        }`}
      >
        {item.name === 'MG' ? (
          <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center text-white text-sm font-bold">
            MG
          </div>
        ) : (
          item.name
        )}
      </Link>
    ))}
  </div>
</motion.nav>


      )}
    </AnimatePresence>
  )
}

export default BottomNavbar
