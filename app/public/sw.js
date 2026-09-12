/*
  Service worker — offline, hand-written.

  ─────────────────────────────────────────
  WHY NOT WORKBOX

  This app has two runtime dependencies, react and react-dom, and five dev
  dependencies. It has no router and no state library because the hand-rolled
  versions are small and readable. A precache plugin would be the largest thing
  in the tree by an order of magnitude, to solve a problem that is eighty lines
  here. The trade-off is that these eighty lines have to actually be right,
  which is why each strategy below says what it is for.

  ─────────────────────────────────────────
  THE PRECACHE LIST IS READ, NOT WRITTEN

  Vite emits hashed filenames (index-D3J0xcgL.js) that change every build, so a
  static list in a file that is not generated at build time would go stale
  immediately and silently.

  So the list is not written down anywhere. On install the worker fetches the
  shell and reads the asset URLs out of the HTML it just received. Whatever
  actually shipped is what gets cached, and there is no second copy to drift.

  Media is left out of that: it is cached only as it is genuinely viewed.

  The cost is honest: the FIRST visit must be online. The install handler then
  fetches the shell and reads its hashed asset URLs straight out of the HTML, so
  by the end of that first visit the app genuinely does open offline. Runtime
  caching alone was not enough - on a first load the worker is not yet
  controlling the page, and the caches came back empty.

  ─────────────────────────────────────────
  THREE STRATEGIES, FOR THREE KINDS OF THING

    navigation   network first, cache as fallback.
                 Cache-first on the HTML is the classic way to trap people on a
                 version from months ago with no way out. Online, they get the
                 current app; offline, they get the last one that loaded.

    hashed asset cache first.
                 The hash IS the version. If the filename matches, the content
                 matches, so there is never a reason to re-fetch it.

    media        cache first, capped.
                 public/media is 16 MB across 364 illustrations. Precaching
                 that would be a 16 MB install on a phone, which is exactly the
                 wrong thing to do to someone on a field connection. Images are
                 kept as they are actually viewed, and the cache is trimmed so
                 it cannot grow without limit.
*/

/* v2: the app is code-split; install precaches every chunk from the build
   manifest, and updates wait for the app to close. */
const VERSION = 'v2';
const SHELL = 'rs-shell-' + VERSION;
const ASSETS = 'rs-assets-' + VERSION;
const MEDIA = 'rs-media-' + VERSION;

/* Roughly 120 illustrations. Enough for the screens someone actually revisits,
   far short of the whole 16 MB library. */
const MEDIA_MAX = 120;

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    /*
      Cache the shell and its assets NOW, during install.

      Runtime caching alone is not enough, and testing showed exactly why: on a
      first visit the worker is not controlling the page yet, so the HTML, the
      JS and the CSS are all fetched before it exists. The caches came back
      empty and the app would not have opened offline until a SECOND online
      visit - which is not what "works offline after one load" means.

      The asset filenames are hashed and change every build, so they cannot be
      listed here. Instead the worker fetches the shell and reads the asset URLs
      out of the HTML it just received. That is self-configuring: no build step,
      no generated manifest to fall out of step with what actually shipped.
    */
    const cache = await caches.open(SHELL);
    try {
      const res = await fetch('/', { cache: 'reload' });
      await cache.put('/', res.clone());

      const html = await res.text();
      const urls = new Set();
      for (const m of html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)) {
        urls.add(m[1]);
      }

      /*
        EVERY CHUNK, NOT JUST THE ONES THE HTML NAMES.

        The screens are code-split (src/nav/screens.ts). The HTML names only the
        entry chunk, so reading it alone would cache the shell and leave every
        screen the reader has not opened yet uncached - and a reader who goes
        offline would find most of the app missing.

        Vite writes /asset-manifest.json listing every chunk it emitted, with
        its CSS and imported assets. Reading that keeps the same principle as
        above: the list comes from what actually shipped, never written down.
        If it is missing the HTML list still stands, so an older build degrades
        to caching what it names rather than failing to install.
      */
      try {
        const mres = await fetch('/asset-manifest.json', { cache: 'reload' });
        if (mres.ok) {
          const manifest = await mres.json();
          for (const entry of Object.values(manifest)) {
            if (entry.file) urls.add('/' + entry.file);
            for (const c of entry.css || []) urls.add('/' + c);
            for (const a of entry.assets || []) urls.add('/' + a);
          }
        }
      } catch {
        /* No manifest - the HTML list above is the fallback. */
      }
      if (urls.size) {
        const assets = await caches.open(ASSETS);
        await assets.addAll([...urls]);

        /*
          The fonts are named in the CSS, not the HTML, so reading the shell
          alone would miss them. They would then be fetched on a first load
          while this worker is not yet controlling the page, never get cached,
          and a cold offline start would fall back to system faces - the app
          running perfectly while quietly setting in Georgia.

          So the stylesheets that were just cached are read too, and their
          /fonts/ URLs cached alongside. Same principle as the shell: the list
          is read out of what actually shipped, never written down.
        */
        const fonts = new Set();
        for (const href of urls) {
          if (!href.endsWith('.css')) continue;
          const sheet = await assets.match(href, { ignoreVary: true });
          if (!sheet) continue;
          const text = await sheet.clone().text();
          for (const m of text.matchAll(/url\(['"]?(\/fonts\/[^'")]+)['"]?\)/g)) {
            fonts.add(m[1]);
          }
        }
        if (fonts.size) await assets.addAll([...fonts]);
      }
    } catch {
      /* Offline during install, or the shell moved. The runtime handlers below
         will still populate the caches on the next successful request. */
    }

    /*
      NO skipWaiting(), deliberately.

      v1 called it so an update landed on the next load. That was safe only
      while the app was one chunk: the new worker's activate step deletes the
      old asset cache, and an open page running the old build had everything it
      needed already in memory.

      Code-split, that page still has screens to fetch - old hashed chunks that
      activate would just have deleted, leaving the network as the only source,
      which is the situation offline support exists for. So an update now waits
      in the "waiting" state until every window of the app is closed, and
      activates cleanly on the next launch. The first install is unaffected:
      with no previous worker there is nothing to wait for.
    */
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    /*
      Drop caches from older versions, or they accumulate forever.

      Verified by bumping VERSION, rebuilding and reloading: the new caches are
      built, the old ones are gone, and the app keeps working.

      ─────────────────────────────────────
      WHY THE PURGE IS SAFE NOW THAT ROUTES ARE SPLIT

      v1 warned that this purge plus skipWaiting would strand an open page once
      the app was code-split. It is split now, and skipWaiting is gone (see the
      install handler), so a new worker only activates when no window of the
      old build is open. Nothing running can still need the chunks deleted here.

      clients.claim() stays: on a FIRST install it lets the page that installed
      the worker be served from cache on its next request, and on an update
      there are no old clients left to claim.
    */
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((k) => k.startsWith('rs-') && !k.endsWith(VERSION))
        .map((k) => caches.delete(k)),
    );
    await self.clients.claim();
  })());
});

/** Keep a runtime cache from growing without bound, oldest first. */
async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= max) return;
  await Promise.all(keys.slice(0, keys.length - max).map((k) => cache.delete(k)));
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  /* Only GET. A POST is never safe to replay from a cache. */
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;

  /* ---- navigation: network first ---- */
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        const cache = await caches.open(SHELL);
        cache.put('/', fresh.clone());
        return fresh;
      } catch {
        const cache = await caches.open(SHELL);
        const cached = await cache.match('/', { ignoreVary: true });
        /* An offline first visit has nothing to fall back to. Say so plainly
           rather than returning a broken shell. */
        return cached || new Response(
          '<!doctype html><meta charset="utf-8">'
          + '<title>Rooted Strength — offline</title>'
          + '<body style="font:16px/1.5 system-ui;background:#F4EDDF;color:#231F1A;'
          + 'padding:2rem;max-width:32rem;margin:auto">'
          + '<h1 style="font-weight:600">Offline</h1>'
          + '<p>Rooted Strength has not finished downloading yet. Open it once '
          + 'with a connection and it will work offline after that.</p>',
          { headers: { 'Content-Type': 'text/html; charset=utf-8' }, status: 503 },
        );
      }
    })());
    return;
  }

  /* ---- media: cache first, capped ---- */
  if (sameOrigin && url.pathname.startsWith('/media/')) {
    event.respondWith((async () => {
      const cache = await caches.open(MEDIA);
      const hit = await cache.match(request, { ignoreVary: true });
      if (hit) return hit;
      try {
        const fresh = await fetch(request);
        if (fresh.ok) {
          await cache.put(request, fresh.clone());
          trim(MEDIA, MEDIA_MAX);
        }
        return fresh;
      } catch {
        /* An illustration that never arrived is not worth failing over: the
           screens keep their striped fallback ground underneath. */
        return new Response('', { status: 504 });
      }
    })());
    return;
  }

  /*
    ---- hashed build assets, and the self-hosted fonts ----

    /fonts/ is same-origin but does not live under /assets/, so it needs
    naming here or the woff2 files would miss every handler, go to the
    network, and fail offline - the app would run and quietly set in Georgia.

    The Google Fonts hosts are gone from this list because they are gone from
    the app: the faces are vendored under public/fonts now, which is what makes
    the Privacy screen honest about making no network requests.
  */
  const isAsset = sameOrigin
    && (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/fonts/'));

  if (isAsset) {
    event.respondWith((async () => {
      const cache = await caches.open(ASSETS);

      /*
        ignoreVary matters here, and it is not a precaution - without it this
        handler failed offline while the cache was demonstrably full.

        The entries are written during install by cache.addAll(), whose requests
        carry different headers from the ones the page later sends for a module
        script. When a response carries a Vary header those two are DIFFERENT
        cache keys, so match() missed, the fetch below threw with the server
        down, and both /assets/ requests came back ERR_FAILED while `/` served
        happily from cache.

        It looked like a caching bug and was a matching bug. Checking by hand
        with a string URL matched every time, because a string builds a request
        that resembles addAll's rather than the page's.
      */
      const hit = await cache.match(request, { ignoreVary: true });
      if (hit) return hit;

      try {
        const fresh = await fetch(request);
        if (fresh.ok || fresh.type === 'opaque') {
          await cache.put(request, fresh.clone());
        }
        return fresh;
      } catch (err) {
        /* Offline and not cached. Nothing useful to return, but rejecting
           without having looked twice would hide a cache that does hold it. */
        const late = await cache.match(request, { ignoreVary: true, ignoreSearch: true });
        if (late) return late;
        throw err;
      }
    })());
  }
});
