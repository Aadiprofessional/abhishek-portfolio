// components/ScrollFillSection.jsx
import React, { useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollFillItem = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <div ref={ref} className="mb-12">
      <div className="h-[1px] bg-gray-200 mb-4 relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-black"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1 }
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ transformOrigin: "left" }}
        />
      </div>
      {children}
    </div>
  );
};

const ScrollFillSection = () => {
  return (
    <section className="w-full py-20 px-6 md:px-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold mb-12">
          CLONE THOSE AND HAVE FUN
        </h2>
        
        <ScrollFillItem>
          <p className="text-xl md:text-2xl">W Cloneables.</p>
        </ScrollFillItem>

        <ScrollFillItem>
          <p className="text-xl md:text-2xl">BECOME A BADASS DESIGNER</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-sm border border-black px-2 py-1">#SOLOPRENEUR</span>
            <span className="text-sm border border-black px-2 py-1">#TRAVELTIPS</span>
          </div>
        </ScrollFillItem>

        <ScrollFillItem>
          <p className="text-xl md:text-2xl">USE AI IN YOUR WEBDESIGN WORKFLOW?</p>
          <p className="text-sm mt-1">YouTube serie.</p>
        </ScrollFillItem>

        <ScrollFillItem>
          <p className="text-xl md:text-2xl">AWARDS↗</p>
          <p className="text-sm mt-1">1X HONORABLE MENTION</p>
        </ScrollFillItem>

        <div className="flex flex-wrap gap-2 mt-12">
          <span className="text-sm border border-black px-2 py-1">#DESIGNER</span>
          <span className="text-sm border border-black px-2 py-1">#FIGMA-MASTER</span>
        </div>
      </div>
    </section>
  );
};

export default ScrollFillSection;