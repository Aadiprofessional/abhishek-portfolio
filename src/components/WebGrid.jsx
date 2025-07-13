import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const GridSection = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Animate clip-path inset from right → left
  const clip = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  const topBoxes = [
    {
      title: "CLONE THOSE AND HAVE FUN ↗",
      subtitle: "Cloneables.",
      bg: "bg-yellow-300",
      textColor: "text-black",
    },
    {
      title: "USE AI IN YOUR WEBDESIGN WORKFLOW ↗",
      subtitle: "YouTube serie.",
      bg: "bg-red-500",
      textColor: "text-white",
    },
  ];

  const bottomBoxes = [
    {
      title: "SCREEN FREE VACATIONS ↗",
      tags: ["#SOLOPRENEUR", "#TRAVELTIPS"],
      bg: "bg-green-600",
      textColor: "text-white",
    },
    {
      title: "BECOME A BADASS DESIGNER ↗",
      tags: ["#DESIGNER", "#FIGMA-MASTER"],
      bg: "bg-pink-300",
      textColor: "text-black",
    },
    {
      title: "AWARDS ↗",
      tags: ["1X HONORABLE MENTION"],
      bg: "bg-blue-500",
      textColor: "text-white",
    },
  ];

  return (
    <div ref={sectionRef} className="min-h-screen bg-white px-8 py-12 space-y-6">
      <style>{`
        .box-height {
          height: calc((100vw - 4rem) / 3 - 1.5rem);
        }
        @media (max-width: 768px) {
          .box-height {
            height: calc(100vw - 4rem);
          }
        }
      `}</style>

      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topBoxes.map(({ title, subtitle, bg, textColor }, i) => (
          <motion.div
            key={i}
            style={{
              clipPath: clip,
              WebkitClipPath: clip,
            }}
            className={`box-height rounded-md relative ${bg} ${textColor} p-6`}
          >
            <div className="flex flex-col justify-between h-full">
              <div className="font-bold text-md md:text-lg">{title}</div>
              <div className="mt-4 text-2xl font-bold">{subtitle}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bottomBoxes.map(({ title, tags, bg, textColor }, i) => (
          <motion.div
            key={i}
            style={{
              clipPath: clip,
              WebkitClipPath: clip,
            }}
            className={`box-height rounded-md relative ${bg} ${textColor} p-6`}
          >
            <div className="flex flex-col justify-between h-full">
              <div className="font-bold text-md md:text-lg">{title}</div>
              <div className="mt-4 space-y-2">
                {tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="bg-white text-black inline-block px-2 py-1 rounded text-sm font-semibold"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GridSection;
