import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faPaperPlane, 
  faUser, 
  faTag,
  faMessage,
  faCheckCircle,
  faExclamationTriangle,
  faGlobe,
  faCalendar,
  faClock,
  faHeart,
  faRocket,
  faDownload,
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { personalInfo, socialLinks } from '../data/personalData'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [currentTime, setCurrentTime] = useState('')
  
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  // Update Hong Kong time
  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hongKongTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Hong_Kong',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        weekday: 'long'
      }).format(now)
      setCurrentTime(hongKongTime)
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  const contactMethods = [
    {
      icon: faEnvelope,
      title: 'Email',
      value: personalInfo.email,
      description: 'Send me an email anytime',
      action: `mailto:${personalInfo.email}`,
      color: '#007AFF'
    },
    {
      icon: faPhone,
      title: 'Phone',
      value: personalInfo.phone,
      description: 'Call for urgent matters',
      action: `tel:${personalInfo.phone}`,
      color: '#34C759'
    },
    {
      icon: faMapMarkerAlt,
      title: 'Location',
      value: personalInfo.location,
      description: 'Currently based in',
      action: 'https://maps.google.com/?q=Hong+Kong',
      color: '#FF3B30'
    },
    {
      icon: faClock,
      title: 'Availability',
      value: 'Mon - Fri, 9AM - 6PM',
      description: 'Hong Kong Time (GMT+8)',
      action: null,
      color: '#5856D6'
    }
  ]

  const socialPlatforms = socialLinks.map(social => ({
    ...social,
    icon: social.icon === 'GitHub' ? faGithub : 
          social.icon === 'LinkedIn' ? faLinkedin : 
          social.icon === 'Twitter' ? faTwitter : faEnvelope
  }))

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
        style={{ y, opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0.8]) }}
      >
        <div className="text-center z-10 max-w-6xl mx-auto">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full mb-8"
          >
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-300">
              Available for new opportunities • {currentTime} HKT
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-12"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-display mb-6 leading-none">
              <span className="block text-white">Let's</span>
              <span className="block gradient-text-rainbow">Connect</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Ready to discuss your next project, explore collaboration opportunities, 
              or just have a conversation about technology and innovation.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
          >
            {[
              { value: '< 24h', label: 'Response Time', icon: faClock },
              { value: personalInfo.experience, label: 'Years Experience', icon: faRocket },
              { value: personalInfo.projectsCompleted, label: 'Projects Completed', icon: faCheckCircle },
              { value: personalInfo.availability, label: 'Availability', icon: faHeart }
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
                <div className="text-2xl font-bold gradient-text-blue mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
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
              <span className="text-sm font-light">Get in touch</span>
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

      {/* Contact Methods */}
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
              Get In Touch
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose your preferred way to reach out. I'm always excited to connect with fellow developers, 
              potential clients, and technology enthusiasts.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                variants={fadeInUp}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="card-elevated h-full p-8 text-center hover:shadow-2xl transition-all duration-500"
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto shadow-lg"
                    style={{ backgroundColor: `${method.color}20`, border: `1px solid ${method.color}40` }}
                  >
                    <FontAwesomeIcon icon={method.icon} style={{ color: method.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {method.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{method.description}</p>
                  <div className="text-lg font-semibold text-white mb-6">
                    {method.value}
                  </div>
                  {method.action && (
                    <motion.a
                      href={method.action}
                      target={method.action.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Contact Now
                      <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs" />
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Send a Message
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Have a specific project in mind? Fill out the form below and I'll get back to you within 24 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="glass-ultra p-8 md:p-12 rounded-3xl"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 glass-strong rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 glass-strong rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  <FontAwesomeIcon icon={faTag} className="mr-2" />
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 glass-strong rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  <FontAwesomeIcon icon={faMessage} className="mr-2" />
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-4 glass-strong rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project, ideas, or just say hello!"
                />
              </div>

              {/* Submit Status */}
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-2xl flex items-center gap-3 ${
                    submitStatus === 'success' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  <FontAwesomeIcon 
                    icon={submitStatus === 'success' ? faCheckCircle : faExclamationTriangle} 
                  />
                  <span>
                    {submitStatus === 'success' 
                      ? 'Message sent successfully! I\'ll get back to you soon.' 
                      : 'Something went wrong. Please try again or contact me directly.'}
                  </span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary text-lg font-semibold py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending Message...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <FontAwesomeIcon icon={faPaperPlane} />
                    Send Message
                  </div>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Social Links */}
      <section className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Follow My Journey
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Stay connected and follow my latest projects, insights, and tech adventures across different platforms.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center gap-8 mb-16"
          >
            {socialPlatforms.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                whileHover={{ scale: 1.1, y: -8 }}
                whileTap={{ scale: 0.9 }}
                className="group relative"
              >
                <div className="w-20 h-20 rounded-3xl glass flex items-center justify-center hover:glass-strong transition-all duration-300">
                  <FontAwesomeIcon 
                    icon={social.icon} 
                    className="text-3xl group-hover:text-blue-400 transition-colors" 
                  />
                </div>
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/80 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap">
                    {social.name}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="glass-ultra p-8 rounded-3xl"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center">
                <FontAwesomeIcon icon={faRocket} className="text-2xl text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white">Ready to Start?</h3>
                <p className="text-gray-400">Let's build something amazing together</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg font-semibold px-8 py-4"
              >
                Start a Project
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
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage 