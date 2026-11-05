# Vignesh ❤ Kreethika — Wedding Invitation Website

A luxury, mobile-first digital wedding invitation for the wedding of
**D. Vignesh** and **V. Kreethika**:

- **Reception:** Sunday, 15 November 2026, 7:00 PM onwards
- **Wedding (muhurtham):** Monday, 16 November 2026, 6:00 – 7:30 AM
- **Venue:** Sri Sundaram Mahal Thirumana Mandapam, Vengalapuram,
  Tirupattur – Tiruvannamalai Main Road, Tirupattur District, Tamil Nadu

Built with React 19, TypeScript, Vite 6, Tailwind CSS 4, Framer Motion and Lucide icons.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build locally
```

Node.js 18 or newer is required.

### Already built: `ready-to-deploy/`

The `ready-to-deploy/` folder next to this project is a complete, tested static
build. You can upload it as-is to Netlify (drag & drop on app.netlify.com/drop),
Vercel, Firebase Hosting, GitHub Pages or any web host. Once you change anything
in `src/`, run `npm run build` and deploy `dist/` instead.

---

## Deploying to Cloudflare Pages (vignesh-keerthana.pages.dev)

> Cloudflare project names can only use lowercase letters, numbers and hyphens,
> so `Vignesh_Keerthana` becomes **`vignesh-keerthana`**. The site is already
> configured for `https://vignesh-keerthana.pages.dev`.

**Option 1 — Direct upload (no coding tools needed)**
1. Cloudflare dashboard → Workers & Pages → Create → Pages → **Upload assets**.
2. Project name: `vignesh-keerthana`.
3. Upload the contents of the `ready-to-deploy` folder → Deploy.

**Option 2 — From Git**
Build command `npm run build`, build output directory `dist`, Node 18+.

If Cloudflare gives you a different address (for example, if the name is taken),
set `VITE_SITE_URL` in `.env` (copy `.env.example`) to the new address and rebuild.
Otherwise the WhatsApp preview image won't load.

**Check the preview:** after deploying, paste the link into
https://developers.facebook.com/tools/debug/ and click "Scrape Again". WhatsApp
uses the same preview data. WhatsApp also caches previews, so a link you sent
before deploying may keep its old preview for a while.

## Editing content

| What | Where |
| --- | --- |
| Names, parents, dates, times, venue, map link, music, video | `src/config/wedding.ts` |
| All English & Tamil interface text | `src/i18n/content.ts` |
| Gallery photos | `src/data/gallery.ts` + `public/assets/gallery/` |
| Colours & fonts (design tokens) | `@theme` block in `src/styles/globals.css` |
| SEO title, description, Open Graph tags | `index.html` |
| WhatsApp / link preview image (1200×630) | `public/assets/og/og-image.jpg` |

**Google Maps:** `venue.mapsUrl` contains the link decoded from the "Scan for
Location" QR code on the Tamil invitation. To show an embedded map as well, paste
a Google Maps *embed* URL into `venue.mapEmbedUrl`. In Google Maps, choose
Share → Embed a map and copy only the `src` value.

**Calendar:** Google Calendar links and `.ics` files are generated from
`events` in the config. The reception has no printed end time, so 10:00 PM
is used **only** to give the calendar entry a length (`endIsAssumed: true`).

**Countdown:** counts down to `countdownTarget`
(`2026-11-16T06:00:00+05:30`). The time includes the India offset, so it is correct on any
phone in any timezone. After that moment it shows "The Celebration of Love".

**Music:** `public/assets/audio/wedding-music.m4a` is the soundtrack taken
from the family's own invitation video. It never autoplays. It starts only after
the guest taps "Open Wedding Invitation", and the guest's on/off choice is kept
for the session. The music pauses automatically when the invitation film plays.
Replace the file to use a different (licensed) track.

**Adding photos:** export a ~720 px wide and a ~1400 px wide WebP of each photo,
put them in `public/assets/gallery/`, and add an entry to `src/data/gallery.ts`
with the real width/height of the large file. Use only genuine photographs.

---

## Project structure

```
src/
  config/wedding.ts        ← single source of truth
  i18n/                    ← English/Tamil copy + language context
  hooks/useCountdown.ts, useMusic.tsx
  data/gallery.ts, events.ts
  utils/calendar.ts, sharing.ts
  components/layout/       Header, Footer, MusicPlayer, SectionDivider
  components/sections/     Opening → Hero → Couple → Story → Events → Countdown
                           → Video → Gallery → Venue → Closing
  components/ui/           Button, DecorativeFrame, FloralDecoration (SVG thoranam,
                           jasmine, bells, kolam), OrnamentalDivider, CountdownCard,
                           VideoPlayer, Lightbox, Reveal, SectionHeading
public/assets/
  couple/ gallery/ video/ audio/ decorations/ icons/ og/
  wedding-invitation-reference.jpg
```

## Assets & credits

All photographs, the invitation video, its soundtrack, the Ganesha / kalash /
nadaswaram / monogram artwork and the event-planner logo come from the files the
family supplied. Photos were resized and converted to WebP only. Faces are never
altered. Ornaments (thoranam, jasmine strings, bells, kolam, filigree) are
original SVG drawings. The English Thirukkural translation is G. U. Pope's
(public domain).

## Accessibility & performance

- Respects `prefers-reduced-motion` (Framer `MotionConfig` + CSS fallbacks).
- Keyboard support: Escape closes the lightbox and menu. Arrow keys navigate the gallery. Focus rings are visible.
- Lazy-loaded images with explicit dimensions (no layout shift). The hero image is preloaded.
- The video loads only metadata until played and pauses when scrolled away.
- Google Fonts with `display=swap`.
