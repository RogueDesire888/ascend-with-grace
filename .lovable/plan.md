## Goal

Group the "Herbal Path" and "Smoothie Codex" nav links under a single "Alchemy" dropdown — the same pattern already used by the Movement dropdown for Yoga / Tai Chi. The two pages stay exactly as they are; only navigation changes.

## Files to modify

### 1. `src/components/platform/data.ts`
- Remove `/alchemists-path` ("Herbal Path") and `/smoothie-codex` ("Smoothie Codex") from `navItems`.
- Add a new exported `alchemyItems` array (mirroring `movementItems`):
  ```ts
  export const alchemyItems = [
    { to: "/alchemists-path" as const, label: "Herbal Path" },
    { to: "/smoothie-codex" as const, label: "Smoothie Codex" },
  ];
  ```
- Resulting `navItems` order: Home, Sanctuary, Quests, Skill Trees, Library, Community.

### 2. `src/components/platform/AppShell.tsx`
- Import `alchemyItems` alongside `movementItems`.
- Add a generic `DropdownNav({ label, items, triggerClassName })` (or a second `AlchemyMenu` clone of `MovementMenu`) so both dropdowns share styling — uses the same Radix `DropdownMenu`, `sanctuary-panel`, z-index, and `Link` styling already in `MovementMenu` (so the menu sits above page imagery, matching the earlier hidden-behind-photo fix).
- Update `leadingNavItems` / `trailingNavItems` slice indexes for the new `navItems` length (Home, Sanctuary, Quests, Skill Trees → leading; Library, Community → trailing).
- Render order in both desktop and mobile nav: leading items → Movement dropdown → Alchemy dropdown → trailing items.

## Out of scope

- No content, route, or styling changes to `/alchemists-path` or `/smoothie-codex` themselves.
- No changes to skill-tree linking or progress stores.

## Verification

- `/alchemists-path` and `/smoothie-codex` still load directly.
- Header shows: Home · Sanctuary · Quests · Skill Trees · Movement ▾ · Alchemy ▾ · Library · Community.
- Hovering "Alchemy" reveals Herbal Path and Smoothie Codex; selecting either navigates correctly and shows the active state.
- Mobile horizontal nav shows the Alchemy chip dropdown alongside Movement.
