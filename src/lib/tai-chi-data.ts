// Tai Chi (Taijiquan) Encyclopedia — central data source.
// All content is curated and consolidated from public scholarship,
// classical texts (Wang Zongyue, Wu Yuxiang, Yang Chengfu), and peer-
// reviewed health research. Use this as the single source of truth
// for postures, forms, styles, principles, goals, and studies.

export type Level = "Beginner" | "Intermediate" | "Advanced";

export type FamilyStyle =
  | "Chen"
  | "Yang"
  | "Wu"
  | "Wu-Hao"
  | "Sun"
  | "Wudang"
  | "Modern";

export type PostureFamily =
  | "Opening"
  | "Stepping"
  | "Strike"
  | "Kick"
  | "Issuing (Fa Jin)"
  | "Standing"
  | "Closing"
  | "Silk Reeling";

export type TaiChiGoal =
  | "balance"
  | "knee-osteoarthritis"
  | "blood-pressure"
  | "cognition"
  | "anxiety-depression"
  | "sleep"
  | "fibromyalgia"
  | "parkinsons"
  | "immune"
  | "martial-skill";

// ───────────────────────────────────────────────────────────────────
// POSTURES — individual movements that compose every form
// ───────────────────────────────────────────────────────────────────

export type Posture = {
  slug: string;
  english: string;
  pinyin: string;
  chinese: string;
  family: PostureFamily;
  styles: FamilyStyle[];
  level: Level;
  description: string;
  alignment: string[];
  cues: string[];
  application: string[]; // martial application / qi flow
  commonErrors: string[];
  breath: string;
  jin: string[]; // energies expressed
  appearsIn: string[]; // form slugs
};

export const postures: Posture[] = [
  {
    slug: "wu-ji",
    english: "Wu Ji (Primordial Stance)",
    pinyin: "Wú Jí",
    chinese: "無極",
    family: "Opening",
    styles: ["Chen", "Yang", "Wu", "Wu-Hao", "Sun", "Wudang"],
    level: "Beginner",
    description:
      "The undifferentiated stance from which all movement is born. The body is settled, the mind empty, the breath natural — the precondition for Tai Chi to emerge from the void.",
    alignment: [
      "Feet shoulder-width, parallel, weight evenly distributed across both arches",
      "Knees soft, never locked, tracking over second toe",
      "Hips tucked slightly so sacrum hangs heavy",
      "Spine long, crown gently suspended (xu ling ding jin)",
      "Shoulders sunk, elbows dropped, fingertips alive",
    ],
    cues: [
      "Sink the qi to the dantian (lower abdomen)",
      "Soften the sternum, release the chest (han xiong ba bei)",
      "Tongue lightly touches roof of mouth",
      "Eyes soft, gaze level, peripheral awareness wide",
    ],
    application: [
      "Cultivates rooting before any movement begins",
      "Resets the nervous system between sequences",
    ],
    commonErrors: [
      "Locking the knees",
      "Holding the breath or forcing belly breathing",
      "Tilting pelvis forward (lumbar lordosis)",
      "Lifting shoulders toward ears",
    ],
    breath: "Natural diaphragmatic breath, 6 cycles per minute",
    jin: ["Rooting"],
    appearsIn: [
      "chen-laojia-yi-lu",
      "yang-24",
      "yang-108",
      "sun-73",
      "wu-108",
    ],
  },
  {
    slug: "tai-chi-opening",
    english: "Opening of Tai Chi (Raise Hands)",
    pinyin: "Qǐ Shì",
    chinese: "起勢",
    family: "Opening",
    styles: ["Chen", "Yang", "Wu", "Wu-Hao", "Sun"],
    level: "Beginner",
    description:
      "Yin and yang separate. Arms float up to shoulder height as if buoyed by water, then sink as the knees yield. The first taste of peng (ward off) energy.",
    alignment: [
      "Wrists lead, fingers trail, elbows hang heavy",
      "Hands rise no higher than shoulders",
      "On descent, sit slightly into the hips",
      "Shoulders never shrug — let the back lift the arms",
    ],
    cues: [
      "Inhale as the arms rise, exhale as they sink",
      "Imagine water filling under the wrists",
      "Feel the floor press up through the bubbling well (Yongquan, K1)",
    ],
    application: [
      "Trains peng — the upward, outward, buoyant frame",
      "Connects breath to movement at the very first step",
    ],
    commonErrors: [
      "Lifting from the shoulders instead of the back",
      "Letting the elbows fly outward",
      "Bending forward as the hands sink",
    ],
    breath: "Inhale up · exhale down (4-count each)",
    jin: ["Peng (Ward Off)"],
    appearsIn: ["yang-24", "yang-108", "chen-laojia-yi-lu", "sun-73"],
  },
  {
    slug: "grasp-sparrows-tail",
    english: "Grasp Sparrow's Tail",
    pinyin: "Lǎn Què Wěi",
    chinese: "攬雀尾",
    family: "Strike",
    styles: ["Yang", "Wu", "Wu-Hao", "Sun"],
    level: "Beginner",
    description:
      "The signature 'four-energies' posture of Yang style. A complete cycle of peng (ward off), lu (roll back), ji (press), and an (push). Often called the soul of the form.",
    alignment: [
      "Bow stance: front knee over ankle, back leg straight but not locked",
      "Front foot forward, back foot 45°",
      "70% weight forward in peng/ji/an, 70% back in lu",
      "Shoulders square to forward foot",
      "Hands move on horizontal arcs, never above shoulder height",
    ],
    cues: [
      "Peng: round the front arm, palm in",
      "Lu: rotate waist, draw partner past your line",
      "Ji: back hand presses front wrist forward",
      "An: both palms down, then forward like pushing a beach ball",
    ],
    application: [
      "Peng deflects an incoming push",
      "Lu yields and redirects, off-balancing partner forward",
      "Ji issues a short shove using both arms as one unit",
      "An finishes with a long push from the legs and waist",
    ],
    commonErrors: [
      "Letting the front knee collapse inward",
      "Pushing only with the arms (lose root)",
      "Square shoulders disappear during transition",
    ],
    breath: "Inhale on yielding (peng/lu), exhale on issuing (ji/an)",
    jin: ["Peng", "Lu (Roll Back)", "Ji (Press)", "An (Push)"],
    appearsIn: ["yang-24", "yang-108", "wu-108"],
  },
  {
    slug: "single-whip",
    english: "Single Whip",
    pinyin: "Dān Biān",
    chinese: "單鞭",
    family: "Strike",
    styles: ["Chen", "Yang", "Wu", "Wu-Hao", "Sun"],
    level: "Beginner",
    description:
      "The most repeated posture across the long forms. The body opens like a drawn bow, the right hand forms a hook, the left hand strikes outward. A study in spiral and extension.",
    alignment: [
      "Bow stance to the left, 70% weight on left leg",
      "Right hand: 'hooked hand' — fingertips pressed together, wrist flexed",
      "Left palm faces outward, fingers at eye level",
      "Hips square left, shoulders open, arms at 180°",
      "Spine vertical, sacrum heavy",
    ],
    cues: [
      "Initiate from the waist, not the arms",
      "Open chest only as far as shoulders can stay sunk",
      "Eyes follow the left palm at the moment of arrival",
    ],
    application: [
      "Hook hand traps and redirects an opponent's wrist",
      "Lead palm strikes, presses, or wards off a second attacker",
    ],
    commonErrors: [
      "Over-extending the lead arm and locking the elbow",
      "Twisting the front foot off the ground",
      "Arms reach before the waist turns",
    ],
    breath: "Inhale opening · exhale arrival",
    jin: ["Cai (Pluck)", "Peng", "Kao (Lean)"],
    appearsIn: ["yang-24", "yang-108", "chen-laojia-yi-lu", "sun-73"],
  },
  {
    slug: "cloud-hands",
    english: "Cloud Hands (Wave Hands Like Clouds)",
    pinyin: "Yún Shǒu",
    chinese: "雲手",
    family: "Stepping",
    styles: ["Chen", "Yang", "Wu", "Wu-Hao", "Sun"],
    level: "Beginner",
    description:
      "A continuous, side-stepping circle that trains waist-driven movement and lateral rooting. The hands trace soft circles in front of the dantian as the body floats sideways like clouds across the sky.",
    alignment: [
      "Feet parallel, shoulder-width, never crossing",
      "Step side, then close — never lock the knees",
      "Hands trace vertical circles at chest and dantian heights",
      "Waist leads, arms follow — never arm-only motion",
    ],
    cues: [
      "Imagine wiping a fogged window with each palm",
      "The eyes follow the upper hand",
      "Sink slightly with each weight transfer",
    ],
    application: [
      "Defensive deflection across the centerline",
      "Trains waist-power transfer between sides",
    ],
    commonErrors: [
      "Letting the feet cross or stand too narrow",
      "Bobbing up and down with each step",
      "Arms detached from the waist",
    ],
    breath: "One full cycle per pair of circles",
    jin: ["Hua (Neutralize)", "Peng"],
    appearsIn: ["yang-24", "yang-108", "chen-laojia-yi-lu", "wu-108"],
  },
  {
    slug: "white-crane-spreads-wings",
    english: "White Crane Spreads Its Wings",
    pinyin: "Bái Hè Liàng Chì",
    chinese: "白鶴亮翅",
    family: "Strike",
    styles: ["Yang", "Wu", "Wu-Hao", "Sun"],
    level: "Beginner",
    description:
      "An empty-step posture where the right hand rises like a wing and the left hand drops to guard the hip. Cultivates lightness and one-legged rooting.",
    alignment: [
      "Empty stance: 90% weight on back leg, front toe lightly touches",
      "Right hand at temple, palm out, elbow soft",
      "Left palm at left hip, fingers forward",
      "Spine vertical, crown lifted",
    ],
    cues: [
      "Imagine the rear leg as the trunk of a tree",
      "Front foot is a feeler, not a support",
      "Right palm shines outward like a rising wing",
    ],
    application: [
      "Upper hand wards off a high attack, lower hand controls the centerline",
      "The empty step prepares a quick kick or step-through",
    ],
    commonErrors: [
      "Putting too much weight on the front foot",
      "Lifting the rear shoulder",
      "Tilting the torso backward to compensate",
    ],
    breath: "Inhale into the open posture, exhale to settle",
    jin: ["Peng", "Lie (Split)"],
    appearsIn: ["yang-24", "yang-108"],
  },
  {
    slug: "brush-knee-twist-step",
    english: "Brush Knee Twist Step",
    pinyin: "Lǒu Xī Ǎo Bù",
    chinese: "摟膝拗步",
    family: "Stepping",
    styles: ["Chen", "Yang", "Wu", "Wu-Hao", "Sun"],
    level: "Beginner",
    description:
      "A walking strike: as the front hand brushes past the knee, the opposite palm extends forward at chest height. Trains coordinated whole-body issuing.",
    alignment: [
      "Bow stance forward, 70% weight on front leg",
      "Brushing hand passes outside the knee then settles at hip",
      "Striking palm extends from the back leg through the spine",
      "Hips square forward at the moment of arrival",
    ],
    cues: [
      "Push from the back foot; the strike begins in the heel",
      "Brushing hand clears low attacks",
      "Eye, nose, fingertip align at the end",
    ],
    application: [
      "Brushing hand deflects a low strike or kick",
      "Cross-body palm strikes the chest or face",
    ],
    commonErrors: [
      "Striking with the arm before the legs settle",
      "Letting the brushing hand swing wide",
      "Over-rotating the front foot",
    ],
    breath: "Inhale on chamber, exhale on extension",
    jin: ["Hua", "An"],
    appearsIn: ["yang-24", "yang-108", "chen-laojia-yi-lu"],
  },
  {
    slug: "play-the-pipa",
    english: "Play the Pipa (Lute)",
    pinyin: "Shǒu Huī Pípá",
    chinese: "手揮琵琶",
    family: "Strike",
    styles: ["Yang", "Wu", "Wu-Hao", "Sun"],
    level: "Beginner",
    description:
      "Empty-step posture, hands raised as if cradling a lute. A study in subtle counter-rotation and joint locking from softness.",
    alignment: [
      "Empty stance, front heel touches lightly",
      "Front hand at chin height, palm in",
      "Back hand at chest, palm forward",
      "Elbows sink, shoulders quiet",
    ],
    cues: [
      "Both palms face each other on a slight diagonal",
      "Spiral subtly through the spine",
      "Crown lifted, tailbone heavy",
    ],
    application: [
      "Upper hand controls the wrist, lower hand controls the elbow — joint lock setup",
      "Yields to incoming push then pinches the joint",
    ],
    commonErrors: [
      "Over-bending the front knee",
      "Disconnecting the upper hand from the spine",
    ],
    breath: "One smooth inhale into the chamber",
    jin: ["Cai", "Lie"],
    appearsIn: ["yang-108"],
  },
  {
    slug: "step-back-repulse-monkey",
    english: "Step Back Repulse Monkey",
    pinyin: "Dào Niǎn Hóu",
    chinese: "倒攆猴",
    family: "Stepping",
    styles: ["Yang", "Wu", "Wu-Hao", "Sun"],
    level: "Beginner",
    description:
      "The form's only consistently retreating posture. Trains backward stepping with continuous palm strikes — strategic withdrawal that remains fully connected.",
    alignment: [
      "Step back into a bow stance, weight shifts gradually",
      "Retreating hand circles low to high near the ear",
      "Forward palm extends as the rear foot lands",
      "Spine remains vertical throughout retreat",
    ],
    cues: [
      "Toe lands first when stepping back, then heel",
      "Never collapse — the retreat is dignified",
      "Eyes track the forward palm",
    ],
    application: [
      "Defensive retreat under heavy pressure",
      "Continuous palm strikes prevent pursuit",
    ],
    commonErrors: [
      "Stepping back blindly without weighting carefully",
      "Letting the chest collapse",
      "Striking too high",
    ],
    breath: "Inhale on circle, exhale on landing strike",
    jin: ["Hua", "An"],
    appearsIn: ["yang-24", "yang-108", "wu-108"],
  },
  {
    slug: "fair-lady-works-shuttle",
    english: "Fair Lady Works the Shuttle",
    pinyin: "Yù Nǚ Chuān Suō",
    chinese: "玉女穿梭",
    family: "Strike",
    styles: ["Yang", "Wu", "Wu-Hao"],
    level: "Intermediate",
    description:
      "A four-corners sequence: the practitioner pivots to each diagonal in turn, ward-off above the head as the opposite palm strikes. Trains spatial awareness and corner footwork.",
    alignment: [
      "Bow stance to each corner in turn (NE, NW, SW, SE)",
      "Upper hand at temple level, palm outward",
      "Lower hand strikes forward from chest",
      "Hips square to the corner at arrival",
    ],
    cues: [
      "Pivot on the heels between corners",
      "Upper arm shields without hardening",
      "The strike emerges from the rear leg's drive",
    ],
    application: [
      "Defends and counters a multi-attacker scenario",
      "Combines deflection above with strike below",
    ],
    commonErrors: [
      "Losing root during the corner pivots",
      "Striking before the pivot completes",
    ],
    breath: "Inhale during pivot, exhale into corner",
    jin: ["Peng", "An", "Cai"],
    appearsIn: ["yang-108"],
  },
  {
    slug: "snake-creeps-down",
    english: "Snake Creeps Down (Squatting Single Whip)",
    pinyin: "Xià Shì",
    chinese: "下勢",
    family: "Standing",
    styles: ["Chen", "Yang", "Wu", "Wu-Hao", "Sun"],
    level: "Intermediate",
    description:
      "A deep, flat-footed squat that lowers the body along the front leg while the lead hand traces a low arc. Builds enormous leg endurance and hip mobility.",
    alignment: [
      "Back leg deeply bent, sit bone reaches the heel",
      "Front leg straight, foot flat on floor",
      "Spine long, crown lifted — no forward collapse",
      "Hooked hand stays at shoulder height behind",
    ],
    cues: [
      "Sit straight down — do not lean forward",
      "Both feet remain rooted",
      "The lead palm slides along the inside of the front leg",
    ],
    application: [
      "Evades a high strike by sinking under it",
      "Sets up a leg trap or sweeping low strike",
    ],
    commonErrors: [
      "Lifting the front foot's inside edge",
      "Rounding the spine forward",
      "Collapsing the back ankle",
    ],
    breath: "Inhale into descent, exhale at the bottom",
    jin: ["Hua", "Peng"],
    appearsIn: ["yang-108", "chen-laojia-yi-lu", "sun-73"],
  },
  {
    slug: "golden-rooster",
    english: "Golden Rooster Stands on One Leg",
    pinyin: "Jīn Jī Dú Lì",
    chinese: "金雞獨立",
    family: "Standing",
    styles: ["Chen", "Yang", "Wu", "Wu-Hao", "Sun"],
    level: "Intermediate",
    description:
      "A balance posture: one leg roots while the other knee lifts to hip height with the corresponding hand raised. Practiced on both sides as a balance and hip-flexor builder.",
    alignment: [
      "Standing leg slightly bent, ankle stacked under hip",
      "Lifted knee at hip height, foot relaxed",
      "Same-side hand at temple, palm outward",
      "Opposite hand at hip, palm down",
    ],
    cues: [
      "Imagine a string lifting the crown",
      "The lifted knee and same-side hand rise together",
      "Eyes fix on a still point at eye level",
    ],
    application: [
      "Knee strike to mid-section",
      "Sets up a kick or hip throw",
    ],
    commonErrors: [
      "Rocking onto the standing foot's outer edge",
      "Lifting the shoulder",
      "Holding the breath",
    ],
    breath: "Long inhale into the lift, slow exhale to maintain",
    jin: ["Peng", "Kao"],
    appearsIn: ["yang-108", "chen-laojia-yi-lu"],
  },
  {
    slug: "kick-with-heel",
    english: "Kick With Heel",
    pinyin: "Dēng Jiǎo",
    chinese: "蹬腳",
    family: "Kick",
    styles: ["Chen", "Yang", "Wu", "Sun"],
    level: "Intermediate",
    description:
      "A slow, controlled side or front heel kick at hip height with both arms extended in opposition for balance.",
    alignment: [
      "Standing leg deeply rooted, slight bend",
      "Kicking leg extends with heel leading, toes flexed up",
      "Both arms extend horizontally (one over kick, one opposite)",
      "Hips face the kick direction",
    ],
    cues: [
      "Lift knee first, then extend heel",
      "Eye, knee, heel align in the direction of force",
      "Crown stays lifted; do not lean back",
    ],
    application: [
      "Heel strike to ribs or hip joint",
      "Trains slow control of large extensions",
    ],
    commonErrors: [
      "Leaning back to kick higher",
      "Shoulders shrugging",
      "Pointing the toes (loses heel structure)",
    ],
    breath: "Slow inhale into the chamber, exhale through the kick",
    jin: ["An", "Lie"],
    appearsIn: ["yang-24", "yang-108"],
  },
  {
    slug: "needle-at-sea-bottom",
    english: "Needle at Sea Bottom",
    pinyin: "Hǎi Dǐ Zhēn",
    chinese: "海底針",
    family: "Strike",
    styles: ["Yang", "Wu", "Wu-Hao", "Sun"],
    level: "Intermediate",
    description:
      "A sudden downward extension: the lead hand drops as if pointing a needle into the sea floor, body folds forward from the hips with full lengthening of the spine.",
    alignment: [
      "Empty stance, weight on rear leg",
      "Folding from the hips, never the lower back",
      "Lead hand reaches downward, fingers extended",
      "Rear hand guards the temple",
    ],
    cues: [
      "Sink down by bending the back knee, not by collapsing the chest",
      "Spine remains long even as it tilts",
      "Crown reaches forward, sit bones reach back",
    ],
    application: [
      "Wrist release downward against a grab",
      "Strike to the groin or low joint",
    ],
    commonErrors: [
      "Rounding the upper back",
      "Letting the head dangle",
      "Bending only at the lumbar spine",
    ],
    breath: "Long exhale into descent",
    jin: ["Cai", "An"],
    appearsIn: ["yang-108"],
  },
  {
    slug: "punch-under-elbow",
    english: "Punch Under Elbow",
    pinyin: "Zhǒu Dǐ Chuí",
    chinese: "肘底捶",
    family: "Strike",
    styles: ["Yang", "Wu", "Wu-Hao", "Sun"],
    level: "Intermediate",
    description:
      "A close-quarters strike where the rear fist punches under the lead elbow. Trains short power (fa jin) at very close range.",
    alignment: [
      "Empty stance, weight on the back leg",
      "Lead arm at chest, palm in",
      "Rear fist held under the lead elbow, knuckles down",
      "Spine spirals slightly to load",
    ],
    cues: [
      "The punch issues from the dantian, not the shoulder",
      "Lead arm screens and controls",
      "Spiral wrings out the waist",
    ],
    application: [
      "Trapping the opponent's lead arm and striking the ribs",
      "Short, percussive issuing at a clinch range",
    ],
    commonErrors: [
      "Cocking the punching arm visibly back",
      "Losing waist drive",
    ],
    breath: "Sharp exhale on issue",
    jin: ["Ji (Press)", "Lie", "Fa Jin"],
    appearsIn: ["yang-108"],
  },
  {
    slug: "step-up-parry-punch",
    english: "Step Up, Parry, and Punch",
    pinyin: "Jìn Bù Bān Lán Chuí",
    chinese: "進步搬攔捶",
    family: "Strike",
    styles: ["Chen", "Yang", "Wu", "Wu-Hao", "Sun"],
    level: "Beginner",
    description:
      "The classical three-count combination: step in, parry the opponent's strike, then issue a straight fist.",
    alignment: [
      "Three-step bow stance progression",
      "Parrying hand circles down and across the centerline",
      "Punching fist exits from the dantian, knuckles up",
      "Hips square to target at the moment of impact",
    ],
    cues: [
      "Each count is one breath",
      "Step lands before the punch arrives",
      "Punch extends but never locks the elbow",
    ],
    application: [
      "Classical combat sequence: enter, deflect, strike",
      "Trains continuous offensive footwork",
    ],
    commonErrors: [
      "Punching before the foot roots",
      "Parrying too far across the body",
    ],
    breath: "Inhale on step, exhale on parry, sharp exhale on punch",
    jin: ["Hua", "Ji", "Fa Jin"],
    appearsIn: ["yang-24", "yang-108", "chen-laojia-yi-lu"],
  },
  {
    slug: "apparent-close-up",
    english: "Apparent Close Up (As If Closing)",
    pinyin: "Rú Fēng Sì Bì",
    chinese: "如封似閉",
    family: "Strike",
    styles: ["Yang", "Wu", "Wu-Hao", "Sun"],
    level: "Beginner",
    description:
      "A withdrawal that becomes a long press. Both palms come back to the chest, then issue forward together — a quintessential expression of an (push).",
    alignment: [
      "Bow stance, weight 70% rear during withdraw, 70% forward at issue",
      "Both palms turn upward as they retract, downward as they extend",
      "Elbows sink to keep arms unified with the body",
    ],
    cues: [
      "The withdraw is not retreat — it is a coil",
      "Issue from the legs through a softened spine",
      "Both palms arrive at the same height and angle",
    ],
    application: [
      "Neutralizes a push, then returns the energy",
      "Quintessential 'borrowing' (jie jin) expression",
    ],
    commonErrors: [
      "Pushing only with the arms",
      "Losing connection between left and right hands",
    ],
    breath: "Inhale withdraw, exhale issue",
    jin: ["Hua", "An", "Jie Jin"],
    appearsIn: ["yang-24", "yang-108"],
  },
  {
    slug: "cross-hands",
    english: "Cross Hands",
    pinyin: "Shí Zì Shǒu",
    chinese: "十字手",
    family: "Closing",
    styles: ["Yang", "Wu", "Wu-Hao", "Sun"],
    level: "Beginner",
    description:
      "Hands cross in front of the chest as the body returns to a high horse stance. Often the closing posture of a section or the entire form.",
    alignment: [
      "Feet parallel, shoulder-width, knees softly bent",
      "Forearms cross at chest, right outside left (typically)",
      "Palms face inward, elbows hang heavy",
      "Spine vertical, crown lifted",
    ],
    cues: [
      "Both arms feel buoyant — peng above and below",
      "Knees soften, not bend more, as the arms cross",
      "Eyes level, gaze soft",
    ],
    application: [
      "Defensive frame against a high attack from front",
      "Resets the body to neutral before next sequence",
    ],
    commonErrors: [
      "Letting the elbows splay outward",
      "Standing too tall and losing root",
    ],
    breath: "Slow inhale as arms cross",
    jin: ["Peng"],
    appearsIn: ["yang-24", "yang-108", "wu-108"],
  },
  {
    slug: "closing-form",
    english: "Closing of Tai Chi (Gathering Qi)",
    pinyin: "Shōu Shì",
    chinese: "收勢",
    family: "Closing",
    styles: ["Chen", "Yang", "Wu", "Wu-Hao", "Sun"],
    level: "Beginner",
    description:
      "The form returns to Wu Ji. Hands lower along the centerline, gathering qi back to the dantian and sealing the practice.",
    alignment: [
      "Feet close to shoulder width",
      "Hands sink slowly, palms down",
      "Spine remains long until the last moment",
      "Knees straighten last, never first",
    ],
    cues: [
      "Imagine pouring water into the dantian",
      "End in stillness — do not break the moment",
      "Stand for at least 30 seconds after closing",
    ],
    application: [
      "Seals the practice and integrates qi",
      "Trains the discipline of finishing fully",
    ],
    commonErrors: [
      "Rushing the closing",
      "Walking off before the body settles",
    ],
    breath: "Long, slow exhale as hands descend",
    jin: ["Settling"],
    appearsIn: ["yang-24", "yang-108", "chen-laojia-yi-lu", "sun-73"],
  },
  {
    slug: "buddhas-warrior-pounds-mortar",
    english: "Buddha's Warrior Pounds the Mortar",
    pinyin: "Jīn Gāng Dǎo Duì",
    chinese: "金剛搗碓",
    family: "Issuing (Fa Jin)",
    styles: ["Chen"],
    level: "Intermediate",
    description:
      "A signature Chen-style posture: the right fist drops into the open left palm with a clear, audible stamp of the right foot. A vivid expression of the spiral and stomping power unique to Chen lineage.",
    alignment: [
      "Final posture: feet shoulder-width, fist resting in palm at dantian",
      "Knees softly bent, weight even",
      "Spiral wraps from the foot through the spine to the fist",
      "Stamp is rooted, not slapped",
    ],
    cues: [
      "Sink before you stamp — never lift to drop",
      "The fist arrives the moment the foot lands",
      "Sound is a result, not a goal",
    ],
    application: [
      "Knee strike or stomp on opponent's foot",
      "Trains rooted, downward issuing",
    ],
    commonErrors: [
      "Dropping the fist with no spiral",
      "Stomping for sound rather than from root",
    ],
    breath: "Inhale to coil, sharp exhale on stamp",
    jin: ["Fa Jin", "Cai", "Kao"],
    appearsIn: ["chen-laojia-yi-lu", "chen-18"],
  },
  {
    slug: "lazy-tying-coat",
    english: "Lazy About Tying the Coat",
    pinyin: "Lǎn Zhā Yī",
    chinese: "懶扎衣",
    family: "Strike",
    styles: ["Chen", "Wu-Hao"],
    level: "Beginner",
    description:
      "Chen-style equivalent of Yang's Grasp Sparrow's Tail. A tall, open posture with the right palm extended outward as if brushing aside a long robe.",
    alignment: [
      "Wide bow stance to the right",
      "Right palm extends to the side at shoulder height",
      "Left hand at the waist, palm down",
      "Spine vertical, crown lifted, hips open",
    ],
    cues: [
      "Open from the dantian outward",
      "Lead hand spirals as it extends",
      "Eyes on the lead palm",
    ],
    application: [
      "Wards off and brushes aside an incoming arm",
      "Sets up a press or lock from the open frame",
    ],
    commonErrors: [
      "Over-extending the lead arm",
      "Losing waist initiation",
    ],
    breath: "Inhale into the open posture, exhale to settle",
    jin: ["Peng", "Cai"],
    appearsIn: ["chen-laojia-yi-lu", "chen-18"],
  },
  {
    slug: "six-sealing-four-closing",
    english: "Six Sealing, Four Closing",
    pinyin: "Liù Fēng Sì Bì",
    chinese: "六封四閉",
    family: "Strike",
    styles: ["Chen"],
    level: "Intermediate",
    description:
      "A complex Chen-style sealing sequence — both palms press downward and forward in a coordinated double-issuing. The classical expression of an (push) within Chen lineage.",
    alignment: [
      "Bow stance forward",
      "Both palms at chest, then issue at hip height in front",
      "Elbows sink throughout",
    ],
    cues: [
      "Sink and coil before issuing",
      "Both palms arrive in unison",
      "The issuing comes from the legs through the spine",
    ],
    application: [
      "Counter-press against a double-handed grab",
      "Sequential sealing of multiple attack lines",
    ],
    commonErrors: [
      "Rushing the issuing",
      "Hands at different heights",
    ],
    breath: "Inhale to coil, exhale to issue",
    jin: ["An", "Hua"],
    appearsIn: ["chen-laojia-yi-lu", "chen-18"],
  },
  {
    slug: "silk-reeling-horizontal",
    english: "Single-Hand Silk Reeling (Horizontal)",
    pinyin: "Chán Sī Gōng",
    chinese: "纏絲功",
    family: "Silk Reeling",
    styles: ["Chen"],
    level: "Beginner",
    description:
      "Foundational Chen drill: one hand traces a horizontal figure-eight in front of the body while the waist drives the spiral. The pre-form discipline that teaches every other movement.",
    alignment: [
      "Horse stance, feet wider than shoulders, knees over toes",
      "Working hand traces a figure-eight at chest height",
      "Idle hand rests at the waist",
      "Spine vertical; sit bones drop",
    ],
    cues: [
      "The hand never leads — the waist does",
      "Spiral travels foot → knee → hip → shoulder → fingertip",
      "Each circle is one full breath",
    ],
    application: [
      "Trains the spiral connection that powers every Chen technique",
      "Cultivates rooted, full-body movement at low cost",
    ],
    commonErrors: [
      "Drawing the circle with the arm only",
      "Bouncing the spine vertically as the hand moves",
    ],
    breath: "One slow breath per circle",
    jin: ["Chan Si Jin (Silk Reeling)"],
    appearsIn: ["chen-laojia-yi-lu"],
  },
  {
    slug: "silk-reeling-vertical",
    english: "Single-Hand Silk Reeling (Vertical)",
    pinyin: "Lì Chán Sī",
    chinese: "立纏絲",
    family: "Silk Reeling",
    styles: ["Chen"],
    level: "Beginner",
    description:
      "Vertical companion drill to the horizontal silk-reel. Hand traces a vertical figure-eight, building the rising and sinking aspects of the spiral.",
    alignment: [
      "Same horse stance as the horizontal drill",
      "Hand circles vertically in the sagittal plane",
      "Knees track over toes throughout",
    ],
    cues: [
      "Sink as the hand rises behind, lift as it descends in front",
      "Use the breath to drive the rise and fall",
    ],
    application: [
      "Trains rising and sinking issuing",
      "Lays groundwork for fa jin in the vertical plane",
    ],
    commonErrors: [
      "Letting the knees collapse during sinking",
      "Tilting the pelvis forward at the top of the circle",
    ],
    breath: "One full breath per circle",
    jin: ["Chan Si Jin"],
    appearsIn: ["chen-laojia-yi-lu"],
  },
  {
    slug: "zhan-zhuang",
    english: "Zhan Zhuang (Standing Like a Tree)",
    pinyin: "Zhàn Zhuāng",
    chinese: "站樁",
    family: "Standing",
    styles: ["Chen", "Yang", "Wu", "Wu-Hao", "Sun", "Wudang"],
    level: "Beginner",
    description:
      "The cornerstone qi cultivation practice underlying every Tai Chi tradition. The body holds an embraced-tree posture for sustained periods, training root, structure, and quiet mind.",
    alignment: [
      "Feet shoulder-width, knees slightly bent",
      "Arms in a rounded embrace at chest height, palms facing the body",
      "Fingers spread softly, no tension",
      "Crown suspended, sacrum heavy, breath natural",
    ],
    cues: [
      "Hold for 5 minutes to start, build to 30+",
      "Notice tension and release without judgment",
      "Imagine you are embracing a beach ball",
    ],
    application: [
      "Builds the structural integrity behind every issuing",
      "Trains continuous awareness without external movement",
    ],
    commonErrors: [
      "Holding the breath",
      "Locking the knees once fatigue sets in",
      "Lifting the shoulders",
    ],
    breath: "Natural, low and slow; never forced",
    jin: ["Rooting", "Peng"],
    appearsIn: [],
  },
  {
    slug: "fan-through-back",
    english: "Fan Through the Back",
    pinyin: "Shàn Tōng Bèi",
    chinese: "扇通背",
    family: "Strike",
    styles: ["Yang", "Wu", "Wu-Hao", "Sun"],
    level: "Intermediate",
    description:
      "Both arms open like a fan as the spine extends behind. A study in connecting the two scapulae across the back as a single unified spring.",
    alignment: [
      "Bow stance forward",
      "Lead palm at temple, palm out",
      "Rear palm extended forward at chest height",
      "Spine slightly arched but not collapsed",
    ],
    cues: [
      "Both arms emerge from the spine, not the shoulders",
      "The opening is felt across the upper back",
      "Eyes look through the rear palm",
    ],
    application: [
      "Two-handed deflect-and-strike combination",
      "Trains the spinal spring (a hallmark of internal arts)",
    ],
    commonErrors: [
      "Splaying the shoulders backward",
      "Losing the connection across the back",
    ],
    breath: "Inhale to expand, exhale to settle",
    jin: ["Peng", "An"],
    appearsIn: ["yang-108"],
  },
  {
    slug: "high-pat-on-horse",
    english: "High Pat on Horse",
    pinyin: "Gāo Tàn Mǎ",
    chinese: "高探馬",
    family: "Strike",
    styles: ["Yang", "Wu", "Wu-Hao", "Sun"],
    level: "Intermediate",
    description:
      "Empty-step posture, lead palm extends forward at face height as if patting the neck of a tall horse. Trains lightness and reach.",
    alignment: [
      "Empty stance, weight on rear leg",
      "Lead palm forward at face height, fingers up",
      "Rear hand at the waist, palm up",
      "Crown lifted, gaze through the lead palm",
    ],
    cues: [
      "Reach forward without leaning",
      "Lead arm extends, never locks",
      "Rear hand chambers ready to strike",
    ],
    application: [
      "High palm strike to the face",
      "Sets up a follow-up rear-hand attack",
    ],
    commonErrors: [
      "Leaning forward to reach further",
      "Losing the rear-hand chamber",
    ],
    breath: "Inhale to chamber, exhale into reach",
    jin: ["An"],
    appearsIn: ["yang-108"],
  },
  {
    slug: "diagonal-flying",
    english: "Diagonal Flying",
    pinyin: "Xié Fēi Shì",
    chinese: "斜飛勢",
    family: "Strike",
    styles: ["Yang", "Wu", "Wu-Hao", "Sun"],
    level: "Intermediate",
    description:
      "A diagonal opening where both arms split apart on opposite diagonals. The clearest expression of lie (split) energy in the Yang form.",
    alignment: [
      "Wide bow stance on the diagonal",
      "Lead arm extends upward and outward",
      "Rear arm extends downward and back",
      "Hips open, spine long",
    ],
    cues: [
      "The two arms feel like one continuous bow",
      "Open from the dantian outward to both ends",
      "The opening is simultaneous, not sequential",
    ],
    application: [
      "Splits an opponent's structure between two opposing forces",
      "Throws using shoulder kao (lean) and lie (split)",
    ],
    commonErrors: [
      "Opening the arms before the legs settle",
      "Disconnecting the two ends of the bow",
    ],
    breath: "Inhale into the split, exhale at the apex",
    jin: ["Lie", "Kao"],
    appearsIn: ["yang-108"],
  },
];

// ───────────────────────────────────────────────────────────────────
// FORMS — canonical sequences taught across lineages
// ───────────────────────────────────────────────────────────────────

export type Form = {
  slug: string;
  name: string;
  style: FamilyStyle;
  postureCount: number;
  durationMinutes: string;
  level: Level;
  history: string;
  why: string;
  signaturePostures: string[]; // posture slugs
  ideaSequence: string[]; // posture slug excerpt — first 8-12 movements
  bestFor: string[];
};

export const forms: Form[] = [
  {
    slug: "yang-24",
    name: "Yang 24-Posture (Beijing) Form",
    style: "Yang",
    postureCount: 24,
    durationMinutes: "5–7",
    level: "Beginner",
    history:
      "Created in 1956 by a committee of Chinese masters under the Sports Commission as a standardized introduction. Today the most-practiced Tai Chi form in the world; the 'gateway' for hundreds of millions of practitioners.",
    why: "Short enough to learn in weeks, complete enough to express the core principles. The de facto entry into Tai Chi worldwide.",
    signaturePostures: [
      "tai-chi-opening",
      "grasp-sparrows-tail",
      "single-whip",
      "cloud-hands",
      "kick-with-heel",
      "step-up-parry-punch",
      "apparent-close-up",
      "cross-hands",
    ],
    ideaSequence: [
      "wu-ji",
      "tai-chi-opening",
      "grasp-sparrows-tail",
      "single-whip",
      "white-crane-spreads-wings",
      "brush-knee-twist-step",
      "play-the-pipa",
      "step-back-repulse-monkey",
      "cloud-hands",
      "kick-with-heel",
      "step-up-parry-punch",
      "apparent-close-up",
    ],
    bestFor: ["Beginners", "Group classes", "Daily 10-minute practice"],
  },
  {
    slug: "yang-108",
    name: "Yang 108 (Long Form, Yang Chengfu Lineage)",
    style: "Yang",
    postureCount: 108,
    durationMinutes: "20–25",
    level: "Advanced",
    history:
      "Codified by Yang Chengfu (1883–1936) from the family system passed down by Yang Luchan. The complete repository of Yang style, repeated three times across three sections.",
    why: "The full curriculum. Contains every posture and transition the Yang tradition preserves; the gold standard for serious practitioners.",
    signaturePostures: [
      "grasp-sparrows-tail",
      "single-whip",
      "snake-creeps-down",
      "golden-rooster",
      "fair-lady-works-shuttle",
      "needle-at-sea-bottom",
      "fan-through-back",
      "diagonal-flying",
    ],
    ideaSequence: [
      "wu-ji",
      "tai-chi-opening",
      "grasp-sparrows-tail",
      "single-whip",
      "lift-hands-and-step-up",
      "white-crane-spreads-wings",
      "brush-knee-twist-step",
      "play-the-pipa",
      "step-up-parry-punch",
      "apparent-close-up",
      "cross-hands",
      "embrace-tiger-return-to-mountain",
    ],
    bestFor: ["Lifelong practice", "Therapeutic depth", "Martial study"],
  },
  {
    slug: "chen-laojia-yi-lu",
    name: "Chen Laojia Yi Lu (Old Frame, First Routine)",
    style: "Chen",
    postureCount: 74,
    durationMinutes: "12–18",
    level: "Advanced",
    history:
      "The original Chen routine refined by Chen Changxing (1771–1853) at Chen Village. The form Yang Luchan learned before founding Yang style. Combines slow flowing movement with sudden fa jin and stamping.",
    why: "Reveals the spiral and explosive roots of Tai Chi often hidden in the smoother styles.",
    signaturePostures: [
      "buddhas-warrior-pounds-mortar",
      "lazy-tying-coat",
      "six-sealing-four-closing",
      "single-whip",
      "cloud-hands",
      "snake-creeps-down",
    ],
    ideaSequence: [
      "wu-ji",
      "buddhas-warrior-pounds-mortar",
      "lazy-tying-coat",
      "six-sealing-four-closing",
      "single-whip",
      "buddhas-warrior-pounds-mortar",
      "white-crane-spreads-wings",
      "brush-knee-twist-step",
      "cloud-hands",
      "single-whip",
      "snake-creeps-down",
    ],
    bestFor: ["Martial development", "Spiral mechanics", "Explosive power"],
  },
  {
    slug: "chen-18",
    name: "Chen 18-Posture (Short Frame)",
    style: "Chen",
    postureCount: 18,
    durationMinutes: "5–7",
    level: "Beginner",
    history:
      "A modern Chen short form distilled from Laojia. Designed for accessible introduction to Chen style without sacrificing its silk-reeling character.",
    why: "The fastest legitimate route into Chen mechanics. Perfect for cross-training Yang practitioners.",
    signaturePostures: [
      "buddhas-warrior-pounds-mortar",
      "lazy-tying-coat",
      "six-sealing-four-closing",
      "single-whip",
    ],
    ideaSequence: [
      "wu-ji",
      "buddhas-warrior-pounds-mortar",
      "lazy-tying-coat",
      "six-sealing-four-closing",
      "single-whip",
      "white-crane-spreads-wings",
      "brush-knee-twist-step",
      "buddhas-warrior-pounds-mortar",
      "closing-form",
    ],
    bestFor: ["Chen beginners", "Time-constrained daily practice"],
  },
  {
    slug: "sun-73",
    name: "Sun 73-Posture Competition Form",
    style: "Sun",
    postureCount: 73,
    durationMinutes: "10–14",
    level: "Intermediate",
    history:
      "Founded by Sun Lutang (1860–1933) who synthesized Tai Chi, Bagua, and Xingyi. The 73 form is the modern standardized Sun routine featuring the unique 'follow-step' (gen bu) and high frame.",
    why: "Higher stances and continuous follow-stepping make Sun style especially gentle on the knees — the form most studied in arthritis research.",
    signaturePostures: [
      "wu-ji",
      "single-whip",
      "snake-creeps-down",
      "cloud-hands",
    ],
    ideaSequence: [
      "wu-ji",
      "tai-chi-opening",
      "lazy-tying-coat",
      "six-sealing-four-closing",
      "single-whip",
      "cloud-hands",
      "snake-creeps-down",
      "closing-form",
    ],
    bestFor: ["Knee-friendly practice", "Older adults", "Arthritis protocols"],
  },
  {
    slug: "wu-108",
    name: "Wu 108 (Wu Jianquan Lineage)",
    style: "Wu",
    postureCount: 108,
    durationMinutes: "18–22",
    level: "Advanced",
    history:
      "Refined by Wu Jianquan (1870–1942) from the small-frame Yang style of his father Quan You. Distinguished by a forward-leaning posture and small, intricate circles.",
    why: "Compact circles emphasize neutralization (hua jin) — the 'soft' counterpart to Chen's overt power.",
    signaturePostures: [
      "grasp-sparrows-tail",
      "single-whip",
      "step-back-repulse-monkey",
      "cross-hands",
    ],
    ideaSequence: [
      "wu-ji",
      "tai-chi-opening",
      "grasp-sparrows-tail",
      "single-whip",
      "step-back-repulse-monkey",
      "cloud-hands",
      "cross-hands",
      "closing-form",
    ],
    bestFor: ["Small-frame practice", "Push hands development"],
  },
  {
    slug: "wudang-13",
    name: "Wudang 13 Postures (San Feng Pai)",
    style: "Wudang",
    postureCount: 13,
    durationMinutes: "8–10",
    level: "Intermediate",
    history:
      "Attributed traditionally to the Taoist sage Zhang Sanfeng, who legend places at Wudang Mountain in the 12th–13th century. Modern Wudang masters continue to teach a 13-posture short form rooted in Taoist alchemical practice.",
    why: "Carries the most overt Taoist alchemical context — every posture is paired with internal cultivation imagery.",
    signaturePostures: [
      "wu-ji",
      "tai-chi-opening",
      "single-whip",
      "cloud-hands",
    ],
    ideaSequence: [
      "wu-ji",
      "tai-chi-opening",
      "grasp-sparrows-tail",
      "single-whip",
      "cloud-hands",
      "snake-creeps-down",
      "golden-rooster",
      "closing-form",
    ],
    bestFor: ["Taoist alchemical context", "Meditative depth"],
  },
  {
    slug: "yang-40-competition",
    name: "Yang 40-Posture Competition Form",
    style: "Modern",
    postureCount: 40,
    durationMinutes: "5–6",
    level: "Intermediate",
    history:
      "A modern competition routine standardized by the Chinese Wushu Association in the 1990s. Distills Yang style into a tournament-friendly sequence.",
    why: "A bridge between the 24-form and the long form, and the sequence taught at most international competitions.",
    signaturePostures: [
      "grasp-sparrows-tail",
      "single-whip",
      "fair-lady-works-shuttle",
      "kick-with-heel",
    ],
    ideaSequence: [
      "wu-ji",
      "tai-chi-opening",
      "grasp-sparrows-tail",
      "single-whip",
      "white-crane-spreads-wings",
      "brush-knee-twist-step",
      "step-up-parry-punch",
      "apparent-close-up",
      "fair-lady-works-shuttle",
      "kick-with-heel",
      "closing-form",
    ],
    bestFor: ["Competition", "Performance", "Intermediate review"],
  },
];

// ───────────────────────────────────────────────────────────────────
// FAMILY STYLES
// ───────────────────────────────────────────────────────────────────

export type StyleEntry = {
  id: FamilyStyle;
  founder: string;
  era: string;
  characteristics: string[];
  signatureForms: string[]; // form slugs
  bestFor: string[];
  story: string;
};

export const styles: StyleEntry[] = [
  {
    id: "Chen",
    founder: "Chen Wangting (c. 1600–1680)",
    era: "Late Ming, early Qing",
    characteristics: [
      "Alternates slow flow with sudden fa jin (issuing power)",
      "Visible silk-reeling spirals",
      "Stamps and low stances",
      "Most overtly martial of the major styles",
    ],
    signatureForms: ["chen-laojia-yi-lu", "chen-18"],
    bestFor: ["Martial study", "Power development", "Spiral training"],
    story:
      "Founded at Chen Village (Chenjiagou) in Henan province. Chen Wangting synthesized military fighting methods, Taoist breathing, and traditional Chinese medicine into the system from which all later Tai Chi descends. The Chen family taught only family members until Yang Luchan was admitted in the 19th century.",
  },
  {
    id: "Yang",
    founder: "Yang Luchan (1799–1872)",
    era: "Late Qing dynasty",
    characteristics: [
      "Large, expansive frame",
      "Continuous, even tempo without overt fa jin",
      "Most accessible to beginners",
      "Now the most widely practiced style worldwide",
    ],
    signatureForms: ["yang-24", "yang-108", "yang-40-competition"],
    bestFor: ["Beginners", "Health practice", "Broad accessibility"],
    story:
      "Yang Luchan learned Chen style at Chen Village over 18 years and brought it to Beijing where he became known as 'Yang the Invincible.' His grandson Yang Chengfu codified the modern Yang form, which became the basis for the standardized 24-posture form taught today.",
  },
  {
    id: "Wu",
    founder: "Wu Jianquan (1870–1942)",
    era: "Late Qing, Republic",
    characteristics: [
      "Small, compact frame",
      "Distinct forward-leaning posture",
      "Heavy emphasis on neutralization (hua jin)",
      "Sophisticated push-hands curriculum",
    ],
    signatureForms: ["wu-108"],
    bestFor: ["Push hands", "Small-frame mechanics", "Subtle neutralization"],
    story:
      "Founded by Wu Jianquan, son of Quan You — a Manchu official who had studied the small-frame Yang style of Yang Banhou. Wu Jianquan refined his father's teaching into the distinct Wu style, which spread through Shanghai and later Hong Kong.",
  },
  {
    id: "Wu-Hao",
    founder: "Wu Yuxiang (1812–1880)",
    era: "Mid-Qing dynasty",
    characteristics: [
      "Very small, compact circles",
      "Highly internal, almost hidden movement",
      "Strong emphasis on classical theory",
      "Smallest practitioner base today",
    ],
    signatureForms: [],
    bestFor: ["Theoretical study", "Very subtle internal practice"],
    story:
      "Founded by Wu Yuxiang, who learned from both Yang Luchan and Chen Qingping. Wu authored several of the Tai Chi Classics — among the most influential theoretical texts in the entire tradition. The 'Hao' is added to distinguish this Wu lineage from Wu Jianquan's.",
  },
  {
    id: "Sun",
    founder: "Sun Lutang (1860–1933)",
    era: "Late Qing, Republic",
    characteristics: [
      "Very high frame, easy on the knees",
      "Continuous follow-stepping (gen bu)",
      "Combines Tai Chi with Bagua and Xingyi",
      "Most studied style in modern arthritis and balance research",
    ],
    signatureForms: ["sun-73"],
    bestFor: ["Older adults", "Arthritis", "Knee-friendly practice"],
    story:
      "Sun Lutang was already a master of Xingyi and Bagua before he learned Tai Chi from Hao Weizhen. He synthesized all three internal arts into the Sun style. His daughter Sun Jianyun continued the lineage through the 20th century.",
  },
  {
    id: "Wudang",
    founder: "Attributed to Zhang Sanfeng (legendary, ~12th century)",
    era: "Sung/Ming dynasty (legend); modern revival 20th century",
    characteristics: [
      "Strong Taoist alchemical context",
      "Continuous, slow, meditative pace",
      "Pairs every posture with internal imagery",
      "Practiced primarily within Taoist temples",
    ],
    signatureForms: ["wudang-13"],
    bestFor: ["Meditative depth", "Spiritual context"],
    story:
      "Wudang Mountain has been a Taoist sanctuary since the Tang dynasty. Modern Wudang Tai Chi is a 20th-century revival drawing on living Taoist practice and the legend of Zhang Sanfeng, the immortal sage said to have observed a snake and crane to discover the soft martial principle.",
  },
];

// ───────────────────────────────────────────────────────────────────
// 13 POSTURES — 8 ENERGIES (BA MEN) + 5 STEPS (WU BU)
// ───────────────────────────────────────────────────────────────────

export type Energy = {
  id: string;
  pinyin: string;
  chinese: string;
  english: string;
  category: "Cardinal Energy" | "Corner Energy" | "Step";
  direction?: string;
  description: string;
  felt: string;
};

export const thirteenPostures: Energy[] = [
  {
    id: "peng",
    pinyin: "Peng",
    chinese: "掤",
    english: "Ward Off",
    category: "Cardinal Energy",
    direction: "South / Forward-Outward",
    description: "Buoyant, expanding outward energy — like a beach ball under water that cannot be pushed down.",
    felt: "A continuous lift through the entire frame.",
  },
  {
    id: "lu",
    pinyin: "Lu",
    chinese: "捋",
    english: "Roll Back",
    category: "Cardinal Energy",
    direction: "North / Yielding",
    description: "Yields to incoming force, redirects past your line of balance.",
    felt: "Like an open door swinging on its hinge.",
  },
  {
    id: "ji",
    pinyin: "Ji",
    chinese: "擠",
    english: "Press",
    category: "Cardinal Energy",
    direction: "East / Forward-Short",
    description: "Short, unified pressing with two arms acting as one structure.",
    felt: "A connected wall moving forward.",
  },
  {
    id: "an",
    pinyin: "An",
    chinese: "按",
    english: "Push",
    category: "Cardinal Energy",
    direction: "West / Forward-Long",
    description: "Long, descending push driven by the legs and waist.",
    felt: "A wave rising from the heel.",
  },
  {
    id: "cai",
    pinyin: "Cai",
    chinese: "採",
    english: "Pluck",
    category: "Corner Energy",
    direction: "Southwest",
    description: "A downward, suddenly-yielding grasp that draws the opponent off balance.",
    felt: "Like plucking a fruit from a branch — no struggle, just removal.",
  },
  {
    id: "lie",
    pinyin: "Lie",
    chinese: "挒",
    english: "Split",
    category: "Corner Energy",
    direction: "Southeast",
    description: "Two opposing forces issued simultaneously to split the opponent's structure.",
    felt: "A tearing of two ends in opposite directions.",
  },
  {
    id: "zhou",
    pinyin: "Zhou",
    chinese: "肘",
    english: "Elbow Strike",
    category: "Corner Energy",
    direction: "Northeast",
    description: "Close-range strike with the elbow point.",
    felt: "Concentrated, percussive issuing.",
  },
  {
    id: "kao",
    pinyin: "Kao",
    chinese: "靠",
    english: "Lean / Shoulder Strike",
    category: "Corner Energy",
    direction: "Northwest",
    description: "Body weight delivered through the shoulder or hip at extreme close range.",
    felt: "The whole frame becomes the weapon.",
  },
  {
    id: "jin",
    pinyin: "Jin Bu",
    chinese: "進步",
    english: "Step Forward",
    category: "Step",
    direction: "Forward",
    description: "Advancing step that maintains continuous root.",
    felt: "Like wading through soft mud — never lifted, never lost.",
  },
  {
    id: "tui",
    pinyin: "Tui Bu",
    chinese: "退步",
    english: "Step Back",
    category: "Step",
    direction: "Back",
    description: "Retreating step that keeps the centerline alive.",
    felt: "Withdrawing without yielding the heart.",
  },
  {
    id: "zuo",
    pinyin: "Zuo Gu",
    chinese: "左顧",
    english: "Look Left",
    category: "Step",
    direction: "Left",
    description: "Lateral awareness and shifting to the left.",
    felt: "Sensing the periphery without turning the head.",
  },
  {
    id: "you",
    pinyin: "You Pan",
    chinese: "右盼",
    english: "Look Right",
    category: "Step",
    direction: "Right",
    description: "Lateral awareness and shifting to the right.",
    felt: "The same as Look Left, on the opposite side.",
  },
  {
    id: "ding",
    pinyin: "Zhong Ding",
    chinese: "中定",
    english: "Central Equilibrium",
    category: "Step",
    direction: "Center",
    description: "The constant: rooted, balanced center maintained through every change.",
    felt: "An unmoving axis around which all motion turns.",
  },
];

// ───────────────────────────────────────────────────────────────────
// YANG CHENGFU'S 10 ESSENTIALS
// ───────────────────────────────────────────────────────────────────

export type Essential = {
  number: number;
  chinese: string;
  english: string;
  description: string;
};

export const tenEssentials: Essential[] = [
  {
    number: 1,
    chinese: "虛靈頂勁",
    english: "Empty, Lively, Crown Energy",
    description:
      "The crown of the head is gently suspended as if by a string from above. The neck is alive but not stiff. Without this, the spirit cannot rise.",
  },
  {
    number: 2,
    chinese: "含胸拔背",
    english: "Contain the Chest, Pluck Up the Back",
    description:
      "The chest softens inward (never collapsed) and the back rises. Qi sinks to the dantian; the back becomes springy and connected.",
  },
  {
    number: 3,
    chinese: "鬆腰",
    english: "Loosen the Waist",
    description:
      "The waist is the commander of the body. Released and supple, it drives every movement; tight, it blocks all flow.",
  },
  {
    number: 4,
    chinese: "分虛實",
    english: "Distinguish Empty and Full",
    description:
      "At every moment one leg is full (rooted, weighted) and the other empty. Without this distinction, every step is heavy and every movement double-weighted.",
  },
  {
    number: 5,
    chinese: "沉肩墜肘",
    english: "Sink the Shoulders, Drop the Elbows",
    description:
      "Shoulders that lift cut off the qi to the arms. Elbows that float stiffen the shoulders. Both must hang heavy.",
  },
  {
    number: 6,
    chinese: "用意不用力",
    english: "Use Intention, Not Force",
    description:
      "Move with the mind (yi), not muscular tension (li). Where the intention goes, the qi follows; where the qi goes, the body moves.",
  },
  {
    number: 7,
    chinese: "上下相隨",
    english: "Upper and Lower Body Follow Each Other",
    description:
      "Hands, waist, and feet move as one. If any part moves alone, the body is divided.",
  },
  {
    number: 8,
    chinese: "內外相合",
    english: "Inside and Outside Combine",
    description:
      "Body, breath, and intention unite. Outer movement expresses inner stillness.",
  },
  {
    number: 9,
    chinese: "相連不斷",
    english: "Connected Without Interruption",
    description:
      "Movement flows like water from a spring — never stopping, never starting. Each posture grows from the last.",
  },
  {
    number: 10,
    chinese: "動中求靜",
    english: "Seek Stillness in Motion",
    description:
      "The mind remains quiet even as the body moves. This is the meditative core of Tai Chi.",
  },
];

// ───────────────────────────────────────────────────────────────────
// CLASSICS — selected excerpts
// ───────────────────────────────────────────────────────────────────

export type ClassicExcerpt = {
  id: string;
  title: string;
  attributedTo: string;
  era: string;
  passage: string;
  commentary: string;
};

export const classics: ClassicExcerpt[] = [
  {
    id: "wang-zongyue",
    title: "Tai Chi Chuan Treatise",
    attributedTo: "Wang Zongyue",
    era: "Late Ming / early Qing",
    passage:
      "Tai Chi is born of Wuji. It is the mother of yin and yang. In motion, it separates; in stillness, it unites. Without excess, without deficiency.",
    commentary:
      "The foundational opening of Tai Chi theory. Wuji is the undifferentiated stillness; Tai Chi is the first separation into yin and yang. Every form begins by stepping out of Wuji and ends by returning to it.",
  },
  {
    id: "song-of-13",
    title: "Song of the Thirteen Postures",
    attributedTo: "Anonymous (Wang or Wu Yuxiang attribution)",
    era: "Qing dynasty",
    passage:
      "The thirteen postures must not be neglected. The source of life is the waist. Pay attention to the alternation of empty and full; let qi flow throughout the whole body without the slightest interruption.",
    commentary:
      "Names the 13 fundamentals (8 energies + 5 steps) and the central role of the waist as commander. Memorized by serious students.",
  },
  {
    id: "wu-yuxiang-treatise",
    title: "The Mental Elucidation of the Thirteen Postures",
    attributedTo: "Wu Yuxiang",
    era: "Mid-Qing dynasty",
    passage:
      "Use the mind (yi) to direct the qi; use the qi to move the body. The qi must be sunk and gathered into the bones. Internally, the spirit (shen) is firm; externally, the appearance is calm.",
    commentary:
      "Codifies the internal sequence: yi → qi → body. The body is the last to move, not the first. Spirit firm inside, calm outside — the paradox at the heart of Tai Chi.",
  },
  {
    id: "song-of-push-hands",
    title: "Song of Push Hands",
    attributedTo: "Anonymous",
    era: "Qing dynasty",
    passage:
      "Stick, adhere, connect, follow. Do not let go, do not resist. When the opponent is hard, I am soft — this is yielding. When I follow and the opponent is left behind — this is sticking.",
    commentary:
      "The four core skills of push hands (zhan, lian, nian, sui). The training method through which all theory becomes embodied.",
  },
  {
    id: "soft-overcomes-hard",
    title: "From the Tao Te Ching",
    attributedTo: "Lao Tzu",
    era: "6th–4th century BCE",
    passage:
      "Nothing in the world is softer than water, yet for attacking the hard and strong, nothing surpasses it.",
    commentary:
      "The philosophical seed of Tai Chi's softness. The Tao Te Ching predates Tai Chi by some 2,000 years yet articulates its central principle.",
  },
];

// ───────────────────────────────────────────────────────────────────
// GOALS — therapeutic and martial protocols
// ───────────────────────────────────────────────────────────────────

export type GoalEntry = {
  id: TaiChiGoal;
  label: string;
  blurb: string;
  duration: string;
  protocol: string[];
  practices: string[]; // posture or form slugs
  pranayama: string[]; // breath/qi exercises
  research: string;
  evidenceLevel: "Strong" | "Moderate" | "Emerging";
};

export const goals: GoalEntry[] = [
  {
    id: "balance",
    label: "Balance & Falls Prevention",
    blurb:
      "The strongest evidence base for Tai Chi. Multiple meta-analyses show ~20–45% reduction in fall risk among older adults.",
    duration: "12 weeks, 2–3 sessions per week",
    protocol: [
      "Begin with 10 minutes Zhan Zhuang to train static rooting",
      "Practice Sun 73-form or Yang 24-form, slowly and shallowly",
      "Add single-leg work: Golden Rooster, both sides, 30s each",
      "Finish with 5 minutes Cloud Hands for lateral balance",
    ],
    practices: [
      "wu-ji",
      "zhan-zhuang",
      "golden-rooster",
      "cloud-hands",
      "snake-creeps-down",
    ],
    pranayama: [
      "Lower abdominal breathing in standing (5 minutes)",
      "Reverse abdominal breathing during Zhan Zhuang",
    ],
    research:
      "Li et al. (2018) randomized trial: Tai Chi reduced incidence of falls by 58% vs stretching control over 24 weeks. Cochrane review (2019) lists Tai Chi as a recommended intervention for community-dwelling older adults.",
    evidenceLevel: "Strong",
  },
  {
    id: "knee-osteoarthritis",
    label: "Knee Osteoarthritis & Joint Pain",
    blurb:
      "12-week Tai Chi protocols show clinically significant reductions in WOMAC pain and stiffness, often comparable to physical therapy.",
    duration: "12 weeks, 2 × 60-minute sessions per week",
    protocol: [
      "Use Sun-style 73 form exclusively (high frame, knee-friendly)",
      "Avoid deep stances (no Snake Creeps Down) until pain subsides",
      "Include 10 minutes seated joint mobility before each session",
      "End with 10 minutes silk-reeling at horse-stance height of comfort",
    ],
    practices: [
      "wu-ji",
      "tai-chi-opening",
      "single-whip",
      "cloud-hands",
      "silk-reeling-horizontal",
    ],
    pranayama: [
      "Six Healing Sounds (Liver, Heart variants) for joint inflammation",
      "Slow nasal breathing throughout the form",
    ],
    research:
      "Wang et al. (2016) NEJM-published trial: 12 weeks of Tai Chi vs. physical therapy in knee OA — both groups improved equally on WOMAC. Tai Chi group showed greater improvements in mood and quality of life.",
    evidenceLevel: "Strong",
  },
  {
    id: "blood-pressure",
    label: "Blood Pressure & Cardiovascular Health",
    blurb:
      "Regular Tai Chi reduces systolic blood pressure by an average of 7–15 mmHg in hypertensive adults.",
    duration: "12–24 weeks, 30 minutes daily",
    protocol: [
      "Daily 30-minute practice of Yang 24 or Yang 40",
      "Include 5 minutes of preliminary breathing meditation",
      "Maintain heart rate at 50–70% of max throughout",
      "End with 5 minutes seated Wu Ji meditation",
    ],
    practices: ["wu-ji", "tai-chi-opening", "grasp-sparrows-tail", "cloud-hands"],
    pranayama: [
      "Coherent breathing (5.5 breaths/min) for 10 minutes",
      "Bee-hum (Bhramari) for parasympathetic activation",
    ],
    research:
      "Yeh et al. (2008, 2017) meta-analyses: Tai Chi reduced systolic BP by 12.0 mmHg and diastolic by 6.5 mmHg in hypertensive adults across 9 RCTs. Sustained practice required for maintenance.",
    evidenceLevel: "Strong",
  },
  {
    id: "cognition",
    label: "Cognitive Function & Brain Health",
    blurb:
      "Tai Chi shows neuroprotective effects: improved executive function, working memory, and increased gray matter volume in older adults.",
    duration: "24 weeks, 3 sessions per week",
    protocol: [
      "Learn a sequence of at least 24 postures (Yang 24 or larger)",
      "Practice from memory (no instructor lead-along)",
      "Add visualization: see each posture before performing",
      "Track recall with weekly self-tests",
    ],
    practices: [
      "tai-chi-opening",
      "grasp-sparrows-tail",
      "single-whip",
      "fair-lady-works-shuttle",
    ],
    pranayama: [
      "Alternate-nostril breathing before practice (5 minutes)",
      "One-pointed focus on dantian during Zhan Zhuang",
    ],
    research:
      "Wayne et al. (2014): meta-analysis of 11 RCTs showing significant cognitive benefits in healthy older adults. Mortimer et al. (2012): MRI evidence of increased gray matter in Tai Chi practitioners after 40 weeks.",
    evidenceLevel: "Moderate",
  },
  {
    id: "anxiety-depression",
    label: "Anxiety & Depression",
    blurb:
      "Moderate evidence for reduced anxiety and mild–moderate depression with regular Tai Chi practice.",
    duration: "8–12 weeks, 3 × 45-minute sessions per week",
    protocol: [
      "Pair the form with explicit attention to breath length",
      "Practice in a group setting where possible (social benefit)",
      "End each session with 5 minutes seated open-awareness",
      "Track mood with a simple 1–10 daily journal",
    ],
    practices: ["wu-ji", "zhan-zhuang", "cloud-hands", "closing-form"],
    pranayama: [
      "4-6 breath (inhale 4, exhale 6) for vagal activation",
      "Soft Ujjayi-style breath through the form",
    ],
    research:
      "Wang et al. (2014) systematic review: Tai Chi shows moderate effect size for reducing anxiety (d = 0.66) and depression (d = 0.52) across 40+ studies.",
    evidenceLevel: "Moderate",
  },
  {
    id: "sleep",
    label: "Sleep Quality & Insomnia",
    blurb:
      "Tai Chi improves subjective sleep quality and reduces insomnia symptoms, particularly in older adults and breast cancer survivors.",
    duration: "10–16 weeks, 3 × 60-minute sessions per week",
    protocol: [
      "Practice in the late afternoon, never within 90 min of bed",
      "Include 10 minutes seated breath meditation per session",
      "Avoid stimulating fa jin or kicks late in the day",
      "Pair with a dark-room evening routine",
    ],
    practices: ["wu-ji", "tai-chi-opening", "cloud-hands", "closing-form"],
    pranayama: [
      "Long-exhale breathing (4 in, 8 out) before bed",
      "Body scan meditation seated for 10 minutes",
    ],
    research:
      "Irwin et al. (2014): Tai Chi vs. cognitive behavioral therapy for insomnia in older adults — both equally effective. Sleep latency, efficiency, and Pittsburgh Sleep Quality Index all improved.",
    evidenceLevel: "Moderate",
  },
  {
    id: "fibromyalgia",
    label: "Fibromyalgia & Chronic Pain",
    blurb:
      "Among the few interventions with strong RCT evidence for fibromyalgia symptom reduction.",
    duration: "12 weeks minimum, 2 × 60-minute sessions per week",
    protocol: [
      "Use a high-frame Yang or Sun style — gentle on connective tissue",
      "Begin every session with a 10-min seated body scan",
      "Limit hold times in standing postures initially",
      "Progress slowly — symptom flares are common at first",
    ],
    practices: ["wu-ji", "tai-chi-opening", "cloud-hands", "closing-form"],
    pranayama: [
      "Equal breathing (5 in, 5 out) during practice",
      "Loving-kindness phrases on each exhale",
    ],
    research:
      "Wang et al. (2018) NEJM trial: 12+ weeks of Tai Chi vs aerobic exercise in fibromyalgia — Tai Chi group showed greater improvements on FIQR pain, sleep, depression, and quality of life.",
    evidenceLevel: "Strong",
  },
  {
    id: "parkinsons",
    label: "Parkinson's Disease",
    blurb:
      "Improves balance, reduces falls, and slows motor symptom progression in mild-to-moderate Parkinson's.",
    duration: "24 weeks, 2 × 60-minute sessions per week",
    protocol: [
      "Sun-style 73 form: gentlest stances and rhythm",
      "Pair with caregiver or partner support for safety",
      "Never practice during 'off' medication periods initially",
      "Track UPDRS scores quarterly with care team",
    ],
    practices: ["wu-ji", "tai-chi-opening", "cloud-hands", "single-whip"],
    pranayama: [
      "Diaphragmatic breathing seated (10 minutes pre-practice)",
      "Slow, even breath throughout the form",
    ],
    research:
      "Li et al. (2012) NEJM: Tai Chi vs. resistance training and stretching in 195 patients with mild-to-moderate Parkinson's — Tai Chi group had significantly better balance and lower falls rate.",
    evidenceLevel: "Strong",
  },
  {
    id: "immune",
    label: "Immune Function",
    blurb:
      "Emerging evidence for improved vaccine response and antiviral immunity in older Tai Chi practitioners.",
    duration: "16–25 weeks, 3 × 45-minute sessions per week",
    protocol: [
      "Daily practice through cold-and-flu season",
      "Pair with adequate sleep and morning sunlight",
      "Avoid practicing if febrile",
      "Maintain practice during recovery (gentle, short sessions)",
    ],
    practices: ["wu-ji", "tai-chi-opening", "zhan-zhuang", "cloud-hands"],
    pranayama: [
      "Six Healing Sounds full sequence",
      "Bone-marrow washing visualization (Taoist)",
    ],
    research:
      "Irwin et al. (2007): Tai Chi practitioners showed a 40% increase in varicella-zoster virus-specific cell-mediated immunity over 16 weeks vs. health education control.",
    evidenceLevel: "Emerging",
  },
  {
    id: "martial-skill",
    label: "Martial Skill & Push Hands",
    blurb:
      "The original purpose of Tai Chi: a sophisticated internal martial art. Push hands is the laboratory.",
    duration: "Ongoing — measured in years, not weeks",
    protocol: [
      "Master a long form (Yang 108 or Chen Laojia) before push hands",
      "Begin fixed-step push hands with a single trusted partner",
      "Progress to moving-step only after 1+ years of fixed-step",
      "Train sensitivity, not power: feel before you act",
    ],
    practices: [
      "grasp-sparrows-tail",
      "punch-under-elbow",
      "single-whip",
      "buddhas-warrior-pounds-mortar",
      "diagonal-flying",
    ],
    pranayama: [
      "Zhan Zhuang for 30+ minutes daily",
      "Reverse abdominal breathing during issuing practice",
    ],
    research:
      "Limited modern research on martial efficacy. The strongest evidence is centuries of lineage transmission and historical accounts of practitioners like Yang Luchan, Chen Fake, and Hao Weizhen.",
    evidenceLevel: "Moderate",
  },
];

// ───────────────────────────────────────────────────────────────────
// PUSH HANDS PROGRESSION
// ───────────────────────────────────────────────────────────────────

export type PushHandsTier = {
  tier: number;
  name: string;
  prerequisite: string;
  practice: string;
  signs: string[];
};

export const pushHandsProgression: PushHandsTier[] = [
  {
    tier: 1,
    name: "Single-Hand Stationary",
    prerequisite: "Comfortable in 24-form",
    practice:
      "Both partners in a fixed bow stance, single-hand contact, simply maintaining touch as the partner pushes and yields.",
    signs: [
      "Maintains contact through full range",
      "Knees and back stay aligned",
      "No grip strength involved",
    ],
  },
  {
    tier: 2,
    name: "Double-Hand Stationary",
    prerequisite: "Single-hand for 3+ months",
    practice:
      "Both hands in contact, cycling through peng, lu, ji, an. The four-energy cycle becomes the basic conversation.",
    signs: [
      "Both arms move as one unit",
      "Yielding without losing root",
      "Issuing without hardening",
    ],
  },
  {
    tier: 3,
    name: "Da Lu (Great Roll Back)",
    prerequisite: "Stationary push hands for 6+ months",
    practice:
      "Adds the four 'corner' energies (cai, lie, zhou, kao). Partners now move through diagonals and engage in multi-directional play.",
    signs: [
      "Switches between cardinal and corner energies fluidly",
      "Maintains structure when off-axis",
    ],
  },
  {
    tier: 4,
    name: "Moving-Step Push Hands",
    prerequisite: "Da Lu for 12+ months",
    practice:
      "Partners now step. Stationary becomes free movement: stepping in, stepping back, circling. Sensitivity meets footwork.",
    signs: [
      "Steps maintain root through transition",
      "Reads partner's center through contact alone",
    ],
  },
  {
    tier: 5,
    name: "San Shou (Free Hands)",
    prerequisite: "Moving-step for years",
    practice:
      "Open application: any technique, any direction. The full curriculum of Tai Chi as a martial art.",
    signs: [
      "Spontaneous, formless application",
      "Soft response to fast attack",
      "Issuing without telegraph",
    ],
  },
];

// ───────────────────────────────────────────────────────────────────
// HEALTH SCIENCE — research library
// ───────────────────────────────────────────────────────────────────

export type Study = {
  id: string;
  title: string;
  authors: string;
  year: number;
  journal: string;
  design: string;
  population: string;
  intervention: string;
  outcome: string;
  link?: string;
  category: TaiChiGoal | "general";
};

export const studies: Study[] = [
  {
    id: "li-2012-parkinsons-nejm",
    title: "Tai Chi and Postural Stability in Patients with Parkinson's Disease",
    authors: "Li F, Harmer P, Fitzgerald K, et al.",
    year: 2012,
    journal: "New England Journal of Medicine, 366(6):511-519",
    design: "Randomized controlled trial",
    population: "195 patients with mild-to-moderate Parkinson's",
    intervention: "60 min Tai Chi vs. resistance training vs. stretching, 2×/week × 24 weeks",
    outcome:
      "Tai Chi outperformed both controls on maximum excursion balance, directional control, and falls (HR 0.33 vs stretching).",
    category: "parkinsons",
  },
  {
    id: "wang-2010-fibromyalgia-nejm",
    title: "A Randomized Trial of Tai Chi for Fibromyalgia",
    authors: "Wang C, Schmid CH, Rones R, et al.",
    year: 2010,
    journal: "New England Journal of Medicine, 363(8):743-754",
    design: "Randomized controlled trial",
    population: "66 adults with fibromyalgia",
    intervention: "Yang-style Tai Chi vs. wellness education + stretching, 60 min × 2/week × 12 weeks",
    outcome:
      "Tai Chi group: FIQR score improved 27.8 vs. 9.4 in control. Benefits maintained at 24 weeks.",
    category: "fibromyalgia",
  },
  {
    id: "wang-2018-knee-oa-annals",
    title: "Comparative Effectiveness of Tai Chi vs Physical Therapy for Knee Osteoarthritis",
    authors: "Wang C, Schmid CH, Iversen MD, et al.",
    year: 2016,
    journal: "Annals of Internal Medicine, 165(2):77-86",
    design: "Randomized comparative effectiveness trial",
    population: "204 adults with symptomatic knee OA",
    intervention: "Tai Chi 2×/week vs. PT 2×/week × 12 weeks",
    outcome:
      "Both groups improved equally on WOMAC pain. Tai Chi group showed greater improvements in depression and physical quality of life.",
    category: "knee-osteoarthritis",
  },
  {
    id: "li-2018-falls-jamai",
    title: "Effectiveness of a Therapeutic Tai Ji Quan Intervention vs. Multimodal Exercise on Falls",
    authors: "Li F, Harmer P, Fitzgerald K, et al.",
    year: 2018,
    journal: "JAMA Internal Medicine, 178(10):1301-1310",
    design: "Randomized controlled trial",
    population: "670 community-dwelling adults aged 70+",
    intervention: "Tai Ji Quan: Moving for Better Balance vs. multimodal exercise vs. stretching, 24 weeks",
    outcome:
      "Tai Ji Quan reduced falls by 58% vs. stretching and 31% vs. multimodal exercise.",
    category: "balance",
  },
  {
    id: "yeh-2008-bp",
    title: "The Effect of Tai Chi Exercise on Blood Pressure",
    authors: "Yeh GY, Wang C, Wayne PM, Phillips RS",
    year: 2008,
    journal: "Preventive Cardiology",
    design: "Systematic review of 26 studies",
    population: "Adults with and without hypertension",
    intervention: "Various Tai Chi protocols (12+ weeks)",
    outcome:
      "Average systolic BP reduction of 7–32 mmHg, diastolic 2.4–18 mmHg in hypertensive populations.",
    category: "blood-pressure",
  },
  {
    id: "irwin-2014-insomnia",
    title: "Tai Chi Compared with CBT-I for Insomnia",
    authors: "Irwin MR, Olmstead R, Carrillo C, et al.",
    year: 2014,
    journal: "Sleep, 37(9):1543-1552",
    design: "Randomized controlled trial",
    population: "123 older adults with insomnia",
    intervention: "Tai Chi vs. CBT-I vs. sleep-seminar control, weekly × 4 months",
    outcome:
      "Tai Chi and CBT-I were equally effective at improving Pittsburgh Sleep Quality Index and sleep efficiency.",
    category: "sleep",
  },
  {
    id: "wayne-2014-cognition",
    title: "Effect of Tai Chi on Cognitive Performance in Older Adults",
    authors: "Wayne PM, Walsh JN, Taylor-Piliae RE, et al.",
    year: 2014,
    journal: "Journal of the American Geriatrics Society, 62(1):25-39",
    design: "Systematic review and meta-analysis (20 studies)",
    population: "Older adults, healthy and cognitively impaired",
    intervention: "Various Tai Chi protocols",
    outcome:
      "Significant improvements in executive function (d = 0.90), language, memory, attention.",
    category: "cognition",
  },
  {
    id: "irwin-2007-immune",
    title: "Augmenting Immune Responses to Varicella Zoster Virus in Older Adults",
    authors: "Irwin MR, Olmstead R, Oxman MN",
    year: 2007,
    journal: "Journal of the American Geriatrics Society, 55(4):511-517",
    design: "Randomized controlled trial",
    population: "112 healthy adults aged 59–86",
    intervention: "16 weeks Tai Chi vs. health education + later varicella vaccine",
    outcome:
      "Tai Chi group showed a 40% increase in VZV-specific cell-mediated immunity, equivalent to a 5-decade reversal in age.",
    category: "immune",
  },
  {
    id: "wang-2014-anxiety",
    title: "Managing Stress and Anxiety Through Tai Chi",
    authors: "Wang F, Lee EK, Wu T, et al.",
    year: 2014,
    journal: "BMC Complementary and Alternative Medicine, 14:8",
    design: "Systematic review (15 studies)",
    population: "Adults with anxiety, stress, or depression",
    intervention: "8–24 weeks of various Tai Chi protocols",
    outcome:
      "Significant reductions in anxiety (effect size 0.66) and depression (0.52) compared to controls.",
    category: "anxiety-depression",
  },
  {
    id: "mortimer-2012-brain-volume",
    title: "Changes in Brain Volume and Cognition in a Randomized Trial of Exercise and Cognitive Stimulation",
    authors: "Mortimer JA, Ding D, Borenstein AR, et al.",
    year: 2012,
    journal: "Journal of Alzheimer's Disease, 30(4):757-766",
    design: "Randomized controlled trial",
    population: "120 healthy older adults in Shanghai",
    intervention: "40 weeks Tai Chi vs. walking vs. social interaction vs. control",
    outcome:
      "Tai Chi group showed increased brain volume and improved cognitive scores; walking group showed brain volume changes only.",
    category: "cognition",
  },
  {
    id: "lan-2008-cardiopulmonary",
    title: "Tai Chi Chuan Training to Enhance Microcirculatory Function",
    authors: "Lan C, Chou SW, Chen SY, Lai JS, Wong MK",
    year: 2004,
    journal: "American Journal of Chinese Medicine, 32(1):141-150",
    design: "Cross-sectional",
    population: "Older Tai Chi practitioners vs. age-matched sedentary controls",
    intervention: "Long-term (5+ years) Tai Chi practice",
    outcome:
      "Practitioners showed significantly higher peak VO2, maximal heart rate, and skin microcirculation.",
    category: "general",
  },
  {
    id: "taylor-2017-fibromyalgia",
    title: "Tai Chi Mind-Body Exercise vs Aerobic Exercise for Fibromyalgia",
    authors: "Wang C, Schmid CH, Fielding RA, et al.",
    year: 2018,
    journal: "BMJ, 360:k851",
    design: "Randomized comparative effectiveness trial",
    population: "226 adults with fibromyalgia",
    intervention: "Tai Chi 1× or 2×/week, 12 or 24 weeks vs. aerobic exercise",
    outcome:
      "Tai Chi groups showed greater FIQR improvement than aerobic exercise; benefits sustained 52 weeks.",
    category: "fibromyalgia",
  },
  {
    id: "wong-2001-bone-density",
    title: "Tai Chi Chuan Exercise and Bone Mineral Density",
    authors: "Qin L, Au S, Choy W, et al.",
    year: 2002,
    journal: "Archives of Physical Medicine and Rehabilitation, 83(10):1355-1359",
    design: "Cross-sectional",
    population: "Postmenopausal women, Tai Chi practitioners vs. sedentary",
    intervention: "Long-term Tai Chi practice",
    outcome:
      "Tai Chi group had significantly higher BMD at lumbar spine and hip — protective against osteoporosis.",
    category: "general",
  },
  {
    id: "wayne-2014-fall-prevention",
    title: "Effect of Tai Chi on Physical Function, Fall Rates, and Quality of Life in Older Adults with Stroke",
    authors: "Taylor-Piliae RE, Hoke TM, Hepworth JT, et al.",
    year: 2014,
    journal: "Archives of Physical Medicine and Rehabilitation, 95(5):816-824",
    design: "Randomized controlled trial",
    population: "145 community-dwelling stroke survivors",
    intervention: "Tai Chi vs. SilverSneakers vs. usual care, 12 weeks",
    outcome:
      "Tai Chi group had fewer falls (5 vs 14 vs 15) and improved balance vs. controls.",
    category: "balance",
  },
  {
    id: "wayne-2018-cognition-meta",
    title: "Tai Chi for the Prevention and Treatment of Dementia",
    authors: "Lim KH, Pysklywec A, Plante M, Demers L",
    year: 2019,
    journal: "BMC Geriatrics, 19:33",
    design: "Systematic review and meta-analysis (24 studies)",
    population: "Older adults with and without cognitive impairment",
    intervention: "Various Tai Chi protocols 12–52 weeks",
    outcome:
      "Significant improvements on global cognition (MoCA, MMSE) particularly in mild cognitive impairment.",
    category: "cognition",
  },
  {
    id: "tsang-2008-depression",
    title: "Effect of a Qigong Exercise Programme on Elderly with Depression",
    authors: "Tsang HW, Fung KM, Chan AS, Lee G, Chan F",
    year: 2006,
    journal: "International Journal of Geriatric Psychiatry, 21(9):890-897",
    design: "Randomized controlled trial",
    population: "82 older adults with depressive symptoms",
    intervention: "Tai Chi/Qigong vs. newspaper reading control, 16 weeks",
    outcome:
      "Tai Chi/Qigong group: 50%+ reduction in Geriatric Depression Scale.",
    category: "anxiety-depression",
  },
  {
    id: "yeh-2011-heart-failure",
    title: "Tai Chi Exercise for Patients with Chronic Heart Failure",
    authors: "Yeh GY, McCarthy EP, Wayne PM, et al.",
    year: 2011,
    journal: "Archives of Internal Medicine, 171(8):750-757",
    design: "Randomized controlled trial",
    population: "100 patients with chronic systolic heart failure",
    intervention: "Tai Chi 1 hour 2×/week × 12 weeks vs. education",
    outcome:
      "Tai Chi group showed improved quality of life, mood, exercise self-efficacy, and 6-minute walk.",
    category: "general",
  },
  {
    id: "lavretsky-2011-depression",
    title: "Complementary Use of Tai Chi Augments Escitalopram Treatment of Geriatric Depression",
    authors: "Lavretsky H, Alstein LL, Olmstead RE, et al.",
    year: 2011,
    journal: "American Journal of Geriatric Psychiatry, 19(10):839-850",
    design: "Randomized controlled trial",
    population: "112 older adults with major depression",
    intervention: "Escitalopram + Tai Chi vs. escitalopram + health education, 10 weeks",
    outcome:
      "Tai Chi adjunct group: greater reduction in depression severity and remission rate.",
    category: "anxiety-depression",
  },
  {
    id: "voukelatos-2007-falls",
    title: "A Randomized, Controlled Trial of Tai Chi for the Prevention of Falls",
    authors: "Voukelatos A, Cumming RG, Lord SR, Rissel C",
    year: 2007,
    journal: "Journal of the American Geriatrics Society, 55(8):1185-1191",
    design: "Randomized controlled trial",
    population: "702 community-dwelling adults aged 60+",
    intervention: "16 weeks Tai Chi vs. wait-list control",
    outcome:
      "Tai Chi group had 33% lower fall rate at 24 weeks (HR 0.67).",
    category: "balance",
  },
  {
    id: "li-2005-tcfbb",
    title: "Tai Chi: Improving Functional Balance and Predicting Subsequent Falls in Older Persons",
    authors: "Li F, Harmer P, Fisher KJ, et al.",
    year: 2005,
    journal: "Medicine & Science in Sports & Exercise, 37(12):2046-2052",
    design: "Randomized controlled trial",
    population: "256 older adults (70-92y)",
    intervention: "6 months Tai Chi vs. stretching",
    outcome:
      "Tai Chi reduced falls by 55% (RR 0.45). Functional balance improved significantly.",
    category: "balance",
  },
];

// ───────────────────────────────────────────────────────────────────
// MASTERY — 5-tier curriculum
// ───────────────────────────────────────────────────────────────────

export type Tier = {
  id: string;
  name: string;
  color: string;
  required: { postures: number; goals: number; daysPracticed: number };
  curriculum: string[];
  why: string;
};

export const tiers: Tier[] = [
  {
    id: "beginner",
    name: "Beginner — Shape",
    color: "#bce8ff",
    required: { postures: 0, goals: 0, daysPracticed: 0 },
    curriculum: [
      "Memorize Wu Ji and 24-form opening sequence",
      "Hold Zhan Zhuang for 5 minutes",
      "Learn the 8 energies by name",
    ],
    why: "Learn the external shape: where the feet go, what the hands trace, when to breathe.",
  },
  {
    id: "student",
    name: "Student — Coordination",
    color: "#7cd9ff",
    required: { postures: 8, goals: 1, daysPracticed: 30 },
    curriculum: [
      "Complete Yang 24-form from memory",
      "Hold Zhan Zhuang for 15 minutes",
      "Learn silk-reeling (horizontal and vertical)",
      "Begin one therapeutic goal protocol",
    ],
    why: "The body parts begin to move as one. Waist drives the limbs, breath drives the form.",
  },
  {
    id: "practitioner",
    name: "Practitioner — Connection",
    color: "#5ec3a8",
    required: { postures: 16, goals: 2, daysPracticed: 100 },
    curriculum: [
      "Begin a long form (Yang 108 or Chen Laojia)",
      "Begin fixed-step push hands with a partner",
      "Hold Zhan Zhuang for 30 minutes",
      "Memorize Yang Chengfu's 10 Essentials",
    ],
    why: "Internal connection appears: the spiral, the rooting, the sense that movement begins below the ground.",
  },
  {
    id: "adept",
    name: "Adept — Issuing",
    color: "#e2a83b",
    required: { postures: 24, goals: 4, daysPracticed: 365 },
    curriculum: [
      "Complete a long form daily for 100+ days",
      "Practice Da Lu and moving-step push hands",
      "Begin to express clear fa jin (Chen) or hidden jin (Yang/Wu)",
      "Study at least 3 of the Tai Chi Classics",
    ],
    why: "The form becomes a vehicle for expressing internal power without external tension.",
  },
  {
    id: "master",
    name: "Master — Spirit",
    color: "#d4af37",
    required: { postures: 30, goals: 6, daysPracticed: 1000 },
    curriculum: [
      "Daily long-form practice for 3+ years",
      "Free-form push hands (san shou)",
      "Teach others",
      "The form moves you, not the other way around",
    ],
    why: "Tai Chi is no longer something you do. The principles live in how you stand, walk, and meet the world.",
  },
];

// ───────────────────────────────────────────────────────────────────
// 100-DAY FORM CHALLENGE
// ───────────────────────────────────────────────────────────────────

export type ChallengeDay = {
  day: number;
  focus: string;
  practice: string;
};

export const hundredDayChallenge: ChallengeDay[] = Array.from({ length: 100 }, (_, idx) => {
  const day = idx + 1;
  const block = Math.floor(idx / 10);
  const blocks = [
    { focus: "Wu Ji & opening", practice: "Stand 5 min in Wu Ji, then practice the form's first 4 postures only." },
    { focus: "Foot rooting", practice: "Practice the form barefoot with attention to the bubbling well point." },
    { focus: "Empty/full distinction", practice: "Notice which leg is full and which is empty in every posture." },
    { focus: "Waist initiation", practice: "Do every transition starting from the dantian, not the limbs." },
    { focus: "Shoulders & elbows", practice: "Sink the shoulders, drop the elbows. Pause and reset if either lifts." },
    { focus: "Breath alignment", practice: "Match one full breath cycle to each major posture." },
    { focus: "Continuous flow", practice: "No gaps between postures — the form is one long movement." },
    { focus: "Zhan Zhuang depth", practice: "Add 10 min of standing meditation before the form." },
    { focus: "Application study", practice: "Spend 5 min after the form imagining the martial intent of each posture." },
    { focus: "Integration", practice: "Two complete rounds of the form, slow then slower." },
  ];
  const b = blocks[block] ?? blocks[blocks.length - 1];
  return { day, focus: b.focus, practice: b.practice };
});

// ───────────────────────────────────────────────────────────────────
// COMMUNITY & TEACHERS
// ───────────────────────────────────────────────────────────────────

export type Teacher = {
  name: string;
  era: string;
  style: FamilyStyle;
  contribution: string;
};

export const teachers: Teacher[] = [
  {
    name: "Chen Wangting",
    era: "1600–1680",
    style: "Chen",
    contribution: "Founder of Chen-style Tai Chi. Synthesized military techniques and Taoist breathing in Chen Village.",
  },
  {
    name: "Yang Luchan",
    era: "1799–1872",
    style: "Yang",
    contribution: "Carried Tai Chi out of Chen Village to Beijing. Founded Yang style. Known as 'Yang the Invincible'.",
  },
  {
    name: "Yang Chengfu",
    era: "1883–1936",
    style: "Yang",
    contribution: "Codified the modern Yang form and authored the 10 Essentials. Most influential 20th-century master.",
  },
  {
    name: "Wu Yuxiang",
    era: "1812–1880",
    style: "Wu-Hao",
    contribution: "Author of foundational Tai Chi Classics. Founded the Wu-Hao style.",
  },
  {
    name: "Wu Jianquan",
    era: "1870–1942",
    style: "Wu",
    contribution: "Founded the Wu (Jianquan) style — small frame, sophisticated push-hands curriculum.",
  },
  {
    name: "Sun Lutang",
    era: "1860–1933",
    style: "Sun",
    contribution: "Synthesized Tai Chi, Bagua, and Xingyi into the Sun style. First major author on internal arts theory in modern Chinese.",
  },
  {
    name: "Chen Fake",
    era: "1887–1957",
    style: "Chen",
    contribution: "Brought Chen style from Chen Village to Beijing. Famous for spectacular fa jin demonstrations.",
  },
  {
    name: "Cheng Man-ch'ing",
    era: "1902–1975",
    style: "Yang",
    contribution: "Developed the Yang 37 short form. First major teacher of Tai Chi in the United States.",
  },
];

export type FAQ = { q: string; a: string };

export const faq: FAQ[] = [
  {
    q: "How long does it take to learn the 24-form?",
    a: "Most students learn the choreography in 8–12 weeks of weekly classes. Refinement is ongoing — even after years, you'll still be improving the same 24 postures.",
  },
  {
    q: "Do I need a teacher, or can I learn from videos?",
    a: "Videos are excellent for memorization, but a qualified teacher catches alignment errors that compound silently for years. Aim for at least one in-person workshop or class series in your first year.",
  },
  {
    q: "Which style should I start with?",
    a: "Yang 24-form is the most widely available and gentlest entry. If your knees are sensitive, consider Sun style. If you want martial depth from the start, find a Chen teacher.",
  },
  {
    q: "Is Tai Chi the same as Qigong?",
    a: "Closely related but distinct. Qigong is the broader category of breath-and-energy work; Tai Chi is one specific martial-art tradition within it. Most Tai Chi schools teach Qigong as preliminary practice.",
  },
  {
    q: "How long do I need to practice each day to see benefits?",
    a: "Research protocols typically use 30–60 min, 2–3 times per week. Daily 10-minute practice maintains skill; daily 30-minute practice produces the health outcomes documented in the studies.",
  },
  {
    q: "Can Tai Chi really be a martial art if it moves so slowly?",
    a: "Yes. Slow practice is the laboratory; application is fast. The slow form trains structure, sensitivity, and timing that become available at speed. Push hands is where this transition is rehearsed.",
  },
];

// ───────────────────────────────────────────────────────────────────
// EVENTS
// ───────────────────────────────────────────────────────────────────

export const events = [
  { name: "World Tai Chi & Qigong Day", when: "Last Saturday in April, annually", where: "Worldwide", note: "Public outdoor practice in 80+ countries since 1999." },
  { name: "Chen Village International Tournament", when: "Annual", where: "Chenjiagou, Henan, China", note: "Pilgrimage destination for Chen-style practitioners." },
  { name: "World Tai Chi Championships", when: "Biennial", where: "Various", note: "Hosted by the International Wushu Federation; competition forms only." },
  { name: "Tai Chi Symposium (US)", when: "Periodic", where: "USA", note: "Gathering of senior masters from all major styles for cross-lineage learning." },
];

// ───────────────────────────────────────────────────────────────────
// HISTORY TIMELINE
// ───────────────────────────────────────────────────────────────────

export type TimelinePoint = { year: string; event: string; significance: string };

export const timeline: TimelinePoint[] = [
  { year: "~12th c.", event: "Legend: Zhang Sanfeng observes a snake and crane fighting", significance: "Mythic origin of the soft martial principle." },
  { year: "~1660", event: "Chen Wangting creates the Chen family style at Chen Village", significance: "Historical founding of Tai Chi as we know it." },
  { year: "1820s", event: "Yang Luchan studies at Chen Village", significance: "First non-Chen student; carries the art outward." },
  { year: "1850s", event: "Yang Luchan teaches in Beijing; gains imperial reputation", significance: "Tai Chi enters elite Chinese culture." },
  { year: "1860–1880", event: "Wu Yuxiang authors the foundational Classics", significance: "Theoretical canon stabilized." },
  { year: "1900s", event: "Yang Chengfu standardizes the Yang long form", significance: "Modern Yang style codified for mass teaching." },
  { year: "1956", event: "PRC Sports Commission releases the 24-posture form", significance: "Standardized, universally taught modern form." },
  { year: "1990s", event: "Tai Chi spreads through Western health systems", significance: "First major peer-reviewed health studies." },
  { year: "2010s", event: "NEJM publishes RCTs on Tai Chi for fibromyalgia and Parkinson's", significance: "Mainstream medical legitimacy." },
  { year: "Today", event: "Estimated 250+ million practitioners worldwide", significance: "Most-practiced martial art on Earth." },
];

// ───────────────────────────────────────────────────────────────────
// HELPERS
// ───────────────────────────────────────────────────────────────────

export function getPosture(slug: string): Posture | undefined {
  return postures.find((p) => p.slug === slug);
}

export function getPostureName(slug: string): string {
  return getPosture(slug)?.english ?? slug;
}

export function getForm(slug: string): Form | undefined {
  return forms.find((f) => f.slug === slug);
}

export function getGoal(id: string): GoalEntry | undefined {
  return goals.find((g) => g.id === id);
}

// ───────────────────────────────────────────────────────────────────
// SEARCH
// ───────────────────────────────────────────────────────────────────

export type SearchHit = {
  kind: string;
  title: string;
  subtitle: string;
  href: string;
  hrefParams?: Record<string, string>;
};

export function searchAll(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const hits: SearchHit[] = [];

  for (const p of postures) {
    if (
      p.english.toLowerCase().includes(q) ||
      p.pinyin.toLowerCase().includes(q) ||
      p.chinese.includes(q) ||
      p.description.toLowerCase().includes(q)
    ) {
      hits.push({
        kind: "Posture",
        title: `${p.english} (${p.pinyin})`,
        subtitle: p.description,
        href: "/tai-chi/postures/$slug",
        hrefParams: { slug: p.slug },
      });
    }
  }

  for (const f of forms) {
    if (f.name.toLowerCase().includes(q) || f.history.toLowerCase().includes(q)) {
      hits.push({
        kind: "Form",
        title: f.name,
        subtitle: `${f.style} · ${f.postureCount} postures · ${f.durationMinutes} min`,
        href: "/tai-chi/forms/$slug",
        hrefParams: { slug: f.slug },
      });
    }
  }

  for (const g of goals) {
    if (g.label.toLowerCase().includes(q) || g.blurb.toLowerCase().includes(q)) {
      hits.push({
        kind: "Goal",
        title: g.label,
        subtitle: g.blurb,
        href: "/tai-chi/goals/$goalId",
        hrefParams: { goalId: g.id },
      });
    }
  }

  for (const e of thirteenPostures) {
    if (
      e.english.toLowerCase().includes(q) ||
      e.pinyin.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q)
    ) {
      hits.push({
        kind: "Energy",
        title: `${e.english} (${e.pinyin})`,
        subtitle: e.description,
        href: "/tai-chi/principles",
      });
    }
  }

  for (const c of classics) {
    if (c.title.toLowerCase().includes(q) || c.passage.toLowerCase().includes(q)) {
      hits.push({
        kind: "Classic",
        title: c.title,
        subtitle: c.passage.slice(0, 120),
        href: "/tai-chi/principles",
      });
    }
  }

  for (const s of studies) {
    if (s.title.toLowerCase().includes(q) || s.outcome.toLowerCase().includes(q)) {
      hits.push({
        kind: "Study",
        title: s.title,
        subtitle: `${s.authors} · ${s.year} · ${s.journal}`,
        href: "/tai-chi/science",
      });
    }
  }

  return hits.slice(0, 24);
}

// ───────────────────────────────────────────────────────────────────
// GLOSSARY — internal vocabulary every serious student needs
// ───────────────────────────────────────────────────────────────────

export type GlossaryTerm = {
  term: string;
  pinyin: string;
  chinese: string;
  category: "Energy" | "Body" | "Mind" | "Method" | "Concept";
  short: string;
  long: string;
  related?: string[];
};

export const glossary: GlossaryTerm[] = [
  { term: "Qi", pinyin: "Qì", chinese: "氣", category: "Concept", short: "Vital breath / bioenergetic field.",
    long: "The animating circulation that classical Chinese physiology places at the intersection of breath, blood, and intent. In Tai Chi, qi is cultivated through alignment, slow breath, and the dissolution of muscular holding. It is felt long before it is named.", related: ["jing","shen","dantian"] },
  { term: "Jin", pinyin: "Jìn", chinese: "勁", category: "Energy", short: "Trained force, distinct from raw muscular strength (li).",
    long: "Jin is power organized by structure, root, and intent. Where li is local and pushed, jin is whole-body and issued. The 8 energies (peng, lu, ji, an, cai, lie, zhou, kao) are all forms of jin.", related: ["peng","fa-jin","ting-jin"] },
  { term: "Li", pinyin: "Lì", chinese: "力", category: "Energy", short: "Raw, locally-generated muscular force.",
    long: "The crude opposite of jin. Beginners issue li from the shoulders; advanced practitioners replace it with jin sourced from the ground through a relaxed, connected body." },
  { term: "Peng", pinyin: "Péng", chinese: "掤", category: "Energy", short: "Outward, expansive, ward-off energy.",
    long: "The ground-state energy of Tai Chi — a buoyant, spherical pressure that fills the body in every posture. Without peng there is no Tai Chi; only choreography." },
  { term: "Song", pinyin: "Sōng", chinese: "鬆", category: "Body", short: "Active relaxation under structural integrity.",
    long: "Not collapse, not tension. Song is the controlled release of unnecessary muscular holding while maintaining peng. The single most discussed concept in Yang style. Cheng Man-ch'ing reportedly spent decades on song alone.", related: ["peng","ting-jin"] },
  { term: "Dantian", pinyin: "Dāntián", chinese: "丹田", category: "Body", short: "The 'cinnabar field' — body's energetic center, three fingers below the navel.",
    long: "Lower dantian is the volumetric center of gravity and primary reservoir of qi; middle dantian sits at the heart; upper at the third eye. All Tai Chi movement originates from and returns to the lower dantian." },
  { term: "Zhong Ding", pinyin: "Zhōng Dìng", chinese: "中定", category: "Body", short: "Central equilibrium — the 13th and most important posture.",
    long: "The vertical axis maintained through every transition. Zhong ding is the silent center around which the 8 energies and 5 steps revolve. Lose it and the form becomes empty." },
  { term: "Ting Jin", pinyin: "Tīng Jìn", chinese: "聽勁", category: "Method", short: "Listening energy — the skill of feeling a partner's intent through contact.",
    long: "The first push-hands skill. Ting jin develops sensitivity to direction, timing, weight, and intent before muscular reaction. Without it, neutralizing and issuing are impossible.", related: ["hua-jin","fa-jin"] },
  { term: "Hua Jin", pinyin: "Huà Jìn", chinese: "化勁", category: "Method", short: "Neutralizing energy — dissolving incoming force.",
    long: "Following ting jin, hua jin redirects an opponent's force around your structure rather than meeting it. The yin half of every push-hands exchange." },
  { term: "Fa Jin", pinyin: "Fā Jìn", chinese: "發勁", category: "Method", short: "Issuing energy — the explosive release of stored force.",
    long: "The yang half. After ting and hua, fa jin discharges in a brief, whole-body wave from the foot through the dantian to the contact point. Most visible in Chen style; quietly present in all styles." },
  { term: "Chan Si Jin", pinyin: "Chán Sī Jìn", chinese: "纏絲勁", category: "Method", short: "Silk-reeling energy — continuous spiraling.",
    long: "The signature of Chen style. The body moves as a series of interlocking spirals — feet, kua, waist, shoulders, elbows, wrists — like reeling silk from a cocoon: too fast and the thread breaks, too slow and it tangles." },
  { term: "Zhan Zhuang", pinyin: "Zhàn Zhuāng", chinese: "站樁", category: "Method", short: "Standing-post meditation; the foundational training.",
    long: "Holding select postures (Wu Ji, Holding the Ball, Three Circles) for minutes to hours to build root, structural alignment, and quiet attention. The source of every internal art." },
  { term: "Xu Ling Ding Jin", pinyin: "Xū Líng Dǐng Jìn", chinese: "虛靈頂勁", category: "Body", short: "Empty, lively crown energy — head suspended as if from above.",
    long: "First of Yang Chengfu's 10 Essentials. The crown is gently lifted, lengthening the spine without straining the neck. Spirit rises with the crown." },
  { term: "Kua", pinyin: "Kuà", chinese: "胯", category: "Body", short: "The inguinal hip-fold; the body's most important hinge.",
    long: "Not a single joint but the entire crease where pelvis meets thigh. Open, supple kua transmit force from leg to dantian and allow the waist to turn freely. Tight kua are the single most common Western body limitation." },
  { term: "Mingmen", pinyin: "Mìngmén", chinese: "命門", category: "Body", short: "'Gate of life' — the lumbar point opposite the navel.",
    long: "Acupoint Du-4. Slight outward fullness at mingmen flattens the lumbar curve, drops the tailbone, and connects upper and lower halves of the body." },
  { term: "Yi", pinyin: "Yì", chinese: "意", category: "Mind", short: "Intent — the directing aspect of mind.",
    long: "Where yi goes, qi follows. Tai Chi is sometimes called 'training the yi.' Mechanical movement without yi is gymnastics; yi without movement is meditation; their union is Tai Chi." },
  { term: "Shen", pinyin: "Shén", chinese: "神", category: "Mind", short: "Spirit — luminous awareness expressed through the eyes.",
    long: "The third of the Three Treasures (jing, qi, shen). Bright shen is visible in the gaze of an adept; absent shen makes the form sleepy regardless of technique." },
  { term: "Jing", pinyin: "Jīng", chinese: "精", category: "Concept", short: "Essence — the densest of the Three Treasures.",
    long: "Inherited at conception, replenished by sleep, food, and stillness, depleted by overwork and chronic stress. Tai Chi practice — particularly zhan zhuang — is held to conserve jing." },
  { term: "Hun Yuan", pinyin: "Hùn Yuán", chinese: "混元", category: "Concept", short: "Primordial unity — the undifferentiated whole.",
    long: "The state preceding the split into yin and yang. Practiced as Hun Yuan Qigong in Chen lineage; felt as a spherical, omnidirectional fullness." },
  { term: "Yi Lu / Er Lu", pinyin: "Yī Lù / Èr Lù", chinese: "一路 / 二路", category: "Concept", short: "First Road / Second Road — Chen style's two foundational forms.",
    long: "Yi Lu trains slow flow with hidden fa jin; Er Lu (Cannon Fist) trains explosive issuing. Together they cover the full yin-yang of Chen practice." },
  { term: "Bagua", pinyin: "Bāguà", chinese: "八卦", category: "Concept", short: "The eight trigrams — symbolic basis of the 8 energies.",
    long: "Each of the 8 jin (peng, lu, ji, an, cai, lie, zhou, kao) corresponds to a trigram and a direction. Tai Chi's 13 postures arose from this cosmological framework." },
  { term: "Wu Wei", pinyin: "Wú Wéi", chinese: "無為", category: "Concept", short: "Non-coercive action — moving without forcing.",
    long: "Daoist principle expressed kinetically in Tai Chi: yielding, non-resistance, allowing the right action to arise from a still center." },
];

export function getGlossaryTerm(t: string): GlossaryTerm | undefined {
  return glossary.find((g) => g.term.toLowerCase() === t.toLowerCase());
}

// ───────────────────────────────────────────────────────────────────
// SILK-REELING DRILLS (chan si gong)
// ───────────────────────────────────────────────────────────────────

export type SilkReelingDrill = {
  slug: string;
  name: string;
  pinyin: string;
  level: Level;
  side: "Single" | "Dual" | "Whole-body";
  plane: "Horizontal" | "Vertical" | "Spherical" | "Figure-8";
  description: string;
  breath: string;
  cues: string[];
  errors: string[];
  dosage: string;
};

export const silkReelingDrills: SilkReelingDrill[] = [
  { slug: "single-positive", name: "Single-arm positive circle (front-up)", pinyin: "Zhèng Chán Sī", level: "Beginner", side: "Single", plane: "Vertical",
    description: "The foundational silk-reeling drill. From a horse stance, one hand traces a vertical loop driven by the kua, waist, and shoulder spiral.",
    breath: "Inhale as the hand rises through the chest line; exhale as it descends past the navel.",
    cues: ["Foot screws into the floor", "Kua opens and closes with the loop", "Elbow leads, hand follows"],
    errors: ["Driving from the shoulder", "Stiff waist", "Hand circles independently of the body"],
    dosage: "20 reps each side daily for 30 days." },
  { slug: "single-negative", name: "Single-arm negative circle (front-down)", pinyin: "Fǎn Chán Sī", level: "Beginner", side: "Single", plane: "Vertical",
    description: "Reverse of the positive circle. Hand descends across the centerline and rises outward.",
    breath: "Inhale as the hand opens outward; exhale as it folds back.", cues: ["Spiral originates in the foot","Wrist stays continuous, never breaks"],
    errors: ["Loss of peng at the bottom of the circle"], dosage: "20 reps each side daily." },
  { slug: "dual-mirror", name: "Dual-arm mirror circles", pinyin: "Shuāng Shǒu Chán Sī", level: "Intermediate", side: "Dual", plane: "Vertical",
    description: "Both hands trace mirrored vertical loops. Trains coordination between left and right halves through the dantian.",
    breath: "Belly-driven; each loop = one full breath.", cues: ["Hands stay equidistant from the centerline","Dantian rotates rather than the chest"],
    errors: ["Out-of-phase hands","Chest leading instead of dantian"], dosage: "40 reps daily." },
  { slug: "horizontal-dantian", name: "Horizontal dantian circle", pinyin: "Píng Yuán", level: "Beginner", side: "Whole-body", plane: "Horizontal",
    description: "Hands held lightly at dantian level; the entire torso rotates around a vertical axis driven by the kua.",
    breath: "Continuous, slow nasal breath unrelated to the loop's tempo.",
    cues: ["Crown lifted, sacrum heavy","Knees do not wobble"], errors: ["Knee sway","Hip lateral shift"], dosage: "5 minutes daily." },
  { slug: "figure-eight", name: "Lying figure-eight", pinyin: "Lóng Bā Zì", level: "Intermediate", side: "Single", plane: "Figure-8",
    description: "Hand traces a horizontal lemniscate at chest height, driven by alternating kua opening.",
    breath: "Inhale through one half, exhale through the other.", cues: ["Smooth crossover at center","Equal pressure on both feet"],
    errors: ["Asymmetric loop","Tilting torso"], dosage: "3 minutes each side." },
  { slug: "double-vertical-fa", name: "Double vertical with hidden fa jin", pinyin: "Yǐn Fā Chán Sī", level: "Advanced", side: "Dual", plane: "Vertical",
    description: "Adds a brief, almost invisible release of jin at the closing of each circle. Trains the transition from accumulation to issuing.",
    breath: "Inhale to gather, sharp short exhale at the release.", cues: ["Release lasts <0.3 s","Body returns instantly to peng"],
    errors: ["Visible jerk","Loss of song after the release"], dosage: "10 reps each side, every other day." },
  { slug: "spherical-bagua", name: "Spherical bagua reeling", pinyin: "Hùn Yuán Chán Sī", level: "Advanced", side: "Whole-body", plane: "Spherical",
    description: "The body moves as a sphere — hands, kua, and head simultaneously trace overlapping circles in different planes.",
    breath: "Free natural breath.", cues: ["Awareness of front, back, sides simultaneously"],
    errors: ["Mind fragments instead of unifies"], dosage: "10 minutes." },
  { slug: "stepping-spiral", name: "Stepping silk-reeling", pinyin: "Bù Fǎ Chán Sī", level: "Intermediate", side: "Whole-body", plane: "Vertical",
    description: "Adds cat-stepping in a circle to the vertical loops. The first integration of silk-reeling with locomotion.",
    breath: "One step per breath.", cues: ["Arrival of the foot precedes the arrival of the hand"],
    errors: ["Foot lands flat instead of rolling"], dosage: "3 circuits each direction." },
  { slug: "wall-reeling", name: "Wall reeling", pinyin: "Bì Chán", level: "Intermediate", side: "Single", plane: "Vertical",
    description: "Stand a forearm's length from a wall; trace circles with the back of the wrist gliding along it. Reveals shoulder tension.",
    breath: "Slow nasal.", cues: ["Wrist contact never breaks"], errors: ["Wrist lifts off when shoulder hikes"], dosage: "20 reps each arm." },
  { slug: "fa-jin-release", name: "Fa jin spiral release", pinyin: "Fā Jìn Chán", level: "Advanced", side: "Whole-body", plane: "Spherical",
    description: "Wind the body into maximum coiled potential, then release through one limb. Chen style's signature drill.",
    breath: "Hold at full coil; release on a sharp exhale.",
    cues: ["Discharge from the foot, not the arm","Body returns instantly to soft fullness"],
    errors: ["Pre-tensing the arm","No return to song after release"], dosage: "5 reps each side, no more." },
  { slug: "wrist-figure", name: "Wrist isolation figure-8", pinyin: "Wàn Zì Bā", level: "Beginner", side: "Single", plane: "Figure-8",
    description: "Forearm still; wrist alone traces a figure-8. Wakes up the wrist spirals that distinguish Tai Chi push from a karate punch.",
    breath: "Free.", cues: ["Forearm motionless","Fingers stay alive"], errors: ["Forearm sway"], dosage: "1 minute each direction." },
  { slug: "seated-spinal", name: "Seated spinal reeling", pinyin: "Zuò Chán Jǐ Zhù", level: "Beginner", side: "Whole-body", plane: "Spherical",
    description: "Cross-legged or chair-seated. Spine traces small circles initiated from the sacrum. Useful for office workers and rehab.",
    breath: "One breath per circle.", cues: ["Sacrum is the pivot, not the chest"], errors: ["Head leading"], dosage: "3 minutes." },
];

// ───────────────────────────────────────────────────────────────────
// ZHAN ZHUANG — standing post meditation
// ───────────────────────────────────────────────────────────────────

export type ZhanZhuangPosture = {
  slug: string;
  name: string;
  pinyin: string;
  intent: string;
  alignment: string[];
  collapses: string[]; // common errors
  startingDose: string;
  matureDose: string;
  effects: string[];
};

export const zhanZhuang: ZhanZhuangPosture[] = [
  { slug: "wuji-stand", name: "Wu Ji Standing", pinyin: "Wú Jí Zhàn", intent: "Settle into the void preceding movement.",
    alignment: ["Feet shoulder-width parallel","Knees soft","Arms hanging at sides","Crown gently suspended"],
    collapses: ["Locked knees","Forward chest","Tension in the jaw"],
    startingDose: "3–5 minutes daily", matureDose: "20–40 minutes",
    effects: ["Baseline alignment","Quiets nervous system","Foundation for every other practice"] },
  { slug: "holding-the-ball", name: "Holding the Ball (Embrace the Tree)", pinyin: "Bào Qiú / Bào Shù", intent: "Embrace a translucent sphere at chest height.",
    alignment: ["Arms a relaxed circle, fingertips inches apart","Elbows hang heavier than shoulders","Palms face the heart","Tongue lightly to upper palate"],
    collapses: ["Shoulders rising","Elbows narrowing","Spine collapsing into chair-back curve"],
    startingDose: "5 minutes", matureDose: "30–60 minutes",
    effects: ["Builds peng across torso and arms","First experience of qi as sustained warmth","Trains shoulder song"] },
  { slug: "three-circles", name: "Three Circles Standing", pinyin: "Sān Yuán Shì", intent: "Embody three concentric spheres — feet, arms, and an outer field.",
    alignment: ["Stance shoulder-width","Arms wider than holding-the-ball","Awareness extends one body-radius beyond skin"],
    collapses: ["Arms drop with fatigue","Awareness collapses inward to thinking"],
    startingDose: "5 minutes", matureDose: "45+ minutes",
    effects: ["Develops peripheral awareness","Connects outer space to inner intent"] },
  { slug: "lifting-water", name: "Lifting Water", pinyin: "Tí Shuǐ", intent: "Hands at thigh height, palms slightly back as if cupping cool water.",
    alignment: ["Arms relaxed downward","Slight bend in elbows","Crown lifts as hands feel heavy"],
    collapses: ["Locking elbows","Squeezing scapulae"], startingDose: "3 minutes", matureDose: "20 minutes",
    effects: ["Yin counterpart to embrace-the-tree","Useful for those with shoulder injuries"] },
  { slug: "pressing-down", name: "Pressing Down (An)", pinyin: "Àn Zhǎng", intent: "Palms facing earth at hip height, gently pressing a translucent surface.",
    alignment: ["Wrists soft","Fingers spread but relaxed","Mingmen full"],
    collapses: ["Pressing with arm muscle","Forward lean"], startingDose: "3 minutes", matureDose: "15 minutes",
    effects: ["Sinks energy","Calms agitated mind"] },
  { slug: "supporting-heaven", name: "Supporting Heaven", pinyin: "Tuō Tiān", intent: "Palms turned upward at head height, supporting a translucent dome.",
    alignment: ["Arms light, almost floating","Shoulders down despite arms up","Upward intent through fingertips"],
    collapses: ["Shoulder-shrug to keep arms up","Lumbar overarch"],
    startingDose: "1 minute", matureDose: "8 minutes",
    effects: ["Opens upper back fascia","Lifts mood and shen"] },
  { slug: "universal-post", name: "Universal Post (Yiquan)", pinyin: "Hún Yuán Zhuāng", intent: "From Wang Xiangzhai's Yiquan tradition — a denser, more intent-driven Wu Ji.",
    alignment: ["Six-direction intent: forward, back, left, right, up, down simultaneously"],
    collapses: ["Mind drifts to single direction","Body braces"],
    startingDose: "5 minutes", matureDose: "60+ minutes",
    effects: ["Develops omnidirectional peng","Foundation of Yiquan combat method"] },
  { slug: "low-horse", name: "Low Horse Stance", pinyin: "Mǎ Bù", intent: "Build legs, root, and tolerance for discomfort.",
    alignment: ["Thighs near parallel to floor","Spine vertical","Knees over second toe"],
    collapses: ["Knees collapse inward","Lumbar collapse","Heels lift"],
    startingDose: "30 seconds", matureDose: "5–10 minutes",
    effects: ["Strongest leg-conditioning posture","Tests every alignment principle simultaneously"] },
];

// ───────────────────────────────────────────────────────────────────
// PUSH-HANDS DRILLS (tui shou) — partner curriculum
// ───────────────────────────────────────────────────────────────────

export type PushHandsDrill = {
  slug: string;
  name: string;
  pinyin: string;
  tier: number; // 1-5
  contact: "Single-hand" | "Double-hand" | "Free";
  step: "Fixed" | "Restricted" | "Moving" | "Free";
  goal: string;
  protocol: string;
  errors: string[];
  jin: string[];
};

export const pushHandsDrills: PushHandsDrill[] = [
  { slug: "single-fixed-mirror", name: "Single-hand fixed mirror", pinyin: "Dān Tuī Shǒu", tier: 1, contact: "Single-hand", step: "Fixed",
    goal: "Develop ting jin (listening) and continuity of contact.",
    protocol: "Both partners in a bow stance, one hand contacting the back of the partner's wrist. One pushes slowly, the other yields and returns. Switch.",
    errors: ["Breaking contact","Tensing the shoulder","Locking the elbow"], jin: ["peng","ting jin"] },
  { slug: "double-fixed-four", name: "Double-hand four directions (peng-lu-ji-an)", pinyin: "Sì Zhèng Tuī Shǒu", tier: 2, contact: "Double-hand", step: "Fixed",
    goal: "Cycle the four cardinal energies in a continuous loop.",
    protocol: "Two hands contact, partners cycle ward-off → roll-back → press → push → repeat. 5 minutes per side.",
    errors: ["Skipping an energy","Using muscular force at the corners"], jin: ["peng","lu","ji","an"] },
  { slug: "da-lu", name: "Big Roll-back (Da Lu)", pinyin: "Dà Lǚ", tier: 3, contact: "Double-hand", step: "Restricted",
    goal: "Add the four corner energies (cai, lie, zhou, kao) and stepping.",
    protocol: "Partners step diagonally as they cycle the eight energies. The first formal partner form.",
    errors: ["Steps shallow","Loss of body unity at the corners"], jin: ["cai","lie","zhou","kao"] },
  { slug: "moving-step", name: "Moving-step push hands", pinyin: "Huó Bù Tuī Shǒu", tier: 4, contact: "Double-hand", step: "Moving",
    goal: "Maintain root and ting jin while freely advancing and retreating.",
    protocol: "Partners walk forward and back along a line, maintaining double contact. Goal: uproot the partner without using li.",
    errors: ["Chasing the partner","Losing zhong ding while stepping"], jin: ["all 8"] },
  { slug: "san-shou", name: "San Shou (free hands)", pinyin: "Sàn Shǒu", tier: 5, contact: "Free", step: "Free",
    goal: "Apply Tai Chi principles to free, non-cooperative exchange.",
    protocol: "Light, controlled exchange where any energy can be issued at any time. Begin slowly; speed is the last variable.",
    errors: ["Reverting to li under pressure","Losing principle the moment intensity rises"], jin: ["fa jin","hua jin"] },
  { slug: "rooting-test", name: "Rooting test (single push)", pinyin: "Gēn Lì Cè Shì", tier: 1, contact: "Single-hand", step: "Fixed",
    goal: "Diagnose where root is leaking.",
    protocol: "Partner pushes slowly straight at sternum; receiver redirects through the foot without stepping.",
    errors: ["Receiver leans","Receiver tenses the chest"], jin: ["peng"] },
  { slug: "neutralization-circle", name: "Neutralization circle", pinyin: "Huà Jìn Quān", tier: 2, contact: "Double-hand", step: "Fixed",
    goal: "Train hua jin — dissolving incoming force.",
    protocol: "One partner presses continuously inward; the other turns the dantian and dissolves the line of force into a spiral.",
    errors: ["Stepping back instead of turning","Throwing the line away with the arm"], jin: ["lu","hua jin"] },
  { slug: "issuing-from-contact", name: "Issuing from contact", pinyin: "Cóng Diǎn Fā", tier: 4, contact: "Double-hand", step: "Fixed",
    goal: "Develop fa jin from a static touch with no preparation.",
    protocol: "From any position of contact, issue with whole-body wave on cue. Partner falls or absorbs into a roll.",
    errors: ["Pre-tensing","Issuing from the shoulder"], jin: ["fa jin","ji"] },
  { slug: "blindfold-listening", name: "Blindfold listening", pinyin: "Méng Yǎn Tīng", tier: 3, contact: "Double-hand", step: "Fixed",
    goal: "Sharpen ting jin by removing visual cues.",
    protocol: "Both partners blindfolded; standard four-direction push hands.",
    errors: ["Visual habits replaced by guessing"], jin: ["ting jin"] },
  { slug: "uprooting-game", name: "Uprooting game", pinyin: "Bá Gēn", tier: 5, contact: "Free", step: "Moving",
    goal: "Training ground for issuing without injury.",
    protocol: "Mark a 1m circle. Each partner attempts to step the other out using only Tai Chi energies. No grabs, no strikes.",
    errors: ["Wrestling instead of issuing"], jin: ["all 8","fa jin"] },
];

// ───────────────────────────────────────────────────────────────────
// ANATOMY & BIOMECHANICS
// ───────────────────────────────────────────────────────────────────

export type AnatomyTopic = {
  id: string;
  region: string;
  why: string;
  detail: string;
  cues: string[];
  research?: string;
};

export const anatomyTopics: AnatomyTopic[] = [
  { id: "kua", region: "Kua (inguinal hip-fold)",
    why: "The single most important hinge in internal arts.",
    detail: "Anatomically the kua spans the inguinal ligament, hip flexors, deep external rotators, and the entire pelvic-femoral fold. Open kua transmit force from the ground through the dantian into the spine; closed kua leak power and stress the knees.",
    cues: ["Sit-and-fold (squat with vertical spine)","Inguinal ligament should crease cleanly","Knees track over second toe at all times"],
    research: "Wayne PM (Harvard Osher Center) demonstrates Tai Chi's improved hip mobility correlates with falls reduction in elderly cohorts." },
  { id: "spine-spirals", region: "Spinal spirals",
    why: "Tai Chi power is rotational, not linear — spirals carry force.",
    detail: "Cervical, thoracic, and lumbar segments each rotate at different rates. Healthy spirals require thoracic mobility (often the most-locked segment in modern bodies) and a stable lumbar that does not over-rotate.",
    cues: ["Initiate rotation from the dantian","Eyes lead, then chest, then hips, then feet","Neck stays integrated, not whipping"] },
  { id: "fascia-peng", region: "Fascia & peng structure",
    why: "Peng is fascial buoyancy, not muscular contraction.",
    detail: "Recent fascial research (Schleip, Stecco) describes the body's connective tissue as a continuous, hydrated tensegrity network. Slow, integrated movement under sustained mild load — exactly Tai Chi's signature — appears to remodel fascial glide and elasticity.",
    cues: ["Maintain even, low-grade stretch through entire kinetic chain","Avoid local muscular bracing"],
    research: "Schleip 2012, Stecco 2015 fascial research supports Tai Chi's effects on whole-body load distribution." },
  { id: "foot-tripod", region: "Foot tripod & rooting",
    why: "Without a connected foot, there is no jin.",
    detail: "Three weight-bearing points: ball of big toe, ball of little toe, center of heel. A collapsed arch or tipped foot drains force into shear. Tai Chi cultivates 'spiraling roots' from each tripod point through the leg into the kua.",
    cues: ["Spread the toes without curling","Feel even pressure across all three points","Big toe stays connected — never lifts"] },
  { id: "knee-tracking", region: "Knee mechanics",
    why: "Improperly loaded knees are the leading injury in poor Tai Chi.",
    detail: "The knee is a hinge with limited rotation tolerance. Tai Chi's torque must originate above (kua) and below (foot) — never in the knee itself. Knee-over-toe alignment, never collapsing inward, is non-negotiable.",
    cues: ["Knee always tracks over the second toe","Never twist the foot under load","If a turn requires knee rotation, step instead"],
    research: "Wang C et al. (2009, Arthritis Care & Research) RCT of Tai Chi for knee OA showed pain reduction and function gain comparable to conventional PT." },
  { id: "vagal-tone", region: "Vagus nerve & autonomic regulation",
    why: "The slow breath + slow movement signature is a vagal tonic.",
    detail: "Long exhales activate the dorsal vagal complex; coordinated movement with breath at ~6 breaths/minute approaches resonance frequency, peaking baroreflex gain and HRV. Tai Chi's tempo is biologically optimized.",
    cues: ["Breathe through the nose","Exhale slightly longer than inhale","Let the breath find the movement, not vice versa"],
    research: "Lu & Kuo (2003, J Am Geriatr Soc) showed measurable HRV increases after 8 weeks of Tai Chi." },
  { id: "vestibular", region: "Vestibular & proprioceptive system",
    why: "Tai Chi trains the balance system continuously.",
    detail: "Slow weight transfers, single-leg postures, and head turns under sustained attention re-train the otolith and proprioceptive feedback loops that decline with age. This is the mechanism underlying Tai Chi's class-leading falls-prevention evidence.",
    cues: ["Move slowly enough that any wobble is felt","Eyes should move with head, not lead it"],
    research: "Li F et al. (2005, J Gerontol) — Tai Chi reduces falls 55% in adults >70." },
  { id: "eccentric-quad", region: "Eccentric quadriceps loading",
    why: "Slow descending movement loads the quads eccentrically — the hardest, most protective contraction.",
    detail: "Every Tai Chi 'sit-down' weight transfer is an eccentric quad contraction lasting 3–8 seconds. This builds tendon resilience and strengthens the very mechanism that prevents falls and protects the knee.",
    cues: ["Lower the body slowly through the shifting leg","Avoid 'falling into' the stance"] },
];

// ───────────────────────────────────────────────────────────────────
// DAOIST & MEDICAL THEORY
// ───────────────────────────────────────────────────────────────────

export type TheoryNode = {
  id: string;
  name: string;
  short: string;
  long: string;
  appliesTo: string[]; // posture or principle slugs
};

export const theoryYinYang: TheoryNode = {
  id: "yin-yang", name: "Yin / Yang",
  short: "The two interpenetrating, mutually-arising aspects of every phenomenon.",
  long: "Tai Chi (太極, 'Supreme Ultimate') is named after the moment yin and yang differentiate from primordial unity. In practice: insubstantial/substantial, opening/closing, rising/sinking, gathering/issuing. Every posture contains both — the substantial leg roots while the insubstantial leg readies the next move; ward-off contains roll-back; issuing rests on neutralizing.",
  appliesTo: ["wu-ji","grasp-sparrows-tail","cloud-hands"],
};

export type FiveElement = { id: string; element: string; organ: string; emotion: string; movement: string; cultivates: string };

export const fiveElements: FiveElement[] = [
  { id: "wood", element: "Wood (Mù 木)", organ: "Liver / Gallbladder", emotion: "Anger ↔ Kindness", movement: "Expansive, rising", cultivates: "Vision, planning, smooth qi flow" },
  { id: "fire", element: "Fire (Huǒ 火)", organ: "Heart / Small Intestine", emotion: "Mania ↔ Joy", movement: "Radiant outward", cultivates: "Shen, circulation, expressive jin" },
  { id: "earth", element: "Earth (Tǔ 土)", organ: "Spleen / Stomach", emotion: "Worry ↔ Equanimity", movement: "Centering, stable", cultivates: "Rooting, dantian, digestion" },
  { id: "metal", element: "Metal (Jīn 金)", organ: "Lung / Large Intestine", emotion: "Grief ↔ Courage", movement: "Contracting, sharp", cultivates: "Breath, structure, clarity" },
  { id: "water", element: "Water (Shuǐ 水)", organ: "Kidney / Bladder", emotion: "Fear ↔ Will", movement: "Sinking, fluid", cultivates: "Jing, deep vitality, yielding power" },
];

export type ThreeTreasure = { id: string; chinese: string; name: string; locus: string; cultivation: string; depletedBy: string };

export const threeTreasures: ThreeTreasure[] = [
  { id: "jing", chinese: "精", name: "Jing — Essence", locus: "Kidneys, lower dantian", cultivation: "Sleep, stillness, conservative living, zhan zhuang", depletedBy: "Overwork, sexual excess, chronic stress, late nights" },
  { id: "qi", chinese: "氣", name: "Qi — Vital breath", locus: "Middle dantian, breath", cultivation: "Slow movement, conscious breath, qigong, clean food", depletedBy: "Erratic breathing, processed food, anxiety" },
  { id: "shen", chinese: "神", name: "Shen — Spirit", locus: "Upper dantian, eyes", cultivation: "Meditation, single-pointed attention, joy, beauty", depletedBy: "Mental scatter, overstimulation, dishonesty" },
];

export type DantianMap = { id: string; name: string; location: string; function: string };

export const dantianMap: DantianMap[] = [
  { id: "lower", name: "Lower Dantian (Xià Dāntián 下丹田)", location: "Three fingers below the navel, deep within the pelvis", function: "Reservoir of jing, root of physical power, body's center of gravity. Where every Tai Chi movement originates." },
  { id: "middle", name: "Middle Dantian (Zhōng Dāntián 中丹田)", location: "Center of the chest, behind the sternum at heart level", function: "Seat of qi and emotion. Cultivated through breath and the heart-felt aspect of movement." },
  { id: "upper", name: "Upper Dantian (Shàng Dāntián 上丹田)", location: "Behind the brow, between the temples", function: "Home of shen and the directing yi. Ripe shen here lights the eyes of an adept." },
];

// ───────────────────────────────────────────────────────────────────
// DAILY PRACTICE PROTOCOLS
// ───────────────────────────────────────────────────────────────────

export type Protocol = {
  id: string;
  name: string;
  duration: string;
  whenToDo: string;
  goal: string;
  blocks: { time: string; do: string }[];
};

export const dailyProtocols: Protocol[] = [
  { id: "morning-20", name: "Morning Awakening (20 min)", duration: "20 minutes", whenToDo: "First thing on waking, before screens",
    goal: "Wake the body, establish presence, set tone for the day.",
    blocks: [
      { time: "0–3 min", do: "Wu Ji standing, settle the breath" },
      { time: "3–8 min", do: "Single-arm silk-reeling, both sides" },
      { time: "8–15 min", do: "Yang 24-form, slow tempo" },
      { time: "15–20 min", do: "Holding the Ball zhan zhuang" },
    ] },
  { id: "midday-7", name: "Midday Reset (7 min)", duration: "7 minutes", whenToDo: "Between tasks, after lunch, or before a difficult meeting",
    goal: "Discharge accumulated tension, restore central equilibrium.",
    blocks: [
      { time: "0–2 min", do: "Wu Ji standing, three slow nasal breaths" },
      { time: "2–5 min", do: "Cloud Hands, 12 reps each direction" },
      { time: "5–7 min", do: "Pressing-Down zhan zhuang" },
    ] },
  { id: "evening-30", name: "Evening Integration (30 min)", duration: "30 minutes", whenToDo: "Before dinner or 2+ hours before sleep",
    goal: "Process the day, integrate, lower sympathetic tone.",
    blocks: [
      { time: "0–5 min", do: "Wu Ji + 5 minutes Holding the Ball" },
      { time: "5–15 min", do: "Full silk-reeling set, single + dual" },
      { time: "15–25 min", do: "Yang 24-form, twice through" },
      { time: "25–30 min", do: "Lifting Water zhan zhuang into seated stillness" },
    ] },
  { id: "weekend-60", name: "Weekend Long Form (60 min)", duration: "60 minutes", whenToDo: "Saturday or Sunday morning, ideally outdoors",
    goal: "Deep practice, accumulate hours, work principles slowly.",
    blocks: [
      { time: "0–10 min", do: "Standing post — Three Circles" },
      { time: "10–25 min", do: "Full silk-reeling set including stepping" },
      { time: "25–50 min", do: "Yang 108 or Chen Laojia Yi Lu, very slow" },
      { time: "50–60 min", do: "Closing zhan zhuang and seated meditation" },
    ] },
  { id: "rehab-15", name: "Rehab / Gentle (15 min)", duration: "15 minutes", whenToDo: "Recovery from injury or illness, daily",
    goal: "Maintain alignment and circulation under low load.",
    blocks: [
      { time: "0–4 min", do: "Seated spinal reeling" },
      { time: "4–10 min", do: "Standing Wu Ji + slow weight shifts" },
      { time: "10–15 min", do: "Cloud Hands, 8 reps each direction at low intensity" },
    ] },
];

// ───────────────────────────────────────────────────────────────────
// ETHICS & LINEAGE TRADITION
// ───────────────────────────────────────────────────────────────────

export type EthicsTopic = { id: string; name: string; what: string; why: string };

export const ethics: EthicsTopic[] = [
  { id: "baishi", name: "Baishi (拜師) — Discipleship", what: "Formal ceremony binding student and master, traditionally with bowing, tea, and sometimes a written oath.",
    why: "Baishi distinguishes 'indoor disciples' (rù shì dìzǐ), who receive complete transmission, from general students, who study openly. Real lineage transmission still moves through this relationship in most serious schools." },
  { id: "four-respects", name: "The Four Respects", what: "Respect the teacher; respect the lineage; respect the practice; respect the partner.",
    why: "These structure every interaction in a traditional school. Their violation — particularly using push-hands to dominate rather than learn — is the surest sign that someone has missed Tai Chi entirely." },
  { id: "bowing", name: "The Bow (Bào Quán Lǐ 抱拳禮)", what: "Right fist into left palm at chest height, slight bow. Used to greet teachers, partners, and the practice space.",
    why: "Bows mark transitions: in/out of practice, beginning/end of partner work. They cue the nervous system that something deliberate is happening." },
  { id: "no-grading", name: "No Belts or Sashes", what: "Traditional Tai Chi has no formal ranking system; many modern schools have introduced sashes for marketing or pedagogy.",
    why: "Mastery in an internal art is not certifiable. The tier system in this encyclopedia is a personal map — not a credential." },
  { id: "non-violence", name: "Non-Violence in Push Hands", what: "Push hands is a learning game, not a fight. Force is calibrated to the partner's level; injury is failure.",
    why: "Issuing for ego in tui shou destroys both partners' learning. The classics are explicit: 'four ounces deflects a thousand pounds' — never 'a thousand pounds beats four ounces.'" },
  { id: "transmission", name: "Oral Transmission (Kǒu Chuán 口傳)", what: "Key teachings have always passed mouth-to-ear, not via books or video.",
    why: "Some corrections live in the touch of a hand on a student's lumbar — they cannot be written. This is why this encyclopedia points outward: a real teacher remains essential." },
];

// ───────────────────────────────────────────────────────────────────
// EXTRA RESEARCH STUDIES — appended
// ───────────────────────────────────────────────────────────────────

export const studiesExtra: Study[] = [
  { id: "wayne-2014-cognition", title: "Effect of Tai Chi on Cognitive Performance in Older Adults: Systematic Review and Meta-Analysis",
    authors: "Wayne PM, Walsh JN, Taylor-Piliae RE, et al.", year: 2014, journal: "J Am Geriatr Soc, 62(1):25-39",
    design: "Systematic review and meta-analysis (20 studies)", population: "Older adults with and without cognitive impairment",
    intervention: "Tai Chi vs. exercise/no intervention controls", outcome: "Significant improvements in executive function, language, and memory across populations.",
    category: "cognition" },
  { id: "lan-2002-cardiorespiratory", title: "Tai Chi Chuan in Medicine and Health Promotion",
    authors: "Lan C, Lai JS, Chen SY", year: 2002, journal: "Sports Medicine, 32(4):217-224",
    design: "Narrative review of physiological studies", population: "Healthy adults and clinical populations",
    intervention: "Yang-style Tai Chi, various dosages", outcome: "Cardiorespiratory function, muscular strength, balance, and flexibility all improved across cohorts.",
    category: "general" },
  { id: "li-2005-falls", title: "Tai Chi and Fall Reductions in Older Adults: a randomized controlled trial",
    authors: "Li F, Harmer P, Fisher KJ, et al.", year: 2005, journal: "J Gerontol A Biol Sci Med Sci, 60(2):187-194",
    design: "RCT", population: "256 community-dwelling adults aged 70+",
    intervention: "Tai Chi 3×/week for 6 months vs. stretching", outcome: "55% reduction in falls in Tai Chi group; significant balance and confidence gains.",
    category: "balance" },
  { id: "wang-2010-fibromyalgia-nejm", title: "A Randomized Trial of Tai Chi for Fibromyalgia",
    authors: "Wang C, Schmid CH, Rones R, et al.", year: 2010, journal: "New England Journal of Medicine, 363(8):743-754",
    design: "RCT", population: "66 patients with fibromyalgia",
    intervention: "Yang-style Tai Chi 60 min 2×/week × 12 weeks vs. wellness/stretching",
    outcome: "Tai Chi group showed clinically significant improvement in FIQ, sleep, depression, and quality of life — sustained at 24 weeks.",
    category: "fibromyalgia" },
  { id: "yeh-2011-heart-failure", title: "Tai Chi Exercise in Patients with Chronic Heart Failure",
    authors: "Yeh GY, McCarthy EP, Wayne PM, et al.", year: 2011, journal: "Arch Intern Med, 171(8):750-757",
    design: "RCT", population: "100 patients with systolic heart failure",
    intervention: "12-week Tai Chi vs. education", outcome: "Improved quality of life, mood, and exercise self-efficacy without adverse events.",
    category: "general" },
  { id: "irwin-2014-immune", title: "Tai Chi, Cellular Inflammation, and Transcriptome Dynamics",
    authors: "Irwin MR, Olmstead R, Carrillo C, et al.", year: 2014, journal: "Psychosomatic Medicine, 76(7):539-545",
    design: "RCT with biomarker analysis", population: "Older adults with insomnia",
    intervention: "Tai Chi vs. cognitive behavioral therapy for insomnia × 4 months",
    outcome: "Tai Chi reduced cellular markers of inflammation (CRP) and reversed inflammatory gene expression.",
    category: "immune" },
  { id: "wayne-2018-bone", title: "Tai Chi for Osteopenic Postmenopausal Women",
    authors: "Wayne PM, Kiel DP, Buring JE, et al.", year: 2018, journal: "BMC Complementary Medicine",
    design: "RCT", population: "86 postmenopausal women with osteopenia",
    intervention: "9 months Tai Chi vs. usual care", outcome: "Slowed bone mineral density loss at the spine; improved balance.",
    category: "general" },
  { id: "siu-2021-depression", title: "Tai Chi for Major Depressive Disorder: a randomized, sham-controlled trial",
    authors: "Yeung A, Chan JSM, Cheung JC, et al.", year: 2017, journal: "J Clin Psychiatry, 78(5):e522-e528",
    design: "Sham-controlled RCT", population: "67 Chinese-American adults with MDD",
    intervention: "12 weeks Tai Chi vs. education vs. waitlist", outcome: "Tai Chi group had significantly greater reduction in HAM-D scores; effect sustained at 24 weeks.",
    category: "anxiety-depression" },
  { id: "chan-2017-prediabetes", title: "Tai Chi for Glycemic Control in Adults with Type 2 Diabetes",
    authors: "Chan AWK, Yu DSF, Choi KC, et al.", year: 2017, journal: "Trials, 18:128",
    design: "RCT", population: "160 adults with T2DM",
    intervention: "Tai Chi 1 hour 3×/week × 12 weeks vs. usual care",
    outcome: "Significant reduction in HbA1c, BMI, and waist circumference; improved quality of life.",
    category: "general" },
  { id: "raman-2020-meta-bp", title: "Effect of Tai Chi on Blood Pressure: Systematic Review and Meta-Analysis",
    authors: "Yeh GY, Wood MJ, Lorell BH, et al.", year: 2008, journal: "Am J Med, 121(7):650-655",
    design: "Meta-analysis of RCTs", population: "Adults with hypertension",
    intervention: "Tai Chi vs. control across multiple RCTs",
    outcome: "Average reduction of 7 mmHg systolic / 4 mmHg diastolic — clinically meaningful and comparable to first-line interventions.",
    category: "blood-pressure" },
  { id: "tao-2017-mci", title: "Tai Chi Chuan and Baduanjin Mind-Body Training Changes Resting-State Low-Frequency Fluctuations in Older Adults with Mild Cognitive Impairment",
    authors: "Tao J, Liu J, Egorova N, et al.", year: 2017, journal: "Front Aging Neurosci, 9:25",
    design: "fMRI RCT", population: "62 older adults with MCI",
    intervention: "Tai Chi or Baduanjin × 12 weeks vs. control",
    outcome: "Functional connectivity changes in default mode network and bilateral hippocampi corresponded to memory improvement.",
    category: "cognition" },
  { id: "hempel-2014-systematic", title: "Evidence Map of Tai Chi",
    authors: "Hempel S, Taylor SL, Solloway MR, et al.", year: 2014, journal: "RAND Corporation / VA Evidence-based Synthesis Program",
    design: "Comprehensive evidence map (107 systematic reviews)", population: "All populations studied",
    intervention: "Tai Chi across all styles",
    outcome: "Clear benefit identified for hypertension, falls, balance, depression, and pain; emerging evidence for cognition, fibromyalgia, COPD.",
    category: "general" },
  { id: "lyu-2018-anxiety-meta", title: "Tai Chi for Anxiety Disorders: a systematic review and meta-analysis",
    authors: "Wang F, Lee EK, Wu T, et al.", year: 2014, journal: "Int J Behav Med, 21:605-617",
    design: "Meta-analysis (17 trials)", population: "Adults with anxiety symptoms or disorders",
    intervention: "Tai Chi or qigong vs. various controls",
    outcome: "Moderate effect size for anxiety reduction; superior to exercise controls in several trials.",
    category: "anxiety-depression" },
  { id: "lu-2003-hrv", title: "Tai Chi Chuan Exercise and Heart Rate Variability",
    authors: "Lu WA, Kuo CD", year: 2003, journal: "J Am Geriatr Soc, 51(5):721-722",
    design: "Cross-sectional comparison", population: "Long-term Tai Chi practitioners vs. matched controls",
    intervention: "Years of Tai Chi practice", outcome: "Tai Chi practitioners showed significantly higher vagally-mediated HRV indices.",
    category: "general" },
  { id: "li-2018-tai-chi-knee", title: "Comparative Effectiveness of Tai Chi vs Physical Therapy for Knee Osteoarthritis",
    authors: "Wang C, Schmid CH, Iversen MD, et al.", year: 2016, journal: "Annals of Internal Medicine, 165(2):77-86",
    design: "Single-blind RCT", population: "204 adults with symptomatic knee OA",
    intervention: "12 weeks Tai Chi 2×/week vs. standard PT",
    outcome: "Equivalent pain and function improvement; Tai Chi group showed greater improvement in depression and quality of life.",
    category: "knee-osteoarthritis" },
  { id: "wang-2020-copd", title: "Tai Chi for COPD",
    authors: "Wu W, Liu X, Wang L, Wang Z, Hu J, Yan J", year: 2014, journal: "Int J COPD, 9:1253-1263",
    design: "Meta-analysis", population: "Adults with COPD",
    intervention: "Tai Chi vs. control", outcome: "Improvement in 6-minute walk distance, dyspnea, and quality of life.",
    category: "general" },
  { id: "hartman-2000-arthritis", title: "Effects of T'ai Chi Training on Function and Quality of Life Indicators in Older Adults with Osteoarthritis",
    authors: "Hartman CA, Manos TM, Winter C, et al.", year: 2000, journal: "J Am Geriatr Soc, 48(12):1553-1559",
    design: "RCT", population: "33 older adults with OA",
    intervention: "12-week Tai Chi", outcome: "Improved arthritis self-efficacy, decreased pain perception, no joint exacerbation.",
    category: "knee-osteoarthritis" },
  { id: "wolf-1996-atlanta-falls", title: "Reducing Frailty and Falls in Older Persons (Atlanta FICSIT)",
    authors: "Wolf SL, Barnhart HX, Kutner NG, et al.", year: 1996, journal: "J Am Geriatr Soc, 44(5):489-497",
    design: "Landmark RCT", population: "200 older adults",
    intervention: "Tai Chi 2×/week × 15 weeks vs. balance training vs. education",
    outcome: "Tai Chi reduced risk of multiple falls by 47.5% — the trial that put Tai Chi on the falls-prevention map.",
    category: "balance" },
  { id: "song-2003-arthritis", title: "Effects of Tai Chi exercise on pain, balance, muscle strength, and physical functioning in older women with osteoarthritis",
    authors: "Song R, Lee EO, Lam P, Bae SC", year: 2003, journal: "J Rheumatol, 30(9):2039-2044",
    design: "RCT", population: "72 older Korean women with OA",
    intervention: "Sun-style Tai Chi 12 weeks", outcome: "Significant gains in muscle strength, balance, and arthritis symptoms.",
    category: "knee-osteoarthritis" },
  { id: "huston-2016-review", title: "Health Benefits of Tai Chi: What Is the Evidence?",
    authors: "Huston P, McFarlane B", year: 2016, journal: "Canadian Family Physician, 62(11):881-890",
    design: "Narrative review for clinicians", population: "Mixed clinical populations",
    intervention: "Tai Chi as therapeutic prescription", outcome: "Strong evidence for falls prevention, hypertension, and depression; moderate for fibromyalgia and Parkinson's.",
    category: "general" },
];

// merge into the main studies array (read-only consumers can use studies; comprehensive consumers use allStudies)
export const allStudies: Study[] = [...studies, ...studiesExtra];

// ───────────────────────────────────────────────────────────────────
// FILMS, PODCASTS, JOURNALS — for resources page
// ───────────────────────────────────────────────────────────────────

export const films = [
  { title: "Pushing Hands (推手)", year: 1992, director: "Ang Lee", note: "Lee's first feature. A retired Tai Chi master in New York — a quiet meditation on cultural displacement and the embodied wisdom of practice." },
  { title: "Tai Chi Master (太極張三豐)", year: 1993, director: "Yuen Woo-ping", note: "Jet Li as a young Zhang Sanfeng. Wuxia stylization, but the central message — soft overcomes hard — is genuine." },
  { title: "The Professor: Tai Chi's Journey West", year: 2017, director: "Barry Strugatz", note: "Documentary on Cheng Man-ch'ing, the master who brought Tai Chi to America in 1964." },
  { title: "Hidden Master", year: 2017, director: "Various", note: "Documentary portraits of Yang Jun, Chen Xiaowang, and other living lineage holders." },
  { title: "Crouching Tiger, Hidden Dragon (臥虎藏龍)", year: 2000, director: "Ang Lee", note: "Choreography by Yuen Woo-ping draws openly on Tai Chi principles — most visibly in the wuxia 'soft' fight scenes." },
];

export const podcasts = [
  { title: "Whole Body Revolution", host: "Scott Meredith / various", note: "Long-form interviews with Tai Chi and qigong teachers across lineages." },
  { title: "Qi Talk", host: "Dr. Karin Taylor Wu", note: "Conversations on internal arts, Chinese medicine, and somatic practice." },
  { title: "Tai Chi Notebook Podcast", host: "Graham Barlow", note: "Independent, lineage-curious interviews with senior teachers." },
  { title: "The Daoist Body", host: "Various", note: "Daoism and embodiment scholarship that intersects with internal arts practice." },
];

export const journals = [
  { name: "Journal of Asian Martial Arts", url: "https://www.viamediapublishing.com", note: "Peer-reviewed scholarship on East Asian martial traditions." },
  { name: "Tai Chi Magazine", url: "https://www.tai-chi.com", note: "Long-running practitioner magazine; archived issues are gold." },
  { name: "Frontiers in Aging Neuroscience — Tai Chi research topics", url: "https://www.frontiersin.org", note: "Open-access neuroscience studies on internal arts." },
];
