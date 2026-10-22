---
doc: scope
status: draft
---
# Raise Clock

A one-screen runway planner that tells a junior mining CFO the exact date they must start their next financing.

## The Unique Kernel
Generic runway calculators answer "when do we hit zero?". A junior miner needs a different date: **the last day to launch a raise**, which is zero-cash date minus the minimum cash buffer, minus the time a financing actually takes to close, while still meeting the flow-through spending deadline promised to investors. Raise Clock computes that "raise-by" date and shows how moving the drill program moves it.

## Who It's For
The part-time CFO or CEO of a TSX-V / CSE exploration company with $1–10M in the bank, one drill program a year, and flow-through money that must be spent by Dec 31 of the following year. Today they do this in a fragile spreadsheet the night before a board meeting.

## The Core Loop
Open the page → enter cash, monthly G&A, the drill program (start month, cost, length), flow-through commitment and raise lead time → instantly see the cash curve, the zero-cash month, the **raise-by date**, and a flow-through status → drag the drill start to test "what if we drill later?" → copy the board note. They come back every month-end when cash changes.

## Inspiration & Identity
Feels like a calm board-pack page: dark slate, one copper accent (mining), big numbers, no clutter. Bloomberg-terminal clarity, not a SaaS dashboard.

## Why This Matters to the Learner
Shyam works on corporate finance for junior miners; missing the raise window is the most common way these companies get forced into a punitive discounted financing.

## What "Working" Looks Like
The sample company shows "Start your raise by **Oct 2027**". Dragging the drill start later shows the trap: the raise date barely moves, but once the program slips past the flow-through deadline the badge flips red — "Short $1.5M". Cutting G&A or adding cash moves the date. That's the "oh" moment.

## The POC Boundary
Single page, browser only, monthly granularity, one drill program, one flow-through commitment, deterministic math, copyable board note, sample company preloaded, inputs saved in the browser.

## Later
Multiple programs, CSV import from the accounting system, warrant-exercise inflows, CAD/USD, AI-written board commentary.

## Explicitly Cut
- Accounts/login — no need for one person's planning tool.
- AI inference in the core math — numbers must be deterministic and auditable for a board.
- Share-dilution modelling — a different question; would double the scope.
