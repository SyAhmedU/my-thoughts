# My Thoughts

A calm, private place to write and save anything — a quick note, a worry, an idea, a plan.

- **Single-file app** (`index.html`, vanilla JS, no build).
- **Everything stays on your device** — thoughts are saved to `localStorage`, never uploaded.
- Titles, free-form body, **tags**, full-text **search**, pin-to-top, word count, autosave.
- **Export / import** a JSON backup (so you can move between devices yourself).
- **Installable PWA** — add to home screen / desktop; works offline.
- **↗ Rethink with AI** — send any single thought to the companion app ([Rethink with AI](https://rethink-with-ai.vercel.app)) to reframe, challenge, view from other perspectives, or sharpen it. Only the thought you choose to send leaves the device.

## Files

- `index.html` — the whole app.
- `manifest.webmanifest` · `icon.svg` · `sw.js` — PWA (installable + offline).
- `.github/workflows/pages.yml` — GitHub Pages deploy on push to `main`.

## Privacy

My Thoughts has no backend and no analytics. Your writing lives only in this browser's storage. The only time text leaves the device is when *you* press **Rethink with AI** on a specific thought, which opens the companion app with that one thought.

Deploy → GitHub Pages.
