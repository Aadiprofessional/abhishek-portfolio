import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'

const BlackTransition = () => {
  const controls = useAnimation()
  const sectionRef = useRef(null)

  // Scroll progress relative to section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  // Height increases from 0 to 192px after 20% scroll
  const height = useTransform(scrollYProgress, [0.6, 0.8], [76, 192])
  const opacity = useTransform(scrollYProgress, [0.3, 0.3], [0, 1])

  useEffect(() => {
    const animateText = async () => {
      while (true) {
        await controls.start({
          x: ['0%', '-100%'],
          transition: {
            duration: 10,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop'
          }
        })
      }
    }
    animateText()
  }, [controls])

  return (
    <div ref={sectionRef} className="relative w-full">
      {/* ✨ Plain white box with top line */}
      <div className="bg-white h-[128px] w-full border-t border-gray-300" />

      {/* 🟤 Animated black bar expanding from bottom */}
      <motion.div
        style={{ height, opacity }}
        className="w-full bg-black overflow-hidden"
      >
        <div className="h-[192px] flex items-center justify-center">
          <motion.div
            animate={controls}
            className="flex whitespace-nowrap text-9xl font-bold text-white min-w-[200%]"
          >
            <span className="px-4">
              🔥 AADI SRIVASTAVA 🔥 ANDROID 🔥 WEBSITE 🔥 IOS 🔥
            </span>
            <span className="px-4">
              🔥 NODE 🔥 FIREBASE 🔥 GOOGLE CLOUD 🔥 SUPABASE 🔥
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default BlackTransition
