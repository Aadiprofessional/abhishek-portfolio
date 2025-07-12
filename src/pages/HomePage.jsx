import React, { useRef, useState, useEffect } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import Hero from '../components/Hero'
import ParallaxAbout from '../components/ParallaxAbout'
import Projects from '../components/Projects'
import BottomNavbar from '../components/BottomNavbar'
import WhiteTransition from '../components/WhiteTransition'

const HomePage = () => {
  const containerRef = useRef(null)
  const aboutRef = useRef(null)
  const [isMounted, setIsMounted] = useState(false)
  const [heroVisible, setHeroVisible] = useState(true)
  
  // Ensure component is mounted before using scroll hooks
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { scrollY } = useScroll({
    container: isMounted ? containerRef : null,
  })

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > window.innerHeight * 0.8) {
      setHeroVisible(false)
    } else {
      setHeroVisible(true)
    }
  })

  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: isMounted ? aboutRef : null,
    offset: ['start end', 'end start']
  })

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Hero background - fixed position */}
      {heroVisible && (
        <div className="fixed inset-0 z-0">
          <Hero />
        </div>
      )}

      {/* Spacer to push content below hero */}
      <div className="h-screen" />

      {/* Scrollable content container */}
      <div className="relative z-10">
        <div ref={aboutRef}>
          <ParallaxAbout />
        </div>

        {isMounted && (
          <>
            <WhiteTransition scrollProgress={aboutScrollProgress} />
            <Projects />
            <BottomNavbar />
          </>
        )}
      </div>
    </div>
  )
}

export default HomePage