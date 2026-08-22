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

## Not a discrepancy, but carried forward

The README's known gap — **reflow at 200% zoom was never resolved** — has since
been closed. Every screen was verified at 200% text scale and at a 320px
viewport: no horizontal scrolling, no clipped content. See the Reflow section of
the app README for what changed and the one visible trade-off it introduced.
