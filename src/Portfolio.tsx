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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: EASE }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="block rounded-2xl"
      style={{
        padding: 'clamp(28px, 3.5vw, 52px)',
        background: hov ? `rgba(${p.accentRgb},0.07)` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hov ? `rgba(${p.accentRgb},0.25)` : 'rgba(255,255,255,0.07)'}`,
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
    >
      <div style={{ marginBottom: 'clamp(20px, 2.5vw, 36px)' }}>
        <span className="label-caps px-3 py-1.5 rounded-full border"
          style={{
            color: hov ? p.accent : 'rgba(255,255,255,0.32)',
            borderColor: hov ? `rgba(${p.accentRgb},0.32)` : 'rgba(255,255,255,0.1)',
            letterSpacing: '0.18em', transition: 'all 0.35s ease',
          }}>
          {p.tag}
        </span>
      </div>

      <div className="flex items-end justify-between gap-4">
        <h2 className="heading-xl transition-colors duration-300"
          style={{
            fontSize: 'clamp(28px, 4vw, 56px)',
            color: hov ? '#fff' : 'rgba(255,255,255,0.8)',
          }}>
          {p.name}
        </h2>
        <div className="w-11 h-11 rounded-full border flex items-center justify-center shrink-0"
          style={{
            borderColor: hov ? p.accent : 'rgba(255,255,255,0.12)',
            color: hov ? p.accent : 'rgba(255,255,255,0.3)',
            transform: hov ? 'rotate(45deg)' : 'rotate(0)',
            transition: 'all 0.3s ease',
          }}>
          <ArrowUpRight size={17} />
        </div>
      </div>

      <p className="text-white/32 font-light leading-relaxed"
        style={{ fontSize: 'clamp(13px, 1.1vw, 14px)', marginTop: 'clamp(12px, 1.5vw, 20px)' }}>
        {p.desc}
      </p>
    </motion.a>
  )
}

/* ── Right-side manifesto panel ─────────────────────────── */
function ManifestoPanel() {
  const items = [
    {
      label: 'Цвет & стиль',
      text: 'Палитра, типографика и визуальный язык подбираются под характер вашего бренда — так, чтобы сайт говорил на вашем языке с первого экрана.',
    },
    {
      label: 'Бизнес-цели',
      text: 'Перед стартом мы изучаем вашу аудиторию, конкурентов и точки роста. Каждый блок на сайте работает на конкретный результат.',
    },
    {
      label: 'Анализ конкурентов',
      text: 'Изучаем сайты конкурентов в вашей нише — находим их слабые места и используем это как точку отрыва для вашего проекта.',
    },
    {
      label: 'SEO-оптимизация',
      text: 'Структура, заголовки, мета-теги и скорость загрузки настраиваются так, чтобы поисковики находили вас раньше конкурентов.',
    },
    {
      label: 'Яндекс Аналитика',
      text: 'Подключаем и настраиваем Яндекс.Метрику с целями — вы с первого дня видите откуда приходят клиенты и что они делают на сайте.',
    },
    {
      label: 'Без шаблонов',
      text: 'Мы не применяем готовых решений. Каждый проект — это отдельная вселенная, построенная вокруг вашего бизнеса.',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: EASE }}
      style={{
        position: 'sticky',
        top: 'clamp(120px, 14vw, 180px)',
        alignSelf: 'flex-start',
        paddingTop: 'clamp(140px, 16vw, 220px)',
      }}
    >
      {/* Eyebrow */}
      <p className="label-caps text-white/25" style={{ marginBottom: 'clamp(28px, 3.5vw, 52px)', letterSpacing: '0.3em' }}>
        Наш подход
      </p>

      {/* Big italic statement */}
      <p className="font-serif text-white/70 leading-tight"
        style={{ fontSize: 'clamp(22px, 2.4vw, 34px)', fontWeight: 300, letterSpacing: '-0.02em', marginBottom: 'clamp(36px, 5vw, 72px)' }}>
        Индивидуально —<br />
        <em style={{ color: 'rgba(201,169,110,0.65)', fontStyle: 'italic' }}>каждый раз.</em>
      </p>

      {/* Three items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 3vw, 44px)' }}>
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 + i * 0.1, ease: EASE }}
          >
            <p className="label-caps text-white/40" style={{ marginBottom: 10, letterSpacing: '0.22em' }}>
              {item.label}
            </p>
            <p className="font-light leading-relaxed text-white/38"
              style={{ fontSize: 'clamp(12px, 1.05vw, 14px)', lineHeight: 1.75 }}>
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Thin divider line */}
      <div style={{
        marginTop: 'clamp(36px, 5vw, 64px)',
        height: 1,
        background: 'linear-gradient(90deg, rgba(201,169,110,0.25) 0%, transparent 100%)',
        width: '60%',
      }} />
    </motion.div>
  )
}

export default function Portfolio() {
  return (
    <PageWrap>
      <main className="relative w-full font-sans selection:bg-white/15 selection:text-white overflow-x-hidden">

        <div className="fixed inset-0 z-0 bg-black">
          <img src="/bg-portfolio.png" alt=""
            className="w-full h-full object-cover select-none pointer-events-none opacity-60" />
        </div>
        <div className="fixed inset-0 z-[1] bg-black/40" />

        <Nav />

        <div className="relative z-10 w-full safe-pad">
          {/*
            Desktop: two columns — left cards, right manifesto
            Mobile/tablet: single column
          */}
          <div
            className="mx-auto"
            style={{ maxWidth: 1360 }}
          >
            {/* Two-column grid — right column hidden below lg */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px]"
              style={{ gap: 'clamp(48px, 6vw, 96px)' }}>

              {/* ── LEFT: heading + cards ── */}
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9, ease: EASE }}
                  style={{
                    paddingTop: 'clamp(140px, 16vw, 220px)',
                    marginBottom: 'clamp(40px, 5vw, 72px)',
                  }}
                >
                  <p className="label-caps text-white/35" style={{ marginBottom: 'clamp(14px, 1.8vw, 24px)' }}>
                    Избранные работы
                  </p>
                  <h1 className="heading-xl text-white"
                    style={{ fontSize: 'clamp(52px, 7.5vw, 108px)' }}>
                    Портфолио
                  </h1>
                </motion.div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 1.8vw, 24px)' }}>
                  {PROJECTS.map((p, i) => <Card key={p.url} p={p} i={i} />)}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
                  style={{ marginTop: 'clamp(44px, 6vw, 80px)', display: 'flex' }}
                >
                  <button
                    onClick={() => openTelegram('Хочу заказать сайт.')}
                    className="btn-glass inline-flex items-center gap-2 label-caps text-white/85 hover:text-[#C9A96E]"
                    style={{ padding: '12px 28px' }}
                  >
                    Начнём ваш проект <ArrowUpRight size={10} />
                  </button>
                </motion.div>

                <div style={{ marginTop: 'clamp(28px, 3.5vw, 48px)', paddingBottom: 'clamp(48px, 6vw, 96px)' }}>
                  <span className="label-caps text-white/15">© 2025 Novik_agency</span>
                </div>
              </div>

              {/* ── RIGHT: manifesto — desktop only ── */}
              <div className="hidden lg:block">
                <ManifestoPanel />
              </div>

            </div>
          </div>
        </div>
      </main>
    </PageWrap>
  )
}
