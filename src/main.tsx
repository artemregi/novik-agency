import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import App from './App.tsx'
import Portfolio from './Portfolio.tsx'
import Price from './Price.tsx'
import './index.css'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"          element={<App />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/price"     element={<Price />} />
      </Routes>
    </AnimatePresence>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  </StrictMode>,
)
