import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faExternalLinkAlt, 
  faArrowLeft, 
  faCalendar, 
  faUser, 
  faRocket,
  faDownload,
  faCode,
  faRobot,
  faUsers,
  faStar,
  faGlobe,
  faChevronRight,
  faPlay,
  faAward,
  faTrophy,
  faLightbulb,
 
  faBrain,
  faHeart,
  faComments,
  faChartLine,
  faMagic
} from '@fortawesome/free-solid-svg-icons'
import { faGithub ,faApple} from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import { projects } from '../../data/personalData'

const AiToyPage = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  
  const project = projects.find(p => p.id === 'aitoy')
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-blue-400 hover:text-blue-300">
            ← Back to Projects
          </Link>
        </div>
      </div>
    )
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
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10 animate-float"
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              background: `linear-gradient(135deg, ${project.primaryColor}, ${project.accentColor})`,
              left: `${10 + i * 15}%`,
              top: `${5 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${6 + i}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center px-4 pt-20"
        style={{ y, opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0.8]) }}
      >
        <div className="text-center z-10 max-w-6xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-start mb-8"
          >
            <Link to="/projects" className="group">
              <motion.button
                whileHover={{ scale: 1.05, x: -4 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-6 py-3 glass rounded-2xl text-gray-300 hover:text-white hover:glass-strong transition-all duration-300"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Back to Projects
              </motion.button>
            </Link>
          </motion.div>

          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-6 mb-8">
              <div 
                className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-2xl"
                style={{ 
                  backgroundColor: `${project.primaryColor}20`,
                  border: `2px solid ${project.primaryColor}40`
                }}
              >
                {project.images[0]}
              </div>
              <div className="text-left">
                <h1 className="text-6xl md:text-8xl font-black text-display leading-none">
                  <span className="gradient-text-rainbow">{project.title}</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 mt-2">
                  {project.subtitle}
                </p>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              {project.longDescription}
            </p>

            {/* Status & Timeline */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                <div className={`w-3 h-3 rounded-full ${
                  project.status === 'Beta' ? 'bg-purple-400 animate-pulse' : 'bg-blue-400'
                }`} />
                <span className="text-sm font-medium">{project.status}</span>
              </div>
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                <FontAwesomeIcon icon={faCalendar} className="text-blue-400" />
                <span className="text-sm font-medium">{project.timeline}</span>
              </div>
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                <FontAwesomeIcon icon={faUser} className="text-purple-400" />
                <span className="text-sm font-medium">{project.role}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center gap-3 text-lg font-semibold px-8 py-4"
                >
                  <FontAwesomeIcon icon={faPlay} />
                  Try Demo
                  <FontAwesomeIcon icon={faExternalLinkAlt} className="text-sm" />
                </motion.a>
              )}
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center gap-3 text-lg font-semibold px-8 py-4"
                >
                  <FontAwesomeIcon icon={faGithub} />
                  View Code
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Project Stats */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AI Innovation
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {project.impact}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {Object.entries(project.metrics).map(([key, value], index) => (
              <motion.div
                key={key}
                variants={fadeInUp}
                className="card-elevated p-8 text-center hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="text-4xl font-bold gradient-text-blue mb-2 group-hover:scale-110 transition-transform duration-300">
                  {value}
                </div>
                <div className="text-sm text-gray-400 capitalize font-medium">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AI Companion Features
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Next-generation AI companion with advanced emotion recognition, personalized learning, and natural conversation.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {project.features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card-elevated p-8 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${project.primaryColor}20` }}
                  >
                    <FontAwesomeIcon icon={faBrain} style={{ color: project.primaryColor }} />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {feature}
                  </h3>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technologies Used */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Technologies Used
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Built with advanced AI technologies and modern web frameworks for intelligent, responsive interactions.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
          >
            {project.technologies.map((tech, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -4 }}
                className="glass-strong p-6 rounded-2xl text-center hover:glass-ultra transition-all duration-300 group"
              >
                <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  <FontAwesomeIcon icon={faCode} className="text-purple-400" />
                </div>
                <div className="text-sm font-medium text-white group-hover:text-purple-400 transition-colors">
                  {tech}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AI Development Journey
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Pushing the boundaries of AI-human interaction through innovative solutions and breakthrough technologies.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Challenges */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="glass-strong p-8 rounded-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faTarget} className="text-white text-xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Key Challenges</h3>
                </div>
                <div className="space-y-4">
                  {project.challenges.map((challenge, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-start gap-3 p-4 glass rounded-2xl"
                    >
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{challenge}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="glass-strong p-8 rounded-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faTrophy} className="text-white text-xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Achievements</h3>
                </div>
                <div className="space-y-4">
                  {project.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-start gap-3 p-4 glass rounded-2xl"
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beta Access */}
      <section className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="glass-ultra p-12 rounded-3xl"
          >
            <div className="mb-8">
              <div 
                className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
                style={{ 
                  background: `linear-gradient(135deg, ${project.primaryColor}, ${project.accentColor})`
                }}
              >
                <FontAwesomeIcon icon={faRobot} className="text-3xl text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Meet {project.title}
              </h3>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Experience the future of AI companionship with advanced emotion recognition and personalized interactions. 
                Join the beta program and be among the first to explore next-generation AI.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                {project.demo && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center gap-3 text-lg font-semibold px-8 py-4"
                  >
                    <FontAwesomeIcon icon={faPlay} />
                    Try Beta
                  </motion.a>
                )}
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary flex items-center gap-3 text-lg font-semibold px-8 py-4"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                    View Source
                  </motion.a>
                )}
              </div>

              <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faComments} className="text-purple-400" />
                  <span>{project.metrics.interactions} interactions</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faChartLine} className="text-blue-400" />
                  <span>{project.metrics.accuracy} accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faHeart} className="text-pink-400" />
                  <span>{project.metrics.satisfaction} satisfaction</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <Link to="/projects" className="group">
              <motion.button
                whileHover={{ scale: 1.05, x: -4 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-6 py-3 glass rounded-2xl text-gray-300 hover:text-white hover:glass-strong transition-all duration-300"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                All Projects
              </motion.button>
            </Link>
            
            <Link to="/contact" className="group">
              <motion.button
                whileHover={{ scale: 1.05, x: 4 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Discuss AI Projects
                <FontAwesomeIcon icon={faChevronRight} />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AiToyPage 