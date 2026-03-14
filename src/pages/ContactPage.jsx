import { Mail, MapPin, Clock, ArrowUpRight, Send } from 'lucide-react'
import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', budget: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production this would POST to an API
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Nav />

      {/* Hero */}
      <section className="pt-48 pb-20 px-6 md:px-16 bg-obsidian noise-texture relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 70% 50%, #C9A84C 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-champagne" />
            <span className="font-mono-jet text-champagne text-xs tracking-[0.2em] uppercase">Get In Touch</span>
          </div>
          <h1 className="font-inter font-black text-ivory text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] mb-6">
            Let's build something<br />
            <span className="font-playfair italic text-champagne">unforgettable.</span>
          </h1>
          <p className="font-inter font-light text-ivory/50 text-lg max-w-md">
            We take on a limited number of projects each quarter. Tell us about yours.
          </p>
        </div>
      </section>

      {/* Content grid */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-16">

          {/* Contact info */}
          <div>
            <h2 className="font-inter font-bold text-slate text-2xl mb-8">Studio Details</h2>
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'hello@viffey.com', href: 'mailto:hello@viffey.com' },
                { icon: MapPin, label: 'Location', value: 'Remote — Worldwide', href: null },
                { icon: Clock, label: 'Response Time', value: 'Within 24 hours', href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex gap-4 items-start p-5 rounded-2xl border border-slate/10 bg-white/50">
                  <div className="w-10 h-10 rounded-xl bg-champagne/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-champagne" />
                  </div>
                  <div>
                    <p className="font-mono-jet text-slate/40 text-xs tracking-widest uppercase mb-1">{label}</p>
                    {href
                      ? <a href={href} className="font-inter font-medium text-slate hover:text-champagne transition-colors">{value}</a>
                      : <p className="font-inter font-medium text-slate">{value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h3 className="font-inter font-semibold text-slate mb-5">Common Questions</h3>
              <div className="space-y-4">
                {[
                  { q: 'What is your minimum engagement?', a: 'Projects typically start at $8,000 USD for a full brand identity and website system.' },
                  { q: 'How long does a project take?', a: 'Most projects complete in 6–10 weeks depending on scope and your feedback velocity.' },
                  { q: 'Do you work with early-stage startups?', a: 'Yes — if your vision is ambitious and you value craft, we want to talk.' },
                ].map(({ q, a }) => (
                  <div key={q} className="p-5 rounded-2xl border border-slate/10">
                    <p className="font-inter font-semibold text-slate text-sm mb-1.5">{q}</p>
                    <p className="font-inter text-slate/50 text-sm leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 rounded-3xl border border-champagne/20 bg-champagne/5">
                <div className="w-16 h-16 rounded-full bg-champagne/10 flex items-center justify-center mb-6">
                  <Send size={28} className="text-champagne" />
                </div>
                <h3 className="font-inter font-bold text-slate text-2xl mb-3">Message received.</h3>
                <p className="font-inter text-slate/50 text-base leading-relaxed max-w-sm">
                  We'll review your brief and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Alex Johnson', required: true },
                  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'alex@company.com', required: true },
                  { id: 'company', label: 'Company / Brand', type: 'text', placeholder: 'Acme Corp', required: false },
                ].map(({ id, label, type, placeholder, required }) => (
                  <div key={id}>
                    <label className="font-mono-jet text-slate/50 text-xs tracking-widest uppercase block mb-2" htmlFor={id}>
                      {label}{required && ' *'}
                    </label>
                    <input
                      id={id}
                      type={type}
                      placeholder={placeholder}
                      required={required}
                      value={form[id]}
                      onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                      className="w-full px-5 py-4 rounded-2xl border border-slate/15 bg-white font-inter text-slate text-sm placeholder:text-slate/30 focus:outline-none focus:border-champagne/60 focus:ring-2 focus:ring-champagne/10 transition-all"
                    />
                  </div>
                ))}

                {/* Budget select */}
                <div>
                  <label className="font-mono-jet text-slate/50 text-xs tracking-widest uppercase block mb-2" htmlFor="budget">
                    Estimated Budget
                  </label>
                  <select
                    id="budget"
                    value={form.budget}
                    onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                    className="w-full px-5 py-4 rounded-2xl border border-slate/15 bg-white font-inter text-slate text-sm focus:outline-none focus:border-champagne/60 focus:ring-2 focus:ring-champagne/10 transition-all appearance-none"
                  >
                    <option value="">Select a range</option>
                    <option>$5k – $10k</option>
                    <option>$10k – $25k</option>
                    <option>$25k – $50k</option>
                    <option>$50k+</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="font-mono-jet text-slate/50 text-xs tracking-widest uppercase block mb-2" htmlFor="message">
                    Tell Us About Your Project *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="We're building a premium SaaS platform and need a brand identity and website that positions us as the leader in..."
                    required
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-5 py-4 rounded-2xl border border-slate/15 bg-white font-inter text-slate text-sm placeholder:text-slate/30 focus:outline-none focus:border-champagne/60 focus:ring-2 focus:ring-champagne/10 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full inline-flex items-center justify-center gap-3 bg-obsidian text-ivory font-semibold text-sm px-8 py-5 rounded-2xl hover:bg-champagne hover:text-obsidian transition-all duration-300"
                >
                  Send Your Brief
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </button>

                <p className="font-mono-jet text-slate/30 text-xs text-center tracking-wide">
                  No spam. No cold pitches. Just craft.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
