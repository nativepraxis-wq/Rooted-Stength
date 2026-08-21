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
| ![The Move hub, led by the goal set in onboarding](media/move/move.png) | ![Farm-Strength: Push & Carry, with farm actions mapped to movement patterns](media/move/farm.png) | ![The shovel-lift hinge, with beginner, standard and seated variants](media/move/exercise.png) |

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
