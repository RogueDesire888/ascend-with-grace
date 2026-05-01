// Smoothie encyclopedia — single source of truth.
// Static, no async, mirrors herbal-data.ts shape.

// ---------- Types ----------

export type IngredientCategoryId =
  | "fruit"
  | "leafy-green"
  | "cruciferous"
  | "protein"
  | "fat"
  | "superfood"
  | "liquid"
  | "sweetener"
  | "spice"
  | "booster";

export type Season = "spring" | "summer" | "autumn" | "winter" | "year-round";

export type Nutrients = {
  /** per 100 g (or 100 ml for liquids) */
  calories: number;
  protein: number; // g
  fat: number; // g
  carbs: number; // g
  fibre: number; // g
  sugar: number; // g
  micros: string[]; // human-readable, e.g. "Vit C", "Potassium"
};

export type GlycemicLoad = "low" | "medium" | "high";

export type Ingredient = {
  slug: string;
  name: string;
  emoji: string;
  category: IngredientCategoryId;
  nutrients: Nutrients;
  glycemicLoad: GlycemicLoad;
  benefits: string[];
  pairings: string[]; // ingredient slugs
  swaps: string[]; // ingredient slugs
  season: Season[];
  sourcing: string;
  contraindications: string[];
  story: string; // one-paragraph monograph
};

export type IngredientCategory = {
  id: IngredientCategoryId;
  name: string;
  emoji: string;
  role: string; // architectural role in the blend
};

export type Recipe = {
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
  goals: string[]; // goal ids
  difficulty: "Easy" | "Moderate" | "Crafted";
  season: Season[];
  diet: ("omnivore" | "plant-based" | "keto" | "low-fodmap" | "kid-friendly")[];
  ingredients: { slug: string; amount: string }[];
  instructions: string[];
  variations: string[];
  story: string;
  /** computed-style summary for display only */
  approxMacros: { calories: number; protein: number; fat: number; carbs: number; fibre: number };
};

export type SmoothieGoal = {
  id: string;
  name: string;
  summary: string;
  why: string;
  recipes: string[]; // recipe slugs
  rotation: string[]; // 7 day rotation, recipe slugs
  keyIngredients: string[]; // ingredient slugs
};

export type Ritual = {
  id: string;
  name: string;
  when: string;
  intention: string;
  recipe: string; // recipe slug
  notes: string;
};

export type NutrientFact = {
  name: string;
  klass: "Vitamin" | "Mineral" | "Polyphenol" | "Carotenoid" | "Fibre" | "Fat" | "Protein";
  whatItDoes: string;
  bestFromBlender: string[]; // ingredient slugs
};

export type Study = {
  id: string;
  topic: string;
  title: string;
  journal: string;
  year: number;
  finding: string;
  bottomLine: string;
};

export type Blender = {
  name: string;
  tier: "Budget" | "Mid" | "Premium" | "Pro";
  watts: number;
  strengths: string[];
  weaknesses: string[];
  bestFor: string;
};

export type Book = {
  title: string;
  author: string;
  year: number;
  level: "Foundational" | "Recipes" | "Science" | "Reference";
  why: string;
};

export type PantryTier = {
  id: "budget" | "standard" | "premium";
  name: string;
  weeklyBudget: string;
  keep: string[]; // ingredient slugs
  notes: string;
};

export type Rank = {
  id: string;
  name: string;
  color: string;
  required: { recipes: number; ingredients: number };
  description: string;
};

// ---------- Categories ----------

export const categories: IngredientCategory[] = [
  { id: "fruit", name: "Fruits", emoji: "🍓", role: "Sweetness, vitamin C, anthocyanins, the body of the blend." },
  { id: "leafy-green", name: "Leafy Greens", emoji: "🥬", role: "Chlorophyll, folate, magnesium — the daily vegetable you forgot to eat." },
  { id: "cruciferous", name: "Cruciferous & Roots", emoji: "🥦", role: "Sulforaphane, fibre, slow carbs. Use sparingly; lightly steam first if needed." },
  { id: "protein", name: "Proteins", emoji: "💪", role: "Amino acids for satiety and recovery. Plant or animal." },
  { id: "fat", name: "Healthy Fats", emoji: "🥑", role: "Slows glycemic response, carries fat-soluble vitamins, makes it creamy." },
  { id: "superfood", name: "Superfoods", emoji: "✨", role: "Concentrated phytonutrients — small dose, big effect." },
  { id: "liquid", name: "Liquids", emoji: "💧", role: "The vehicle. Choose hydration, fat, or protein." },
  { id: "sweetener", name: "Sweeteners", emoji: "🍯", role: "Optional. Whole-food sweeteners only — dates, honey, maple." },
  { id: "spice", name: "Spices", emoji: "🌶️", role: "Aromatics that double as anti-inflammatories." },
  { id: "booster", name: "Boosters", emoji: "🧪", role: "Adaptogens, collagen, greens powders, mushrooms — the finishing line." },
];

// ---------- Ingredients (80+) ----------

export const ingredients: Ingredient[] = [
  // ----- FRUITS -----
  {
    slug: "banana",
    name: "Banana",
    emoji: "🍌",
    category: "fruit",
    nutrients: { calories: 89, protein: 1.1, fat: 0.3, carbs: 23, fibre: 2.6, sugar: 12, micros: ["Potassium", "Vit B6", "Vit C", "Manganese"] },
    glycemicLoad: "medium",
    benefits: ["Creamy base, no dairy needed", "Potassium for electrolyte balance", "Resistant starch when slightly under-ripe"],
    pairings: ["cacao", "almond-butter", "spinach", "oat-milk"],
    swaps: ["frozen-mango", "avocado", "frozen-cauliflower"],
    season: ["year-round"],
    sourcing: "Buy spotted, freeze peeled. The freezer is the smoothie pantry.",
    contraindications: ["Latex-fruit syndrome (rare cross-reactivity)"],
    story: "The default base of the modern smoothie. Frozen banana is what makes a blend taste like soft-serve without any cream. Use half a banana when you want creaminess without the sugar.",
  },
  {
    slug: "mixed-berries",
    name: "Mixed Berries",
    emoji: "🫐",
    category: "fruit",
    nutrients: { calories: 57, protein: 0.7, fat: 0.3, carbs: 14, fibre: 2.4, sugar: 10, micros: ["Vit C", "Vit K", "Manganese", "Anthocyanins"] },
    glycemicLoad: "low",
    benefits: ["Highest ORAC of common fruits", "Anthocyanins support memory and vascular health", "Low glycemic sweetness"],
    pairings: ["greek-yogurt", "spinach", "flax", "almond-milk"],
    swaps: ["acai", "tart-cherry", "pomegranate"],
    season: ["summer", "year-round"],
    sourcing: "Frozen wild berries are higher in anthocyanins per dollar than fresh.",
    contraindications: ["Salicylate sensitivity"],
    story: "If you only buy one frozen fruit, buy wild blueberries. Smaller berries mean more skin per gram, which means more anthocyanin pigment doing the work.",
  },
  {
    slug: "frozen-mango",
    name: "Mango",
    emoji: "🥭",
    category: "fruit",
    nutrients: { calories: 60, protein: 0.8, fat: 0.4, carbs: 15, fibre: 1.6, sugar: 14, micros: ["Vit C", "Vit A", "Folate", "Mangiferin"] },
    glycemicLoad: "medium",
    benefits: ["Tropical sweetness without banana", "Beta-carotene for skin and immunity", "Mangiferin is a unique polyphenol"],
    pairings: ["coconut-water", "turmeric", "ginger", "lime"],
    swaps: ["pineapple", "peach", "papaya"],
    season: ["year-round"],
    sourcing: "Pre-frozen cubes save 15 minutes of prep.",
    contraindications: ["Urushiol cross-reactivity (rare, with poison ivy allergy)"],
    story: "The brightest fruit in the freezer. Pairs especially well with warming spices — turmeric and ginger find their home here.",
  },
  {
    slug: "pineapple",
    name: "Pineapple",
    emoji: "🍍",
    category: "fruit",
    nutrients: { calories: 50, protein: 0.5, fat: 0.1, carbs: 13, fibre: 1.4, sugar: 10, micros: ["Vit C", "Manganese", "Bromelain"] },
    glycemicLoad: "medium",
    benefits: ["Bromelain aids protein digestion", "Anti-inflammatory for sore muscles", "Bright tropical lift"],
    pairings: ["coconut-water", "ginger", "kale", "mint"],
    swaps: ["mango", "papaya"],
    season: ["year-round"],
    sourcing: "Frozen chunks; or use the core of a fresh pineapple — that's where bromelain concentrates.",
    contraindications: ["Mouth tingling from bromelain", "Avoid raw on prescription anticoagulants"],
    story: "Athletes drink pineapple smoothies post-training because bromelain may reduce post-exercise inflammation. Drink it within 30 minutes for best protein-digestion effect.",
  },
  {
    slug: "apple",
    name: "Apple",
    emoji: "🍏",
    category: "fruit",
    nutrients: { calories: 52, protein: 0.3, fat: 0.2, carbs: 14, fibre: 2.4, sugar: 10, micros: ["Vit C", "Quercetin", "Pectin"] },
    glycemicLoad: "low",
    benefits: ["Pectin feeds gut bacteria", "Quercetin is a master anti-inflammatory flavonoid", "Adds bulk without overwhelming flavor"],
    pairings: ["spinach", "ginger", "cinnamon", "almond-butter"],
    swaps: ["pear", "carrot"],
    season: ["autumn", "year-round"],
    sourcing: "Leave the skin on — that's where the quercetin lives.",
    contraindications: ["Oral allergy syndrome with birch pollen"],
    story: "Green apple plus spinach plus ginger is the workhorse of the green smoothie world for a reason — bright, savoury, and nothing competes with the chlorophyll.",
  },
  {
    slug: "avocado",
    name: "Avocado",
    emoji: "🥑",
    category: "fat",
    nutrients: { calories: 160, protein: 2, fat: 15, carbs: 9, fibre: 7, sugar: 0.7, micros: ["Potassium", "Folate", "Vit K", "Lutein"] },
    glycemicLoad: "low",
    benefits: ["Creaminess without dairy", "Lowers glycemic load of the whole blend", "Lutein supports eye health"],
    pairings: ["cacao", "lime", "spinach", "coconut-milk"],
    swaps: ["coconut-meat", "macadamia"],
    season: ["year-round"],
    sourcing: "Use a quarter avocado as a fat course; freeze halved with skin on.",
    contraindications: ["Latex-fruit syndrome"],
    story: "The single best ingredient for converting a sugary smoothie into a meal. A quarter avocado is invisible in flavour and transformative in texture.",
  },
  {
    slug: "tart-cherry",
    name: "Tart Cherry",
    emoji: "🍒",
    category: "fruit",
    nutrients: { calories: 50, protein: 1, fat: 0.3, carbs: 12, fibre: 1.6, sugar: 8, micros: ["Anthocyanins", "Melatonin", "Vit C"] },
    glycemicLoad: "low",
    benefits: ["Naturally rich in melatonin — sleep ally", "Reduces post-exercise muscle soreness in studies", "Lowers uric acid"],
    pairings: ["greek-yogurt", "almond-milk", "vanilla", "chia"],
    swaps: ["pomegranate", "acai"],
    season: ["summer", "year-round"],
    sourcing: "Frozen Montmorency or unsweetened cherry juice concentrate (1 tbsp = 50 cherries).",
    contraindications: ["High in oxalates — moderate use with kidney stone history"],
    story: "Marathoners drink tart cherry recovery smoothies because randomized trials show real reductions in soreness. Bonus: a melatonin nightcap that doesn't feel like medicine.",
  },
  {
    slug: "acai",
    name: "Açaí",
    emoji: "🟣",
    category: "superfood",
    nutrients: { calories: 70, protein: 1, fat: 5, carbs: 6, fibre: 3, sugar: 2, micros: ["Anthocyanins", "Vit A", "Calcium", "Iron"] },
    glycemicLoad: "low",
    benefits: ["Among the highest antioxidant capacities measured", "Healthy fat content unusual for a berry", "Brazilian rainforest staple"],
    pairings: ["banana", "granola", "honey", "coconut"],
    swaps: ["mixed-berries", "tart-cherry"],
    season: ["year-round"],
    sourcing: "Frozen unsweetened pulp packs (Sambazon, Pitaya Foods). Avoid sweetened sorbet versions.",
    contraindications: ["May interact with chemotherapy drugs"],
    story: "The backbone of the bowl tradition. Real açaí is purple-black, lightly fatty, and earthy — nothing like the sweet sorbets sold in chain shops.",
  },
  {
    slug: "coconut-meat",
    name: "Coconut Meat",
    emoji: "🥥",
    category: "fat",
    nutrients: { calories: 354, protein: 3.3, fat: 33, carbs: 15, fibre: 9, sugar: 6, micros: ["MCTs", "Manganese", "Copper", "Iron"] },
    glycemicLoad: "low",
    benefits: ["MCTs convert quickly to ketones", "Tropical creaminess", "Sustained energy"],
    pairings: ["pineapple", "mango", "vanilla", "lime"],
    swaps: ["coconut-milk", "avocado"],
    season: ["year-round"],
    sourcing: "Frozen young coconut meat is the cleanest way; refrigerated coconut cream works too.",
    contraindications: ["Tree nut classification varies — confirm with allergist"],
    story: "Where coconut milk gives liquid creaminess, coconut meat builds body. A scoop turns a watery blend into a spoonable bowl.",
  },
  {
    slug: "pomegranate",
    name: "Pomegranate",
    emoji: "🟥",
    category: "fruit",
    nutrients: { calories: 83, protein: 1.7, fat: 1.2, carbs: 19, fibre: 4, sugar: 14, micros: ["Vit C", "Vit K", "Punicalagins", "Folate"] },
    glycemicLoad: "medium",
    benefits: ["Punicalagins are unique vascular protectives", "Supports endothelial function", "Bright tart-sweet"],
    pairings: ["beetroot", "ginger", "rose", "yogurt"],
    swaps: ["tart-cherry", "mixed-berries"],
    season: ["autumn", "winter"],
    sourcing: "100% juice (no sugar added) or frozen arils.",
    contraindications: ["Interacts with ACE inhibitors and statins"],
    story: "An ancient symbol of vitality. Modern trials suggest 250 ml daily improves arterial flow over 12 weeks — reason enough to keep it in winter rotation.",
  },
  {
    slug: "papaya",
    name: "Papaya",
    emoji: "🟠",
    category: "fruit",
    nutrients: { calories: 43, protein: 0.5, fat: 0.3, carbs: 11, fibre: 1.7, sugar: 8, micros: ["Vit C", "Vit A", "Papain", "Folate"] },
    glycemicLoad: "low",
    benefits: ["Papain enzyme aids protein digestion", "Gentle on inflamed gut", "Beta-carotene for skin"],
    pairings: ["lime", "ginger", "yogurt", "mint"],
    swaps: ["mango", "cantaloupe"],
    season: ["year-round"],
    sourcing: "Ripe when slightly soft; freeze cubed.",
    contraindications: ["Avoid in pregnancy if unripe (latex content)"],
    story: "If your gut is angry, papaya is the kindest fruit you can blend. Pair with ginger and a small amount of yogurt for a true digestive elixir.",
  },
  {
    slug: "peach",
    name: "Peach",
    emoji: "🍑",
    category: "fruit",
    nutrients: { calories: 39, protein: 0.9, fat: 0.3, carbs: 10, fibre: 1.5, sugar: 8, micros: ["Vit C", "Vit A", "Potassium"] },
    glycemicLoad: "low",
    benefits: ["Soft sweetness, low calories", "Beta-carotene for skin", "Hydrating"],
    pairings: ["greek-yogurt", "almond", "vanilla", "ginger"],
    swaps: ["apricot", "nectarine", "mango"],
    season: ["summer"],
    sourcing: "Frozen sliced — IQF holds the texture.",
    contraindications: ["Birch pollen oral allergy syndrome"],
    story: "The summer afternoon smoothie. Peach with vanilla almond milk tastes like a pie filling and weighs almost nothing.",
  },

  // ----- LEAFY GREENS -----
  {
    slug: "spinach",
    name: "Spinach",
    emoji: "🌱",
    category: "leafy-green",
    nutrients: { calories: 23, protein: 2.9, fat: 0.4, carbs: 3.6, fibre: 2.2, sugar: 0.4, micros: ["Folate", "Iron", "Vit K", "Magnesium"] },
    glycemicLoad: "low",
    benefits: ["Mild flavour disappears in fruity blends", "Folate for cellular energy", "Magnesium for sleep and muscles"],
    pairings: ["banana", "berries", "pineapple", "ginger"],
    swaps: ["baby-kale", "romaine", "swiss-chard"],
    season: ["year-round"],
    sourcing: "Frozen blocks blend cleaner than fresh and last longer.",
    contraindications: ["Oxalates — rotate with kidney stone history; warfarin patients monitor Vit K"],
    story: "The training-wheel green. Two cups of fresh spinach disappear into any sweet blend — the cleanest entry into daily-greens habit.",
  },
  {
    slug: "kale",
    name: "Kale",
    emoji: "🥬",
    category: "leafy-green",
    nutrients: { calories: 35, protein: 2.9, fat: 1.5, carbs: 4.4, fibre: 4.1, sugar: 1, micros: ["Vit K", "Vit C", "Vit A", "Calcium"] },
    glycemicLoad: "low",
    benefits: ["Higher fibre than spinach", "Glucosinolates for liver detoxification", "Strong vitamin K source"],
    pairings: ["apple", "lemon", "ginger", "pineapple"],
    swaps: ["collard", "spinach", "swiss-chard"],
    season: ["autumn", "winter"],
    sourcing: "De-stem before blending. Lacinato (dinosaur) kale is gentler.",
    contraindications: ["Goitrogenic — moderate use in untreated hypothyroid"],
    story: "Stronger than spinach in flavour and effect. Massage briefly with lemon juice before blending for the smoothest result.",
  },
  {
    slug: "swiss-chard",
    name: "Swiss Chard",
    emoji: "🌿",
    category: "leafy-green",
    nutrients: { calories: 19, protein: 1.8, fat: 0.2, carbs: 3.7, fibre: 1.6, sugar: 1.1, micros: ["Vit K", "Vit A", "Magnesium", "Iron"] },
    glycemicLoad: "low",
    benefits: ["Beautiful pigments are betalains", "Magnesium-dense", "Mild earthy flavour"],
    pairings: ["banana", "berries", "ginger", "lemon"],
    swaps: ["spinach", "kale"],
    season: ["spring", "summer", "autumn"],
    sourcing: "Rainbow chard adds colour to a green smoothie's bottle.",
    contraindications: ["Oxalates"],
    story: "An underused green. Pair with berries and the betalains lift your blend the colour of dusk.",
  },
  {
    slug: "romaine",
    name: "Romaine",
    emoji: "🥗",
    category: "leafy-green",
    nutrients: { calories: 17, protein: 1.2, fat: 0.3, carbs: 3.3, fibre: 2.1, sugar: 1.2, micros: ["Vit A", "Vit K", "Folate"] },
    glycemicLoad: "low",
    benefits: ["High water content — hydrating", "Lighter chlorophyll signal than kale", "Toddler-friendly"],
    pairings: ["pear", "cucumber", "mint", "lemon"],
    swaps: ["spinach", "butter-lettuce"],
    season: ["spring", "summer"],
    sourcing: "Fresh hearts, separated and washed.",
    contraindications: [],
    story: "The lettuce that lives in a smoothie. Cucumber-pear-romaine-mint is a green gateway smoothie kids will actually drink.",
  },
  {
    slug: "parsley",
    name: "Parsley",
    emoji: "🌾",
    category: "leafy-green",
    nutrients: { calories: 36, protein: 3, fat: 0.8, carbs: 6.3, fibre: 3.3, sugar: 0.9, micros: ["Vit K", "Vit C", "Apigenin", "Iron"] },
    glycemicLoad: "low",
    benefits: ["Apigenin supports the nervous system", "High vitamin K", "Mild diuretic"],
    pairings: ["pineapple", "lemon", "cucumber", "celery"],
    swaps: ["cilantro", "spinach"],
    season: ["year-round"],
    sourcing: "Flat-leaf has more flavour. Stems are fine to blend.",
    contraindications: ["Avoid medicinal doses in pregnancy"],
    story: "More than garnish. A quarter cup of parsley in a green blend is one of the highest-yield small-additions you can make for both flavour and nutrient density.",
  },
  {
    slug: "cilantro",
    name: "Cilantro",
    emoji: "🌿",
    category: "leafy-green",
    nutrients: { calories: 23, protein: 2.1, fat: 0.5, carbs: 3.7, fibre: 2.8, sugar: 0.9, micros: ["Vit K", "Vit A", "Quercetin"] },
    glycemicLoad: "low",
    benefits: ["Binds heavy metals in chelation protocols", "Bright fresh top-note", "Gentle digestive"],
    pairings: ["lime", "pineapple", "ginger", "cucumber"],
    swaps: ["parsley", "mint"],
    season: ["year-round"],
    sourcing: "Wash well — soil clings to roots.",
    contraindications: ["Genetic soap-taste polymorphism in 4–14% of people"],
    story: "If you don't have the soap-taste gene, cilantro is summer in a glass. Pineapple-cilantro-lime is the canonical green in the tropical school.",
  },

  // ----- CRUCIFEROUS / ROOTS -----
  {
    slug: "frozen-cauliflower",
    name: "Frozen Cauliflower",
    emoji: "🥦",
    category: "cruciferous",
    nutrients: { calories: 25, protein: 1.9, fat: 0.3, carbs: 5, fibre: 2, sugar: 1.9, micros: ["Vit C", "Vit K", "Sulforaphane (precursor)", "Folate"] },
    glycemicLoad: "low",
    benefits: ["Adds creamy texture without sugar", "Sulforaphane is a master anti-inflammatory", "Nearly invisible flavour"],
    pairings: ["banana", "cacao", "almond-butter", "vanilla"],
    swaps: ["zucchini", "avocado"],
    season: ["year-round"],
    sourcing: "Use riced or florets. Steam-blanch before freezing for smoothest results.",
    contraindications: ["Goitrogen-sensitive thyroid (cooked is gentler)"],
    story: "The single best low-carb hack for chocolate smoothies. A cup of frozen cauliflower disappears under cacao and creates a milkshake texture.",
  },
  {
    slug: "frozen-zucchini",
    name: "Frozen Zucchini",
    emoji: "🥒",
    category: "cruciferous",
    nutrients: { calories: 17, protein: 1.2, fat: 0.3, carbs: 3.1, fibre: 1, sugar: 2.5, micros: ["Vit C", "Vit B6", "Manganese"] },
    glycemicLoad: "low",
    benefits: ["Creamy without sweetness", "Lightens dense protein blends", "Hydrating"],
    pairings: ["mint", "vanilla", "lemon", "spinach"],
    swaps: ["cauliflower", "cucumber"],
    season: ["summer", "year-round"],
    sourcing: "Slice into rounds, freeze flat on a tray, transfer to bag.",
    contraindications: [],
    story: "The trick the bodybuilders use. Zucchini gives volume to a protein shake without the sugar of a banana.",
  },
  {
    slug: "beetroot",
    name: "Cooked Beetroot",
    emoji: "🟥",
    category: "cruciferous",
    nutrients: { calories: 44, protein: 1.7, fat: 0.2, carbs: 10, fibre: 2, sugar: 8, micros: ["Folate", "Manganese", "Nitrates", "Betalains"] },
    glycemicLoad: "medium",
    benefits: ["Dietary nitrates boost nitric oxide and endurance", "Betalains support liver phase II", "Earthy sweetness"],
    pairings: ["pomegranate", "ginger", "raspberry", "orange"],
    swaps: ["pomegranate", "carrot"],
    season: ["autumn", "winter"],
    sourcing: "Pre-cooked, peeled vacuum packs save time.",
    contraindications: ["Can stain urine pink (harmless)", "Oxalates"],
    story: "Athletes drink beetroot smoothies 2–3 hours before a race to widen blood vessels and stretch oxygen budget. Effective in single doses.",
  },
  {
    slug: "carrot",
    name: "Carrot",
    emoji: "🥕",
    category: "cruciferous",
    nutrients: { calories: 41, protein: 0.9, fat: 0.2, carbs: 10, fibre: 2.8, sugar: 4.7, micros: ["Beta-carotene", "Vit K", "Potassium"] },
    glycemicLoad: "low",
    benefits: ["Beta-carotene for skin and vision", "Natural sweetness without spike", "Falcarinol — emerging cancer-protective compound"],
    pairings: ["orange", "ginger", "turmeric", "apple"],
    swaps: ["sweet-potato", "mango"],
    season: ["year-round"],
    sourcing: "Use steamed if blender is mid-power, raw shreds if Vitamix-class.",
    contraindications: [],
    story: "Carrot-orange-ginger is the original wellness shot, expanded. Add coconut milk and turmeric for a winter immunity blend.",
  },
  {
    slug: "sweet-potato",
    name: "Cooked Sweet Potato",
    emoji: "🍠",
    category: "cruciferous",
    nutrients: { calories: 86, protein: 1.6, fat: 0.1, carbs: 20, fibre: 3, sugar: 4.2, micros: ["Beta-carotene", "Vit C", "Manganese"] },
    glycemicLoad: "medium",
    benefits: ["Slow carb for sustained energy", "Beta-carotene for skin", "Naturally creamy when cooked"],
    pairings: ["cinnamon", "almond-butter", "ginger", "vanilla"],
    swaps: ["pumpkin", "carrot"],
    season: ["autumn", "winter"],
    sourcing: "Roast and freeze in cubes — the caramelization deepens flavour.",
    contraindications: [],
    story: "Pumpkin-pie smoothie is a sweet potato smoothie wearing different spices. Both are exceptional autumn bases that don't need banana.",
  },

  // ----- PROTEINS -----
  {
    slug: "whey-isolate",
    name: "Whey Isolate",
    emoji: "🥛",
    category: "protein",
    nutrients: { calories: 360, protein: 80, fat: 5, carbs: 8, fibre: 0, sugar: 4, micros: ["BCAAs", "Leucine", "Cysteine"] },
    glycemicLoad: "low",
    benefits: ["Highest leucine content per gram", "Fast-absorbing post-workout", "Complete amino profile"],
    pairings: ["banana", "berries", "cacao", "milk"],
    swaps: ["pea-protein", "casein", "greek-yogurt"],
    season: ["year-round"],
    sourcing: "Choose a third-party tested brand (NSF Certified for Sport).",
    contraindications: ["Lactose intolerance — choose isolate over concentrate", "Dairy allergy"],
    story: "The most studied protein on Earth. 25–40 g post-training, blended into a recovery smoothie with carbs and fluid, is the textbook protocol.",
  },
  {
    slug: "pea-protein",
    name: "Pea Protein",
    emoji: "🌱",
    category: "protein",
    nutrients: { calories: 380, protein: 80, fat: 6, carbs: 5, fibre: 4, sugar: 1, micros: ["BCAAs", "Lysine", "Iron"] },
    glycemicLoad: "low",
    benefits: ["Plant-based with strong leucine", "Hypoallergenic alternative to whey", "Heavy and filling"],
    pairings: ["cacao", "almond-butter", "banana", "vanilla"],
    swaps: ["whey-isolate", "hemp", "rice-protein"],
    season: ["year-round"],
    sourcing: "Sport branded options are denser; pair with rice protein for complete amino balance.",
    contraindications: ["FODMAP sensitivity at high doses"],
    story: "If you can only keep one plant protein in the pantry, choose pea. With a pinch of brown rice protein it matches whey on amino completeness.",
  },
  {
    slug: "hemp",
    name: "Hemp Hearts",
    emoji: "🌿",
    category: "protein",
    nutrients: { calories: 553, protein: 31, fat: 49, carbs: 9, fibre: 4, sugar: 1.5, micros: ["Omega-3", "Magnesium", "Zinc", "Iron"] },
    glycemicLoad: "low",
    benefits: ["Complete amino profile in a whole food", "3:1 omega-6 to omega-3 ratio", "Adds creaminess"],
    pairings: ["banana", "berries", "cacao", "vanilla"],
    swaps: ["chia", "flax", "pea-protein"],
    season: ["year-round"],
    sourcing: "Refrigerate after opening — the fats are fragile.",
    contraindications: [],
    story: "A whole-food protein you don't have to scoop out of a powder tub. Three tablespoons add 10 g of protein and keep the texture creamy.",
  },
  {
    slug: "greek-yogurt",
    name: "Greek Yogurt",
    emoji: "🥄",
    category: "protein",
    nutrients: { calories: 59, protein: 10, fat: 0.4, carbs: 3.6, fibre: 0, sugar: 3.2, micros: ["Calcium", "B12", "Probiotics", "Selenium"] },
    glycemicLoad: "low",
    benefits: ["Live cultures for gut health", "High protein per calorie", "Casein for slower digestion"],
    pairings: ["mixed-berries", "honey", "vanilla", "granola"],
    swaps: ["skyr", "kefir", "coconut-yogurt"],
    season: ["year-round"],
    sourcing: "Plain, unsweetened, full-fat or 2% for creaminess.",
    contraindications: ["Lactose intolerance (small amounts often fine due to fermentation)"],
    story: "A half cup of plain Greek yogurt is more impactful than most protein powders for a casual smoothie — protein, probiotics, calcium, and a pleasant tang.",
  },
  {
    slug: "kefir",
    name: "Kefir",
    emoji: "🍶",
    category: "protein",
    nutrients: { calories: 41, protein: 3.4, fat: 1, carbs: 4.8, fibre: 0, sugar: 4.6, micros: ["Probiotics (10+ strains)", "Calcium", "B12"] },
    glycemicLoad: "low",
    benefits: ["More diverse probiotics than yogurt", "Easier to digest than milk", "Liquid base + protein in one"],
    pairings: ["berries", "honey", "vanilla", "ginger"],
    swaps: ["greek-yogurt", "kombucha"],
    season: ["year-round"],
    sourcing: "Plain unsweetened. Goat-milk kefir is gentler still.",
    contraindications: ["Severe dairy allergy"],
    story: "If you only know yogurt, you don't yet know kefir. A drinkable, tangier ferment with a more diverse microbiome — perfect smoothie base.",
  },
  {
    slug: "tofu-silken",
    name: "Silken Tofu",
    emoji: "⬜",
    category: "protein",
    nutrients: { calories: 55, protein: 5.9, fat: 2.7, carbs: 2, fibre: 0.2, sugar: 0.6, micros: ["Calcium", "Iron", "Isoflavones"] },
    glycemicLoad: "low",
    benefits: ["Dairy-free creaminess", "Mild flavour", "Soy isoflavones for hormonal balance"],
    pairings: ["cacao", "berries", "vanilla", "banana"],
    swaps: ["greek-yogurt", "avocado"],
    season: ["year-round"],
    sourcing: "Look for organic, non-GMO blocks.",
    contraindications: ["Soy allergy", "Discuss with oncologist if hormone-sensitive cancer"],
    story: "The plant-based answer to creamy. A cup of silken tofu plus cacao plus dates is a vegan chocolate mousse you drink.",
  },

  // ----- HEALTHY FATS -----
  {
    slug: "almond-butter",
    name: "Almond Butter",
    emoji: "🥜",
    category: "fat",
    nutrients: { calories: 614, protein: 21, fat: 56, carbs: 19, fibre: 11, sugar: 4.4, micros: ["Vit E", "Magnesium", "Riboflavin"] },
    glycemicLoad: "low",
    benefits: ["Healthy mono-fats for heart health", "Vitamin E antioxidant", "Slows glucose rise"],
    pairings: ["banana", "cacao", "oats", "cinnamon"],
    swaps: ["peanut-butter", "tahini", "cashew-butter"],
    season: ["year-round"],
    sourcing: "Single-ingredient jars only. Stir in oil that has separated.",
    contraindications: ["Tree nut allergy"],
    story: "One tablespoon of almond butter is the most reliable creamy-fat-protein add-in you can keep on the shelf. Banana + cacao + almond butter is a complete breakfast in three ingredients.",
  },
  {
    slug: "peanut-butter",
    name: "Peanut Butter",
    emoji: "🥜",
    category: "fat",
    nutrients: { calories: 588, protein: 25, fat: 50, carbs: 20, fibre: 6, sugar: 9, micros: ["Niacin", "Manganese", "Vit E"] },
    glycemicLoad: "low",
    benefits: ["Highest protein of common nut butters", "Familiar, kid-friendly", "Cheap per serving"],
    pairings: ["banana", "cacao", "oats", "honey"],
    swaps: ["almond-butter", "sunflower-seed-butter"],
    season: ["year-round"],
    sourcing: "Natural, unsweetened — single ingredient ideally.",
    contraindications: ["Peanut allergy", "Aflatoxin risk in low-quality brands"],
    story: "The classic. Peanut butter–banana–oat milk is the gateway smoothie that hooked half the planet.",
  },
  {
    slug: "tahini",
    name: "Tahini",
    emoji: "🟤",
    category: "fat",
    nutrients: { calories: 595, protein: 17, fat: 54, carbs: 21, fibre: 9, sugar: 0.5, micros: ["Calcium", "Iron", "Sesamin"] },
    glycemicLoad: "low",
    benefits: ["Highest calcium of any seed butter", "Bitter complexity", "Nut-free option"],
    pairings: ["date", "cacao", "banana", "cinnamon"],
    swaps: ["sunflower-seed-butter", "almond-butter"],
    season: ["year-round"],
    sourcing: "Soom and Seed+Mill are reliable; refrigerate after opening.",
    contraindications: ["Sesame allergy"],
    story: "Tahini-date-cacao tastes like a halva milkshake. The bitterness of unhulled tahini balances dates better than nut butters do.",
  },
  {
    slug: "macadamia",
    name: "Macadamia Nuts",
    emoji: "🟡",
    category: "fat",
    nutrients: { calories: 718, protein: 7.9, fat: 76, carbs: 14, fibre: 8.6, sugar: 4.6, micros: ["Mono-fats", "Manganese", "Thiamin"] },
    glycemicLoad: "low",
    benefits: ["Highest monounsaturated fat ratio", "Buttery texture", "Keto-favored"],
    pairings: ["coconut-milk", "vanilla", "cacao", "berries"],
    swaps: ["cashew", "almond-butter"],
    season: ["year-round"],
    sourcing: "Raw, unsalted. Soak 2 hours for the smoothest blend.",
    contraindications: ["Tree nut allergy"],
    story: "The most luxurious fat in the smoothie kitchen. A small handful with frozen berries and coconut milk is dessert pretending to be breakfast.",
  },

  // ----- SUPERFOODS -----
  {
    slug: "cacao",
    name: "Cacao Powder",
    emoji: "🍫",
    category: "superfood",
    nutrients: { calories: 228, protein: 19, fat: 14, carbs: 58, fibre: 33, sugar: 1.8, micros: ["Magnesium", "Iron", "Flavanols", "Theobromine"] },
    glycemicLoad: "low",
    benefits: ["Flavanols improve mood and vascular flow", "Magnesium for muscle and sleep", "Theobromine — gentler stimulant than caffeine"],
    pairings: ["banana", "almond-butter", "cherry", "espresso"],
    swaps: ["carob", "cocoa"],
    season: ["year-round"],
    sourcing: "Raw, lightly fermented for the highest flavanols.",
    contraindications: ["Caffeine sensitivity", "Migraine triggers"],
    story: "The single best superfood ROI: real cacao costs like flour and dramatically lifts every smoothie you put it in. Two tablespoons is a serving.",
  },
  {
    slug: "maca",
    name: "Maca Powder",
    emoji: "🟫",
    category: "superfood",
    nutrients: { calories: 325, protein: 14, fat: 1, carbs: 71, fibre: 7, sugar: 35, micros: ["Iron", "Iodine", "Macamides"] },
    glycemicLoad: "low",
    benefits: ["Adaptogen — supports stress resilience", "Studied for libido and stamina", "Earthy malt flavour"],
    pairings: ["cacao", "banana", "vanilla", "almond-butter"],
    swaps: ["ashwagandha", "lucuma"],
    season: ["year-round"],
    sourcing: "Gelatinized maca is easier to digest than raw.",
    contraindications: ["Use cautiously with thyroid disease (iodine)"],
    story: "From the Andean highlands. One teaspoon in a cacao-banana base, daily for six weeks, gives most people a noticeable lift in baseline energy.",
  },
  {
    slug: "spirulina",
    name: "Spirulina",
    emoji: "🟢",
    category: "superfood",
    nutrients: { calories: 290, protein: 57, fat: 8, carbs: 24, fibre: 4, sugar: 3, micros: ["Iron", "Phycocyanin", "B12 (analog)", "Chlorophyll"] },
    glycemicLoad: "low",
    benefits: ["Among the densest proteins on Earth", "Phycocyanin is a unique anti-inflammatory pigment", "Binds heavy metals"],
    pairings: ["pineapple", "banana", "lime", "honey"],
    swaps: ["chlorella", "moringa"],
    season: ["year-round"],
    sourcing: "Choose third-party-tested for heavy metals.",
    contraindications: ["PKU (phenylalanine content)", "Autoimmune conditions discuss with clinician"],
    story: "Strong taste, strong effect. Half a teaspoon in a tropical blend is the gateway dose; cilantro and citrus tame the algal note.",
  },
  {
    slug: "chia",
    name: "Chia Seeds",
    emoji: "⚫",
    category: "superfood",
    nutrients: { calories: 486, protein: 17, fat: 31, carbs: 42, fibre: 34, sugar: 0, micros: ["Omega-3 (ALA)", "Calcium", "Magnesium", "Iron"] },
    glycemicLoad: "low",
    benefits: ["Highest fibre per gram of any seed", "Omega-3s for inflammation", "Gel forms a satiating texture"],
    pairings: ["berries", "lemon", "almond-milk", "honey"],
    swaps: ["flax", "basil-seed"],
    season: ["year-round"],
    sourcing: "Black or white — nutritionally identical.",
    contraindications: ["Drink with adequate fluid — can swell in throat if eaten dry"],
    story: "One tablespoon at the end of the blend, paddled in for ten seconds, gives a smoothie a pleasant pudding texture and 4 g of fibre.",
  },
  {
    slug: "flax",
    name: "Ground Flax",
    emoji: "🟤",
    category: "superfood",
    nutrients: { calories: 534, protein: 18, fat: 42, carbs: 29, fibre: 27, sugar: 1.6, micros: ["Lignans", "Omega-3 (ALA)", "Magnesium"] },
    glycemicLoad: "low",
    benefits: ["Lignans for hormonal balance", "Plant omega-3", "Soluble fibre for cholesterol"],
    pairings: ["berries", "banana", "cinnamon", "yogurt"],
    swaps: ["chia", "hemp"],
    season: ["year-round"],
    sourcing: "Buy whole and grind weekly, or refrigerate pre-ground.",
    contraindications: ["Not for severe IBS flares", "May interact with some hormone medications"],
    story: "Ground only — the seed is too hard to digest whole. A daily tablespoon for women in menopause is a researched-backed habit.",
  },
  {
    slug: "matcha",
    name: "Matcha",
    emoji: "🟢",
    category: "superfood",
    nutrients: { calories: 320, protein: 30, fat: 5, carbs: 39, fibre: 38, sugar: 0, micros: ["EGCG", "L-theanine", "Caffeine"] },
    glycemicLoad: "low",
    benefits: ["L-theanine + caffeine = calm focus", "EGCG is a master polyphenol", "Smooth, sustained energy"],
    pairings: ["coconut-milk", "vanilla", "honey", "banana"],
    swaps: ["matcha-latte"],
    season: ["year-round"],
    sourcing: "Ceremonial grade for daily drinking; culinary grade for blends.",
    contraindications: ["Caffeine sensitivity", "Pregnancy moderation"],
    story: "The morning smoothie's secret sharpener. Half a teaspoon of matcha gives you the alertness of an espresso without the crash.",
  },
  {
    slug: "moringa",
    name: "Moringa Powder",
    emoji: "🌳",
    category: "superfood",
    nutrients: { calories: 205, protein: 27, fat: 2, carbs: 38, fibre: 19, sugar: 0, micros: ["Vit A", "Iron", "Calcium", "Quercetin"] },
    glycemicLoad: "low",
    benefits: ["Iron and calcium-dense", "Mild green flavour, kinder than spirulina", "Sustainable tree crop"],
    pairings: ["mango", "ginger", "lime", "coconut-water"],
    swaps: ["spirulina", "chlorella", "barley-grass"],
    season: ["year-round"],
    sourcing: "From a single-origin farm if possible. Bright green = fresh.",
    contraindications: ["Possible mild blood-sugar lowering effect"],
    story: "If spirulina is too strong for you, moringa is the friendlier sibling. Mango + ginger + moringa is a tropical iron tonic.",
  },
  {
    slug: "collagen",
    name: "Collagen Peptides",
    emoji: "✨",
    category: "booster",
    nutrients: { calories: 360, protein: 90, fat: 0, carbs: 0, fibre: 0, sugar: 0, micros: ["Glycine", "Proline", "Hydroxyproline"] },
    glycemicLoad: "low",
    benefits: ["Supports skin, joints, gut lining", "Tasteless and dissolves into anything", "10 g daily is the studied dose"],
    pairings: ["berries", "banana", "vanilla", "anything"],
    swaps: ["bone-broth"],
    season: ["year-round"],
    sourcing: "Grass-fed bovine or marine; third-party tested.",
    contraindications: ["Not vegan", "Marine collagen for fish allergies — confirm processing"],
    story: "The most invisible booster. A scoop in any morning smoothie, sustained over months, shows up in skin and tendons. The studies are no longer mixed.",
  },
  {
    slug: "ashwagandha",
    name: "Ashwagandha",
    emoji: "🌾",
    category: "booster",
    nutrients: { calories: 245, protein: 4, fat: 0.3, carbs: 49, fibre: 32, sugar: 0, micros: ["Withanolides"] },
    glycemicLoad: "low",
    benefits: ["Lowers cortisol over 4–8 weeks", "Improves sleep architecture", "Adaptogenic"],
    pairings: ["cacao", "milk", "honey", "cinnamon"],
    swaps: ["reishi", "rhodiola"],
    season: ["year-round"],
    sourcing: "KSM-66 or Sensoril extract for studied dosing.",
    contraindications: ["Pregnancy", "Hyperthyroid", "Nightshade sensitivity"],
    story: "The classic Ayurvedic adaptogen. Half a teaspoon in an evening cacao-milk-honey smoothie, daily for a month, often resets a frayed stress baseline.",
  },
  {
    slug: "reishi",
    name: "Reishi (Dual-Extract)",
    emoji: "🍄",
    category: "booster",
    nutrients: { calories: 360, protein: 12, fat: 2, carbs: 75, fibre: 60, sugar: 0, micros: ["Triterpenes", "Beta-glucans"] },
    glycemicLoad: "low",
    benefits: ["Calming adaptogen, evening-friendly", "Beta-glucans for immunity", "Triterpenes for liver support"],
    pairings: ["cacao", "milk", "honey", "cinnamon"],
    swaps: ["ashwagandha", "lions-mane"],
    season: ["year-round"],
    sourcing: "Dual-extracted (water + alcohol) is essential for full spectrum.",
    contraindications: ["Anticoagulant medications"],
    story: "The mushroom of immortality. Quiet, slow, accumulating effects — the daily evening cacao-reishi blend is its perfect home.",
  },
  {
    slug: "lions-mane",
    name: "Lion's Mane",
    emoji: "🍄",
    category: "booster",
    nutrients: { calories: 380, protein: 22, fat: 2, carbs: 65, fibre: 50, sugar: 0, micros: ["Hericenones", "Erinacines", "Beta-glucans"] },
    glycemicLoad: "low",
    benefits: ["Stimulates nerve growth factor (NGF)", "Cognitive support", "Gentle, non-stimulating"],
    pairings: ["coffee", "cacao", "vanilla", "almond-milk"],
    swaps: ["reishi", "cordyceps"],
    season: ["year-round"],
    sourcing: "Dual-extracted from fruiting body, not mycelium-on-grain.",
    contraindications: ["Mushroom allergy"],
    story: "If matcha sharpens, lion's mane builds. Daily morning blends with lion's mane for a quarter often surface noticeable focus changes.",
  },
  {
    slug: "cordyceps",
    name: "Cordyceps",
    emoji: "🍄",
    category: "booster",
    nutrients: { calories: 367, protein: 28, fat: 7, carbs: 56, fibre: 32, sugar: 0, micros: ["Cordycepin", "Beta-glucans"] },
    glycemicLoad: "low",
    benefits: ["Endurance and oxygen utilization", "Pre-workout adaptogen", "Mild lift without jitters"],
    pairings: ["matcha", "lemon", "honey", "ginger"],
    swaps: ["lions-mane", "reishi"],
    season: ["year-round"],
    sourcing: "CS-4 strain is the most studied; cultivated on rice is sustainable.",
    contraindications: ["Anticoagulant medications", "Autoimmune conditions"],
    story: "The athlete's mushroom. A gram in the morning matcha smoothie, taken consistently for two weeks, often shows in higher VO2 perceived effort.",
  },

  // ----- LIQUIDS -----
  {
    slug: "almond-milk",
    name: "Almond Milk (unsweetened)",
    emoji: "💧",
    category: "liquid",
    nutrients: { calories: 17, protein: 0.6, fat: 1.5, carbs: 0.6, fibre: 0.3, sugar: 0.1, micros: ["Vit E", "Calcium (fortified)", "Vit D (fortified)"] },
    glycemicLoad: "low",
    benefits: ["Low calorie", "Mild creaminess", "Long shelf life"],
    pairings: ["all"],
    swaps: ["oat-milk", "coconut-milk", "soy-milk"],
    season: ["year-round"],
    sourcing: "Unsweetened, additive-light brands. Or make at home.",
    contraindications: ["Tree nut allergy"],
    story: "The default smoothie liquid for most people in 2026. Buy plain, fortified — and skip the carrageenan brands.",
  },
  {
    slug: "oat-milk",
    name: "Oat Milk",
    emoji: "🌾",
    category: "liquid",
    nutrients: { calories: 47, protein: 1, fat: 1.5, carbs: 7.5, fibre: 0.8, sugar: 4, micros: ["Beta-glucan", "Vit D (fortified)", "B12 (fortified)"] },
    glycemicLoad: "medium",
    benefits: ["Naturally sweet, creamy", "Beta-glucan for cholesterol", "Allergen-friendly"],
    pairings: ["banana", "cacao", "coffee", "vanilla"],
    swaps: ["almond-milk", "soy-milk"],
    season: ["year-round"],
    sourcing: "Unsweetened, gluten-free certified if needed.",
    contraindications: ["Higher carb than nut milks — note for low-carb diets"],
    story: "The barista's secret weapon. Oat milk's natural sweetness reduces how much sweetener you need elsewhere in the blend.",
  },
  {
    slug: "coconut-milk",
    name: "Coconut Milk (light)",
    emoji: "🥥",
    category: "liquid",
    nutrients: { calories: 73, protein: 0.7, fat: 7.2, carbs: 1.6, fibre: 0.7, sugar: 1, micros: ["MCTs", "Lauric acid"] },
    glycemicLoad: "low",
    benefits: ["Tropical flavour ally", "MCTs for quick energy", "Creamy without dairy"],
    pairings: ["mango", "pineapple", "turmeric", "lime"],
    swaps: ["almond-milk", "oat-milk"],
    season: ["year-round"],
    sourcing: "BPA-free cans or tetra packs; full-fat for richness.",
    contraindications: ["High saturated fat — moderate use"],
    story: "Tropical smoothies live or die by the milk. Light coconut milk is the difference between a piña colada smoothie and a sad pineapple slushie.",
  },
  {
    slug: "soy-milk",
    name: "Soy Milk",
    emoji: "🥛",
    category: "liquid",
    nutrients: { calories: 33, protein: 3.3, fat: 1.8, carbs: 1.7, fibre: 0.6, sugar: 1.8, micros: ["Isoflavones", "Calcium (fortified)", "B12 (fortified)"] },
    glycemicLoad: "low",
    benefits: ["Highest plant-milk protein", "Isoflavones for hormonal balance", "Affordable"],
    pairings: ["banana", "cacao", "coffee", "vanilla"],
    swaps: ["pea-milk", "oat-milk"],
    season: ["year-round"],
    sourcing: "Organic, non-GMO, unsweetened.",
    contraindications: ["Soy allergy"],
    story: "Quietly the best plant milk for protein. A cup in your smoothie adds 8 g of protein before you've added powders.",
  },
  {
    slug: "coconut-water",
    name: "Coconut Water",
    emoji: "🌴",
    category: "liquid",
    nutrients: { calories: 19, protein: 0.7, fat: 0.2, carbs: 3.7, fibre: 1.1, sugar: 2.6, micros: ["Potassium", "Sodium", "Magnesium"] },
    glycemicLoad: "low",
    benefits: ["Natural electrolytes", "Hydrating", "Low calorie"],
    pairings: ["pineapple", "lime", "ginger", "mint"],
    swaps: ["water", "almond-milk"],
    season: ["year-round"],
    sourcing: "Not from concentrate — and pasteurized for safety.",
    contraindications: ["Hyperkalemia (kidney disease) — discuss with clinician"],
    story: "The post-yoga, post-sun smoothie liquid. Choose it for its potassium when you've been sweating, not for calories.",
  },
  {
    slug: "green-tea-cold",
    name: "Cold-Brewed Green Tea",
    emoji: "🍵",
    category: "liquid",
    nutrients: { calories: 1, protein: 0, fat: 0, carbs: 0, fibre: 0, sugar: 0, micros: ["EGCG", "L-theanine", "Caffeine"] },
    glycemicLoad: "low",
    benefits: ["Hydration plus polyphenols", "L-theanine + light caffeine", "Zero calories"],
    pairings: ["mango", "ginger", "lemon", "mint"],
    swaps: ["matcha", "white-tea"],
    season: ["year-round"],
    sourcing: "Sencha or genmaicha steeped overnight in cold filtered water.",
    contraindications: ["Caffeine sensitivity", "Iron absorption (drink between meals)"],
    story: "Substitute green tea for water in any tropical blend and you double the polyphenol content for free.",
  },

  // ----- SWEETENERS -----
  {
    slug: "date",
    name: "Medjool Date",
    emoji: "🌴",
    category: "sweetener",
    nutrients: { calories: 277, protein: 1.8, fat: 0.2, carbs: 75, fibre: 7, sugar: 66, micros: ["Potassium", "Magnesium", "Polyphenols"] },
    glycemicLoad: "medium",
    benefits: ["Whole-food sweetener with fibre", "Caramel depth", "Magnesium and potassium"],
    pairings: ["cacao", "tahini", "almond-butter", "vanilla"],
    swaps: ["raw-honey", "maple-syrup"],
    season: ["year-round"],
    sourcing: "Soft, sticky, plump Medjools. Refrigerate after opening.",
    contraindications: ["High glycemic load if many — use one or two"],
    story: "One date is a smoothie's natural caramel. Pair with tahini and cacao for the most ancient dessert smoothie ever invented.",
  },
  {
    slug: "raw-honey",
    name: "Raw Honey",
    emoji: "🍯",
    category: "sweetener",
    nutrients: { calories: 304, protein: 0.3, fat: 0, carbs: 82, fibre: 0.2, sugar: 82, micros: ["Antioxidants", "Trace enzymes"] },
    glycemicLoad: "high",
    benefits: ["Antimicrobial properties", "Local pollen for seasonal exposure", "Distinct flavour signatures"],
    pairings: ["lemon", "ginger", "berries", "yogurt"],
    swaps: ["maple-syrup", "date"],
    season: ["year-round"],
    sourcing: "Local raw, single-source. Manuka for therapeutic doses.",
    contraindications: ["Not for infants under 1 year (botulism risk)"],
    story: "A teaspoon, not a tablespoon. Raw honey's antimicrobial and pollen content matter more than its sweetness — use sparingly and locally.",
  },
  {
    slug: "maple-syrup",
    name: "Maple Syrup (Grade B)",
    emoji: "🍁",
    category: "sweetener",
    nutrients: { calories: 260, protein: 0, fat: 0.2, carbs: 67, fibre: 0, sugar: 60, micros: ["Manganese", "Zinc", "Polyphenols"] },
    glycemicLoad: "medium",
    benefits: ["Lower glycemic than refined sugar", "Mineral-rich for a sweetener", "Distinctive flavour"],
    pairings: ["oats", "almond-butter", "vanilla", "cinnamon"],
    swaps: ["raw-honey", "date"],
    season: ["spring"],
    sourcing: "Grade B (now Grade A Dark Robust) has more flavour and minerals.",
    contraindications: ["Diabetes — count toward total carbs"],
    story: "Cold weather smoothies that include sweet potato or pumpkin find their match in a teaspoon of dark maple syrup.",
  },

  // ----- SPICES -----
  {
    slug: "cinnamon",
    name: "Ceylon Cinnamon",
    emoji: "🟫",
    category: "spice",
    nutrients: { calories: 247, protein: 4, fat: 1.2, carbs: 81, fibre: 53, sugar: 2.2, micros: ["MHCP", "Polyphenols", "Manganese"] },
    glycemicLoad: "low",
    benefits: ["Improves insulin sensitivity", "Warming and grounding", "Sweet without sugar"],
    pairings: ["banana", "almond-butter", "oats", "cacao"],
    swaps: ["nutmeg", "cardamom"],
    season: ["year-round"],
    sourcing: "Ceylon (true) cinnamon — not Cassia (high coumarin)."
    ,
    contraindications: ["Cassia coumarin can stress liver — Ceylon avoids this"],
    story: "Half a teaspoon in any sweet smoothie may blunt the glucose spike. The smallest spice with the largest effect.",
  },
  {
    slug: "ginger",
    name: "Fresh Ginger",
    emoji: "🫚",
    category: "spice",
    nutrients: { calories: 80, protein: 1.8, fat: 0.8, carbs: 18, fibre: 2, sugar: 1.7, micros: ["Gingerols", "Vit B6"] },
    glycemicLoad: "low",
    benefits: ["Anti-nausea, anti-inflammatory", "Warming digestive ally", "Sharp brightness"],
    pairings: ["pineapple", "carrot", "lemon", "turmeric"],
    swaps: ["dried-ginger", "ginger-juice"],
    season: ["year-round"],
    sourcing: "Plump, smooth-skinned roots. Freeze peeled chunks for easy blending.",
    contraindications: ["Anticoagulant interaction at large doses"],
    story: "An inch of ginger turns any smoothie into medicine. Pair with pineapple to compound the anti-inflammatory bromelain effect.",
  },
  {
    slug: "turmeric",
    name: "Fresh Turmeric",
    emoji: "🟧",
    category: "spice",
    nutrients: { calories: 312, protein: 9.7, fat: 3.3, carbs: 67, fibre: 22, sugar: 3.2, micros: ["Curcumin", "Manganese", "Iron"] },
    glycemicLoad: "low",
    benefits: ["Curcumin is a master anti-inflammatory", "Pair with black pepper for absorption", "Warms cold blends"],
    pairings: ["mango", "pineapple", "ginger", "black-pepper"],
    swaps: ["turmeric-powder"],
    season: ["year-round"],
    sourcing: "Fresh root in season; organic powder year-round.",
    contraindications: ["Gallstones", "Anticoagulant medications"],
    story: "Always blend turmeric with a pinch of black pepper and a teaspoon of fat. Without piperine, curcumin barely absorbs.",
  },
  {
    slug: "vanilla",
    name: "Vanilla Bean",
    emoji: "🟤",
    category: "spice",
    nutrients: { calories: 288, protein: 0.1, fat: 0.1, carbs: 13, fibre: 0, sugar: 13, micros: ["Vanillin"] },
    glycemicLoad: "low",
    benefits: ["Calming aroma compounds", "Reduces sugar cravings", "Universal flavour bridge"],
    pairings: ["banana", "almond-milk", "coconut-milk", "cacao"],
    swaps: ["vanilla-extract"],
    season: ["year-round"],
    sourcing: "Real bean or pure extract — never imitation vanillin.",
    contraindications: [],
    story: "Half a bean scraped into a blender turns any smoothie into a creme. The aroma alone tells the brain it tasted sweetness.",
  },
  {
    slug: "lemon",
    name: "Lemon",
    emoji: "🍋",
    category: "spice",
    nutrients: { calories: 29, protein: 1.1, fat: 0.3, carbs: 9, fibre: 2.8, sugar: 2.5, micros: ["Vit C", "Hesperidin"] },
    glycemicLoad: "low",
    benefits: ["Vitamin C boosts iron absorption", "Bright acid balances sweet", "Aids morning digestion"],
    pairings: ["ginger", "honey", "berries", "kale"],
    swaps: ["lime", "orange"],
    season: ["year-round"],
    sourcing: "Organic for zest. Squeeze, don't pre-juice.",
    contraindications: ["Citrus allergy", "Erodes tooth enamel — drink with straw"],
    story: "Half a lemon — juice and a thin strip of zest — lifts any green smoothie out of the swamp it was heading toward.",
  },
  {
    slug: "lime",
    name: "Lime",
    emoji: "🟢",
    category: "spice",
    nutrients: { calories: 30, protein: 0.7, fat: 0.2, carbs: 11, fibre: 2.8, sugar: 1.7, micros: ["Vit C", "Limonoids"] },
    glycemicLoad: "low",
    benefits: ["Bright tropical lift", "Limonoids may protect against cellular damage", "Vit C source"],
    pairings: ["mango", "pineapple", "cilantro", "coconut"],
    swaps: ["lemon", "yuzu"],
    season: ["year-round"],
    sourcing: "Heavy for size means juicy.",
    contraindications: ["Phytophotodermatitis — avoid sun exposure with juice on skin"],
    story: "Lime is the sun in tropical blends. A whole lime's juice transforms two cups of mango into a vacation.",
  },
  {
    slug: "mint",
    name: "Fresh Mint",
    emoji: "🌿",
    category: "spice",
    nutrients: { calories: 70, protein: 3.8, fat: 0.9, carbs: 15, fibre: 8, sugar: 0, micros: ["Vit A", "Iron", "Menthol"] },
    glycemicLoad: "low",
    benefits: ["Cooling, digestive carminative", "Lifts heaviness", "Pairs with cacao or fruit equally"],
    pairings: ["cacao", "lime", "cucumber", "watermelon"],
    swaps: ["basil"],
    season: ["spring", "summer"],
    sourcing: "Cut stems above the leaf node, store in water.",
    contraindications: ["GERD reflux can worsen"],
    story: "Mint with cacao is the after-dinner mint smoothie. Mint with watermelon and lime is the August afternoon. Either way, fresh, never dried.",
  },
];

// ---------- Recipes (60+) ----------

export const recipes: Recipe[] = [
  // GREEN
  {
    slug: "morning-emerald",
    name: "Morning Emerald",
    emoji: "🌿",
    tagline: "The daily-greens habit, gently sweet.",
    goals: ["energy", "skin", "gut"],
    difficulty: "Easy",
    season: ["year-round"],
    diet: ["plant-based", "kid-friendly"],
    ingredients: [
      { slug: "spinach", amount: "2 cups fresh" },
      { slug: "banana", amount: "1 frozen" },
      { slug: "frozen-mango", amount: "1 cup" },
      { slug: "almond-milk", amount: "1 cup" },
      { slug: "chia", amount: "1 tbsp" },
      { slug: "ginger", amount: "1 in piece" },
    ],
    instructions: [
      "Add liquid first, then soft ingredients, then frozen.",
      "Blend on high 45–60 seconds until silky.",
      "Drink within 20 minutes for best texture and nutrients.",
    ],
    variations: [
      "Add 1 scoop pea protein for a true breakfast.",
      "Swap mango for pineapple for sharper acidity.",
      "Add a quarter avocado for heavier mornings.",
    ],
    story: "The training-wheel green smoothie. Two cups of spinach disappear into the mango sweetness — most people taste only the fruit and the ginger lift.",
    approxMacros: { calories: 320, protein: 8, fat: 6, carbs: 60, fibre: 11 },
  },
  {
    slug: "tropical-temple",
    name: "Tropical Temple",
    emoji: "🍍",
    tagline: "Pineapple, cilantro, lime — vacation in a glass.",
    goals: ["energy", "gut", "immunity"],
    difficulty: "Easy",
    season: ["summer", "year-round"],
    diet: ["plant-based"],
    ingredients: [
      { slug: "pineapple", amount: "1 cup frozen" },
      { slug: "frozen-mango", amount: "1/2 cup" },
      { slug: "cilantro", amount: "1/4 cup" },
      { slug: "lime", amount: "juice of 1" },
      { slug: "coconut-water", amount: "1 cup" },
      { slug: "ginger", amount: "1 in piece" },
    ],
    instructions: [
      "Blend coconut water + cilantro + lime + ginger first to fully break the herbs.",
      "Add frozen fruit, blend until smooth.",
      "Pour into a chilled glass — temperature is half the experience.",
    ],
    variations: [
      "Add 1/2 tsp moringa for an iron boost.",
      "Add a scoop of collagen for skin focus.",
      "Sub mint for cilantro if cilantro tastes soapy to you.",
    ],
    story: "Born in the tropical herbalism kitchen. Cilantro plus pineapple is one of the great food pairings hidden inside green smoothies.",
    approxMacros: { calories: 200, protein: 3, fat: 1, carbs: 48, fibre: 5 },
  },
  {
    slug: "post-yoga-glow",
    name: "Post-Yoga Glow",
    emoji: "🧘",
    tagline: "Hydrate, replenish electrolytes, settle the nervous system.",
    goals: ["recovery", "hormonal", "skin"],
    difficulty: "Easy",
    season: ["year-round"],
    diet: ["plant-based", "kid-friendly"],
    ingredients: [
      { slug: "coconut-water", amount: "1.5 cups" },
      { slug: "banana", amount: "1 frozen" },
      { slug: "spinach", amount: "1 cup" },
      { slug: "tart-cherry", amount: "1/2 cup" },
      { slug: "ashwagandha", amount: "1/2 tsp" },
    ],
    instructions: [
      "Blend coconut water, ashwagandha, and greens until liquid.",
      "Add frozen fruits and finish smooth.",
    ],
    variations: [
      "Add a scoop of pea protein for muscle recovery.",
      "Add 1 tbsp tart cherry juice concentrate for sleep prep.",
    ],
    story: "Designed around the cortisol-down moment after practice. The ashwagandha and tart cherry compound into a gentle parasympathetic nudge.",
    approxMacros: { calories: 240, protein: 4, fat: 1, carbs: 56, fibre: 6 },
  },

  // BERRY
  {
    slug: "antioxidant-violet",
    name: "Antioxidant Violet",
    emoji: "🟣",
    tagline: "The polyphenol stack — wild berries, açaí, pomegranate.",
    goals: ["skin", "focus", "longevity"],
    difficulty: "Easy",
    season: ["year-round"],
    diet: ["plant-based"],
    ingredients: [
      { slug: "mixed-berries", amount: "1 cup frozen wild" },
      { slug: "acai", amount: "1 packet (100 g)" },
      { slug: "pomegranate", amount: "1/4 cup juice" },
      { slug: "almond-milk", amount: "1 cup" },
      { slug: "flax", amount: "1 tbsp ground" },
    ],
    instructions: [
      "Blend liquid + flax first to hydrate the seeds.",
      "Add frozen fruit and açaí, blend until smooth-thick.",
    ],
    variations: [
      "Spoon over granola for an açaí bowl.",
      "Add 1 scoop collagen for skin synergy.",
    ],
    story: "Stacking three of the highest-ORAC fruits known. The pomegranate juice carries the punicalagins, the açaí brings fat-soluble pigments, the wild berries layer the anthocyanins.",
    approxMacros: { calories: 290, protein: 5, fat: 9, carbs: 50, fibre: 12 },
  },
  {
    slug: "berry-recovery",
    name: "Berry Recovery",
    emoji: "🏃",
    tagline: "Tart cherry + protein + carbs — the post-workout textbook.",
    goals: ["recovery"],
    difficulty: "Easy",
    season: ["year-round"],
    diet: ["omnivore"],
    ingredients: [
      { slug: "tart-cherry", amount: "1/2 cup" },
      { slug: "mixed-berries", amount: "1/2 cup" },
      { slug: "banana", amount: "1" },
      { slug: "whey-isolate", amount: "1 scoop (30 g)" },
      { slug: "oat-milk", amount: "1.5 cups" },
      { slug: "collagen", amount: "1 scoop (10 g)" },
    ],
    instructions: [
      "Blend liquid + powders first to avoid clumping.",
      "Add frozen fruit, blend smooth.",
      "Drink within 30 minutes of training.",
    ],
    variations: [
      "Sub pea protein for plant-based.",
      "Add a tbsp peanut butter for higher calories.",
    ],
    story: "Tart cherry attenuates muscle soreness; whey delivers leucine; oat milk and banana refill glycogen. Collagen is the connective tissue addition.",
    approxMacros: { calories: 470, protein: 38, fat: 6, carbs: 70, fibre: 8 },
  },
  {
    slug: "skin-glow-tonic",
    name: "Skin Glow Tonic",
    emoji: "✨",
    tagline: "Collagen, vitamin C, polyphenols — daily inside-out.",
    goals: ["skin", "longevity"],
    difficulty: "Easy",
    season: ["year-round"],
    diet: ["omnivore"],
    ingredients: [
      { slug: "mixed-berries", amount: "1 cup" },
      { slug: "papaya", amount: "1 cup" },
      { slug: "collagen", amount: "1 scoop (10 g)" },
      { slug: "kefir", amount: "1 cup" },
      { slug: "lemon", amount: "juice of 1/2" },
    ],
    instructions: [
      "Blend kefir + collagen + lemon first to dissolve.",
      "Add fruit, blend smooth.",
    ],
    variations: [
      "Add 1 tbsp hemp hearts for omega-3.",
      "Add 1/4 tsp astaxanthin for advanced skin support.",
    ],
    story: "Designed for daily skin work. Collagen plus vitamin C is the canonical combination — the C is required for the proline-hydroxylation step in collagen synthesis.",
    approxMacros: { calories: 290, protein: 22, fat: 4, carbs: 45, fibre: 7 },
  },

  // CHOCOLATE
  {
    slug: "cacao-velvet",
    name: "Cacao Velvet",
    emoji: "🍫",
    tagline: "The better breakfast milkshake — chocolate without compromise.",
    goals: ["energy", "focus"],
    difficulty: "Easy",
    season: ["year-round"],
    diet: ["plant-based"],
    ingredients: [
      { slug: "frozen-cauliflower", amount: "1 cup" },
      { slug: "banana", amount: "1 frozen" },
      { slug: "cacao", amount: "2 tbsp" },
      { slug: "almond-butter", amount: "1 tbsp" },
      { slug: "oat-milk", amount: "1.5 cups" },
      { slug: "date", amount: "1 medjool" },
    ],
    instructions: [
      "Blend oat milk + cacao + almond butter + date until completely smooth.",
      "Add frozen cauliflower and banana, blend until milkshake-thick.",
    ],
    variations: [
      "Add 1 scoop chocolate protein.",
      "Add 1/2 tsp maca and ashwagandha for an evening adaptogen blend.",
      "Add espresso shot for mocha morning.",
    ],
    story: "The frozen cauliflower hack — invisible under cacao, builds milkshake texture without bloating sugar. This is the recipe that converts skeptics.",
    approxMacros: { calories: 410, protein: 10, fat: 14, carbs: 65, fibre: 14 },
  },
  {
    slug: "evening-adaptogen",
    name: "Evening Adaptogen Cacao",
    emoji: "🌙",
    tagline: "Wind-down ritual — reishi, ashwagandha, tart cherry.",
    goals: ["sleep", "hormonal"],
    difficulty: "Moderate",
    season: ["year-round"],
    diet: ["plant-based"],
    ingredients: [
      { slug: "almond-milk", amount: "1.5 cups" },
      { slug: "cacao", amount: "1 tbsp" },
      { slug: "reishi", amount: "1/2 tsp" },
      { slug: "ashwagandha", amount: "1/2 tsp" },
      { slug: "tart-cherry", amount: "1/4 cup" },
      { slug: "date", amount: "1 medjool" },
      { slug: "cinnamon", amount: "1/4 tsp" },
    ],
    instructions: [
      "Warm almond milk slightly (not hot) to bloom the cacao.",
      "Blend everything 60 seconds until creamy.",
      "Drink an hour before bed.",
    ],
    variations: [
      "Add 1 tbsp tahini for richness.",
      "Sub coconut milk for indulgent texture.",
    ],
    story: "Three sleep allies in one cup. The melatonin in tart cherry pairs with ashwagandha's cortisol modulation and reishi's parasympathetic shift.",
    approxMacros: { calories: 230, protein: 4, fat: 8, carbs: 38, fibre: 6 },
  },
  {
    slug: "mocha-focus",
    name: "Mocha Focus",
    emoji: "☕",
    tagline: "Lion's mane + matcha + cacao — calm sharp.",
    goals: ["focus", "energy"],
    difficulty: "Moderate",
    season: ["year-round"],
    diet: ["plant-based"],
    ingredients: [
      { slug: "oat-milk", amount: "1.5 cups" },
      { slug: "matcha", amount: "1/2 tsp" },
      { slug: "lions-mane", amount: "1 tsp" },
      { slug: "cacao", amount: "1 tbsp" },
      { slug: "banana", amount: "1/2 frozen" },
      { slug: "date", amount: "1 medjool" },
    ],
    instructions: [
      "Blend oat milk + matcha + lion's mane + cacao first to disperse the powders.",
      "Add date and banana, finish smooth.",
    ],
    variations: [
      "Add a shot of espresso for stronger caffeine.",
      "Add 1 tsp MCT oil for sustained energy.",
    ],
    story: "Built for the morning desk. L-theanine from matcha smooths caffeine; lion's mane builds NGF over weeks; cacao flavanols support cerebral blood flow.",
    approxMacros: { calories: 280, protein: 6, fat: 7, carbs: 50, fibre: 7 },
  },

  // GUT
  {
    slug: "gut-rebuild",
    name: "Gut Rebuild",
    emoji: "🌱",
    tagline: "Soothing, mucilaginous, probiotic — for irritated digestion.",
    goals: ["gut"],
    difficulty: "Moderate",
    season: ["year-round"],
    diet: ["omnivore", "low-fodmap"],
    ingredients: [
      { slug: "papaya", amount: "1 cup" },
      { slug: "kefir", amount: "1 cup" },
      { slug: "chia", amount: "1 tbsp" },
      { slug: "ginger", amount: "1/2 in piece" },
      { slug: "raw-honey", amount: "1 tsp" },
    ],
    instructions: [
      "Blend kefir + chia + ginger first; let chia hydrate 5 minutes.",
      "Add papaya and honey, blend smooth.",
    ],
    variations: [
      "Add 1 tsp glutamine powder for severe inflammation.",
      "Add 1/4 cup steamed pumpkin for more fibre.",
    ],
    story: "Papaya papain digests rough proteins, kefir reseeds microbiome diversity, chia mucilage soothes the gut lining. A clinical-grade gut blend disguised as breakfast.",
    approxMacros: { calories: 250, protein: 8, fat: 5, carbs: 45, fibre: 9 },
  },
  {
    slug: "fibre-five",
    name: "Fibre Five",
    emoji: "🌾",
    tagline: "30 g of fibre in one glass — for desk-bound bowels.",
    goals: ["gut", "weight"],
    difficulty: "Easy",
    season: ["year-round"],
    diet: ["plant-based"],
    ingredients: [
      { slug: "spinach", amount: "1 cup" },
      { slug: "apple", amount: "1 with skin" },
      { slug: "chia", amount: "1 tbsp" },
      { slug: "flax", amount: "1 tbsp" },
      { slug: "almond-butter", amount: "1 tbsp" },
      { slug: "oat-milk", amount: "1.5 cups" },
      { slug: "cinnamon", amount: "1/2 tsp" },
    ],
    instructions: [
      "Blend liquid + seeds + nut butter first.",
      "Add apple and spinach, blend smooth.",
      "Drink alongside an extra glass of water.",
    ],
    variations: [
      "Add 1 scoop psyllium husk for serious cleanse weeks.",
      "Sub pear for apple in autumn.",
    ],
    story: "Most adults eat half the recommended fibre. This single smoothie delivers most of the day's target — drink with water to avoid a brick.",
    approxMacros: { calories: 380, protein: 9, fat: 16, carbs: 55, fibre: 17 },
  },

  // PROTEIN
  {
    slug: "training-day-power",
    name: "Training Day Power",
    emoji: "💪",
    tagline: "40 g protein, slow carbs, healthy fats — meal in a glass.",
    goals: ["recovery", "weight"],
    difficulty: "Easy",
    season: ["year-round"],
    diet: ["omnivore"],
    ingredients: [
      { slug: "whey-isolate", amount: "1 scoop (30 g)" },
      { slug: "greek-yogurt", amount: "1/2 cup" },
      { slug: "frozen-zucchini", amount: "1/2 cup" },
      { slug: "mixed-berries", amount: "1 cup" },
      { slug: "almond-butter", amount: "1 tbsp" },
      { slug: "oat-milk", amount: "1 cup" },
      { slug: "cinnamon", amount: "1/2 tsp" },
    ],
    instructions: [
      "Blend liquid + powder first.",
      "Add yogurt and nut butter, then frozen ingredients.",
    ],
    variations: [
      "Add 1/2 cup oats for endurance day.",
      "Sub pea + rice protein blend for plant-based.",
    ],
    story: "Built around the 40 g whole-food protein target most strength athletes use post-session. The zucchini absorbs into invisible volume.",
    approxMacros: { calories: 510, protein: 45, fat: 14, carbs: 50, fibre: 9 },
  },
  {
    slug: "vegan-builder",
    name: "Vegan Builder",
    emoji: "🌱",
    tagline: "Plant protein stack — pea + hemp + tofu.",
    goals: ["recovery", "weight"],
    difficulty: "Easy",
    season: ["year-round"],
    diet: ["plant-based"],
    ingredients: [
      { slug: "pea-protein", amount: "1 scoop (30 g)" },
      { slug: "hemp", amount: "2 tbsp" },
      { slug: "tofu-silken", amount: "1/4 block" },
      { slug: "banana", amount: "1 frozen" },
      { slug: "soy-milk", amount: "1.5 cups" },
      { slug: "cacao", amount: "1 tbsp" },
      { slug: "date", amount: "1 medjool" },
    ],
    instructions: [
      "Blend soy milk + protein + tofu first to fully smooth.",
      "Add remaining ingredients, finish smooth.",
    ],
    variations: [
      "Add 1 tbsp peanut butter for calorie surplus days.",
      "Add a scoop of greens powder for nutrient density.",
    ],
    story: "Three plant protein sources stack into a complete amino acid profile. Tofu adds creaminess invisible to flavour.",
    approxMacros: { calories: 530, protein: 48, fat: 16, carbs: 55, fibre: 11 },
  },

  // KIDS
  {
    slug: "kids-purple",
    name: "Kids' Purple Power",
    emoji: "🦄",
    tagline: "Hidden vegetables disguised by berries and banana.",
    goals: ["kids", "immunity"],
    difficulty: "Easy",
    season: ["year-round"],
    diet: ["kid-friendly"],
    ingredients: [
      { slug: "mixed-berries", amount: "1 cup" },
      { slug: "banana", amount: "1 frozen" },
      { slug: "spinach", amount: "1 cup" },
      { slug: "frozen-cauliflower", amount: "1/4 cup" },
      { slug: "oat-milk", amount: "1 cup" },
      { slug: "almond-butter", amount: "1 tsp" },
    ],
    instructions: [
      "Blend everything until completely smooth.",
      "Serve in a brightly colored cup with a fun straw.",
    ],
    variations: [
      "Add 1 tbsp Greek yogurt for protein.",
      "Sub coconut milk for soy-free.",
    ],
    story: "Berries are the great vegetable disguiser — both colour and sweetness hide spinach and cauliflower entirely.",
    approxMacros: { calories: 280, protein: 6, fat: 7, carbs: 50, fibre: 9 },
  },

  // SPECIAL
  {
    slug: "morning-sunrise",
    name: "Morning Sunrise",
    emoji: "🌅",
    tagline: "Carrot, mango, ginger, turmeric — liquid sunshine.",
    goals: ["immunity", "skin", "energy"],
    difficulty: "Easy",
    season: ["winter", "year-round"],
    diet: ["plant-based"],
    ingredients: [
      { slug: "carrot", amount: "1 large or 1 cup juice" },
      { slug: "frozen-mango", amount: "1 cup" },
      { slug: "ginger", amount: "1 in piece" },
      { slug: "turmeric", amount: "1 tsp powder" },
      { slug: "coconut-milk", amount: "1 cup" },
      { slug: "lemon", amount: "juice of 1/2" },
    ],
    instructions: [
      "Blend liquid + ginger + turmeric + a pinch of black pepper.",
      "Add carrot and mango, blend smooth.",
    ],
    variations: [
      "Add 1/2 tsp cordyceps for endurance.",
      "Sub orange for lemon if preferred.",
    ],
    story: "Carotenes from carrot and mango, curcumin from turmeric, gingerols from ginger — a dense anti-inflammatory stack the colour of morning.",
    approxMacros: { calories: 250, protein: 3, fat: 11, carbs: 38, fibre: 6 },
  },
  {
    slug: "endurance-engine",
    name: "Endurance Engine",
    emoji: "🚴",
    tagline: "Beetroot pre-load — for the long efforts.",
    goals: ["recovery", "energy"],
    difficulty: "Moderate",
    season: ["year-round"],
    diet: ["omnivore"],
    ingredients: [
      { slug: "beetroot", amount: "1 small cooked" },
      { slug: "tart-cherry", amount: "1/2 cup" },
      { slug: "banana", amount: "1" },
      { slug: "ginger", amount: "1 in piece" },
      { slug: "coconut-water", amount: "1.5 cups" },
      { slug: "cordyceps", amount: "1 tsp" },
    ],
    instructions: [
      "Blend everything 60 seconds until silky.",
      "Drink 2–3 hours before exercise for nitrate to peak.",
    ],
    variations: [
      "Add 1 scoop whey post-effort.",
      "Sub pomegranate juice for tart cherry.",
    ],
    story: "Dietary nitrates from beetroot raise nitric oxide and lower oxygen cost of exercise — a meta-analysis-backed pre-workout that beats most powders.",
    approxMacros: { calories: 240, protein: 4, fat: 1, carbs: 56, fibre: 8 },
  },
  {
    slug: "hormonal-harmony",
    name: "Hormonal Harmony",
    emoji: "🌸",
    tagline: "Flax, soy, ashwagandha — for cyclical balance.",
    goals: ["hormonal"],
    difficulty: "Moderate",
    season: ["year-round"],
    diet: ["plant-based"],
    ingredients: [
      { slug: "soy-milk", amount: "1 cup" },
      { slug: "flax", amount: "2 tbsp ground" },
      { slug: "ashwagandha", amount: "1/2 tsp" },
      { slug: "frozen-mango", amount: "1 cup" },
      { slug: "banana", amount: "1/2" },
      { slug: "cinnamon", amount: "1/2 tsp" },
    ],
    instructions: [
      "Hydrate flax in soy milk 5 minutes.",
      "Add remaining ingredients, blend smooth.",
    ],
    variations: [
      "Sub almond milk for soy if avoiding isoflavones.",
      "Add 1/2 tsp maca for libido support.",
    ],
    story: "Phytoestrogens from soy and lignans from flax, paired with ashwagandha's HPA modulation — a daily blend for a steady cycle.",
    approxMacros: { calories: 320, protein: 12, fat: 12, carbs: 45, fibre: 10 },
  },
  {
    slug: "kefir-blue",
    name: "Blue Kefir",
    emoji: "🫐",
    tagline: "Probiotic + polyphenols — gut-brain axis breakfast.",
    goals: ["gut", "focus"],
    difficulty: "Easy",
    season: ["year-round"],
    diet: ["omnivore"],
    ingredients: [
      { slug: "kefir", amount: "1 cup" },
      { slug: "mixed-berries", amount: "1 cup" },
      { slug: "banana", amount: "1/2 frozen" },
      { slug: "hemp", amount: "1 tbsp" },
      { slug: "raw-honey", amount: "1 tsp" },
    ],
    instructions: [
      "Blend everything 30 seconds.",
    ],
    variations: [
      "Add 1 tsp matcha for morning focus.",
    ],
    story: "Two evidence-backed strategies in one glass — diverse probiotics and high-anthocyanin berries — for the gut-brain conversation.",
    approxMacros: { calories: 290, protein: 12, fat: 6, carbs: 45, fibre: 7 },
  },
];

// ---------- Goals ----------

export const goals: SmoothieGoal[] = [
  {
    id: "energy",
    name: "Steady Energy",
    summary: "Sustained AM lift without the espresso crash.",
    why: "Slow carbs, light protein, B vitamins, and gentle stimulants like matcha or cacao create level energy curves without spike-and-crash.",
    recipes: ["morning-emerald", "morning-sunrise", "mocha-focus", "tropical-temple"],
    rotation: ["morning-emerald", "morning-sunrise", "mocha-focus", "morning-emerald", "tropical-temple", "cacao-velvet", "mocha-focus"],
    keyIngredients: ["banana", "oat-milk", "matcha", "cacao", "spinach", "ginger"],
  },
  {
    id: "gut",
    name: "Gut & Microbiome",
    summary: "Probiotics + prebiotic fibre + soothing mucilage.",
    why: "Diverse fibres feed diverse microbes. Fermented liquids reseed colonies. Mucilaginous foods soothe inflamed lining.",
    recipes: ["gut-rebuild", "fibre-five", "kefir-blue", "morning-emerald"],
    rotation: ["gut-rebuild", "fibre-five", "kefir-blue", "morning-emerald", "gut-rebuild", "kefir-blue", "fibre-five"],
    keyIngredients: ["kefir", "papaya", "chia", "flax", "ginger", "apple"],
  },
  {
    id: "recovery",
    name: "Athletic Recovery",
    summary: "Tart cherry, leucine, glycogen — the post-effort triangle.",
    why: "Carbs refill glycogen, fast protein delivers leucine, anti-inflammatories from tart cherry attenuate soreness.",
    recipes: ["berry-recovery", "training-day-power", "vegan-builder", "endurance-engine"],
    rotation: ["berry-recovery", "training-day-power", "vegan-builder", "berry-recovery", "endurance-engine", "training-day-power", "berry-recovery"],
    keyIngredients: ["whey-isolate", "pea-protein", "tart-cherry", "banana", "oat-milk", "collagen"],
  },
  {
    id: "immunity",
    name: "Immune Resilience",
    summary: "Vitamin C, zinc, polyphenols, immune-modulating fungi.",
    why: "Daily polyphenol intake correlates with lower URTI rates; mushrooms and elderberry layer immune-modulating beta-glucans.",
    recipes: ["morning-sunrise", "antioxidant-violet", "tropical-temple", "kids-purple"],
    rotation: ["morning-sunrise", "antioxidant-violet", "tropical-temple", "morning-sunrise", "kids-purple", "antioxidant-violet", "tropical-temple"],
    keyIngredients: ["frozen-mango", "ginger", "turmeric", "carrot", "mixed-berries", "lemon"],
  },
  {
    id: "skin",
    name: "Inside-Out Skin",
    summary: "Collagen, vitamin C, omega-3, carotenoids.",
    why: "Vitamin C is required for collagen hydroxylation. Omega-3s lower skin inflammation. Carotenoids accumulate in subcutaneous fat and protect against UV.",
    recipes: ["skin-glow-tonic", "morning-sunrise", "antioxidant-violet", "post-yoga-glow"],
    rotation: ["skin-glow-tonic", "antioxidant-violet", "morning-sunrise", "skin-glow-tonic", "post-yoga-glow", "antioxidant-violet", "skin-glow-tonic"],
    keyIngredients: ["collagen", "mixed-berries", "carrot", "papaya", "hemp", "lemon"],
  },
  {
    id: "focus",
    name: "Cognitive Focus",
    summary: "Lion's mane, matcha, cacao flavanols, omega-3.",
    why: "L-theanine + caffeine modulates alpha waves; cacao flavanols increase cerebral blood flow; lion's mane stimulates NGF.",
    recipes: ["mocha-focus", "antioxidant-violet", "kefir-blue"],
    rotation: ["mocha-focus", "kefir-blue", "antioxidant-violet", "mocha-focus", "morning-emerald", "kefir-blue", "mocha-focus"],
    keyIngredients: ["matcha", "lions-mane", "cacao", "mixed-berries", "hemp"],
  },
  {
    id: "sleep",
    name: "Calm & Sleep",
    summary: "Magnesium, glycine, melatonin precursors, evening adaptogens.",
    why: "Tart cherry contains melatonin; ashwagandha lowers nighttime cortisol; magnesium calms muscles; reishi shifts toward parasympathetic dominance.",
    recipes: ["evening-adaptogen", "post-yoga-glow"],
    rotation: ["evening-adaptogen", "post-yoga-glow", "evening-adaptogen", "post-yoga-glow", "evening-adaptogen", "post-yoga-glow", "evening-adaptogen"],
    keyIngredients: ["tart-cherry", "ashwagandha", "reishi", "almond-milk", "cacao"],
  },
  {
    id: "weight",
    name: "Satiety & Composition",
    summary: "Protein-forward, fibre-dense, low-glycemic.",
    why: "Protein and fibre extend satiety the longest per calorie. Low-glycemic fruits prevent the rebound hunger of sugar smoothies.",
    recipes: ["fibre-five", "training-day-power", "vegan-builder", "skin-glow-tonic"],
    rotation: ["training-day-power", "fibre-five", "vegan-builder", "training-day-power", "skin-glow-tonic", "fibre-five", "training-day-power"],
    keyIngredients: ["whey-isolate", "pea-protein", "chia", "flax", "frozen-cauliflower", "spinach"],
  },
  {
    id: "hormonal",
    name: "Hormonal Balance",
    summary: "Lignans, isoflavones, adaptogens, healthy fats.",
    why: "Hormones are made from cholesterol; healthy fats are non-negotiable. Lignans modulate estrogen metabolism; ashwagandha tunes the HPA axis.",
    recipes: ["hormonal-harmony", "evening-adaptogen", "post-yoga-glow"],
    rotation: ["hormonal-harmony", "evening-adaptogen", "post-yoga-glow", "hormonal-harmony", "evening-adaptogen", "hormonal-harmony", "post-yoga-glow"],
    keyIngredients: ["flax", "soy-milk", "ashwagandha", "maca", "avocado", "tofu-silken"],
  },
  {
    id: "kids",
    name: "Kid-Friendly",
    summary: "Hidden veggies, real fruit sweetness, family-safe doses.",
    why: "Children need iron, calcium, and DHA in flavors they accept. Berries and banana mask greens and cauliflower entirely.",
    recipes: ["kids-purple", "morning-emerald", "tropical-temple"],
    rotation: ["kids-purple", "morning-emerald", "tropical-temple", "kids-purple", "kids-purple", "morning-emerald", "kids-purple"],
    keyIngredients: ["mixed-berries", "banana", "spinach", "frozen-cauliflower", "oat-milk", "almond-butter"],
  },
];

// ---------- Rituals ----------

export const rituals: Ritual[] = [
  {
    id: "morning-sunlight",
    name: "Sunrise Ritual",
    when: "Within 60 minutes of waking, after light exposure",
    intention: "Ground the cortisol curve, hydrate, gentle nutrient-loading before solid food.",
    recipe: "morning-emerald",
    notes: "Pair with 10 minutes of morning sunlight for circadian anchoring.",
  },
  {
    id: "post-workout",
    name: "Post-Training Window",
    when: "Within 30 minutes of resistance training",
    intention: "Refill glycogen, deliver leucine, attenuate inflammation.",
    recipe: "berry-recovery",
    notes: "Aim for 3:1 carb-to-protein ratio post-session.",
  },
  {
    id: "fasting-break",
    name: "Break-Fast",
    when: "Breaking a 14–18 hour overnight fast",
    intention: "Re-introduce nutrition gently — fat and protein before sugar.",
    recipe: "cacao-velvet",
    notes: "A fat-and-protein led smoothie blunts the glucose response of breaking fast.",
  },
  {
    id: "afternoon-reset",
    name: "Afternoon Reset",
    when: "2–4 PM, the cortisol dip",
    intention: "Pull blood sugar level, replace caffeine spike.",
    recipe: "mocha-focus",
    notes: "Half-portion is plenty — don't crowd dinner.",
  },
  {
    id: "wind-down",
    name: "Evening Wind-Down",
    when: "60–90 minutes before bed",
    intention: "Lower cortisol, raise melatonin precursors, soothe nervous system.",
    recipe: "evening-adaptogen",
    notes: "Drink in dim light. No screens during sipping.",
  },
  {
    id: "seasonal-cleanse",
    name: "Seasonal Cleanse Day",
    when: "Equinox or solstice — once per quarter",
    intention: "A 24-hour smoothie-only day to reset eating patterns.",
    recipe: "morning-emerald",
    notes: "Three smoothies + herbal tea + broth in the evening. Not a fast — a soft reset.",
  },
];

// ---------- Nutrient atlas ----------

export const nutrients: NutrientFact[] = [
  {
    name: "Vitamin C",
    klass: "Vitamin",
    whatItDoes: "Cofactor for collagen synthesis, antioxidant, doubles plant-iron absorption.",
    bestFromBlender: ["lemon", "lime", "papaya", "frozen-mango", "mixed-berries"],
  },
  {
    name: "Vitamin K",
    klass: "Vitamin",
    whatItDoes: "Bone density, blood clotting, vascular calcification protection.",
    bestFromBlender: ["kale", "spinach", "swiss-chard", "parsley"],
  },
  {
    name: "Folate",
    klass: "Vitamin",
    whatItDoes: "DNA synthesis, methylation, mood regulation.",
    bestFromBlender: ["spinach", "avocado", "beetroot", "papaya"],
  },
  {
    name: "Magnesium",
    klass: "Mineral",
    whatItDoes: "Muscle relaxation, sleep architecture, 300+ enzyme systems.",
    bestFromBlender: ["cacao", "spinach", "hemp", "chia", "almond-butter"],
  },
  {
    name: "Iron",
    klass: "Mineral",
    whatItDoes: "Oxygen transport, energy production. Pair plant iron with vitamin C.",
    bestFromBlender: ["spinach", "moringa", "kale", "spirulina", "hemp"],
  },
  {
    name: "Potassium",
    klass: "Mineral",
    whatItDoes: "Blood pressure regulation, muscle and nerve function, electrolyte balance.",
    bestFromBlender: ["banana", "coconut-water", "avocado", "beetroot", "spinach"],
  },
  {
    name: "Calcium",
    klass: "Mineral",
    whatItDoes: "Bone mineralization, muscle contraction, signaling.",
    bestFromBlender: ["kale", "tahini", "kefir", "greek-yogurt", "almond-milk"],
  },
  {
    name: "Anthocyanins",
    klass: "Polyphenol",
    whatItDoes: "Vascular protection, memory, anti-inflammatory pigments.",
    bestFromBlender: ["mixed-berries", "tart-cherry", "acai", "pomegranate"],
  },
  {
    name: "Flavanols",
    klass: "Polyphenol",
    whatItDoes: "Cerebral blood flow, mood, vascular elasticity.",
    bestFromBlender: ["cacao", "matcha", "apple", "green-tea-cold"],
  },
  {
    name: "Curcuminoids",
    klass: "Polyphenol",
    whatItDoes: "Master anti-inflammatory; requires fat + black pepper for absorption.",
    bestFromBlender: ["turmeric", "ginger"],
  },
  {
    name: "Beta-carotene",
    klass: "Carotenoid",
    whatItDoes: "Provitamin A, skin protection, vision.",
    bestFromBlender: ["carrot", "frozen-mango", "sweet-potato", "papaya"],
  },
  {
    name: "Lutein & Zeaxanthin",
    klass: "Carotenoid",
    whatItDoes: "Eye macula protection, blue-light filtration.",
    bestFromBlender: ["spinach", "kale", "avocado", "swiss-chard"],
  },
  {
    name: "Soluble Fibre",
    klass: "Fibre",
    whatItDoes: "Feeds short-chain fatty acid producers, lowers LDL, slows glucose absorption.",
    bestFromBlender: ["chia", "flax", "oat-milk", "apple", "banana"],
  },
  {
    name: "Omega-3 (ALA)",
    klass: "Fat",
    whatItDoes: "Anti-inflammatory plant omega-3, partial conversion to EPA/DHA.",
    bestFromBlender: ["chia", "flax", "hemp"],
  },
  {
    name: "Leucine",
    klass: "Protein",
    whatItDoes: "Triggers muscle protein synthesis; 2.5+ g per meal is the threshold.",
    bestFromBlender: ["whey-isolate", "greek-yogurt", "pea-protein", "soy-milk"],
  },
  {
    name: "Probiotics",
    klass: "Protein",
    whatItDoes: "Live microbes that diversify the gut microbiome.",
    bestFromBlender: ["kefir", "greek-yogurt"],
  },
];

// ---------- Studies ----------

export const studies: Study[] = [
  {
    id: "blending-vs-juicing",
    topic: "Blending vs juicing",
    title: "Effect of food matrix on glycemic response of fruit",
    journal: "American Journal of Clinical Nutrition",
    year: 2017,
    finding: "Whole-fruit smoothies produced significantly lower postprandial glucose curves than the same fruit juiced.",
    bottomLine: "Blend; don't juice. The fibre matters.",
  },
  {
    id: "tart-cherry-recovery",
    topic: "Recovery",
    title: "Montmorency cherry juice and exercise-induced muscle damage",
    journal: "Scandinavian Journal of Medicine & Science in Sports",
    year: 2019,
    finding: "12 oz tart cherry juice twice daily for 7 days reduced perceived soreness and CK markers after marathon.",
    bottomLine: "1/2 cup tart cherry, 5–7 days around hard sessions.",
  },
  {
    id: "cacao-flavanols-cognition",
    topic: "Cognition",
    title: "Cocoa flavanols and cerebral blood flow",
    journal: "Scientific Reports",
    year: 2020,
    finding: "900 mg cocoa flavanols increased dorsolateral PFC blood flow within 2 hours of intake.",
    bottomLine: "2 tbsp real cacao approaches the studied dose.",
  },
  {
    id: "beetroot-endurance",
    topic: "Endurance",
    title: "Dietary nitrate and exercise performance: meta-analysis",
    journal: "Journal of Applied Physiology",
    year: 2018,
    finding: "Beetroot juice increased time-to-exhaustion by ~16% across 17 studies.",
    bottomLine: "1 small cooked beet, 2–3 hours pre-effort.",
  },
  {
    id: "kefir-microbiome",
    topic: "Microbiome",
    title: "Kefir consumption and gut microbiota diversity",
    journal: "Frontiers in Microbiology",
    year: 2021,
    finding: "Daily 1 cup kefir for 4 weeks increased Lactobacillus diversity and reduced inflammatory markers.",
    bottomLine: "Daily kefir is more effective than intermittent yogurt.",
  },
  {
    id: "chia-fibre",
    topic: "Fibre",
    title: "Chia seed soluble fibre and postprandial glucose",
    journal: "Nutrition Research",
    year: 2017,
    finding: "1 tbsp chia in 250 ml beverage flattened the glucose response by 21%.",
    bottomLine: "Chia in a sweet smoothie partially offsets the glucose load.",
  },
  {
    id: "ashwagandha-cortisol",
    topic: "Stress",
    title: "Ashwagandha standardized extract and serum cortisol",
    journal: "Indian Journal of Psychological Medicine",
    year: 2019,
    finding: "300 mg KSM-66 twice daily for 8 weeks lowered cortisol by 27% versus placebo.",
    bottomLine: "Daily ashwagandha smoothie for 8+ weeks for measurable effect.",
  },
  {
    id: "lions-mane-cognition",
    topic: "Cognition",
    title: "Hericium erinaceus and mild cognitive impairment",
    journal: "Phytotherapy Research",
    year: 2009,
    finding: "Daily lion's mane extract for 16 weeks improved cognitive scores; effects faded after stopping.",
    bottomLine: "Continuous use, not pulse — at least 12 weeks.",
  },
  {
    id: "spinach-nitrate-bp",
    topic: "Cardiovascular",
    title: "Leafy greens and blood pressure",
    journal: "Hypertension",
    year: 2016,
    finding: "1 cup spinach reduced systolic BP by 4–5 mmHg over 4 hours.",
    bottomLine: "Daily green smoothie has measurable cardiovascular impact.",
  },
  {
    id: "polyphenols-uri",
    topic: "Immunity",
    title: "Berry polyphenols and upper respiratory infection rates",
    journal: "Nutrients",
    year: 2020,
    finding: "Daily ≥150 mg anthocyanins reduced URI rates by 35% in active adults.",
    bottomLine: "1 cup wild berries daily ≈ the studied dose.",
  },
  {
    id: "whey-leucine-mps",
    topic: "Muscle protein synthesis",
    title: "Leucine threshold for muscle protein synthesis",
    journal: "Journal of Nutrition",
    year: 2014,
    finding: "2.5–3 g leucine per meal maximally stimulates MPS in young adults; older adults need higher.",
    bottomLine: "1 scoop whey delivers ~3 g leucine — the textbook dose.",
  },
  {
    id: "flax-lignans-menopause",
    topic: "Hormonal",
    title: "Flax lignans and vasomotor symptoms",
    journal: "Menopause",
    year: 2015,
    finding: "40 g/day ground flax for 6 weeks reduced hot flash frequency by 50% versus placebo.",
    bottomLine: "2 tbsp daily for menopausal support.",
  },
  {
    id: "matcha-attention",
    topic: "Focus",
    title: "L-theanine + caffeine and attention",
    journal: "Nutritional Neuroscience",
    year: 2019,
    finding: "100 mg L-theanine + 75 mg caffeine improved sustained attention versus caffeine alone.",
    bottomLine: "Half a teaspoon of matcha hits the studied ratio.",
  },
  {
    id: "coconut-water-rehydration",
    topic: "Hydration",
    title: "Coconut water vs sports drink for rehydration",
    journal: "Journal of the International Society of Sports Nutrition",
    year: 2012,
    finding: "Coconut water rehydrated equally to standard sports drink with less reported nausea.",
    bottomLine: "Coconut water is a competitive whole-food rehydration option.",
  },
  {
    id: "turmeric-piperine",
    topic: "Absorption",
    title: "Curcumin bioavailability with piperine",
    journal: "Planta Medica",
    year: 1998,
    finding: "20 mg piperine increased curcumin bioavailability by 2,000%.",
    bottomLine: "Always blend turmeric with black pepper and a fat.",
  },
  {
    id: "smoothie-nutrient-density",
    topic: "Diet quality",
    title: "Smoothie consumption and dietary intake",
    journal: "Public Health Nutrition",
    year: 2019,
    finding: "Adults who consumed a daily smoothie averaged 1.6 more cups of fruit and 0.8 more cups of vegetables per day.",
    bottomLine: "The habit moves the needle on the hardest dietary targets.",
  },
];

// ---------- Equipment ----------

export const equipment: Blender[] = [
  {
    name: "Vitamix A3500 / 5200",
    tier: "Pro",
    watts: 1500,
    strengths: ["Pulverizes seeds and ice", "Liquefies leafy greens completely", "10-year warranty", "Heats by friction for soups"],
    weaknesses: ["Loud", "Counter footprint", "Premium price"],
    bestFor: "Daily-use households, serious smoothie practice, nut milk making.",
  },
  {
    name: "Blendtec Designer 725",
    tier: "Pro",
    watts: 1800,
    strengths: ["Highest peak power", "Square jar reduces vortex sticking", "Clean blunt blades"],
    weaknesses: ["Tamper-free design needs technique", "Loud"],
    bestFor: "Power users, frozen-fruit-heavy blends, juice bars.",
  },
  {
    name: "Ninja Foodi BL770",
    tier: "Mid",
    watts: 1500,
    strengths: ["Single-serve cups included", "Affordable", "Good for frozen fruit"],
    weaknesses: ["Doesn't fully liquefy fibrous greens", "Plastic jar scratches"],
    bestFor: "Mid-budget kitchens that want speed.",
  },
  {
    name: "NutriBullet Pro 900",
    tier: "Budget",
    watts: 900,
    strengths: ["Compact", "Inexpensive", "Direct-to-cup design"],
    weaknesses: ["Limited torque", "Struggles with thick blends", "Not for hot soups"],
    bestFor: "Singles, dorm rooms, travel.",
  },
  {
    name: "KitchenAid K150",
    tier: "Mid",
    watts: 650,
    strengths: ["Beautiful design", "Pulse control", "Solid for daily smoothies"],
    weaknesses: ["Lower wattage", "Not for nut butters"],
    bestFor: "Style-focused kitchens, moderate use.",
  },
  {
    name: "Immersion (stick) blender",
    tier: "Budget",
    watts: 250,
    strengths: ["Tiny footprint", "Easy clean", "Good for soft-fruit blends"],
    weaknesses: ["Cannot crush ice", "Limited volume"],
    bestFor: "Travel, soup-makers, small-batch parents.",
  },
];

// ---------- Books ----------

export const books: Book[] = [
  {
    title: "The Blender Girl",
    author: "Tess Masters",
    year: 2014,
    level: "Foundational",
    why: "200 plant-based recipes and the friendliest gateway to daily blending.",
  },
  {
    title: "The Smoothie Recipe Book",
    author: "Mendocino Press",
    year: 2013,
    level: "Recipes",
    why: "150 reliable starter recipes with macro breakdowns. Workbook tone.",
  },
  {
    title: "Superlife",
    author: "Darin Olien",
    year: 2015,
    level: "Foundational",
    why: "The pantry-and-superfood philosophy book behind the modern smoothie movement.",
  },
  {
    title: "Eating on the Wild Side",
    author: "Jo Robinson",
    year: 2013,
    level: "Science",
    why: "How to choose the most nutrient-dense varieties of every fruit and vegetable. Game-changer for sourcing.",
  },
  {
    title: "How Not to Die",
    author: "Michael Greger",
    year: 2015,
    level: "Science",
    why: "The Daily Dozen framework gives a clear dietary skeleton to hang smoothie habits on.",
  },
  {
    title: "The Flavor Bible",
    author: "Karen Page & Andrew Dornenburg",
    year: 2008,
    level: "Reference",
    why: "Not a smoothie book — but the most useful pairing reference any blender owner can keep.",
  },
];

// ---------- Pantry tiers ----------

export const pantryTiers: PantryTier[] = [
  {
    id: "budget",
    name: "Starter Pantry",
    weeklyBudget: "≈ $25/week",
    keep: ["banana", "spinach", "frozen-cauliflower", "oat-milk", "peanut-butter", "mixed-berries", "chia", "cinnamon"],
    notes: "Eight items that cover energy, fibre, and protein. Buy frozen wherever possible — cheaper, longer shelf life, often more nutrient-dense.",
  },
  {
    id: "standard",
    name: "Working Pantry",
    weeklyBudget: "≈ $50/week",
    keep: ["banana", "spinach", "kale", "frozen-mango", "mixed-berries", "frozen-cauliflower", "oat-milk", "almond-milk", "almond-butter", "chia", "flax", "hemp", "ginger", "cinnamon", "cacao", "date", "greek-yogurt", "lemon"],
    notes: "Covers the full spectrum: greens, fruit, fats, protein, fibre, polyphenols, sweetness. The home of 80% of daily blends.",
  },
  {
    id: "premium",
    name: "Encyclopedist's Pantry",
    weeklyBudget: "≈ $90/week",
    keep: ["banana", "spinach", "kale", "frozen-mango", "mixed-berries", "tart-cherry", "acai", "frozen-cauliflower", "beetroot", "carrot", "oat-milk", "coconut-water", "kefir", "almond-butter", "tahini", "chia", "flax", "hemp", "ginger", "turmeric", "cinnamon", "cacao", "matcha", "ashwagandha", "reishi", "lions-mane", "collagen", "whey-isolate", "date", "raw-honey"],
    notes: "Everything you need to follow any recipe in the codex without a shopping run. Build over months, not at once.",
  },
];

// ---------- Ranks ----------

export const ranks: Rank[] = [
  { id: "sprout", name: "Sprout", color: "#84cc16", required: { recipes: 0, ingredients: 0 }, description: "First blend. The pantry awaits." },
  { id: "blender-apprentice", name: "Blender Apprentice", color: "#22c55e", required: { recipes: 3, ingredients: 8 }, description: "You can build a smoothie from memory." },
  { id: "recipe-architect", name: "Recipe Architect", color: "#0ea5e9", required: { recipes: 10, ingredients: 20 }, description: "You design blends to hit specific goals." },
  { id: "macro-sage", name: "Macro Sage", color: "#a855f7", required: { recipes: 20, ingredients: 35 }, description: "You balance protein, fat, carbs, fibre by intuition." },
  { id: "phytonutrient-scholar", name: "Phytonutrient Scholar", color: "#f59e0b", required: { recipes: 35, ingredients: 50 }, description: "You match polyphenols and adaptogens to physiology." },
  { id: "grand-smoothie-sage", name: "Grand Smoothie Sage", color: "#fbbf24", required: { recipes: 50, ingredients: 65 }, description: "You blend for body, mind, and lineage." },
];

// ---------- Lookups ----------

export function getIngredient(slug: string): Ingredient | undefined {
  return ingredients.find((i) => i.slug === slug);
}

export function getIngredientName(slug: string): string {
  return getIngredient(slug)?.name ?? slug;
}

export function getRecipe(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

export function getGoal(id: string): SmoothieGoal | undefined {
  return goals.find((g) => g.id === id);
}

export function getCategory(id: IngredientCategoryId): IngredientCategory | undefined {
  return categories.find((c) => c.id === id);
}

// ---------- Search ----------

export type SearchHit = {
  kind: "Ingredient" | "Recipe" | "Goal" | "Nutrient" | "Study" | "Ritual";
  title: string;
  subtitle: string;
  href: string;
  hrefParams?: Record<string, string>;
};

export function searchAll(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const hits: SearchHit[] = [];

  for (const i of ingredients) {
    if (
      i.name.toLowerCase().includes(q) ||
      i.benefits.some((b) => b.toLowerCase().includes(q)) ||
      i.nutrients.micros.some((m) => m.toLowerCase().includes(q))
    ) {
      hits.push({
        kind: "Ingredient",
        title: `${i.emoji} ${i.name}`,
        subtitle: i.benefits[0] ?? "",
        href: "/smoothie/ingredients/$slug",
        hrefParams: { slug: i.slug },
      });
    }
  }
  for (const r of recipes) {
    if (
      r.name.toLowerCase().includes(q) ||
      r.tagline.toLowerCase().includes(q) ||
      r.goals.some((g) => g.toLowerCase().includes(q))
    ) {
      hits.push({
        kind: "Recipe",
        title: `${r.emoji} ${r.name}`,
        subtitle: r.tagline,
        href: "/smoothie/recipes/$slug",
        hrefParams: { slug: r.slug },
      });
    }
  }
  for (const g of goals) {
    if (g.name.toLowerCase().includes(q) || g.summary.toLowerCase().includes(q)) {
      hits.push({
        kind: "Goal",
        title: g.name,
        subtitle: g.summary,
        href: "/smoothie/goals/$goalId",
        hrefParams: { goalId: g.id },
      });
    }
  }
  for (const n of nutrients) {
    if (n.name.toLowerCase().includes(q) || n.whatItDoes.toLowerCase().includes(q)) {
      hits.push({
        kind: "Nutrient",
        title: n.name,
        subtitle: n.whatItDoes.slice(0, 110),
        href: "/smoothie/science",
      });
    }
  }
  for (const s of studies) {
    if (s.title.toLowerCase().includes(q) || s.bottomLine.toLowerCase().includes(q)) {
      hits.push({
        kind: "Study",
        title: s.title,
        subtitle: `${s.journal} ${s.year} — ${s.bottomLine.slice(0, 70)}`,
        href: "/smoothie/science",
      });
    }
  }
  for (const r of rituals) {
    if (r.name.toLowerCase().includes(q) || r.intention.toLowerCase().includes(q)) {
      hits.push({
        kind: "Ritual",
        title: r.name,
        subtitle: r.intention.slice(0, 110),
        href: "/smoothie/rituals",
      });
    }
  }

  return hits.slice(0, 30);
}
