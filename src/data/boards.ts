// Heritage and Classic boards are made in runs, so they sell out.
// Signature Heritage boards are one-offs, so each one is simply sold.
export type BoardStyle =
  | 'Heritage Board'
  | 'Classic Board'
  | 'Signature Heritage Board'
  | 'Signature Heritage XL Board'

export function soldLabel(board: Board): string {
  return board.style.startsWith('Signature') ? 'Sold' : 'Sold out'
}

export interface Board {
  id: string
  name: string
  style: BoardStyle
  tagline: string
  description: string
  material: string
  year: number
  edition: string
  images: string[]
  available: boolean
}

export const boards: Board[] = [
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
    images: ['/Website/images/board-emerald-1.jpg', '/Website/images/board-emerald-2.jpg'],
    available: false,
  },
  {
    id: 'noir-argent',
    name: 'Signature Heritage | SP',
    style: 'Signature Heritage Board',
    tagline: 'Kiaat wood, ebony and ivory resin, custom SP engraving',
    description:
      'Built around a single letter, hand-drawn and then burned into the grain. The monogram mirrors itself across both halves, a detail that only resolves when the board is played. Black and silver resin points in alternating relief; hand-turned pieces in matching tones. A board made for someone who wanted their name to outlast them.',
    material: 'Kiaat wood, Ebony and Ivory, matching resin pieces, custom SP engraving',
    year: 2024,
    edition: 'Custom, each board unique',
    images: ['/Website/images/board-noir-1.jpg', '/Website/images/board-noir-2.jpg'],
    available: false,
  },
  {
    id: 'greek-cross',
    name: 'Signature Heritage | Hellas',
    style: 'Signature Heritage Board',
    tagline: 'Kiaat wood, cobalt and pearl resin, custom Hellas and wreath engraving',
    description:
      'Cobalt the colour of the Aegean just past the harbour wall, set against pearl as white as the chapels on the hills above it, all laid into warm Kiaat. The Greek crest and its laurel wreath are engraved into both halves, so wherever this board is opened, it opens onto Greece.',
    material: 'Kiaat wood, Cobalt and pearl, matching resin pieces, custom Hellas and Wreath engraving',
    year: 2025,
    edition: 'One of one',
    images: [
      '/Website/images/board-greek-cross-1.jpg',
      '/Website/images/board-greek-cross-2.jpg',
      '/Website/images/board-greek-cross-3.jpg',
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
    edition: 'One of one',
    images: ['/Website/images/board-cyprus-1.jpg', '/Website/images/board-cyprus-2.jpg'],
    available: false,
  },
  {
    id: 'ic-xc-nika',
    name: 'IC XC NIKA',
    style: 'Signature Heritage Board',
    tagline: 'Figured Kiaat, turquoise and charcoal resin, IC XC NIKA cross engraving',
    description:
      'Turquoise the colour of the domes on a whitewashed island church, set against charcoal as deep as the smoke from its candles, all laid into wood whose grain ripples out from the centre like rings on still water. At the heart of both halves sits the cross and its ancient promise, IC XC NIKA: Jesus Christ conquers.',
    material: 'Kiaat wood, turquoise & charcoal resin, leather handle, IC XC NIKA engraving',
    year: 2025,
    edition: 'Signature Heritage',
    images: [
      '/Website/images/board-aegean-1.jpg',
      '/Website/images/board-ic-xc-nika-2.jpg',
      '/Website/images/board-ic-xc-nika-3.jpg',
    ],
    available: false,
  },
  {
    id: 'jade-ivory',
    name: 'Jade & Ivory',
    style: 'Signature Heritage Board',
    tagline: 'Figured walnut, jade and ivory resin, calligraphic initials',
    description:
      'Calligraphic initials worked into the open grain of figured walnut, each letter drawn by hand before being burned in. Jade and ivory resin points shift between opaque and translucent depending on the light and the hour. Includes hand-turned pieces in matching materials. Stands as a sculpture when closed; becomes a game when opened.',
    material: 'Figured walnut, jade & ivory resin, brass hardware',
    year: 2026,
    edition: 'Commission, 2 of 2',
    images: ['/Website/images/board-jade-1.jpg', '/Website/images/board-jade-2.jpg'],
    available: false,
  },
]
