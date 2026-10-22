# Devpost submission — Build With AI: Basics

> NOTE: The 6-ship skill says the project name, description and survey answers should be written by the entrant. Treat everything below as notes to rewrite in your own words before pasting.

- **Project name:** Raise Clock
- **Tagline:** Know your raise date before your cash does — a runway and flow-through planner for junior mining CFOs.
- **Repo:** https://github.com/icohangar-ops/raise-clock
- **Live demo:** https://raise-clock.vercel.app
- **Video:** (upload demo.mp4 to YouTube/Vimeo, then paste link)
- **Built with:** JavaScript, HTML, CSS, SVG, Node test runner, Vercel, Devpost Learn skill pack

## What it does
Junior exploration companies have no revenue and live from financing to financing. Raise Clock takes cash on hand, monthly G&A, the drill program and the flow-through commitment, and gives one answer: the month you must start your next raise (when cash will cross your buffer, minus the time a raise takes). It also flags whether drilling will meet the flow-through spending deadline, plots 36 months of cash, and produces a four-line board note.

## Who it's for
Part-time CFOs and CEOs of TSX-V / CSE explorers who currently do this in a spreadsheet before each board meeting.

## How we built it
Started from an empty folder with the Devpost Learn skills: 1-start → 2-scope → 3-prd → 4-spec produced devpost/scope.md, prd.md and spec.md, then 5-build split the work into three tested slices (raise-by date, flow-through + slider, chart/board note/storage). Pure-JS model with node:test unit tests; static site on Vercel; no server and no data leaves the browser.

## What I learned
Running the real numbers changed the plan: delaying the drill program barely moves the raise date, but it can break the flow-through promise — so that became the demo's key moment (recorded under Revisions in checklist.md). Keeping money math in one pure, tested module made every change safe.

## What's next
CSV import from accounting, multiple programs, warrant inflows, CAD/USD.

---

# Video script (1:38, narration = video/segs.txt, TTS voice)
| Time | Screen | Narration |
|---|---|---|
| 0:00 | App loaded | Problem: CFO question is "when must we start raising?" |
| 0:15 | Cash / G&A / drill inputs highlighted | Sample company Copper Ridge Resources |
| 0:29 | Headline, chart | Raise by Oct 2027 — buffer breach Jan 2028 minus 3-month raise |
| 0:47 | Drag drill slider 4→14 | Raise date barely moves; flow-through flips red, short $0.9M |
| 1:04 | G&A 140k→110k, lead 3→5 | Raise date → Feb 2028, then back to Dec 2027 |
| 1:18 | Copy board note | Four-line board note, saved inputs, deterministic tests |
| 1:27 | GitHub devpost/ folder | Planned with skill pack: scope, PRD, spec, three slices |
