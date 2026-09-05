/*
  Vite's ambient types, for `import.meta.env`.

  The project had no reference to them because nothing had needed a build-time
  flag before. main.tsx now registers the service worker only under
  `import.meta.env.PROD`, and without this that read is a type error.

  A reference rather than a hand-written interface: the shape belongs to Vite,
  and duplicating it here would be a second copy to keep in step.
*/
/// <reference types="vite/client" />
