import { Link } from "@tanstack/react-router";
import { ChevronDown, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { alchemyItems, movementItems, navItems } from "./data";

const leadingNavItems = navItems.slice(0, 4);
const trailingNavItems = navItems.slice(4);

type NavGroupItem = { to: string; label: string };

function NavDropdown({
  label,
  items,
  triggerClassName,
}: {
  label: string;
  items: readonly NavGroupItem[];
  triggerClassName: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={triggerClassName}>
        {label} <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        sideOffset={8}
        className="sanctuary-panel z-[100] min-w-56 rounded-lg border border-border/60 p-2 shadow-[var(--shadow-aura)]"
      >
        {items.map((item) => (
          <DropdownMenuItem key={item.to} asChild>
            <Link
              to={item.to as never}
              className="block w-full cursor-pointer rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground focus:bg-secondary focus:text-secondary-foreground"
              activeProps={{
                className: "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]",
              }}
            >
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const desktopTrigger =
    "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none data-[state=open]:bg-secondary data-[state=open]:text-secondary-foreground";
  const mobileTrigger =
    "flex shrink-0 cursor-pointer items-center gap-1 rounded-full border border-border/70 bg-card/60 px-3 py-2 text-sm text-muted-foreground focus-visible:outline-none data-[state=open]:border-primary";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-cosmos)]" />
        <div className="sun-rays absolute inset-x-0 top-0 h-[34rem] opacity-70" />
        <div className="garden-grid absolute inset-0 opacity-30" />
        <div className="star-field absolute inset-0 opacity-35" />
        <div className="petal-mist absolute inset-0 opacity-85" />
        <div className="absolute left-1/2 top-[-6rem] h-[34rem] w-[54rem] -translate-x-1/2 rounded-full bg-primary/18 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[-6rem] h-[32rem] w-[32rem] rounded-full bg-spirit/14 blur-3xl" />
      </div>
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/58 backdrop-blur-2xl">
        <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="group flex items-center gap-3" aria-label="Ascension home">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-primary/40 bg-secondary/80 shadow-[var(--shadow-glow)] transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5 text-primary" />
            </span>
            <span className="leading-tight">
              <span className="block text-base font-semibold tracking-[0.18em] text-foreground">
                ASCEND
              </span>
              <span className="block text-xs text-muted-foreground">celestial sanctuary</span>
            </span>
          </Link>
          <nav
            className="sanctuary-panel hidden items-center gap-1 rounded-full border border-border/60 p-1 md:flex"
            aria-label="Primary navigation"
          >
            {leadingNavItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
                activeProps={{
                  className: "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]",
                }}
              >
                {item.label}
              </Link>
            ))}
            <NavDropdown label="Movement" items={movementItems} triggerClassName={desktopTrigger} />
            <NavDropdown label="Alchemy" items={alchemyItems} triggerClassName={desktopTrigger} />
            {trailingNavItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
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
          {leadingNavItems.map((item) => (
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
          <div className="shrink-0">
            <NavDropdown label="Movement" items={movementItems} triggerClassName={mobileTrigger} />
          </div>
          <div className="shrink-0">
            <NavDropdown label="Alchemy" items={alchemyItems} triggerClassName={mobileTrigger} />
          </div>
          {trailingNavItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
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
