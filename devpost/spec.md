---
doc: spec
status: draft
---
# Raise Clock — Technical Spec

## How This Works, In Plain Language
A static web page. All math lives in one small JavaScript file (`src/model.js`) that takes the inputs and returns the month-by-month cash table plus the headline dates. The page (`index.html` + `src/app.js`) reads the form, calls the model, draws an SVG chart and writes the board note. Inputs are saved in the browser's localStorage. No server, no keys, no AI calls.

## The Core Journey Through the System
User edits a field → `app.js` reads and validates the form → `model.project(inputs)` returns `{months, zeroMonth, breachMonth, raiseBy, flowThrough}` → `app.js` renders headline, tiles, chart (`chart.js`) and note (`model.boardNote`) → state saved to localStorage. PRD ref: `prd.md > The Core Journey`.

## Stack
- Vanilla HTML/CSS/ES modules — no build step; easy to read and to record. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
- Tests: Node's built-in test runner (`node --test`). https://nodejs.org/api/test.html
- Optional hosting: Vercel static deploy. https://vercel.com/docs

## Where It Runs and How Someone Tries It
Browser. Locally: `npx serve .` (or any static server) and open http://localhost:3000. Tests: `npm test` (Node 18+). Demo video records the local or deployed page. Deployment: `vercel --prod` as a static site.

## Look and Feel
CSS variables: `--bg #0f1419`, `--panel #182029`, `--copper #c8793a`, `--good #3fb27f`, `--bad #e5534b`; system-ui font, `font-variant-numeric: tabular-nums`; headline 2.4rem.

## Components
### Model (`src/model.js`)
`project(inputs)`, `boardNote(inputs, result)`, `formatMonth(start, offset)`. Implements `prd.md > Runway Projection`, `Raise-By Date`, `Flow-Through Status`, `Board Note`.
### UI controller (`src/app.js`)
Form binding, validation, localStorage, copy button. Implements `prd.md > Saved Inputs`, `States and Boundaries`.
### Chart (`src/chart.js`)
Inline SVG bars of closing cash, buffer line, raise-by and zero-cash markers.

## Data Model
Inputs object `{cash, startMonth:"YYYY-MM", ga, drillStart, drillCost, drillMonths, ftAmount, ftDeadline:"YYYY-MM", bufferMonths, leadMonths}` in localStorage key `raiseclock.v1`. Month offsets: month 1 = startMonth.

## File Structure
```
raise-clock/
├── index.html        # page shell and form
├── styles.css        # look and feel
├── src/model.js      # pure projection math (tested)
├── src/chart.js      # SVG chart
├── src/app.js        # UI wiring, storage, copy
├── tests/model.test.js
├── package.json      # npm test
├── devpost/          # scope, prd, spec, checklist, app map
└── README.md
```

## External Services and Dependencies
None at runtime. Vercel for optional hosting (free tier).

## Important Failure Modes
- **Bad input** → field marked red, last valid result kept.
- **Clipboard API blocked** → note text is selected for manual copy.

## What Was Simplified and Why
- **Even monthly drill spend** instead of a drill schedule — enough to prove the kernel.
- **No AI commentary** — board numbers must be reproducible; the Boundless account was also out of credits.

## Decisions and Open Issues
- Deterministic model, no backend. Uncertainty discussed: whether "raise-by" should key off zero cash or the buffer — chosen: buffer breach minus lead time, verified by tests.
