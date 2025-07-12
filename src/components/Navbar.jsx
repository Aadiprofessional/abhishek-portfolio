import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBars, 
  faTimes, 
  faHome, 
  faUser, 
  faCode, 
  faBriefcase, 
  faEnvelope,
  faRocket,
  faDownload
} from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Set active section based on current route
    const path = location.pathname
    if (path === '/') setActiveSection('home')
    else if (path === '/about') setActiveSection('about')
    else if (path.includes('/projects')) setActiveSection('projects')
    else if (path === '/experience') setActiveSection('experience')
    else if (path === '/contact') setActiveSection('contact')
  }, [location])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const navItems = [
    { name: 'Home', path: '/', icon: faHome, id: 'home' },
    { name: 'About', path: '/about', icon: faUser, id: 'about' },
    { name: 'Projects', path: '/projects', icon: faCode, id: 'projects' },
    { name: 'Experience', path: '/experience', icon: faBriefcase, id: 'experience' },
    { name: 'Contact', path: '/contact', icon: faEnvelope, id: 'contact' }
  ]

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const itemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: (index) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  }

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'glass-ultra py-3 shadow-2xl' 
            : 'glass py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3"
            >
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <FontAwesomeIcon 
                    icon={faRocket} 
                    className="text-white text-lg group-hover:rotate-12 transition-transform duration-300" 
                  />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-white">Aadi</h1>
                  <p className="text-xs text-gray-400 -mt-1">Software Engineer</p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Link
                    to={item.path}
                    className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                      activeSection === item.id
                        ? 'text-white bg-white/10 shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <FontAwesomeIcon icon={item.icon} className="text-sm" />
                    <span>{item.name}</span>
                    
                    {/* Active indicator */}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-white/20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center space-x-2 text-sm font-semibold"
              >
                <FontAwesomeIcon icon={faDownload} />
                <span>Resume</span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="lg:hidden w-10 h-10 rounded-xl glass-strong flex items-center justify-center text-white hover:text-blue-400 transition-colors duration-300"
            >
              <FontAwesomeIcon 
                icon={isOpen ? faTimes : faBars} 
                className="text-lg transition-transform duration-300"
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={closeMenu}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed top-0 right-0 h-full w-80 glass-ultra z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <FontAwesomeIcon icon={faRocket} className="text-white text-lg" />
                      </div>
                      <div>
                        <h1 className="text-lg font-bold text-white">Aadi</h1>
                        <p className="text-xs text-gray-400 -mt-1">Software Engineer</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={closeMenu}
                      className="w-8 h-8 rounded-lg glass flex items-center justify-center text-white hover:text-red-400 transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </motion.button>
                  </div>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 p-6 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={item.path}
                        onClick={closeMenu}
                        className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 ${
                          activeSection === item.id
                            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-white/20 shadow-lg'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                          activeSection === item.id
                            ? 'bg-white/20 text-blue-400'
                            : 'bg-white/5 text-gray-400'
                        }`}>
                          <FontAwesomeIcon icon={item.icon} />
                        </div>
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {item.name === 'Home' && 'Welcome & Overview'}
                            {item.name === 'About' && 'My Story & Skills'}
                            {item.name === 'Projects' && 'Featured Work'}
                            {item.name === 'Experience' && 'Career Journey'}
                            {item.name === 'Contact' && 'Get In Touch'}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary flex items-center justify-center space-x-2 text-sm font-semibold"
                  >
                    <FontAwesomeIcon icon={faDownload} />
                    <span>Download Resume</span>
                  </motion.button>
                  
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-400">
                      © 2024 Abhishek Srivastava
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Made with ❤️ in Hong Kong
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar 