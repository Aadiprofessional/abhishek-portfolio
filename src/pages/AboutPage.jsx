import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCode, 
  faMobile, 
  faBrain, 
  faRocket,
  faGraduationCap,
  faMapMarkerAlt,
  faCalendar,
  faHeart,
  faLightbulb,
  faCoffee,
  faMusic,
  faGamepad,
  faCamera,
  faPlane,
  faBook,
  faDumbbell,
  faChevronRight,
  faDownload,
  faExternalLinkAlt,
  faStar,
  faAward,
  faUsers,
  faGlobe
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { personalInfo, socialLinks, skills, achievements, testimonials } from '../data/personalData'

const AboutPage = () => {
  const containerRef = useRef(null)
  const [activeSkillCategory, setActiveSkillCategory] = useState('core')
  
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

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

  const skillCategories = [
    { id: 'core', name: 'Core Skills', icon: faRocket },
    { id: 'frontend', name: 'Frontend', icon: faCode },
    { id: 'backend', name: 'Backend', icon: faBrain },
    { id: 'ai', name: 'AI/ML', icon: faBrain },
    { id: 'tools', name: 'Tools', icon: faLightbulb },
    { id: 'languages', name: 'Languages', icon: faBook }
  ]

  const personalStats = [
    { icon: faCode, value: personalInfo.projectsCompleted, label: 'Projects Completed' },
    { icon: faUsers, value: personalInfo.appDownloads, label: 'App Downloads' },
    { icon: faGlobe, value: personalInfo.githubRepos, label: 'GitHub Repos' },
    { icon: faCoffee, value: personalInfo.coffeeConsumed, label: 'Coffee Cups' }
  ]

  const hobbies = [
    { icon: faMusic, name: 'Music', description: 'Playing guitar and discovering new artists' },
    { icon: faGamepad, name: 'Gaming', description: 'Strategy games and indie titles' },
    { icon: faCamera, name: 'Photography', description: 'Capturing moments and landscapes' },
    { icon: faPlane, name: 'Travel', description: 'Exploring new cultures and places' },
    { icon: faBook, name: 'Reading', description: 'Tech blogs and sci-fi novels' },
    { icon: faDumbbell, name: 'Fitness', description: 'Staying active and healthy' }
  ]

  const iconMap = {
    'GitHub': faGithub,
    'LinkedIn': faLinkedin,
    'Twitter': faTwitter,
    'Mail': '@'
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
              background: `linear-gradient(135deg, ${
                i % 3 === 0 ? '#007AFF' : i % 3 === 1 ? '#5856D6' : '#FF2D92'
              }, transparent)`,
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
        style={{ y, opacity }}
      >
        <div className="text-center z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            {/* Profile Image Placeholder */}
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
              AS
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              About <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">Me</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              {personalInfo.personalMotto}
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {personalStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="glass-strong p-6 rounded-3xl hover:glass-ultra transition-all duration-500 text-center group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  <FontAwesomeIcon icon={stat.icon} className="text-blue-400" />
                </div>
                <div className="text-2xl font-bold gradient-text-blue mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Personal Story */}
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
              My Journey
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From curious beginner to professional software engineer - here's how I got here.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Story */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="glass-strong p-8 rounded-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faRocket} className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Current Role</h3>
                    <p className="text-blue-400">{personalInfo.currentRole}</p>
                  </div>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p className="leading-relaxed">
                    Currently working as a <strong className="text-blue-400">Software Development Engineer</strong> at 
                    <strong className="text-purple-400"> {personalInfo.currentCompany}</strong> in {personalInfo.location}, 
                    where I lead the development of AI-powered applications serving over 1 million users worldwide.
                  </p>
                  <p className="leading-relaxed">
                    My journey started with a fascination for technology and has evolved into a passion for creating 
                    innovative solutions that make a real impact. I specialize in <strong className="text-blue-400">
                    {personalInfo.specialization}</strong>, always pushing the boundaries of what's possible.
                  </p>
                </div>
              </div>

              <div className="glass-strong p-8 rounded-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faGraduationCap} className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Education & Growth</h3>
                    <p className="text-green-400">{personalInfo.education}</p>
                  </div>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p className="leading-relaxed">
                    My educational background in Computer Science provided the foundation, but my real learning 
                    happens through hands-on projects, open-source contributions, and staying curious about 
                    emerging technologies.
                  </p>
                  <p className="leading-relaxed">
                    I believe in continuous learning and have earned multiple certifications in areas like 
                    AI/ML, cloud computing, and mobile development to stay at the forefront of technology.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: Location & Interests */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="glass-strong p-8 rounded-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Based in Hong Kong</h3>
                    <p className="text-purple-400">Living the tech life in Asia's hub</p>
                  </div>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p className="leading-relaxed">
                    Hong Kong provides the perfect blend of East-meets-West culture and cutting-edge technology. 
                    The city's dynamic environment fuels my creativity and keeps me connected to global tech trends.
                  </p>
                  <p className="leading-relaxed">
                    Being in this international hub allows me to work with diverse teams and understand 
                    different perspectives, which greatly influences my approach to problem-solving.
                  </p>
                </div>
              </div>

              <div className="glass-strong p-8 rounded-3xl">
                <h3 className="text-2xl font-bold text-white mb-6">When I'm Not Coding</h3>
                <div className="grid grid-cols-2 gap-4">
                  {hobbies.map((hobby, index) => (
                    <motion.div
                      key={hobby.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="glass p-4 rounded-2xl text-center hover:glass-strong transition-all duration-300 group"
                    >
                      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                        <FontAwesomeIcon icon={hobby.icon} className="text-blue-400" />
                      </div>
                      <div className="text-sm font-medium text-white mb-1">{hobby.name}</div>
                      <div className="text-xs text-gray-400">{hobby.description}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
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
              Technical Skills
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A comprehensive overview of my technical expertise and proficiency levels.
            </p>
          </motion.div>

          {/* Skill Categories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {skillCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveSkillCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  activeSkillCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'glass text-gray-300 hover:glass-strong hover:text-white'
                }`}
              >
                <FontAwesomeIcon icon={category.icon} className="text-sm" />
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            key={activeSkillCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skills[activeSkillCategory]?.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass-strong p-6 rounded-3xl hover:glass-ultra transition-all duration-500 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {skill.name}
                      </h3>
                      <p className="text-sm text-gray-400">{skill.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-400">{skill.level}%</div>
                    <div className="text-xs text-gray-400">Proficiency</div>
                  </div>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
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
              What People Say
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Feedback from colleagues and clients I've had the pleasure to work with.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="glass-strong p-8 rounded-3xl hover:glass-ultra transition-all duration-500 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                    <p className="text-sm text-blue-400">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                  <div className="text-xs text-gray-400">{testimonial.project}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
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
              Recognition & Achievements
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Milestones that mark my journey and growth in the tech industry.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="glass-strong p-6 rounded-3xl hover:glass-ultra transition-all duration-500 text-center group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {achievement.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3">{achievement.description}</p>
                <div className="text-xs text-blue-400 font-medium">{achievement.date}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section */}
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
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faHeart} className="text-3xl text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Let's Connect
              </h3>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                I'm always open to discussing new opportunities, collaborating on interesting projects, 
                or simply having a conversation about technology and innovation.
              </p>
              
              {/* Social Links */}
              <div className="flex justify-center gap-6 mb-8">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center hover:glass-strong transition-all duration-300">
                      {social.icon === 'Mail' ? (
                        <span className="text-2xl group-hover:text-blue-400 transition-colors">@</span>
                      ) : (
                        <FontAwesomeIcon 
                          icon={iconMap[social.icon]} 
                          className="text-2xl group-hover:text-blue-400 transition-colors" 
                        />
                      )}
                    </div>
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {social.description}
                    </div>
                  </motion.a>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg font-semibold px-8 py-4"
                >
                  Get In Touch
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center gap-3 text-lg font-semibold px-8 py-4"
                >
                  <FontAwesomeIcon icon={faDownload} />
                  Download Resume
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage 