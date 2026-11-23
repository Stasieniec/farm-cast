# farm-cast.com

Landing page for farm-cast. Astro, static output, no client-side JavaScript.

## Work on it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # writes dist/
```

All copy, contact details and image credits are in `src/content.ts`.
Sections are in `src/components/`, colours and type in `src/styles/global.css`.
Images go through `astro:assets` and are converted to WebP at build time.

## Deploy

Live at https://farm-cast.com (www redirects to it), Cloudflare Worker `farm-cast-site`.

- Normal: connect this repo in the Cloudflare dashboard (Workers & Pages, farm-cast-site,
  Settings, Builds) so every push to `main` builds and deploys with `wrangler.jsonc`
  (Workers static assets). From a laptop, `npm run deploy` does the same.
- From a Claude cloud container: `npm run deploy:container`. Wrangler's asset upload fails
  there, so `scripts/deploy-from-container.mjs` bundles `dist/` into the Worker script instead.
  Same Worker name, so the two replace each other.

Cloudflare Web Analytics runs through the beacon in `src/layouts/Base.astro` (cookieless).
hello@farm-cast.com is handled by Cloudflare Email Routing.

## Images

- `src/assets/work/aerial-fields.jpg`: orthophoto © GUGiK with ARiMR potato fields coloured by
  Sentinel-2 canopy greenness, from the ziemniaki demo.
- `src/assets/work/region-fields.jpg`: the same fields on an OpenStreetMap-based map.
- `src/assets/work/mushroom-detector.jpg`: an image from the M18K dataset (Apache-2.0,
  github.com/abdollahzakeri/m18k) with the caps found by the pieczarki demo's detector drawn on it.
