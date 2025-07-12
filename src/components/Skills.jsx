import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const skills = [
    { name: 'React/React Native', level: 95, color: '#61DAFB' },
    { name: 'Node.js', level: 90, color: '#339933' },
    { name: 'JavaScript/TypeScript', level: 92, color: '#F7DF1E' },
    { name: 'Flutter', level: 88, color: '#02569B' },
    { name: 'Python', level: 85, color: '#3776AB' },
    { name: 'Java', level: 82, color: '#ED8B00' },
    { name: 'C++', level: 80, color: '#00599C' },
    { name: 'MySQL', level: 85, color: '#4479A1' },
    { name: 'Firebase', level: 88, color: '#FFCA28' },
    { name: 'Git', level: 90, color: '#F05032' },
    { name: 'RESTful APIs', level: 90, color: '#FF6B6B' },
    { name: 'AI/ML Integration', level: 85, color: '#FF9500' }
  ]

  const tools = [
    'React Native', 'Flutter', 'Node.js', 'Express.js', 'MongoDB', 'Firebase',
    'Google Cloud', 'Figma', 'Android Studio', 'VS Code', 'Git', 'Docker',
    'Elasticsearch', 'VirusTotal API', 'WhatsApp Business API', 'Razorpay'
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const skillBarVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    })
  }

  return (
    <section id="skills" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-400/30 to-transparent"></div>
      
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
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Skills Progress Bars */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold mb-8 gradient-text">
              Technical Proficiency
            </h3>
            
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  className="group"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-primary-400 font-semibold">{skill.level}%</span>
                  </div>
                  <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      custom={skill.level}
                      variants={skillBarVariants}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${skill.color}40, ${skill.color})`
                      }}
                    />
                    <div 
                      className="absolute top-0 left-0 h-full rounded-full opacity-60"
                      style={{
                        width: `${skill.level}%`,
                        background: `linear-gradient(90deg, transparent, ${skill.color}60)`
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 3D Skills Visualization */}
          <motion.div variants={itemVariants} className="relative">
            <h3 className="text-2xl font-bold mb-8 gradient-text">
              Interactive Skills
            </h3>
            
            <div className="glass-effect rounded-2xl p-6 h-96">
              <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Skills3D />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
              </Canvas>
            </div>
          </motion.div>
        </div>

        {/* Tools & Technologies */}
        <motion.div variants={itemVariants} className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-center gradient-text">
            Tools & Technologies
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={tool}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-effect p-4 rounded-xl text-center group cursor-pointer"
              >
                <div className="text-sm font-medium text-gray-300 group-hover:text-primary-400 transition-colors duration-300">
                  {tool}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <div className="glass-effect p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Always Learning 🚀
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Technology evolves rapidly, and so do I. I'm constantly exploring new frameworks, 
              languages, and tools to stay at the forefront of innovation. Currently diving deep 
              into <span className="text-primary-400 font-semibold">AI/ML integration</span>, 
              <span className="text-primary-400 font-semibold"> Web3 technologies</span>, and 
              <span className="text-primary-400 font-semibold"> advanced React patterns</span>.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// 3D Skills Component
const Skills3D = () => {
  const skillMeshes = [
    { name: 'React', position: [0, 0, 0], color: '#61DAFB' },
    { name: 'Node', position: [2, 1, -1], color: '#339933' },
    { name: 'JS', position: [-2, -1, 1], color: '#F7DF1E' },
    { name: 'Flutter', position: [1, -2, 0], color: '#02569B' },
    { name: 'Python', position: [-1, 2, -1], color: '#3776AB' }
  ]

  return (
    <group>
      {skillMeshes.map((skill, index) => (
        <mesh key={skill.name} position={skill.position}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color={skill.color} 
            transparent 
            opacity={0.7}
            wireframe={index % 2 === 0}
          />
        </mesh>
      ))}
    </group>
  )
}

export default Skills 