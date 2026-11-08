// Search and sharing details for every page: title, description, share image
// and structured data (JSON-LD) that tells Google and AI tools what each page is.
// Used by the build to write each page's <head>, and by PageMeta in the browser.
import { boards, type Board } from './data/boards'

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
    'Maker of handcrafted Tavli (backgammon) boards in South Africa. Solid Kiaat wood, hand-poured resin points and custom engravings, one board at a time.',
  email: 'mavrikisdesigns@gmail.com',
  address: { '@type': 'PostalAddress', addressCountry: 'ZA' },
  areaServed: 'ZA',
  sameAs: [INSTAGRAM],
  knowsAbout: ['Tavli', 'Backgammon boards', 'Woodworking', 'Resin inlay', 'Laser engraving'],
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

function boardMeta(board: Board): PageMetaData {
  const path = `/collection/${board.id}`
  return {
    title: `${board.name} | Handmade Tavli Board | ${BRAND}`,
    description: `${board.tagline}. A handmade Tavli (backgammon) board by ${BRAND}, South Africa.`,
    path,
    image: board.images[0],
    imageAlt: `${board.name}, a handmade Tavli board by ${BRAND}`,
    found: true,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        '@id': `${absolute(path)}#board`,
        name: board.name,
        alternateName: `${board.name} Tavli board`,
        description: board.description,
        abstract: board.tagline,
        genre: 'Handmade Tavli (backgammon) board',
        material: board.material,
        dateCreated: String(board.year),
        url: absolute(path),
        image: board.images.map(absolute),
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
      title: `${BRAND} | Handmade Tavli & Backgammon Boards, South Africa`,
      description:
        'Handcrafted Tavli (backgammon) boards made one at a time in South Africa. Solid Kiaat wood, hand-poured resin points and custom engravings, built to be handed down.',
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
      title: `The Collection | Handmade Tavli Boards | ${BRAND}`,
      description:
        'Every board in the Mavrikis collection: solid Kiaat, hand-poured resin points and custom engravings. Each Tavli (backgammon) board is a single piece, made by hand in South Africa.',
      path,
      image: DEFAULT_IMAGE,
      imageAlt: `Tavli boards by ${BRAND}`,
      found: true,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'The Collection',
          url: absolute(path),
          about: 'Handmade Tavli (backgammon) boards',
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

  const boardMatch = path.match(/^\/collection\/([^/]+)$/)
  if (boardMatch) {
    const board = boards.find((b) => b.id === boardMatch[1])
    if (board) return boardMeta(board)
  }

  if (path === '/about') {
    return {
      title: `About | The Maker Behind ${BRAND}`,
      description:
        "Why Mavrikis Designs makes Tavli boards: a grandfather's handmade board, sixty years of games, and a search for the real thing. One maker, one board at a time.",
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
      title: `Join the Waitlist | Commission a Tavli Board | ${BRAND}`,
      description:
        "Boards are made to order. Join the waitlist or ask about a custom commission, and we'll reply personally within 48 hours.",
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
      title: `Tavli Board Studio | Design Your Own Board | ${BRAND}`,
      description:
        'Pick the resin colours for the points and preview your own Tavli board, then send the design to Mavrikis Designs to have it made.',
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

  return {
    title: `Page not found | ${BRAND}`,
    description: 'This page does not exist. Visit the collection to see every Mavrikis Tavli board.',
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
    '/about',
    '/waitlist',
    '/studio',
  ]
}
