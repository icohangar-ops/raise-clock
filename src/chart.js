const W = 900, H = 300, P = { l: 64, r: 12, t: 16, b: 34 };
export function renderChart(el, r) {
  const vals = r.months.map((x) => x.closing);
  const max = Math.max(...vals, r.buffer, 1), min = Math.min(...vals, 0);
  const y = (v) => P.t + (max - v) / (max - min) * (H - P.t - P.b);
  const bw = (W - P.l - P.r) / r.months.length;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Month-end cash chart">`;
  for (let i = 0; i <= 4; i++) { const v = min + (max - min) * i / 4, yy = y(v);
    s += `<line x1="${P.l}" x2="${W - P.r}" y1="${yy}" y2="${yy}" stroke="#26313d"/><text x="${P.l - 8}" y="${yy + 4}" fill="#8a99a8" font-size="11" text-anchor="end">${v < 0 ? "-" : ""}$${(Math.abs(v) / 1e6).toFixed(1)}M</text>`; }
  r.months.forEach((m, i) => {
    const x = P.l + i * bw + 2, top = y(Math.max(m.closing, 0)), bot = y(Math.min(m.closing, 0));
    const fill = m.closing < 0 ? "#e5534b" : m.drill > 0 ? "#c8793a" : "#5b7a99";
    s += `<rect x="${x}" y="${top}" width="${bw - 4}" height="${Math.max(bot - top, 1)}" rx="2" fill="${fill}"><title>${m.label}: $${Math.round(m.closing).toLocaleString()}</title></rect>`;
    if (i % 3 === 0) s += `<text x="${x + bw / 2}" y="${H - 12}" fill="#8a99a8" font-size="11" text-anchor="middle">${m.label.replace(" 20", " '")}</text>`;
  });
  s += `<line x1="${P.l}" x2="${W - P.r}" y1="${y(r.buffer)}" y2="${y(r.buffer)}" stroke="#e0a53a" stroke-dasharray="6 4"/>`;
  if (r.raiseBy !== null && r.raiseBy >= 1) { const x = P.l + (r.raiseBy - 1) * bw + bw / 2;
    s += `<line x1="${x}" x2="${x}" y1="${P.t}" y2="${H - P.b}" stroke="#3fb27f" stroke-width="2"/><text x="${x + 6}" y="${P.t + 12}" fill="#3fb27f" font-size="12" font-weight="700">raise by</text>`; }
  return (el.innerHTML = s + "</svg>");
}
