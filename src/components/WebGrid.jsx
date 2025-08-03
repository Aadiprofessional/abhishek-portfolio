import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { personalInfo, projects } from '../data/personalData';

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
      title: "EXPLORE MY AI PROJECTS ↗",
      subtitle: `${personalInfo.projectsCompleted} Projects Built`,
      bg: "bg-blue-500",
      textColor: "text-white",
      url: "https://github.com/Aadiprofessional",
    },
    {
      title: "BUILDING THE FUTURE WITH AI ↗",
      subtitle: personalInfo.currentRole,
      bg: "bg-purple-600",
      textColor: "text-white",
      url: "https://matrixai.asia/",
    },
  ];

  const bottomBoxes = [
    {
      title: "NEXTGEN KALAM INNOVATION SPRINT 2024 ↗",
      tags: ["1ST PRIZE WINNER", "#AKTU"],
      bg: "bg-green-600",
      textColor: "text-white",
      url: "https://www.linkedin.com/posts/aktuofficial_aktu-respective-media-activity-7252273248036388866-VCz1/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC2CKYoBUsoDtgVPv65ke8x0d754nc7Jwns",
    },
    {
      title: "IDE BOOTCAMP(SIH) 2024 ↗",
      tags: ["1ST PRIZE WINNER", "#NIT-GOA"],
      bg: "bg-orange-500",
      textColor: "text-white",
      url: "https://www.linkedin.com/posts/abhishek-srivastava-236843193_thrilled-to-have-spent-five-incredible-days-activity-7263640543979536385-Yjtj/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC2CKYoBUsoDtgVPv65ke8x0d754nc7Jwns",
    },
    {
      title: "OPEN SOURCE CONTRIBUTOR ↗",
      tags: [`${personalInfo.githubRepos} REPOSITORIES`, "#OPENSOURCE"],
      bg: "bg-yellow-400",
      textColor: "text-black",
      url: "https://github.com/Aadiprofessional",
    },
  ];

  return (
    <div ref={sectionRef} id="webgrid-section" className="min-h-screen bg-white px-8 py-12 space-y-6">
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
        {topBoxes.map(({ title, subtitle, bg, textColor, url }, i) => (
          <motion.div
            key={i}
            style={{
              clipPath: clip,
              WebkitClipPath: clip,
            }}
            className={`box-height rounded-md relative ${bg} ${textColor} p-6 cursor-pointer hover:scale-105 transition-transform duration-300`}
            onClick={() => window.open(url, '_blank')}
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
        {bottomBoxes.map(({ title, tags, bg, textColor, url }, i) => (
          <motion.div
            key={i}
            style={{
              clipPath: clip,
              WebkitClipPath: clip,
            }}
            className={`box-height rounded-md relative ${bg} ${textColor} p-6 cursor-pointer hover:scale-105 transition-transform duration-300`}
            onClick={() => window.open(url, '_blank')}
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
