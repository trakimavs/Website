// The board configurator lives in public/tavli-studio.html as a self-contained page
// (it renders the board on a canvas from embedded images). It is shown here in an
// iframe sized to the window, so its sticky preview and pop-up dialogs behave normally.
export default function Studio() {
  return (
    <main className="pt-20">
      <iframe
        src={`${import.meta.env.BASE_URL}tavli-studio.html`}
        title="Tavli Board Studio"
        className="block w-full border-0 bg-obsidian"
        style={{ height: 'calc(100dvh - 5rem)' }}
      />
    </main>
  )
}
