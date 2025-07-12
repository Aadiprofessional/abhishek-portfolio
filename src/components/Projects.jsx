import React, { useRef, useState, useEffect } from 'react';
import { FaArrowTurnDown, FaLock, FaTerminal } from 'react-icons/fa6';

const Projects = () => {
  const projects = Array.from({ length: 10 }, (_, index) => ({
    name: `Project ${index + 1}`,
    description: 'Branding, Website, UI/UX',
    image: `https://picsum.photos/800/500?random=${index}`,
  }));

  const tags = ['#TECH', '#CONSUMER', '#FINTECH', '#CRYPTO', '#NOCODE', '#SAAS', '#WEBAPP'];

  const headerRef = useRef(null);
  const topSentinelRef = useRef(null);
  const stopStickTriggerRef = useRef(null);
  const projectRefs = useRef([]);
  const imageContainerRef = useRef(null);

  const [isSticky, setIsSticky] = useState(false);
  const [isStuckToStop, setIsStuckToStop] = useState(false);
  const [headerOffset, setHeaderOffset] = useState(0);
  const [activeProject, setActiveProject] = useState(null);

  // Handle sticky & stuck behavior
  useEffect(() => {
    const handleScroll = () => {
      const headerEl = headerRef.current;
      const stopEl = stopStickTriggerRef.current;
      const topSentinel = topSentinelRef.current?.getBoundingClientRect().top || 0;

      if (!headerEl || !stopEl) return;

      const headerHeight = headerEl.offsetHeight;
      const stopTop = stopEl.getBoundingClientRect().top;

      if (topSentinel <= 0 && stopTop > headerHeight) {
        setIsSticky(true);
        setIsStuckToStop(false);
      } else if (stopTop <= headerHeight) {
        setIsSticky(false);
        setIsStuckToStop(true);
        const sectionTop = headerEl.parentElement.getBoundingClientRect().top + window.scrollY;
        setHeaderOffset(stopEl.offsetTop - headerHeight);
      } else {
        setIsSticky(false);
        setIsStuckToStop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect active project
  useEffect(() => {
    const onScroll = () => {
      const center = window.innerHeight / 2;
      let newActive = null;
      projectRefs.current.forEach((ref, i) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const mid = rect.top + rect.height / 2;
          if (Math.abs(mid - center) < 100) {
            newActive = i;
          }
        }
      });
      if (newActive !== activeProject) {
        setActiveProject(newActive);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeProject]);

  return (
    <section className="relative bg-white text-black rounded-t-xl shadow-lg">
      <div ref={topSentinelRef} className="absolute top-0 h-[1px] w-full" />

      {/* Spacer to prevent layout shift */}
      {(isSticky || isStuckToStop) && (
        <div style={{ height: headerRef.current?.offsetHeight || 0 }} />
      )}

      {/* Sticky Header */}
      <div
        ref={headerRef}
        className={`z-50 border-b border-gray-200 bg-white/90 backdrop-blur-sm  ${
          isSticky ? 'fixed top-0 left-0 right-0' : isStuckToStop ? 'absolute w-full' : 'relative'
        }`}
        style={isStuckToStop ? { top: `${headerOffset}px` } : {}}
      >
        <div className="px-6 md:px-10 py-9 md:pt-18">
          <div className="flex items-center gap-3">
            <FaArrowTurnDown className="h-18 w-18 text-black" />
            <h2 className="md:text-7xl font-regular">Projects</h2>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12">
        {/* Project Meta Info */}
        <div className="mt-10 w-[70%]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="uppercase text-xs font-medium mb-4 text-gray-500 tracking-wider">TIMEFRAME</h4>
              <p className="text-sm">YEAR 2022-23</p>
            </div>
            <div>
              <h4 className="uppercase text-xs font-medium mb-4 text-gray-500 tracking-wider">DISCIPLINE</h4>
              <ul className="space-y-2 text-sm">
                <li>No code development</li>
                <li>UI design</li>
                <li>UX research</li>
                <li>Art Direction</li>
              </ul>
            </div>
            <div>
              <h4 className="uppercase text-xs font-medium mb-4 text-gray-500 tracking-wider">TOOLS</h4>
              <ul className="space-y-2 text-sm">
                <li>Webflow</li>
                <li>After effect</li>
                <li>Webflow</li>
                <li>Wized</li>
              </ul>
            </div>
            <div>
              <h4 className="uppercase text-xs font-medium mb-4 text-gray-500 tracking-wider">INDUSTRY</h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span key={index} className="text-xs font-medium border border-gray-200 text-gray-700 px-2.5 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed image preview */}
        <div 
          ref={imageContainerRef}
          className="fixed top-[55%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 w-60 h-96 z-50 pointer-events-none hidden md:block"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-100 ${
                activeProject === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="mt-12 space-y-6 pb-20 relative z-10">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={el => (projectRefs.current[index] = el)}
              className={`flex flex-col md:flex-row justify-between md:items-center gap-4 border-b pb-6 border-gray-200 transition-colors duration-300
                rounded-lg p-4 md:p-6 ${activeProject === index ? 'bg-black text-white' : 'bg-white text-black'}`}
            >
              <div className="flex items-start md:items-center gap-4">
                <FaTerminal className={`w-5 h-5 flex-shrink-0 mt-1 md:mt-0 ${
                  activeProject === index ? 'text-white' : 'text-gray-400'
                }`} />
                <div>
                  <h3 className={`text-lg font-semibold ${activeProject === index ? 'text-white' : 'text-black'}`}>
                    {project.name}
                  </h3>
                  <p className={`text-sm ${activeProject === index ? 'text-white' : 'text-gray-500'}`}>
                    {project.description}
                  </p>
                </div>
              </div>

              <button className={`w-full md:w-auto border rounded-md px-4 py-2 text-sm font-medium flex items-center gap-2 ${
                activeProject === index
                  ? 'border-white bg-white text-black hover:bg-gray-100'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}>
                <FaLock className="h-3 w-3" />
                Contact for Details
              </button>
            </div>
          ))}
        </div>

        {/* Stop Sentinel */}
        <div ref={stopStickTriggerRef} className="h-[1px] w-full" />
      </div>
    </section>
  );
};

export default Projects;
