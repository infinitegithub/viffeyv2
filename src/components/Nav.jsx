import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const { pathname } = useLocation()

  // All pages have a dark hero, so logo is always light until scrolled
  const onDarkBackground = !scrolled
  // After scroll, switch to ivory pill → use dark assets
  const logoSrc = onDarkBackground ? '/viffey-logo-dark.svg' : '/viffey-logo.svg'
  const logoClass = onDarkBackground ? 'h-10 transition-all duration-500 invert' : 'h-10 transition-all duration-500'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Work', 'Services', 'Studio']

  return (
    <nav
      ref={navRef}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ivory/70 backdrop-blur-xl shadow-lg shadow-slate/5'
          : 'bg-transparent'
      } rounded-[3rem] px-6 py-3`}
      style={{ minWidth: 'min(90vw, 680px)' }}
    >
      <div className="flex items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={logoSrc}
            alt="viffey"
            className={logoClass}
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`nav-link text-sm font-medium tracking-wide transition-colors duration-300 ${
                scrolled ? 'text-slate hover:text-obsidian' : 'text-ivory/80 hover:text-ivory'
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA - Hidden on home page per 'just one CTA' request */}
        {pathname !== '/' && (
          <Link
            to="/contact"
            className={`hidden md:inline-flex magnetic-btn items-center gap-2 text-sm font-semibold tracking-wide px-5 py-2.5 rounded-[2rem] transition-all duration-300 ${
              scrolled
                ? 'bg-obsidian text-ivory hover:bg-champagne hover:text-obsidian'
                : 'bg-champagne text-obsidian hover:bg-ivory hover:text-obsidian'
            }`}
          >
            Let's Talk
          </Link>
        )}

        {/* Mobile hamburger */}
        <button
          className={`md:hidden flex flex-col gap-1.5 p-1 ${scrolled ? 'text-slate' : 'text-ivory'}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden pt-4 pb-2 border-t border-slate/10 mt-3 flex flex-col gap-3">
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-slate hover:text-champagne transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <Link
            to="/contact"
            className="text-sm font-semibold bg-obsidian text-ivory px-4 py-2 rounded-[2rem] text-center mt-1"
            onClick={() => setMenuOpen(false)}
          >
            Let's Talk
          </Link>
        </div>
      )}
    </nav>
  )
}
