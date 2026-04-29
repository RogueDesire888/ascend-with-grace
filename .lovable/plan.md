Refine the Sanctuary page so it is much closer to the uploaded floating temple reference, with stronger third-person exploration and celebratory quest completion feedback.

1. Match the reference much more closely
   - Reframe the Sanctuary scene around the uploaded image as the primary cinematic art direction: bright blue sky, massive cloud banks, white marble temple, front stairway, lush flower terraces, waterfalls, and floating rock underside.
   - Reduce the current dark overlay and UI darkness so the page reads like the reference: luminous, airy, premium, and heavenly.
   - Make the reference image dominate the first impression while the 3D layer supplies interactivity, movement, avatar, portals, depth, and VFX.
   - Tune the 3D camera, lighting, fog, and canvas opacity so the procedural 3D objects augment the reference instead of visually fighting it.
   - Improve responsive framing so the temple/island remains centered and impressive on desktop and mobile.

2. Improve third-person avatar movement and character view
   - Keep the visible avatar in the Sanctuary scene.
   - Tune the follow camera to feel more like a third-person game view: avatar lower center, temple/path ahead, smoother movement.
   - Keep WASD/arrow movement on desktop.
   - Keep click/tap-to-move destination movement for mobile and pointer users.
   - Make the avatar scale, glow, and trail feedback more premium so it feels like a real player character inside the sanctuary.

3. Fix the “Arrival Terrace” options menu behavior
   - The top “Arrival Terrace” control should behave like a menu trigger, not an always-visible panel state.
   - Only show the Arrival Terrace options menu when the user selects/clicks that button.
   - Hide the menu when:
     - the user selects a destination,
     - clicks/taps outside the menu,
     - starts moving, or
     - chooses a quest/skill action.
   - Keep mobile destination chips available separately so navigation remains easy on touch devices.

4. Add quest completion actions inside the Sanctuary
   - Add a clear “Complete Quest” action to quest cards shown in Sanctuary zone panels.
   - Completion will be instant frontend state for this pass, because the app does not currently have persistent user accounts/data connected for quests.
   - Completed quests should visually update immediately: status changes to completed, the quest card locks into a finished/glowing state, and the user sees the reward applied.

5. Add celebratory Ascension VFX
   - On quest completion, trigger a premium ascension celebration:
     - avatar glow ramp
     - golden radial bloom over the Sanctuary
     - spark trails rising from the avatar/quest panel
     - floating XP text
     - brief screen shimmer/light sweep
     - portal pulse in the active zone
   - Keep the effect elegant and expensive-looking rather than arcade/cartoon.
   - Respect reduced-motion settings with a simplified glow-only celebration.

6. Add sound cues without requiring backend setup
   - Add short, tasteful sound cues using the browser Web Audio API:
     - soft chime on quest completion
     - subtle ascending tone for Ascension Level increase
   - Sounds will only play after user interaction, so they comply with browser autoplay rules.
   - Add a small mute/unmute control in the Sanctuary HUD.
   - No external audio generation or API key will be required in this pass.

7. Update Ascension Level instantly
   - Add local Sanctuary state for current Ascension Level, starting from the existing mock value of 24.
   - When a quest is completed, immediately add XP/glow and animate the Ascension Level display.
   - If the reward crosses the configured threshold, bump the level instantly and show the ascension VFX.
   - Show the updated level in the Sanctuary HUD and completion overlay.
   - Keep this presentational/session-based unless persistent accounts/data are requested later.

8. Technical implementation
   - Main file: `src/components/platform/SanctuaryWorld.tsx`.
   - Styling file: `src/styles.css` for bright reference-matched overlays, VFX animations, spark trails, glow ramps, and menu states.
   - Existing quest/skill data will continue to come from `src/components/platform/data.ts`.
   - No backend, database, auth, or persistent quest storage will be added in this pass.

Validation
   - Verify `/sanctuary` loads without console/runtime errors.
   - Verify the visual direction is brighter and closer to the uploaded reference.
   - Verify third-person movement works with keyboard and tap/click destinations.
   - Verify the Arrival Terrace menu only appears after clicking the Arrival Terrace button.
   - Verify completing a quest triggers VFX, sound cue, completed state, XP/glow update, and Ascension Level update.
   - Check desktop and mobile screenshots for framing, readability, and no major overlap.