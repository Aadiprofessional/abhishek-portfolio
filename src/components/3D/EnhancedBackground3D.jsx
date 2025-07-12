import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  Float, 
  Environment, 
  OrbitControls, 
  Sphere, 
  MeshDistortMaterial
} from '@react-three/drei'
import { useScroll as useFramerScroll } from 'framer-motion'
import * as THREE from 'three'

// Error Boundary Component
class ThreeErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.warn('3D Canvas Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

// Floating Geometric Shapes
const FloatingGeometry = ({ position, color, scale = 1, speed = 1 }) => {
  const meshRef = useRef()
  const { scrollYProgress } = useFramerScroll()
  
  useFrame((state) => {
    if (meshRef.current) {
      try {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.3
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.7) * 0.2
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.1
        
        // Parallax movement based on scroll
        const scrollOffset = scrollYProgress.get() * 2
        meshRef.current.position.y = position[1] + Math.sin(scrollOffset * Math.PI) * 2
        meshRef.current.position.x = position[0] + Math.cos(scrollOffset * Math.PI * 0.5) * 1
      } catch (error) {
        console.warn('FloatingGeometry animation error:', error)
      }
    }
  })

  return (
    <Float
      speed={speed}
      rotationIntensity={0.5}
      floatIntensity={0.8}
      floatingRange={[0.1, 0.3]}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.7}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  )
}

// Animated Sphere with Distortion
const DistortedSphere = ({ position, color }) => {
  const meshRef = useRef()
  const { scrollYProgress } = useFramerScroll()
  
  useFrame((state) => {
    if (meshRef.current) {
      try {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
        
        // Scroll-based scaling and movement
        const scrollOffset = scrollYProgress.get()
        meshRef.current.scale.setScalar(1 + scrollOffset * 0.5)
        meshRef.current.position.z = position[2] + scrollOffset * 3
      } catch (error) {
        console.warn('DistortedSphere animation error:', error)
      }
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <Sphere args={[2, 64, 64]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.6}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Sphere>
    </mesh>
  )
}

// Simplified Particle System
const ParticleSystem = () => {
  const particlesRef = useRef()
  const { scrollYProgress } = useFramerScroll()
  
  const particleCount = 500 // Reduced for better performance
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return positions
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      try {
        particlesRef.current.rotation.x = state.clock.elapsedTime * 0.05
        particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03
        
        // Scroll-based particle movement
        const scrollOffset = scrollYProgress.get()
        particlesRef.current.position.y = scrollOffset * 5
      } catch (error) {
        console.warn('ParticleSystem animation error:', error)
      }
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#007AFF"
        size={0.1}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Animated Rings
const AnimatedRings = () => {
  const ringsRef = useRef()
  const { scrollYProgress } = useFramerScroll()
  
  useFrame((state) => {
    if (ringsRef.current) {
      try {
        ringsRef.current.rotation.x = state.clock.elapsedTime * 0.3
        ringsRef.current.rotation.y = state.clock.elapsedTime * 0.2
        ringsRef.current.rotation.z = state.clock.elapsedTime * 0.1
        
        // Scroll-based scaling
        const scrollOffset = scrollYProgress.get()
        ringsRef.current.scale.setScalar(1 + scrollOffset * 1.5)
      } catch (error) {
        console.warn('AnimatedRings animation error:', error)
      }
    }
  })

  return (
    <group ref={ringsRef}>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI) / 3]}>
          <torusGeometry args={[3 + i, 0.1, 8, 100]} />
          <meshStandardMaterial
            color={i === 0 ? "#007AFF" : i === 1 ? "#5856D6" : "#FF2D92"}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.5}
            emissive={i === 0 ? "#007AFF" : i === 1 ? "#5856D6" : "#FF2D92"}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

// Main 3D Scene
const Scene3D = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#007AFF" />
      <pointLight position={[10, -10, 10]} intensity={0.3} color="#5856D6" />
      
      {/* Environment */}
      <Environment preset="night" />
      
      {/* Floating Geometries */}
      <FloatingGeometry position={[-8, 4, -5]} color="#007AFF" scale={0.8} speed={1.2} />
      <FloatingGeometry position={[8, -3, -8]} color="#5856D6" scale={1.2} speed={0.8} />
      <FloatingGeometry position={[-5, -6, -3]} color="#FF2D92" scale={0.6} speed={1.5} />
      <FloatingGeometry position={[6, 5, -10]} color="#FF9500" scale={1.0} speed={1.0} />
      
      {/* Distorted Spheres */}
      <DistortedSphere position={[-12, 0, -15]} color="#007AFF" />
      <DistortedSphere position={[12, 8, -20]} color="#5856D6" />
      
      {/* Animated Rings */}
      <AnimatedRings />
      
      {/* Particle System */}
      <ParticleSystem />
    </>
  )
}

// CSS Fallback Background
const FallbackBackground = () => (
  <div className="fixed inset-0 -z-10">
    {/* Animated gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
    </div>
    
    {/* Floating orbs */}
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20 animate-float"
          style={{
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            background: `linear-gradient(135deg, ${
              i % 3 === 0 ? '#007AFF' : i % 3 === 1 ? '#5856D6' : '#FF2D92'
            }, transparent)`,
            left: `${20 + i * 15}%`,
            top: `${10 + i * 20}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${4 + i}s`
          }}
        />
      ))}
    </div>
    
    {/* Gradient overlays */}
    <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/30 pointer-events-none" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
  </div>
)

// Main Component
const EnhancedBackground3D = () => {
  const [webglSupported, setWebglSupported] = useState(true)
  const [canvasError, setCanvasError] = useState(false)

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        setWebglSupported(false)
      }
    } catch (error) {
      console.warn('WebGL not supported:', error)
      setWebglSupported(false)
    }
  }, [])

  // If WebGL is not supported or Canvas errored, show fallback
  if (!webglSupported || canvasError) {
    return <FallbackBackground />
  }

  return (
    <ThreeErrorBoundary fallback={<FallbackBackground />}>
      <div className="fixed inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          gl={{ 
            antialias: false,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false
          }}
          onCreated={({ gl }) => {
            try {
              gl.setClearColor(0x000000, 0)
            } catch (error) {
              console.warn('Canvas setup error:', error)
              setCanvasError(true)
            }
          }}
          onError={(error) => {
            console.warn('Canvas error:', error)
            setCanvasError(true)
          }}
        >
          <Scene3D />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={false}
            autoRotate={false}
          />
        </Canvas>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      </div>
    </ThreeErrorBoundary>
  )
}

export default EnhancedBackground3D 