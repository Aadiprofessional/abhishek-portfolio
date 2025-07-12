import React, { useRef } from 'react'
import Hero from '../components/Hero'
import ParallaxAbout from '../components/ParallaxAbout'
import Projects from '../components/Projects'
import BottomNavbar from '../components/BottomNavbar'
import WhiteTransition from '../components/WhiteTransition'
import { useScroll } from 'framer-motion'

const HomePage = () => {
  const aboutRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ['start end', 'end start'] // track as ParallaxAbout scrolls
  })

  return (
    <div className="relative">
      <div className="fixed inset-0 z-0">
        <Hero />
      </div>

      <div className="h-screen" />

      <div className="relative z-10" ref={aboutRef}>
        <ParallaxAbout />
      </div>

      <div className="relative z-10">
        <WhiteTransition scrollProgress={scrollYProgress} />
      </div>

      <div className="relative z-10">
        <Projects />
      </div>

      <BottomNavbar />
    </div>
  )
}

export default HomePage
