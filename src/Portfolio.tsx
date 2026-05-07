import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Nav, PageWrap, openTelegram } from './App'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const PROJECTS = [
  {
    name: 'Cinotti', tag: 'Ресторан', year: '2025',
    url: 'https://cinotti.vercel.app/',
    desc: 'Премиальный сайт для итальянского ресторана. Тёмная атмосфера, анимации при скролле.',
    accent: '#C9A96E', accentRgb: '201,169,110',
  },
  {
    name: 'Aqua Resort', tag: 'Спа & отель', year: '2025',
    url: 'https://aqua-resort.vercel.app/',
    desc: 'Лэндинг спа-отеля. Воздушный дизайн, фотогалерея, форма бронирования.',
    accent: '#8BB8CC', accentRgb: '139,184,204',
  },
  {
    name: 'Esio', tag: 'Корпоративный', year: '2025',
    url: 'https://esio.vercel.app/',
    desc: 'Корпоративный сайт. Строгий стиль, чёткая структура, конверсионная форма.',
    accent: '#ABABAB', accentRgb: '171,171,171',
  },
]

function Card({ p, i }: { p: typeof PROJECTS[0]; i: number }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.a
      href={p.url} target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: EASE }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="block rounded-2xl p-6 md:p-9"
      style={{
        background: hov ? `rgba(${p.accentRgb},0.07)` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hov ? `rgba(${p.accentRgb},0.25)` : 'rgba(255,255,255,0.07)'}`,
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
    >
      {/* Tag + year */}
      <div className="flex items-center justify-between mb-6">
        <span className="label-caps px-3 py-1.5 rounded-full border"
          style={{
            color: hov ? p.accent : 'rgba(255,255,255,0.32)',
            borderColor: hov ? `rgba(${p.accentRgb},0.32)` : 'rgba(255,255,255,0.1)',
            letterSpacing: '0.18em', transition: 'all 0.35s ease',
          }}>
          {p.tag}
        </span>
        <span className="label-caps text-white/18">{p.year}</span>
      </div>

      {/* Name + arrow */}
      <div className="flex items-end justify-between gap-4">
        <h2 className="heading-xl transition-colors duration-300"
          style={{
            fontSize: 'clamp(30px, 4.5vw, 54px)',
            color: hov ? '#fff' : 'rgba(255,255,255,0.8)',
          }}>
          {p.name}
        </h2>
        <div className="w-10 h-10 rounded-full border flex items-center justify-center shrink-0"
          style={{
            borderColor: hov ? p.accent : 'rgba(255,255,255,0.12)',
            color: hov ? p.accent : 'rgba(255,255,255,0.3)',
            transform: hov ? 'rotate(45deg)' : 'rotate(0)',
            transition: 'all 0.3s ease',
          }}>
          <ArrowUpRight size={16} />
        </div>
      </div>

      <p className="text-white/32 text-sm font-light leading-relaxed mt-4">{p.desc}</p>
    </motion.a>
  )
}

export default function Portfolio() {
  return (
    <PageWrap>
      <main className="relative w-full min-h-screen font-sans selection:bg-white/15 selection:text-white overflow-x-hidden">

        <div className="fixed inset-0 z-0 bg-black flex items-center justify-center">
          <img src="/bg-portfolio.png" alt=""
            className="w-full h-full object-cover select-none pointer-events-none" />
        </div>
        <div className="fixed inset-0 z-[1] bg-black/48" />

        <Nav />

        <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-8 sm:px-14 md:px-20 py-28">

          <div className="w-full max-w-2xl">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="mb-12 text-center"
            >
              <p className="label-caps text-white/35 mb-4">Избранные работы</p>
              <h1 className="heading-xl text-white"
                style={{ fontSize: 'clamp(48px, 6vw, 90px)' }}>
                Портфолио
              </h1>
            </motion.div>

            {/* Cards */}
            <div className="flex flex-col gap-4">
              {PROJECTS.map((p, i) => <Card key={p.url} p={p} i={i} />)}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
              className="mt-10 flex justify-center"
            >
              <button
                onClick={() => openTelegram('Хочу заказать сайт.')}
                className="inline-flex items-center gap-2 label-caps text-white/45
                  hover:text-[#C9A96E] transition-colors duration-300"
              >
                Начнём ваш проект <ArrowUpRight size={10} />
              </button>
            </motion.div>

            <div className="mt-14 flex justify-center">
              <span className="label-caps text-white/15">© 2025 Novik_agency</span>
            </div>
          </div>
        </div>
      </main>
    </PageWrap>
  )
}
