import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useScroll ,AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaTrophy } from 'react-icons/fa';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

const CatchMeButton = () => {
  const sectionRef = useRef(null);
  const boxRef = useRef(null);
  const [cursorInside, setCursorInside] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 100, y: 100 });
  const [boxPos, setBoxPos] = useState({ x: 100, y: 100 });

  const boxControls = useAnimation();
  const textControls = useAnimation();
  const pingControls = useAnimation();

  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasExpanded, setHasExpanded] = useState(false);

  // Scroll animation toggle
  useEffect(() => {
    return scrollY.onChange((latest) => {
      const top = sectionRef.current?.offsetTop || 0;
      const bottom = top + (sectionRef.current?.offsetHeight || 0);

      if (latest >= top && latest < bottom) {
        if (!hasExpanded && latest > lastScrollY) {
          boxControls.start('expanded');
          setTimeout(() => {
            textControls.start('visible');
            pingControls.start('visible');
          }, 600);
          setHasExpanded(true);
        } else if (hasExpanded && latest < lastScrollY) {
          boxControls.start('collapsed');
          textControls.start('hidden');
          pingControls.start('hidden');
          setHasExpanded(false);
        }
      }

      setLastScrollY(latest);
    });
  }, [scrollY, lastScrollY, hasExpanded]);

  // Mouse tracking inside box
  useEffect(() => {
    const handleMouseMove = (e) => {
      const box = boxRef.current;
      if (box) {
        const rect = box.getBoundingClientRect();
        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        setCursorInside(isInside);

        if (isInside) {
          setMousePos({
            x: e.clientX - rect.left - 50,
            y: e.clientY - rect.top - 30,
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth follow effect
  useEffect(() => {
    let raf;
    const followCursor = () => {
      setBoxPos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        return {
           x: prev.x + dx * 0.03, // slower = 0.02 or 0.01
  y: prev.y + dy * 0.03,
        };
      });
      raf = requestAnimationFrame(followCursor);
    };
    raf = requestAnimationFrame(followCursor);
    return () => cancelAnimationFrame(raf);
  }, [mousePos]);
  

  // Box animation variants
  const boxVariants = {
    collapsed: {
      scaleX: 0.4,
      opacity: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    expanded: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 1, ease: 'easeInOut' },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen bg-white overflow-hidden flex justify-end items-center"
    >
      <motion.div
        ref={boxRef}
        initial="collapsed"
        animate={boxControls}
        variants={boxVariants}
        className="relative w-[95%] h-[95vh] bg-black origin-left scale-x-[0.4] rounded-l-3xl overflow-hidden border-l border-[#1E1F1F]"
        style={{
          backgroundImage:
            'linear-gradient(#1E1F1F 1px, transparent 1px), linear-gradient(to right, #1E1F1F 1px, transparent 1px)',
          backgroundSize: '10px 10px',
        }}
      >



      <motion.div
  className="absolute z-20 w-72 h-36 rounded-3xl overflow-hidden flex items-center justify-center shadow-lg"
  variants={contentVariants} // <- fade in with main content
  style={{
    left: boxPos.x,
    top: boxPos.y,
    backgroundColor: '#ffccf3',
    backgroundImage:
      'url("https://upload.wikimedia.org/wikipedia/commons/4/4f/Yellow_abstract_shapes.svg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  {
    // Immediately switch to ping message when box is close enough to cursor
    Math.hypot(boxPos.x - mousePos.x, boxPos.y - mousePos.y) < 30 ? (
      <div className="flex flex-col items-center justify-center space-y-2 w-full h-full">
        <div className="text-3xl">🐸 🐯 🙈</div>
        <button
          className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium shadow-md"
          onClick={() =>
            (window.location.href = 'mailto:aadiprofessional8@gmail.com')
          }
        >
          Ping a message →
        </button>
      </div>
    ) : (
      <span className="text-5xl font-extrabold text-green-900">CATCH ME</span>
    )
  }
</motion.div>







        {/* Text content */}
        <motion.div
          className="relative z-10 flex flex-col justify-center h-full px-10 text-white"
          initial="hidden"
          animate={textControls}
          variants={contentVariants}
        >
          <motion.div
            className="text-[7vw] sm:text-[5vw] md:text-[4vw] font-bold leading-tight space-y-6"
            variants={contentVariants}
          >
            <motion.div variants={contentVariants}>ALL YOU NEED IS</motion.div>
            <motion.div className="flex items-center gap-4" variants={contentVariants}>
              <span>A</span>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Webflow_logo.svg/1024px-Webflow_logo.svg.png"
                alt="Webflow Logo"
                className="w-14 h-14 rounded-lg"
              />
              <span>WEBFLOW</span>
            </motion.div>
            <motion.div className="flex items-center gap-3" variants={contentVariants}>
              SITE <FaArrowUpRightFromSquare />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CatchMeButton;
