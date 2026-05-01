// Single source of truth for the Yoga encyclopedia.
// All content is statically authored — no backend, no async fetches.

export type Level = "Beginner" | "Intermediate" | "Advanced";
export type AsanaFamily =
  | "Standing"
  | "Seated"
  | "Supine"
  | "Prone"
  | "Inversion"
  | "Backbend"
  | "Forwardbend"
  | "Twist"
  | "Balance"
  | "Restorative";
export type YogaGoal =
  | "back-pain"
  | "anxiety"
  | "sleep"
  | "flexibility"
  | "strength"
  | "focus"
  | "hormonal";
export type Tradition =
  | "Hatha"
  | "Ashtanga"
  | "Iyengar"
  | "Vinyasa"
  | "Kundalini"
  | "Yin"
  | "Restorative"
  | "Bikram";

// ---------- ASANAS ----------
export type Asana = {
  slug: string;
  sanskrit: string;
  english: string;
  level: Level;
  family: AsanaFamily;
  traditions: Tradition[];
  goals: YogaGoal[];
  drishti: string; // gaze
  bandhas: string[]; // engaged energy locks
  primaryMuscles: string[];
  alignment: string[]; // alignment cues
  cues: string[]; // verbal teaching cues
  prep: string[]; // prep pose slugs
  counter: string[]; // counter pose slugs
  contraindications: string[];
  modifications: string[];
  benefits: string[];
  holdSeconds: number; // typical hold
  breathCount: number; // typical breath count
  description: string;
};

export const asanas: Asana[] = [
  {
    slug: "tadasana",
    sanskrit: "Tāḍāsana",
    english: "Mountain Pose",
    level: "Beginner",
    family: "Standing",
    traditions: ["Hatha", "Iyengar", "Vinyasa", "Ashtanga"],
    goals: ["focus", "strength"],
    drishti: "Nasagrai (tip of the nose) or horizon",
    bandhas: ["Mula bandha (light)", "Uddiyana bandha (light)"],
    primaryMuscles: ["Quadriceps", "Glutes", "Erector spinae", "Tibialis anterior"],
    alignment: [
      "Feet hip-width or together, weight evenly across four corners.",
      "Lift the kneecaps without locking the knees.",
      "Tailbone lengthens down; pubic bone gently lifts.",
      "Crown of head lifts toward the sky, ears over shoulders.",
    ],
    cues: [
      "Root down through the heels and the mounds of the big and pinky toes.",
      "Spin the inner thighs back; let the outer hips draw in.",
      "Soften the front ribs; broaden the collarbones.",
    ],
    prep: [],
    counter: [],
    contraindications: ["Severe vertigo (use a wall)", "Postural hypotension"],
    modifications: [
      "Stand with back to a wall to feel alignment.",
      "Practice with feet hip-width if balance is unstable.",
    ],
    benefits: [
      "Establishes baseline alignment for every other standing pose.",
      "Improves posture, body awareness, and grounding.",
    ],
    holdSeconds: 60,
    breathCount: 8,
    description:
      "The mother of all standing poses. Tadasana looks like simply standing, but it teaches you how to organize the body around the central axis — the template for every asana that follows.",
  },
  {
    slug: "adho-mukha-svanasana",
    sanskrit: "Adho Mukha Śvānāsana",
    english: "Downward-Facing Dog",
    level: "Beginner",
    family: "Inversion",
    traditions: ["Hatha", "Vinyasa", "Ashtanga", "Iyengar"],
    goals: ["flexibility", "strength", "focus"],
    drishti: "Nabhi chakra (navel)",
    bandhas: ["Uddiyana bandha", "Mula bandha"],
    primaryMuscles: ["Hamstrings", "Calves", "Latissimus dorsi", "Serratus anterior", "Deltoids"],
    alignment: [
      "Hands shoulder-width, fingers spread, index fingers parallel.",
      "Feet hip-width, heels reaching toward the floor (not necessarily touching).",
      "Sit bones lift up and back; spine long.",
      "Outer elbows spin in; outer shoulders broaden.",
    ],
    cues: [
      "Press the floor away as if pushing the earth down.",
      "Bend the knees generously to lengthen the spine first.",
      "Pedal the feet to wake up the calves.",
    ],
    prep: ["balasana", "marjaryasana-bitilasana"],
    counter: ["balasana", "uttanasana"],
    contraindications: ["Late-stage pregnancy", "Carpal tunnel syndrome", "High blood pressure (modify head position)"],
    modifications: [
      "Bend the knees deeply if hamstrings are tight.",
      "Place hands on a chair seat to reduce wrist load.",
      "Use a block under the forehead for restful variation.",
    ],
    benefits: [
      "Decompresses the spine while strengthening the upper body.",
      "Calms the nervous system through mild inversion.",
      "Stretches the entire posterior chain.",
    ],
    holdSeconds: 30,
    breathCount: 5,
    description:
      "The transitional pose at the heart of vinyasa. Down Dog is both rest and work — a full-body diagnostic for shoulder mobility, hamstring length, and spinal awareness.",
  },
  {
    slug: "virabhadrasana-i",
    sanskrit: "Vīrabhadrāsana I",
    english: "Warrior I",
    level: "Beginner",
    family: "Standing",
    traditions: ["Hatha", "Vinyasa", "Iyengar"],
    goals: ["strength", "focus"],
    drishti: "Angushtha madhye (thumbs)",
    bandhas: ["Mula bandha", "Uddiyana bandha"],
    primaryMuscles: ["Quadriceps", "Glutes", "Psoas (back leg)", "Trapezius"],
    alignment: [
      "Front knee tracks over the front ankle, never past the toes.",
      "Back foot at 45–60°, outer edge grounded.",
      "Hips squared toward the front of the mat.",
      "Arms reach overhead, biceps by the ears, palms facing in or together.",
    ],
    cues: [
      "Press into the outer edge of the back foot to engage the back leg.",
      "Lift the front of the back hip up and forward.",
      "Lengthen the tailbone down before reaching the arms up.",
    ],
    prep: ["adho-mukha-svanasana", "anjaneyasana"],
    counter: ["uttanasana", "balasana"],
    contraindications: ["Severe knee injury", "Recent hip replacement", "Acute shoulder injury"],
    modifications: [
      "Shorten the stance for tight hips.",
      "Hands at heart center if shoulders are restricted.",
      "Drop the back knee to a low lunge variation.",
    ],
    benefits: [
      "Builds leg strength and stamina.",
      "Opens the hip flexors of the back leg.",
      "Develops focus through sustained effort.",
    ],
    holdSeconds: 45,
    breathCount: 5,
    description:
      "The first warrior, named for Virabhadra — the fierce avatar created from a lock of Shiva's hair. The pose embodies strength rising up from the ground.",
  },
  {
    slug: "virabhadrasana-ii",
    sanskrit: "Vīrabhadrāsana II",
    english: "Warrior II",
    level: "Beginner",
    family: "Standing",
    traditions: ["Hatha", "Vinyasa", "Iyengar", "Ashtanga"],
    goals: ["strength", "focus"],
    drishti: "Hastagrai (front fingertips)",
    bandhas: ["Mula bandha"],
    primaryMuscles: ["Quadriceps", "Adductors", "Deltoids", "Gluteus medius"],
    alignment: [
      "Front knee bent to 90°, tracking over the second toe.",
      "Back foot parallel to the short edge of the mat.",
      "Hips and torso open to the long edge of the mat.",
      "Arms parallel to the floor, shoulders stacked over the hips.",
    ],
    cues: [
      "Drag the feet toward each other to engage the inner thighs.",
      "Crown of head lifts; shoulders relax down.",
      "Soft gaze past the front fingertips.",
    ],
    prep: ["adho-mukha-svanasana", "prasarita-padottanasana"],
    counter: ["uttanasana", "parsvottanasana"],
    contraindications: ["Acute knee or hip injury", "High blood pressure (shorten holds)"],
    modifications: [
      "Shorten the stance if the front knee collapses inward.",
      "Hands on hips if shoulders fatigue.",
    ],
    benefits: [
      "Strengthens legs, ankles, and shoulders.",
      "Opens the hips and chest.",
      "Builds heat and endurance.",
    ],
    holdSeconds: 60,
    breathCount: 5,
    description:
      "The lateral warrior. Where Warrior I rises, Warrior II expands. The gaze past the fingertips is the warrior's resolve — present, steady, undistracted.",
  },
  {
    slug: "trikonasana",
    sanskrit: "Trikoṇāsana",
    english: "Triangle Pose",
    level: "Beginner",
    family: "Standing",
    traditions: ["Hatha", "Iyengar", "Vinyasa", "Ashtanga"],
    goals: ["flexibility", "strength"],
    drishti: "Hastagrai (top hand)",
    bandhas: ["Mula bandha"],
    primaryMuscles: ["Hamstrings", "Adductors", "Obliques", "Quadratus lumborum"],
    alignment: [
      "Wide stance, front toes forward, back foot at 30°.",
      "Reach the front arm forward, then hinge at the front hip.",
      "Bottom hand to shin, block, or floor outside the front foot.",
      "Top arm extends straight up, both shoulders stacked.",
    ],
    cues: [
      "Lengthen both sides of the waist evenly — do not collapse into the bottom side.",
      "Rotate the chest open to the sky, not to the floor.",
      "Press firmly into the outer edge of the back foot.",
    ],
    prep: ["virabhadrasana-ii", "prasarita-padottanasana"],
    counter: ["uttanasana", "balasana"],
    contraindications: ["Low blood pressure", "Headache or migraine", "Neck injury (gaze forward)"],
    modifications: [
      "Use a block under the bottom hand.",
      "Rest the top hand on the hip if shoulders fatigue.",
    ],
    benefits: [
      "Stretches hamstrings, adductors, and side body.",
      "Strengthens legs and core.",
      "Improves lateral spinal mobility.",
    ],
    holdSeconds: 45,
    breathCount: 5,
    description:
      "The triangle teaches length through opposition. Two strong roots into the earth, two arms extending to opposite poles, the spine spiraling open between them.",
  },
  {
    slug: "vrksasana",
    sanskrit: "Vṛkṣāsana",
    english: "Tree Pose",
    level: "Beginner",
    family: "Balance",
    traditions: ["Hatha", "Vinyasa", "Iyengar"],
    goals: ["focus", "strength"],
    drishti: "Drishti point on a fixed object",
    bandhas: ["Mula bandha"],
    primaryMuscles: ["Gluteus medius", "Peroneals", "Tibialis posterior", "Core"],
    alignment: [
      "Stand in Tadasana, shift weight into one foot.",
      "Place the sole of the other foot on the inner calf or inner thigh — never on the knee.",
      "Hips squared forward; lifted knee opens to the side.",
      "Hands at heart, overhead, or in any tree-branch shape.",
    ],
    cues: [
      "Press the foot into the leg and the leg into the foot equally.",
      "Lengthen the tailbone and lift the lower belly.",
      "Soft gaze on a non-moving point.",
    ],
    prep: ["tadasana", "virabhadrasana-iii"],
    counter: ["tadasana", "uttanasana"],
    contraindications: ["Severe vertigo", "Acute ankle injury"],
    modifications: [
      "Toes on the floor with heel against ankle (kickstand).",
      "Hand on a wall for support.",
    ],
    benefits: [
      "Builds ankle and hip stability.",
      "Trains focus and proprioception.",
      "Calms a scattered mind.",
    ],
    holdSeconds: 60,
    breathCount: 8,
    description:
      "Roots and crown. The standing leg roots like a trunk; the lifted leg becomes a branch. Tree pose is balance practiced as a meditation on stillness in motion.",
  },
  {
    slug: "balasana",
    sanskrit: "Bālāsana",
    english: "Child's Pose",
    level: "Beginner",
    family: "Restorative",
    traditions: ["Hatha", "Vinyasa", "Yin", "Restorative"],
    goals: ["anxiety", "sleep", "back-pain"],
    drishti: "Inward (eyes closed)",
    bandhas: [],
    primaryMuscles: ["Erector spinae (passive stretch)", "Hip extensors"],
    alignment: [
      "Big toes touching, knees wide or together.",
      "Hips sink toward the heels; forehead releases to the floor or a block.",
      "Arms extended forward or alongside the body.",
    ],
    cues: [
      "Let the breath move into the back body.",
      "Soften the jaw, eyes, and brow.",
      "Allow the weight of the head to fully release.",
    ],
    prep: [],
    counter: [],
    contraindications: ["Knee injury", "Late pregnancy (knees wide)", "Diarrhea"],
    modifications: [
      "Bolster between the calves and hamstrings to reduce knee bend.",
      "Forehead on stacked fists if it does not reach the floor.",
    ],
    benefits: [
      "Decompresses the lumbar spine.",
      "Activates the parasympathetic nervous system.",
      "Universal reset between difficult poses.",
    ],
    holdSeconds: 120,
    breathCount: 12,
    description:
      "The pose of return. Child's pose is the body's way of saying: I do not need to perform here. It is the ground from which all other effort can be safely made.",
  },
  {
    slug: "bhujangasana",
    sanskrit: "Bhujaṅgāsana",
    english: "Cobra Pose",
    level: "Beginner",
    family: "Backbend",
    traditions: ["Hatha", "Vinyasa", "Ashtanga"],
    goals: ["back-pain", "strength"],
    drishti: "Forward and slightly up",
    bandhas: ["Mula bandha", "Uddiyana bandha (light)"],
    primaryMuscles: ["Erector spinae", "Glutes", "Triceps"],
    alignment: [
      "Lie prone, hands under the shoulders, elbows hugged in.",
      "Press the tops of the feet, pubic bone, and pelvis into the floor.",
      "Lift the chest by engaging the back, not pushing through the arms.",
      "Shoulders draw down and back; neck long.",
    ],
    cues: [
      "Imagine pulling the floor toward you with the hands without actually moving them.",
      "Keep the elbows bent and the lift modest.",
      "Lengthen the tailbone toward the heels to protect the lower back.",
    ],
    prep: ["balasana", "marjaryasana-bitilasana"],
    counter: ["balasana", "adho-mukha-svanasana"],
    contraindications: ["Pregnancy", "Recent abdominal surgery", "Carpal tunnel"],
    modifications: [
      "Sphinx pose (forearms down) for less intensity.",
      "Roll a blanket under the pelvis for sensitive lower backs.",
    ],
    benefits: [
      "Strengthens the spinal extensors.",
      "Opens the chest and front body.",
      "Counters slumped posture from sitting.",
    ],
    holdSeconds: 30,
    breathCount: 5,
    description:
      "The cobra rises. A foundational backbend that teaches you to lift from the back of the body rather than collapse into the front.",
  },
  {
    slug: "marjaryasana-bitilasana",
    sanskrit: "Mārjaryāsana–Bitilāsana",
    english: "Cat–Cow",
    level: "Beginner",
    family: "Prone",
    traditions: ["Hatha", "Vinyasa"],
    goals: ["back-pain", "flexibility"],
    drishti: "Floor in cat, slightly up in cow",
    bandhas: [],
    primaryMuscles: ["Erector spinae", "Rectus abdominis", "Obliques"],
    alignment: [
      "Tabletop: wrists under shoulders, knees under hips.",
      "Inhale: drop the belly, lift the chest and tailbone (cow).",
      "Exhale: round the spine, tuck the tailbone, drop the head (cat).",
      "Move with the breath — one breath, one movement.",
    ],
    cues: [
      "Initiate from the tailbone, let the wave travel up the spine.",
      "Spread the fingers wide and press evenly through the hands.",
    ],
    prep: [],
    counter: [],
    contraindications: ["Acute neck injury (gaze forward)", "Wrist injury (use fists)"],
    modifications: [
      "Forearms down for wrist sensitivity.",
      "Seated cat-cow if knees are uncomfortable.",
    ],
    benefits: [
      "Mobilizes every segment of the spine.",
      "Synchronizes breath and movement.",
      "Universal warm-up.",
    ],
    holdSeconds: 60,
    breathCount: 8,
    description:
      "The most efficient spinal warm-up in yoga. Cat–cow pairs the natural curves of the spine with the rhythm of the breath.",
  },
  {
    slug: "uttanasana",
    sanskrit: "Uttānāsana",
    english: "Standing Forward Fold",
    level: "Beginner",
    family: "Forwardbend",
    traditions: ["Hatha", "Vinyasa", "Ashtanga", "Iyengar"],
    goals: ["anxiety", "flexibility", "sleep"],
    drishti: "Nasagrai (nose) or shins",
    bandhas: ["Uddiyana bandha (light)"],
    primaryMuscles: ["Hamstrings", "Calves", "Erector spinae"],
    alignment: [
      "Feet hip-width, slight bend in the knees.",
      "Hinge from the hips, not the waist.",
      "Crown of the head reaches toward the floor.",
      "Hands to shins, blocks, or floor.",
    ],
    cues: [
      "Lengthen the spine first, then fold deeper.",
      "Soften the neck and let the head hang.",
      "Shift weight slightly forward into the balls of the feet.",
    ],
    prep: ["adho-mukha-svanasana"],
    counter: ["tadasana", "ardha-uttanasana"],
    contraindications: ["Acute disc injury", "Glaucoma", "Late pregnancy"],
    modifications: [
      "Bend the knees deeply.",
      "Hands on a block or chair seat.",
      "Ragdoll variation: hold opposite elbows, sway gently.",
    ],
    benefits: [
      "Calms the nervous system.",
      "Stretches the entire posterior chain.",
      "Relieves mild back tension.",
    ],
    holdSeconds: 60,
    breathCount: 8,
    description:
      "An inversion in disguise. The forward fold quiets the mind by reversing the relationship between heart and head.",
  },
  {
    slug: "anjaneyasana",
    sanskrit: "Añjaneyāsana",
    english: "Low Lunge",
    level: "Beginner",
    family: "Standing",
    traditions: ["Hatha", "Vinyasa"],
    goals: ["flexibility", "back-pain"],
    drishti: "Forward",
    bandhas: ["Mula bandha"],
    primaryMuscles: ["Psoas (back leg)", "Quadriceps", "Glutes"],
    alignment: [
      "Front knee at 90°, stacked over the ankle.",
      "Back knee on the mat, top of the foot down.",
      "Hips square forward, lengthen the tailbone down.",
      "Arms reach overhead or stay on the front thigh.",
    ],
    cues: [
      "Lift the back of the heart up and forward.",
      "Press the back shin firmly into the mat.",
      "Soften through the front of the back hip.",
    ],
    prep: ["adho-mukha-svanasana"],
    counter: ["balasana"],
    contraindications: ["Knee injury (pad the back knee)"],
    modifications: [
      "Blanket under the back knee.",
      "Hands on blocks for support.",
    ],
    benefits: [
      "Deeply opens the hip flexors.",
      "Counters the effects of prolonged sitting.",
    ],
    holdSeconds: 45,
    breathCount: 6,
    description:
      "Named for Anjaneya — Hanuman's childhood name. The low lunge is the doorway to the deeper hip openers and to the legendary split itself.",
  },
  {
    slug: "savasana",
    sanskrit: "Śavāsana",
    english: "Corpse Pose",
    level: "Beginner",
    family: "Restorative",
    traditions: ["Hatha", "Vinyasa", "Iyengar", "Yin", "Restorative"],
    goals: ["anxiety", "sleep"],
    drishti: "Inward (eyes closed)",
    bandhas: [],
    primaryMuscles: ["None — full release"],
    alignment: [
      "Lie on the back, feet wider than the hips, toes falling out.",
      "Arms slightly away from the body, palms up.",
      "Shoulder blades melted into the floor.",
      "Chin slightly tucked, throat soft.",
    ],
    cues: [
      "Make no effort. Let the floor receive you.",
      "Allow the breath to find its own rhythm.",
      "Watch thoughts pass like clouds.",
    ],
    prep: [],
    counter: [],
    contraindications: ["Late pregnancy (lie on left side)", "Severe lower back pain (knees over a bolster)"],
    modifications: [
      "Bolster under the knees.",
      "Eye pillow.",
      "Side-lying for pregnancy.",
    ],
    benefits: [
      "Integrates the practice.",
      "Activates parasympathetic recovery.",
      "Trains the nervous system to rest awake.",
    ],
    holdSeconds: 600,
    breathCount: 60,
    description:
      "The most important and most difficult pose. Savasana is the practice of being fully alive while doing absolutely nothing — a death rehearsal that births a clearer mind.",
  },
  {
    slug: "sarvangasana",
    sanskrit: "Sarvāṅgāsana",
    english: "Shoulder Stand",
    level: "Intermediate",
    family: "Inversion",
    traditions: ["Hatha", "Iyengar"],
    goals: ["sleep", "hormonal", "focus"],
    drishti: "Toward the chest (jalandhara)",
    bandhas: ["Jalandhara bandha", "Mula bandha"],
    primaryMuscles: ["Trapezius", "Erector spinae", "Hip extensors"],
    alignment: [
      "From a folded blanket setup, lift the legs and hips overhead.",
      "Hands support the mid-back, elbows shoulder-width.",
      "Body forms a long line from shoulders to toes.",
      "Chin draws gently toward the chest.",
    ],
    cues: [
      "Press the upper arms and shoulders down, lift through the soles of the feet.",
      "Do not turn the head once in the pose.",
    ],
    prep: ["halasana", "setu-bandha-sarvangasana"],
    counter: ["matsyasana", "balasana"],
    contraindications: [
      "Neck injury",
      "High blood pressure",
      "Glaucoma or retinal issues",
      "Menstruation (traditional caution)",
      "Pregnancy after first trimester",
    ],
    modifications: [
      "Practice with folded blankets under the shoulders, head off the blankets.",
      "Legs up the wall (Viparita Karani) as a beginner alternative.",
    ],
    benefits: [
      "Stimulates the thyroid gland.",
      "Improves venous return and lymphatic drainage.",
      "Calms the nervous system.",
    ],
    holdSeconds: 180,
    breathCount: 30,
    description:
      "Called the queen of asanas. Sarvangasana means 'all-limbs pose' — a complete posture that affects every system in the body.",
  },
  {
    slug: "halasana",
    sanskrit: "Halāsana",
    english: "Plough Pose",
    level: "Intermediate",
    family: "Inversion",
    traditions: ["Hatha", "Iyengar"],
    goals: ["sleep", "flexibility"],
    drishti: "Toward the chest",
    bandhas: ["Jalandhara bandha"],
    primaryMuscles: ["Hamstrings", "Erector spinae", "Trapezius"],
    alignment: [
      "From shoulder stand, lower the feet over the head toward the floor behind you.",
      "Toes on the floor or on a chair.",
      "Hands support the back, or interlace behind you.",
    ],
    cues: [
      "Lift the sit bones toward the ceiling.",
      "Do not press the back of the neck into the floor.",
    ],
    prep: ["sarvangasana"],
    counter: ["matsyasana"],
    contraindications: [
      "Neck injury",
      "Pregnancy",
      "Hypertension",
      "Diarrhea or menstruation",
    ],
    modifications: [
      "Toes to a chair seat instead of the floor.",
      "Use a blanket stack under the shoulders.",
    ],
    benefits: [
      "Stretches the entire posterior chain.",
      "Stimulates abdominal organs.",
    ],
    holdSeconds: 60,
    breathCount: 10,
    description:
      "The plough furrows the body. A deep forward fold inverted, traditionally paired with shoulder stand for thyroid stimulation.",
  },
  {
    slug: "matsyasana",
    sanskrit: "Matsyāsana",
    english: "Fish Pose",
    level: "Intermediate",
    family: "Backbend",
    traditions: ["Hatha", "Iyengar"],
    goals: ["back-pain", "hormonal"],
    drishti: "Behind (third eye if comfortable)",
    bandhas: ["Mula bandha"],
    primaryMuscles: ["Erector spinae", "Sternocleidomastoid (gentle)", "Pectorals"],
    alignment: [
      "Lie on the back, hands under the hips, palms down.",
      "Press the forearms down and lift the chest.",
      "Crown of the head rests lightly on the floor — weight is in the elbows.",
    ],
    cues: [
      "Open the throat without crunching the back of the neck.",
      "Keep most weight in the elbows, not the head.",
    ],
    prep: ["bhujangasana"],
    counter: ["balasana", "apanasana"],
    contraindications: ["Neck or back injury", "Migraine", "High blood pressure"],
    modifications: [
      "Bolster lengthwise under the spine for a restorative version.",
    ],
    benefits: [
      "Counter pose for shoulder stand.",
      "Opens the chest, throat, and front of the neck.",
    ],
    holdSeconds: 30,
    breathCount: 5,
    description:
      "Named for Matsya, the fish avatar of Vishnu. Said to allow the practitioner to float in any water — a metaphor for buoyancy of body and mind.",
  },
  {
    slug: "padmasana",
    sanskrit: "Padmāsana",
    english: "Lotus Pose",
    level: "Advanced",
    family: "Seated",
    traditions: ["Hatha", "Ashtanga", "Kundalini"],
    goals: ["focus", "flexibility"],
    drishti: "Nasagrai or eyes closed",
    bandhas: ["Mula bandha", "Jalandhara bandha (optional)"],
    primaryMuscles: ["External rotators of the hip", "Erector spinae"],
    alignment: [
      "From staff pose, place each foot on the opposite thigh, soles up.",
      "Knees rest on the floor; spine grows tall from the pelvis.",
      "Hands in jnana or chin mudra on the knees.",
    ],
    cues: [
      "Never force the knees — the rotation must come from the hips.",
      "Build up through bound angle, half lotus, and accomplished pose first.",
    ],
    prep: ["baddha-konasana", "ardha-padmasana"],
    counter: ["staff-pose", "uttanasana"],
    contraindications: ["Knee injury (do not force)", "Hip replacement", "Sciatica"],
    modifications: [
      "Sukhasana (easy seat) or half lotus instead.",
      "Sit on a cushion to elevate the hips.",
    ],
    benefits: [
      "Traditional seat for prolonged meditation and pranayama.",
      "Anchors the spine vertically with minimal muscular effort.",
    ],
    holdSeconds: 600,
    breathCount: 60,
    description:
      "The seat of meditation in classical yoga. Lotus pose is not a flexibility goal — it is a stable base built over years for the deeper inner work.",
  },
  {
    slug: "baddha-konasana",
    sanskrit: "Baddha Koṇāsana",
    english: "Bound Angle / Cobbler's Pose",
    level: "Beginner",
    family: "Seated",
    traditions: ["Hatha", "Iyengar", "Yin"],
    goals: ["hormonal", "flexibility"],
    drishti: "Forward or down",
    bandhas: ["Mula bandha"],
    primaryMuscles: ["Adductors", "Hip external rotators"],
    alignment: [
      "Soles of the feet together, heels close to the perineum.",
      "Sit tall on the sit bones; spine long.",
      "Hands cradle the feet; elbows can press the inner thighs gently.",
    ],
    cues: [
      "Imagine the inner thighs falling like book pages opening.",
      "Lift through the crown before folding forward.",
    ],
    prep: ["sukhasana"],
    counter: ["dandasana"],
    contraindications: ["Groin or knee injury", "Sciatica (sit on a bolster)"],
    modifications: [
      "Block under each knee.",
      "Bolster under the hips.",
    ],
    benefits: [
      "Opens the inner thighs and groin.",
      "Traditionally said to ease menstruation and aid pelvic circulation.",
    ],
    holdSeconds: 120,
    breathCount: 12,
    description:
      "The cobbler's pose, mimicking how Indian cobblers traditionally sat to work. A foundational hip opener used in nearly every style.",
  },
  {
    slug: "paschimottanasana",
    sanskrit: "Paścimottānāsana",
    english: "Seated Forward Fold",
    level: "Intermediate",
    family: "Forwardbend",
    traditions: ["Hatha", "Ashtanga", "Iyengar"],
    goals: ["anxiety", "sleep", "flexibility"],
    drishti: "Toes",
    bandhas: ["Uddiyana bandha (light)"],
    primaryMuscles: ["Hamstrings", "Calves", "Erector spinae"],
    alignment: [
      "From staff pose, hinge at the hips and reach for the feet.",
      "Spine lengthens; do not round to reach the toes.",
      "Forehead toward the shins, eventually.",
    ],
    cues: [
      "Bend the knees as much as needed to keep the spine long.",
      "Use a strap around the feet if hands do not reach.",
    ],
    prep: ["dandasana", "uttanasana"],
    counter: ["bhujangasana", "purvottanasana"],
    contraindications: ["Acute disc injury", "Late pregnancy", "Asthma"],
    modifications: [
      "Strap around the feet.",
      "Bolster on the thighs to rest forward over.",
    ],
    benefits: [
      "Calms the nervous system.",
      "Stretches the entire back body.",
      "Said in classical texts to stimulate the digestive fire.",
    ],
    holdSeconds: 120,
    breathCount: 12,
    description:
      "Paschima means 'west' — the back of the body, which faces the rising sun in tradition. The full west-stretch is one of the four most important asanas in the Hatha Yoga Pradipika.",
  },
  {
    slug: "ardha-matsyendrasana",
    sanskrit: "Ardha Matsyendrāsana",
    english: "Half Lord of the Fishes",
    level: "Intermediate",
    family: "Twist",
    traditions: ["Hatha", "Ashtanga", "Iyengar"],
    goals: ["back-pain", "flexibility"],
    drishti: "Over the back shoulder",
    bandhas: ["Mula bandha", "Uddiyana bandha"],
    primaryMuscles: ["Obliques", "Erector spinae", "Glutes"],
    alignment: [
      "Sit with right leg extended, left foot outside the right thigh.",
      "Right elbow hooks outside the left knee.",
      "Lengthen up on the inhale, twist on the exhale.",
    ],
    cues: [
      "Twist from the base of the spine upward.",
      "Keep both sit bones grounded.",
    ],
    prep: ["dandasana", "sukhasana"],
    counter: ["paschimottanasana", "balasana"],
    contraindications: ["Spinal injury", "Pregnancy (open twists only)"],
    modifications: [
      "Bottom leg straight.",
      "Hand on the floor behind you for support.",
    ],
    benefits: [
      "Mobilizes the thoracic spine.",
      "Stimulates digestion and detoxifies abdominal organs.",
    ],
    holdSeconds: 45,
    breathCount: 6,
    description:
      "Named for Matsyendra, the legendary first teacher of hatha yoga. The twist is said to wring the body like a wet cloth, releasing what is no longer needed.",
  },
  {
    slug: "setu-bandha-sarvangasana",
    sanskrit: "Setu Bandha Sarvāṅgāsana",
    english: "Bridge Pose",
    level: "Beginner",
    family: "Backbend",
    traditions: ["Hatha", "Vinyasa", "Iyengar"],
    goals: ["back-pain", "hormonal", "anxiety"],
    drishti: "Toward the chest",
    bandhas: ["Mula bandha"],
    primaryMuscles: ["Glutes", "Hamstrings", "Erector spinae"],
    alignment: [
      "Lie on back, knees bent, feet hip-width and parallel.",
      "Press feet down, lift hips.",
      "Roll shoulders under, interlace hands beneath the pelvis.",
    ],
    cues: [
      "Lift from the inner thighs and pubic bone.",
      "Lengthen the tailbone toward the knees.",
    ],
    prep: ["apanasana", "marjaryasana-bitilasana"],
    counter: ["apanasana", "balasana"],
    contraindications: ["Neck injury", "Late pregnancy"],
    modifications: [
      "Block under the sacrum for a passive, restorative variation.",
    ],
    benefits: [
      "Opens the front body without deep spinal extension.",
      "Strengthens the posterior chain.",
      "Mild inversion that calms the brain.",
    ],
    holdSeconds: 45,
    breathCount: 6,
    description:
      "The bridge between supine and inverted. A safe, accessible backbend that prepares the body for shoulder stand and the deeper backbends to come.",
  },
  {
    slug: "urdhva-dhanurasana",
    sanskrit: "Ūrdhva Dhanurāsana",
    english: "Wheel / Upward-Facing Bow",
    level: "Advanced",
    family: "Backbend",
    traditions: ["Ashtanga", "Iyengar", "Vinyasa"],
    goals: ["strength", "flexibility"],
    drishti: "Floor behind you",
    bandhas: ["Mula bandha", "Uddiyana bandha"],
    primaryMuscles: ["Glutes", "Erector spinae", "Deltoids", "Triceps"],
    alignment: [
      "Lie on back; hands beside the ears, fingers pointing toward the shoulders.",
      "Press hands and feet, lift to the crown of the head, then to straight arms.",
      "Outer shoulders rotate down; inner thighs spiral in.",
    ],
    cues: [
      "Press evenly through hands and feet.",
      "Soften the throat; do not strain the neck.",
    ],
    prep: ["setu-bandha-sarvangasana", "ustrasana", "bhujangasana"],
    counter: ["apanasana", "supta-baddha-konasana", "paschimottanasana"],
    contraindications: [
      "Carpal tunnel",
      "Heart condition",
      "High or low blood pressure",
      "Pregnancy",
      "Recent abdominal or back surgery",
    ],
    modifications: [
      "Crown of the head down (half wheel) until shoulders open.",
      "Blocks against a wall under the hands.",
    ],
    benefits: [
      "Full opening of the front body.",
      "Builds upper-body and posterior-chain strength.",
      "Stimulating to the nervous system — practiced earlier in the day.",
    ],
    holdSeconds: 20,
    breathCount: 5,
    description:
      "The full wheel. A peak posture that demands shoulder mobility, spinal extension, leg strength, and a calm mind in equal measure.",
  },
  {
    slug: "ustrasana",
    sanskrit: "Uṣṭrāsana",
    english: "Camel Pose",
    level: "Intermediate",
    family: "Backbend",
    traditions: ["Hatha", "Vinyasa", "Bikram"],
    goals: ["back-pain", "flexibility"],
    drishti: "Behind or up toward the third eye",
    bandhas: ["Mula bandha"],
    primaryMuscles: ["Quadriceps", "Hip flexors", "Erector spinae"],
    alignment: [
      "Kneel with shins hip-width apart, tops of the feet down.",
      "Hands to the lower back, fingers down.",
      "Lift the heart up and back; reach hands to heels only when the chest is fully open.",
    ],
    cues: [
      "Lengthen the tailbone toward the knees.",
      "Lead with the chest, not the head dropping back.",
    ],
    prep: ["bhujangasana", "setu-bandha-sarvangasana"],
    counter: ["balasana", "paschimottanasana"],
    contraindications: [
      "Severe neck or back injury",
      "Migraine",
      "Pregnancy (third trimester)",
      "Insomnia (energizing)",
    ],
    modifications: [
      "Hands stay on the lower back.",
      "Toes tucked to lift the heels closer.",
      "Blocks at the outsides of the feet.",
    ],
    benefits: [
      "Powerful chest and hip flexor opener.",
      "Counters slouching and digital posture.",
    ],
    holdSeconds: 30,
    breathCount: 5,
    description:
      "The camel kneels with its heart open. A confronting backbend — emotionally as much as physically — that teaches steadiness in vulnerability.",
  },
  {
    slug: "navasana",
    sanskrit: "Nāvāsana",
    english: "Boat Pose",
    level: "Intermediate",
    family: "Balance",
    traditions: ["Ashtanga", "Vinyasa"],
    goals: ["strength", "focus"],
    drishti: "Toes",
    bandhas: ["Uddiyana bandha", "Mula bandha"],
    primaryMuscles: ["Rectus abdominis", "Hip flexors", "Erector spinae"],
    alignment: [
      "Sit, lean back to balance on the sit bones.",
      "Lift the legs to 45° (knees bent or straight).",
      "Spine long, chest lifted; arms extend forward.",
    ],
    cues: [
      "Lift from the back, not by collapsing the chest.",
      "Breathe steadily — do not hold the breath.",
    ],
    prep: ["dandasana", "marjaryasana-bitilasana"],
    counter: ["apanasana", "balasana"],
    contraindications: ["Pregnancy", "Hernia", "Lower back injury"],
    modifications: [
      "Knees bent and shins parallel to the floor.",
      "Hands behind the thighs.",
    ],
    benefits: [
      "Builds deep core strength.",
      "Develops focus and stamina.",
    ],
    holdSeconds: 30,
    breathCount: 5,
    description:
      "The boat floats on the breath. Navasana strengthens the seat of all upright posture — the deep abdominal and hip flexor chain.",
  },
  {
    slug: "sirsasana",
    sanskrit: "Śīrṣāsana",
    english: "Headstand",
    level: "Advanced",
    family: "Inversion",
    traditions: ["Hatha", "Iyengar", "Ashtanga"],
    goals: ["focus", "strength"],
    drishti: "Inward",
    bandhas: ["Mula bandha", "Uddiyana bandha"],
    primaryMuscles: ["Trapezius", "Deltoids", "Core"],
    alignment: [
      "Forearms on the floor, elbows shoulder-width.",
      "Crown of the head between the hands; weight 90% in forearms, 10% in head.",
      "Walk feet in, lift hips, then lift legs slowly with control.",
    ],
    cues: [
      "Press the forearms and outer wrists down constantly.",
      "Keep the shoulders lifted away from the ears.",
      "Engage the core — do not collapse the lower back.",
    ],
    prep: ["adho-mukha-svanasana", "dolphin-pose"],
    counter: ["balasana", "apanasana"],
    contraindications: [
      "Neck injury",
      "High blood pressure",
      "Glaucoma",
      "Pregnancy",
      "Heart conditions",
      "Menstruation (traditional)",
    ],
    modifications: [
      "Practice against a wall.",
      "Tripod prep with knees on the upper arms.",
      "Use a yoga headstand bench to remove weight from the head.",
    ],
    benefits: [
      "Called the king of asanas in Hatha Yoga Pradipika.",
      "Reverses the effects of gravity on circulation.",
      "Builds upper-body strength and proprioception.",
    ],
    holdSeconds: 60,
    breathCount: 10,
    description:
      "The king of asanas. Sirsasana is approached over years — the cervical spine is too precious to rush. When earned, it offers a perspective shift like no other pose.",
  },
  {
    slug: "supta-baddha-konasana",
    sanskrit: "Supta Baddha Koṇāsana",
    english: "Reclining Bound Angle",
    level: "Beginner",
    family: "Restorative",
    traditions: ["Restorative", "Yin", "Iyengar"],
    goals: ["anxiety", "sleep", "hormonal"],
    drishti: "Inward",
    bandhas: [],
    primaryMuscles: ["Adductors (passive)", "Hip flexors (passive)"],
    alignment: [
      "Lie back, soles of the feet together, knees opening to the sides.",
      "Bolster lengthwise under the spine for elevation.",
      "Blocks under each knee.",
    ],
    cues: [
      "Let gravity do the work.",
      "Stay 5–15 minutes; come out slowly.",
    ],
    prep: [],
    counter: [],
    contraindications: ["Late pregnancy (recline at 30°)", "Acute lower back injury"],
    modifications: [
      "More support under the knees if the inner thighs strain.",
    ],
    benefits: [
      "Deep parasympathetic activation.",
      "Pelvic floor and hip release without effort.",
    ],
    holdSeconds: 600,
    breathCount: 60,
    description:
      "The restorative gateway pose. Supta baddha konasana is often the first prescribed pose in trauma-informed and pre-natal yoga — pure surrender, no effort required.",
  },
  {
    slug: "viparita-karani",
    sanskrit: "Viparīta Karaṇī",
    english: "Legs Up the Wall",
    level: "Beginner",
    family: "Inversion",
    traditions: ["Hatha", "Restorative", "Iyengar"],
    goals: ["sleep", "anxiety", "hormonal"],
    drishti: "Inward",
    bandhas: [],
    primaryMuscles: ["None — full release"],
    alignment: [
      "Sit sideways against a wall, swing the legs up.",
      "Hips can be on the floor or supported on a folded blanket.",
      "Arms relaxed at the sides, palms up.",
    ],
    cues: [
      "If the legs tingle, come down — circulation needs a moment to adapt.",
      "Stay 5 to 20 minutes.",
    ],
    prep: [],
    counter: [],
    contraindications: ["Glaucoma", "Severe hypertension", "Pregnancy after first trimester"],
    modifications: [
      "Bolster under the hips.",
      "Strap around the thighs for completely effortless legs.",
    ],
    benefits: [
      "Reverses venous and lymphatic flow without strain.",
      "One of the most effective pre-sleep poses.",
    ],
    holdSeconds: 600,
    breathCount: 60,
    description:
      "The inversion for everyone. Viparita karani offers nearly all the circulatory and nervous-system benefits of shoulder stand, with virtually no risk.",
  },
  {
    slug: "kapotasana-pigeon",
    sanskrit: "Eka Pāda Rājakapotāsana (prep)",
    english: "Pigeon Pose (forward fold)",
    level: "Intermediate",
    family: "Forwardbend",
    traditions: ["Vinyasa", "Yin", "Hatha"],
    goals: ["flexibility", "back-pain"],
    drishti: "Down or eyes closed",
    bandhas: [],
    primaryMuscles: ["Piriformis", "Gluteus medius", "Hip external rotators"],
    alignment: [
      "From down dog, bring one knee toward the same-side wrist.",
      "Front shin angled across the mat — angle depends on hip openness.",
      "Back leg extends straight, top of the foot on the floor.",
      "Walk the hands forward and fold over the front leg.",
    ],
    cues: [
      "Square the hips toward the floor.",
      "Block under the front-leg hip if it lifts off the floor.",
    ],
    prep: ["adho-mukha-svanasana", "anjaneyasana"],
    counter: ["balasana", "adho-mukha-svanasana"],
    contraindications: ["Acute knee injury", "SI joint instability"],
    modifications: [
      "Reclined pigeon (figure four on the back) for sensitive knees.",
      "Bolster under the front-leg hip.",
    ],
    benefits: [
      "Deep release for the hip rotators.",
      "Often releases stored emotional tension.",
    ],
    holdSeconds: 90,
    breathCount: 12,
    description:
      "The hip opener students remember most. Pigeon asks for patience — the deeper layers of the hip do not respond to force, only to time and breath.",
  },
  {
    slug: "utkatasana",
    sanskrit: "Utkaṭāsana",
    english: "Chair Pose",
    level: "Beginner",
    family: "Standing",
    traditions: ["Hatha", "Vinyasa", "Ashtanga"],
    goals: ["strength"],
    drishti: "Up between the hands",
    bandhas: ["Mula bandha", "Uddiyana bandha"],
    primaryMuscles: ["Quadriceps", "Glutes", "Erector spinae", "Deltoids"],
    alignment: [
      "Feet together or hip-width.",
      "Sit hips back as if into an invisible chair.",
      "Knees track over the second toes.",
      "Arms reach overhead, biceps by the ears.",
    ],
    cues: [
      "Weight in the heels — should be able to lift the toes.",
      "Lengthen the tailbone down to neutralize the lower back.",
    ],
    prep: ["tadasana", "uttanasana"],
    counter: ["uttanasana", "tadasana"],
    contraindications: ["Acute knee injury", "Headache"],
    modifications: [
      "Hands at heart center.",
      "Back to a wall.",
    ],
    benefits: [
      "Builds heat fast.",
      "Strengthens the entire posterior chain and quads.",
    ],
    holdSeconds: 30,
    breathCount: 5,
    description:
      "Fierce pose. Utkata means powerful, intense. Chair pose lights the inner fire of the practice.",
  },
  {
    slug: "garudasana",
    sanskrit: "Garuḍāsana",
    english: "Eagle Pose",
    level: "Intermediate",
    family: "Balance",
    traditions: ["Hatha", "Vinyasa"],
    goals: ["focus", "flexibility"],
    drishti: "Forward fixed point",
    bandhas: ["Mula bandha"],
    primaryMuscles: ["Gluteus medius", "Adductors", "Rhomboids", "Posterior deltoid"],
    alignment: [
      "Cross right thigh over left, hook right foot behind left calf if possible.",
      "Cross left arm under right, palms together if possible.",
      "Sit lower; lift the elbows up to shoulder height.",
    ],
    cues: [
      "Squeeze everything to the midline.",
      "Lift the elbows and the chest at the same time.",
    ],
    prep: ["tadasana", "vrksasana"],
    counter: ["tadasana", "uttanasana"],
    contraindications: ["Knee or shoulder injury"],
    modifications: [
      "Toes of the top foot on the floor (kickstand).",
      "Hands on opposite shoulders for the arm bind.",
    ],
    benefits: [
      "Opens the upper back and shoulders deeply.",
      "Trains balance and concentration.",
    ],
    holdSeconds: 30,
    breathCount: 5,
    description:
      "Named for Garuda, the king of birds and Vishnu's mount. The pose binds the body so the mind can become singular.",
  },
  {
    slug: "dandasana",
    sanskrit: "Daṇḍāsana",
    english: "Staff Pose",
    level: "Beginner",
    family: "Seated",
    traditions: ["Hatha", "Iyengar"],
    goals: ["strength", "back-pain"],
    drishti: "Forward",
    bandhas: ["Mula bandha"],
    primaryMuscles: ["Erector spinae", "Quadriceps", "Hip flexors"],
    alignment: [
      "Legs extended forward, feet flexed.",
      "Sit on the front of the sit bones; spine vertical.",
      "Hands beside the hips, fingers forward.",
    ],
    cues: [
      "Press the thighs down and the heels forward.",
      "Lift the crown — the spine is the staff.",
    ],
    prep: [],
    counter: [],
    contraindications: ["Acute lower back injury (sit on a folded blanket)"],
    modifications: [
      "Sit on a folded blanket to tilt the pelvis forward.",
      "Slight bend in the knees.",
    ],
    benefits: [
      "Foundation for every seated forward fold and twist.",
      "Teaches active sitting.",
    ],
    holdSeconds: 30,
    breathCount: 5,
    description:
      "Tadasana for the seated postures. Dandasana is rarely taught as a peak, yet it is the geometry that makes every seated pose possible.",
  },
  {
    slug: "sukhasana",
    sanskrit: "Sukhāsana",
    english: "Easy Seat",
    level: "Beginner",
    family: "Seated",
    traditions: ["Hatha", "Vinyasa", "Kundalini"],
    goals: ["focus", "anxiety"],
    drishti: "Eyes closed",
    bandhas: ["Mula bandha (light)"],
    primaryMuscles: ["Erector spinae"],
    alignment: [
      "Cross-legged, shins stacked or one in front of the other.",
      "Sit on a cushion so the knees are below the hips.",
      "Spine long, hands on the knees in a mudra.",
    ],
    cues: [
      "Switch the cross of the legs in long meditation sessions.",
      "If the spine cannot be tall, sit higher.",
    ],
    prep: [],
    counter: [],
    contraindications: ["Knee injury (sit in a chair instead)"],
    modifications: [
      "Sit against a wall.",
      "Sit in a chair with feet flat on the floor.",
    ],
    benefits: [
      "Default meditation seat for those without lotus access.",
    ],
    holdSeconds: 600,
    breathCount: 60,
    description:
      "The 'easy' seat. Easy is relative — sukhasana is the everyday meditation seat that meets the body where it is.",
  },
  {
    slug: "supta-virasana",
    sanskrit: "Supta Vīrāsana",
    english: "Reclining Hero",
    level: "Advanced",
    family: "Restorative",
    traditions: ["Iyengar", "Hatha"],
    goals: ["flexibility", "back-pain"],
    drishti: "Inward",
    bandhas: [],
    primaryMuscles: ["Quadriceps", "Hip flexors", "Tibialis anterior"],
    alignment: [
      "Kneel with feet outside the hips, sitting between the heels.",
      "Lower onto forearms, then onto the back if the knees and quads allow.",
    ],
    cues: [
      "Never push through knee pain — back off, support, or skip.",
    ],
    prep: ["virasana", "anjaneyasana"],
    counter: ["balasana"],
    contraindications: ["Knee injury", "Ankle injury", "Severe lower back issues"],
    modifications: [
      "Bolster lengthwise under the spine.",
      "Stay upright in Virasana.",
    ],
    benefits: [
      "Deep stretch for the entire front body.",
      "Counter pose to long days of standing or sitting.",
    ],
    holdSeconds: 120,
    breathCount: 12,
    description:
      "A profound front-line opener. Supta virasana takes time to access — work with bolsters and never force the knees.",
  },
  {
    slug: "anantasana",
    sanskrit: "Anantāsana",
    english: "Side-Reclining Leg Lift",
    level: "Intermediate",
    family: "Balance",
    traditions: ["Hatha", "Iyengar"],
    goals: ["flexibility", "strength"],
    drishti: "Big toe of the lifted leg",
    bandhas: ["Mula bandha"],
    primaryMuscles: ["Adductors", "Obliques", "Gluteus medius"],
    alignment: [
      "Lie on the side, head propped on the hand of the bottom arm.",
      "Lift the top leg, hold the big toe with peace fingers.",
      "Stack the hips and shoulders.",
    ],
    cues: [
      "Push out through the lifted heel as much as you pull on the toe.",
    ],
    prep: ["supta-padangusthasana"],
    counter: ["balasana"],
    contraindications: ["Acute neck injury", "Hip replacement"],
    modifications: [
      "Strap around the foot.",
      "Bend the lifted knee.",
    ],
    benefits: [
      "Hamstring length combined with hip stability.",
      "Develops side-body integration.",
    ],
    holdSeconds: 30,
    breathCount: 5,
    description:
      "Named for Ananta, the cosmic serpent on which Vishnu reclines. A deceptively challenging balance that demands honesty about asymmetry.",
  },
  {
    slug: "purvottanasana",
    sanskrit: "Pūrvottānāsana",
    english: "Upward Plank",
    level: "Intermediate",
    family: "Backbend",
    traditions: ["Ashtanga", "Hatha"],
    goals: ["strength", "back-pain"],
    drishti: "Up or behind",
    bandhas: ["Mula bandha"],
    primaryMuscles: ["Glutes", "Hamstrings", "Triceps", "Posterior deltoid"],
    alignment: [
      "From dandasana, hands behind the hips, fingers forward.",
      "Press hands and feet, lift the hips up.",
      "Body forms a straight line; gaze toward the toes.",
    ],
    cues: [
      "Squeeze the glutes to lift the hips, do not just push with the arms.",
    ],
    prep: ["dandasana", "setu-bandha-sarvangasana"],
    counter: ["paschimottanasana", "balasana"],
    contraindications: ["Wrist injury", "Shoulder injury"],
    modifications: [
      "Reverse tabletop with knees bent.",
      "Stay shorter, lift only halfway.",
    ],
    benefits: [
      "The classic counter to forward folds in Ashtanga.",
      "Strengthens the entire back body.",
    ],
    holdSeconds: 20,
    breathCount: 5,
    description:
      "Purva means 'east' — the front of the body that faces the rising sun. The east stretch is the necessary counter to all the west-stretches of the seated practice.",
  },
];

// ---------- TRADITIONS ----------
export type TraditionEntry = {
  id: Tradition;
  name: string;
  origin: string;
  founder: string;
  era: string;
  pace: "Slow" | "Moderate" | "Vigorous" | "Variable";
  heat: "Cool" | "Warm" | "Hot";
  philosophy: string;
  signature: string[];
  bestFor: string[];
  notFor: string[];
  description: string;
};

export const traditions: TraditionEntry[] = [
  {
    id: "Hatha",
    name: "Hatha Yoga",
    origin: "Northern India",
    founder: "Matsyendra and Goraksha (lineage); systematized in the Hatha Yoga Pradipika by Svatmarama (15th century)",
    era: "11th–15th century CE",
    pace: "Slow",
    heat: "Cool",
    philosophy:
      "Ha (sun) and tha (moon) — the union of opposing energies. The body is the vehicle for liberation; asana, pranayama, mudra, and bandha purify it for higher states.",
    signature: ["Long holds", "Pranayama integrated with asana", "Foundational alignment focus"],
    bestFor: ["Beginners", "Practitioners wanting to build a foundation", "Those who like a slower pace"],
    notFor: ["People wanting cardio-style sweat", "Those who dislike still postures"],
    description:
      "The umbrella tradition from which all modern physical yoga descends. Hatha is the slow, alignment-rich practice that became the seed for Iyengar, Ashtanga, and Vinyasa.",
  },
  {
    id: "Ashtanga",
    name: "Ashtanga Vinyasa",
    origin: "Mysore, India",
    founder: "Sri K. Pattabhi Jois (1915–2009)",
    era: "20th century",
    pace: "Vigorous",
    heat: "Hot",
    philosophy:
      "A fixed sequence repeated daily builds tapas (discipline) and burns away physical and mental obstacles. The breath, bandhas, and drishti turn asana into moving meditation.",
    signature: ["Fixed Primary, Intermediate, and Advanced series", "Mysore-style self-practice", "Ujjayi pranayama throughout", "Six days a week, rest on moon days"],
    bestFor: ["Self-disciplined practitioners", "People who like routine", "Athletes"],
    notFor: ["Those needing variety", "People with chronic injuries who need creative modifications"],
    description:
      "The most physically demanding traditional system. Ashtanga's fixed sequence is a mirror — every day you meet the same poses and a different version of yourself.",
  },
  {
    id: "Iyengar",
    name: "Iyengar Yoga",
    origin: "Pune, India",
    founder: "B.K.S. Iyengar (1918–2014)",
    era: "20th century",
    pace: "Slow",
    heat: "Cool",
    philosophy:
      "Precision is the path. Through long holds and prop-supported alignment, the body becomes a temple of awareness. Therapeutic accessibility for every body.",
    signature: ["Heavy use of props (blocks, straps, bolsters, ropes, blankets)", "Long, precise holds", "Therapeutic sequencing"],
    bestFor: ["People with injuries", "Detail-oriented practitioners", "Older adults"],
    notFor: ["Those wanting a flowing, sweaty class"],
    description:
      "The most rigorous alignment system in modern yoga. Iyengar's Light on Yoga (1966) introduced asana to the West with surgical precision.",
  },
  {
    id: "Vinyasa",
    name: "Vinyasa Flow",
    origin: "Western adaptation of Ashtanga",
    founder: "Various (mid 20th century onward)",
    era: "Late 20th century",
    pace: "Moderate",
    heat: "Warm",
    philosophy:
      "Vinyasa means 'to place in a special way.' Movement linked with breath; sequences built fresh each class around a peak pose or theme.",
    signature: ["Sun salutations", "Creative sequencing", "Continuous flow", "Thematic classes"],
    bestFor: ["Movement lovers", "Those who get bored with repetition", "Cardio-curious yogis"],
    notFor: ["People wanting predictability", "Those who need long holds for nervous-system regulation"],
    description:
      "The most popular style in modern studios. Vinyasa is the freely-improvised musical performance compared to Ashtanga's set composition.",
  },
  {
    id: "Kundalini",
    name: "Kundalini Yoga",
    origin: "Brought to the West by Yogi Bhajan",
    founder: "Yogi Bhajan (1929–2004)",
    era: "20th century (Western form)",
    pace: "Variable",
    heat: "Warm",
    philosophy:
      "The kundalini energy lies coiled at the base of the spine. Kriyas (specific sets), pranayama, mantra, and meditation are designed to awaken and channel that energy.",
    signature: ["Kriyas (set sequences)", "Mantra and chanting", "Breath of fire", "White clothing tradition"],
    bestFor: ["Those drawn to meditation and mantra", "Practitioners seeking energetic shifts"],
    notFor: ["People uncomfortable with overtly spiritual content", "Those needing alignment-heavy instruction"],
    description:
      "The yoga of awareness. Kundalini classes are unlike any other — equal parts movement, breath, sound, and inner work.",
  },
  {
    id: "Yin",
    name: "Yin Yoga",
    origin: "Synthesis of Taoist yoga and Hatha",
    founder: "Paulie Zink, developed by Paul Grilley and Sarah Powers",
    era: "1980s onward",
    pace: "Slow",
    heat: "Cool",
    philosophy:
      "Stress the connective tissues — fascia, ligaments, joint capsules — through long, passive holds (3–10 minutes). The opposite pole to yang, muscle-based practice.",
    signature: ["Floor-based postures", "3–10 minute holds", "Passive engagement", "Meridian theory"],
    bestFor: ["Athletes needing tissue length", "Stressed-out people", "Meditation practitioners"],
    notFor: ["Those wanting to build strength", "People with hypermobility (without modification)"],
    description:
      "The deep, quiet counter to the modern movement world. Yin teaches the kind of patience that cannot be rushed — the slowest gains compound the most.",
  },
  {
    id: "Restorative",
    name: "Restorative Yoga",
    origin: "Iyengar therapeutic adaptation",
    founder: "Judith Hanson Lasater",
    era: "Late 20th century",
    pace: "Slow",
    heat: "Cool",
    philosophy:
      "Recovery is a skill. Restorative yoga uses copious props to support the body in shapes held for 10–20 minutes, allowing complete nervous-system rest.",
    signature: ["Heavy prop use", "Total muscular release", "10–20 minute holds", "Eye pillows, blankets, bolsters"],
    bestFor: ["Burnout recovery", "Insomnia", "Chronic illness", "Pre-natal"],
    notFor: ["Those wanting to break a sweat"],
    description:
      "Doing less to receive more. Restorative is the practice of being held by gravity and props until the body remembers how to fully exhale.",
  },
  {
    id: "Bikram",
    name: "Bikram / Hot Yoga",
    origin: "United States via India",
    founder: "Bikram Choudhury",
    era: "1970s",
    pace: "Moderate",
    heat: "Hot",
    philosophy:
      "Twenty-six postures and two breathing exercises practiced in a 105°F (40°C) room with 40% humidity. The heat is said to detoxify and increase tissue pliability.",
    signature: ["26+2 fixed sequence", "105°F room", "90-minute class", "Mirror-front studios"],
    bestFor: ["Those who love heat", "Practitioners wanting predictability"],
    notFor: ["Pregnant practitioners", "Cardiovascular conditions", "Those sensitive to heat"],
    description:
      "Controversial in modern times due to its founder, but the 26+2 sequence remains a methodology that built thousands of dedicated practitioners. Often taught now under the name 'hot yoga' in lineages independent of Choudhury.",
  },
];

// ---------- 8 LIMBS OF PATANJALI ----------
export type Limb = {
  id: string;
  number: number;
  sanskrit: string;
  english: string;
  description: string;
  practices: string[];
};

export const eightLimbs: Limb[] = [
  {
    id: "yama",
    number: 1,
    sanskrit: "Yama",
    english: "Ethical Restraints",
    description:
      "The five universal moral disciplines that govern how we relate to the world.",
    practices: [
      "Ahimsa — Non-violence",
      "Satya — Truthfulness",
      "Asteya — Non-stealing",
      "Brahmacharya — Conservation of vital energy",
      "Aparigraha — Non-grasping",
    ],
  },
  {
    id: "niyama",
    number: 2,
    sanskrit: "Niyama",
    english: "Personal Observances",
    description:
      "The five disciplines that govern how we relate to ourselves.",
    practices: [
      "Saucha — Purity",
      "Santosha — Contentment",
      "Tapas — Disciplined effort / inner fire",
      "Svadhyaya — Self-study and study of sacred texts",
      "Ishvara Pranidhana — Surrender to a higher principle",
    ],
  },
  {
    id: "asana",
    number: 3,
    sanskrit: "Āsana",
    english: "Posture",
    description:
      "Sthira sukham asanam — 'the seat is steady and easeful.' In Patanjali's text, asana refers to the meditation seat, not a flow class.",
    practices: ["Sustained, steady posture for meditation"],
  },
  {
    id: "pranayama",
    number: 4,
    sanskrit: "Prāṇāyāma",
    english: "Breath Regulation",
    description:
      "The expansion and control of prana through breath techniques.",
    practices: [
      "Nadi Shodhana — Alternate nostril",
      "Ujjayi — Victorious breath",
      "Kapalabhati — Skull shining",
      "Bhramari — Bee breath",
    ],
  },
  {
    id: "pratyahara",
    number: 5,
    sanskrit: "Pratyāhāra",
    english: "Withdrawal of the Senses",
    description:
      "Drawing awareness inward, away from external stimuli — the bridge between outer and inner practice.",
    practices: ["Sense withdrawal exercises", "Yoga nidra preparation"],
  },
  {
    id: "dharana",
    number: 6,
    sanskrit: "Dhāraṇā",
    english: "Concentration",
    description:
      "Single-pointed focus — holding the mind on one object, image, or sensation.",
    practices: ["Trataka (candle gazing)", "Mantra repetition", "Breath as anchor"],
  },
  {
    id: "dhyana",
    number: 7,
    sanskrit: "Dhyāna",
    english: "Meditation",
    description:
      "Sustained concentration that flows uninterrupted — the natural deepening of dharana.",
    practices: ["Seated meditation", "Walking meditation"],
  },
  {
    id: "samadhi",
    number: 8,
    sanskrit: "Samādhi",
    english: "Absorption",
    description:
      "Union — the dissolution of the separation between meditator, object, and act of meditation.",
    practices: ["Cannot be 'practiced' — only prepared for"],
  },
];

// ---------- CHAKRAS ----------
export type Chakra = {
  id: string;
  number: number;
  sanskrit: string;
  english: string;
  location: string;
  element: string;
  bija: string;
  color: string;
  governs: string;
  asanas: string[]; // slugs
};

export const chakras: Chakra[] = [
  {
    id: "muladhara",
    number: 1,
    sanskrit: "Mūlādhāra",
    english: "Root",
    location: "Base of spine, perineum",
    element: "Earth",
    bija: "Lam",
    color: "Red",
    governs: "Survival, grounding, stability, basic needs",
    asanas: ["tadasana", "balasana", "virabhadrasana-i"],
  },
  {
    id: "svadhisthana",
    number: 2,
    sanskrit: "Svādhiṣṭhāna",
    english: "Sacral",
    location: "Lower abdomen, sacrum",
    element: "Water",
    bija: "Vam",
    color: "Orange",
    governs: "Creativity, sexuality, emotion, fluidity",
    asanas: ["baddha-konasana", "anjaneyasana", "kapotasana-pigeon"],
  },
  {
    id: "manipura",
    number: 3,
    sanskrit: "Maṇipūra",
    english: "Solar Plexus",
    location: "Navel center",
    element: "Fire",
    bija: "Ram",
    color: "Yellow",
    governs: "Will, personal power, transformation",
    asanas: ["navasana", "utkatasana", "virabhadrasana-iii"],
  },
  {
    id: "anahata",
    number: 4,
    sanskrit: "Anāhata",
    english: "Heart",
    location: "Center of the chest",
    element: "Air",
    bija: "Yam",
    color: "Green",
    governs: "Love, compassion, connection",
    asanas: ["ustrasana", "bhujangasana", "setu-bandha-sarvangasana"],
  },
  {
    id: "vishuddha",
    number: 5,
    sanskrit: "Viśuddha",
    english: "Throat",
    location: "Throat center",
    element: "Ether / Space",
    bija: "Ham",
    color: "Blue",
    governs: "Truth, communication, expression",
    asanas: ["matsyasana", "sarvangasana", "halasana"],
  },
  {
    id: "ajna",
    number: 6,
    sanskrit: "Ājñā",
    english: "Third Eye",
    location: "Between the eyebrows",
    element: "Light",
    bija: "Om (or silence)",
    color: "Indigo",
    governs: "Intuition, insight, perception",
    asanas: ["sirsasana", "balasana", "padmasana"],
  },
  {
    id: "sahasrara",
    number: 7,
    sanskrit: "Sahasrāra",
    english: "Crown",
    location: "Top of the head",
    element: "Pure consciousness",
    bija: "Silence",
    color: "Violet / White",
    governs: "Connection to the divine, cosmic awareness",
    asanas: ["sirsasana", "padmasana", "savasana"],
  },
];

// ---------- KEY TEXTS ----------
export type SacredText = {
  title: string;
  sanskritTitle?: string;
  author: string;
  era: string;
  summary: string;
  whyItMatters: string;
};

export const sacredTexts: SacredText[] = [
  {
    title: "The Yoga Sutras of Patanjali",
    sanskritTitle: "Yoga Sūtra",
    author: "Patanjali",
    era: "c. 200 BCE – 400 CE",
    summary:
      "196 aphorisms organized into four chapters that systematize the eight-limbed path of classical yoga.",
    whyItMatters:
      "The foundational philosophical text of yoga. The eight limbs framework comes from here. Sutra 1.2 — yogas chitta vritti nirodhah — defines yoga as 'the cessation of the fluctuations of the mind.'",
  },
  {
    title: "The Bhagavad Gita",
    sanskritTitle: "Bhagavad Gītā",
    author: "Vyasa (attributed)",
    era: "c. 200 BCE",
    summary:
      "A 700-verse dialogue between Prince Arjuna and Lord Krishna on the eve of battle, exploring duty, action, devotion, and self-realization.",
    whyItMatters:
      "Introduces the three main paths of yoga: karma yoga (action), bhakti yoga (devotion), and jnana yoga (knowledge). Read alongside the Sutras for the complete classical view.",
  },
  {
    title: "Hatha Yoga Pradipika",
    sanskritTitle: "Haṭha Yoga Pradīpikā",
    author: "Svatmarama",
    era: "15th century CE",
    summary:
      "The canonical text of physical yoga. Describes asana, pranayama, mudra, bandha, and the awakening of kundalini.",
    whyItMatters:
      "The first text to make hatha yoga a structured practice. Calls headstand the 'king of asanas' and shoulder stand the 'queen.'",
  },
  {
    title: "Gheranda Samhita",
    sanskritTitle: "Gheraṇḍa Saṃhitā",
    author: "Gheranda",
    era: "Late 17th century",
    summary:
      "A seven-limbed system organized as a dialogue between sage Gheranda and his student Chanda Kapali.",
    whyItMatters:
      "Most detailed traditional text on shatkarmas (cleansing practices) and a parallel to the Pradipika.",
  },
  {
    title: "Light on Yoga",
    author: "B.K.S. Iyengar",
    era: "1966",
    summary:
      "Detailed instruction for over 200 asanas with photographs of Iyengar himself.",
    whyItMatters:
      "The book that brought serious asana practice to the West. Still the most rigorous alignment reference in print.",
  },
  {
    title: "The Heart of Yoga",
    author: "T.K.V. Desikachar",
    era: "1995",
    summary:
      "An accessible distillation of the teachings of Krishnamacharya — the modern father of asana.",
    whyItMatters:
      "Makes the Yoga Sutras readable for modern practitioners. Emphasizes that yoga adapts to the student, not the other way around.",
  },
];

// ---------- GOALS ----------
export type GoalEntry = {
  id: YogaGoal;
  label: string;
  blurb: string;
  practices: string[]; // asana slugs
  pranayama: string[]; // technique names
  duration: string;
  protocol: string[];
  research: string;
};

export const goals: GoalEntry[] = [
  {
    id: "back-pain",
    label: "Relieve Back Pain",
    blurb:
      "A targeted sequence to mobilize the spine, decompress the lower back, and re-pattern hip and core engagement.",
    practices: [
      "marjaryasana-bitilasana",
      "balasana",
      "adho-mukha-svanasana",
      "setu-bandha-sarvangasana",
      "supta-baddha-konasana",
    ],
    pranayama: ["Diaphragmatic breathing", "Coherent breathing"],
    duration: "20–30 minutes daily",
    protocol: [
      "Begin with 5 minutes of cat-cow synced to slow breath.",
      "Move through gentle standing poses to build heat without strain.",
      "Focus on hip openers — most lower back pain is hip-related.",
      "End with bridge and a long savasana with knees bolstered.",
    ],
    research:
      "A 2017 Annals of Internal Medicine study found 12 weeks of yoga was as effective as physical therapy for chronic lower back pain.",
  },
  {
    id: "anxiety",
    label: "Calm Anxiety",
    blurb:
      "A parasympathetic-dominant practice that combines forward folds, gentle inversions, and extended exhales.",
    practices: [
      "balasana",
      "uttanasana",
      "supta-baddha-konasana",
      "viparita-karani",
      "savasana",
    ],
    pranayama: ["4-7-8 breathing", "Bhramari (bee breath)", "Coherent breathing"],
    duration: "15–25 minutes",
    protocol: [
      "Start in supported child's pose for 3 minutes.",
      "Slow forward folds with extended exhales.",
      "Legs up the wall for 10 minutes.",
      "Bhramari for 12 cycles before a 10-minute savasana.",
    ],
    research:
      "Multiple meta-analyses (2018, 2020) confirm yoga reduces state and trait anxiety with moderate effect sizes comparable to other psychological interventions.",
  },
  {
    id: "sleep",
    label: "Better Sleep",
    blurb:
      "A wind-down practice timed for 60–90 minutes before bed.",
    practices: [
      "uttanasana",
      "balasana",
      "supta-baddha-konasana",
      "viparita-karani",
      "savasana",
    ],
    pranayama: ["4-7-8 breathing", "Cyclic sighing", "Diaphragmatic breathing"],
    duration: "20 minutes pre-bed",
    protocol: [
      "Dim the lights. Practice in low or candlelight.",
      "Move slowly. No vinyasa, no inversions stronger than legs-up-the-wall.",
      "End with 5 minutes of 4-7-8 breath in bed.",
    ],
    research:
      "A 2020 review in Sleep Medicine Reviews found yoga improved sleep quality (PSQI) in adults with insomnia, with effects comparable to CBT-I in some studies.",
  },
  {
    id: "flexibility",
    label: "Build Flexibility",
    blurb:
      "Long holds and progressive opening of the major muscle groups. Best done warm.",
    practices: [
      "adho-mukha-svanasana",
      "anjaneyasana",
      "kapotasana-pigeon",
      "paschimottanasana",
      "baddha-konasana",
    ],
    pranayama: ["Ujjayi"],
    duration: "30–45 minutes, 3–4× per week",
    protocol: [
      "Always warm up with sun salutations or movement first.",
      "Hold each pose 60–90 seconds; in yin variations, 3–5 minutes.",
      "Breathe slowly into the area of stretch, not away from it.",
    ],
    research:
      "A 2016 study in PLoS One showed 10 weeks of yoga increased hamstring flexibility by 35% in previously inactive adults.",
  },
  {
    id: "strength",
    label: "Build Strength",
    blurb:
      "Standing poses, arm balances, and core work that turn yoga into resistance training.",
    practices: [
      "utkatasana",
      "virabhadrasana-i",
      "virabhadrasana-ii",
      "navasana",
      "purvottanasana",
    ],
    pranayama: ["Ujjayi"],
    duration: "45–60 minutes, 3× per week",
    protocol: [
      "Hold standing poses 45–90 seconds with full breath.",
      "Add chair pose pulses or warrior holds for muscular endurance.",
      "Train arm balances after the body is warm.",
    ],
    research:
      "A 2015 study in the European Journal of Preventive Cardiology found 12 weeks of yoga improved muscular strength comparably to traditional resistance training in untrained adults.",
  },
  {
    id: "focus",
    label: "Sharpen Focus",
    blurb:
      "Balance poses, concentration practices, and a steady seated meditation.",
    practices: [
      "vrksasana",
      "garudasana",
      "navasana",
      "padmasana",
      "sukhasana",
    ],
    pranayama: ["Nadi shodhana", "Ujjayi"],
    duration: "20–30 minutes",
    protocol: [
      "Use a fixed gaze (drishti) in every balance pose.",
      "End with 10 minutes of seated breath observation.",
    ],
    research:
      "A 2018 Journal of Cognitive Enhancement paper showed 8 weeks of yoga improved attention and working memory measures, with effects strongest in older adults.",
  },
  {
    id: "hormonal",
    label: "Hormonal Balance",
    blurb:
      "A practice for thyroid, adrenal, and reproductive health, working through inversions and supported postures.",
    practices: [
      "setu-bandha-sarvangasana",
      "viparita-karani",
      "supta-baddha-konasana",
      "baddha-konasana",
      "halasana",
    ],
    pranayama: ["Nadi shodhana", "Bhramari"],
    duration: "30–40 minutes",
    protocol: [
      "Practice supported inversions for 5–10 minutes.",
      "Use bolsters generously — let gravity do the work.",
      "Avoid strong twists during menstruation.",
    ],
    research:
      "A 2013 review in International Journal of Yoga found yoga improved heart rate variability and reduced cortisol — both markers of healthier stress hormone regulation.",
  },
];

// ---------- RESEARCH STUDIES ----------
export type Study = {
  title: string;
  authors: string;
  journal: string;
  year: number;
  findings: string;
  effectSize?: string;
  population: string;
};

export const studies: Study[] = [
  {
    title: "Yoga, Physical Therapy, or Education for Chronic Low Back Pain",
    authors: "Saper RB et al.",
    journal: "Annals of Internal Medicine",
    year: 2017,
    findings:
      "Yoga was non-inferior to physical therapy for chronic low back pain over 12 weeks; both outperformed an education-only control.",
    effectSize: "Comparable pain reduction (≈30%) to PT",
    population: "320 adults with chronic low back pain",
  },
  {
    title: "Effect of Yoga on Anxiety and Depression: A Meta-Analysis",
    authors: "Cramer H, Lauche R, Anheyer D et al.",
    journal: "Depression and Anxiety",
    year: 2018,
    findings:
      "Yoga produced moderate reductions in both anxiety and depression versus passive controls, with effects comparable to other active treatments.",
    effectSize: "Hedges g = 0.5–0.7",
    population: "Pooled n > 2,000 across multiple RCTs",
  },
  {
    title: "Yoga for Insomnia: A Systematic Review",
    authors: "Wang WL, Chen KH, Pan YC et al.",
    journal: "BMC Psychiatry",
    year: 2020,
    findings:
      "Yoga significantly improved sleep quality (PSQI) and reduced insomnia severity in adults across 19 RCTs.",
    population: "Pooled across 19 trials",
  },
  {
    title: "Yoga and Heart Rate Variability",
    authors: "Tyagi A, Cohen M",
    journal: "International Journal of Yoga",
    year: 2016,
    findings:
      "Regular yoga practice increased HRV — a marker of parasympathetic tone — across a range of populations and styles.",
    population: "Systematic review of 59 studies",
  },
  {
    title: "Hatha Yoga Practice Improves Flexibility, Strength, and Balance",
    authors: "Tran MD, Holly RG, Lashbrook J, Amsterdam EA",
    journal: "Preventive Cardiology",
    year: 2001,
    findings:
      "8 weeks of hatha yoga increased muscular endurance (+57%), flexibility (+188% for shoulder, +14% for trunk), and VO₂ max (+7%).",
    population: "10 healthy untrained adults",
  },
  {
    title: "Effects of Yoga on Inflammation and Stress",
    authors: "Falkenberg RI, Eising C, Peters ML",
    journal: "Journal of Behavioral Medicine",
    year: 2018,
    findings:
      "Regular yoga reduced inflammatory markers (IL-6, CRP) and salivary cortisol in stressed populations.",
    population: "Meta-analysis of 14 studies",
  },
  {
    title: "Yoga for Hypertension: Systematic Review and Meta-Analysis",
    authors: "Hagins M, States R, Selfe T, Innes K",
    journal: "Evidence-Based Complementary and Alternative Medicine",
    year: 2013,
    findings:
      "Yoga modestly reduced systolic and diastolic blood pressure compared to no-treatment controls.",
    effectSize: "−4.17 / −3.26 mmHg",
    population: "17 trials, ~2,000 participants",
  },
  {
    title: "Yoga and Cognitive Function in Older Adults",
    authors: "Gothe NP, Khan I, Hayes J, Erlenbach E, Damoiseaux JS",
    journal: "Brain Plasticity",
    year: 2019,
    findings:
      "Yoga interventions improved attention, processing speed, and executive function in older adults; some studies showed gray matter increases in the hippocampus.",
    population: "Systematic review",
  },
  {
    title: "Iyengar Yoga for Treating Symptoms of Osteoarthritis",
    authors: "Cheung C, Wyman JF, Resnick B, Savik K",
    journal: "Journal of Aging Research",
    year: 2014,
    findings:
      "8 weeks of Iyengar yoga reduced pain and stiffness and improved function in adults with knee osteoarthritis.",
    population: "36 adults with knee OA",
  },
  {
    title: "Yoga for Cancer-Related Fatigue: Meta-Analysis",
    authors: "Armer JS, Lutgendorf SK",
    journal: "JNCI Cancer Spectrum",
    year: 2019,
    findings:
      "Yoga produced clinically meaningful reductions in cancer-related fatigue across multiple cancer types.",
    population: "Meta-analysis of 25 trials",
  },
  {
    title: "Yoga and PTSD: Randomized Controlled Trial",
    authors: "van der Kolk BA et al.",
    journal: "Journal of Clinical Psychiatry",
    year: 2014,
    findings:
      "10 weeks of trauma-sensitive yoga significantly reduced PTSD symptoms in women with chronic, treatment-resistant PTSD.",
    population: "64 women with chronic PTSD",
  },
  {
    title: "Yoga for Anxiety Disorders: A Systematic Review",
    authors: "Cramer H, Lauche R, Langhorst J, Dobos G",
    journal: "Depression and Anxiety",
    year: 2018,
    findings:
      "Limited but positive evidence for yoga as an adjunct treatment for generalized anxiety disorder.",
    population: "8 RCTs",
  },
  {
    title: "Pranayama and Cardiac Autonomic Function",
    authors: "Pal GK, Velkumary S, Madanmohan",
    journal: "Indian Journal of Medical Research",
    year: 2004,
    findings:
      "Slow pranayama increased parasympathetic activity and reduced sympathetic activity within minutes.",
    population: "60 young healthy adults",
  },
  {
    title: "Sun Salutations as Cardiovascular Exercise",
    authors: "Sinha B, Sinha TD",
    journal: "International Journal of Yoga",
    year: 2014,
    findings:
      "Performing surya namaskar at moderate pace produced cardiovascular load comparable to brisk walking.",
    population: "21 active adults",
  },
  {
    title: "Yoga for Menopausal Symptoms",
    authors: "Cramer H, Peng W, Lauche R",
    journal: "Maturitas",
    year: 2018,
    findings:
      "Yoga reduced psychological menopausal symptoms but had small effects on vasomotor symptoms.",
    population: "Meta-analysis of 13 RCTs",
  },
  {
    title: "Long-Term Yoga Practitioners Show Larger Hippocampal Volume",
    authors: "Hernandez SE et al.",
    journal: "Frontiers in Human Neuroscience",
    year: 2018,
    findings:
      "Long-term yoga practitioners had greater gray matter volume in the left hippocampus compared to controls.",
    population: "Cross-sectional, 14 long-term practitioners",
  },
  {
    title: "Yoga and Telomerase Activity",
    authors: "Tolahunase M, Sagar R, Dada R",
    journal: "Oxidative Medicine and Cellular Longevity",
    year: 2017,
    findings:
      "12 weeks of yoga and meditation increased telomerase activity and reduced biomarkers of cellular aging.",
    population: "96 healthy adults",
  },
  {
    title: "Yoga for Migraine Prevention",
    authors: "Kumar A et al.",
    journal: "Neurology",
    year: 2020,
    findings:
      "Adding yoga to medical therapy reduced migraine frequency and intensity more than medical therapy alone.",
    effectSize: "Frequency reduction ≈ 48%",
    population: "114 adults with episodic migraine",
  },
  {
    title: "Yoga for Pregnancy Outcomes",
    authors: "Babbar S, Parks-Savage AC, Chauhan SP",
    journal: "Reviews in Obstetrics and Gynecology",
    year: 2012,
    findings:
      "Pre-natal yoga associated with reduced pregnancy discomfort and improved labor outcomes.",
    population: "Review of multiple trials",
  },
  {
    title: "Yoga vs. Stretching for Chronic Neck Pain",
    authors: "Cramer H, Lauche R, Hohmann C et al.",
    journal: "Clinical Journal of Pain",
    year: 2013,
    findings:
      "9 weeks of Iyengar yoga produced greater reductions in neck pain than home-based stretching.",
    population: "77 adults with chronic neck pain",
  },
];

// ---------- GLOSSARY ----------
export type GlossaryTerm = {
  term: string;
  sanskrit?: string;
  definition: string;
};

export const glossary: GlossaryTerm[] = [
  { term: "Asana", sanskrit: "āsana", definition: "Posture. In Patanjali's text, the meditation seat; in modern usage, any yoga posture." },
  { term: "Bandha", sanskrit: "bandha", definition: "Energy lock — a controlled muscular engagement that contains and directs prana. Three primary: mula, uddiyana, jalandhara." },
  { term: "Bhakti", sanskrit: "bhakti", definition: "The yoga of devotion. One of the three classical paths." },
  { term: "Drishti", sanskrit: "dṛṣṭi", definition: "Gaze point. Each pose has a traditional drishti to focus the mind." },
  { term: "Jalandhara Bandha", sanskrit: "jālandhara bandha", definition: "Throat lock — chin draws toward the chest to seal energy at the throat." },
  { term: "Karma Yoga", sanskrit: "karma yoga", definition: "The yoga of selfless action." },
  { term: "Kriya", sanskrit: "kriyā", definition: "A specific set of practices producing a particular effect — common in Kundalini and shatkarma." },
  { term: "Kumbhaka", sanskrit: "kumbhaka", definition: "Breath retention — either after inhale (antara) or after exhale (bahya)." },
  { term: "Mantra", sanskrit: "mantra", definition: "A sound, syllable, or phrase repeated to focus the mind." },
  { term: "Mudra", sanskrit: "mudrā", definition: "A gesture or seal — usually of the hands — that channels energy." },
  { term: "Mula Bandha", sanskrit: "mūla bandha", definition: "Root lock — light engagement of the pelvic floor." },
  { term: "Nadi", sanskrit: "nāḍī", definition: "Energy channel. The body has 72,000 nadis; the three principal are ida, pingala, and sushumna." },
  { term: "Namaste", sanskrit: "namaste", definition: "Literally 'bow to you' — a respectful greeting acknowledging the divine in the other." },
  { term: "Niyama", sanskrit: "niyama", definition: "The five personal observances — second limb of Patanjali's path." },
  { term: "Om", sanskrit: "Auṃ", definition: "The primordial sound. The seed mantra of the universe." },
  { term: "Prana", sanskrit: "prāṇa", definition: "Life force. Often translated as 'breath' but encompassing all vital energy." },
  { term: "Pranayama", sanskrit: "prāṇāyāma", definition: "The practices of regulating prana through breath — fourth limb." },
  { term: "Pratyahara", sanskrit: "pratyāhāra", definition: "Withdrawal of the senses — fifth limb." },
  { term: "Samadhi", sanskrit: "samādhi", definition: "Absorption — the eighth and final limb. The state of union." },
  { term: "Samskara", sanskrit: "saṃskāra", definition: "A mental impression or habit groove formed by past actions." },
  { term: "Sangha", sanskrit: "saṅgha", definition: "Community — the people you practice with." },
  { term: "Sutra", sanskrit: "sūtra", definition: "Literally 'thread' — a short aphoristic statement, like a teaching distilled to its core." },
  { term: "Tapas", sanskrit: "tapas", definition: "Inner fire / disciplined effort — one of the niyamas." },
  { term: "Uddiyana Bandha", sanskrit: "uḍḍīyana bandha", definition: "Abdominal lock — drawing the lower belly up and back toward the spine." },
  { term: "Ujjayi", sanskrit: "ujjāyī", definition: "Victorious breath — the audible 'ocean' breath used in vinyasa and ashtanga." },
  { term: "Vinyasa", sanskrit: "vinyāsa", definition: "'To place in a special way' — the linking of breath and movement." },
  { term: "Yama", sanskrit: "yama", definition: "The five ethical restraints — first limb." },
  { term: "Yoga", sanskrit: "yoga", definition: "Union. From the root yuj — to yoke or join." },
  { term: "Yoga Nidra", sanskrit: "yoga nidrā", definition: "'Yogic sleep' — a guided meditation of deep relaxation while remaining conscious." },
  { term: "Sthira Sukham", sanskrit: "sthira sukham", definition: "'Steady and easeful' — Patanjali's two-word definition of asana." },
];

// ---------- BOOKS / RESOURCES ----------
export type Book = {
  title: string;
  author: string;
  summary: string;
  bestFor: string;
};

export const books: Book[] = [
  {
    title: "Light on Yoga",
    author: "B.K.S. Iyengar",
    summary: "Encyclopedic asana reference with photographs and detailed instruction.",
    bestFor: "Serious students wanting alignment depth.",
  },
  {
    title: "The Heart of Yoga",
    author: "T.K.V. Desikachar",
    summary: "Accessible distillation of Krishnamacharya's teachings; includes a translation of the Yoga Sutras.",
    bestFor: "Practitioners ready to study philosophy alongside practice.",
  },
  {
    title: "The Yoga Sutras of Patanjali (translation by Sri Swami Satchidananda)",
    author: "Sri Swami Satchidananda",
    summary: "Readable translation and commentary on the foundational philosophical text.",
    bestFor: "Anyone serious about classical yoga.",
  },
  {
    title: "Yoga Anatomy",
    author: "Leslie Kaminoff & Amy Matthews",
    summary: "Detailed anatomical breakdown of how each pose works.",
    bestFor: "Teachers and movement-curious students.",
  },
  {
    title: "The Key Muscles of Yoga / The Key Poses of Yoga",
    author: "Ray Long, MD",
    summary: "Functional anatomy through detailed illustrations.",
    bestFor: "Visual learners and those rehabbing injuries.",
  },
  {
    title: "Eastern Body, Western Mind",
    author: "Anodea Judith",
    summary: "The chakra system mapped onto modern psychology.",
    bestFor: "Yogis interested in subtle anatomy.",
  },
  {
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    summary: "How trauma lives in the body — and how yoga (chapter 16) helps release it.",
    bestFor: "Anyone working with trauma in themselves or others.",
  },
  {
    title: "Insight Yoga",
    author: "Sarah Powers",
    summary: "Yin and yang practice integrated with Buddhist meditation.",
    bestFor: "Meditators looking to integrate yoga.",
  },
  {
    title: "The Tree of Yoga",
    author: "B.K.S. Iyengar",
    summary: "Iyengar's accessible reflections on yoga as a way of life.",
    bestFor: "All levels.",
  },
  {
    title: "Awakening the Spine",
    author: "Vanda Scaravelli",
    summary: "A spine-led, breath-led, surrender-led approach to asana.",
    bestFor: "Long-time practitioners ready to unlearn striving.",
  },
];

// ---------- BELT SYSTEM ----------
export type Belt = {
  id: string;
  name: string;
  color: string;
  required: { asanas: number; goals: number };
  description: string;
};

export const belts: Belt[] = [
  { id: "white", name: "White Belt", color: "var(--foreground)", required: { asanas: 0, goals: 0 }, description: "You have unrolled the mat. The path begins now." },
  { id: "yellow", name: "Yellow Belt", color: "var(--sun-glow)", required: { asanas: 5, goals: 1 }, description: "Sun salutations are familiar. You can hold five poses with breath." },
  { id: "green", name: "Green Belt", color: "var(--leaf-glow)", required: { asanas: 12, goals: 2 }, description: "A daily home practice. You can sequence a class for yourself." },
  { id: "blue", name: "Blue Belt", color: "var(--cyan-glow)", required: { asanas: 20, goals: 3 }, description: "You hold inversions. You understand bandhas and drishti from the inside." },
  { id: "red", name: "Red Belt", color: "var(--coral-glow)", required: { asanas: 28, goals: 5 }, description: "Advanced asana, deep philosophy, regular pranayama. You could teach safely." },
  { id: "black", name: "Black Belt", color: "var(--orchid-glow)", required: { asanas: 32, goals: 7 }, description: "Mastery is the willingness to remain a beginner. You teach by being." },
];

// ---------- CHALLENGES ----------
export type ChallengeDay = {
  day: number;
  title: string;
  asana?: string;
  prompt: string;
};

export type Challenge = {
  id: string;
  title: string;
  durationDays: number;
  blurb: string;
  days: ChallengeDay[];
};

const flexibilityChallenge: Challenge = {
  id: "30-day-flexibility",
  title: "30-Day Flexibility Path",
  durationDays: 30,
  blurb: "Daily practice focused on hips, hamstrings, and spine.",
  days: Array.from({ length: 30 }, (_, i): ChallengeDay => {
    const day = i + 1;
    const focus = ["kapotasana-pigeon", "paschimottanasana", "baddha-konasana", "anjaneyasana", "uttanasana"][i % 5];
    return {
      day,
      title: `Day ${day}: ${day % 7 === 0 ? "Reflect & Rest" : "Practice"}`,
      asana: focus,
      prompt:
        day % 7 === 0
          ? "Restorative day — supported child's pose, legs up the wall, and savasana for 5 minutes each. Journal what you notice."
          : `15-minute practice. Hold the focus pose for 90 seconds on each side, breathing slowly.`,
    };
  }),
};

const inversionChallenge: Challenge = {
  id: "21-day-inversion",
  title: "21-Day Inversion Path",
  durationDays: 21,
  blurb: "Three weeks of progressive inversion practice. Always against a wall to start.",
  days: [
    { day: 1, title: "Baseline", asana: "adho-mukha-svanasana", prompt: "5 minutes of down dog. Note where the body resists." },
    { day: 2, title: "Dolphin", asana: "adho-mukha-svanasana", prompt: "Forearms down, hold for 5 breaths × 3 rounds." },
    { day: 3, title: "Legs Up the Wall", asana: "viparita-karani", prompt: "10 minutes. Notice the body's response to inversion." },
    { day: 4, title: "Bridge", asana: "setu-bandha-sarvangasana", prompt: "5 rounds, holding each for 5 breaths." },
    { day: 5, title: "Shoulder Stand Prep", asana: "viparita-karani", prompt: "Block under the sacrum for supported half-shoulder-stand." },
    { day: 6, title: "Headstand Prep at Wall", asana: "balasana", prompt: "Tripod stance, knees on the upper arms, no kicking up yet." },
    { day: 7, title: "Reflect", prompt: "Journal: where does fear show up in inverting?" },
    { day: 8, title: "Shoulder Stand at Wall", asana: "sarvangasana", prompt: "Folded blankets, feet to wall, lift one leg at a time." },
    { day: 9, title: "Plough Prep", asana: "halasana", prompt: "Toes to a chair, hold for 30 seconds." },
    { day: 10, title: "Headstand Hops", asana: "balasana", prompt: "Tripod, hop one leg up at a time at the wall. Never kick." },
    { day: 11, title: "Forearm Stand at Wall", asana: "adho-mukha-svanasana", prompt: "Dolphin, walk feet in, one leg up the wall." },
    { day: 12, title: "Active Recovery", asana: "balasana", prompt: "Restorative day. Child's pose, viparita karani, savasana." },
    { day: 13, title: "Full Shoulder Stand", asana: "sarvangasana", prompt: "30 seconds, then 1 minute. Always with blankets." },
    { day: 14, title: "Reflect", prompt: "Journal: how has your relationship with fear shifted?" },
    { day: 15, title: "Headstand at Wall", asana: "sirsasana", prompt: "Both legs up, hold for 10 seconds." },
    { day: 16, title: "Pincha Mayurasana Prep", asana: "adho-mukha-svanasana", prompt: "Forearm dolphin holds × 3 minutes total." },
    { day: 17, title: "Counter-Pose Day", asana: "matsyasana", prompt: "Practice counter poses for everything you've done so far." },
    { day: 18, title: "Headstand Off Wall (assisted)", asana: "sirsasana", prompt: "Spotter or wall close. 15 seconds." },
    { day: 19, title: "Long Holds", asana: "sarvangasana", prompt: "3 minutes shoulder stand, 1 minute plough, 1 minute fish." },
    { day: 20, title: "Free Practice", prompt: "Choose your favorite inversions. Hold each as long as feels right." },
    { day: 21, title: "Integration", prompt: "30-minute practice including all inversions you've earned. Journal what changed." },
  ],
};

export const challenges: Challenge[] = [flexibilityChallenge, inversionChallenge];

// ---------- TEACHERS ----------
export type Teacher = {
  name: string;
  lineage: string;
  era: string;
  contribution: string;
};

export const teachers: Teacher[] = [
  { name: "T. Krishnamacharya", lineage: "Mysore", era: "1888–1989", contribution: "Father of modern yoga. Teacher to Iyengar, Pattabhi Jois, Desikachar, and Indra Devi." },
  { name: "B.K.S. Iyengar", lineage: "Iyengar", era: "1918–2014", contribution: "Founder of Iyengar Yoga. Brought alignment-precision and props into the mainstream." },
  { name: "Sri K. Pattabhi Jois", lineage: "Ashtanga", era: "1915–2009", contribution: "Codified the Ashtanga Vinyasa system. Taught the fixed-sequence method." },
  { name: "Indra Devi", lineage: "Krishnamacharya", era: "1899–2002", contribution: "First Western woman to receive Krishnamacharya's blessing to teach. Brought yoga to Hollywood and beyond." },
  { name: "T.K.V. Desikachar", lineage: "Viniyoga", era: "1938–2016", contribution: "Krishnamacharya's son. Developed Viniyoga — the 'yoga adapts to the student' philosophy." },
  { name: "Swami Sivananda", lineage: "Sivananda / Vedanta", era: "1887–1963", contribution: "Founded the Divine Life Society. His students include Vishnudevananda and Satchidananda." },
  { name: "Yogi Bhajan", lineage: "Kundalini", era: "1929–2004", contribution: "Brought Kundalini Yoga to the West. Legacy now reckoning with documented abuse." },
  { name: "Paul Grilley", lineage: "Yin", era: "Contemporary", contribution: "Co-developed Yin Yoga; integrated Taoist and Hatha approaches." },
  { name: "Sarah Powers", lineage: "Insight / Yin", era: "Contemporary", contribution: "Wove Buddhist insight meditation into Yin practice." },
  { name: "Judith Hanson Lasater", lineage: "Iyengar / Restorative", era: "Contemporary", contribution: "One of the first to systematize restorative yoga in the West." },
];

// ---------- FAQ ----------
export type FAQ = { q: string; a: string };

export const faq: FAQ[] = [
  {
    q: "How often should I practice?",
    a: "Even 10–15 minutes daily produces measurable benefits. Three 30-minute sessions a week is a strong baseline; daily is transformative. Consistency beats duration.",
  },
  {
    q: "Do I need to be flexible to start?",
    a: "No. Flexibility is a result of yoga, not a prerequisite. Tight bodies often progress fastest because they have the most room to change.",
  },
  {
    q: "Should I eat before practicing?",
    a: "Practice on an empty or light stomach — at least 2 hours after a full meal, 1 hour after a snack. This is especially important for twists and inversions.",
  },
  {
    q: "Yoga or strength training — which is better?",
    a: "Both, ideally. Yoga develops mobility, breath, and nervous-system regulation; strength training builds load capacity. They complement each other.",
  },
  {
    q: "What's the difference between yoga and stretching?",
    a: "Stretching targets a muscle. Yoga integrates breath, mental focus, energy locks, and a philosophical framework. The same shape practiced as yoga vs. stretching produces different results in the body and mind.",
  },
  {
    q: "Can I practice during my period?",
    a: "Traditionally, practitioners rest from inversions during menstruation. Modern teachers vary on this — listen to your body. Restorative and forward folds are safe and often welcome.",
  },
  {
    q: "What style is best for beginners?",
    a: "Hatha or Iyengar for slow, alignment-focused learning. Vinyasa once you have the foundation. Avoid Ashtanga and hot styles for the first few months.",
  },
  {
    q: "Is online practice as effective as in-studio?",
    a: "Live in-person classes give you adjustments and community. Online practice gives you consistency. The best practice is the one you actually do.",
  },
];

// ---------- HELPERS ----------
export function getAsana(slug: string): Asana | undefined {
  return asanas.find((a) => a.slug === slug);
}
export function getAsanaName(slug: string): string {
  return getAsana(slug)?.english ?? slug;
}
export function getGoal(id: string): GoalEntry | undefined {
  return goals.find((g) => g.id === id);
}

// ---------- SEARCH ----------
export type SearchHit = {
  kind: "asana" | "study" | "glossary" | "book" | "goal" | "tradition" | "text" | "faq";
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
  const tokens = q.split(/\s+/).filter(Boolean);
  let acc = 0;
  for (const t of tokens) if (h.includes(t)) acc += 10;
  return acc;
}

export function searchAll(query: string): SearchHit[] {
  const hits: SearchHit[] = [];
  const q = query.trim();
  if (q.length < 2) return [];

  for (const a of asanas) {
    const s = Math.max(score(q, a.english), score(q, a.sanskrit), score(q, a.description) / 2);
    if (s > 0)
      hits.push({
        kind: "asana",
        title: `${a.english} (${a.sanskrit})`,
        subtitle: a.description,
        href: "/yoga/asanas/$slug",
        hrefParams: { slug: a.slug },
        score: s,
      });
  }
  for (const t of traditions) {
    const sc = Math.max(score(q, t.name), score(q, t.description) / 2);
    if (sc > 0)
      hits.push({
        kind: "tradition",
        title: t.name,
        subtitle: t.description,
        href: "/yoga/philosophy",
        score: sc,
      });
  }
  for (const s of studies) {
    const sc = Math.max(score(q, s.title), score(q, s.findings) / 2, score(q, s.authors) / 3);
    if (sc > 0)
      hits.push({
        kind: "study",
        title: s.title,
        subtitle: `${s.authors} — ${s.journal} (${s.year})`,
        href: "/yoga/anatomy",
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
        href: "/yoga/resources",
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
        href: "/yoga/resources",
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
        href: "/yoga/goals/$goalId",
        hrefParams: { goalId: g.id },
        score: sc,
      });
  }
  for (const t of sacredTexts) {
    const sc = Math.max(score(q, t.title), score(q, t.summary) / 2);
    if (sc > 0)
      hits.push({
        kind: "text",
        title: t.title,
        subtitle: t.summary,
        href: "/yoga/philosophy",
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
        href: "/yoga/resources",
        score: sc,
      });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, 16);
}
