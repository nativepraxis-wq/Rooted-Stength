/*
  Depth for Mushroom mastery.

  The six cards carried `role`, one `use` sentence and an evidence badge. This
  adds the kitchen process in full, what the compound story actually is, how to
  buy and keep them, and - the field that matters most on this screen - what the
  research does NOT support.

  Separate file; content.ts is untouched per README rule 3.

  ────────────────────────────────────────────────────────────────────────
  TWO RULES THIS FILE OBEYS

  1. CONTENT RULE 5. The screen's own band says wild mushrooms are never
     identified from a photo, "not from this app, not from any app". So nothing
     here describes how to recognise a mushroom in the field. Every entry assumes
     the fungus was CULTIVATED OR BOUGHT, and `buying` talks about suppliers and
     labels rather than habitat, cap shape or spore colour. There is no
     identification content in this file, deliberately.

  2. THE EXTRACT GAP. The screen's closing band says most functional-mushroom
     research uses concentrated extracts at doses a culinary serving never
     reaches. `limit` is where that gets said per mushroom, in specifics, because
     a general disclaimer at the bottom of a page is easy to read past. No entry
     here gives a dose.
  ────────────────────────────────────────────────────────────────────────
*/

export type MushroomDepth = {
  /** The cooking or brewing process, in full. */
  kitchen: string;
  /** What is actually in it, and how well that is established. */
  compound: string;
  /** Choosing and storing it. Supplier and label, never habitat. */
  buying: string;
  /** What the evidence does not carry. Never a dose. */
  limit: string;
  /** Safety note where there is a real one. */
  watch?: string;
};

export const mushroomDepth: Record<string, MushroomDepth> = {
  Oyster: {
    kitchen: 'Tear rather than slice - a torn edge is ragged and catches heat, and the strands separate along the grain the way the cluster grew. Get a dry pan properly hot before anything goes in, and do not crowd it. Oyster mushrooms are mostly water, and a cool or crowded pan steams them into something grey and squeaky. Let them sit undisturbed until the underside is deep brown, then turn. Salt at the end, never at the start: salt early pulls the water out and you are back to steaming. Oil goes in after the first browning, not before, because the mushroom will drink it and never release it.',
    compound: 'Protein, B-vitamins, beta-glucans, and ergothioneine - an amino acid that mushrooms make and animals mostly do not, which is why they are one of the few substantial dietary sources. Oysters also naturally contain small amounts of lovastatin, the compound behind a class of cholesterol drugs, though at concentrations far below a prescription.',
    buying: 'Bought and farmed year-round, usually in fanned clusters. Look for dry, springy caps with clean edges; sliminess or a sour smell means they have been bagged wet too long. Keep them in paper, never sealed plastic, and use within a few days. They freeze poorly raw and well once seared.',
    limit: 'The ergothioneine and beta-glucan research is largely laboratory and observational. A pan of oyster mushrooms is genuinely good food with real protein and real micronutrients - it is not a cholesterol treatment, and the lovastatin content is not a reason to change any medication.',
  },

  Shiitake: {
    kitchen: 'Two separate processes, and they do different jobs. For vitamin D, lay the caps gills-up in direct sun for several hours - the ultraviolet converts ergosterol in the gills into vitamin D2, and gills-down wastes the exposure entirely. For flavour, dry them fully and rehydrate in hot water; the soaking liquid comes out dark and deeply savoury and should go into the pot, not the sink. Strip the stems - they stay tough however long you cook them - but simmer them into stock rather than binning them. Always cook shiitake through.',
    compound: 'Lentinan, a beta-glucan and one of the most-studied mushroom polysaccharides, plus guanylate compounds that give the umami its depth. The vitamin D2 conversion under UV is well established and can be substantial, which makes sun-drying one of the few genuinely high-yield kitchen interventions on this page.',
    buying: 'Fresh or dried, both cultivated. Dried are cheaper, keep for a year in a sealed jar away from light, and arguably taste better. Thick caps with deep cracks - sometimes sold as donko or flower shiitake - are the premium grade and hold texture best.',
    limit: 'Lentinan is real, but the clinical trials behind it overwhelmingly use it as a purified compound given by injection alongside conventional cancer treatment in Japan - not eaten, and not instead of anything. Eating shiitake does not reproduce that. The vitamin D claim is the one on this card that survives the journey from lab to kitchen intact.',
    watch: 'Raw or undercooked shiitake causes shiitake dermatitis in some people - a distinctive itchy, whip-mark rash that can take days to appear. Thorough cooking prevents it.',
  },

  "Lion's Mane": {
    kitchen: 'Do not slice it into rounds; pull it apart into shaggy strands with your fingers, which is what gives the crab-cake texture its whole point. Press the strands firmly in a dry hot pan - a weight on top helps - and let the water drive off before any fat goes in. It will shrink a long way and then start to brown and sweeten. Season at the end. Bound with a little flour or chickpea flour and an egg substitute it forms patties that hold together and take lemon well.',
    compound: 'Hericenones in the fruiting body and erinacines in the mycelium, both of which stimulate nerve growth factor in laboratory conditions. That is a genuine and interesting finding. The human work is a small number of small trials, mostly in older adults with mild cognitive complaints, with mixed results and short durations.',
    buying: 'Cultivated, sold as a white pom-pom of soft spines. It should be dry and springy; yellowing or browning means it is past it, and it goes over faster than most. Paper bag, cold, a few days at most.',
    limit: 'The nerve growth factor finding comes from cells and animals. It has not been shown that eating lion’s mane produces that effect in a human brain, and the phrase "studied for" on the card is doing exactly the work it should - marking an open question, not a result. It is an excellent, unusual ingredient. Treat any focus benefit as unproven.',
  },

  Reishi: {
    kitchen: 'This one is not food. It is woody, corky and far too tough to chew, so the only route is extraction. Break or cut the dried bracket into small pieces to expose more surface, cover with water and hold it at a bare simmer for at least twenty minutes - an hour is better - then strain. It comes out dark, bitter and astringent, and the bitterness is the triterpenes, so a tea that tastes of nothing has not extracted much. Ginger, cinnamon or a little honey make it drinkable without hiding it. The same pieces can take a second, weaker simmer.',
    compound: 'Two families do the work and they need different solvents: beta-glucans, which are water-soluble and come out in a simmer, and triterpenes, which are bitter, only partly water-soluble, and are the reason traditional preparations often use alcohol as well as water. A quick steep like a teabag extracts very little of either.',
    buying: 'Sold as dried slices or whole brackets, cultivated on hardwood. Slices should be firm and woody with a varnished red-brown top, not crumbling. It keeps for a long time in a dry jar.',
    limit: 'Reishi is graded traditional use on this card and that grading is honest. It has a long documented history as a calming tonic and a thin, inconsistent clinical record. A bitter evening tea that closes out a hard day is a real ritual with a real effect on how the evening goes; that is not the same as a demonstrated pharmacological result.',
    watch: 'Reishi may affect clotting and can interact with anticoagulant and antiplatelet medication. If you take blood thinners, or have surgery coming, this is a clinician conversation first.',
  },

  Cordyceps: {
    kitchen: 'Cultivated Cordyceps militaris comes as bright orange dried stalks or as a powder. As stalks, simmer them for fifteen to twenty minutes into a broth or tea - a brief steep will not open them up. As powder, it stirs into hot water, coffee or a pre-training drink and does not need heat at all. It is mildly savoury rather than bitter, so it disappears into a cup far more easily than reishi does.',
    compound: 'Cordycepin and adenosine-related compounds, plus polysaccharides. The endurance research looks at oxygen use and time to exhaustion, and the more encouraging results have come from older and untrained participants rather than trained athletes.',
    buying: 'Buy cultivated Cordyceps militaris, which is what almost everything on the market actually is. Wild Ophiocordyceps sinensis is a different species, is among the most expensive biological products on earth, and is correspondingly one of the most adulterated - it is not a sensible purchase and this card does not assume it. The screen already says cultivated only.',
    limit: 'The trials are small, short and heterogeneous, and several are in the exact populations least like a trained person - which matters, because an untrained participant improves on almost any intervention. Treat it as a plausible, unsettled ergogenic aid. It is not established that it does anything for someone already training hard.',
  },

  'Turkey Tail': {
    kitchen: 'Also not chewable - thin, leathery and fibrous, so it is decocted rather than eaten. Break the dried fans up, cover with water and simmer gently for thirty minutes to an hour, then strain through a fine sieve. The result is mild, faintly woody and much easier to drink than reishi. It combines well with ginger and is often simmered into a stock base rather than drunk alone.',
    compound: 'PSK (krestin) and PSP, two protein-bound polysaccharides. These have the most serious clinical file of anything on this page: PSK has been used for decades in Japan as an adjuvant alongside conventional cancer treatment, with survival data behind it.',
    buying: 'Cultivated dried fans or a decocted extract. Because the serious evidence is for specific standardised extracts rather than for the mushroom generally, what is on the label matters more here than anywhere else on this screen.',
    limit: 'This is the entry where the extract gap is widest and most consequential. PSK is a purified, standardised pharmaceutical preparation given ALONGSIDE cancer treatment under medical supervision - it is not turkey tail tea, and nothing here is a treatment or a substitute for one. The card says clinician-aware use and means it literally: if this is being considered during cancer treatment, it belongs in a conversation with the oncologist, because interactions with treatment are the whole question.',
    watch: 'If you are in cancer treatment, do not add this without telling your oncology team. That is not a formality - the interaction question is the entire point.',
  },
};

export const MUSHROOM_DEPTH_COUNT = Object.keys(mushroomDepth).length;
