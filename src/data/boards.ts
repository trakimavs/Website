// Heritage and Classic boards are made in runs, so they sell out.
// Signature Heritage and Commissioned boards are one-offs, so each one is simply sold.
export type BoardStyle =
  | 'Heritage Board'
  | 'Classic Board'
  | 'Signature Heritage Board'
  | 'Signature Heritage XL Board'
  | 'Commissioned'

export function soldLabel(board: Board): string {
  return board.style.startsWith('Signature') || board.style === 'Commissioned' ? 'Sold' : 'Sold out'
}

export interface Board {
  id: string
  name: string
  style: BoardStyle
  tagline: string
  description: string
  material: string
  // A single year, or a span for an ongoing series, e.g. '2018-Present'
  year: number | string
  edition: string
  images: string[]
  // One description per photo, in the same order as images. Used as alt text,
  // which is what Google Images reads, so name the board and say what the photo shows.
  imageAlts: string[]
  available: boolean
}

export const boards: Board[] = [
  {
    id: 'classic',
    name: 'Classic',
    style: 'Classic Board',
    tagline: 'Black and white or blue and white points, wooden pieces, the Mavrikis logo, made in small runs',
    description:
      'Black and white, the two colours tavli has been played in since the first kafeneio, or blue and white for the Aegean, set into warm wood with the Mavrikis logo at the centre of both halves. Turned wooden pieces, no monogram and no commission, just the board as it was always meant to be, made in small runs for the game itself.',
    material: 'Black and white or blue and white points, wooden pieces, Mavrikis logo engraving',
    year: 2026,
    edition: 'Classic',
    images: [
      '/images/board-classic-1.jpg',
      '/images/board-classic-2.jpg',
      '/images/board-classic-3.jpg',
    ],
    imageAlts: [
      'Classic backgammon board open mid-game, black and white points and wooden pieces around the engraved Mavrikis logo',
      'Turned wooden and resin backgammon pieces with dice, piled in a Classic board',
      'Classic backgammon board standing open in a garden, black and white points set into warm wood',
    ],
    available: false,
  },
  {
    id: 'emerald',
    name: 'Old Money',
    style: 'Heritage Board',
    tagline: 'Kiaat wood, emerald and pearl resin, the first board to carry the maker\'s mark',
    description:
      'Emerald the colour of the green baize in an old gentlemen\'s club, set against pearl with the soft shine of a grandmother\'s necklace, all laid into warm Kiaat. It was the first board to carry the Mavrikis mark, and it was made to be handed down, not bought new.',
    material: 'Kiaat wood, emerald and pearl, resin pieces, Mavrikis Designs',
    year: 2025,
    edition: 'Heritage Board',
    images: [
      '/images/board-emerald-1.jpg',
      '/images/board-emerald-3.jpg',
      '/images/board-emerald-4.jpg',
      '/images/board-emerald-2.jpg',
    ],
    imageAlts: [
      'Old Money backgammon board standing open beside its emerald and pearl resin pieces and a black Mavrikis drawstring bag',
      'Stacks of emerald and pearl resin pieces on the Old Money backgammon board, above the Kiaat grain and Mavrikis mark',
      "Mavrikis Designs maker's mark engraved into the Kiaat of the Old Money backgammon board, between emerald and pearl points",
      "Emerald and pearl pieces on the Old Money backgammon board, with the engraved maker's mark and a knot in the Kiaat",
    ],
    available: false,
  },
  {
    id: 'greek-cross',
    name: 'Hellas',
    style: 'Signature Heritage Board',
    tagline: 'Kiaat wood, cobalt and pearl resin, custom Hellas and wreath engraving',
    description:
      'Cobalt the blue of an island sky and of the church domes that rise into it, set against pearl as white as the chapel walls beneath them, all laid into warm Kiaat. The Greek crest and its laurel wreath are engraved into both halves, so wherever this board is opened, it opens onto Greece.',
    material: 'Kiaat wood, Cobalt and pearl, matching resin pieces, custom Hellas and Wreath engraving',
    year: 2025,
    edition: 'Signature Heritage',
    images: [
      '/images/board-greek-cross-1.jpg',
      '/images/board-greek-cross-2.jpg',
      '/images/board-greek-cross-3.jpg',
    ],
    imageAlts: [
      'Hellas backgammon board open with cobalt and pearl points, pieces set for a game and the Greek crest and laurel wreath engraved on both halves',
      'Cobalt and pearl resin pieces gathered on each half of the Hellas backgammon board, with the Greek crest engraved in Kiaat',
      'Hellas backgammon board standing open above a pile of cobalt and pearl resin pieces',
    ],
    available: false,
  },
  {
    id: 'the-cyprus',
    name: 'Chakkos',
    style: 'Signature Heritage Board',
    tagline: 'Warm Kiaat, gold and pearl resin, island silhouette engraving',
    description:
      'Gold the colour of late sun over the Mesaoria plain, set against pearl as pale as the limestone of the old village houses, with the island itself burned into the heart of both halves. Every game played on this board is played on Cyprus, and it was made to bring a little of the island home.',
    material: 'Kiaat wood, gold & pearl resin, brass fittings',
    year: 2025,
    edition: 'Signature Heritage',
    images: ['/images/board-cyprus-1.jpg', '/images/board-cyprus-2.jpg'],
    imageAlts: [
      'Chakkos backgammon board open on an outdoor table, gold and pearl points with the island of Cyprus engraved in Kiaat',
      'Chakkos backgammon board set for a game with gold and pearl resin pieces and the Cyprus silhouette engraving',
    ],
    available: false,
  },
  {
    id: 'ic-xc-nika',
    name: 'IC XC NIKA',
    style: 'Signature Heritage Board',
    tagline: 'Figured Kiaat, deep Aegean blue and charcoal resin, IC XC NIKA cross engraving',
    description:
      'The deep blue of the waters around Mount Athos, where monks have kept watch over the sea for a thousand years, set against charcoal as dark as the stone pillars of Meteora, all laid into wood whose grain ripples out from the centre like rings on still water. At the heart of both halves sits the cross and its ancient promise, IC XC NIKA: Jesus Christ conquers.',
    material: 'Kiaat wood, Aegean blue & charcoal resin, leather handle, IC XC NIKA engraving',
    year: 2025,
    edition: 'Signature Heritage',
    images: [
      '/images/board-aegean-1.jpg',
      '/images/board-ic-xc-nika-2.jpg',
      '/images/board-ic-xc-nika-3.jpg',
    ],
    imageAlts: [
      'IC XC NIKA backgammon board open, Aegean blue and charcoal points around the cross engraved in figured Kiaat',
      'Close-up of the IC XC NIKA cross engraving with dice and blue resin pieces',
      'IC XC NIKA backgammon board closed, showing the figured Kiaat grain on the outside',
    ],
    available: false,
  },
  {
    id: 'wedding-commissions',
    name: 'Wedding Commissions',
    style: 'Signature Heritage Board',
    tagline: 'Made for one couple and one day: their names, initials or wedding date, in colours they choose',
    description:
      'Every wedding board is made for one couple and the day they were married. Their names, their initials or the date itself are engraved into the wood, set among points in the colours they choose. Some carry one name on each half, so the two meet face to face when the board is closed. Others repeat the initials on both sides, turned so each player reads them the right way up. Some even keep the bouquet: its flowers set into the resin of the pieces, so the day is held in every move. Long after the guests have gone home, it is opened for the first game of many.',
    material: 'Wood, resin colours and engraving chosen by the couple',
    year: '2018-Present',
    edition: 'Signature Heritage',
    images: [
      '/images/board-wedding-5.jpg',
      '/images/board-wedding-1.jpg',
      '/images/board-wedding-2.jpg',
      '/images/board-wedding-3.jpg',
      '/images/board-wedding-4.jpg',
    ],
    imageAlts: [
      'Wedding backgammon board in warm light, with amber resin pieces holding flowers from the bridal bouquet',
      "Wedding backgammon board engraved with the couple's names and wedding date in script, charcoal and pearl points and pieces",
      "Wedding backgammon board with the couple's initials engraved in a Greek key circle on both halves, copper and blue points and pieces",
      "Wedding backgammon board with the couple's initials engraved in script on each half, green and pearl points and pieces",
      'Wedding backgammon board standing open with one initial engraved on each half and green and pearl pieces at its foot',
    ],
    available: false,
  },
  {
    id: 'commissioned-works',
    name: 'Commissioned Works',
    style: 'Commissioned',
    tagline: 'One of one, made to a single request, from wood chosen for its grain and resin in a colour chosen by its owner',
    description:
      'Some boards begin with a request rather than a design. A piece of figured wood chosen for its grain, resin poured into the cracks and burrs the tree left behind, in a colour picked by the person it is for. The wood decides the shape, so no two can ever be repeated. Each is made once, for one person, and never again.',
    material: 'Wood and resin colour on request, turned wood pieces',
    year: 2026,
    edition: 'One of one',
    images: [
      '/images/board-commissioned-1.jpg',
      '/images/board-commissioned-2.jpg',
      '/images/board-commissioned-3.jpg',
    ],
    imageAlts: [
      'Commissioned backgammon board standing open, figured wood with deep teal resin filling its natural cracks',
      'Outside of a commissioned backgammon board, figured wood and teal resin running across both halves',
      'Commissioned backgammon board with white resin running through burl wood, set with dark and pearl pieces',
    ],
    available: false,
  },
]
