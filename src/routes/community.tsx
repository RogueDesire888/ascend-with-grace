import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Flame,
  Sparkles,
  Users,
  HeartHandshake,
  ShieldCheck,
  Trophy,
  Crown,
  Send,
  CheckCircle2,
  Clock,
  Calendar,
  Award,
  TrendingUp,
} from "lucide-react";
import {
  ranks,
  rankByXp,
  intentionChips,
  challenges,
  seedPosts,
  circles,
  mentors,
  events,
  leaderboards,
  badges,
  rituals,
  livePulse,
  reactionMeta,
  tabMeta,
  type PostTab,
  type Post,
  type ReactionKey,
} from "@/lib/community-data";
import { useCommunity } from "@/lib/community-progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "The Circle — Community | Ascend" },
      {
        name: "description",
        content:
          "A living circle of practitioners. Daily intentions, group challenges, mentors, ranks, and shared rituals — a place to grow together, not perform.",
      },
      { property: "og:title", content: "The Circle — Community | Ascend" },
      {
        property: "og:description",
        content:
          "Set a daily intention, join group challenges, share field notes, and grow alongside a circle that practices.",
      },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-12 px-4 py-10 sm:px-6 lg:py-14">
      <Hero />
      <YourStanding />
      <ActiveChallenges />
      <FeedSection />
      <div className="grid gap-6 lg:grid-cols-2">
        <CirclesSection />
        <MentorsSection />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <EventsSection />
        <RitualsSection />
      </div>
      <Leaderboards />
      <BadgesSection />
      <CodeOfTheCircle />
    </div>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
  const { state, setIntention } = useCommunity();
  const [custom, setCustom] = useState("");

  const today = new Date().toISOString().slice(0, 10);
  const setToday = state.intentionToday?.date === today;

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-primary/30 bg-[var(--gradient-panel)] p-8 shadow-[var(--shadow-aura)] lg:p-12">
      <div className="marble-sheen absolute inset-0 opacity-50" />
      <div className="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">The Circle</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            A place that practices, together.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Not a feed. A circle. People showing up daily — for breath, for plants, for their bodies,
            for each other. Set today's intention and see who's beside you.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Pulse icon={Users} value={livePulse.online.toLocaleString()} label="online now" />
            <Pulse icon={CheckCircle2} value={livePulse.todayCheckIns.toLocaleString()} label="today's check-ins" />
            <Pulse icon={Sparkles} value={`${livePulse.collectiveGlow}%`} label="weekly glow bloom" />
            <Pulse icon={HeartHandshake} value={`+${livePulse.newcomersThisWeek}`} label="new this week" />
          </div>
        </div>

        <div className="rounded-3xl border border-border/60 bg-card/85 p-6 shadow-[var(--shadow-soft)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {setToday ? "Today's intention — set" : "Set today's intention"}
          </p>
          {setToday ? (
            <div className="mt-3">
              <p className="text-lg font-semibold text-foreground">{state.intentionToday?.text}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                +{5} XP · streak {state.streak.count} {state.streak.count === 1 ? "day" : "days"} 🔥
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-3"
                onClick={() => setIntention("custom", "")}
              >
                Change
              </Button>
            </div>
          ) : (
            <>
              <div className="mt-3 flex flex-wrap gap-2">
                {intentionChips.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setIntention(c.id, c.label)}
                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-primary/60 hover:bg-primary/10"
                  >
                    <c.Icon className="h-3.5 w-3.5 text-primary" />
                    {c.label}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (custom.trim()) {
                    setIntention("custom", custom.trim());
                    setCustom("");
                  }
                }}
                className="mt-4 flex gap-2"
              >
                <input
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="Or in your own words…"
                  className="flex-1 rounded-full border border-border/70 bg-background/60 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
                />
                <Button type="submit" size="sm" className="rounded-full">
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Pulse({ icon: Icon, value, label }: { icon: typeof Users; value: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-3 py-1.5 backdrop-blur">
      <Icon className="h-4 w-4 text-primary" />
      <span className="font-semibold text-foreground">{value}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

// ─── Your Standing ──────────────────────────────────────────────────────────
function YourStanding() {
  const { state } = useCommunity();
  const { current, next, progress } = rankByXp(state.xpAllTime);
  const RankIcon = current.Icon;

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={RankIcon}
        label="Circle rank"
        value={current.name}
        sub={next ? `${Math.round(progress)}% to ${next.name}` : "Highest tier"}
        progress={progress}
      />
      <StatCard
        icon={Flame}
        label="Streak"
        value={`${state.streak.count} ${state.streak.count === 1 ? "day" : "days"}`}
        sub={state.streak.graceUsed ? "1 grace day used" : "1 grace day available"}
      />
      <StatCard
        icon={TrendingUp}
        label="XP this week"
        value={`${state.xpThisWeek}`}
        sub={`${state.xpAllTime} all time`}
      />
      <StatCard
        icon={Award}
        label="Badges earned"
        value={`${state.earnedBadges.length} / ${badges.length}`}
        sub="See gallery below"
      />
    </section>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  progress,
}: {
  icon: typeof Flame;
  label: string;
  value: string;
  sub: string;
  progress?: number;
}) {
  return (
    <div className="sanctuary-panel rounded-2xl border border-border/60 p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
      {typeof progress === "number" && (
        <Progress value={progress} className="mt-3 h-1.5" />
      )}
    </div>
  );
}

// ─── Challenges ─────────────────────────────────────────────────────────────
function ActiveChallenges() {
  const { state, joinChallenge, logChallengeDay } = useCommunity();

  return (
    <section>
      <SectionHeading
        eyebrow="Active group challenges"
        title="Move together. Show up easier."
        blurb="Pick one. The collective progress ring fills as the circle finishes each day."
      />
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {challenges.map((c) => {
          const joined = state.joinedChallenges.includes(c.id);
          const days = state.challengeDays[c.id] ?? 0;
          const personalPct = Math.min(100, (days / c.days) * 100);
          return (
            <article key={c.id} className="quest-panel-air rounded-3xl border border-border/60 p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-widest text-foreground">
                  {c.modality}
                </span>
                <span className="text-xs text-muted-foreground">{c.daysLeft}d left</span>
              </div>
              <h3 className="mt-3 text-xl font-bold text-foreground">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.blurb}</p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Circle progress</span>
                  <span className="font-semibold text-foreground">{c.collectiveProgress}%</span>
                </div>
                <Progress value={c.collectiveProgress} className="h-1.5" />

                {joined && (
                  <>
                    <div className="flex items-center justify-between pt-2 text-xs">
                      <span className="text-muted-foreground">Your days</span>
                      <span className="font-semibold text-foreground">
                        {days} / {c.days}
                      </span>
                    </div>
                    <Progress value={personalPct} className="h-1.5" />
                  </>
                )}
              </div>

              <p className="mt-4 rounded-xl border border-border/50 bg-background/40 p-3 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Today: </span>
                {c.dailyAction}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{c.joined.toLocaleString()} joined</span>
                {joined ? (
                  <Button size="sm" onClick={() => logChallengeDay(c.id)}>
                    Log today (+20 XP)
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => joinChallenge(c.id)}>
                    Join challenge
                  </Button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

// ─── Feed ───────────────────────────────────────────────────────────────────
function FeedSection() {
  const { state, react, compose, recordReply } = useCommunity();
  const [tab, setTab] = useState<PostTab>("for-you");
  const [composer, setComposer] = useState("");
  const [composerTab, setComposerTab] = useState<"wins" | "questions" | "logs" | "field-notes">("wins");
  const [composerModality, setComposerModality] = useState("Breathwork");

  const allPosts: Post[] = useMemo(() => {
    const composed: Post[] = state.composedPosts.map((c) => ({
      id: c.id,
      tab: c.tab,
      author: state.displayName || "You",
      rank: rankByXp(state.xpAllTime).current.name,
      modality: c.modality,
      body: c.body,
      postedAgo: "just now",
      reactions: { glow: 0, resonate: 0, bow: 0, amplify: 0 },
      replies: 0,
    }));
    return [...composed, ...seedPosts];
  }, [state.composedPosts, state.displayName, state.xpAllTime]);

  const filtered = tab === "for-you" ? allPosts : allPosts.filter((p) => p.tab === tab);

  return (
    <section>
      <SectionHeading
        eyebrow="The feed"
        title="What the circle is sharing right now."
        blurb="Glow, resonate, bow, amplify — reactions that mean something."
      />

      {/* Composer */}
      <div className="mt-6 rounded-3xl border border-border/60 bg-card/70 p-5 shadow-[var(--shadow-soft)]">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={composerTab}
            onChange={(e) => setComposerTab(e.target.value as typeof composerTab)}
            className="rounded-full border border-border/70 bg-background/60 px-3 py-1.5 text-xs text-foreground"
          >
            <option value="wins">Win</option>
            <option value="questions">Question</option>
            <option value="logs">Practice log</option>
            <option value="field-notes">Field note</option>
          </select>
          <select
            value={composerModality}
            onChange={(e) => setComposerModality(e.target.value)}
            className="rounded-full border border-border/70 bg-background/60 px-3 py-1.5 text-xs text-foreground"
          >
            {["Breathwork", "Herbal", "Smoothies", "Yoga", "Tai Chi", "Stillness"].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <textarea
          value={composer}
          onChange={(e) => setComposer(e.target.value)}
          placeholder="Share a small win, a question, a practice log, or a field note from the path…"
          rows={3}
          className="mt-3 w-full resize-none rounded-2xl border border-border/60 bg-background/60 p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
        />
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">+{10} XP for posting</p>
          <Button
            size="sm"
            disabled={!composer.trim()}
            onClick={() => {
              compose({ tab: composerTab, modality: composerModality, body: composer.trim() });
              setComposer("");
            }}
          >
            Share with the circle
          </Button>
        </div>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as PostTab)} className="mt-6">
        <TabsList className="flex w-full flex-wrap justify-start gap-1 bg-transparent p-0">
          {(Object.keys(tabMeta) as PostTab[]).map((k) => {
            const meta = tabMeta[k];
            const TabIcon = meta.Icon;
            return (
              <TabsTrigger
                key={k}
                value={k}
                className="gap-1.5 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-xs data-[state=active]:border-primary/60 data-[state=active]:bg-primary/15 data-[state=active]:text-foreground"
              >
                <TabIcon className="h-3.5 w-3.5" />
                {meta.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {(Object.keys(tabMeta) as PostTab[]).map((k) => (
          <TabsContent key={k} value={k} className="mt-4 space-y-3">
            <p className="text-xs italic text-muted-foreground">{tabMeta[k].blurb}</p>
            {filtered.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                userReaction={state.reactions[post.id]}
                onReact={(r) => react(post.id, r)}
                onReply={recordReply}
              />
            ))}
            {filtered.length === 0 && (
              <p className="rounded-2xl border border-dashed border-border/60 p-8 text-center text-sm text-muted-foreground">
                Nothing here yet. Be the first to share.
              </p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

function PostCard({
  post,
  userReaction,
  onReact,
  onReply,
}: {
  post: Post;
  userReaction?: ReactionKey;
  onReact: (k: ReactionKey) => void;
  onReply: () => void;
}) {
  return (
    <article className="rounded-2xl border border-border/60 bg-card/60 p-5 transition hover:border-primary/40">
      <div className="flex flex-wrap items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-sm font-bold text-foreground">
          {post.author[0]?.toUpperCase()}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-foreground">{post.author}</p>
            <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-foreground">
              {post.rank}
            </span>
          </div>
          <p className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">
            {post.modality} · {post.postedAgo}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm text-foreground/90">{post.body}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {(Object.keys(reactionMeta) as ReactionKey[]).map((k) => {
          const meta = reactionMeta[k];
          const RIcon = meta.Icon;
          const active = userReaction === k;
          const count = post.reactions[k] + (active ? 1 : 0);
          return (
            <button
              key={k}
              onClick={() => onReact(k)}
              title={meta.meaning}
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition ${
                active
                  ? "border-primary/60 bg-primary/15 text-foreground"
                  : "border-border/60 bg-background/40 text-muted-foreground hover:border-primary/40"
              }`}
            >
              <RIcon className="h-3 w-3" />
              <span>{meta.label}</span>
              <span className="font-semibold">{count}</span>
            </button>
          );
        })}
        <button
          onClick={onReply}
          className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/40 px-2.5 py-1 text-xs text-muted-foreground hover:border-primary/40"
        >
          Reply ({post.replies}) · +15 XP
        </button>
      </div>
    </article>
  );
}

// ─── Circles ────────────────────────────────────────────────────────────────
function CirclesSection() {
  const { state, joinCircle, leaveCircle } = useCommunity();
  return (
    <section>
      <SectionHeading
        eyebrow="Circles"
        title="Smaller pods inside the larger circle."
        blurb="Join the ones that match where you actually practice."
      />
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {circles.map((c) => {
          const joined = state.joinedCircles.includes(c.id);
          const Icon = c.Icon;
          return (
            <div
              key={c.id}
              className="rounded-2xl border border-border/50 bg-card/40 p-4 transition hover:border-primary/40"
            >
              <div className="flex items-start gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/15">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-foreground">{c.name}</p>
                    <Button
                      size="sm"
                      variant={joined ? "secondary" : "outline"}
                      className="h-7 px-3 text-[0.7rem]"
                      onClick={() => (joined ? leaveCircle(c.id) : joinCircle(c.id))}
                    >
                      {joined ? "Joined" : "Join"}
                    </Button>
                  </div>
                  <p className="text-[0.65rem] uppercase tracking-widest text-primary">
                    {c.members.toLocaleString()} members · {c.cadence}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">{c.focus}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Mentors ────────────────────────────────────────────────────────────────
function MentorsSection() {
  return (
    <section>
      <SectionHeading
        eyebrow="Mentors & guides"
        title="Senior practitioners holding office hours."
        blurb="Bring your real questions. They've been on the path longer than most."
      />
      <div className="mt-5 grid gap-3">
        {mentors.map((m) => (
          <div
            key={m.id}
            className="rounded-2xl border border-border/50 bg-card/40 p-4 transition hover:border-primary/40"
          >
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary/40 text-sm font-bold text-foreground">
                {m.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-foreground">{m.name}</p>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider ${
                      m.available
                        ? "bg-primary/15 text-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        m.available ? "bg-primary" : "bg-muted-foreground"
                      }`}
                    />
                    {m.available ? "Available" : "Booked"}
                  </span>
                </div>
                <p className="text-[0.65rem] uppercase tracking-widest text-primary">
                  {m.title} · {m.modality}
                </p>
                <p className="mt-1.5 text-xs text-muted-foreground">{m.bio}</p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-foreground">
                  <Clock className="h-3 w-3 text-primary" /> {m.officeHours}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Events ─────────────────────────────────────────────────────────────────
function EventsSection() {
  return (
    <section>
      <SectionHeading
        eyebrow="This week in the circle"
        title="Live sits, AMAs, and gathered rituals."
        blurb="Drop in. Most are async-friendly if you can't attend live."
      />
      <div className="mt-5 grid gap-3">
        {events.map((e) => (
          <div
            key={e.id}
            className="flex items-center gap-4 rounded-2xl border border-border/50 bg-card/40 p-4"
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{e.title}</p>
              <p className="text-[0.65rem] uppercase tracking-widest text-primary">
                {e.when} · {e.format}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Hosted by {e.host}</p>
            </div>
            <span className="rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs text-foreground">
              {e.spots}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Rituals ────────────────────────────────────────────────────────────────
function RitualsSection() {
  return (
    <section>
      <SectionHeading
        eyebrow="Rituals of the circle"
        title="The weekly cadence that keeps us in rhythm."
      />
      <div className="mt-5 space-y-3">
        {rituals.map((r) => {
          const Icon = r.Icon;
          return (
            <div
              key={r.day}
              className="flex items-start gap-3 rounded-2xl border border-border/50 bg-card/40 p-4"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  <span className="text-primary">{r.day}</span> · {r.ritual}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{r.blurb}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Leaderboards ───────────────────────────────────────────────────────────
function Leaderboards() {
  return (
    <section>
      <SectionHeading
        eyebrow="Celebration board"
        title="Not a competition. A standing ovation."
        blurb="The people whose generosity makes the circle a circle."
      />
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {leaderboards.map((board) => (
          <div key={board.title} className="sanctuary-panel rounded-2xl border border-border/60 p-5">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" />
              <p className="font-semibold text-foreground">{board.title}</p>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{board.subtitle}</p>
            <ol className="mt-4 space-y-2">
              {board.rows.map((r, i) => (
                <li
                  key={r.name}
                  className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/40 px-3 py-2"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/15 text-[0.65rem] font-bold text-foreground">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{r.name}</p>
                    <p className="text-[0.65rem] uppercase tracking-widest text-primary">{r.rank}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{r.value}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Badges ─────────────────────────────────────────────────────────────────
function BadgesSection() {
  const { state } = useCommunity();
  return (
    <section>
      <SectionHeading
        eyebrow="Badges"
        title="Earned through showing up — and showing up for others."
        blurb={`${state.earnedBadges.length} of ${badges.length} earned.`}
      />
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {badges.map((b) => {
          const earned = state.earnedBadges.includes(b.id);
          const Icon = b.Icon;
          return (
            <div
              key={b.id}
              className={`rounded-2xl border p-4 transition ${
                earned
                  ? "border-primary/50 bg-primary/10 shadow-[var(--shadow-glow)]"
                  : "border-border/50 bg-card/30 opacity-70"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`grid h-10 w-10 place-items-center rounded-xl ${
                    earned ? "bg-primary/25" : "bg-muted"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${earned ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{b.name}</p>
                  <p className="text-xs text-muted-foreground">{b.hint}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rank ladder */}
      <div className="mt-8 rounded-3xl border border-border/60 bg-card/40 p-6">
        <div className="flex items-center gap-2">
          <Crown className="h-4 w-4 text-primary" />
          <p className="font-semibold text-foreground">The rank ladder</p>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Earned through generosity, not consumption. XP from posting (+10), replying (+15),
          challenge days (+20), and mentoring (+25).
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {ranks.map((r) => {
            const Icon = r.Icon;
            return (
              <div
                key={r.id}
                className="rounded-2xl border border-border/50 bg-background/40 p-3"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">{r.name}</p>
                  <span className="ml-auto text-[0.65rem] uppercase tracking-widest text-primary">
                    {r.xpRequired} XP
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">{r.blurb}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Code of the Circle ─────────────────────────────────────────────────────
function CodeOfTheCircle() {
  const items = [
    { title: "Consent first", body: "No unsolicited advice on someone's healing. Ask, then offer." },
    { title: "Privacy held", body: "What's shared here stays here. Screenshots leave the circle." },
    { title: "Non-performative", body: "Small wins count. So do hard days. No glow-up theater." },
    { title: "No diagnosis, no prescription", body: "We share experience — not medical advice." },
    { title: "Generosity over expertise", body: "Replies that help one person beat hot takes that impress many." },
    { title: "Grace for newcomers", body: "Everyone was an Ember once. Make room." },
  ];
  return (
    <section className="rounded-[2.5rem] border border-primary/30 bg-[var(--gradient-panel)] p-8 shadow-[var(--shadow-aura)] lg:p-10">
      <div className="flex items-center gap-3">
        <ShieldCheck className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Code of the Circle</h2>
      </div>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Six commitments that make this place feel different than the rest of the internet.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.title}
            className="rounded-2xl border border-border/60 bg-card/60 p-4"
          >
            <p className="font-semibold text-foreground">{it.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Section heading ────────────────────────────────────────────────────────
function SectionHeading({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow: string;
  title: string;
  blurb?: string;
}) {
  return (
    <header>
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
      {blurb && <p className="mt-2 max-w-2xl text-muted-foreground">{blurb}</p>}
    </header>
  );
}
