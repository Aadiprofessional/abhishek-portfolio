import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const logos = [
  'GitHub',
  'zendesk',
  'DELL',
  'Rakuten',
  'TED',
  'Upwork',
  'The New York Times'
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
        They are using <span className="font-semibold">Webflow</span> to build websites and webapps —{' '}
        <span className="text-gray-400">Just like me.</span>
      </motion.p>

      <div className="mt-10 max-w-6xl mx-auto flex flex-wrap items-center gap-10">
        {logos.map((name, index) => (
          <div
            key={index}
            className="text-black text-xl font-semibold"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default WebflowShowcase
