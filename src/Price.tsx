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

const GUARANTEES = [
  { icon: '↺', label: 'Правки до результата', desc: 'Вносим бесплатные правки пока вы не будете полностью довольны' },
  { icon: '◎', label: 'Сдача в срок', desc: 'Фиксируем дедлайн в договоре и соблюдаем его' },
  { icon: '◈', label: 'Поддержка после запуска', desc: '14 дней сопровождения после сдачи — бесплатно' },
]

const STEPS = [
  { n: '01', label: 'Созвон', text: 'Обсуждаем ваш бизнес, цели и пожелания. Понимаем задачу изнутри — бесплатно.' },
  { n: '02', label: 'Анализ', text: 'Изучаем конкурентов в вашей нише, аудиторию и точки роста. Формируем техническое задание.' },
  { n: '03', label: 'Дизайн', text: 'Подбираем палитру, типографику и стиль. Показываем концепцию и согласовываем до старта.' },
  { n: '04', label: 'Разработка', text: 'Верстаем, добавляем анимации, подключаем формы и интеграции.' },
  { n: '05', label: 'Тестирование', text: 'Проверяем на всех устройствах и браузерах. Настраиваем SEO и скорость загрузки.' },
  { n: '06', label: 'Запуск', text: 'Деплоим на ваш домен, подключаем Яндекс.Метрику с целями. Вы видите результат с первого дня.' },
]

const STATS = [
  { value: '20+', label: 'проектов сдано' },
  { value: 'каждый', label: 'проект закрыт полностью — все пожелания учтены' },
  { value: '0', label: 'скрытых платежей' },
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
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between"
        style={{ gap: 'clamp(20px, 2.5vw, 40px)', padding: 'clamp(28px, 3.5vw, 52px)' }}>

        {/* Left */}
        <div className="flex-1">
          <div className="flex items-center gap-4" style={{ marginBottom: 'clamp(20px, 2.5vw, 36px)' }}>
            <h2 className="font-serif text-white/90 font-light tracking-tight"
              style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}>
              {plan.name}
            </h2>
            {plan.featured && (
              <span className="label-caps px-3 py-1.5 rounded-full border"
                style={{ color: GOLD, borderColor: 'rgba(201,169,110,0.3)', letterSpacing: '0.2em' }}>
                ★ Выбор клиентов
              </span>
            )}
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.3vw, 18px)' }}>
            {plan.features.map((f, fi) => (
              <motion.li key={f}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.12 + fi * 0.05, ease: EASE }}
                className="flex items-center gap-3 font-light"
                style={{ color: 'rgba(255,255,255,0.52)', fontSize: 'clamp(13px, 1.1vw, 14px)' }}>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>
                {f}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="flex flex-col sm:flex-col items-start sm:items-end shrink-0 mt-4 sm:mt-0"
          style={{ gap: 'clamp(14px, 1.8vw, 24px)' }}>
          <div className="text-left sm:text-right">
            <p className="font-serif font-light leading-none text-white"
              style={{ fontSize: 'clamp(28px, 3.8vw, 56px)' }}>
              <Counter value={plan.price} delay={i * 150} />
              <span className="text-white/30 ml-1 text-base">{plan.unit}</span>
            </p>
            <p className="label-caps text-white/22 mt-2">{plan.time}</p>
          </div>
          <button
            onClick={() => openTelegram(`Хочу заказать "${plan.name}".`)}
            className="btn-glass label-caps flex items-center gap-2"
            style={{
              padding: 'clamp(10px, 1vw, 13px) clamp(20px, 2vw, 30px)',
              color: hov ? (plan.featured ? GOLD : '#fff') : 'rgba(255,255,255,0.82)',
            }}
          >
            Заказать <ArrowUpRight size={11} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Guarantees strip ───────────────────────────────────── */
function GuaranteesStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
      className="grid grid-cols-1 sm:grid-cols-3"
      style={{
        marginTop: 'clamp(24px, 3vw, 40px)',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      {GUARANTEES.map((g, i) => (
        <div key={g.label}
          style={{
            padding: 'clamp(20px, 2.5vw, 32px)',
            borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
          }}
        >
          <div className="flex items-center gap-3" style={{ marginBottom: 10 }}>
            <span style={{ color: GOLD, fontSize: 16, lineHeight: 1 }}>{g.icon}</span>
            <p className="label-caps text-white/55" style={{ letterSpacing: '0.2em' }}>{g.label}</p>
          </div>
          <p className="font-light text-white/28 leading-relaxed"
            style={{ fontSize: 'clamp(11px, 1vw, 13px)' }}>
            {g.desc}
          </p>
        </div>
      ))}
    </motion.div>
  )
}

/* ── Right: How we work ─────────────────────────────────── */
function ProcessPanel() {
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
      <p className="label-caps text-white/25" style={{ marginBottom: 'clamp(24px, 3vw, 40px)', letterSpacing: '0.3em' }}>
        Как мы работаем
      </p>

      <p className="font-serif text-white/70 leading-tight"
        style={{ fontSize: 'clamp(20px, 2.2vw, 30px)', fontWeight: 300, letterSpacing: '-0.02em', marginBottom: 'clamp(32px, 4.5vw, 60px)' }}>
        Просто, прозрачно,<br />
        <em style={{ color: 'rgba(201,169,110,0.65)', fontStyle: 'italic' }}>в срок.</em>
      </p>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 3vw, 36px)' }}>
        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55 + i * 0.09, ease: EASE }}
            style={{ display: 'flex', gap: 'clamp(14px, 1.8vw, 20px)', alignItems: 'flex-start' }}
          >
            {/* Step number */}
            <span className="font-serif text-white/18 shrink-0"
              style={{ fontSize: 'clamp(11px, 1vw, 13px)', letterSpacing: '0.1em', paddingTop: 2 }}>
              {s.n}
            </span>
            <div>
              <p className="label-caps text-white/45" style={{ marginBottom: 8, letterSpacing: '0.2em' }}>
                {s.label}
              </p>
              <p className="font-light text-white/30 leading-relaxed"
                style={{ fontSize: 'clamp(12px, 1vw, 13px)', lineHeight: 1.75 }}>
                {s.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div style={{
        marginTop: 'clamp(32px, 4.5vw, 56px)',
        height: 1,
        background: 'linear-gradient(90deg, rgba(201,169,110,0.25) 0%, transparent 100%)',
        width: '60%',
      }} />

      {/* Stats */}
      <div style={{
        marginTop: 'clamp(24px, 3vw, 40px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'clamp(12px, 1.5vw, 20px)',
      }}>
        {STATS.map((s) => (
          <div key={s.label}>
            <p className="font-serif text-white/70 font-light leading-none"
              style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', letterSpacing: '-0.02em', marginBottom: 6 }}>
              {s.value}
            </p>
            <p className="label-caps text-white/25" style={{ fontSize: '9px', letterSpacing: '0.18em', lineHeight: 1.5 }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* CTA nudge */}
      <p className="font-light text-white/22 leading-relaxed"
        style={{ fontSize: 'clamp(11px, 0.95vw, 13px)', marginTop: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.8 }}>
        Первый созвон — бесплатно.<br />
        Просто напишите нам.
      </p>
    </motion.div>
  )
}

export default function Price() {
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
          <div className="mx-auto" style={{ maxWidth: 1360 }}>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px]"
              style={{ gap: 'clamp(48px, 6vw, 96px)' }}>

              {/* ── LEFT ── */}
              <div>
                {/* Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: EASE }}
                  style={{
                    paddingTop: 'clamp(140px, 16vw, 220px)',
                    marginBottom: 'clamp(40px, 5vw, 64px)',
                  }}
                >
                  <p className="label-caps text-white/35" style={{ marginBottom: 'clamp(14px, 1.8vw, 24px)' }}>
                    Прозрачно и честно
                  </p>
                  <h1 className="heading-xl text-white"
                    style={{ fontSize: 'clamp(52px, 7.5vw, 108px)' }}>
                    Цены
                  </h1>
                  <p className="text-white/32 font-light leading-relaxed"
                    style={{ marginTop: 'clamp(14px, 1.8vw, 24px)', fontSize: 'clamp(13px, 1.1vw, 14px)' }}>
                    Один клиент — и сайт уже окупился. Без скрытых платежей.
                  </p>
                </motion.div>

                {/* Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 1.5vw, 20px)' }}>
                  {PLANS.map((p, i) => <PlanCard key={p.name} plan={p} i={i} />)}
                </div>

                {/* Guarantees strip */}
                <GuaranteesStrip />

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
                  style={{ marginTop: 'clamp(40px, 5vw, 64px)', display: 'flex' }}
                >
                  <button
                    onClick={() => openTelegram('Хочу узнать стоимость под мой проект.')}
                    className="btn-glass inline-flex items-center gap-2 label-caps text-white/85 hover:text-[#C9A96E]"
                    style={{ padding: '12px 28px' }}
                  >
                    Обсудить проект <ArrowUpRight size={10} />
                  </button>
                </motion.div>

                {/* Footer */}
                <div style={{ marginTop: 'clamp(28px, 3.5vw, 44px)', paddingBottom: 'clamp(48px, 6vw, 96px)' }}>
                  <span className="label-caps text-white/15">© 2025 Novik_agency</span>
                </div>
              </div>

              {/* ── RIGHT: process — desktop only ── */}
              <div className="hidden lg:block">
                <ProcessPanel />
              </div>

            </div>
          </div>
        </div>
      </main>
    </PageWrap>
  )
}
