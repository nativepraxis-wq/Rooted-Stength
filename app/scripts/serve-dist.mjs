/*
  Serve dist/ with the headers in dist/_headers applied.

  `vite preview` ignores _headers, so it cannot show whether the security policy
  breaks the app or whether the caching rules are right. This is a small static
  server that reads that file the way Netlify and Cloudflare Pages do - every
  matching block contributes its headers, in order - so both can be tested
  locally, before there is any host.

    npm run build && node scripts/serve-dist.mjs [port]

  No dependencies. Not for production: it exists to check the rules, not to
  host the app.
*/
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname, normalize } from 'node:path';

const DIST = join(process.cwd(), 'dist');
const PORT = Number(process.argv[2] || 5180);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};

/** [{ pattern, headers: [[name, value]] }] in file order. */
function parseHeaders(text) {
  const rules = [];
  let current = null;
  for (const raw of text.split(/\r?\n/)) {
    if (!raw.trim() || raw.trim().startsWith('#')) continue;
    if (!/^\s/.test(raw)) {
      current = { pattern: raw.trim(), headers: [] };
      rules.push(current);
    } else if (current) {
      const i = raw.indexOf(':');
      if (i > 0) current.headers.push([raw.slice(0, i).trim(), raw.slice(i + 1).trim()]);
    }
  }
  return rules;
}

function matches(pattern, path) {
  if (pattern.endsWith('*')) return path.startsWith(pattern.slice(0, -1));
  return pattern === path;
}

const headersFile = join(DIST, '_headers');
if (!existsSync(headersFile)) {
  console.error('dist/_headers not found - run `npm run build` first.');
  process.exit(1);
}
const RULES = parseHeaders(readFileSync(headersFile, 'utf8'));

createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const rel = path === '/' ? '/index.html' : path;
  const file = normalize(join(DIST, rel));
  if (!file.startsWith(DIST) || !existsSync(file) || statSync(file).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }
  for (const rule of RULES) {
    if (!matches(rule.pattern, path)) continue;
    for (const [name, value] of rule.headers) res.setHeader(name, value);
  }
  res.setHeader('Content-Type', TYPES[extname(file)] || 'application/octet-stream');
  res.writeHead(200);
  res.end(readFileSync(file));
}).listen(PORT, () => {
  console.log('dist/ with _headers applied: http://localhost:' + PORT
    + '  (' + RULES.length + ' rules)');
});
