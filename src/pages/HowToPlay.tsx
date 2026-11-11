import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import RulesDownload from '../components/RulesDownload'

// /how-to-play — the full guide to the three Tavli games.
// Linked from the footer, beside Questions and Instagram.

// The podcast section stays hidden until PODCAST_URL is set.
// The rules PDF lives in public/downloads (see components/RulesDownload.tsx).
const PODCAST_URL = ''
const PODCAST_EPISODES_URL = ''

// true: this page uses the brand colours inverted (ivory ground, dark text).
// false: the same dark look as the rest of the site.
const LIGHT_THEME = true

// ── Board diagrams ─────────────────────────────────────────────────────────
// Drawn from your side of the table: your 1-point bottom left, numbers
// running along the bottom to 12, then back along the top from 13 to 24.

const WOOD_FRAME = '#6E2E14'
const WOOD = '#B36639'
const GRAIN = '#5A230C'
const POINT_DARK = '#c9a84c' // gold
const POINT_LIGHT = '#f5f0e8' // ivory
const NUMBER = '#F1E2CC'
const LIGHT = { fill: '#f5f0e8', stroke: '#5B4636', ring: '#c8bfad' }
const DARK = { fill: '#111111', stroke: '#000000', ring: '#c9a84c' }

type Side = 'light' | 'dark'
type Stack = { point: number; count: number; side: Side }

const pointX = (p: number): number =>
  p <= 12 ? (p <= 6 ? 48 + (p - 1) * 48 : 376 + (p - 7) * 48) : pointX(25 - p)

function Checker({ cx, cy, side }: { cx: number; cy: number; side: Side }) {
  const c = side === 'light' ? LIGHT : DARK
  return (
    <>
      <circle cx={cx} cy={cy} r="19" fill={c.fill} stroke={c.stroke} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="12" fill="none" stroke={c.ring} strokeWidth="1.2" strokeOpacity={side === 'dark' ? 0.6 : 1} />
    </>
  )
}

function Arrows({ id, light, dark }: { id: string; light: string; dark: string }) {
  return (
    <>
      <defs>
        <marker id={`${id}-l`} orient="auto" markerWidth="5" markerHeight="5" refX="2" refY="2" overflow="visible">
          <path d="M0 0 L4 2 L0 4 Z" fill={LIGHT.fill} />
        </marker>
        <marker id={`${id}-d`} orient="auto" markerWidth="5" markerHeight="5" refX="2" refY="2" overflow="visible">
          <path d="M0 0 L4 2 L0 4 Z" fill={DARK.fill} />
        </marker>
      </defs>
      <path d={light} fill="none" stroke={LIGHT.fill} strokeWidth="2.5" strokeDasharray="7 6" strokeLinecap="round" strokeLinejoin="round" markerEnd={`url(#${id}-l)`} />
      <path d={dark} fill="none" stroke={DARK.fill} strokeWidth="2.5" strokeDasharray="7 6" strokeLinecap="round" strokeLinejoin="round" markerEnd={`url(#${id}-d)`} />
    </>
  )
}

function Board({ label, stacks = [], children }: { label: string; stacks?: Stack[]; children?: ReactNode }) {
  const grain = [60, 120, 175, 232, 290, 350, 405]
  return (
    <svg viewBox="0 0 664 460" role="img" aria-label={label} className="block w-full h-auto">
      <rect x="0" y="0" width="664" height="460" rx="14" fill={WOOD_FRAME} />
      <rect x="24" y="24" width="288" height="412" fill={WOOD} />
      <rect x="352" y="24" width="288" height="412" fill={WOOD} />
      {grain.map((y) =>
        [24, 352].map((x0) => (
          <path
            key={`${x0}-${y}`}
            d={`M ${x0} ${y} C ${x0 + 80} ${y - 10}, ${x0 + 190} ${y + 12}, ${x0 + 288} ${y - 4}`}
            fill="none"
            stroke={GRAIN}
            strokeOpacity="0.12"
            strokeWidth="2"
          />
        )),
      )}
      {Array.from({ length: 24 }, (_, i) => i + 1).map((p) => {
        const x = pointX(p)
        const bottom = p <= 12
        const base = bottom ? 436 : 24
        const tip = bottom ? 266 : 194
        return (
          <g key={p}>
            <polygon
              points={`${x - 24},${base} ${x + 24},${base} ${x},${tip}`}
              fill={p % 2 ? POINT_DARK : POINT_LIGHT}
            />
            <text
              x={x}
              y={bottom ? 452 : 17}
              textAnchor="middle"
              fontFamily="Jost, sans-serif"
              fontSize="10"
              fontWeight="600"
              fill={NUMBER}
            >
              {p}
            </text>
          </g>
        )
      })}
      {children}
      {stacks.map(({ point, count, side }) => {
        const x = pointX(point)
        const bottom = point <= 12
        const shown = Math.min(count, 5)
        const cy = (k: number) => (bottom ? 416 - k * 38 : 44 + k * 38)
        return (
          <g key={`${side}-${point}`}>
            {Array.from({ length: shown }, (_, k) => (
              <Checker key={k} cx={x} cy={cy(k)} side={side} />
            ))}
            {count > 5 && (
              <text
                x={x}
                y={cy(4) + 5}
                textAnchor="middle"
                fontFamily="Jost, sans-serif"
                fontSize="14"
                fontWeight="700"
                fill={side === 'light' ? '#3A2E25' : POINT_DARK}
              >
                {count}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

const portesStacks: Stack[] = [
  { point: 24, count: 2, side: 'light' },
  { point: 13, count: 5, side: 'light' },
  { point: 8, count: 3, side: 'light' },
  { point: 6, count: 5, side: 'light' },
  { point: 1, count: 2, side: 'dark' },
  { point: 12, count: 5, side: 'dark' },
  { point: 17, count: 3, side: 'dark' },
  { point: 19, count: 5, side: 'dark' },
]

const RACE_LIGHT = 'M 58 206 L 620 206 L 620 254 L 64 254'
const RACE_DARK_OPPOSITE = 'M 64 238 L 600 238 L 600 222 L 70 222'
const RACE_DARK_SAME = 'M 600 238 L 74 238 L 74 222 L 594 222'

// ── Small building blocks ──────────────────────────────────────────────────

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="section-label">{children}</p>
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex flex-col gap-3 max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-4xl md:text-5xl leading-tight text-ivory">{title}</h2>
    </div>
  )
}

function Section({ children, id, tone = 'base' }: { children: ReactNode; id?: string; tone?: 'base' | 'panel' | 'line' }) {
  const toneClass =
    tone === 'panel' ? 'bg-charcoal' : tone === 'line' ? 'border-t border-ivory/10' : ''
  return (
    <section id={id} className={`px-6 md:px-12 py-20 md:py-24 scroll-mt-20 ${toneClass}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  )
}

function LegendDot({ side }: { side: Side }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block w-3.5 h-3.5 rounded-full shrink-0 border ${
        side === 'light' ? 'bg-[#f5f0e8] border-[#5B4636]' : 'bg-[#111111] border-[#c9a84c]'
      }`}
    />
  )
}

function PendingButton({ href, label, primary }: { href: string; label: string; primary?: boolean }) {
  const cls = primary ? 'btn-primary' : 'btn-ghost'
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {label}
      </a>
    )
  }
  return (
    <span aria-disabled="true" title="Link coming soon" className={`${cls} opacity-40 pointer-events-none`}>
      {label}
    </span>
  )
}

// ── Content ────────────────────────────────────────────────────────────────

const stats = [
  ['2', 'players'],
  ['3', 'games'],
  ['15', 'checkers each'],
  ['5 or 7', 'points to win a match'],
]

const boardParts = [
  ['The points', 'The 24 long triangles. Count them from your side: your 1-point is the bottom-left corner, and the numbers run anticlockwise round to your 24-point, top left.'],
  ['Your home board', 'Points 1 to 6. All 15 of your checkers have to reach this quarter before you can start taking them off.'],
  ['Your outer board', 'Points 7 to 12. Your checkers cross this quarter on the way home.'],
  ['Your opponent’s side', 'Points 13 to 24. Your opponent counts from their own side, so their 1-point is your 24-point.'],
  ['The bar', 'The ridge down the middle. In Portes, a checker that gets hit waits here.'],
  ['Checkers and dice', 'Fifteen checkers (πούλια) each and two dice (ζάρια).'],
]

const basics = [
  ['Who starts', 'Each player rolls one die and the higher number goes first. Depending on your table, they either play those two numbers or roll again. In a match, the winner of each game usually starts the next.'],
  ['Moving', 'Each die is a separate move. Roll 5 and 3 and you can move one checker 5 and another 3, or move a single checker 8, as long as the point it stops on after the first die is open.'],
  ['Doubles', 'A double is played four times. Double fours (ντόρτια) means four moves of 4.'],
  ['Use the whole roll', 'If you can play both dice, you must. If only one fits, play the bigger number if you can. If neither fits, you pass.'],
  ['Bearing off', 'Once all 15 of your checkers are in your home board, you start taking them off. A 4 takes a checker off your 4-point. A bigger number can take off your furthest checker if there’s nothing further back.'],
  ['Scoring', 'First to bear off all 15 wins 1 point. It’s 2 points for a mars (μαρς), a win where the loser hasn’t taken off a single checker. There’s no doubling cube, and matches usually go to 5 or 7 points.'],
]

interface Game {
  id: string
  number: number
  name: string
  greek: string
  meaning: string
  summary: string
  board: ReactNode
  legend: [string, string]
  setup: string
  rules: ReactNode[]
  win: string
  extra?: ReactNode
  tips: string[]
  house: string
}

const games: Game[] = [
  {
    id: 'portes',
    number: 1,
    name: 'Portes',
    greek: 'Πόρτες',
    meaning: 'doors',
    summary: 'The closest of the three to international backgammon. You build doors, hit single checkers and race your checkers home.',
    board: (
      <Board label="Portes starting position" stacks={portesStacks}>
        <Arrows id="portes" light={RACE_LIGHT} dark={RACE_DARK_OPPOSITE} />
      </Board>
    ),
    legend: [
      'You (light): 24 → 1, clockwise into your home board, bottom left',
      'Your opponent (dark): 1 → 24, the opposite way',
    ],
    setup: 'From your side: 2 checkers on your 24-point, 5 on your 13, 3 on your 8 and 5 on your 6. Your opponent mirrors you exactly.',
    rules: [
      <>Two or more of your checkers on a point make a <b className="font-normal text-ivory">door</b> (πόρτα). Your opponent can’t land there.</>,
      <>A checker standing on its own is exposed. Land on it and you <b className="font-normal text-ivory">hit</b> it, sending it to the bar.</>,
      <>A checker on the bar must come back in before its owner moves anything else. It enters in the opponent’s home board, on the point matching the die, counted from the edge. If every point it could enter on is a door, the turn is lost.</>,
      <>Six doors in a row make a wall that no checker can get past.</>,
    ],
    win: 'Bear off all 15 first. If your opponent hasn’t borne off a single checker by then, it’s a mars and you score 2 points instead of 1.',
    tips: [
      'Make your 5-point early. It’s the most valuable door on the board.',
      'Don’t leave single checkers within six points of an opposing checker unless you have to.',
      'Hit when it costs you little. A checker sent to the bar has to start its journey again.',
    ],
    house: 'Some tables play a triple win, called a backgammon, when the loser hasn’t borne off and still has a checker on the bar or in the winner’s home board. Traditional tavli doesn’t, so agree on it before the first roll.',
  },
  {
    id: 'plakoto',
    number: 2,
    name: 'Plakoto',
    greek: 'Πλακωτό',
    meaning: 'from πλακώνω, to press down',
    summary: 'There is no hitting. You trap your opponent’s checkers by landing on them, and if you trap the last checker on their starting point, you win outright.',
    board: (
      <Board
        label="Plakoto starting position"
        stacks={[
          { point: 24, count: 15, side: 'light' },
          { point: 1, count: 15, side: 'dark' },
        ]}
      >
        <Arrows id="plakoto" light={RACE_LIGHT} dark={RACE_DARK_OPPOSITE} />
      </Board>
    ),
    legend: [
      'You: all 15 start on your 24-point and travel 24 → 1',
      'Your opponent: all 15 start on your 1-point and travel the other way',
    ],
    setup: 'All 15 of your checkers start on your 24-point. Your opponent’s 15 start directly across, on your 1-point. You race past each other in opposite directions.',
    rules: [
      <>Land on a single opposing checker and you <b className="font-normal text-ivory">pin</b> it. It can’t move until your checker leaves.</>,
      <>A pinned point belongs to the player on top. You can stack more of your own checkers there.</>,
      <>Two or more checkers of one colour on a point are safe. Nobody can land on them.</>,
      <>The <b className="font-normal text-ivory">mana</b> (μάνα, ‘mother’) is the last checker left on a player’s starting point. Pin it before it gets away and you win on the spot, for 2 points.</>,
    ],
    win: 'Bear off all 15 first, or pin your opponent’s mana for 2 points. A mars also scores 2: that’s when your opponent hasn’t borne off a single checker by the time you finish.',
    extra: (
      <div className="flex gap-5 items-center bg-obsidian border border-ivory/10 p-4 md:p-5">
        <svg viewBox="0 0 140 220" role="img" aria-label="A light checker pinning a dark checker on a point" className="block w-28 md:w-36 h-auto shrink-0">
          <rect x="0" y="0" width="140" height="220" rx="12" fill={WOOD} />
          <polygon points="22,208 118,208 70,24" fill={POINT_DARK} />
          <Checker cx={70} cy={184} side="dark" />
          <Checker cx={70} cy={150} side="light" />
        </svg>
        <p className=" text-ivory/70 text-sm md:text-base leading-relaxed">
          <span className="text-ivory">A pin.</span> The light checker has landed on a single dark
          one. The dark checker can’t move until the light checker moves on, and the point now
          belongs to light.
        </p>
      </div>
    ),
    tips: [
      'Guard your mana. Leaving it alone in the opening is the quickest way to lose a game of Plakoto.',
      'A pin only lasts while you stay on it. Once you move off, their checker is free again.',
      'Pins early in your opponent’s journey hurt most, because the trapped checker still has the whole board to cross.',
    ],
    house: 'If both mothers end up pinned, many tables call the game a draw.',
  },
  {
    id: 'fevga',
    number: 3,
    name: 'Fevga',
    greek: 'Φεύγα',
    meaning: 'run, get going',
    summary: 'Both players move the same way round the board, and a single checker is enough to hold a point. The game is won by blocking.',
    board: (
      <Board
        label="Fevga starting position"
        stacks={[
          { point: 24, count: 15, side: 'light' },
          { point: 12, count: 15, side: 'dark' },
        ]}
      >
        <Arrows id="fevga" light={RACE_LIGHT} dark={RACE_DARK_SAME} />
      </Board>
    ),
    legend: [
      'You: start top left, travel clockwise into your home board, bottom left',
      'Your opponent: starts bottom right, travels clockwise too, home is top right',
    ],
    setup: 'All 15 of your checkers start on your 24-point, in the far left-hand corner. Your opponent starts in the corner diagonally opposite. You both travel clockwise, so you follow each other round the board.',
    rules: [
      <>There is no hitting and no pinning. A <b className="font-normal text-ivory">single checker holds a point</b>: you can never land where your opponent has a checker.</>,
      <>Before you move a second checker off your starting point, your first one has to get past your opponent’s starting point.</>,
      <>You may not build six points in a row to wall your opponent in, unless at least one of their checkers is already past it.</>,
    ],
    win: 'Bear off all 15 first. If your opponent hasn’t borne off a single checker by then, that’s a mars (μαρς) and you score 2 points instead of 1.',
    tips: [
      'Spread out. Every point you hold is one your opponent can’t use.',
      'Claim points just ahead of your opponent’s starting corner. That’s where their checkers need room most.',
      'Watch your own stack. A good opponent will build points in front of it and leave you with nowhere to go.',
    ],
    house: 'Some tables also forbid holding all six points of your opponent’s starting quarter. Fevga has more family variations than the other two games, so settle the blocking rules before you roll.',
  },
]

const words = [
  ['τάβλι', 'tavli', 'The board, and the three-game match played on it'],
  ['πούλια', 'poulia', 'The checkers'],
  ['ζάρια', 'zaria', 'The dice'],
  ['πόρτα', 'porta', 'A point you hold with two or more checkers (a door)'],
  ['μάνα', 'mana', '‘Mother’: the last checker on your starting point in Plakoto'],
  ['μαρς', 'mars', 'Winning before your opponent has borne off a single checker. Worth 2 points.'],
  ['εξάρες', 'exares', 'Double six'],
  ['πεντάρες', 'pentares', 'Double five'],
  ['ντόρτια', 'dortia', 'Double four'],
]

const manners = [
  ['Play quickly', 'Tavli is played fast. Take too long over a move and the people watching will tell you.'],
  ['Call your roll', 'Say the numbers out loud as they land. Doubles have their own names: εξάρες, πεντάρες, ντόρτια.'],
  ['Roll properly', 'Both dice land flat on the board, on your right-hand side. A tilted die or one that jumps the board means both are rolled again.'],
  ['Snap the checkers', 'Put each checker down with a snap. The sound on solid wood is part of the game, and our boards are made for it.'],
  ['Talk', 'Teasing your opponent is fine. Touching their checkers isn’t.'],
]

const questions = [
  ['Is tavli the same as backgammon?', 'Almost. Portes is very close to international backgammon without the doubling cube. Tavli is the Greek name for the board and for the full match of Portes, Plakoto and Fevga.'],
  ['Which game should a beginner learn first?', 'Portes. Moving, building points and bearing off all carry over to the other two.'],
  ['How long does a game take?', 'Once you’re comfortable, most games take 10 to 20 minutes. A match to 5 points makes a good evening.'],
  ['Do house rules really vary?', 'Yes, by family, island and kafeneio. Agree on the opening roll, the mana and the Fevga blocking rules before the first throw.'],
  ['Can I play all three games on any board?', 'Yes. The board and the 30 checkers are the same for all three.'],
]

const tiers = [
  ['Classic', 'R 8 700', 'Kiaat, Mavrikis logo, half-wood half-resin checkers'],
  ['Heritage', 'R 11 600', 'Your own colours and crest, matching half-wood half-resin checkers, a spare per colour, storage rail'],
  ['Signature', 'On request', 'Commissioned one-of-one pieces: wedding boards, full resin tables, river boards'],
]

// ── Page ───────────────────────────────────────────────────────────────────

export default function HowToPlay() {
  return (
    // The nav sits over this dark strip; the guide itself is in the light theme.
    <main className="pt-20 bg-obsidian">
      <div className={LIGHT_THEME ? 'theme-light bg-obsidian text-ivory' : ''}>
      {/* Hero */}
      <Section>
        <div className="flex flex-wrap gap-14 items-center">
          <div className="flex-[1_1_440px] min-w-0 flex flex-col gap-6">
            <Eyebrow>The game · Το παιχνίδι</Eyebrow>
            <h1 className="font-display text-5xl md:text-7xl leading-none text-ivory">
              How to play tavli
            </h1>
            <p className="font-display text-2xl text-ivory-muted">Πόρτες · Πλακωτό · Φεύγα</p>
            <p className=" text-lg leading-relaxed text-ivory/80 max-w-xl">
              Tavli is the Greek name for backgammon, and it’s played as three games rather than
              one. A match moves from Portes to Plakoto to Fevga and then starts again, all on the
              same board with the same checkers. This page covers the setup, the rules and the
              table talk for each game.
            </p>
            <dl className="flex flex-wrap gap-x-9 gap-y-5 py-5 border-y border-ivory/10">
              {stats.map(([n, label]) => (
                <div key={label} className="flex flex-col-reverse gap-1 min-w-[110px]">
                  <dt className="text-xs tracking-wide text-ivory/70">{label}</dt>
                  <dd className="font-display text-3xl leading-none text-gold">{n}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-3">
              <a href="#portes" className="btn-primary">Learn Portes</a>
              <a href="#plakoto" className="btn-ghost">Plakoto</a>
              <a href="#fevga" className="btn-ghost">Fevga</a>
            </div>
          </div>
          <figure className="flex-[1_1_460px] min-w-0 flex flex-col gap-3">
            <Board label="A tavli board set up for Portes" stacks={portesStacks} />
            <figcaption className="text-sm text-ivory/70">
              A board set for Portes, the first game of every match.
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* Where it comes from */}
      <Section tone="panel">
        <div className="flex flex-wrap gap-x-16 gap-y-8">
          <div className="flex-[1_1_360px] min-w-0">
            <SectionHeading eyebrow="Where it comes from" title="Older than the kafeneio" />
          </div>
          <div className="flex-[1_1_480px] min-w-0 flex flex-col gap-5 text-lg leading-relaxed text-ivory/80">
            <p>
              The word τάβλι comes from the Byzantine <i>tavla</i>, and before that the Latin{' '}
              <i>tabula</i>. Romans and Byzantines played race games on boards like this more than a
              thousand years ago, and the game has been part of Greek life ever since. You’ll find a
              board in every kafeneio and on most family tables after Sunday lunch, and it’s usually
              a grandparent who teaches you to play.
            </p>
            <p>Mavrikis Designs started with one of those boards: the one my pappou made by hand.</p>
            <Link
              to="/about"
              className="self-start text-xs tracking-widest uppercase text-gold hover:text-gold-light border-b border-gold/40 pb-1 transition-colors"
            >
              Read our story
            </Link>
          </div>
        </div>
      </Section>

      {/* Know your board */}
      <Section>
        <div className="flex flex-col gap-11">
          <SectionHeading eyebrow="Before you roll" title="Know your board" />
          <div className="flex flex-wrap gap-12 items-start">
            <figure className="flex-[3_1_520px] min-w-0 flex flex-col gap-3">
              <Board label="Tavli board with the 24 points numbered and the four quarters labelled">
                {[
                  [168, 214, 'OPPONENT’S HOME BOARD'],
                  [496, 214, 'OPPONENT’S OUTER BOARD'],
                  [168, 254, 'YOUR HOME BOARD'],
                  [496, 254, 'YOUR OUTER BOARD'],
                ].map(([x, y, t]) => (
                  <text key={t} x={x} y={y} textAnchor="middle" fontFamily="Jost, sans-serif" fontSize="11" fontWeight="700" letterSpacing="1.4" fill="#FFF8EC">
                    {t}
                  </text>
                ))}
                <text x="332" y="230" textAnchor="middle" transform="rotate(-90 332 230)" fontFamily="Jost, sans-serif" fontSize="11" fontWeight="700" letterSpacing="3" fill={NUMBER}>
                  THE BAR
                </text>
              </Board>
              <figcaption className="text-sm text-ivory/70">
                Seen from your side of the table. Some players keep their home board on the right.
                This page always shows it bottom left.
              </figcaption>
            </figure>
            <dl className="flex-[2_1_340px] min-w-0 flex flex-col">
              {boardParts.map(([title, text]) => (
                <div key={title} className="flex flex-col gap-1 py-4 border-b border-ivory/10">
                  <dt className="font-display text-lg text-ivory">{title}</dt>
                  <dd className=" text-sm leading-relaxed text-ivory/75">{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Shared rules */}
      <Section tone="panel">
        <div className="flex flex-col gap-11">
          <SectionHeading eyebrow="The basics" title="Rules all three games share" />
          <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))]">
            {basics.map(([title, text], i) => (
              <div key={title} className="bg-obsidian border border-ivory/10 p-7 flex flex-col gap-3">
                <p className="font-display text-3xl leading-none text-gold">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display text-xl text-ivory">{title}</h3>
                <p className=" text-sm leading-relaxed text-ivory/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* The three games */}
      {games.map((g) => (
        <Section key={g.id} id={g.id} tone="line">
          <div className="flex flex-col gap-10">
            <div className="flex flex-wrap gap-x-10 gap-y-4 items-end justify-between">
              <div className="flex flex-col gap-2">
                <Eyebrow>Game {g.number} of 3</Eyebrow>
                <h2 className="font-display text-5xl md:text-6xl leading-none text-ivory">{g.name}</h2>
                <p className="font-display text-xl md:text-2xl text-ivory-muted">
                  {g.greek} · <i>{g.meaning}</i>
                </p>
              </div>
              <p className="max-w-md text-lg leading-relaxed text-ivory/80">{g.summary}</p>
            </div>

            <div className="flex flex-wrap gap-12 items-start">
              <div className="flex-[1_1_460px] min-w-0 flex flex-col">
                {g.board}
                <ul className="mt-4 flex flex-col gap-2 text-sm leading-relaxed text-ivory/75">
                  {g.legend.map((line, i) => (
                    <li key={line} className="flex gap-3 items-center">
                      <LegendDot side={i === 0 ? 'light' : 'dark'} />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-[1_1_420px] min-w-0 flex flex-col gap-7">
                <div className="flex flex-col gap-3">
                  <h3 className="section-label">Setting up</h3>
                  <p className=" leading-relaxed text-ivory/80">{g.setup}</p>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="section-label">How it plays</h3>
                  <ol className="flex flex-col gap-4 leading-relaxed text-ivory/80">
                    {g.rules.map((rule, i) => (
                      <li key={i} className="flex gap-4 items-baseline">
                        <span className="font-display text-2xl text-gold min-w-[22px]">{i + 1}</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="section-label">How you win</h3>
                  <p className=" leading-relaxed text-ivory/80">{g.win}</p>
                </div>
                {g.extra}
              </div>
            </div>

            <div className="flex flex-wrap gap-5">
              <div className="flex-[2_1_420px] min-w-0 bg-charcoal border border-ivory/10 p-6 flex flex-col gap-3">
                <p className="text-xs tracking-widest uppercase text-gold-light">Beginner tips</p>
                <ul className="list-disc pl-5 marker:text-gold flex flex-col gap-2 text-sm leading-relaxed text-ivory/80">
                  {g.tips.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="flex-[1_1_280px] min-w-0 bg-gold/[0.07] border border-gold/30 p-6 flex flex-col gap-2">
                <p className="text-xs tracking-widest uppercase text-gold">House rules</p>
                <p className=" text-sm leading-relaxed text-ivory/80">{g.house}</p>
              </div>
            </div>
          </div>
        </Section>
      ))}

      {/* Words */}
      <Section tone="panel">
        <div className="flex flex-col gap-11">
          <SectionHeading eyebrow="At the table" title="Speak like you’ve played for years" />
          <dl className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))]">
            {words.map(([greek, latin, meaning]) => (
              <div key={latin} className="bg-obsidian border border-ivory/10 p-6 flex flex-col gap-1">
                <dt className="flex flex-col gap-1">
                  <span lang="el" className="font-display text-3xl leading-tight text-ivory">{greek}</span>
                  <span className="text-xs tracking-widest uppercase text-gold">{latin}</span>
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-ivory/75">{meaning}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Manners */}
      <Section>
        <div className="flex flex-col gap-12">
          <SectionHeading eyebrow="Table manners" title="How it’s played at a Greek table" />
          <div className="grid gap-x-10 gap-y-9 grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))]">
            {manners.map(([title, text]) => (
              <div key={title} className="flex flex-col gap-2 pt-5 border-t border-gold/30">
                <h3 className="font-display text-2xl text-ivory">{title}</h3>
                <p className=" text-sm leading-relaxed text-ivory/75">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Podcast: hidden until PODCAST_URL (top of file) is filled in */}
      {PODCAST_URL && (
      <Section tone="panel">
        <div className="flex flex-wrap gap-12 items-center">
          <div className="flex-[1_1_420px] min-w-0 flex flex-col gap-6">
            <SectionHeading eyebrow="Learn by watching" title="Each interview is a game" />
            <p className=" text-lg leading-relaxed text-ivory/80">
              On our podcast about the history of Greeks in South Africa, each interview lasts one
              game of tavli. A guest’s first interview is played as Portes, the second as Plakoto
              and the third as Fevga, so you can watch all three games being played.
            </p>
            <div className="flex flex-wrap gap-3">
              <PendingButton href={PODCAST_URL} label="Watch on YouTube" primary />
              <PendingButton href={PODCAST_EPISODES_URL} label="All episodes" />
            </div>
          </div>
          <div className="flex-[1_1_480px] min-w-0 aspect-video bg-obsidian border border-ivory/10 flex flex-col gap-3 items-center justify-center text-center p-6">
            <svg viewBox="0 0 64 64" aria-hidden="true" className="w-16 h-16">
              <circle cx="32" cy="32" r="30" fill="none" stroke="#c9a84c" strokeWidth="1.5" />
              <polygon points="26,20 46,32 26,44" fill="#c9a84c" />
            </svg>
            <span className="text-sm text-ivory/60">Latest episode, coming soon</span>
          </div>
        </div>
      </Section>
      )}

      {/* Questions */}
      <Section tone="line">
        <div className="flex flex-wrap gap-x-16 gap-y-8">
          <div className="flex-[1_1_320px] min-w-0 flex flex-col gap-6">
            <SectionHeading eyebrow="Questions" title="Before you start" />
            <div className="bg-charcoal border border-ivory/10 p-6 flex flex-col gap-3">
              <h3 className="font-display text-2xl text-ivory">Keep the rules at the table</h3>
              <p className=" text-sm leading-relaxed text-ivory/75">
                A printable guide with the setup, rules and table talk for all three games.
              </p>
              <div className="mt-1 flex flex-col">
                <RulesDownload />
              </div>
            </div>
          </div>
          <div className="flex-[2_1_520px] min-w-0 border-t border-ivory/10">
            {questions.map(([q, a]) => (
              <details key={q} className="group border-b border-ivory/10">
                <summary className="flex items-start justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-lg text-ivory/90 group-hover:text-ivory transition-colors">{q}</span>
                  <span aria-hidden="true" className="mt-1 text-gold text-xl leading-none transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pb-6 pr-10 leading-relaxed text-ivory/75 max-w-3xl">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* Boards */}
      <Section tone="panel">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-ivory">
              Learn on a board built to be handed down.
            </h2>
            <p className=" text-lg leading-relaxed text-ivory/75">
              Solid kiaat with resin-inlaid points, brass hinges and a leather handle, all made by
              hand.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {tiers.map(([name, price, text]) => (
              <div key={name} className="flex-[1_1_220px] min-w-0 border border-ivory/10 p-6 flex flex-col gap-2">
                <p className="font-display text-2xl text-ivory">{name}</p>
                <p className="text-sm tracking-wide text-gold">{price}</p>
                <p className=" text-sm leading-relaxed text-ivory/75">{text}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/collection" className="btn-primary">Explore the boards</Link>
            <Link to="/waitlist" className="btn-ghost">Ask about a custom board</Link>
          </div>
        </div>
      </Section>
      </div>
    </main>
  )
}
