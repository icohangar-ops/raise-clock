import test from "node:test";
import assert from "node:assert/strict";
import { project, headline, boardNote, validate, formatMonth, SAMPLE } from "../src/model.js";

const base = { ...SAMPLE, cash: 5000000, ga: 150000, drillCost: 0, ftAmount: 0, bufferMonths: 0, leadMonths: 0 };

test("zero-cash month with no drill (PRD acceptance)", () => {
  assert.equal(project(base).zeroMonth, 34);
});
test("raise-by = buffer breach minus lead time", () => {
  const r = project({ ...base, bufferMonths: 3, leadMonths: 3 });
  assert.equal(r.breachMonth, 31); // cash < 450k first at month 31
  assert.equal(r.raiseBy, 28);
});
test("drill spend is split evenly and pulls the date earlier", () => {
  const r0 = project(base), r1 = project({ ...base, drillCost: 900000, drillMonths: 3, drillStart: 2 });
  assert.equal(r1.months[1].drill, 300000);
  assert.ok(r1.zeroMonth < r0.zeroMonth);
});
test("flow-through short when drill slips past deadline", () => {
  const inp = { ...SAMPLE };
  assert.equal(project(inp).flowThrough.ok, true);
  const late = project({ ...inp, drillStart: 15 }); // Jan 2028 start, after Dec 2027 deadline
  assert.equal(late.flowThrough.ok, false);
  assert.equal(late.flowThrough.short, 1500000);
});
test("headline states", () => {
  assert.match(headline(base, project({ ...base, cash: 1e9 })).text, /No raise needed/);
  assert.match(headline(base, project({ ...base, cash: 100000, bufferMonths: 3, leadMonths: 3 })).text, /late/);
  assert.match(headline(SAMPLE, project(SAMPLE)).text, /^Start your raise by/);
});
test("board note has four lines", () => {
  assert.equal(boardNote(SAMPLE, project(SAMPLE)).split("\n").length, 4);
});
test("validation and month formatting", () => {
  assert.ok(validate({ ...SAMPLE, cash: -1 }).cash);
  assert.ok(validate({ ...SAMPLE, startMonth: "nov" }).startMonth);
  assert.deepEqual(validate(SAMPLE), {});
  assert.equal(formatMonth("2026-11", 3), "Jan 2027");
});
