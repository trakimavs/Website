export interface Board {
  id: string
  name: string
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
    name: 'Heritage Board (Emerald)',
    tagline: 'Kiaat wood, emerald and ivory resin, the first board to carry the maker\'s mark',
    description:
      'The first board to carry the Mavrikis signature burned into the centre field. Resin points in deep emerald catch the light differently at every angle. Comes with hand-turned wood and resin playing pieces in matching green and silver, each one turned on the lathe to match the board\'s own proportions.',
    material: 'Kiaat wood, emerald and ivory, resin pieces, Mavrikis Designs',
    year: 2025,
    edition: 'Heritage Board',
    images: ['/Website/images/board-emerald-1.jpg', '/Website/images/board-emerald-2.jpg'],
    available: false,
  },
  {
    id: 'noir-argent',
    name: 'Noir & Argent',
    tagline: 'Dark walnut, black and silver resin, bespoke script monogram',
    description:
      'Built around a single letter, hand-drawn and then burned into the grain. The monogram mirrors itself across both halves, a detail that only resolves when the board is played. Black and silver resin points in alternating relief; hand-turned pieces in matching tones. A board made for someone who wanted their name to outlast them.',
    material: 'Dark walnut, black & silver resin, brass fittings',
    year: 2024,
    edition: 'Custom, each board unique',
    images: ['/Website/images/board-noir-1.jpg', '/Website/images/board-noir-2.jpg'],
    available: true,
  },
  {
    id: 'greek-cross',
    name: 'The Greek Cross',
    tagline: 'Light walnut, cobalt and pearl resin, Greek coat of arms',
    description:
      'The Greek coat of arms (laurel wreath, cross, full crest) is laser-engraved into the playing surface of both halves. Cobalt blue and pearl resin points in a paired rhythm. This board was made for someone who wanted to carry a piece of Greece wherever they played. It comes with a leather carry handle and matching piece bag.',
    material: 'Light walnut, cobalt & pearl resin, leather handle',
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
    name: 'The Cyprus',
    tagline: 'Warm walnut, emerald and ivory resin, island silhouette inlay',
    description:
      'The silhouette of Cyprus is worked into the centre field of both halves. Not as decoration, but as orientation. Every game played on this board is played on the island. Emerald and ivory resin points in the warm walnut frame; the proportions chosen to sit well on a table, not just be admired on a wall.',
    material: 'Walnut, emerald & ivory resin, brass fittings',
    year: 2025,
    edition: 'One of one',
    images: ['/Website/images/board-cyprus-1.jpg', '/Website/images/board-cyprus-2.jpg'],
    available: false,
  },
  {
    id: 'the-spartan',
    name: 'The Spartan',
    tagline: 'Olive wood, sage and pearl resin, Spartan helmet inlay',
    description:
      'A Spartan helmet rendered in the wood beneath a field of sage and pearl resin points. The initials are worked into the composition rather than added as an afterthought. The board was designed around them. One of the more requested commissions; always executed differently from the last.',
    material: 'Olive wood, sage & pearl resin, brass fittings',
    year: 2025,
    edition: 'Commission piece',
    images: ['/Website/images/board-spartan-1.jpg'],
    available: false,
  },
  {
    id: 'jade-ivory',
    name: 'Jade & Ivory',
    tagline: 'Figured walnut, jade and ivory resin, calligraphic initials',
    description:
      'Calligraphic initials worked into the open grain of figured walnut, each letter drawn by hand before being burned in. Jade and ivory resin points shift between opaque and translucent depending on the light and the hour. Includes hand-turned pieces in matching materials. Stands as a sculpture when closed; becomes a game when opened.',
    material: 'Figured walnut, jade & ivory resin, brass hardware',
    year: 2026,
    edition: 'Commission, 2 of 2',
    images: ['/Website/images/board-jade-1.jpg', '/Website/images/board-jade-2.jpg'],
    available: true,
  },
]
