import { SAMPLE, project, validate, headline, boardNote, formatMonth, moneyM, money } from "./model.js";
import { renderChart } from "./chart.js";
const KEY = "raiseclock.v1", form = document.getElementById("inputs"), $ = (id) => document.getElementById(id);
const TEXT = ["company", "startMonth", "ftDeadline"];
function fill(v) { for (const [k, val] of Object.entries(v)) if (form.elements[k]) form.elements[k].value = val; }
function read() { const o = {}; for (const el of form.elements) if (el.name) o[el.name] = TEXT.includes(el.name) ? el.value : el.value === "" ? NaN : Number(el.value); return o; }
let last = SAMPLE;
function update() {
  const inp = read(), errs = validate(inp);
  for (const el of form.elements) if (el.name) el.classList.toggle("invalid", !!errs[el.name]);
  $("drillStartOut").textContent = Number.isFinite(inp.drillStart) && /^\d{4}-\d{2}$/.test(inp.startMonth) ? `${inp.drillStart} · ${formatMonth(inp.startMonth, inp.drillStart)}` : "";
  const good = Object.keys(errs).length === 0 ? inp : last; if (good === inp) { last = inp; localStorage.setItem(KEY, JSON.stringify(inp)); }
  const r = project(good), h = headline(good, r);
  $("headline").className = "headline " + h.tone; $("headlineText").textContent = h.text;
  $("headlineSub").textContent = r.breachMonth ? `Cash falls below your ${good.bufferMonths}-month buffer in ${formatMonth(good.startMonth, r.breachMonth)}; a raise takes ~${good.leadMonths} months.` : "Cash stays above your buffer for the whole horizon.";
  $("tRunway").textContent = r.zeroMonth ? `${r.runwayMonths} mo` : "36+ mo";
  $("tZero").textContent = r.zeroMonth ? `Zero cash ${formatMonth(good.startMonth, r.zeroMonth)}` : "No zero-cash month";
  $("tBuffer").textContent = moneyM(r.buffer); $("tBreach").textContent = r.breachMonth ? `Breached ${formatMonth(good.startMonth, r.breachMonth)}` : "Never breached";
  const ft = r.flowThrough; $("ftTile").className = "tile " + (ft.ok ? "ok" : "short");
  $("tFt").textContent = ft.ok ? "On track" : `Short ${moneyM(ft.short)}`;
  $("tFtSub").textContent = `${money(ft.spent)} eligible by ${formatMonth(good.ftDeadline, 1)}`;
  renderChart($("chart"), r); $("note").textContent = boardNote(good, r);
}
$("copy").onclick = async () => { const b = $("copy");
  try { await navigator.clipboard.writeText($("note").textContent); b.textContent = "Copied ✓"; }
  catch { getSelection().selectAllChildren($("note")); b.textContent = "Press ⌘C"; }
  setTimeout(() => (b.textContent = "Copy board note"), 1500); };
$("reset").onclick = () => { localStorage.removeItem(KEY); fill(SAMPLE); update(); };
let saved = null; try { saved = JSON.parse(localStorage.getItem(KEY)); } catch {}
fill(saved && !Object.keys(validate(saved)).length ? saved : SAMPLE);
form.addEventListener("input", update); update();
