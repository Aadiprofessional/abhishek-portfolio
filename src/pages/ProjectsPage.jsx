import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faExternalLinkAlt, 
  faFilter, 
  faEye, 
  faCode, 
  faMobile, 
  faRocket,
  faChevronRight,
  faDownload,
  faStar,
  faUsers,
  faGlobe,
  faCalendar,
  faTag,
  faSearch
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import { projects } from '../data/personalData'

const ProjectsPage = () => {
  const [filter, setFilter] = useState('all')
  const [hoveredProject, setHoveredProject] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const categories = [
    { id: 'all', name: 'All Projects', icon: faGlobe },
    { id: 'featured', name: 'Featured', icon: faStar },
    { id: 'Mobile Application', name: 'Mobile Apps', icon: faMobile },
    { id: 'Web Application', name: 'Web Apps', icon: faCode },
    { id: 'Enterprise Solution', name: 'Enterprise', icon: faRocket }
  ]

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || 
      (filter === 'featured' ? project.type === 'featured' : project.category === filter)
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const getProjectRoute = (projectId) => {
    const routes = {
      'matrix-ai': '/projects/matrix-ai',
      'edusmart': '/projects/edusmart',
      'buildsphere': '/projects/buildsphere',
      'aitoy': '/projects/aitoy'
    }
    return routes[projectId] || '/projects'
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10 animate-float"
            style={{
              width: `${60 + i * 30}px`,
              height: `${60 + i * 30}px`,
              background: `linear-gradient(135deg, ${
                i % 3 === 0 ? '#007AFF' : i % 3 === 1 ? '#5856D6' : '#FF2D92'
              }, transparent)`,
              left: `${5 + i * 12}%`,
              top: `${10 + i * 10}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${8 + i}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center px-4 pt-20"
        style={{ y, opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0.8]) }}
      >
        <div className="text-center z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-12"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-display mb-6 leading-none">
              <span className="block text-white">My</span>
              <span className="block gradient-text-rainbow">Projects</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              A showcase of innovative solutions, cutting-edge technology, and impactful applications 
              that demonstrate my expertise in modern development.
            </p>
          </motion.div>

          {/* Project Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
          >
            {[
              { number: projects.length, label: 'Total Projects', icon: faGlobe },
              { number: projects.filter(p => p.type === 'featured').length, label: 'Featured', icon: faStar },
              { number: projects.filter(p => p.category === 'Mobile Application').length, label: 'Mobile Apps', icon: faMobile },
              { number: projects.filter(p => p.status === 'Live').length, label: 'Live Projects', icon: faRocket }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5, type: "spring" }}
                className="glass-strong p-6 rounded-3xl hover:glass-ultra transition-all duration-300 text-center group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  <FontAwesomeIcon icon={stat.icon} className="text-blue-400" />
                </div>
                <div className="text-2xl font-bold gradient-text-blue mb-1">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="max-w-md mx-auto mb-8"
          >
            <div className="relative">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass-strong rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              />
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3 text-white/60"
            >
              <span className="text-sm font-light">Explore Projects</span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1 h-3 bg-white/60 rounded-full mt-2"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Filter Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Filter by Category
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore different types of projects and find what interests you most.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                variants={fadeInUp}
                onClick={() => setFilter(category.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  filter === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                    : 'glass text-gray-300 hover:glass-strong hover:text-white'
                }`}
              >
                <FontAwesomeIcon icon={category.icon} className="text-sm" />
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <p className="text-gray-400">
              Showing <span className="text-blue-400 font-semibold">{filteredProjects.length}</span> projects
              {searchTerm && (
                <span> matching "<span className="text-white">{searchTerm}</span>"</span>
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${filter}-${searchTerm}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onHoverStart={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                  className="group relative card-elevated h-full overflow-hidden hover:shadow-2xl transition-all duration-500"
                >
                  {/* Project Header */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                          style={{ 
                            backgroundColor: `${project.primaryColor}20`,
                            border: `1px solid ${project.primaryColor}40`
                          }}
                        >
                          {project.images[0]}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-400">{project.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: `${project.primaryColor}20`,
                            color: project.primaryColor
                          }}
                        >
                          {project.category}
                        </span>
                        {project.type === 'featured' && (
                          <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium">
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-2 h-2 rounded-full ${
                        project.status === 'Live' ? 'bg-green-400' : 'bg-blue-400'
                      }`} />
                      <span className="text-sm text-gray-400">{project.status}</span>
                    </div>
                  </div>

                  {/* Project Metrics */}
                  {project.metrics && (
                    <div className="p-6 border-b border-white/10">
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(project.metrics).slice(0, 4).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-lg font-bold text-blue-400">{value}</div>
                            <div className="text-xs text-gray-400 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="p-6 border-b border-white/10">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-1 bg-white/10 text-white rounded-lg text-xs hover:bg-white/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-white/5 text-gray-400 rounded-lg text-xs">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Footer */}
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <FontAwesomeIcon icon={faCalendar} />
                        <span>{project.timeline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          to={getProjectRoute(project.id)}
                          className="group/btn relative"
                        >
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300"
                          >
                            <FontAwesomeIcon icon={faEye} />
                            View Details
                            <FontAwesomeIcon 
                              icon={faChevronRight} 
                              className="group-hover/btn:translate-x-1 transition-transform duration-300" 
                            />
                          </motion.button>
                        </Link>
                      </div>
                    </div>

                    {/* External Links */}
                    <div className="flex items-center gap-2 mt-4">
                      {project.demo && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:glass-strong transition-all duration-300"
                        >
                          <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs" />
                        </motion.a>
                      )}
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:glass-strong transition-all duration-300"
                        >
                          <FontAwesomeIcon icon={faGithub} className="text-xs" />
                        </motion.a>
                      )}
                      {project.playStore && (
                        <motion.a
                          href={project.playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:glass-strong transition-all duration-300"
                        >
                          <FontAwesomeIcon icon={faGooglePlay} className="text-xs" />
                        </motion.a>
                      )}
                      {project.appStore && (
                        <motion.a
                          href={project.appStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:glass-strong transition-all duration-300"
                        >
                          <FontAwesomeIcon icon={faApple} className="text-xs" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-4">No Projects Found</h3>
              <p className="text-gray-400 mb-8">
                Try adjusting your search or filter criteria to find more projects.
              </p>
              <motion.button
                onClick={() => {
                  setFilter('all')
                  setSearchTerm('')
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Show All Projects
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ProjectsPage 