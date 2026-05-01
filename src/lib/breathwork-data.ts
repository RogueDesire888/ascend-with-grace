// Single source of truth for the Breathwork encyclopedia.
// All content is statically authored — no backend, no async fetches.

export type Level = "Beginner" | "Intermediate" | "Advanced";
export type Goal =
  | "focus"
  | "sleep"
  | "stress"
  | "energy"
  | "performance"
  | "healing";
export type Tradition = "Yogic" | "Modern" | "Functional" | "Therapeutic";

export type PacerPreset = {
  inhale: number;
  holdIn: number;
  exhale: number;
  holdOut: number;
  cycles?: number;
};

export type Technique = {
  slug: string;
  name: string;
  shortName?: string;
  level: Level;
  goals: Goal[];
  tradition: Tradition;
  durationMinutes: number;
  summary: string;
  steps: string[];
  mechanism: string;
  pacer: PacerPreset;
  research: string;
  contraindications: string[];
  related: string[]; // slugs
  engagement: number; // 1-10 muscular/effort
};

export const techniques: Technique[] = [
  {
    slug: "diaphragmatic-breathing",
    name: "Diaphragmatic Breathing",
    shortName: "Belly Breath",
    level: "Beginner",
    goals: ["stress", "sleep", "healing"],
    tradition: "Functional",
    durationMinutes: 5,
    summary:
      "The foundational breath. Move air primarily by lowering the diaphragm so the belly rises before the chest, restoring efficient gas exchange and parasympathetic tone.",
    steps: [
      "Sit or lie down with one hand on the belly and one on the chest.",
      "Inhale slowly through the nose, expanding the belly outward without lifting the upper chest.",
      "Exhale gently through pursed lips or the nose, letting the belly soften back.",
      "Continue at a relaxed pace of 6–8 breaths per minute for 5 minutes.",
    ],
    mechanism:
      "Recruits the diaphragm rather than accessory neck and shoulder muscles, increasing tidal volume and improving CO₂ tolerance, which downshifts the autonomic nervous system.",
    pacer: { inhale: 4, holdIn: 0, exhale: 6, holdOut: 0, cycles: 30 },
    research:
      "A 2017 study (Frontiers in Psychology) showed 8 weeks of diaphragmatic breathing reduced cortisol and improved sustained attention in healthy adults.",
    contraindications: ["Severe COPD without supervision", "Acute panic during early practice"],
    related: ["coherent-breathing", "cyclic-sighing", "478-breathing"],
    engagement: 2,
  },
  {
    slug: "478-breathing",
    name: "4-7-8 Breathing",
    level: "Beginner",
    goals: ["sleep", "stress"],
    tradition: "Modern",
    durationMinutes: 4,
    summary:
      "Popularised by Dr. Andrew Weil. A long, slow exhale relative to the inhale activates the vagus nerve and prepares the body for sleep.",
    steps: [
      "Place the tongue tip behind the upper front teeth.",
      "Exhale fully through the mouth with a soft whoosh.",
      "Close the mouth and inhale through the nose for a count of 4.",
      "Hold the breath for a count of 7.",
      "Exhale through the mouth for a count of 8.",
      "Repeat for 4 cycles, working up to 8 over weeks.",
    ],
    mechanism:
      "The extended exhale raises CO₂ slightly and stimulates the vagus nerve, increasing parasympathetic dominance and slowing heart rate.",
    pacer: { inhale: 4, holdIn: 7, exhale: 8, holdOut: 0, cycles: 8 },
    research:
      "Clinical reports describe 4-7-8 reducing sleep onset latency in mild insomnia within 4 weeks of nightly practice.",
    contraindications: ["Pregnancy (avoid long holds)", "Cardiovascular instability"],
    related: ["cyclic-sighing", "coherent-breathing", "diaphragmatic-breathing"],
    engagement: 2,
  },
  {
    slug: "box-breathing",
    name: "Box Breathing",
    shortName: "Square Breath",
    level: "Beginner",
    goals: ["focus", "stress", "performance"],
    tradition: "Modern",
    durationMinutes: 5,
    summary:
      "The Navy SEAL favorite. Equal four-count inhale, hold, exhale, and hold creates rhythm and focus under pressure.",
    steps: [
      "Sit upright with a long spine.",
      "Inhale through the nose for 4 counts.",
      "Hold the breath gently for 4 counts.",
      "Exhale slowly through the nose for 4 counts.",
      "Hold the lungs empty for 4 counts.",
      "Repeat for 5 minutes, scaling counts up to 6 as comfort grows.",
    ],
    mechanism:
      "Equal phases keep arterial CO₂ stable and entrain heart rate variability, raising vagal tone while sharpening prefrontal focus.",
    pacer: { inhale: 4, holdIn: 4, exhale: 4, holdOut: 4, cycles: 18 },
    research:
      "A 2020 randomized trial found a 4-minute box-breathing protocol lowered acute stress markers in police trainees vs. controls.",
    contraindications: ["Late pregnancy", "Severe hypertension (skip the empty hold)"],
    related: ["coherent-breathing", "diaphragmatic-breathing", "alternate-nostril"],
    engagement: 3,
  },
  {
    slug: "kapalabhati",
    name: "Kapalabhati",
    shortName: "Skull-Shining Breath",
    level: "Intermediate",
    goals: ["energy", "focus"],
    tradition: "Yogic",
    durationMinutes: 3,
    summary:
      "A classical kriya. Sharp, active exhalations through the nose with passive inhalations cleanse the respiratory tract and energise the mind.",
    steps: [
      "Sit cross-legged with hands on knees.",
      "Take a relaxed inhale through the nose to start.",
      "Exhale forcefully through the nose by snapping the lower belly inward.",
      "Allow the inhale to happen passively as the belly rebounds.",
      "Repeat 30 pumps, then take 3 deep recovery breaths. Complete 3 rounds.",
    ],
    mechanism:
      "Rapid abdominal contractions hyperventilate the upper airways, lowering CO₂ and increasing alertness through sympathetic activation.",
    pacer: { inhale: 1, holdIn: 0, exhale: 1, holdOut: 0, cycles: 30 },
    research:
      "EEG studies have shown increased gamma activity in the frontal cortex during and after kapalabhati practice.",
    contraindications: [
      "Pregnancy",
      "Hypertension",
      "Epilepsy",
      "Recent abdominal surgery",
      "Glaucoma",
    ],
    related: ["bhastrika", "wim-hof", "alternate-nostril"],
    engagement: 7,
  },
  {
    slug: "bhastrika",
    name: "Bhastrika",
    shortName: "Bellows Breath",
    level: "Intermediate",
    goals: ["energy", "performance"],
    tradition: "Yogic",
    durationMinutes: 4,
    summary:
      "Both inhalation and exhalation are forceful. Bhastrika is heating, oxygenating, and clears mental fog quickly.",
    steps: [
      "Sit tall with a soft jaw.",
      "Inhale deeply and exhale forcefully through the nose with equal vigor.",
      "Engage the belly and chest with each pump.",
      "Complete 20–30 pumps, then take a slow recovery breath.",
      "Practice 3 rounds with 30 seconds of normal breathing between rounds.",
    ],
    mechanism:
      "Active inhale and exhale increase tidal volume and circulation, raising body temperature and adrenaline output briefly.",
    pacer: { inhale: 1, holdIn: 0, exhale: 1, holdOut: 0, cycles: 25 },
    research:
      "Bhastrika has been linked in pilot studies to improved attention scores and elevated catecholamines comparable to light exercise.",
    contraindications: ["Pregnancy", "Cardiac disease", "Hypertension", "Vertigo"],
    related: ["kapalabhati", "wim-hof", "oxygen-advantage"],
    engagement: 8,
  },
  {
    slug: "bhramari",
    name: "Bhramari",
    shortName: "Bee Breath",
    level: "Beginner",
    goals: ["stress", "sleep", "healing"],
    tradition: "Yogic",
    durationMinutes: 5,
    summary:
      "A humming exhalation that produces an internal vibration, lowering blood pressure and quieting the mind.",
    steps: [
      "Sit comfortably and gently close the eyes.",
      "Cover the ears with the index fingers (optional).",
      "Inhale slowly through the nose.",
      "Exhale with a steady humming sound, mouth closed, jaw relaxed.",
      "Repeat for 8–12 cycles.",
    ],
    mechanism:
      "The humming vibration boosts nasal nitric oxide up to 15-fold, dilating blood vessels and stimulating the vagus nerve.",
    pacer: { inhale: 4, holdIn: 0, exhale: 8, holdOut: 0, cycles: 12 },
    research:
      "A 2017 study showed bhramari reduced blood pressure and heart rate within a single 10-minute session.",
    contraindications: ["Active ear infection"],
    related: ["coherent-breathing", "diaphragmatic-breathing", "478-breathing"],
    engagement: 2,
  },
  {
    slug: "alternate-nostril",
    name: "Alternate Nostril Breathing",
    shortName: "Nadi Shodhana",
    level: "Beginner",
    goals: ["focus", "stress"],
    tradition: "Yogic",
    durationMinutes: 6,
    summary:
      "Channel-cleansing breath. Alternating nostrils balances hemispheric activity and steadies the nervous system.",
    steps: [
      "Sit upright; right hand in Vishnu mudra (index and middle fingers folded).",
      "Close the right nostril with the thumb; inhale through the left for 4.",
      "Close the left nostril with the ring finger; exhale through the right for 4.",
      "Inhale through the right for 4; close it; exhale through the left for 4.",
      "That is one cycle. Complete 9 cycles slowly.",
    ],
    mechanism:
      "Unilateral breathing modulates autonomic tone via the nasal cycle and influences contralateral brain hemisphere activation.",
    pacer: { inhale: 4, holdIn: 0, exhale: 4, holdOut: 0, cycles: 18 },
    research:
      "EEG and HRV studies show alternate nostril breathing improves attention and parasympathetic activity after 4 weeks.",
    contraindications: ["Severe nasal congestion"],
    related: ["box-breathing", "coherent-breathing", "kapalabhati"],
    engagement: 3,
  },
  {
    slug: "holotropic",
    name: "Holotropic Breathwork",
    level: "Advanced",
    goals: ["healing"],
    tradition: "Therapeutic",
    durationMinutes: 90,
    summary:
      "Developed by Stanislav and Christina Grof. Sustained, accelerated breathing in a supported setting can evoke non-ordinary states for psychological exploration.",
    steps: [
      "Always practice with a trained facilitator and a 'sitter' partner.",
      "Lie on your back with eyes closed and headphones on for evocative music.",
      "Breathe deeper and faster than normal for the duration of the session.",
      "Allow imagery, emotion, or somatic release to surface without forcing.",
      "Integrate via mandala drawing, sharing, and journaling afterwards.",
    ],
    mechanism:
      "Sustained hyperventilation lowers end-tidal CO₂, shifting blood pH and altering brain perfusion patterns implicated in non-ordinary states.",
    pacer: { inhale: 2, holdIn: 0, exhale: 2, holdOut: 0, cycles: 60 },
    research:
      "A 2023 paper described breathwork as reliably evoking profound psychedelic-like states with measurable shifts in mood weeks afterward.",
    contraindications: [
      "Pregnancy",
      "Cardiovascular disease",
      "Epilepsy or seizure history",
      "Uncontrolled hypertension",
      "Glaucoma or retinal detachment",
      "Active psychosis",
      "Recent surgery",
    ],
    related: ["conscious-connected", "rebirthing", "wim-hof"],
    engagement: 9,
  },
  {
    slug: "conscious-connected",
    name: "Conscious Connected Breathwork",
    shortName: "CCB",
    level: "Advanced",
    goals: ["healing"],
    tradition: "Therapeutic",
    durationMinutes: 60,
    summary:
      "Continuous, circular breathing through the mouth with no pauses. Often used for emotional release in modern therapeutic settings.",
    steps: [
      "Lie comfortably on your back.",
      "Inhale through the mouth into the belly with no pause.",
      "Exhale through the mouth with no pause.",
      "Maintain a continuous, connected rhythm for 30–60 minutes.",
      "Close the session with several minutes of natural breathing and integration.",
    ],
    mechanism:
      "Continuous breathing modulates CO₂ and influences interoception, enabling somatic release of stored stress patterns.",
    pacer: { inhale: 2, holdIn: 0, exhale: 2, holdOut: 0, cycles: 50 },
    research:
      "A 2023 randomised study reported a 6-week CCB program reduced anxiety scores significantly versus mindfulness controls.",
    contraindications: [
      "Pregnancy",
      "Cardiovascular disease",
      "Epilepsy",
      "Severe asthma",
      "Active psychiatric crisis",
    ],
    related: ["holotropic", "rebirthing", "diaphragmatic-breathing"],
    engagement: 8,
  },
  {
    slug: "rebirthing",
    name: "Rebirthing Breathwork",
    level: "Advanced",
    goals: ["healing"],
    tradition: "Therapeutic",
    durationMinutes: 60,
    summary:
      "Developed by Leonard Orr in the 1970s. Connected breathing to surface and release stored birth and early life material.",
    steps: [
      "Find a trained rebirthing facilitator.",
      "Breathe in a relaxed, connected rhythm — usually through the nose.",
      "Allow tetany or emotion without resistance.",
      "End with grounding and verbal integration.",
    ],
    mechanism:
      "Sustained connected breathing shifts blood gas chemistry, often inducing tetany and emotional catharsis as the nervous system reorganises.",
    pacer: { inhale: 3, holdIn: 0, exhale: 3, holdOut: 0, cycles: 40 },
    research:
      "Anecdotal and small-sample studies report long-lasting reductions in trauma symptoms, though larger trials are needed.",
    contraindications: [
      "Pregnancy",
      "Cardiovascular disease",
      "Epilepsy",
      "Active psychosis",
    ],
    related: ["conscious-connected", "holotropic"],
    engagement: 7,
  },
  {
    slug: "wim-hof",
    name: "Wim Hof Method",
    level: "Intermediate",
    goals: ["energy", "performance", "healing"],
    tradition: "Modern",
    durationMinutes: 15,
    summary:
      "Three rounds of 30–40 deep breaths followed by an exhale-hold and a recovery hold. Combined with cold exposure and mindset work.",
    steps: [
      "Sit or lie down where you can fall safely.",
      "Take 30–40 deep, full breaths in through the nose, out through the mouth.",
      "After the last breath, exhale and hold for as long as comfortable.",
      "Inhale fully and hold for 15 seconds.",
      "Repeat for 3 rounds, increasing hold times as practice deepens.",
    ],
    mechanism:
      "Cyclic hyperventilation reduces CO₂ and raises blood pH; subsequent breath holds raise adrenaline and shift immune markers.",
    pacer: { inhale: 2, holdIn: 0, exhale: 2, holdOut: 0, cycles: 35 },
    research:
      "A 2014 study (PNAS) showed practitioners voluntarily activated the sympathetic nervous and innate immune systems to attenuate inflammatory response.",
    contraindications: [
      "Pregnancy",
      "Epilepsy",
      "Cardiovascular disease",
      "Never practice in or near water",
    ],
    related: ["holotropic", "bhastrika", "kapalabhati"],
    engagement: 8,
  },
  {
    slug: "oxygen-advantage",
    name: "Oxygen Advantage",
    level: "Intermediate",
    goals: ["performance", "energy"],
    tradition: "Functional",
    durationMinutes: 10,
    summary:
      "Patrick McKeown's system emphasising nasal breathing, light breathing, and breath holds to raise CO₂ tolerance and athletic capacity.",
    steps: [
      "Breathe exclusively through the nose during the entire session.",
      "Soften the breath until you feel a slight air hunger.",
      "Walk or sit while doing controlled breath holds (BOLT).",
      "Build up to walking 60+ steps with one comfortable breath hold.",
    ],
    mechanism:
      "Higher CO₂ tolerance shifts the oxygen-haemoglobin dissociation curve (Bohr effect), improving oxygen delivery to working tissues.",
    pacer: { inhale: 4, holdIn: 0, exhale: 6, holdOut: 4, cycles: 20 },
    research:
      "A 2020 review reported nasal-only training improved VO₂ max economy and lactate threshold in endurance athletes.",
    contraindications: ["Severe asthma during attacks", "Pregnancy with caution"],
    related: ["co2-tolerance-holds", "diaphragmatic-breathing", "coherent-breathing"],
    engagement: 5,
  },
  {
    slug: "coherent-breathing",
    name: "Coherent Breathing",
    shortName: "Resonance Breath",
    level: "Beginner",
    goals: ["focus", "stress", "sleep"],
    tradition: "Modern",
    durationMinutes: 10,
    summary:
      "Breathing at roughly six breaths per minute synchronises heart rate variability with respiration, the body's natural resonance frequency.",
    steps: [
      "Sit comfortably with a soft jaw and long spine.",
      "Inhale gently through the nose for 5–6 counts.",
      "Exhale gently through the nose for 5–6 counts.",
      "Continue for 10–20 minutes; let the breath be quiet and effortless.",
    ],
    mechanism:
      "The 0.1 Hz frequency maximises baroreflex gain, training cardiovascular flexibility and parasympathetic dominance.",
    pacer: { inhale: 5, holdIn: 0, exhale: 5, holdOut: 0, cycles: 60 },
    research:
      "A 2017 RCT showed 12 weeks of resonance breathing improved depression scores and HRV in adults with major depression.",
    contraindications: ["Generally safe — avoid during acute respiratory illness"],
    related: ["box-breathing", "diaphragmatic-breathing", "cyclic-sighing"],
    engagement: 2,
  },
  {
    slug: "cyclic-sighing",
    name: "Cyclic Sighing",
    level: "Beginner",
    goals: ["stress", "sleep"],
    tradition: "Modern",
    durationMinutes: 5,
    summary:
      "Two short inhalations through the nose followed by a long exhale through the mouth. Quickly downshifts the nervous system.",
    steps: [
      "Sit or lie down comfortably.",
      "Inhale through the nose to fill the lungs.",
      "Take a second short sip of air through the nose to top up.",
      "Exhale slowly and fully through the mouth.",
      "Repeat for 5 minutes.",
    ],
    mechanism:
      "The double inhale reopens collapsed alveoli; the long exhale offloads CO₂ and stimulates the vagus nerve.",
    pacer: { inhale: 3, holdIn: 0, exhale: 8, holdOut: 0, cycles: 24 },
    research:
      "A 2023 Stanford study (Cell Reports Medicine) found 5 minutes of cyclic sighing daily reduced anxiety more than mindfulness meditation.",
    contraindications: ["None of significance for healthy adults"],
    related: ["478-breathing", "coherent-breathing", "diaphragmatic-breathing"],
    engagement: 2,
  },
  {
    slug: "co2-tolerance-holds",
    name: "CO₂ Tolerance Breath Holds",
    level: "Advanced",
    goals: ["performance"],
    tradition: "Functional",
    durationMinutes: 12,
    summary:
      "Structured breath holds and CO₂ tables progressively expand tolerance to elevated carbon dioxide, improving calm and endurance.",
    steps: [
      "Establish your BOLT score (comfortable breath-hold time after a normal exhale).",
      "Begin with a 1-minute rest, then a 60% effort hold.",
      "Increase hold duration in 5-second increments across 8 rounds.",
      "Always recover with relaxed nasal breathing between holds.",
    ],
    mechanism:
      "Repeated mild hypercapnia adapts central chemoreceptors so the brain interprets elevated CO₂ as less alarming, raising calm under load.",
    pacer: { inhale: 4, holdIn: 0, exhale: 6, holdOut: 10, cycles: 8 },
    research:
      "Freediving research demonstrates measurable BOLT score improvements and reduced perceived exertion within 4 weeks.",
    contraindications: ["Cardiovascular disease", "Pregnancy", "Epilepsy"],
    related: ["oxygen-advantage", "wim-hof", "box-breathing"],
    engagement: 6,
  },
];

// ----- goals -----
export type GoalEntry = {
  id: Goal;
  label: string;
  blurb: string;
  recommended: string[]; // technique slugs
  why: string;
};

export const goals: GoalEntry[] = [
  {
    id: "sleep",
    label: "Sleep & Deep Rest",
    blurb:
      "Slow, exhale-emphasised breathing tells the brainstem the day is done. These practices shorten sleep onset and deepen rest.",
    recommended: ["478-breathing", "cyclic-sighing", "bhramari", "coherent-breathing"],
    why: "Long exhales raise vagal tone, lower heart rate, and reduce the cortisol pulse that keeps the mind wired at night.",
  },
  {
    id: "focus",
    label: "Focus & Flow",
    blurb:
      "Steady, rhythmic breath at resonance frequency synchronises the cardiovascular and nervous systems for sustained attention.",
    recommended: ["box-breathing", "coherent-breathing", "alternate-nostril"],
    why: "Equal-ratio breathing entrains heart-rate variability, which correlates with prefrontal cortex engagement and working memory.",
  },
  {
    id: "stress",
    label: "Anxiety & Stress",
    blurb:
      "When the alarm system is loud, the breath is the most direct lever to switch into rest-and-digest mode.",
    recommended: ["cyclic-sighing", "478-breathing", "diaphragmatic-breathing", "bhramari"],
    why: "An exhale longer than the inhale (1:2 ratio) activates the parasympathetic nervous system within minutes.",
  },
  {
    id: "energy",
    label: "Energy & Alertness",
    blurb:
      "Faster, fuller breathing oxygenates the blood, raises body temperature, and clears mental fog without caffeine.",
    recommended: ["kapalabhati", "bhastrika", "wim-hof"],
    why: "Active breathing raises catecholamines, mildly hyperventilates, and shifts the nervous system toward sympathetic readiness.",
  },
  {
    id: "performance",
    label: "Athletic Performance",
    blurb:
      "Train your CO₂ tolerance, recruit the diaphragm, and warm up the respiratory muscles before exertion.",
    recommended: ["oxygen-advantage", "co2-tolerance-holds", "diaphragmatic-breathing"],
    why: "Higher CO₂ tolerance improves oxygen delivery via the Bohr effect and reduces perceived exertion.",
  },
  {
    id: "healing",
    label: "Emotional Healing & Trauma",
    blurb:
      "Trauma-informed breathwork emphasises titration, choice, and grounding. Always work with a trained facilitator for intense modalities.",
    recommended: [
      "conscious-connected",
      "holotropic",
      "rebirthing",
      "diaphragmatic-breathing",
    ],
    why: "Sustained connected breathing engages interoceptive networks and the vagus nerve, allowing the nervous system to discharge stored activation.",
  },
];

// ----- traditions -----
export type TraditionEntry = {
  id: string;
  label: string;
  summary: string;
  techniques: string[];
};

export const traditions: TraditionEntry[] = [
  {
    id: "pranayama",
    label: "Pranayama (Yogic)",
    summary:
      "The yogic science of breath regulation, codified in texts like the Hatha Yoga Pradipika. Pranayama works with prana — vital energy — through ratios of inhale, retention, and exhale.",
    techniques: ["kapalabhati", "bhastrika", "bhramari", "alternate-nostril"],
  },
  {
    id: "tibetan",
    label: "Tibetan Buddhism",
    summary:
      "Tummo and other Tibetan breath practices combine visualisation with breath retention to generate inner heat and access subtle states. Practiced for centuries by yogis in the Himalayas.",
    techniques: ["wim-hof", "holotropic"],
  },
  {
    id: "qigong",
    label: "Qigong & Daoist Breath",
    summary:
      "Slow, gentle breathing coordinated with movement and intention. Daoist breath cultivates qi and emphasises softness, sinking, and flow.",
    techniques: ["coherent-breathing", "diaphragmatic-breathing"],
  },
  {
    id: "modern-therapeutic",
    label: "Modern Therapeutic Systems",
    summary:
      "Twentieth- and twenty-first-century approaches — Holotropic, Conscious Connected, Rebirthing — blend Western psychology with breath to support emotional release and integration.",
    techniques: ["holotropic", "conscious-connected", "rebirthing"],
  },
];

// ----- studies -----
export type Study = {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  findings: string;
  doi: string;
  techniques: string[];
};

export const studies: Study[] = [
  {
    id: "balban-2023",
    title: "Brief structured respiration practices enhance mood and reduce physiological arousal",
    authors: "Balban et al.",
    journal: "Cell Reports Medicine",
    year: 2023,
    findings:
      "Five minutes of cyclic sighing per day reduced anxiety and increased positive affect more than mindfulness meditation across one month.",
    doi: "10.1016/j.xcrm.2022.100895",
    techniques: ["cyclic-sighing"],
  },
  {
    id: "kox-2014",
    title: "Voluntary activation of the sympathetic nervous system and attenuation of the innate immune response",
    authors: "Kox et al.",
    journal: "PNAS",
    year: 2014,
    findings:
      "Practitioners trained in the Wim Hof Method voluntarily raised adrenaline and reduced inflammatory cytokines after endotoxin challenge.",
    doi: "10.1073/pnas.1322174111",
    techniques: ["wim-hof"],
  },
  {
    id: "fincham-2023",
    title: "Effect of breathwork on stress and mental health: a meta-analysis",
    authors: "Fincham et al.",
    journal: "Scientific Reports",
    year: 2023,
    findings:
      "Across 12 RCTs, breathwork produced small-to-moderate reductions in stress, anxiety, and depressive symptoms versus controls.",
    doi: "10.1038/s41598-022-27247-y",
    techniques: ["conscious-connected", "diaphragmatic-breathing", "478-breathing"],
  },
  {
    id: "lehrer-2014",
    title: "Heart rate variability biofeedback: how and why does it work?",
    authors: "Lehrer & Gevirtz",
    journal: "Frontiers in Psychology",
    year: 2014,
    findings:
      "Resonance-frequency breathing at ~6 breaths per minute maximises baroreflex gain and improves HRV across multiple clinical populations.",
    doi: "10.3389/fpsyg.2014.00756",
    techniques: ["coherent-breathing"],
  },
  {
    id: "telles-2013",
    title: "Alternate nostril yoga breathing reduced blood pressure",
    authors: "Telles et al.",
    journal: "Medical Science Monitor Basic Research",
    year: 2013,
    findings:
      "Twelve weeks of alternate nostril breathing reduced systolic and diastolic blood pressure in pre-hypertensive adults.",
    doi: "10.12659/MSMBR.889486",
    techniques: ["alternate-nostril"],
  },
  {
    id: "ma-2017",
    title: "The effect of diaphragmatic breathing on attention, negative affect and stress",
    authors: "Ma et al.",
    journal: "Frontiers in Psychology",
    year: 2017,
    findings:
      "Eight weeks of diaphragmatic breathing reduced cortisol and improved sustained attention in healthy adults.",
    doi: "10.3389/fpsyg.2017.00874",
    techniques: ["diaphragmatic-breathing"],
  },
  {
    id: "mckeown-2020",
    title: "Nasal breathing during exercise: oxygen advantage protocols",
    authors: "McKeown et al.",
    journal: "Sports Medicine — Open",
    year: 2020,
    findings:
      "Nasal-only training improved running economy and reduced perceived exertion in trained endurance athletes.",
    doi: "10.1186/s40798-020-00250-1",
    techniques: ["oxygen-advantage", "co2-tolerance-holds"],
  },
  {
    id: "bahi-2024",
    title: "Effects of conscious connected breathwork on biomarkers of stress",
    authors: "Bahi et al.",
    journal: "Journal of Affective Disorders",
    year: 2024,
    findings:
      "A six-week CCB program lowered salivary cortisol and self-reported anxiety versus an active control.",
    doi: "10.1016/j.jad.2024.01.018",
    techniques: ["conscious-connected"],
  },
  {
    id: "havenith-2023",
    title: "Holotropic breathwork evokes profound altered states with measurable persisting effects",
    authors: "Havenith et al.",
    journal: "Nature Mental Health",
    year: 2023,
    findings:
      "A single guided session reliably evoked psychedelic-like experiences with sustained shifts in well-being four weeks later.",
    doi: "10.1038/s44220-023-00128-7",
    techniques: ["holotropic"],
  },
  {
    id: "telles-2008",
    title: "Selective unilateral nostril breathing alters autonomic activity",
    authors: "Telles et al.",
    journal: "International Journal of Psychophysiology",
    year: 2008,
    findings:
      "Right nostril breathing increased sympathetic activity; left nostril breathing increased parasympathetic activity.",
    doi: "10.1016/j.ijpsycho.2008.04.005",
    techniques: ["alternate-nostril"],
  },
  {
    id: "saoji-2019",
    title: "Effects of yogic breath regulation: a narrative review of scientific evidence",
    authors: "Saoji et al.",
    journal: "Journal of Ayurveda and Integrative Medicine",
    year: 2019,
    findings:
      "Slow yogic breathing improved autonomic balance, blood pressure, and respiratory function across 1400 participants.",
    doi: "10.1016/j.jaim.2017.07.008",
    techniques: ["bhramari", "alternate-nostril", "diaphragmatic-breathing"],
  },
  {
    id: "courtney-2009",
    title: "Buteyko breathing technique improves quality of life in asthmatics",
    authors: "Courtney",
    journal: "International Journal of Osteopathic Medicine",
    year: 2009,
    findings:
      "Buteyko-style nasal, low-volume breathing improved asthma quality of life and reduced reliever medication usage.",
    doi: "10.1016/j.ijosm.2009.02.001",
    techniques: ["oxygen-advantage"],
  },
];

// ----- glossary -----
export type GlossaryTerm = {
  term: string;
  definition: string;
  related?: string[]; // technique slugs
};

export const glossary: GlossaryTerm[] = [
  { term: "Apnea", definition: "Voluntary or involuntary pause in breathing.", related: ["co2-tolerance-holds"] },
  { term: "Bohr Effect", definition: "Higher CO₂ shifts haemoglobin's affinity, releasing more oxygen to tissues.", related: ["oxygen-advantage"] },
  { term: "BOLT Score", definition: "Body Oxygen Level Test — a measure of breath-hold tolerance after a normal exhale.", related: ["oxygen-advantage", "co2-tolerance-holds"] },
  { term: "Coherent Breathing", definition: "Breathing at roughly six breaths per minute to align HRV and respiration.", related: ["coherent-breathing"] },
  { term: "Diaphragm", definition: "The dome-shaped muscle below the lungs that drives efficient breathing.", related: ["diaphragmatic-breathing"] },
  { term: "End-Tidal CO₂", definition: "CO₂ concentration at the end of an exhalation, reflecting blood gas levels.", related: ["holotropic", "wim-hof"] },
  { term: "HRV", definition: "Heart Rate Variability — variation between heartbeats, an index of autonomic flexibility." },
  { term: "Hyperventilation", definition: "Breathing in excess of metabolic demand, lowering CO₂.", related: ["wim-hof", "holotropic"] },
  { term: "Hypocapnia", definition: "Low blood CO₂, causing tingling, lightheadedness, or altered states." },
  { term: "Interoception", definition: "Perception of internal bodily signals such as heart rate or breath." },
  { term: "Kriya", definition: "A yogic cleansing practice. Kapalabhati is a respiratory kriya.", related: ["kapalabhati"] },
  { term: "Nadi", definition: "Subtle energy channel in yogic anatomy. Nadi Shodhana means channel-cleansing.", related: ["alternate-nostril"] },
  { term: "Nitric Oxide", definition: "A vasodilating molecule produced in the nasal passages, boosted by humming.", related: ["bhramari"] },
  { term: "Pranayama", definition: "Yogic regulation of life force through the breath.", related: ["bhastrika", "kapalabhati"] },
  { term: "Parasympathetic", definition: "The rest-and-digest branch of the autonomic nervous system." },
  { term: "Resonance Frequency", definition: "Roughly 0.1 Hz (six breaths per minute) — the body's optimal HRV frequency." },
  { term: "Sympathetic", definition: "The fight-or-flight branch of the autonomic nervous system." },
  { term: "Tetany", definition: "Tingling or muscle cramping from prolonged hyperventilation." },
  { term: "Tidal Volume", definition: "Air moved in or out of the lungs in a single breath." },
  { term: "Tummo", definition: "Tibetan inner-fire breath practice combining retention and visualisation." },
  { term: "Vagus Nerve", definition: "The longest cranial nerve; primary parasympathetic conduit toned by long exhales." },
  { term: "Vital Capacity", definition: "Maximum air a person can exhale after a maximum inhale." },
];

// ----- books -----
export type Book = {
  title: string;
  author: string;
  summary: string;
  link: string;
};

export const books: Book[] = [
  {
    title: "Breath: The New Science of a Lost Art",
    author: "James Nestor",
    summary:
      "A journalist's deep dive across cultures and labs. The most accessible introduction to why how we breathe matters.",
    link: "https://www.mrjamesnestor.com/breath",
  },
  {
    title: "The Oxygen Advantage",
    author: "Patrick McKeown",
    summary:
      "Practical functional breathing protocols rooted in nasal breathing and CO₂ tolerance.",
    link: "https://oxygenadvantage.com/",
  },
  {
    title: "Breathing for Warriors",
    author: "Belisa Vranich",
    summary:
      "Performance-focused breath training for athletes, first responders, and high-stress professionals.",
    link: "https://www.belisavranich.com/",
  },
  {
    title: "The Healing Power of the Breath",
    author: "Richard P. Brown & Patricia L. Gerbarg",
    summary:
      "A clinician's guide to coherent breathing for anxiety, depression, and PTSD.",
    link: "https://www.havenpublications.com/",
  },
  {
    title: "Light on Pranayama",
    author: "B.K.S. Iyengar",
    summary:
      "The classical yogic reference. Detailed instructions for a complete pranayama practice.",
    link: "https://www.bksiyengar.com/",
  },
  {
    title: "Just Breathe",
    author: "Dan Brulé",
    summary:
      "An overview of breath mastery from a pioneer of the modern breathwork movement.",
    link: "https://breathmastery.com/",
  },
  {
    title: "Conscious Breathing",
    author: "Anders Olsson",
    summary:
      "Practical exercises to retrain breath patterns for energy, sleep, and resilience.",
    link: "https://www.consciousbreathing.com/",
  },
  {
    title: "The Wim Hof Method",
    author: "Wim Hof",
    summary:
      "The book of the man who put cold and conscious breathing on the modern map.",
    link: "https://www.wimhofmethod.com/",
  },
];

// ----- practitioners -----
export type Practitioner = {
  name: string;
  location: string;
  certifications: string[];
  bio: string;
  contact: string;
  modalities: string[];
};

export const practitioners: Practitioner[] = [
  {
    name: "Iris Donovan",
    location: "Brooklyn, NY",
    certifications: ["GPB Certified", "200hr YTT"],
    bio: "Trauma-informed CCB facilitator weaving somatics and titration into every session.",
    contact: "iris@example.com",
    modalities: ["Conscious Connected", "Trauma-informed"],
  },
  {
    name: "Theo Anand",
    location: "Mumbai, IN",
    certifications: ["Pranayama Acharya", "Iyengar Level II"],
    bio: "Classical pranayama lineage holder. Teaches in English, Hindi, and Marathi.",
    contact: "theo@example.com",
    modalities: ["Pranayama", "Yogic"],
  },
  {
    name: "Sera Ito",
    location: "Tokyo, JP",
    certifications: ["Oxygen Advantage Master"],
    bio: "Functional breathing coach for endurance athletes and corporate teams.",
    contact: "sera@example.com",
    modalities: ["Functional", "Performance"],
  },
  {
    name: "Marco Reyna",
    location: "Mexico City, MX",
    certifications: ["Holotropic Breathwork — Grof Legacy"],
    bio: "Holds monthly daylong holotropic journeys with live music and integration circles.",
    contact: "marco@example.com",
    modalities: ["Holotropic"],
  },
  {
    name: "Lina Holm",
    location: "Stockholm, SE",
    certifications: ["Wim Hof Instructor Lvl 3"],
    bio: "Cold-water breathwork retreats in the Swedish archipelago.",
    contact: "lina@example.com",
    modalities: ["Wim Hof", "Cold exposure"],
  },
  {
    name: "Jordan Pike",
    location: "Austin, TX",
    certifications: ["Breathmastery Coach"],
    bio: "1:1 breath coaching for sleep, anxiety, and high-performing professionals.",
    contact: "jordan@example.com",
    modalities: ["CCB", "Coaching"],
  },
  {
    name: "Amélie Rousseau",
    location: "Lyon, FR",
    certifications: ["Rebirthing Breathwork — IBF"],
    bio: "Twenty years of rebirthing practice with a gentle, somatic touch.",
    contact: "amelie@example.com",
    modalities: ["Rebirthing"],
  },
  {
    name: "Nia Okafor",
    location: "Lagos, NG",
    certifications: ["Coherence Breathing Trainer"],
    bio: "Brings breathwork to schools, clinics, and community wellness programs.",
    contact: "nia@example.com",
    modalities: ["Coherent", "Educational"],
  },
  {
    name: "Sven Lindqvist",
    location: "Berlin, DE",
    certifications: ["Buteyko Practitioner"],
    bio: "Functional breathing for asthma, allergies, and snoring.",
    contact: "sven@example.com",
    modalities: ["Functional", "Buteyko"],
  },
  {
    name: "Priya Bhatnagar",
    location: "Bengaluru, IN",
    certifications: ["E-RYT 500", "Yoga Therapy"],
    bio: "Pranayama for clinical populations — diabetes, hypertension, cardiac rehab.",
    contact: "priya@example.com",
    modalities: ["Pranayama", "Therapeutic"],
  },
  {
    name: "Cole McAllister",
    location: "Vancouver, CA",
    certifications: ["Trauma-Sensitive Breathwork"],
    bio: "Slow, choice-based breathwork for survivors and first responders.",
    contact: "cole@example.com",
    modalities: ["Trauma-informed"],
  },
  {
    name: "Yuki Tanaka",
    location: "Kyoto, JP",
    certifications: ["Qigong Sifu", "Daoist Breath"],
    bio: "Soft, slow, sinking — Daoist breathing inside a tea-house garden.",
    contact: "yuki@example.com",
    modalities: ["Qigong", "Daoist"],
  },
];

// ----- events -----
export type EventEntry = {
  title: string;
  date: string; // ISO
  location: string;
  facilitator: string;
  format: "Online" | "In-Person" | "Hybrid";
  description: string;
};

export const events: EventEntry[] = [
  {
    title: "7-Day Breath Reset Live Cohort",
    date: "2026-05-12",
    location: "Online",
    facilitator: "Jordan Pike",
    format: "Online",
    description: "A guided week of foundational breath habits with daily live sessions.",
  },
  {
    title: "Holotropic Day Journey",
    date: "2026-05-23",
    location: "Mexico City, MX",
    facilitator: "Marco Reyna",
    format: "In-Person",
    description: "Six-hour container with live music, sitter pairing, and integration circle.",
  },
  {
    title: "Pranayama Intensive",
    date: "2026-06-04",
    location: "Mumbai, IN",
    facilitator: "Theo Anand",
    format: "In-Person",
    description: "Three days of classical pranayama in the Iyengar tradition.",
  },
  {
    title: "Free Coherent Breathing Webinar",
    date: "2026-05-29",
    location: "Online",
    facilitator: "Nia Okafor",
    format: "Online",
    description: "An introduction to resonance breathing and its physiology.",
  },
  {
    title: "Cold Plunge & Breath Retreat",
    date: "2026-06-18",
    location: "Stockholm Archipelago, SE",
    facilitator: "Lina Holm",
    format: "In-Person",
    description: "Three days combining Wim Hof breathwork and cold exposure.",
  },
  {
    title: "CCB Healing Circle",
    date: "2026-05-30",
    location: "Brooklyn, NY",
    facilitator: "Iris Donovan",
    format: "In-Person",
    description: "Trauma-aware connected breathwork in a small group setting.",
  },
  {
    title: "Athlete Breath Lab",
    date: "2026-06-11",
    location: "Tokyo, JP",
    facilitator: "Sera Ito",
    format: "Hybrid",
    description: "Two-day workshop measuring BOLT scores and building CO₂ tolerance.",
  },
  {
    title: "Daoist Breath at Dawn",
    date: "2026-07-02",
    location: "Kyoto, JP",
    facilitator: "Yuki Tanaka",
    format: "In-Person",
    description: "Sunrise practice in the temple garden. Tea ceremony to follow.",
  },
];

// ----- FAQ -----
export type FaqItem = { q: string; a: string };

export const faq: FaqItem[] = [
  {
    q: "How is breathwork different from meditation?",
    a: "Meditation usually observes the breath. Breathwork actively shapes the breath to produce specific physiological and psychological effects.",
  },
  {
    q: "Can breathwork replace therapy or medication?",
    a: "No. Breathwork can be a powerful adjunct, but it is not a substitute for licensed medical or mental health care.",
  },
  {
    q: "How often should I practice?",
    a: "Five minutes daily of a foundational technique like coherent or diaphragmatic breathing produces noticeable benefits within two weeks.",
  },
  {
    q: "Is it normal to feel tingling or dizzy?",
    a: "Mild tingling can occur with active techniques due to lowered CO₂. If it becomes uncomfortable, slow down and return to natural breathing.",
  },
  {
    q: "Should I breathe through my nose or mouth?",
    a: "For everyday and most foundational practice — nose. Mouth breathing is reserved for specific modalities like CCB or holotropic.",
  },
  {
    q: "Is breathwork safe in pregnancy?",
    a: "Slow, gentle techniques are generally considered safe. Avoid strong retentions, hyperventilation, and intense modalities. Always check with your provider.",
  },
  {
    q: "Why does breathwork sometimes bring up emotion?",
    a: "Sustained connected breathing engages the vagus nerve and interoceptive networks, which can surface stored stress patterns. Work with a trained facilitator if exploring intense modalities.",
  },
  {
    q: "Can children practice breathwork?",
    a: "Yes — gentle techniques like belly breathing, bee breath, and cyclic sighing are widely used in pediatric settings.",
  },
  {
    q: "Will breathwork help with snoring or sleep apnea?",
    a: "Functional breathing practices that emphasise nasal breathing and improved tongue posture can help. For sleep apnea, work alongside a sleep specialist.",
  },
  {
    q: "Do I need any equipment?",
    a: "No. A timer or pacer is helpful but not required. The breath you have is enough.",
  },
];

// ----- mastery -----
export type Phase = {
  id: string;
  number: number;
  title: string;
  focus: string;
  duration: string;
  techniques: string[];
  milestones: string[];
};

export const phases: Phase[] = [
  {
    id: "phase-1",
    number: 1,
    title: "Foundation",
    focus: "Awareness & a 5-minute daily habit",
    duration: "Weeks 1–4",
    techniques: ["diaphragmatic-breathing", "coherent-breathing"],
    milestones: [
      "Notice your default breath three times a day for one week.",
      "Practice diaphragmatic breathing for 5 minutes daily.",
      "Maintain the habit for 21 consecutive days.",
    ],
  },
  {
    id: "phase-2",
    number: 2,
    title: "Exploration",
    focus: "Add structured techniques and lengthen practice",
    duration: "Weeks 5–10",
    techniques: ["478-breathing", "box-breathing", "cyclic-sighing"],
    milestones: [
      "Practice 4-7-8 nightly for two weeks.",
      "Use box breathing before any high-stress event.",
      "Build to a 15-minute daily session.",
    ],
  },
  {
    id: "phase-3",
    number: 3,
    title: "Deepening",
    focus: "Pranayama and CO₂ tolerance",
    duration: "Weeks 11–20",
    techniques: ["alternate-nostril", "kapalabhati", "oxygen-advantage", "co2-tolerance-holds"],
    milestones: [
      "Establish a daily pranayama practice with at least two techniques.",
      "Improve your BOLT score by 10 seconds.",
      "Complete a 21-day breath challenge.",
    ],
  },
  {
    id: "phase-4",
    number: 4,
    title: "Integration",
    focus: "Intense modalities, somatic release, advanced retention",
    duration: "Months 6+",
    techniques: ["bhastrika", "wim-hof", "conscious-connected", "holotropic"],
    milestones: [
      "Attend a guided CCB or holotropic session.",
      "Build a daily integration practice with journaling.",
      "Mentor a beginner through their first 4 weeks.",
    ],
  },
];

export type Belt = {
  id: string;
  name: string;
  color: string; // tailwind-friendly oklch via CSS var
  required: { phases: number; techniques: number };
  description: string;
};

export const belts: Belt[] = [
  { id: "white", name: "White Belt", color: "var(--foreground)", required: { phases: 0, techniques: 0 }, description: "You have arrived. The path begins with awareness." },
  { id: "yellow", name: "Yellow Belt", color: "var(--sun-glow)", required: { phases: 1, techniques: 2 }, description: "Daily habit established. The breath has begun to listen back." },
  { id: "green", name: "Green Belt", color: "var(--leaf-glow)", required: { phases: 2, techniques: 4 }, description: "You can shape the breath for stress, sleep, and focus on demand." },
  { id: "blue", name: "Blue Belt", color: "var(--cyan-glow)", required: { phases: 3, techniques: 8 }, description: "Pranayama is part of your week. CO₂ tolerance is measurably higher." },
  { id: "red", name: "Red Belt", color: "var(--coral-glow)", required: { phases: 3, techniques: 11 }, description: "You hold space for your own intense practices safely." },
  { id: "black", name: "Black Belt", color: "var(--orchid-glow)", required: { phases: 4, techniques: 14 }, description: "Mastery is the willingness to remain a beginner. You teach by breathing." },
];

// ----- challenges -----
export type ChallengeDay = {
  day: number;
  title: string;
  technique?: string; // slug
  prompt: string;
};

export type Challenge = {
  id: string;
  title: string;
  durationDays: number;
  blurb: string;
  days: ChallengeDay[];
};

const sevenDay: Challenge = {
  id: "7-day-reset",
  title: "7-Day Breath Reset",
  durationDays: 7,
  blurb: "A gentle reset. Five to ten minutes a day for one week to anchor a foundational habit.",
  days: [
    { day: 1, title: "Notice", prompt: "Set three reminders. Each time, observe your breath for 30 seconds without changing it." },
    { day: 2, title: "Belly", technique: "diaphragmatic-breathing", prompt: "Five minutes of belly breathing. Hand on chest, hand on belly." },
    { day: 3, title: "Sigh", technique: "cyclic-sighing", prompt: "Five minutes of cyclic sighing. Notice mood before and after." },
    { day: 4, title: "Box", technique: "box-breathing", prompt: "Box breathing for 5 minutes before your hardest task." },
    { day: 5, title: "Resonance", technique: "coherent-breathing", prompt: "Ten minutes of coherent breathing at six breaths per minute." },
    { day: 6, title: "Sleep", technique: "478-breathing", prompt: "4-7-8 in bed tonight. Note how long it took to fall asleep." },
    { day: 7, title: "Choose", prompt: "Pick the technique that helped most. Commit to 5 minutes daily for the next 14 days." },
  ],
};

const twentyOneDay: Challenge = {
  id: "21-day-mastery",
  title: "21-Day Breath Mastery",
  durationDays: 21,
  blurb: "Three weeks of progressive practice. Foundation → Exploration → Deepening.",
  days: [
    { day: 1, title: "Baseline BOLT", technique: "oxygen-advantage", prompt: "Measure your BOLT score. Write it down." },
    { day: 2, title: "Belly Breath x10min", technique: "diaphragmatic-breathing", prompt: "Ten minutes of belly breathing." },
    { day: 3, title: "Coherent Breathing", technique: "coherent-breathing", prompt: "Twenty minutes of resonance breathing." },
    { day: 4, title: "Cyclic Sighing", technique: "cyclic-sighing", prompt: "Five minutes morning and evening." },
    { day: 5, title: "Box Breathing", technique: "box-breathing", prompt: "Use before two stressful moments today." },
    { day: 6, title: "4-7-8 Sleep Set", technique: "478-breathing", prompt: "Eight cycles in bed nightly for the rest of the challenge." },
    { day: 7, title: "Reflect", prompt: "Journal: what has shifted in your sleep, mood, focus?" },
    { day: 8, title: "Alternate Nostril", technique: "alternate-nostril", prompt: "Nine cycles, slowly." },
    { day: 9, title: "Kapalabhati", technique: "kapalabhati", prompt: "Three rounds of 30 pumps. Skip if pregnant or hypertensive." },
    { day: 10, title: "Bhramari", technique: "bhramari", prompt: "Twelve humming cycles before bed." },
    { day: 11, title: "BOLT Re-check", technique: "oxygen-advantage", prompt: "Measure your BOLT again. Compare to day 1." },
    { day: 12, title: "Walk + Holds", technique: "co2-tolerance-holds", prompt: "Walk while holding the breath after exhale. Five rounds." },
    { day: 13, title: "Coherent x20min", technique: "coherent-breathing", prompt: "A long, quiet practice." },
    { day: 14, title: "Reflect", prompt: "Where do you reach for the breath without thinking now?" },
    { day: 15, title: "Bhastrika", technique: "bhastrika", prompt: "Three rounds of 25 pumps. Recover fully between." },
    { day: 16, title: "Wim Hof", technique: "wim-hof", prompt: "Three full rounds. Never in or near water." },
    { day: 17, title: "CCB Sample", technique: "conscious-connected", prompt: "Twenty minutes of connected breathing in a safe setting." },
    { day: 18, title: "Box + Holds", technique: "box-breathing", prompt: "Eight minutes of box, then four CO₂ holds." },
    { day: 19, title: "Coherent at Resonance", technique: "coherent-breathing", prompt: "Find your exact resonance frequency between 5 and 7 breaths per minute." },
    { day: 20, title: "Free Practice", prompt: "Choose your favourite combination of techniques." },
    { day: 21, title: "Integration", prompt: "Re-test BOLT. Write a letter to your day-1 self." },
  ],
};

export const challenges: Challenge[] = [sevenDay, twentyOneDay];

// ----- techniques helpers -----
export function getTechnique(slug: string): Technique | undefined {
  return techniques.find((t) => t.slug === slug);
}

export function getTechniqueName(slug: string): string {
  return getTechnique(slug)?.name ?? slug;
}

export function getGoal(id: string): GoalEntry | undefined {
  return goals.find((g) => g.id === id);
}

// ----- search index -----
export type SearchHit = {
  kind: "technique" | "study" | "glossary" | "book" | "goal" | "faq";
  title: string;
  subtitle: string;
  href: string;
  hrefParams?: Record<string, string>;
  score: number;
};

function score(query: string, haystack: string): number {
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  const h = haystack.toLowerCase();
  if (h === q) return 100;
  if (h.startsWith(q)) return 70;
  if (h.includes(q)) return 50;
  // token-wise scoring
  const tokens = q.split(/\s+/).filter(Boolean);
  let acc = 0;
  for (const t of tokens) {
    if (h.includes(t)) acc += 10;
  }
  return acc;
}

export function searchAll(query: string): SearchHit[] {
  const hits: SearchHit[] = [];
  const q = query.trim();
  if (q.length < 2) return [];

  for (const t of techniques) {
    const s = Math.max(score(q, t.name), score(q, t.shortName ?? ""), score(q, t.summary) / 2);
    if (s > 0)
      hits.push({
        kind: "technique",
        title: t.name,
        subtitle: t.summary,
        href: "/breathwork/techniques/$slug",
        hrefParams: { slug: t.slug },
        score: s,
      });
  }
  for (const s of studies) {
    const sc = Math.max(score(q, s.title), score(q, s.findings) / 2, score(q, s.authors) / 3);
    if (sc > 0)
      hits.push({
        kind: "study",
        title: s.title,
        subtitle: `${s.authors} — ${s.journal} (${s.year})`,
        href: "/breathwork/science",
        score: sc,
      });
  }
  for (const g of glossary) {
    const sc = Math.max(score(q, g.term), score(q, g.definition) / 2);
    if (sc > 0)
      hits.push({
        kind: "glossary",
        title: g.term,
        subtitle: g.definition,
        href: "/breathwork/resources",
        score: sc,
      });
  }
  for (const b of books) {
    const sc = Math.max(score(q, b.title), score(q, b.author) / 2);
    if (sc > 0)
      hits.push({
        kind: "book",
        title: b.title,
        subtitle: `${b.author} — ${b.summary}`,
        href: "/breathwork/resources",
        score: sc,
      });
  }
  for (const g of goals) {
    const sc = Math.max(score(q, g.label), score(q, g.blurb) / 2);
    if (sc > 0)
      hits.push({
        kind: "goal",
        title: g.label,
        subtitle: g.blurb,
        href: "/breathwork/goals/$goalId",
        hrefParams: { goalId: g.id },
        score: sc,
      });
  }
  for (const f of faq) {
    const sc = Math.max(score(q, f.q), score(q, f.a) / 2);
    if (sc > 0)
      hits.push({
        kind: "faq",
        title: f.q,
        subtitle: f.a,
        href: "/breathwork/resources",
        score: sc,
      });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, 16);
}
