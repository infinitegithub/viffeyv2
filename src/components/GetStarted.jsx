import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

export default function GetStarted() {
  const btnRef = useRef(null)

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.03)`
    }
    const handleMouseLeave = () => {
      btn.style.transform = 'translate(0, 0) scale(1)'
    }

    btn.addEventListener('mousemove', handleMouseMove)
    btn.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      btn.removeEventListener('mousemove', handleMouseMove)
      btn.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section
      className="section-padding bg-ivory"
      id="get-started"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="rounded-[3rem] overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #a8842e 40%, #c9a84c 100%)' }}>
          {/* Noise overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Glow orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)', filter: 'blur(40px)' }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #0D0D12 0%, transparent 70%)', filter: 'blur(30px)' }} />

          <div className="relative z-10 px-8 md:px-16 py-16 md:py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div className="max-w-xl">
              <span className="font-mono-jet text-obsidian/60 text-xs tracking-[0.2em] uppercase block mb-4">
                Ready When You Are
              </span>
              <h2 className="font-inter font-black text-obsidian text-3xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-4">
                Ready to elevate your online presence?
              </h2>
              <p className="font-inter text-obsidian/60 text-lg leading-relaxed">
                No discovery calls. No lengthy proposals. Just a conversation about your vision and how we turn it into something the internet has never seen.
              </p>
            </div>

            <div className="flex flex-col gap-4 flex-shrink-0">
              <a
                ref={btnRef}
                href="mailto:hello@viffey.com"
                className="hover-expand group inline-flex items-center gap-3 bg-obsidian text-ivory font-semibold px-8 py-5 rounded-[2rem] text-base transition-all duration-300 hover:bg-slate"
                style={{ transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), background 0.3s' }}
              >
                Start the Conversation
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>
              <p className="font-mono-jet text-obsidian/40 text-xs text-center tracking-wide">
                Response within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
