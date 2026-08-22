/*
  Added depth for the 28 plate recipes.

  This lives in its own file, not in content.ts, on purpose. README rule 3 says
  copy is not edited and content.ts is verbatim, "worded precisely to avoid
  claiming more than the evidence supports". Deepening the recipes therefore
  means ADDING, never rewriting: every existing eyebrow, ingredient line, step,
  swap and attribution is untouched.

  What each entry adds is craft, not claims:

    ahead - what to do before you start, derived from the ingredients already
            listed (soaking, pressing, pickling, batch-cooking a slow grain)
    cues  - how you know it is right, derived from the steps already written
    keeps - storage and reheating

  What it deliberately does NOT add is a second set of nutrition numbers or any
  new claim about a dish's history. The kcal, iron and fibre figures stay exactly
  as they were, and provenance stays where it belongs, in each recipe's own
  `attrib` line. Inventing either would be the failure this app exists to avoid.

  Several recipes already carry their pivotal technique inside the steps - "so it
  never splits in the pot", "the air is what makes akara light", "file off the
  heat, never boiled". Those are not restated here. The cues cover what the steps
  leave unsaid.
*/

export type RecipeDepth = {
  ahead: string;
  cues: string[];
  keeps: string;
};

export const recipeDepth: Record<string, RecipeDepth> = {
  jollof: {
    ahead: 'Cook the peas ahead or use tinned. The blended pepper base can be made a day early and keeps covered in the fridge.',
    cues: [
      'The base has come together when the palm oil floats clear on top and the raw tomato smell is gone.',
      'Millet is done when the grains are tender but still separate. If it turns pasty the heat was too high.',
    ],
    keeps: 'Three days covered. Reheat with a splash of stock — millet keeps drinking as it sits.',
  },
  redred: {
    ahead: 'Soak dried peas overnight and cook them the day before. The plantains need to be properly ripe, black-flecked rather than yellow.',
    cues: [
      'The plantain is ready when the cut faces are deep gold and the edges have caramelised.',
      'The pepper base is done when the oil separates and pools red at the edge of the pan.',
    ],
    keeps: 'The stew keeps three days. Fry plantain fresh each time — it goes leathery in the fridge.',
  },
  rundown: {
    ahead: 'Make the sea moss gel ahead. It sets in the fridge and keeps about a week.',
    cues: [
      'The coconut milk has run down when it thickens, the oil separates and it smells nutty rather than raw.',
      'Leave the scotch bonnet whole and lift it out before it bursts, unless you want the full heat.',
    ],
    keeps: 'Two days. Reheat gently — boiling hard once the sea moss is in will thin it back out.',
  },
  hoppin: {
    ahead: 'Cook the peas the day before and keep every drop of the liquor. That pot liquor is what flavours the rice.',
    cues: [
      'The rice is right when it has taken the colour of the peas and the grains still stand separate.',
      'The collards are done when a stem bends without snapping.',
    ],
    keeps: 'Four days. Store the collards separately so they do not bleed into the rice.',
  },
  groundnut: {
    ahead: 'Loosen the peanut paste with hot stock in a bowl before it goes anywhere near the pot.',
    cues: [
      'The stew is ready when the oil rises to the surface and the sweet potato yields to a spoon.',
      'If the paste splits, pull the pot off the heat and whisk in a little cold stock.',
    ],
    keeps: 'Four days, thickening as it stands. Thin with stock rather than water. Griddle the flats fresh.',
  },
  tofu: {
    ahead: 'Press the tofu at least thirty minutes, an hour if you have it. Sorghum takes forty-five, so start the grain first.',
    cues: [
      'The tofu has seared enough when it releases from the pan on its own.',
      'The collards want bright green and just wilted, not olive.',
    ],
    keeps: 'Three days. The grain firms in the fridge — steam it back rather than microwaving it dry.',
  },
  creole: {
    ahead: 'Soak the beans overnight. Mix the dumpling dough while the beans simmer.',
    cues: [
      'The beans are ready when a few crushed against the side of the pot thicken the liquor to a gravy.',
      'The dumplings are cooked when a skewer comes out clean. Lift the lid as little as you can.',
    ],
    keeps: 'The beans keep four days and improve. Add file per bowl, never to the stored pot.',
  },
  posole: {
    ahead: 'Toast and soak the chiles ahead. The base blends smoother after twenty minutes soaking.',
    cues: [
      'The chile base is right when it coats a spoon and tastes sweet rather than sharp.',
      'The squash is done when the edges soften but the cubes still hold their shape.',
    ],
    keeps: 'Four days. Keep the pumpkin-seed cream separate and swirl it in fresh.',
  },
  porridge: {
    ahead: 'Nothing to do ahead. This is a fifteen-minute breakfast.',
    cues: [
      'Amaranth thickens suddenly at the end — pull it when it coats the spoon but still moves.',
      'Stir continuously through the last few minutes or it will catch.',
    ],
    keeps: 'Best fresh. It sets solid cold; loosen with hot milk and add the shoots and lime after reheating.',
  },
  moringa: {
    ahead: 'Strip fresh moringa leaves from the stems first, so the final two minutes are not a scramble.',
    cues: [
      'The lentils are ready when they have collapsed and no longer hold their shape.',
      'The bloomed spices are done the moment the garlic turns pale gold. Past that it turns bitter.',
    ],
    keeps: 'Four days. Add fresh moringa when reheating rather than storing it in the pot.',
  },
  trailwrap: {
    ahead: 'Pickle the onion and smash the chickpeas the night before. Both are better for the rest.',
    cues: [
      'The smash is right when it holds together but you can still see whole pieces.',
      'Massage or briefly blanch tough collard ribbons — raw ribs will split the wrap.',
    ],
    keeps: 'Assembled wraps hold half a day wrapped tight. The filling alone keeps three days.',
  },
  akara: {
    ahead: 'Soak the peas four hours or overnight. The skins slip far more easily.',
    cues: [
      'The batter is ready when a spoonful of it floats in water.',
      'The oil is hot enough when a drop of batter rises straight back up and sizzles.',
    ],
    keeps: 'Eat hot — akara goes dense within the hour. Batter keeps a day; whip it again before frying.',
  },
  fonioporridge: {
    ahead: 'Nothing. Fonio is a five-minute grain.',
    cues: [
      'Fonio is done when the grains separate and fluff with a fork.',
      'The plantain has caramelised when it lifts from the dry pan without sticking.',
    ],
    keeps: 'Best fresh. Keeps two days; loosen with coconut milk.',
  },
  sorghumbowl: {
    ahead: 'Sorghum takes forty-five minutes. Cook a double batch and keep half for the week.',
    cues: [
      'The mushrooms have seared when the edges crisp and they stop releasing water.',
      'Sorghum stays chewy by nature — done is tender at the centre, not soft.',
    ],
    keeps: 'Four days, and the best keeper of the bowls. Dress at the table, not in the fridge.',
  },
  sorghumbowlsf: {
    ahead: 'Sorghum takes forty-five minutes. Cook a double batch and keep half for the week.',
    cues: [
      'The mushrooms have seared when the edges crisp and they stop releasing water.',
      'Pumpkin-seed butter thickens faster than tahini — loosen it further than looks right.',
    ],
    keeps: 'Four days. Dress at the table, not in the fridge.',
  },
  bepcallaloo: {
    ahead: 'Cook the peas ahead and keep the liquor.',
    cues: [
      'Callaloo collapses fast — four minutes and it is done.',
      'The yam is ready when a knife slides through without pressure.',
    ],
    keeps: 'Three days, with the components stored separately so the greens stay bright.',
  },
  scramble: {
    ahead: 'The batter can be whisked the night before. It improves with a rest.',
    cues: [
      'The batter has set when it pulls away from the pan in soft folds.',
      'Black salt goes in off the heat — the sulphur note cooks straight off.',
    ],
    keeps: 'Best fresh. Keeps a day, but the texture firms and does not come back.',
  },
  okrastew: {
    ahead: 'Wild rice takes forty minutes and will not hurry. Start it first or cook it the day before.',
    cues: [
      'The okra has seared enough when the pods blister and stop weeping.',
      'Wild rice is done when the grains split and curl open.',
    ],
    keeps: 'Four days. Add the lemon fresh to each serving.',
  },
  seamoss: {
    ahead: 'Make the sea moss gel ahead. It keeps about a week in the fridge.',
    cues: [
      'The gel has dispersed when no translucent flecks are left against the side of the jug.',
      'Blend the full forty-five seconds — under-blending leaves the hemp gritty.',
    ],
    keeps: 'Drink within the hour. It separates on standing; shake rather than re-blend.',
  },
  tofugreens: {
    ahead: 'Press the tofu thirty minutes. Rice and collards can both be cooked ahead.',
    cues: [
      'Sear before any liquid goes in — that crust is what stops it crumbling in the braise.',
      'The collards are ready when the stems bend rather than snap.',
    ],
    keeps: 'Three days, with the three components stored separately.',
  },
  butterbeangreens: {
    ahead: 'Cook the beans ahead and keep the liquor for the rice.',
    cues: [
      'The bean liquor is thick enough when it coats the back of a spoon.',
      'Steam the rice in that liquor rather than water, or the colour and salt are lost.',
    ],
    keeps: 'Four days, and it improves overnight.',
  },
  milletbars: {
    ahead: 'Toast the millet and let it cool completely. Warm grain makes the date paste sticky.',
    cues: [
      'The mix is ready when a pinch holds together without crumbling.',
      'Press hard into the tray — under-pressed bars fall apart at the first cut.',
    ],
    keeps: 'A week in the fridge, a month frozen. Steep the hibiscus cold overnight.',
  },
  cassava: {
    ahead: 'Peel the cassava thickly and hold it in water so it does not discolour.',
    cues: [
      'Cassava must be cooked fully through — no firm centre, no exceptions.',
      'The gravy is right when it clings to the root instead of pooling around it.',
    ],
    keeps: 'Three days. Cassava firms up cold; reheat with a splash of coconut milk.',
  },
  cornmeal: {
    ahead: 'Stew the fruit ahead. It keeps about a week.',
    cues: [
      'Whisk into cold milk first — lumps cannot be fixed once the pan is hot.',
      'Done when it holds the trail of the spoon for a moment.',
    ],
    keeps: 'Three days. It sets firm; loosen with hot milk.',
  },
  familyplate: {
    ahead: 'The beans can be stewed a day ahead. Yam is best boiled fresh.',
    cues: [
      'The yam is ready when a knife slides through cleanly.',
      'Greens go in last and want to stay bright, not olive.',
    ],
    keeps: 'Beans four days, greens two. Boil the yam fresh each time.',
  },
  lightsoup: {
    ahead: 'Blend the base ahead. It keeps two days raw in the fridge.',
    cues: [
      'Boiling hard for ten minutes is what makes it light soup — a gentle simmer leaves it tasting raw.',
      'Lift the scotch bonnet out before it bursts.',
    ],
    keeps: 'Three days. Dress the microgreen salad only at the moment of serving.',
  },
  groundnutsf: {
    ahead: 'Loosen the sunflower-seed butter with hot stock before it goes near the pot.',
    cues: [
      'Ready when the oil rises and the sweet potato yields to a spoon.',
      'Sunflower butter splits more readily than peanut — keep the heat low once it is in.',
    ],
    keeps: 'Four days, thickening as it stands. Thin with stock.',
  },
  trailbowl: {
    ahead: 'Pickle the onion and cook the millet the night before.',
    cues: [
      'Layer dry to wet — grain at the bottom, pickle on top — so nothing goes soggy in the pack.',
      'The smash should hold its shape rather than spread.',
    ],
    keeps: 'Three days sealed. Assembled jars travel a full day unrefrigerated in cool weather.',
  },
};

export const DEPTH_COUNT = Object.keys(recipeDepth).length;
