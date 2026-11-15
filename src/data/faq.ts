// Questions for the FAQ page (/faq). The page and its search data (FAQPage
// JSON-LD in src/seo.ts) are both built from this list, so edit answers here.
//
// An answer of `null` is a question still to be written. It shows as a
// placeholder in `npm run dev` and is left out of the live site and of the
// search data, so a half-finished FAQ can never go out.
//
// Keep answers as plain text (no markdown): Google reads them word for word.
// A blank line (\n\n) starts a new paragraph on the page.
// To point the reader somewhere on the site, add a `link`.

export interface FaqItem {
  id: string
  question: string
  answer: string | null
  link?: { to: string; label: string }
}

export interface FaqSection {
  id: string
  title: string
  items: FaqItem[]
}

export const faq: FaqSection[] = [
  {
    id: 'the-boards',
    title: 'The boards',
    items: [
      {
        id: 'what-is-tavli',
        question: 'What is Tavli?',
        answer:
          'Tavli (τάβλι) is the Greek name for backgammon, and for the family of games Greeks play on the same board: Portes, Plakoto and Fevga. A game usually moves through all three. The board is the same one used for backgammon anywhere in the world.',
      },
      {
        id: 'materials',
        question: 'What are the boards made of?',
        answer:
          'Solid Kiaat wood, with points of hand-poured resin set into the surface rather than printed or painted on. Engravings are cut into the wood itself. No veneers.',
      },
      {
        id: 'board-styles',
        question: 'What is the difference between a Classic, a Heritage and a Signature board?',
        answer:
          'A Classic board is made in small runs to a set design, with the Mavrikis Designs logo, so once a run is gone it is sold out. A Heritage board is made for one person, in your own colours and with your own logo, and is never made again. A Signature board goes further: a commissioned, one-of-one piece, such as a wedding board, a full resin table or a river board, each quoted on request.',
        link: { to: '/collection', label: 'See the collection' },
      },
      {
        id: 'kiaat',
        question: 'What is Kiaat, and why is it used?',
        answer:
          'Kiaat (Pterocarpus angolensis) is a hardwood native to southern Africa, and one of the most prized furniture timbers on the continent. In South Africa it is a protected tree under the National Forests Act, and it grows slowly, taking decades to reach a size worth cutting. Each board is made from a wood that is genuinely scarce.\n\nIt is also one of the most stable woods there is. Kiaat shrinks very little as it dries and barely swells or shrinks afterwards, which is why it was traditionally chosen for canoes and paddles. For a board that means the joints stay tight as the seasons and the air around it change, wherever in the world it ends up.\n\nThe heartwood is naturally resistant to termites and wood borers, and it is hard enough to take years of checkers snapped down on it, harder than walnut or cherry. When the tree is cut it bleeds a deep red sap, which is why it is known as bloodwood. The grain runs from golden to reddish brown with darker, wavy streaks, so no two boards look alike, and it takes a fine polish under oil. In Zimbabwe the mbira, the traditional thumb piano, is carved from the same wood.',
      },
      {
        id: 'colours',
        question: 'Can I choose the colours of my board?',
        answer:
          'Classic boards come in two colourways: white and green, or white and blue. From time to time we also release a colourway as a limited edition, made in a single run and then retired. On a Heritage board the colours are entirely your choice.',
        link: { to: '/studio', label: 'Try colours in the Studio' },
      },
      {
        id: 'whats-included',
        question: 'What comes with a board?',
        answer:
          'Every board, Classic or Heritage, comes with a pair of dice and thirty pieces, fifteen in each of its two colours. Every set is half wood and half resin, the resin poured to match the points.\n\nHeritage boards only: one spare piece in each colour, and a storage rail for the pieces. The storage rail is not included with a Classic board.',
      },
      {
        id: 'spare-pieces',
        question: 'Can I order spare pieces?',
        answer:
          'Yes. A Heritage board already includes one spare piece in each colour. For any board, a spare set adds two pieces in each colour, half wood and half resin like the rest. Spares must be ordered with the board itself. The resin for each board is mixed and poured once, and a later pour will never match it exactly.',
      },
      {
        id: 'size',
        question: 'How big is a board, open and closed?',
        answer:
          'Classic: 465 × 265 × 70 mm closed, about the size of a slim briefcase. Open, it lies flat at 465 × 530 × 35 mm.\n\nHeritage: a larger board, 470 × 310 × 90 mm closed. Open, it lies flat at 470 × 625 × 45 mm.',
      },
      {
        id: 'care',
        question: 'How do I look after the wood?',
        answer:
          'Wipe it with a soft, dry cloth and keep it out of direct sunlight, which over time can yellow the resin and darken the wood unevenly. Keep it away from heaters and damp, and do not set hot or wet drinks on it. The wood is finished with Danish oil. Once or twice a year, or when it starts to look dry, rub in a thin coat with a lint-free cloth, leave it for fifteen minutes, then wipe off whatever has not soaked in. Store the board closed and flat.',
      },
    ],
  },
  {
    id: 'commissions',
    title: 'Commissions and custom boards',
    items: [
      {
        id: 'custom',
        question: 'Can I have a board made just for me?',
        answer:
          'Yes. Every Heritage board is made for one person. Tell us the colours, the engraving and who it is for, and we will design it with you. For something further still, such as a wedding board, a full resin table or a river board, ask about a Signature commission.',
        link: { to: '/waitlist', label: 'Ask about a commission' },
      },
      {
        id: 'design-online',
        question: 'Can I design my own board online?',
        answer:
          'The Studio lets you choose the resin colours for the points and preview the board before you send the design to us. We take it from there.',
        link: { to: '/studio', label: 'Open the Studio' },
      },
      {
        id: 'engraving',
        question: 'What can be engraved on a board?',
        answer:
          'Classic boards carry the Mavrikis Designs logo. On a Heritage board the engraving is yours: bring your own logo or crest, or we will design one with you. Almost anything is possible, though simple designs with clean lines engrave best into wood. Fine detail tends to soften.',
        link: { to: '/waitlist', label: 'Discuss an engraving' },
      },
      {
        id: 'lead-time',
        question: 'How long does a board take to make?',
        answer:
          'Between four and eight weeks, depending on how many boards are in the workshop at the time. Delivery is not included in that time and is added once the board is finished.',
      },
      {
        id: 'gift',
        question: 'Can I order a board as a gift for a specific date?',
        answer:
          'Yes. Tell us the date before you order and we will tell you honestly whether it can be done. Where it can, your board can be moved up the queue as a priority order. Priority orders carry an additional fee, and the sooner the date, the higher it is.',
        link: { to: '/waitlist', label: 'Ask about your date' },
      },
      {
        id: 'corporate',
        question: 'Do you make boards for corporate gifts?',
        answer:
          'Yes. Boards can be engraved with a company logo, for clients, partners or a team. Get in touch to discuss numbers, design and timing.',
        link: { to: '/waitlist', label: 'Discuss a corporate order' },
      },
    ],
  },
  {
    id: 'ordering',
    title: 'Ordering, price and delivery',
    items: [
      {
        id: 'how-to-order',
        question: 'How do I order a board?',
        answer:
          'Boards are made to order and are not sold through a checkout on this site. Join the waitlist or send a message about the board you have in mind, and we will reply personally within 48 hours.',
        link: { to: '/waitlist', label: 'Join the waitlist' },
      },
      {
        id: 'price',
        question: 'How much does a board cost?',
        answer:
          'Prices are shared on request. Tell us which board you have in mind, Classic, Heritage or a Signature commission, and where it will be going, and we will send you a quote personally.',
        link: { to: '/waitlist', label: 'Ask for a quote' },
      },
      {
        id: 'payment',
        question: 'How do I pay?',
        answer:
          'By EFT. Our banking details are sent with your quote. If paying in full upfront is not possible, a 65% deposit starts your board, with the balance due before it is shipped. Deposits are non-refundable.',
      },
      {
        id: 'cancellations',
        question: 'Can I cancel my order?',
        answer:
          'Classic orders can be cancelled, but the deposit is non-refundable. Heritage and Signature boards are designed and made for one person, so once ordered they cannot be cancelled or returned.',
      },
      {
        id: 'where-made',
        question: 'Where are the boards made?',
        answer: 'In Gauteng, South Africa, by hand, one board at a time.',
        link: { to: '/about', label: 'Meet the maker' },
      },
      {
        id: 'delivery-sa',
        question: 'Do you deliver across South Africa?',
        answer: 'Yes. Delivery anywhere in South Africa is free.',
      },
      {
        id: 'international',
        question: 'Do you ship outside South Africa?',
        answer:
          'Yes. International shipping is not included in the price of the board. It is quoted separately for your country, and any import duties or taxes are paid on arrival.',
      },
    ],
  },
]

/** The questions that have answers: the only ones the live site shows. */
export function answeredFaq(): FaqSection[] {
  return faq
    .map((section) => ({ ...section, items: section.items.filter((item) => item.answer) }))
    .filter((section) => section.items.length > 0)
}
