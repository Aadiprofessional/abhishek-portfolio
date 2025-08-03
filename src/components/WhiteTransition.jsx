import React from 'react'
import { motion, useTransform } from 'framer-motion'

const WhiteTransition = ({ scrollProgress }) => {
  // Expand height on scroll
  const height = useTransform(scrollProgress, [0.5, 0.8], [0, 150])

  // Move the text continuously from right to left
  const textX = useTransform(scrollProgress, [0.5, 0.8], ['0%', '-50%'])

  return (
    <motion.div style={{ height }} className="w-full bg-white relative overflow-hidden">
      {/* Border Box */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-6 w-[90%] h-[80px] border border-gray-400 flex items-center overflow-hidden">
        <motion.div
          style={{ x: textX }}
          className="flex whitespace-nowrap text-6xl font-bold text-black min-w-[200%]"
        >
          {/* Repeat enough to overflow */}
         <span className="px-4">
  🚀 AADI SRIVASTAVA  🤖 ANDROID  🌐 WEBSITE  📱 IOS  
</span>
<span className="px-4">
  🟩 NODE   🔥 FIREBASE   ☁️ GOOGLE CLOUD   🐬 SUPABASE  
</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default WhiteTransition
