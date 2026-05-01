## Goal

Replace the single "Yoga Lab" header tab with a "Movement" dropdown button containing two sections — Yoga Therapy Lab and Tai Chi Lab.

## Current state

The code in `src/components/platform/AppShell.tsx` **already implements this exact feature**:
- Desktop nav renders a `MovementMenu` component (a hover/focus dropdown labeled "Movement" with a chevron) between "Skill Trees" and "Library".
- The dropdown lists both `movementItems` from `src/components/platform/data.ts`: Yoga Therapy Lab → `/yoga-therapy-lab`, Tai Chi Lab → `/tai-chi-lab`.
- Mobile nav uses a `<details>` element with the same two links.

The live published site at `glow-ascend-quest.lovable.app` still shows the old "Yoga Lab" tab because the published deployment is stale relative to the current source.

## Plan

No code changes needed. The fix is a republish:

1. Open the **Publish** dialog (top-right in desktop, ⋯ menu on mobile).
2. Click **Update** to redeploy the latest build.
3. Hard-refresh the live site and confirm the header shows **Movement** (with chevron) instead of **Yoga Lab**, and that hovering/clicking it reveals **Yoga Therapy Lab** and **Tai Chi Lab**.

If after republishing the dropdown still doesn't appear, switch to build mode and I will inspect for a caching/build issue or an alternate header component being rendered.

## Optional enhancements (only if you want them)

- Add short descriptions or icons under each dropdown item (e.g. a leaf icon for Yoga, a wave icon for Tai Chi).
- Group the two items under labeled subheadings ("Yoga", "Tai Chi") with separators inside the dropdown.

Let me know if you'd like either of these and I'll fold them into the implementation.