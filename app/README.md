# Rooted Strength — app

React + Vite + TypeScript implementation of the design handoff in
`../design_handoff_rooted_strength/`.

| Today | Foodways Codex | Plate scan report |
|---|---|---|
| ![Today — the daily rhythm, with every figure computed from the log set](docs/media/today.png) | ![A codex region, showing the evidence badge and the striped volume spine](docs/media/codex-region.png) | ![The nutrient report, totalled from the components actually kept](docs/media/report.png) |

<p align="center">
  <img src="docs/media/welcome.png" alt="The welcome screen" width="300">
</p>

Captured from the running app at 393×852 — the resolution the design was drawn
at. No mockups: these are headless-Chrome screenshots of the real build.
More in **[docs/screens.md](docs/screens.md)**, including all eleven Move
screens.

```bash
npm install
npm run dev        # http://localhost:5178
npm run typecheck
npm run contrast   # AA audit of both palettes
npm run h1         # every route has exactly one <h1>
npm run claims     # comparative claims agree across screens
npm run allergens  # a dish declares every allergen it names
npm run headers    # header text stays legible on every ground
npm run contrast-ssr  # inherited colour, every route, both themes
npm run promises   # the privacy screen still tells the truth
npm run durable    # every state key is saved or deliberately forgotten
```

## Installable, and offline

The app is a PWA: `public/manifest.webmanifest`, icons drawn from the app's own
sprout mark, and a hand-written service worker in `public/sw.js`.

No Workbox. It would have been the largest thing in a dependency tree of two
runtime packages, for a problem that is a hundred lines - the same reasoning
that left this app without a router or a state library.

The precache list is **read, not written**. Vite hashes its filenames, so on
install the worker fetches the shell and reads the asset URLs out of the HTML it
just received. Whatever shipped is what gets cached, with no second copy to
drift. Media is excluded and cached only as it is genuinely viewed: `public/media`
is 16 MB, and precaching that would be a 16 MB install on a field connection.

**The first visit must be online.** After it, the app opens with no connection -
verified by stopping the server and reloading, not by reading the spec.

### The media is already about the right size — measured

`public/media` is 14.2 MB and looks like an obvious thing to shrink. It is not,
and this note exists so the day is not spent finding that out twice.

| dimensions | images | size | |
|---|---|---|---|
| 900×502 | 185 | **10.34 MB** | the headers — 73% of all media |
| 520×290 | 140 | 2.91 MB | cards |
| 520×388 | 39 | 0.94 MB | cards |

A header renders in a **343×156** box at the 393px design width. At DPR 3 —
which is most current phones — that needs **1029px** wide, and the source is
900px. The headers are already marginally *under* resolution, not over.
Downscaling them would trade bytes for visible softness on the devices this app
is built for.

The card thumbnails are the same story: a 305px box needs 915px at DPR 3 against
a 520px source. They cannot be improved by resizing either, since the pixels are
not there — that would mean regenerating from source.

The 900×502 sources do carry roughly 18% of height that `object-fit: cover`
crops away at the header's 2.2 aspect. Cropping to fit would save around 1.5 MB
and recompose 185 illustrations that were composed at 1.79. That is a design
call, not a performance one.

### The fonts are self-hosted

Spectral and Hanken Grotesk are vendored under `public/fonts` and declared in
`src/theme/fonts.css`. Both are OFL, which permits it.

They came from Google Fonts until the Privacy screen started saying the app
"makes no network requests at all" — a sentence that was false while every cold
load handed the reader's IP to a third party from the one screen promising it
did not. The sentence is true now.

Two things were measured rather than assumed:

- **Subset.** Every non-ASCII character in the content layer was counted. The
  accented letters are all Latin-1 and nothing reaches Latin Extended, so `latin`
  is correct — the same subset Google was serving.
- **Deduplication.** Hanken Grotesk is one *variable* file spanning 100–900.
  Requesting it per weight returns five byte-identical copies; shipping those
  would have wasted 136 KB. Six files, 146 KB, not ten files and 281 KB.

Verified by **measuring rendered text**, not by trusting `document.fonts`: with
the server stopped, a Spectral string measures 457.11px against 431.34px for
Times, and Hanken 307.17px against 321.88px for Arial. The heading stack is
`Spectral, Georgia, serif` and it is demonstrably not setting in Georgia.

`.claude/launch.json` lets the in-app browser preview start the dev server. It
runs `npm run --prefix app dev` from the **repository root**, not from `app/`,
because that is where the launcher's working directory sits — hence the
`--prefix`. If the preview fails to start with a JSON parse error pointing at
`package.json:1:0`, an empty `package.json` is shadowing it in whatever
directory the launcher is running from; that file is the problem, not this one.

## Where things live

| Path | What it is |
|---|---|
| `src/theme/tokens.css` | Every design token, light and dark, plus the a11y modifiers |
| `src/theme/global.css` | Reset, keyframes, reduced-motion, 44px hit areas, focus rings |
| `src/data/content.ts` | 120 content definitions, **ported verbatim** from the prototype |
| `src/data/initialState.ts` | Seed state, including the 14-day log script |
| `src/data/tiers.ts` | The three tier vocabularies, with light + dark pairs |
| `src/state/store.tsx` | App state, navigation stack, logging |
| `src/state/selectors.ts` | Derived values — plate filtering, the nutrient report |
| `src/state/kitchen.ts` | Pantry drawdown, grocery swaps, order gaps, smoothie totals |
| `src/state/move.ts` | Session logging, weekly movement counts, elder dose |
| `src/components/TabbedGuide.tsx` | The tab-selector pattern nine Explore surfaces share |
| `src/state/journal.ts` | Streaks, week strip, protein trend, history timeline |
| `src/nav/routes.ts` | All 86 routes and their tab groupings |
| `src/components/` | Shell, tab bar, FAB, Council sheet, tier badge, UI primitives |
| `src/screens/` | Implemented screens |
| `docs/DISCREPANCIES.md` | Where the handoff contradicts itself, and what was decided |
| `public/media/` | Generated illustrations. Not photographs - see DISCREPANCIES §15 |

## What is implemented

All eight build-order steps from the handoff. **All 86 routes.**

- **Shell & navigation** — 393×852 surface, tab bar, Council FAB, real history
  stack, `rs-fade` route transitions, chrome hidden on onboarding
- **Both themes** — dark is a real token palette, *not* the prototype's
  `filter: invert(1)` shortcut, and is contrast-verified independently
- **Accessibility** — all 11 toggles wired; reduced motion honours both the OS
  setting and the in-app switch; 44px hit targets; icon controls labelled; tier
  meaning announced rather than implied by colour; reflow verified at 200% text
  and at 320px width, with no clipping and no sideways scroll
- **Tier badge system** — one component, three vocabularies, redundant glyph
  encoding when colour-blind-safe mode is on (it is on by default)
- **Data layer** — the full content corpus, copy untouched
- **Codex** — `codex`, `codexRegion`, `pantryCodex`, `pantryVol`
- **Onboarding** — all seven steps, skippable and revisitable, with the recap
  linking back into each and `profileReturn` re-entry for profile edits
- **Today** — every figure computed from the log set
- **Nourish — complete.** Hub; the scan chain `scan → detected → hidden → report`;
  `recipe` / `recipeDetail` / `sugarMeal`; `mealPlan`; `pantry`; `grocery` and
  `planGrocery`; `barcode` and `voice`; `restaurant` / `order`; and
  `smoothies` / `smoothieBuilder`
- **Move — complete.** Hub; `farm`; `exercise` (three variants incl. seated);
  `trainPlan`; `warrior`; `mobility`; `seated`; `elder`; `ancestral`; `breath`;
  `hike`. Every session screen logs a real entry that Today and the weekly
  counts read back
- **Explore — complete.** Atlas hub; `crop`; `map`; `forage`; `community`;
  `seasonal` (five bioregions, resolved against the real month); `minerals`;
  `frequencies`; `fusion`; `apothecary`; `teaIntel`; `mushrooms`; and the nine
  tabbed guides (`nervines`, `waterMed`, `ferment`, `swaps`, `diabetes`,
  `ceremony`, `coconut`, `honey`, `shroomRecipes`) built on one shared component
- **Journey — complete.** Hub; `progress` and `history` (both computed from the
  log set); `profile`; `sources` (all 66, graded by the shared badge); `privacy`;
  `dataSov`; `vault`; `membership`; `sovereignty`; `admin`; `sleep`;
  `pregnancy` (a real blocking clinician gate); `intimacy`
- **Farm & the rest — complete.** `microgreens`; `croplib` (searchable, filtered,
  with sow advice resolved against the real month); `variety`; `garden`;
  `pairings`; `budget`; `hydration`; `filters`; `family`

## Coverage

All 86 routes are implemented, wired and reachable — every route has at least one
inbound link from a screen or a tab, and no link lands on a placeholder. There is
no longer a "not built yet" screen in normal use; `NotBuiltYet` remains in
`App.tsx` only as a fallback for an unknown route string.

Verified mechanically:

```bash
npm run typecheck && npm run contrast && npm run h1 && npm run claims && npm run allergens && npm run headers && npm run contrast-ssr && npm run promises && npm run durable
```

## Rules that are load-bearing, not stylistic

These are enforced in code, and breaking them is a correctness bug:

1. **Nothing is filtered silently.** Excluded plates are counted *and* listed
   with the reason. Flagged brews sort last with the reason shown, never removed.
2. **Generative surfaces compute.** The nutrient report sums the actual kept
   components — drop a food and every macro, micro and sentence changes. The
   recipe generator cycles `genIdx` so a result never repeats early.
3. **Copy is not edited.** `content.ts` is verbatim. Several passages are worded
   precisely to avoid claiming more than the evidence supports. If a layout
   forces a cut, flag it for editorial review instead of trimming.
4. **A dish is never relabelled to suit a diet.** The classification tiers are
   distinct claims about history, not synonyms.

## Reflow

The handoff's one outstanding structural item; now closed. Every screen was
checked at 200% text scale and at a 320px viewport — no sideways scroll, no
clipped labels.

The fixes were structural rather than per-screen:

- grid tracks use `minmax(0, 1fr)` so a track can shrink below its content
- flex items carrying text can shrink (`min-width: 0`, no `flex: none`)
- a global `overflow-wrap: break-word` lets a word longer than its container
  break instead of being clipped by the fixed-width frame
- tier badges and chips wrap rather than truncate, because a shortened evidence
  label would change what it claims

One visible trade-off: the longest classification label wraps to two lines in a
dish row at normal size. There is no room for it and the dish title on one line
at 393px — before this change the title wrapped instead.
