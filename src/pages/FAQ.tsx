import { Link } from 'react-router-dom'
import { faq, answeredFaq } from '../data/faq'

// In `npm run dev` unwritten questions show as placeholders; the built site
// only shows answered ones (see src/data/faq.ts).
const sections = import.meta.env.DEV ? faq : answeredFaq()

export default function FAQ() {
  return (
    <main className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <p className="section-label mb-4">Questions</p>
        <h1 className="font-display text-5xl md:text-7xl text-ivory mb-8 leading-none">
          Before you ask.
        </h1>
        <p className=" text-ivory/75 text-lg leading-relaxed mb-16">
          What people most often want to know about the boards, commissions and
          delivery. Anything else, just write.
        </p>

        <div className="flex flex-col gap-16">
          {sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
              <h2
                id={`${section.id}-title`}
                className="font-display text-2xl md:text-3xl text-gold mb-6"
              >
                {section.title}
              </h2>

              <div className="border-t border-white/10">
                {section.items.map((item) => (
                  <details
                    key={item.id}
                    id={item.id}
                    className="group border-b border-white/10"
                  >
                    <summary className="flex items-start justify-between gap-6 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <span className="font-display text-lg md:text-xl text-ivory/90 group-hover:text-ivory transition-colors">
                        {item.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className="mt-1 text-gold text-xl leading-none transition-transform duration-300 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>

                    <div className="pb-8 pr-10">
                      {item.answer ? (
                        <p className=" text-ivory/70 leading-relaxed">{item.answer}</p>
                      ) : (
                        <p className=" text-ivory/50 italic">
                          Answer still to be written. Hidden on the live site.
                        </p>
                      )}
                      {item.link && (
                        <Link
                          to={item.link.to}
                          className="inline-block mt-4 text-xs tracking-widest uppercase text-gold hover:text-gold transition-colors"
                        >
                          {item.link.label} →
                        </Link>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 flex flex-col sm:flex-row gap-4">
          <Link to="/waitlist" className="btn-primary">
            Ask a question
          </Link>
          <Link to="/collection" className="btn-ghost">
            See the boards
          </Link>
        </div>
      </div>
    </main>
  )
}
