import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── 01: Browser Wireframe — Discovery ── */
function BrowserWireframe() {
  return (
    <div
      className="relative flex-shrink-0 rounded-2xl overflow-hidden border border-slate/15 shadow-xl"
      style={{ width: 320, background: '#F5F3EF' }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate/10 bg-white/80">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <div className="ml-3 flex-1 h-5 rounded-md bg-slate/8 border border-slate/10 flex items-center px-2 gap-1.5">
          <div className="w-2 h-2 rounded-full border border-slate/20" />
          <div className="h-1.5 rounded bg-slate/15 flex-1" />
        </div>
      </div>

      {/* Page skeleton */}
      <div className="p-4 space-y-3 relative">
        {/* Hero block — highlighted */}
        <div
          className="rounded-xl p-4 relative"
          style={{ background: 'linear-gradient(135deg, #0D0D12 0%, #2A2A35 100%)' }}
        >
          <div className="h-2 w-24 rounded bg-champagne/60 mb-2" />
          <div className="h-1.5 w-36 rounded bg-white/20 mb-1" />
          <div className="h-1.5 w-28 rounded bg-white/20 mb-3" />
          <div className="inline-flex h-5 w-20 rounded-full bg-champagne/80" />
          {/* Ripple focus indicator */}
          <div
            className="absolute top-3 right-3 w-5 h-5 rounded-full border-2 border-champagne"
            style={{ animation: 'ping 1.8s ease-in-out infinite', opacity: 0.6 }}
          />
        </div>

        {/* Feature cards row */}
        <div className="grid grid-cols-3 gap-2">
          {['Brand', 'Web', 'Motion'].map((label, i) => (
            <div key={label} className="rounded-lg p-2 bg-white border border-slate/10 shadow-sm">
              <div className="w-4 h-4 rounded bg-champagne/20 mb-1.5" />
              <div className="h-1.5 rounded bg-slate/20 mb-1" />
              <div className="h-1 rounded bg-slate/10 w-3/4" />
            </div>
          ))}
        </div>

        {/* Text content rows */}
        <div className="bg-white rounded-lg p-3 border border-slate/10 space-y-1.5">
          <div className="h-1.5 rounded bg-slate/20 w-full" />
          <div className="h-1.5 rounded bg-slate/15 w-4/5" />
          <div className="h-1.5 rounded bg-slate/10 w-2/3" />
        </div>

        {/* Animated cursor */}
        <div
          className="absolute pointer-events-none z-20"
          style={{
            bottom: '28px',
            right: '24px',
            animation: 'cursorFloat 3s ease-in-out infinite',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 2l14 9-7 1.5-3.5 7.5L4 2z" fill="#C9A84C" stroke="#0D0D12" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes cursorFloat {
          0%   { transform: translate(0, 0); }
          33%  { transform: translate(-60px, -20px); }
          66%  { transform: translate(-100px, -60px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes ping {
          0%   { transform: scale(1); opacity: 0.6; }
          70%  { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

/* ── 02: Design Token Grid — Design System ── */
const PALETTE = [
  { name: 'Obsidian', hex: '#0D0D12', light: false },
  { name: 'Slate',    hex: '#2A2A35', light: false },
  { name: 'Champagne', hex: '#C9A84C', light: false },
  { name: 'Ivory',   hex: '#FAF8F5', light: true  },
]
const TYPE_SCALE = [
  { label: 'Display',  size: 'text-2xl', sample: 'Aa' },
  { label: 'Heading',  size: 'text-lg',  sample: 'Aa' },
  { label: 'Body',     size: 'text-sm',  sample: 'Aa' },
  { label: 'Mono',     size: 'text-xs',  sample: 'Aa', mono: true },
]

function DesignTokens() {
  return (
    <div className="flex-shrink-0 space-y-4" style={{ width: 300 }}>
      {/* Color palette */}
      <div>
        <p className="font-mono-jet text-champagne/60 text-[10px] tracking-[0.2em] uppercase mb-2">Color System</p>
        <div className="flex rounded-2xl overflow-hidden h-14 shadow-lg ring-1 ring-white/10">
          {PALETTE.map(({ name, hex, light }) => (
            <div
              key={name}
              className="flex-1 relative group cursor-default"
              style={{ background: hex }}
            >
              <div className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pb-1 flex flex-col items-center">
                <span className={`font-mono-jet text-[7px] tracking-wide ${light ? 'text-slate' : 'text-ivory/60'}`}>
                  {name}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex mt-1.5 gap-px">
          {PALETTE.map(({ name, hex }) => (
            <div key={name} className="flex-1 text-center">
              <span className="font-mono-jet text-ivory/30 text-[9px]">{hex}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Type scale */}
      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <div className="px-4 pt-3 pb-1">
          <p className="font-mono-jet text-champagne/60 text-[10px] tracking-[0.2em] uppercase mb-3">Type Scale</p>
        </div>
        {TYPE_SCALE.map(({ label, size, sample, mono }) => (
          <div key={label} className="flex items-center justify-between px-4 py-2 border-t border-white/5">
            <span className="font-mono-jet text-ivory/30 text-[10px] w-14">{label}</span>
            <span className={`${size} font-semibold text-ivory/80 ${mono ? 'font-mono-jet' : 'font-inter'}`}>
              {sample}
            </span>
          </div>
        ))}
      </div>

      {/* Spacing grid */}
      <div>
        <p className="font-mono-jet text-champagne/60 text-[10px] tracking-[0.2em] uppercase mb-2">Spacing</p>
        <div className="flex items-end gap-2">
          {[4, 8, 16, 24, 32, 48].map((sp) => (
            <div key={sp} className="flex flex-col items-center gap-1">
              <div
                className="bg-champagne/50 rounded-sm"
                style={{ width: sp / 3, height: sp / 3 }}
              />
              <span className="font-mono-jet text-ivory/30 text-[8px]">{sp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── 03: Performance Dashboard — Deployment ── */
const METRICS = [
  { label: 'Performance',    score: 99, color: '#22c55e' },
  { label: 'Accessibility',  score: 100, color: '#22c55e' },
  { label: 'Best Practices', score: 96, color: '#22c55e' },
  { label: 'SEO',            score: 100, color: '#22c55e' },
]
const VITALS = [
  { label: 'LCP', value: '0.8s',  good: true  },
  { label: 'FID', value: '12ms',  good: true  },
  { label: 'CLS', value: '0.01',  good: true  },
  { label: 'FCP', value: '0.6s',  good: true  },
]

function ScoreRing({ score, color, label }) {
  const r = 26
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative">
        <svg width="68" height="68" viewBox="0 0 68 68">
          {/* Track */}
          <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
          {/* Fill */}
          <circle
            cx="34" cy="34" r={r}
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={circ * 0.25}
            style={{ filter: `drop-shadow(0 0 4px ${color}60)` }}
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center font-mono-jet font-medium text-sm"
          style={{ color }}
        >
          {score}
        </span>
      </div>
      <span className="font-mono-jet text-ivory/40 text-[9px] tracking-wide text-center leading-tight" style={{ maxWidth: 56 }}>
        {label}
      </span>
    </div>
  )
}

function PerformanceDashboard() {
  return (
    <div className="flex-shrink-0 space-y-5" style={{ width: 300 }}>
      {/* Score rings */}
      <div>
        <p className="font-mono-jet text-champagne/60 text-[10px] tracking-[0.2em] uppercase mb-4">Lighthouse Scores</p>
        <div className="flex justify-between px-2">
          {METRICS.map(m => (
            <ScoreRing key={m.label} score={m.score} color={m.color} label={m.label} />
          ))}
        </div>
      </div>

      {/* Core Web Vitals */}
      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <div className="px-4 pt-3 pb-2">
          <p className="font-mono-jet text-champagne/60 text-[10px] tracking-[0.2em] uppercase">Core Web Vitals</p>
        </div>
        {VITALS.map(({ label, value, good }) => (
          <div key={label} className="flex items-center justify-between px-4 py-2.5 border-t border-white/5">
            <span className="font-mono-jet text-ivory/50 text-xs">{label}</span>
            <div className="flex items-center gap-2">
              <span className="font-mono-jet text-sm font-medium text-ivory/90">{value}</span>
              <span className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: '0 0 6px rgba(34,197,94,0.6)' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Deploy status */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5">
        <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot flex-shrink-0" />
        <div className="min-w-0">
          <p className="font-mono-jet text-ivory/60 text-xs">Production · v1.0.0</p>
          <p className="font-mono-jet text-champagne text-[10px] truncate">https://yoursite.com ✓ Live</p>
        </div>
      </div>
    </div>
  )
}


const STEPS = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We immerse ourselves in your world, mapping competitive landscapes and identifying your unfair advantage.',
    visual: BrowserWireframe,
    bg: 'bg-ivory',
    text: 'text-slate',
    accent: 'text-champagne',
    border: 'border-slate/10',
  },
  {
    num: '02',
    title: 'Design System',
    desc: 'Every element engineered with precision — typography, color, motion — forming a coherent visual language.',
    visual: DesignTokens,
    bg: 'bg-obsidian',
    text: 'text-ivory',
    accent: 'text-champagne',
    border: 'border-white/10',
  },
  {
    num: '03',
    title: 'Deployment',
    desc: 'Launch-ready systems built for performance, accessibility, and long-term scalability.',
    visual: PerformanceDashboard,
    bg: 'bg-slate',
    text: 'text-ivory',
    accent: 'text-champagne',
    border: 'border-white/5',
  },
]

export default function Protocol() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')

      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          const nextCard = cards[i + 1]

          ScrollTrigger.create({
            trigger: nextCard,
            start: 'top 80%',
            end: 'top top',
            scrub: true,
            onUpdate: (self) => {
              gsap.set(card, {
                scale: 1 - 0.05 * self.progress,
                filter: `blur(${self.progress * 6}px)`,
                opacity: 1 - 0.5 * self.progress,
              })
            },
          })
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative" id="protocol" ref={containerRef}>
      {/* Label row */}
      <div className="bg-ivory py-20 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-champagne" />
            <span className="font-mono-jet text-champagne text-xs tracking-[0.2em] uppercase">
              Our Protocol
            </span>
          </div>
          <h2 className="font-inter font-bold text-slate text-3xl md:text-5xl tracking-tight max-w-xl">
            A three-act process. Zero compromises.
          </h2>
        </div>
      </div>

      {/* Sticky cards */}
      {STEPS.map(({ num, title, desc, visual: Visual, bg, text, accent, border }, i) => (
        <div
          key={num}
          className={`protocol-card ${bg}`}
          style={{ zIndex: i + 1 }}
        >
          <div className={`h-full border-t ${border} max-w-7xl mx-auto w-full px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-12 py-20`}>
            {/* Text content */}
            <div className="flex-1 max-w-lg">
              <span className={`font-mono-jet text-4xl md:text-6xl font-light ${accent} opacity-30 block mb-8`}>
                {num}
              </span>
              <h3 className={`font-inter font-bold text-3xl md:text-5xl tracking-tight ${text} mb-6`}>
                {title}
              </h3>
              <p className={`font-inter text-lg leading-relaxed ${text} opacity-50 max-w-sm`}>
                {desc}
              </p>
            </div>

            {/* Visual */}
            <div className="flex-shrink-0">
              <Visual />
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
