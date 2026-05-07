import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import Lenis from 'lenis'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import './index.css'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

export function openTelegram(msg = '') {
  const text = msg.trim()
    ? `Привет, Novik_agency! ${msg.trim()}`
    : 'Привет, Novik_agency! Хочу обсудить создание сайта.'
  window.open(`https://t.me/qujnk?text=${encodeURIComponent(text)}`, '_blank')
}

/* ── Nav ──────────────────────────────────────────────────── */
export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between safe-pad py-6 transition-all duration-500"
        style={{
          backdropFilter: scrolled || open ? 'blur(20px)' : 'none',
          background: scrolled || open ? 'rgba(5,5,5,0.82)' : 'transparent',
        }}
      >
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="font-serif text-white/85 text-sm font-light tracking-[0.15em] uppercase hover:text-white transition-colors duration-300"
        >
          Novik_agency
        </Link>

        {/* Desktop center links */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-10">
          {[{ to: '/portfolio', label: 'Портфолио' }, { to: '/price', label: 'Цены' }].map(({ to, label }) => (
            <NavLink key={to} to={to} className={({ isActive }) =>
              `nav-link label-caps transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/50 hover:text-white'}`
            }>
              {label}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <button
          onClick={() => openTelegram()}
          className="hidden md:flex group label-caps text-white/65 hover:text-white items-center gap-2 transition-colors duration-300"
        >
          <span className="relative overflow-hidden inline-flex" style={{ height: '1em' }}>
            <span className="transition-transform duration-300 group-hover:-translate-y-full inline-block leading-none">Написать</span>
            <span className="absolute top-full left-0 transition-transform duration-300 group-hover:-translate-y-full inline-block leading-none">Написать</span>
          </span>
          <ArrowUpRight size={11} className="transition-transform duration-300 group-hover:rotate-45 group-hover:translate-x-px group-hover:-translate-y-px" />
        </button>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(v => !v)}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8"
          aria-label="Меню"
        >
          <span className="block w-5 h-px bg-white/70 transition-all duration-300"
            style={{ transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }} />
          <span className="block w-5 h-px bg-white/70 transition-all duration-300"
            style={{ opacity: open ? 0 : 1 }} />
          <span className="block w-5 h-px bg-white/70 transition-all duration-300"
            style={{ transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
        </button>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 md:hidden"
            style={{ background: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(20px)' }}
          >
            {[{ to: '/portfolio', label: 'Портфолио' }, { to: '/price', label: 'Цены' }].map(({ to, label }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.12, duration: 0.45, ease: EASE }}
              >
                <Link
                  to={to}
                  onClick={() => setOpen(false)}
                  className="font-serif text-white/80 hover:text-white transition-colors duration-300"
                  style={{ fontSize: 'clamp(36px, 10vw, 56px)', fontWeight: 300, letterSpacing: '-0.02em' }}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.45, ease: EASE }}
            >
              <button
                onClick={() => { setOpen(false); openTelegram() }}
                className="label-caps text-white/45 hover:text-[#C9A96E] flex items-center gap-2 transition-colors duration-300"
              >
                Написать <ArrowUpRight size={11} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Page transition wrapper ────────────────────────────── */
export function PageWrap({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/* ── App ─────────────────────────────────────────────────── */
export default function App() {
  const [ready, setReady]     = useState(false)
  const [message, setMessage] = useState('')
  const [sent, setSent]       = useState(false)
  const [placeholder, setPlaceholder] = useState('')
  const lenisRef = useRef<Lenis | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!ready) return
    if (window.matchMedia('(max-width: 767px)').matches) return
    const lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    lenisRef.current = lenis
    const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [ready])

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>
    const timerId = setTimeout(() => {
      const FULL = 'Я хочу сайт для своего барбершопа, чтобы он приводил клиентов и выделялся среди конкурентов…'
      let i = 0
      intervalId = setInterval(() => {
        i++
        setPlaceholder(FULL.slice(0, i))
        if (i >= FULL.length) clearInterval(intervalId)
      }, 38)
    }, 2400)
    return () => { clearTimeout(timerId); clearInterval(intervalId) }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (videoRef.current) {
        const y = window.scrollY * 0.07
        videoRef.current.style.transform = `translateY(${y}px) scale(1.08)`
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSend = () => {
    if (!message.trim()) return
    openTelegram(message)
    setSent(true)
    setTimeout(() => { setSent(false); setMessage('') }, 3000)
  }

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      {ready && <CustomCursor />}

      <PageWrap>
        <main className="relative w-full min-h-screen font-sans selection:bg-white/15 selection:text-white overflow-x-hidden">

          {/* Video — full screen, stays fixed while content scrolls */}
          <video
            ref={videoRef}
            src={VIDEO_SRC} autoPlay muted loop playsInline
            className="fixed inset-0 w-full h-full object-cover z-0"
            style={{ transformOrigin: 'center center', willChange: 'transform', transform: 'scale(1.08)' }}
          />
          <div className="fixed inset-0 z-[1] bg-black/55" />

          <Nav />

          {/* ── SECTION 1: HERO ─────────────────────────────── */}
          <section className="relative z-10 min-h-screen flex flex-col items-center justify-center safe-pad text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="label-caps text-white/30 mb-8"
            >
              Веб-агентство
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: EASE }}
              className="heading-xl text-white"
              style={{ fontSize: 'clamp(38px, 7vw, 110px)' }}
            >
              Воплощаем любые
              <br />
              <motion.em
                className="not-italic"
                style={{ color: 'rgba(255,255,255,0.38)' }}
                initial={{ filter: 'blur(12px)', opacity: 0 }}
                animate={{ filter: 'blur(0px)', opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.1, ease: EASE }}
              >
                ваши фантазии
              </motion.em>
              <br />
              в сайт.
            </motion.h1>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
              onClick={() => document.getElementById('input-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="absolute bottom-14 label-caps text-white/28 hover:text-[#C9A96E] transition-colors duration-300"
            >
              ↓ &nbsp; Напишите свою идею
            </motion.button>
          </section>

          {/* ── SECTION 2: INPUT ─────────────────────────────── */}
          <section
            id="input-section"
            className="relative z-10 min-h-screen flex flex-col items-center justify-center safe-pad py-24"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="w-full max-w-lg"
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="sent"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-start gap-5 py-12"
                  >
                    <CheckCircle2 size={32} className="text-[#C9A96E]/60" />
                    <p className="font-serif text-white/75 text-3xl font-light">Открываем Telegram…</p>
                    <p className="label-caps text-white/25">Ваше сообщение уже ждёт там</p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {/* Label */}
                    <p className="label-caps text-white/55 mb-5">
                      Расскажите о проекте
                    </p>

                    {/* Textarea — line immediately under label */}
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSend() }}
                      rows={4}
                      placeholder={placeholder}
                      className="w-full bg-transparent text-white/75 placeholder:text-white/20 placeholder:italic
                        text-base md:text-lg font-light leading-relaxed
                        border-b border-white/15 focus:border-[#C9A96E]/40
                        transition-colors duration-400 pb-5 mb-10"
                    />

                    {/* Button row */}
                    <div className="flex items-center justify-between">
                      <span className="label-caps text-white/18">⌘ Enter</span>
                      <button
                        onClick={handleSend}
                        disabled={!message.trim()}
                        className="group flex items-center gap-2 label-caps text-white/70 hover:text-white
                          border border-white/22 hover:border-[#C9A96E]/50 rounded-full px-7 py-3
                          disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
                        style={{ backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.05)' }}
                      >
                        Связаться
                        <span className="relative w-3 h-3 overflow-hidden inline-flex items-center justify-center">
                          <ArrowUpRight size={11} className="absolute transition-all duration-300 group-hover:translate-x-3 group-hover:-translate-y-3" />
                          <ArrowUpRight size={11} className="absolute -translate-x-3 translate-y-3 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
                        </span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </section>

          {/* ── FOOTER ──────────────────────────────────────── */}
          <footer className="relative z-10 pb-10 flex flex-col items-center gap-4">
            <div className="w-14 h-px bg-white/12 mb-1" />
            <button
              onClick={() => openTelegram()}
              className="label-caps text-white/65 hover:text-[#C9A96E] transition-colors duration-300 flex items-center gap-1.5"
            >
              Связаться <ArrowUpRight size={10} />
            </button>
            <p className="label-caps text-white/28">© 2025 Novik_agency</p>
          </footer>

        </main>
      </PageWrap>
    </>
  )
}
