import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { personalInfo, skills } from '../data/personalData'

const technologies = [
  'React Native',
  'TypeScript',
  'OpenAI API',
  'Firebase',
  'Node.js',
  'Python',
  'AI/ML'
]

const companies = [
  'MatrixAI',
  'AppYard',
  'Google Play',
  'Apple Store',
  'GitHub',
  'AWS'
]

const WebflowShowcase = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <div className="bg-white w-full py-12 px-6 border-t border-gray-300 font-sans">
      <motion.p
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl font-medium text-black text-left max-w-6xl mx-auto"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        I build <span className="font-semibold">AI-powered applications</span> using cutting-edge technologies —{' '}
        <span className="text-gray-400">Serving {personalInfo.appDownloads} users worldwide.</span>
      </motion.p>

      <div className="mt-10 max-w-6xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-600 mb-4">Technologies I Use</h3>
        <div className="flex flex-wrap items-center gap-6 mb-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="text-black text-lg font-semibold bg-gray-100 px-4 py-2 rounded-lg"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {tech}
            </div>
          ))}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-600 mb-4">Platforms & Companies</h3>
        <div className="flex flex-wrap items-center gap-6">
          {companies.map((company, index) => (
            <div
              key={index}
              className="text-black text-xl font-semibold"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WebflowShowcase
