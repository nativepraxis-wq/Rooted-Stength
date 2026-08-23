/*
  Depth for the health surfaces: food sovereignty & health, sleep, and the
  lab vault.

  Separate file; content.ts is untouched per README rule 3.

  ────────────────────────────────────────────────────────────────────────
  THE LINE THIS FILE HOLDS

  This is the most clinical material in the app - blood pressure, cholesterol,
  type 2 diabetes, anaemia, vitamin D, and a set of seeded lab values. The
  diabetes guide in the Apothecary already set the pattern for how the app talks
  about this, and these entries follow it rather than inventing a looser one:

    mechanism  - why the food does what the card says it does.
    limit      - what the number on the card actually covers, and where it runs
                 out. Every condition entry has one.
    clinician  - what belongs to a prescriber rather than to a card. Present
                 wherever a food effect can stack with a medication.

  NO DOSES, NO TARGETS, AND NO INTERPRETATION OF ANYONE'S RESULTS. The vault
  entries explain what a marker measures and why its range is drawn where it is.
  They do not read the seeded values back at the user, because that would be
  interpreting a lab result, which is the one thing this screen must not do -
  and the screen's own copy already routes that to a clinician.

  ────────────────────────────────────────────────────────────────────────
  ONE CARD OVERCLAIMS, AND THE DEPTH SAYS SO

  The iron card reads "Moringa (28mg iron per 100g - nearly 4x the RDA)".

  The arithmetic is right and the framing is not. 28mg per 100g is DRIED LEAF
  POWDER, and nobody eats 100g of it - a heaped tablespoon is around 7g, which
  is closer to 2mg. Comparing a per-100g figure for a powder against a daily RDA
  makes a spoonful sound like a day's iron.

  This app already holds itself to the opposite standard: its own Pantry Codex
  volume lists "per-gram vs. per-serving honesty" as a principle, and the
  Mineral atlas gives moringa as "about 1-2mg a tablespoon". The card and the
  atlas disagree, and the atlas is the honest one. content.ts is verbatim so the
  card stands, but the depth beneath it corrects the impression rather than
  repeating it.
  ────────────────────────────────────────────────────────────────────────
*/

export type ConditionDepth = {
  /** Why the food does what the card says. */
  mechanism: string;
  /** What the card's number covers, and where it stops. */
  limit: string;
  /** What belongs to a prescriber. */
  clinician?: string;
};

/* Keyed on the `name` strings inside sovSystemDefs[].conditions. */
export const conditionDepth: Record<string, ConditionDepth> = {
  'High blood pressure': {
    mechanism: 'Three things are working at once. Leafy greens carry dietary nitrate, which the body converts to nitric oxide and which relaxes the vessel wall. Beans and provisions carry potassium, and blood pressure tracks the potassium-to-sodium ratio more closely than it tracks sodium alone - so adding potassium moves the ratio as surely as cutting salt does. Hibiscus has its own modest effect in trials.',
    limit: 'The DASH pattern has good trial evidence behind it, and the effect size is real but moderate - it is a meaningful contribution rather than a replacement for treatment. The card calls hibiscus a natural ACE-inhibitor; the trials show a modest reduction in blood pressure and the mechanism is not settled as ACE inhibition specifically. Treat that phrase as a description of effect, not of pathway.',
    clinician: 'Every one of these lowers blood pressure to some degree, and so does the medication. Taken together they stack, and the failure mode is pressure dropping too far - dizziness on standing is the usual first sign. Anyone on antihypertensives changing their diet substantially should say so at the next appointment rather than after.',
  },
  'Cholesterol & triglycerides': {
    mechanism: 'Soluble fibre is the active part. It binds bile acids in the gut and carries them out, and the liver then pulls cholesterol from the blood to make more - which is a genuine, well-characterised mechanism rather than a general "fibre is good" claim. Okra mucilage, oats, beans and amaranth all supply it.',
    limit: 'Soluble fibre lowers LDL by a modest amount in trials - useful, and smaller than what a statin does. The sea moss line is the weakest part of the card: seaweed does supply some omega-3 precursors, but the conversion of plant ALA to EPA and DHA in humans is limited and variable, so that is a plausible contribution rather than a demonstrated one.',
    clinician: 'Familial hypercholesterolaemia does not respond to diet the way ordinary raised cholesterol does, and it is more common than most people think. A cholesterol that stays high on a genuinely good diet is a reason to be tested rather than to try harder.',
  },
  'Type 2 diabetes': {
    mechanism: 'Low-glycaemic grains and resistant starch both slow the rate at which glucose arrives in the blood, so the same carbohydrate produces a lower and flatter rise. Resistant starch goes further: the small intestine cannot digest it at all, so it behaves more like fibre and feeds gut bacteria instead. Fibre-dense whole plates also blunt the response of everything eaten with them.',
    limit: 'Structured whole-food plant-based programmes have improved insulin sensitivity and in some participants reduced medication need - real findings, in supported settings, and generally in type 2 rather than type 1. What they do not tell you is what your medication should be tomorrow.',
    clinician: 'This is the entry with the most immediate risk in the whole app, and the Apothecary diabetes guide says it in full. Insulin and the sulfonylurea class lower blood sugar by a fixed amount regardless of what you ate; change the diet substantially and the same dose can suddenly be too much, within hours rather than months. The adjustment is a prescriber decision.',
  },
  'Weight & metabolic syndrome': {
    mechanism: 'Fibre and water content make a plate physically larger and slower to eat for the same energy, so satiety arrives earlier. The card frames this as density rather than restriction, which is both kinder and more accurate - the mechanism is that you stop sooner, not that you are permitted less.',
    limit: 'Weight loss is strongly associated with metabolic improvement, and the association is not the whole story: plenty of people improve glucose control markedly without much weight change, and plenty lose weight without it. Sleep, muscle mass, stress and medication all move the outcome independently, which is why the scale is a poor sole instrument.',
  },
  'Iron & anemia': {
    mechanism: 'Plant iron is non-heme and the gut absorbs it poorly on its own. Vitamin C converts it to the form the gut can take up and shields it from the phytate and polyphenols competing for it - which is why the card pairs them and why the pairing has to happen in the same meal rather than the same day.',
    limit: 'The "up to 6-fold" figure is right and is a multiplier on a small base: lifting absorption from 3% to a bit under 20% at best. The moringa figure on the card needs reading carefully - 28mg per 100g is dried leaf POWDER, and a heaped tablespoon is around 7g, so a realistic serving is nearer 2mg than 28. The Mineral atlas gives it as "about 1-2mg a tablespoon", which is the same food described honestly. A spoonful of moringa is a useful contribution, not a day\\u2019s iron.',
    clinician: 'Anaemia has many causes and low dietary iron is only one of them - blood loss is the more common one in adults and is the one worth ruling out. Iron supplements taken without a test can also do harm in people who store iron too readily. Fatigue is a symptom, not a diagnosis; a panel is what distinguishes them.',
  },
  'Vitamin D': {
    mechanism: 'Skin makes vitamin D from UVB, and how much depends on latitude, season, time of day, age and melanin - darker skin needs substantially longer exposure for the same synthesis, which is a physical fact about UV absorption rather than a deficiency of any kind. Mushrooms make D2 by the same UV mechanism, which is why deliberate sun-drying works.',
    limit: 'The mushroom figure is real and depends entirely on UV exposure: an ordinary mushroom grown in the dark carries very little, and the number applies to ones that have been exposed. D2 also appears to raise blood levels somewhat less effectively than D3 does. Sun exposure is genuinely seasonal - above roughly forty degrees of latitude, winter sun does not produce meaningful synthesis at all regardless of how long you stand in it.',
    clinician: 'This is one of two things on the plant-based watch-list the app says to supplement rather than improvise, and it is testable. Test, then discuss the number - the gap between insufficient and toxic is wide but it is not infinite.',
  },
  'Chronic inflammation': {
    mechanism: 'Several separate effects rather than one: polyphenols and carotenoids from a varied plate, curcumin from turmeric with piperine to make it absorbable, and ALA from hemp, chia and flax. Fibre matters too, through the short-chain fatty acids gut bacteria produce from it.',
    limit: 'Lower inflammatory markers on plant-heavy diets is a consistent observational finding, and observational is the operative word - people who eat this way differ in other ways too. Curcumin\\u2019s human outcome trials are more mixed than the popular account suggests, and much of the encouraging work uses concentrated extracts at doses a pot of curry does not approach. ALA converts to EPA and DHA only partially, which is why an algae-derived omega-3 is worth considering separately.',
  },
  'Gut microbiome': {
    mechanism: 'Different plants feed different bacteria, which is the whole reason the target is a count of species rather than a quantity of fibre. The thirty-plants-a-week figure comes from the American Gut Project, where people eating more than thirty distinct plant types showed more diverse microbiomes than those eating ten or fewer. Ferments add live organisms alongside that.',
    limit: 'Diversity is associated with health rather than proven to cause it, and the thirty figure is a useful heuristic from one large observational study rather than a clinical threshold. Most fermented organisms are transient - they pass through and do work on the way rather than colonising. Herbs, spices, nuts and seeds all count toward the thirty, which is what makes it reachable.',
    clinician: 'A sudden large increase in fibre is uncomfortable for most people and genuinely inadvisable for some - anyone with IBD, diverticular disease or a history of bowel obstruction should raise it before making the change rather than after.',
  },
};

export type SleepDepth = {
  /** Why it works. */
  why: string;
  /** How to actually do it. */
  how?: string;
};

/* Keyed on `name` in sleepHabits. */
export const sleepHabitDepth: Record<string, SleepDepth> = {
  'Screens down by 9:00p': {
    why: 'Evening light suppresses melatonin and shifts the body clock later, and short-wavelength light does it most. The screen is also doing a second thing that gets less attention: what is on it is engaging, and an alert mind delays sleep regardless of the light.',
    how: 'A fixed time works better than a rule about content, because the content always argues for one more. If the screen has to stay, night-shift settings and lower brightness help with the light half and do nothing for the engagement half.',
  },
  'Evening long-exhale breath': {
    why: 'A longer exhale than inhale increases vagal activity and slows heart rate, which is the best-evidenced piece of breathwork in this app. It is the same practice the Move section uses between sets, applied at the other end of the day.',
    how: 'In through the nose, out for roughly twice as long, for a few minutes. No holding at either end. It works sitting or lying down.',
  },
  'Magnesium-rich dinner': {
    why: 'Magnesium is a cofactor in the reactions that let muscle relax rather than contract, which is why shortfall shows up as cramp and restlessness before anything else. Pumpkin seeds, leafy greens, millet and cacao are where the Mineral atlas puts it.',
    how: 'From the plate rather than a tub, and remember the phytate: the grains and legumes carrying magnesium also bind it until they are soaked or fermented. Cacao in the evening carries caffeine and theobromine, so the seeds are the safer version of the same mineral.',
  },
  'No caffeine after 2:00p': {
    why: 'Caffeine has a half-life of around five hours in most adults, so a mid-afternoon coffee still has a meaningful fraction circulating at bedtime. It blocks adenosine, the molecule that accumulates through the day and produces sleep pressure - so it does not remove tiredness, it hides it.',
    how: 'The cutoff matters more than the count. Metabolism varies a lot between people and genuinely fast metabolisers exist, but the way to find out is to move the cutoff earlier for a week and see, not to assume you are one.',
  },
  'Consistent wake time': {
    why: 'The body clock is set far more strongly by wake time and morning light than by bedtime, so holding the wake time steady is what stabilises everything else. Sleeping in at weekends shifts the clock later and produces something close to jet lag on Monday.',
    how: 'Fix the wake time first and let bedtime follow. Light on the face soon after waking is what anchors it - outdoors beats a window, and a window beats a lamp.',
  },
};

/* Keyed on `label` in sleepStages. */
export const sleepStageDepth: Record<string, SleepDepth> = {
  Deep: {
    why: 'Slow-wave sleep, and the stage most associated with physical recovery - growth hormone release, tissue repair and the clearance processes that run while the brain is offline. It is front-loaded, concentrated in the first half of the night, which is why a late bedtime with a fixed wake time costs deep sleep specifically.',
  },
  REM: {
    why: 'Where most dreaming happens, and the stage linked to memory consolidation and emotional processing. Unlike deep sleep it is back-loaded, concentrated toward morning - so cutting sleep short at the end of the night costs REM specifically. Alcohol suppresses it noticeably.',
  },
  Light: {
    why: 'The majority of the night and the least glamorous number on this screen, which does not make it filler. Light sleep is where the transitions happen and it carries real restorative function; a night that were somehow all deep and REM would not be a better night.',
  },
  Awake: {
    why: 'Brief awakenings through the night are normal and most people do not remember them. A small percentage here is not a fault to correct.',
    how: 'These figures come from a consumer tracker rather than a sleep lab. Staged estimates from wrist devices are approximate, and the honest use of them is as a trend across weeks rather than a verdict on last night. If chasing the numbers is itself keeping you awake, that is a documented phenomenon and the answer is to stop looking at them.',
  },
};

export type LabDepth = {
  /** What the marker actually measures. */
  measures: string;
  /** Why the range is drawn where it is. */
  range: string;
};

/*
  Keyed on `name` in vaultLabs.

  These explain the MARKER. They deliberately do not interpret the seeded values
  beside them - reading a result back at someone is diagnosis, and this screen's
  own copy already routes that to a clinician.
*/
export const labDepth: Record<string, LabDepth> = {
  'Ferritin (iron stores)': {
    measures: 'Stored iron rather than circulating iron, which is what makes it the more useful early marker - stores fall first, and haemoglobin only drops once they are depleted. It is the test that catches iron shortfall before anaemia appears.',
    range: 'The reference range is wide and the low end is contested: many labs call anything above 30 normal, while several clinical guidelines treat values under 30 as deficient and some argue for a higher threshold in people with symptoms. Ferritin also rises with inflammation regardless of iron status, so a normal-looking result during illness can hide a real shortfall.',
  },
  'Vitamin B12': {
    measures: 'Circulating B12, most of which is bound to a protein the body cannot readily use - so serum B12 overstates what is actually available. Methylmalonic acid or homocysteine are the follow-up tests when the picture is unclear, because both rise when B12 is functionally short.',
    range: 'The bottom of the standard range is set where frank deficiency symptoms appear rather than where function is optimal, which is why results in the low-normal band are often flagged for discussion. This is one of the two nutrients the app says to supplement rather than improvise, because plants do not reliably supply it.',
  },
  'Vitamin D (25-OH)': {
    measures: '25-hydroxyvitamin D, the storage form, which reflects both what the skin has made and what has been eaten. It is measured rather than the active form because the active form is tightly regulated and stays normal-looking even when stores are low.',
    range: 'Where sufficiency begins is genuinely disputed between expert bodies, with common thresholds sitting between 20 and 30 ng/mL. Levels swing with the season for anyone at latitude, so the same person can move across a threshold between summer and winter without anything else changing.',
  },
  Hemoglobin: {
    measures: 'The oxygen-carrying protein in red blood cells, and the definition point for anaemia. It is a late marker for iron specifically - iron stores can be substantially depleted while haemoglobin is still normal, which is why ferritin sits above it on this list.',
    range: 'Ranges differ by sex and by altitude, and are shifted by pregnancy and by hydration - a dehydrated sample reads higher than the person actually is. A single value carries less information than a trend across several.',
  },
  HbA1c: {
    measures: 'The proportion of haemoglobin with glucose attached, which reflects average blood sugar over roughly the previous two to three months rather than that morning. That averaging is the point: it cannot be fixed by eating carefully the day before the test.',
    range: 'The thresholds are consensus cut-points on a continuous risk curve rather than natural boundaries. It can also be misleading where red cells turn over unusually fast or slow - in some anaemias, in pregnancy, and in some haemoglobin variants that are more common in people of African ancestry, which is worth knowing on this screen in particular.',
  },
};

export const CONDITION_DEPTH_COUNT = Object.keys(conditionDepth).length;
export const SLEEP_HABIT_DEPTH_COUNT = Object.keys(sleepHabitDepth).length;
export const SLEEP_STAGE_DEPTH_COUNT = Object.keys(sleepStageDepth).length;
export const LAB_DEPTH_COUNT = Object.keys(labDepth).length;
