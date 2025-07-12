import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { projectsData } from '../data/projectsData'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  useEffect(() => {
    const foundProject = projectsData.find(p => p.id === id)
    if (foundProject) {
      setProject(foundProject)
    } else {
      // If project not found, redirect to home
      navigate('/')
    }
  }, [id, navigate])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-300 via-dark-200 to-dark-100 text-white">
      {/* Background 3D Elements */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <Project3D />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 pt-24 pb-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div variants={itemVariants} className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Portfolio
            </Link>
          </motion.div>

          {/* Project Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                project.status === 'Live' 
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                  : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
              }`}>
                {project.status}
              </span>
              <span className="text-primary-400 font-medium">{project.year}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
              {project.title}
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {project.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Live Project
                </motion.a>
              )}
              
              {project.alternativeUrl && (
                <motion.a
                  href={project.alternativeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  Alternative Link
                </motion.a>
              )}
              
              {project.adminUrl && (
                <motion.a
                  href={project.adminUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  Admin Panel
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Project Images */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="glass-effect p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 gradient-text">Project Gallery</h2>
              
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-primary-400/20 to-purple-600/20 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-6xl opacity-30">{project.category.split(' ')[0].charAt(0)}</div>
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {/* Expand Button */}
                  <button
                    onClick={() => setIsImageModalOpen(true)}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                </div>
                
                {/* Image Indicators */}
                <div className="flex justify-center gap-2 mt-4">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-primary-400' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Project Description */}
            <motion.div variants={itemVariants}>
              <div className="glass-effect p-8 rounded-2xl h-full">
                <h2 className="text-2xl font-bold mb-6 gradient-text">About This Project</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {project.longDescription}
                </p>
                
                {project.impact && (
                  <div className="p-4 bg-primary-500/10 border border-primary-500/20 rounded-xl">
                    <h3 className="font-semibold text-primary-300 mb-2">Impact & Results</h3>
                    <p className="text-primary-100 text-sm">{project.impact}</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Project Details */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Technologies */}
              <div className="glass-effect p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 gradient-text">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-primary-500/20 text-primary-300 px-4 py-2 rounded-full text-sm font-medium border border-primary-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="glass-effect p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 gradient-text">Key Features</h3>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary-400 mt-1">▸</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Project Info */}
              <div className="glass-effect p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 gradient-text">Project Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Role:</span>
                    <span className="text-white font-medium">{project.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Year:</span>
                    <span className="text-white font-medium">{project.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-white font-medium">{project.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`font-medium ${
                      project.status === 'Live' ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation to Other Projects */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="glass-effect p-8 rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-6 gradient-text">
                Explore More Projects
              </h3>
              <p className="text-gray-300 mb-6">
                Check out other innovative solutions I've crafted
              </p>
              <Link
                to="/"
                className="btn-primary inline-flex items-center gap-2"
              >
                View All Projects
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Image Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsImageModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full aspect-video bg-gradient-to-br from-primary-400/20 to-purple-600/20 rounded-xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-8xl opacity-30">{project.category.split(' ')[0].charAt(0)}</div>
              
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// 3D Component for Project Detail
const Project3D = () => {
  return (
    <group>
      <mesh position={[0, 0, -5]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#667eea" transparent opacity={0.3} wireframe />
      </mesh>
      
      <mesh position={[3, 2, -3]} rotation={[0.5, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#f093fb" transparent opacity={0.2} wireframe />
      </mesh>
      
      <mesh position={[-2, -1, -4]} rotation={[0, 0.5, 0]}>
        <tetrahedronGeometry args={[1]} />
        <meshStandardMaterial color="#764ba2" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

export default ProjectDetail 