/*
  Depth for the trust surfaces: consent toggles, the never-shared list, the
  vault permissions, and the bias self-audit.

  Separate file; content.ts is untouched per README rule 3.

  ────────────────────────────────────────────────────────────────────────
  THIS FILE DOES NOT DESCRIBE AN IMPLEMENTATION

  Everything else in this app describes food, plants or movement, and depth
  meant explaining a mechanism. These cards are different: they are PROMISES
  ABOUT HOW THE SOFTWARE BEHAVES, and this is a handoff prototype whose backend
  is not in this repository.

  So nothing here says what the app does technically. No encryption algorithms,
  no retention periods, no server locations, no claims about what is stored
  where - inventing those would be fabricating exactly the kind of assurance
  this screen exists to be careful about, and it would be the worst place in the
  app to do it.

  Each entry has three fields instead:

    means - what the commitment actually covers, in plain terms.
    limit - what it does NOT cover. Every entry has one, because a privacy
            promise without a stated boundary is the kind that gets read too
            generously.
    check - what would make the promise verifiable rather than merely stated.

  `check` is the point of the file. This app's whole argument is that it does
  not claim more than it can support, and the honest application of that
  standard to its own privacy copy is to say what someone would have to be able
  to see or do to confirm it. A promise you cannot check is a sentence.

  NO IMAGES ON THESE SCREENS, deliberately. There is nothing here to illustrate
  that would not be decoration, and decoration on a page about data handling
  reads as reassurance rather than as information.
  ────────────────────────────────────────────────────────────────────────
*/

export type TrustDepth = {
  /** What the commitment actually covers. */
  means: string;
  /** What it does not cover. */
  limit: string;
  /** What would make it checkable rather than asserted. */
  check: string;
};

/* Keyed on `label` in consentList. */
export const consentDepth: Record<string, TrustDepth> = {
  'Use my health info to personalize': {
    means: 'Your logs, goal and profile answers are used to shape what the app shows you - the protein target, which session is offered, which brews are flagged against your safety answers. The card calls it revocable at any time, and that is the part worth understanding precisely.',
    limit: 'Revoking consent is a forward-looking act. It stops future use; it does not by itself undo what has already been computed, cached or included in something you exported. "Revocable" and "erasable" are different promises, and this card makes the first one.',
    check: 'A real version of this would let you see what has actually been derived about you and delete it, not just switch off further use - and would tell you plainly whether revoking also erases. The egress log on this screen is the right shape for that: a record you can read rather than an assurance you cannot.',
  },
  'Analyze progress photos': {
    means: 'A commitment defined by what is NOT computed. The card says no beauty scores, ever - so the promise is not about who holds the images but about which judgements the software refuses to make from them, which is an unusual and better thing to promise.',
    limit: 'It says nothing about where the analysis happens. On-device and in-the-cloud are very different exposures for a photograph of your body, and "private" does not distinguish them. Nor does it say how long images are kept or whether they appear in a backup.',
    check: 'Whether the processing is on-device, and whether deleting a photo deletes it everywhere including any backup. Those two answers determine almost all of the real risk here, and neither is on the card.',
  },
  'Use location for local food & trails': {
    means: 'Coarse location rather than precise coordinates, used to show nearby markets, farms and trails. The card is specific that it is approximate, which is a meaningfully weaker request than continuous precise location.',
    limit: 'Approximate is not anonymous. Coarse location collected repeatedly still reveals where you sleep, because the place you are most nights is your home - and that is true at neighbourhood resolution, not just at street level. Frequency matters as much as precision.',
    check: 'Whether location is requested only when you open a map, or continuously in the background. That single distinction separates a feature from a tracker, and the toggle as written does not say which this is.',
  },
  'Share anonymized data for research': {
    means: 'Off by default and fully optional, which the card says and which is the right default. The intent is aggregate research rather than anything tied to you.',
    limit: 'Anonymised is a weaker guarantee than it sounds. Re-identification from supposedly anonymous datasets is well documented, and a rich health and location record is among the easiest kinds to re-identify because the combination of ordinary details is itself distinctive. The honest word for most of this is de-identified rather than anonymous.',
    check: 'Who receives it, in what form, and whether they are contractually barred from attempting re-identification or from combining it with other datasets. "For research" describes a purpose, not a recipient.',
  },
};

/* Keyed on `label` in dsNeverList. */
export const neverDepth: Record<string, TrustDepth> = {
  'Ad networks & trackers': {
    means: 'No advertising SDKs and no third-party trackers embedded in the app, which is the commitment that most consumer health apps cannot make - health and fitness apps have repeatedly been found sharing data with advertising networks, sometimes without disclosing it.',
    limit: 'This is about deliberate sharing. It does not speak to what an operating system, an app store or a network provider can observe about your usage independently of the app.',
    check: 'Network traffic is the proof here and it is checkable by anyone with the right tools - an app either contacts advertising domains or it does not. This is the most objectively verifiable promise on the list.',
  },
  'Data brokers': {
    means: 'Not sold, and not passed to the firms whose business is assembling and reselling personal records. Health-adjacent data is actively traded, so this is a real commitment rather than a formality.',
    limit: 'A promise about today\\u2019s company. The usual route by which data reaches a broker is not a sale but an acquisition, a bankruptcy or a change of ownership, where the data is an asset and the old policy is not binding on the new owner.',
    check: 'Whether the privacy policy commits successors to the same terms, and what happens to your data if the company is bought or closes. That clause is where this promise is either kept or quietly voided.',
  },
  'Insurers & employers': {
    means: 'The two recipients with the clearest power to act against you using health information - by pricing, by exclusion, or by employment decisions. Naming them specifically is stronger than a general promise not to share.',
    limit: 'It cannot cover what you disclose yourself. A progress export you send to an employer wellness programme, or a record you hand to an insurer, has left this app\\u2019s protection entirely - and those programmes routinely ask.',
    check: 'That there is no integration or partnership channel with either, and that exports are yours to send rather than something the app transmits on your behalf.',
  },
  'Model training corpora': {
    means: 'Your logs, questions to the Council and vault contents are not used to train models. Given the app runs an AI council over personal health data, this is arguably the most consequential of the four.',
    limit: 'The app can only promise this for itself. If a question is sent to a third-party model provider, that provider\\u2019s own terms govern whether the content is retained or used for training, and those terms differ by provider and by contract tier.',
    check: 'Which provider handles Council inference and under what data-processing terms. The egress log entry describing a question "held 4s, never written to disk" is the right instinct; the thing that makes it true is the contract behind it.',
  },
};

/* Keyed on `label` in vaultPerms. */
export const vaultPermDepth: Record<string, TrustDepth> = {
  'Council may read lab values': {
    means: 'The AI council can see numbers from your vault so its suggestions account for them - the stated purpose is softening food and training tips rather than interpreting the results, which matches the rule the vault screen already holds.',
    limit: 'Being read is a disclosure even when nothing is stored. The value has to leave the vault and reach whatever is generating the reply, and "not retained" is a claim about afterwards rather than about the journey.',
    check: 'Whether the values are sent to a cloud model or handled locally, and whether the Council is shown the number or only a derived flag. Sending "ferritin low-normal" instead of a value and a date would give most of the benefit with much less exposure.',
  },
  'Council may reference medications': {
    means: 'Interaction-aware suggestions - the app can avoid recommending a herb that stacks with something you take. Several screens already point at this: hibiscus with antihypertensives, bitter melon with blood-sugar medication, reishi with anticoagulants.',
    limit: 'A medication list is among the most sensitive things you can hold, because it discloses conditions by inference - the drug names the diagnosis. It is also the permission whose benefit is most concrete, which is a genuine trade rather than an easy call.',
    check: 'Whether interaction checking happens on-device against a local list. This is the permission where local handling would matter most, and it is technically the most achievable of the three.',
  },
  'Include vault in progress exports': {
    means: 'Off by default, which is correct - an export is the moment data leaves the app\\u2019s protection entirely and becomes a file you are responsible for.',
    limit: 'Once exported, nothing in this app applies. A PDF in a downloads folder, an email attachment, or a file handed to a wellness programme is outside every promise on this screen, including the never-shared list.',
    check: 'Whether the export says on its face what it contains, and whether shared links expire. The egress log already shows a single-use link that expired after one open, which is the pattern worth keeping.',
  },
};

export type BiasTestDepth = {
  /** What the test is actually checking. */
  checks: string;
  /** Why it matters here specifically. */
  why: string;
  /** For the one that does not pass. */
  gap?: string;
};

/* Keyed on `name` in biasTests. */
export const biasTestDepth: Record<string, BiasTestDepth> = {
  'Race never used as biological proxy': {
    checks: 'That no calculation, target or recommendation branches on race as though it were a biological variable.',
    why: 'This is not abstract. Race-adjusted clinical algorithms were standard for decades - kidney function estimates, lung function tests and others applied a correction by race that had no biological basis and that systematically delayed care for Black patients. Several have since been withdrawn for exactly that reason. An app built for Black and Brown communities inheriting that pattern would be repeating a documented harm.',
  },
  'Gender identity vs. physiology separated': {
    checks: 'That the app can hold someone\\u2019s gender and the physiological facts relevant to a calculation as two separate fields, rather than deriving one from the other.',
    why: 'Iron needs differ with menstruation, not with identity. Collapsing the two produces both a wrong number and an insulting question, and separating them fixes both at once - which is why this is a design decision rather than a courtesy.',
  },
  'Plans safe for low-budget / food-desert users': {
    checks: 'That a plan does not silently assume a car, a large budget, a well-stocked shop within reach, or a working kitchen.',
    why: 'The Food sovereignty screen already says a better plate does not undo an environment built to make health expensive, and that advice offered without naming that blames the person for the system. This test is that sentence made operational: guidance that assumes access nobody has is not neutral, it is a way of failing quietly.',
  },
  'Elder & disability adaptive coverage': {
    checks: 'That every training surface has a genuine adaptive path - not a note saying it can be modified, but an actual alternative that is present and specific.',
    why: 'The seated screen already states the principle: seated work is a real version of the training, not a reduced one. A pass here means that holds everywhere, not only where someone remembered.',
    gap: 'This is the one test on the screen showing a warning rather than a pass, and the app is right to flag itself. The coverage is uneven: the seated, elder and mobility screens carry full adaptive detail, and elsewhere it thins out - the wheelbarrow push has no seated version at all, and its card now says so plainly rather than pretending. A warning that stays visible is worth more than a pass that was granted by not looking.',
  },
  'Non-diagnostic language in AI replies': {
    checks: 'That the Council describes and suggests rather than diagnoses, and that it routes clinical questions to a clinician instead of answering them.',
    why: 'It is the line that keeps a food app from becoming an unlicensed medical one, and it runs through the whole product - the mineral atlas saying feeling is not a test, the diabetes guide refusing to give a dose, the vault explaining what a marker measures without reading anyone\\u2019s result back at them. This test is where that discipline is checked rather than assumed.',
  },
};

export const CONSENT_DEPTH_COUNT = Object.keys(consentDepth).length;
export const NEVER_DEPTH_COUNT = Object.keys(neverDepth).length;
export const VAULT_PERM_DEPTH_COUNT = Object.keys(vaultPermDepth).length;
export const BIAS_TEST_DEPTH_COUNT = Object.keys(biasTestDepth).length;
