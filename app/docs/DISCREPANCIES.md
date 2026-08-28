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

### The wider problem behind it — **now fixed, see §13**

---

## 11. The pregnancy flow's footer button was never actually fixed — **fixed**

PR #7 fixed percentage heights that resolved against nothing, and said the fix
covered "every onboarding step, the recap, and the pregnancy flow — all of which
use the same pattern." The first two were right. The pregnancy flow was not, and
the claim went unverified because nobody looked at the screen.

They do not use the same pattern. `ObScreen` renders its full-height flex column
**directly** under the route wrapper, which has a real `height: 100%`, so its
`minHeight: '100%'` resolves. `PregnancyScreen` wrapped the identical column in
`<Screen>` — and `Screen` is a plain div with no height at all:

```jsx
<div style={{ animation: ..., paddingBottom: pad }}>
```

So the percentage fell back to `auto`, the column collapsed to its content, and
all **four** `flex: 1` spacers — one per step of the flow — distributed nothing.
Continue sat directly beneath the chips with most of the frame empty below it.

**Build uses:** `PregnancyScreen` no longer wraps in `<Screen>`; it renders its
column directly, mirroring `ObScreen`, with `Screen`'s bottom padding folded into
its own so the button still clears the tab bar.

The general lesson is the one from the breathwork disc: a percentage height needs
an unbroken chain of resolved heights above it, and adding one wrapper anywhere
in that chain silently breaks it with no error and no visual clue except the
layout being wrong.

## 12. Two spellings of the same feature on one screen — **fixed**

The accessibility header read "**Colour**-blind-safe encoding …" six rows above a
toggle labelled "**Color**-blind-safe charts". The toggle label is prototype
content and byte-identical by rule, so the header — which is our prose, not the
prototype's — was brought into line with it.

Code comments keep British spelling; they are not user-visible.

---

## 13. The app claimed a goal the user never chose — **fixed**

§10 fixed the contradiction on one screen. The cause was wider: the seeded
`obGoal` is a demo default, and six surfaces described it as the user's own
answer. Take "Skip for now — explore first" and the app tells you things you
never told it:

| screen | said |
|---|---|
| Nutrient frequencies | "**Your goal** — Muscle growth — tunes you to Building." |
| Move hub | "**Built for** Muscle growth", plus a secondary focus you never picked |
| Tea intelligence | "**For your goal**, start with Training recovery" |
| Today | tonight's cup titled by that goal, "Brewed **by goal**" |
| Journey hub | the goal echoed back as part of your profile |
| Profile | "Goal: Muscle growth" — under a heading reading *Every answer* |

The onboarding recap had it too: skip the goal question and the recap still
reported a goal.

### The fix

State now records whether a goal was actually chosen. `obGoalSet` is `false` in
the seed and set `true` in exactly one place — `pickPrimary` in ob2, the only
code path where a person picks one. "Skip for now" does not go through it.

The distinction that matters is between **computing** and **claiming**:

- `obGoal` stays a computation default, so Move still has a session to offer,
  the protein target still has a value, and nothing is empty or broken.
- Nothing describes that default as the user's answer. Each surface now says
  what it is doing and offers the goal question: "No goal set — starting from
  Grounding. **Set a goal** to tune it."

`freqBand` reverts to `'grounding'`, the neutral opening band. §10 set it to
`'building'` to match the seeded goal, which was right while that goal was
treated as real; with the goal correctly marked unchosen, the neutral band is
the honest value. The invariant `freqBand === goalFreqMap[obGoal]` still holds
from the moment ob2 records a choice.

Verified both ways: with no goal set every surface says so, and with a goal
recorded the original personalised copy returns unchanged.
---

## 14. One screen had no `h1` — **fixed**

Found while auditing every control and link in the app. Most screens take their
header from `DarkHeader`, which renders the title as an `<h1>`. The Foodways
Codex hub builds its own header instead and rendered "Foodways Codex" as a plain
`<div>`, so that route had **no `h1` at all** — a screen reader jumping by
heading found the volume names but never the name of the screen they belong to.

Measured rather than inferred. Counting tags in the source suggested a handful of
screens might be affected; rendering all 86 routes and counting `h1` elements in
the DOM showed it was exactly one:

```
before   exactly one: 85 | none: 1 (codex) | more than one: 0
after    exactly one: 86 | none: 0 | more than one: 0
```

**Build uses:** an `<h1>` in `CodexScreen`, carrying `margin: 0` — the only
property an `h1` changes that a `div` does not. The re-rendered screenshot is
**pixel-identical** to the one before the change, so this is semantics only.

Worth knowing: the source-grep estimate was wrong in the direction that would
have caused unnecessary edits to six screens that were already correct.

**Now enforced.** `npm run h1` renders all 86 routes through `react-dom/server`
and exits non-zero on any route with zero or more than one `h1`. It runs in CI
alongside the contrast audit. Both failure directions were proven before it was
wired up: reverting the codex `h1` to a `div` fails the route by name, and adding
a second `h1` fails it too.

---

## 15. Generated imagery, and the two lines drawn around it

The app shipped with no images at all - the striped gradient headers were
explicitly photo stand-ins. 37 images were generated to fill them: 28 plates, 4
training families, 5 tradition foodways stills.

**An image is a claim.** This product's whole position is that it does not state
what it cannot support, and a picture asserts as much as a sentence. The models
do get it wrong: the first pass rendered fregola in place of millet, pinto beans
in place of cowpeas, and one model returned green garden peas for black-eyed
peas outright. Prompts now name grain sizes explicitly, and every image carries a
visible **Illustration** mark plus a fuller screen-reader sentence. They are
offered as illustrations, never as photographs of the dish.

**Nothing figurative for the five warrior traditions.** Zulu, Agojie, Maasai and
the Kalenda and capoeira lineages are real, living peoples. A synthetic
photograph of them would fabricate a depiction of identifiable groups and invite
exactly the romanticised-warrior framing the Move hub already disclaims. Their
images are foodways stills - grain, root, oil, matting, earth - and they sit
inside the existing **Warrior fuel** band, where the foods are what the screen is
already talking about. Placing one as a hero image for the tradition itself would
not have been true; placing it under the fuel is.

**Training imagery shows the tool, not the body.** A generated hip hinge can
easily show a rounded spine, and this app prescribes movement to elders and
postpartum users. A picture that teaches the wrong shape is worse than no
picture, so the four training images carry the setting - spade, watering cans,
chair, floor mat - and the written cues carry the form. The one figurative
attempt also never came back from safety review.

**Weight.** Raw output was 330 MB across 37 files, 4-10 MB each. Resized to 900px
wide and re-encoded as webp they total **2.1 MB**, a 99% reduction, still 2x what
any device renders.

---

## 16. Codex dish illustrations, and what the description field could not be trusted for

The Foodways Codex now carries an illustration on each of its **78** dish cards.

**It is 78, not 132.** The earlier figure counted `n/p/cls` entries across the
whole of `content.ts`; 54 of those are ingredient entries in `pantryVols`, the
Pantry Codex, which is a different surface. Only `codexRegions` holds dishes.

### Prompts could not be built from the data verbatim

The `d` field is editorial prose written for a reader, not a shot list, and two
kinds of sentence actively fought the prompt:

- **Animal products.** Thieboudienne's description opens "The national
  rice-and-fish dish." Passing that through would have asked for fish in the same
  breath as forbidding it, on a plant-based app's screen.
- **Provenance commentary.** Fatta's reads "A legume-and-root broth version is an
  adaptation - it should not be presented as the historical dish." Instructing an
  image model not to present something as historical is meaningless, and faintly
  absurd given what the sentence is about.

Both classes are filtered out, and dishes left with nothing visual were written
by hand from the dish itself. Where a dish is classified `forward` or `adapt`,
the image shows the **plant version**, because anything else would contradict the
classification printed beside it.

### The mapping is generated, not derived

`src/data/dishImages.ts` is emitted by script and keyed on `regionId|name`, not
on the name alone. **Dholl puri appears twice** - once in the Afro-Asia volume and
once in indenture - and they are separate cards. Slugifying the name in
TypeScript would have collapsed them into one image.

A separate check re-parses `content.ts` from scratch and confirms all 78 dishes
resolve to a file, with no orphan entries and no orphan images. It also guards
against unescaping drift, which matters because the names carry accents and curly
apostrophes.

### Weight

694 MB of raw output became **1.7 MB** at 520px webp - these are thumbnails at
92px tall, not headers, so they are encoded narrower than the plate images.
Total imagery across the app is now 115 files, 4.0 MB.

The illustration note is stated **once per region**, under the "N dishes
profiled" heading, rather than stamped on all 78 cards.

---

## 17. The Pantry Codex is illustrated unevenly, on purpose

41 of the Pantry Codex's **54** entries now carry an illustration. The other 13
are deliberately bare, and that unevenness is the point: it is how the volume
shows, at a glance, which of its entries are ingredients and which are cautions
and concepts.

Unlike the Foodways Codex, this volume is not a list of things. Three kinds of
entry cannot honestly carry a picture:

**Concepts and clinical guidance** - "Gluten-free framing", "Oral rehydration
solution", "Blending vs. whole fruit", "Juice and satiety", "Microgreen vs.
sprout", "Concentration vs. contribution", "Vitamin D2 from UV". There is simply
no subject to photograph.

**Hazard warnings** - "Shiitake dermatitis", "Golden oyster spore load", "Wild
foraged mushrooms", "Sun tea", "Fungicide-treated seed". Here an image would
work directly against the text it sits beside. A handsome photograph of wild
mushrooms above the words "do not forage these" is worse than no photograph:
it is an argument for the thing the card is warning against.

**A declared gap** - "Diaspora mushroom foodways" carries the `gap` tier. The
entry *is* the absence of documentation. Illustrating it would manufacture
presence in the one place the app explicitly says it has none, which is the
failure this product exists to avoid.

`pantryImage()` returns `null` for all 13 and the card renders without an image.
The null is a decision, recorded in the module, so that a later pass does not
read it as a missing asset and "fix" it.

### Two false positives from the safety filter

"African rice (Oryza glaberrima), unmilled with a reddish-brown bran layer" and
"Cucurbit microgreens" were both refused as `nsfw`. Both are plainly botanical.
Rewording without the botanical binomials cleared them. Noted because it will
happen again to anyone regenerating these.

### Weight

350 MB of raw output became **0.72 MB** at 520px webp. Total app imagery is now
**156 files, 4.9 MB**.

---

## 18. The verification pass, and what it found

All **147** food images - 28 plates, 78 codex dishes, 41 pantry specimens - have
now been reviewed one by one against the claim their card makes. Sections 15 to
17 each shipped with the caveat that this had not been done; it has.

Method: labelled contact sheets, 12 images to a sheet, each cell captioned with
the dish or entry name and its place or botanical binomial, so the image is
judged against the text the app actually prints beside it.

**143 of 147 were correct.** Every failure was one systematic error, and the
errors clustered in a way worth recording.

| image | claimed | actually showed |
|---|---|---|
| `plate-jollof` | millet | fregola-sized pellets |
| `plate-sorghumbowl` | sorghum | uniform white pearl couscous |
| `plate-sorghumbowlsf` | sorghum | uniform white pearl couscous |
| `dish-pelau` | rice and pigeon peas | granular, read as ground meat |

### The pattern

The model renders **small African grains as pearl couscous** whenever they are
cooked and plated. The same grains as raw specimens were near-flawless: the
fonio and teff pantry stills show correctly minuscule grain, and the whole
sorghum specimen is properly tan with a visible germ. Naming the botanical
binomial and describing grain scale in millimetres is what made the difference,
and the regenerated plates borrow that technique.

The codex dishes also outperformed the recipe plates. Real named dishes -
Waakye, Koshari, Beyaynetu, Koki, Seven curry - give the model strong priors.
The invented recipe combinations do not, and that is where the grain errors are.

### Fixes

All four were regenerated with explicit grain-scale language and negative
constraints, and replaced in place under the same filenames.

- **Sorghum**: genuinely fixed. Uniform white spheres became tan grains with
  visible darker germ marks.
- **Pelau**: fixed. Distinct long rice grains, pigeon peas and pumpkin, no
  ground-meat read.
- **Jollof**: improved but **not perfect**. The grain is finer and more granular
  than the fregola it replaced, but still slightly coarser than true pearl
  millet. Recorded honestly rather than claimed as fixed.

### Two things the review noticed but did not change

- `pantry-hibiscus` and `pantry-turmeric` contain small herbarium-style label
  cards with text, despite "no text" in the prompt. They read as specimen tags
  rather than errors.
- The codex thumbnails crop 16:9 sources to roughly 3.4:1, which is aggressive
  for dishes photographed in a bowl.

The **Illustration** marks stay regardless. A verified illustration is still an
illustration, not a photograph of the dish.

---

## 19. Greens, and why the six places get no storefront

**17 greens.** Every microgreen variety now carries a tray still, shown as a
banner under the variety screen's `DarkHeader` rather than replacing it - the
eyebrow, title and flavour note are printed on that gradient and would have been
lost.

### The places are a different problem

The six places are **named businesses**, each with a distance and a map pin. The
screen states "distances below are the real figures", and the Explore screen
carries a band saying ownership tags "come from the business". The app is telling
the user these are real and findable. There are no addresses, URLs or phone
numbers behind them, which says placeholder.

A photoreal storefront is the wrong image either way:

- If the businesses are **invented**, a facade makes them look findable, and
  someone may go looking for a shop that does not exist. That is a fabricated
  record, not a decoration.
- If any are **real**, a synthetic facade misrepresents premises whose owners
  never agreed to it - and several are tagged Black-owned, family-run or
  Indigenous-owned, which makes getting it wrong worse, not better.

So the six illustrate the **kind** of place: crates of produce, a pot on a stove,
a family table, a farm-stand table, kelp drying on racks, raised beds. **No
signage, no shopfront, no building exterior, no people.** They say what sort of
place this is without asserting that a particular building stands anywhere. They
replace what was a purely decorative colour dot in the list row.

### Also found: 46 dead remote image URLs

`cropPhotos` and `photos` in `content.ts` hold **46 CloudFront URLs** from a
generation run on 2026-07-30. Neither export is imported by any screen, so
nothing hotlinks to an external CDN today.

> **Update.** These were initially left in place on the grounds that `content.ts`
> is prototype-verbatim. That was the wrong call - the verbatim rule protects
> *copy*, and these are dead infrastructure. They are removed in section 22.

### Three images regenerated to remove text

`green-pea` carried a legible "BOTANICAL FIELD GUIDE" book, and
`pantry-hibiscus` and `pantry-turmeric` carried herbarium-style label cards, all
despite "no text" in the prompt. Regenerated clean.

### A fourth safety false positive

"Wooden crates of produce ... yams, collard greens, sweet potatoes" was refused
as `nsfw`. That makes four across this work, all on plainly botanical or
grocery subjects. Rewording clears them.

Total app imagery is now **179 files, 6.4 MB**.

---

## 20. The last sixteen headers - land, not labour

The 10 Foodways Codex regions and 6 Pantry Codex volumes now carry photographic
headers through `PhotoHeader`, which keeps the striped gradient underneath as its
fallback. These were the last striped stand-ins in the app.

### Region headers show land, never people

Three of these volumes - **African American**, **Indenture** and **Afro-Italy** -
are about coerced and exploited agricultural labour. Afro-Italy's own subtitle
reads "gastrofascism, the harvest fields", which points at the exploitation of
African farm workers in southern Italy today.

A header full of figures working a field would romanticise precisely what the
text beneath it exists to name, and the Move hub already commits the app against
that: *"Present-day sovereignty and skill - never romanticized labor."*

So every region header is the **agro-ecology the volume describes** - the crop,
the soil, the water, the terrace - and carries no figures at all. Lowcountry is
tidal marsh and cypress; Indenture is a flooded paddy; Afro-Italy is dry-stone
terraces and olives. What the land grew, not who was made to grow it.

### Volume headers

Straightforward arrangements of what each volume covers: bowls of the six
cereals, bowls of the legumes, four distinguishable mushroom species, dried
infusion botanicals, a row of plant drinks, trays of microgreens.

### Every image reviewed

All 16 checked on contact sheets before wiring, same method as section 18. All 16
correct, geographically distinct, no people, no text.

Total app imagery is now **195 files, 7.6 MB**.

> **Correction.** This section originally claimed every striped photo stand-in in
> the app had been filled. That was wrong when written - three remained, on the
> crop profile, restaurant order and blood-sugar meal screens. They are dealt
> with in section 21, which is what actually makes the claim true.

---

## 21. The last three, and a correction

Three striped stand-ins survived section 20's sweep: the **crop profile** header,
the **restaurant order** header and the **blood-sugar meal** header. Section 20
claimed the job was finished before it was; that claim is now corrected in place.

**14 crop profiles** show the plant growing - cowpea vines in flower, oyster
mushrooms shelving on a log, baobab pods on the branch, teff in highland terraces.
That keeps them distinct from the Pantry Codex, where several of the same species
appear as the dried ingredient. A cowpea in the field and a bowl of dried cowpeas
are two different claims, so they are two different pictures.

**The three restaurants reuse the place stills.** They are the same businesses as
three of the six places - `ital`, `coop`, `abuela` - so `restaurantImage()` maps
to the existing files rather than generating near-duplicates. The reasoning from
section 19 carries over unchanged: no storefront, no signage.

**One dish** for the blood-sugar meal screen, and it failed the same way
everything with cooked sorghum in it has failed. The first attempt rendered pearl
couscous again **despite the prompt explicitly forbidding it by name**. It took
describing the grain as "cooked wheat berries or barley - irregular tan-and-russet
kernels with a darker germ mark" before the model produced sorghum. That is now
three separate occasions where this specific substitution had to be beaten out of
it; anyone regenerating a cooked-grain image should expect to fight it.

### A fifth safety false positive

A bunch of plantains on the plant was refused as `nsfw`. Five now, all on plainly
botanical or grocery subjects.

Total app imagery is **210 files, 8.9 MB**, and **there are now no striped photo
stand-ins left anywhere in the app** - verified by grep, not by assumption.

---

## 22. The 46 dead CloudFront URLs are gone

`cropPhotos` (14 URLs) and `photos` (32 URLs) have been removed from
`content.ts`. **52 lines deleted, nothing added.**

### Why remove rather than leave

Section 19 left them alone because `content.ts` is prototype-verbatim. On
reflection that rule protects the **copy** - the dish descriptions, the tier
notes, the contested-history paragraphs, all the text the app must not
paraphrase. A map of image URLs is not copy, it is dead infrastructure, and
keeping it carried three specific risks:

1. **It invites re-wiring.** The exports look usable. A future pass could
   connect them in good faith and reintroduce a hard dependency on an external
   CDN that can 404, rate-limit or disappear, in an app whose imagery is
   otherwise entirely local.
2. **Three of them are storefronts.** The `coop`, `ital` and `abuela` entries are
   facade images for businesses the app lists as findable premises with real
   distances - exactly what sections 19 and 21 argue the app must not assert.
3. **They are already superseded.** Every surface those URLs covered now has a
   reviewed local image under `public/media`.

### How it was verified

Confirmed unused before touching anything: neither name appears in any import
list anywhere in `src`. The one `photos` match elsewhere is an unrelated consent
flag. Removal is bounded by brace matching rather than line numbers, and asserts
46 URLs present before and 0 after.

The diff is **pure deletion** - 46 URL lines plus the two declarations and their
braces. No copy was removed, and no line was added.

`content.ts` goes from 2,293 to 2,241 lines. All four gates green, and the app
renders unchanged.

---

## 23. The "Your days involve" control was not a dropdown

On the first onboarding step (`ob1`), "Your days involve" rendered as a plain
`<div>` containing the text **"Farm & garden work, 3 days/week"** and a chevron.
It had no click handler, no options, no state behind it, and was not a button -
so it was not focusable, not keyboard reachable, and carried no ARIA.

Two defects, and the second is the serious one:

1. **It did not open.** It looked interactive and was inert.
2. **It asserted an answer nobody had given.** "Farm & garden work, 3 days/week"
   was displayed as though the user had chosen it, in an app whose
   `initialState` already documents the opposite discipline for goals:

   > `obGoal` / `obGoal2` are COMPUTATION DEFAULTS, not the user's answer.
   > Nothing may describe them as "your goal" until ob2 records a real choice and
   > sets `obGoalSet`.

   That rule is honoured in nine places across the app. This control broke it.

### The fix

`obDayDefs` in `content.ts` carries seven options - the old sample value is now
one of them rather than a fabricated answer. `obDays` and `obDaysSet` follow the
`obGoal` / `obGoalSet` pattern exactly, and `obDays` has **no default at all**.
The control reads **"Not set"** in muted ink until the user picks.

It is now a real disclosure listbox: a `<button>` with `aria-haspopup`,
`aria-expanded` and `aria-controls`; a `role="listbox"` of `role="option"`
buttons carrying `aria-selected`; 44px minimum touch targets; and Escape to
close. Verified in the browser - opens, lists seven options, records the choice,
closes on select, updates the label, persists `aria-selected` on reopen, and
closes on Escape.

### What this fix does NOT do

**Nothing consumes `obDays`.** The answer is recorded and nothing reads it.

The "Why we ask" copy beneath the control says *"physical labor counts as
training - plans adjust so you're not overworked on farm days."* **No plan
adjusts.** That copy was there before this change and is prototype-verbatim, so
it has not been rewritten here, but it is now a promise the app visibly collects
an answer for and does not keep - which is more conspicuous than when the control
was inert.

**Resolved in section 24** - `obDays` now feeds the Move hub.

---

## 24. obDays wired into Move - and the two things it must not touch

`obDays` now reaches `state/move.ts`. A `WORK_LOAD` map grades the seven ob1
answers into heavy / moderate / light / variable, gated on `obDaysSet` exactly as
the goal is gated on `obGoalSet` - an unanswered question is not an answer, and a
stale `obDays` value with `obDaysSet: false` is verified to leak nothing.

**What it changes.** When work is heavy *and* the goal is strength-shaped
(muscle, strength or farming stamina), the hub's matching session steps down from
another heavy lift to mobility, and says so in a note naming the work pattern.
That is the adjustment ob1's copy promises: *"plans adjust so you're not
overworked on farm days."*

### The two things it deliberately does not touch

**It does not touch `moved`.** That counts real logged sessions. Crediting
assumed work days as logged training would invent entries the user never made,
and would have the Move hub romanticising labour on the one screen that promises
*"never romanticized labor."*

**It does not lower the elder Minimum effective dose.** The 2-a-week figure sits
directly under a cited claim - 3-8% muscle loss per decade, resistance training
the only proven reversal - and **manual work is not resistance training**.
Shovelling and carrying do not supply progressive loading. "You farm, therefore
one session is enough" is a health claim this app cannot support, and it would be
made on the very screen citing evidence for the opposite. Heavy work changes how
much **more** the app asks for, never the floor underneath it. Verified: with
`obDays: farm5` the elder screen still measures against the 2-a-week minimum and
the load note does not appear there.

### Verified across four states

| state | result |
|---|---|
| heavy work + strength goal | steps down to mobility, note shown, `moved` unchanged |
| light work (desk) + same goal | no step-down, no note |
| heavy work, elder screen | minimum intact, evidence intact, no note leak |
| `obDaysSet: false` with a stale `obDays` | nothing leaks |

### Found while verifying: the "Today's session" card is hardcoded

The dark **"Today's session - 42 min - Farm-Strength: Push & Carry"** card on the
Move hub is static JSX. It follows neither the goal nor the work load, so a user
whose goal is Mobility has always been shown Farm-Strength there. That predates
this change, but this change made it visible: the first draft of the load note
said "this leads with mobility" while that card still said Farm-Strength.

The note now describes only what actually changed - the matching session - rather
than the whole screen. **The hardcoded card is fixed in section 25**, where the
claim that it would require inventing data turned out to be wrong.

---

## 25. The Today's session card, and a name I invented

Section 24 said fixing the hardcoded "Today's session" card would mean inventing
duration and movement-count data for sessions that have none. **That was wrong.**
The data already existed - it was just duplicated as literals across the session
screens. `sessionMeta` in `content.ts` now holds it once, keyed by route, every
value copied verbatim from the `SessionButton` already on that screen.

The card, its detail line and the log button beneath it now all follow
`goalRoute`, so the hub agrees with itself. Previously a user whose goal was
Mobility was shown "Farm-Strength: Push & Carry" as today's session regardless.

### A name that did not exist

While wiring this I found that section 24's own deload path set the offered
session to **"Mobility & recovery"** - a name that appears nowhere in the app. The
real session at that route is **"Mobility & joint reset"**. I invented a session
name in the change that was meant to make the app more honest, and the card fix
surfaced it only because the card started rendering that label in a second place.
Corrected; there are now zero occurrences.

### Two routes have no session, and stay that way

`trainPlan` and `pregnancy` are plan and guidance screens with no single session
behind them, so they are **absent from `sessionMeta` on purpose**. The eyebrow
degrades from "Today's session "·" 12 min" to plain "Today's session" and the detail
line does not render, rather than a duration being made up. Verified with
`obGoal: 'recomp'`, which routes to `trainPlan`: no duration appears and no stale
"42 min" leaks through.

### Verified

| state | result |
|---|---|
| heavy work + strength goal | card, button and log control all read "Mobility & joint reset "·" 12 min" |
| goal routing to `trainPlan` | name shown, **no duration invented** |
| all defaults | unchanged - "Today's session "·" 42 min", Farm-Strength, "No goal set" |

The Farm screen's own `SessionButton` is untouched: naming the farm session on the
farm session screen is correct.

---

## 26. Figurative movement photography in the Farm-Fitness Library

The six movements in the Farm-Fitness Library - shovel lift, loaded shovel press,
water carry, wheelbarrow push, compost turning, harvest squat - now carry
photographs of **Black and Afro-Indigenous people performing them**, at the
owner's direction.

This reverses section 15's decision to keep training imagery non-figurative. That
reversal is right, and the original reasoning is worth restating precisely: the
objection was never to depicting people. It was that a generated hip hinge can
show a rounded lumbar spine, and this app prescribes movement to elders and
postpartum users. Representation and form-safety are not in tension - they just
both have to be handled.

### So every image was inspected for form before it shipped

- **Shovel lift** - checked at zoom. Spine long and flat through the hinge, hips
  back, chest open. Correct.
- **Loaded shovel press** - ribs down, no exaggerated lumbar arch.
- **Water carry** - upright torso, shoulders neutral. A textbook loaded carry.
- **Wheelbarrow push** - flat back, lean from the hips, arms straight.
- **Compost turning** - checked at zoom, being the riskiest (loaded rotation).
  Back long and flat, staggered stance, hips and shoulders turning together.
- **Harvest squat** - **regenerated twice.** The first attempt hid the body behind
  a basket so no squat was visible at all - it did not depict the movement it
  labelled. The second was an asymmetric squat with a raised rear heel, which does
  not match the "quads, glutes, ankles" the card says it trains. The third is a
  symmetric deep squat, both heels flat, spine neutral.

### The picture is not the authority

The list carries a note - *"Illustrations of each movement. The written cues
govern form, not the picture."* A generated image must not be what a user copies
when loading their spine, however carefully it was checked.

### Framing

Card images render at 168px rather than the 116px used elsewhere. At 116 the
overhead press was cropped through the hands, which defeats the point of that
movement. Figures need more vertical room than plates and specimens do.

### Scope

This covers the **Farm-Fitness Library** specifically. The other six session
types are done in section 27.

---

## 27. Session photography for the remaining six Move sessions

Mobility, elder, seated, ancestral, hike and breath now carry photographs of
**African American people**, styled up: fine knits, tailored trousers, silk
headwraps, good outerwear, all in the app's own clay, ochre, forest and cream
palette. Age, gender, body and personal style vary deliberately across the six -
late twenties through early seventies, four women and two men, twists, locs,
silver natural hair, a headwrap - rather than one archetype repeated.

### Form review changed one of them

**`mobility` was regenerated.** The first attempt was a deep backbend with the
head dropped back. Not dangerous, but the session is labelled *"12 min,
joint-friendly"* and that pose oversells the intensity to somebody with the joint
problems the session exists for. It is now a supine figure-four with head and
shoulders resting down - unmistakably gentle, which is what the label promises.

**`elder` and `seated` are the safety-critical two** and both passed. Elder shows
a sit-to-stand with one hand resting on the chair arm, upright and stable rather
than frail. Seated shows an upright chair-supported row, feet flat, spine neutral,
which matches that screen's own copy: *"a full circuit that never asks you onto
the floor."*

### Ancestral stays contemporary on purpose

`ancestral` shows a present-day person moving barefoot in contemporary dress. It
is deliberately not a costumed reenactment, and the screen itself is the reason:
directly beneath the image it lists *"Warrior lineages drawn on - Zulu, Maasai,
Dahomey, Capoeira, Taino, Garifuna."* The rule from the tradition imagery holds
unchanged - do not fabricate documentary depictions of a living tradition's
practitioners. A modern person training is a different claim from a staged
lineage photograph.

### Placement

Each image sits **below** its `DarkHeader` rather than replacing it, because the
eyebrow, title and lede are printed on that gradient. Each carries the same note
as the Farm-Fitness Library: *"The written cues govern form, not the picture."*

6 images, 0.24 MB. App imagery is now **222 files, 9.7 MB**.

---

## 28. The warrior traditions now show people

The five warrior traditions carry practitioner photographs, at the owner's
direction. This reverses the rule sections 15 and 19 were built on - that nothing
figurative would be generated for Zulu, Agojie, Maasai, capoeira or kalenda.

The reversal is the owner's call to make, and there is a real argument for it:
depicting Black and Indigenous people everywhere in the app **except** in their
own traditions is its own kind of erasure.

### The original objection is preserved in how these are made

Every image shows a **contemporary practitioner performing the drill the app
actually prescribes** - the endurance run, the obstacle climb and sandbag carry,
the ginga, the tall-spine vertical jump, the stick figure-eight flow. The screen
already says these traditions are "adapted for modern training", so a modern
person training is what the screen is genuinely about.

What they deliberately are **not** is staged historical reenactment. No shields,
no spears, no shuka, no beadwork, no invented regalia or insignia. Fabricating
ethnographic documentation of Zulu regiments, the Agojie or Maasai ceremony was
the original objection and it still stands - a synthetic photograph of a real
people's ceremony is a claim nobody can back. Depicting somebody training today
is not that claim.

Two of the five are living practices shown as they are actually practised:
capoeira in white abada trousers in a modern roda, and kalenda worked with a
training stick to a drummer in a yard. That is documentation of a present-day
practice, not an invented past.

### Each image is carried by the screen's own text

| tradition | image | the drill beneath it |
|---|---|---|
| Zulu regiments | three runners, loose formation, modern kit | "Long barefoot-style run" |
| Agojie | two women, obstacle wall and sandbag carry | "Wall / obstacle climb-over" |
| Capoeira | ginga, low and springy, modern roda | "Ginga (base sway)" |
| Maasai-derived | tall-spine vertical jump, minimal knee bend | "Vertical pogo jumps" |
| Kalenda | stick figure-eight to a drummer | "Stick figure-8 flows" |

The Agojie image is the clearest case: two women doing hard conditioning today
honours women warriors without costuming anybody as one.

### The note does the disambiguating

Under every image: *"Contemporary practitioners training these traditions today -
not a historical depiction."* Without that line the Zulu runners sit directly
above a paragraph about amabutho and could be misread as a depiction of them.

The foodways stills stay exactly where they were, in the Warrior fuel band. Both
images follow the selected tradition.

App imagery is now **227 files, 10 MB**, 17 of them depicting people.

---

## 29. Hub imagery for Today, Journey and Nourish

The three tab hubs carry a photograph each, continuing the direction set for the
Move surfaces - African American people, styled up, in the app's own palette.

- **Today** - a woman at the kitchen counter in early morning light, water and tea
  to hand, microgreens on the counter. An unhurried start rather than a
  performance.
- **Journey** - a man in his sixties writing in a cloth-bound journal beside a
  seedling. The record kept over time, which is what the Growth Journal is.
- **Nourish** - three generations passing greens, grain, beans and plantain
  across a shared table, faces partly out of frame. It sits directly under the
  screen's own line: *"Feed a body that can carry, create and serve."*

### Hubs only, and the scan flow is why

The sub-screens were initially left alone: Progress, History, the profile recap,
the recipe generator, and the whole scan flow. **The owner subsequently asked for
them - see section 30**, where the risk below is handled by subject choice rather
than by omission. They show the
**user's own record**, and a generated photograph there competes with their data
instead of supporting it.

The scan flow is the sharpest case and the reason the rule is worth stating. It
walks the user through photographing their own meal and then reports on what that
plate carries. A generated plate sitting inside that flow could be read as **their
scan result** - a claim about their food that nobody made. Verified by
screenshotting the scan screen alongside the three hubs: it still shows only the
empty capture frame.

Each hub image carries the same note as elsewhere: *"Illustration, generated - not
a photograph."*

App imagery is now **230 files, 11 MB**.

---

## 30. Sub-screen imagery, and keeping it out of the user's own plate

The eight Journey and Nourish sub-screens now carry imagery too. Section 29 left
them bare over a specific hazard; the owner asked for them, so the hazard is
handled in **what the pictures are of** rather than by refusing.

### Nothing in the scan flow is a plated dish

That flow photographs the user's own meal and then reports on it. A finished
plate sitting anywhere inside it could be read as **their scan result** - a claim
about their food nobody made. So:

| screen | its own copy | the image |
|---|---|---|
| Photograph a meal | - | the **act** of photographing; food soft in the lower frame |
| What we think we see | "Nothing is counted until you say it belongs on the plate" | hands sorting **separate** components on a board |
| What else went in? | "A photo cannot see oil, broth or salt" | oil being poured into a pan |
| What this plate carries | "Totalled from the 8 components you kept" | a working kitchen mid-cook, components at different stages |

The middle two ended up carrying their screen's argument better than planned. The
copy says a photograph cannot see oil, and the picture is oil going into a pan.
The copy says nothing counts until you say it belongs on the plate, and the
picture shows components deliberately not on one.

### A different note for those four

The scan-flow screens carry **`SCAN_NOTE`** - *"Illustration, generated - not your
photo."* - rather than the usual "not a photograph". On those four screens the
confusion worth foreclosing is not whether the image is a photograph. It is
whether it is **the user's** photograph.

### The Journey three

Progress is somebody lacing training shoes - the ordinary repetition of showing
up. History is hands turning a well-used journal beside two filled ones. Profile
is a man weighing a decision, which is what "What it all changes" asks of you.
None depicts data.

App imagery is now **238 files, 11 MB**.

---

## 31. Kitchen screens - meal plan, pantry, grocery and the input flows

Six screens, not the three named: meal plan, pantry and grocery list, plus **Plan
grocery list**, **Scan a barcode** and **Add by voice**, which are sub-screens of
the same two areas.

### Each shows the activity, not an inventory

The pantry screen tracks the user's real stock and draws it down as plates are
logged - *"17 in stock, 4 running low."* An idealised full-shelf photograph above
that could be read as **their** shelf. The image is instead somebody mid-restock,
gaps on the shelf, jars still in a crate below: a pantry being **kept**, not a
pantry being claimed.

The same logic runs through the rest - planning the week, shopping from a list,
writing a list from the plan, logging a jar, speaking an item. Activities, not
stock displays.

### Two regenerations

**Grocery list** was regenerated twice over. The first version had visible
signage - chalkboard prices, "ARTISANAL" on a crate - despite the prompt
forbidding it, and more seriously the background figures read as white, which
breaks the instruction that everybody in these images be African American. The
replacement has him alone in frame with no lettering anywhere.

Two others simply **failed** on submission - not a safety refusal, just a failed
job - and went through on retry. Worth knowing that plain failures happen and are
not always a content problem.

### A mistake worth recording

The first batch went out with a placeholder in one slot: model `"nash"`, prompt
`"placeholder"`. It was rejected by the API rather than silently generating
something wrong, but it was my error in composing the batch, and the pantry image
had to be submitted separately as a result.

App imagery is now **244 files, 11 MB**.

---

## 32. Deepening the 28 recipes without editing a word of them

All 28 plate recipes now carry three added sections - **Before you start**, **How
you know it is right**, and **Keeping it**.

### It is a new file, and content.ts is untouched

README rule 3: *"Copy is not edited. content.ts is verbatim. Several passages are
worded precisely to avoid claiming more than the evidence supports."*

Deepening therefore had to mean **adding**, never rewriting. The new material
lives in `src/data/recipeDepth.ts`, and `git diff` confirms `content.ts` has not
changed by a single character. Every existing eyebrow, ingredient line, step,
swap and attribution is exactly as it was.

### What was added, and what deliberately was not

Each entry adds craft that follows from what the recipe already asserts: prep
that the ingredient list implies (soaking, pressing, pickling, batch-cooking a
slow grain), doneness cues the steps leave unsaid, and storage.

Two things were **not** added, and the omissions matter more than the additions:

- **No second set of nutrition numbers.** The kcal, iron and fibre figures are
  claims, and inventing more of them would be exactly the failure this app
  exists to avoid. Verified: the depth file contains no `kcal`, `g` or `mg`
  figures at all.
- **No new provenance.** History stays where it belongs, in each recipe's own
  `attrib` line, which is already worded carefully - jollof's says the dish is
  *"a labeled vegan, millet-based adaptation - not the original dish."* Nothing
  added here touches that.

### Nothing restated

Several recipes already carry their pivotal technique inside the steps: *"so it
never splits in the pot"*, *"the air is what makes akara light"*, *"file off the
heat, never boiled"*. Those are not repeated in the cues. The added lines cover
what the steps leave out.

### Verified

28 recipes, 28 depth entries, no missing and no orphans. Section order renders as
Ingredients, Before you start, Method, How you know it is right, Keeping it,
Swaps, What this dish actually is - with all four original sections intact.
Checked on two different plates to confirm the depth is per-recipe and jollof's
lines do not leak onto akara.

> **This section covered only the 28 plate recipes.** Sixteen other preparations
> in the app had no method at all and were missed. They are done in section 33.

---

## 33. The sixteen preparations that had no method at all

Section 32 deepened the 28 plate recipes and stopped there. That was an
incomplete reading of "all the recipes throughout the app". Sixteen other things
the app tells you to make had **no method whatsoever**:

- **8 microgreen salads** - a `mix` line naming the components, and nothing about
  how to build one
- **5 smoothies** and **3 kid smoothies** - a `base` line listing what goes in,
  and nothing about what goes in *first*

For a smoothie the blend order is most of the technique. Sea moss gel has to
disperse into the liquid before anything else joins it; pineapple goes last. For
a shoot salad the whole question is when the dressing lands, because dressed
shoots have minutes. None of that was anywhere.

### Two lines each, not a wall of text

These render as compact list cards, so depth is a **build** line and a **keeps**
line rather than the three-section treatment the plate recipes got. Anything
longer would have buried the cards.

### Same restraint as section 32

New file, `src/data/prepDepth.ts`; `content.ts` untouched. No nutrition figures -
the smoothies already carry protein and kcal and those are claims. And no
extension of the reasoning already in each item's own line: the salads' `mix`
field says *why* each is built as it is - "vitamin C unlocks the iron",
"mucilage and sulforaphane slow the curve" - and those are evidence-tiered
elsewhere. Nothing added here restates or stretches them.

**Mama & Baby** carries "clear herbs with your midwife" in its own line. Nothing
added there touches herbal guidance, and that line was checked as still present
after the change.

### Verified

16 items, 16 depth entries, no missing and no orphans, no nutrition figures in
the file. Confirmed in the browser that all 8 salads render both new lines with
their original `mix` text intact.

---

## 34. The intake form's first question could not be answered

"Your name" on ob1 was a `<div>` containing the literal string `Amara`. Not an
input. You could not type your name into the intake form.

This is the same failure as the days dropdown in section 23 - a control that
looks like a form field, is not one, and displays an answer nobody gave - but it
reached further, because the name was hardcoded as a JSX literal in **four**
separate places:

| file | what it printed |
|---|---|
| `Onboarding.tsx` | the ob1 field itself, a div |
| `Onboarding.tsx` | the onboarding recap row |
| `Journey.tsx` | the Journey profile recap row |
| `Today.tsx` | `Good morning,<br />Amara` |

Every user of this app was greeted by somebody else's name every morning, with no
way to change it.

### The fix

`obName` is state now. The ob1 field is a real `<input>` with a linked `<label>`,
`autocomplete="given-name"` and a 44px target, and all four sites read from state.

'Amara' remains in `initialState` as **seeded demo data** - the same status as the
fourteen days of logs and the plate streak that ship with it. The distinction that
matters is that it is now a value the user can change rather than a literal
baked into four screens.

Anything rendering it handles the empty string: the greeting degrades to plain
"Good morning" with no dangling comma, and both recap rows read "No name set",
matching how the goal recap already reports an unanswered question.

### Left alone deliberately

`familyDefs` contains a household member with `id: 'amara'`. That is a separate
persona in the family feature, not the user's own name, and it stays.

One seeded council message opens "Morning, Amara." It is historical demo content
in `initialState`, not a live greeting, so it does not follow the name. Worth
knowing if the seed is ever swapped for a real user.

---

## 35. Apothecary imagery, and the two that needed deciding

All twelve Apothecary guides carry an image. Nine share the `TabbedGuide`
component, which took one optional `image` prop rather than nine edited bodies.

This is the herbal section, so two of the twelve were decisions rather than
prompts.

### Supplement swaps shows food, not pills

The screen argues *"what the tub is selling, and what a bulk-bin staple does
instead."* The image is whole foods laid out - pumpkin seeds, hibiscus, brazil
nuts, sea moss, greens, dried mushrooms, lentils - with **no pills, capsules or
supplement packaging anywhere in frame**. A picture of capsules would have argued
the opposite of the text above it.

### Living with diabetes shows a life, not a remedy

The screen's own copy is the reason: *"Whole-food eating changes glycemic control
measurably. It also changes what your medication is doing - which is why this
screen keeps pointing at your clinician."*

So the image is a man at his own table over collards, beans and rice,
mid-conversation. **No pills, no glucose meter, no clinical equipment, and no
herbal remedy.** This app must not imply that a herb treats a diagnosed
condition, and on the one screen that explicitly defers to a clinician an image
suggesting otherwise would contradict it directly.

### Nothing depicts an effect

None of the twelve is a before-and-after, and none shows a remedy producing a
result. The evidence tiers and caution flags on these screens do that work in
words, and a photograph must not outrun them. The note under every image says so:
*"Illustration, generated - not a photograph, and not evidence of an effect."*

App imagery is now **256 files, 12 MB**.

---

## 36. Process depth for the Apothecary, and the line it holds

Every one of the 107 Apothecary guide items carried a `why` - what it is, what it
is for, evidence-tiered - and **no `how` at all**. `apothecaryDepth.ts` adds the
process to **73** of them. Separate file; `content.ts` untouched.

### Culinary process is written in full

Fermentation was named specifically and got the most detail, because here the
detail is the safety:

- **Kraut** - 2% salt by weight, 20g per kilo, 18-22C, seven to fourteen days.
  And the rule that actually matters: *everything must stay under the brine*. A
  flat white film is kahm yeast and can be skimmed; fuzzy or coloured growth means
  discard the jar and **do not scoop around it**.
- **Ginger beer and sorrel** - bottled ferments build real pressure. Burp daily,
  refrigerate once lively, and use a plastic test bottle as the gauge.
- **Garum** - 4% salt and 55-60C held for weeks, with an explicit instruction not
  to cut the salt to taste, because the salt and the warmth are what keep it safe.
- **Yogurt** - 110F, eight to twelve hours, scalded equipment, and discard if it
  smells yeasty rather than cleanly sour.

A kraut above the brine is a hazard, not a stylistic failure, so these numbers are
stated rather than gestured at.

### Herbal process is technique only

The nervines and adaptogens get **method and nothing else**: covered infusion
versus decoction, why a lid keeps what an open cup loses, why a root or a woody
fungus needs forty-five minutes of simmering rather than a five-minute steep.

**There are no doses and no frequencies anywhere in the file.** Ashwagandha,
motherwort, mugwort and passionflower are pharmacologically active and carry
documented interactions; each entry's `watch` points back at the caution flags and
at a clinician. A method note must not quietly become a prescription, and on this
screen that is a very short distance to travel.

### Thirty-four items are deliberately bare

- **"Working with care"** in the diabetes guide - meds needing adjustment, testing
  frequency, what to bring to a visit. Clinical guidance, not mine to instruct.
- **"Remission"** in the same guide, for the same reason.
- **Rationale items** throughout - "Live cultures for the gut", "Fat that carries
  vitamins", "Provision-ground economy". Reasons and history, not things you make.

Cultural practices - libation, the grater as family memory - are described as what
the practice **is**, never as instructions for performing someone's tradition.

### Verified

107 items, 73 entries, **all 73 matching an item name** - two keys initially did
not match and rendered nothing until corrected. Every clinical item confirmed
bare. Confirmed in the browser that the kraut submersion rule, the kahm-versus-
mould distinction and the bottle-pressure warning all reach the screen.

---

## 37. The app called you Amara after you had renamed yourself — **fixed**

PR #35 made the intake name a real input stored in `obName`, and the Today
greeting and profile rows followed it. Two surfaces did not.

The seeded council thread opened `"Morning, Amara."` with the name baked into
the string, and `familyDefs` carries a member `id: 'amara'` that is **not a
separate persona — it is the user**: the seeded `obName` is that member's name
and `obPronoun` matches it.

So someone who typed their own name at intake was still greeted as Amara by the
Council, and still saw Amara listed as the household's training adult.

The greeting now carries a `{name}` token that resolves to `", <name>"` when a
name is set and **disappears entirely** when it is not, so a user who skipped
the question gets "Morning." rather than an empty comma. The household row
follows `obName` the same way.

---

## 38. Six farm-movement cards opened the same exercise — **fixed**

All six cards in the farm-movement grid navigated to one hardcoded screen.
Tapping **"Compost turning"** or **"Water carry"** showed shovel-lift
instructions, while the breadcrumb and heading claimed the exercise that had
been tapped.

On a training screen that is not a cosmetic bug: the setup, the cues and the
mistakes all belonged to a different movement from the one named at the top.

State gained `exMove` to record which card was tapped, and `moveDepth.ts` gained
`exerciseDetail` — six entries carrying pattern, title, meta, setup, cues,
mistakes and breathing. The screen falls back to the shovel lift when no
selection is present, so arriving without one behaves exactly as before.

**The shovel lift entry is the original copy, moved rather than rewritten.** Its
setup sentence, four cues, four mistakes, meta line and breathing line are the
strings that were already on the screen.

---

## 39. Eight fields were written in `content.ts` and reached no screen — **fixed**

A sweep of every array export against every screen that maps over it found
fields the data defined and nothing ever read. `content.ts` is verbatim, so
none of these were edited; the screens were changed to read what was already
there.

**One of them could have misled someone with an allergy.** The restaurant fit
check tested only `has`:

```js
const clash = !!(m.has && blocked.includes(m.has));
if (clash) { flagCount++; ... } else fitCount++;
```

Abuela Verde's **Tostones** carries `allergen: true` and `tags: ['Shared
fryer']` with **no `has` field**, so it was never a clash and always counted as
a fit. A user with a nut allergy was told:

> 7 dishes · **nothing here clashes with your profile**

while a shared-fryer dish sat on the screen. A cross-contamination caution is
genuinely not the same as an ingredient clash — but saying "nothing here
clashes" while one is displayed is the overclaim. The fit line now distinguishes
the two, and the order card shows the source's own tag wording rather than a
paraphrase of it.

The other seven were content rather than safety: `sovSystemDefs.stat` (the
quantified half of eight health claims), `forageItems.warn` (three safety
lines), `codexRegions.labourT` / `labourB` (a whole band each, on who did the
work), `cropMeta.uses` (fifty-one lines on what to do with a crop once cut) and
`cropMeta.pair`.

### Verified

Every fix confirmed in the running app, not by typecheck alone. The Abuela Verde
menu now reads "7 dishes · no profile clashes · 1 carrying an allergen caution".

---

## 40. The intimacy screen hid its own evidence tiers — **fixed**

All four cards on the sexual-vitality screen carry an `ev` tier and the screen
rendered only the name and the description. The card's top row was already
`justifyContent: space-between` **with a single child**: the badge slot had been
built and left empty.

The effect was that "Sleep — well established" and "Traditional tonics —
traditional use" looked identical, on the one screen where that distinction
carries the most weight.

`vitalityFoods` — six foods, each with its own tier — was exported from
`content.ts` and imported by nothing at all. The screen named the mechanisms
(minerals, sleep, circulation, safety) and never named a food.

Both now render. Two of the six are herbs rather than foods, so the section
closes on the same `HerbCaution` the Apothecary uses rather than a softer one
written for this screen.

---

## 41. Pea Microgreens states the ranges rule and breaks it — **carried, explained beneath**

The card's `body` reads:

> High in plant protein and BCAAs, **~397 mg/100g amino acids**

Its `contested` line, on the same card, reads:

> Microgreen nutrient figures vary by variety and method; **the Atlas cites
> ranges, not single numbers.**

That `contested` line is the only place in `content.ts` where the ranges rule is
written down, and the card that states it is the card that breaks it, to three
significant figures.

It is also the wrong order of magnitude for its own sentence. 397mg per 100g is
0.4g per 100g, and pea shoots carry a few grams of protein per 100g. The figure
cannot be the protein content that the first half of the same sentence calls
high. It is readable as **free** amino acids — the unbound fraction, a real and
different measurement — but nothing on the card marks the difference.

This is the same failure as the moringa iron card in item 42: a defensible
number, framed so that it means something it does not.

`content.ts` is verbatim, so the card stands. `data/cropDepth.ts` adds a
"Reading the figure" note under the four crop cards that state a number, saying
what each figure measures and in what form of the food. **Cowpea is included
although its figure is sound** — per cooked cup, hedged with a tilde. A note
that only ever appears under a mistake would teach that a figure is a warning
sign; the standard is worth naming where it is met.

**Still needs an editorial decision:** whether `body` should eventually say
"free amino acids", or drop the figure. Both would require editing `content.ts`.

---

## 42. The Atlas disagreed with itself about moringa — **carried, explained beneath**

The iron card in the health surfaces reads:

> Moringa (**28mg iron per 100g — nearly 4× the RDA**)

The arithmetic is right and the framing is not. 28mg per 100g is **dried leaf
powder**, and nobody eats 100g of it — a heaped tablespoon is around 7g, which
is closer to 2mg. Comparing a per-100g figure for a powder against a daily
requirement makes a spoonful sound like a day's iron.

The app already holds itself to the opposite standard. Its own Pantry Codex
volume lists **"per-gram vs. per-serving honesty"** as a principle, and the
Mineral atlas gives moringa as "about 1–2mg a tablespoon". The card and the
atlas disagree, and the atlas is the honest one.

Worth recording that the **crop** card is better hedged than the health card:
it says "dried leaf", "gram for gram" and "up to", none of which the iron card
says.

`data/healthDepth.ts` corrects the impression beneath the card rather than
repeating it.

**Still needs an editorial decision:** the iron card's wording.

---

## 43. Baobab carried two different multipliers — **gated**

| where | claim |
|---|---|
| `freqBandDefs` (Nutrient Frequencies) | baobab, **"Six times"** the vitamin C of oranges |
| `cropProfiles` (crop atlas) | baobab, **"around 10×"** the vitamin C of oranges |
| `sourceLibrary` | "baobab 10× vitamin C" |

A reader who opened both screens saw the app disagree with itself by two thirds.
Two of the three say ten, so six is the outlier — though six is also the more
conservative reading of the same evidence, and the honest summary is that
baobab pulp is *several* times an orange rather than a settled multiple. The
depth note now says exactly that, and names the app's other figure rather than
quietly picking a side.

`scripts/claims.mjs` is the gate that would have caught it. It reads every
multiplier claim in `src/data` and keys it by **(subject, nutrient,
comparator)**. The subject is load-bearing: keying on nutrient and comparator
alone would flag two *different* foods both compared against spinach for iron,
which is not a contradiction at all.

The subject is taken from the nearest preceding `name:` **or `title:`** field.
That second field matters — looking for `name:` alone walked back past the whole
source library into the mineral list and filed a moringa/baobab claim under
**"Iodine"**, which is exactly how a real disagreement hides: two figures for
one food, filed under two subjects, never meeting.

Because `content.ts` is verbatim, a contradiction already written into it cannot
be fixed at source, only explained underneath. Known disagreements sit on an
explicit `ACKNOWLEDGED` list, and each entry must name where its reading note
lives. It is a ratchet rather than an amnesty — it fails when a disagreement is
not listed, when a listed one has **stopped** disagreeing, when a listed claim
no longer exists, and when a promised depth note is missing.

### Verified

All four failure paths were tested by deliberately breaking them and confirming
a non-zero exit, then restored. A gate that cannot fail is not a gate. Wired as
`npm run claims` and confirmed running in CI as a fifth step, not only locally.

---

## 44. Four exports that nothing imports

Item 7 recorded `macros` / `micros` as dead placeholders. A sweep for the same
class across every export found four more, none of them reachable from any
screen:

| export | what it holds |
|---|---|
| `matrixDims` | four wellbeing dimensions — Physical, Mental, Emotional, Spiritual — each with a percentage, a colour, a `feeds` line and a week of activities |
| `plantWeek` | thirteen plants with ids; reads as a plant-diversity tracker, which the gut-health depth already tells people to aim for |
| `vitalityFoods` | six foods with evidence tiers — **now rendered, see item 40** |
| `_MO` | twelve month abbreviations; a vestigial helper |

`vitalityFoods` had an obvious home on an existing screen and was wired up. The
other three do not: `matrixDims` and `plantWeek` would each need a screen that
does not exist, which is a product decision rather than a gap to fill, and `_MO`
has nothing to render.

**Still needs an editorial decision:** whether the wellbeing matrix and the
plant-diversity tracker are features, or whether the data should go.

### Verified, and two corrections to the sweep itself

The first run of that sweep reported six dead exports, six broken image paths
and 196 unreachable media files. **Almost all of it was wrong**, and the
corrections are worth recording because the same mistakes are easy to repeat:

- `menuCoop` and `menuAbuela` are assigned to a restaurant's `menu:` field
  *inside* `content.ts`. Counting references only outside that file called two
  live menus dead.
- The six "broken" paths came from pairing a slug map with the wrong prefix.
  There are exactly **three** places a media path is built: `base()` in
  `media.ts`, `'/media/dish-'` in `dishImages.ts` and `'/media/pantry-'` in
  `pantryImages.ts`. Handling only the first called 168 live files orphans.
- A naive string-literal scan breaks on `"Lion's Mane"` — the apostrophe
  swallows the following quote. That one string has now broken two separate
  tools written months apart.

After the corrections: **364 media files, all 364 reachable; no broken paths; no
dead routes.** The `Lion's Mane` slug key was byte-compared against
`content.ts` in passing — both straight apostrophes, so that lookup does not
silently fall back to an oyster illustration.

---

## 45. Five links named a source and delivered all sixty-six — **fixed**

The same shape as item 38, found by looking for that shape deliberately rather
than by reading screens.

Four links in `MoveDetail.tsx` and one in `Restaurant.tsx` read
**"Source: &lt;title&gt; →"** and all five called `go('sources')`, which lands on
the undifferentiated 66-entry library. Tapping *"Source: Nature Immersion"* gave
exactly the screen that *"Source: Elder Plant-Based Fitness"* gave, with nothing
recording which of the sixty-six had been named.

All five name real `sourceLibrary` entries, but four are abbreviated on the
button, so each link now carries the **full** title rather than its own label:

| the link says | the entry is |
|---|---|
| Source: Nature Immersion | Nature Immersion **as Anabolic Medicine** |
| Source: Nervous-System Frequencies | **Nutritional Frequencies for** Nervous-System **Regulation** |
| Source: Ancestral Movement & Ritual | Ancestral Movement, **Dance** & Ritual |
| Source: … T2 Diabetes | Plant-Based Strategies for **Type 2** Diabetes |
| Source: Elder Plant-Based Fitness | *(exact)* |

**The library is not filtered down to the named entry.** The other sixty-five
are the point of a library, and hiding them would answer a question nobody
asked. The entry is marked, scrolled to, and can be cleared.

The mark is announced as text — "The source you followed" — rather than carried
by the border alone, which is the rule the tier badges already follow.

The other six `go('sources')` links are generic ("See the source library"), and
they now **clear** the focus. Without that, a mark left from an earlier visit
would highlight an entry the user had not asked for on a generic arrival.

### Verified

The finder was proved before it was trusted. `nav_dupes.py` looks for a `.map()`
that navigates without recording which item was tapped — the item 38 shape. Run
against the pre-fix `Move.tsx` (`8d1188a94^`) it reports the farm-movement
defect; run against current `main` it reports none. A checker that has only ever
returned "clean" has not been shown to work. A second pass, for hardcoded
sibling links rather than mapped ones, is what surfaced these five.

Confirmed in the running app: the abbreviated label marks the full title, a
generic arrival clears a stale mark, Clear works, and there is no overflow at
200% text.

Worth recording that the first browser check reported the marker missing and was
wrong — the CSS uppercase transform meant a case-sensitive search for the label
did not match what `innerText` returns.

---

## 46. A dish could only declare one allergen — **fixed, and gated**

Item 39 was `menu.allergen` never being read. This is the same screen and the
same kind of harm, from the other direction: `has` could not hold what the dish
already said out loud.

The restaurant fit check read a single value:

```js
const clash = !!(m.has && blocked.includes(m.has));
```

`has` is one string. A dish containing two allergens declared the first and said
nothing about the second.

The co-op's **Ginger-Tamari Braised Tofu** is that dish. Its `has` is `'soy'` —
which it genuinely contains, through both the tofu and the tamari — while its
own description reads *"Hot-bar tray · scallion, **sesame oil**"*.

### What the user was told

Confirmed in the running app before anything was changed, with soy-free **off**
and sesame-free **on**:

> 6 of 7 dishes fit your profile · 1 flagged below

The tofu was among the fits and carried an add-to-order button, with the word
*sesame* printed on the same card. Afterwards:

> 5 of 7 dishes fit your profile · **2 flagged below**
> off your profile · **contains sesame**

The label names the allergen that actually clashed rather than whichever one
`has` happens to hold — with two blocked, the old code would have named the
wrong one.

### The fix

`content.ts` is verbatim, so `has` cannot become an array. `data/menuDepth.ts`
carries the second allergen and `state/kitchen.ts` checks all of them.

Nothing in that file is inferred about what a kitchen might do. Every entry is
an allergen the app's **own text** — dish name, description or tags — already
names. Guessing that a stew "probably" contains something would be inventing a
safety claim, which is worse than the gap being closed.

### The gate

`scripts/allergens.mjs` compares the allergens each dish names in its own text
against what it declares, and fails on either side of the ledger:

- a dish that **names** an allergen nothing declares
- a **stale over-declaration** — an id that is not a menu dish, or an extra
  allergen the dish's text no longer supports

Over-declaring is not the harmless direction. It flags food as unsafe for
someone who could have eaten it, and this app's rule is that a restriction never
makes something vanish without saying why.

**The word list is deliberately narrow and the file says so.** It catches an
allergen the app has already written down and failed to declare. It cannot know
what a kitchen actually does, and it does not guess.

### Verified

Both failure paths were tested by deliberately breaking them and confirming a
non-zero exit, then restored. Six gates now — typecheck, contrast, h1, claims,
allergens, build — in CI and in both README gate lists.

One false positive was found and fixed while writing the checker: `tamari`
matched inside Chickpea Doubles' **tamarind**, which is a fruit and not soy.

Regression checked in the browser: with soy-free back on and sesame-free off,
the card still reads "off your profile · contains soy".

**Still needs an editorial decision:** whether `has` should eventually become an
array in `content.ts`, which would retire `menuDepth.ts`. Twenty dishes carry
one allergen each today and only this one needed two, so the depth module is the
smaller change — but it is a workaround for a field that is one value too
narrow.

---

## 47. A button at 1.85:1 in dark mode, under a gate reporting zero failures — **fixed**

The contrast gate reported **"70 pairings, 0 failing"** while the hydration
screen's **"+ Add a cup"** button rendered cream on pale teal in dark mode.

`PAIRS` in `scripts/contrast.mjs` is hand-maintained, and its own comment calls
it *"pairs that actually occur in the UI"*. A hand-maintained list of what
occurs is a claim, and claims go stale the moment someone adds a screen. No pair
covered this button, so nothing measured it.

### The button

It was a hand-rolled copy of `PrimaryButton` with `--forest` swapped for
`--teal`. Every other property — radius, padding, font size, weight, min-height
— already matched `PrimaryButton` exactly.

`--teal` is overridden in the dark theme to a light tint (`#7BBACB`), because
everywhere else in the app teal is **text**. `--on-dark` is not overridden; it
stays cream. So this button — the only place in the app where teal is used as a
fill behind text — came out as:

| theme | ratio | |
|---|---|---|
| light | 5.15:1 | passes, which is why it survived |
| dark | **1.85:1** | against a 4.5:1 requirement |

It now uses `--forest`, like every other primary button: **10.63:1 in both
themes**.

### The gate

`contrast.mjs` now also **derives** pairs. Every style object in `src` that sets
both a colour and a background from tokens is measured, with the file named in
the output. 70 pairings became 96.

The curated list still earns its place: it carries real labels, non-4.5
thresholds, and pairs split across separate elements, none of which the derived
pass can see. **A same-object pair is only a lower bound on what renders**,
because colour is inherited from ancestors. This does not make the gate
complete. It makes it self-maintaining for the one case it can see without
guessing.

### Verified

Twice, and in both directions.

The fix was confirmed **in the live DOM under dark theme**, with the ratio
computed from `getComputedStyle` — what is actually painted — rather than from
the tokens: 1.85:1 before, 10.63:1 after.

The gate was confirmed by **reverting the button and re-running it**:

```
dark   derived · on-dark on teal (Extras.tsx)   1.85:1   4.50:1   FAIL
98 pairings measured against a threshold, 1 failing
```

A gate that has only ever passed, after a fix, has not been shown to catch
anything.

### The h1 gate was audited too, and is honest

Its `ROUTES` list is exactly the 86 screens registered in `App.tsx` — no
registered screen goes unrendered, and no rendered route lacks a screen. The
route-count question raised in item 6 resolves cleanly at 86.

**Still needs an editorial decision:** teal is the hydration accent throughout —
the stat tile and the Today stripes both use it — and this fix drops it on that
one control in favour of the house forest. Keeping teal would mean introducing a
token whose foreground flips by theme, which is a design decision rather than an
accessibility one.

---

## 48. The 47 header colours nothing could measure — **fixed, and gated**

Item 47 made the contrast gate derive its pairs instead of trusting a
hand-maintained list. This is the ground that neither the old list nor the new
derived pass could reach.

`PhotoHeader` paints its ground from a `c1`/`c2` colour pair carried on the
item — 47 of them across crops, codex volumes and places — as a two-colour
stripe behind a lazy-loaded image. Three passes, none of which can see it:

- `contrast.mjs` `PAIRS` compares **token to token**. This ground is not a
  token; it is per-item data.
- The derived pass from item 47 reads style objects. This ground is built at
  runtime by `stripes(c1, c2)`.
- A runtime DOM audit cannot read it either: a `repeating-linear-gradient` gives
  `getComputedStyle` no single background colour to measure against.

So the most variable ground in the app was the one nobody was checking.

### What was wrong

The **"Illustration"** mark — the label that says an image here is a drawing and
not a photograph — was 82% cream with a text shadow, leaning on the page-wide
scrim. That scrim is not uniform: it is 58% black at the top and thins to **34%
at exactly the bottom edge where the mark sits**.

| ground | ratio | requirement |
|---|---|---|
| pale-gold fallback stripe (fonio, black-eyed pea) | **3.19:1** | 4.5:1 at 9.5px/700 |
| a light photograph | not measurable | — |

A text shadow helps a reader and earns nothing under WCAG.

The mark now carries its own ground: full cream on `rgba(15,13,10,0.68)`. That
clears 4.5:1 against a **pure white image** (5.89:1), so its legibility no
longer depends on which illustration loaded behind it. On the worst fallback
stripe it went from 3.19:1 to 11.52:1.

This one earned a fix rather than a caveat. The app treats an image as a claim,
and this is the label saying what the claim rests on — the provenance mark being
the least legible text on the screen is the wrong way round.

### What was NOT wrong

The **titles were never in danger**. The lowest of the 47 measures 6.95:1
against a 3:1 requirement. This is a small-text finding, not a header-wide one,
and the scrim does its job for everything larger.

### The gate

`scripts/headers.mjs` measures all 47 grounds — title at 3:1 where the scrim is
strongest, mark at 4.5:1 where it is thinnest — and separately measures the mark
against pure white, which is the binding case now that it has its own backing.

Proved by setting the backing alpha to zero, reproducing the old mark: five
grounds fail and the white case drops to 1.16:1, exit non-zero.

### `StripedHeader` is dead code

Found while tracing where the 47 pairs are consumed. `StripedHeader` is exported
from `components/Headers.tsx`, takes the same `c1`/`c2`, and is imported by
nothing; every pair goes to `PhotoHeader`.

This mattered before it was a curiosity: the two components use **different
scrims** (0.55/0.30 against 0.58/0.34), and the checker was first written
against the dead one's numbers. Measuring a component nobody renders would have
given confident, wrong figures for the one people see.

The dead-export sweep in item 44 did not catch this because it swept
`content.ts` exports, not component exports.

**Still needs an editorial decision:** whether `StripedHeader` should be
deleted. Removing a component is a call for whoever owns the design system, not
a gap to fill.

---

## 49. The component library nobody uses, and why "just use it" is not free

Item 48 found `StripedHeader` dead by accident, while tracing something else. It
also named the reason: the sweep in item 44 covered `content.ts` exports, not
component exports. This is that sweep widened to all 441 exports in `src/`.

### What is dead

Eighty-nine exports are referenced nowhere outside their own file. Most of that
is not a defect and is not reported as one: roughly thirty are `*_DEPTH_COUNT`
assertions that document a module's size, and roughly thirty are exported
`type`s used only in their own file. Neither costs a reader anything.

Six of them are a different matter. **`ui.tsx` exports `Eyebrow`, `H1`, `H2`,
`Body`, `Meta` and `Card`, and every one is used exactly zero times.** Screens
write raw `<h1 style={{…}}>` and `<h2 style={{…}}>` instead — nineteen and
fifty-seven of them.

Also dead: `withName` (CouncilSheet), `moveImage`, `TRADITION_NOTE` and
`MoveFamily` (media.ts), and `exVariantText` in `content.ts`.

`exVariantText` is worth a line of its own. Item 44's sweep missed it because
`moveDepth.ts` mentions it **in a comment** — "three variant texts that were in
`exVariantText`" — and that sweep did not strip comments before counting
references. This one does. A plain `grep` still reports it as used.

### Why this matters, and where it connects

This is the root cause of item 47. The hydration button was a hand-rolled copy
of `PrimaryButton` with one token swapped, and the copy drifted into a 1.85:1
failure in dark mode. Copies drift because nothing compares them.

### But "just use the components" is not free

The obvious remedy — adopt the library — would be a visual regression, because
the library has drifted from the app rather than the other way round:

| | `ui.tsx` says | the app actually uses |
|---|---|---|
| section `<h1>` | 29px | **24px**, in 7 of 19 |
| `<h2>` | 20px | **19px**, in 44 of 57 |

Adopting `H2` today would change forty-four headings by a pixel. That is a
design decision, not a cleanup.

### What was NOT wrong

The heading sizes were measured for drift and mostly came back **deliberate**.

`<h2>` has five distinct sizes, which looks like drift until each is read in
place. The 17px one in `Journey.tsx` is a row title — `flex: 1`, `margin: 0`,
sitting inside a list row — and the same 17px serif is used for the same purpose
twice more on that screen, marked up as `<span>`. The 18px one in `A11y.tsx` is
the only heading on its screen. Those are hierarchy, not accident.

The real inconsistency is narrower than it first appeared: a 19px/20px split for
the same role, 44 against 10.

**No heading sizes were changed.** They looked like drift, they measured like
drift, and on inspection they were intent. Changing them would have been
inventing a defect.

**Still needs an editorial decision:** whether to delete the six unused
primitives, or to update them to the app's real values so they can be adopted.
Deleting a design system is not a gap to fill.

---

## 50. Data colours used as text, and seven dark-mode failures — **fixed**

Items 47 and 48 fixed contrast the static passes could reach. This is the class
they cannot: **colour is inherited**, so a static check only ever sees a
foreground and a background written in the same style object. Text that takes
its colour from one element and its ground from an ancestor three levels up is
invisible to it.

A runtime audit of every text node — effective foreground against effective
background, walking up for the first opaque ground — found seven failures across
240+ elements on five screens. **Every one in dark mode. None in light.**

| screen | | ratio | required |
|---|---|---|---|
| Today | "Fermentation jar" eyebrow | 2.41:1 | 4.5:1 |
| Journey | five victory tags | 1.65 – 2.72:1 | 4.5:1 |
| Move | logged-session button | **1.75:1** | 4.5:1 |

### One cause

**273 uses of 28 colours are written as fixed hexes in the data layer.** Most
are decorative — a 12px stripe down a card, a dot beside a row — where a fixed
hex is harmless and 4.5:1 does not apply.

Where one is used as **text**, it is not harmless. A hex does not respond to the
theme, so a colour chosen to read against a light card stays dark on a dark one.

Ten of those 28 hexes are **exactly** a light-theme token value. The data was
written by copying the palette, which means the theme-aware equivalent already
existed and the hex simply never reached it.

`Move`'s logged button was the same mistake from the other direction: its fill
was the literal `#E4EDDD`, the light green-tier background copied in, which
stayed pale in dark mode while the label above it (`var(--leaf)`) correctly
lightened. Light-green text on pale-green fill.

### The fix, and its boundary

`data/paletteTokens.ts` maps a known palette hex to the token carrying the same
colour, applied **only at the render sites where a data colour becomes text**.
An unrecognised hex is returned unchanged — a colour with no token is not
improved by being mapped to an approximation of itself.

Two tokens were added for colours that had none: `--gold`, the most-used
untokened data colour at 47 uses, and `--logged-bg`.

**The data layer was not remapped.** `content.ts` is verbatim, and the 273 uses
are overwhelmingly decorative and correct as they stand. Three render sites
changed; nothing else.

### Verified

The audit was re-run after the fix: all seven cleared, **0 failures in both
themes** on all three screens.

Light mode is unchanged to the byte. The victory tags still compute to
`#2E6B7A`, `#2F4A31`, `#8F4230` and `#7E5F1C` exactly as before; dark now
resolves them to `#7BBACB`, `#8FBF8C`, `#E0876B` and `#D9B65E`. The fix is
invisible in the theme that was already correct, which is the point.

### A gap this does not close

The contrast gate's derived pass reads literal `var(--x)` in style objects, so
it cannot see a colour arriving through `textColour()`. The runtime audit is
what covers this class, and it needs a browser, so it is **not in CI**.

That is stated rather than solved. The three fixed sites will not regress
silently, because their colours are now tokens the gate already checks — but a
NEW site that puts a data hex into text would not be caught by any gate. It
would be caught by re-running the audit, which is a manual step.

**Still needs an editorial decision:** whether the runtime audit is worth
wiring into CI behind a headless browser, or whether a manual pass after
theme-affecting work is enough.

---

## Not a discrepancy, but carried forward

The README's known gap — **reflow at 200% zoom was never resolved** — has since
been closed. Every screen was verified at 200% text scale and at a 320px
viewport: no horizontal scrolling, no clipped content. See the Reflow section of
the app README for what changed and the one visible trade-off it introduced.
