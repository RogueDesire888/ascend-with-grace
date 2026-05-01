import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Compass,
  Flame,
  HeartPulse,
  Infinity,
  Library,
  Mountain,
  ScrollText,
  Shield,
  Sparkles,
  Star,
  Users,
  Waves,
  Wind,
} from "lucide-react";
import { QuestPath, type QuestLevel, type QuestBadge } from "@/components/platform/QuestPath";

const taiChiLevels: QuestLevel[] = [
  {
    id: "tc-l1",
    number: 1,
    title: "Shape",
    subtitle: "Memorize the form, soften the shoulders",
    quote: "“Stand like a mountain, move like a river.”",
    Icon: Mountain,
    quests: [
      "Stand in Wuji posture for 5 minutes daily for 7 days.",
      "Memorize the first 8 movements of a short form.",
      "Complete the short form once without stopping.",
      "Identify and name the 8 gates (Peng, Lu, Ji, An, Cai, Lie, Zhou, Kao).",
    ],
  },
  {
    id: "tc-l2",
    number: 2,
    title: "Breath",
    subtitle: "Coordinate breath with rising and sinking",
    quote: "“Breath leads qi; qi leads movement.”",
    Icon: Wind,
    quests: [
      "Practice natural abdominal breathing for 10 minutes daily.",
      "Sync breath with openings and closings of the form.",
      "Complete the form with synchronized breath, no gasping.",
      "Hold single-hand contact (push hands) for 3 minutes with a partner or wall.",
    ],
  },
  {
    id: "tc-l3",
    number: 3,
    title: "Energy",
    subtitle: "Develop jin and listening energy",
    quote: "“Soft outside, structured within.”",
    Icon: Waves,
    quests: [
      "Train silk-reeling (chan si jin) circles for 10 minutes daily for 2 weeks.",
      "Practice fixed-step push hands focusing on listening (ting jin).",
      "Feel a clear silk-reeling sensation in solo form.",
      "Redirect a partner's force in fixed step without forcing.",
    ],
  },
  {
    id: "tc-l4",
    number: 4,
    title: "Spirit",
    subtitle: "Intention leads movement",
    quote: "“The eyes carry the intent; the body follows.”",
    Icon: Star,
    quests: [
      "Practice the form with eyes closed and remain stable.",
      "Lead a movement with intention (yi) before muscle.",
      "Neutralize most moving-step pushes from a partner.",
      "Sit in stillness for 15 minutes after each form.",
    ],
  },
  {
    id: "tc-l5",
    number: 5,
    title: "Return to Simplicity",
    subtitle: "Wu wei — moving without forcing",
    quote: "“When the opponent is hard, I am soft. When they move, I follow.”",
    Icon: Infinity,
    quests: [
      "Practice spontaneous movement without fixed sequence.",
      "Yield and redirect automatically in freestyle push hands.",
      "Maintain a daily practice for 30 days unbroken.",
      "Teach a beginner the first 3 movements with patience.",
    ],
  },
];

const taiChiBadges: QuestBadge[] = [
  { id: "tc-mountain-stance", name: "Mountain Stance", level: 1, Icon: Mountain },
  { id: "tc-breath-keeper", name: "Breath Keeper", level: 2, Icon: Wind },
  { id: "tc-silk-reeler", name: "Silk Reeler", level: 3, Icon: Waves },
  { id: "tc-quiet-mind", name: "Quiet Mind", level: 4, Icon: Star },
  { id: "tc-flowing-water", name: "Flowing Water", level: 5, Icon: Infinity },
];

const taiChiClasses = ["Beginner", "Student", "Practitioner", "Adept", "Master"];


export const Route = createFileRoute("/tai-chi-lab")({
  head: () => ({
    meta: [
      { title: "Tai Chi Mastery Blueprint - Ascend" },
      {
        name: "description",
        content:
          "A complete Tai Chi knowledge base covering history, family styles, lineage, mastery levels, martial principles, health evidence, and practice schedules.",
      },
    ],
  }),
  component: TaiChiLab,
});

const toc = [
  ["part1", "Origins & Evolution"],
  ["part2", "Five Styles & Literature"],
  ["part3", "Lineage Holders"],
  ["part4", "Five Levels of Mastery"],
  ["part5", "Martial Core"],
  ["part6", "Health, Science & Philosophy"],
  ["part7", "Master's Ecosystem"],
  ["part8", "Practice Schedules"],
  ["part9", "Glossary"],
  ["part10", "The Unending Path"],
];

const styles = [
  ["Chen", "Chen Wangting", "Explosive power, silk-reeling spirals, low stances"],
  ["Yang", "Yang Luchan", "Slow, even, expansive, and widely practiced"],
  ["Wu/Hao", "Wu Yuxiang", "Small, refined, high stances"],
  ["Wu", "Wu Quanyou / Wu Jianquan", "Leaning postures, small circles, agility"],
  ["Sun", "Sun Lutang", "Lively footwork from Xingyi and Bagua, open-close hands"],
];

const masteryLevels = [
  ["Level 1: Shape", "Memorize a short form, practice Wuji standing, soften shoulders, and complete the form without stopping."],
  ["Level 2: Breath", "Coordinate natural abdominal breathing with openings, closings, rising, and sinking."],
  ["Level 3: Energy", "Develop whole-body power, fixed-step push hands, listening energy, and connected movement."],
  ["Level 4: Spirit", "Let intention lead movement, stabilize eyes-closed form, and redirect without forcing."],
  ["Level 5: Return to Simplicity", "Move spontaneously with wu wei, beyond fixed sequence or visible style."],
];

const healthEvidence = [
  ["Blood pressure", "Yang 24, 5x/week, 6 months", "Systolic -11 mmHg, diastolic -6 mmHg"],
  ["Knee osteoarthritis", "12-week Tai Chi vs. PT", "WOMAC pain down 34%"],
  ["Fall prevention", "Meta-analysis of 25 trials", "About 50% reduction in falls"],
  ["Depression", "12 trials, mild-moderate", "Large effect size reported"],
  ["Cognition", "24-week Tai Chi, MoCA score", "+1.8 points in one protocol"],
];

const glossary = [
  ["Wuji", "Undifferentiated stillness before movement."],
  ["Taiji", "The supreme ultimate, first separation of yin and yang."],
  ["Qi", "Vital energy moved by breath, posture, and intention."],
  ["Dantian", "Lower energy center, traditionally below the navel."],
  ["Jin", "Whole-body internal power."],
  ["Fa jin", "Explosive release of stored jin."],
  ["Chan si jin", "Silk-reeling spiral energy."],
  ["Ting jin", "Listening energy or tactile sensitivity."],
  ["Song", "Active relaxation without collapse."],
  ["Peng", "Ward-off, upward expansive circle."],
];

function TaiChiLab() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <article className="overflow-hidden rounded-lg border border-border/70 bg-card/80 shadow-[var(--shadow-soft)] backdrop-blur-xl">
        <header className="bg-[linear-gradient(135deg,#173635,#315d4d)] px-6 py-12 text-center text-white sm:px-10">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-white/30 bg-white/15">
            <Sparkles className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
            The Complete Tai Chi Mastery Blueprint
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-white/82">
            From absolute beginner to the return of simplicity: a structured knowledge base for
            history, lineage, health, martial science, and daily practice.
          </p>
        </header>

        <nav className="border-b border-border/70 bg-secondary/70 px-5 py-5" aria-label="Tai Chi table of contents">
          <h2 className="text-lg font-bold text-secondary-foreground">Table of Contents</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {toc.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full border border-border/70 bg-background/65 px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        <div className="space-y-8 p-5 sm:p-8">
          <LabSection id="part1" title="Origins & Evolution" Icon={ScrollText}>
            <p>
              <strong>Chen Wangting (1597-1664)</strong>, a Ming Dynasty general, is the verified
              founder of Tai Chi Chuan. In Chen Village, he synthesized martial arts, Taoist
              yin-yang philosophy, meridian theory, and qigong into the first Chen-style forms.
            </p>
            <p>
              The Zhang Sanfeng origin story is a later legend popularized in Yang family manuals.
              The historical spread moved from Chen to Yang, Wu/Hao, Wu, and Sun family styles.
            </p>
            <DataTable
              headers={["Style", "Founder", "Key traits"]}
              rows={styles}
            />
          </LabSection>

          <LabSection id="part2" title="Five Styles & Foundational Literature" Icon={BookOpen}>
            <DataTable
              headers={["Style", "Stance", "Power", "Best for"]}
              rows={[
                ["Chen", "Low/wide", "Explosive fa jin", "Martial root, dynamic health"],
                ["Yang", "Medium/open", "Hidden/internal", "General health, stress reduction"],
                ["Wu/Hao", "High/narrow", "Very subtle", "Scholarly practice, elderly students"],
                ["Wu", "High", "Soft circles", "Agility"],
                ["Sun", "High", "Springy", "Integration with Xingyi and Bagua"],
              ]}
            />
            <CardGrid
              items={[
                ["Beginner: Shape", "Tai Chi for Dummies, then The Complete Book of Tai Chi Chuan."],
                ["Intermediate: Qi and Jin", "Tai Chi Classics, then Chen Style Taijiquan: The Source."],
                ["Advanced: Shen and Return", "Chen Taijiquan Illustrated and lineage-based correction."],
              ]}
            />
          </LabSection>

          <LabSection id="part3" title="Lineage Holders & Living Traditions" Icon={Users}>
            <p>
              Chen Fake carried Chen style into Beijing. Chen Xiaowang and Chen Zhenglei shaped
              modern Chen spread. Yang Jun continues Yang family teaching through the Yang Family
              Tai Chi Association.
            </p>
            <div className="rounded-md border border-border/60 bg-secondary/45 p-4">
              <p className="font-semibold text-foreground">Teacher verification</p>
              <p className="mt-2 text-muted-foreground">
                Ask for a lineage chart, look for posture correction, and verify official
                associations when possible.
              </p>
            </div>
          </LabSection>

          <LabSection id="part4" title="The Five Levels of Mastery" Icon={Compass}>
            <CardGrid items={masteryLevels} />
            <p>
              Each level commonly takes one to three years of daily practice with a qualified
              teacher. The art deepens through breath, patience, correction, and repetition.
            </p>
          </LabSection>

          <LabSection id="part5" title="The Martial Core: Thirteen Postures" Icon={Shield}>
            <p>
              The eight gates are Peng, Lu, Ji, An, Cai, Lie, Zhou, and Kao. The five steps are
              advance, retreat, look left, look right, and central equilibrium.
            </p>
            <CardGrid
              items={[
                ["Single-hand fixed step", "Develop sticking and listening."],
                ["Two-hand fixed step", "Train the four gates: peng, lu, ji, and an."],
                ["Moving step", "Maintain root while changing distance."],
                ["Freestyle", "Apply without fixed pattern while preserving softness."],
              ]}
            />
          </LabSection>

          <LabSection id="part6" title="Health, Science & Philosophy" Icon={HeartPulse}>
            <p>
              Tai Chi is built from yin-yang, qi, intention, and wu wei. The classics ask the whole
              body to be light, agile, and connected as if threaded on a string.
            </p>
            <DataTable headers={["Health domain", "Evidence", "Reported effect"]} rows={healthEvidence} />
          </LabSection>

          <LabSection id="part7" title="The Master's Ecosystem" Icon={Library}>
            <CardGrid
              items={[
                ["Green flags", "A teacher can name lineage, correct posture, and explain application."],
                ["Digital tools", "Slow-motion form apps, posture models, and side-by-side video review."],
                ["Events", "World Tai Chi Championships, Chen Village tournaments, and Tai Chi symposiums."],
                ["Archival media", "Chen Village, Fu Zhongwen Yang Long Form, and The Professor."],
              ]}
            />
          </LabSection>

          <LabSection id="part8" title="Daily Practice Schedules & Milestones" Icon={CalendarDays}>
            <DataTable
              headers={["Level", "Solo form test", "Push hands test"]}
              rows={[
                ["1 Shape", "Complete short form without omissions", "-"],
                ["2 Breath", "Synchronized breath with no gasping", "Single-hand contact for 3 minutes"],
                ["3 Jin", "Clear silk-reeling sensation", "Redirect partner in fixed step"],
                ["4 Shen", "Stable eyes-closed form", "Neutralize most moving-step pushes"],
                ["5 Wu Wei", "Spontaneous movement", "Yield and redirect automatically"],
              ]}
            />
          </LabSection>

          <LabSection id="part9" title="Glossary of Essential Terms" Icon={CheckCircle2}>
            <div className="grid gap-3 md:grid-cols-2">
              {glossary.map(([term, definition]) => (
                <div key={term} className="rounded-md border border-border/60 bg-background/55 p-4">
                  <span className="rounded bg-secondary px-2 py-1 font-mono text-sm font-bold text-secondary-foreground">
                    {term}
                  </span>
                  <p className="mt-3 text-sm text-muted-foreground">{definition}</p>
                </div>
              ))}
            </div>
          </LabSection>

          <LabSection id="part10" title="The Unending Path" Icon={Infinity}>
            <p>
              A document cannot replace daily practice and a living teacher. Start where you are:
              stand in wuji for five minutes today, breathe, sink, and begin.
            </p>
            <blockquote className="rounded-md border-l-4 border-primary bg-secondary/45 p-4 text-muted-foreground">
              When the opponent is hard, I am soft. When the opponent moves, I follow.
            </blockquote>
          </LabSection>
        </div>

        <footer className="border-t border-border/70 bg-secondary/55 px-6 py-6 text-center text-sm text-muted-foreground">
          The Ultimate Tai Chi Reference: history, lineage teachings, modern science, and practice
          structure. The art lives through practice.
        </footer>
      </article>
    </div>
  );
}

function LabSection({
  id,
  title,
  Icon,
  children,
}: {
  id: string;
  title: string;
  Icon: typeof Sparkles;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 rounded-lg border border-border/70 bg-background/55 p-5">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="space-y-4 text-muted-foreground">{children}</div>
    </section>
  );
}

function CardGrid({ items }: { items: string[][] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map(([title, body]) => (
        <div key={title} className="rounded-md border border-border/60 bg-secondary/35 p-4">
          <h3 className="font-bold text-foreground">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{body}</p>
        </div>
      ))}
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-border/70">
      <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
        <thead className="bg-secondary/70 text-secondary-foreground">
          <tr>
            {headers.map((header) => (
              <th key={header} className="border-b border-border/70 px-4 py-3 font-bold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("-")} className="odd:bg-background/40 even:bg-card/25">
              {row.map((cell) => (
                <td key={cell} className="border-b border-border/50 px-4 py-3 text-muted-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
