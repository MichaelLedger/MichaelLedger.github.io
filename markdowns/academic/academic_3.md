**习题24**         
设随机变量 3X + Y 和 2X - 3Y 的方差分别为 333 和 280，且两者的协方差为 -42，求 X - 2Y 和 2X + 3Y 的协方差。         
*参考答案*         
由协方差(相关矩)和方差的性质
$
\left\\{
\begin{array}{lcl}
Cov(X, Y) = E[X - E(X)][Y - E(Y)] = E(XY) - 2E(X)E(Y) + E(X)E(Y) = E(XY) - E(X)E(Y) \\\
Cov(X,X) = E[X-E(X)]^2 = Var(X) \\\
\end{array}
\right.
$

可知：
$
\left\\{
\begin{array}{lcl}
Cov(X, Y) = Cov(Y, X) \\\
Cov(aX, bY) = abCov(X, Y) \\\
Cov(X_1 + X\_2, Y) = Cov(X\_1, Y) + Cov(X\_2, Y) \\\
Var(aX + bY) = Cov(aX + bY, aX + bY) = a^2Var(X) + b^2Var(Y) + 2abCov(X, Y)  \\\
\end{array}
\right.
$

可得:
$
\left\\{
\begin{array}{lcl}
Var(3X + Y) = 9Var(X) + Var(Y) + 6Cov(X, Y) = 333 \\\
Var(2X - 3Y) = 4Var(X) + 9Var(Y) - 12Cov(X, Y) = 280 \\\
Cov(3X + Y, 2X - 3Y) = 6Var(X) - 3Var(Y) - 7Cov(X, Y) = -42 \\\
\end{array}
\right.
$

计算可得：
$
\left\\{
\begin{array}{lcl}
Var(X) = 25 \\\
Var(Y) = 36 \\\
Cov(X, Y) = 12 \\\
\end{array}
\right.
$

故 $Cov(X - 2Y, 2X + 3Y) = 2Var(X) - 6Var(Y) - Cov(X, Y) = 50 - 216 - 12 = -178$ 。         

*备注:*         

方差 $Var(X)$ 也可用 $D(X)$ 表示;         

方差的正平方根 $[D(X)]^\frac{1}{2}$ 称为标准差，记为 $\sigma_X$ 或 $\sigma(X)$ ;         

相关系数 $\rho = \rho\_{XY} = \frac{Cov(X,Y)}{\sqrt[2]{Var(X)Var(Y)}}$ 。

