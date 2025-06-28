### 数学期望

#### 期望与极限是否能交换顺序

下面我们将说明，**期望和极限是不能随意交换顺序的**

设$\left\{x_n\right\}$是随机变量序列，则有以下定理：

1. **（单调收敛定理）**如果$X_n$**非负**且**递增收敛**于$X$，则有
   $$
   \lim_{n \to \infty}E(X_n)=E(X)
   $$

2. **（Fatou引理）**（仅做了解即可）如果$\left\{x_n\right\}$非负，则有
   $$
   E(\lim_{n\to \infty}\inf X_n)\leq \lim_{n \to\infty}\inf E(X_n)
   $$

3. **（Lebesgue控制收敛定理）**如果$\lim_{n\to\infty}X_n=X$，且存在非负随机变量$\eta$使得$E(\eta)< \infty$，且对于所有的n，满足$\big|X_n\big| \leq \eta$，则有
   $$
   \lim_{n \to \infty}E(X_n)=E(X)
   $$

下面我们举一个例子说明，**期望和极限是不能随意交换顺序的**，期望与极限交换次序是有条件限制的

**例：** 设Ω = (0, 1)，F是由Ω中开集生成的σ-代数 $ P(A) = m(A) $（这里的 $m(A)$ 指的是Lebesgue测度） 令 $X_n(\omega) = (-1)^n n 1_{(0, 1/n)}(\omega) $ $$  X_n(\omega) =  \begin{cases}  (-1)^n n, & \text{当 } \omega \in (0, 1/n) \text{时}, \\ 0, & \text{当 } \omega \in [1/n, 1) \text{时}, \end{cases} $$ 则对所有 $\omega \in \Omega$, $\lim_{n \to \infty} X_n(\omega) = X(\omega) = 0$, $ E(X) = 0, \text{但} E(X_n) = (-1)^n \text{极限不存在}$ 即 $E(X_n)$ 并不收敛于 $E(X)$

!!! note "Tip"

      注意上述的$1_{(0, 1/n)}(\omega)$是一个示性函数，其满足
      $$
      1_{(0, 1/n)}(\omega)=\begin{cases}
      1 ,&\omega \in(0,\frac{1}{n}) \\
      0 ,&\omega \notin(0,\frac{1}{n})
      \end{cases}
      $$

#### 期望和积分能否交换顺序

下面我们将说明，**期望和积分也是不能随意交换顺序的**

**Fubini定理：**设对$a \leq t \leq b$，$X(t)$是随机变量，如果有$\int_a^bE(\big|X(t)\big|)dt < \infty$或对所有$a \leq t \leq b$，$X(t)$都非负，则有
$$
E[\int_a^bX(t)dt]=\int E(X(t))dt
$$
也就是说，在满足Fubini定理的情形下，期望和积分能够交换顺序，下面我们看几道例题：

**例1**：

!!! note "Tip"

      需要注意的是，在下面这个例子中，$\xi$是作为连续型随机变量的，而$t$在这 里 是作为一个积分变量出现，所以数学期望E应当针对$\xi$讨论，而积分则应当针对积分变量$t$讨论
      
      

设$\xi \sim U(0,1)$，令$X(t)=X(t)=\frac{t^2-\xi^2}{(t^2+\xi^2)^2},t\in[0,1]$，则有
$$
\int_0^1X(t)dt=\int_0^1\frac{t^2-\xi^2}{(t^2+\xi^2)^2}dt=\left.-\frac{t}{t^2+\xi^2}\right|_0^1=-\frac{1}{1+\xi^2} 
$$
所以
$$
E\int_0^1X(t)dt=\int_0^1-\frac{1}{1+x^2}dx=-\frac{\pi}{4}
$$
又
$$
EX(t)=\int_0^1\frac{t^2-x^2}{(t^2+x^2)^2}dx=\left.\frac{x}{x^2+t^2}\right|_0^1=\frac{1}{1+t^2}\\
\int_0^1EX(t)dt=\int_0^1\frac{1}{1+t^2}dt=\frac{\pi}{4}
$$
所以可以得到
$$
E[\int_0^1X(t)dt]\neq\int_0^1E(X(t))dt
$$


**例2**：设$X$是一非负随机变量，$\alpha$为一正数，证明
$$
E(X^{\alpha})=\int_0^{\infty}\alpha t^{\alpha-1}P(X>t)dt
$$
**证明**：我们希望能够利用Fubini定理，此处已经出现了期望的形式，那么自然地，我们会想到去构造积分的形式，也就是将$X^{\alpha}$变成积分的形式，容易想到

$$
X^{\alpha}=\int_0^{X}\alpha t^{\alpha-1}dt \qquad E(X^{\alpha})=E(\int_0^{X}\alpha t^{\alpha-1}dt)
$$

但是我们需要注意的是，**上述积分的上界为X，这是一个随机变量，为不确定值**，所以我们不能贸然地直接将积分和期望交换顺序，我们通过使用示性函数将上述积分的上界变为无穷，使得这时积分和期望可以交换次序


$$
E(X^{\alpha})=E(\int_0^{\infty} \alpha t ^{\alpha-1}1_\left\{{X>t} \right\}dt)
$$

又由于$\alpha t^{\alpha-1}1_\left\{{X>t} \right\}$非负，由Fubini定理可得

$
E(X^{\alpha})=\int_0^{\infty}E(\alpha t ^{\alpha-1}1_\left\{{X>t} \right\})dt=\int_0^{\infty}\alpha t^{\alpha-1}P(X>t)dt
$$

#### 数列情形

对于**数列**，也是有上述类似结论的。

我们设$\left\{a_{nk};k \geq 1\right\}$是一列数列，则有以下定理：

1. **（单调收敛定理）**如果$a_{nk}$非负且递增收敛于$a_k$，则有
   $$
   \lim_{n \to \infty}\sum_{k=1}^{\infty}a_{nk}=\sum_{k=1}^{\infty}a_k
   $$
   
   > 其实这个定理描述的是这样一个事实
   
   $$
   \left[\begin{array}{cccc}
   a_{11} & a_{12} & a_{13} & \cdots \\
   a_{21} & a_{22} & a_{23} & \cdots \\
   a_{31} & a_{32} & a_{33} & \cdots \\
   \vdots & \vdots & \vdots & \ddots \\
   a_{n1} & a_{n2} & a_{n3} & \cdots \\
   \hline
   L_1 & L_2 & L_3 & \cdots
   \end{array}\right]
   $$


2. **（Fatou引理）**如果$a_{nk}$非负，那么有
$$
   \sum_{k=1}^{\infty}\lim_{n\to\infty}\inf a_{nk} \leq \lim_{n\to\infty}\inf\sum_{k=1}^{\infty}a_{nk}
$$
3. **（Lebesgue控制收敛定理）**如果$\lim_{n\to \infty}a_{nk}=a_k$，且存在非负数列$\left\{b_k;k \geq 1\right\}$使得$\sum_{k=1}^{\infty}b_k<\infty$，且对所有n,k，有$\big|a_{nk}\big| \leq b_k$，则有
$$
   \lim_{n \to \infty}\sum_{k=1}^{\infty}a_{nk}=\sum_{k=1}^{\infty}a_k
$$
4. **（Fubini定理）**如果$\sum_{n=1}^{\infty}\sum_{k=1}^{\infty}|a_{nk}|<\infty$，或对所有n,k，有$a_{nk}\geq0$，则有
$$
   \sum_{n=1}^{\infty}\sum_{k=1}^{\infty}a_{nk} = \sum_{k=1}^{\infty}\sum_{n=1}^{\infty}a_{nk}
$$
   也就是说，双重求和并不一定能交换次序，其交换次序是有条件限制的

   

下面我们举一个具体的例子说明双重求和是不能贸然交换次序的

**例** 



### 条件概率和条件期望

#### 条件概率

不多说了，复习一下概率论

#### 条件期望与全期望公式

我们回顾一下条件期望的定义，若$X$是$(\Omega,\mathcal{F},P)$上可积的随机变量，定义$X$在$A$发生时的条件期望为$X$关于条件概率$P(\cdot|A)$的期望，记为$E(X|A)$

同时我们注意到$E(X)=\int_{\Omega X(\omega)dP(\omega)}$是$X$在$\Omega$上的加权平均，而
$$
E(X|A)=\int_{\Omega}X(\omega)dP(\omega|A)=\frac{1}{P(A)}\int_A X(\omega)dP(\omega)
$$
是$X$在$A$上的加权平均。（其实上面的不用管，为了笔记完整性还是写上了，主要注意需要除**$P(A)$**）

条件期望有如下性质：

1. 
$$
   E(X1_A)=E(X|A)P(A)
$$
   这个性质是好理解的，$1_A$是示性函数，当A发生时取1，当A不发生时取0，

2. 若$A_1,A_2,\cdot\cdot\cdot$是$\Omega$的划分，且$P(A_i)>0$，则以下**全期望公式**成立：
$$
   E(X)=\sum_i E(X|A_i)P(A_i)
$$
下面我们来看一道例题

**例** 独立重复地抛一枚硬币直至有k次相继出现正面，计算所抛次数的均值（设每次出现正面的概率为p）

我们可以先看一下这个题目的简化版本，独立重复地抛一枚硬币直至有一次出现正面，计算所抛次数的均值。这很显然是一个几何分布，其均值为$\frac{1}{p}$。方法有如下两种：

第一种，利用数学期望的定义求解，计算级数。设所抛次数为$\xi$，则$P(\xi=k)=q^{k-1}p$，$E\xi=\sum_{k=1}^\infty kP(\xi=k)$，也即
$$
E\xi=\sum_{k=1}^{\infty}pq^{k-1}k=\sum_{k=1}^{\infty}p(x^k)'\big|_{x=q}=p(\sum_{k=1}^{\infty}x^k)'\big|_{x=q}=p(\frac{x}{1-x})'\big|_{x=q}\\=\frac{p}{(1-q)^2}=\frac{1}{p}
$$
第二种，利用**全期望公式**，我们设出现一次正面的所抛次数为$N_1$，则第一次抛硬币只有可能出现两种情况，为正面，则$N_1=1$；为反面，则又重新开始（无记忆性），我们不好考虑反面情况下的$N_1$，其情况过于复杂，但是考虑期望的话，事情就变得简单了，我们会发现$E(N_1)$满足：
$$
E(N_1)=E(N_1|第一次是正面)P(第一次是正面)+E(N_1|第一次是反面)P(第一次是反面)\\=1*p+(1+E(N_1))*(1-p)
$$
注意，这里我们要想清楚$E(N_1|第一次是反面)=1+E(N_1)$，这是由几何分布的无记忆性导致的。所以我们得到$E(N_1)=\frac{1}{p}$

这里我们说明一下，题目中指的**k次相继出现正面**指的是连续k次出现正面。做这题也有两个思考角度：

第一种：弄清楚递推关系，考虑**全期望公式**进行推导，我们记$N_k$为所抛次数，$T$为首次出现反面时抛的次数，则有
$$
E(N_k|T=i)=\begin{cases}
k ,&i>k\\
i+E(N_k), &i\leq k
\end{cases}
$$
所以由全期望公式，我们可以得到
$$
E(N_k)=\sum_{i\geq 1}E(N_k|T=i)P(T=i)\\=\sum_{i=1}^k[i+E(N_k)]p^{i-1}q+kp^k
$$
可以解得
$$
E(N_k)=\frac{1}{p}+\frac{1}{p^2}+\cdot\cdot\cdot+\frac{1}{p^k}
$$
这里的计算过程是这样的：
$$
E(N_k)=\sum_{i=1}^kip^{i-1}q+(\sum_{i=1}^kp^{i-1}q)E(N_k)+kp^k
$$
两个求和项分别计算出来如下，注意前面的$\sum_{i=1}^kip^{i-1}$我们不能将求导和求和进行次序交换，也就是利用级数求和，因为这是有限项级数求和，不能交换次序，所以我们还是老老实用等差数列求和计算。

我们记$S=\sum_{i=1}^kip^{i-1}$
$$
S=1+2p+3p^2+\cdot\cdot\cdot+kp^{k-1}\\
pS=p+2p^2+3p^3+\cdot\cdot\cdot+kp^k
$$
作差可得：
$$
(1-p)S=p+p^2+\cdot\cdot\cdot+p^{k-1}+1-kp^k
$$
最终我们得到
$$
E(N_k)=\frac{\frac{1}{p^{k-1}}-1}{1-p}+\frac{1}{p^k}=\frac{\frac{1}{p^{k-1}}(1-p^{k-1})}{1-p}+\frac{1}{p^k}\\=\frac{1}{p^{k-1}}+\frac{1}{p^{k-2}}+\cdot\cdot\cdot+\frac{1}{p}+\frac{1}{p^k}
$$
就得到了最终结果。

第二种：**递归方法**。要求相继k次出现正面，必然需要相继k-1次出现正面，所以我们可以去考虑$E(N_k|N_{k-1})$，容易想到在已有$N_{k-1}$的情况下，下一次抛硬币有两种情形，第一种是正面，这时$E(N_k|N_{k-1})=E(N_{k-1})+1$；但是如若下一次抛硬币是反面，则又只能重新开始，这时会有$E(N_k|N_{k-1})=E(N_{k-1})+1+E(N_k)$，那么由全期望公式，就有
$$
E(N_k|N_{k-1})=(E(N_{k-1})+1)\cdot p+(1-p)[E(N_{k-1})+1+E(N_k)]\\=1+E(N_{k-1})+(1-p)E(N_k)
$$
对于这个式子，我们再次使用全期望公式，也即
$$
E(N_k)=E[E(N_k|N_{k-1})]=1+E(N_{k-1})+(1-p)E(N_k)
$$
可得：
$$
pE(N_k)=1+E(N_{k-1}) \to E(N_k)=\frac{E(N_{k-1})}{p}+\frac{1}{p}
$$
又有$E(N_1)=\frac{1}{p}$，所以我们递推就可以得到$E(N_k)=\frac{1}{p}+\frac{1}{p^2}+\cdot\cdot\cdot+\frac{1}{p^k}$



设$Y$是一取值为$y_1,y_2,\cdot\cdot\cdot$的离散型随机变量，由于$E(X|Y=y)$是y的函数，所以定义给定$Y$的条件下$X$的条件期望$E(X|Y)$为$Y$的一个函数，记为$g(y)=E(X|Y=y)$，即
$$
E(X|Y)=\sum_{i}E(X|Y=y_i)1_{\left\{Y=y_i\right\}}
$$
此时全期望公式$E(X)=\sum E(X|Y=y_i)P(Y=y_i)$也即
$$
E(X)=E[E(X|Y)]
$$

#### 条件期望的性质

- 线性性：对常数a,b,c，有
$$
  E(aX+bY+c|Z)=aE(X|Z)+bE(Y|Z)+c
$$

- 单调性：如果$X \leq Y$，那么$E(X|Z) \leq E(Y|Z)$

- 如果$Y=h(X)$是$X$的可测函数，则$E(Y|X)=Y$，这是因为Y本身是X的函数，X确定之时，Y也确定了为一个定值，所以其期望是其本身

- 如果$Y=h(X)$是$X$的可测函数，则$E(YZ|X)=YE(Z|X)$（提取已知量）

- 如果$X$与$Y$相互独立，则$E(Y|X)=E(Y)$

- **全期望公式：**$E[E(Y|X)]=E(Y)$



下面我们再举几个例子：

**例1** 设$(X,Y)\sim N(\mu_1,\mu_2,\sigma_1^2,\sigma_2^2,\rho)$，计算$E(X|Y)$

**解** 方法一： $ Y = y \text{时}, X \text{ 服从 } N(\mu_1 + \rho\sigma_1(y - \mu_2)/\sigma_2, \sigma_1^2(1 - \rho^2)), $ 所以 $ E(X|Y) = \mu_1 + \rho\sigma_1(Y - \mu_2)/\sigma_2. $ （这里其实是把y替换成Y，当我们不熟的时候可以这么写，熟悉之后直接Y都行）

方法二：令 $ Z = X - aY $，$ a $ 为一个待定常数，使得 $ Z $ 与 $ Y $ 独立。 由正态分布性质知，$ Z $ 与 $ Y $ 独立当且仅当 $ Cov(Z, Y) = 0 $，即 $ a = \rho\sigma_1/\sigma_2 $。此时， $ E(X|Y) = E(Z + aY|Y) = E(Z) + aY $ $ = \mu_1 + \rho\sigma_1(Y - \mu_2)/\sigma_2. $



**例2** 设 $ Y_1, Y_2, \cdots $ 独立同分布，均值为 $\mu$，方差为 $\sigma^2$。设 $ N $ 是取非负整数值的随机变量，与 $ Y_1, Y_2, \cdots $ 独立，且 $\mathbb{E}(N^2) < \infty$。令 $ X = Y_1 + \cdots + Y_N $，计算 $\mathbb{E}(X)$ 和 $\text{Var}(X)$。

**解** 这题需要注意的是，下标的最终项$N$并非是一个确定的值，而是一个随机变量，所以我们可以考虑先给$N$取一个固定的值，考虑在这个值下的$X$的数学期望和方差。

对于非负整数$n$，由于$N$与$Y_1,Y_2,\cdot\cdot\cdot,Y_n$独立，所以有
$$
E(X|N=n)=E(Y_1+\cdot\cdot\cdot+Y_N|N=n)=E(Y_1+\cdot\cdot\cdot+Y_n|N=n)
$$
而因为$N$与$Y_1,\cdot\cdot\cdot,Y_n$独立，所以有
$$
E(Y_1+\cdot\cdot\cdot+Y_n|N=n)=E(Y_1+\cdot\cdot\cdot+Y_n)=n\mu
$$
所以有$E(X|N)=N\mu$，我们再应用全期望公式即可以得到
$$
E(X)=E[E(X|N)]=E(N\mu)=\mu E(N)
$$
而我们知道$Var(X)=E(X^2)-E(X)^2$，所以我们还需要计算$E(X^2)$
$$
E(X^2|N=n)=E((Y_1+\cdot\cdot\cdot+Y_N)^2|N=n)=E((Y_1+\cdot\cdot\cdot+Y_n)^2|N=n)=E((Y_1+\cdot\cdot\cdot+Y_n)^2)
$$
对于等式最右边这项的计算，我们当然可以选择将平方项全部打开然后运用独立性拆成期望的和，我们也可以这么考虑：同样是这个等式$Var(X)=E(X^2)-E(X)^2$，现在相当于，我们容易计算$Var(Y_1+\cdot\cdot\cdot+Y_n)$，已经知道$E(Y_1+\cdot\cdot\cdot+Y_n)$，直接利用平方和期望的这个关系式就可以得到，即有
$$
E((Y_1+\cdot\cdot\cdot+Y_n)^2)=Var(Y_1+\cdot\cdot\cdot+Y_n)+[E(Y_1+\cdot\cdot\cdot+Y_n)]^2=n\sigma^2+n^2\mu^2
$$
那么我们就能得到
$$
E(X^2|N)=N\sigma^2+N^2\mu^2
$$
运用全期望公式，可以得到
$$
E(X^2)=E[E(X^2|N)]=E(N\sigma^2+N^2\mu^2)=\sigma^2E(N)+\mu^2E(N^2)
$$
最终我们就可以得到
$$
Var(X)=E(X^2)-[E(X)]^2=\sigma^2E(N)+\mu^2Var(N)
$$







