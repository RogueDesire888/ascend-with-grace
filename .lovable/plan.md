## Problem

The "Movement" dropdown opens but is painted behind the page's hero image / 3D sanctuary content.

## Root cause

In `src/components/platform/AppShell.tsx`, `MovementMenu` renders the dropdown panel as a plain absolutely-positioned `<div>` inside the header's `<nav>`. That `<nav>` uses the `.sanctuary-panel` class which applies `backdrop-filter: blur(22px)` (see `src/styles.css` line ~295). `backdrop-filter` creates a new stacking context, so the dropdown's `z-50` is scoped to the nav, not the page. Large transformed elements in `<main>` (hero card, sanctuary scenes) then overlap it.

The mobile `<details>` dropdown has the same issue for the same reason.

## Fix

Replace the hand-rolled hover/details dropdowns with Radix's already-installed `DropdownMenu` (`src/components/ui/dropdown-menu.tsx`). Radix portals its content to `document.body`, escaping every parent stacking context. Result: the menu always paints above page content.

### Changes (single file: `src/components/platform/AppShell.tsx`)

1. Import `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem` from `@/components/ui/dropdown-menu`.
2. Rewrite `MovementMenu` to use `DropdownMenu` with:
   - Trigger: same pill button styling as today ("Movement" + chevron).
   - Content: `align="center"`, `sideOffset={8}`, with the existing `sanctuary-panel` styling applied to `DropdownMenuContent` (or a wrapper) so the look is preserved.
   - Each item is a `DropdownMenuItem` rendering a TanStack `<Link>` (use `asChild`) to `/yoga-therapy-lab` and `/tai-chi-lab`.
3. Replace the mobile `<details>` block with the same `DropdownMenu` (Radix works on touch). Keep the trigger styled to match the surrounding mobile pills.
4. Keep all existing labels, routes, and `movementItems` data — no changes to `data.ts`.

### Verification

- Open the home page, hover/click "Movement" — the dropdown should appear above the hero image.
- Same check on `/sanctuary` (3D scene), `/quests`, and the mobile viewport.
- Confirm both items still navigate correctly and the active link styling still applies.

No other files change.