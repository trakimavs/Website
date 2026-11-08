import { Link } from 'react-router-dom'

export default function About() {
  return (
    <main className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <p className="section-label mb-4">The Craft</p>
        <h1 className="font-display text-5xl md:text-7xl font-light text-ivory mb-16 leading-none">
          One maker.<br />
          <em className="text-gold not-italic">One board at a time.</em>
        </h1>

        <div className="w-full mb-16 overflow-hidden">
          <img
            src="/website/images/board-aegean-1.jpg"
            alt="The Aegean Blue board, ICXC NIKA engraving in figured walnut"
            className="w-full object-cover"
            style={{ aspectRatio: '3/2', objectPosition: 'center 30%' }}
          />
        </div>

        <div className="flex flex-col gap-7">
          <p className="font-light text-ivory/70 text-lg leading-relaxed">
            There are three things I remember about my pappou.
          </p>
          <p className="font-light text-ivory/70 text-lg leading-relaxed">
            He smoked. He played tavli every afternoon. And he made the board
            they played on himself.
          </p>
          <p className="font-light text-ivory/70 text-lg leading-relaxed">
            That board is with my dad now. One day my brothers and I will fight
            over who gets it. The edges are rounded from sixty years of hands,
            the wood is smooth where the checkers sat, and it still smells
            faintly of varnish and cigarettes. This board was the standard I
            grew up with, and for a long time I assumed every tavli board was
            made that way.
          </p>
          <p className="font-light text-ivory/70 text-lg leading-relaxed">
            When I went looking for one of my own, I found objects that looked
            like tavli boards from a distance, but were far from the real deal.
            Printed points. Veneered surfaces. Boards that wouldn't outlast the
            box they came in.
          </p>
          <p className="font-light text-ivory/70 text-lg leading-relaxed">
            So I started making my own. Real wood, real inlay, real hardware,
            with a few lavish additions that didn't exist in the 1960s. I make
            a small number each year. Each one is bespoke for a single person,
            and built to move the way my pappou's board has moved: from his
            hands to my dad's, to mine, and to whoever comes next.
          </p>
          <p className="font-display text-xl text-ivory/90 leading-relaxed italic">
            If you've been looking for the real thing, this is what I make.
          </p>
        </div>

        <div className="border-t border-white/5 pt-12">
          <p className="section-label mb-6">Exhibitions & Press</p>
          <p className="text-ivory/30 text-sm italic">To be added</p>
        </div>

        <div className="mt-16">
          <Link to="/collection" className="btn-primary">
            See the boards
          </Link>
        </div>
      </div>
    </main>
  )
}
