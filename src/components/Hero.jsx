import { Component, Suspense, lazy, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

// Lazy-load Spline per the skill's performance guidelines (~500KB)
const Spline = lazy(() => import('@splinetool/react-spline'))

const SCENE_URL = 'https://prod.spline.design/sqJ5qOKR3sQWSjcL/scene.splinecode'

/* Fallback dark background when WebGL is unavailable */
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=1920&q=80&fm=webp'

function SplineFallback() {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${FALLBACK_IMAGE})` }}
    />
  )
}

/* Loading state shown while the Spline bundle downloads */
function SplineLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-obsidian">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 rounded-full border-2 border-champagne/30 border-t-champagne"
          style={{ animation: 'spin 0.9s linear infinite' }}
        />
        <span className="font-mono-jet text-champagne/40 text-xs tracking-[0.2em]">
          LOADING SCENE
        </span>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

/* Error boundary catches WebGL / Spline runtime errors silently */
class SplineErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) return <SplineFallback />
    return this.props.children
  }
}

export default function Hero() {
  const containerRef = useRef(null)
  const [sceneLoaded, setSceneLoaded] = useState(false)

  // GSAP entrance animation fires after Spline signals onLoad
  // (or immediately after mount as fallback)
  useEffect(() => {
    // Fallback: run animation after 3s even if scene never calls onLoad
    const fallbackTimer = setTimeout(() => setSceneLoaded(true), 3000)

    // Kill the watermark more effectively from mount
    const observeWatermark = () => {
      const watermark = document.querySelector('a[href*="spline.design"]') || 
                        document.querySelector('div[style*="z-index: 9999999"]') ||
                        document.querySelector('div[id*="spline-logo"]')
      if (watermark) {
        watermark.style.display = 'none'
        watermark.style.opacity = '0'
        watermark.style.visibility = 'hidden'
        watermark.style.pointerEvents = 'none'
      }
    }

    const observer = new MutationObserver(observeWatermark)
    observer.observe(document.body, { childList: true, subtree: true })
    
    // Check frequently for the first few seconds
    const killInterval = setInterval(observeWatermark, 1000)

    return () => {
      clearTimeout(fallbackTimer)
      clearInterval(killInterval)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!sceneLoaded) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-badge', { x: -20, opacity: 0, duration: 0.6 })
        .from('.hero-line', { y: 40, opacity: 0, duration: 1, stagger: 0.12 }, '-=0.3')
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.7 }, '-=0.5')
    }, containerRef)
    return () => ctx.revert()
  }, [sceneLoaded])

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100dvh' }}
      id="work"
    >
      {/* ── 3D Scene layer ── */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <SplineErrorBoundary>
          <Suspense fallback={<SplineLoader />}>
            <Spline
              scene={SCENE_URL}
              onLoad={(app) => {
                setSceneLoaded(true)
                const objects = app.getAllObjects()
                objects.forEach(obj => {
                  const name = (obj.name || '').toLowerCase()
                  // Aggressive filter to keep only the main 3D object
                  if (
                    name.includes('text') || 
                    name.includes('ring') ||
                    name.includes('words') ||
                    name.includes('square') ||
                    name.includes('cube') ||
                    name.includes('box') ||
                    name.includes('logo') ||
                    name.includes('spline') ||
                    name.includes('grid') ||
                    name.includes('ui') ||
                    name.includes('icon') ||
                    name.includes('helper') ||
                    name.includes('point') ||
                    name.includes('cloud') ||
                    name.includes('particle') ||
                    name.includes('group') ||
                    name.includes('ellipse') ||
                    name.includes('rectangle') ||
                    name.includes('shape')
                  ) {
                    obj.visible = false
                  }
                })
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </Suspense>
        </SplineErrorBoundary>
      </div>

      {/* ── Gradient overlays ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: `
            linear-gradient(to right,  rgba(13,13,18,0.95) 0%, rgba(13,13,18,0.60) 42%, rgba(13,13,18,0.15) 75%, transparent 100%),
            linear-gradient(to top,    rgba(13,13,18,0.90) 0%, rgba(13,13,18,0.30) 40%, transparent 70%),
            linear-gradient(to bottom, rgba(13,13,18,0.50) 0%, transparent 25%)
          `,
        }}
      />

      {/* Mask for bottom right watermark area */}
      <div 
        className="absolute bottom-0 right-0 w-64 h-24 pointer-events-none"
        style={{ 
          zIndex: 2,
          background: 'linear-gradient(to top left, rgba(13,13,18,1) 0%, transparent 70%)' 
        }}
      />

      {/* Champagne glow */}
      <div
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          zIndex: 2,
          width: '520px',
          height: '520px',
          background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ── Hero copy — Brute force bottom anchoring ── */}
      <div
        className="absolute inset-0 flex flex-col px-8 md:px-16 lg:px-24 pointer-events-none"
        style={{ zIndex: 3 }}
      >
        <div className="flex-grow" /> {/* Spacer pushes content to bottom */}
        <div className="max-w-[820px] pb-12 md:pb-16 lg:pb-20">
          {/* Eyebrow badge */}
          <div className="hero-badge flex items-center gap-2 mb-6">
            <span className="inline-block w-2 h-2 rounded-full bg-champagne pulse-dot" />
            <span className="font-mono-jet text-champagne/80 text-xs tracking-[0.2em] uppercase">
              Digital Atelier · Est. 2024
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-3">
            <span className="hero-line block font-inter font-bold text-ivory/95 leading-tight text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Digital presence meets
            </span>
            <span
              className="hero-line block font-playfair italic text-champagne leading-tight"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
            >
              Absolute precision.
            </span>
          </h1>

          {/* Sub-copy */}
          <p className="hero-line font-inter font-light text-ivory/60 text-lg md:text-xl leading-relaxed mt-4 mb-8 max-w-lg">
            We forge definitive online presences for modern brands.
            No templates. No trends. Only legacies.
          </p>

          {/* Single CTA — re-enabled pointer events */}
          <div className="hero-cta pointer-events-auto">
            <Link
              to="/contact"
              className="magnetic-btn group inline-flex items-center gap-3 bg-champagne text-obsidian font-semibold text-sm px-8 py-4 rounded-[2rem] hover:bg-ivory transition-all duration-300 shadow-lg shadow-champagne/20"
            >
              Contact Us
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2 opacity-40 pointer-events-none"
        style={{ zIndex: 3 }}
      >
        <div
          className="w-px h-12 bg-ivory/40"
          style={{ animation: 'scrollPulse 2s ease-in-out infinite' }}
        />
        <span className="font-mono-jet text-ivory text-xs tracking-[0.2em] rotate-90 origin-center mt-2">
          SCROLL
        </span>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%   { transform: scaleY(0); opacity: 0; transform-origin: top; }
          50%  { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(0); opacity: 0; transform-origin: bottom; }
        }
        /* Aggressive Spline watermark removal */
        #spline-logo, 
        .spline-logo, 
        a[href*="spline.design"], 
        div[style*="z-index: 9999999"],
        div[style*="bottom: 10px"][style*="right: 10px"],
        div[style*="position: fixed"][style*="z-index: 10000"] { 
          display: none !important; 
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important; 
        }
      `}</style>
    </section>
  )
}
