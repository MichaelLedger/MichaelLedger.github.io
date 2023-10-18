**习题1**         
生存函数 $S(t) = 0.1 \times (100 - t)^{\frac{1}{2}}, 0 \leqslant t \leqslant 100$, 求下列各值：         
(1) $f(36)$ ; (2) $h(50)$ ; (3) $H(75)$ ; (4) $E(T)$ ; (5) $Var(T)$         
*参考答案*         
答: (1) 生存函数$S(t)$为概率密度函数$f(t)$的积分：
${\color{Goldenrod}{S(t) = P(T > t) = \mathop{ \int }\_{{t}}^{{\infty}}f(y)\text{d}y}}$
可得
$f(t) = \frac{dS(t)}{dt}$
根据求导公式

$(x^n)^{'} = n * x^{n-1} \Rightarrow f(t) = 0.1 \times 0.5 \times (100 - t)^{-\frac{1}{2}}$

故 $f(36) = 0.1 \times 0.5 \times (100 - 36)^{-\frac{1}{2}} = 0.05 \times (\frac{1}{8}) = 0.00625$         
(2) 危险率函数
${\color{Maroon}{h(t) = \frac{f(t)}{S(t)}}}$
可得
$h(t) = \frac{0.1 \times 0.5 \times (100 - t)^{-\frac{1}{2}}}{0.1 \times (100 - t)^{\frac{1}{2}}} = 0.5 \times (100 - t)^{-1} = \frac{1}{2 \times (100 - t)}$
故 $h(50) = \frac{1}{2 \times 50} = 0.01$         
(3)累积危险率函数

$H(t) = \mathop{\int}\_{0}^{t}h(y)dy = - In S(t)$

可得
$H(75) = - In(0.1 \times 5) = 0.69314718$         
(4) 剩余寿命均值为T的期望值(**分布积分法**) 
$E(T) = \mathop{\int}        
\_{0}^{+\infty}t \cdot f(t)dt = \mathop{\int}        
\_{0}^{+\infty}S(t)dt$
可得
$E(T) = \mathop{\int}        
\_{0}^{100}0.1 \times (100 - t)^{\frac{1}{2}}dt \\\ = - 0.1 \times \mathop{\int}        
\_{0}^{100}(100 - t)^{\frac{1}{2}}d(100 - t) \\\ = - 0.1 \times \frac{2}{3} \times (100 - t)^{\frac{3}{2}} \vert\_{0}^{100} \\\ = 0 + 0.1 \times \frac{2}{3} \times 100^{\frac{3}{2}} \\\ = 100 \times \frac{2}{3} \approx 66.7$         
(5) T的方差：
$Var(T) = \mathop{\int}        
\_{0}^{+\infty}t^{2} \cdot f(t)dt - (\mathop{\int}        
\_{0}^{+\infty}t \cdot f(t)dt)^{2}$
由定积分的换元公式，令$x = 100 - t$, 则 $t = 100 - x$。故
$E(T^2) =\mathop{\int}        
\_{0}^{100}t^{2} \cdot f(t)dt = \mathop{\int}        
\_{0}^{100}t^{2} \cdot 0.05 \cdot (100 - t)^{- \frac{1}{2}}dt \\\ = \mathop{\int}        
\_{100}^{0}(100-x)^{2} \cdot 0.05 \cdot x^{-\frac{1}{2}}d(100-x) \\\ = - \frac{1}{20} \mathop{\int}        
\_{100}^{0}(100-x)^{2} \cdot x^{-\frac{1}{2}}dx \\\ = - \frac{1}{20} \times (20000 \cdot x^{-\frac{1}{2}} - \frac{2}{3} \cdot 200 \cdot x^{\frac{3}{2}} + \frac{2}{5} \cdot x^{\frac{5}{2}})\vert\_{100}^{0} \\\ = - \frac{1}{20} \times - \frac{320000}{3} = \frac{16000}{3}$
可得
$Var(T) = E(T^2) - E(T)^2 = \frac{16000}{3} - (\frac{200}{3})^2 = \frac{8000}{9} \approx 888.9$

