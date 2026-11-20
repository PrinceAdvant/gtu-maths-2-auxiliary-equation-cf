# GTU Maths 2 auxiliary equation: complementary function y_c from the roots, including repeats and complex pairs

GTU Hero's Maths 2 guide lists higher-order differential equations, and the complementary function of a linear equation with constant coefficients, among the ODE methods to practise for BE Mathematics 2 (BE02000011 and other codes where they are prescribed). Coefficients daalo: this page solves the auxiliary equation up to order 4 and writes y_c for distinct real roots, repeated roots and complex pairs. Practice equations are my own, not from a GTU paper. Pehle roots classify karo, phir CF likhna.

Live page: https://princeadvant.github.io/gtu-maths-2-auxiliary-equation-cf/

## Facts used

- For a linear ODE with constant coefficients, the complementary function y_c comes from the roots of the auxiliary (characteristic) equation a_n m^n + ... + a_0 = 0.
- Distinct real roots m1, m2, ... give c1 e^(m1 x) + c2 e^(m2 x) + ...
- A real root repeated k times gives (c1 + c2 x + ... + ck x^(k-1)) e^(m x).
- A complex pair alpha +- i beta gives e^(alpha x) [c1 cos(beta x) + c2 sin(beta x)]. If that pair is itself repeated, the same polynomials in x multiply the sine and cosine.
- Default practice: y'' - 5y' + 6y = 0 has roots 2 and 3, so y_c = c1 e^(2x) + c2 e^(3x). The test file also checks a repeated root, a pure oscillation, a complex pair with a real part, and a repeated complex pair.
- These are practice methods from the guide, not a promise that the same equation will appear. Confirm higher-order linear equations are in your own Maths 2 code.

## Test

`node test.js` checks the calculations against hand-worked values and prints `All checks passed`.

## Tips

- Write the auxiliary equation and the classified roots before you write y_c. The CF line alone is not the full method.
- If the right-hand side is not zero, y_c is only the complementary part. You still need a particular integral (undetermined coefficients or variation of parameters, where prescribed).
- A repeated root needs the extra x, x^2, ... factors. Forgetting them is the usual slip.
- Keep exact fractions when a root is 1/2 or similar. This page snaps simple fractions; show the exact algebra in the exam.

Which Maths 2 topics to practise and how to spot repeated question types: [GTU Hero](https://gtuhero.com/blogs/gtu-maths-2-papers-pyqs-repeated-sums) (GTU Hero is my project).
