#!/usr/bin/env node
// Deploys dist/ by bundling every file into the Worker script, for environments where Wrangler's
// static asset upload is blocked (Claude cloud containers rewrite the asset upload token).
// Normal deploys use wrangler.jsonc (Workers static assets) via `npm run deploy` or Cloudflare's
// Git integration; both use the Worker name farm-cast-site, so either one replaces the other.
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const out = join(root, '.deploy');

const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml',
};

const walk = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? walk(join(d, n)) : [join(d, n)]));

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
const files = walk(dist).map((p) => '/' + relative(dist, p).split('\\').join('/'));

const imports = files.map((f, i) => `import f${i} from ${JSON.stringify(join(dist, f.slice(1)))};`).join('\n');
const table = files.map((f, i) => `  ${JSON.stringify(f)}: [f${i}, ${JSON.stringify(types[extname(f)] || 'application/octet-stream')}],`).join('\n');

writeFileSync(join(out, 'worker.js'), `${imports}
const files = {
${table}
};
export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.hostname === 'www.farm-cast.com') {
      url.hostname = 'farm-cast.com';
      return Response.redirect(url.toString(), 301);
    }
    let path = decodeURIComponent(url.pathname);
    if (path.endsWith('/')) path += 'index.html';
    const hit = files[path] || files[path + '/index.html'];
    if (!hit) return new Response('Not found', { status: 404, headers: { 'content-type': 'text/plain' } });
    const [body, type] = hit;
    const cache = path.startsWith('/_astro/') ? 'public, max-age=31536000, immutable' : 'public, max-age=300';
    return new Response(body, { headers: { 'content-type': type, 'cache-control': cache } });
  },
};
`);

writeFileSync(join(out, 'wrangler.json'), JSON.stringify({
  name: 'farm-cast-site',
  main: 'worker.js',
  compatibility_date: '2026-11-01',
  rules: [
    { type: 'Text', globs: ['**/*.html', '**/*.css', '**/*.svg', '**/*.txt', '**/*.xml'], fallthrough: false },
    { type: 'Data', globs: ['**/*.webp', '**/*.jpg', '**/*.png', '**/*.ico', '**/*.woff2'], fallthrough: false },
  ],
  routes: [
    { pattern: 'farm-cast.com', custom_domain: true },
    { pattern: 'www.farm-cast.com', custom_domain: true },
  ],
}, null, 2));

console.log(`bundling ${files.length} files`);
execFileSync('npx', ['wrangler', 'deploy', '--config', join(out, 'wrangler.json')], { cwd: out, stdio: 'inherit' });
