import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  server: { port: 5178, strictPort: true },
  build: isSsrBuild
    ? {
      /*
        The SSR builds are the gates (h1, contrast-ssr, sample-leak, durable),
        run under Node - not a browser, so a Node target, which also permits
        the top-level `await loadScreens()` they begin with.

        The chunking below is what makes them FINISH, and it took two wrong
        answers to find:

          1. Default splitting: each screen chunk imported the store from the
             gate's own entry file, which was paused on its top-level await
             waiting for those chunks. A cycle through a TLA that never settles
             - Node exits 13 and prints nothing.
          2. inlineDynamicImports: one file, no cycle, but the gate's await ran
             before the inlined screen modules were declared further down:
             "Cannot access 'Onboarding' before initialization".

        All app code in ONE chunk that is not the entry. The entry statically
        imports it, so the whole app evaluates before the gate's first line
        runs; the dynamic imports then resolve against modules that already
        exist.
      */
      target: 'node18',
      copyPublicDir: false,
      rollupOptions: {
        output: {
          manualChunks: (id: string) => (/[\\/]scripts[\\/]/.test(id) ? undefined : 'app'),
        },
      },
    }
    : {
      /*
        Written to dist/asset-manifest.json (not the default .vite/manifest.json,
        which some static hosts refuse to serve as a dotfile directory). The
        service worker reads it on install to precache every code-split chunk -
        see public/sw.js.
      */
      manifest: 'asset-manifest.json',
    },
}));
