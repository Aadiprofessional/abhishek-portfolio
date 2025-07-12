import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Components
// import Navbar from './components/Navbar' // Remove this line
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
import BottomNavbar from './components/BottomNavbar'

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
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Router>
      <CursorFollow />
      <SmoothScroll>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <AnimatedRoutes />
        )}
      </SmoothScroll>

      {/* ⬇️ Move this here */}
      <BottomNavbar />
    </Router>
  )
}


export default App
