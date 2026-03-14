import Nav from '../components/Nav'
import Footer from '../components/Footer'

const LAST_UPDATED = 'March 13, 2026'

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. Who We Are',
      content: `Viffey ("we", "our", "us") operates this website and related services. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website (viffey.com) or engage with our services.`,
    },
    {
      title: '2. Information We Collect',
      content: `We collect information you provide directly, such as your name, email address, company name, and project details when you fill out our contact form or communicate with us. We may also collect usage data automatically, including IP address, browser type, pages visited, and time spent on our site through standard web analytics tools.`,
    },
    {
      title: '3. How We Use Your Information',
      content: `We use the information we collect to: respond to your inquiries and project briefs; manage ongoing client relationships and project deliverables; improve our website and services; send service-related communications; and comply with legal obligations. We do not sell, rent, or trade your personal information to third parties.`,
    },
    {
      title: '4. Legal Basis for Processing',
      content: `Where applicable under GDPR or similar data protection laws, our legal basis for processing your personal data is: (a) your consent, given when you submit our contact form; (b) performance of a contract, when processing is necessary to deliver agreed services; and (c) legitimate interests, for improving our services and site analytics.`,
    },
    {
      title: '5. Cookies',
      content: `Our website uses essential cookies required for basic functionality, and optional analytics cookies that help us understand how visitors use our site. You can control cookie preferences via our Cookie Policy or your browser settings. We do not use tracking cookies for advertising purposes.`,
    },
    {
      title: '6. Third-Party Services',
      content: `We may use trusted third-party services for analytics (e.g., Plausible Analytics), email communication, and project management. These services have their own privacy policies and data handling practices. We select partners who comply with applicable data protection regulations.`,
    },
    {
      title: '7. Data Retention',
      content: `We retain your personal information only as long as necessary for the purposes described in this policy, or as required by applicable law. Project-related information is retained for the duration of the engagement and for a reasonable period thereafter for legal and accounting purposes.`,
    },
    {
      title: '8. Your Rights',
      content: `Depending on your location, you may have the right to: access the personal data we hold about you; correct inaccurate data; request deletion of your data; object to or restrict processing; and data portability. To exercise any of these rights, contact us at privacy@viffey.com.`,
    },
    {
      title: '9. Data Security',
      content: `We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.`,
    },
    {
      title: '10. Changes to This Policy',
      content: `We may update this Privacy Policy periodically. Material changes will be communicated on our website. Continued use of our site after changes become effective constitutes acceptance of the revised policy.`,
    },
    {
      title: '11. Contact',
      content: `For any privacy-related questions or to exercise your rights, please contact us at privacy@viffey.com.`,
    },
  ]

  return (
    <div className="min-h-screen bg-ivory">
      <Nav />

      <section className="pt-48 pb-16 px-6 md:px-16 bg-obsidian noise-texture relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 70% 50%, #C9A84C 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-champagne" />
            <span className="font-mono-jet text-champagne text-xs tracking-[0.2em] uppercase">Legal</span>
          </div>
          <h1 className="font-inter font-black text-ivory text-4xl md:text-5xl tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="font-mono-jet text-ivory/30 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-8 py-16">
        <div className="space-y-10">
          <p className="font-inter text-slate/60 text-base leading-relaxed p-6 rounded-2xl border border-slate/10 bg-slate/5">
            Your privacy matters to us. This policy describes what data we collect, why we collect it, and how we handle it.
          </p>
          {sections.map(({ title, content }) => (
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
