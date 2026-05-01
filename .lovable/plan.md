## Remove "Movement" dropdown from header

Currently the header has a "Movement" dropdown that only contains a single link to `/tai-chi-lab`. Since Tai Chi now has its own dedicated dropdown with 11 sub-pages, the Movement dropdown is redundant.

### Changes
- **`src/components/platform/AppShell.tsx`**: Remove the `<NavDropdown label="Movement" ... />` from both the desktop nav (line ~100) and the mobile nav (line ~139–141). Remove `movementItems` from the import on line 9.
- **`src/components/platform/data.ts`**: Remove the `movementItems` export (lines 199–201) since nothing else uses it.

The `/tai-chi-lab` route itself stays intact — only its header entry is removed. If you'd like it linked from somewhere else (e.g. inside the Tai Chi dropdown as "Tai Chi Lab"), let me know and I'll add that too.