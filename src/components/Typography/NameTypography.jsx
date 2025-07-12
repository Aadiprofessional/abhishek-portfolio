import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

const NameTypography = ({ 
  variant = 'hero', 
  showSubtext = true, 
  className = '',
  animated = true 
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), {
    stiffness: 300,
    damping: 30
  })
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), {
    stiffness: 300,
    damping: 30
  })

  const handleMouseMove = (event) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    mouseX.set(event.clientX - centerX)
    mouseY.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const variants = {
    hero: {
      container: "text-7xl md:text-9xl font-black tracking-tighter",
      firstName: "block text-white",
      lastName: "block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent",
      subtext: "text-xl md:text-2xl text-gray-400 mt-6 font-light tracking-wide"
    },
    large: {
      container: "text-5xl md:text-7xl font-bold tracking-tight",
      firstName: "text-white",
      lastName: "bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent",
      subtext: "text-lg md:text-xl text-gray-400 mt-4"
    },
    medium: {
      container: "text-3xl md:text-4xl font-semibold",
      firstName: "text-white",
      lastName: "text-blue-400",
      subtext: "text-base text-gray-400 mt-2"
    }
  }

  const currentVariant = variants[variant]

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
      scale: 0.8
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    })
  }

  const glowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: [0, 1, 0.7],
      scale: [0.8, 1.2, 1],
      transition: {
        duration: 2,
        ease: "easeOut",
        delay: 1
      }
    }
  }

  const AnimatedLetter = ({ letter, index, className, isSpace = false }) => {
    if (isSpace) return <span className="inline-block w-4" />
    
    return (
      <motion.span
        custom={index}
        variants={letterVariants}
        initial={animated ? "hidden" : "visible"}
        animate={isInView ? "visible" : "hidden"}
        className={`inline-block ${className} cursor-default`}
        whileHover={{
          scale: 1.1,
          textShadow: "0 0 20px rgba(99, 102, 241, 0.8)",
          transition: { duration: 0.2 }
        }}
        style={{
          transformOrigin: "center bottom",
          textShadow: isHovered ? "0 0 30px rgba(99, 102, 241, 0.6)" : "none"
        }}
      >
        {letter}
      </motion.span>
    )
  }

  const firstName = "Aditya"
  const lastName = "Srivastava"

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        perspective: "1000px"
      }}
    >
      {/* Background Glow Effect */}
      <motion.div
        variants={glowVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full transform scale-150"
        style={{ zIndex: -1 }}
      />

      {/* Main Typography */}
      <motion.div
        className={`relative z-10 ${currentVariant.container} text-center`}
        style={{
          rotateX: variant === 'hero' ? rotateX : 0,
          rotateY: variant === 'hero' ? rotateY : 0,
          transformStyle: "preserve-3d"
        }}
      >
        {/* First Name */}
        <div className={currentVariant.firstName}>
          {firstName.split('').map((letter, index) => (
            <AnimatedLetter
              key={`first-${index}`}
              letter={letter}
              index={index}
              className="transition-all duration-300"
            />
          ))}
        </div>

        {/* Last Name */}
        <div className={currentVariant.lastName}>
          {lastName.split('').map((letter, index) => (
            <AnimatedLetter
              key={`last-${index}`}
              letter={letter}
              index={firstName.length + index}
              className="transition-all duration-300"
            />
          ))}
        </div>

        {/* Decorative Elements */}
        {variant === 'hero' && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 0.6 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute -top-6 -right-6 w-4 h-4 bg-blue-500 rounded-full"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 0.4 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 2.2, duration: 1 }}
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full"
            />
          </>
        )}
      </motion.div>

      {/* Subtext */}
      {showSubtext && (
        <motion.div
          initial={animated ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
          className={currentVariant.subtext}
        >
          <span className="bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent">
            Full Stack Developer & AI Enthusiast
          </span>
        </motion.div>
      )}

      {/* Floating Particles */}
      {variant === 'hero' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              initial={{ 
                opacity: 0, 
                x: Math.random() * 400 - 200, 
                y: Math.random() * 200 - 100 
              }}
              animate={isInView ? {
                opacity: [0, 1, 0],
                y: [0, -100],
                x: [0, Math.random() * 100 - 50]
              } : {}}
              transition={{
                duration: 3,
                delay: 2 + i * 0.2,
                repeat: Infinity,
                repeatDelay: 5
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default NameTypography 