# Screens

Headless-Chrome captures of the running build at 393×852 — the resolution the
design was drawn at, rendered at 2×. Real screenshots, not mockups.

Routes other than the default are captured by temporarily pointing the seed route
at them; `initialState.ts` is checked byte-identical afterwards.

---

## Move

Eleven routes. Every session screen writes a real `move` log entry, which is what
Today's counts and the elder dose meter read back — so nothing here is a
decorative counter.

### The hub and the strength work

| Move | Farm-Strength | Exercise |
|---|---|---|
| ![The Move hub — with no goal set it offers the default session and says so](media/move/move.png) | ![Farm-Strength: Push & Carry, with farm actions mapped to movement patterns](media/move/farm.png) | ![The shovel-lift hinge, with beginner, standard and seated variants](media/move/exercise.png) |

`exercise` carries three variants, and the seated one is a first-class version of
the movement rather than a consolation.

### Planning and tradition

| Weekly plan | Warrior traditions |
|---|---|
| ![The periodized training week, each block carrying its own evidence tier](media/move/trainPlan.png) | ![Ancestral Warrior Training, with named attribution for each tradition](media/move/warrior.png) |

The warrior screen keeps its "Honor the source" band: these are living traditions
simplified into drills, and the app says so.

### Range, adaptation and age

| Mobility | Seated & adaptive | Elder strength |
|---|---|---|
| ![Mobility and joint reset, twelve minutes, floor optional](media/move/mobility.png) | ![A full seated circuit that never asks you onto the floor](media/move/seated.png) | ![Elder strength, measured against a stated two-a-week minimum](media/move/elder.png) |

Seated work leads with "This is not the easy version" — the framing is the
accessibility feature. Elder strength measures against a stated minimum rather
than an open-ended streak.

### Rhythm, recovery and trail

| Ancestral movement | Breathwork | Hiking |
|---|---|---|
| ![Ancestral movement and dance, with cultural protocol stated](media/move/ancestral.png) | ![The long-exhale reset and its breathing circle](media/move/breath.png) | ![The ridge trail, with its elevation profile and safety checklist](media/move/hike.png) |

`breath` honours reduced motion in both paths — with animation off it swaps
"follow the circle" for the explicit count, so the practice stays usable.

---

## Nourish

Twenty-two routes. The generative surfaces here compute from real state — the
report totals whatever survived the detected-foods step, and the builder totals
real protein against the ~30 g mark.

### The plate-scan chain

| Nourish | Scan | Detected |
|---|---|---|
| ![The Nourish hub, with excluded plates counted and listed](media/nourish/nourish.png) | ![The capture screen, and what happens to the photo](media/nourish/scan.png) | ![Detected foods, each dismissable or substitutable](media/nourish/detected.png) |

| Hidden ingredients | Report |
|---|---|
| ![What a photo cannot see — oil, broth, salt](media/nourish/hidden.png) | ![The nutrient report, totalled from the components kept](media/nourish/report.png) |

Drop a food at the Detected step and every macro, micro and sentence in the
report changes with it.

### Cooking

| Generator | Recipe | Blood-sugar plate |
|---|---|---|
| ![The recipe generator, filtered honestly with hidden plates listed](media/nourish/recipe.png) | ![A plate, with what the dish actually is stated plainly](media/nourish/recipeDetail.png) | ![The blood-sugar-steady bowl, with the clinician boundary](media/nourish/sugarMeal.png) |

### Planning and the pantry

| Meal plan | Pantry | Grocery | From the plan |
|---|---|---|---|
| ![Seven days, meals swapped rather than removed](media/nourish/mealPlan.png) | ![The pantry, with stock drawn down by what has been cooked](media/nourish/pantry.png) | ![The shopping list by store, swaps labelled](media/nourish/grocery.png) | ![The plan's list, grouped by aisle](media/nourish/planGrocery.png) |

### Getting things in

| Barcode | Voice |
|---|---|
| ![Scanning a barcode, and what a barcode cannot tell you](media/nourish/barcode.png) | ![Adding by voice, with the transcript shown before it commits](media/nourish/voice.png) |

### Blends, uptake and the household

| Smoothies | Builder | Pairings |
|---|---|---|
| ![Blends built to carry real protein](media/nourish/smoothies.png) | ![The builder, totalling protein against the ~30 g mark](media/nourish/smoothieBuilder.png) | ![What the plate lets you absorb](media/nourish/pairings.png) |

| Budget | The whole table |
|---|---|
| ![The weekly grocery budget by category](media/nourish/budget.png) | ![Feeding a household — one pot, different needs](media/nourish/family.png) |

### The sill farm

| Microgreens | Crop library | A crop |
|---|---|---|
| ![Trays, and the honest ceiling on the density claim](media/nourish/microgreens.png) | ![Seventeen crops, searchable, with sow advice for the current season](media/nourish/croplib.png) | ![A crop, with its full grow protocol](media/nourish/variety.png) |

---

## Explore

Twenty-seven routes — the largest cluster, and the one carrying most of the
app's sourced content. Every claim on these screens wears its evidence tier, and
the tier vocabulary differs by surface: dishes are classified, herbs and foods
are graded.

### The atlas and the two codices

| Explore | Foodways Codex | A region |
|---|---|---|
| ![The Explore hub — nutrients as one circuit, soil to blood](media/explore/explore.png) | ![Ten regional volumes](media/explore/codex.png) | ![A volume, every dish labelled by what it always was](media/explore/codexRegion.png) |

| Pantry Codex | A volume | The fusion check |
|---|---|---|
| ![Six ingredient volumes, 55 entries, six claim tiers](media/explore/pantryCodex.png) | ![A volume, each entry graded by what the evidence carries](media/explore/pantryVol.png) | ![The eight questions every fusion recipe answers before it publishes](media/explore/fusion.png) |

The codex header states its own counts — six volumes, 55 entries, six claim
tiers — and those are read from the data, not typed into the design.

### Where food comes from

| Crop origins | Near you | Foraged foods |
|---|---|---|
| ![A crop's origin, spread and the people who carried it](media/explore/crop.png) | ![Farms, markets, co-ops and kitchens — approximate location only](media/explore/map.png) | ![Weeds and sea vegetables, with the identification warning](media/explore/forage.png) |

| Community | Seasonal calendar | Mineral & body atlas |
|---|---|---|
| ![Learning and gathering](media/explore/community.png) | ![Not four seasons everywhere — the year by bioregion](media/explore/seasonal.png) | ![Soil to bloodstream](media/explore/minerals.png) |

`seasonal` leads with the bioregion rather than assuming four temperate seasons,
and marks the current one — "Summer · now" in August.

### The apothecary

| Apothecary | Tea intelligence | Nervines |
|---|---|---|
| ![Herbal teas and tonics](media/explore/apothecary.png) | ![Which cup, when and why](media/explore/teaIntel.png) | ![Nervines and adaptogens](media/explore/nervines.png) |

| Water medicine | Ferments | Mushrooms |
|---|---|---|
| ![Water as medicine](media/explore/waterMed.png) | ![Live cultures](media/explore/ferment.png) | ![Fungi, graded by evidence](media/explore/mushrooms.png) |

Every brew carries its grade, and the safety filters state plainly when they are
off — "No safety filters on — every brew is shown" is shown, not implied.

### Foodways in depth

| Mushroom recipes | Coconut | Honey |
|---|---|---|
| ![Cooking with mushrooms](media/explore/shroomRecipes.png) | ![Coconut foodways](media/explore/coconut.png) | ![Honey incorporated](media/explore/honey.png) |

| Swaps | Ceremony | Blood sugar |
|---|---|---|
| ![Substitutions that hold up](media/explore/swaps.png) | ![Ceremonial and ritual foods](media/explore/ceremony.png) | ![Eating for blood sugar, with the clinician boundary](media/explore/diabetes.png) |

### Eating out, and eating for state

| Nutrient frequencies | Restaurants | An order |
|---|---|---|
| ![Four bands — tuned by your goal once one is set, neutral until then](media/explore/frequencies.png) | ![Places worth eating at](media/explore/restaurant.png) | ![A menu, filtered against your profile, with what to ask before ordering](media/explore/order.png) |

`order` does not silently hide what does not fit: it counts the dishes that do,
flags the one that does not, and gives you the questions to ask.

---

## Journey

Sixteen routes — the record, the settings, and the chapters the app handles with
most care. `diabetes` is shared with Explore and is pictured there.

### The record

| Journey | Progress | History |
|---|---|---|
| ![The Journey hub](media/journey/journey.png) | ![What you actually did — streaks, the week, and protein against target](media/journey/progress.png) | ![Every entry, filterable, each one removable](media/journey/history.png) |

Nothing on Progress is a decorative counter: 83 entries, 51 plates and 11
sessions are the same numbers History filters by, and Today's "60g protein" is
the two plates listed under it.

### Your record, and who can see it

| Vault | Sources | Profile |
|---|---|---|
| ![What is stored, and where it lives](media/journey/vault.png) | ![Where every claim came from](media/journey/sources.png) | ![Your profile](media/journey/profile.png) |

| Data sovereignty | Privacy | Accessibility |
|---|---|---|
| ![Who owns the record — and the answer is not the app](media/journey/dataSov.png) | ![What is collected, stated plainly](media/journey/privacy.png) | ![Eleven independent settings, two on by default](media/journey/a11y.png) |

Accessibility ships colour-blind-safe encoding and offline access **on**, and
says so in the header rather than burying it in a toggle list.

### Care, and the harder chapters

| Food sovereignty | Sleep | Intimacy |
|---|---|---|
| ![What the food system did — naming the cause, not only the fix](media/journey/sovereignty.png) | ![Rest, and what it does to the rest of it](media/journey/sleep.png) | ![Vitality, handled without euphemism](media/journey/intimacy.png) |

| Pregnancy & postpartum | Membership | Admin |
|---|---|---|
| ![Carrying and rebuilding — a flow that leans on your care team](media/journey/pregnancy.png) | ![What membership is, and is not](media/journey/membership.png) | ![The admin view](media/journey/admin.png) |

The pregnancy flow leads with the boundary — "Nothing here replaces your
midwife, OB or pelvic-floor therapist" — before it asks anything at all.
