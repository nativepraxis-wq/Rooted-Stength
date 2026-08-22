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
};

export const CODEX_EXTRA_COUNT = Object.values(codexExtraDishes)
  .reduce((a, v) => a + v.length, 0);
export const DISH_DEPTH_COUNT = Object.keys(dishDepth).length;
export const ZONE_DEPTH_COUNT = Object.keys(zoneDepth).length;
