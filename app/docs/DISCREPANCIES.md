# Discrepancies found during implementation

Things where the handoff contradicts itself, or where the source data has a
defect. Nothing here was resolved silently — each item says what the build does
and what still needs an editorial decision.

The handoff names `Rooted Strength.dc.html` as **"The primary reference"**, so
where the README's summary tables disagree with the prototype's actual code, the
prototype wins. The README states *"Every value in this document is the actual
value used in the prototype"* — that is not true in the cases below.

---

## 1. Dish classification labels differ, and it changes what is claimed — **needs a decision**

This is the one that matters editorially. The README names five classifications:

> Traditionally vegan · Plant-forward tradition · **Adapted from a meat/dairy
> original** · **Postcolonial reclamation** · Contemporary innovation

The prototype's `clsTier` map has six, with different wording:

| key | prototype label | README label |
|---|---|---|
| `vegan` | Traditionally vegan | Traditionally vegan |
| `forward` | Traditionally plant-forward | Plant-forward tradition |
| `adapt` | Adaptation | Adapted from a meat/dairy original |
| `recon` | Diasporic reconstruction | Postcolonial reclamation |
| `diasporic` | Diasporic innovation | *(absent)* |
| `contemp` | Contemporary innovation | Contemporary innovation |

"Diasporic reconstruction" and "postcolonial reclamation" are not synonyms —
one describes a culinary act, the other a political one. Likewise "Adaptation"
is silent about *what* was adapted from, where the README's phrasing states it.

Given Content Rule 1 ("Never relabel a dish to suit a diet… five distinct
labels"), which wording ships is an editorial call, not a build-time one.

**Build uses:** the prototype's six labels, verbatim, in `src/data/tiers.ts`.

## 2. Evidence tiers: the README lists 4, the prototype has 10

The README's `evTier` table covers `well`, `strong`, `moderate`, `historical`.
The prototype also defines `emerging`, `trad`, `oral`, `contested`, `spiritual`
and `contemporary` — all six are in active use by the codex data, so the
README's table is a subset, not the spec.

One tier also has different colours:

| tier | README | prototype |
|---|---|---|
| `historical` | bg `#F0E3D2` fg `#7E5124` (brown) | bg `#E9EADC` fg `#4C5340` (sage) |

**Build uses:** all ten prototype tiers with the prototype's colours. Both pass
AA in light and dark (`npm run contrast`).

## 3. The fifth tab is "Journey", not "Progress"

The README's shell diagram says the tabs are *Today · Nourish · Move · Explore ·
Progress*. The prototype renders **Journey**, routing to `journey`. `progress`
is a separate route reached from the Today card.

**Build uses:** Journey.

## 4. Tab bar active colour

The README says *"Active tab is tinted with its section color; inactive is
`#67604F`"*. The prototype's helper is `at = t => t ? '#1E3A2B' : '#6E6757'` —
a single forest active colour for all five tabs, and a slightly different
inactive grey.

**Build uses:** the prototype's values, as `--forest-tab-active` and
`--tab-inactive`. Section colours are still used for card stripes and chips,
where the README's description does hold.

## 5. `cropProfiles.coconut` is defined twice — **needs a decision**

`cropProfiles` contains two different `coconut` entries. In JavaScript the later
one silently wins, so the first has never rendered anywhere in the app. They are
genuinely different copy — different botanical subtitle, different origin
paragraph, different dish list:

- **first (dead):** "Cocos nucifera · the tree of life" — Indo-Pacific origin,
  Zanzibar to Trinidad, rundown / oil-down / rice and peas
- **second (live):** "Cocos nucifera · kokonut · coco" — Bahia's Coconut Coast,
  Garifuna, Gullah Geechee, Trinidadian toolum

**Build uses:** the live (second) entry, matching prototype behaviour exactly.
The dead entry is preserved in `cropProfilesShadowed` in `src/data/content.ts`
rather than deleted — it is real editorial copy, and which of the two should
survive is a content decision.

## 6. Route count: 86 or 80?

The README says the app spans **86 routes**, and its route list does contain 86.
The accessibility section says AA was verified *"across all 80 routes"*. Either
six routes were added after the audit, or the audit covered everything and the
number is stale. Worth confirming before the AA claim is repeated anywhere
user-facing.

**Build uses:** 86 routes in `src/nav/routes.ts`.

## 7. `macros` / `micros` in the data are dead placeholders

`content.ts` exports static `macros` and `micros` arrays (640 kcal, 34 g protein,
iron 38%…). The prototype never renders them — it recomputes both from the
detected food set, and so does this build (`src/state/selectors.ts`). The static
arrays are kept only because they came across with the rest of the data.

They are worth deleting once someone confirms nothing else expects them. Leaving
them in place is a mild hazard: they look like real report values.

## 8. The smoothie builder recommended an ingredient it had just hidden — **fixed**

The prototype's low-protein verdict was a hard-coded string:

> "Light for recovery — pea protein or **silken tofu** as the base would lift it
> toward ~30 g."

On a soy-free profile the same screen hides silken tofu, names it in the
"ingredients hidden by your profile" line — and then recommends it two
paragraphs later. Verified live before the fix.

**Build uses:** the suggestion is now drawn from the bases the profile actually
permits, highest-protein first (`sbVerdict` in `src/state/kitchen.ts`). A
soy-free, nut-free profile now reads "pea protein or pumpkin seed".

## 9. Restock messages reported "0 servings" and "1 servings" — **fixed**

Two wording defects in the prototype's pantry toasts:

- `pantryUnits` has no serving count for some items (plantains are `0`), so
  restocking one announced "Plantains restocked — **0 servings** back in the
  pantry".
- No pluralisation, so a single-serving item read "**1 servings**".

**Build uses:** `servings()` and `restockMessage()` in `src/state/kitchen.ts`.
Zero-count items now read "Plantains added to the pantry", and singular counts
read "1 serving".

---

## Not a discrepancy, but carried forward

The README's known gap — **reflow at 200% zoom was never resolved** — is real and
still open. Type scaling works via the `--scale` token and elder mode exercises
it, but long layouts have not been verified at 200%. This is stated on the
in-app accessibility screen rather than quietly omitted.
