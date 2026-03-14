import Nav from '../components/Nav'
import Footer from '../components/Footer'

const LAST_UPDATED = 'March 13, 2026'

export default function TermsPage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing or using the Viffey website (the "Site") and any services offered by Viffey ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Site or Services. These Terms apply to all visitors, clients, and others who access or use the Site.`,
    },
    {
      title: '2. Services',
      content: `Viffey provides digital brand strategy, web design, visual identity, and related creative services ("Services"). The specific scope, deliverables, timelines, and fees for any engagement are agreed upon in a separate written proposal or Statement of Work ("SOW") signed by both parties. These Terms govern your general use of our Site and form the baseline agreement for all client relationships.`,
    },
    {
      title: '3. Client Responsibilities',
      content: `Clients engaging Viffey for Services agree to: (a) provide accurate, complete, and timely information required for project execution; (b) respond to review requests and feedback cycles within agreed timeframes; (c) ensure all materials supplied to Viffey (images, copy, brand assets) are owned by or licensed to the client and do not infringe any third-party rights; and (d) designate a single point of contact for project communications.`,
    },
    {
      title: '4. Intellectual Property',
      content: `Upon receipt of full payment, Viffey transfers to the client all intellectual property rights in the final agreed-upon deliverables as specified in the SOW. Viffey retains the right to showcase completed work in its portfolio, case studies, and marketing materials unless the client requests otherwise in writing prior to project commencement. All preliminary concepts, explorations, and rejected directions remain the property of Viffey.`,
    },
    {
      title: '5. Payment Terms',
      content: `Unless otherwise specified in a written proposal, projects require a 50% deposit before work commences, with the remaining balance due upon final delivery. Invoices not paid within 14 days of the due date are subject to a 2% monthly interest charge. Viffey reserves the right to withhold delivery of final files until payment is received in full.`,
    },
    {
      title: '6. Revisions & Scope Changes',
      content: `Each project phase includes a defined number of revision rounds as detailed in the SOW. Additional revisions or scope changes requested beyond the agreed scope will be scoped separately and billed at our standard hourly rate. Viffey will notify the client before undertaking any out-of-scope work.`,
    },
    {
      title: '7. Confidentiality',
      content: `Both parties agree to keep confidential any proprietary or sensitive information disclosed during the project engagement. This obligation survives termination of the engagement for a period of two (2) years. Publicly available information or information independently developed by either party is not subject to this obligation.`,
    },
    {
      title: '8. Limitation of Liability',
      content: `To the fullest extent permitted by applicable law, Viffey shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site or Services, including but not limited to loss of profits, data, or goodwill. Viffey's total liability in connection with any claim arising under these Terms shall not exceed the fees paid by the client in the three (3) months preceding the claim.`,
    },
    {
      title: '9. Termination',
      content: `Either party may terminate a project engagement with 14 days written notice. In the event of client-initiated termination, the client shall pay for all work completed to date based on the project's payment schedule. In the event of Viffey-initiated termination due to client breach, the client shall pay for all work completed and Viffey shall have no further obligations.`,
    },
    {
      title: '10. Governing Law',
      content: `These Terms are governed by and construed in accordance with the laws of the jurisdiction in which Viffey is registered, without regard to conflict of law principles. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.`,
    },
    {
      title: '11. Changes to Terms',
      content: `Viffey reserves the right to update these Terms at any time. Material changes will be communicated via our Site. Continued use of the Site or Services after changes become effective constitutes acceptance of the revised Terms.`,
    },
    {
      title: '12. Contact',
      content: `If you have questions about these Terms, please contact us at legal@viffey.com.`,
    },
  ]

  return (
    <div className="min-h-screen bg-ivory">
      <Nav />

      {/* Header */}
      <section className="pt-48 pb-16 px-6 md:px-16 bg-obsidian noise-texture relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, #C9A84C 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-champagne" />
            <span className="font-mono-jet text-champagne text-xs tracking-[0.2em] uppercase">Legal</span>
          </div>
          <h1 className="font-inter font-black text-ivory text-4xl md:text-5xl tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="font-mono-jet text-ivory/30 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-3xl mx-auto px-6 md:px-8 py-16">
        <div className="prose-slate space-y-10">
          <p className="font-inter text-slate/60 text-base leading-relaxed p-6 rounded-2xl border border-slate/10 bg-slate/5">
            Please read these Terms of Service carefully before using the Viffey website or engaging our services. These terms form a binding legal agreement.
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
