/*
  The sample person, and how a real person stops being her.

  The seed is a demonstration: Amara, fourteen days of plates and sessions, a
  streak, a Council thread that mentions a ferritin result, three ferment jars,
  pantry ticks and an RSVP. That is right for someone exploring - every screen
  has something true-to-life to compute from - and it is what the screenshots
  and the gates render.

  It was wrong for someone who tapped Begin. Nothing ever cleared it, so a real
  reader typed in their own name and inherited a fabricated fortnight. Once
  persistence landed, that fortnight was saved as theirs, and "Save a copy"
  exported it as their health record.

  So:
    - Begin clears the made-up history before intake. Everything after is real.
    - "Skip for now - explore first" keeps the sample, labelled as sample, with
      a way to clear it from Today and from Privacy.

  ─────────────────────────────────────────
  WHAT IS CLEARED, AND WHAT IS NOT

  Cleared: things that describe what somebody DID or who they ARE - logs,
  conversation, jars, trays, ticks, RSVPs, the name and pronouns.

  Not cleared: settings the intake walks through with visible controls
  (restrictions, traditions, consent, vault permissions, goal defaults) and the
  accessibility settings. Those are defaults the reader can see and change, not
  a history attributed to them. Accessibility in particular must never reset -
  somebody who turned on larger text to read the welcome screen needs it on the
  next one.
*/

export const OWN_START: Record<string, unknown> = {
  sample: false,
  obName: '',
  obPronoun: '',
  logs: [],
  councilThread: [],
  fermJars: [],
  sownTrays: [],
  savedBrews: {},
  savedSmoothies: [],
  rsvp: {},
  approved: {},
  got: {},
  order: {},
  planGot: {},
  seedCart: {},
  plantsEaten: {},
  hydrationCups: 0,
  tended: { move: false, nourish: false, rest: false },
  watered: {},
};
