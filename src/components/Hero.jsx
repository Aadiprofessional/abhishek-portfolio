import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import eyeSvg from '../assets/empty.svg'
import browLeftSvg from '../assets/brow_left.svg'
import browRightSvg from '../assets/brow_right.svg'
import arrowSvg from '../assets/arrow.svg'
import plane1Svg from '../assets/plane1.svg'
import plane2Svg from '../assets/plane2.svg'
import plane3Svg from '../assets/plane3.svg'
import letter1Svg from '../assets/letter1.svg'
import letter2Svg from '../assets/letter2.svg'
import letter3Svg from '../assets/letter3.svg'

const Hero = () => {
  const [showLinkTree, setShowLinkTree] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [animationStage, setAnimationStage] = useState(0)
  const [hoveredPlane, setHoveredPlane] = useState(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    // Animation sequence
    const timer1 = setTimeout(() => setAnimationStage(1), 500) // Eye fade in
    const timer2 = setTimeout(() => setAnimationStage(2), 1500) // Planes fly in
    const timer3 = setTimeout(() => setAnimationStage(3), 2500) // Arrow bounce
    const timer4 = setTimeout(() => setAnimationStage(4), 3500) // Planes bounce
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [])

  const calculatePupilPosition = () => {
    // Use screen center as reference point for both eyes
    const screenCenterX = window.innerWidth / 2
    const screenCenterY = window.innerHeight / 2
    
    // Calculate direction from screen center to mouse
    const deltaX = mousePosition.x - screenCenterX
    const deltaY = mousePosition.y - screenCenterY
    
    // Define oval boundaries (70% of eye area) - eyes are oval shaped
    const maxHorizontalDistance = 45 // 70% of eye width
    const maxVerticalDistance = 35   // 70% of eye height
    
    // Normalize the movement to fit within oval boundaries
    const normalizedX = Math.max(-1, Math.min(1, deltaX / (screenCenterX * 0.8)))
    const normalizedY = Math.max(-1, Math.min(1, deltaY / (screenCenterY * 0.8)))
    
    return {
      x: normalizedX * maxHorizontalDistance,
      y: normalizedY * maxVerticalDistance
    }
  }

  const name = "ABHISHEK SRIVASTAVA"


  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#EBEBEA' }}>
      {/* Header with white background - rounded rectangle with negative margins and shadow */}
<header className="fixed top-3 left-3 right-3 z-30 bg-white py-2 px-4 flex justify-between items-center rounded-lg shadow-sm">
  <div className="flex items-center">
    <div className="w-6 h-6 bg-black flex items-center justify-center text-white text-xs font-bold mr-2">
      AS
    </div>
    {/* 👇 This is the line that was changed */}
    <span className="text-xs sm:text-sm font-medium text-black leading-none">
      FULL-STACK DEVELOPER, WEBSITE, IOS & ANDROID APPS.
    </span>
  </div>
  <button 
    className="px-3 py-1 text-sm flex items-center text-black font-medium gap-1 cursor-pointer relative z-40"
    onClick={() => setShowLinkTree(!showLinkTree)}
    style={{ pointerEvents: 'auto' }}
  >
    <FontAwesomeIcon icon={faExternalLinkAlt} />
    LINK TREE
  </button>
</header>



      {/* Link Tree Header - Appears with animation when button is clicked */}
<AnimatePresence>
  {showLinkTree && (
    <motion.div 
     className="fixed top-[-10px] left-0 right-0 bg-[#EBEAEB] py-8 px-6 flex justify-center items-center rounded-b-lg shadow-md"
     style={{ zIndex: 99999, pointerEvents: 'auto' }}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="w-full max-w-[1440px] flex items-center justify-between gap-6 px-6" style={{ pointerEvents: 'auto' }}>
        {/* Link Buttons */}
        <div className="flex flex-1 flex-col sm:flex-row items-center justify-between gap-2 sm:gap-6" style={{ pointerEvents: 'auto' }}>
          {[
            { name: 'GitHub', link: 'https://github.com/Aadiprofessional' },
            { name: 'LinkedIn', link: 'https://www.linkedin.com/in/abhishek-srivastava-236843193?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
            { name: 'WhatsApp', link: 'https://wa.me/919289881135' },
            { name: 'Email', link: 'mailto:abhishek.kvoc@gmail.com' },
          ].map(({ name, link }) => (
            <a
              key={name}
              href={link}
              target={link.startsWith('http') ? "_blank" : undefined}
              rel={link.startsWith('http') ? "noopener noreferrer" : undefined}
              className="relative flex-1 w-full sm:w-auto px-3 sm:px-6 py-2 sm:py-3 border border-black flex items-center justify-between overflow-hidden text-black group transition-all duration-300 rounded-md text-sm sm:text-base"
              style={{ pointerEvents: 'auto', zIndex: 100000 }}
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
          style={{ pointerEvents: 'auto', zIndex: 100000 }}
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
        {/* Main Heading Text */}
        <div className="text-center mb-16 z-20 relative">
          <h1 
            className="text-sm sm:text-xl md:text-4xl lg:text-5xl leading-tight tracking-tight px-4 sm:px-0"
            style={{
              fontFamily: '"Luckiest Guy"',
           
              color: '#4A5D3A',
              textShadow: '2px 2px 0px rgba(0,0,0,0.1)',
              letterSpacing: '0.02em'
            }}
          >
            LOOKING FOR A FULL-STACK DEVELOPER<br />
            TO BUILD YOUR DREAM APPLICATION?
          </h1>
        </div>
        {/* Animated Eyes with SVG - Center */}
        <motion.div 
          className="relative z-30 mb-8 sm:mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: animationStage >= 1 ? 1 : 0, 
            scale: animationStage >= 1 ? 1 : 0.8 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative">
            {/* Eye SVG */}
            <img 
              src={eyeSvg} 
              alt="Eyes" 
              className="w-48 h-40 sm:w-72 sm:h-60 md:w-96 md:h-80 mx-auto"
              style={{ transform: 'scale(0.6) sm:scale(0.8) md:scale(0.9)' }}
            />
            
            {/* Left Eyebrow */}
            <img 
              src={browLeftSvg} 
              alt="Left Eyebrow" 
              className="absolute w-20 h-5 sm:w-32 sm:h-8 md:w-40 md:h-10"
              style={{ 
                top: '-25px', 
                left: '5px',
                transform: 'scale(0.9) sm:scale(1.1) md:scale(1.3)'
              }}
            />
            
            {/* Right Eyebrow */}
            <img 
              src={browRightSvg} 
              alt="Right Eyebrow" 
              className="absolute w-20 h-5 sm:w-32 sm:h-8 md:w-40 md:h-10"
              style={{ 
                top: '-25px', 
                right: '5px',
                transform: 'scale(0.9) sm:scale(1.1) md:scale(1.3)'
              }}
            />
            
            {/* Left Pupil */}
            <div 
              className="absolute w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-black rounded-full transition-transform duration-100 ease-out"
              style={{
                top: '50%',
                left: '25%',
                transform: `translate(-35%, -50%) translate(${calculatePupilPosition().x}px, ${calculatePupilPosition().y}px)`
              }}
            />
            
            {/* Right Pupil */}
            <div 
              className="absolute w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-black rounded-full transition-transform duration-100 ease-out"
              style={{
                top: '50%',
                right: '25%',
                transform: `translate(35%, -50%) translate(${calculatePupilPosition().x}px, ${calculatePupilPosition().y}px)`
              }}
            />
          </div>
        </motion.div>

        {/* Arrow pointing to eyes with text */}
        <motion.div 
          className="absolute right-4 sm:right-20 md:right-60 top-1/2 transform -translate-y-1/2 translate-y-8 sm:translate-y-16 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: animationStage >= 3 ? 1 : 0,
            y: animationStage >= 3 ? [20, -5, 0] : 20
          }}
          transition={{ 
            duration: 0.6, 
            ease: "easeOut",
            y: { duration: 0.8, times: [0, 0.6, 1] }
          }}
        >
         <div className="flex items-center gap-1.5 sm:gap-4">
  <img 
    src={arrowSvg} 
    alt="Arrow" 
    className="w-6 h-2.5 sm:w-12 sm:h-4 md:w-16 md:h-5"
    style={{ filter: 'brightness(0) saturate(100%)' }}
  />
  <div className="text-left">
    <p className="text-[10px] sm:text-sm md:text-lg font-regular text-black leading-tight" style={{ fontFamily: '"Luckiest Guy"' }}>
      IT IS YOU,<br />
      IN SEARCH OF<br />
      A DEVELOPER
    </p>
  </div>
</div>
        </motion.div>

        {/* Animated Planes around Eyes */}
        {/* Plane 1 - Left Top */}
        <motion.div
          className="absolute left-2 sm:left-8 md:left-20 top-1/4 transform -translate-y-1/2 -translate-y-4 sm:-translate-y-8 z-20"
          initial={{ x: '40vw', y: '40vh', opacity: 0 }}
          animate={{
            x: animationStage >= 2 ? 0 : '40vw',
            y: animationStage >= 2 ? 0 : '40vh',
            opacity: animationStage >= 2 ? 1 : 0,
            scale: animationStage >= 4 ? [1, 1.1, 1] : 1
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0,
            scale: { delay: 0.5, duration: 0.4, times: [0, 0.5, 1] }
          }}
          onMouseEnter={() => setHoveredPlane(1)}
          onMouseLeave={() => setHoveredPlane(null)}
          style={{ pointerEvents: 'auto' }}
        >
          <img 
            src={hoveredPlane === 1 ? letter1Svg : plane1Svg}
            alt="Plane 1" 
            className={hoveredPlane === 1 ? "w-32 h-32 sm:w-40 sm:h-40 md:w-60 md:h-60 cursor-pointer transition-all duration-300 hover:scale-110" : "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 cursor-pointer transition-all duration-300 hover:scale-110"}
            style={{ pointerEvents: 'auto' }}
          />
        </motion.div>

        {/* Plane 2 - Right */}
        <motion.div
          className="absolute right-2 sm:right-16 md:right-40 top-1/3 transform -translate-y-1/2 z-20"
          initial={{ x: '-40vw', y: '40vh', opacity: 0 }}
          animate={{
            x: animationStage >= 2 ? 0 : '-40vw',
            y: animationStage >= 2 ? 0 : '40vh',
            opacity: animationStage >= 2 ? 1 : 0,
            scale: animationStage >= 4 ? [1, 1.1, 1] : 1
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2,
            scale: { delay: 0.7, duration: 0.4, times: [0, 0.5, 1] }
          }}
          onMouseEnter={() => setHoveredPlane(2)}
          onMouseLeave={() => setHoveredPlane(null)}
          style={{ pointerEvents: 'auto' }}
        >
          <img 
            src={hoveredPlane === 2 ? letter2Svg : plane2Svg}
            alt="Plane 2" 
            className={hoveredPlane === 2 ? "w-32 h-32 sm:w-40 sm:h-40 md:w-60 md:h-60 cursor-pointer transition-all duration-300 hover:scale-110" : "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 cursor-pointer transition-all duration-300 hover:scale-110"}
            style={{ pointerEvents: 'auto' }}
          />
        </motion.div>

        {/* Plane 3 - Left Bottom */}
        <motion.div
          className="absolute left-2 sm:left-8 md:left-20 bottom-32 sm:bottom-48 md:bottom-60 transform -translate-y-1/2 translate-y-4 sm:translate-y-8 z-20"
          initial={{ x: '40vw', y: '40vh', opacity: 0 }}
          animate={{
            x: animationStage >= 2 ? 0 : '40vw',
            y: animationStage >= 2 ? 0 : '0vh',
            opacity: animationStage >= 2 ? 1 : 0,
            scale: animationStage >= 4 ? [1, 1.1, 1] : 1
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.4,
            scale: { delay: 0.9, duration: 0.4, times: [0, 0.5, 1] }
          }}
          onMouseEnter={() => setHoveredPlane(3)}
          onMouseLeave={() => setHoveredPlane(null)}
          style={{ pointerEvents: 'auto' }}
        >
          <img 
            src={hoveredPlane === 3 ? letter3Svg : plane3Svg}
            alt="Plane 3" 
            className={hoveredPlane === 3 ? "w-32 h-32 sm:w-40 sm:h-40 md:w-60 md:h-60 cursor-pointer transition-all duration-300 hover:scale-110" : "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 cursor-pointer transition-all duration-300 hover:scale-110"}
            style={{ pointerEvents: 'auto' }}
          />
        </motion.div>
        
        {/* Bottom text */}
       <div className="text-center z-20 relative mt-8">
  <p className="text-xs md:text-base text-gray-700 max-w-2xl mx-auto leading-relaxed">
    Whether you're a startup, enterprise, or growing business,<br />
    you're in the right place for building your dream application.
  </p>
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