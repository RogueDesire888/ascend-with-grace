// Single source of truth for the Herbal Path encyclopedia.
// All content is statically authored — no backend, no async fetches.
// Mirrors the shape of breathwork-data.ts.

// ---------- Types ----------

export type Energetic = "warming" | "cooling" | "neutral";
export type Moisture = "drying" | "moistening" | "neutral";
export type Tone = "relaxing" | "stimulating" | "neutral";

export type Tradition =
  | "Western"
  | "Wise Woman"
  | "Eclectic"
  | "TCM"
  | "Ayurveda"
  | "Unani"
  | "Spagyric";

export type SafetyLevel = "Generally safe" | "Use with care" | "Practitioner only";
export type Sustainability = "Abundant" | "To-Watch" | "At-Risk" | "Endangered";

export type Constituent = {
  name: string;
  klass:
    | "Alkaloid"
    | "Flavonoid"
    | "Iridoid"
    | "Mucilage"
    | "OPC"
    | "Saponin"
    | "Terpene"
    | "Salicylate"
    | "Glycoside"
    | "Polysaccharide"
    | "Volatile oil"
    | "Bitter principle"
    | "Resin"
    | "Tannin"
    | "Lignan";
  role: string;
};

export type DoseRange = {
  preparation: string; // e.g. "Tincture (1:5, 40%)", "Infusion"
  amount: string; // e.g. "30–60 drops, 3×/day"
  notes?: string;
};

export type Herb = {
  slug: string;
  name: string;
  latin: string;
  family: string;
  partsUsed: string[];
  energetics: { temperature: Energetic; moisture: Moisture; tone: Tone };
  taste: string[]; // sweet, bitter, pungent, salty, sour, astringent
  actions: string[]; // ids from `actions`
  affinities: string[]; // body systems
  constituents: Constituent[];
  traditional: string; // 1-2 paragraphs of traditional use
  modern: string; // 1-2 paragraphs of evidence-informed use
  preparations: DoseRange[];
  contraindications: string[];
  interactions: string[]; // drug interaction summaries
  sustainability: Sustainability;
  harvest: string; // when and what part
  safety: SafetyLevel;
  related: string[]; // slugs
};

export type HerbalAction = {
  id: string;
  name: string;
  definition: string;
  exemplars: string[]; // herb slugs
};

export type ConstituentClass = {
  klass: Constituent["klass"];
  summary: string;
  examples: string;
};

export type Preparation = {
  slug: string;
  name: string;
  menstruum: string;
  ratio: string;
  time: string;
  yield: string;
  shelfLife: string;
  whenToChoose: string;
  steps: string[];
};

export type TraditionEntry = {
  id: Tradition;
  origin: string;
  diagnostic: string;
  signatureHerbs: string[]; // slugs
  teachers: string[];
  summary: string;
};

export type HerbalGoal = {
  id: string;
  name: string;
  summary: string;
  herbs: string[]; // slugs
  protocol: string[]; // 4-week or daily steps
  recipe: { name: string; ingredients: string[]; method: string };
};

export type Study = {
  id: string;
  herb: string; // slug
  title: string;
  journal: string;
  year: number;
  finding: string;
  dosing: string;
  bottomLine: string;
};

export type Teacher = {
  name: string;
  lineage: Tradition;
  knownFor: string;
  book: string;
};

export type School = {
  name: string;
  format: "In-person" | "Online" | "Hybrid";
  founded: number;
  focus: string;
  notable: string;
};

export type Book = {
  title: string;
  author: string;
  year: number;
  level: "Foundational" | "Intermediate" | "Advanced" | "Reference";
  why: string;
};

export type Interaction = {
  herb: string; // slug
  drug: string;
  mechanism: string;
  severity: "Major" | "Moderate" | "Minor";
  guidance: string;
};

export type AtRiskPlant = {
  name: string;
  status: Sustainability;
  region: string;
  alternative: string;
};

export type Rank = {
  id: string;
  name: string;
  color: string;
  required: { monographs: number; preparations: number };
  description: string;
};

// ---------- Herb monographs (60+) ----------

export const herbs: Herb[] = [
  {
    slug: "stinging-nettle",
    name: "Stinging Nettle",
    latin: "Urtica dioica",
    family: "Urticaceae",
    partsUsed: ["leaf", "root", "seed"],
    energetics: { temperature: "neutral", moisture: "drying", tone: "neutral" },
    taste: ["salty", "astringent", "sweet"],
    actions: ["nutritive", "alterative", "diuretic", "astringent", "anti-allergic"],
    affinities: ["kidneys", "blood", "joints", "skin"],
    constituents: [
      { name: "Chlorophyll", klass: "Volatile oil", role: "Mineralising green pigment." },
      { name: "Iron, calcium, magnesium", klass: "Polysaccharide", role: "Building blocks for blood and bone." },
      { name: "Quercetin", klass: "Flavonoid", role: "Stabilises mast cells; reduces histamine release." },
      { name: "Beta-sitosterol (root)", klass: "Salicylate", role: "Modulates SHBG and BPH symptoms." },
    ],
    traditional:
      "Used for centuries across Europe as a spring tonic to 'thin and brighten the blood' after winter. Wise Woman tradition treats nettle as the foundational long-infusion: a quart a day for hair, nails, energy, and resilient pregnancy.",
    modern:
      "Clinical work supports nettle leaf for seasonal allergic rhinitis (mast-cell stabilisation by quercetin) and nettle root for benign prostatic hyperplasia (LUTS reduction comparable to finasteride at much lower side-effect burden in some studies).",
    preparations: [
      { preparation: "Long infusion", amount: "1 oz dried leaf to 1 qt boiling water, steep 4–8 h" },
      { preparation: "Tincture (1:2, fresh)", amount: "2–5 mL, 3×/day for allergies" },
      { preparation: "Root tincture (1:5, 40%)", amount: "3–5 mL, 2×/day for BPH" },
    ],
    contraindications: ["Caution in those on diuretics or with severe kidney disease"],
    interactions: ["May potentiate diuretics", "May lower blood sugar — monitor in diabetics"],
    sustainability: "Abundant",
    harvest: "Leaf in spring before flowering; root in autumn; seeds in late summer.",
    safety: "Generally safe",
    related: ["dandelion", "oatstraw", "red-clover"],
  },
  {
    slug: "chamomile",
    name: "Chamomile",
    latin: "Matricaria chamomilla",
    family: "Asteraceae",
    partsUsed: ["flower"],
    energetics: { temperature: "warming", moisture: "drying", tone: "relaxing" },
    taste: ["bitter", "aromatic"],
    actions: ["nervine", "carminative", "anti-spasmodic", "anti-inflammatory", "vulnerary"],
    affinities: ["digestion", "nervous system", "skin"],
    constituents: [
      { name: "Apigenin", klass: "Flavonoid", role: "Partial agonist at the benzodiazepine site of GABAA receptors — anxiolysis without sedation." },
      { name: "Bisabolol", klass: "Terpene", role: "Anti-inflammatory and ulcer-protective." },
      { name: "Chamazulene", klass: "Volatile oil", role: "Blue colour in steam-distilled oil; potent anti-inflammatory." },
    ],
    traditional:
      "The 'mother of the gut' — given to fussy babies, anxious adults, and post-meal cramps for over 2,000 years. Considered a hot-tempered herb that paradoxically cools and soothes.",
    modern:
      "RCT evidence (Amsterdam et al., 2009 & 2016) supports standardised chamomile extract for generalised anxiety disorder, with effect sizes comparable to low-dose SSRIs and a much cleaner side-effect profile.",
    preparations: [
      { preparation: "Infusion", amount: "1 tbsp flowers / 8 oz water, covered, 10 min, 1–3 cups/day" },
      { preparation: "Tincture (1:2, fresh)", amount: "2–4 mL, up to 3×/day" },
      { preparation: "Standardised extract", amount: "220–1,500 mg/day for GAD (per Amsterdam protocol)" },
    ],
    contraindications: ["Asteraceae allergy (rare cross-reactivity with ragweed)"],
    interactions: ["May potentiate warfarin — monitor INR", "Additive with sedatives"],
    sustainability: "Abundant",
    harvest: "Pluck flowerheads at peak bloom mid-morning after dew has dried.",
    safety: "Generally safe",
    related: ["lemon-balm", "lavender", "passionflower"],
  },
  {
    slug: "peppermint",
    name: "Peppermint",
    latin: "Mentha × piperita",
    family: "Lamiaceae",
    partsUsed: ["leaf"],
    energetics: { temperature: "cooling", moisture: "drying", tone: "stimulating" },
    taste: ["pungent", "aromatic"],
    actions: ["carminative", "diaphoretic", "analgesic", "anti-spasmodic"],
    affinities: ["digestion", "head", "respiratory"],
    constituents: [
      { name: "Menthol", klass: "Volatile oil", role: "TRPM8 agonist — cooling sensation, smooth-muscle relaxation in gut." },
      { name: "Rosmarinic acid", klass: "Salicylate", role: "Antioxidant and anti-allergic." },
    ],
    traditional:
      "Pliny recommended a peppermint wreath for students. Eclectic physicians used the hot infusion to break a fever by the diaphoretic route.",
    modern:
      "Enteric-coated peppermint oil is a first-line botanical for IBS — multiple meta-analyses (Khanna 2014, Alammar 2019) confirm reductions in global IBS severity.",
    preparations: [
      { preparation: "Infusion", amount: "1 tbsp leaf / 8 oz water, covered, 5 min" },
      { preparation: "Enteric-coated oil", amount: "0.2 mL, 3×/day for IBS, 4–8 weeks" },
    ],
    contraindications: ["GERD (may relax LES and worsen reflux)", "Avoid concentrated oil internally in infants"],
    interactions: ["May increase bioavailability of cyclosporine and felodipine"],
    sustainability: "Abundant",
    harvest: "Cut just before flowering for maximum oil.",
    safety: "Generally safe",
    related: ["spearmint", "fennel", "ginger"],
  },
  {
    slug: "calendula",
    name: "Calendula",
    latin: "Calendula officinalis",
    family: "Asteraceae",
    partsUsed: ["flower"],
    energetics: { temperature: "warming", moisture: "drying", tone: "neutral" },
    taste: ["bitter", "salty"],
    actions: ["vulnerary", "lymphatic", "anti-inflammatory", "anti-microbial"],
    affinities: ["skin", "lymph", "digestion"],
    constituents: [
      { name: "Triterpene saponins", klass: "Saponin", role: "Wound healing and lymphatic decongestion." },
      { name: "Carotenoids", klass: "Terpene", role: "Tissue repair and antioxidant." },
      { name: "Resins", klass: "Resin", role: "Antimicrobial film over wounds." },
    ],
    traditional:
      "The premier first-aid flower of European folk medicine — every salve jar, every nursery shelf. 'Marigold to bring out what is hidden' — used for slow-healing wounds, swollen lymph, and stubborn skin conditions.",
    modern:
      "Cochrane-level evidence supports calendula cream for radiation-induced dermatitis (Pommier 2004 — superior to trolamine in breast cancer patients).",
    preparations: [
      { preparation: "Infused oil (solar)", amount: "Cover dried flowers with olive oil, 4 weeks sun" },
      { preparation: "Tincture (1:5, 70%)", amount: "2–4 mL, 3×/day or topically" },
      { preparation: "Salve", amount: "1 cup oil : 1 oz beeswax for ointment" },
    ],
    contraindications: ["Asteraceae allergy"],
    interactions: ["Theoretical sedative additive — minor"],
    sustainability: "Abundant",
    harvest: "Pinch flowerheads daily through the season — the more you pick, the more you get.",
    safety: "Generally safe",
    related: ["plantain", "comfrey", "yarrow"],
  },
  {
    slug: "dandelion",
    name: "Dandelion",
    latin: "Taraxacum officinale",
    family: "Asteraceae",
    partsUsed: ["leaf", "root", "flower"],
    energetics: { temperature: "cooling", moisture: "drying", tone: "stimulating" },
    taste: ["bitter", "sweet"],
    actions: ["bitter", "hepatic", "cholagogue", "diuretic", "alterative"],
    affinities: ["liver", "kidneys", "digestion"],
    constituents: [
      { name: "Sesquiterpene lactones", klass: "Bitter principle", role: "Stimulate bile flow and gastric secretions." },
      { name: "Inulin (root)", klass: "Polysaccharide", role: "Prebiotic; feeds bifidobacteria." },
      { name: "Potassium (leaf)", klass: "Polysaccharide", role: "Potassium-sparing diuresis — unlike pharmaceutical loop diuretics." },
    ],
    traditional:
      "'Pissenlit' — wet-the-bed — across French folk medicine. Eaten as bitter spring greens to 'wake the liver' after winter.",
    modern:
      "The leaf produces a measurable diuretic effect in humans (Clare 2009) without the potassium loss of furosemide. The root improves bile flow and the inulin acts as a prebiotic that selectively feeds bifidobacteria.",
    preparations: [
      { preparation: "Decoction (root)", amount: "1 tbsp / 2 cups water, simmer 20 min" },
      { preparation: "Tincture (1:2, fresh leaf)", amount: "3–5 mL, 3×/day" },
      { preparation: "Roasted root coffee", amount: "1 tsp / cup, drink freely" },
    ],
    contraindications: ["Bile duct obstruction"],
    interactions: ["May alter clearance of lithium and certain antibiotics — space dosing"],
    sustainability: "Abundant",
    harvest: "Leaf in spring; root in autumn after a frost concentrates inulin.",
    safety: "Generally safe",
    related: ["burdock", "yellow-dock", "milk-thistle"],
  },
  {
    slug: "lemon-balm",
    name: "Lemon Balm",
    latin: "Melissa officinalis",
    family: "Lamiaceae",
    partsUsed: ["leaf"],
    energetics: { temperature: "cooling", moisture: "drying", tone: "relaxing" },
    taste: ["sour", "aromatic"],
    actions: ["nervine", "anti-viral", "carminative", "thymoleptic"],
    affinities: ["nervous system", "digestion", "thyroid"],
    constituents: [
      { name: "Rosmarinic acid", klass: "Salicylate", role: "Antiviral against HSV; anxiolytic." },
      { name: "Citral, citronellal", klass: "Volatile oil", role: "Calming aromatic; anti-spasmodic." },
    ],
    traditional:
      "Paracelsus called it 'the elixir of life' and Carmelite nuns made it the basis of their 17th-century cordial. Used to lift the heart out of melancholy.",
    modern:
      "Topical lemon balm cream shortens HSV outbreak duration (Koytchev 1999). Standardised extract improves cognition and calm under stress (Kennedy 2002).",
    preparations: [
      { preparation: "Infusion (covered!)", amount: "1 tbsp fresh leaf / 8 oz water, 10 min" },
      { preparation: "Tincture (1:2, fresh)", amount: "3–5 mL, up to 4×/day" },
      { preparation: "Topical cream", amount: "1% extract on cold sores at first tingle" },
    ],
    contraindications: ["High doses may suppress thyroid in hyperthyroid states — discontinue if hypothyroid"],
    interactions: ["Additive with sedatives", "May reduce thyroid hormone activity at high dose"],
    sustainability: "Abundant",
    harvest: "Cut whole stems just before flowering; use fresh whenever possible.",
    safety: "Generally safe",
    related: ["chamomile", "passionflower", "tulsi"],
  },
  {
    slug: "lavender",
    name: "Lavender",
    latin: "Lavandula angustifolia",
    family: "Lamiaceae",
    partsUsed: ["flower"],
    energetics: { temperature: "cooling", moisture: "drying", tone: "relaxing" },
    taste: ["aromatic", "bitter"],
    actions: ["nervine", "carminative", "anti-spasmodic", "anti-microbial"],
    affinities: ["nervous system", "skin", "respiratory"],
    constituents: [
      { name: "Linalool", klass: "Volatile oil", role: "Anxiolytic via olfactory and limbic pathways." },
      { name: "Linalyl acetate", klass: "Volatile oil", role: "Sedative and analgesic." },
    ],
    traditional:
      "Strewn on the floors of medieval sickrooms and tucked in pillows for 'falling sickness' (epilepsy) and grief.",
    modern:
      "Silexan, a standardised oral lavender oil, has multiple RCTs supporting use in subsyndromal anxiety — non-inferiority to lorazepam without sedation or dependence (Kasper 2010).",
    preparations: [
      { preparation: "Infusion", amount: "1 tsp / 8 oz water, 10 min — strong taste, blend with chamomile" },
      { preparation: "Silexan oral oil", amount: "80 mg/day" },
      { preparation: "Inhalation", amount: "2 drops on a tissue at the bedside" },
    ],
    contraindications: ["Topical undiluted oil can cause sensitisation"],
    interactions: ["Additive with CNS depressants"],
    sustainability: "Abundant",
    harvest: "Cut spikes when half the flowers are open and dry slowly in the dark.",
    safety: "Generally safe",
    related: ["chamomile", "rose", "rosemary"],
  },
  {
    slug: "ginger",
    name: "Ginger",
    latin: "Zingiber officinale",
    family: "Zingiberaceae",
    partsUsed: ["rhizome"],
    energetics: { temperature: "warming", moisture: "drying", tone: "stimulating" },
    taste: ["pungent", "sweet"],
    actions: ["carminative", "diaphoretic", "anti-emetic", "circulatory stimulant", "anti-inflammatory"],
    affinities: ["digestion", "circulation", "respiratory"],
    constituents: [
      { name: "Gingerols, shogaols", klass: "Volatile oil", role: "5-HT3 antagonism — anti-emetic; COX/LOX inhibition." },
    ],
    traditional:
      "TCM uses fresh ginger (sheng jiang) to release the exterior in early colds and dried ginger (gan jiang) to warm a cold middle burner. Ayurveda calls it vishwabhesaj — 'the universal medicine'.",
    modern:
      "Strongest botanical evidence base for nausea — pregnancy (1 g/day equivalent to vitamin B6), chemotherapy-induced, and motion sickness. Dose-dependent reduction in osteoarthritis pain.",
    preparations: [
      { preparation: "Decoction (fresh)", amount: "Several thin slices in 2 cups water, simmer 15 min" },
      { preparation: "Powder capsule", amount: "250–1,000 mg up to 4×/day" },
      { preparation: "Tincture (1:5, 70%)", amount: "1–3 mL, up to 3×/day" },
    ],
    contraindications: ["Use lower doses with anticoagulants", "High doses may worsen gallstone colic"],
    interactions: ["Theoretical bleeding risk with warfarin/aspirin at high dose"],
    sustainability: "Abundant",
    harvest: "Lift rhizome 8–10 months after planting.",
    safety: "Generally safe",
    related: ["turmeric", "cardamom", "fennel"],
  },
  {
    slug: "turmeric",
    name: "Turmeric",
    latin: "Curcuma longa",
    family: "Zingiberaceae",
    partsUsed: ["rhizome"],
    energetics: { temperature: "warming", moisture: "drying", tone: "neutral" },
    taste: ["bitter", "pungent"],
    actions: ["anti-inflammatory", "hepatic", "alterative", "vulnerary"],
    affinities: ["liver", "joints", "blood", "skin"],
    constituents: [
      { name: "Curcumin", klass: "Bitter principle", role: "Inhibits NF-κB; broadly anti-inflammatory." },
      { name: "Turmerones", klass: "Volatile oil", role: "Improve curcumin absorption and contribute to activity." },
    ],
    traditional:
      "Ayurveda's premier blood-mover and liver protector — used in jaundice, skin disease, and post-natal recovery as 'haldi doodh' (golden milk).",
    modern:
      "Meta-analyses support curcumin (with absorption enhancers like piperine or phospholipid carriers) for osteoarthritis pain — comparable to ibuprofen with fewer GI events (Kuptniratsaikul 2014).",
    preparations: [
      { preparation: "Golden milk", amount: "1 tsp powder simmered in milk + black pepper + fat" },
      { preparation: "Standardised extract", amount: "500–1,000 mg/day with piperine or phospholipid" },
    ],
    contraindications: ["Bile duct obstruction", "Caution before surgery (bleeding)"],
    interactions: ["May potentiate anticoagulants and certain chemotherapies"],
    sustainability: "Abundant",
    harvest: "Lift rhizomes when leaves yellow.",
    safety: "Generally safe",
    related: ["ginger", "boswellia", "milk-thistle"],
  },
  {
    slug: "ashwagandha",
    name: "Ashwagandha",
    latin: "Withania somnifera",
    family: "Solanaceae",
    partsUsed: ["root"],
    energetics: { temperature: "warming", moisture: "moistening", tone: "relaxing" },
    taste: ["bitter", "sweet"],
    actions: ["adaptogen", "nervine", "rejuvenative", "anabolic"],
    affinities: ["nervous system", "endocrine", "musculoskeletal"],
    constituents: [
      { name: "Withanolides", klass: "Saponin", role: "Modulate HPA axis and cortisol output." },
    ],
    traditional:
      "The premier rasayana (rejuvenative) of Ayurveda for vata depletion: thin, anxious, sleep-poor, low libido. Its name means 'smell of the horse' — the strength it confers and the sulfurous smell of the root.",
    modern:
      "Multiple RCTs (Chandrasekhar 2012; Lopresti 2019) show 250–600 mg/day of standardised root extract reduces serum cortisol 20–30% and improves PSS scores in stressed adults.",
    preparations: [
      { preparation: "Powder (churna) in milk", amount: "1 tsp simmered in warm milk at night" },
      { preparation: "Standardised extract (KSM-66 or Sensoril)", amount: "300–600 mg/day" },
      { preparation: "Tincture (1:5, 50%)", amount: "3–5 mL, 2×/day" },
    ],
    contraindications: ["Avoid in pregnancy (emmenagogue at high dose)", "Hyperthyroidism — may raise T4", "Nightshade-sensitive autoimmunity"],
    interactions: ["Additive with thyroid hormone, sedatives, immunosuppressants"],
    sustainability: "Abundant",
    harvest: "Lift roots in late autumn from 1-year-old plants.",
    safety: "Use with care",
    related: ["tulsi", "shatavari", "rhodiola"],
  },
  {
    slug: "tulsi",
    name: "Tulsi (Holy Basil)",
    latin: "Ocimum sanctum",
    family: "Lamiaceae",
    partsUsed: ["leaf", "seed"],
    energetics: { temperature: "warming", moisture: "drying", tone: "stimulating" },
    taste: ["pungent", "bitter", "aromatic"],
    actions: ["adaptogen", "nervine", "diaphoretic", "carminative", "anti-microbial"],
    affinities: ["nervous system", "respiratory", "digestion"],
    constituents: [
      { name: "Eugenol", klass: "Volatile oil", role: "Anti-microbial and anti-inflammatory." },
      { name: "Ursolic acid", klass: "Terpene", role: "Anti-inflammatory and adaptogenic." },
    ],
    traditional:
      "The 'incomparable one' of Hindu households — planted at the doorstep, the leaves chewed daily for clarity, immunity, and devotion. Sacred to Vishnu.",
    modern:
      "Adaptogenic effects on cortisol and blood sugar; preliminary evidence for improved metabolic markers in T2DM (Cohen 2014 review).",
    preparations: [
      { preparation: "Infusion", amount: "1 tbsp / 8 oz water, 10 min, 1–3 cups/day" },
      { preparation: "Tincture (1:3, 50%)", amount: "2–4 mL, 2×/day" },
    ],
    contraindications: ["Caution in pregnancy", "May slow blood clotting"],
    interactions: ["Additive with hypoglycemics; monitor blood sugar"],
    sustainability: "Abundant",
    harvest: "Pinch tops regularly to keep leafy and prevent woody flowering.",
    safety: "Generally safe",
    related: ["ashwagandha", "rhodiola", "lemon-balm"],
  },
  {
    slug: "rhodiola",
    name: "Rhodiola",
    latin: "Rhodiola rosea",
    family: "Crassulaceae",
    partsUsed: ["root"],
    energetics: { temperature: "cooling", moisture: "drying", tone: "stimulating"
    },
    taste: ["bitter", "astringent"],
    actions: ["adaptogen", "nootropic", "anti-fatigue"],
    affinities: ["nervous system", "endocrine"],
    constituents: [
      { name: "Rosavins", klass: "Glycoside", role: "Marker compounds; modulate stress response." },
      { name: "Salidroside", klass: "Glycoside", role: "Active anti-fatigue and neuroprotective." },
    ],
    traditional:
      "Used by Siberian and Scandinavian peoples to endure long winters and arduous labour; given to soldiers and athletes in Soviet research programmes.",
    modern:
      "RCTs show acute reductions in mental fatigue and improved cognitive performance under stress (Olsson 2009). Standardised SHR-5 extract is the most studied.",
    preparations: [
      { preparation: "Standardised extract (SHR-5, 3% rosavins, 1% salidroside)", amount: "200–400 mg/day in the morning" },
      { preparation: "Tincture (1:5, 60%)", amount: "2–4 mL in the morning" },
    ],
    contraindications: ["Bipolar disorder (can trigger hypomania)", "Avoid late in the day — can be activating"],
    interactions: ["Additive with stimulants"],
    sustainability: "At-Risk",
    harvest: "Cultivated; wild populations are pressured — buy organic-cultivated.",
    safety: "Use with care",
    related: ["ashwagandha", "tulsi", "ginseng"],
  },
  {
    slug: "ginseng",
    name: "Asian Ginseng",
    latin: "Panax ginseng",
    family: "Araliaceae",
    partsUsed: ["root"],
    energetics: { temperature: "warming", moisture: "moistening", tone: "stimulating" },
    taste: ["sweet", "bitter"],
    actions: ["adaptogen", "tonic", "nootropic"],
    affinities: ["spleen", "lung", "endocrine"],
    constituents: [
      { name: "Ginsenosides (Rb1, Rg1)", klass: "Saponin", role: "Multi-pathway adaptogenic; modulate HPA axis and immune signalling." },
    ],
    traditional:
      "The premier qi tonic of TCM — given to elders and the depleted; not for the young, hot, or stressed-but-strong.",
    modern:
      "Modest improvements in fatigue (Kim 2013) and glucose control. Variable response by ginsenoside ratio, age of root, and processing (white vs red).",
    preparations: [
      { preparation: "Decoction (sliced root)", amount: "3–9 g simmered 30 min" },
      { preparation: "Standardised extract (G115)", amount: "200 mg/day" },
    ],
    contraindications: ["Hypertension, insomnia, hot constitutions", "Avoid in pregnancy"],
    interactions: ["MAOIs, anticoagulants, hypoglycemics"],
    sustainability: "To-Watch",
    harvest: "Cultivated 5–7 years before harvest.",
    safety: "Use with care",
    related: ["ashwagandha", "rhodiola", "astragalus"],
  },
  {
    slug: "astragalus",
    name: "Astragalus",
    latin: "Astragalus membranaceus",
    family: "Fabaceae",
    partsUsed: ["root"],
    energetics: { temperature: "warming", moisture: "moistening", tone: "neutral" },
    taste: ["sweet"],
    actions: ["immune-tonic", "adaptogen", "diuretic"],
    affinities: ["immune system", "lungs", "spleen"],
    constituents: [
      { name: "Astragaloside IV", klass: "Saponin", role: "Telomerase activation; immunomodulation." },
      { name: "Polysaccharides", klass: "Polysaccharide", role: "Activate macrophages and NK cells." },
    ],
    traditional:
      "Huang Qi — 'yellow leader' — the premier qi tonic for the wei qi (defensive layer). Eaten daily as a slice in soup all winter.",
    modern:
      "Used adjunctively in oncology in China to mitigate chemotherapy-induced immunosuppression; preliminary evidence supports use in chronic fatigue and frequent URIs.",
    preparations: [
      { preparation: "Decoction (root slices)", amount: "9–30 g in soup, simmered 30+ min" },
      { preparation: "Tincture (1:5, 30%)", amount: "3–5 mL, 3×/day" },
    ],
    contraindications: ["Acute infection (use only between flares)", "Autoimmune disease — practitioner guidance"],
    interactions: ["Immunosuppressants — antagonistic"],
    sustainability: "Abundant",
    harvest: "Cultivated; lift roots in 4th-year autumn.",
    safety: "Use with care",
    related: ["reishi", "ginseng", "elderberry"],
  },
  {
    slug: "reishi",
    name: "Reishi",
    latin: "Ganoderma lucidum",
    family: "Ganodermataceae",
    partsUsed: ["fruiting body"],
    energetics: { temperature: "neutral", moisture: "neutral", tone: "relaxing" },
    taste: ["bitter"],
    actions: ["adaptogen", "immune-modulator", "nervine", "cardio-tonic"],
    affinities: ["immune system", "heart", "shen (spirit)"],
    constituents: [
      { name: "Triterpenes (ganoderic acids)", klass: "Terpene", role: "Alcohol-soluble; anti-inflammatory and hepatoprotective." },
      { name: "Beta-glucans", klass: "Polysaccharide", role: "Water-soluble; activate dectin-1 and complement." },
    ],
    traditional:
      "'Mushroom of immortality' — Daoists used it to cultivate shen (spirit) and longevity. Reserved for the elite in classical China.",
    modern:
      "Dual-extracted reishi shows immune-modulating and sleep-improving effects in several small trials; growing evidence as adjunctive in cancer fatigue.",
    preparations: [
      { preparation: "Dual extract", amount: "Decoct chips in water, then macerate marc in alcohol; combine 2:1" },
      { preparation: "Hot water extract", amount: "1–3 g powder/day" },
    ],
    contraindications: ["Caution with anticoagulants", "May lower blood pressure"],
    interactions: ["Anticoagulants, hypotensives, immunosuppressants"],
    sustainability: "Abundant",
    harvest: "Cultivated on logs or sawdust; hardwood reishi preferred.",
    safety: "Generally safe",
    related: ["lions-mane", "chaga", "astragalus"],
  },
  {
    slug: "lions-mane",
    name: "Lion's Mane",
    latin: "Hericium erinaceus",
    family: "Hericiaceae",
    partsUsed: ["fruiting body"],
    energetics: { temperature: "neutral", moisture: "moistening", tone: "neutral" },
    taste: ["sweet"],
    actions: ["nootropic", "neuroprotective", "gut-healing"],
    affinities: ["nervous system", "digestion"],
    constituents: [
      { name: "Hericenones", klass: "Terpene", role: "Cross blood-brain barrier; stimulate NGF synthesis." },
      { name: "Erinacines", klass: "Terpene", role: "From mycelium; potent NGF inducer." },
    ],
    traditional:
      "Eaten as a delicacy and used in TCM for gastric ulcers and 'cultivating the mind'.",
    modern:
      "Mori 2009 RCT in Japan showed cognitive improvement in mild cognitive impairment with 3 g/day fruiting body powder for 16 weeks; benefit reversed after stopping.",
    preparations: [
      { preparation: "Hot water extract", amount: "1–3 g/day" },
      { preparation: "Dual extract", amount: "500–1,500 mg/day standardised" },
    ],
    contraindications: ["Mushroom allergy"],
    interactions: ["Theoretical additive with anticoagulants"],
    sustainability: "Abundant",
    harvest: "Cultivated; wild forage in autumn on hardwood.",
    safety: "Generally safe",
    related: ["reishi", "rhodiola", "bacopa"],
  },
  {
    slug: "elderberry",
    name: "Elderberry",
    latin: "Sambucus nigra",
    family: "Adoxaceae",
    partsUsed: ["berry", "flower"],
    energetics: { temperature: "neutral", moisture: "neutral", tone: "neutral" },
    taste: ["sour", "sweet"],
    actions: ["anti-viral", "diaphoretic (flower)", "immune-modulator"],
    affinities: ["immune system", "respiratory"],
    constituents: [
      { name: "Anthocyanins", klass: "Flavonoid", role: "Inhibit viral hemagglutinin." },
      { name: "Lectins", klass: "Glycoside", role: "Block viral entry." },
    ],
    traditional:
      "The 'medicine chest of the country people' across Europe — flower for fevers, berry for winter syrup.",
    modern:
      "Tiralongo 2016 RCT showed reduced cold duration and severity in air travellers with standardised extract. The flower is a reliable diaphoretic for hot, dry fevers.",
    preparations: [
      { preparation: "Berry syrup", amount: "1 tbsp 2–4×/day at first sign of cold" },
      { preparation: "Flower infusion", amount: "1 tbsp / cup hot water during fever" },
    ],
    contraindications: ["Raw berries are emetic — always cook", "Bark and unripe berries are toxic"],
    interactions: ["Theoretical with immunosuppressants"],
    sustainability: "Abundant",
    harvest: "Flowers in early summer; berries when fully purple-black and stems turn red.",
    safety: "Generally safe",
    related: ["echinacea", "yarrow", "thyme"],
  },
  {
    slug: "echinacea",
    name: "Echinacea",
    latin: "Echinacea purpurea",
    family: "Asteraceae",
    partsUsed: ["aerial parts", "root"],
    energetics: { temperature: "cooling", moisture: "neutral", tone: "stimulating" },
    taste: ["pungent", "bitter"],
    actions: ["immune-stimulant", "alterative", "anti-microbial", "lymphatic"],
    affinities: ["immune system", "lymph", "skin"],
    constituents: [
      { name: "Alkylamides", klass: "Bitter principle", role: "Cause the characteristic tongue tingle; modulate cannabinoid CB2 receptors." },
      { name: "Cichoric acid", klass: "Salicylate", role: "Phagocytosis stimulation." },
      { name: "Polysaccharides", klass: "Polysaccharide", role: "Macrophage activation (water-soluble fraction)." },
    ],
    traditional:
      "Plains medicine across what is now the central US — used for snakebite, septicemia, and any deep-blood infection. Brought into Eclectic medicine by John King and made famous by Lloyd Brothers.",
    modern:
      "Acute high-dose use at first sign of cold reduces duration ~1.4 days (Cochrane review). Continuous low-dose use shows little benefit — pulse it.",
    preparations: [
      { preparation: "Tincture (1:2, fresh)", amount: "60 drops every 2 h for 48 h, then 4×/day" },
      { preparation: "Decoction (root)", amount: "1 tsp / cup, simmer 15 min" },
    ],
    contraindications: ["Asteraceae allergy", "Avoid continuous long-term use in autoimmune conditions"],
    interactions: ["Theoretical with immunosuppressants"],
    sustainability: "To-Watch",
    harvest: "Buy organic-cultivated; wild E. angustifolia is pressured.",
    safety: "Generally safe",
    related: ["elderberry", "yarrow", "garlic"],
  },
  {
    slug: "milk-thistle",
    name: "Milk Thistle",
    latin: "Silybum marianum",
    family: "Asteraceae",
    partsUsed: ["seed"],
    energetics: { temperature: "cooling", moisture: "neutral", tone: "neutral" },
    taste: ["bitter"],
    actions: ["hepatic", "hepatoprotective", "galactagogue"],
    affinities: ["liver", "lactation"],
    constituents: [
      { name: "Silymarin (silybin, silydianin, silychristin)", klass: "Flavonoid", role: "Stabilises hepatocyte membranes; antidote in Amanita poisoning." },
    ],
    traditional:
      "Used for centuries to 'open obstructions of the liver and spleen' — and as a galactagogue per the doctrine of signatures (white milk-stained leaves).",
    modern:
      "Strong evidence for hepatoprotection in Amanita phalloides poisoning (IV silibinin is standard of care in Europe). Modest benefit in chronic liver disease and chemotherapy support.",
    preparations: [
      { preparation: "Crushed seed in food", amount: "1–2 tsp/day on cereal or in smoothies" },
      { preparation: "Standardised extract (70–80% silymarin)", amount: "140–280 mg, 3×/day" },
    ],
    contraindications: ["Asteraceae allergy", "Theoretical estrogenic effect — caution in hormone-sensitive cancers"],
    interactions: ["May reduce metabolism of certain drugs via CYP3A4 inhibition"],
    sustainability: "Abundant",
    harvest: "Seed heads when downy fluff emerges.",
    safety: "Generally safe",
    related: ["dandelion", "burdock", "schisandra"],
  },
  {
    slug: "valerian",
    name: "Valerian",
    latin: "Valeriana officinalis",
    family: "Caprifoliaceae",
    partsUsed: ["root"],
    energetics: { temperature: "warming", moisture: "drying", tone: "relaxing" },
    taste: ["bitter", "pungent"],
    actions: ["hypnotic", "nervine", "anti-spasmodic"],
    affinities: ["nervous system", "musculoskeletal"],
    constituents: [
      { name: "Valerenic acid", klass: "Terpene", role: "Allosteric modulator at GABAA; inhibits GABA breakdown." },
      { name: "Iridoids (valepotriates)", klass: "Iridoid", role: "Sedative; degrade in storage." },
    ],
    traditional:
      "The 'phu' of Galen — used for centuries for nervous insomnia, hysterical states, and gut cramps.",
    modern:
      "Bent 2006 meta-analysis: modest improvement in subjective sleep quality. Best for sleep-onset insomnia driven by mental hyperarousal.",
    preparations: [
      { preparation: "Tincture (1:5, 70%)", amount: "3–5 mL, 30 min before bed" },
      { preparation: "Standardised extract", amount: "300–600 mg, 30–60 min before bed" },
    ],
    contraindications: ["Paradoxical agitation in ~10% — discontinue if so", "Caution with sedatives"],
    interactions: ["Additive with benzodiazepines, alcohol, opioids"],
    sustainability: "Abundant",
    harvest: "Lift roots from 2-year-old plants in autumn.",
    safety: "Generally safe",
    related: ["passionflower", "skullcap", "hops"],
  },
  {
    slug: "passionflower",
    name: "Passionflower",
    latin: "Passiflora incarnata",
    family: "Passifloraceae",
    partsUsed: ["aerial parts"],
    energetics: { temperature: "cooling", moisture: "moistening", tone: "relaxing" },
    taste: ["bitter"],
    actions: ["nervine", "anxiolytic", "hypnotic"],
    affinities: ["nervous system"],
    constituents: [
      { name: "Chrysin, vitexin", klass: "Flavonoid", role: "Modulate GABA and benzodiazepine receptors." },
    ],
    traditional:
      "Adopted from indigenous practice in the southeastern US; named for the passion of Christ from the flower's anatomy. A favourite of Eclectic physicians for the 'restless and ruminative'.",
    modern:
      "Akhondzadeh 2001: equivalent to oxazepam for GAD with less impairment in working performance. Useful when anxiety loops keep sleep at bay.",
    preparations: [
      { preparation: "Tincture (1:5, 50%)", amount: "2–4 mL, 3×/day or 5 mL at bedtime" },
      { preparation: "Infusion", amount: "1 tbsp / 8 oz water, 10 min" },
    ],
    contraindications: ["Pregnancy (uterotonic potential)", "Caution with sedatives"],
    interactions: ["Additive with CNS depressants"],
    sustainability: "Abundant",
    harvest: "Whole vine in flower; dry quickly.",
    safety: "Generally safe",
    related: ["valerian", "skullcap", "lemon-balm"],
  },
  {
    slug: "skullcap",
    name: "Skullcap",
    latin: "Scutellaria lateriflora",
    family: "Lamiaceae",
    partsUsed: ["aerial parts"],
    energetics: { temperature: "cooling", moisture: "drying", tone: "relaxing" },
    taste: ["bitter"],
    actions: ["nervine trophorestorative", "anti-spasmodic"],
    affinities: ["nervous system"],
    constituents: [
      { name: "Baicalin, baicalein", klass: "Flavonoid", role: "GABA modulation; neuroprotection." },
    ],
    traditional:
      "Eclectic 'trophorestorative' for the worn-out nervous system — different from valerian's heavier sedation. The herb to take when the wires feel frayed.",
    modern:
      "Brock 2014 RCT: standardised extract reduced anxiety scores without cognitive impairment.",
    preparations: [
      { preparation: "Tincture (1:2, fresh)", amount: "2–4 mL, 3–5×/day" },
      { preparation: "Infusion", amount: "1 tbsp / 8 oz water, 10 min" },
    ],
    contraindications: ["Use S. lateriflora; some commercial 'skullcap' has been adulterated with hepatotoxic germander historically"],
    interactions: ["Additive with sedatives"],
    sustainability: "To-Watch",
    harvest: "Cut whole stems in flower; dry in shade.",
    safety: "Generally safe",
    related: ["passionflower", "lemon-balm", "oats"],
  },
  {
    slug: "oatstraw",
    name: "Oatstraw / Milky Oats",
    latin: "Avena sativa",
    family: "Poaceae",
    partsUsed: ["aerial parts (oatstraw)", "milky seed"],
    energetics: { temperature: "neutral", moisture: "moistening", tone: "relaxing" },
    taste: ["sweet"],
    actions: ["nervine trophorestorative", "nutritive"],
    affinities: ["nervous system", "bones"],
    constituents: [
      { name: "Avenacosides", klass: "Saponin", role: "Mild adaptogenic effect on nervous system." },
      { name: "Silica, calcium, magnesium", klass: "Polysaccharide", role: "Mineralises connective tissue." },
    ],
    traditional:
      "Wise Woman tradition pairs oatstraw with nettle as the daily long infusion. Milky oat tincture is the herb for nervous-system burnout.",
    modern:
      "Limited but supportive trial evidence; cohort and clinical observation support use in stress-related exhaustion.",
    preparations: [
      { preparation: "Long infusion (oatstraw)", amount: "1 oz / 1 qt boiling water, 4–8 h" },
      { preparation: "Tincture (1:2, fresh milky seed)", amount: "2–4 mL, 3×/day for nervous depletion" },
    ],
    contraindications: ["Celiac disease — may be cross-contaminated"],
    interactions: ["None notable"],
    sustainability: "Abundant",
    harvest: "Aerial parts pre-flower; seed when 'milky' stage (squeeze yields white drop)",
    safety: "Generally safe",
    related: ["nettle", "skullcap", "ashwagandha"],
  },
  {
    slug: "hawthorn",
    name: "Hawthorn",
    latin: "Crataegus monogyna / oxyacantha",
    family: "Rosaceae",
    partsUsed: ["leaf", "flower", "berry"],
    energetics: { temperature: "neutral", moisture: "neutral", tone: "neutral" },
    taste: ["sour", "sweet", "astringent"],
    actions: ["cardio-tonic", "hypotensive", "vasodilator", "trophorestorative"],
    affinities: ["heart", "vasculature"],
    constituents: [
      { name: "OPCs (oligomeric proanthocyanidins)", klass: "OPC", role: "Strengthen capillary integrity; antioxidant." },
      { name: "Vitexin glycosides", klass: "Flavonoid", role: "Positive inotropic effect." },
    ],
    traditional:
      "Considered the herb of the heart — physical and emotional. Sat-with grief in many European folk traditions.",
    modern:
      "SPICE trial (Holubarsch 2008) and others show benefit in NYHA class II–III heart failure as adjunct. Standardised leaf-and-flower extract is the most studied.",
    preparations: [
      { preparation: "Standardised extract (WS 1442)", amount: "450 mg, 2×/day" },
      { preparation: "Tincture (1:5, 60%)", amount: "3–5 mL, 3×/day, long term" },
    ],
    contraindications: ["May potentiate cardiac glycosides — coordinate with cardiologist"],
    interactions: ["Digoxin, beta-blockers, antihypertensives"],
    sustainability: "Abundant",
    harvest: "Flower in spring; berries in autumn.",
    safety: "Use with care",
    related: ["motherwort", "linden", "yarrow"],
  },
  {
    slug: "motherwort",
    name: "Motherwort",
    latin: "Leonurus cardiaca",
    family: "Lamiaceae",
    partsUsed: ["aerial parts"],
    energetics: { temperature: "cooling", moisture: "drying", tone: "relaxing" },
    taste: ["bitter"],
    actions: ["nervine", "cardio-tonic", "emmenagogue", "thyroid-supportive"],
    affinities: ["heart", "uterus", "thyroid"],
    constituents: [
      { name: "Leonurine", klass: "Alkaloid", role: "Mild hypotensive; uterine tonic." },
      { name: "Iridoids", klass: "Iridoid", role: "Bitter and nervine." },
    ],
    traditional:
      "'Lion-hearted' herb — given to those facing fear with composure. Used by midwives for postpartum cramps and anxious-tired hearts.",
    modern:
      "Evidence base is preliminary but supportive for hyperthyroid palpitations and anxiety with cardiac symptoms.",
    preparations: [
      { preparation: "Tincture (1:2, fresh)", amount: "2–4 mL up to 4×/day" },
    ],
    contraindications: ["Pregnancy (emmenagogue)", "Heavy menses"],
    interactions: ["Sedatives, antithyroid medications"],
    sustainability: "Abundant",
    harvest: "Aerial parts in early flower.",
    safety: "Use with care",
    related: ["hawthorn", "lemon-balm", "linden"],
  },
  {
    slug: "vitex",
    name: "Vitex (Chasteberry)",
    latin: "Vitex agnus-castus",
    family: "Lamiaceae",
    partsUsed: ["berry"],
    energetics: { temperature: "neutral", moisture: "drying", tone: "neutral" },
    taste: ["pungent"],
    actions: ["hormone-modulator", "emmenagogue", "galactagogue"],
    affinities: ["hypothalamic-pituitary axis", "female reproductive"],
    constituents: [
      { name: "Iridoids (agnuside)", klass: "Iridoid", role: "Modulate dopamine D2 receptors → reduce prolactin." },
    ],
    traditional:
      "Used by monks (the 'monk's pepper') for chastity; modern use centres on female reproductive support.",
    modern:
      "Schellenberg 2001 RCT supports vitex for PMS. Strong evidence for cyclic mastalgia and luteal-phase deficiency.",
    preparations: [
      { preparation: "Standardised extract", amount: "20–40 mg/day, taken in the morning, 3+ months for full effect" },
      { preparation: "Tincture (1:5, 60%)", amount: "1–3 mL in the morning" },
    ],
    contraindications: ["Pregnancy (after first trimester unclear)", "Combined hormonal contraception (may alter)"],
    interactions: ["Dopamine antagonists (antipsychotics) — antagonistic"],
    sustainability: "Abundant",
    harvest: "Berries in autumn when ripe.",
    safety: "Use with care",
    related: ["shatavari", "wild-yam", "dong-quai"],
  },
  {
    slug: "shatavari",
    name: "Shatavari",
    latin: "Asparagus racemosus",
    family: "Asparagaceae",
    partsUsed: ["root"],
    energetics: { temperature: "cooling", moisture: "moistening", tone: "neutral" },
    taste: ["sweet", "bitter"],
    actions: ["adaptogen", "demulcent", "rejuvenative", "galactagogue"],
    affinities: ["female reproductive", "GI mucosa"],
    constituents: [
      { name: "Steroidal saponins (shatavarins)", klass: "Saponin", role: "Phytoestrogenic adaptogen; nourish reproductive tissue." },
    ],
    traditional:
      "The 'queen of herbs' in Ayurveda — 'she who has 100 husbands' — given across the female lifecycle for fertility, lactation, and menopause.",
    modern:
      "Promising small trials in lactation and menopause; mucilage offers genuine demulcent action in dry guts.",
    preparations: [
      { preparation: "Powder in milk", amount: "1 tsp simmered in milk + ghee + honey, daily" },
      { preparation: "Tincture (1:5, 50%)", amount: "3–5 mL, 2×/day" },
    ],
    contraindications: ["Hormone-sensitive cancers — practitioner only"],
    interactions: ["Diuretics (mild additive)"],
    sustainability: "At-Risk",
    harvest: "Cultivated; wild populations in India are pressured.",
    safety: "Use with care",
    related: ["vitex", "wild-yam", "ashwagandha"],
  },
  {
    slug: "wild-yam",
    name: "Wild Yam",
    latin: "Dioscorea villosa",
    family: "Dioscoreaceae",
    partsUsed: ["root"],
    energetics: { temperature: "cooling", moisture: "moistening", tone: "relaxing" },
    taste: ["bitter", "sweet"],
    actions: ["anti-spasmodic", "anti-inflammatory", "cholagogue"],
    affinities: ["smooth muscle", "joints", "biliary"],
    constituents: [
      { name: "Diosgenin", klass: "Saponin", role: "Anti-inflammatory; precursor used industrially to synthesise progesterone." },
    ],
    traditional:
      "Eclectic 'colic root' — the herb for bilious cramping, gallbladder colic, and dysmenorrhea.",
    modern:
      "Note: the body cannot convert diosgenin into progesterone — that conversion is a lab process. Use wild yam for anti-inflammatory and antispasmodic action, not as a 'natural progesterone'.",
    preparations: [
      { preparation: "Tincture (1:5, 50%)", amount: "2–4 mL, 3×/day" },
      { preparation: "Decoction", amount: "1 tsp / cup, simmer 15 min" },
    ],
    contraindications: ["Pregnancy", "Hormone-sensitive cancers (theoretical)"],
    interactions: ["Hormone therapies"],
    sustainability: "At-Risk",
    harvest: "Buy organic-cultivated; wild populations in Appalachia are pressured.",
    safety: "Use with care",
    related: ["cramp-bark", "vitex", "shatavari"],
  },
  {
    slug: "cramp-bark",
    name: "Cramp Bark",
    latin: "Viburnum opulus",
    family: "Adoxaceae",
    partsUsed: ["bark"],
    energetics: { temperature: "warming", moisture: "drying", tone: "relaxing" },
    taste: ["bitter", "astringent"],
    actions: ["anti-spasmodic", "uterine relaxant"],
    affinities: ["uterus", "skeletal muscle"],
    constituents: [
      { name: "Scopoletin", klass: "Bitter principle", role: "Smooth-muscle relaxant." },
    ],
    traditional:
      "Used by indigenous peoples of North America and adopted by Eclectics for menstrual cramps, threatened miscarriage, and gut spasm.",
    modern:
      "Limited modern trials; historic empirical use is robust.",
    preparations: [
      { preparation: "Decoction", amount: "1 tsp / cup, simmer 15 min, 1 cup every 3 h during cramps" },
      { preparation: "Tincture (1:5, 50%)", amount: "3–5 mL every 1–2 h acutely" },
    ],
    contraindications: ["Use only true Viburnum opulus — confused with V. prunifolium"],
    interactions: ["Additive with antispasmodics"],
    sustainability: "To-Watch",
    harvest: "Bark in spring as sap rises; sustainable practice — do not girdle.",
    safety: "Generally safe",
    related: ["wild-yam", "ginger", "valerian"],
  },
  {
    slug: "yarrow",
    name: "Yarrow",
    latin: "Achillea millefolium",
    family: "Asteraceae",
    partsUsed: ["aerial parts"],
    energetics: { temperature: "cooling internally / warming peripherally", moisture: "drying", tone: "neutral" },
    taste: ["bitter", "pungent", "astringent"],
    actions: ["diaphoretic", "styptic", "anti-microbial", "vulnerary", "circulatory normaliser"],
    affinities: ["circulation", "skin", "respiratory"],
    constituents: [
      { name: "Sesquiterpene lactones", klass: "Bitter principle", role: "Bitter and diaphoretic." },
      { name: "Chamazulene", klass: "Volatile oil", role: "Anti-inflammatory blue oil from steam distillation." },
    ],
    traditional:
      "Achilles' herb for battlefield wounds. Folk diaphoretic for fever — opens pores in hot fever, dilates capillaries when cold and stuck.",
    modern:
      "Hemostatic and antimicrobial activity supported in vitro; clinical use is largely traditional.",
    preparations: [
      { preparation: "Hot infusion", amount: "1 tbsp / 8 oz, covered, 10 min — for fever" },
      { preparation: "Tincture (1:2, fresh)", amount: "2–4 mL, 3×/day" },
    ],
    contraindications: ["Pregnancy", "Asteraceae allergy"],
    interactions: ["Anticoagulants (theoretical)"],
    sustainability: "Abundant",
    harvest: "Whole stems in flower.",
    safety: "Generally safe",
    related: ["elderflower", "peppermint", "calendula"],
  },
  {
    slug: "linden",
    name: "Linden",
    latin: "Tilia europaea",
    family: "Malvaceae",
    partsUsed: ["flower"],
    energetics: { temperature: "cooling", moisture: "moistening", tone: "relaxing" },
    taste: ["sweet", "aromatic"],
    actions: ["nervine", "diaphoretic", "demulcent", "cardio-tonic"],
    affinities: ["nervous system", "heart", "vasculature"],
    constituents: [
      { name: "Mucilage", klass: "Mucilage", role: "Soothes inflamed mucous membranes." },
      { name: "Quercetin and kaempferol", klass: "Flavonoid", role: "Vascular protective." },
    ],
    traditional:
      "The 'tilleul' of French nightcap teas — sweet, gentle, and reliably calming. Folk diaphoretic for hot, dry, anxious fevers in children.",
    modern:
      "Traditional indications are well-supported by phytochemistry; clinical trial base is small.",
    preparations: [
      { preparation: "Infusion", amount: "1 tbsp / 8 oz, covered, 10 min" },
    ],
    contraindications: ["Cardiac patients on glycosides — caution"],
    interactions: ["Mild additive with sedatives"],
    sustainability: "Abundant",
    harvest: "Flowers with their bract just as they open.",
    safety: "Generally safe",
    related: ["chamomile", "lemon-balm", "yarrow"],
  },
  {
    slug: "rose",
    name: "Rose",
    latin: "Rosa damascena / canina",
    family: "Rosaceae",
    partsUsed: ["petal", "hip"],
    energetics: { temperature: "cooling", moisture: "moistening", tone: "neutral" },
    taste: ["astringent", "sweet"],
    actions: ["nervine", "astringent", "cardio-tonic", "anti-inflammatory"],
    affinities: ["heart (emotional)", "skin", "gut mucosa"],
    constituents: [
      { name: "Vitamin C (hip)", klass: "Polysaccharide", role: "Connective tissue support." },
      { name: "Tannins", klass: "Tannin", role: "Astringent on inflamed tissue." },
    ],
    traditional:
      "The Sufi heart-opener; the Ayurvedic balancer of pitta. Used for heartbreak, irritable skin, and hot inflamed gut.",
    modern:
      "Hip extract reduces osteoarthritis pain (Christensen 2008 meta-analysis). Petal infusions offer real astringent and mild sedative action.",
    preparations: [
      { preparation: "Petal infusion", amount: "1 tbsp / 8 oz, 10 min" },
      { preparation: "Hip powder", amount: "5–10 g/day for OA" },
    ],
    contraindications: ["None notable"],
    interactions: ["None notable"],
    sustainability: "Abundant",
    harvest: "Petals at peak fragrance, mid-morning; hips after a frost.",
    safety: "Generally safe",
    related: ["hawthorn", "motherwort", "lemon-balm"],
  },
  {
    slug: "marshmallow",
    name: "Marshmallow",
    latin: "Althaea officinalis",
    family: "Malvaceae",
    partsUsed: ["root", "leaf"],
    energetics: { temperature: "cooling", moisture: "moistening", tone: "neutral" },
    taste: ["sweet"],
    actions: ["demulcent", "vulnerary", "expectorant", "diuretic"],
    affinities: ["GI mucosa", "respiratory", "urinary"],
    constituents: [
      { name: "Mucilage", klass: "Mucilage", role: "Forms a film over irritated mucosa." },
    ],
    traditional:
      "Used since ancient Egypt for inflamed and dry tissues — coughs, sore throats, irritable bowel, and burns.",
    modern:
      "Marshmallow root cold-macerate provides genuine soothing action where dryness and inflammation coexist.",
    preparations: [
      { preparation: "Cold maceration (root)", amount: "1 tbsp shredded root in 1 cup cool water, 4–8 h" },
      { preparation: "Powder slurry", amount: "1 tsp powder in water for acute reflux/IBS" },
    ],
    contraindications: ["May reduce absorption of medications taken at the same time — separate by 2 h"],
    interactions: ["May slow absorption of oral drugs"],
    sustainability: "Abundant",
    harvest: "Lift roots in autumn from 2-year plants.",
    safety: "Generally safe",
    related: ["slippery-elm", "licorice", "calendula"],
  },
  {
    slug: "slippery-elm",
    name: "Slippery Elm",
    latin: "Ulmus rubra",
    family: "Ulmaceae",
    partsUsed: ["inner bark"],
    energetics: { temperature: "neutral", moisture: "moistening", tone: "neutral" },
    taste: ["sweet"],
    actions: ["demulcent", "nutritive", "vulnerary"],
    affinities: ["GI mucosa"],
    constituents: [
      { name: "Mucilage", klass: "Mucilage", role: "Soothes and coats inflamed gut lining." },
    ],
    traditional:
      "Indigenous peoples of eastern North America used it as a survival food and gut healer. Added to gruels for the convalescent.",
    modern:
      "Limited clinical trials but reliable empirical use for IBS and reflux.",
    preparations: [
      { preparation: "Powder slurry", amount: "1 tsp in warm water 15 min before meals" },
      { preparation: "Lozenge", amount: "As needed for sore throat" },
    ],
    contraindications: ["May slow absorption of medications — separate by 2 h"],
    interactions: ["May reduce drug absorption"],
    sustainability: "At-Risk",
    harvest: "Sustainability concern — substitute marshmallow whenever possible. Buy only certified-cultivated.",
    safety: "Generally safe",
    related: ["marshmallow", "licorice", "plantain"],
  },
  {
    slug: "licorice",
    name: "Licorice",
    latin: "Glycyrrhiza glabra",
    family: "Fabaceae",
    partsUsed: ["root"],
    energetics: { temperature: "neutral", moisture: "moistening", tone: "neutral" },
    taste: ["sweet"],
    actions: ["demulcent", "anti-inflammatory", "expectorant", "adrenal-restorative", "harmoniser"],
    affinities: ["GI mucosa", "respiratory", "adrenals"],
    constituents: [
      { name: "Glycyrrhizin", klass: "Saponin", role: "Inhibits 11-β-HSD2 → cortisol-sparing; high doses cause pseudoaldosteronism." },
      { name: "Flavonoids (liquiritin)", klass: "Flavonoid", role: "Anti-inflammatory and gut-healing." },
    ],
    traditional:
      "TCM's 'great harmoniser' — added to almost every formula in small quantity to bind ingredients and protect the middle burner.",
    modern:
      "DGL (deglycyrrhizinated) form supports gastric mucosal healing without the blood-pressure risk; whole licorice is restorative for HPA-axis exhaustion at moderate dose for short courses.",
    preparations: [
      { preparation: "Decoction (whole root)", amount: "3–6 g/day, max 4–6 weeks at this dose" },
      { preparation: "DGL chew", amount: "380 mg before meals for ulcers" },
    ],
    contraindications: ["Hypertension, hypokalemia, edema, heart failure", "Pregnancy"],
    interactions: ["Diuretics, digoxin, corticosteroids, hypotensives"],
    sustainability: "To-Watch",
    harvest: "Cultivated; lift 3-year roots in autumn.",
    safety: "Use with care",
    related: ["marshmallow", "ashwagandha", "rehmannia"],
  },
  {
    slug: "garlic",
    name: "Garlic",
    latin: "Allium sativum",
    family: "Amaryllidaceae",
    partsUsed: ["bulb"],
    energetics: { temperature: "warming", moisture: "drying", tone: "stimulating" },
    taste: ["pungent"],
    actions: ["anti-microbial", "hypotensive", "lipid-lowering", "anti-platelet"],
    affinities: ["cardiovascular", "respiratory", "gut microbiome"],
    constituents: [
      { name: "Allicin", klass: "Volatile oil", role: "Formed when garlic is crushed; broad-spectrum antimicrobial." },
    ],
    traditional:
      "The 'stinking rose' — used in every culinary medicine tradition for plague, lung infection, and parasites.",
    modern:
      "Aged garlic extract reduces blood pressure modestly (Ried 2013 meta-analysis) and may reduce LDL.",
    preparations: [
      { preparation: "Raw, crushed", amount: "1 clove crushed, rest 10 min, then eat — for active allicin" },
      { preparation: "Aged garlic extract", amount: "600–1,200 mg/day" },
    ],
    contraindications: ["Pre-surgery (bleeding)", "GI irritation in some"],
    interactions: ["Anticoagulants, anti-platelets, saquinavir (HIV)"],
    sustainability: "Abundant",
    harvest: "Bulbs when leaves yellow; cure for 2 weeks in dry shade.",
    safety: "Generally safe",
    related: ["onion", "ginger", "thyme"],
  },
  {
    slug: "thyme",
    name: "Thyme",
    latin: "Thymus vulgaris",
    family: "Lamiaceae",
    partsUsed: ["leaf"],
    energetics: { temperature: "warming", moisture: "drying", tone: "stimulating" },
    taste: ["pungent", "aromatic"],
    actions: ["anti-microbial", "expectorant", "anti-spasmodic", "vermifuge"],
    affinities: ["respiratory", "digestion"],
    constituents: [
      { name: "Thymol, carvacrol", klass: "Volatile oil", role: "Broad-spectrum antimicrobial." },
    ],
    traditional:
      "Roman soldiers bathed in thyme for courage; used for whooping cough and bronchitis across European folk medicine.",
    modern:
      "Bronchipret-style thyme + ivy combination has multiple RCTs supporting reduction in cough severity in acute bronchitis.",
    preparations: [
      { preparation: "Infusion", amount: "1 tbsp / 8 oz, covered, 10 min, with honey for cough" },
      { preparation: "Tincture (1:5, 60%)", amount: "1–3 mL, 3×/day" },
    ],
    contraindications: ["Concentrated essential oil internally — caution"],
    interactions: ["May potentiate anticoagulants at high doses"],
    sustainability: "Abundant",
    harvest: "Just before flowering for maximum oil.",
    safety: "Generally safe",
    related: ["sage", "oregano", "elecampane"],
  },
  {
    slug: "sage",
    name: "Sage",
    latin: "Salvia officinalis",
    family: "Lamiaceae",
    partsUsed: ["leaf"],
    energetics: { temperature: "warming", moisture: "drying", tone: "neutral" },
    taste: ["pungent", "bitter", "astringent"],
    actions: ["anti-microbial", "anhidrotic", "nootropic", "anti-galactagogue"],
    affinities: ["mouth/throat", "thermoregulation", "memory"],
    constituents: [
      { name: "Thujone", klass: "Volatile oil", role: "Limit prolonged high-dose use." },
      { name: "Rosmarinic acid", klass: "Salicylate", role: "Anti-inflammatory and antimicrobial." },
    ],
    traditional:
      "'He who has sage in the garden, why should he die?' — European proverb. Used for sore throats and to dry up milk during weaning.",
    modern:
      "Tildesley 2003 RCT: sage extract improves memory and cognition in healthy adults. Useful for menopausal hot flashes (Bommer 2011).",
    preparations: [
      { preparation: "Infusion / gargle", amount: "1 tsp / 8 oz, 10 min" },
      { preparation: "Tincture (1:5, 60%)", amount: "1–3 mL, 3×/day, short courses" },
    ],
    contraindications: ["Pregnancy", "Lactation (dries milk)", "Epilepsy (thujone)"],
    interactions: ["Sedatives, anticonvulsants, hypoglycemics"],
    sustainability: "Abundant",
    harvest: "Cut just before flowering.",
    safety: "Use with care",
    related: ["thyme", "rosemary", "lemon-balm"],
  },
  {
    slug: "rosemary",
    name: "Rosemary",
    latin: "Salvia rosmarinus",
    family: "Lamiaceae",
    partsUsed: ["leaf"],
    energetics: { temperature: "warming", moisture: "drying", tone: "stimulating" },
    taste: ["pungent", "bitter"],
    actions: ["circulatory stimulant", "nootropic", "carminative", "anti-microbial"],
    affinities: ["circulation", "head", "digestion"],
    constituents: [
      { name: "Cineole, camphor", klass: "Volatile oil", role: "Cognitive activation." },
      { name: "Carnosic acid, rosmarinic acid", klass: "Salicylate", role: "Antioxidant; neuroprotective." },
    ],
    traditional:
      "'Rosemary for remembrance' — Greek students wore garlands while studying. Used to drive blood up to a 'cold head'.",
    modern:
      "Inhalation of rosemary essential oil improves memory recall (Moss 2012). Carnosic acid is being studied for neuroprotection.",
    preparations: [
      { preparation: "Infusion", amount: "1 tsp / 8 oz, 10 min" },
      { preparation: "Inhalation", amount: "Diffuse during study or low-energy mornings" },
    ],
    contraindications: ["Pregnancy at high dose", "Epilepsy (camphor)"],
    interactions: ["May potentiate anticoagulants and lithium"],
    sustainability: "Abundant",
    harvest: "Year-round in mild climates.",
    safety: "Generally safe",
    related: ["sage", "ginkgo", "gotu-kola"],
  },
  {
    slug: "fennel",
    name: "Fennel",
    latin: "Foeniculum vulgare",
    family: "Apiaceae",
    partsUsed: ["seed"],
    energetics: { temperature: "warming", moisture: "neutral", tone: "neutral" },
    taste: ["sweet", "pungent"],
    actions: ["carminative", "galactagogue", "anti-spasmodic"],
    affinities: ["digestion", "lactation"],
    constituents: [
      { name: "Anethole", klass: "Volatile oil", role: "Estrogenic at high dose; antispasmodic in gut." },
    ],
    traditional:
      "Chewed after meals across the Mediterranean and India for digestion and breath. Given as 'gripe water' to colicky infants in dilute form.",
    modern:
      "Alexandrovich 2003 trial: fennel seed oil emulsion reduced infant colic.",
    preparations: [
      { preparation: "Infusion (crushed seed)", amount: "1 tsp crushed seed / 8 oz, 10 min" },
      { preparation: "Tincture (1:5, 60%)", amount: "1–3 mL after meals" },
    ],
    contraindications: ["Estrogen-sensitive cancers (high doses)"],
    interactions: ["Estrogenic — caution with hormone therapy"],
    sustainability: "Abundant",
    harvest: "Seed when umbels turn brown.",
    safety: "Generally safe",
    related: ["ginger", "peppermint", "anise"],
  },
  {
    slug: "burdock",
    name: "Burdock",
    latin: "Arctium lappa",
    family: "Asteraceae",
    partsUsed: ["root"],
    energetics: { temperature: "cooling", moisture: "neutral", tone: "neutral" },
    taste: ["sweet", "bitter"],
    actions: ["alterative", "diuretic", "hepatic", "lymphatic"],
    affinities: ["skin", "lymph", "liver"],
    constituents: [
      { name: "Inulin", klass: "Polysaccharide", role: "Prebiotic; ~40% of dried root." },
      { name: "Polyacetylenes", klass: "Bitter principle", role: "Antimicrobial and bitter." },
    ],
    traditional:
      "Premier 'blood cleanser' for chronic skin conditions in European folk and Eclectic medicine. 'Gobo' as a vegetable in Japan.",
    modern:
      "Limited but promising work on its prebiotic role and its use in skin formulas alongside red clover and yellow dock.",
    preparations: [
      { preparation: "Decoction", amount: "1 tbsp / 2 cups water, simmer 20 min" },
      { preparation: "Tincture (1:5, 60%)", amount: "3–5 mL, 3×/day" },
    ],
    contraindications: ["Asteraceae allergy"],
    interactions: ["Mild hypoglycemic — monitor diabetics"],
    sustainability: "Abundant",
    harvest: "First-year roots in autumn.",
    safety: "Generally safe",
    related: ["dandelion", "yellow-dock", "red-clover"],
  },
  {
    slug: "yellow-dock",
    name: "Yellow Dock",
    latin: "Rumex crispus",
    family: "Polygonaceae",
    partsUsed: ["root"],
    energetics: { temperature: "cooling", moisture: "drying", tone: "neutral" },
    taste: ["bitter", "astringent"],
    actions: ["alterative", "mild laxative", "hepatic", "iron-supportive"],
    affinities: ["liver", "blood (anemia)"],
    constituents: [
      { name: "Anthraquinones", klass: "Glycoside", role: "Mild laxative at higher doses." },
      { name: "Iron-binding compounds", klass: "Glycoside", role: "Improve iron absorption from food." },
    ],
    traditional:
      "Wise Woman tradition makes a long-cooked iron syrup with dock root and molasses for anemic pregnancy and post-partum recovery.",
    modern:
      "Empirical use for iron-deficiency anemia is supported by chemistry but lacks RCTs.",
    preparations: [
      { preparation: "Decoction", amount: "1 tsp / cup, simmer 15 min" },
      { preparation: "Iron syrup", amount: "Long-cooked with molasses; 1 tbsp/day" },
    ],
    contraindications: ["Kidney stones (oxalates)", "Pregnancy at high dose"],
    interactions: ["Anti-arrhythmics (theoretical with anthraquinone-induced potassium loss at high dose)"],
    sustainability: "Abundant",
    harvest: "Roots in autumn.",
    safety: "Generally safe",
    related: ["dandelion", "burdock", "nettle"],
  },
  {
    slug: "red-clover",
    name: "Red Clover",
    latin: "Trifolium pratense",
    family: "Fabaceae",
    partsUsed: ["flower"],
    energetics: { temperature: "cooling", moisture: "moistening", tone: "neutral" },
    taste: ["sweet", "salty"],
    actions: ["alterative", "phytoestrogen", "lymphatic"],
    affinities: ["lymph", "skin", "menopause"],
    constituents: [
      { name: "Isoflavones (formononetin, biochanin A)", klass: "Flavonoid", role: "Bind estrogen receptors weakly." },
    ],
    traditional:
      "Wise Woman daily long-infusion for fertility and menopause; used in skin formulas across European and Eclectic traditions.",
    modern:
      "RCT evidence for isoflavone extract in hot flash reduction is mixed but positive at higher doses.",
    preparations: [
      { preparation: "Infusion", amount: "1 oz / 1 qt boiling water, 4 h" },
      { preparation: "Standardised isoflavone extract", amount: "40–80 mg/day" },
    ],
    contraindications: ["Hormone-sensitive cancers — practitioner only", "Anticoagulants"],
    interactions: ["Tamoxifen (theoretical antagonism), anticoagulants"],
    sustainability: "Abundant",
    harvest: "Flowerheads at full bloom; dry quickly.",
    safety: "Use with care",
    related: ["nettle", "vitex", "shatavari"],
  },
  {
    slug: "plantain",
    name: "Plantain",
    latin: "Plantago major / lanceolata",
    family: "Plantaginaceae",
    partsUsed: ["leaf", "seed (psyllium)"],
    energetics: { temperature: "cooling", moisture: "moistening", tone: "neutral" },
    taste: ["salty", "sweet"],
    actions: ["vulnerary", "demulcent", "drawing", "expectorant"],
    affinities: ["skin", "GI", "respiratory"],
    constituents: [
      { name: "Aucubin", klass: "Iridoid", role: "Antimicrobial." },
      { name: "Mucilage", klass: "Mucilage", role: "Soothing." },
      { name: "Allantoin", klass: "Glycoside", role: "Cell proliferant; speeds wound healing." },
    ],
    traditional:
      "Universally used as a 'spit poultice' for stings, splinters, and infected wounds — chew a leaf and apply.",
    modern:
      "Allantoin and aucubin support empirical wound use; psyllium husk is gold-standard soluble fibre.",
    preparations: [
      { preparation: "Spit poultice", amount: "Chewed leaf on stings and bites" },
      { preparation: "Psyllium husk (seed)", amount: "1 tsp in water for cholesterol or constipation" },
    ],
    contraindications: ["Take psyllium with abundant water"],
    interactions: ["May slow absorption of oral medications — separate by 2 h"],
    sustainability: "Abundant",
    harvest: "Leaves all season; seed in late summer.",
    safety: "Generally safe",
    related: ["calendula", "comfrey", "marshmallow"],
  },
  {
    slug: "comfrey",
    name: "Comfrey",
    latin: "Symphytum officinale",
    family: "Boraginaceae",
    partsUsed: ["leaf", "root"],
    energetics: { temperature: "cooling", moisture: "moistening", tone: "neutral" },
    taste: ["sweet", "astringent"],
    actions: ["vulnerary", "demulcent", "cell proliferant"],
    affinities: ["bones", "skin", "connective tissue"],
    constituents: [
      { name: "Allantoin", klass: "Glycoside", role: "Drives the famous bone-knitting reputation." },
      { name: "Pyrrolizidine alkaloids", klass: "Alkaloid", role: "Hepatotoxic — restrict to topical use on intact skin." },
    ],
    traditional:
      "'Knitbone' — a hallmark of European folk medicine for fractures and slow-healing wounds.",
    modern:
      "Topical comfrey root extract has RCT evidence for back pain, sprains, and OA — Predel 2005 et al. Internal use is generally avoided due to PA toxicity.",
    preparations: [
      { preparation: "Infused oil → salve (topical)", amount: "Apply to intact skin only" },
      { preparation: "Poultice", amount: "Mashed leaf to bruises and sprains" },
    ],
    contraindications: ["Internal use", "Open wounds (can heal too fast over infection)", "Pregnancy/lactation (topical questionable)"],
    interactions: ["Hepatotoxic drugs (theoretical with internal use)"],
    sustainability: "Abundant",
    harvest: "Leaves all season; roots in autumn.",
    safety: "Use with care",
    related: ["calendula", "plantain", "arnica"],
  },
  {
    slug: "arnica",
    name: "Arnica",
    latin: "Arnica montana",
    family: "Asteraceae",
    partsUsed: ["flower"],
    energetics: { temperature: "warming", moisture: "drying", tone: "neutral" },
    taste: ["bitter"],
    actions: ["anti-inflammatory (topical)", "circulatory stimulant"],
    affinities: ["bruises", "muscles"],
    constituents: [
      { name: "Helenalin", klass: "Bitter principle", role: "Anti-inflammatory; toxic if ingested." },
    ],
    traditional:
      "'Tumbler's herb' — European folk topical for bruises from a fall.",
    modern:
      "Cochrane evidence supports topical arnica gel for OA hand pain (Widrig 2007) and bruising; oral use is limited to homeopathic dilutions.",
    preparations: [
      { preparation: "Infused oil → liniment (topical only)", amount: "Apply to closed bruises" },
    ],
    contraindications: ["Internal use (toxic)", "Open wounds", "Asteraceae allergy"],
    interactions: ["Anticoagulants (topical absorption is small)"],
    sustainability: "At-Risk",
    harvest: "Wild Arnica is protected; buy organic-cultivated A. chamissonis instead.",
    safety: "Use with care",
    related: ["comfrey", "st-johns-wort", "calendula"],
  },
  {
    slug: "st-johns-wort",
    name: "St John's Wort",
    latin: "Hypericum perforatum",
    family: "Hypericaceae",
    partsUsed: ["aerial parts in flower"],
    energetics: { temperature: "neutral", moisture: "drying", tone: "neutral" },
    taste: ["bitter", "astringent"],
    actions: ["nervine", "anti-depressant", "anti-viral", "vulnerary (oil)"],
    affinities: ["nervous system", "skin/nerves", "viral"],
    constituents: [
      { name: "Hypericin", klass: "Bitter principle", role: "Antiviral; phototoxic." },
      { name: "Hyperforin", klass: "Bitter principle", role: "Reuptake inhibition of multiple monoamines." },
    ],
    traditional:
      "'Drives away dark spirits' — given for melancholy, nerve pain, and as a brilliant red infused oil for trauma to nerves.",
    modern:
      "Linde 2008 Cochrane review: SJW non-inferior to SSRIs for mild-moderate depression with fewer side effects. CYP3A4 induction makes drug interactions a major concern.",
    preparations: [
      { preparation: "Standardised extract (0.3% hypericin)", amount: "300 mg, 3×/day" },
      { preparation: "Infused oil (fresh flower)", amount: "Topical for nerve pain and bruises" },
    ],
    contraindications: ["Bipolar disorder", "Pregnancy", "Multiple major drug interactions"],
    interactions: ["Massive CYP3A4 inducer — interacts with oral contraceptives, warfarin, immunosuppressants, antiretrovirals, SSRIs (serotonin syndrome), digoxin, statins. Always check."],
    sustainability: "Abundant",
    harvest: "Yellow flowers and buds — pinch a bud, fingers should turn red.",
    safety: "Practitioner only",
    related: ["lemon-balm", "skullcap", "passionflower"],
  },
  {
    slug: "kava",
    name: "Kava",
    latin: "Piper methysticum",
    family: "Piperaceae",
    partsUsed: ["root"],
    energetics: { temperature: "cooling", moisture: "drying", tone: "relaxing" },
    taste: ["pungent", "bitter"],
    actions: ["anxiolytic", "muscle relaxant", "ceremonial sedative"],
    affinities: ["nervous system", "musculoskeletal"],
    constituents: [
      { name: "Kavalactones", klass: "Bitter principle", role: "GABAergic and dopaminergic; anxiolysis without amnesia." },
    ],
    traditional:
      "Sacred ceremonial drink across Polynesia and Micronesia — shared in carved bowls, marker of relationship and resolution.",
    modern:
      "Sarris 2013 RCT: noble cultivar aqueous kava reduced GAD scores significantly. Always use water-based traditional preparations from noble cultivars; avoid acetone/ethanol leaf-stem extracts (linked to historical hepatotoxicity).",
    preparations: [
      { preparation: "Aqueous traditional preparation (root)", amount: "70–250 mg kavalactones/day, short courses" },
    ],
    contraindications: ["Liver disease", "Combination with alcohol or sedatives", "Driving"],
    interactions: ["CNS depressants, hepatotoxic drugs, dopamine antagonists"],
    sustainability: "To-Watch",
    harvest: "Root after 4+ years.",
    safety: "Practitioner only",
    related: ["passionflower", "valerian", "skullcap"],
  },
  {
    slug: "ginkgo",
    name: "Ginkgo",
    latin: "Ginkgo biloba",
    family: "Ginkgoaceae",
    partsUsed: ["leaf"],
    energetics: { temperature: "neutral", moisture: "neutral", tone: "neutral" },
    taste: ["bitter", "astringent"],
    actions: ["nootropic", "circulatory (peripheral and cerebral)", "antioxidant"],
    affinities: ["brain", "peripheral circulation", "ears"],
    constituents: [
      { name: "Ginkgolides", klass: "Terpene", role: "Platelet activating factor antagonists." },
      { name: "Flavonoid glycosides", klass: "Flavonoid", role: "Antioxidant and microcirculatory." },
    ],
    traditional:
      "Used in TCM for the seed (ban xia); the standardised leaf extract is a 20th-century European phytomedicine.",
    modern:
      "EGb 761 standardised extract has multiple RCTs: modest benefit in mild dementia, intermittent claudication, and tinnitus.",
    preparations: [
      { preparation: "Standardised extract (24% flavonoids, 6% terpenes)", amount: "120–240 mg/day, 8+ weeks" },
    ],
    contraindications: ["Pre-surgery (bleeding)", "Anticoagulants"],
    interactions: ["Warfarin, aspirin, SSRIs, anticonvulsants"],
    sustainability: "Abundant",
    harvest: "Leaves in autumn after they yellow.",
    safety: "Use with care",
    related: ["rosemary", "bacopa", "lions-mane"],
  },
  {
    slug: "bacopa",
    name: "Bacopa",
    latin: "Bacopa monnieri",
    family: "Plantaginaceae",
    partsUsed: ["whole plant"],
    energetics: { temperature: "cooling", moisture: "neutral", tone: "neutral" },
    taste: ["bitter", "sweet"],
    actions: ["nootropic", "nervine", "rejuvenative"],
    affinities: ["nervous system", "memory"],
    constituents: [
      { name: "Bacosides", klass: "Saponin", role: "Modulate cholinergic and serotonergic systems; promote dendritic growth." },
    ],
    traditional:
      "Brahmi — 'that which expands consciousness' — Ayurveda's premier medhya rasayana for memory and meditation.",
    modern:
      "Multiple RCTs (Stough 2008; Calabrese 2008) support 300 mg/day standardised extract for 12+ weeks for memory and learning.",
    preparations: [
      { preparation: "Standardised extract (50% bacosides)", amount: "300 mg/day with a fatty meal" },
      { preparation: "Powder in ghee", amount: "1 tsp daily, traditional Ayurvedic" },
    ],
    contraindications: ["Bradycardia", "Slow GI motility (can worsen)"],
    interactions: ["Anticholinergics (antagonistic)"],
    sustainability: "Abundant",
    harvest: "Cultivated in wet, low-elevation areas.",
    safety: "Generally safe",
    related: ["gotu-kola", "ginkgo", "lions-mane"],
  },
  {
    slug: "gotu-kola",
    name: "Gotu Kola",
    latin: "Centella asiatica",
    family: "Apiaceae",
    partsUsed: ["leaf"],
    energetics: { temperature: "cooling", moisture: "moistening", tone: "neutral" },
    taste: ["bitter", "sweet"],
    actions: ["nervine", "vulnerary", "vascular tonic", "nootropic"],
    affinities: ["nervous system", "skin", "venous system"],
    constituents: [
      { name: "Asiaticoside, madecassoside", klass: "Saponin", role: "Stimulate fibroblast proliferation and collagen synthesis." },
    ],
    traditional:
      "Eaten daily by sages in Sri Lanka; used in Ayurveda alongside brahmi for memory and meditation.",
    modern:
      "Strong evidence for venous insufficiency (Pointel 1987) and wound healing; cognitive benefits at higher doses.",
    preparations: [
      { preparation: "Infusion", amount: "1 tbsp dried leaf / 8 oz water, 10 min" },
      { preparation: "Standardised extract (TECA)", amount: "60–120 mg/day for venous insufficiency" },
    ],
    contraindications: ["Pregnancy", "High dose may cause headache"],
    interactions: ["Sedatives (additive at high dose)"],
    sustainability: "Abundant",
    harvest: "Leaves all season.",
    safety: "Generally safe",
    related: ["bacopa", "horse-chestnut", "rosemary"],
  },
  {
    slug: "boswellia",
    name: "Boswellia",
    latin: "Boswellia serrata",
    family: "Burseraceae",
    partsUsed: ["resin"],
    energetics: { temperature: "warming", moisture: "drying", tone: "neutral" },
    taste: ["bitter", "pungent"],
    actions: ["anti-inflammatory", "anti-arthritic"],
    affinities: ["joints", "respiratory"],
    constituents: [
      { name: "Boswellic acids", klass: "Resin", role: "5-LOX inhibition (a different anti-inflammatory pathway than NSAIDs)." },
    ],
    traditional:
      "Frankincense's medicinal cousin — used in Ayurveda for arthritis (sandhivata) and respiratory inflammation.",
    modern:
      "Multiple trials support boswellia in osteoarthritis (Kimmatkar 2003) and IBD (Gerhardt 2001), with a clean side-effect profile.",
    preparations: [
      { preparation: "Standardised extract (60–65% boswellic acids)", amount: "300–500 mg, 3×/day" },
    ],
    contraindications: ["Pregnancy"],
    interactions: ["May reduce metabolism of certain drugs via CYP3A4 inhibition"],
    sustainability: "To-Watch",
    harvest: "Resin tapped from trunk; over-tapping pressures populations — buy from sustainable suppliers.",
    safety: "Generally safe",
    related: ["turmeric", "ginger", "myrrh"],
  },
  {
    slug: "schisandra",
    name: "Schisandra",
    latin: "Schisandra chinensis",
    family: "Schisandraceae",
    partsUsed: ["berry"],
    energetics: { temperature: "warming", moisture: "neutral", tone: "neutral" },
    taste: ["sour", "bitter", "sweet", "pungent", "salty (all five)"],
    actions: ["adaptogen", "hepatic", "astringent", "nervine"],
    affinities: ["liver", "kidney", "lung", "shen"],
    constituents: [
      { name: "Schisandrins", klass: "Lignan", role: "Hepatoprotective; modulate stress response." },
    ],
    traditional:
      "Wu Wei Zi — 'five-flavour fruit' — TCM tonic for the lung, kidney, and shen. Used by Soviet researchers as a fatigue-resistance agent.",
    modern:
      "Hepatoprotection in chemical liver injury (Panossian 2008 review); modest endurance and cognitive effects.",
    preparations: [
      { preparation: "Decoction", amount: "1 tsp berries / cup, simmer 15 min" },
      { preparation: "Tincture (1:5, 60%)", amount: "2–4 mL, 2×/day" },
    ],
    contraindications: ["Peptic ulcer", "Pregnancy", "Epilepsy"],
    interactions: ["May alter CYP3A4-metabolised drugs"],
    sustainability: "To-Watch",
    harvest: "Cultivated; lift fully ripe berries.",
    safety: "Use with care",
    related: ["milk-thistle", "schizandra-pair", "rhodiola"],
  },
  {
    slug: "elecampane",
    name: "Elecampane",
    latin: "Inula helenium",
    family: "Asteraceae",
    partsUsed: ["root"],
    energetics: { temperature: "warming", moisture: "drying", tone: "stimulating" },
    taste: ["bitter", "pungent", "aromatic"],
    actions: ["expectorant", "anti-microbial", "carminative"],
    affinities: ["lungs", "digestion"],
    constituents: [
      { name: "Inulin", klass: "Polysaccharide", role: "Soothing and prebiotic." },
      { name: "Alantolactone", klass: "Bitter principle", role: "Antimicrobial against TB historically; expectorant." },
    ],
    traditional:
      "European folk lung tonic for damp, lingering cough — 'wet, cold, ropy' phlegm. The root that 'opens up the chest'.",
    modern:
      "Limited modern trials; antimicrobial activity in vitro is robust.",
    preparations: [
      { preparation: "Decoction", amount: "1 tsp / cup, simmer 15 min" },
      { preparation: "Honey-infusion", amount: "Pack jar with chopped root, cover with honey, infuse 4 weeks" },
    ],
    contraindications: ["Asteraceae allergy", "Pregnancy"],
    interactions: ["Mild additive with antidiabetic medications"],
    sustainability: "Abundant",
    harvest: "Roots from 2-year plants in autumn.",
    safety: "Generally safe",
    related: ["thyme", "mullein", "horehound"],
  },
  {
    slug: "mullein",
    name: "Mullein",
    latin: "Verbascum thapsus",
    family: "Scrophulariaceae",
    partsUsed: ["leaf", "flower"],
    energetics: { temperature: "neutral", moisture: "moistening", tone: "neutral" },
    taste: ["bland", "slightly bitter"],
    actions: ["expectorant", "demulcent", "anti-inflammatory", "ear analgesic (oil)"],
    affinities: ["lungs", "ears", "lymph"],
    constituents: [
      { name: "Mucilage", klass: "Mucilage", role: "Soothing." },
      { name: "Saponins", klass: "Saponin", role: "Mild expectorant." },
    ],
    traditional:
      "'Bunny ears' — the soft leaves were rolled and smoked for asthma; the flower-infused olive oil is a folk standard for ear infection (intact eardrum).",
    modern:
      "Limited but supportive trial work for ear-pain combination drops with garlic and St John's wort.",
    preparations: [
      { preparation: "Infusion (strain through cloth)", amount: "1 tbsp / 8 oz, 10 min — strain fine hairs" },
      { preparation: "Flower-infused oil", amount: "Drops in ear (intact drum only)" },
    ],
    contraindications: ["Strain infusions to remove hairs"],
    interactions: ["None notable"],
    sustainability: "Abundant",
    harvest: "Leaves from year-1 rosette; flowers from year-2 stalk.",
    safety: "Generally safe",
    related: ["elecampane", "thyme", "garlic"],
  },
  {
    slug: "hops",
    name: "Hops",
    latin: "Humulus lupulus",
    family: "Cannabaceae",
    partsUsed: ["strobile"],
    energetics: { temperature: "cooling", moisture: "drying", tone: "relaxing" },
    taste: ["bitter"],
    actions: ["bitter", "hypnotic", "sedative"],
    affinities: ["nervous system", "digestion"],
    constituents: [
      { name: "Humulone, lupulone", klass: "Bitter principle", role: "Bitter; antimicrobial." },
      { name: "8-PN (8-prenylnaringenin)", klass: "Flavonoid", role: "Phytoestrogen — explains menopause use." },
    ],
    traditional:
      "Pillow herb for restless sleep across European folk practice; long-paired with valerian.",
    modern:
      "Hops + valerian combinations have RCT evidence for sleep onset (Koetter 2007).",
    preparations: [
      { preparation: "Tincture (1:5, 50%)", amount: "1–2 mL at bedtime" },
      { preparation: "Sleep pillow", amount: "Stuffed cotton sachet of dried strobiles" },
    ],
    contraindications: ["Depression (may worsen)", "Hormone-sensitive cancers"],
    interactions: ["Sedatives, hormone therapy"],
    sustainability: "Abundant",
    harvest: "Strobiles when papery and lupulin yellow-orange.",
    safety: "Use with care",
    related: ["valerian", "passionflower", "lemon-balm"],
  },
  {
    slug: "marjoram",
    name: "Marjoram",
    latin: "Origanum majorana",
    family: "Lamiaceae",
    partsUsed: ["leaf"],
    energetics: { temperature: "warming", moisture: "drying", tone: "relaxing" },
    taste: ["pungent", "aromatic"],
    actions: ["carminative", "nervine", "anti-spasmodic"],
    affinities: ["digestion", "nervous system", "female reproductive"],
    constituents: [
      { name: "Sabinene, terpinen-4-ol", klass: "Volatile oil", role: "Antispasmodic and carminative." },
    ],
    traditional:
      "Greek wedding wreaths; a folk herb for grief and worry. Less hot than its cousin oregano.",
    modern:
      "Limited trial work; traditional use is well supported by chemistry.",
    preparations: [
      { preparation: "Infusion", amount: "1 tsp / 8 oz, 10 min" },
    ],
    contraindications: ["Pregnancy at high dose"],
    interactions: ["Sedatives (mild additive)"],
    sustainability: "Abundant",
    harvest: "Just before flowering.",
    safety: "Generally safe",
    related: ["thyme", "oregano", "lemon-balm"],
  },
  {
    slug: "yarrow-flower-essence",
    name: "Pine",
    latin: "Pinus strobus",
    family: "Pinaceae",
    partsUsed: ["needle"],
    energetics: { temperature: "warming", moisture: "drying", tone: "neutral" },
    taste: ["pungent", "sour"],
    actions: ["expectorant", "anti-microbial", "vitamin C"],
    affinities: ["lungs"],
    constituents: [
      { name: "Pinene, terpinene", klass: "Volatile oil", role: "Expectorant and antimicrobial." },
      { name: "Vitamin C", klass: "Polysaccharide", role: "Anti-scorbutic — historic use on long winters." },
    ],
    traditional:
      "Indigenous peoples of North America taught early settlers pine-needle tea to prevent scurvy; folk lung remedy.",
    modern:
      "Volatile oil chemistry supports lung use; vitamin C content is real and meaningful.",
    preparations: [
      { preparation: "Infusion (chop fresh needles)", amount: "1 tbsp / 8 oz, 10 min off heat to preserve C" },
    ],
    contraindications: ["Pregnancy (some pine spp.)", "Avoid Ponderosa pine (P. ponderosa)"],
    interactions: ["None notable"],
    sustainability: "Abundant",
    harvest: "Young needles in spring; never P. ponderosa.",
    safety: "Generally safe",
    related: ["thyme", "elder", "rose"],
  },
  {
    slug: "horse-chestnut",
    name: "Horse Chestnut",
    latin: "Aesculus hippocastanum",
    family: "Sapindaceae",
    partsUsed: ["seed"],
    energetics: { temperature: "cooling", moisture: "drying", tone: "neutral" },
    taste: ["bitter", "astringent"],
    actions: ["venotonic", "anti-edematous"],
    affinities: ["venous system"],
    constituents: [
      { name: "Aescin", klass: "Saponin", role: "Strengthens venous walls; reduces capillary leak." },
    ],
    traditional:
      "European folk topical for varicose veins.",
    modern:
      "Cochrane review: oral horse-chestnut seed extract (50–75 mg aescin, 2×/day) is effective for chronic venous insufficiency.",
    preparations: [
      { preparation: "Standardised extract", amount: "50–75 mg aescin, 2×/day" },
    ],
    contraindications: ["Raw seed is toxic — only use prepared extract", "Anticoagulants"],
    interactions: ["Anticoagulants"],
    sustainability: "Abundant",
    harvest: "Buy prepared extract.",
    safety: "Use with care",
    related: ["gotu-kola", "yarrow", "witch-hazel"],
  },
  {
    slug: "witch-hazel",
    name: "Witch Hazel",
    latin: "Hamamelis virginiana",
    family: "Hamamelidaceae",
    partsUsed: ["leaf", "bark"],
    energetics: { temperature: "cooling", moisture: "drying", tone: "neutral" },
    taste: ["astringent"],
    actions: ["astringent", "anti-inflammatory", "vasoconstrictor"],
    affinities: ["skin", "venous system"],
    constituents: [
      { name: "Tannins", klass: "Tannin", role: "Tighten tissue; styptic." },
    ],
    traditional:
      "Indigenous to eastern North America; adopted as a household astringent for bruises, hemorrhoids, and skin irritation.",
    modern:
      "Topical hamamelis water and creams have clinical support for hemorrhoids and minor skin inflammation.",
    preparations: [
      { preparation: "Distillate (commercial)", amount: "Apply to skin or use as compress" },
    ],
    contraindications: ["Internal use limited (tannins)"],
    interactions: ["None notable topically"],
    sustainability: "Abundant",
    harvest: "Buy distillate; sustainable wild-craft is regional.",
    safety: "Generally safe",
    related: ["horse-chestnut", "calendula", "yarrow"],
  },
  {
    slug: "cayenne",
    name: "Cayenne",
    latin: "Capsicum annuum",
    family: "Solanaceae",
    partsUsed: ["fruit"],
    energetics: { temperature: "hot", moisture: "drying", tone: "stimulating" },
    taste: ["pungent"],
    actions: ["circulatory stimulant", "analgesic (topical)", "carminative"],
    affinities: ["circulation", "GI", "joints (topical)"],
    constituents: [
      { name: "Capsaicin", klass: "Bitter principle", role: "Depletes substance P; topical analgesia." },
    ],
    traditional:
      "Used by Samuel Thomson as a 'great equaliser' to drive heat to the periphery.",
    modern:
      "Topical capsaicin cream (0.025–0.075%) is FDA-approved for OA, post-herpetic neuralgia, and diabetic neuropathy.",
    preparations: [
      { preparation: "Topical cream (capsaicin 0.075%)", amount: "Apply 3–4×/day, expect 2-week ramp" },
      { preparation: "Powder in food", amount: "Pinch in soups for circulation" },
    ],
    contraindications: ["Broken skin", "Eyes/mucous membranes"],
    interactions: ["May potentiate antihypertensives at high oral dose"],
    sustainability: "Abundant",
    harvest: "Fruit when fully red; gloves recommended.",
    safety: "Use with care",
    related: ["ginger", "garlic", "horseradish"],
  },
  {
    slug: "horehound",
    name: "Horehound",
    latin: "Marrubium vulgare",
    family: "Lamiaceae",
    partsUsed: ["aerial parts"],
    energetics: { temperature: "warming", moisture: "drying", tone: "neutral" },
    taste: ["bitter"],
    actions: ["expectorant", "bitter"],
    affinities: ["lungs", "digestion"],
    constituents: [
      { name: "Marrubin", klass: "Bitter principle", role: "Expectorant and bitter." },
    ],
    traditional:
      "Old apothecary lozenge for stubborn cough; boiled with sugar into 'horehound candies'.",
    modern:
      "Limited trial work; chemistry supports use.",
    preparations: [
      { preparation: "Infusion", amount: "1 tsp / 8 oz, 10 min" },
      { preparation: "Lozenge", amount: "Honey + decoction reduced and cooled" },
    ],
    contraindications: ["Pregnancy"],
    interactions: ["Antiarrhythmics (high dose theoretical)"],
    sustainability: "Abundant",
    harvest: "Cut whole stems in flower.",
    safety: "Generally safe",
    related: ["elecampane", "thyme", "mullein"],
  },
  {
    slug: "rehmannia",
    name: "Rehmannia",
    latin: "Rehmannia glutinosa",
    family: "Orobanchaceae",
    partsUsed: ["root"],
    energetics: { temperature: "cooling (raw) / warming (cooked)", moisture: "moistening", tone: "neutral" },
    taste: ["sweet", "bitter"],
    actions: ["yin tonic", "adrenal-restorative", "anti-inflammatory"],
    affinities: ["kidney", "blood", "endocrine"],
    constituents: [
      { name: "Iridoid glycosides (catalpol)", klass: "Iridoid", role: "Anti-inflammatory; HPA modulation." },
    ],
    traditional:
      "TCM 'sheng/shu di huang' — premier yin and blood tonic; cornerstone of Six Flavour Rehmannia formula for adrenal/kidney depletion.",
    modern:
      "Used in modern Chinese clinics for autoimmune flares and corticosteroid tapering; trials are largely Chinese-language.",
    preparations: [
      { preparation: "Decoction (prepared root, shu di huang)", amount: "9–30 g/day in formula" },
      { preparation: "Tincture (1:5, 40%)", amount: "3–5 mL, 2×/day" },
    ],
    contraindications: ["Diarrhea, weak digestion"],
    interactions: ["Anticoagulants (theoretical)"],
    sustainability: "To-Watch",
    harvest: "Cultivated in China.",
    safety: "Use with care",
    related: ["astragalus", "shatavari", "licorice"],
  },
  {
    slug: "dong-quai",
    name: "Dong Quai",
    latin: "Angelica sinensis",
    family: "Apiaceae",
    partsUsed: ["root"],
    energetics: { temperature: "warming", moisture: "moistening", tone: "neutral" },
    taste: ["sweet", "pungent", "bitter"],
    actions: ["blood tonic", "emmenagogue", "circulatory"],
    affinities: ["female reproductive", "blood"],
    constituents: [
      { name: "Ferulic acid", klass: "Salicylate", role: "Anti-inflammatory and circulatory." },
      { name: "Ligustilide", klass: "Volatile oil", role: "Smooth muscle relaxant." },
    ],
    traditional:
      "Dang Gui — TCM premier blood tonic; cornerstone of women's formulas like Si Wu Tang and Dang Gui Shao Yao San.",
    modern:
      "Most useful in formula (TCM tradition) rather than as a single herb; single-herb trials are mixed.",
    preparations: [
      { preparation: "Decoction", amount: "6–12 g/day in formula" },
    ],
    contraindications: ["Pregnancy (early)", "Heavy menses", "Anticoagulants"],
    interactions: ["Warfarin (clear interaction)"],
    sustainability: "Abundant",
    harvest: "Cultivated; lift roots in autumn.",
    safety: "Use with care",
    related: ["vitex", "shatavari", "rehmannia"],
  },
  {
    slug: "uva-ursi",
    name: "Uva Ursi",
    latin: "Arctostaphylos uva-ursi",
    family: "Ericaceae",
    partsUsed: ["leaf"],
    energetics: { temperature: "cooling", moisture: "drying", tone: "neutral" },
    taste: ["astringent", "bitter"],
    actions: ["urinary antiseptic", "astringent"],
    affinities: ["urinary tract"],
    constituents: [
      { name: "Arbutin", klass: "Glycoside", role: "Hydrolysed in alkaline urine to hydroquinone — antiseptic in bladder." },
    ],
    traditional:
      "First Nations peoples and European folk medicine for UTIs; effective only in alkaline urine.",
    modern:
      "Moore 2018 trial: combined with ibuprofen, may avoid antibiotics in uncomplicated cystitis.",
    preparations: [
      { preparation: "Cold maceration (overnight)", amount: "1 tbsp / 8 oz, 12 h — minimises tannin extraction" },
      { preparation: "Standardised extract", amount: "400–800 mg arbutin/day, max 7 days" },
    ],
    contraindications: ["Pregnancy", "Kidney disease", "Continuous use beyond 1 week — hepatotoxic potential"],
    interactions: ["Acidifying foods/drinks reduce effect"],
    sustainability: "To-Watch",
    harvest: "Wild-craft is sensitive — buy organic-cultivated where possible.",
    safety: "Use with care",
    related: ["cranberry", "marshmallow", "corn-silk"],
  },
  {
    slug: "cranberry",
    name: "Cranberry",
    latin: "Vaccinium macrocarpon",
    family: "Ericaceae",
    partsUsed: ["fruit"],
    energetics: { temperature: "cooling", moisture: "drying", tone: "neutral" },
    taste: ["sour"],
    actions: ["urinary anti-adhesive", "antioxidant"],
    affinities: ["urinary tract"],
    constituents: [
      { name: "Type-A proanthocyanidins (PACs)", klass: "OPC", role: "Prevent E. coli adherence to urothelium." },
    ],
    traditional:
      "Long folk use for bladder support; the cranberry sauce of Thanksgiving is a soft echo.",
    modern:
      "Standardised extract delivering 36 mg PACs/day prevents recurrent uncomplicated UTI in women (Howell 2010).",
    preparations: [
      { preparation: "Standardised PAC extract", amount: "36 mg PACs/day" },
      { preparation: "Unsweetened juice", amount: "8 oz/day, prophylactic" },
    ],
    contraindications: ["Oxalate kidney stones"],
    interactions: ["May potentiate warfarin (variable)"],
    sustainability: "Abundant",
    harvest: "Cultivated in bogs.",
    safety: "Generally safe",
    related: ["uva-ursi", "marshmallow", "d-mannose"],
  },
  {
    slug: "saw-palmetto",
    name: "Saw Palmetto",
    latin: "Serenoa repens",
    family: "Arecaceae",
    partsUsed: ["berry"],
    energetics: { temperature: "warming", moisture: "moistening", tone: "neutral" },
    taste: ["sweet", "pungent"],
    actions: ["prostate-tonic", "diuretic", "anabolic"],
    affinities: ["male reproductive"],
    constituents: [
      { name: "Free fatty acids and phytosterols", klass: "Salicylate", role: "5-α-reductase inhibition; reduce DHT in prostate tissue." },
    ],
    traditional:
      "Eclectic 'old-man's berry' for senescent prostate; used since the 19th century.",
    modern:
      "Mixed RCT evidence; better in standardised lipidosterolic extracts (Permixon) and in combination with nettle root.",
    preparations: [
      { preparation: "Standardised liposterolic extract", amount: "320 mg/day" },
    ],
    contraindications: ["Pregnancy (anti-androgenic)"],
    interactions: ["Anti-androgens (additive)"],
    sustainability: "To-Watch",
    harvest: "Cultivated in Florida; verify sustainable sourcing.",
    safety: "Generally safe",
    related: ["stinging-nettle", "pygeum", "pumpkin-seed"],
  },
  {
    slug: "mugwort",
    name: "Mugwort",
    latin: "Artemisia vulgaris",
    family: "Asteraceae",
    partsUsed: ["leaf"],
    energetics: { temperature: "warming", moisture: "drying", tone: "neutral" },
    taste: ["bitter", "aromatic"],
    actions: ["bitter", "emmenagogue", "nervine", "vermifuge", "dream-enhancer"],
    affinities: ["digestion", "uterus", "dreaming"],
    constituents: [
      { name: "Sesquiterpene lactones", klass: "Bitter principle", role: "Bitter; emmenagogue." },
      { name: "Thujone", klass: "Volatile oil", role: "CNS-active in high doses." },
    ],
    traditional:
      "Pillow herb for vivid dreams; smudge plant across many cultures; moxibustion in TCM is ai ye (mugwort).",
    modern:
      "Modern uses centre on dream work, gentle digestive bitter (small dose), and as moxa in TCM.",
    preparations: [
      { preparation: "Dream pillow", amount: "Stuffed sachet beside the pillow" },
      { preparation: "Moxa (rolled stick)", amount: "Held above acupoints by trained practitioners" },
    ],
    contraindications: ["Pregnancy", "Asteraceae allergy"],
    interactions: ["Anticonvulsants (theoretical with thujone)"],
    sustainability: "Abundant",
    harvest: "Aerial parts in summer.",
    safety: "Use with care",
    related: ["yarrow", "wormwood", "sage"],
  },
  {
    slug: "wormwood",
    name: "Wormwood",
    latin: "Artemisia absinthium",
    family: "Asteraceae",
    partsUsed: ["leaf"],
    energetics: { temperature: "cooling", moisture: "drying", tone: "neutral" },
    taste: ["bitter (intense)"],
    actions: ["bitter", "anthelmintic", "cholagogue"],
    affinities: ["digestion", "liver", "intestinal parasites"],
    constituents: [
      { name: "Absinthin", klass: "Bitter principle", role: "One of the most bitter compounds in the materia medica — intense digestive stimulation." },
      { name: "Thujone", klass: "Volatile oil", role: "Limit dose and duration." },
    ],
    traditional:
      "Component of medieval bitters and absinthe; classical European vermifuge.",
    modern:
      "Use only short courses, low dose; long-term use risks neurological effects from thujone. Proven antiparasitic activity in vitro.",
    preparations: [
      { preparation: "Tincture (1:5, 40%)", amount: "0.5–2 mL, 3×/day, max 4 weeks" },
    ],
    contraindications: ["Pregnancy", "Epilepsy", "Long-term use"],
    interactions: ["Anticonvulsants"],
    sustainability: "Abundant",
    harvest: "Tops in flower.",
    safety: "Practitioner only",
    related: ["mugwort", "gentian", "barberry"],
  },
  {
    slug: "gentian",
    name: "Gentian",
    latin: "Gentiana lutea",
    family: "Gentianaceae",
    partsUsed: ["root"],
    energetics: { temperature: "cooling", moisture: "drying", tone: "stimulating" },
    taste: ["bitter (intense)"],
    actions: ["bitter", "cholagogue", "appetite-stimulant"],
    affinities: ["digestion"],
    constituents: [
      { name: "Gentiopicrin", klass: "Bitter principle", role: "Detected in saliva at 1:50,000 dilution; gold-standard digestive bitter." },
    ],
    traditional:
      "Backbone of European 'amari' and digestifs (Angostura, Suze); classical pre-meal apéritif.",
    modern:
      "Reliable bitter for under-functioning digestion — improves enzyme and bile flow.",
    preparations: [
      { preparation: "Tincture (1:5, 40%)", amount: "5–15 drops in water 15 min before meals" },
    ],
    contraindications: ["Active ulcer", "Hyperacidity"],
    interactions: ["May alter absorption of acid-sensitive drugs"],
    sustainability: "At-Risk",
    harvest: "Wild G. lutea is protected; buy organic-cultivated.",
    safety: "Generally safe",
    related: ["wormwood", "barberry", "dandelion"],
  },
  {
    slug: "lobelia",
    name: "Lobelia",
    latin: "Lobelia inflata",
    family: "Campanulaceae",
    partsUsed: ["aerial parts"],
    energetics: { temperature: "warming", moisture: "moistening", tone: "relaxing" },
    taste: ["acrid"],
    actions: ["respiratory anti-spasmodic", "expectorant", "emetic (high dose)"],
    affinities: ["respiratory", "smooth muscle"],
    constituents: [
      { name: "Lobeline", klass: "Alkaloid", role: "Nicotinic agonist; respiratory and smooth muscle relaxant." },
    ],
    traditional:
      "Samuel Thomson's 'great relaxant' for spasmodic asthma and rigid tissue states. Considered a powerful catalyst in formula.",
    modern:
      "Practitioner-use only; narrow therapeutic window.",
    preparations: [
      { preparation: "Tincture (1:8, 60%)", amount: "5–20 drops, careful titration" },
    ],
    contraindications: ["Pregnancy", "Children", "Self-prescribed use"],
    interactions: ["Nicotinic interactions; cardiovascular caution"],
    sustainability: "To-Watch",
    harvest: "Aerial parts when first capsules form (highest lobeline)",
    safety: "Practitioner only",
    related: ["skullcap", "valerian", "cramp-bark"],
  },
  {
    slug: "elderflower",
    name: "Elderflower",
    latin: "Sambucus nigra (flower)",
    family: "Adoxaceae",
    partsUsed: ["flower"],
    energetics: { temperature: "cooling", moisture: "neutral", tone: "neutral" },
    taste: ["aromatic", "slightly bitter"],
    actions: ["diaphoretic", "anti-catarrhal", "anti-allergic"],
    affinities: ["respiratory", "skin", "lymph"],
    constituents: [
      { name: "Flavonoids (rutin, quercetin)", klass: "Flavonoid", role: "Capillary support; anti-allergic." },
      { name: "Volatile oil", klass: "Volatile oil", role: "Diaphoretic when hot." },
    ],
    traditional:
      "Classic European diaphoretic for hot-dry fevers; paired with peppermint and yarrow as 'YEP tea' for the start of a cold.",
    modern:
      "Rutin and flavonoid content support the anti-allergic and capillary uses; clinical RCTs limited.",
    preparations: [
      { preparation: "Hot infusion", amount: "1 tbsp / 8 oz, covered, 10 min, drink hot for fever" },
    ],
    contraindications: ["None notable"],
    interactions: ["None notable"],
    sustainability: "Abundant",
    harvest: "Full bloom umbels in early summer; dry quickly.",
    safety: "Generally safe",
    related: ["yarrow", "peppermint", "linden"],
  },
];

// ---------- Actions glossary ----------

export const actions: HerbalAction[] = [
  { id: "adaptogen", name: "Adaptogen", definition: "Non-specifically increases resistance to stressors and normalises function across the HPA axis. Must be safe at long-term doses.", exemplars: ["ashwagandha", "rhodiola", "tulsi", "schisandra", "ginseng"] },
  { id: "alterative", name: "Alterative", definition: "'Blood cleanser' — gradually shifts metabolism and elimination, classically for skin and chronic inflammation.", exemplars: ["burdock", "yellow-dock", "red-clover", "dandelion", "echinacea"] },
  { id: "anodyne", name: "Anodyne", definition: "Reduces pain perception, often via nervous-system or topical action.", exemplars: ["passionflower", "valerian", "cayenne"] },
  { id: "anti-microbial", name: "Anti-microbial", definition: "Inhibits bacterial, fungal, viral, or parasitic activity.", exemplars: ["garlic", "thyme", "echinacea", "elderberry"] },
  { id: "anti-spasmodic", name: "Anti-spasmodic", definition: "Relaxes smooth or skeletal muscle spasm.", exemplars: ["cramp-bark", "valerian", "wild-yam", "lobelia"] },
  { id: "astringent", name: "Astringent", definition: "Tightens and tones tissue; controls discharges and minor bleeding via tannins.", exemplars: ["witch-hazel", "yarrow", "rose", "uva-ursi"] },
  { id: "bitter", name: "Bitter", definition: "Stimulates the cephalic phase of digestion via bitter receptors on the tongue and gut.", exemplars: ["gentian", "wormwood", "dandelion", "burdock"] },
  { id: "carminative", name: "Carminative", definition: "Aromatic herbs that relieve gas, bloating, and gut spasm.", exemplars: ["peppermint", "fennel", "ginger", "chamomile"] },
  { id: "cholagogue", name: "Cholagogue", definition: "Stimulates bile flow from the gallbladder.", exemplars: ["dandelion", "wormwood", "wild-yam", "barberry"] },
  { id: "demulcent", name: "Demulcent", definition: "Soothes and protects irritated mucous membranes via mucilage.", exemplars: ["marshmallow", "slippery-elm", "licorice", "mullein"] },
  { id: "diaphoretic", name: "Diaphoretic", definition: "Promotes sweating; classically used to break a fever.", exemplars: ["yarrow", "elderflower", "peppermint", "ginger"] },
  { id: "diuretic", name: "Diuretic", definition: "Increases urine output; some are gentle and potassium-sparing.", exemplars: ["dandelion", "stinging-nettle", "uva-ursi"] },
  { id: "emmenagogue", name: "Emmenagogue", definition: "Brings on menses; many are uterine stimulants and contraindicated in pregnancy.", exemplars: ["yarrow", "mugwort", "vitex", "motherwort"] },
  { id: "expectorant", name: "Expectorant", definition: "Helps move mucus out of the airways — stimulating or soothing.", exemplars: ["elecampane", "mullein", "thyme", "horehound"] },
  { id: "hepatic", name: "Hepatic", definition: "Tones, restores, or protects the liver.", exemplars: ["milk-thistle", "dandelion", "schisandra", "turmeric"] },
  { id: "hypnotic", name: "Hypnotic", definition: "Promotes sleep; not the same as 'sedative'.", exemplars: ["valerian", "passionflower", "hops"] },
  { id: "immune-modulator", name: "Immune-modulator", definition: "Restores balance to immune signalling rather than simply boosting it.", exemplars: ["reishi", "astragalus", "tulsi"] },
  { id: "lymphatic", name: "Lymphatic", definition: "Stimulates flow of lymph and clearance of cellular debris.", exemplars: ["calendula", "red-clover", "burdock"] },
  { id: "nervine", name: "Nervine", definition: "Acts on the nervous system: relaxant (chamomile), tonic (oats), or stimulant (rosemary).", exemplars: ["chamomile", "skullcap", "lemon-balm", "oatstraw"] },
  { id: "nootropic", name: "Nootropic", definition: "Enhances cognition, memory, learning.", exemplars: ["bacopa", "lions-mane", "rosemary", "ginkgo"] },
  { id: "nutritive", name: "Nutritive", definition: "Mineral- and vitamin-rich herbs taken as long-term tonics.", exemplars: ["stinging-nettle", "oatstraw", "red-clover"] },
  { id: "rejuvenative", name: "Rejuvenative", definition: "Ayurvedic 'rasayana' — long-term tissue restoration.", exemplars: ["ashwagandha", "shatavari", "bacopa"] },
  { id: "vulnerary", name: "Vulnerary", definition: "Promotes wound healing, internally or topically.", exemplars: ["calendula", "comfrey", "plantain", "gotu-kola"] },
  { id: "anti-viral", name: "Anti-viral", definition: "Inhibits viral replication; especially relevant for HSV, influenza, and rhinoviruses.", exemplars: ["lemon-balm", "elderberry", "st-johns-wort"] },
  { id: "anti-inflammatory", name: "Anti-inflammatory", definition: "Reduces inflammation via NF-κB inhibition, COX/LOX modulation, or other pathways.", exemplars: ["turmeric", "boswellia", "ginger"] },
  { id: "anxiolytic", name: "Anxiolytic", definition: "Reduces anxiety through GABA, serotonin, or HPA modulation.", exemplars: ["chamomile", "lemon-balm", "passionflower", "kava"] },
  { id: "cardio-tonic", name: "Cardio-tonic", definition: "Restores tone and function of the heart over time.", exemplars: ["hawthorn", "motherwort", "rose"] },
  { id: "circulatory stimulant", name: "Circulatory stimulant", definition: "Drives blood to peripheries or specific tissues.", exemplars: ["cayenne", "ginger", "rosemary", "yarrow"] },
  { id: "thymoleptic", name: "Thymoleptic", definition: "Lifts mood — classical term for 'gladdens the heart'.", exemplars: ["lemon-balm", "rose", "st-johns-wort"] },
  { id: "vermifuge", name: "Vermifuge", definition: "Expels intestinal parasites.", exemplars: ["wormwood", "thyme", "garlic"] },
];

// ---------- Constituent classes ----------

export const constituentClasses: ConstituentClass[] = [
  { klass: "Alkaloid", summary: "Nitrogen-containing, often bitter, often potent at low dose. Wide range from caffeine to morphine.", examples: "Lobeline (lobelia), berberine (barberry, goldenseal), leonurine (motherwort)." },
  { klass: "Flavonoid", summary: "Plant pigments with broad antioxidant, anti-inflammatory, and capillary-protective activity.", examples: "Apigenin (chamomile), quercetin (nettle), baicalein (skullcap)." },
  { klass: "Iridoid", summary: "Bitter glycosides with anti-inflammatory and bitter-tonic properties.", examples: "Aucubin (plantain), agnuside (vitex), valepotriates (valerian)." },
  { klass: "Mucilage", summary: "Long-chain polysaccharides that swell in water to form a soothing gel.", examples: "Marshmallow root, slippery elm, mullein leaf." },
  { klass: "OPC", summary: "Oligomeric proanthocyanidins — strengthen capillary and connective tissue, antioxidant.", examples: "Hawthorn, cranberry, pine bark, grape seed." },
  { klass: "Saponin", summary: "Soap-like glycosides that foam in water; modulate immune, hormonal, and inflammatory pathways.", examples: "Withanolides (ashwagandha), aescin (horse chestnut), bacosides (bacopa)." },
  { klass: "Terpene", summary: "A vast family from the aromatic volatile oils to the resins; often the 'smell' and the medicinal punch of an herb.", examples: "Menthol (peppermint), bisabolol (chamomile), boswellic acids (boswellia)." },
  { klass: "Salicylate", summary: "Aspirin's herbal cousins — anti-inflammatory and analgesic, gentler than synthetic.", examples: "Meadowsweet, willow bark, rosmarinic acid." },
  { klass: "Glycoside", summary: "Compounds bonded to sugars that release the active aglycone after digestion.", examples: "Anthraquinones (yellow dock), arbutin (uva ursi), cardiac glycosides (foxglove — toxic)." },
  { klass: "Polysaccharide", summary: "Long sugar chains that activate dectin-1 on immune cells and feed beneficial gut microbes.", examples: "Beta-glucans (reishi), inulin (burdock, dandelion), arabinogalactans (echinacea)." },
  { klass: "Volatile oil", summary: "Steam-distillable aromatic compounds carrying much of an herb's character.", examples: "Lavender, peppermint, thyme — distilled into essential oils." },
  { klass: "Bitter principle", summary: "Catch-all for compounds that taste intensely bitter and stimulate cephalic-phase digestion.", examples: "Gentiopicrin (gentian), absinthin (wormwood), sesquiterpene lactones (dandelion)." },
  { klass: "Resin", summary: "Sticky, antimicrobial exudates that form films over wounds and the GI lining.", examples: "Calendula, propolis, frankincense, myrrh." },
  { klass: "Tannin", summary: "Astringent polyphenols that bind protein and tighten tissue.", examples: "Witch hazel, oak bark, blackberry leaf, rose petal." },
  { klass: "Lignan", summary: "Polyphenolic compounds with phytoestrogenic and hepatoprotective activity.", examples: "Schisandrins (schisandra), silymarin (milk thistle), flax lignans." },
];

// ---------- Preparations ----------

export const preparations: Preparation[] = [
  {
    slug: "infusion",
    name: "Infusion",
    menstruum: "Water (boiling, then off heat)",
    ratio: "1 tbsp dried herb : 8 oz water, OR 1 oz : 1 qt for long infusion",
    time: "10 minutes covered (standard) or 4–8 hours (long)",
    yield: "1 cup (standard); 1 qt (long)",
    shelfLife: "24 hours refrigerated",
    whenToChoose: "Leaves, flowers, fragrant aerial parts. Long infusions extract minerals from nutritive herbs (nettle, oatstraw, red clover).",
    steps: [
      "Place herb in pre-warmed teapot or jar.",
      "Pour boiling water over herb.",
      "Cover immediately to trap volatile oils.",
      "Steep the appropriate time, then strain and drink.",
    ],
  },
  {
    slug: "decoction",
    name: "Decoction",
    menstruum: "Water (simmered)",
    ratio: "1 tbsp herb : 2 cups water (reduce to ~1.5 cups)",
    time: "15–30 minutes covered",
    yield: "About 1.5 cups",
    shelfLife: "48 hours refrigerated",
    whenToChoose: "Roots, bark, hard berries, mushrooms — anything that needs heat and time to release its constituents.",
    steps: [
      "Combine herb and cold water in a non-reactive pot.",
      "Bring slowly to a simmer.",
      "Cover and simmer 15–30 min.",
      "Strain, press the marc, drink warm.",
    ],
  },
  {
    slug: "cold-maceration",
    name: "Cold maceration",
    menstruum: "Cool water",
    ratio: "1 tbsp herb : 1 cup water",
    time: "4–12 hours",
    yield: "1 cup",
    shelfLife: "24 hours refrigerated",
    whenToChoose: "Mucilage-rich herbs (marshmallow root) where heat would damage the polysaccharides; tannin-heavy herbs (uva ursi) where cold limits tannin extraction.",
    steps: [
      "Combine herb and cool water in a jar.",
      "Stir or shake occasionally.",
      "Strain through fine cloth.",
    ],
  },
  {
    slug: "folk-tincture",
    name: "Tincture (Folk Method)",
    menstruum: "80–100 proof spirits (vodka, brandy)",
    ratio: "Fill jar 1/3–1/2 with dried herb (or 2/3 with fresh), cover entirely with spirits",
    time: "4–6 weeks, shake daily",
    yield: "Variable",
    shelfLife: "5+ years stored away from light",
    whenToChoose: "Most aromatic and resinous herbs; the simplest and most forgiving method for beginners.",
    steps: [
      "Add chopped herb to a clean glass jar.",
      "Cover with spirits, ensuring herb is fully submerged.",
      "Cap, label, and shake daily for 4–6 weeks.",
      "Strain through cheesecloth, press the marc, bottle in amber dropper bottles.",
    ],
  },
  {
    slug: "weight-tincture",
    name: "Tincture (Weight-to-Volume)",
    menstruum: "Spirits at specific proof, matched to herb",
    ratio: "1:2 (fresh) or 1:5 (dried) by weight to volume",
    time: "2–6 weeks depending on herb",
    yield: "Reproducible — every batch the same potency",
    shelfLife: "5+ years",
    whenToChoose: "Clinical-grade work, professional dosing, comparing batches.",
    steps: [
      "Weigh dried herb in grams.",
      "Multiply by the ratio number to get menstruum mL (e.g. 100 g × 5 = 500 mL).",
      "Match the alcohol % to the herb (e.g. 40% for nervines, 60% for resins, 70%+ for high-resin or alkaloid herbs).",
      "Macerate 2–6 weeks, press, bottle.",
    ],
  },
  {
    slug: "dual-extraction",
    name: "Dual Extraction",
    menstruum: "Water + alcohol, separately, then combined",
    ratio: "Decoct first, then macerate the marc in spirits",
    time: "24-hour decoction simmer + 4–6 weeks maceration",
    yield: "Combined extract with both water- and alcohol-soluble fractions",
    shelfLife: "5+ years",
    whenToChoose: "Medicinal mushrooms (reishi, chaga, lion's mane) where polysaccharides need water and triterpenes need alcohol.",
    steps: [
      "Slow-simmer mushroom in water several hours, reducing.",
      "Strain; reserve the decoction.",
      "Macerate the spent marc in 80-proof spirits for 4–6 weeks.",
      "Combine the strained alcohol extract and the decoction at a 2:1 (alcohol:water) ratio so final ABV stays around 25%.",
    ],
  },
  {
    slug: "infused-oil",
    name: "Infused Oil",
    menstruum: "Olive, jojoba, or fractionated coconut oil",
    ratio: "Cover dry herb completely with oil",
    time: "4 weeks (solar) or 2 hours double-boiler",
    yield: "Variable",
    shelfLife: "1 year in cool, dark storage",
    whenToChoose: "Skin-soothing and topical herbs (calendula, comfrey, st john's wort, arnica).",
    steps: [
      "Pack jar with dried herb (fresh introduces water → mold).",
      "Cover entirely with oil, leaving 1 inch headspace.",
      "Either set in sun for 4 weeks (stir daily) or warm in a double boiler at low heat for 2 hours.",
      "Strain through cheesecloth, press, bottle.",
    ],
  },
  {
    slug: "salve",
    name: "Salve / Ointment",
    menstruum: "Infused oil + beeswax",
    ratio: "1 cup infused oil : 1 oz (28 g) beeswax",
    time: "30 minutes to make",
    yield: "About 1 cup salve",
    shelfLife: "1 year",
    whenToChoose: "Wounds, cracked skin, lip balm — anywhere a non-runny oil application is wanted.",
    steps: [
      "Warm oil and beeswax over low heat until melted.",
      "Test consistency by dipping a cold spoon and chilling — adjust beeswax up or down.",
      "Pour into tins or jars; let set undisturbed.",
    ],
  },
  {
    slug: "syrup",
    name: "Syrup",
    menstruum: "Decoction + honey or sugar",
    ratio: "Equal volumes decoction and sweetener",
    time: "Decoct, reduce by half, combine with sweetener off heat",
    yield: "Variable",
    shelfLife: "Several months refrigerated; honey-only versions ferment if not boiled",
    whenToChoose: "Berries (elderberry), throat-coating syrups (thyme, marshmallow), child-friendly tinctures.",
    steps: [
      "Decoct herb in water; strain.",
      "Optionally reduce to concentrate.",
      "Cool to body temperature, then stir in honey 1:1.",
      "Bottle and refrigerate.",
    ],
  },
  {
    slug: "oxymel",
    name: "Oxymel",
    menstruum: "Raw apple cider vinegar + honey",
    ratio: "1 part herb : 3 parts vinegar : optional honey",
    time: "2–4 weeks",
    yield: "Variable",
    shelfLife: "6+ months in cool storage",
    whenToChoose: "Aromatic and pungent herbs (sage, thyme, garlic, ginger) for respiratory and digestive use.",
    steps: [
      "Combine herb and vinegar in a non-metal jar.",
      "Cap with parchment then a plastic lid (vinegar corrodes metal).",
      "Macerate 2–4 weeks, strain.",
      "Optionally combine with equal honey for fire cider style.",
    ],
  },
  {
    slug: "glycerite",
    name: "Glycerite",
    menstruum: "Vegetable glycerin + water",
    ratio: "3 parts glycerin : 1 part water for fresh; 4:1 for dried",
    time: "4–6 weeks",
    yield: "Variable",
    shelfLife: "1–2 years",
    whenToChoose: "Children, those avoiding alcohol, and aromatic herbs that don't need full alcohol extraction.",
    steps: [
      "Combine herb with glycerin/water mix to fully cover.",
      "Macerate, shaking daily.",
      "Strain and bottle.",
    ],
  },
  {
    slug: "spagyric",
    name: "Spagyric Tincture",
    menstruum: "Alcohol + calcined plant ash + water",
    ratio: "Variable, by mass",
    time: "Several weeks across multiple stages",
    yield: "A 'whole-plant essence' uniting body, soul, and spirit",
    shelfLife: "Years",
    whenToChoose: "Hermetic and alchemical practice — when you want to work with the entire plant including its mineral skeleton.",
    steps: [
      "Macerate plant in alcohol for several weeks (the soul/sulfur).",
      "Press and reserve the tincture.",
      "Burn the marc to ash in a ventilated outdoor space.",
      "Calcine the ash in a kiln until pure white (the body/salt).",
      "Dissolve the salts in distilled water; filter.",
      "Combine the salt solution with the original tincture in a sealed vessel and 'circulate' for days to weeks.",
    ],
  },
];

// ---------- Traditions ----------

export const traditionEntries: TraditionEntry[] = [
  {
    id: "Western",
    origin: "Greco-Roman → European folk → Eclectic medicine (US 19th–20th c.)",
    diagnostic: "Energetics (hot/cold, dry/damp, tense/lax), tissue states, organ system affinity. Eclectic specific indications match symptom patterns to single herbs.",
    signatureHerbs: ["chamomile", "echinacea", "hawthorn", "passionflower", "milk-thistle"],
    teachers: ["Matthew Wood", "Paul Bergner", "jim mcdonald", "Stephen Buhner"],
    summary: "A vitalist tradition that survived the rise of biomedicine through the Eclectic and Physiomedical schools. Centres on terrain — what kind of tissue and constitution is in front of you — and matches the herb to that pattern, not just the diagnosis.",
  },
  {
    id: "Wise Woman",
    origin: "European peasant women, oral tradition, pre-witch-trial healers",
    diagnostic: "Nourishment first; we are whole already. Long infusions of nutritive herbs as daily food.",
    signatureHerbs: ["stinging-nettle", "oatstraw", "red-clover", "raspberry-leaf", "comfrey"],
    teachers: ["Susun Weed", "Rosemary Gladstar"],
    summary: "Less interventional than other traditions — the assumption is that the body wants to be well, and our role is to nourish, listen, and remove what blocks. Daily quart infusions of mineral-rich herbs are the centrepiece.",
  },
  {
    id: "Eclectic",
    origin: "United States, late 19th–early 20th century",
    diagnostic: "Specific indications: 'red tongue with raised papillae and burning sensation → echinacea'. Match herb to subtle symptom picture, not pharmacology.",
    signatureHerbs: ["echinacea", "lobelia", "skullcap", "passionflower", "wild-yam"],
    teachers: ["John King", "Harvey Wickes Felter", "Kerry Bone"],
    summary: "America's home-grown alternative to the heroic medicine of bleeding and mercury. Combined precise observation, plant medicine, and physiomedical theory. Their dispensatory work still grounds modern Western herbalism.",
  },
  {
    id: "TCM",
    origin: "China, ~2,000 years documented; integrated with biomedicine in modern PRC",
    diagnostic: "Eight Principles (yin/yang, hot/cold, deficiency/excess, interior/exterior); Five Phases; tongue and pulse diagnosis; herbs combined in formulas of 4–15 ingredients with chief-deputy-assistant-envoy roles.",
    signatureHerbs: ["astragalus", "ginseng", "schisandra", "rehmannia", "dong-quai"],
    teachers: ["Li Shi-Zhen", "Zhang Zhong-Jing (Han dynasty)", "Subhuti Dharmananda", "Bob Flaws"],
    summary: "The most institutionally developed herbal tradition in the world. Prescribes in formulas, not single herbs. Diagnosis is functional (the patterns of disharmony) rather than purely structural.",
  },
  {
    id: "Ayurveda",
    origin: "Indian subcontinent, ~3,000 years (Charaka and Sushruta Samhitas)",
    diagnostic: "Three doshas (vata, pitta, kapha); seven dhatus (tissues); thirteen agnis (digestive fires). Constitutional treatment.",
    signatureHerbs: ["ashwagandha", "tulsi", "shatavari", "turmeric", "bacopa"],
    teachers: ["Vasant Lad", "Robert Svoboda", "David Frawley"],
    summary: "A whole-life system in which herbs work alongside diet, daily routine, yoga, and breathwork. The materia medica is rich in rasayanas (rejuvenatives) used long-term to build resilience.",
  },
  {
    id: "Unani",
    origin: "Greek (Hippocrates → Galen) → Arab refinement (Avicenna) → Indian subcontinent",
    diagnostic: "Four humours (blood, phlegm, yellow bile, black bile); temperament-based prescribing.",
    signatureHerbs: ["fennel", "rose", "saffron", "myrrh", "frankincense"],
    teachers: ["Hakim Mohammed Said", "Avicenna (Ibn Sina)"],
    summary: "The river that carried Galenic medicine to India and back into Europe. Still practised in South Asia. Strong in chronic disease management and dietary therapy.",
  },
  {
    id: "Spagyric",
    origin: "Hermetic and Paracelsian alchemy, Renaissance Europe",
    diagnostic: "Body / soul / spirit triad; doctrine of signatures; planetary correspondences.",
    signatureHerbs: ["lemon-balm", "rose", "rosemary", "lavender", "st-johns-wort"],
    teachers: ["Paracelsus", "Manfred Junius", "Frater Albertus"],
    summary: "An esoteric craft that separates and recombines the parts of a plant — tincture (soul), calcined ash (body), distilled volatile (spirit). Slow, ritual work that produces small quantities of highly considered medicine.",
  },
];

// ---------- Goals ----------

export const goals: HerbalGoal[] = [
  {
    id: "sleep",
    name: "Restorative sleep",
    summary: "Sleep is built during the day, fortified by ritual, and finished by herbs. Herbal allies for sleep work best alongside light, food, and stress hygiene.",
    herbs: ["chamomile", "passionflower", "valerian", "lemon-balm", "hops", "lavender"],
    protocol: [
      "Week 1: build the daily container — sunrise light, no caffeine after noon, screens off 1 hour before bed.",
      "Week 2: add a wind-down infusion — chamomile + lemon balm + a pinch of lavender, 1 cup, 1 hour before bed.",
      "Week 3: if sleep onset is the issue, add passionflower tincture (3 mL) 30 min before bed.",
      "Week 4: if still struggling, layer in valerian + hops tincture (2 mL) for sleep onset; reassess after 14 nights.",
    ],
    recipe: {
      name: "Three-Flower Sleep Tea",
      ingredients: ["1 tbsp chamomile", "1 tbsp lemon balm", "1 tsp lavender", "8 oz boiling water"],
      method: "Combine in a covered teapot, steep 10 minutes, strain. Drink 1 hour before bed.",
    },
  },
  {
    id: "anxiety",
    name: "Calm under pressure",
    summary: "Anxiety lives in a hyperactive sympathetic nervous system and a depleted nervine baseline. We restore the baseline with trophorestoratives and modulate the acute peaks with anxiolytics.",
    herbs: ["chamomile", "lemon-balm", "passionflower", "skullcap", "ashwagandha", "tulsi"],
    protocol: [
      "Daily: ashwagandha 300 mg or tulsi 1 tbsp infusion to lower the baseline cortisol.",
      "Daily: skullcap or oatstraw infusion 1 cup as a nervine trophorestorative.",
      "As needed: chamomile capsules 220 mg or passionflower tincture 3 mL for acute peaks.",
      "Reassess after 6–8 weeks. Tonifying work is slow; do not expect overnight changes.",
    ],
    recipe: {
      name: "Steady Heart Daily Tonic",
      ingredients: ["1 oz dried oatstraw", "1 oz dried lemon balm", "1 qt boiling water"],
      method: "Combine in a quart jar, fill with boiling water, cover and steep 4 hours. Strain and sip throughout the day.",
    },
  },
  {
    id: "immunity",
    name: "Resilient immunity",
    summary: "Build wei qi when well; pulse-fight at first sign. The two are different jobs done by different herbs.",
    herbs: ["astragalus", "elderberry", "echinacea", "thyme", "garlic", "reishi"],
    protocol: [
      "Daily through autumn and winter: astragalus 9 g in soup, OR reishi dual extract 1 tsp/day.",
      "Daily children + adults: elderberry syrup 1 tbsp.",
      "First sign of cold: echinacea tincture 60 drops every 2 hours for 48 hours.",
      "Acute respiratory: thyme honey 1 tsp every 2 hours; garlic 1 raw clove per day.",
    ],
    recipe: {
      name: "Winter Wellness Syrup",
      ingredients: ["1 cup dried elderberries", "4 cups water", "2 cinnamon sticks", "1 inch fresh ginger sliced", "1 cup raw honey"],
      method: "Simmer berries, water, cinnamon, and ginger 30 minutes, reducing by half. Strain, cool to body temp, stir in honey. Refrigerate; 1 tbsp daily for prevention or every 2 hours acutely.",
    },
  },
  {
    id: "digestion",
    name: "A happy gut",
    summary: "Digestion has a rhythm — receive (bitters), break down (carminatives), assimilate (mucilage), eliminate (mild aperients). Choose the herb to match the bottleneck.",
    herbs: ["dandelion", "ginger", "peppermint", "fennel", "marshmallow", "chamomile"],
    protocol: [
      "Sluggish digestion: gentian or dandelion-root tincture 5–15 drops 15 min before meals.",
      "Bloating, gas, cramping: fennel + peppermint infusion after meals.",
      "Reflux/IBS: marshmallow root cold maceration 1 cup, 30 min before meals.",
      "Constipation: triphala 1 g at bedtime, plus daily ground flax 1 tbsp.",
    ],
    recipe: {
      name: "After-Meal Carminative Blend",
      ingredients: ["1 tsp fennel seed (crushed)", "1 tsp peppermint leaf", "8 oz boiling water"],
      method: "Cover and steep 10 minutes, strain. Drink after meals.",
    },
  },
  {
    id: "hormones",
    name: "Cyclical balance",
    summary: "Hormonal terrain — particularly the female cycle — responds to slow, consistent support. Vitex is the workhorse for HPO axis; nervines and adaptogens support the entire field.",
    herbs: ["vitex", "shatavari", "red-clover", "rose", "ashwagandha", "cramp-bark"],
    protocol: [
      "PMS / luteal-phase deficiency: vitex 40 mg/day for 3+ months, taken in the morning.",
      "Menstrual cramps: cramp bark tincture 5 mL every 1–2 hours acutely; warm castor-oil packs.",
      "Menopause hot flashes: standardised black cohosh, OR sage tincture 2 mL 2×/day; red clover infusion 1 cup/day.",
      "Daily field support: ashwagandha 300 mg + rose petal infusion.",
    ],
    recipe: {
      name: "Heart of the Cycle Infusion",
      ingredients: ["1 tbsp red clover blossom", "1 tbsp rose petal", "1 tsp lemon balm", "8 oz boiling water"],
      method: "Cover and steep 10 minutes, strain. 1 cup daily through luteal phase.",
    },
  },
  {
    id: "mood",
    name: "Bright spirit",
    summary: "Low mood lives at the intersection of inflammation, neurotransmitter availability, and the nervous-system baseline. Herbs work alongside light, movement, and connection — not instead of them.",
    herbs: ["st-johns-wort", "lemon-balm", "rose", "tulsi", "saffron"],
    protocol: [
      "Mild–moderate depressive symptoms: standardised SJW 300 mg 3×/day for 6+ weeks (check drug interactions first).",
      "Daily lift: tulsi infusion 1 cup AM + lemon balm tincture 3 mL PM.",
      "Anhedonia: saffron 30 mg/day standardised extract.",
      "Always: morning daylight, movement, social contact.",
    ],
    recipe: {
      name: "Heart's Ease Tea",
      ingredients: ["1 tbsp lemon balm", "1 tsp rose petal", "1 tsp tulsi", "8 oz boiling water"],
      method: "Cover and steep 10 minutes, strain. Drink as needed for low mood.",
    },
  },
  {
    id: "skin",
    name: "Clear skin",
    summary: "Skin reflects the gut and lymph. Topical work soothes; internal alteratives are the long game.",
    herbs: ["calendula", "burdock", "yellow-dock", "red-clover", "stinging-nettle", "comfrey"],
    protocol: [
      "Internal: alterative blend (burdock + yellow dock + red clover) tincture 5 mL 3×/day for 12 weeks.",
      "Daily: nettle long infusion 1 qt for mineral nourishment.",
      "Topical: calendula salve for daily skin care; comfrey for closed bruises only.",
      "Address root: gut microbiome, blood sugar, sleep, hormones.",
    ],
    recipe: {
      name: "Calendula All-Purpose Salve",
      ingredients: ["1 cup calendula-infused olive oil", "1 oz beeswax", "10 drops lavender essential oil (optional)"],
      method: "Warm oil and beeswax until melted. Pour into tins; let set.",
    },
  },
  {
    id: "joints",
    name: "Supple joints",
    summary: "Joint pain has many drivers — inflammation, degeneration, autoimmunity. Herbs work best paired with movement and dietary anti-inflammatory work.",
    herbs: ["turmeric", "boswellia", "ginger", "rosemary", "stinging-nettle"],
    protocol: [
      "Standardised curcumin 1,000 mg/day with absorption enhancer.",
      "Boswellia 300 mg 3×/day for OA.",
      "Daily nettle infusion 1 qt for mineralisation.",
      "Topical capsaicin cream for localised pain; warm castor-oil packs.",
    ],
    recipe: {
      name: "Golden Anti-Inflammatory Milk",
      ingredients: ["1 tsp turmeric powder", "1/2 tsp ginger powder", "1/4 tsp black pepper", "1 cup milk of choice", "1 tsp ghee", "Honey to taste"],
      method: "Whisk and gently warm; do not boil. Drink before bed.",
    },
  },
  {
    id: "cardio",
    name: "Strong heart",
    summary: "Hawthorn is the foundation; supporting herbs address blood pressure, lipids, and emotional heart.",
    herbs: ["hawthorn", "garlic", "motherwort", "rose", "linden"],
    protocol: [
      "Foundational: hawthorn standardised extract 450 mg 2×/day, long term.",
      "Lipids/BP: aged garlic extract 600 mg 2×/day.",
      "Anxious heart: motherwort tincture 3 mL 2×/day.",
      "Always: cardiologist coordination if on cardiac medications.",
    ],
    recipe: {
      name: "Heart Steadying Tincture Blend",
      ingredients: ["2 parts hawthorn berry tincture", "1 part motherwort tincture", "1 part rose petal glycerite"],
      method: "Combine in a 2 oz dropper. 3 mL morning and evening.",
    },
  },
  {
    id: "cognition",
    name: "Sharp mind",
    summary: "Cognition responds to circulation, neurogenesis, and reduced inflammation. Bacopa is the tortoise; rosemary inhalation the hare; ginkgo the elder.",
    herbs: ["bacopa", "lions-mane", "rosemary", "ginkgo", "rhodiola"],
    protocol: [
      "Long term (3+ months): bacopa 300 mg/day with food.",
      "Daily: lion's mane dual extract 1,500 mg/day.",
      "Acute focus: inhalation of rosemary essential oil while studying.",
      "Older adults: ginkgo EGb 761 240 mg/day for 8+ weeks.",
    ],
    recipe: {
      name: "Memory Infusion",
      ingredients: ["1 tsp dried rosemary", "1 tsp dried gotu kola", "1 tsp dried lemon balm", "8 oz boiling water"],
      method: "Cover and steep 10 minutes, strain. 1 cup in the morning.",
    },
  },
];

// ---------- Studies ----------

export const studies: Study[] = [
  { id: "amsterdam-2009", herb: "chamomile", title: "A randomised trial of Matricaria recutita for GAD", journal: "J Clin Psychopharmacol", year: 2009, finding: "Significant reduction in HAM-A vs placebo over 8 weeks.", dosing: "220–1,100 mg/day standardised extract", bottomLine: "Genuine anxiolytic effect; one of the strongest evidence bases for any herbal nervine." },
  { id: "amsterdam-2016", herb: "chamomile", title: "Long-term chamomile for relapse prevention in GAD", journal: "Phytomedicine", year: 2016, finding: "Reduction in relapse rates with continued use.", dosing: "1,500 mg/day", bottomLine: "Suitable for long-term use unlike benzodiazepines." },
  { id: "chandrasekhar-2012", herb: "ashwagandha", title: "Standardised root extract reduces stress and anxiety", journal: "Indian J Psychol Med", year: 2012, finding: "27.9% reduction in serum cortisol and significant PSS-10 reduction.", dosing: "300 mg KSM-66 twice daily", bottomLine: "Strong cortisol-modulating effect — a workhorse adaptogen." },
  { id: "lopresti-2019", herb: "ashwagandha", title: "Ashwagandha for stress and sleep in adults", journal: "Medicine (Baltimore)", year: 2019, finding: "Improved DASS-21 stress and sleep quality.", dosing: "240 mg/day", bottomLine: "Confirms HPA-axis modulation at moderate doses." },
  { id: "tildesley-2003", herb: "sage", title: "Salvia officinalis improves memory in healthy young adults", journal: "Pharmacol Biochem Behav", year: 2003, finding: "Acute and dose-dependent memory enhancement.", dosing: "300–600 mg dried leaf", bottomLine: "Supports traditional cognitive use of sage." },
  { id: "kennedy-2002", herb: "lemon-balm", title: "Melissa officinalis modulates mood and cognition", journal: "Pharmacol Biochem Behav", year: 2002, finding: "Improved mood and reduced anxiety with cognitive task performance.", dosing: "600 mg standardised extract", bottomLine: "Lemon balm is genuinely thymoleptic and nootropic." },
  { id: "stough-2008", herb: "bacopa", title: "Chronic bacopa improves cognition", journal: "Phytother Res", year: 2008, finding: "Significant improvement in memory acquisition.", dosing: "300 mg/day, 12 weeks", bottomLine: "Slow build; effects appear after weeks, not days." },
  { id: "ried-2013", herb: "garlic", title: "Aged garlic extract reduces blood pressure", journal: "Maturitas", year: 2013, finding: "Mean systolic reduction of 8–9 mmHg in hypertensives.", dosing: "600–1,500 mg AGE/day", bottomLine: "Modest but real BP-lowering effect; safer with anticoagulant caution." },
  { id: "kuptniratsaikul-2014", herb: "turmeric", title: "Curcuma domestica vs ibuprofen for OA", journal: "Clin Interv Aging", year: 2014, finding: "Comparable efficacy with fewer GI side effects.", dosing: "1,500 mg curcumin/day", bottomLine: "Real OA pain reduction with absorption-enhanced curcumin." },
  { id: "akhondzadeh-2001", herb: "passionflower", title: "Passiflora vs oxazepam for GAD", journal: "J Clin Pharm Ther", year: 2001, finding: "Equivalent anxiety reduction with less performance impairment.", dosing: "45 drops 3×/day passionflower tincture", bottomLine: "Performance-friendly anxiolytic." },
  { id: "linde-2008", herb: "st-johns-wort", title: "St John's wort for major depression", journal: "Cochrane Database Syst Rev", year: 2008, finding: "Equivalent to standard antidepressants in mild–moderate depression.", dosing: "300 mg standardised extract 3×/day", bottomLine: "Effective; check for drug interactions before use." },
  { id: "cohen-2014", herb: "tulsi", title: "Holy basil — the science", journal: "J Ayurveda Integr Med", year: 2014, finding: "Improved metabolic and stress markers in T2DM and stress.", dosing: "300–600 mg/day extract", bottomLine: "Adaptogenic and metabolically supportive." },
  { id: "tiralongo-2016", herb: "elderberry", title: "Elderberry extract in air travellers", journal: "Nutrients", year: 2016, finding: "Reduced cold duration and severity.", dosing: "600–900 mg/day standardised", bottomLine: "Real prophylactic effect when started before exposure." },
  { id: "bent-2006", herb: "valerian", title: "Valerian for sleep — meta-analysis", journal: "Am J Med", year: 2006, finding: "Modest improvement in subjective sleep quality.", dosing: "300–600 mg standardised extract", bottomLine: "Best for hyperaroused-mind insomnia; not universal." },
  { id: "kasper-2010", herb: "lavender", title: "Silexan oral lavender oil for subsyndromal anxiety", journal: "Int Clin Psychopharmacol", year: 2010, finding: "Non-inferior to lorazepam without sedation/dependence.", dosing: "80 mg/day Silexan", bottomLine: "A surprising and well-studied capsule anxiolytic." },
  { id: "moss-2012", herb: "rosemary", title: "Inhalation of rosemary aroma improves cognition", journal: "Ther Adv Psychopharmacol", year: 2012, finding: "Faster reaction times and prospective memory.", dosing: "Diffused essential oil during testing", bottomLine: "Real and immediate effect — try it during deep work." },
  { id: "mori-2009", herb: "lions-mane", title: "Hericium for mild cognitive impairment", journal: "Phytother Res", year: 2009, finding: "Cognitive improvement on HDS-R, reversed after stopping.", dosing: "3 g powder/day, 16 weeks", bottomLine: "Real, but maintenance is needed; benefit fades on discontinuation." },
  { id: "olsson-2009", herb: "rhodiola", title: "Rhodiola SHR-5 for stress-related fatigue", journal: "Planta Med", year: 2009, finding: "Reduced fatigue and improved cortisol response.", dosing: "576 mg/day SHR-5", bottomLine: "Best for active fatigue with stress; activating in evenings." },
  { id: "schellenberg-2001", herb: "vitex", title: "Vitex agnus-castus for PMS", journal: "BMJ", year: 2001, finding: "Significant reduction in PMS symptoms.", dosing: "20 mg standardised extract daily", bottomLine: "Workhorse for cyclical mastalgia and luteal-phase deficiency." },
  { id: "holubarsch-2008", herb: "hawthorn", title: "WS 1442 in chronic heart failure (SPICE)", journal: "Eur J Heart Fail", year: 2008, finding: "Adjunct to standard care reduced cardiac mortality in subgroup.", dosing: "900 mg WS 1442/day", bottomLine: "Suitable adjunct under cardiology supervision in NYHA II–III." },
  { id: "khanna-2014", herb: "peppermint", title: "Enteric-coated peppermint oil for IBS — meta-analysis", journal: "J Clin Gastroenterol", year: 2014, finding: "Significant reduction in global IBS symptoms.", dosing: "0.2 mL enteric-coated capsule 3×/day, 4–8 weeks", bottomLine: "First-line botanical for IBS." },
  { id: "alammar-2019", herb: "peppermint", title: "Peppermint oil for IBS — updated meta-analysis", journal: "BMC Complement Altern Med", year: 2019, finding: "Confirms efficacy with low side-effect burden.", dosing: "Enteric-coated, 4–8 weeks", bottomLine: "Reproducible benefit for global IBS severity and abdominal pain." },
  { id: "pommier-2004", herb: "calendula", title: "Calendula vs trolamine for radiation dermatitis", journal: "J Clin Oncol", year: 2004, finding: "Significant reduction in grade ≥2 dermatitis.", dosing: "Topical cream 2×/day during radiotherapy", bottomLine: "Supportive care in oncology — speak with care team first." },
  { id: "widrig-2007", herb: "arnica", title: "Topical arnica vs ibuprofen for OA hand pain", journal: "Rheumatol Int", year: 2007, finding: "Equivalent pain relief and function.", dosing: "Topical gel 3×/day", bottomLine: "Closed-skin topical use only." },
  { id: "predel-2005", herb: "comfrey", title: "Topical comfrey root extract for back pain", journal: "Phytomedicine", year: 2005, finding: "Significant pain reduction vs placebo.", dosing: "Topical cream 3×/day, 5 days", bottomLine: "Topical only; do not ingest." },
  { id: "sarris-2013", herb: "kava", title: "Aqueous kava for GAD — KGA trial", journal: "J Clin Psychopharmacol", year: 2013, finding: "Significant anxiety reduction without hepatotoxicity at noble cultivar aqueous prep.", dosing: "120–240 mg kavalactones/day", bottomLine: "Use noble cultivar aqueous extract; avoid acetone/leaf-stem extracts." },
  { id: "kim-2013", herb: "ginseng", title: "Panax ginseng for fatigue", journal: "Ann Pharmacother", year: 2013, finding: "Modest fatigue reduction.", dosing: "200 mg G115/day", bottomLine: "Modest effect; better in cold-deficient constitutions." },
  { id: "howell-2010", herb: "cranberry", title: "Cranberry PACs for UTI prevention", journal: "Phytochemistry", year: 2010, finding: "36 mg PACs/day reduced recurrent UTI in women.", dosing: "36 mg PACs/day", bottomLine: "Standardised PAC content matters more than juice volume." },
  { id: "bommer-2011", herb: "sage", title: "Sage extract for menopausal hot flashes", journal: "Adv Ther", year: 2011, finding: "50% reduction in hot flash frequency at 8 weeks.", dosing: "Sage extract tablet daily", bottomLine: "Real benefit in surgical and natural menopause." },
  { id: "koetter-2007", herb: "valerian", title: "Valerian + hops fixed combination for sleep", journal: "Phytother Res", year: 2007, finding: "Reduced sleep latency vs placebo.", dosing: "500 mg valerian + 120 mg hops", bottomLine: "Common European OTC sleep botanical works." },
];

// ---------- Teachers, schools, books ----------

export const teachers: Teacher[] = [
  { name: "Susun Weed", lineage: "Wise Woman", knownFor: "Wise Woman tradition; long infusions of nourishing herbs.", book: "Healing Wise" },
  { name: "Rosemary Gladstar", lineage: "Wise Woman", knownFor: "Modern grandmother of American herbalism; founder of Sage Mountain.", book: "Family Herbal" },
  { name: "Matthew Wood", lineage: "Western", knownFor: "Specific indications; pulse and tongue diagnosis applied to Western herbs.", book: "The Earthwise Herbal" },
  { name: "Stephen Buhner", lineage: "Western", knownFor: "Lyme protocols; the heart as an organ of perception; sacred plant medicine.", book: "Healing Lyme" },
  { name: "Paul Bergner", lineage: "Western", knownFor: "Energetics, blood sugar, and clinical herbalism.", book: "The Healing Power of Garlic" },
  { name: "jim mcdonald", lineage: "Western", knownFor: "Teaching the foundational herbs deeply; tissue-state model.", book: "(extensive online and lecture archive)" },
  { name: "Aviva Romm, MD", lineage: "Western", knownFor: "Integrative women's medicine; pregnancy and pediatric herbalism.", book: "Botanical Medicine for Women's Health" },
  { name: "Kerry Bone", lineage: "Eclectic", knownFor: "Modern Eclectic and Western clinical herbalism; co-author of Principles & Practice.", book: "Principles and Practice of Phytotherapy" },
  { name: "Vasant Lad", lineage: "Ayurveda", knownFor: "Ayurvedic teacher and physician; founder of the Ayurvedic Institute.", book: "Ayurveda: The Science of Self-Healing" },
  { name: "David Frawley", lineage: "Ayurveda", knownFor: "Yoga and Ayurveda integration; western interpretation.", book: "Ayurvedic Healing" },
  { name: "Subhuti Dharmananda", lineage: "TCM", knownFor: "Director of the Institute for Traditional Medicine; deep online TCM resource.", book: "(ITM online encyclopedia)" },
  { name: "Bob Flaws", lineage: "TCM", knownFor: "Prolific translator of TCM gynecology and pediatrics.", book: "Sticking to the Point" },
  { name: "Manfred Junius", lineage: "Spagyric", knownFor: "Brought spagyric alchemy into the modern era.", book: "Spagyrics: The Alchemical Preparation of Medicinal Essences" },
  { name: "kg Stiles", lineage: "Western", knownFor: "Aromatherapy and clinical herbal protocols.", book: "The Essential Oils Complete Reference Guide" },
  { name: "Michael Tierra", lineage: "TCM", knownFor: "Bridging TCM, Ayurveda, and Western herbalism.", book: "The Way of Herbs" },
];

export const schools: School[] = [
  { name: "Sage Mountain Herbal Center (Vermont)", format: "In-person", founded: 1987, focus: "Wise Woman tradition; founder Rosemary Gladstar.", notable: "Annual women's herbal conference." },
  { name: "Chestnut School of Herbal Medicine", format: "Online", founded: 2007, focus: "Bioregional, beginner-friendly, Appalachian flavour.", notable: "Foraging Course is a standout." },
  { name: "Herbal Academy", format: "Online", founded: 2013, focus: "Modular online programs from intro to advanced.", notable: "Affordable entry-level certification." },
  { name: "California School of Herbal Studies (CSHS)", format: "In-person", founded: 1978, focus: "Wise Woman + Western clinical traditions.", notable: "Among the oldest US herbal schools." },
  { name: "Bastyr University", format: "Hybrid", founded: 1978, focus: "Naturopathic medicine including botanical medicine.", notable: "Accredited ND program with strong herbal training." },
  { name: "Maryland University of Integrative Health (MUIH)", format: "Online", founded: 1974, focus: "Master's in Therapeutic Herbalism.", notable: "Graduate-level academic herbalism." },
  { name: "American Herbalists Guild (AHG)", format: "Hybrid", founded: 1989, focus: "Professional credentialing body for clinical herbalists in the US.", notable: "Registered Herbalist (RH) credential." },
  { name: "National Institute of Medical Herbalists (NIMH)", format: "Hybrid", founded: 1864, focus: "UK professional body for medical herbalists.", notable: "Oldest professional herbalist organisation in the world." },
];

export const books: Book[] = [
  { title: "The Earthwise Herbal", author: "Matthew Wood", year: 2008, level: "Foundational", why: "Two-volume materia medica written in the voice of an Eclectic master." },
  { title: "Medical Herbalism", author: "David Hoffmann", year: 2003, level: "Reference", why: "1,000-page bridge between traditional and pharmacological herbalism." },
  { title: "Healing Wise", author: "Susun Weed", year: 1989, level: "Foundational", why: "The voice of the Wise Woman tradition; pairs nourishment with deep knowing." },
  { title: "The Family Herbal", author: "Rosemary Gladstar", year: 2001, level: "Foundational", why: "Beginner-friendly recipes and protocols across the lifecycle." },
  { title: "Principles and Practice of Phytotherapy", author: "Kerry Bone & Simon Mills", year: 2013, level: "Advanced", why: "The clinical herbalist's textbook — pharmacology, dosing, evidence, formulas." },
  { title: "Adaptogens: Herbs for Strength, Stamina, Stress Relief", author: "David Winston & Steven Maimes", year: 2007, level: "Intermediate", why: "Definitive Western-clinical guide to adaptogens." },
  { title: "Botanical Medicine for Women's Health", author: "Aviva Romm", year: 2017, level: "Advanced", why: "Integrative women's herbalism from a Yale-trained MD-herbalist." },
  { title: "PDR for Herbal Medicines", author: "Thomson Healthcare", year: 2007, level: "Reference", why: "Drug-style monographs with dosing, interactions, contraindications." },
  { title: "American Herbal Pharmacopoeia Monographs", author: "AHP", year: 2020, level: "Reference", why: "Single-herb peer-reviewed monographs; the gold standard for verification." },
  { title: "Healing with Whole Foods", author: "Paul Pitchford", year: 2002, level: "Intermediate", why: "TCM dietary therapy alongside herbal foundations." },
  { title: "Ayurveda and Marma Therapy", author: "Frawley, Ranade, Lele", year: 2003, level: "Intermediate", why: "Ayurvedic energy medicine alongside herbal use." },
  { title: "Healing Lyme", author: "Stephen Harrod Buhner", year: 2015, level: "Advanced", why: "The Lyme protocol that brought andrographis, cat's claw, and astragalus into clinical view." },
  { title: "Sacred Plant Medicine", author: "Stephen Harrod Buhner", year: 2006, level: "Foundational", why: "Indigenous-respectful framing for plant medicine as sacred relationship." },
  { title: "Herbal Antibiotics", author: "Stephen Harrod Buhner", year: 2012, level: "Intermediate", why: "Resistant-organism herbal protocols, chemistry-supported." },
  { title: "The Way of Herbs", author: "Michael Tierra", year: 1998, level: "Foundational", why: "Beginner-friendly entry into multi-tradition herbalism." },
  { title: "Materia Medica of Western Herbs", author: "Carole Fisher", year: 2009, level: "Reference", why: "British Western clinical herbal reference; rigorous detail." },
  { title: "Spagyrics: The Alchemical Preparation of Medicinal Essences", author: "Manfred Junius", year: 2007, level: "Advanced", why: "The standard modern text on alchemical herbal preparation." },
  { title: "Encyclopedia of Herbal Medicine", author: "Andrew Chevallier", year: 2016, level: "Foundational", why: "Beautifully illustrated browse-able reference." },
  { title: "Wild Remedies", author: "Rosalee de la Forêt & Emily Han", year: 2020, level: "Foundational", why: "Foraging plus practical recipes; great gateway book." },
  { title: "Backyard Medicine", author: "Julie Bruton-Seal & Matthew Seal", year: 2009, level: "Foundational", why: "European hedgerow-style herbalism with stunning recipes." },
  { title: "Alchemy of Herbs", author: "Rosalee de la Forêt", year: 2017, level: "Foundational", why: "Energetics-first cookbook approach to common herbs." },
  { title: "Body into Balance", author: "Maria Noël Groves", year: 2016, level: "Intermediate", why: "Whole-body herbalism with formulas for system imbalances." },
  { title: "The Modern Herbal Dispensatory", author: "Thomas Easley & Steven Horne", year: 2016, level: "Intermediate", why: "Modern weight-based methods with practical formulas." },
  { title: "Plant Spirit Medicine", author: "Eliot Cowan", year: 2014, level: "Foundational", why: "Indigenous-rooted relationship-based healing with plants." },
  { title: "The Trip to Echo Spring (on creativity)", author: "Olivia Laing", year: 2013, level: "Reference", why: "Not herbal — but a beautiful book on intoxicants, useful context for working with mind-active plants." },
];

// ---------- Interactions ----------

export const interactions: Interaction[] = [
  { herb: "st-johns-wort", drug: "SSRIs / SNRIs", mechanism: "Serotonergic additive — risk of serotonin syndrome.", severity: "Major", guidance: "Avoid combination. Wash out 2 weeks between." },
  { herb: "st-johns-wort", drug: "Combined oral contraceptives", mechanism: "CYP3A4 induction reduces estrogen exposure.", severity: "Major", guidance: "Use additional contraception or alternative herb." },
  { herb: "st-johns-wort", drug: "Warfarin", mechanism: "CYP induction reduces warfarin levels.", severity: "Major", guidance: "Avoid; coordinate with prescriber." },
  { herb: "st-johns-wort", drug: "Cyclosporine, tacrolimus", mechanism: "CYP induction reduces immunosuppressant levels — graft rejection risk.", severity: "Major", guidance: "Absolute avoid in transplant patients." },
  { herb: "st-johns-wort", drug: "HIV antiretrovirals (PIs, NNRTIs)", mechanism: "Reduces drug levels.", severity: "Major", guidance: "Absolute avoid." },
  { herb: "garlic", drug: "Anticoagulants / antiplatelets", mechanism: "Additive bleeding risk.", severity: "Moderate", guidance: "Stop 2 weeks before surgery; use lower doses." },
  { herb: "ginkgo", drug: "Warfarin, aspirin", mechanism: "Additive antiplatelet effect.", severity: "Moderate", guidance: "Use with caution; monitor INR." },
  { herb: "kava", drug: "Sedatives, alcohol", mechanism: "Additive CNS depression; theoretical hepatotoxicity.", severity: "Major", guidance: "Avoid combination; do not drive." },
  { herb: "licorice", drug: "Loop and thiazide diuretics", mechanism: "Additive potassium loss; pseudoaldosteronism.", severity: "Major", guidance: "Use DGL or avoid." },
  { herb: "licorice", drug: "Digoxin", mechanism: "Hypokalemia potentiates digoxin toxicity.", severity: "Major", guidance: "Avoid whole licorice." },
  { herb: "ashwagandha", drug: "Thyroid hormone, immunosuppressants, sedatives", mechanism: "Additive thyroid stimulation; immune activation; CNS depression.", severity: "Moderate", guidance: "Coordinate with prescriber." },
  { herb: "ginseng", drug: "MAOIs, anticoagulants, hypoglycemics", mechanism: "Multiple — variable.", severity: "Moderate", guidance: "Avoid in MAOI users." },
  { herb: "valerian", drug: "Benzodiazepines, opioids, alcohol", mechanism: "CNS depression additive.", severity: "Moderate", guidance: "Caution; do not drive." },
  { herb: "hawthorn", drug: "Cardiac medications (digoxin, beta-blockers, ACE inhibitors)", mechanism: "Additive cardiac effects.", severity: "Moderate", guidance: "Coordinate with cardiologist; do not self-prescribe." },
  { herb: "milk-thistle", drug: "Drugs metabolised by CYP3A4 / CYP2C9", mechanism: "Mild CYP inhibition.", severity: "Minor", guidance: "Generally safe; check chemotherapeutic regimens." },
  { herb: "cranberry", drug: "Warfarin", mechanism: "Variable INR effect.", severity: "Minor", guidance: "Monitor INR if adding regularly." },
  { herb: "turmeric", drug: "Anticoagulants", mechanism: "Antiplatelet potentiation at high dose.", severity: "Moderate", guidance: "Stop 2 weeks before surgery." },
  { herb: "saw-palmetto", drug: "Anti-androgen therapies", mechanism: "Additive 5-α-reductase inhibition.", severity: "Moderate", guidance: "Coordinate with urologist." },
  { herb: "vitex", drug: "Dopamine antagonists (antipsychotics)", mechanism: "Mechanistic antagonism.", severity: "Moderate", guidance: "Avoid combination." },
  { herb: "echinacea", drug: "Immunosuppressants", mechanism: "Theoretical antagonism of suppression.", severity: "Moderate", guidance: "Avoid in transplant or autoimmune flare under suppression." },
];

// ---------- At-risk plants ----------

export const atRisk: AtRiskPlant[] = [
  { name: "American Ginseng (Panax quinquefolius)", status: "At-Risk", region: "Eastern US woodlands", alternative: "Cultivated American ginseng; eleuthero (Eleutherococcus senticosus)" },
  { name: "Goldenseal (Hydrastis canadensis)", status: "At-Risk", region: "Eastern US understory", alternative: "Oregon grape root (Mahonia aquifolium); barberry; coptis" },
  { name: "Black Cohosh (Actaea racemosa)", status: "At-Risk", region: "Eastern US", alternative: "Cultivated black cohosh only; vitex for some indications" },
  { name: "Slippery Elm (Ulmus rubra)", status: "At-Risk", region: "Eastern North America", alternative: "Marshmallow root" },
  { name: "Wild Yam (Dioscorea villosa)", status: "At-Risk", region: "Appalachian US", alternative: "Cramp bark; cultivated wild yam" },
  { name: "Lady's Slipper Orchid (Cypripedium spp.)", status: "Endangered", region: "North America", alternative: "Pulsatilla; passionflower" },
  { name: "Osha (Ligusticum porteri)", status: "At-Risk", region: "Rocky Mountains", alternative: "Elecampane; thyme" },
  { name: "Trillium (Trillium spp.)", status: "At-Risk", region: "Eastern US", alternative: "Avoid wild; substitute with vitex or motherwort by indication" },
  { name: "Echinacea angustifolia (wild)", status: "To-Watch", region: "Great Plains", alternative: "Cultivated E. purpurea" },
  { name: "Arnica (Arnica montana)", status: "At-Risk", region: "European mountains", alternative: "Cultivated A. chamissonis" },
  { name: "Sandalwood (Santalum album)", status: "Endangered", region: "India", alternative: "Australian sandalwood (S. spicatum); cedarwood" },
  { name: "Frankincense (Boswellia sacra)", status: "At-Risk", region: "Horn of Africa", alternative: "B. carterii or B. serrata from sustainable harvest" },
  { name: "Rhodiola rosea (wild)", status: "At-Risk", region: "Siberia, Scandinavia", alternative: "Cultivated rhodiola" },
  { name: "True Unicorn (Aletris farinosa)", status: "Endangered", region: "Eastern US", alternative: "Vitex; partridgeberry" },
];

// ---------- Ranks ----------

export const ranks: Rank[] = [
  { id: "seedling", name: "Seedling", color: "#84cc16", required: { monographs: 0, preparations: 0 }, description: "Just beginning. Your first cup of nettle infusion." },
  { id: "gardener", name: "Gardener", color: "#16a34a", required: { monographs: 5, preparations: 1 }, description: "You know your first five allies and have brewed your first preparation." },
  { id: "apprentice", name: "Apprentice", color: "#0ea5e9", required: { monographs: 12, preparations: 3 }, description: "You can name twelve herbs by sight, smell, and use." },
  { id: "apothecary", name: "Apothecary", color: "#a855f7", required: { monographs: 25, preparations: 6 }, description: "Tinctures, salves, syrups, oils — the craft is in your hands." },
  { id: "vitalist", name: "Vitalist", color: "#f59e0b", required: { monographs: 40, preparations: 9 }, description: "Energetics, four humours, dual extraction. You match herb to terrain." },
  { id: "grand-alchemist", name: "Grand Alchemist", color: "#fbbf24", required: { monographs: 55, preparations: 12 }, description: "Body, soul, and spirit reunited. The Philosopher's Stone is daily practice." },
];

// ---------- Lookups ----------

export function getHerb(slug: string): Herb | undefined {
  return herbs.find((h) => h.slug === slug);
}
export function getHerbName(slug: string): string {
  return getHerb(slug)?.name ?? slug;
}
export function getGoal(id: string): HerbalGoal | undefined {
  return goals.find((g) => g.id === id);
}
export function getAction(id: string): HerbalAction | undefined {
  return actions.find((a) => a.id === id);
}
export function getPreparation(slug: string): Preparation | undefined {
  return preparations.find((p) => p.slug === slug);
}

// ---------- Search ----------

export type SearchHit = {
  kind: "Herb" | "Action" | "Constituent" | "Preparation" | "Goal" | "Tradition" | "Study";
  title: string;
  subtitle: string;
  href: string;
  hrefParams?: Record<string, string>;
};

export function searchAll(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const hits: SearchHit[] = [];

  for (const h of herbs) {
    if (
      h.name.toLowerCase().includes(q) ||
      h.latin.toLowerCase().includes(q) ||
      h.actions.some((a) => a.toLowerCase().includes(q)) ||
      h.affinities.some((a) => a.toLowerCase().includes(q))
    ) {
      hits.push({
        kind: "Herb",
        title: h.name,
        subtitle: `${h.latin} · ${h.actions.slice(0, 3).join(", ")}`,
        href: "/alchemists-path/materia-medica/$slug",
        hrefParams: { slug: h.slug },
      });
    }
  }
  for (const a of actions) {
    if (a.name.toLowerCase().includes(q) || a.definition.toLowerCase().includes(q)) {
      hits.push({
        kind: "Action",
        title: a.name,
        subtitle: a.definition.slice(0, 110) + (a.definition.length > 110 ? "…" : ""),
        href: "/alchemists-path/science",
      });
    }
  }
  for (const c of constituentClasses) {
    if (c.klass.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q)) {
      hits.push({
        kind: "Constituent",
        title: c.klass,
        subtitle: c.summary.slice(0, 110),
        href: "/alchemists-path/science",
      });
    }
  }
  for (const p of preparations) {
    if (p.name.toLowerCase().includes(q) || p.whenToChoose.toLowerCase().includes(q)) {
      hits.push({
        kind: "Preparation",
        title: p.name,
        subtitle: p.whenToChoose.slice(0, 110),
        href: "/alchemists-path/preparations",
      });
    }
  }
  for (const g of goals) {
    if (g.name.toLowerCase().includes(q) || g.summary.toLowerCase().includes(q)) {
      hits.push({
        kind: "Goal",
        title: g.name,
        subtitle: g.summary.slice(0, 110),
        href: "/alchemists-path/goals/$goalId",
        hrefParams: { goalId: g.id },
      });
    }
  }
  for (const t of traditionEntries) {
    if (t.id.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q)) {
      hits.push({
        kind: "Tradition",
        title: t.id,
        subtitle: t.summary.slice(0, 110),
        href: "/alchemists-path/traditions",
      });
    }
  }
  for (const s of studies) {
    if (s.title.toLowerCase().includes(q) || s.bottomLine.toLowerCase().includes(q)) {
      hits.push({
        kind: "Study",
        title: s.title,
        subtitle: `${s.journal} ${s.year} — ${s.bottomLine.slice(0, 80)}`,
        href: "/alchemists-path/science",
      });
    }
  }

  return hits.slice(0, 30);
}
