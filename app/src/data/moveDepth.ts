/*
  Depth for the Move section: farm movements, mobility, seated and adaptive,
  elder strength, ancestral movement and breathwork.

  Separate file; content.ts is untouched per README rule 3.

  ────────────────────────────────────────────────────────────────────────
  THIS FILE GIVES CUEING, NOT PROGRAMMING

  Every screen here already carries a dose - "90 sec, feet flat", "8-12 reps",
  "2-3 / week" - and its own safety band. What was missing was HOW to actually
  perform the movement and WHAT GOES WRONG, which is the part that decides
  whether a rep builds you or hurts you.

  So each entry has:

    cue    - how to do it, in the order the body needs to hear it.
    for    - what it is actually for, tied to the thing it protects in life.
    watch  - the common failure. Present on almost every entry, because on a
             training screen the failure mode is the safety information.

  Three rules this file holds:

  1. NO LOADS AND NO PROGRESSION. The app's dose lines cover volume, and how
     much weight a particular person should lift is not something a card can
     know. Nothing here says add weight, add sets or push through.

  2. THE EXISTING BANDS ARE THE SPINE, and the cues agree with them rather
     than softening them. "Sharp pain means stop - this builds strength, it
     shouldn't hurt." "Exhale on the lift; brace without breath-holding."
     "Range is earned slowly and never forced." Where an entry could be read as
     encouraging force, it says the opposite explicitly.

  3. ELDER AND SEATED WORK POINTS OUTWARD. Falls, balance loss and post-surgical
     limits are clinical territory. The cues make the movement safer to attempt;
     they do not assess whether someone should be attempting it.

  ────────────────────────────────────────────────────────────────────────
  WHY THERE ARE NO PER-ITEM IMAGES FOR ANCESTRAL MOVEMENT

  Mobility and seated work get an illustration each, because seeing the shape
  of a hip switch or a band row genuinely helps someone do it. Ancestral
  movement does not, and the reasoning is the one media.ts already gives for
  the warrior traditions.

  Talawa Technique is a named living practitioner's codified method, and an
  invented picture of it would misrepresent someone's actual work. Nguni stick
  fighting and Batey are living traditions whose own cards say "never
  romanticized combat" and "sport and ceremony inseparable" - a generated image
  is exactly the romanticised still those lines are guarding against. The
  screen keeps its single session illustration and these entries carry text.
  ────────────────────────────────────────────────────────────────────────
*/

export type MoveDepth = {
  /** How to perform it, in the order the body needs. */
  cue: string;
  /** What it protects or builds, in life rather than in the gym. */
  purpose: string;
  /** The common failure. */
  watch?: string;
};

/* ─────────── Farm movements. Keyed on the `farm` strings in `movements`. ─────────── */
export const farmMoveDepth: Record<string, MoveDepth> = {
  'Shovel lift': {
    cue: 'Stand close to the load - every inch it sits away from you multiplies what the low back carries. Push the hips back rather than bending the spine, keep the shin of the front leg close to vertical, and let the shovel stay in contact with your body as it comes up. Drive through the heels and finish by squeezing the glutes, not by leaning back.',
    purpose: 'The hip hinge is the pattern behind picking anything up off the ground, and it is the one most people default to doing with their spine instead. Training it deliberately is what makes a day of digging survivable.',
    watch: 'The round-back reach for a load that is too far away. If the spine rounds under load, the load is either too heavy or too far - move closer before you add effort.',
  },
  'Loaded shovel press': {
    cue: 'Set the feet, brace the trunk, then press. Ribs stay down rather than flaring, and the press travels straight up rather than arcing forward. Exhale as it goes up. The obliques are doing as much work as the shoulders here, which is the point of pressing something long and awkward rather than a symmetrical bar.',
    purpose: 'Overhead reach with an offset load - lifting a bag to a shelf, a child onto shoulders, a tool into a truck bed. Real loads are rarely balanced, and this trains the bracing that keeps an unbalanced one from twisting you.',
    watch: 'Arching the low back to get the last few inches of height. If the ribs flare, the range has run out - that height is coming from the spine rather than the shoulder.',
  },
  'Water carry': {
    cue: 'Stand tall, shoulders down and back, and walk normally rather than leaning away from the weight. Grip firmly and breathe - a carry is the easiest place to hold your breath without noticing. If one side is loaded, the trunk works to stop you tipping, and that resistance is the exercise.',
    purpose: 'Grip, trunk stability and the plain capacity to carry something a long way, which is most of farm work and most of shopping. Grip strength is also one of the better-studied single markers of general physical capacity with age.',
    watch: 'Leaning sideways to counterbalance. Stay stacked and let the trunk work; the lean puts the load through the spine at an angle instead.',
  },
  'Wheelbarrow push': {
    cue: 'Hands set, arms long, trunk braced, and drive from the legs rather than pushing with the arms and shoulders. Keep the load low in the barrow and forward toward the wheel, which makes it lighter to lift and easier to steer. Small steps on uneven ground.',
    purpose: 'Full-body conditioning that behaves like real work - it is a loaded carry, a push and a balance task at once. The heart rate goes up without any of it feeling like cardio.',
    watch: 'Overloading and then fighting the barrow. A barrow that wants to tip is a barrow that is packed wrong; repack it rather than wrestling it.',
  },
  'Compost turning': {
    cue: 'This is a hinge plus a rotation, and the rotation should come from the hips and ribs rather than the low back. Move the feet to face where the load is going instead of twisting under it. Exhale on the throw. Alternate which side leads, or one side does all the work all afternoon.',
    purpose: 'Rotational power under load, which almost nothing else in a training programme trains and almost every physical job demands.',
    watch: 'Twisting with the feet planted and the load out in front. That is the single most common way a back goes on a work day - turn the feet, not the spine.',
  },
  'Harvest squat': {
    cue: 'Sit down between the feet rather than folding forward over them, heels flat, chest tall enough to see where you are working. Come up rather than hovering in a half-squat for minutes at a time. When the legs tire, kneel instead of rounding over - a kneeling pad is a piece of training equipment.',
    purpose: 'Leg endurance for the low work that fills a harvest day. It is not one hard set; it is hundreds of repetitions of getting down and getting up.',
    watch: 'The slow drift into bending from the low back because the legs have gone. That is fatigue talking, and it is the point to change position rather than push on.',
  },
};

/* ─────────── Mobility. Keyed on `name` in `mobilityMoves`. ─────────── */
export const mobilityDepth: Record<string, MoveDepth> = {
  'Deep squat hold': {
    cue: 'Feet about shoulder width, toes turned slightly out, and sit all the way down with the heels staying flat. If the heels lift or you tip backwards, hold a doorframe and let your weight hang back, or put a folded towel under the heels - both are ways in rather than admissions of defeat. Elbows inside the knees, chest tall, and breathe normally the whole time.',
    purpose: 'This is a resting position that much of the world still uses daily, and it asks for ankle, knee and hip range at once. Chairs quietly remove that range over years, and this is the most direct way to ask for it back.',
    watch: 'Bouncing at the bottom to force depth. The band on this screen says range is earned slowly and never forced, and this is the movement it most applies to. Sharp pain in the front of the knee or a painful click means come out of it.',
  },
  'Thoracic rotation, open book': {
    cue: 'Lie on your side with the knees bent and stacked, and keep them stacked and still - the rotation belongs to the ribs, not the pelvis. Sweep the top arm open across the body toward the floor behind you, letting the head and gaze follow the hand. Exhale as it opens, and stop where the knees would otherwise start to lift.',
    purpose: 'Rotation through the mid-back. The card puts it plainly: so loaded carries turn through the ribs instead of the low back. A stiff thoracic spine does not stop you rotating, it just makes the low back do it instead.',
    watch: 'The knees peeling apart as you reach further. That extra range is coming from the lumbar spine, which is the thing this drill exists to protect.',
  },
  '90/90 hip switches': {
    cue: 'Sit with one leg bent ninety degrees in front and the other bent ninety degrees out behind, both knees on the floor. Sit tall - hands behind you for support is fine and is not cheating. To switch, lift both knees and rotate through to the mirror position under control rather than flopping across. Slow is the whole drill.',
    purpose: 'Internal and external hip rotation trained together, which the card correctly notes squatting alone never reaches. Hip rotation is what lets you change direction, sit cross-legged and get up off the floor without using your hands.',
    watch: 'Slumping backwards to get the knees down. Sit up and accept less range; a rounded lower back with the knees flat is not the position this drill is asking for.',
  },
  'Ankle rocks at the wall': {
    cue: 'Put the foot a few inches from a wall and drive the knee forward over the toes to touch the wall, with the HEEL STAYING DOWN. That heel is the entire drill. When it touches easily, move the foot back a little further. Keep the arch from collapsing inward as the knee travels.',
    purpose: 'Ankle dorsiflexion, which the card ties to walking downhill without the knees taking it - and which is also what lets the heels stay flat in the squat hold above. Several things on this screen unlock once the ankle does.',
    watch: 'The heel lifting, or the knee falling inward to reach further. Both are the body finding range somewhere other than the ankle, which defeats the purpose.',
  },
  'Wrist & forearm circles': {
    cue: 'Arms out in front, hands relaxed, and circle the wrists slowly through their full range both directions. Then open and close the hands a few times. Thirty seconds each way is genuinely enough - this is a joint that responds to frequency rather than duration.',
    purpose: 'The card is blunt that this is the joint that gives out first on farmer\\u2019s walks and bucket carries. Grip usually fails before the back or legs do, and the wrist and forearm are what grip runs through.',
    watch: 'Skipping it because it feels trivial next to the loaded work. It takes a minute and it is the difference between finishing a carry and dropping it.',
  },
  'Dead hang or doorframe stretch': {
    cue: 'Hang from a bar with arms straight and the body long, feet off the floor or lightly touching if a full hang is too much - a partial hang with the toes down is a legitimate version. Breathe and let the shoulders lengthen rather than shrugging up defensively. If there is no bar, the doorframe version is a forearm on each side of the frame with the chest stepping gently through.',
    purpose: 'Decompresses the spine and opens shoulders that a day of pulling and carrying has closed down. It also builds grip endurance without any additional exercise.',
    watch: 'Hanging on with painful shoulders, or dropping off the bar rather than lowering. If there is shoulder pain in a hang, that is a stop-and-ask situation rather than a push-through one.',
  },
};

/* ─────────── Seated & adaptive. Keyed on `name` in `seatedMoves`. ─────────── */
export const seatedDepth: Record<string, MoveDepth> = {
  'Chair sit-to-stand (or hover)': {
    cue: 'Feet flat and set back under the knees, lean the chest forward over the feet - the forward lean is what makes it possible, and most people who struggle are trying to rise while sitting upright. Push through the whole foot and stand. Sit down under control rather than dropping. The hover version stops halfway and comes back down, and it is the same exercise.',
    purpose: 'The card calls it the single most protective daily movement there is, and that is not overstatement - the ability to rise from a chair or a toilet unaided is one of the clearest markers of independent living.',
    watch: 'Pushing off the knees with the hands as a habit rather than as a chosen scale. Using the hands is fine as a deliberate step; drifting into it without noticing is how the movement is lost.',
  },
  'Seated marches': {
    cue: 'Sit tall with the back off the chair back, hands resting lightly at the sides, and lift one knee at a time without letting the torso rock backwards to help. The lift is small - a few inches is plenty. Steady rhythm, breathing normally.',
    purpose: 'Warms the hips and wakes the deep trunk muscles with no floor work and no getting up, which is what makes it usable for someone for whom the floor is not an option.',
    watch: 'Rocking the body backwards to swing the leg up. The moment the torso is doing the work, the hip has stopped.',
  },
  'Band row, anchored at a door': {
    cue: 'Anchor the band at chest height in a closed door and check it is secure before you pull. Sit tall, pull the elbows back close to the ribs, and think about the shoulder blades sliding down and together rather than about the arms. Pause a moment at the back, then let it return under control instead of letting it snap you forward.',
    purpose: 'Pulls the shoulders back against the forward curl that sitting builds in. Most people\\u2019s daily life is almost entirely pushing and reaching forward; this is the counterweight.',
    watch: 'Shrugging the shoulders up toward the ears, and letting the band drag you forward on the way back. Also check the anchor each time - a band that comes loose under tension goes somewhere fast.',
  },
  'Overhead press, light': {
    cue: 'Sit tall with the ribs down and the spine neutral. Press up with the elbows tracking forward rather than flaring wide, and stop where the shoulder stops rather than where the arm could go if the back arched. Exhale on the way up - the band on the Move hub is explicit about not holding the breath.',
    purpose: 'Keeps the overhead reach that puts a pot on a high shelf or a case in an overhead locker. Reach is one of the first ranges to go and one of the least missed until it is needed.',
    watch: 'Arching the low back to finish the press. If the ribs flare, that is spine range standing in for shoulder range. Shoulder pain overhead is a reason to ask someone rather than to work around it.',
  },
  'Heel & toe raises': {
    cue: 'Seated, feet flat. Lift the heels keeping the toes down, hold a beat, lower. Then lift the toes keeping the heels down. Both directions matter - the calf pump is the heel raise, the shin work is the toe raise, and most people only ever do the first.',
    purpose: 'Calf pump for circulation on long sitting days, plus ankle strength that feeds directly into balance. As the card says, you can do these anywhere, which is most of why they get done.',
    watch: 'Nothing hazardous here. The only real failure is doing them so fast that neither end of the range gets reached.',
  },
  'Trunk rotation with a reach': {
    cue: 'Sit tall, keep the hips square and facing forward, and rotate the ribs and shoulders to reach one arm across and behind. Let the gaze follow the hand - the neck should turn with the movement rather than staying fixed forward. Come back through the middle rather than bouncing between sides.',
    purpose: 'The card names the real use: reaching for a seatbelt, or turning to a grandchild. Rotation is the range people notice losing first because it has such specific daily uses.',
    watch: 'Letting the hips swivel so it becomes a whole-body turn. If the hips move, the spine has stopped rotating and the drill has become something else.',
  },
};

/* ─────────── Elder strength. Keyed on `move` in `elderMoves`. ─────────── */
export const elderMoveDepth: Record<string, MoveDepth> = {
  'Sit-to-stand': {
    cue: 'A sturdy chair against a wall, feet flat and drawn back, chest forward over the toes, then up. Hands out in front for counterweight rather than pushing on the knees where possible. Sit back down slowly - the lowering builds as much as the rising, and it is the half most people rush.',
    purpose: 'Rising from a chair or a toilet unaided. Of everything on this screen this is the one that most directly decides whether someone lives independently.',
    watch: 'A chair on castors, or one that slides. Put it against a wall. If standing without hands is not available today, use the hands and keep the movement - the pattern matters more than the difficulty.',
  },
  'Wall / counter push-up': {
    cue: 'Hands on a wall or a solid counter at about chest height, feet back far enough to feel the load, body in one straight line from head to heels. Lower the chest toward the surface with the elbows going back at an angle rather than straight out sideways, then push away. Walking the feet closer makes it easier; further makes it harder.',
    purpose: 'Pushing doors, shopping trolleys and yourself back up off a surface. It is the upper-body push pattern at a load a floor push-up cannot offer.',
    watch: 'The hips sagging or piking as it gets hard - the trunk should hold the line. Check the counter is fixed and the floor is not slippery before loading it.',
  },
  'Seated row · band pull': {
    cue: 'Band anchored securely in front at chest height. Sit tall, pull the elbows back near the ribs, squeeze the shoulder blades, return under control. Breathe out on the pull. Check the anchor every session.',
    purpose: 'Pulling doors open and carrying bags - and posturally, the counterweight to a life spent reaching forward.',
    watch: 'A band anchored in a door that someone might open, and worn bands. Bands fail suddenly and at the worst moment; check for nicks and cloudiness before use.',
  },
  'Glute bridge · hip thrust': {
    cue: 'Lie on the back, knees bent, feet flat and close enough that the fingertips nearly brush the heels. Push through the heels and lift the hips until the body is in a line from knees to shoulders - not higher. Squeeze at the top, lower slowly. The lift comes from the glutes rather than from arching the low back.',
    purpose: 'Standing up and climbing stairs, both of which are hip extension. It also loads the posterior chain with no equipment and no standing balance required.',
    watch: 'Going higher than a straight line by arching the back, and cramping in the hamstrings - which usually means the feet are too far away, so bring them closer.',
  },
  'Heel raise on a step': {
    cue: 'Hold a rail or a counter with at least one hand - that is not optional at a step edge. Balls of the feet on the step, heels free, rise up slowly and lower slowly through the full range. Both feet together first; one at a time only if balance is genuinely solid.',
    purpose: 'Walking stability and balance. The calf is a major contributor to how well someone recovers from a stumble rather than continuing into a fall.',
    watch: 'Doing it at a step edge without a handhold. This is the movement on this screen with the highest fall risk, and the balance band beside it is not decorative - flat ground with a chair for support is a legitimate version.',
  },
  'Bird dog · modified plank': {
    cue: 'On hands and knees, hands under shoulders and knees under hips. Reach one arm forward and the opposite leg back only as far as you can hold without the hips tipping - a low reach that stays level is worth more than a high one that rolls. Imagine balancing a cup on the low back. Switch sides slowly.',
    purpose: 'Posture and fall prevention: this trains the trunk to resist movement rather than to create it, which is what it is actually doing when you stumble.',
    watch: 'The hips rotating open as the leg lifts, and wrist pain on the floor - forearms or a counter version are both fine. Getting down to and up from the floor is itself the harder part for many people, and is worth having help for the first time.',
  },
};

/* ─────────── Ancestral movement. Keyed on `name` in `ancestralTraditions`. ─────────── */
export const ancestralDepth: Record<string, MoveDepth> = {
  'Talawa Technique': {
    cue: 'Trained in classes and workshops rather than from a description - it is a codified technique with its own vocabulary and progression, taught by certified practitioners. What a card can honestly say is what it draws on: African diasporic dance and danced martial arts, worked with a low centre of gravity, bent knees and continuous grounded weight transfer.',
    purpose: 'Hips, core and lower-body power through movement that is danced rather than counted. The card names its originator, T. Talawa Prest\\u00f8, because the technique is a living body of work with an author rather than a folk category.',
    watch: 'The gap between doing Afro-diasporic dance and doing Talawa Technique. This app does not teach the technique and does not claim to; the entry exists to point at it correctly.',
  },
  'Kemetic-inspired postures': {
    cue: 'Held static positions with attention on alignment and breath, usually practised in the morning. Move into a shape, find the position where the spine is long and the breath is unrestricted, and hold while breathing rather than while gripping.',
    purpose: 'Alignment, static strength and a morning practice that wakes the body without impact.',
    watch: 'The word "inspired" in the card title is doing real work and should not be read past. These are contemporary practices drawing on Nile Valley iconography and lineage claims, and the historical record for specific postures as a codified ancient system is thin. The app labels this traditional use rather than verified history, which is the honest grading.',
  },
  'Call-and-response circles': {
    cue: 'A group forms a circle, one voice leads and the rest answer, and the movement runs on the rhythm rather than on a count. Effort and rest are set by the call - when the leader pushes, the circle pushes; when the call eases, everyone recovers. Nobody needs a watch.',
    purpose: 'Collective endurance, and a genuinely different way of regulating intensity: the rhythm distributes effort and rest across a group so that no individual has to decide when to stop. It is also social rather than solitary, which is most of why people keep turning up.',
    watch: 'Someone pushing past their own limit to stay with the group. The circle sets the pace, and stepping to the edge for a round is a normal part of the form rather than a failure.',
  },
  'Grounded stepping & stomp': {
    cue: 'Weight low, knees soft, and the force driven down into the ground through a flat foot rather than punched through a locked leg. Repetition builds the effect - it is a work-capacity practice rather than a set of maximal efforts. The sound is a real part of it and helps hold the collective rhythm.',
    purpose: 'The card calls it joint-protective repetition, and that is the interesting claim: the soft knee and the flat foot let a great deal of volume be absorbed without the impact stacking up the way running does.',
    watch: 'Stomping onto a locked knee or on concrete for long stretches. Soft surfaces and soft joints; the ground should take the force rather than the ankle and knee.',
  },
  'Nguni stick fighting': {
    cue: 'Practised as regulated sparring with protective equipment, agreed rules and supervision - which is how it is done in the tradition and how the card describes it. The trainable elements outside of sparring are footwork drills, the stance, and rotational striking practice against a target rather than a person.',
    purpose: 'Footwork, rotational power and reaction speed. It is a battlefield-to-sport lineage, and the sporting form is a living continuous practice rather than a revival.',
    watch: 'The card says never romanticized combat and that is the line to hold. This is a regulated sport with real injury risk, learned from people who do it, and not a workout to improvise from a description.',
  },
  'Batey ball games': {
    cue: 'The historical game was played in stone-bordered plazas with a rubber ball kept in the air using hips, thighs, shoulders and head - not hands or feet. What is trainable from it is that hip-drive and rebound quality: a ball kept up with the hips and thighs is an agility drill anyone can do.',
    purpose: 'Agility, hip drive and team endurance. The card puts the important part plainly - sport and ceremony were inseparable, so this was never simply a game and the plazas were ceremonial ground.',
    watch: 'Treating the ceremonial dimension as decoration on a sport. This is Ta\\u00edno cultural and religious practice, documented archaeologically at the plazas themselves, and the app describes it rather than reconstructing it.',
  },
};

/* ─────────── Breathwork. Keyed on `name` in BREATH_PRACTICES (MoveDetail). ─────────── */
export const breathDepth: Record<string, MoveDepth> = {
  'Nasal breathing warm-up': {
    cue: 'Breathe in and out through the nose only, at an easy pace, for a few minutes before training. If you cannot maintain it, the pace is too high rather than the technique being wrong - slow down until the nose can keep up.',
    purpose: 'Nasal breathing warms and humidifies the air and slows the breath rate, and using it as a warm-up sets a rhythm you can carry into easy work. It also gives you a simple gauge: the point at which you have to open your mouth is a reasonable marker of easy-effort territory.',
    watch: 'Forcing nasal-only breathing at high intensity. When the work is genuinely hard, breathe however you need to - restricting airflow under load is not a training method.',
  },
  'Between-set recovery': {
    cue: 'Sit or stand tall, breathe in through the nose, and make the exhale noticeably longer than the inhale - roughly twice as long is the usual guide. Three or four of those between sets. Do not hold at either end.',
    purpose: 'A long exhale increases vagal activity and drops heart rate faster than passive rest does, which is the best-evidenced piece of breathwork on this screen. Thirty seconds is enough to feel it.',
  },
  'Safe bracing for lifts': {
    cue: 'Breathe into the belly and the sides of the ribs rather than up into the shoulders, tighten the trunk as if about to be pushed, and keep breathing - short shallow breaths through a braced trunk. Exhale as the lift finishes.',
    purpose: 'A braced trunk is what transfers force between the legs and the load instead of letting the spine absorb it. This is the technique underneath every hinge, carry and press elsewhere in Move.',
    watch: 'The card says it directly, twice - learn it, no breath-holds. A held breath under load spikes blood pressure sharply and is a fainting risk, and the Move hub band already says to stop if you feel dizzy. Anyone with high blood pressure or a heart condition should raise breath-holding with a clinician before it becomes a habit.',
  },
  'Morning energy practice': {
    cue: 'Upright, breathing at a steady comfortable rhythm with a slight emphasis on a fuller inhale, for a few minutes near waking. Light on the face while doing it does more for morning alertness than the breathing does.',
    purpose: 'A ritual that marks the start of the day and gets the body upright and moving. Framed on the card as a sunrise rhythm rather than as a physiological intervention, which is the right level of claim.',
    watch: 'Rapid or forceful breathing patterns - the fast-breathing practices some traditions use can cause lightheadedness and fainting, and none of them belong near water, a road or a set of stairs. If a practice makes you dizzy, that is a stop signal rather than a sign it is working.',
  },
};

export const FARM_MOVE_DEPTH_COUNT = Object.keys(farmMoveDepth).length;
export const MOBILITY_DEPTH_COUNT = Object.keys(mobilityDepth).length;
export const SEATED_DEPTH_COUNT = Object.keys(seatedDepth).length;
export const ELDER_DEPTH_COUNT = Object.keys(elderMoveDepth).length;
export const ANCESTRAL_DEPTH_COUNT = Object.keys(ancestralDepth).length;
export const BREATH_DEPTH_COUNT = Object.keys(breathDepth).length;

/*
  ────────────────────────────────────────────────────────────────────────
  PER-MOVEMENT DETAIL FOR THE EXERCISE SCREEN

  All six farm-movement cards used to navigate to one hardcoded screen: the
  breadcrumb said "Shovel lift", the heading said "The Shovel-Lift Hinge", and
  the setup, cues, mistakes and variant text were all hinge-specific. Tapping
  "Compost turning" or "Water carry" showed shovel-lift instructions.

  The screen now reads whichever movement was tapped. The `Shovel lift` entry
  below is the EXISTING SCREEN COPY MOVED VERBATIM - the same setup sentence,
  the same four cues, the same four mistakes, the same meta line and the same
  three variant texts that were in exVariantText. Nothing that shipped was
  reworded; it was given a key. The other five are new.

  ON SETS AND REPS. The cueing records above carry none, deliberately. These
  variant lines do, because the screen they feed has always carried them - the
  original beginner text read "2 sets of 8, unhurried" - and stripping the
  volume out of the one place the app gives it would remove information rather
  than add care. They stay modest and stay tied to the variation.
  ────────────────────────────────────────────────────────────────────────
*/

export type ExerciseDetail = {
  /** Breadcrumb tail: the movement pattern. */
  pattern: string;
  /** Screen heading. */
  title: string;
  /** The meta line under the heading. */
  meta: string[];
  setup: string;
  cues: string[];
  mistakes: string[];
  /** What to do about the breath, specific to this movement. */
  breath: string;
  variants: { beginner: string; standard: string; seated: string };
};

/* Keyed on the `farm` strings in `movements`. */
export const exerciseDetail: Record<string, ExerciseDetail> = {
  'Shovel lift': {
    pattern: 'Hip hinge',
    title: 'The Shovel-Lift Hinge',
    meta: ['3 \u00d7 10', '\u00b7 90s rest', '\u00b7 posterior chain'],
    setup: 'Feet hip-width, load (shovel, sandbag or bucket) centered between the shins. Brace lightly \u2014 think \u201cproud chest, long back.\u201d',
    cues: [
      'Stand tall, feet hip-width, tool or load close to the shins',
      'Push the hips back like closing a door behind you',
      'Keep a long spine \u2014 chest proud, gaze down and forward',
      'Drive through the whole foot to stand; squeeze glutes at the top',
    ],
    mistakes: [
      'Rounding the low back to reach the load',
      'Squatting down instead of hinging back',
      'Yanking with the arms instead of the hips',
      'Holding the breath through the lift',
    ],
    breath: 'Inhale as you hinge down; exhale as you drive up. Never hold.',
    variants: {
      beginner: 'Hinge to a box or raised bed so you never round the low back. Empty bucket or light load. 2 sets of 8, unhurried.',
      standard: 'Full hip hinge with a loaded shovel or sandbag. Soft knees, long spine, drive the hips back then through. 3 sets of 10.',
      seated: 'Seated good-morning: sit tall on a sturdy chair, hinge from the hips with a band across the lap. Same posterior-chain work, fall-safe.',
    },
  },

  'Loaded shovel press': {
    pattern: 'Shoulder + core',
    title: 'The Loaded Overhead Press',
    meta: ['3 \u00d7 8', '\u00b7 90s rest', '\u00b7 shoulders & bracing'],
    setup: 'Feet hip-width and set, load at shoulder height, ribs down and trunk braced before anything moves. An offset or long load is the point \u2014 it asks the trunk to stop you twisting.',
    cues: [
      'Set the feet and brace the trunk before the load moves',
      'Ribs down \u2014 the press travels straight up, not arcing forward',
      'Exhale as it goes up; keep breathing between reps',
      'Stop where the shoulder stops, not where the back could bend further',
    ],
    mistakes: [
      'Arching the low back to find the last few inches',
      'Letting the ribs flare as the arms finish',
      'Pressing a load that swings the trunk sideways',
      'Holding the breath at the top',
    ],
    breath: 'Breathe in at the shoulder, out as you press. No breath-holds.',
    variants: {
      beginner: 'Press an empty bar, a broom or a light bucket, standing tall. 2 sets of 8, stopping well short of any back arch.',
      standard: 'Full overhead press with a shovel, sandbag or an offset load. Trunk braced, ribs down. 3 sets of 8.',
      seated: 'Seated press against a chair back, which removes the low-back arch entirely. Light dumbbells or a band underfoot.',
    },
  },

  'Water carry': {
    pattern: 'Loaded carry',
    title: 'The Loaded Carry',
    meta: ['4 \u00d7 30m', '\u00b7 60s rest', '\u00b7 grip & trunk'],
    setup: 'Load either side, or one side for a harder trunk challenge. Stand tall, take the weight with a hinge rather than a stoop, and set the shoulders before the first step.',
    cues: [
      'Stand tall \u2014 shoulders down and back, not shrugged',
      'Walk normally; do not lean away from the weight',
      'Grip firmly and keep breathing the whole distance',
      'Set the load down with a hinge, the same way you picked it up',
    ],
    mistakes: [
      'Leaning sideways to counterbalance a one-sided load',
      'Holding the breath for the whole carry',
      'Dropping the load rather than lowering it',
      'Shrugging the shoulders up toward the ears',
    ],
    breath: 'Breathe steadily throughout. A carry is the easiest place to hold your breath without noticing.',
    variants: {
      beginner: 'Two light buckets, a short distance, both sides loaded evenly. Put them down the moment posture goes.',
      standard: 'Loaded cans, jugs or a sandbag, longer distance. One-sided carries make the trunk work hardest.',
      seated: 'Seated hold: sit tall and hold a weight in each hand at your sides for time. Grip and trunk without any walking.',
    },
  },

  'Wheelbarrow push': {
    pattern: 'Full-body conditioning',
    title: 'The Loaded Push',
    meta: ['5 \u00d7 20m', '\u00b7 walk back', '\u00b7 legs & drive'],
    setup: 'Pack the load low and forward toward the wheel, which makes the barrow lighter to lift and easier to steer. Hands set, arms long, trunk braced before the first push.',
    cues: [
      'Drive from the legs; the arms hold the barrow, they do not push it',
      'Arms long, trunk braced, chest over the handles',
      'Small steps on uneven ground',
      'Keep the load low and forward, over the wheel',
    ],
    mistakes: [
      'Packing high and then fighting the tip',
      'Pushing with the shoulders and low back instead of the legs',
      'Long strides on rough ground',
      'Overloading and running out of control on a slope',
    ],
    breath: 'Steady rhythmic breathing. If you cannot talk, the load or the pace is too much.',
    variants: {
      beginner: 'A part-filled barrow on flat, firm ground. Short distances, turn wide.',
      standard: 'A working load over the ground you actually have, including a slope.',
      seated: 'Not a seated movement. Substitute the seated band row and press for the same push-and-brace work.',
    },
  },

  'Compost turning': {
    pattern: 'Hinge + rotation',
    title: 'The Rotational Hinge',
    meta: ['3 \u00d7 8 each side', '\u00b7 90s rest', '\u00b7 hips & obliques'],
    setup: 'Feet wider than the hinge, load in front, and know where it is going before you lift it. Rotation belongs to the hips and ribs \u2014 the feet turn, the spine does not.',
    cues: [
      'Hinge to the load, then turn the FEET toward where it is going',
      'Rotate through the hips and ribs, not the low back',
      'Exhale on the throw',
      'Alternate the leading side so one side does not do the whole pile',
    ],
    mistakes: [
      'Twisting with the feet planted and the load out in front',
      'Rounding the back to reach into the pile',
      'Working one side only for an entire session',
      'Rushing the turn with a heavy fork',
    ],
    breath: 'Inhale on the lift, exhale on the turn and release.',
    variants: {
      beginner: 'Light fork, small loads, and a deliberate pause to reset the feet on every single rep.',
      standard: 'Working fork and load, feet turning under a continuous rhythm.',
      seated: 'Seated trunk rotation with a band or a light weight, hips square. Same rotation, no load overhead.',
    },
  },

  'Harvest squat': {
    pattern: 'Leg endurance',
    title: 'The Working Squat',
    meta: ['3 \u00d7 12', '\u00b7 60s rest', '\u00b7 quads & ankles'],
    setup: 'Feet about shoulder width, toes turned slightly out, weight through the whole foot. This is endurance rather than a heavy lift \u2014 the target is hundreds of quality repetitions across a day.',
    cues: [
      'Sit down between the feet rather than folding forward over them',
      'Heels stay flat; chest tall enough to see the work',
      'Come all the way up rather than hovering half-way for minutes',
      'When the legs tire, kneel \u2014 do not round the back instead',
    ],
    mistakes: [
      'Bending from the low back once the legs fatigue',
      'Heels lifting at the bottom',
      'Holding a half-squat for long stretches',
      'Knees collapsing inward on the way up',
    ],
    breath: 'Breathe out on the way up. Steady breathing across the set, not a hold.',
    variants: {
      beginner: 'Squat to a box or a low stool so there is a target to sit to. A kneeling pad is training equipment, not a concession.',
      standard: 'Full working squat, repeated across the row. Change position before form goes.',
      seated: 'Chair sit-to-stand, or the hover version. The same pattern with the balance risk removed.',
    },
  },
};

export const EXERCISE_DETAIL_COUNT = Object.keys(exerciseDetail).length;
