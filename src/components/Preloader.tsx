import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const step = (target: number, delay: number) =>
      setTimeout(() => setPct(target), delay)

    step(35,  180)
    step(60,  400)
    step(80,  700)
    step(100, 950)

    const done = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 600)
    }, 1400)

    return () => clearTimeout(done)
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505]"
        >
          {/* Logo */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-serif text-white/80 text-xl font-light tracking-[0.18em] uppercase mb-12"
          >
            Novik_agency
          </motion.p>

          {/* Progress bar */}
          <div className="w-40 h-px bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-[#C9A96E]"
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>

          {/* Percent */}
          <motion.p
            className="mt-4 text-white/20 text-[10px] tracking-[0.2em] font-mono"
          >
            {pct}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
