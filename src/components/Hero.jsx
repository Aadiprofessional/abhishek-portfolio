import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import humanImage from '../assets/human.avif'

const Hero = () => {
 const scrollRef = useRef(null)
  const [showLinkTree, setShowLinkTree] = useState(false)

 useEffect(() => {
    const el = scrollRef.current
    if (el) {
      const animation = el.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-50%)' }
      ], {
        duration: 10000, // adjust speed here
        iterations: Infinity,
        easing: 'linear'
      })

      return () => animation.cancel()
    }
  }, [])

  const name = "ABHISHEK SRIVASTAVA"


  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#EBEBEA' }}>
      {/* Header with white background - rounded rectangle with negative margins and shadow */}
<header className="fixed top-3 left-3 right-3 z-30 bg-white py-2 px-4 flex justify-between items-center rounded-lg shadow-sm">
  <div className="flex items-center">
    <div className="w-6 h-6 bg-black flex items-center justify-center text-white text-xs font-bold mr-2">
      MC
    </div>
    <span className="text-sm font-medium text-black leading-none">
      CREATIVE NOMAD, DESIGNING DIGITAL PRODUCTS & BRANDS.
    </span>
  </div>
  <button 
    className="px-3 py-1 text-sm flex items-center text-black font-medium gap-1"
    onClick={() => setShowLinkTree(!showLinkTree)}
  >
    <FontAwesomeIcon icon={faExternalLinkAlt} />
    LINK TREE
  </button>
</header>



      {/* Link Tree Header - Appears with animation when button is clicked */}
<AnimatePresence>
  {showLinkTree && (
    <motion.div 
     className="fixed top-[-10px] left-0 right-0 z-50 bg-[#EBEAEB] py-8 px-6 flex justify-center items-center rounded-b-lg shadow-md"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="w-full max-w-[1440px] flex items-center justify-between gap-6 px-6">
        {/* Link Buttons */}
        <div className="flex flex-1 flex-row items-center justify-between gap-6">
          {[
            { name: 'Instagram', link: 'https://instagram.com' },
            { name: 'Webflow', link: 'https://webflow.com' },
            { name: 'My course', link: '#course' },
            { name: 'Twitter', link: 'https://twitter.com' },
          ].map(({ name, link }) => (
            <a
              key={name}
              href={link}
              target={link.startsWith('http') ? "_blank" : undefined}
              rel={link.startsWith('http') ? "noopener noreferrer" : undefined}
              className="relative flex-1 px-6 py-3 border border-black flex items-center justify-between overflow-hidden text-black group transition-all duration-300 rounded-md"
            >
              {/* Background animation */}
              <span className="absolute inset-0 bg-black translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></span>

              {/* Text */}
              <span className="relative z-10 group-hover:text-white transition-all duration-300 group-hover:translate-x-[1.5px]">
                {name}
              </span>

              {/* Arrow */}
              <span className="relative z-10 group-hover:text-white transition-all duration-300 group-hover:-translate-x-[15px]">
                ↗
              </span>
            </a>
          ))}
        </div>

        {/* Close Button */}
        <button 
          onClick={() => setShowLinkTree(false)}
          className="w-8 h-8 bg-black text-white text-base flex items-center justify-center rounded-md shrink-0"
        >
          ×
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>







      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(to right, #D5D4D4 1px, transparent 1px),
            linear-gradient(to bottom, #D5D4D4 1px, transparent 1px)
          `,
          backgroundSize: '7px 7px'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center pt-16">
        {/* Scrolling Name Text - Behind the image */}
       <div className="absolute inset-0 flex items-center justify-center z-0">
      <div className="relative w-full overflow-hidden">
        <div ref={scrollRef} className="flex w-max">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="whitespace-nowrap text-[12rem] sm:text-[18rem] tracking-[0.2em] font-black"
              style={{
                fontFamily: '"Migaela", Impact, sans-serif',
                color: '#010101',
                paddingRight: '4rem',
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
        {/* Portrait Image - Center bottom, much bigger */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
          <motion.img
            src={humanImage}
            alt="Portrait"
            style={{ transform: 'scale(1.1)', transformOrigin: 'bottom center' }}
          />
        </div>

        {/* Honors Badge - Rotated -90 degrees and centered on right */}
  <div className="fixed right-5 top-1/2 transform -translate-y-1/2 translate-x-1/2 z-20 rounded-xl">
  <div 
    className="w-40 h-16 flex items-center justify-between px-6 text-white font-bold text-sm tracking-wider rounded-l-lg"
    style={{ 
      backgroundColor: '#010101',
      transform: 'rotate(-90deg)',
      transformOrigin: 'center',
      fontFamily: 'sans-serif',
    }}
  >
    <span>HONORS</span>
    <div className="w-6 h-6 bg-white flex items-center justify-center rounded-sm">
      <span className="text-black font-bold text-xs">A</span>
    </div>
  </div>
</div>


        {/* Scroll Down Indicator - Smaller square box with FontAwesome arrow */}
<motion.div 
  className="fixed bottom-8 left-8 flex items-center space-x-3 z-20"
  initial={{ y: -20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 1, duration: 0.5 }}
>
  <div 
    className="w-8 h-8 border-2 flex items-center justify-center relative overflow-hidden rounded-md"
    style={{ borderColor: '#010101' }}
  >
    <motion.div
      initial={{ y: '-100%', opacity: 1 }}
      animate={{ 
        y: ['-100%', '0%', '0%', '100%'],
        opacity: [1, 1, 1, 0] // no fade until moving down
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.3, 0.6, 1] // hold 1 second before fade
      }}
      className="w-4 h-4 absolute flex items-center justify-center"
    >
      <FontAwesomeIcon icon={faArrowDown} size="sm" style={{ color: '#010101' }} />
    </motion.div>
  </div>
  <span 
    className="text-sm font-medium tracking-wider" 
    style={{ 
      color: '#010101', 
      fontFamily: 'sans-serif' 
    }}
  >
    SCROLL DOWN
  </span>
</motion.div>




      </div>
    </div>
  )
}

export default Hero