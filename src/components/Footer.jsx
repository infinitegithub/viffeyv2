import { Twitter, Instagram, Linkedin, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const NAV_COLS = [
  {
    heading: 'Work',
    links: [
      { label: 'Case Studies', to: '#' },
      { label: 'Portfolio', to: '#' },
      { label: 'Clients', to: '#' },
      { label: 'Results', to: '#' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Brand Identity', to: '#' },
      { label: 'Web Design', to: '#' },
      { label: 'Motion', to: '#' },
      { label: 'Strategy', to: '#' },
    ],
  },
  {
    heading: 'Studio',
    links: [
      { label: 'About', to: '#' },
      { label: 'Process', to: '#' },
      { label: 'Careers', to: '#' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-obsidian rounded-t-[4rem] pt-16 pb-10 noise-texture relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(ellipse, #C9A84C 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <img src="/viffey-logo-dark.svg" alt="viffey" className="h-8 mb-6 invert" />
            <p className="font-inter text-ivory/40 text-sm leading-relaxed max-w-xs mb-8">
              Forging a definitive online presence for modern brands. No templates. No trends. Only legacies.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {[
                { Icon: Twitter, href: '#', label: 'Twitter' },
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Linkedin, href: '#', label: 'LinkedIn' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-ivory/40 hover:text-champagne hover:border-champagne/40 transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          {NAV_COLS.map(col => (
            <div key={col.heading}>
              <h4 className="font-mono-jet text-ivory/30 text-xs tracking-[0.2em] uppercase mb-5">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="group nav-link inline-flex items-center gap-1 font-inter text-ivory/50 text-sm hover:text-ivory transition-colors duration-200"
                    >
                      {label}
                      <ArrowUpRight
                        size={11}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/5 mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Systems nominal */}
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
            <span className="font-mono-jet text-ivory/30 text-xs tracking-widest">
              SYSTEMS NOMINAL
            </span>
          </div>

          {/* Legal */}
          <div className="flex flex-wrap gap-6">
            {[
              { label: 'Privacy Policy', to: '/privacy' },
              { label: 'Terms of Service', to: '/terms' },
              { label: 'Cookie Policy', to: '/cookies' },
            ].map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="font-inter text-ivory/30 text-xs hover:text-ivory/60 transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-mono-jet text-ivory/20 text-xs tracking-wide">
            © {new Date().getFullYear()} viffey. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
