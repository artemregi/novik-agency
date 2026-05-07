import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import App from './App.tsx'
import Portfolio from './Portfolio.tsx'
import Price from './Price.tsx'
import './index.css'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"          element={<App />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/price"     element={<Price />} />
        </Routes>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname + '-curtain'}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, transition: { duration: 0.45, ease: 'easeOut' } }}
          exit={{ opacity: 1, transition: { duration: 0.25, ease: 'easeIn' } }}
          className="fixed inset-0 z-[9998] bg-[#050505] pointer-events-none"
        />
      </AnimatePresence>
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  </StrictMode>,
)
