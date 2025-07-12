import React, { useRef, useState, useEffect } from 'react';
import { FaArrowTurnDown, FaLock, FaTerminal } from 'react-icons/fa6';

const Projects = () => {
  const projects = Array.from({ length: 10 }, (_, index) => ({
    name: `Project ${index + 1}`,
    description: 'Branding, Website, UI/UX',
  }));

  const tags = ['#TECH', '#CONSUMER', '#FINTECH', '#CRYPTO', '#NOCODE', '#SAAS', '#WEBAPP'];

  const headerRef = useRef(null);
  const sentinelRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sentinelRef.current) {
            const rect = sentinelRef.current.getBoundingClientRect();
            setIsSticky(rect.top <= 0);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="bg-white text-black rounded-t-xl shadow-lg relative">
      {/* Sentinel element */}
      <div ref={sentinelRef} className="absolute top-0 h-[1px] w-full pointer-events-none" />

      {/* Sticky header */}
     {/* Placeholder to prevent layout jump */}
{isSticky && <div style={{ height: headerRef.current?.offsetHeight }} />}

{/* Sticky header */}
<div
  ref={headerRef}
  className={`${
    isSticky ? 'fixed top-0 left-0 right-0' : 'relative'
  } bg-white/90 backdrop-blur-sm z-50 rounded-t-xl border-b border-gray-200 transition-all duration-200`}
>
  <div className="px-6 md:px-10 py-9 md:pt-18">
    <div className="flex items-center gap-3">
      <FaArrowTurnDown className="h-18 w-18 text-black" />
      <h2 className="md:text-7xl font-regular">Projects</h2>
    </div>
  </div>
</div>


      {/* Content */}
      <div className="px-6 md:px-12">
        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-8 border-b pb-10 border-gray-200 text-sm">
          <div>
            <h4 className="uppercase text-xs font-medium mb-3 text-gray-500 tracking-wider">Timeframe</h4>
            <p>YEAR 2022–23</p>
          </div>
          <div>
            <h4 className="uppercase text-xs font-medium mb-3 text-gray-500 tracking-wider">Discipline</h4>
            <ul className="space-y-1">
              <li>No code development</li>
              <li>UI design</li>
              <li>UX research</li>
              <li>Art Direction</li>
            </ul>
          </div>
          <div>
            <h4 className="uppercase text-xs font-medium mb-3 text-gray-500 tracking-wider">Tools</h4>
            <ul className="space-y-1">
              <li>Webflow</li>
              <li>After effect</li>
              <li>Wized</li>
            </ul>
          </div>
          <div>
            <h4 className="uppercase text-xs font-medium mb-3 text-gray-500 tracking-wider">Industry</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs font-medium border border-gray-300 text-gray-700 px-2 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Projects list with conditional padding for sticky */}
       <div className="mt-12 space-y-6 pb-20">

          {projects.map((project, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b pb-6 border-gray-200"
            >
              <div className="flex items-start md:items-center gap-4">
                <FaTerminal className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1 md:mt-0" />
                <div>
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p className="text-gray-500 text-sm">{project.description}</p>
                </div>
              </div>
              <button className="w-full md:w-auto flex-shrink-0 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors">
                <FaLock className="h-3 w-3" />
                Contact for Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
