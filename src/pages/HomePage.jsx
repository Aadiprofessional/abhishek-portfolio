import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import Hero from '../components/Hero';
import ParallaxAbout from '../components/ParallaxAbout';
import Projects from '../components/Projects';
import BottomNavbar from '../components/BottomNavbar';
import WhiteTransition from '../components/WhiteTransition';
import BlackTransition from '../components/BlackTransition';
import GridSection from '../components/Webgrid';
import WebflowShowcase from '../components/WebflowShowcase';
import CatchMeButton from '../components/CatchMeButton';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';

const HomePage = () => {
  const containerRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const productsRef = useRef(null);
  const contactRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollY } = useScroll(); // Global scroll
  const heroOpacity = useTransform(scrollY, [1000, 1200], [1, 0]);

  // Local scroll progress for ParallaxAbout section
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutRef,
    offset: ['start end', 'end start'],
  });

  return (
    <div className="relative w-full overflow-x-hidden" ref={containerRef}>
      {/* Fixed Hero Background (fade out on scroll) */}
      <motion.div
        className="fixed inset-0 z-[0] pointer-events-none"
        style={{ opacity: heroOpacity }}
      >
        <Hero />
      </motion.div>

      {/* Fixed Footer Background (always behind) */}
      <div className="fixed inset-0 z-[-10] pointer-events-none">
        <Footer />
      </div>

      {/* Spacer for Hero */}
      <div className="h-screen" />

      {/* Main Scrollable Content */}
      <div className="relative z-10">
        <div ref={aboutRef} id="about-section">
          <ParallaxAbout />
        </div>

        {isMounted && (
          <>
            <WhiteTransition scrollProgress={aboutScrollProgress} />
            <div ref={projectsRef} id="projects-section">
              <Projects />
            </div>
            <BlackTransition scrollProgress={aboutScrollProgress} />
            <div ref={productsRef} id="products-section">
              <GridSection />
              <WebflowShowcase />
            </div>
            <CatchMeButton />
            <div ref={contactRef} id="contact-section">
              <TestimonialsSection />
            </div>

            {/* Spacer for Footer */}
            <div className="h-[100vh]" />
          </>
        )}

        <BottomNavbar />
      </div>
    </div>
  );
};

export default HomePage;
