import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { navItems } from "./data";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-cosmos)]" />
        <div className="garden-grid absolute inset-0 opacity-45" />
        <div className="star-field absolute inset-0 opacity-60" />
        <div className="petal-mist absolute inset-0 opacity-80" />
        <div className="absolute left-1/2 top-0 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-earth/20 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-4rem] h-96 w-96 rounded-full bg-water/15 blur-3xl" />
      </div>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-2xl">
        <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="group flex items-center gap-3" aria-label="Ascension home">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-primary/30 bg-card/80 shadow-[var(--shadow-glow)] transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5 text-primary" />
            </span>
            <span className="leading-tight">
              <span className="block text-base font-semibold tracking-[0.18em] text-foreground">
                ASCEND
              </span>
              <span className="block text-xs text-muted-foreground">galactic garden</span>
            </span>
          </Link>
          <nav
            className="hidden items-center gap-1 rounded-full border border-border/60 bg-card/55 p-1 shadow-[var(--shadow-soft)] md:flex"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                activeProps={{
                  className: "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/sanctuary"
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
          >
            $5/mo
          </Link>
        </div>
        <nav
          className="scrollbar-none flex gap-2 overflow-x-auto px-4 pb-3 md:hidden"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="shrink-0 rounded-full border border-border/70 bg-card/60 px-3 py-2 text-sm text-muted-foreground"
              activeProps={{ className: "border-primary bg-primary text-primary-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="relative z-10">{children}</main>
    </div>
  );
}
