export const HORIZON = 36;
export const SAMPLE = {
  company: "Copper Ridge Resources", cash: 4200000, startMonth: "2026-11", ga: 140000,
  drillStart: 4, drillCost: 1800000, drillMonths: 3,
  ftAmount: 1500000, ftDeadline: "2027-12", bufferMonths: 3, leadMonths: 3,
};

export function monthIndex(ym) { const [y, m] = ym.split("-").map(Number); return y * 12 + (m - 1); }
export function formatMonth(startMonth, offset) {
  const i = monthIndex(startMonth) + offset - 1;
  return new Date(Date.UTC(Math.floor(i / 12), i % 12, 1))
    .toLocaleString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

export function validate(inp) {
  const errors = {};
  for (const k of ["cash", "ga", "drillStart", "drillCost", "drillMonths", "ftAmount", "bufferMonths", "leadMonths"]) {
    const v = inp[k];
    if (typeof v !== "number" || !Number.isFinite(v) || v < 0) errors[k] = "Must be a number ≥ 0";
  }
  if (!errors.drillStart && inp.drillStart < 1) errors.drillStart = "Month 1 or later";
  if (!errors.drillMonths && inp.drillMonths < 1) errors.drillMonths = "At least 1 month";
  for (const k of ["startMonth", "ftDeadline"]) if (!/^\d{4}-\d{2}$/.test(inp[k] || "")) errors[k] = "Use YYYY-MM";
  return errors;
}

export function project(inp) {
  const months = [];
  let cash = inp.cash, zeroMonth = null, breachMonth = null, ftSpent = 0;
  const buffer = inp.bufferMonths * inp.ga;
  const ftLast = monthIndex(inp.ftDeadline) - monthIndex(inp.startMonth) + 1;
  const perDrill = inp.drillCost / inp.drillMonths;
  for (let m = 1; m <= HORIZON; m++) {
    const drill = m >= inp.drillStart && m < inp.drillStart + inp.drillMonths ? perDrill : 0;
    const opening = cash;
    cash = opening - inp.ga - drill;
    if (m <= ftLast) ftSpent += drill;
    if (breachMonth === null && cash < buffer) breachMonth = m;
    if (zeroMonth === null && cash < 0) zeroMonth = m;
    months.push({ m, label: formatMonth(inp.startMonth, m), opening, ga: inp.ga, drill, closing: cash });
  }
  const raiseBy = breachMonth === null ? null : breachMonth - inp.leadMonths;
  const ftShort = Math.max(0, inp.ftAmount - ftSpent);
  return {
    months, buffer, zeroMonth, breachMonth, raiseBy,
    runwayMonths: zeroMonth === null ? null : zeroMonth - 1,
    flowThrough: { committed: inp.ftAmount, spent: ftSpent, short: ftShort, ok: ftShort === 0, deadline: inp.ftDeadline },
  };
}

export const money = (n) => (n < 0 ? "-" : "") + "$" + Math.round(Math.abs(n)).toLocaleString("en-US");
export const moneyM = (n) => (n < 0 ? "-" : "") + "$" + (Math.abs(n) / 1e6).toFixed(2) + "M";

export function headline(inp, r) {
  if (r.raiseBy === null) return { text: "No raise needed in the next 3 years", tone: "good" };
  if (r.raiseBy <= 1) {
    const late = 1 - r.raiseBy;
    return { text: late === 0 ? "Start your raise this month" : `Raise now — you're ${late} month${late > 1 ? "s" : ""} late`, tone: "bad" };
  }
  return { text: `Start your raise by ${formatMonth(inp.startMonth, r.raiseBy)}`, tone: r.raiseBy <= 3 ? "warn" : "good" };
}

export function boardNote(inp, r) {
  const name = inp.company || "The company";
  const runway = r.zeroMonth === null ? "beyond 36 months" : `${r.runwayMonths} months (cash runs out in ${formatMonth(inp.startMonth, r.zeroMonth)})`;
  const h = headline(inp, r);
  const ft = r.flowThrough.ok
    ? `Flow-through: on track — ${money(r.flowThrough.spent)} of eligible spend vs ${money(r.flowThrough.committed)} committed, by ${formatMonth(inp.ftDeadline, 1)}.`
    : `Flow-through: SHORT ${money(r.flowThrough.short)} — only ${money(r.flowThrough.spent)} of ${money(r.flowThrough.committed)} spent by ${formatMonth(inp.ftDeadline, 1)}.`;
  return [
    `${name}: cash ${money(inp.cash)} at ${formatMonth(inp.startMonth, 1)}; runway ${runway}.`,
    `Financing: ${h.text} (assumes ${inp.leadMonths}-month raise process and a ${inp.bufferMonths}-month G&A buffer of ${money(r.buffer)}).`,
    ft,
    `Drill program: ${money(inp.drillCost)} over ${inp.drillMonths} months starting ${formatMonth(inp.startMonth, inp.drillStart)}.`,
  ].join("\n");
}
