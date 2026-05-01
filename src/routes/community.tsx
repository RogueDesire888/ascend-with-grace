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
  Compass,
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:py-14">
      <Hero />

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <main className="space-y-6">
          <StandingBar />
          <FeedSection />
        </main>
        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <Sidebar />
        </aside>
      </div>

      <ExploreSection />
      <RecognitionSection />
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
    <section className="relative overflow-hidden rounded-3xl border border-primary/25 bg-[var(--gradient-panel)] p-6 shadow-[var(--shadow-aura)] lg:p-8">
      <div className="marble-sheen absolute inset-0 opacity-30" />
      <div className="relative">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-primary">The Circle</p>
        <h1 className="mt-2 max-w-2xl text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
          A place that practices, together.
        </h1>
        <p className="mt-3 max-w-xl text-base text-muted-foreground">
          Set today's intention, see who's beside you, and share what's actually moving.
        </p>

        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          <Pulse icon={Users} value={livePulse.online.toLocaleString()} label="online" />
          <Pulse icon={CheckCircle2} value={livePulse.todayCheckIns.toLocaleString()} label="check-ins today" />
          <Pulse icon={Sparkles} value={`${livePulse.collectiveGlow}%`} label="weekly glow" />
          <Pulse icon={HeartHandshake} value={`+${livePulse.newcomersThisWeek}`} label="new this week" />
        </div>

        {!setToday && (
          <div className="mt-6 rounded-2xl border border-border/60 bg-card/85 p-5 backdrop-blur">
            <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-primary">
              Set today's intention
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {intentionChips.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setIntention(c.id, c.label)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-primary/60 hover:bg-primary/10"
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
              className="mt-3 flex gap-2"
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
          </div>
        )}
      </div>
    </section>
  );
}

function Pulse({ icon: Icon, value, label }: { icon: typeof Users; value: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/50 px-2.5 py-1 backdrop-blur">
      <Icon className="h-3.5 w-3.5 text-primary" />
      <span className="font-semibold text-foreground">{value}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

// ─── Standing bar (compact, single row) ─────────────────────────────────────
function StandingBar() {
  const { state } = useCommunity();
  const { current, next, progress } = rankByXp(state.xpAllTime);
  const RankIcon = current.Icon;

  return (
    <section className="rounded-2xl border border-border/60 bg-card/60 p-4 shadow-[var(--shadow-soft)]">
      <div className="grid gap-4 sm:grid-cols-[1.5fr_1fr_1fr_1fr] sm:items-center">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15">
            <RankIcon className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground">
              Rank
            </p>
            <p className="truncate text-sm font-bold text-foreground">{current.name}</p>
            {next && <Progress value={progress} className="mt-1.5 h-1" />}
            <p className="mt-1 text-[0.65rem] text-muted-foreground">
              {next ? `${Math.round(progress)}% to ${next.name}` : "Highest tier"}
            </p>
          </div>
        </div>

        <Stat icon={Flame} label="Streak" value={`${state.streak.count}d`} />
        <Stat icon={TrendingUp} label="XP this week" value={`${state.xpThisWeek}`} />
        <Stat icon={Award} label="Badges" value={`${state.earnedBadges.length}/${badges.length}`} />
      </div>
    </section>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Flame; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-primary" />
      <div>
        <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className="text-sm font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}

// ─── Sidebar ────────────────────────────────────────────────────────────────
function Sidebar() {
  const { state } = useCommunity();
  const today = new Date().toISOString().slice(0, 10);
  const setToday = state.intentionToday?.date === today;
  const myChallenges = challenges.filter((c) => state.joinedChallenges.includes(c.id));
  const myCircles = circles.filter((c) => state.joinedCircles.includes(c.id)).slice(0, 3);
  const nextEvent = events[0];
  const availableMentors = mentors.filter((m) => m.available).slice(0, 2);

  return (
    <>
      <div className="rounded-2xl border border-border/60 bg-card/60 p-4 shadow-[var(--shadow-soft)]">
        <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-primary">
          Today at a glance
        </p>
        <div className="mt-3 space-y-3 text-sm">
          {setToday && (
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Intention</p>
                <p className="font-medium text-foreground">{state.intentionToday?.text}</p>
              </div>
            </div>
          )}
          <div className="flex items-start gap-2">
            <Flame className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Streak</p>
              <p className="font-medium text-foreground">
                {state.streak.count} {state.streak.count === 1 ? "day" : "days"}
              </p>
            </div>
          </div>
          {myChallenges[0] && (
            <div className="flex items-start gap-2">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Active challenge</p>
                <p className="font-medium text-foreground">{myChallenges[0].title}</p>
              </div>
            </div>
          )}
          {nextEvent && (
            <div className="flex items-start gap-2">
              <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Next event</p>
                <p className="font-medium text-foreground">{nextEvent.title}</p>
                <p className="text-[0.7rem] text-muted-foreground">{nextEvent.when}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {myCircles.length > 0 && (
        <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
          <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-primary">
            Your circles
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {myCircles.map((c) => (
              <span
                key={c.id}
                className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/50 px-2.5 py-1 text-xs text-foreground"
              >
                <c.Icon className="h-3 w-3 text-primary" />
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {availableMentors.length > 0 && (
        <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
          <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-primary">
            Mentors on call
          </p>
          <div className="mt-3 space-y-3">
            {availableMentors.map((m) => (
              <div key={m.id} className="flex items-center gap-2">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary/40 text-xs font-bold text-foreground">
                  {m.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{m.name}</p>
                  <p className="truncate text-[0.7rem] text-muted-foreground">{m.officeHours}</p>
                </div>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ─── Feed ───────────────────────────────────────────────────────────────────
function FeedSection() {
  const { state, react, compose, recordReply } = useCommunity();
  const [tab, setTab] = useState<PostTab>("for-you");
  const [composer, setComposer] = useState("");
  const [composerOpen, setComposerOpen] = useState(false);
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
    <section className="space-y-4">
      {/* Composer — collapsed pill by default */}
      {!composerOpen ? (
        <button
          onClick={() => setComposerOpen(true)}
          className="flex w-full items-center gap-3 rounded-full border border-border/60 bg-card/60 px-5 py-3 text-left text-sm text-muted-foreground transition hover:border-primary/40 hover:bg-card/80"
        >
          <Send className="h-4 w-4 text-primary" />
          Share with the circle…
          <span className="ml-auto text-xs">+10 XP</span>
        </button>
      ) : (
        <div className="rounded-2xl border border-border/60 bg-card/70 p-4 shadow-[var(--shadow-soft)]">
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
            placeholder="A small win, a question, a practice log…"
            rows={3}
            autoFocus
            className="mt-3 w-full resize-none rounded-2xl border border-border/60 bg-background/60 p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
          />
          <div className="mt-3 flex items-center justify-end gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setComposerOpen(false);
                setComposer("");
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={!composer.trim()}
              onClick={() => {
                compose({ tab: composerTab, modality: composerModality, body: composer.trim() });
                setComposer("");
                setComposerOpen(false);
              }}
            >
              Share (+10 XP)
            </Button>
          </div>
        </div>
      )}

      <Tabs value={tab} onValueChange={(v) => setTab(v as PostTab)}>
        <TabsList className="flex w-full flex-wrap justify-start gap-1 bg-transparent p-0">
          {(Object.keys(tabMeta) as PostTab[]).map((k) => {
            const meta = tabMeta[k];
            const TabIcon = meta.Icon;
            return (
              <TabsTrigger
                key={k}
                value={k}
                className="gap-1.5 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 text-xs data-[state=active]:border-primary/60 data-[state=active]:bg-primary/15 data-[state=active]:text-foreground"
              >
                <TabIcon className="h-3.5 w-3.5" />
                {meta.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {(Object.keys(tabMeta) as PostTab[]).map((k) => (
          <TabsContent key={k} value={k} className="mt-4 space-y-3">
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
    <article className="rounded-2xl border border-border/60 bg-card/50 p-4 transition hover:border-primary/40">
      <div className="flex items-center gap-2.5">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-primary/15 text-xs font-bold text-foreground">
          {post.author[0]?.toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <p className="text-sm font-semibold text-foreground">{post.author}</p>
            <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">
              {post.rank} · {post.modality} · {post.postedAgo}
            </p>
          </div>
        </div>
      </div>
      <p className="mt-2.5 text-sm leading-relaxed text-foreground/90">{post.body}</p>

      <div className="mt-3 flex flex-wrap items-center gap-1">
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
              className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs transition ${
                active
                  ? "bg-primary/15 text-foreground"
                  : "text-muted-foreground hover:bg-card hover:text-foreground"
              }`}
            >
              <RIcon className="h-3 w-3" />
              <span>{count}</span>
            </button>
          );
        })}
        <button
          onClick={onReply}
          className="ml-auto text-xs text-muted-foreground hover:text-foreground"
        >
          Reply ({post.replies})
        </button>
      </div>
    </article>
  );
}

// ─── Explore (tabbed) ───────────────────────────────────────────────────────
function ExploreSection() {
  const [tab, setTab] = useState("challenges");
  const exploreTabs: { id: string; label: string; Icon: typeof Compass }[] = [
    { id: "challenges", label: "Challenges", Icon: Sparkles },
    { id: "circles", label: "Circles", Icon: Users },
    { id: "mentors", label: "Mentors", Icon: HeartHandshake },
    { id: "events", label: "Events", Icon: Calendar },
    { id: "rituals", label: "Rituals", Icon: Compass },
  ];

  return (
    <section>
      <header className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Explore</p>
          <h2 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
            Find your way deeper.
          </h2>
        </div>
      </header>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex w-full flex-wrap justify-start gap-1 bg-transparent p-0">
          {exploreTabs.map((t) => {
            const TIcon = t.Icon;
            return (
              <TabsTrigger
                key={t.id}
                value={t.id}
                className="gap-1.5 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 text-xs data-[state=active]:border-primary/60 data-[state=active]:bg-primary/15 data-[state=active]:text-foreground"
              >
                <TIcon className="h-3.5 w-3.5" />
                {t.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="challenges" className="mt-5">
          <ChallengesPanel />
        </TabsContent>
        <TabsContent value="circles" className="mt-5">
          <CirclesPanel />
        </TabsContent>
        <TabsContent value="mentors" className="mt-5">
          <MentorsPanel />
        </TabsContent>
        <TabsContent value="events" className="mt-5">
          <EventsPanel />
        </TabsContent>
        <TabsContent value="rituals" className="mt-5">
          <RitualsPanel />
        </TabsContent>
      </Tabs>
    </section>
  );
}

function ChallengesPanel() {
  const { state, joinChallenge, logChallengeDay } = useCommunity();
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {challenges.map((c) => {
        const joined = state.joinedChallenges.includes(c.id);
        const days = state.challengeDays[c.id] ?? 0;
        const personalPct = Math.min(100, (days / c.days) * 100);
        return (
          <article key={c.id} className="rounded-2xl border border-border/60 bg-card/50 p-5">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-border/60 bg-background/50 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-widest text-muted-foreground">
                {c.modality}
              </span>
              <span className="text-xs text-muted-foreground">{c.daysLeft}d left</span>
            </div>
            <h3 className="mt-3 text-lg font-bold text-foreground">{c.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{c.blurb}</p>

            <div className="mt-4 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Circle</span>
                <span className="font-semibold text-foreground">{c.collectiveProgress}%</span>
              </div>
              <Progress value={c.collectiveProgress} className="h-1" />
              {joined && (
                <>
                  <div className="flex items-center justify-between pt-1.5 text-xs">
                    <span className="text-muted-foreground">You</span>
                    <span className="font-semibold text-foreground">
                      {days} / {c.days}
                    </span>
                  </div>
                  <Progress value={personalPct} className="h-1" />
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
                  Log today
                </Button>
              ) : (
                <Button size="sm" variant="outline" onClick={() => joinChallenge(c.id)}>
                  Join
                </Button>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function CirclesPanel() {
  const { state, joinCircle, leaveCircle } = useCommunity();
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {circles.map((c) => {
        const joined = state.joinedCircles.includes(c.id);
        const Icon = c.Icon;
        return (
          <div
            key={c.id}
            className="rounded-2xl border border-border/60 bg-card/50 p-4 transition hover:border-primary/40"
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
                <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                  {c.members.toLocaleString()} members · {c.cadence}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{c.focus}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MentorsPanel() {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {mentors.map((m) => (
        <div
          key={m.id}
          className="rounded-2xl border border-border/60 bg-card/50 p-4 transition hover:border-primary/40"
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
              <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">
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
  );
}

function EventsPanel() {
  return (
    <div className="grid gap-3">
      {events.map((e) => (
        <div
          key={e.id}
          className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card/50 p-4"
        >
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15">
            <Calendar className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">{e.title}</p>
            <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">
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
  );
}

function RitualsPanel() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {rituals.map((r) => {
        const Icon = r.Icon;
        return (
          <div
            key={r.day}
            className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card/50 p-4"
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
  );
}

// ─── Recognition (collapsed accordion) ──────────────────────────────────────
function RecognitionSection() {
  const { state } = useCommunity();
  return (
    <section>
      <header className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Recognition</p>
        <h2 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
          Celebration, not competition.
        </h2>
      </header>

      <Accordion type="multiple" className="space-y-3">
        <AccordionItem
          value="leaderboards"
          className="rounded-2xl border border-border/60 bg-card/50 px-4"
        >
          <AccordionTrigger className="hover:no-underline">
            <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Trophy className="h-4 w-4 text-primary" />
              Leaderboards
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4 pt-2 lg:grid-cols-3">
              {leaderboards.map((board) => (
                <div key={board.title} className="rounded-2xl border border-border/50 bg-background/30 p-4">
                  <p className="font-semibold text-foreground">{board.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{board.subtitle}</p>
                  <ol className="mt-3 space-y-2">
                    {board.rows.map((r, i) => (
                      <li
                        key={r.name}
                        className="flex items-center gap-2 rounded-xl bg-card/50 px-2.5 py-1.5"
                      >
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/15 text-[0.6rem] font-bold text-foreground">
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-xs font-semibold text-foreground">{r.name}</p>
                          <p className="text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                            {r.rank}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">{r.value}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="badges"
          className="rounded-2xl border border-border/60 bg-card/50 px-4"
        >
          <AccordionTrigger className="hover:no-underline">
            <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Award className="h-4 w-4 text-primary" />
              Badges &amp; ranks
              <span className="text-xs font-normal text-muted-foreground">
                ({state.earnedBadges.length}/{badges.length} earned)
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-4">
              {badges.map((b) => {
                const earned = state.earnedBadges.includes(b.id);
                const Icon = b.Icon;
                return (
                  <div
                    key={b.id}
                    className={`rounded-2xl border p-3 transition ${
                      earned
                        ? "border-primary/50 bg-primary/10"
                        : "border-border/50 bg-background/30 opacity-70"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`grid h-8 w-8 place-items-center rounded-xl ${
                          earned ? "bg-primary/25" : "bg-muted"
                        }`}
                      >
                        <Icon
                          className={`h-3.5 w-3.5 ${
                            earned ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-foreground">{b.name}</p>
                        <p className="truncate text-[0.65rem] text-muted-foreground">{b.hint}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl border border-border/50 bg-background/30 p-4">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">The rank ladder</p>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Earned through generosity. +10 posting, +15 replying, +20 challenge days, +25 mentoring.
              </p>
              <div className="mt-4 grid gap-2 md:grid-cols-2 lg:grid-cols-4">
                {ranks.map((r) => {
                  const Icon = r.Icon;
                  return (
                    <div
                      key={r.id}
                      className="rounded-xl border border-border/50 bg-card/40 p-2.5"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5 text-primary" />
                        <p className="text-xs font-semibold text-foreground">{r.name}</p>
                        <span className="ml-auto text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                          {r.xpRequired} XP
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

// ─── Code of the Circle ─────────────────────────────────────────────────────
function CodeOfTheCircle() {
  const items = [
    { title: "Consent first", body: "No unsolicited advice. Ask, then offer." },
    { title: "Privacy held", body: "What's shared here stays here." },
    { title: "Non-performative", body: "Small wins count. So do hard days." },
    { title: "No diagnosis", body: "We share experience — not medical advice." },
    { title: "Generosity over expertise", body: "Replies that help one person beat hot takes." },
    { title: "Grace for newcomers", body: "Everyone was an Ember once." },
  ];
  return (
    <section className="rounded-2xl border border-border/60 bg-card/40 p-6">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-primary" />
        <p className="text-sm font-semibold uppercase tracking-widest text-foreground">
          Code of the Circle
        </p>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div key={it.title} className="rounded-xl border border-border/50 bg-background/30 p-3">
            <p className="text-sm font-semibold text-foreground">{it.title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
