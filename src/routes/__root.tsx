import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { AppShell } from "@/components/platform/AppShell";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This portal has not opened yet. Return to the sanctuary path.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ascend Healing Platform" },
      {
        name: "description",
        content:
          "A calming spiritual game for quests, skill trees, avatars, and holistic healing growth.",
      },
      { name: "author", content: "Ascend" },
      { property: "og:title", content: "Ascend Healing Platform" },
      {
        property: "og:description",
        content:
          "Create an elemental avatar, complete healing quests, and grow through serene skill trees.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Ascend Healing Platform" },
      { name: "description", content: "A gamified holistic healing platform where users transform into their highest self through interactive skill trees and quests." },
      { property: "og:description", content: "A gamified holistic healing platform where users transform into their highest self through interactive skill trees and quests." },
      { name: "twitter:description", content: "A gamified holistic healing platform where users transform into their highest self through interactive skill trees and quests." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d12abcb1-a1cd-4c71-a552-51cf0d5ad35e/id-preview-721a3cb9--1fbc5b28-4097-44a9-a4d6-77971ee66bd6.lovable.app-1777491908921.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d12abcb1-a1cd-4c71-a552-51cf0d5ad35e/id-preview-721a3cb9--1fbc5b28-4097-44a9-a4d6-77971ee66bd6.lovable.app-1777491908921.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
