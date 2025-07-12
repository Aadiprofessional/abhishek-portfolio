import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Projects = () => {
  const projectsRef = useRef(null)

  // Detect scroll over the Projects section
  const { scrollYProgress } = useScroll({
    target: projectsRef,
    offset: ['start start', 'end start'] // When top hits top → fully scrolled out
  })

  // Animate a white top padding from 0px to 10px
  const topPadding = useTransform(scrollYProgress, [0, 0.3], ['0px', '10px'])
  const topOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  const projects = [
    { name: 'Barrett Plastic Surgery', description: 'Branding, Website' },
    { name: 'MyStudio', description: 'Branding, Website, Art Direction' },
    { name: 'Instead', description: 'Creative direction, UI/UX' }
  ]

  const tags = ['#TECH', '#CONSUMER', '#FINTECH', '#CRYPTO', '#NOCODE', '#SAAS', '#WEBAPP']

  return (
    <div ref={projectsRef} className="w-full bg-white text-black px-6 md:px-20 py-20">
      {/* Expanding White Space on Scroll */}
      <motion.div
        style={{ height: topPadding, opacity: topOpacity }}
        className="w-full bg-white"
      />

      <h2 className="text-5xl font-bold mb-12">↳ Projects</h2>

      {/* Info */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b pb-10 border-black/30 text-sm">
        <div>
          <h4 className="uppercase text-xs font-medium mb-2 text-gray-500">Timeframe</h4>
          <p>YEAR 2022–23</p>
        </div>
        <div>
          <h4 className="uppercase text-xs font-medium mb-2 text-gray-500">Discipline</h4>
          <p>No code development</p>
          <p>UI design</p>
          <p>UX research</p>
          <p>Art Direction</p>
        </div>
        <div>
          <h4 className="uppercase text-xs font-medium mb-2 text-gray-500">Tools</h4>
          <p>Webflow</p>
          <p>After effect</p>
          <p>Wized</p>
        </div>
        <div>
          <h4 className="uppercase text-xs font-medium mb-2 text-gray-500">Industry</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="border border-black text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Project List */}
      <div className="mt-12 space-y-10">
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b pb-6 border-black/30"
          >
            <div className="flex items-center gap-4">
              <span className="text-xl">⌘</span>
              <h3 className="text-lg font-medium">
                {project.name}{' '}
                <span className="text-gray-500">— {project.description}</span>
              </h3>
            </div>
            <button className="border px-4 py-2 text-xs font-medium rounded-full flex items-center gap-2 hover:bg-black hover:text-white transition">
              🔒 Contact for Details
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects
