import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

const Background3D = () => {
  const ref = useRef()
  const { viewport } = useThree()

  // Generate random positions for particles
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  // Animation loop
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.05
    }
  })

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#667eea" />

      {/* Animated particles */}
      <Points ref={ref} positions={particlesPosition} stride={3}>
        <PointMaterial
          transparent
          color="#667eea"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>

      {/* Floating geometric shapes */}
      <FloatingGeometry />
    </>
  )
}

const FloatingGeometry = () => {
  const meshRef = useRef()
  const torusRef = useRef()
  const sphereRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }

    if (torusRef.current) {
      torusRef.current.rotation.x += 0.01
      torusRef.current.rotation.y += 0.005
      torusRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 2
    }

    if (sphereRef.current) {
      sphereRef.current.rotation.x += 0.005
      sphereRef.current.rotation.z += 0.01
      sphereRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.4) * 1
    }
  })

  return (
    <group>
      {/* Main floating cube */}
      <mesh ref={meshRef} position={[3, 0, -2]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color="#764ba2"
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>

      {/* Floating torus */}
      <mesh ref={torusRef} position={[-3, 1, -3]}>
        <torusGeometry args={[0.3, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#f093fb"
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>

      {/* Floating sphere */}
      <mesh ref={sphereRef} position={[0, -2, -4]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#667eea"
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>
    </group>
  )
}

export default Background3D 