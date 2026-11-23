# farm-cast.com

Landing page for farm-cast. Astro, static output, no client-side JavaScript.

## Work on it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # writes dist/
```

All copy, contact details and image credits are in `src/content.ts`. Values in `[BRACKETS]` are
still to be filled in. Sections are in `src/components/`, colours and type in `src/styles/global.css`.
Images go through `astro:assets` and are converted to WebP at build time.

## Deploy

`wrangler.jsonc` serves `dist/` as Cloudflare Workers static assets. `npm run deploy` builds and
deploys with Wrangler; the custom domain farm-cast.com is attached in the Cloudflare dashboard
(Workers, farm-cast-site, Domains). Not deployed yet.

## Images

- `src/assets/work/aerial-fields.jpg`: orthophoto © GUGiK with ARiMR potato fields coloured by
  Sentinel-2 canopy greenness, from the ziemniaki demo.
- `src/assets/work/region-fields.jpg`: the same fields on an OpenStreetMap-based map.
- `src/assets/work/mushroom-detector.jpg`: detector output on a frame from the M18K Growth
  time-lapse (University of Houston). That dataset has no licence file, so this image has to be
  replaced before the site is public.
