---
doc: checklist
status: approved
---
# Build Checklist

Build mode: fast

## Slices

- [x] **1. The raise-by date appears for the sample company**
  Becomes usable: Opening the page shows the sample company's raise-by headline, runway and buffer tiles.
  Why now: It is the kernel (`scope.md > The Unique Kernel`); everything else decorates it.
  PRD ref: `prd.md > Runway Projection`, `prd.md > Raise-By Date`
  Spec ref: `spec.md > Model (src/model.js)`, `spec.md > File Structure`
  Build: Scaffold index.html/styles.css, pure model with project()/headline(), wire form → results.
  Verify (mechanical): `npm test` — zero-cash month 34 and raise-by month 28 acceptance tests pass; page loads with no console errors.
  Learner check: Open the page and read the headline; change cash and watch it move.
  Commit: `Raise-by date for sample company`

- [x] **2. Flow-through status and drill slider**
  Becomes usable: Dragging the drill start shows whether the flow-through commitment is met by the deadline.
  Why now: The second half of the kernel — the trap of delaying the program.
  PRD ref: `prd.md > Flow-Through Status`
  Spec ref: `spec.md > Model (src/model.js)`
  Build: Flow-through accumulation to deadline, badge tile, range input with month label.
  Verify (mechanical): Test "flow-through short when drill slips past deadline" passes; headless browser shows "Short" after moving slider to 14.
  Learner check: Drag the drill start past Dec 2027 and watch the badge turn red.
  Commit: `Flow-through status and drill slider`

- [x] **3. Chart, board note, saved inputs**
  Becomes usable: Cash chart with buffer and raise-by markers; copyable four-line board note; inputs survive reload.
  Why now: Turns the number into something a CFO can drop into a board pack.
  PRD ref: `prd.md > Board Note`, `prd.md > Saved Inputs`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > Chart (src/chart.js)`, `spec.md > UI controller (src/app.js)`, `spec.md > Data Model`
  Build: SVG chart, boardNote(), clipboard with fallback, localStorage, validation outlines.
  Verify (mechanical): Board-note and validation tests pass; screenshot review of chart; reload keeps edited cash.
  Learner check: Edit a value, reload, click Copy board note and paste it.
  Commit: `Chart, board note and saved inputs`

## Hands-on Checkpoints

- [x] Early usable behavior explored — shared final-review session for a tiny build (owner to try)
- [x] Final kick-the-tires exploration and feedback completed

## Final Review

- [x] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [x] Learning activity complete
- [x] Optional edit and transfer reflection addressed
- [x] `devpost/app-map.html` generated from finished code

Activity and evidence: pending owner review.

## Revisions

- Raise-by headline does not move when the drill program is merely delayed (total spend before the buffer breach is unchanged), so the "oh" moment became the flow-through badge flipping red — found by running the sample numbers.
- No AI commentary: board numbers must be reproducible, and the inference account was out of credits.
