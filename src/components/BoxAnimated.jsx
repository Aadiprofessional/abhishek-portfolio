import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const BoxAnimated = ({ children, bgColor = "bg-yellow-300" }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Expand width from 0% to 100% between scroll range 0 -> 0.5
  const width = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative overflow-hidden h-full w-full">
      {/* Animated background layer */}
      <motion.div
        style={{ width }}
        className={`absolute left-0 top-0 bottom-0 ${bgColor} rounded-md z-0`}
      />

      {/* Static content layer */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};

export default BoxAnimated;
