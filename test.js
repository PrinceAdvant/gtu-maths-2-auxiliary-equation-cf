const { cf } = require('./tool.js');
const cases = [
  [[1, -5, 6], 'y_c = c1 e^(2x) + c2 e^(3x)'],
  [[1, -4, 4], 'y_c = (c1 + c2 x) e^(2x)'],
  [[1, 0, 9], 'y_c = [c1 cos 3x + c2 sin 3x]'],
  [[1, -2, 5], 'y_c = e^(x) [c1 cos 2x + c2 sin 2x]'],
  [[1, 0, -1], 'y_c = c1 e^(-x) + c2 e^(x)'],
  [[1, -6, 11, -6], 'y_c = c1 e^(x) + c2 e^(2x) + c3 e^(3x)'],
  [[1, -3, 3, -1], 'y_c = (c1 + c2 x + c3 x^2) e^(x)'],
  [[1, 0, 2, 0, 1], 'y_c = [(c1 + c2 x) cos x + (c3 + c4 x) sin x]'],
  [[2, -1, -1], 'y_c = c1 e^(-x/2) + c2 e^(x)'],
  [[1, 1, 0], 'y_c = c1 e^(-x) + c2'],
];
let ok = true;
for (const [c, want] of cases) {
  const got = cf(c).cf;
  if (got !== want) { ok = false; console.log('FAIL', c, got, '!=', want); } else console.log('ok  ', c.join(' '), '->', got);
}
if (!ok) process.exit(1);
console.log('All checks passed');
