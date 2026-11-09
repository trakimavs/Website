// The board configurator lives in public/tavli-studio.html as a self-contained page
// (it renders the board on a canvas from embedded images). It is shown here in an
// iframe sized to the window, so its sticky preview and pop-up dialogs behave normally.
// The heading below repeats the studio's own visible intro for screen readers and
// search engines, which otherwise see only an empty frame on this page.
export default function Studio() {
  return (
    <main className="pt-20">
      <div className="sr-only">
        <h1>Design your own backgammon board</h1>
        <p>
          Choose a collection, set the resin colours and engraving, and preview your own
          handmade backgammon (Tavli) board. When it looks right, send the design to
          Mavrikis Designs and we'll make it for you in South Africa.
        </p>
      </div>
      <iframe
        src={`${import.meta.env.BASE_URL}tavli-studio.html?v=${__BUILD_ID__}`}
        title="Backgammon Board Studio"
        allow="web-share; clipboard-write"
        className="block w-full border-0 bg-obsidian"
        style={{ height: 'calc(100dvh - 5rem)' }}
      />
    </main>
  )
}
