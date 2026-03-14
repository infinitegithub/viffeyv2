import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CONTRAST_BLOCKS = [
  {
    them: 'Most agencies focus on:',
    themText: 'generic templates and fleeting trends.',
    us: 'We focus on:',
    usText: 'crafting digital legacies.',
    usHighlight: 'digital legacies',
  },
  {
    them: 'They sell you:',
    themText: 'cookie-cutter solutions and overnight turnarounds.',
    us: 'We deliver:',
    usText: 'systems that compound in value over decades.',
    usHighlight: 'compound in value',
  },
]

function splitIntoWords(text) {
  return text.split(' ').map((word, i) => (
    <span key={i} className="word-hidden inline-block mr-[0.3em]">
      {word}
    </span>
  ))
}

export default function Philosophy() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = sectionRef.current?.querySelectorAll('.word-hidden')
      if (!words?.length) return

      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.04,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          once: true,
        },
      })

      // Parallax texture
      gsap.to('.philosophy-texture', {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden noise-texture bg-obsidian section-padding"
      id="studio"
    >
      {/* Organic texture layer with parallax */}
      <div
        className="philosophy-texture absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=60&fm=webp")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1.2)',
        }}
      />

      {/* Champagne gradient glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-px bg-champagne" />
          <span className="font-mono-jet text-champagne/70 text-xs tracking-[0.2em] uppercase">
            Our Manifesto
          </span>
        </div>

        <div className="space-y-20">
          {CONTRAST_BLOCKS.map((block, idx) => (
            <div key={idx} className="grid md:grid-cols-2 gap-8 md:gap-16">
              {/* Their way */}
              <div className="opacity-50">
                <span className="font-mono-jet text-ivory/40 text-xs tracking-widest block mb-3">
                  {block.them}
                </span>
                <p className="font-inter font-light text-ivory/60 text-xl md:text-2xl leading-relaxed line-through decoration-champagne/30">
                  {splitIntoWords(block.themText)}
                </p>
              </div>

              {/* Our way */}
              <div>
                <span className="font-mono-jet text-champagne text-xs tracking-widest block mb-3">
                  {block.us}
                </span>
                <p
                  className="font-playfair italic text-ivory text-2xl md:text-3xl leading-relaxed"
                  style={{ fontWeight: 600 }}
                >
                  {block.usText.split(block.usHighlight).map((part, i) =>
                    i === 0 ? (
                      <span key={i}>
                        {splitIntoWords(part)}
                        <em key="hi" className="text-champagne not-italic font-bold">
                          {splitIntoWords(block.usHighlight)}
                        </em>
                      </span>
                    ) : (
                      <span key={i}>{splitIntoWords(part)}</span>
                    )
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom quote */}
        <div className="mt-24 pt-12 border-t border-white/10 text-center">
          <blockquote className="font-playfair italic text-ivory/60 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
            <span className="word-hidden inline-block">"The</span>{' '}
            <span className="word-hidden inline-block">internet</span>{' '}
            <span className="word-hidden inline-block">is</span>{' '}
            <span className="word-hidden inline-block">full</span>{' '}
            <span className="word-hidden inline-block">of</span>{' '}
            <span className="word-hidden inline-block text-champagne">adequate.</span>{' '}
            <span className="word-hidden inline-block">We</span>{' '}
            <span className="word-hidden inline-block">build</span>{' '}
            <span className="word-hidden inline-block text-champagne">unforgettable."</span>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
