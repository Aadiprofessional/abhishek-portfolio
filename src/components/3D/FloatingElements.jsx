import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sphere, Box, Torus, Octahedron } from '@react-three/drei'
import * as THREE from 'three'

const FloatingShape = ({ position, color, type, speed = 1 }) => {
  const meshRef = useRef()
  const { viewport } = useThree()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.01
      meshRef.current.rotation.y += speed * 0.005
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.002
    }
  })

  const shapes = {
    sphere: <Sphere ref={meshRef} args={[1, 32, 32]} />,
    box: <Box ref={meshRef} args={[1.5, 1.5, 1.5]} />,
    torus: <Torus ref={meshRef} args={[1, 0.4, 16, 100]} />,
    octahedron: <Octahedron ref={meshRef} args={[1.2]} />
  }

  return (
    <Float
      position={position}
      rotationIntensity={0.5}
      floatIntensity={2}
      speed={speed}
    >
      {shapes[type]}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.6}
        roughness={0.1}
        metalness={0.8}
        envMapIntensity={1}
      />
    </Float>
  )
}

const ParticleField = () => {
  const pointsRef = useRef()
  const particleCount = 1000

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
      
      // Color
      const color = new THREE.Color()
      color.setHSL(Math.random() * 0.3 + 0.6, 0.5, 0.7)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    
    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001
      pointsRef.current.rotation.x += 0.0005
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

const FloatingElements = () => {
  const shapes = useMemo(() => [
    { type: 'sphere', position: [-8, 4, -5], color: '#6366f1', speed: 1.2 },
    { type: 'box', position: [8, -4, -3], color: '#8b5cf6', speed: 0.8 },
    { type: 'torus', position: [-6, -3, -8], color: '#ec4899', speed: 1.5 },
    { type: 'octahedron', position: [7, 6, -6], color: '#06b6d4', speed: 1.0 },
    { type: 'sphere', position: [3, -8, -4], color: '#10b981', speed: 0.9 },
    { type: 'box', position: [-4, 8, -7], color: '#f59e0b', speed: 1.3 },
  ], [])

  return (
    <Canvas
      className="absolute inset-0 -z-10"
      camera={{ position: [0, 0, 10], fov: 75 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      
      <ParticleField />
      
      {shapes.map((shape, index) => (
        <FloatingShape key={index} {...shape} />
      ))}
    </Canvas>
  )
}

export default FloatingElements 