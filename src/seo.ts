// Search and sharing details for every page: title, description, share image
// and structured data (JSON-LD) that tells Google and AI tools what each page is.
// Used by the build to write each page's <head>, and by PageMeta in the browser.
import { boards, type Board } from './data/boards'
import { answeredFaq } from './data/faq'

export const SITE_URL = 'https://mavrikisdesigns.co.za'
const BRAND = 'Mavrikis Designs'
const INSTAGRAM = 'https://www.instagram.com/mavrikisdesigns/'
const DEFAULT_IMAGE = '/og-image.jpg'

export interface PageMetaData {
  title: string
  description: string
  path: string
  image: string
  imageAlt: string
  jsonLd: object[]
  found: boolean
}

const absolute = (path: string) => `${SITE_URL}${path}`

export const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: BRAND,
  url: `${SITE_URL}/`,
  description:
    'Maker of handmade backgammon boards in the Greek Tavli tradition, in Gauteng, South Africa. Solid Kiaat wood, hand-poured resin points and custom engravings, one board at a time.',
  email: 'mavrikisdesigns@gmail.com',
  address: { '@type': 'PostalAddress', addressRegion: 'Gauteng', addressCountry: 'ZA' },
  areaServed: 'ZA',
  sameAs: [INSTAGRAM],
  knowsAbout: [
    'Backgammon',
    'Backgammon boards',
    'Tavli',
    'Custom backgammon boards',
    'Woodworking',
    'Resin inlay',
    'Laser engraving',
  ],
}

function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  }
}

// Google shows about 60 characters of a title. Series pages with long names
// (Wedding Commissions) fall back to a shorter form so the brand isn't cut off.
function boardTitle(board: Board): string {
  const full = `${board.name} | Handmade Backgammon Board | ${BRAND}`
  return full.length <= 60 ? full : `${board.name} | Backgammon Boards | ${BRAND}`
}

function boardMeta(board: Board): PageMetaData {
  const path = `/collection/${board.id}`
  return {
    title: boardTitle(board),
    description: `${board.name}, a handmade backgammon (Tavli) board from South Africa. ${board.tagline}.`,
    path,
    image: board.images[0],
    imageAlt: board.imageAlts[0],
    found: true,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        '@id': `${absolute(path)}#board`,
        name: board.name,
        alternateName: [`${board.name} backgammon board`, `${board.name} Tavli board`],
        description: board.description,
        abstract: board.tagline,
        genre: 'Handmade backgammon (Tavli) board',
        keywords: 'backgammon board, handmade backgammon board, custom backgammon board, Tavli, South Africa',
        material: board.material,
        // First year only: a span like '2018-Present' is not a valid date
        dateCreated: String(board.year).slice(0, 4),
        url: absolute(path),
        image: board.images.map((src, i) => ({
          '@type': 'ImageObject',
          contentUrl: absolute(src),
          caption: board.imageAlts[i],
        })),
        creator: { '@id': `${SITE_URL}/#organization` },
        isPartOf: { '@type': 'CollectionPage', url: absolute('/collection') },
      },
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Collection', path: '/collection' },
        { name: board.name, path },
      ]),
    ],
  }
}

export function pageMeta(pathname: string): PageMetaData {
  const path = pathname.replace(/\/+$/, '') || '/'

  if (path === '/') {
    return {
      title: `Handmade Backgammon Boards, South Africa | ${BRAND}`,
      description:
        'Handmade backgammon (Tavli) boards, made one at a time in South Africa. Solid Kiaat wood, hand-poured resin points and custom engravings, built to be handed down.',
      path,
      image: DEFAULT_IMAGE,
      imageAlt: `An open Tavli board by ${BRAND}`,
      found: true,
      jsonLd: [
        organization,
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          name: BRAND,
          url: `${SITE_URL}/`,
          inLanguage: 'en-ZA',
          publisher: { '@id': `${SITE_URL}/#organization` },
        },
      ],
    }
  }

  if (path === '/collection') {
    return {
      title: `Handmade Backgammon Boards | Collection | ${BRAND}`,
      description:
        'Every handmade backgammon (Tavli) board in the Mavrikis collection: solid Kiaat, hand-poured resin points and custom engravings, made by hand in South Africa.',
      path,
      image: DEFAULT_IMAGE,
      imageAlt: `Handmade backgammon boards by ${BRAND}`,
      found: true,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'The Collection',
          url: absolute(path),
          about: 'Handmade backgammon (Tavli) boards',
          publisher: { '@id': `${SITE_URL}/#organization` },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: boards.map((b, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: b.name,
              url: absolute(`/collection/${b.id}`),
            })),
          },
        },
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'Collection', path },
        ]),
      ],
    }
  }

  if (path === '/collection/poulia') {
    return {
      title: `Handmade Backgammon Pieces (Poulia) | ${BRAND}`,
      description:
        'Handmade backgammon pieces (poulia) for every Mavrikis board: two-faced, swirled resin on one side and wood with a resin eye on the other, made in South Africa.',
      path,
      image: '/images/poulia-1.jpg',
      imageAlt: 'Cobalt and pearl resin backgammon pieces with matching coasters by Mavrikis Designs',
      found: true,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'ImageGallery',
          name: 'Poulia: the pieces',
          url: absolute(path),
          about: 'Handmade backgammon (Tavli) pieces',
          publisher: { '@id': `${SITE_URL}/#organization` },
        },
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'Collection', path: '/collection' },
          { name: 'The pieces', path },
        ]),
      ],
    }
  }

  const boardMatch = path.match(/^\/collection\/([^/]+)$/)
  if (boardMatch) {
    const board = boards.find((b) => b.id === boardMatch[1])
    if (board) return boardMeta(board)
  }

  if (path === '/about') {
    return {
      title: `About the Backgammon Board Maker | ${BRAND}`,
      description:
        "Why Mavrikis Designs makes backgammon boards: a grandfather's handmade Tavli board, sixty years of games, and a search for the real thing. One maker, one board at a time.",
      path,
      image: '/images/pappou-board.jpg',
      imageAlt: "Pappou's handmade Tavli board",
      found: true,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: `About ${BRAND}`,
          url: absolute(path),
          about: { '@id': `${SITE_URL}/#organization` },
        },
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'About', path },
        ]),
      ],
    }
  }

  if (path === '/waitlist') {
    return {
      title: `Commission a Custom Backgammon Board | ${BRAND}`,
      description:
        "Every backgammon board is made to order. Join the waitlist or ask about a custom or personalised commission, and we'll reply personally within 48 hours.",
      path,
      image: DEFAULT_IMAGE,
      imageAlt: `An open Tavli board by ${BRAND}`,
      found: true,
      jsonLd: [
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'Waitlist', path },
        ]),
      ],
    }
  }

  if (path === '/studio') {
    return {
      title: `Design Your Own Backgammon Board | ${BRAND}`,
      description:
        'Pick the resin colours and engraving, preview your own custom backgammon board, then send the design to Mavrikis Designs to have it made by hand.',
      path,
      image: DEFAULT_IMAGE,
      imageAlt: `An open Tavli board by ${BRAND}`,
      found: true,
      jsonLd: [
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'Studio', path },
        ]),
      ],
    }
  }

  if (path === '/faq') {
    return {
      title: `Backgammon Board Prices & Questions | ${BRAND}`,
      description:
        'Answers about Mavrikis backgammon boards: what they are made of, how commissions and custom engravings work, prices, and how to order.',
      path,
      image: DEFAULT_IMAGE,
      imageAlt: `An open Tavli board by ${BRAND}`,
      found: true,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          url: absolute(path),
          publisher: { '@id': `${SITE_URL}/#organization` },
          mainEntity: answeredFaq().flatMap((section) =>
            section.items.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          ),
        },
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'Questions', path },
        ]),
      ],
    }
  }

  if (path === '/how-to-play') {
    return {
      title: `How to Play Backgammon & Tavli | ${BRAND}`,
      description:
        'Backgammon rules the Greek way: the setup, moves and scoring for Portes, Plakoto and Fevga, the three games of Tavli, plus the words and manners of a Greek table.',
      path,
      image: DEFAULT_IMAGE,
      imageAlt: `An open Tavli board by ${BRAND}`,
      found: true,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'How to play backgammon and Tavli: Portes, Plakoto and Fevga',
          url: absolute(path),
          inLanguage: 'en-ZA',
          about: ['Backgammon', 'Backgammon rules', 'Tavli', 'Portes', 'Plakoto', 'Fevga'],
          publisher: { '@id': `${SITE_URL}/#organization` },
        },
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'How to play', path },
        ]),
      ],
    }
  }

  return {
    title: `Page not found | ${BRAND}`,
    description: 'This page does not exist. Visit the collection to see every Mavrikis backgammon board.',
    path,
    image: DEFAULT_IMAGE,
    imageAlt: `An open Tavli board by ${BRAND}`,
    found: false,
    jsonLd: [],
  }
}

/** Every page the build should turn into its own HTML file. */
export function allPaths(): string[] {
  return [
    '/',
    '/collection',
    ...boards.map((b) => `/collection/${b.id}`),
    '/collection/poulia',
    '/about',
    '/waitlist',
    '/studio',
    '/faq',
    '/how-to-play',
  ]
}
