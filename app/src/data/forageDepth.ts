/*
  Depth for Foraged foods.

  The fifteen cards carried a botanical name, a season, a one-line `use` and - on
  three of them - a `warn`. This adds the preparation process in full, how to cut
  so the stand survives, what it gets confused with, and how to keep it.

  Separate file; content.ts is untouched per README rule 3.

  ────────────────────────────────────────────────────────────────────────
  THIS FILE IS NOT AN IDENTIFICATION KEY, AND WILL NOT BECOME ONE

  The screen's first band - deliberately first, not buried - says: "Never eat a
  wild plant identified from an app, a photo or a single book."

  That rule shapes the `confuse` field below. It names what a plant is confused
  WITH and what the consequence of getting it wrong is, because knowing that a
  risk exists is what sends someone to a teacher. It does NOT give the
  distinguishing characters you would need to make the call yourself. Half a key
  is more dangerous than none: it produces confidence without competence.

  So `confuse` is written to close the question with a person, not to answer it.
  Where a plant has a genuinely serious confusion - purslane and the spurges,
  lambsquarters and young nightshades - it says so plainly and still refuses to
  arbitrate.

  `prep` is where the real value is, and it assumes the plant is already
  correctly identified, bought, grown or handed to you by someone who knows it.
  Several of these preparations are not optional flourishes - chaya must be
  boiled, bitterleaf must be washed, nettle must be heated - and those are
  written as the requirements they are.
  ────────────────────────────────────────────────────────────────────────
*/

export type ForageDepth = {
  /** The preparation process, assuming the plant is already correctly known. */
  prep: string;
  /** Cutting so the plant or the stand survives being harvested. */
  harvest: string;
  /** What it is confused with. Never how to tell them apart - see above. */
  confuse: string;
  /** Storing or preserving it. */
  keeps: string;
};

export const forageDepth: Record<string, ForageDepth> = {
  Dandelion: {
    prep: 'Two different foods off one plant. The greens are best before the flower opens - after that the bitterness climbs steeply and does not come back down. Blanching briefly in salted water and discarding it takes the hard edge off; a long soak in cold water does much the same. The root is the more interesting half: scrub it, chop it small, dry it, then roast it in a low oven until it is dark chocolate brown and smells of caramel rather than earth. Stopping short of that gives you something bitter and grassy. Ground and simmered - not steeped, it needs a real decoction - it makes the classic dandelion coffee.',
    harvest: 'The taproot is the plant, so digging is killing it; take roots from ground that is being turned anyway, and take leaves from plants you want to keep. It regenerates readily from root fragments, which is why nobody has ever successfully weeded it out of a lawn.',
    confuse: 'Dandelion has several common lookalikes in its own family, and the usual ones are not dangerous. The real hazard with this plant is not the species but the ground: it is a hyperaccumulator growing exactly where people spray, and roadside verges, park edges and treated lawns are the worst places to pick it. Where it grew matters more than what it is.',
    keeps: 'Greens wilt within a day or two - use them fast. Roasted root keeps for months in a sealed jar in the dark, and grinds fresh better than it stores ground.',
  },

  'Stinging nettle': {
    prep: 'Heat or drying destroys the sting completely and permanently - this is not a reduction, it is a chemical change, and thirty seconds in boiling water is enough. After that it handles exactly like spinach and tastes deeper and more mineral. Save the blanching water: it is dark green and full of what came out of the leaf, and it makes a better stock or tea base than it does a thing to pour away. For tea, dry the tops fully and store them whole, crushing only as you brew.',
    harvest: 'Gloves, always, and long sleeves. Take the top four to six leaves of young plants before they flower; once nettle flowers and sets seed the leaves develop gritty particles that are best avoided, so the season really does close. Cutting the tops makes it branch and give you a second flush.',
    confuse: 'Nettle is confused with a handful of similar-looking plants, most of them harmless, and its sting is a fairly effective self-identifying feature. The season limit above is the more commonly missed point - people keep picking it well past the flowering stage.',
    keeps: 'Blanched and squeezed into balls it freezes very well for a year. Dried, it keeps a year in a jar away from light; it should still be deep green, and hay-coloured nettle has lost most of the point.',
  },

  'Purslane · verdolaga': {
    prep: 'Barely needs cooking and is arguably better raw - the leaves are thick and juicy with a clean lemony acidity and a slight mucilaginous quality that thickens whatever it is stirred into. Rinse it hard, because it grows low and sandy. Raw in salad with lime, onion and oil is the standard treatment from Mexico to the Levant; briefly stewed with tomato it goes silky. Long cooking is a waste of it. The stems are as good as the leaves and should not be stripped out.',
    harvest: 'An annual that regrows fast from cutting rather than pulling - take the tips and it will bush out and give repeatedly through the hot months. It thrives in the disturbed ground nobody else wants, which is a large part of its history as a free food.',
    confuse: 'This is the one on this page with a serious lookalike. Purslane shares its sidewalk-crack and garden-bed habitat with the spurges, which are toxic, and the two grow side by side in exactly the same conditions. There is a well-known distinguishing feature and this card is deliberately not printing it, because a person who learns one character from an app and goes picking is the exact failure mode the band at the top of this screen exists to prevent. Learn this plant from someone who can put both in your hand.',
    keeps: 'Poorly - it is a fresh vegetable and goes limp within days. It pickles well in vinegar, which is the traditional answer to a glut.',
  },

  Lambsquarters: {
    prep: 'Cook it. Like its relatives spinach and chard it carries oxalates, and cooking is both what makes it taste better and what moderates that. Young leaves and growing tips are the part worth having; older leaves get tough and the stems turn woody. It takes garlic and fat well and collapses like spinach, so start with far more than seems reasonable. The seed heads can be threshed and cooked as a grain like its cultivated cousin quinoa, though the yield is small for the labour.',
    harvest: 'Pinch out the growing tips rather than pulling the plant - it responds by branching and gives you far more over a season. It is a prolific volunteer in cultivated ground and generally more useful than whatever it is competing with.',
    confuse: 'Young lambsquarters is confused with the seedlings of several unrelated plants, including nightshades, which is a confusion with real consequences. As with purslane, this card names the risk and stops there. Learn it standing over it with someone who grows it.',
    keeps: 'Blanches and freezes well. Dries acceptably but loses the texture that makes it worth cooking.',
  },

  'Dulse & kelp': {
    prep: 'Dulse needs almost nothing: rinse the salt off, and it can be eaten as it is, chewy and savoury, or pan-toasted for a few seconds until it crisps and turns almost bacon-like. Do not toast it long or it goes bitter. Kelp is the opposite - it wants time. A strip dropped into a pot of beans or stock softens them, adds glutamate depth, and is traditionally credited with shortening the cooking; fish it out before serving or slice it in. Both are already salty, so salt the dish at the end or not at all.',
    harvest: 'Cut above the holdfast, never pull - the holdfast is how the plant is anchored and how it regrows, and tearing it off ends that individual permanently. Take from the middle of a healthy stand rather than stripping one patch, and never take drift weed off the beach for eating.',
    confuse: 'Confusion between edible seaweeds is a much smaller risk than with land plants. The real questions here are the water it grew in - seaweed concentrates whatever is dissolved around it, including heavy metals - and how much you are eating, because the iodine load is significant. Buy from a harvester who tests, or learn the local water from someone who knows it.',
    keeps: 'Dried and sealed away from damp, both keep for a year or more. They reabsorb moisture from the air readily and go limp, so a tight jar matters more than a cool one.',
  },

  'Sea moss': {
    prep: 'Rinse it repeatedly in cool water until the water runs clear and the sea smell fades - it arrives carrying sand, salt and often bits of shell, and under-rinsing is why homemade gel tastes of low tide. Soak it several hours until it swells and turns pale and translucent, then blend with fresh water until smooth. It sets to a firm gel in the fridge without any heat at all. A spoonful stirs into a drink, a smoothie or a stew, where it thickens without flavour. Traditionally it is soaked with a lime or a citrus peel, which helps the smell.',
    harvest: 'Cut rather than uproot, and leave the base attached to the rock so the plant regrows. Wild stands are under real pressure from demand.',
    confuse: 'The market is the problem here, not the reef. A great deal of what is sold as sea moss is pool-grown in tanks rather than ocean-harvested, and some is bleached or salted to look the part. This is a supply-chain question rather than an identification one, and it is answered by knowing your seller.',
    keeps: 'Dried, it keeps a year or more. Made into gel, it is a fresh food: about two to three weeks refrigerated, and it freezes in portions.',
  },

  'Sorrel · roselle': {
    prep: 'The tart red calyces are the part used, not the flower and not the leaf. Fresh, they are trimmed off the seed pod; dried, they go straight in. A hot steep for ten minutes pulls the colour and acidity quickly; a cold steep overnight gives a rounder, less astringent drink and is the better method if you have the time. Ginger, clove, cinnamon and orange peel are the standard company from Dakar to Kingston, and the sweetening goes in while it is hot so it dissolves. It is very tart - the sugar is doing structural work, not just sweetening.',
    harvest: 'Cut the calyces as the pods swell but before they dry on the plant. Picking them keeps the plant producing.',
    confuse: 'This is a cultivated hibiscus rather than a wild-gathered plant in most places, so misidentification is a minor concern. Note only that "sorrel" names a completely different plant in Europe - the sour green leaf - and recipes cross over confusingly.',
    keeps: 'Dried calyces keep a year in a sealed jar. The brewed drink is a fresh drink: several days refrigerated, and it will begin to ferment if left, which is a traditional outcome rather than a spoiled one.',
  },

  'Cerasee vine': {
    prep: 'Traditionally a short bush tea, not a daily drink. The leaves and vine are washed and steeped or briefly boiled, and the result is genuinely, aggressively bitter in a way people do not expect - the bitterness is the point and it is not masked with sugar in traditional use. It is taken in short courses rather than continuously, which is how it is described on the card and is the part most often lost when it is repackaged as a wellness tea.',
    harvest: 'Take young vine tips and leaves; it grows back vigorously and is regarded as a weed in much of its range.',
    confuse: 'It is a cucurbit and its relatives are widespread. The more important caution is already on the card and is a safety matter rather than an identification one - see below.',
    keeps: 'Dries well and keeps in a jar. The brewed tea does not keep and is made fresh.',
  },

  'Moringa leaf': {
    prep: 'Strip the leaflets off the stems with a downward pull of finger and thumb - the stems are fibrous and stay unpleasant however long they cook, and stripping is most of the work. Fresh leaves cook in a minute or two and go bitter if pushed further, so they belong at the end of a soup rather than the start. For powder, dry in shade rather than sun: direct sunlight degrades the colour and a good part of the vitamin content, and shade-dried moringa stays vivid green while sun-dried goes khaki. Grind only when dry enough to shatter.',
    harvest: 'Cut branch tips rather than stripping a whole branch, and the tree responds by branching lower and becoming easier to pick. It leafs through drought when almost nothing else does, which is precisely when it matters.',
    confuse: 'Distinctive and usually cultivated in a yard rather than gathered wild, so the risk is low. Powder quality on the open market is the more real variable.',
    keeps: 'Fresh leaves are a two-day vegetable. Properly dried leaf keeps six months to a year in a sealed jar away from light; powder loses potency faster than whole dried leaf, so store it whole if you can.',
  },

  'Baobab leaf': {
    prep: 'Young leaves are dried and pounded to the fine green powder called kuka, which is stirred into soups and stews as both a thickener and a green - it goes in near the end and disperses rather than sitting as leaves. The fruit pulp is an entirely different ingredient: it comes out of the pod as dry chalky white chunks around the seeds, and dissolves into water for a tart, citrus-like drink. Neither needs cooking as such; both are being rehydrated rather than heated.',
    harvest: 'Leaves are taken young in the rains, when the tree is in leaf at all - it is bare for much of the year. Baobabs are extremely long-lived and often communally held; harvesting rights are a social matter as much as a practical one.',
    confuse: 'The tree is unmistakable and usually known to everyone locally. Powder adulteration in export markets is the real variable.',
    keeps: 'Kuka powder and dried fruit pulp both keep for a long time if sealed and dry. The pulp is naturally low in moisture and very stable.',
  },

  Bitterleaf: {
    prep: 'The washing is the recipe. Fresh leaves are squeezed and rinsed by hand in changes of water - repeatedly, sometimes for a long time - until the bitterness drops to where you want it, and how far to take that is a matter of taste and household tradition rather than a fixed number of rinses. Wash it out entirely and you have removed the reason it is in the pot. Then it goes into soup and cooks long and slow. Pre-washed and frozen leaf is widely sold and skips the labour at some cost to the result.',
    harvest: 'Cut leaves and stems; it coppices hard and regrows quickly. It is commonly grown at the edge of a compound rather than gathered from the bush.',
    confuse: 'Usually cultivated and known locally. Note that several unrelated bitter greens are sold under the same English name in different places, so a recipe and a market bag may not be talking about the same plant.',
    keeps: 'Washed leaf freezes well and is normally stored that way. Dried leaf is used but is a different, weaker ingredient.',
  },

  'Wild amaranth · efo': {
    prep: 'Cooked exactly like the cultivated callaloo it is - a wash, a rough chop, and a long enough braise with onion, tomato, pepper and oil to go glossy and soft rather than a quick wilt. Like lambsquarters it carries oxalates and is a cooked green rather than a salad one. The seed heads are a genuine second crop: dried, rubbed out and winnowed, they give a small nutty grain that cooks like a tiny porridge. The yield is modest but the plant produces enormous quantities of seed.',
    harvest: 'Cut the growing tips and it branches and keeps producing; leave one or two plants to run to seed and it will volunteer for you next season, which is how it has followed cultivation around the world.',
    confuse: 'Amaranth seedlings resemble those of several other plants, including some you would not want. It is far more commonly a deliberate volunteer in a garden bed - where you know what you planted and what came up with it - than something gathered blind.',
    keeps: 'A fresh green, a few days. Cooks down and freezes well. Seed keeps indefinitely dry.',
  },

  'Pumpkin leaves & tendrils': {
    prep: 'The young tips, tendrils and the leaves behind them are what you want. Mature leaves are covered in stiff hairs and have stringy ribs, and the traditional preparation deals with both: snap the stem and pull, and the tough outer fibre strips away in a long thread, taking much of the roughness with it. That de-stringing is the step people skip and then wonder why it is scratchy. After that they cook down for a good while - not a quick wilt - with groundnut paste or coconut milk, which is the classic pairing across East and West Africa.',
    harvest: 'This is genuinely a second harvest off a plant grown for something else, and the vine tolerates losing its tips well. Taking too many too early costs you fruit later, so it is a real trade rather than a free lunch.',
    confuse: 'You are picking from a vine you or a neighbour planted, so this is not a wild-identification situation. Cucurbit leaves across the family are broadly treated the same way.',
    keeps: 'Wilts within a day - cook it the day you cut it. Cooked, it keeps a few days refrigerated.',
  },

  'Chaya · tree spinach': {
    prep: 'The boiling is not a preference, it is the requirement, and it is already on the card: at least five minutes at a genuine rolling boil, in an open pot, and never in aluminium. Raw chaya contains cyanogenic glycosides, and the reason the pot stays uncovered is so what is driven off leaves rather than condensing back in. Aluminium reacts with the leaf and produces a toxic broth, so the pot material is part of the safety instruction rather than a cooking preference. Discard the water. After that it is a mild, thick, excellent green that cooks like a sturdier spinach and holds up in stews. The sap can irritate skin, so some people prefer to handle it with gloves.',
    harvest: 'A dooryard tree that is cut back hard and responds with vigorous new growth - it is one of the highest-yielding leaf crops there is. Take young leaves and growing tips.',
    confuse: 'Chaya is planted, not gathered, and is grown from cuttings passed hand to hand. The hazard is not identifying the wrong plant; the hazard is cooking the right plant wrongly, which is why that instruction is on the card and repeated here.',
    keeps: 'Fresh leaves keep a few days. Once boiled it refrigerates and freezes normally. Never store or serve it raw.',
  },

  'Chipilín': {
    prep: 'Strip the small leaves from the stems and use them the day they are cut - it wilts faster than almost anything else here and loses its aroma with it. It is not really a standalone green; it is folded into masa for tamales, stirred through rice as it finishes, or dropped into soup at the end, and it perfumes the whole dish with something between fresh peas and hay. A little goes a long way. Cook it - it is a legume leaf and belongs in the pot, not the salad bowl.',
    harvest: 'Cut the tips; it is a fast-growing perennial legume that fixes its own nitrogen and regrows readily.',
    confuse: 'Locally grown and locally known, generally sold in bunches in the market. Note it is a Crotalaria, a genus in which many species are not food, so this is a plant to take from a market or a grower rather than to gather on a guess.',
    keeps: 'Barely - a day, maybe two. It dries for tea and freezes stripped, but the aroma that is the whole point does not survive either especially well.',
  },
};

export const FORAGE_DEPTH_COUNT = Object.keys(forageDepth).length;
