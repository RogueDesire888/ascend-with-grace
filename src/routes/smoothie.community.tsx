import { createFileRoute } from "@tanstack/react-router";
import { Users, Heart, MessageCircle, Sparkles } from "lucide-react";

export const Route = createFileRoute("/smoothie/community")({
  head: () => ({
    meta: [
      { title: "Community — The Smoothie Codex | Ascend" },
      { name: "description", content: "Smoothie circles, recipe swaps, and shared rituals." },
    ],
  }),
  component: CommunityPage,
});

const posts = [
  {
    name: "Maya",
    badge: "Recipe Architect",
    text: "Subbed avocado for banana in the Cacao Velvet — even creamier and lower glycemic. Game-changer for my mid-morning crash.",
    likes: 42,
  },
  {
    name: "Jonah",
    badge: "Macro Sage",
    text: "30 days of the Energy rotation. My afternoon coffee dropped from 3 cups to 1. The matcha-cacao stack actually works.",
    likes: 67,
  },
  {
    name: "Sol",
    badge: "Phytonutrient Scholar",
    text: "Tart cherry + ashwagandha 90 minutes before bed. Sleep latency down to 12 minutes per my Oura. Keeping this one.",
    likes: 89,
  },
  {
    name: "Priya",
    badge: "Blender Apprentice",
    text: "Hidden cauliflower in the kids' purple. My 6-year-old has no idea. Reporting back: zero complaints.",
    likes: 54,
  },
];

const circles = [
  { name: "Daily Greens Circle", count: "1,240 members", focus: "Accountability for the daily green smoothie." },
  { name: "Athletic Recovery Crew", count: "612 members", focus: "Tart cherry, leucine, and timing windows." },
  { name: "Hormonal Harmony", count: "498 members", focus: "Lignans, adaptogens, and cycle-syncing." },
  { name: "Family Blender Co-op", count: "830 members", focus: "Kid-friendly recipes that actually get drunk." },
];

function CommunityPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Community</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          The codex is a shared text. These are the people writing in the margins.
        </p>
      </header>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">Recent field notes</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {posts.map((p) => (
            <div key={p.name} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-foreground">{p.name}</p>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[0.65rem] text-foreground">
                  {p.badge}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{p.text}</p>
              <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Heart className="h-3 w-3" /> {p.likes}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" /> Reply
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">Circles</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {circles.map((c) => (
            <div key={c.name} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <p className="font-semibold text-foreground">{c.name}</p>
              <p className="text-xs uppercase tracking-widest text-primary">{c.count}</p>
              <p className="mt-2 text-sm text-muted-foreground">{c.focus}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
