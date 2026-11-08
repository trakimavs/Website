import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { boards } from '../data/boards'

export default function Waitlist() {
  const [searchParams] = useSearchParams()
  const boardId = searchParams.get('board')
  const referencedBoard = boards.find((b) => b.id === boardId)

  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: referencedBoard ? `I'm interested in the ${referencedBoard.name}.` : '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(false)
    try {
      // FormSubmit emails each submission to this address (https://formsubmit.co).
      // The first submission sends an activation email that must be confirmed.
      const res = await fetch('https://formsubmit.co/ajax/mavrikistavli@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...form,
          _subject: referencedBoard
            ? `Waitlist request: ${referencedBoard.name}`
            : 'New waitlist request',
          _template: 'table',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && String(data.success) === 'true') setSubmitted(true)
      else setError(true)
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="pt-32 pb-24">
      <div className="max-w-xl mx-auto px-6 md:px-12">
        <p className="section-label mb-4">Limited production</p>
        <h1 className="font-display text-5xl md:text-6xl font-light text-ivory mb-6 leading-none">
          Join the<br />Waitlist
        </h1>
        {referencedBoard && (
          <div className="border-l-2 border-gold/40 pl-4 mb-8">
            <p className="section-label mb-1">Enquiring about</p>
            <p className="text-ivory/70 font-display text-xl">{referencedBoard.name}</p>
          </div>
        )}
        <p className="text-ivory/50 font-light leading-relaxed mb-14">
          Boards are made to order. Leave your details and we'll reach out
          personally within 48 hours, whether you're interested in a specific
          board or would like to discuss a commission.
        </p>

        {submitted ? (
          <div className="border border-gold/30 bg-gold/5 px-8 py-10 text-center">
            <p className="font-display text-2xl text-ivory mb-3">Thank you.</p>
            <p className="text-ivory/50 text-sm">
              We'll be in touch when the next board is ready.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="section-label" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-transparent border border-white/10 focus:border-gold/60 outline-none px-4 py-3 text-ivory/80 text-sm font-light transition-colors duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="section-label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-transparent border border-white/10 focus:border-gold/60 outline-none px-4 py-3 text-ivory/80 text-sm font-light transition-colors duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="section-label" htmlFor="message">
                Message <span className="text-ivory/20">(optional)</span>
              </label>
              <textarea
                id="message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Any board in particular? Custom commission? Just say hello."
                className="bg-transparent border border-white/10 focus:border-gold/60 outline-none px-4 py-3 text-ivory/80 text-sm font-light placeholder:text-ivory/20 resize-none transition-colors duration-200"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400/80">
                Something went wrong sending your request. Please try again, or
                email us at mavrikistavli@gmail.com.
              </p>
            )}

            <button type="submit" disabled={sending} className="btn-primary self-start mt-2 disabled:opacity-50">
              {sending ? 'Sending…' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
