# Handoff: Rooted Strength — Afro-Indigenous Plant-Based Strength & Food Sovereignty App

## Overview

Rooted Strength is a mobile application combining plant-based nutrition, land-based fitness, herbal knowledge, and Afro-Indigenous food-sovereignty education. It is built around a governing editorial principle: **the app never misrepresents cultural food history to serve a dietary agenda.** Dishes that were always plant-based are labelled as such; dishes adapted from meat- or dairy-based originals are labelled as adaptations; contemporary inventions are labelled as inventions. Health claims are graded by the strength of the evidence behind them, including an explicit "documentation gap" label where research does not exist.

The app spans 86 routes covering onboarding, daily rhythm tracking, meal planning, plate scanning, a two-axis cultural food codex, herbal apothecary, movement programming, farm/microgreen management, community and membership surfaces, and an accessibility control center.

**Target platform:** iOS/Android mobile (designed at 393 × 852, iPhone 14/15 logical resolution).

---

## About the Design Files

The files in this bundle are **design references created in HTML** — working prototypes that demonstrate intended look, content, and behavior. **They are not production code to copy directly.**

The task is to **recreate these designs in the target codebase's existing environment** — React Native, Swift/SwiftUI, Kotlin/Compose, Flutter, or a React web app — using that codebase's established component library, navigation patterns, state management, and styling conventions. If no environment exists yet, choose the framework most appropriate for the product (a native or React Native mobile app is the natural fit given the design is mobile-only) and implement there.

The HTML prototype uses a custom template runtime. **Do not attempt to port that runtime.** Read the prototype for layout, exact values, copy, and interaction logic; then rebuild idiomatically.

### A note on the content

The content is the most valuable part of this handoff and the part most likely to be damaged in translation. The codex entries, evidence gradings, safety warnings, and adaptation standards were written from a specific research corpus with deliberate care about attribution and honesty. **Port the copy verbatim.** Do not paraphrase, compress, or "punch up" the cultural or scientific text — several passages are worded precisely to avoid making a claim the evidence does not support, and rewording them can introduce a false claim. If copy must be shortened for a layout constraint, flag it for editorial review rather than making the cut yourself.

---

## Fidelity

**High-fidelity (hifi).** Final colors, typography, spacing, iconography, copy, and interaction behavior. Every value in this document is the actual value used in the prototype. Recreate the UI faithfully using the codebase's existing libraries where they map cleanly, and match the prototype's values where they don't.

---

## Design Tokens

### Color — core palette

| Token | Hex | Role |
|---|---|---|
| `sand` | `#F4EDDF` | App background; light text on dark grounds |
| `ink` | `#23201B` | Primary heading text |
| `ink-body` | `#2A2620` | Body text (global default) |
| `ink-muted` | `#5C564A` | Secondary body text |
| `ink-soft` | `#625B4C` | Tertiary/supporting text |
| `ink-meta` | `#67604F` | Metadata, counts, captions (AA-verified on sand) |
| `forest` | `#1E3A2B` | Primary dark ground; primary button fill |
| `forest-2` | `#14231A` | Gradient partner for `forest` |
| `leaf` | `#2F4A31` | Green accent / evidence "well established" text |
| `leaf-mid` | `#3C5A42` | Secondary green |
| `clay` | `#8F4230` | Primary accent; links; Nourish section color |
| `clay-hover` | `#8F3E2C` | Link hover |
| `earth` | `#7E5124` | Brown accent; Explore/codex section color (AA-verified) |
| `ochre` | `#C79A45` | Gold — FAB, avatar, active accents |
| `ochre-light` | `#D4AA5C` | Gold text on dark grounds |
| `teal` | `#2E6B7A` | Move/hydration section color |
| `plum` | `#7A3C4A` | Frequencies/state accent |
| `indigo` | `#2C3A63` | Documentation-gap tier |

### Color — surfaces & borders

| Token | Hex | Role |
|---|---|---|
| `card` | `#FFFFFF` | Card fill |
| `card-warm` | `#FFFDF7` | Alt card fill |
| `surface-1` | `#F3EEE1` | Inset panel |
| `surface-2` | `#EFEAE0` | Chip background |
| `surface-3` | `#EDE4D2` | Back-button fill |
| `surface-cream` | `#FBF6EC` | Craft/technique band fill |
| `border` | `#E3D8C2` | Default border |
| `border-2` | `#D8CDB6` | Stronger border |
| `border-cream` | `#EADFCB` | Cream band border |
| `border-rose` | `#DCC9C9` | Safety band border |
| `safety-bg` | `#FDF6F2` | Safety band fill |

### Color — evidence & classification tiers

Tier badges are used across the whole app and must render identically everywhere. Each is `{background, foreground}`:

**Evidence tiers (`evTier`)**
| Key | Label | BG | FG |
|---|---|---|---|
| `well` | Well established | `#E4EDDD` | `#2F4A31` |
| `strong` | Strong scientific | `#E4EDDD` | `#2F4A31` |
| `moderate` | Moderate scientific | `#D9E7EC` | `#2E6B7A` |
| `historical` | Verified historical | `#F0E3D2` | `#7E5124` |

**Claim tiers (`claimTier`) — Pantry Codex**
| Key | Label | BG | FG |
|---|---|---|---|
| `staple` | Culinary staple | `#EFEAE0` | `#67604F` |
| `proven` | Multiple human trials | `#E4EDDD` | `#2F4A31` |
| `prelim` | Preliminary evidence | `#D9E7EC` | `#2E6B7A` |
| `tradonly` | Traditional use only | `#F0E3D2` | `#7E5124` |
| `caution` | Safety caution | `#F6DED6` | `#8F4230` |
| `gap` | Documentation gap | `#E1E4EF` | `#2C3A63` |

**Dish classification tiers (`clsTier`) — Foodways Codex**
Labels: Traditionally vegan · Plant-forward tradition · Adapted from a meat/dairy original · Postcolonial reclamation · Contemporary innovation. Same badge geometry, palette drawn from the tiers above.

Badge geometry: `font-size: 9.5px; font-weight: 800; padding: 3px 8px; border-radius: 12px; white-space: nowrap;`

### Typography

Two families, loaded from Google Fonts:
- **Spectral** (serif) — weights 400/500/600/700 + italic 500. All headings and display numbers. Used at `font-weight: 600` almost universally.
- **Hanken Grotesk** (sans) — weights 400/500/600/700/800. All body, UI, labels, buttons.

Global fallback stack: `'Hanken Grotesk', system-ui, sans-serif`.

| Role | Family | Size | Weight | Line-height |
|---|---|---|---|---|
| Hero headline (welcome) | Spectral | 34px | 600 | 1.18 |
| Screen H1 (dark header) | Spectral | 29px | 600 | 1.1 |
| Screen H1 (onboarding) | Spectral | 25px | 600 | — |
| Detail header title | Spectral | 24px | 600 | 1.15 |
| Section H2 | Spectral | 20px | 600 | — |
| Card title (large) | Spectral | 18px | 600 | 1.2 |
| Card title (row) | Spectral | 17px / 16.5px | 600 | 1.2 |
| Stat number | Spectral | 18–20px | 600 | 1.15 |
| Eyebrow label | Hanken | 10.5–11px | 700–800 | — |
| Body | Hanken | 13–13.5px | 400 | 1.5–1.6 |
| Card body | Hanken | 12.5px | 400 | 1.5–1.55 |
| Meta / caption | Hanken | 11–12px | 600–700 | 1.3–1.45 |
| Badge | Hanken | 9.5–10.5px | 800 | — |
| Tab label | Hanken | 10px | 700 | — |

Eyebrow labels use `letter-spacing: 1–2.5px; text-transform: uppercase`. Long-form paragraphs use `text-wrap: pretty`.

### Spacing, radius, shadow

- **Screen gutter:** 18px (20px on a few dark headers)
- **Scroll bottom padding:** 120px standard; **230px** on the smoothie builder (tallest footer state must clear interactive chips)
- **Card padding:** 15–16px; band padding 15px 16px
- **Gaps:** 8px (list rows) · 9px (cards, stat tiles) · 12–13px (card groups) · 26px (family groups)
- **Radius:** 50% (circular buttons/avatars) · 12px (badge, small button) · 14–15px (small card, stat tile) · 16px (safety band) · 18px (band, dark card) · 20–22px (primary card) · 28px (dark header bottom corners) · 42px (app viewport) · 52px (device bezel)
- **Shadows:**
  - Card: `0 6px 20px -13px rgba(30,58,43,0.5)`
  - Card (light): `0 4px 14px -11px rgba(30,58,43,0.45)`
  - Today card: `0 6px 20px -12px rgba(30,58,43,0.3)`
  - FAB: `0 10px 24px -6px rgba(168,120,58,0.7)`

### Motion

`@keyframes` in the prototype, all to be reimplemented with the platform's animation API:

| Name | Definition | Use |
|---|---|---|
| `rs-fade` | opacity 0 → 1 | Screen enter, 0.35s ease (**every route**) |
| `rs-sheet` | translateY(100%) → 0 | Bottom sheet / modal enter |
| `rs-float` | translateY 0 → -5px → 0 | FAB idle, 4s ease-in-out infinite |
| `rs-ripple` | scale(0.7) op .55 → scale(2.2) op 0 | Voice/listening pulse |
| `rs-breathe` | scale(0.72) → 1.12 @33% → 0.72 | Breathwork circle |
| `rs-breathe-halo` | scale(0.78) op .5 → scale(1.3) op .16 → back | Breathwork halo |
| `rs-grow` | scaleY(0) → 1 with fade | Chart bar entrance |

**Reduced motion is mandatory.** The prototype honors `prefers-reduced-motion: reduce` by disabling all animation and transition, and additionally exposes a user-facing reduce-motion toggle (`[data-rs-reduce]`). Both paths must be implemented — the OS setting and the in-app toggle.

---

## App Shell

```
Device viewport 393 × 852
└─ App surface — background #F4EDDF, radius 42px, overflow hidden, column flex
   ├─ Scroll region (.rs-scroll, scrollbar hidden)
   │  └─ Active route content (animation: rs-fade 0.35s ease)
   ├─ AI Council FAB — absolute, right 18px, bottom 96px, z-index 45
   │                    58 × 58, radius 50%, radial-gradient(circle at 35% 30%, #C79A45, #A8783A)
   │                    7-node network SVG mark in #1E3A2B, rs-float 4s infinite
   └─ Bottom tab bar — absolute bottom, z-index 44
                        background rgba(255,255,255,0.94), backdrop-filter blur(14px)
                        border-top 1px #E3D8C2, padding 9px 8px 24px
                        5 tabs, space-around, icon 23×23 + 10px/700 label
```

**Tabs:** Today · Nourish · Move · Explore · Progress. Active tab is tinted with its section color; inactive is `#67604F`. Icons are custom inline SVG (1.5–2px stroke, round caps) — the Today icon is a stylized plant with a seed center. Extract the SVG paths from the prototype directly.

Both FAB and tab bar are hidden on onboarding routes (`showChrome` = route not in `['welcome','ob1','ob2','ob3','obHerb','consent','obRecap']`).

### Dark mode

Implemented in the prototype as a **filter inversion** on the app surface — `filter: invert(1) hue-rotate(180deg)` with photos and images double-inverted to correct them back. This is a prototype shortcut. **Build a real dark theme with proper token pairs instead**, and verify contrast independently; do not port the filter trick.

---

## Navigation & State

### Routing

A single `route` string in app state selects one of **86 screens**. Recreate as a real navigation stack.

```
welcome ob1 ob2 ob3 consent obHerb obRecap profile
today nourish scan detected hidden report recipe recipeDetail
mealPlan pantry grocery planGrocery barcode voice restaurant order
move farm explore crop map journey progress history
sugarMeal breath hike elder ancestral forage sources a11y
privacy dataSov membership community seasonal minerals hydration filters
sleep mobility seated apothecary teaIntel warrior coconut honey
shroomRecipes nervines waterMed sovereignty ferment diabetes ceremony swaps
frequencies mushrooms microgreens croplib variety garden family intimacy
pregnancy admin exercise trainPlan pairings codex fusion pantryCodex
pantryVol codexRegion budget smoothies smoothieBuilder vault
```

### Back behavior

The prototype maintains its own history array (`_hist`) and `goBack()` pops it, with onboarding routes excluded from history. Replace with the platform's native navigation stack and hardware/gesture back.

**Note:** `pantry` (pantry *inventory*) and `pantryCodex` (Pantry *Codex*) are distinct routes. They were briefly collided during development; keep them separate.

### State to model

| Domain | Keys | Notes |
|---|---|---|
| Navigation | `route`, `_hist`, `profileReturn` | `profileReturn` lets onboarding screens be reused as profile editors and return to the caller |
| Onboarding profile | `obPronoun`, `obGoal`, `obGoal2`, restrictions set, traditions set, herb-safety flags | Drives filtering app-wide |
| Consent | 4 independent grants: health, photos, location, research | Granular, revocable, research **off by default** |
| Accessibility | `dark`, `contrast`, `colorblind`, `plain`, `dyslexia`, `reduce`, `lowbw`, `offline`, `voice`, `captions`, `elder` | All independent booleans |
| Logs | `logs[]` — 14 days seeded; `{id, kind, d, t, name, meta}`, kind ∈ plate/move/water/brew/ferment/note | Add + remove; feeds Progress and History |
| Selection | `codexId`, `pantryId`, `cropId`, `plateId`, `warriorId`, tab ids per apothecary section | |
| Meal planning | `mealDay`, `pantryOff`, `pantryRestock`, `got` | |
| Scan flow | `scanFromUpload`, `scanDrop`, `scanAlt` | Which detected foods were dismissed / substituted |
| Generative | `genIdx`, `councilDraft`, `councilOpen` | Recipe generator cycles `genIdx` through all matches |
| Transient UI | `logToast`, `toastLabel`, `toastTo`, `noteOpen`, `noteDraft`, `histFilter`, `bcFound`, `voiceHeard`, `resetOpen`, `resetDone` | |
| Trackers | `hydrationCups` (goal 9), `fermJars[]` with day/target | |

### Data-driven content

Nearly every screen renders from a definition array held on the component. Move these to a data layer — JSON, a local database, or an API — with the same shapes:

`codexRegions` (10) · `codexFamilies` (3) · `pantryVols` (6) · `plateDefs` · `menu` · `menuCoop` · `planAisles` · `minerals` · `mobilityMoves` · `seatedMoves` · `trainWeek` · `warriorDefs` · `fermDefs` · `nervineDefs` · `waterMedDefs` · `shroomRecipeDefs` · `saladDefs` · `honeyDefs` · `dbDefs` · `teaRules` · `sources` · `obGoals` · `obRestrList` · `obTradList` · `consentList` · `freqBandDefs` · `goalFreqMap` · `allergenWord`

---

## Screens

Full copy and values for every screen are in the prototype. Below are the structurally significant ones; treat the prototype as the spec for the rest.

### Onboarding (welcome → ob1 → ob2 → ob3 → obHerb → consent → obRecap)

7 steps, no chrome. Every question skippable and revisitable — the recap screen links back into each step, and profile edits re-enter the same screens with `profileReturn` set.

- **welcome** — Dark ground `radial-gradient(120% 90% at 50% 0%, #22201A, #16130E 60%, #100E0A)`. Three stacked eyebrows (Root Life · Native Praxis / ROOTED STRENGTH / then hero). Spectral 34px/600 headline over three lines: "Plant-based muscle. / Ancestral food. / Land-based fitness." Body: "Build a body capable of feeding, protecting, carrying, creating, loving and serving the village." Then a geographic provenance line naming the specific places the knowledge comes from.
- **ob1** — "First — who are we growing with?" Sub: "Every question can be skipped and revisited later."
- **ob2** — "What are you building toward?" Primary goal (10 options: muscle growth, strength, farming stamina, hiking prep, mobility, elder independence, body recomposition, postpartum rebuilding, recovery from inactivity, general vitality) + optional secondary. Goal maps to a nutrient "frequency band" via `goalFreqMap`.
- **ob3** — "How does your table eat?" 8 restrictions (soy-free, nut-free, gluten-free, sesame-free, low-sodium, low-cost, texture-sensitive, religious/spiritual) + 6 traditions (West African, Caribbean, Gullah Geechee, Creole, Afro-Latin, Indigenous American).
- **obHerb** — "Anything the herbs should know?" Feeds contraindication flags; brews are later flagged **with the reason shown**, never silently hidden.
- **consent** — "Your data, your land." 4 granular grants with sub-labels ("Encrypted · revocable anytime · never sold" / "Optional · private · no beauty scores, ever" / "Approximate location only" / "Fully optional · off by default"). Links to the residency map.
- **obRecap** — "Here's what we heard." Every answer echoed back with its downstream effect, each editable.

### today

Dark hero (`#1E3A2B` → `#14231A`, radius 0 0 28px 28px) with date eyebrow, "Good morning, Amara" in Spectral 29px, and a 44px ochre avatar. Below: "Today's rhythm" + "3 of 5 tended", then a vertical stack of accent-striped cards — Move, Nourish, Recovery/breath, Warrior drill of the day, Tonight's cup, Microgreen farm (with salad of the day), Fermentation jar, Eat-for-today's-state — closing with a "Your Strength Garden / Season 3" gradient card. Cards use a 12px left color stripe keyed to section color.

### Nourish cluster

- **nourish** — hub. Eyebrow "Nourish", H1 "The Complete Rooted Plate", sub "Feed a body that can carry, create and serve — not a number to shrink." Contains the Scan My Plate CTA (dark card, "Photograph a meal →").
- **scan → detected → hidden → report** — camera → detected-foods list (each dismissable or substitutable) → hidden-ingredient disclosure → nutrient report. **The report computes real nutrient totals from the detected food set** — it must not display precomputed or fabricated numbers.
- **recipe / recipeDetail** — generator ranks candidates by primary purpose and cycles through *all* matches via `genIdx`; it must never re-show one result.
- **mealPlan** (7-day) · **pantry** (inventory; logged plates draw stock down) · **grocery** / **planGrocery** (aisle-grouped, checked against pantry) · **barcode** · **voice** (rs-ripple mic, transcript preview, commits to pantry) · **restaurant** / **order** · **smoothies** / **smoothieBuilder** (commits blends as logged plates, shows blend name + protein-target verdict; **230px scroll padding**).

Allergen filtering is honest throughout: excluded plates are *counted and listed with the reason* ("N plates hidden" + "contains peanut & sesame"), never silently dropped.

### Codex — two axes

**codex** (Foodways, by region) — dark header, "Ten regional volumes in three families of exchange," 3 stat tiles. Volumes grouped under `codexFamilies` headers with a 2px `#23201B` top rule, family title in Spectral 19px, count in 10.5px/800 uppercase, then a one-line family thesis. Each volume is a card with an 11px diagonal-stripe spine (`repeating-linear-gradient(135deg, c1 0-9px, c2 9-18px)`), title, evidence badge, colored subtitle, hook, and a counts line. Footer cross-links to the Pantry Codex.

Families: Continental Africa (west, east, north, central) · The Atlantic diaspora (caribbean, afam, afrosam) · Indian Ocean & Mediterranean (afroasia, indenture, italy).

**codexRegion** — 132px striped header with dark scrim, back button at top 58px. Then subtitle, lede, stat tiles, zones ("N zones"), dishes (each with a classification badge), a craft/technique cream band, an optional **"Who grew it, who was paid"** labour-justice band (rose border, 5px `#8F4230` left border), adaptation standards list, and a sovereignty band.

**pantryCodex** (by ingredient) — same architecture, brown ground (`#3A2E17` → `#241C0E`) with a diagonal ochre stripe overlay at 0.16 opacity. Opens with the six-axis classification and name-normalisation explainer, then 6 volume cards, then a safety-critical ingredient band on `#1E3A2B`.

**pantryVol** — subtitle, lede, stat tiles, families, entries (each with a **claim tier** badge), craft band, a red **"Safety & honest limits"** band, claim standards, and a green "Growing it here" band.

**fusion** — the 8-question ethical fusion check, brown ground (`#7E5124` → `#4E3113`), `fusionChecks` state per question.

### Explore / knowledge surfaces

~40 routes: apothecary and its sub-surfaces (teaIntel, nervines, waterMed, ferment, coconut, honey, mushrooms, shroomRecipes, microgreens), farm and crop library (crop, croplib, variety, garden), movement (move, exercise, trainPlan, warrior, mobility, seated, breath, hike, elder, ancestral), life-stage (family, intimacy, pregnancy, diabetes, sleep), and systems (sovereignty, membership, community, budget, admin, vault, map, journey, seasonal, forage, ceremony, swaps, frequencies, pairings, minerals, hydration, filters, sugarMeal).

Many use a **tab-selector pattern**: a row of pills where selected = `{background: sectionColor, color: #F4EDDF, border: sectionColor}` and unselected = `{background: #FFFFFF, color: #5C564A, border: #E3D8C2}`.

### Trust & accessibility surfaces

- **a11y** — 11 independent toggles (see state table). Not a settings afterthought; a first-class screen.
- **privacy** / **dataSov** — honest data-residency disclosure with an explicit designed-fiction note where the prototype's infrastructure claims are aspirational rather than real. **Keep that disclosure.** If real infrastructure exists at build time, replace it with the truth — never delete it and leave the claims bare.
- **sources** — the source library. Every codex volume and evidence tier traces back to a listed source with its topic and evidence grade.

---

## Interactions & Behavior

- **Route transition:** `rs-fade` 0.35s ease on enter. No exit animation.
- **Back:** circular 34px button, top-left. On dark headers: `rgba(15,13,10,0.62)` fill with `inset 0 0 0 1px rgba(244,237,223,0.28)`. On light: `#EDE4D2` fill, `#2A2620` glyph. Glyph is `‹` at 17px.
- **Toasts:** logging any item raises a toast with an action link (`toastLabel` / `toastTo`), typically "View" → history. Toast copy must stay honest about what was actually recorded.
- **Bottom sheets:** `rs-sheet` enter. Used for the AI Council composer and the note editor.
- **AI Council:** FAB opens a composer with a **real text input**; submissions route on keywords to the relevant knowledge surface. Not a canned-response mock.
- **Generators:** recipe generator, plate scan report, and smoothie builder all compute from actual state. No hardcoded outputs.
- **Chip/pill toggles:** immediate visual state change, no confirmation step.
- **Trackers:** hydration increments toward 9 cups with a percentage fill bar; ferment jars advance day counters against a target.

---

## Accessibility Requirements

This app treats accessibility as product surface, not compliance overhead. Carry all of it across.

**Verified:** WCAG 2.2 AA across all 80 routes at the time of audit, zero failures. Non-text contrast (1.4.11) specifically verified for region-card counts, dish-origin lines, and prep-matrix durations using `#67604F` and `#7E5124` on sand.

**Requirements:**
1. **Contrast** — all pairings above are AA-verified. If you change any color, re-verify. `#67604F` and `#7E5124` on `#F4EDDF` are the tested minimums; don't lighten them.
2. **Reduced motion** — honor the OS setting *and* the in-app toggle.
3. **Touch targets** — 44px minimum. Circular controls are 34px visually and must carry an expanded 44px hit area.
4. **11 accessibility toggles** — high contrast, colorblind-safe (**on by default**), plain language, dyslexia-friendly type, reduced motion, low-bandwidth, offline mode, voice control, captions, elder mode, dark mode.
5. **Labels** — every icon-only control needs an accessible label. The prototype sets `aria-label` on back buttons; extend to every icon control.
6. **Text scaling** — support the platform's dynamic type. **Known gap:** 200% zoom reflow was never resolved in the prototype and is the one outstanding structural item. Native dynamic-type support in a real framework should address it, but verify at 200% before shipping.
7. **Screen reader order** — tier badges carry meaning. Announce label text, never color alone.

---

## Content & Editorial Rules

These are not style preferences. They are the product's reason for existing, and breaking them is a correctness bug.

1. **Never relabel a dish to suit a diet.** Traditionally vegan, plant-forward tradition, adapted from a meat/dairy original, postcolonial reclamation, and contemporary innovation are five distinct labels. Diaspora food is never labelled "veganised."
2. **Grade every health claim** and name the preparation studied. Extract-based trial evidence does not transfer to a culinary serving. Anything below a small human trial is "preliminary."
3. **"Documentation gap" is a valid, required answer.** Where research does not exist, say so rather than generalising a tradition into place.
4. **Traditional use is knowledge, not a safety clearance.** Both go on the card.
5. **Safety-critical ingredients always carry their warning tier** — cassava (cyanogenic glycosides), ackee (hypoglycin A in unripe fruit), kidney beans (phytohaemagglutinin: soak, discard water, hard boil 10+ min), wild mushrooms (no photo ID, ever, under any circumstances), sprouts, sea moss (iodine), soursop leaf (neurotoxicity). No recipe surface may omit the fix.
6. **Prohibited claim words, app-wide:** detoxifying, cleansing, immunity-boosting, fat-burning, disease-reversing. No exceptions by ingredient or by cultural standing.
7. **Oral rehydration solution is a clinical formulation.** A homemade electrolyte drink is never presented as a substitute.
8. **Name the specific tradition** — Trinidadian doubles, Mauritian dholl puri, Durban bunny chow, Guyanese seven curry. Never generic "curry."
9. **Name colonialism where it happened.** "Cultural exchange" is the wrong phrase for requisitioned grain and segregated dining rooms.
10. **Restricted ritual knowledge stays out.** Publicly documented culinary custom only.
11. **Attribution and compensation are content.** Where a knowledge-holder community is unpaid or under-documented, the card says so.

---

## Assets

- **Fonts:** Spectral and Hanken Grotesk (Google Fonts, open license). Bundle them rather than loading remotely on mobile.
- **Icons:** all custom inline SVG in the prototype — 5 tab icons, the 7-node AI Council network mark, and assorted section glyphs. Stroke 1.4–2px, round caps and joins, `currentColor`-compatible. Extract paths from the prototype; there is no external icon dependency.
- **Imagery:** none. All texture is CSS — diagonal `repeating-linear-gradient` stripes, radial gradients, and circular border ornaments. Crop cards use pattern fallbacks by design (offline-safe). If real photography is introduced, keep the pattern fallback for the offline bundle.
- **Offline bundle:** the prototype ships a 1.6 MB standalone offline build with pattern fallbacks intact.

---

## Files in This Bundle

| File | What it is |
|---|---|
| `Rooted Strength.dc.html` | The full prototype — all 86 screens, all content data, all logic. The primary reference. |
| `Rooted Strength offline.html` | Self-contained offline build (1.6 MB), pattern fallbacks intact. |
| `support.js` | Prototype template runtime. **Reference only — do not port.** |
| `research/` | The source PDF corpus the content was written from: 2 regional codices (Afro-Italian, Afro-Indian Ocean) and 7 ingredient codices (grains, legumes, mushrooms, teas, beverages, microgreens, encyclopedia). Consult these for provenance questions or before altering any factual claim. |

---

## Suggested Build Order

1. **Shell + navigation + tokens** — app surface, tab bar, FAB, back behavior, the full token set, and both themes. Get `rs-fade` and reduced-motion right here.
2. **The tier badge system** — `evTier`, `claimTier`, `clsTier` as one shared component. Used on hundreds of surfaces; getting it right once saves the most work.
3. **Data layer** — port the definition arrays as structured data, copy verbatim. This is the bulk of the content and it is where fidelity matters most.
4. **Codex screens** (`codex`, `codexRegion`, `pantryCodex`, `pantryVol`) — highest content density, most reused layout patterns, and they validate the badge system and the data shapes at once.
5. **Onboarding + consent + a11y** — establishes the profile state that filters everything downstream.
6. **Today + Nourish cluster** — the daily-use core, including the three generative surfaces.
7. **Remaining Explore surfaces** — largely repetitions of the tab-selector and detail patterns established above.
8. **Accessibility pass** — full audit at 200% type scale, screen reader, and every one of the 11 toggles.
