import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBriefcase, 
  faCalendar, 
  faMapMarkerAlt, 
  faAward,
  faGraduationCap,
  faCode,
  faRocket,
  faTrophy,
  faUsers,
  faChartLine
} from '@fortawesome/free-solid-svg-icons'
import { experience, certifications } from '../data/personalData'

const ExperiencePage = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center px-4 pt-20"
        style={{ y, opacity }}
      >
        <div className="text-center z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
              My <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">Experience</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              A journey of growth, innovation, and continuous learning in the world of technology.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Experience Timeline */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Professional Journey
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Building innovative solutions and leading teams across diverse projects and technologies.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-50" />
            
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="relative pl-20 pb-16 last:pb-0"
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-black shadow-lg" />
                
                {/* Experience Card */}
                <div className="glass-strong p-8 rounded-3xl hover:glass-ultra transition-all duration-500 group">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-4 text-gray-400 mb-4">
                        <span className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faBriefcase} className="text-blue-400" />
                          {exp.company}
                        </span>
                        <span className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-purple-400" />
                          {exp.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <FontAwesomeIcon icon={faCalendar} />
                        <span>{exp.period}</span>
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                          {exp.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {exp.description}
                  </p>
                  
                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <FontAwesomeIcon icon={faTrophy} className="text-yellow-400" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-300">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Technologies */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <FontAwesomeIcon icon={faCode} className="text-green-400" />
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white/10 text-white rounded-full text-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="relative py-32 px-4 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Certifications & Awards
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Continuous learning and professional development through industry-recognized certifications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="glass-strong p-6 rounded-3xl hover:glass-ultra transition-all duration-500 group text-center"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {cert.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {cert.name}
                </h3>
                <p className="text-gray-400 text-sm mb-2">{cert.issuer}</p>
                <p className="text-blue-400 text-sm font-medium">{cert.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Summary */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Core Competencies
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A comprehensive skill set built through years of hands-on experience and continuous learning.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: faCode,
                title: 'Technical Excellence',
                description: 'Full-stack development with modern frameworks and cutting-edge technologies.',
                color: 'from-blue-500 to-indigo-600'
              },
              {
                icon: faUsers,
                title: 'Team Leadership',
                description: 'Leading cross-functional teams and mentoring junior developers.',
                color: 'from-purple-500 to-pink-600'
              },
              {
                icon: faRocket,
                title: 'Innovation',
                description: 'Driving innovation through AI integration and emerging technologies.',
                color: 'from-green-500 to-teal-600'
              }
            ].map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="glass-strong p-8 rounded-3xl hover:glass-ultra transition-all duration-500 group text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${skill.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <FontAwesomeIcon icon={skill.icon} className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                  {skill.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ExperiencePage 