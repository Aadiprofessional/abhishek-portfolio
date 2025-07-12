import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ParallaxAbout = () => {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  useEffect(() => {
    const handleScroll = (value) => {
      // Add your scroll handling logic here
    };
    
    const unsubscribe = scrollYProgress.on("change", handleScroll)
    return () => unsubscribe()
  }, [scrollYProgress])

  const titleY = useTransform(scrollYProgress, [0.05, 0.25], ['100%', '0%'])
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1])

  const contentY = useTransform(scrollYProgress, [0.25, 0.6], ['50%', '0%'])
  const contentOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1])

  // White bar expands from top (0 to 10px), and pushes content down
  const whiteBarHeight = useTransform(scrollYProgress, [0.5, 0.8], ['0px', '10px'])
  const whiteBarOpacity = useTransform(scrollYProgress, [0.5, 0.55], [0, 1])


  return (
    <>
      {/* White Line + Black Section wrapper */}
      <motion.div style={{ height: 'auto' }}>
        {/* Expanding White Line from top */}
        <motion.div
          style={{
            height: whiteBarHeight,
            opacity: whiteBarOpacity
          }}
          className="w-full bg-white"
        />

        {/* Main Black Section */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden bg-black text-white rounded-t-3xl pt-40 pb-24 px-6 md:px-16"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-12">
            <motion.h2
              style={{ y: titleY, opacity: titleOpacity }}
              className="text-6xl md:text-[80px] font-bold leading-none md:w-1/4"
            >
              About
            </motion.h2>

            <motion.div
              style={{ y: contentY, opacity: contentOpacity }}
              className="flex flex-col md:w-3/4"
            >
              <p className="text-lg md:text-2xl leading-relaxed mb-6">
                <strong className="font-semibold">Matthis</strong>{' '}
                <span className="text-gray-400 text-base">(HE/HIM)</span> is a nomad product and brand designer with a passion
                for art and technology. He uses Webflow and other low-code tools to create stunning, one-of-a-kind pieces that come to life on the internet.
              </p>
              <p className="text-lg md:text-2xl leading-relaxed mb-6">
                Currently residing in the lush jungle of Mexico, Matthis operates globally and is ready to take on any design challenge.
              </p>
              <p className="text-xs tracking-wider uppercase text-white/60 mt-4 mb-8">
                BUILDING PRODUCTS AT THE CROSSPATHS OF AI — SAAS — WEB3.
              </p>

              <div className="border border-white/20 bg-white/5 backdrop-blur-md rounded-xl p-6 w-full max-w-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    W.
                  </div>
                  <div>
                    <p className="text-lg font-medium">Senior Design Director</p>
                    <p className="text-sm text-white/50">SVZ</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 🔥 Scrolling Text Section */}
     
    </>
  )
}

export default ParallaxAbout
