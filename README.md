# Raise Clock

**When must a junior mining company start its next financing?** Raise Clock turns cash, G&A burn, the drill program and the flow-through commitment into one date: *start your raise by …* — plus a cash chart, a flow-through check, and a copy-ready board note.

Live demo: https://raise-clock.vercel.app · Built for Devpost **Build With AI: Basics** (Oct 2026).

## Why
Exploration companies have no revenue. A raise takes ~3 months, boards want a cash buffer, and flow-through money must be spent on eligible exploration by a deadline. Most CFOs track this in a spreadsheet; missing the window means a discounted, dilutive financing. Raise Clock answers the one question that matters.

## How it works
- Month-by-month projection (36 months): closing cash = opening − G&A − drill spend (spread evenly over the program).
- **Raise-by month** = first month cash drops below the buffer (buffer months × G&A) − raise lead time.
- **Flow-through status** = eligible drill spend on/before the deadline vs. the amount committed.
- Deterministic and private: pure JavaScript in your browser, inputs saved to localStorage, no server, no AI calls.

## Run it
```bash
npx serve .            # or: python3 -m http.server 3000
# open http://localhost:3000
npm test               # Node 18+, uses node:test
```

## Planning docs (generated with the Devpost Learn skill pack)
`devpost/scope.md` · `devpost/prd.md` · `devpost/spec.md` · `devpost/checklist.md` · `devpost/app-map.html`

## Structure
```
index.html  styles.css
src/model.js   pure projection math (tested)
src/chart.js   SVG chart
src/app.js     UI wiring, storage, clipboard
tests/model.test.js
```

Not financial advice. MIT License.
