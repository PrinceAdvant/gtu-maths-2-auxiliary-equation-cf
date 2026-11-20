// GTU Maths 2: complementary function (CF) of a_n y^(n) + ... + a_1 y' + a_0 y = 0
// from the roots of the auxiliary equation a_n m^n + ... + a_0 = 0 (order 1 to 4).
(function (root) {
  function roots(c) { // c = [a_n, ..., a_0], Durand-Kerner
    const n = c.length - 1;
    if (n < 1) throw new Error('Need at least order 1');
    if (c[0] === 0) throw new Error('Leading coefficient cannot be 0');
    const a = c.map(x => x / c[0]);
    const mul = (p, q) => [p[0] * q[0] - p[1] * q[1], p[0] * q[1] + p[1] * q[0]];
    const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
    const div = (p, q) => { const d = q[0] * q[0] + q[1] * q[1]; return [(p[0] * q[0] + p[1] * q[1]) / d, (p[1] * q[0] - p[0] * q[1]) / d]; };
    const ev = z => a.reduce((acc, k) => [mul(acc, z)[0] + k, mul(acc, z)[1]], [0, 0]);
    let z = Array.from({ length: n }, (_, i) => { const t = 0.4 + 0.9; return [Math.pow(t, i) * Math.cos(i * 1.1 + 0.3), Math.pow(t, i) * Math.sin(i * 1.1 + 0.3)]; });
    for (let it = 0; it < 2000; it++) {
      z = z.map((zi, i) => { let den = [1, 0]; z.forEach((zj, j) => { if (j !== i) den = mul(den, sub(zi, zj)); }); return sub(zi, div(ev(zi), den)); });
    }
    return z.map(([re, im]) => [snap(re), snap(im)]);
  }
  function snap(x) {
    for (const d of [1, 2, 3, 4, 5, 6]) { const r = Math.round(x * d) / d; if (Math.abs(x - r) < 1e-6) return r; }
    return Math.round(x * 1e4) / 1e4;
  }
  function frac(x) {
    for (const d of [1, 2, 3, 4, 5, 6]) { const nm = Math.round(x * d); if (Math.abs(x * d - nm) < 1e-9) return d === 1 ? String(nm) : nm + '/' + d; }
    return String(x);
  }
  function group(rs) { // merge repeated roots, keep one of each conjugate pair (im >= 0)
    const out = [];
    for (const [re, im] of rs) {
      if (im < 0) continue;
      const g = out.find(o => Math.abs(o.re - re) < 1e-5 && Math.abs(o.im - im) < 1e-5);
      if (g) g.k++; else out.push({ re, im, k: 1 });
    }
    return out.sort((p, q) => p.im - q.im || p.re - q.re);
  }
  function cf(c) {
    const rs = roots(c);
    const g = group(rs);
    let idx = 1; const terms = [];
    const C = () => 'c' + (idx++);
    const ex = re => { if (re === 0) return ''; const f = frac(re); if (f.includes('/')) { const [p, q] = f.split('/'); return 'e^(' + (p === '1' ? '' : p === '-1' ? '-' : p) + 'x/' + q + ')'; } return 'e^(' + (re === 1 ? '' : re === -1 ? '-' : f) + 'x)'; };
    for (const r of g) {
      const polyC = n => { const ps = []; for (let i = 0; i < n; i++) ps.push(C() + (i === 0 ? '' : i === 1 ? ' x' : ' x^' + i)); return ps; };
      if (r.im === 0) {
        const p = polyC(r.k);
        terms.push((p.length > 1 ? '(' + p.join(' + ') + ')' : p[0]) + (ex(r.re) ? ' ' + ex(r.re) : ''));
      } else {
        const b = r.im === 1 ? '' : frac(r.im);
        const p1 = polyC(r.k), p2 = polyC(r.k);
        const w = s => s.length > 1 ? '(' + s.join(' + ') + ')' : s[0];
        terms.push((ex(r.re) ? ex(r.re) + ' ' : '') + '[' + w(p1) + ' cos ' + b + 'x + ' + w(p2) + ' sin ' + b + 'x]');
      }
    }
    const kind = g.map(r => r.im === 0 ? (r.k > 1 ? 'real, repeated ' + r.k + ' times' : 'real, distinct') : 'complex pair' + (r.k > 1 ? ', repeated ' + r.k + ' times' : ''));
    return { roots: rs, groups: g, kinds: kind, cf: 'y_c = ' + terms.join(' + '), frac, show: r => frac(r[0]) + (r[1] === 0 ? '' : (r[1] > 0 ? ' + ' : ' - ') + (Math.abs(r[1]) === 1 ? '' : frac(Math.abs(r[1]))) + 'i') };
  }
  const api = { roots, cf };
  if (typeof module !== 'undefined') module.exports = api; else root.AUX = api;
})(this);
