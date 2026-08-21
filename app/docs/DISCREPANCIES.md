# Discrepancies found during implementation

Things where the handoff contradicts itself, or where the source data has a
defect. Nothing here was resolved silently — each item says what the build does
and what still needs an editorial decision.

The handoff names `Rooted Strength.dc.html` as **"The primary reference"**, so
where the README's summary tables disagree with the prototype's actual code the
prototype wins by default — except where an explicit editorial decision has
overridden that, as in item 1 below. The README states *"Every value in this
document is the actual value used in the prototype"*; that is not true in the
cases here.

---

## 1. Dish classification labels — **RESOLVED: README wording adopted**

The README and the prototype named these differently. The prototype's wording
shipped first; the README's has since been adopted by editorial decision.

| key | shipped now (README) | was (prototype) |
|---|---|---|
| `vegan` | Traditionally vegan | *(unchanged)* |
| `forward` | Plant-forward tradition | Traditionally plant-forward |
| `adapt` | **Adapted from a meat/dairy original** | Adaptation |
| `recon` | **Postcolonial reclamation** | Diasporic reconstruction |
| `diasporic` | Diasporic innovation | *(unchanged — see below)* |
| `contemp` | Contemporary innovation | *(unchanged)* |

Two of these changes say more than the prototype's did. `adapt` now names what
the dish was adapted *from*, which serves Content Rule 1 more directly than a
bare "Adaptation". `recon` now names a political act rather than a culinary one.

**`diasporic` keeps the prototype's wording — and the set is six, not five.**

The README lists only five classifications and omits this one. That is an
omission in the README, not a conflict to be resolved by reclassifying the dish
that uses it. **Settled: do not squeeze that dish into one of the five.**

The key is in live use on one dish, in the Afro-Asia volume:

> **Chinese-Jamaican soy cooking** · Jamaica
> Cantonese and Hakka contract migrants brought soy sauce into Jamaican pots.
> Documented 19th-century diaspora fusion — not ancient exchange.

None of the README's five is true of it:

| label | why it does not apply |
|---|---|
| Traditionally vegan | a technique entering a cuisine, not a dish that was always plant-based |
| Plant-forward tradition | says nothing about plant-forwardness |
| Adapted from a meat/dairy original | nothing was adapted from a meat original |
| Postcolonial reclamation | **factually wrong.** Chinese indenture to Jamaica began in 1854; Jamaica became independent in 1962. This is colonial-period migration, and "reclamation" misdescribes indentured labourers' cooking |
| Contemporary innovation | explicitly 19th-century. The volume's `contemp` entry is *Mushroom adobo*, which genuinely is modern |

Forcing it into any of them would break two of the rules the product exists to
uphold: never relabel a dish to suit a frame (Content Rule 1), and name
colonialism where it happened (Content Rule 9). Calling colonial-era indenture
cooking "postcolonial reclamation" is precisely the error Rule 9 warns against.

"Diasporic innovation" describes it accurately. **The canonical vocabulary is
six labels.** If the README is ever revised, it is the README that should gain
the sixth — not this dish that should lose its accurate one.

Layout note: "Adapted from a meat/dairy original" is 35 characters in a `nowrap`
badge. Verified at 393px and at elder scale (1.18x) across every region carrying
the label — no horizontal overflow; dish titles wrap to two lines beside it.

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

## 5. `cropProfiles.coconut` was defined twice — **RESOLVED: merged**

`cropProfiles` contained two different `coconut` entries. JavaScript silently
kept the later one, so the first had never rendered anywhere in the app. Both
were real editorial writing; neither was simply better.

They are now one entry. Each field was taken **whole and verbatim** from one of
the two — no sentence-level blending, so every line remains exactly as an editor
wrote it:

| field | from | why |
|---|---|---|
| `botanical` | live | keeps the vernacular *kokonut · coco*, and avoids colliding with baobab's "tree of life" twelve lines below |
| `origin` | live | centres the diaspora and names specific traditions (Bahia, Garifuna, Gullah Geechee, Trinidadian toolum) |
| `body` | dead | more precise, and carries the whole-food/moderation caveat |
| `grow` | dead | actionable — salt tolerance, years to first fruit, who to buy from |
| `dishes` | dead | names the country per dish (Rundown/Jamaica, oil-down/Grenada), per Content Rule 8 |
| `contested` | dead | surfaces the saturated-fat disagreement instead of resolving it, which is the Codex's stated method |

Verified field-by-field against both originals: every value is byte-identical to
one of them. The `cropProfilesShadowed` export has been removed — nothing is
orphaned any more.

TypeScript catches a duplicate key in an object literal, so this class of defect
cannot silently recur in this file.

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

## 10. The seed state pairs a goal with a band its own onboarding cannot produce — **fixed**

The prototype's seed carries `obGoal: 'muscle'` and `freqBand: 'grounding'`.
Those two cannot coexist in any state the prototype itself can reach: choosing a
goal in onboarding writes the band from the goal,

```js
freqBand: this.goalFreqMap[g.id] || 'grounding'
```

and `goalFreqMap.muscle` is `'building'`. `'grounding'` is only correct as the
*pre*-onboarding default.

**Why it is reachable.** The welcome screen offers **"Skip for now — explore
first"**, which goes straight to Today without running the goal handler. A user
who takes it keeps both seeded values, and the nutrient-frequencies screen then
states:

> Your goal — Muscle growth — tunes you to **Building**.

with **Grounding** selected and Grounding's foods listed underneath. The screen
announces a personalisation in one sentence and contradicts it in the next
control down.

**Build uses:** `freqBand: 'building'` in `src/data/initialState.ts`, with the
reasoning at the key itself. The invariant is that the seed must satisfy
`freqBand === goalFreqMap[obGoal]`.

`teaGoal` looks like the same problem and is not: the seeded `'energy'` differs
from `goalTeaMap.muscle` (`'recovery'`), but nothing derives `teaGoal` at
onboarding — it changes only when the user presses "For your goal, start with
…". Seed and goal disagreeing there is a state a real user can be in, so it is
left alone.

### Left for the owner to decide

On the skip path the app addresses the user as though they had chosen a goal —
"Your goal — Muscle growth" — when they explicitly declined to answer. The
seeded `obGoal` is the prototype's demo default, and it feeds the Move hub, the
tea suggestion and Today as well, so changing it is a product decision rather
than a bug fix. Flagged rather than changed.

---

## Not a discrepancy, but carried forward

The README's known gap — **reflow at 200% zoom was never resolved** — has since
been closed. Every screen was verified at 200% text scale and at a 320px
viewport: no horizontal scrolling, no clipped content. See the Reflow section of
the app README for what changed and the one visible trade-off it introduced.
