import Nav from '../components/Nav'
import Footer from '../components/Footer'

const LAST_UPDATED = 'March 13, 2026'

const COOKIE_TYPES = [
  {
    type: 'Essential',
    required: true,
    purpose: 'Necessary for the website to function. These cannot be disabled.',
    examples: 'Session management, security tokens, form CSRF protection.',
    duration: 'Session',
  },
  {
    type: 'Analytics',
    required: false,
    purpose: 'Help us understand how visitors interact with our site so we can improve it.',
    examples: 'Page views, time on page, referral source. We use privacy-first analytics (no cross-site tracking).',
    duration: '365 days',
  },
  {
    type: 'Preference',
    required: false,
    purpose: 'Remember settings you have chosen to enhance your experience.',
    examples: 'Theme preference, language selection.',
    duration: '365 days',
  },
]

export default function CookiePage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Nav />

      <section className="pt-48 pb-16 px-6 md:px-16 bg-obsidian noise-texture relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, #C9A84C 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-champagne" />
            <span className="font-mono-jet text-champagne text-xs tracking-[0.2em] uppercase">Legal</span>
          </div>
          <h1 className="font-inter font-black text-ivory text-4xl md:text-5xl tracking-tight mb-4">
            Cookie Policy
          </h1>
          <p className="font-mono-jet text-ivory/30 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-8 py-16">
        <div className="space-y-10">
          <p className="font-inter text-slate/60 text-base leading-relaxed p-6 rounded-2xl border border-slate/10 bg-slate/5">
            This Cookie Policy explains what cookies are, how Viffey uses them, and how you can control your preferences.
          </p>

          <div>
            <h2 className="font-inter font-bold text-slate text-lg mb-3">What Are Cookies?</h2>
            <p className="font-inter text-slate/60 text-base leading-relaxed">
              Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, improve user experience, and provide information to website owners. Cookies cannot run programs or deliver viruses to your device.
            </p>
          </div>

          <div>
            <h2 className="font-inter font-bold text-slate text-lg mb-5">Cookies We Use</h2>
            <div className="space-y-4">
              {COOKIE_TYPES.map(({ type, required, purpose, examples, duration }) => (
                <div key={type} className="p-6 rounded-2xl border border-slate/10">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-inter font-semibold text-slate">{type} Cookies</h3>
                    <span className={`font-mono-jet text-xs px-2 py-0.5 rounded-full ${
                      required ? 'bg-champagne/20 text-champagne' : 'bg-slate/10 text-slate/50'
                    }`}>
                      {required ? 'Always Active' : 'Optional'}
                    </span>
                  </div>
                  <p className="font-inter text-slate/60 text-sm leading-relaxed mb-2">{purpose}</p>
                  <p className="font-inter text-slate/40 text-xs leading-relaxed mb-2">
                    <span className="font-semibold">Examples:</span> {examples}
                  </p>
                  <p className="font-mono-jet text-slate/40 text-xs">
                    Duration: {duration}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {[
            {
              title: 'How to Control Cookies',
              content: `You can control and manage cookies in several ways. Most browsers allow you to refuse cookies or delete existing ones via their settings. Please note that disabling certain cookies may affect website functionality. You can also opt out of optional analytics cookies at any time by contacting us.`,
            },
            {
              title: 'Third-Party Cookies',
              content: `We do not place any advertising or social media tracking cookies. Any third-party services we use (such as analytics) are selected for their privacy-first approach and do not engage in cross-site tracking or fingerprinting.`,
            },
            {
              title: 'Updates to This Policy',
              content: `We may update this Cookie Policy to reflect changes in our practices or for legal reasons. Material changes will be communicated on our Site.`,
            },
            {
              title: 'Contact',
              content: `For questions about our use of cookies, contact us at privacy@viffey.com.`,
            },
          ].map(({ title, content }) => (
            <div key={title}>
              <h2 className="font-inter font-bold text-slate text-lg mb-3">{title}</h2>
              <p className="font-inter text-slate/60 text-base leading-relaxed">{content}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
