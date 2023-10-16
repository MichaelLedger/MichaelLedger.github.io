**习题1** \n 设随机变量 X 的分布列为：$P( X = x) = c\;0.5^x, x = 1, 2, 3$, 求c的值。 \n *参考答案* \n 根据有**概率分布列**定义可知： \n $$\sum_{x=1}^{3}c\;0.5^x = 1$$计算后可得 c = $\frac{8}{7}$ \n **习题14** \n 设随机变量 X 服从正态分布 $N(1, 2^2)$, 求：（1）P(X $\less$ -3); (2) P(1 $\leqslant$ X $\less$ 3); (3) P( | x | $\less$ 3)。 \n *参考答案* \n 解：由正态分布$N(\mu, \sigma^2)$性质可知:
            $$
            \left\\{
            \begin{aligned}
            \phi(x) + \phi(-x) #38 = #38 1, x \in R \\\
            P(a \less X \leqslant b) #38 = #38 P (X \leqslant b) - P (X \leqslant a) #38 = #38 \phi(\frac{b - \mu}{\sigma}) - \phi(\frac{a - \mu}{\sigma}) \\\
            \end{aligned}
            \right.
            $$可得: \n (1) $$P(X \less -3) = \phi(\frac{-3-\mu}{\sigma}) = \phi(\frac{-3-1}{2}) = \phi(-2) = 1 - \phi(2) = 1 - 0.9772 = 0.0228$$ (2) $$P(1 \leqslant X \less 3) = \phi(\frac{3-1}{2}) - \phi(\frac{1-1}{2}) = \phi(1) - \phi(0) = 0.8413 - 1/2 = 0.3413$$ (3) $$P( | x | \less 3) = P(-3 \less x \less 3) = \phi(\frac{3 - 1}{2}) - \phi(\frac{-3-1}{2}) \\\ = \phi(1) - \phi(-2) = \phi(1) - (1 - \phi(2)) = \phi(1) + \phi(2) - 1 = 0.8413 + 0.9772 - 1 = 0.8185$$
        