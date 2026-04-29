import { createFileRoute } from "@tanstack/react-router";
import { Download, Headphones, PlayCircle } from "lucide-react";
import { PageFrame, ResourceGrid, SearchBarMock } from "@/components/platform/PlatformUI";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Resource Library — Ascend" },
      {
        name: "description",
        content:
          "Browse downloadable holistic healing guides, audio tracks, weekly sessions, and daily practices.",
      },
      { property: "og:title", content: "Resource Library — Ascend" },
      {
        property: "og:description",
        content: "A serene resource vault for guides, audio tracks, and healing practices.",
      },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const featured = [
    { title: "Herbal first-aid altar", type: "Downloadable guide", icon: Download },
    { title: "Soft belly breath", type: "Audio track", icon: Headphones },
    { title: "Weekly luminous session", type: "Guided class", icon: PlayCircle },
  ];

  return (
    <PageFrame
      eyebrow="Resource vault"
      title="A calm library of practices you can return to anytime."
    >
      <SearchBarMock />
      <div className="mt-6 flex flex-wrap gap-3">
        {["All", "Guides", "Audio", "Daily 5-min", "Herbs", "Energy", "Shadow work"].map(
          (filter) => (
            <span
              key={filter}
              className="rounded-full border border-border/70 bg-card/70 px-4 py-2 text-sm font-semibold text-muted-foreground"
            >
              {filter}
            </span>
          ),
        )}
      </div>
      <section className="mt-10 grid gap-5 lg:grid-cols-3">
        {featured.map((item) => (
          <article
            key={item.title}
            className="rounded-[2rem] border border-primary/25 bg-[var(--gradient-panel)] p-6 shadow-[var(--shadow-aura)]"
          >
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <item.icon className="h-6 w-6" />
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Featured
            </p>
            <h2 className="mt-2 text-2xl font-bold text-foreground">{item.title}</h2>
            <p className="mt-2 text-muted-foreground">{item.type}</p>
          </article>
        ))}
      </section>
      <section className="mt-10">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-foreground">Latest additions</h2>
          <p className="mt-1 text-muted-foreground">
            New guided sessions arrive weekly, with short practices added daily.
          </p>
        </div>
        <ResourceGrid />
      </section>
    </PageFrame>
  );
}
