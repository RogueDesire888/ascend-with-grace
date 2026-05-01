import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  BookOpen,
  Brain,
  CheckCircle2,
  ClipboardList,
  Compass,
  Eye,
  Flame,
  Flower2,
  GraduationCap,
  HeartPulse,
  Home,
  Leaf,
  Library,
  Mountain,
  NotebookPen,
  Search,
  Settings2,
  Sparkles,
  Sun,
  Wind,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { QuestPath, type QuestLevel, type QuestBadge } from "@/components/platform/QuestPath";

export const Route = createFileRoute("/yoga-therapy-lab")({
  head: () => ({
    meta: [
      { title: "Yoga Therapy Lab - Ascend" },
      {
        name: "description",
        content:
          "An interactive yoga therapy resource with philosophy, condition protocols, practice libraries, and a sequence generator.",
      },
    ],
  }),
  component: YogaTherapyLab,
});

type ConditionKey =
  | "clbp"
  | "hypertension"
  | "anxiety"
  | "ra"
  | "ms"
  | "cancer_fatigue"
  | "metabolic_syndrome"
  | "schizophrenia"
  | "fibromyalgia"
  | "type2_diabetes";

type LabSection = "home" | "philosophy" | "libraries" | "conditions" | "generator" | "training" | "cpd";

type Condition = {
  name: string;
  citation: string;
  asanas: string;
  pranayama: string;
  meditation: string;
  contraindications: string;
};

const conditionData: Record<ConditionKey, Condition> = {
  clbp: {
    name: "Chronic Low Back Pain",
    citation: "2025 meta-analysis: yoga ranked highly among exercise options for LBP",
    asanas: "Cat-Cow, Child's Pose, Supine Hamstring Stretch, Bridge with block",
    pranayama: "1:1 natural breath",
    meditation: "Breath awareness for pain observation",
    contraindications: "Deep forward folds",
  },
  hypertension: {
    name: "Hypertension",
    citation: "2025 umbrella review: yoga and breathing practices may reduce BP",
    asanas: "Legs-up-wall, supine bound angle",
    pranayama: "1:2 exhale",
    meditation: "Body scan",
    contraindications: "Head-down inversions",
  },
  anxiety: {
    name: "Anxiety",
    citation: "2026 RCT: 8-week program associated with anxiety reduction",
    asanas: "Forward fold with bent knees, Child's Pose",
    pranayama: "1:2 exhale",
    meditation: "Labeling thoughts",
    contraindications: "Rapid breathing",
  },
  ra: {
    name: "Rheumatoid Arthritis",
    citation: "2025 study: reported changes in inflammatory markers",
    asanas: "Joint-freeing, reclining bound angle",
    pranayama: "1:1",
    meditation: "Metta toward joints",
    contraindications: "Weight-bearing on wrists",
  },
  ms: {
    name: "Multiple Sclerosis",
    citation: "2025 integrated program: improved balance and fatigue measures",
    asanas: "Chair poses, ankle pumps",
    pranayama: "Cooling breath",
    meditation: "Energy visualization",
    contraindications: "Overheating",
  },
  cancer_fatigue: {
    name: "Cancer-Related Fatigue",
    citation: "2025 review: yoga may help alleviate fatigue",
    asanas: "Supine restorative, legs-up-wall",
    pranayama: "Viloma",
    meditation: "Safe place imagery",
    contraindications: "Overexertion",
  },
  metabolic_syndrome: {
    name: "Metabolic Syndrome",
    citation: "2025 review: improved cardiometabolic markers in some studies",
    asanas: "Low-impact sun salutations",
    pranayama: "Kapalabhati with caution",
    meditation: "Cue for stress-eating",
    contraindications: "Adapt for blood pressure, joints, and glucose status",
  },
  schizophrenia: {
    name: "Schizophrenia Spectrum",
    citation: "2026 RCT: yoga-based intervention reduced symptom measures",
    asanas: "Structured Warrior I and II, grounded standing poses",
    pranayama: "1:1",
    meditation: "Mantra: I am safe",
    contraindications: "Chaotic pacing",
  },
  fibromyalgia: {
    name: "Fibromyalgia",
    citation: "2025 review: yoga may be a beneficial adjunct",
    asanas: "Very slow mindful movement, Child's Pose",
    pranayama: "1:1",
    meditation: "Pain versus suffering distinction",
    contraindications: "Overstimulation",
  },
  type2_diabetes: {
    name: "Type 2 Diabetes",
    citation: "2025 review: yoga may support glycemic control",
    asanas: "Seated twists, Cobra",
    pranayama: "Mild Bhastrika",
    meditation: "Breath counting",
    contraindications: "Hypoglycemia precautions",
  },
};

const sections: Array<{ id: LabSection; label: string; Icon: typeof Home }> = [
  { id: "home", label: "Home", Icon: Home },
  { id: "philosophy", label: "8 Limbs", Icon: BookOpen },
  { id: "libraries", label: "Libraries", Icon: Library },
  { id: "conditions", label: "Conditions", Icon: HeartPulse },
  { id: "generator", label: "Generator", Icon: Settings2 },
  { id: "training", label: "200H TT", Icon: GraduationCap },
  { id: "cpd", label: "CPD", Icon: ClipboardList },
];

const yamas = [
  ["Ahimsa", "Non-harming", "Practice kind, non-coercive effort in body and speech."],
  ["Satya", "Truthfulness", "Teach from what is known, observed, and honestly felt."],
  ["Asteya", "Non-stealing", "Respect time, energy, attention, and consent."],
  ["Brahmacharya", "Right use of energy", "Channel effort toward steadiness rather than excess."],
  ["Aparigraha", "Non-hoarding", "Release attachment to outcome and comparison."],
];

const pranayama = [
  ["Sama Vritti", "Box breathing with equal phases; avoid long holds for anxious or hypertensive students."],
  ["Dirgha", "Three-part breath; gentle baseline practice for most students."],
  ["Nadi Shodhana", "Alternate nostril breathing; keep ratios simple and comfortable."],
  ["Ujjayi", "Soft ocean breath for focus; avoid strain or breath gripping."],
  ["Bhramari", "Humming breath for downshifting and inward attention."],
  ["Kapalabhati", "Stimulating breath; avoid with uncontrolled hypertension or pregnancy."],
];

const yogaLevels: QuestLevel[] = [
  {
    id: "yoga-l1",
    number: 1,
    title: "Grounding",
    subtitle: "Breath, posture, and presence",
    quote: "“Sthira sukham asanam — steadiness and ease.”",
    Icon: Mountain,
    quests: [
      "Sit in easy pose for 5 minutes daily for one week.",
      "Practice Dirgha (three-part breath) for 10 rounds, 3 times.",
      "Hold Tadasana (Mountain) for 1 minute, scanning posture top to bottom.",
      "Journal one observation about your body each day for 7 days.",
    ],
  },
  {
    id: "yoga-l2",
    number: 2,
    title: "Flow",
    subtitle: "Sun salutations & breath linking",
    quote: "“Move as the breath, breathe as the movement.”",
    Icon: Sun,
    quests: [
      "Learn Surya Namaskar A (Sun Salutation A) end to end.",
      "Complete 3 rounds linking each movement to one breath.",
      "Practice Cat-Cow daily for 7 days as a warm-up.",
      "Add a 5-minute Savasana to every session.",
    ],
  },
  {
    id: "yoga-l3",
    number: 3,
    title: "Strength & Balance",
    subtitle: "Warriors, balance, and edges",
    quote: "“The pose begins where you want to leave it.”",
    Icon: Flame,
    quests: [
      "Hold Warrior I and Warrior II for 5 breaths on each side.",
      "Balance in Tree pose (Vrksasana) for 30 seconds each side.",
      "Try Half Moon (Ardha Chandrasana) with a wall or block.",
      "Practice Nadi Shodhana (alternate nostril) for 5 minutes.",
      "Build a 20-minute home practice and complete it 3 times.",
    ],
  },
  {
    id: "yoga-l4",
    number: 4,
    title: "Therapeutic Eye",
    subtitle: "Condition-aware design",
    quote: "“The right posture in the wrong body is still the wrong posture.”",
    Icon: HeartPulse,
    quests: [
      "Pick one condition from the Conditions library and study its citation.",
      "Use the Sequence Generator to draft a 4-week protocol.",
      "Identify two contraindications you must respect for that condition.",
      "Teach the sequence (or self-practice it) once and journal what you learned.",
    ],
  },
  {
    id: "yoga-l5",
    number: 5,
    title: "Integration",
    subtitle: "A living daily practice",
    quote: "“Yoga is the journey of the self, through the self, to the self.”",
    Icon: Flower2,
    quests: [
      "Maintain a 20-minute self-practice 5 days/week for 2 weeks.",
      "Write a Yama reflection in the Training section.",
      "Lead a friend or family member through a 15-minute gentle sequence.",
      "Choose a personal mantra and pair it with breath for 7 days.",
    ],
  },
];

const yogaBadges: QuestBadge[] = [
  { id: "yoga-breath-keeper", name: "Breath Keeper", level: 1, Icon: Wind },
  { id: "yoga-sun-walker", name: "Sun Walker", level: 2, Icon: Sun },
  { id: "yoga-steady-warrior", name: "Steady Warrior", level: 3, Icon: Flame },
  { id: "yoga-healers-eye", name: "Healer's Eye", level: 4, Icon: Eye },
  { id: "yoga-daily-devotee", name: "Daily Devotee", level: 5, Icon: Flower2 },
];

const yogaClasses = ["Seeker", "Student", "Practitioner", "Therapist", "Teacher"];


  const [activeSection, setActiveSection] = useState<LabSection>("home");
  const [search, setSearch] = useState("");
  const [primaryCondition, setPrimaryCondition] = useState<ConditionKey | "">("");
  const [secondaryCondition, setSecondaryCondition] = useState<ConditionKey | "">("");
  const [showPose, setShowPose] = useState(false);
  const [reflection, setReflection] = useState("");
  const [reflectionSaved, setReflectionSaved] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("yamaReflection");
    if (saved) setReflection(saved);
  }, []);

  const conditionEntries = Object.entries(conditionData) as Array<[ConditionKey, Condition]>;
  const filteredConditions = useMemo(
    () =>
      conditionEntries.filter(([, condition]) =>
        condition.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [conditionEntries, search],
  );

  const generatedConditions = useMemo(() => {
    if (!primaryCondition) return [];
    return secondaryCondition ? [primaryCondition, secondaryCondition] : [primaryCondition];
  }, [primaryCondition, secondaryCondition]);

  const saveReflection = () => {
    window.localStorage.setItem("yamaReflection", reflection);
    setReflectionSaved(true);
    window.setTimeout(() => setReflectionSaved(false), 2200);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-lg border border-border/70 bg-card/80 shadow-[var(--shadow-soft)] backdrop-blur-xl">
        <div className="border-b border-border/60 bg-background/70 px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" />
                Yoga Therapy Lab
              </div>
              <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                Evidence-informed yoga resources for teachers and practitioners.
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
              {sections.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveSection(id)}
                  className={`inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition-colors ${
                    activeSection === id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/70 bg-background/70 text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6 lg:p-8">
          {activeSection === "home" && <HomeSection />}
          {activeSection === "philosophy" && <PhilosophySection />}
          {activeSection === "libraries" && (
            <LibrariesSection showPose={showPose} onTogglePose={() => setShowPose((value) => !value)} />
          )}
          {activeSection === "conditions" && (
            <ConditionsSection
              filteredConditions={filteredConditions}
              search={search}
              onSearchChange={setSearch}
            />
          )}
          {activeSection === "generator" && (
            <GeneratorSection
              generatedConditions={generatedConditions}
              primaryCondition={primaryCondition}
              secondaryCondition={secondaryCondition}
              setPrimaryCondition={(value) => {
                setPrimaryCondition(value);
                if (secondaryCondition === value) setSecondaryCondition("");
              }}
              setSecondaryCondition={setSecondaryCondition}
            />
          )}
          {activeSection === "training" && (
            <TrainingSection
              reflection={reflection}
              reflectionSaved={reflectionSaved}
              setReflection={setReflection}
              saveReflection={saveReflection}
            />
          )}
          {activeSection === "cpd" && <CpdSection />}
        </div>
      </section>
    </div>
  );
}

function HomeSection() {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <InfoPanel>
        <p className="text-lg text-muted-foreground">
          A compact lab for yoga philosophy, condition-aware practice design, pranayama, teacher
          training samples, and continuing education modules.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            "Peer-reviewed references noted for every protocol",
            "Condition and contraindication-aware sequencing",
            "Teacher training and CPD sample modules",
            "Pose and pranayama libraries in one workspace",
          ].map((item) => (
            <div key={item} className="flex gap-3 rounded-md border border-border/60 bg-background/50 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm font-medium text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </InfoPanel>
      <InfoPanel title="Clinical Caution" Icon={AlertTriangle}>
        <p className="text-muted-foreground">
          This content is educational and should not replace medical care. Students with health
          conditions should work with qualified clinicians and experienced yoga professionals.
        </p>
      </InfoPanel>
    </div>
  );
}

function PhilosophySection() {
  return (
    <div className="space-y-5">
      <InfoPanel title="Yama - Social Ethics" Icon={HeartPulse}>
        <div className="grid gap-3 md:grid-cols-2">
          {yamas.map(([name, meaning, description]) => (
            <div key={name} className="rounded-md border border-border/60 bg-background/50 p-4">
              <h3 className="font-bold text-foreground">{name}</h3>
              <p className="text-sm font-semibold text-primary">{meaning}</p>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </InfoPanel>
      <InfoPanel title="Niyama - Personal Observances" Icon={NotebookPen}>
        <p className="text-muted-foreground">
          Saucha, Santosha, Tapas, Svadhyaya, and Ishvara Pranidhana offer a practical framework
          for cleanliness, contentment, discipline, self-study, and surrender.
        </p>
      </InfoPanel>
      <InfoPanel title="Asana to Samadhi" Icon={Brain}>
        <p className="text-muted-foreground">
          Asana builds steadiness and ease. Pranayama refines breath. Pratyahara, Dharana, Dhyana,
          and Samadhi move progressively from sensory withdrawal toward integrated awareness.
        </p>
      </InfoPanel>
    </div>
  );
}

function LibrariesSection({ showPose, onTogglePose }: { showPose: boolean; onTogglePose: () => void }) {
  return (
    <div className="space-y-5">
      <InfoPanel title="Master Pose Library" Icon={Activity}>
        <p className="text-muted-foreground">
          Selected asanas include contraindications, modifications, and breath hints. Savasana may
          be modified with a blanket or bolster under the knees for low-back comfort.
        </p>
        <button
          type="button"
          onClick={onTogglePose}
          className="mt-4 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          {showPose ? "Hide sample pose" : "Show sample pose"}
        </button>
        {showPose && (
          <div className="mt-4 rounded-md border border-border/60 bg-secondary/50 p-4">
            <h3 className="font-bold text-foreground">Balasana - Child's Pose</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Often calming for anxiety. Modify with knees wide and arms forward. Avoid or adapt
              when it aggravates low-back, knee, or blood-pressure symptoms.
            </p>
          </div>
        )}
      </InfoPanel>
      <InfoPanel title="Pranayama Library" Icon={Wind}>
        <div className="grid gap-3 md:grid-cols-2">
          {pranayama.map(([name, detail]) => (
            <div key={name} className="rounded-md border border-border/60 bg-background/50 p-4">
              <h3 className="font-bold text-foreground">{name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
            </div>
          ))}
        </div>
      </InfoPanel>
    </div>
  );
}

function ConditionsSection({
  filteredConditions,
  search,
  onSearchChange,
}: {
  filteredConditions: Array<[ConditionKey, Condition]>;
  search: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search conditions"
          className="h-12 w-full rounded-md border border-border/70 bg-background/75 pl-11 pr-4 text-foreground outline-none transition-colors focus:border-primary"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {filteredConditions.map(([id, condition]) => (
          <ConditionCard key={id} condition={condition} />
        ))}
      </div>
    </div>
  );
}

function GeneratorSection({
  generatedConditions,
  primaryCondition,
  secondaryCondition,
  setPrimaryCondition,
  setSecondaryCondition,
}: {
  generatedConditions: ConditionKey[];
  primaryCondition: ConditionKey | "";
  secondaryCondition: ConditionKey | "";
  setPrimaryCondition: (value: ConditionKey | "") => void;
  setSecondaryCondition: (value: ConditionKey | "") => void;
}) {
  const primary = primaryCondition ? conditionData[primaryCondition] : null;
  const meditationFocus = generatedConditions
    .map((condition) => conditionData[condition].meditation)
    .join(" / ");

  return (
    <div className="space-y-5">
      <InfoPanel title="Dynamic Sequence Generator" Icon={Settings2}>
        <div className="grid gap-4 md:grid-cols-2">
          <SelectField
            label="Primary condition"
            value={primaryCondition}
            onChange={(value) => setPrimaryCondition(value as ConditionKey | "")}
          />
          <SelectField
            label="Secondary condition"
            value={secondaryCondition}
            onChange={(value) => setSecondaryCondition(value as ConditionKey | "")}
            excluded={primaryCondition}
          />
        </div>
      </InfoPanel>
      {!primary && (
        <div className="rounded-md border border-amber-300/60 bg-amber-500/10 p-4 text-sm text-amber-900 dark:text-amber-100">
          Select a primary condition to generate a sequence.
        </div>
      )}
      {primary && (
        <InfoPanel title="Generated Sequence" Icon={Sparkles}>
          {generatedConditions.length > 1 && (
            <div className="mb-4 rounded-md border border-amber-300/60 bg-amber-500/10 p-4 text-sm text-amber-900 dark:text-amber-100">
              Two conditions selected. Combine cautiously, avoid pain, and keep intensity low.
            </div>
          )}
          <div className="grid gap-3 md:grid-cols-2">
            <ResultItem label="Pranayama" value={primary.pranayama} />
            <ResultItem label="Asana sequence" value={primary.asanas} />
            <ResultItem label="Meditation focus" value={meditationFocus} />
            <ResultItem label="Frequency" value="4-5x/week, 20-30 minutes, adapted to tolerance" />
          </div>
        </InfoPanel>
      )}
    </div>
  );
}

function TrainingSection({
  reflection,
  reflectionSaved,
  setReflection,
  saveReflection,
}: {
  reflection: string;
  reflectionSaved: boolean;
  setReflection: (value: string) => void;
  saveReflection: () => void;
}) {
  return (
    <InfoPanel title="200-Hour TT: Lesson 1.3 - Yama" Icon={GraduationCap}>
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-foreground">Ahimsa - Non-harming</h3>
          <p className="mt-2 text-muted-foreground">
            Practice: replace self-criticism with a simple phrase such as, “May I be safe.”
          </p>
        </div>
        <label className="block">
          <span className="text-sm font-semibold text-foreground">Reflection journal</span>
          <textarea
            value={reflection}
            onChange={(event) => setReflection(event.target.value)}
            rows={4}
            className="mt-2 w-full rounded-md border border-border/70 bg-background/75 p-3 text-foreground outline-none transition-colors focus:border-primary"
            placeholder="Write your journal here..."
          />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={saveReflection}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Save reflection
          </button>
          {reflectionSaved && <p className="text-sm font-semibold text-primary">Saved locally.</p>}
        </div>
        <div className="rounded-md border border-border/60 bg-secondary/50 p-4 text-sm text-muted-foreground">
          Self-assessment: Which yama is violated when a teacher rushes savasana? Asteya, because
          time and completion are being taken from the student.
        </div>
      </div>
    </InfoPanel>
  );
}

function CpdSection() {
  return (
    <InfoPanel title="CPD: Yoga for Chronic Low Back Pain" Icon={ClipboardList}>
      <p className="text-muted-foreground">
        A 30-hour sample module covering pathophysiology, safe asana labs, breath awareness,
        contraindication-aware sequencing, and supervised teaching practicum.
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <ResultItem
          label="Curriculum"
          value="Cat-Cow, Child's Pose, supported Bridge, breath awareness, and sequencing labs"
        />
        <ResultItem label="Sample video" value="Supine hamstring stretch with strap - coming soon" />
      </div>
      <button
        type="button"
        onClick={() => window.alert("Enrollment demo - this would redirect to payment.")}
        className="mt-5 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
      >
        Enroll for $297
      </button>
    </InfoPanel>
  );
}

function InfoPanel({
  title,
  Icon,
  children,
}: {
  title?: string;
  Icon?: typeof Home;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-border/70 bg-background/55 p-5 shadow-[var(--shadow-soft)]">
      {title && (
        <div className="mb-4 flex items-center gap-3">
          {Icon && (
            <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </span>
          )}
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        </div>
      )}
      {children}
    </section>
  );
}

function ConditionCard({ condition }: { condition: Condition }) {
  return (
    <article className="rounded-lg border border-border/70 bg-background/55 p-5">
      <h3 className="text-lg font-bold text-foreground">{condition.name}</h3>
      <p className="mt-2 text-sm font-semibold text-primary">{condition.citation}</p>
      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
        <p>
          <strong className="text-foreground">Asanas:</strong> {condition.asanas}
        </p>
        <p>
          <strong className="text-foreground">Pranayama:</strong> {condition.pranayama}
        </p>
        <p>
          <strong className="text-foreground">Meditation:</strong> {condition.meditation}
        </p>
        <p>
          <strong className="text-foreground">Contraindications:</strong>{" "}
          {condition.contraindications}
        </p>
      </div>
    </article>
  );
}

function SelectField({
  label,
  value,
  excluded,
  onChange,
}: {
  label: string;
  value: string;
  excluded?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-md border border-border/70 bg-background/75 px-3 text-foreground outline-none transition-colors focus:border-primary"
      >
        <option value="">{label === "Primary condition" ? "Select condition" : "None"}</option>
        {(Object.entries(conditionData) as Array<[ConditionKey, Condition]>)
          .filter(([id]) => id !== excluded)
          .map(([id, condition]) => (
            <option key={id} value={id}>
              {condition.name}
            </option>
          ))}
      </select>
    </label>
  );
}

function ResultItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border/60 bg-secondary/40 p-4">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{label}</p>
      <p className="mt-2 text-sm text-muted-foreground">{value}</p>
    </div>
  );
}
