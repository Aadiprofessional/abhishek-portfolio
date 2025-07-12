import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Experience = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const experiences = [
    {
      id: 1,
      title: 'Software Development Engineer',
      company: 'MatrixAI',
      location: 'Hong Kong',
      period: 'Dec 2024 - Present',
      type: 'Full-time',
      description: 'Designing and developing feature-rich AI applications integrating image/video generation, speech recognition, and chatbot functionalities.',
      achievements: [
        'Built and deployed AI-powered applications serving 1M+ users',
        'Integrated cutting-edge AI/ML technologies for enhanced user experience',
        'Implemented real-time features and optimized app performance',
        'Collaborated with cross-functional teams to deliver innovative solutions'
      ],
      technologies: ['React', 'React Native', 'AI/ML', 'Node.js', 'Python', 'Firebase'],
      current: true
    },
    {
      id: 2,
      title: 'Software Development Engineer',
      company: 'AppYard',
      location: 'Bangalore, India',
      period: 'May 2024 - Nov 2024',
      type: 'Full-time',
      description: 'Developed and optimized mobile and web apps using React and React Native, significantly improving performance and user experience.',
      achievements: [
        'Delivered 15+ client projects with exceptional quality',
        'Published several apps to Google Play Store and Apple App Store',
        'Achieved significant performance improvements in existing applications',
        'Maintained high client satisfaction rates through effective communication'
      ],
      technologies: ['React', 'React Native', 'JavaScript', 'Mobile Development'],
      current: false
    },
    {
      id: 3,
      title: 'App Developer',
      company: 'Stimuler',
      location: 'Bangalore, India',
      period: 'Feb 2023 - Aug 2023',
      type: 'Full-time',
      description: 'Built and maintained the AI Mentor App using React Native, achieving 1M+ downloads and high user satisfaction.',
      achievements: [
        'Achieved 1M+ downloads for AI Mentor App',
        'Maintained high user satisfaction and app store ratings',
        'Implemented secure transaction processing systems',
        'Designed and developed e-commerce platform features'
      ],
      technologies: ['React Native', 'AI Integration', 'E-commerce', 'Mobile Development'],
      current: false
    }
  ]

  const responsibilities = [
    {
      title: 'Leadership & Coordination',
      items: [
        'Senior Coordinator and Designer at AKGEC IDEA LAB',
        'Led design and development initiatives',
        'Coordinated with team members for successful project execution',
        'Enhanced lab\'s role in fostering creativity and technical skills'
      ]
    },
    {
      title: 'Event Management',
      items: [
        'Coordinator at TEDxAKGEC - organized inspiring talks and ideas',
        'Event Manager at IEEE - managed technical events and workshops',
        'Team Member at Conatus - contributed to various technical initiatives',
        'Assisted in planning and execution of large-scale events'
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="experience" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-r from-dark-400/20 to-transparent"></div>
      
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            My professional journey in software development and innovation
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-primary-400 to-primary-600"></div>

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className={`flex flex-col md:flex-row items-start md:items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary-400 rounded-full border-4 border-dark-200 z-10">
                  {exp.current && (
                    <div className="absolute inset-0 bg-primary-400 rounded-full animate-ping"></div>
                  )}
                </div>

                {/* Content */}
                <div className={`w-full md:w-1/2 ml-16 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
                }`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-effect p-6 rounded-2xl relative"
                  >
                    {exp.current && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Current
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                      <div className="text-primary-400 font-semibold">{exp.company}</div>
                      <div className="text-gray-400 text-sm">{exp.location} • {exp.period}</div>
                      <div className="text-primary-300 text-sm font-medium mt-1">{exp.type}</div>
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-primary-400 mb-2">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-gray-300 text-sm flex items-start">
                            <span className="text-primary-400 mr-2 mt-1">▸</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-primary-500/20 text-primary-300 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Responsibilities */}
        <motion.div variants={itemVariants} className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">
            Leadership & Responsibilities
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {responsibilities.map((resp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="glass-effect p-6 rounded-2xl"
              >
                <h4 className="text-xl font-bold text-primary-400 mb-4">{resp.title}</h4>
                <ul className="space-y-3">
                  {resp.items.map((item, idx) => (
                    <li key={idx} className="text-gray-300 flex items-start">
                      <span className="text-primary-400 mr-3 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Experience 