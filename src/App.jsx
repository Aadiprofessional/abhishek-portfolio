import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Components
import Navbar from './components/Navbar'
import LoadingScreen from './components/LoadingScreen'
import CursorFollow from './components/CursorFollow'
import PageTransition from './components/PageTransition'
import SmoothScroll from './components/SmoothScroll'

// Pages
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ExperiencePage from './pages/ExperiencePage'
import ContactPage from './pages/ContactPage'

// Project Pages
import MatrixAIPage from './pages/projects/MatrixAIPage'
import EduSmartPage from './pages/projects/EduSmartPage'
import BuildSpherePage from './pages/projects/BuildSpherePage'
import AiToyPage from './pages/projects/AiToyPage'

const AnimatedRoutes = () => {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
        <Route path="/projects/matrix-ai" element={<PageTransition><MatrixAIPage /></PageTransition>} />
        <Route path="/projects/edusmart" element={<PageTransition><EduSmartPage /></PageTransition>} />
        <Route path="/projects/buildsphere" element={<PageTransition><BuildSpherePage /></PageTransition>} />
        <Route path="/projects/aitoy" element={<PageTransition><AiToyPage /></PageTransition>} />
        <Route path="/experience" element={<PageTransition><ExperiencePage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // Reduced from 3000ms to 1500ms for faster development

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Router>
      <SmoothScroll>
        <div className="App relative min-h-screen bg-black text-white overflow-x-hidden">
          {/* Custom Cursor */}
          <CursorFollow />
          
          {/* Navigation - Removed as requested */}
          
          {/* Main Content */}
          <main className="relative z-10">
            <AnimatedRoutes />
          </main>
        </div>
      </SmoothScroll>
    </Router>
  )
}

export default App
