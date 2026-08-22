/*
  Depth for the Foodways Codex, and the thirteen dishes that take the African
  American volume from seven to twenty.

  content.ts is untouched per README rule 3, which is why the new dishes live
  here and are merged into the region at render time rather than edited into the
  array. They are additions, not corrections: nothing already in the codex is
  changed, reordered or reclassified by this file.

  ────────────────────────────────────────────────────────────────────────
  WHAT "DEPTH" MEANS ON THIS SCREEN

  The dish cards carried a name, a place, a classification badge and one line.
  The zone cards carried a name, a crop list and one line. Both are doing
  historical work, so the depth follows the codex's own division of labour
  rather than inventing a new one:

    dish.build - what is actually in it and how it is made.
    dish.stands - WHY it carries the badge it carries. This is the editorial
      core of the product: a dish is never relabelled to suit a diet, and
      diaspora food is never described as "veganised". So `stands` explains the
      classification instead of quietly assuming it, and where the honest answer
      is "this is contested", it says that.
    dish.watch - only where a dish carries a real hazard. Two do.

    zone.system - how the growing actually works there.
    zone.hands - whose knowledge this is, named where it is nameable.
    zone.pressure - what is threatening it now.

  ON THE THIRTEEN NEW DISHES

  Every one is documented, and each is placed in a zone the codex already
  defines. Classifications use the canonical six from data/tiers.ts and are
  argued in `stands` rather than asserted.

  Two deserve flagging up front:

  - Black Appalachia's own zone note says it is "significantly under-documented
    next to the Lowcountry. The Codex flags the gap rather than filling it with
    invention." Two dishes are added there, and both say plainly that the
    Appalachian record is broad while the specifically BLACK Appalachian record
    is thin. Adding a dish must not quietly close a gap the codex deliberately
    left open.

  - Poke sallet is food only under a preparation that is not optional. It is the
    chaya of this section, and its `watch` is written as the requirement it is.
  ────────────────────────────────────────────────────────────────────────
*/

export type CodexDish = {
  n: string;
  p: string;
  cls: 'vegan' | 'forward' | 'adapt' | 'recon' | 'diasporic' | 'contemp';
  d: string;
};

/*
  Merged onto the end of the region's own `dishes` at render. Keyed by region id
  so other volumes can be extended the same way later without touching this
  screen again.
*/
export const codexExtraDishes: Record<string, CodexDish[]> = {
  afam: [
    { n: 'Gumbo z’herbes', p: 'Black Louisiana', cls: 'vegan',
      d: 'The Holy Thursday green gumbo — built on many cooked greens, and traditionally made without meat for Lent.' },
    { n: 'Hot water cornbread', p: 'Delta · Deep South', cls: 'vegan',
      d: 'Cornmeal, salt and boiling water, fried in a spoonful of fat. No egg, no dairy, no leavening.' },
    { n: 'Red beans and rice', p: 'Black Louisiana', cls: 'forward',
      d: 'Monday’s pot, built on beans and rice. Traditionally seasoned with pork; the structure underneath is West African.' },
    { n: 'Boiled peanuts', p: 'Alabama · Georgia · Carolinas', cls: 'vegan',
      d: 'Green peanuts boiled in heavy brine until soft — a groundnut eaten the way groundnuts are eaten in West Africa.' },
    { n: 'Field peas & snaps', p: 'Delta · Lowcountry', cls: 'vegan',
      d: 'Fresh-shelled cowpeas cooked with young green beans in their own potlikker.' },
    { n: 'Chow-chow', p: 'Deep South · Appalachia', cls: 'vegan',
      d: 'A pickled relish of the end-of-season garden — green tomato, cabbage, pepper — put up against the winter.' },
    { n: 'Sweet potato pone', p: 'Lowcountry · Deep South', cls: 'forward',
      d: 'Grated raw sweet potato baked dense and dark. Older than sweet potato pie and much less sweet.' },
    { n: 'Okra pilau', p: 'Lowcountry', cls: 'vegan',
      d: 'Rice cooked with okra until the grains stay separate — the Carolina rice kitchen doing what it does best.' },
    { n: 'Carolina Gold middlins', p: 'Lowcountry · Sea Islands', cls: 'vegan',
      d: 'The broken grains left by milling, cooked creamy. Once the rationed portion; now sold as a delicacy.' },
    { n: 'Groundnut soup', p: 'Alabama · Georgia', cls: 'forward',
      d: 'Peanut soup, thick and russet — a direct continuation of West African groundnut stew.' },
    { n: 'Watermelon rind pickle', p: 'Deep South', cls: 'vegan',
      d: 'The rind spiced and preserved in syrup, on the principle that the part you were told to throw away is food.' },
    { n: 'Soup beans & cornbread', p: 'Black Appalachia', cls: 'forward',
      d: 'Pinto beans cooked soft in their own broth with cornbread to sop. Usually pork-seasoned; the beans carry the dish.' },
    { n: 'Poke sallet', p: 'Black Appalachia · Deep South', cls: 'forward',
      d: 'A wild spring green that is edible only after repeated boiling and draining. Raw or under-cooked, it is poisonous.' },
  ],
};

export type DishDepth = {
  /** What is in it and how it is made. */
  build: string;
  /** Why it carries the classification badge it carries. */
  stands: string;
  /** Only where the dish carries a real hazard. */
  watch?: string;
};

/* Keyed "<regionId>|<dish name>", same convention as data/dishImages.ts. */
export const dishDepth: Record<string, DishDepth> = {
  /* ───────── African American: the original seven ───────── */

  'afam|Okra soup': {
    build: 'Okra, tomato, corn and butterbeans cooked down together in one pot until the okra has thickened the liquid around it. The okra is the thickener, which is why it is not fried or dried first here - cutting it and stewing it is the point, and the mucilage people are taught to cook out is the mechanism of the dish. Long, slow, low heat; it improves reheated.',
    stands: 'Traditionally vegan and labelled so without qualification. Okra, cowpeas and the one-pot vegetable stew all arrive from West Africa; corn and butterbeans are Indigenous American. The dish is a meeting of two plant agricultures, and no meat is being written out of it.',
  },
  'afam|Benne wafers': {
    build: 'Benne - sesame - toasted until it smells nutty, then bound with sugar and flour into a thin wafer baked crisp. The seed is doing all the work, so the toast is the step that matters; under-toasted benne makes a pale, flat biscuit.',
    stands: 'Traditionally vegan in its oldest form, and the entry is really about the seed rather than the biscuit. Benne came from West Africa with enslaved people, was grown on the Sea Islands, and is still grown and baked there. The continuity is the claim.',
  },
  'afam|Texas caviar': {
    build: 'Cooked black-eyed peas dressed cold in vinegar and oil with onion and pepper, then left to sit for hours so the peas take the dressing up. It is a marinated bean salad; the resting is not optional and the flavour on day two is the intended one.',
    stands: 'Traditionally vegan. The cowpea is West African, and this is one of the plainest cases in the volume of an African crop carrying a whole dish with nothing added to make it plant-based.',
  },
  'afam|Hoppin’ John': {
    build: 'Red peas or cowpeas and rice cooked together, the rice taking up the pea broth so the two finish as one dish rather than as a bean served over a grain. Cooking the rice in the pea liquor is the technique that distinguishes it from any other beans-and-rice.',
    stands: 'Plant-forward tradition, not vegan, and the card is careful about why. The structure - a rice-and-cowpea one-pot - is West African and predates the pork that commonly seasons it. That makes the plant version a return to the underlying form rather than a substitution. The codex does not go further than that, because even the etymology of the name is disputed and the honest position is that the origin is argued rather than settled.',
  },
  'afam|Red rice': {
    build: 'Long-grain rice cooked down in tomato until every grain is stained red-orange and separate. The technique is the same one that makes jollof: build the tomato base first, cook it out until the oil separates, then let the rice absorb it rather than boiling rice and stirring sauce through.',
    stands: 'Plant-forward tradition. The Carolina rice kitchen descends directly from West African rice agriculture, and this is jollof’s Carolina relative rather than a coincidence of tomato and rice. Commonly cooked with pork or shrimp; the base method is entirely plant.',
  },
  'afam|Maque choux': {
    build: 'Corn cut from the cob and cooked slowly with pepper, onion and tomato until the starch comes out and thickens it. The cobs are traditionally scraped for their milk into the pan, which is where the creaminess comes from before any dairy is added.',
    stands: 'Plant-forward tradition, and one of the better-documented Afro-Indigenous exchanges rather than a vague claim of fusion. The corn technique is Indigenous; the seasoning and the pot are Louisiana Creole. The codex names it as documented because it can be.',
  },
  'afam|Potlikker greens': {
    build: 'Greens braised long and slow with smoked paprika and mushroom standing in for the smoke, finished with vinegar. The potlikker - the braising liquid - is the point, not a by-product, and is drunk or sopped with cornbread. Salt it late; the greens release a lot of their own liquid.',
    stands: 'Adapted from a meat original, and named as one rather than presented as the historical dish. The greens and the practice of drinking the cooking liquid are old and African-descended; the ham hock is also old. Smoked paprika and mushroom rebuild the smoke honestly and the badge says what happened.',
  },

  /* ───────── African American: the thirteen added ───────── */

  'afam|Gumbo z’herbes': {
    build: 'Built on greens rather than on a stock: as many kinds as you can get - mustard, collard, turnip, spinach, watercress, carrot top, radish top - boiled together, then chopped fine and returned to their own cooking water, which becomes the body of the gumbo. A dark roux is made separately and whisked in. Tradition holds that the count of greens should be odd, and that you make a friend for each one. Served over rice.',
    stands: 'Traditionally vegan, and this is the strongest such claim in the volume. It is the Holy Thursday gumbo of Black Catholic Louisiana, made without meat precisely because of the Lenten fast - so the meatless version is not an adaptation of a meat dish, it is the observance. Meat versions exist and are later and secondary here. Leah Chase’s at Dooky Chase’s is the best-known modern example.',
  },
  'afam|Hot water cornbread': {
    build: 'Cornmeal and salt scalded with boiling water until it forms a stiff paste, rested a few minutes so the meal swells, then dropped in spoonfuls into hot fat and fried until the outside is craggy and the inside stays soft. The boiling water is the whole technique - it gelatinises the starch, which is what holds the patty together with no egg and no leavening.',
    stands: 'Traditionally vegan, and unusually clear-cut: the ingredient list is cornmeal, salt, water and frying fat. The dairy-and-egg skillet cornbread most people picture is the later, more prosperous version. This is the older and plainer one, and it is plant-based by construction rather than by adaptation.',
  },
  'afam|Red beans and rice': {
    build: 'Red kidney beans soaked, then cooked long and low with onion, celery and green pepper until a good number of them break down and thicken their own liquid into gravy. Mashing a ladleful against the pot and stirring it back is the usual way to force that. Served over rice cooked separately. Traditionally Monday’s dish, cooked slowly while the week’s washing was done.',
    stands: 'Plant-forward tradition. Beans and rice as a complete one-pot is West African in structure and arrives in Louisiana through Caribbean and Haitian routes as much as directly. The andouille and ham hock are real and traditional seasonings, which is why this is not badged vegan - but they season a dish whose body is entirely bean and rice.',
  },
  'afam|Boiled peanuts': {
    build: 'Raw green peanuts - freshly dug, still damp, never roasted - boiled in heavily salted water for hours until the shells soften and the kernels go from crisp to the texture of a cooked bean. Green peanuts are the requirement; dried ones will not do it properly and need soaking first and still come out wrong. Eaten hot from the shell, brine and all.',
    stands: 'Traditionally vegan. The groundnut is West African, and boiling groundnuts in salted water is a West African preparation that continued here rather than being invented here. The roadside stand is the surviving form of a much older way of eating the crop.',
  },
  'afam|Field peas & snaps': {
    build: 'Fresh-shelled cowpeas - crowder, lady, purple hull, zipper - cooked with young snap beans thrown in whole for the last stretch, in just enough water to make a good potlikker rather than enough to boil them in. Fresh peas cook fast, in well under an hour, and go grey and mealy if pushed. The liquor is served with them.',
    stands: 'Traditionally vegan. Cowpeas are the West African crop at the centre of this whole volume, and this is the plainest way they are eaten: shelled, cooked, and served in their own broth. The pork that often goes in the pot is a seasoning applied to a complete dish, not the dish.',
  },
  'afam|Chow-chow': {
    build: 'The tail end of the garden - green tomatoes that will not ripen, the last cabbage, peppers, onion - chopped fine, salted overnight to draw water out, then packed with a boiled vinegar-and-spice brine and sealed. The overnight salting is what keeps it crisp rather than slumped. Recipes vary house to house and that variation is the tradition, not a lack of one.',
    stands: 'Traditionally vegan. It is a preserving method rather than a dish, and it exists because a garden produces everything at once and a winter has to be got through. Related pickled relishes run through West African, Appalachian and Pennsylvania German cooking alike; the codex does not claim a single origin for it.',
  },
  'afam|Sweet potato pone': {
    build: 'Sweet potato grated raw - not boiled and mashed, which makes a different and softer thing - and baked slowly with spice and a sweetener until the outside sets into a dark caramelised crust and the inside stays dense and slightly chewy. Long, low baking is what develops it. Much less sweet than pie, and eaten as a side dish as often as a dessert.',
    stands: 'Plant-forward tradition. The older versions are sweet potato, spice, sweetener and fat, and go plant-based with very little argument; many later ones carry egg, butter or milk. The dish is badged forward rather than vegan because that variation is real, and the codex does not pick the convenient version and call it the historical one.',
  },
  'afam|Okra pilau': {
    build: 'Okra cooked down first with onion and tomato until it stops being slippery, then rice added and cooked in measured liquid, covered and undisturbed, so the grains stay separate. Pilau in the Carolina rice kitchen means exactly that separateness - a wet or stirred pot is a different dish and, by local standards, a failed one.',
    stands: 'Traditionally vegan. Okra and rice are both West African, and the pilau method arrives through the same rice culture that made Carolina Gold a commercial crop on the labour and expertise of enslaved West Africans. Bacon appears in modern recipes; the dish does not require it.',
  },
  'afam|Carolina Gold middlins': {
    build: 'Middlins - also called rice grits - are the grains broken during milling. They cook faster than whole rice and release far more starch, so they go creamy on their own without any dairy, somewhere between a risotto and a porridge. Toast them dry first and they hold more texture.',
    stands: 'Traditionally vegan, and the entry is as much economic history as it is a recipe. Broken grains were the portion left to the people who grew and milled the rice, because whole grains were what got sold. The same product is now marketed as a heirloom delicacy. The codex records both facts in that order.',
  },
  'afam|Groundnut soup': {
    build: 'Groundnut paste loosened with stock and cooked out slowly with onion, pepper and often sweet potato until the oil separates and rises - that separation is the sign it is done rather than a fault. Stir it often at the end; peanut catches on the bottom of a pot quickly.',
    stands: 'Plant-forward tradition, and a direct continuation rather than a resemblance. West African groundnut stew and this soup are the same dish on two continents. It is badged forward because the American versions are commonly built on chicken stock; the West African parent is frequently made without meat and the plant version is not an invention.',
  },
  'afam|Watermelon rind pickle': {
    build: 'The white part of the rind - green skin pared off, pink flesh trimmed away - soaked in salted or limed water to firm it, then simmered in a spiced vinegar syrup with cinnamon and clove until it turns from opaque white to translucent. That translucency is the doneness signal. It keeps for a year.',
    stands: 'Traditionally vegan. It belongs to the same principle as potlikker and middlins: the part you were told to throw away is food, and knowing that is a skill rather than a hardship. The watermelon itself is an African crop, which the racist iconography attached to it in America has spent a long time obscuring.',
  },
  'afam|Soup beans & cornbread': {
    build: 'Pinto or October beans soaked and simmered until they are soft enough to break under a spoon and their liquid has gone cloudy and thick - that broth is the soup and is not drained. Served with cornbread to sop it, raw onion on the side, and often chow-chow or pepper vinegar. Salt late; salted early, the skins toughen.',
    stands: 'Plant-forward tradition. Beans and cornbread is the everyday Appalachian meal across all its communities, usually seasoned with fatback or a ham bone, and the beans carry the dish entirely. One honest limit: this is documented as Appalachian food broadly, while the specifically Black Appalachian record is much thinner than the Lowcountry’s - which is exactly the gap the zone note on this page flags. Adding the dish does not close it.',
  },
  'afam|Poke sallet': {
    build: 'Only the young spring shoots are used, before the stalk reddens. They are boiled in a full pot of water, the water is thrown away, and that is repeated - three changes of water is the traditional count - before the greens are finally fried or dressed. The discarded water is the recipe. Everything else about it is ordinary greens cookery.',
    stands: 'Plant-forward tradition, and it is here because a codex of survival foods that omitted it would be dishonest. Pokeweed is a wild plant that spread on disturbed ground and fed people who had little else in the early spring gap before anything was ready to harvest. As with soup beans, the Appalachian record is broad while the specifically Black Appalachian record is thin, and the codex says so rather than assuming.',
    watch: 'Pokeweed is poisonous. The root is the most toxic part and is never eaten; mature leaves and stalks are dangerous; the berries are dangerous, particularly to children. Poisonings are documented, including from greens boiled in too little water or drained only once. The repeated boil-and-discard is not a flavour step and not optional, and this card is not the thing to learn it from - that comes from a person who knows the plant.',
  },
  /* ───────── West Africa ───────── */

  'west|Akara': {
    build: 'Cowpeas soaked until the skins slip, rubbed and floated off, then the naked peas ground to a stiff white paste with almost no water. The paste is whipped hard - by hand, by wooden spoon, or in a blender - until it visibly lightens and holds air, and a dropped spoonful floats in water. That float test is the doneness signal. Fried in deep hot oil in rough spoonfuls.',
    stands: 'Traditionally vegan. The aeration is mechanical, not chemical: whipping traps air in the pea protein, so there is no egg to remove and never was one. Akara crossed the Atlantic and became acarajé in Bahia and bean fritters across the Caribbean.',
  },
  'west|Red red': {
    build: 'Black-eyed peas stewed down with tomato, onion and chilli in red palm oil, which is where both the colour and the name come from, and served with plantain fried until the edges caramelise. The oil is an ingredient rather than a cooking medium - use a neutral oil and it is a different dish.',
    stands: 'Traditionally vegan. Some cooks add smoked fish; the base is cowpea, tomato and palm oil and stands complete without it.',
  },
  'west|Waakye': {
    build: 'Rice and cowpeas cooked together with dried sorghum leaf sheaths, which release a deep red-brown colour and a faint mineral note and are lifted out before serving. Alkalinity is part of the method - a little potash or baking soda deepens the colour and softens the beans - and too much makes it soapy.',
    stands: 'Traditionally vegan at its base. It is normally eaten as a plate of many parts, some of which are not, but the waakye itself is rice, beans and leaf.',
  },
  'west|Attiéké': {
    build: 'Cassava peeled, grated and inoculated with a portion of previously fermented cassava, left to ferment a day or more, then pressed to drive off liquid, granulated by hand and steamed. The fermentation is not a flavour step layered on top; it is what makes the cassava safe and digestible and gives the sour note that identifies the dish.',
    stands: 'Traditionally vegan. The card in the codex says the fermentation is the dish, and that is precise - remove it and you have grated cassava, not attiéké.',
  },
  'west|Jollof rice': {
    build: 'A cooked-out base of tomato, pepper and onion - fried until the water has gone and the oil separates - then rice added and cooked in measured stock, covered and undisturbed, so it steams rather than boils. The prized slightly scorched bottom layer is deliberate. Parboiled long-grain is the usual choice because it forgives.',
    stands: 'Traditionally vegan in structure, and the codex deliberately does not settle whose it is. Senegalese, Nigerian and Ghanaian claims each have serious backing, and thieboudienne is a strong candidate ancestor. Presenting one as the original would be taking a side in a live argument.',
  },
  'west|Egusi soup': {
    build: 'Ground melon seed is the thickener and the body. Two schools: fry the ground seed in oil first so it caramelises and breaks into curds, or drop it into simmering liquid so it sets in soft lumps. Bitterleaf or other greens go in near the end. It must cook long enough for the raw seed taste to go.',
    stands: 'Plant-forward tradition. Meat, fish and stockfish are common and traditional, but the seed-and-greens architecture is what makes it egusi and it holds up without them - which is why this is badged forward rather than adapted.',
  },
  'west|Thieboudienne': {
    build: 'Fish and vegetables poached in a tomato and tamarind base, removed, and the rice then cooked in that broth so it takes up everything. The layered order is the technique and the reason the dish takes hours.',
    stands: 'Plant-forward on the card, and the codex is blunt about the limit: this is the national rice-and-fish dish of Senegal, the fish is central rather than incidental, and a plant version is an adaptation that should say so. It is listed because the rice technique underneath it is the probable parent of jollof across the region.',
  },

  /* ───────── East Africa & the Horn ───────── */

  'east|Shiro wot': {
    build: 'Shiro is a flour - chickpea or broad bean milled with garlic, onion and spice already in it - so the cooking is fast: whisk it into hot oil and stock and simmer until it thickens and the raw flour taste goes. Lumps are the usual failure and come from adding the flour too fast to liquid that is too hot.',
    stands: 'Traditionally vegan, and structurally so. The Ethiopian and Eritrean Orthodox fasting calendar runs to something like 180 days a year without animal products, which has produced one of the largest and oldest vegan cooking repertoires anywhere. This is not a dish that happens to be vegan; it is a dish built for fasting.',
  },
  'east|Misir wot': {
    build: 'Red lentils cooked down in berbere with a heavy base of onion sweated slowly, usually dry at first without oil, until it collapses. That long onion base is where the depth comes from. Lentils break down entirely, and the stew should be thick enough to sit on injera without running.',
    stands: 'Traditionally vegan, same fasting logic as shiro. Berbere itself is a spice blend, not a meat product, and carries the dish.',
  },
  'east|Beyaynetu': {
    build: 'Not a recipe but an arrangement: several stews - lentil, split pea, cabbage, collard, beetroot, salad - spooned in mounds onto one large injera, eaten with the hands from the shared surface using torn pieces of the same bread. The injera is plate, utensil and starch at once, and the mounds are placed so their sauces stay separate until you mix them yourself.',
    stands: 'Traditionally vegan. The fasting platter is the everyday form on fasting days and the reason a vegan visitor to Addis Ababa has more choice than in most cities on earth.',
  },
  'east|Mchicha wa nazi': {
    build: 'Amaranth greens cooked down with onion and tomato, then finished with coconut milk and simmered only briefly after it goes in - long boiling splits the coconut. Fresh coconut squeezed for first and second pressings gives a better result than tinned; the thinner second pressing goes in first, the thick first pressing at the end.',
    stands: 'Traditionally vegan. Amaranth is an indigenous African green and coconut is the Swahili coast staple fat; nothing here is standing in for anything.',
  },
  'east|Kachumbari': {
    build: 'Tomato, onion and chilli cut fine and dressed with lime. The one technique that matters is soaking the sliced onion in cold water or lime juice first to take the harshness out - skip it and the dish is aggressive rather than fresh. Dressed at the last minute so the tomato does not weep.',
    stands: 'Traditionally vegan. It is a relish rather than a dish, and it does the same job pikliz does in Haiti: acid and raw vitamin C beside a heavy starch plate.',
  },
  'east|Kisra with mullah': {
    build: 'Sorghum batter fermented a day or two until sour, then poured very thin onto a hot greased plate and cooked on one side only - the result is a paper-thin sheet rather than a spongy round. Mullah is the stew beside it, built on onion, spice and either legume, vegetable or dried okra powder as a thickener.',
    stands: 'Plant-forward tradition. Meat mullah is common, and the codex says so rather than presenting the vegetable version as the default. The fermented sorghum flatbread itself is structurally kin to injera, which is the point of putting it here.',
  },
  'east|Matoke': {
    build: 'Green cooking bananas peeled - awkward, and easier with oiled hands - then steamed, traditionally wrapped in banana leaves inside a pot, until soft enough to mash. It is a starch staple rather than a fruit dish; ripe bananas will not do it. Usually served under groundnut sauce or a bean stew.',
    stands: 'Plant-forward tradition. The banana itself is the dish and is plant by definition; what accompanies it varies, and meat sauces are common, which is why it is not badged vegan outright.',
  },

  /* ───────── North Africa & the Nile ───────── */

  'north|Ful medames': {
    build: 'Small dried fava beans cooked very slowly for hours - traditionally overnight in a narrow-necked copper pot buried in embers, now more often a pressure cooker - until they are soft enough to crush against the pot. Dressed at the table with olive oil, lemon, cumin and garlic, partly mashed, partly whole. The slow cook is the dish; a fast boil makes a different, meaner thing.',
    stands: 'Traditionally vegan, and among the oldest continuously eaten prepared dishes anywhere - fava remains have been recovered from pharaonic-era sites. The codex line that it is older than most cuisines that borrowed it is doing real work.',
  },
  'north|Koshari': {
    build: 'Four separately cooked components assembled at the last moment: rice, brown lentils, small pasta, and chickpeas, under a sharp cumin-and-vinegar tomato sauce with crisp fried onions on top. Cooking them apart is the whole method - one pot gives you mush. The fried onion has to be genuinely crisp, which means low and slow then a final hot moment.',
    stands: 'Traditionally vegan, and one of the clearest cases in the volume of a national street dish that requires no adaptation at all. Its nineteenth-century assembly - Indian lentils and rice, Italian pasta - is itself a record of Cairo as a port city.',
  },
  'north|Lablabi': {
    build: 'Chickpeas cooked soft in a garlicky cumin broth, then ladled over torn stale bread in the bowl so the bread soaks and half-dissolves. Harissa, olive oil, capers, lemon and sometimes a preserved egg go on top and are stirred through by the eater. The bread is the point, not a garnish - this is a dish designed to use it up.',
    stands: 'Traditionally vegan at its base. The egg is a common addition rather than a structural element, and the broth-and-bread architecture is complete without it.',
  },
  'north|Zaalouk': {
    build: 'Aubergine and tomato cooked right down together - grilled or roasted aubergine first for smoke, then collapsed into the tomato with garlic, cumin and paprika until almost no liquid remains and the oil comes back out. It reduces a long way and should be cooked much further than looks necessary.',
    stands: 'Traditionally vegan. It is a salade cuite - one of a family of cooked Moroccan salads served cold or warm alongside bread - and belongs to a category that is largely plant by construction.',
  },
  'north|Bissara': {
    build: 'Dried split fava beans simmered with garlic until they fall apart, then blended smooth and loosened to a pourable purée. Served in a bowl with a well of olive oil, cumin and paprika on top, with bread. Winter breakfast food, eaten hot.',
    stands: 'Traditionally vegan. Fava, garlic, olive oil, spice - the ingredient list has nothing in it to adapt.',
  },
  'north|Couscous with seven vegetables': {
    build: 'Couscous properly made is steamed three times over the broth in a couscoussier, raked and moistened between steamings so the grains stay separate and swell evenly - instant couscous soaked in a bowl is a different and much lesser thing. The vegetables cook in the broth below in order of hardness, so nothing collapses.',
    stands: 'Plant-forward tradition. It is frequently finished with smen - fermented butter - or built on meat stock, which is why it is not badged vegan; but the vegetable version is widely cooked in its own right rather than being a modern substitution.',
  },
  'north|Fatta': {
    build: 'Layers: toasted or fried bread on the bottom, rice above it, then meat and a garlic-vinegar tomato sauce poured over so the bread softens without disintegrating. The garlic is bloomed hard in hot fat at the end and poured over sizzling, which is the step people remember.',
    stands: 'Adapted from a meat original, and the codex is explicit that a legume-and-root broth version is an adaptation and must not be presented as the historical dish. It is a celebration and feast food built on meat stock; the layering technique is what a plant version borrows.',
  },

  /* ───────── Central & Southern Africa ───────── */

  'central|Umngqusho': {
    build: 'Samp - coarsely broken dried maize with the hull removed - soaked overnight with sugar beans and then simmered for hours until the maize splits open and goes creamy and the beans collapse into it. It cannot be hurried; the whole dish is a long low cook and it thickens as it stands.',
    stands: 'Traditionally vegan. Maize is a New World crop long since absorbed into Southern African agriculture, and the samp-and-bean combination is a complete protein by construction rather than by design.',
  },
  'central|Morogo / imifino': {
    build: 'Wild and cultivated leaves - amaranth, cowpea leaf, pumpkin leaf, spider plant, blackjack and dozens more depending on region and season - stripped, boiled, drained and then cooked down with onion, tomato and sometimes groundnut. Some species need the first water discarded for bitterness; which ones is local knowledge.',
    stands: 'Traditionally vegan. This is the relish beside the pap and it is one of the strongest cases in the codex for indigenous leafy vegetables as a food system rather than a garnish - dozens of species, mostly gathered, mostly by women, mostly undocumented in formal agricultural statistics.',
  },
  'central|Koki': {
    build: 'Black-eyed peas soaked and skinned, ground to a paste, then beaten with red palm oil and water until it lightens and holds air - the same aeration principle as akara. Portioned into banana or cocoyam leaves, tied, and steamed until set into a firm savoury pudding.',
    stands: 'Traditionally vegan. Cowpea, palm oil and leaf wrapping; the steaming rather than frying is what distinguishes it from its fritter relatives.',
  },
  'central|Fumbwa': {
    build: 'Gnetum leaves - tough, glossy, forest-gathered - shredded very fine and stewed long with groundnut paste, palm oil, onion and often smoked fish. The leaf does not soften quickly, so this is a slow cook, and the fineness of the shredding does much of the work.',
    stands: 'Traditionally vegan at its base, and the entry matters because fumbwa is a gathered forest food rather than a farmed one. Smoked fish is a common addition; the leaf-and-groundnut structure is the dish.',
  },
  'central|Nsima or sadza with ndiwo': {
    build: 'Maize meal stirred into water and worked hard against the side of the pot as it thickens, adding meal in stages, until it is stiff enough to hold a shape and pull cleanly away. Under-stirred pap is lumpy and raw-tasting; the arm work is the technique. Ndiwo is whatever relish goes beside it - greens, beans, groundnut.',
    stands: 'Traditionally vegan as an everyday plate. The codex badges the pairing rather than the porridge alone, because pap without relish is not a meal in this system and the relish is where the plant repertoire lives.',
  },
  'central|Matapa': {
    build: 'Young cassava leaves pounded in a mortar until genuinely fine - this is laborious and is the step that decides the dish - then cooked long with groundnut and coconut milk. The pounding and the long cook are both necessary: cassava leaf contains cyanogenic compounds that thorough processing and prolonged cooking reduce.',
    stands: 'Plant-forward tradition. Crab or prawn is common and traditional on the Mozambican coast, which is why it is not badged vegan, but the leaf-groundnut-coconut base is the identity of the dish.',
    watch: 'Cassava leaves, like the root, contain cyanogenic glycosides. The traditional pounding and long cooking are what make them safe, and both are requirements rather than refinements.',
  },
  'central|Ndolé': {
    build: 'Bitterleaf washed and squeezed through many changes of water until the bitterness drops to where the cook wants it, then cooked with a thick paste of ground peanuts, onion and pepper until the oil separates. The washing is the recipe, exactly as in the Foraged foods entry for bitterleaf.',
    stands: 'Plant-forward tradition, and the codex notes it is readily built plant-only without losing what makes it ndolé - the bitterleaf and groundnut are the dish, and the shrimp or beef commonly in it is seasoning applied to a complete structure.',
  },

  /* ───────── The Caribbean ───────── */

  'caribbean|Ital stew': {
    build: 'Ground provisions, callaloo, coconut milk and herbs simmered in one pot with no salt at all and nothing processed - seasoning comes from scallion, thyme, pimento, garlic and whole Scotch bonnet left unbroken in the pot for aroma without heat. Cooked in a Dutch pot, often over wood, and everything goes in by hardness so nothing turns to mush.',
    stands: 'Traditionally vegan, and the codex is careful to say it is Rastafari religious practice rather than a menu category. Ital derives from vital, and the saltlessness is a discipline about livity - the life force in food - not a health trend. Treating it as a cuisine style rather than an observance is the error the card is guarding against.',
  },
  'caribbean|Rice and peas': {
    build: 'Dried pigeon or kidney peas cooked first until nearly tender, then rice added to that same cooking liquid with coconut milk, thyme, scallion, pimento and a whole Scotch bonnet placed on top and never burst. The pea liquor colours the rice; using fresh water instead is the common mistake. Sunday food across most of the anglophone Caribbean.',
    stands: 'Traditionally vegan. Salted meat appears in some households, but the coconut-and-pea base is the dish and requires nothing added.',
  },
  'caribbean|Callaloo': {
    build: 'Leaves - dasheen in Trinidad, amaranth in Jamaica - cooked down with okra, coconut milk, onion and thyme until thick, then in the Trinidadian style swizzled with a wooden lele until smooth. The okra is a thickener here rather than a vegetable in its own right.',
    stands: 'Traditionally vegan at its base, and the codex flags something more useful than the recipe: the word names different plants island to island, and it keeps them separate rather than merging them. Trinidadian callaloo often includes crab; Jamaican callaloo is usually a sautéed green. They are not the same dish.',
  },
  'caribbean|Pikliz': {
    build: 'Cabbage, carrot, onion and a lot of Scotch bonnet packed raw into a jar and covered with sour orange juice or vinegar, then left to sit at least a few days before use. It is a quick pickle rather than a live ferment in most households, and it sharpens rather than softens with time.',
    stands: 'Traditionally vegan. The codex notes the nutritional logic explicitly: beside rice and beans it supplies both acidity and raw vitamin C, which is the pairing that makes the iron in the beans available. That is the mineral-atlas mechanism showing up in a traditional plate.',
  },
  'caribbean|Cassava bread (ereba)': {
    build: 'Bitter cassava grated, then packed into a woven tubular press - the ruguma - which is hung and weighted so it squeezes out the liquid containing the cyanogenic compounds. The dried meal is sifted and baked on a flat griddle into a large round flatbread. The press is the safety device, and the technology is unchanged.',
    stands: 'Traditionally vegan, and the codex calls it continuous Indigenous technology rather than a survival. Garifuna communities in Belize, Honduras and Guatemala make it now the way it was made before contact; the ruguma is the same tool.',
    watch: 'Bitter cassava is genuinely toxic before processing. The pressing and baking are not tradition for its own sake - they are what remove the cyanogenic compounds, and the sequence is not optional.',
  },
  'caribbean|Diri kole ak pwa': {
    build: 'Beans cooked first, then rice cooked in the bean liquid with epis - the Haitian herb and pepper base of parsley, scallion, garlic, thyme and pepper blended together - so the rice takes colour and seasoning from both. Usually served with pikliz and a sauce alongside.',
    stands: 'Traditionally vegan. Epis is the flavour engine of Haitian cooking and is entirely plant; the dish needs nothing added to be complete.',
  },
  'caribbean|Oil-down': {
    build: 'Breadfruit, ground provisions, callaloo and dumplings layered in one pot with coconut milk and turmeric and simmered until the liquid is almost entirely absorbed - the name describes the endpoint, when the coconut oil separates out at the bottom. Judging when to stop is the skill; too far and it catches.',
    stands: 'Plant-forward tradition. Grenada’s national dish is commonly built with salted meat, and the codex badges it forward rather than vegan on that basis, but breadfruit and coconut are the structure and the one-pot method is the tradition.',
  },

  /* ───────── Afro-South America ───────── */

  'afrosam|Farofa': {
    build: 'Cassava flour toasted in fat until it turns gold and smells nutty, usually with onion and garlic in it, and stirred constantly because it goes from toasted to burnt in seconds. It is a texture rather than a sauce - dry, sandy, sprinkled over wet food to give it something to catch on.',
    stands: 'Traditionally vegan at base. Versions with bacon or butter are everywhere, but plain toasted manioc flour is the constant on the Brazilian table and the older form. Cassava flour is Indigenous technology carried forward, not adopted.',
  },
  'afrosam|Beiju & tapioca': {
    build: 'Cassava starch, hydrated and sieved to a damp crumb, scattered onto a hot dry griddle where it fuses into a soft white crêpe without any binder at all - the starch gelatinises and knits to itself. No egg, no flour, no fat. Folded around a filling and eaten immediately; it goes leathery as it cools.',
    stands: 'Traditionally vegan, and structurally incapable of being otherwise: the pancake is one ingredient. The codex describes it as Indigenous technology adopted and carried forward, which is the accurate framing - this is Tupi-Guarani in origin and now Brazilian nationally.',
  },
  'afrosam|Enyucada': {
    build: 'Grated cassava mixed with coconut, sugar and spice and baked slowly until it sets dense and chewy with a caramelised crust - closer to a pudding than a cake, and it depends on the moisture in the cassava rather than on any raising agent.',
    stands: 'Traditionally vegan. The codex names the makers as well as the dish: Palenquera vendors carry the recipes and the teaching, and the entry credits them rather than treating the recipe as free-floating regional heritage.',
  },
  'afrosam|Alegría': {
    build: 'Puffed rice or millet bound with coconut and a boiled sugar or panela syrup, pressed into blocks and cut. The syrup has to be taken to the right stage - too soft and it will not set, too far and it shatters - which is the only technical step and the one that decides it.',
    stands: 'Traditionally vegan. The codex notes the name means joy and is popularly linked to the freedom won at Palenque, and marks that as a popular association rather than a documented etymology - which is the right level of confidence for it.',
  },
  'afrosam|Tacu tacu': {
    build: 'Yesterday’s rice and yesterday’s beans mashed together with an onion-and-chilli base and then pressed into a hot oiled pan and left alone until a genuine crust forms on the underside, then folded over like an omelette. The crust is the dish; stirring it is the failure mode.',
    stands: 'Traditionally vegan at base. The codex records its origin plainly - born from repurposed household leftovers under domestic slavery - which is a specific historical claim about who was cooking and under what conditions, not a general note about thrift.',
  },
  'afrosam|Patacones': {
    build: 'Green - not ripe - plantain cut thick, fried once at moderate heat until cooked through but pale, removed and smashed flat, then returned to hotter oil to crisp. Two frying temperatures for two different jobs. Salted immediately out of the oil while the surface can still take it.',
    stands: 'Traditionally vegan. Known as tostones elsewhere; the double-fry technique is shared across the Caribbean and Afro-Latin Pacific coast and is West African in ancestry through the plantain itself.',
  },
  'afrosam|Acarajé': {
    build: 'The same skinned, ground, whipped black-eyed pea batter as akara, fried in dendê - red palm oil - which is not interchangeable with any other fat here, then split and filled with vatapá, caruru and dried shrimp. The batter is beaten until a spoonful floats, exactly as in Nigeria.',
    stands: 'Plant-forward tradition, and the codex is careful in two directions at once. The fritter base is naturally vegan and directly descended from akara; the standard filling is built on dried shrimp, so the dish as sold is not. And it records that the baianas who make it hold religious and economic authority over it - acarajé is tied to Candomblé and to Oxum, and it is not a recipe to be freely reassigned.',
  },
  'afrosam|Moqueca': {
    build: 'Fish or shrimp cooked in a covered clay pot with tomato, onion, pepper, coconut milk and dendê, with no browning and no stirring - the pot is layered and left, so the fish poaches in what the vegetables release. The clay pot and the dendê are both structural in the Bahian version.',
    stands: 'Adapted from a seafood original, and badged so. The codex says a vegetable version is an adaptation and gets labelled as one, and that is the honest position: the technique transfers, the dish is built on fish, and calling a plant version traditional would be false.',
  },

  /* ───────── Afro-Asia & the Indian Ocean ───────── */

  'afroasia|Pilau': {
    build: 'Whole spices - cumin, cardamom, cinnamon, clove, black pepper - bloomed in fat with deeply browned onion, then rice added and cooked in measured stock, covered and undisturbed. On the Swahili coast the browning of the onion is taken further than most cooks expect, and it is what gives the rice its colour rather than turmeric.',
    stands: 'Traditionally vegan in structure, and the codex makes a precise etymological point rather than a vague one: the word descends from Persian polow, tracked through documented Indian Ocean trade rather than assumed from resemblance. Meat versions are common; the spice-and-rice method is the dish.',
  },
  'afroasia|Dholl puri': {
    build: 'Yellow split peas cooked until just dry, ground coarse and seasoned with turmeric and cumin, then enclosed in a dough ball and rolled out very thin so the filling spreads evenly inside without bursting. Cooked dry on a tawa, not fried. The rolling is the skill and it is genuinely difficult.',
    stands: 'Traditionally vegan, and the codex insists on the framing: lived Indo-Mauritian tradition, not a fusion novelty. It is the everyday street food of Mauritius, eaten by everyone, and describing it as fusion would misdescribe an established national dish as a curiosity.',
  },
  'afroasia|Rougail': {
    build: 'Raw chilli pounded in a mortar with salt and then whatever the household uses as its base - tomato, ginger, spring onion, sometimes green mango or preserved lemon. Uncooked, pounded rather than blended, made fresh in small quantity and set beside the meal rather than cooked into it.',
    stands: 'Traditionally vegan. It functions the way kachumbari and pikliz do elsewhere in the codex: raw, acidic, hot, and placed beside a starch-heavy plate. Note it is distinct from a rougail cooked as a stew, which is a different Réunionnais dish sharing the name.',
  },
  'afroasia|Achar': {
    build: 'Vegetable or fruit salted or sun-dried to draw water out, then packed in oil with toasted ground spice and left to mature - weeks, sometimes months. The oil is the preservative and must cover everything; the salt and the drying do the rest. Mustard oil, sesame oil and chilli are the common architecture.',
    stands: 'Traditionally vegan. The codex places it as carried by indenture into a dozen creole kitchens, which is the accurate transmission route - achar in Trinidad, Mauritius, Réunion and South Africa arrives with indentured South Asian labour in the nineteenth century rather than through earlier trade.',
  },
  'afroasia|Cari (Creole curry)': {
    build: 'Built on a roussi - onion, garlic, ginger and turmeric browned hard in oil until it darkens and the rawness cooks out - then the main ingredient and liquid added. The browning is the defining step and gives the dish its name and its colour; a pale roussi makes a flat cari.',
    stands: 'Plant-forward tradition. The codex traces the technique specifically: to Indian domestic labourers assigned kitchen work under period racial ideology - which is a claim about labour and coercion rather than a claim about influence. It is badged forward because the standard versions are meat or fish, while the roussi base and the vegetable versions stand on their own.',
  },
  'afroasia|Chinese-Jamaican soy cooking': {
    build: 'Cantonese and Hakka technique meeting Jamaican ingredients: soy sauce and stir-frying applied to callaloo, chocho and local peppers, and the reverse - Scotch bonnet and pimento entering Chinese kitchens. Soy sauce became a background seasoning in Jamaican cooking generally rather than staying inside Chinese restaurants.',
    stands: 'Diasporic innovation, and the codex is emphatic about why this label exists at all. It is 19th-century indenture-era diaspora fusion - documented, dated, attributable - so "postcolonial reclamation" is factually wrong and "contemporary innovation" is wrong by a century. The tier exists to describe this accurately rather than force it into a neighbouring category.',
  },
  'afroasia|Mushroom adobo': {
    build: 'Mushrooms braised in the adobo method - vinegar, soy, garlic, bay, peppercorn, simmered uncovered so the sharpness cooks off and the liquid reduces to a glaze. The vinegar going in without stirring at the start is the traditional instruction and it applies here as much as anywhere.',
    stands: 'Contemporary innovation, and the codex says so on the card rather than inventing a lineage for it. Adobo is a Filipino method with its own long history; pairing it with mushrooms in an Afro-Filipino kitchen is recent and experimental, and it is listed as exactly that. No historical claim is being made.',
  },

  /* ───────── Indenture & the Indo-African Diaspora ───────── */

  'indenture|Doubles': {
    build: 'Two soft fried flatbreads - bara, leavened with yeast and coloured with turmeric, fried so they stay pillowy rather than crisp - with curried channa spooned between them and eaten standing, folded in paper. Tamarind, cilantro sauce, kuchela and pepper go on to order. The bara must be soft; a crisp one is a failed bara.',
    stands: 'Traditionally vegan, and the codex adds the etymology because it is well attested: descended from chana bhatura, reinvented on the street, and named for customers asking to double up the bread. The closing line on the card - nothing to adapt - is the point of the whole entry.',
  },
  'indenture|Dholl puri': {
    build: 'The Mauritian split-pea flatbread again, and the codex carries it twice deliberately: the same dish appears in the Afro-Asia volume and in this one because it belongs to both the Indian Ocean trade story and the indenture story, and they are different frames. Cooked dry on a tawa, folded around rougaille and butter-bean curry.',
    stands: 'Traditionally vegan. Here it is placed as indenture food specifically - Bihari in origin, Mauritian in form - rather than as a general Indian Ocean dish.',
  },
  'indenture|Dhalpuri roti': {
    build: 'Split peas boiled until just done then ground almost dry and worked into the dough as a layer rather than a filling, so the roti puffs and separates as it cooks on the tawa and the pea layer stays distinct. Too wet a pea mixture tears the dough; that is the usual failure.',
    stands: 'Traditionally vegan, with one practical caveat the codex states plainly: check the dough fat is plant-based and it is done. Ghee is sometimes used, so this is a label-reading matter rather than a structural one.',
  },
  'indenture|Baigan choka': {
    build: 'Aubergine charred whole directly over an open flame until the skin blackens and collapses, then peeled and mashed with garlic and chilli that have been bloomed in hot oil and poured over. The char is the flavour, and roasting it in an oven gives a different and lesser dish.',
    stands: 'Traditionally vegan. Choka is a technique - fire-roast and mash - applied to aubergine, tomato and other vegetables, and it arrives with indentured labour from eastern India.',
  },
  'indenture|Seven curry': {
    build: 'Seven vegetable and legume curries - typically including dhal, pumpkin, bodi, spinach, mango and channa - served on a water lily or lotus leaf and eaten with the hands, no cutlery. The leaf is the plate and is part of the observance rather than presentation.',
    stands: 'Traditionally vegan, and the codex frames it as devotional food before it is a menu item. It is served at Hindu religious functions in Guyana, and the vegetarianism is religious observance rather than culinary preference - which is why it cannot be described as a plant-based option.',
  },
  'indenture|Gateau piment': {
    build: 'Split peas soaked and ground coarse - never smooth - with chilli, spring onion and cumin, formed into small balls and deep-fried. Coarse grinding is what gives the interior its crumbly texture; a smooth paste fries into something dense.',
    stands: 'Traditionally vegan. Mauritian street food, sold from carts, and structurally a split-pea fritter of the same family as pholourie and akara - three continents arriving at the same technique from different directions.',
  },
  'indenture|Pholourie & saheena': {
    build: 'Pholourie: split-pea flour batter, seasoned and left to ferment slightly so it lightens, dropped in small spoonfuls into hot oil. Saheena: dasheen leaves layered with a seasoned split-pea batter, rolled, steamed and then sliced and fried, so the finished piece shows a spiral. Both are served with tamarind sauce.',
    stands: 'Traditionally vegan. Both belong to the Trinidadian street canon that the codex calls one of the most thoroughly documented traditionally-vegan repertoires anywhere on earth, and nothing in either needs substituting.',
  },
  'indenture|Bean-curry bunny chow': {
    build: 'A quarter loaf of white bread hollowed out, the removed centre kept as a lid, and the cavity filled with bean or lentil curry so the bread absorbs it from the inside. Eaten with the hands, no plate, no cutlery. The bread is container and starch at once.',
    stands: 'Plant-forward tradition, and the codex records the reason for the form rather than treating it as folk ingenuity: apartheid law barred non-white workers from eating inside, so the food was engineered to be carried and eaten in the street. It also notes that the bean and lentil fillings are the original Gujarati vegetarian line rather than a modern substitution for meat.',
  },
  'indenture|Pelau': {
    build: 'Sugar caramelised in oil until it is genuinely dark - just short of burnt, which is the nerve-racking part - then meat browned in it, then rice, pigeon peas and coconut milk added and cooked down together. The burnt-sugar stage is what colours and flavours the whole pot.',
    stands: 'Adapted from a meat original. The codex is precise: the browned-sugar and coconut-milk base is plant-based, the dish is built on meat and butter, and a vegetable version is an adaptation. The technique is transferable; the dish as it stands is not vegan and is not described as such.',
  },
  'indenture|Kheer & gulab jamun': {
    build: 'Kheer is rice simmered slowly in milk until the starch thickens it; gulab jamun is milk solids - khoya - worked into dough, fried and steeped in cardamom syrup. In both cases dairy is the structural material rather than an enrichment, which is why substitution changes the result rather than the label.',
    stands: 'Adapted, and the codex draws a hard line on this one: Hindu festival sweets are dairy-based by design, and coconut and cashew versions are adaptations - never "traditional vegan". This is the entry that most directly enforces Rule 1 across the whole codex, because it would be the easiest to quietly reclassify.',
  },

  /* ───────── Afro-Italy & the Black Mediterranean ───────── */

  'italy|Pasta e ceci': {
    build: 'Chickpeas cooked from dried with rosemary and garlic, a portion blended back in to thicken the liquid, and short pasta cooked directly in that liquid so its starch thickens the dish further. Cooking the pasta separately and combining them is the shortcut that loses the texture.',
    stands: 'Traditionally vegan. Cucina povera - the cooking of people without money - and the codex line is exact: plant-based by economics, centuries before it was a diet. Nothing is being removed to make this qualify.',
  },
  'italy|Farinata': {
    build: 'Chickpea flour whisked with water, salt and olive oil and then rested for hours - several at minimum - so the starch hydrates and the foam can be skimmed off. Poured thin into a very hot, well-oiled copper pan and baked in a fierce wood oven until the top blisters and the underside crisps. The rest and the oven heat are the two things that matter.',
    stands: 'Traditionally vegan. Flour, water, oil, salt: the codex note that nothing is removed and nothing substituted is literally true of the ingredient list. Close kin to Provençal socca and, more distantly, to the chickpea-flour cooking of North Africa.',
  },
  'italy|Panelle': {
    build: 'Chickpea flour cooked with water into a thick paste - stirred continuously until it pulls away from the pan - then spread thin, cooled until firm, cut into rectangles and deep-fried. Traditionally eaten in a bread roll, which makes it a starch inside a starch and is entirely the point.',
    stands: 'Traditionally vegan. The codex calls it a legume technique with close North African kin, which is the substantive claim: chickpea-flour cookery in Sicily is part of a Mediterranean continuum that runs through the Arab period rather than a Sicilian invention.',
  },
  'italy|Cuscusu trapanese': {
    build: 'Semolina rolled by hand into couscous grain in a wide glazed bowl - the mafaradda - then steamed over broth in a cuscusiera sealed at the join with a paste of flour and water so no steam escapes. The hand-rolling survives commercially in Trapani in a way it does not in most of Italy.',
    stands: 'Traditionally vegan in its vegetable form, and the codex makes the direction of travel explicit: directly adopted from North Africa rather than "inspired by" it. Trapani faces Tunisia, the technique arrived across that water, and the usual local version is fish-based while the vegetable one is long established.',
  },
  'italy|Pizza marinara': {
    build: 'Dough, tomato, garlic, oregano and oil. No cheese. Baked very fast in a very hot oven so the crust blisters before the topping overcooks. The name refers to sailors rather than to seafood, which is the detail most people have backwards.',
    stands: 'Traditionally vegan. The codex line that the cheese came later is the historically correct one: marinara predates margherita, and it is the older and poorer of the two rather than a modern omission.',
  },
  'italy|Zighinì with injera': {
    build: 'Berbere-spiced lentil stew served on fermented teff injera, the bread acting as plate and utensil. Cooked in Eritrean and Ethiopian kitchens in Milan and Rome with teff imported or, increasingly, blended with other flours where teff supply is short.',
    stands: 'Traditionally vegan, and the codex carries a sharp historical point with it: this is the dish colonial menus excluded from their own dining rooms, now served across Milan and Rome. Asmara’s segregated restaurants under Italian rule are the reference, and the entry is about who was allowed to eat where as much as about lentils.',
  },
  'italy|Baasto with tomato & cardamom': {
    build: 'Spaghetti cooked and then finished in a Somali suugo - tomato, onion, garlic, cumin, coriander and cardamom, with xawaash spice - and served with a ripe banana alongside, which is not a garnish but part of how the plate is eaten.',
    stands: 'Plant-forward tradition, and the codex phrase is the whole argument: colonial-era import, Somali dish. Pasta arrived through Italian occupation; what happened to it afterwards was Somali, and the spice architecture and the banana are not Italian in any sense. Meat versions are standard, hence forward rather than vegan.',
  },
  'italy|Eritrean-style lasagna': {
    build: 'Layered pasta built with berbere in the sauce and often without béchamel, served at celebrations and family gatherings. It is Italian in form and Eritrean in seasoning, and the spicing is not a light touch - the berbere is the dominant flavour.',
    stands: 'Postcolonial reclamation, and the codex chose that tier deliberately over "cultural exchange". The dish exists because Italy occupied Eritrea; it was reclaimed and re-spiced after independence and is now celebration food. Calling that exchange would describe a colonial relationship as a mutual one.',
  },
  'italy|Teff polenta with mushroom ragù': {
    build: 'Teff cooked with the polenta method - added in a stream to salted water and stirred long over low heat until it pulls from the pan - under a slow mushroom ragù. Teff behaves differently from maize meal, going sticky faster, so it wants more liquid and a shorter cook.',
    stands: 'Contemporary innovation, invented recently, and the codex states that no historical dish is being claimed. Italian technique, Ethiopian and Eritrean grain, credited as a new thing rather than dressed up as a rediscovery.',
  },
  'italy|Fonio risotto': {
    build: 'Fonio treated with the risotto method - toasted, then stock added gradually with constant stirring. The grain is tiny and cooks in a few minutes rather than twenty, and it will not release starch the way arborio does, so the creaminess has to come from fat and agitation rather than from the grain.',
    stands: 'Contemporary innovation, said on the card. West African grain, Italian stock-and-stir method, recent. The codex does not claim a lineage, and notes on the technique above are honest that the method does not fully transfer.',
  },
  'italy|Collard pesto pasta': {
    build: 'Collards blanched briefly to soften and set the colour, then pounded or blended with nuts, garlic, oil and hard cheese or a plant substitute, and loosened with pasta water. Collard is tougher and less aromatic than basil, so it needs the blanch and it takes more acid.',
    stands: 'Contemporary innovation. The codex credits both sources explicitly - African American greens tradition meeting Ligurian pesto technique - and states that no invented lineage is being offered. Two named parents, one recent dish.',
  },

};

export type ZoneDepth = {
  /** How the growing actually works. */
  system: string;
  /** Whose knowledge this is. */
  hands: string;
  /** What is threatening it now. */
  pressure: string;
};

/* Keyed "<regionId>|<zone name>". */
export const zoneDepth: Record<string, ZoneDepth> = {
  'afam|Lowcountry & Sea Islands': {
    system: 'Tidal rice culture: fields cut into coastal marsh and worked by controlling salt and fresh water through banks, trunks and gates, flooding and draining to a schedule rather than irrigating. It is an engineering system as much as a farming one, and it was built to a West African design that the planters buying the labour did not themselves possess. Benne, red peas and okra grew alongside it in provision grounds.',
    hands: 'Gullah Geechee communities, who are the authoritative voices here and are still on this ground. The rice expertise was specifically West African - from the Senegambian and Sierra Leonean rice coast - and was the reason people from those regions were targeted and trafficked. Carolina Gold’s revival has been led substantially by Gullah Geechee growers and cooks alongside seed conservationists.',
    pressure: 'Coastal land loss to development and resort building, heirs’ property law that has stripped Black families of land title across generations, and sea-level rise on exactly the low ground the system needs. The cuisine is being widely celebrated at the same moment the land under it is being lost.',
  },
  'afam|Mississippi Delta': {
    system: 'Deep alluvial soil, some of the most fertile in North America, worked under a cotton monoculture that left little room for food. What fed people came from garden plots and field edges: greens, field peas, corn for meal. Cornbread and greens are what a household can grow and cook when the cash crop owns the acreage and the calendar.',
    hands: 'Sharecropping and tenant families whose agricultural knowledge was extensive and whose access to land was deliberately constrained. Fannie Lou Hamer’s Freedom Farm Cooperative in Sunflower County was a direct answer to that - buying land collectively so that food and political independence could not be withheld by a landlord.',
    pressure: 'Consolidation into very large holdings, a long documented history of Black land loss, and food access that in much of the Delta is now worse than the growing conditions would suggest. Some of the most fertile ground in the country sits in counties with severely limited fresh food retail.',
  },
  'afam|Alabama & Georgia': {
    system: 'Peanuts, sweet potato and cowpeas grown in rotation on sandy soils that cotton had exhausted. The rotation is the point: groundnuts and cowpeas fix nitrogen and rebuild what continuous cotton stripped out, which is why Carver’s work pushed them so hard. Peaches and pecans occupy the orchard layer above.',
    hands: 'George Washington Carver at Tuskegee, whose crop-diversification and soil-restoration work was aimed squarely at Black farmers trapped in cotton debt, and who published in plain bulletins meant to be used rather than cited. The cooking knowledge that came with the crops was already in the households he was writing for.',
    pressure: 'The same land-loss story, plus the reputational flattening of Carver into a man who made things out of peanuts - which obscures that his actual project was soil science and the economic independence of Black farmers.',
  },
  'afam|Black Louisiana': {
    system: 'Rice on the wet prairies and the river parishes, okra and peppers in gardens, and a foodway shaped by a genuinely layered colonial history - French, Spanish, Haitian, West African and Indigenous - rather than by any single line of descent. The gumbo pot is the clearest expression of that layering, with okra, filé and roux each coming from a different one of those sources.',
    hands: 'Creoles of colour, free people of colour who held their own culinary institutions before emancipation, and the Haitian refugees whose arrival after the revolution reshaped New Orleans cooking substantially. Choctaw filé is an Indigenous contribution that is named as such here rather than absorbed.',
    pressure: 'Coastal land loss at some of the fastest rates anywhere in the world, hurricane displacement that has scattered culture-bearing families, and the reduction of a deeply regional cuisine to a small set of restaurant dishes.',
  },
  'afam|Black Appalachia': {
    system: 'Corn, beans and squash on steep ground in small plots, supplemented heavily by foraging - ramps, poke, berries, nuts - and by preserving, because the growing season is short and the winter is not. Root cellars, dried leather-britches beans and jars of chow-chow are the storage technology that makes the system work.',
    hands: 'This is the zone the codex flags rather than fills. Black Appalachian communities are real, longstanding and substantial - coal camps, freedmen’s settlements, farms held since the nineteenth century - and their food record is far less documented than the Lowcountry’s. Recent oral-history work is changing that, and where this app has nothing solid it says nothing rather than borrowing from the general Appalachian record.',
    pressure: 'Depopulation, the collapse of coal employment, and an Appalachian identity in popular culture that is presented as uniformly white - which erases the communities whose food this section is trying to document in the first place.',
  },
  /* ───────── West Africa ───────── */

  'west|Sahel': {
    system: 'Short-cycle cereals bred for a rainy season that may last only ten to twelve weeks and may not arrive when expected. Pearl millet and sorghum will set grain on rainfall that would fail maize entirely, and cowpea and groundnut fix nitrogen underneath them in intercropped fields rather than in rotation. Farming and herding are interleaved rather than separate: animals graze crop residues and manure the ground.',
    hands: 'Farming households across Mali, Niger, Burkina Faso, Senegal and northern Nigeria, alongside Fulani, Tuareg and Moor pastoralists whose movement is a land-use system rather than a wandering. Seed selection here is generations of household work, and the landraces are adapted to specific soils and rainfall patterns.',
    pressure: 'Rainfall becoming less predictable rather than simply less; desertification pressure on the northern edge; conflict and displacement across the central Sahel that has emptied farmland; and the substitution of imported rice and wheat for locally adapted grains in urban diets.',
  },
  'west|Sudan & Guinea savanna': {
    system: 'The grain belt: a longer and more reliable wet season than the Sahel allows sorghum, millet, maize, yam and groundnut together, with yam mounding on the wetter southern edge. Fields commonly carry three or four crops at once at different heights, which suppresses weeds and spreads risk.',
    hands: 'Farming communities across central Mali, Burkina Faso and northern Nigeria and Ghana. Yam cultivation in particular carries deep ritual and social weight, including new-yam festivals that mark the agricultural year rather than the calendar one.',
    pressure: 'Soil fertility decline as fallow periods shorten under population pressure, fertiliser cost and availability, and the same drift toward imported staples that affects the Sahel.',
  },
  'west|Humid forest': {
    system: 'Root and tuber systems under tree cover: cassava and yam in the ground, plantain above, oil palm as both crop and canopy. Palm oil is the cooking fat and the flavour base rather than a commodity here, and leaf sauces - cassava leaf, bitterleaf, Gnetum - supply the green. Much of it is intercropped in ways that look untidy and are agronomically deliberate.',
    hands: 'Farming households across southern Nigeria, Ghana, Côte d’Ivoire, Cameroon and the Congo forest edge. Leaf knowledge - which greens, when, how prepared - is substantially women’s knowledge and travels through households rather than through institutions.',
    pressure: 'Deforestation for timber and industrial oil palm, which is a different thing from smallholder palm; cassava mosaic and brown streak virus; and the pull of cocoa as a cash crop on land that fed people.',
  },
  'west|Coastal & mangrove': {
    system: 'Tidal rice engineering: fields cut into mangrove and coastal marsh with banks, sluices and gates to admit fresh water and exclude salt, flooding and draining on a schedule tied to tide and season. It is water management before it is farming, and it produced the expertise that was later extracted to build the Carolina rice economy.',
    hands: 'Rice-coast communities across Senegal, the Gambia, Guinea-Bissau, Guinea and Sierra Leone - Jola, Balanta, Baga and others. Oryza glaberrima, African rice, was domesticated in this system independently of Asian rice, which is one of the most significant and least known facts in world agriculture.',
    pressure: 'Saltwater intrusion as sea level rises, which attacks the exact mechanism the system depends on; mangrove clearance; and the near-total displacement of glaberrima by higher-yielding Asian varieties, which has narrowed the genetic base.',
  },
  'west|Cabo Verde': {
    system: 'Island agriculture on steep volcanic ground with very little rain, worked with terracing, fog capture on the higher slopes and irrigation where springs allow. Maize and beans dominate because they store; cassava and cabbage fill in. Drought is not an event here but a recurring condition.',
    hands: 'Kriolu communities descended from Portuguese settlement and enslaved West Africans, whose creole culture and cuisine formed on the islands rather than being carried intact to them. Cachupa, the slow corn-and-bean pot, is the national dish and a genuinely local lineage.',
    pressure: 'Chronic water scarcity, heavy dependence on food imports, and emigration so extensive that the diaspora outnumbers the resident population - which shapes both the labour available to farm and the money that sustains households.',
  },

  /* ───────── East Africa & the Horn ───────── */

  'east|Ethiopian & Eritrean highlands': {
    system: 'Ox-plough agriculture at altitude, on soils and at elevations where teff - a grain domesticated here and grown almost nowhere else - outperforms alternatives. Barley, field pea, chickpea and lentil rotate with it. The fasting calendar is an agricultural fact as much as a religious one: a repertoire built around legumes exists because the year demands it.',
    hands: 'Highland farming communities across Ethiopia and Eritrea, and the Orthodox fasting tradition that shaped the cuisine. Teff’s enormous seed diversity is held in farmers’ fields as much as in gene banks.',
    pressure: 'Teff yields are low and the crop lodges easily; land holdings have fragmented across generations to sizes that cannot support a household; and conflict in the north has displaced farming populations and disrupted planting seasons directly.',
  },
  'east|Horn drylands': {
    system: 'Hybrid pastoral-agricultural systems where herding is primary and cropping is opportunistic, taking sorghum and maize where rainfall permits. Sesame and cowpea are the cash and protein layers. Mobility is the risk-management strategy, and fixing people in place is what breaks it.',
    hands: 'Somali, Afar and Oromo pastoral communities among others, with a fermented flatbread tradition - canjeero, lahoh - that runs parallel to injera and shares its microbiology.',
    pressure: 'Repeated failed rains and prolonged drought; conflict and border closure that cut migration routes herds depend on; and food aid dependency that has in places displaced local grain markets.',
  },
  'east|Nile & riverine Sudan': {
    system: 'Farming tied to the Nile’s flood and to seasonal rain-fed cropping away from it. Sorghum and millet are the grains, fava the legume, dates the tree crop, and fermentation - of sorghum for kisra, of legumes and dairy - is the preservation technology in a climate that punishes anything else.',
    hands: 'Riverine Sudanese farming communities and the fermentation knowledge held largely in households. Sudanese fermented foods are unusually numerous and unusually little documented outside the country.',
    pressure: 'War, which has displaced millions and made planting and harvest impossible across large areas; upstream dam construction altering flow; and the collapse of markets that moved grain from surplus to deficit regions.',
  },
  'east|Great Lakes': {
    system: 'Banana-and-legume economies: perennial cooking banana stands that produce year-round without replanting, understorey beans and groundnut, sweet potato as the hunger-gap crop. Perenniality is the strength - the calorie supply does not depend on a single harvest date - and the vulnerability, because a disease in the stand is a disease in the food supply.',
    hands: 'Farming communities across Uganda, Rwanda, Burundi and western Kenya and Tanzania, with banana varietal knowledge running to dozens of named cultivars distinguished by use rather than by botany.',
    pressure: 'Banana bacterial wilt and nematode pressure on the stands; extreme population density on limited arable land; and land conflict with long and violent political histories.',
  },
  'east|Swahili coast & Zanzibar': {
    system: 'Coconut, rice, cassava and spice on a coastal strip whose agriculture was organised around Indian Ocean trade rather than around subsistence alone. Clove plantations reshaped Zanzibar’s land use entirely in the nineteenth century. Coconut is the fat, the milk and the sweetener; rice is the prestige grain.',
    hands: 'Swahili coastal communities, with Persian, Arab, Indian and Southeast Asian techniques layered in over a thousand years of monsoon trade. The codex is explicit that this history is inseparable from the Indian Ocean slave trade, and does not present the exchange as benign cosmopolitanism.',
    pressure: 'Tourism reshaping land and water use, coral and fishery decline, and a spice economy that no longer commands the prices it was built on.',
  },

  /* ───────── North Africa & the Nile ───────── */

  'north|Nile Delta': {
    system: 'Irrigated alluvium, some of the most intensively farmed land on earth, fed by canals and cropped year-round in rotation - rice, wheat, fava, vegetables. Pickling and sun-drying are the preservation technologies, and the urban market network that moves the produce is dense and old.',
    hands: 'Fellahin farming families whose techniques on this ground are continuous over millennia, and an urban market and pickling trade that is a distinct craft in its own right.',
    pressure: 'Salinisation and sea-level rise on very low ground, reduced silt and flow since the High Dam, and urban expansion consuming the best farmland at speed. The codex names the threat on the card itself.',
  },
  'north|Upper Egypt': {
    system: 'A narrow floodplain with desert immediately beyond it, cropped intensively with wheat, sugarcane, molokhia and dates. The margin between irrigated and uninhabitable is sometimes a few hundred metres. Riverboat and rural souk moved the produce long before roads did.',
    hands: 'Saidi farming communities, with a distinct dialect, distinct foodways and a long history of being governed from the Delta rather than governing.',
    pressure: 'Reduced Nile flow, rising heat that pushes crops past their tolerances, and sugarcane’s heavy water demand on a shrinking supply.',
  },
  'north|Nubian river communities': {
    system: 'Cataract-zone farming on narrow river terraces, with grain storage pits, date palms as the anchor crop and legumes between. The system is built for a place where arable land is measured in strips rather than fields, and storage matters as much as growing.',
    hands: 'Nubian communities on both sides of the Egypt-Sudan border, whose language and foodways are distinct from both national mainstreams, and whose diaspora networks carry food knowledge between the two.',
    pressure: 'Dam displacement above all - the Aswan High Dam flooded Nubian homeland and forcibly relocated communities in the 1960s, and further dam projects have continued the pattern. The codex names displacement rather than climate as the primary threat here, which is correct.',
  },
  'north|Atlas & Rif mountains': {
    system: 'Terraced fields fed by snowmelt, cropped with barley, legumes, walnut and fig, with transhumance moving animals up and down the slopes seasonally. Terracing is the infrastructure and requires constant maintenance; abandoned terraces erode quickly.',
    hands: 'Amazigh communities across Morocco and Algeria, whose agricultural and culinary vocabulary predates Arabic in the region and whose seed and irrigation knowledge is local to specific valleys.',
    pressure: 'Snowpack decline reducing the water the terraces depend on, erosion where maintenance labour has left for the cities, and cannabis cultivation in parts of the Rif displacing food crops.',
  },
  'north|Oases': {
    system: 'Three-layer irrigated agriculture under date palm: palms above, fruit trees below them, vegetables and fodder at ground level, all fed by spring or groundwater through hand-dug channels. The shade is what makes cultivation possible at all in the heat, so the canopy is infrastructure.',
    hands: 'Oasis communities across the Sahara, historically caravan-linked and often ethnically layered, with water rights allocated by systems of turns and shares that are among the oldest continuously operating institutions anywhere.',
    pressure: 'Aquifer depletion, much of it from industrial-scale pumping for export agriculture elsewhere in the same basins; and the collapse of the caravan economy that gave the oases their commercial reason to exist.',
  },

  /* ───────── Central & Southern Africa ───────── */

  'central|Congo Basin rainforest': {
    system: 'Rotational forest-clearing agriculture - cassava and plantain in cleared patches allowed to return to forest afterwards - alongside a very substantial gathered component: fumbwa and other forest greens, wild fruit, caterpillars, mushrooms. The gathered half is often larger than the farmed half and is almost invisible in agricultural statistics.',
    hands: 'Forest farming communities across the Congo Basin. The codex notes specifically that the gathering knowledge is tied closely to women’s knowledge systems, which is both true and the reason it is under-recorded.',
    pressure: 'Deforestation for logging and mining, conflict and displacement across the eastern DRC, and cassava viral disease.',
  },
  'central|Miombo woodland': {
    system: 'Woodland-savanna farming with sorghum and maize, and a foraging economy in the woodland itself that is globally significant for fungi - hundreds of edible species, gathered seasonally, sold at roadside and market. The trees and the mushrooms are the same system: the fungi are largely mycorrhizal and depend on the standing woodland.',
    hands: 'Rural communities across Zambia, Malawi, Mozambique and Zimbabwe, with mushroom identification knowledge held locally and taught in person - a genuine expertise that the Mushroom mastery screen’s rule about never identifying fungi from a photograph is precisely respecting.',
    pressure: 'Charcoal production and land clearance, which remove the trees the fungi need; the mushrooms disappear with the woodland rather than after it.',
  },
  'central|Kalahari & Namib drylands': {
    system: 'Foraged fats, fruits and drought cereals in an environment where cultivation is marginal: marula and mongongo nuts as dense energy sources, tsamma melon as a water store, sorghum where rain permits. The nut crops are gathered from wild trees rather than planted, and yield reliably in years when crops fail.',
    hands: 'San communities among others, whose plant knowledge in this environment is among the most detailed and most studied - and most extracted - anywhere. Marula and hoodia have both been commercialised with contested benefit-sharing.',
    pressure: 'Land dispossession and restricted access to gathering grounds, borehole-dependent grazing changing the vegetation, and bioprospecting arrangements that have not reliably returned value to the communities whose knowledge was used.',
  },
  'central|South African highveld & townships': {
    system: 'Maize as the dominant staple - samp, pap, mealie meal - with beans and morogo as the relish layer, grown in gardens and on smallholdings where land is available and bought where it is not. The relevant system here is as much retail as agricultural: what is sold where, and at what price.',
    hands: 'Township and rural households across South Africa. The codex names apartheid spatial planning directly, and it belongs here: the Group Areas Act and forced removals determined where people live, how far they are from fresh food, and what a household can afford to cook, and those patterns have outlived the law.',
    pressure: 'Food price inflation on staples, retail concentration that leaves townships served by expensive small outlets, and land reform that has moved slowly against very high expectations.',
  },
  'central|Mozambican coast': {
    system: 'Cassava as the base crop, with its leaf harvested as a green in its own right - two foods from one plant - alongside coconut and Indian Ocean trade goods. Coastal cassava-and-coconut cooking is the region’s signature and matapa is its clearest expression.',
    hands: 'Coastal Mozambican communities, with Swahili and Indian Ocean influence layered onto a cassava-leaf base rather than replacing it.',
    pressure: 'Cyclones of increasing intensity striking the coast directly, conflict in Cabo Delgado displacing farming populations, and cassava disease pressure.',
  },

  /* ───────── The Caribbean ───────── */

  'caribbean|Conuco (Taíno)': {
    system: 'Knee-high mounds of loosened soil, ash and organic matter, planted in polyculture: cassava at the centre, beans climbing, squash spreading at the base to shade out weeds and hold moisture. The mound improves drainage and root run in heavy tropical soil, and the mixture spreads risk across species. It is the deliberate opposite of the row monocrop that replaced it.',
    hands: 'Taíno agricultural knowledge, which the codex names as Indigenous rather than absorbing into a general Caribbean category. The conuco is a designed system and the design is attributable.',
    pressure: 'The historical pressure was colonial plantation agriculture, which displaced it almost entirely. The present one is that it survives mainly as a revived practice and a documented model rather than as a continuous system - though cassava, the crop at its centre, never left.',
  },
  'caribbean|Provision grounds': {
    system: 'Marginal hillside plots - the land not worth planting in cane - allotted to enslaved people to feed themselves, and worked in what time they had. Yam, sweet potato, dasheen, cassava and breadfruit, grown intensively on poor ground. The surplus went to Sunday markets, which is where the money and the networks came from.',
    hands: 'Enslaved and later freed communities across the plantation Caribbean. The codex identifies this as the origin of "ground provisions" as a category and of Caribbean market economies, which is the important claim: an imposition became an institution.',
    pressure: 'This is history rather than a live system, but its descendants - smallholder plots and Sunday markets - face import competition, land pressure from tourism, and hurricane risk that lands hardest on hillside plots.',
  },
  'caribbean|Maroon forest farms': {
    system: 'Food production in defensible forest interior: cassava, plantain and yam in small dispersed plots alongside substantial gathering, sited for concealment and defence as much as for soil. The agriculture is inseparable from the military and political situation that produced it.',
    hands: 'Maroon communities - people who escaped enslavement and established autonomous settlements. Accompong and Moore Town in Jamaica maintain the practice and the political autonomy together; the codex names them specifically rather than speaking generally.',
    pressure: 'Land encroachment and legal challenges to treaty-held autonomy, out-migration of younger generations, and the pressure that comes with being treated as heritage rather than as living communities.',
  },
  'caribbean|Ital homesteads': {
    system: 'Household growing organised around a religious discipline: callaloo, coconut, ground provisions and herbs, unsalted and unprocessed, fresh from the earth. Livity - the life force in food - is the organising principle, and it governs what is grown as much as what is cooked.',
    hands: 'Rastafari communities. The codex says it directly: a religious discipline before it was ever a diet, and the entry is written to prevent Ital being read as a Caribbean style of veganism rather than an observance with its own theology.',
    pressure: 'Commercial appropriation of Ital as a restaurant category, and the ongoing criminalisation and marginalisation Rastafari communities have faced in several Caribbean states.',
  },
  'caribbean|Indo-Caribbean gardens': {
    system: 'Rice, split peas, bhaji and curry leaf grown in household plots by indentured labourers and their descendants, bringing a second and much older vegetarian tradition into Caribbean kitchens. It sits alongside the African-descended provision-ground system rather than merging with it.',
    hands: 'Indo-Caribbean communities in Trinidad, Guyana and Suriname, arriving under indenture from 1838 onward. The codex keeps indenture and enslavement strictly distinct throughout, and this zone is where that distinction lands in the Caribbean volume.',
    pressure: 'Rice sector decline under import competition, and the political tension between African- and Indian-descended populations in Trinidad and Guyana that has periodically been very sharp and that food is often asked to smooth over.',
  },

  /* ───────── Afro-South America ───────── */

  'afrosam|Amazon várzea & terra preta': {
    system: 'Two systems side by side. The várzea is seasonally flooded land farmed on a calendar set by the river rather than by rainfall, with fast-maturing crops timed to the drawdown. Terra preta is anthropogenic dark earth - soil built up over centuries by burning, charcoal, pottery and fish and animal bone - which stays fertile in a basin where cleared soil normally exhausts within a few seasons. It is an engineered soil and it is still productive centuries later.',
    hands: 'Indigenous and riverine communities, and quilombola settlements. Terra preta is direct evidence of large, settled, agriculturally sophisticated pre-Columbian populations, which is a fact that overturned a long-standing assumption that the Amazon could not support them.',
    pressure: 'Deforestation and fire, illegal mining and mercury contamination of the rivers that supply protein, and land grabbing that targets exactly the areas with the best soils.',
  },
  'afrosam|Quilombola Atlantic Forest & Cerrado': {
    system: 'Swidden-fallow agroforestry: small plots cleared and cropped for a few years then left to regrow for many more, with fruit trees, cassava, corn and beans layered through. The long fallow is the fertility mechanism, which is why the system needs far more land than the cultivated area at any one moment - a point that land-titling disputes consistently miss.',
    hands: 'Quilombola communities, descended from people who escaped enslavement and established free settlements. Article 68 of Brazil’s 1988 constitution recognised their land rights, and the codex notes the recognition is still fought over parcel by parcel - titling has been slow and contested.',
    pressure: 'Agribusiness expansion into the Cerrado, which is being cleared faster than the Amazon; slow and reversible land titling; and mining concessions granted over claimed territory.',
  },
  'afrosam|Afro-Colombian Pacific (Chocó & Cauca)': {
    system: 'Plantain, cassava, coconut and rice grown on riverbanks in one of the wettest places on earth, with the rivers serving as the roads. Fishing and gathering are integral rather than supplementary, and the whole system depends on the river being clean and navigable.',
    hands: 'Afro-Colombian communities holding collective title through consejos comunitarios under Law 70 of 1993 - a genuinely significant piece of collective land legislation that the codex names specifically rather than gesturing at.',
    pressure: 'The codex states it directly: gold mining, mercury and armed displacement have broken river food systems and pushed cooking into the cities. Mercury from alluvial mining contaminates the fish; armed conflict has displaced whole river communities; and the cuisine now partly survives in Cali and Bogotá rather than on the rivers.',
  },
  'afrosam|San Basilio de Palenque': {
    system: 'Household patio agriculture and small plots - cassava, coconut, corn, tropical fruit - feeding a town rather than a commodity market. The codex identifies the patio as the teaching workshop, which is the important structural point: the growing, the cooking and the transmission of both happen in the same space.',
    hands: 'Palenqueros, in what is widely regarded as the first free town of formerly enslaved Africans in the Americas. Palenquero creole carries Kikongo-Bantu roots and is one of very few African-derived creoles in the Spanish-speaking Americas; the Palenquera vendors who sell sweets are also the people who hold and teach the recipes.',
    pressure: 'Out-migration to Cartagena and beyond, tourism that consumes the town’s image faster than it supports its economy, and the ordinary difficulty of sustaining a language and a foodway held by a few thousand people.',
  },
  'afrosam|Guiana Maroon forest gardens': {
    system: 'Shifting forest gardens along the interior rivers of Suriname and French Guiana - cassava as the anchor, with plantain, rice and a very substantial gathered component from the surrounding forest. Plots are cleared, cropped and returned to fallow, and the rivers are the transport network. Cassava processing here uses the same pressing and detoxifying technology found across the Amazon and the Caribbean.',
    hands: 'Saramaka, Ndyuka and other Maroon nations - descendants of people who escaped Dutch plantations and won treaty recognition in the eighteenth century. The codex notes they hold some of the most autonomous food-sovereignty structures in the hemisphere, which is a strong claim and a defensible one: these are self-governing peoples with their own law, language and land, not a rural minority.',
    pressure: 'Gold mining and mercury contamination of the interior rivers the whole system depends on; logging concessions granted over territory; and the long legal struggle over land rights, in which the Saramaka took Suriname to the Inter-American Court of Human Rights and won.',
  },
  'afrosam|Afro-Peruvian coast': {
    system: 'Coastal valley agriculture - rice, beans, sweet potato, chilli - but the codex is precise that the culinary path here ran through urban kitchen labour and street vending rather than through rural provision grounds. That is a different mechanism of transmission from the Caribbean or Brazil, and it produced a different cuisine.',
    hands: 'Afro-Peruvian communities in Chincha, Cañete and Ica. Much of what is now claimed as Peruvian national cuisine was developed by Black cooks in domestic service and by street vendors, and the attribution has historically not followed the labour.',
    pressure: 'Under-recognition above all - Afro-Peruvians are a small and politically marginal population whose contribution to a now globally celebrated national cuisine is thinly credited - alongside water scarcity in the coastal valleys and agro-export expansion.',
  },

  /* ───────── Afro-Asia & the Indian Ocean ───────── */

  'afroasia|Pre-colonial dhow trade': {
    system: 'Monsoon-timed sailing that made the Indian Ocean a two-way seasonal highway: one wind out, the opposite wind back, months later. That rhythm dictated when goods, people and techniques moved, and it built the Swahili city-states as entrepôts rather than as colonies of anywhere.',
    hands: 'Swahili city-states, Omani and Yemeni merchant families, Gujarati and Persian traders. The codex offers a neat evidentiary observation: Swahili is a Bantu language enriched with Arabic, and the loanwords track the cargo - which is linguistic evidence for a trade pattern rather than an assumption about it.',
    pressure: 'Historical rather than current, but the framing pressure is interpretive: this exchange is often romanticised, and the codex is careful elsewhere to note that the same routes carried the Indian Ocean slave trade.',
  },
  'afroasia|Colonial plantation economy': {
    system: 'Monocrop clove, sugar and coffee production replacing mixed cultivation. Zanzibar’s clove boom in the 1830s to 1850s made the island the dominant world supplier, and the codex gives the figure - up to 90% of the world crop by 1834 - alongside the fact that it ran on enslaved African labour.',
    hands: 'The codex sets it out with unusual bluntness: an Arabian dynasty, an African island, an Indonesian spice. Omani rule moved to Zanzibar in 1832, and the plantation labour was enslaved East Africans. Naming all three parts prevents the story being told as either a purely European crime or a purely benign trade.',
    pressure: 'The clove economy collapsed in relative terms and never recovered its prices; what remains is an agricultural landscape shaped by a monocrop that no longer pays.',
  },
  'afroasia|Indenture, 1834–1917': {
    system: 'Contract labour migration after the abolition of slavery in the British empire, moving Bhojpuri-speaking Indians to Mauritius and Réunion and Cantonese and Hakka migrants to Jamaica, among many other routes. It brought rice, dhal, roti, achar and chilli into kitchens across the Indian Ocean and the Caribbean.',
    hands: 'Indentured labourers and their descendants. The codex makes the chronological point that matters most: most documented Afro-Asian hybridity begins here - after the abolition of African slavery, not before it. That single sentence prevents a great deal of loose speculation about ancient contact.',
    pressure: 'Interpretive again: indenture is frequently either conflated with slavery or presented as free migration, and it was neither. The codex keeps the two systems strictly apart throughout, which is why this zone exists as its own entry.',
  },
  'afroasia|Contemporary diaspora': {
    system: 'Not an agricultural system but a contemporary culinary one: Afro-Filipino, Afro-Japanese and Afro-Korean cooking built through military basing history, mixed families and internet recipe culture. Soy, gochujang, adobo and noodles entering Black kitchens and the reverse.',
    hands: 'Mixed families and communities formed substantially around US military presence in the Philippines, Japan and Korea, and a younger generation documenting the food publicly. The codex describes it as real, recent, and labelled as such.',
    pressure: 'The main risk here is misattribution in the other direction - recent, traceable, personal food histories being given invented ancient lineages to make them seem more legitimate. The codex refuses that trade.',
  },
  'afroasia|Parallel invention': {
    system: 'Not a place at all but a methodological entry, and one of the most useful in the codex. African grain fermentation - injera, kisra, ogi - and Asian soy fermentation - miso, tempeh - developed independently on the same microbial principles: lactic acid bacteria and moulds doing the same chemistry in different substrates.',
    hands: 'Both traditions, separately. The codex line is the whole point: similar is not the same as connected. Two cuisines arriving at fermentation independently is convergence, and reading it as contact would be a straightforward error.',
    pressure: 'This zone exists to guard against a specific failure mode - the temptation to build a diffusion story out of a resemblance. It is the codex arguing with itself in public, which is the most honest thing on the page.',
  },

  /* ───────── Indenture & the Indo-African Diaspora ───────── */

  'indenture|Siddi & Sheedi': {
    system: 'Millet, sorghum, legumes and gathered forest greens in Gujarat, Karnataka and Sindh - largely subsistence farming and forest use in areas where communities were pushed to marginal land.',
    hands: 'Siddi and Sheedi communities of East African Bantu ancestry, carried into South Asia through Arab and Portuguese trade, Deccan military service and sailing work over many centuries. Some hold Scheduled Tribe status in Junagadh; Hindu, Muslim and Christian households live side by side. The codex adds a sentence that most sources omit: the documentation is thin and the community has not been paid for it.',
    pressure: 'Marginal land, limited political weight, and a research relationship that has extracted stories and genetic samples without much flowing back.',
  },
  'indenture|Gujarati East Africa': {
    system: 'Merchant and railway migration rather than agricultural settlement, producing an urban food economy: dal, roti and chutney meeting cassava and sukuma wiki. Samosa and chai are now Kenyan, Ugandan and Tanzanian street food without qualification.',
    hands: 'Gujarati traders and railway workers placed by colonial administration into a legally enforced middle tier - above Black Africans, below white settlers. The codex names that structure rather than describing a harmonious multicultural exchange, and then names its consequence: 80,000 people expelled from Uganda in 1972.',
    pressure: 'That expulsion, and the racial hierarchy that preceded it, are the pressure - a community positioned as an intermediary by colonial law and then made to answer for the position.',
  },
  'indenture|Natal & Durban': {
    system: 'Sugarcane field labour from 1860 alongside a separate merchant class, producing bean curry, lentil cooking and the bread-and-curry street food that followed. The codex keeps the two arrivals distinct in caste, class and kitchen, which is a real distinction and not a fine one.',
    hands: 'Tamil and Telugu indentured field labour, and Gujarati "passenger Indians" who arrived free and paid their own way. Two different migrations, two different legal statuses, two different foodways that are frequently collapsed into one.',
    pressure: 'Apartheid geography, which produced bunny chow as a direct consequence of exclusion; and the ongoing conflation of these two histories into a single undifferentiated "Indian South African" story.',
  },
  'indenture|Trinidad & Guyana': {
    system: 'Split pea, channa, tamarind, culantro and pumpkin grown in gardens and sold on the street, feeding one of the largest traditionally-vegan street food canons anywhere. Doubles, dhalpuri, pholourie and seven curry are the documented core.',
    hands: 'Indo-Caribbean communities descended from indentured labourers arriving from 1838. The codex calls this one of the most thoroughly documented traditionally-vegan street canons anywhere on earth, which is a strong claim and a defensible one - the dishes are recorded, dated and attributed.',
    pressure: 'Ethnic political tension between African- and Indian-descended populations in both countries; and the commercial pressure that pushes street food toward standardisation.',
  },
  'indenture|Suriname': {
    system: 'Four traditions running in parallel rather than merging: Hindustani, Javanese, Creole and Maroon, each with its own crops, techniques and repertoire. Roti, dal, peanut, sambal and pomtajer belong to different ones of those and stay distinguishable.',
    hands: 'Indian, Javanese, Creole and Maroon Surinamese communities. The codex makes one precise correction: Javanese sambal is Southeast Asian and never gets filed as South Asian - a small point that prevents the collapse of two distinct migrations into a single "Asian" category.',
    pressure: 'Emigration to the Netherlands, which has moved a large share of the population and much of the food culture abroad; and economic instability at home.',
  },
  'indenture|Mauritius & Réunion': {
    system: 'Yellow split pea, turmeric, butter bean and chilli in household and market cooking, on islands where sugar monoculture dominated the land and food crops occupied the margins. Dholl puri is the emblem and the codex traces it specifically to Bihar, griddled on a tawa rather than deep-fried, folded around Creole rougaille.',
    hands: 'Indo-Mauritian and Réunionnais communities. The codex is careful to say this is genuinely Indo-African-Creole rather than a marketing phrase - the components are traceable to distinct origins and the combination is lived rather than staged.',
    pressure: 'Sugar sector decline, land pressure from tourism and housing, and the flattening of a specific and traceable food history into generic island fusion for visitors.',
  },

  /* ───────── Afro-Italy & the Black Mediterranean ───────── */

  'italy|Ancient Mediterranean basin': {
    system: 'Durum wheat, barley, lentil, chickpea, olive and fig - the crop suite that defines Mediterranean agriculture, moved around the basin by Phoenician and Carthaginian networks before Rome held power. Sicily was a grain province, and the codex notes it fed the imperial city on agriculture it partly inherited from North Africa.',
    hands: 'Phoenician and Carthaginian traders and North African agricultural practice. The entry exists to establish that the movement of crops and technique across this water is thousands of years old and did not begin with any European power.',
    pressure: 'Historical. The interpretive pressure is that Mediterranean cuisine is routinely presented as European in origin when a substantial part of its crop base and technique came the other way across the water.',
  },
  'italy|Arab & Amazigh Sicily': {
    system: 'Irrigation, rice paddies, citrus and sugar cane introduced during the ninth to eleventh centuries, transforming the island’s agriculture permanently. Durum pasta and couscous belong to the same period. These were not additions to a fixed Sicilian cuisine - they substantially made it.',
    hands: 'Arab and Amazigh rule and settlement in Sicily. Cuscusu is still cooked on the Sicilian side of the same channel, which is the codex’s way of pointing out the continuity is live rather than archaeological.',
    pressure: 'Interpretive again, and it is the point of the volume: this period is frequently minimised in accounts of Italian food history, and the codex restores it.',
  },
  'italy|Italian East Africa': {
    system: 'Colonial agronomy: hybrid wheat pushed into the Ethiopian highlands, pasta and espresso introduced to the cities, berbere and local grains continuing underneath. The codex records that fascist agronomists pushed hybrid wheat on indigenous farming knowledge they did not credit, while requisitioning local grain - extraction running in both directions at once.',
    hands: 'Ethiopian and Eritrean farmers whose knowledge was used and uncredited, and an Italian colonial administration that built Asmara as "Piccola Roma" with segregated dining rooms. That segregation is why the zighinì entry matters.',
    pressure: 'Historical, but its consequences are live: the food relationship between Italy and the Horn is a colonial one, and the codex refuses to describe it as exchange.',
  },
  'italy|Somali & Libyan coasts': {
    system: 'Rice-forward Somali cooking that absorbed spaghetti without being displaced by it, and Libyan couscous and legume cooking that long predates Italian arrival. The codex is explicit that baasto entered an already rice-forward Somali system rather than replacing it.',
    hands: 'Somali and Libyan cooks. The strongest line in the zone is the last one: Libyan couscous and legume cooking predates Italian arrival by centuries and outlasted it - the influence runs the other way. That inverts the usual telling.',
    pressure: 'War and state collapse in both Somalia and Libya, displacement of populations who carry the food, and the reduction of these cuisines to their colonial-contact points in outside accounts.',
  },
  'italy|Contemporary Italy': {
    system: 'A functioning urban food economy rather than an agricultural zone: Eritrean and Ethiopian restaurants, groceries and import chains built by families, with teff, fonio, collard and coffee moving through them. Milan’s Porta Venezia - Asmarina - and Rome’s Ostiense are the anchors.',
    hands: 'Eritrean and Ethiopian families, and more recently West African communities. The codex gives figures: around one restaurant in twenty nationally is ethnic-owned, and in Lombardy it is close to 27% - which is the kind of number that turns a cultural observation into an economic one.',
    pressure: 'Restrictive immigration and citizenship law - Italy’s citizenship rules leave people born there without it for many years - alongside racism in licensing, rents and public life. The food economy is established; the legal standing of the people running it is not.',
  },

};

export const CODEX_EXTRA_COUNT = Object.values(codexExtraDishes)
  .reduce((a, v) => a + v.length, 0);
export const DISH_DEPTH_COUNT = Object.keys(dishDepth).length;
export const ZONE_DEPTH_COUNT = Object.keys(zoneDepth).length;
