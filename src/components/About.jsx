import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

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

  const stats = [
    { number: '15+', label: 'Client Projects' },
    { number: '1M+', label: 'App Downloads' },
    { number: '3+', label: 'Years Experience' },
    { number: '5+', label: 'Technologies' }
  ]

  return (
    <section id="about" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-400/50 to-transparent"></div>
      
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
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Passionate developer crafting innovative solutions from Hong Kong
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 gradient-text">
                Hey there! I'm Abhishek 👋
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Known as <strong className="text-primary-400">Aadi</strong> to my friends, 
                I'm a passionate Software Development Engineer currently making waves at 
                <strong className="text-primary-400"> MatrixAI in Hong Kong</strong>. 
                My journey in tech has been nothing short of exciting!
              </p>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                I specialize in creating feature-rich applications that integrate cutting-edge 
                technologies like <strong className="text-primary-400">AI/ML, image/video generation, 
                and speech recognition</strong>. My work spans from mobile apps to web platforms, 
                always focusing on user experience and innovative solutions.
              </p>

              <p className="text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or participating in hackathons. I believe in continuous 
                learning and pushing the boundaries of what's possible with technology.
              </p>
            </div>

            {/* Education */}
            <motion.div 
              variants={itemVariants}
              className="glass-effect p-6 rounded-2xl"
            >
              <h4 className="text-xl font-semibold mb-4 text-primary-400">Education</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-semibold text-white">
                    Bachelor of Technology (B.Tech) - Information Technology
                  </h5>
                  <p className="text-gray-400">
                    Ajay Kumar Garg Engineering College, Ghaziabad, India
                  </p>
                  <p className="text-sm text-primary-300">2021 - Present</p>
                </div>
                <div>
                  <h5 className="font-semibold text-white">CBSE (Class X & XII)</h5>
                  <p className="text-gray-400">Kendriya Vidyalaya Old Cantt, India</p>
                  <p className="text-sm text-primary-300">2011 - 2021</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Stats & Achievements */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="glass-effect p-6 rounded-2xl text-center"
                >
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Achievements */}
            <motion.div 
              variants={itemVariants}
              className="glass-effect p-6 rounded-2xl"
            >
              <h4 className="text-xl font-semibold mb-4 text-primary-400">
                🏆 Recent Achievements
              </h4>
              <div className="space-y-4">
                <div className="border-l-4 border-primary-400 pl-4">
                  <h5 className="font-semibold text-white">
                    NextGen Kalam Innovation Sprint 2024
                  </h5>
                  <p className="text-gray-400 text-sm">
                    Won 1st Prize at AKTU among 243 teams for innovative VR project
                  </p>
                </div>
                <div className="border-l-4 border-primary-400 pl-4">
                  <h5 className="font-semibold text-white">
                    IDE BootCamp(SIH) 2024
                  </h5>
                  <p className="text-gray-400 text-sm">
                    First prize for VR RescueX product development
                  </p>
                </div>
                <div className="border-l-4 border-primary-400 pl-4">
                  <h5 className="font-semibold text-white">
                    Mini Anveshana 2024
                  </h5>
                  <p className="text-gray-400 text-sm">
                    First prize in 3D model development project
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Current Role */}
            <motion.div 
              variants={itemVariants}
              className="glass-effect p-6 rounded-2xl"
            >
              <h4 className="text-xl font-semibold mb-4 text-primary-400">
                💼 Currently At
              </h4>
              <div className="border-l-4 border-primary-400 pl-4">
                <h5 className="font-semibold text-white">
                  Software Development Engineer
                </h5>
                <p className="text-primary-300 font-medium">MatrixAI, Hong Kong</p>
                <p className="text-gray-400 text-sm mt-2">
                  Designing and developing feature-rich AI applications with 
                  image/video generation, speech recognition, and chatbot functionalities
                </p>
                <p className="text-sm text-primary-300 mt-2">Dec'24 - Present</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default About 