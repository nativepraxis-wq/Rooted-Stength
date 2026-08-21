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
