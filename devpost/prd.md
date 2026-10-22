---
doc: prd
status: approved
---
# Raise Clock — Product Requirements

A single-page runway planner for junior-mining CFOs that turns a few inputs into a "start your raise by" date. Source: `scope.md > The Unique Kernel`.

## The Core Journey
1. The user opens the page; a sample company ("Copper Ridge Resources") is preloaded so results show immediately.
2. They edit inputs in the left panel: cash on hand, start month, monthly G&A burn, drill program (start month offset, total cost, duration), flow-through commitment and its spend deadline, minimum cash buffer (months of G&A), raise lead time (months).
3. Results update on every keystroke: headline raise-by date, zero-cash month, months of runway, flow-through status, and a monthly cash chart with the buffer line and the raise-by month marked.
4. They drag the "drill start" slider and watch the headline and badge change.
5. They click "Copy board note" and paste a 4-line plain-English summary into their board pack.
6. They reload later and their inputs are still there; "Reset to sample" restores the sample.

## Screens and Layout
One screen: inputs panel left (stacked on mobile), results right — headline card, three stat tiles, chart, board note box.

## Look and Feel
Dark slate background, copper (#c8793a) accent, white numerals; system UI font, tabular figures; large headline; minimal borders. Source: `scope.md > Inspiration & Identity`.

## Features and Behavior

### Runway Projection
Month-by-month closing cash = previous cash − G&A − drill spend for that month (drill cost split evenly over its duration). Projection covers 36 months.
- Acceptance: with cash 5,000,000, G&A 150,000, no drill, zero-cash month is month 34 (cash first goes below 0).

### Raise-By Date
Buffer cash = buffer months × G&A. "Buffer breach month" = first month closing cash < buffer. Raise-by month = buffer breach month − lead time. If that is in the past/now, the headline reads "Raise now — you're late by N months" in red.
- Acceptance: lowering G&A or raising cash moves the headline date later; increasing lead time moves it earlier.

### Flow-Through Status
Sum drill spend dated on or before the flow-through deadline. If ≥ commitment → green "On track"; else red "Short $X by deadline".

### Board Note
Four lines: cash today and runway; raise-by date with lead-time assumption; flow-through status; drill program timing. Copy button copies text and shows "Copied".

### Saved Inputs
Inputs persist in the browser; reset restores the sample.

## States and Boundaries
- Invalid/negative or empty numbers → field outlined red, results show last valid state.
- Never runs out within 36 months → headline "No raise needed in the next 3 years".
- G&A of 0 with no drill → same as above.

## What We're Building / Deferred
Building: everything above. Deferred: see `scope.md > Later`.

## Product Decisions
Monthly granularity; even drill spend; 36-month horizon; deterministic output (no AI) for board auditability.

## Open Questions
None blocking.
