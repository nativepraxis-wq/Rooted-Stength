import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './theme/global.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

/*
  The offline layer.

  Registered here rather than in index.html so the guard can be
  `import.meta.env.PROD` - the actual question, is this a build? - instead of a
  guess at it. The first version keyed off `location.hostname !== 'localhost'`,
  which had the side effect of disabling the worker on a production build served
  locally: exactly the case needed to test that it works at all.

  In dev the worker would serve a cached bundle over Vite's HMR and make every
  edit look like it had done nothing.

  After load, so it never competes with the first paint. Failures are swallowed:
  an app that will not start because its offline layer would not install is
  worse than an app without one.
*/
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
