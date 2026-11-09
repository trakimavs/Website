import { useState } from 'react'

// The rules PDF, gated by a short name + email form.
// Each request emails a lead to mavrikisdesigns@gmail.com via FormSubmit
// (same service as the waitlist form), then the PDF downloads.

const PDF_URL = '/downloads/mavrikis-designs-rules-of-tavli.pdf'
const PDF_NAME = 'Mavrikis Designs - Rules of Tavli.pdf'

function startDownload() {
  const a = document.createElement('a')
  a.href = PDF_URL
  a.download = PDF_NAME
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export default function RulesDownload() {
  const [open, setOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: '', email: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await fetch('https://formsubmit.co/ajax/mavrikisdesigns@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          download: 'Rules of Tavli (PDF)',
          _subject: 'Lead - rulebook download',
          _template: 'table',
        }),
      })
    } catch {
      // The visitor still gets the rules even if the lead email fails.
    } finally {
      setSending(false)
      setDone(true)
      startDownload()
    }
  }

  if (done) {
    return (
      <div className="flex flex-col gap-2" role="status">
        <p className="font-display text-xl text-ivory">Thank you, {form.name.split(' ')[0]}.</p>
        <p className="text-sm leading-relaxed text-ivory/75">
          Your download has started. If it didn’t,{' '}
          <a href={PDF_URL} download={PDF_NAME} className="text-gold underline underline-offset-4">
            download the rules here
          </a>
          .
        </p>
      </div>
    )
  }

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="btn-ghost self-start">
        Download the rules (PDF)
      </button>
    )
  }

  const input =
    'bg-transparent border border-ivory/20 focus:border-gold outline-none px-4 py-3 text-ivory text-sm transition-colors duration-200'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className="text-sm leading-relaxed text-ivory/75">
        Leave your name and email, and the rules download straight away.
      </p>
      <div className="flex flex-col gap-2">
        <label className="section-label" htmlFor="rules-name">Name</label>
        <input
          id="rules-name"
          type="text"
          required
          autoComplete="name"
          autoFocus
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={input}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="section-label" htmlFor="rules-email">Email</label>
        <input
          id="rules-email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={input}
        />
      </div>
      <button type="submit" disabled={sending} className="btn-primary self-start mt-1 disabled:opacity-50">
        {sending ? 'Preparing…' : 'Download'}
      </button>
    </form>
  )
}
