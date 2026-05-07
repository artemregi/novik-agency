import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Nav, PageWrap, openTelegram } from './App'

const EASE = [0.25, 0.46, 0.45, 0.94] as const
const GOLD = '#C9A96E'

const PLANS = [
  {
    name: 'Лендинг', price: '25000', display: '25 000', unit: '₽', time: '3–5 дней',
    features: ['1 страница', 'Адаптивный дизайн', 'Анимации при скролле', 'Форма обратной связи', 'SEO-оптимизация'],
    accentRgb: '160,160,160', featured: false,
  },
  {
    name: 'Сайт-визитка', price: '45000', display: '45 000', unit: '₽', time: '5–7 дней',
    features: ['До 5 страниц', 'Уникальный дизайн', 'Анимации & эффекты', 'Портфолио / каталог', 'SEO + скорость'],
    accentRgb: '201,169,110', featured: true,
  },
]

function Counter({ value, delay }: { value: string; delay: number }) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  const done = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done.current) return
      done.current = true
      const target = parseInt(value, 10)
      const steps = 38
      let cur = 0
      const id = setInterval(() => {
        cur = Math.min(cur + Math.ceil(target / steps), target)
        setDisplay(cur.toLocaleString('ru-RU'))
        if (cur >= target) clearInterval(id)
      }, 22)
      setTimeout(() => {}, delay)
    }, { threshold: 0.6 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [value, delay])
  return <span ref={ref}>{display}</span>
}

function PlanCard({ plan, i }: { plan: typeof PLANS[0]; i: number }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: EASE }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="rounded-2xl"
      style={{
        background: hov ? `rgba(${plan.accentRgb},0.07)` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hov ? `rgba(${plan.accentRgb},0.25)` : 'rgba(255,255,255,0.07)'}`,
        backdropFilter: 'blur(14px)',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
        ...(plan.featured ? { borderLeft: `1px solid ${GOLD}` } : {}),
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-7 p-8 md:p-10">

        {/* Left */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-serif text-white/90 font-light tracking-tight" style={{ fontSize: 20 }}>
              {plan.name}
            </h2>
            {plan.featured && (
              <span className="label-caps px-3 py-1.5 rounded-full border"
                style={{ color: GOLD, borderColor: 'rgba(201,169,110,0.3)', letterSpacing: '0.2em' }}>
                ★ Выбор клиентов
              </span>
            )}
          </div>
          <ul className="flex flex-col gap-2.5">
            {plan.features.map((f, fi) => (
              <motion.li key={f}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.12 + fi * 0.05, ease: EASE }}
                className="flex items-center gap-3 font-light text-sm"
                style={{ color: 'rgba(255,255,255,0.52)' }}>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>
                {f}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="flex flex-col sm:flex-col items-start sm:items-end gap-4 shrink-0 mt-4 sm:mt-0">
          <div className="text-left sm:text-right">
            <p className="font-serif font-light leading-none text-white"
              style={{ fontSize: 'clamp(24px, 3.5vw, 52px)' }}>
              <Counter value={plan.price} delay={i * 150} />
              <span className="text-white/30 ml-1 text-base">{plan.unit}</span>
            </p>
            <p className="label-caps text-white/22 mt-1.5">{plan.time}</p>
          </div>
          <button
            onClick={() => openTelegram(`Хочу заказать "${plan.name}".`)}
            className="label-caps flex items-center gap-1.5 rounded-full px-7 py-3"
            style={{
              color: hov ? (plan.featured ? GOLD : '#fff') : 'rgba(255,255,255,0.45)',
              border: `1px solid ${hov ? `rgba(${plan.accentRgb},0.4)` : 'rgba(255,255,255,0.12)'}`,
              backdropFilter: 'blur(8px)',
              background: hov ? 'rgba(255,255,255,0.06)' : 'transparent',
              transition: 'all 0.35s ease',
            }}>
            Заказать <ArrowUpRight size={11} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Price() {
  return (
    <PageWrap>
      <main className="relative w-full min-h-screen font-sans selection:bg-white/15 selection:text-white overflow-x-hidden">

        <div className="fixed inset-0 z-0 bg-black flex items-center justify-center">
          <img src="/bg-portfolio.png" alt=""
            className="w-full h-full object-cover select-none pointer-events-none" />
        </div>
        <div className="fixed inset-0 z-[1] bg-black/48" />

        <Nav />

        <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center safe-pad py-28">

          <div className="w-full max-w-2xl">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="mb-16 text-center"
            >
              <p className="label-caps text-white/35 mb-6">Прозрачно и честно</p>
              <h1 className="heading-xl text-white"
                style={{ fontSize: 'clamp(40px, 6vw, 90px)' }}>
                Цены
              </h1>
              <p className="text-white/32 text-sm font-light leading-relaxed mt-6">
                Один клиент — и сайт уже окупился. Без скрытых платежей.
              </p>
            </motion.div>

            {/* Cards */}
            <div className="flex flex-col gap-6">
              {PLANS.map((p, i) => <PlanCard key={p.name} plan={p} i={i} />)}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
              className="mt-16 flex justify-center"
            >
              <button
                onClick={() => openTelegram('Хочу узнать стоимость под мой проект.')}
                className="inline-flex items-center gap-2 label-caps text-white/45 hover:text-[#C9A96E] transition-colors duration-300"
              >
                Обсудить проект <ArrowUpRight size={10} />
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
