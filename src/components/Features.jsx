import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── Shuffler Card ── */
const SHUFFLE_ITEMS = [
  {
    label: 'Brand Strategy',
    sub: 'Market positioning redefined',
    tag: 'identity',
  },
  {
    label: 'Visual Identity',
    sub: 'Systems that outlast trends',
    tag: 'design',
  },
  {
    label: 'Conversion Design',
    sub: 'Revenue-first aesthetics',
    tag: 'growth',
  },
]

function ShufflerCard() {
  const [cards, setCards] = useState(SHUFFLE_ITEMS)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCards(prev => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3000)
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <div className="relative h-48 w-full">
      {cards.map((card, i) => (
        <div
          key={card.label}
          className="absolute inset-x-0 flex items-center justify-between px-5 py-4 rounded-2xl border border-slate/10 bg-ivory shadow-sm"
          style={{
            top: `${i * 16}px`,
            zIndex: 3 - i,
            opacity: i === 0 ? 1 : i === 1 ? 0.65 : 0.35,
            transform: `scale(${i === 0 ? 1 : i === 1 ? 0.97 : 0.94}) translateY(${i * 6}px)`,
            transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
        >
          <div>
            <p className="font-inter font-semibold text-slate text-sm">{card.label}</p>
            <p className="font-inter text-slate/50 text-xs mt-0.5">{card.sub}</p>
          </div>
          <span className="font-mono-jet text-champagne text-xs px-2 py-1 rounded-full bg-champagne/10">
            {card.tag}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ── Typewriter Card ── */
const LINES = [
  '> Initializing design system...',
  '> Loading brand assets... ✓',
  '> Optimizing conversion flow...',
  '> Running A/B test variant #3...',
  '> Performance score: 99/100 ✓',
  '> Deploying to production... ✓',
]

function TypewriterCard() {
  const [displayed, setDisplayed] = useState([''])
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    const line = LINES[lineIdx % LINES.length]
    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setDisplayed(prev => {
          const next = [...prev]
          next[next.length - 1] = line.slice(0, charIdx + 1)
          return next
        })
        setCharIdx(c => c + 1)
      }, 40)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setLineIdx(i => i + 1)
        setCharIdx(0)
        setDisplayed(prev => {
          const next = prev.length >= 5 ? prev.slice(1) : prev
          return [...next, '']
        })
      }, 900)
      return () => clearTimeout(t)
    }
  }, [charIdx, lineIdx])

  return (
    <div className="flex flex-col gap-0.5 font-mono-jet text-xs leading-relaxed text-slate/80 min-h-[9rem]">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
        <span className="text-slate/40 text-[10px] tracking-widest">LIVE FEED</span>
      </div>
      {displayed.map((line, i) => (
        <div key={i} className="flex items-start">
          <span className="text-champagne/60 mr-1 flex-shrink-0">
            {i === displayed.length - 1 ? '▸' : ' '}
          </span>
          <span>{line}</span>
          {i === displayed.length - 1 && (
            <span className="cursor-blink ml-px">█</span>
          )}
        </div>
      ))}
    </div>
  )
}

/* ── Scheduler Card ── */
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const initialActive = [false, false, false, false, false]

function SchedulerCard() {
  const [active, setActive] = useState(initialActive)
  const [saved, setSaved] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [phase, setPhase] = useState(0) // 0:idle 1:moving 2:clicking 3:done
  const containerRef = useRef(null)
  const stepRef = useRef(0)

  useEffect(() => {
    const STEPS = [
      { day: 0, x: 18, y: 24 },
      { day: 1, x: 38, y: 24 },
      { day: 3, x: 75, y: 24 },
      { day: 2, x: 57, y: 24 },
    ]

    let step = 0
    const run = () => {
      if (step < STEPS.length) {
        const s = STEPS[step]
        setCursorPos({ x: s.x, y: s.y })
        setPhase(1)
        setTimeout(() => {
          setPhase(2)
          setTimeout(() => {
            setActive(prev => {
              const n = [...prev]; n[s.day] = true; return n
            })
            setPhase(1)
            step++
            stepRef.current = step
            if (step < STEPS.length) {
              setTimeout(run, 600)
            } else {
              setTimeout(() => setSaved(true), 400)
              setTimeout(() => {
                setSaved(false)
                setActive(initialActive)
                step = 0
                stepRef.current = 0
                setCursorPos({ x: 0, y: 0 })
                setPhase(0)
                setTimeout(run, 1000)
              }, 2200)
            }
          }, 300)
        }, 500)
      }
    }

    const timer = setTimeout(run, 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono-jet text-slate/40 text-[10px] tracking-widest">WEEKLY SCHEDULE</span>
      </div>

      <div
        ref={containerRef}
        className="relative grid grid-cols-5 gap-2 mb-4"
        style={{ cursor: 'none' }}
      >
        {/* Animated cursor */}
        {phase > 0 && (
          <div
            className="absolute pointer-events-none z-10"
            style={{
              left: `${cursorPos.x}%`,
              top: `${cursorPos.y - 10}%`,
              transform: `scale(${phase === 2 ? 0.85 : 1})`,
              transition: 'left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 0.4s, transform 0.15s',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 1l12 8-6 1-3 6-3-15z" fill="#C9A84C" stroke="#0D0D12" strokeWidth="1" />
            </svg>
          </div>
        )}

        {DAYS.map((day, i) => (
          <div
            key={day}
            className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl border text-xs font-medium transition-all duration-300 ${
              active[i]
                ? 'bg-champagne/90 border-champagne text-obsidian'
                : 'bg-ivory border-slate/15 text-slate/50'
            }`}
          >
            <span className="text-[10px] font-mono-jet">{day}</span>
            <div className={`w-1.5 h-1.5 rounded-full ${active[i] ? 'bg-obsidian' : 'bg-slate/20'}`} />
          </div>
        ))}
      </div>

      <div className={`flex items-center justify-between transition-all duration-300 ${saved ? 'opacity-100' : 'opacity-60'}`}>
        <span className="font-mono-jet text-xs text-champagne">{saved ? '✓ Schedule saved' : 'Select focus days'}</span>
        <button className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-300 ${
          saved ? 'bg-champagne text-obsidian' : 'bg-slate/10 text-slate/50'
        }`}>
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  )
}

/* ── Main Features Section ── */
const cards = [
  {
    id: 'identity',
    tag: '01 — Bespoke Identity',
    title: 'Your brand, unrepeatable.',
    desc: 'We architect digital identities that compound value over time.',
    component: ShufflerCard,
    dark: false,
  },
  {
    id: 'interactions',
    tag: '02 — Immersive Interactions',
    title: 'Every pixel, a conversation.',
    desc: 'Interfaces that respond, delight, and convert.',
    component: TypewriterCard,
    dark: true,
  },
  {
    id: 'conversion',
    tag: '03 — Strategic Conversion',
    title: 'Design that earns.',
    desc: 'Systems engineered around revenue-first principles.',
    component: SchedulerCard,
    dark: false,
  },
]

export default function Features() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-ivory"
      id="services"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-champagne" />
          <span className="font-mono-jet text-champagne text-xs tracking-[0.2em] uppercase">
            Functional Artifacts
          </span>
        </div>

        <h2 className="font-inter font-bold text-slate text-3xl md:text-5xl tracking-tight mb-4 max-w-lg">
          Built for those who refuse to be ordinary.
        </h2>
        <p className="font-inter text-slate/50 text-lg max-w-md mb-16">
          Three pillars. Infinite outcomes.
        </p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map(({ id, tag, title, desc, component: Component, dark }) => (
            <div
              key={id}
              className={`feature-card rounded-[2rem] p-7 border shadow-sm hover:shadow-md transition-shadow duration-300 ${
                dark
                  ? 'bg-obsidian border-white/5 text-ivory'
                  : 'bg-ivory border-slate/10 text-slate'
              }`}
            >
              <div className="mb-6">
                <span
                  className={`font-mono-jet text-xs tracking-widest ${
                    dark ? 'text-champagne/70' : 'text-champagne'
                  }`}
                >
                  {tag}
                </span>
                <h3
                  className={`font-inter font-semibold text-lg mt-2 mb-1 ${
                    dark ? 'text-ivory' : 'text-slate'
                  }`}
                >
                  {title}
                </h3>
                <p
                  className={`font-inter text-sm leading-relaxed ${
                    dark ? 'text-ivory/50' : 'text-slate/50'
                  }`}
                >
                  {desc}
                </p>
              </div>

              {/* Live component */}
              <div className={`border-t pt-5 ${dark ? 'border-white/10' : 'border-slate/10'}`}>
                <Component />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
