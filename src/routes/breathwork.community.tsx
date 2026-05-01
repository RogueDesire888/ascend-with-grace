import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { events, practitioners } from "@/lib/breathwork-data";
import { useBreathProgress, type ForumPost } from "@/lib/breathwork-progress";

export const Route = createFileRoute("/breathwork/community")({
  head: () => ({
    meta: [
      { title: "Community & Guidance — Breathwork | Ascend" },
      { name: "description", content: "Find practitioners, join the circle, and discover upcoming workshops." },
    ],
  }),
  component: CommunityPage,
});

const tabs = ["Directory", "Forum", "Events"] as const;
type Tab = (typeof tabs)[number];

function CommunityPage() {
  const [tab, setTab] = useState<Tab>("Directory");
  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Community & Guidance</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Practitioners, conversation, and a calendar of breath gatherings.
        </p>
      </header>
      <nav className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full border px-4 py-1.5 text-sm ${
              tab === t
                ? "border-primary bg-primary/15 text-foreground"
                : "border-border/60 bg-card/40 text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </nav>
      {tab === "Directory" && <Directory />}
      {tab === "Forum" && <Forum />}
      {tab === "Events" && <Events />}
    </article>
  );
}

function Directory() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const ql = q.toLowerCase().trim();
    return practitioners.filter(
      (p) =>
        !ql ||
        p.name.toLowerCase().includes(ql) ||
        p.location.toLowerCase().includes(ql) ||
        p.modalities.join(" ").toLowerCase().includes(ql),
    );
  }, [q]);
  return (
    <section>
      <input
        placeholder="Search by name, location, or modality"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="mb-4 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
      />
      <div className="grid gap-3 md:grid-cols-2">
        {list.map((p) => (
          <div key={p.name} className="quest-panel-air rounded-2xl p-4">
            <p className="font-semibold text-foreground">{p.name}</p>
            <p className="text-xs text-muted-foreground">{p.location}</p>
            <p className="mt-2 text-sm text-foreground/90">{p.bio}</p>
            <div className="mt-2 flex flex-wrap gap-1 text-xs">
              {p.modalities.map((m) => (
                <span key={m} className="rounded-full border border-border/50 px-2 py-0.5 text-muted-foreground">
                  {m}
                </span>
              ))}
            </div>
            <p className="mt-2 text-xs text-cyan-glow">{p.contact}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Forum() {
  const { progress, addForumPost } = useBreathProgress();
  const [category, setCategory] = useState<ForumPost["category"]>("experiences");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const author = progress.profile.displayName || "Guest Breather";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;
    addForumPost({
      id: `${Date.now()}`,
      category,
      author,
      title,
      body,
      createdAt: new Date().toISOString(),
    });
    setTitle("");
    setBody("");
  };

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={submit} className="quest-panel-air space-y-3 rounded-2xl p-5">
        <p className="text-xs uppercase tracking-widest text-cyan-glow">New post</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as ForumPost["category"])}
          className="w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
        >
          <option value="experiences">Experiences</option>
          <option value="qa">Technique Q&amp;A</option>
          <option value="science">Science</option>
        </select>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
        />
        <textarea
          placeholder="Share your experience or question…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="h-28 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
        />
        <Button type="submit" size="sm" className="rounded-full">
          Post as {author}
        </Button>
      </form>
      <div className="space-y-3">
        {progress.forum.length === 0 && (
          <p className="text-sm italic text-muted-foreground">No posts yet — be the first.</p>
        )}
        {progress.forum.map((p) => (
          <div key={p.id} className="rounded-2xl border border-border/50 bg-card/40 p-4">
            <p className="text-xs uppercase tracking-widest text-cyan-glow">{p.category}</p>
            <p className="font-semibold text-foreground">{p.title}</p>
            <p className="text-xs text-muted-foreground">
              {p.author} · {new Date(p.createdAt).toLocaleString()}
            </p>
            <p className="mt-2 text-sm text-foreground/90">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Events() {
  return (
    <section className="grid gap-3 md:grid-cols-2">
      {events.map((e) => (
        <div key={e.title} className="quest-panel-air rounded-2xl p-4">
          <p className="text-xs uppercase tracking-widest text-cyan-glow">
            {new Date(e.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}{" "}
            · {e.format}
          </p>
          <p className="font-semibold text-foreground">{e.title}</p>
          <p className="text-xs text-muted-foreground">{e.location} · {e.facilitator}</p>
          <p className="mt-2 text-sm text-foreground/90">{e.description}</p>
        </div>
      ))}
      <p className="md:col-span-2 text-xs italic text-muted-foreground">
        Are you a verified facilitator? Submit your event by emailing community@example.com.
      </p>
    </section>
  );
}
