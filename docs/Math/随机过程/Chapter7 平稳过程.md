## Chapter7 平稳过程

宽平稳过程和严平稳过程我们再第二章的时候已经做了一些讲解，这一章我们着重来看看平稳过程（宽平稳过程）。

### 严平稳过程和宽平稳过程

首先我们不妨先回顾一下严平稳过程和宽平稳过程的定义

#### 严平稳过程

$\left\{X(t);t\in T\right\}$是一随机过程，对任意的$n(n=1,2,\cdots),t_1,\cdots,t_n\in T$和任意实数$h$，当$t_1+h,\cdots,t_n+h \in T$时，若$(X(t_1),\cdots ,X(t_n))$和$(X(t_1+h),\cdots,X(t_n+h))$具有相同的分布函数（有限维分布具有平移不变性），则称此过程为严平稳过程

严平稳过程有以下几点性质：

$\left\{X(t)\right\}$是严平稳过程当且仅当

- 所有的$X(t)$同分布（一维情形下的平移不变性）
- 对任意的$n\geq 2$，$(X(t_1),\cdots,X(t_n))$的分布仅与时间差$t_2-t_1,t_3-t_2,\cdots,t_n-t_{n-1}$有关，而与起始时间$t_1$无关

#### 宽平稳过程

给定**二阶矩过程**$\left\{X(t);t\in T\right\}$，如果对任意的$t,t+\tau \in T$，有$E[X(t)]=\mu_X$为常数，$E[X(t)X(t+\tau)]=R_X(\tau)$，则称$\left\{X(t),t\in T\right\}$为宽平稳过程

回忆一下之前讲过的，宽平稳过程和严平稳过程之间的关系：严平稳过程+二阶矩过程$\Rightarrow$宽平稳过程；宽平稳过程+正态过程$\Rightarrow$严平稳过程

> 后面如果没有特别说明的话，平稳过程均指**宽平稳过程**

回顾一下平稳过程的**数字特征：**

- $E(X(t))=\mu_X$为常数，即均值函数为常数
- $E[X^2(t)]=R_X(0)$为常数
- $D[X(t)]=R_X(0)-\mu_X^2$为常数
- $E[X(t_1)X(t_2)]=R_X(t_2-t_1)$只是时间差的函数
- $Cov(X(t_1),X(t_2))=R_X(t_2-t_1)-\mu_X^2$

下面我们看一个严平稳过程的例子：

**例** 一族随机变量$X(t),t\in T$独立同分布，则随机过程$\left\{X(t);t\in T\right\}$是严平稳的。

**证明** 设$X(t)$的分布函数为$F_{X(t)}(x)$，则对任意不同的$t_1,\cdots ,t_n$，任意$h$，有
$$
P(X(t_1)\leq x_1,\cdots,X(t_n)\leq x_n)=P(X(t_1)\leq x_1)P(X(t_2)\leq x_2)\cdots P(X(t_n)\leq x_n)=F(x_1)\cdots F(x_n)
$$
这一步是由独立性得到的，且有
$$
F(x_1)\cdots F(x_n)=P(X(t_1+h)\leq x_1,\cdots,X(t_n+h)\leq x_n)
$$
这一步是由严平稳的平移不变性得到的，所以我们得到$(X(t_1),\cdots,X(t_n))$和$(X(t_1+h),\cdots,X(t_n+h))$同分布，所以$\left\{X(t);t\in T\right\}$是严平稳的



**例** 设$\xi$是一随机变量，则对任何$t\in T,X(t)=\xi$，则随机过程$\left\{X(t);t\in T\right\}$是严平稳的

**证明** 对任意不同的$t_1,\cdots,t_n$，任意$h$，都有
$$
(X(t_1),\cdots,X(t_n))=(\xi,\cdots,\xi)=(X_{t_1+h},\cdots,X_{t_n+h})
$$

> 不仅仅是同分布，还是相等



**例** 随机相位余弦波$X(t)=a\cos(\omega t+\theta),-\infty<t<\infty,\theta \sim U(0,2\pi)$

**解** 这个例子之前讲过了，这里不多说了，$\mu_X(t)=0$，$R_{X}(t,t+\tau)=\frac{a^2}{2}\cos \omega \tau$只是时间差$\tau$的函数

所以$\left\{X(t)\right\}$是宽平稳过程



**例**（离散白噪声）设$\left\{X(k);k=0,\pm1,\pm2,\cdots\right\}$两两不相关，$E(X(k))=0,E[(X(k))^2]=\sigma^2$，则有
$$
R_X(k,l)=E[X(k)X(l)]=\begin{cases}
\sigma^2,&k=l
\\ 0,&k\neq l
\end{cases}
$$
自相关函数仅仅与时间差$k-l$有关，所以是宽平稳过程（这类宽平稳过程与我们之前遇到的宽平稳过程有一些不同，也启示我们宽平稳过程并不一定都满足解析式为关于时间差$t-s$的函数）



**例**（移动平均）设$\left\{X_k,k=0,\pm1,\pm2,\cdots\right\}$两两不相关，$EX_k=0,DX_k=\sigma^2$，作$Y_n=\sum_{k=0}^Na_kX_{n-k}$，其中$N$是自然数，而$a_0,a_1,\cdots,a_N$是常数，证明：$\left\{Y_n,n=0,\pm1,\pm2,\cdots\right\}$是平稳序列

**证明** 要证明是平稳序列，就需要考虑其期望和方差，$E[Y_n]=E[\sum_{k=0}^Na_k X_{n-k}]=\sum_{k=0}^{N}a_kE[X_{n-k}]=0$

下面我们考虑序列$\left\{Y_n\right\}$的自相关函数，即有
$$
R_{Y}(n,n+m)=E[Y_nY_{n+m}]=E[(\sum_{k=0}^Na_kX_{n-k})(\sum_{j=0}^Na_jX_{n-j+m})]=\sum_{k=0}^N\sum_{j=0}^Na_ka_jE[X_{n-k}X_{n+m-j}]
$$
我们知道，$E[X_{n-k}X_{n+m-j}]$只有在$n-k=n+m-j$，也即$j=m+k$的时候才为$\sigma^2$，其余时刻均为0，所以上述求和可以化为
$$
\underset{0\leq m+k\leq N}{\sum_{k=0}^N}a_ka_{m+k}\sigma^2
$$
只与$m$有关，所以$\left\{Y_n\right\}$是平稳序列



**例** 设$S(t)$是一周期为$T$的函数，$\theta$是在$(0,T)$上服从均匀分布的随机变量，称$X(t)=S(t+\theta)$为随机相位周期过程，试讨论它的平稳性

**解** 由假设，$\theta$的概率密度函数为
$$
f(\theta)=\begin{cases}
\frac{1}{T}&0<\theta<T
\\0 &其他
\end{cases}
$$
于是有
$$
E[X(t)]=\int_0^T\frac{1}{T}S(t+\theta)d\theta\overset{令\phi=t+\theta}{=}\frac{1}{T}\int_t^{t+T}S(\phi)d\phi
$$
由$S(t)$是周期为$T$的函数可以知道其为常数，下面我们考虑自相关函数$R_X(t,t+\tau)$，则有
$$
R_X(t,t+\tau)=E[X(t)X(t+\tau)]=\int_0^T\frac{1}{T}S(t+\theta)S(t+\theta+\tau)d\theta\overset{令\phi=t+\theta}{=}\frac{1}{T}\int_0^TS(\phi)S(\phi+\tau)d\phi\\=\frac{1}{T}\int_0^TS(\phi)S(\phi+\tau)d\phi
$$
显然，上述积分值只与$\tau$有关，我们将其记为$R_X(\tau)$

于是可以得出结论：随机相位周期过程是平稳的

### 平稳过程相关函数的性质

设$X(t)$和$Y(t)$是平稳过程，则有

- $R_X(0)=E[X^2(t)]=\psi_X^2\geq 0$

- $R_X(-\tau)=R_X(\tau)$（偶函数）

- $|R_X(\tau)|\leq R_X(0),\ |C_X(\tau)|\leq C_X(0)=\sigma_X^2$，也即自相关函数和自协方差函数都在$\tau = 0$处取得最大值

- $R_X(\tau)$是非负定的，也即对任意的$t_1,\cdots,t_n\in T$和任意实数$a_1,a_2,\dots,a_n$，有
  $$
  \sum_{i,j=1}^nR_X(t_i-t_j)a_ia_j\geq 0
  $$

- 若$\left\{X(t)\right\}$是宽平稳过程，则$X(t)$是周期为$T_0$的平稳过程$\iff$$R_X(t)$是周期为$T_0$的函数

  也即$P\left\{X(t+T_0)=X(t)\right\}=1\iff R_X(\tau+T_0)=R_X(\tau)$

  > 这里注意一下随机过程的周期性是怎么表达的，$X(t+T_0)$与$X(t)$几乎处处相等

下面我们给出上述性质的证明：

性质1没啥好说的

性质2也比较简单，$R_X(t)=R_X(t,t+\tau)=R_X(t+\tau,t)=R_X(-\tau)$

性质3的证明要用的Cauchy-Schwarz不等式：
$$
|R_X(\tau)|=|E(X_tX_{t+\tau})|\leq \sqrt{EX_t^2}\cdot\sqrt{EX_{t+\tau}^2}=\sqrt{R_X(0)\cdot R_X(0)}=R_X(0)
$$
对于性质4，有
$$
\sum_{i,j=1}^nR_X(t_i-t_j)a_ia_j=\sum_{i,j=1}^nE[X(t_i)X(t_j)]a_ia_j=E[\sum_{i,j=1}^nX(t_i)X(t_j)a_ia_j]=E[(\sum_{i=1}^na_iX(t_i))^2]\geq 0
$$
对于性质5，我们先证明由过程的周期性可以推得自相关函数的周期性

已有$P\left\{X(t+\tau+T_0)=X(\tau+t)\right\}=1$，我们想证明$R_X(\tau+T_0)=R_X(\tau)$，而
$$
R_X(\tau)=E[X_tX_{t+\tau}],\qquad R_X(\tau+T_0)=E[X_tX_{t+\tau+T_0}]
$$
而根据随机过程的周期性，有
$$
R_X(\tau+T_0)=E[X_tX_{t+\tau+T_0}]=E[X_tX_{\tau+t}]=R_X(\tau)
$$
就证明了自相关函数的周期性；

下面我们由自相关函数的周期性推随机过程的周期性，也即已知$R_X(\tau+T_0)=R_X(\tau)$，要证明
$$
P\left\{X(t+T_0)=X(t)\right\}=1
$$
这里的逻辑是$P(X=Y)=1\iff P(X-Y=0)=1\iff E[X-Y]^2=0$（虽然我也不太记得为啥是这样了，到时候复习复习概率论吧），所以就是要证明$E[X(t+T_0)-X(t)]^2=0$，又
$$
E[X(t+T_0)-X(t)]^2=E[X_t^2]+E[X_{t+T_0}^2]-2E[X_t]E[X_{t+T_0}]\\=R_X(0)+R_X(0)-2R_X(T_0)=2(R_X(0)-R_X(T_0))=0
$$
即完成证明

### 平稳过程的遍历性问题

我们考虑如下的两个平稳过程
$$
X=\left\{X_n,n=0,1,2,\cdots\right\}
$$
其中$X_n$为独立同分布的随机变量序列，且$EX_n^2<\infty,EX_n=m,\ n=0,1,\cdots$
$$
Y=\left\{Y_n=Y,n=0,1,2,\cdots\right\}
$$
其中$Y$是随机变量，$EY^2<\infty$

这两个随机过程是平稳过程中典型的两种极端情况，我们用这两个过程来阐述不同平稳过程之间的差异。由大数法则可知，对于$X$过程来说，有
$$
\frac{1}{n}(X_0+X_1+\cdots+X_{n-1})
$$
依概率收敛于常数$m$，但对$Y$过程来说，则有
$$
\frac{1}{n}(Y_0+Y_1+\cdots+Y_{n-1})=Y
$$
即**经过对时间的平均后，随机性没有什么改变**。那么我们自然会提出这样一个问题，对平稳过程加上了什么条件之后，对时间的平均值可以等于随机过程的均值？这一问题就是平稳过程的遍历性问题。

对于平稳过程$X$，我们往往想确定它的均值$m$和协方差函数$R(\tau)$，由于$E(X(t))=m$，为了估计$m$，我们必须对随机过程$X$作大量的观察，以$X_i(t)$记第$i$次观察中时刻$t$的值，$i=1,2,\cdots,n$，则大数法则告诉我们可以用
$$
\hat{m_n}=\frac{1}{n}(X_1(t)+\cdots+X_n(t))
$$
来估计，同样，为了估计协方差函数我们也可以利用
$$
\hat{R_n(\tau)}=\frac{1}{n}\sum_{k=1}{n}(X_k(t+\tau)-\hat{m_n})(X_k(t)-\hat{m_n})
$$
来估计。但是问题在于我们很难多次观察随机过程，比较容易得是做一次观察，获得了一条样本路径，所以我们希望由这一次观察来估计$m$和$R(\tau)$，这对一般的随机过程来说是不太可能的，但是对于平稳过程，只需要加上一些比较一般的条件，比如观察的时间足够长等等，就可以从一次观察中获得$m$和$R(\tau)$的比较好的估计，这就是有名的**遍历性定理**。在引入遍历性定理之前，我们先给出时间平均的定义。

#### 时间平均

> 下面内容部分参考了 kausiujik 前辈的笔记

随机变量的数学期望实际是按照其概率大小进行加权平均得到的结果。我们假设$X_1,\cdots,X_n,\cdots$是一列独立同分布的随机变量，且有$E|X|<\infty$，并且$E(X)=\mu$，则由辛钦大数定律可以得到
$$
\frac{X_1+X_2+\cdots+X_n}{n}\overset{p}{\to}\mu, n\to \infty
$$
进而由 Kolmogorov 大数定律，上式可以加强为几乎处处收敛。基于这一事实，我们也将数学期望$\mu$称为样本平均或**统计平均**。

> 这一部分当初学概率论讲的太匆忙了，并且只是针对考试进行了笔记整理和复习，后面还得巩固巩固

下面我们考虑随机过程的时间平均。时间平均指的是对一个随机过程$\left\{X(t)\right\}$或$\left\{X_n\right\}$（分别对应连续时间和离散时间）在时间轴上的单一样本路径进行平均，以描述其长期行为的统计特性。

假设$\left\{X_n;n\geq 0\right\}$是平稳随机过程，前$n$个时刻观测值的平均值为
$$
\overline{X_n}=\frac{X_0+X_1+\cdots+X_{n-1}}{n}
$$
如果存在一个随机变量$\tau$，使得$\left\{\overline{X_n}\right\}$在均方意义下收敛于$\tau$，也即有
$$
\lim_{n\to \infty}E(\overline{X_n}-\tau)^2 = 0
$$
则称$\tau$为该随机过程的时间平均，简记为$\lim_{n\to \infty}\overline{X_n}=\tau$

假设$\left\{X_n;n\geq 0\right\}$是平稳随机过程，定义$[0,T]$内过程的平均值为
$$
\overline{X_T}=\frac{1}{T}\int_0^{T}X(t)dt
$$
若对任何的$T>0$，上式积分存在且有限，则定义其为$[0,T]$上的时间平均。如果存在一个随机变量$\tau$

，使得$(\overline{X_T},T>0)$在均方意义下收敛于$\tau$，也即
$$
\lim_{T\to \infty}E(\overline{X_T}-\tau)^2=0
$$
则称$\tau$为该随机过程的**时间平均**，简记为$\lim_{T\to\infty}\overline{X_T}=\tau$

简单来说，过程的时间平均可以记为
$$
\overline{X_n}=\eta=\lim_{N\to \infty}\frac{1}{N}\sum_{n=1}^N X_n(均方意义下的极限)
$$
类似的，对于平稳过程$\left\{X_n;n\in \Z\right\}$，其时间平均为
$$
\overline{X_n}=\lim_{N\to \infty}\frac{1}{2N+1}\sum_{n=-N}^{N}X_n(均方意义下的极限)
$$
而如果是连续时间情形，如$\left\{X(t);t\geq 0\right\}$为平稳过程，定义过程的时间平均：
$$
\overline{X_t}=\lim_{T\to \infty}\frac{1}{T}\int_0^TX(t)dt(均方意义下的极限)
$$
类似的，对$\left\{X(t);t\in \R\right\}$为平稳过程，则该过程的时间平均为
$$
\overline{X_t}=\lim_{T\to \infty }\frac{1}{2T}\int_{-T}^{T}X(t)dt(均方意义下的极限)
$$

来看一些实际的例子：



**例1** 独立同分布平稳序列的均值遍历性

设$X_1,\cdots,X_n,\cdots$是独立同分布的，且有$EX_1=\mu,DX_1=\sigma^2>0$，则大数定理成立，有
$$
\frac{1}{n}\sum_{i=1}^nX_i\overset{p}{\to}\mu
$$
而如若有随机过程$\left\{X_n;n=1,2,3,\cdots\right\}$，则有$E(X_i)=\mu$为常数
$$
E(X_iX_j)=\begin{cases}
\mu^2&i\neq j
\\ \mu^2+\sigma^2, &i=j
\end{cases}
$$
所以这个随机过程是平稳过程，其时间平均有
$$
\lim_{n\to \infty} \sum_{k=1}^n X_k = \mu
$$
所以有时间平均等于统计平均

**例2** $X(t)=\xi,t \in (-\infty,+\infty),P(\xi = \pm 1)=\frac{1}{2}$

显然有其统计平均$E(X(t))=0$，我们考虑其时间平均，则有
$$
\lim_{T\to \infty}\frac{1}{2T}\int_{-T}^{T}X(t)dt=\xi\neq 0
$$
所以这个例子中时间平均是不等于统计平均的

#### 均值遍历性

设$\left\{X(t);t\in T\right\}$为一宽平稳过程，如果时间平均等于统计平均$\mu_X=E[X(t)]$，也即
$$
P(\overline{X(t)}=\mu_X)=1
$$
我们就称$\left\{X(T);t\in T\right\}$具有均值遍历性（或均值各态历经性）

下面我们来看一些例子：

**例** 证明：余弦波$X(t)=A\cos(\omega t+\theta),-\infty <t <\infty$，其中$\omega$是常数，$A$与$\theta$相互独立，$A\sim f(x)=\begin{cases}2x,&0<x<1\\0,&其他  \end{cases}$，$\theta$在$(0,2\pi)$上均匀分布，是宽平稳过程，并判断其是否为均值各态历经过程

**证明** 要证明$X(t)$是宽平稳过程，即考虑其均值函数和自协方差函数（或自相关函数），有
$$
E[X(t)]=E[A\cos(\omega t+\theta)]=E[A]E[\cos(\omega t+\theta)]=0是常数
$$

$$
R_X(t_1,t_2)=E[X(t_1)X(t_2)]=E[A^2\cos(\omega t_1+\theta)\cos(\omega t_2+\theta)]\\=E[A^2]E[\cos(\omega t_1+\theta)\cos(\omega t_2+\theta)]=\frac{1}{4}\cos \omega(t_2-t_1)只是时间差t_2-t_1的函数
$$

所以$\left\{X(t)\right\}$是宽平稳过程

下面我们考虑$\left\{X(t)\right\}$是否具有各态历经性，也即考虑其时间平均是否等于统计平均
$$
\overline{X(t)}=\lim_{T\to \infty}\frac{1}{2T}\int_{-T}^{T}A\cos(\omega t+\theta)dt=\\A\lim_{T\to \infty}\frac{1}{2T}\int_{-T}^{T}\cos(\omega t+\theta )dt=A\lim_{T\to\infty}\frac{\sin(\omega T+\theta)-\sin(-\omega T+\theta)}{2\omega T}=0=E[X(t)]
$$

> 上式极限为0是由于分子有界，分母趋近于$\infty$

所以$X(t)$的均值具有各态历经性

而判断均值是否具有各态历经性有**均值各态历经性定理**：

- 设$\left\{X_n;n\in T\right\}$为宽平稳过程，$T$为自然数集或整数集，则均值各态历经当且仅当
  $$
  \lim_{N\to +\infty}\frac{1}{N}\sum_{n=0}^NC_X(n)=0
  $$

  > 有一个推论，在$\lim_{\tau \to \infty}C_X(\tau)$存在的条件下，有
  >
  > - 若$\lim_{\tau \to \infty}C_X(\tau)=0$，则均值具有各态历经性
  > - 若$\lim_{\tau \to \infty}C_X(\tau)=0$，则均值不具有各态历经性
  >
  > 这是因为在$\lim_{\tau \to \infty}C_X(\tau)=a$的情况下，会有$\lim_{N\to\infty}\frac{1}{N}\sum_{n=0}^NC_X(n)=a$

- 而对应连续时间情形下，则有若$\left\{X(t);t\in T\right\}$为宽平稳过程，$T$为$[0,+\infty)$或$(-\infty,+\infty)$，则均值各态历经当且仅当
  $$
  \lim_{T\to \infty}\frac{1}{T}\int_0^{T}C_X(\tau)d\tau=0
  $$

  > 对应也有一个推论，在$\lim_{\tau\to\infty}C_X(\tau)$存在的条件下，有
  >
  > - 若$\lim_{\tau \to \infty}C_X(\tau)=0$，则均值具有各态历经性
  > - 若$\lim_{\tau \to \infty}C_X(\tau)\neq 0$，则均值不具有各态历经性

下面我们来看一些例子：

**例** 考虑随机电报信号，$P(X(t)=\pm I)=\frac{1}{2}$，而正负号在区间$(\tau,t+\tau]$内变化的次数$\sim P(\lambda \tau)$，证明$X(t)$是宽平稳过程，并判断是否具有均值各态历经性

**解** 首先我们考虑$X(t)$的均值，有$E[X(t)]=I\times \frac{1}{2}+(-I)\times \frac{1}{2}=0$

下面考虑其自相关函数，设$\tau>0$，有
$$
R_X(t,t+\tau)=E[X(t)X(t+\tau)]=I^2P[X(t)X(t+\tau)=I^2]-I^2P[X(t)X(t+\tau)=-I^2]
\\=I^2[\sum_{k=0}^{\infty}\frac{e^{-\lambda\tau}(\lambda \tau)^{2k}}{(2k)!}-\sum_{k=0}^{\infty}\frac{e^{-\lambda \tau}(\lambda\tau)^{2k+1}}{(2k+1)!}]=I^2e^{-\lambda \tau}(\sum_{k=0}^{\infty}\frac{(-\lambda\tau)^{k}}{k!})=I^2e^{-2\lambda \tau}
$$
而若$\tau<0$，则有
$$
R_X(t,t+\tau)=R_X(t+\tau,t)=I^2e^{2\lambda \tau}
$$
而当$\tau=0$的时候，就有
$$
R_X(\tau)=I^2
$$
综上所述，可以得到
$$
R_X(t,t+\tau)=I^2e^{-2\lambda |\tau|}
$$
仅仅与时间差$\tau$有关，所以$X(t)$是宽平稳过程；

下面我们考虑$X(t)$是否具有均值各态历经性，一般来说**我们有三种方法去考虑均值各态历经性**：

- 直接计算时间平均，验证时间平均是否等于统计平均

- 利用均值遍历性定理的推论，若$\lim_{\tau \to \infty}C_X(\tau)$存在，若其值等于0，则具有均值各态历经性；如若其值不等于0，则不具有均值各态历经性。

- 考虑$C_X(\tau)$的 Cesàro 极限，也即考虑
  $$
  \lim_{N\to +\infty}\frac{1}{N}\sum_{n=0}^NC_X(n)=0\ \ 或\ \ \lim_{T\to \infty}\frac{1}{T}\int_0^{T}C_X(\tau)d\tau=0
  $$
  是否成立

事实上，对于此题，如果我们直接去计算时间平均是否等于统计平均，就会发现
$$
\lim_{T\to \infty}\frac{1}{2T}\int_{-T}^{T}X(t)dt
$$
我们并不知道$X(t)$的原函数是什么，也就无法计算出上式的值，所以我们很难去验证时间平均是否等于统计平均。而我们又已经计算出了均值函数和自相关函数，不妨就通过自协方差函数的角度去考虑
$$
\lim_{\tau \to\infty}C_X(\tau)=\lim_{\tau\to\infty}(R_X(\tau)-\mu_X^2)=\lim_{\tau \to \infty }I^2e^{-2\lambda |\tau|}=0
$$
所以均值具有各态历经性



**例** 证明：随机过程$X(t)=A\cos \omega t+B \sin \omega t,-\infty <t<+\infty$是平稳过程；其中$\omega$是非0常数，$A$与$B$独立且同服从$N(0,\sigma^2)$，试讨论此过程的均值是否具有各态历经性

**证明** 先考虑$E[X(t)]$，有
$$
E[X(t)]=\cos \omega t E(A)+\sin \omega t E(B)=0
$$
再考虑自相关函数
$$
R_X(t,t+\tau)=E[X(t)X(t+\tau)]=E[(A\cos \omega t+B \sin \omega t)(A\cos\omega(t+\tau)+B\sin \omega(t+\tau))]\\=E(A^2)\cos\omega t \cos \omega(t+\tau)+E(B^2)\sin \omega t \sin\omega(t+\tau)\\=\sigma^2[\cos \omega t \cos \omega (t+\tau)+\sin \omega t\sin \omega(t+\tau)]=\sigma^2\cos \omega t
$$
只是时间差$\tau$的函数，所以有$X(t)$是宽平稳过程

下面我们考虑均值是否具有各态历经性：

方法一：直接计算时间平均是否等于统计平均
$$
\overline{X(t)}=\lim_{T\to \infty }\frac{1}{2T}\int_{-T}^{T}X(t)dt=\lim_{T\to \infty}\frac{1}{2T}\int_{-T}^{T}(A\cos \omega t+B\sin \omega t)dt\\=\lim_{T\to\infty}\frac{1}{2T}[\frac{2A\sin \omega T}{\omega}-\frac{B(\cos \omega T-\cos \omega(-T))}{\omega}]=0=\mu_X
$$
方法二：用定理二判断：
$$
\lim_{T\to\infty}\frac{1}{T}\int_0^TC_X(\tau)d\tau=\lim_{T\to\infty}\frac{1}{T}\int_0^T\sigma^2\cos \omega\tau d\tau=\lim_{T\to \infty}\frac{\sigma^2}{T}\frac{\sin \omega T}{\omega}=0
$$
所以$X(t)$的均值具有各态历经性



**例** （Ornstein-Uhlenbeck过程）设$X(t)=e^{-\frac{\alpha t}{2}}B(e^{\alpha t})$，这里$\alpha >0,\left\{B(t);t\geq 0\right\}$是标准布朗运动

(1) 证明$\left\{X(t);t\geq 0\right\}$是严平稳过程

(2) 它的均值具有各态历经性吗？为什么？

**解** 证明严平稳过程是不太容易的，但是我们容易知道$X(t)$是正态过程，这是由于$B(e^{\alpha t})$是正态过程，而正态过程+宽平稳过程$\Rightarrow$严平稳过程，所以我们可以证明$\left\{X(t)\right\}$为宽平稳过程，考虑$E(X(t))$，有
$$
E[X(t)]=E[e^{-\frac{\alpha t}{2}}B(e^{\alpha t})]=e^{-\frac{\alpha t}{2}}E[B(e^{\alpha t})]=0
$$
下面考虑$X(t)$的自相关函数，对$t,\tau \geq 0$，有
$$
R_X(t,t+\tau)=E[X(t)X(t+\tau)]=e^{-\frac{\alpha t}{2}}e^{-\frac{\alpha(t+\tau)}{2}}E[B(e^{\alpha t})B(e^{\alpha(t+\tau)})]=e^{-\frac{\alpha t}{2}}e^{-\frac{\alpha(t+\tau)}{2}}\min\left\{e^{\alpha t},e^{\alpha(t+\tau)}\right\}
\\=e^{-\frac{\alpha(t+\tau)}{2}}e^{-\frac{\alpha t}{2}}e^{\alpha t}=e^{\frac{\tau}{2}}
$$
当$\tau < 0$时，有
$$
R_X(t,t+\tau)=R_X(t+\tau,t)=e^{\frac{\alpha \tau}{2}}
$$
当$\tau = 0$的时候，有
$$
R_X(t,t+\tau)=R_X(t,t)=E[X^2(t)]=1
$$
则对所有的$\tau$，有
$$
R_X(t,t-\tau)=e^{-\frac{\alpha|\tau|}{2}}
$$
只是时间差$\tau$的函数

所以$\left\{X(t);t\geq 0\right\}$是宽平稳过程，又由于它是正态过程，所以它也是严平稳过程

下面我们考虑其均值是否具有各态历经性：

因为当$\tau \to \infty$时，有
$$
C_X(\tau)=R_X(\tau)-\mu_X^2=e^{-\frac{\alpha |\tau|}{2}}\to 0
$$
所以它的均值具有各态历经性

> 其实如果我们尝试直接计算时间平均，就会发现
> $$
> \overline{X(t)}=\lim_{T\to \infty}\frac{1}{2T}\int_{-T}^{T}X(t)dt=\lim_{T\to\infty}\frac{1}{2T}\int_{-T}^{T}e^{-\frac{\alpha t}{2}}B(e^{\alpha t})dt
> $$
> 这是无法直接积分计算$\overline{X(t)}$的

**例** 设$X_1,X_2,\cdots$两两不相关，且对所有$i,E(X_i)=\mu,D(X_i)=\sigma^2>0$

(1) 证明$\left\{X_n;n=1,2,\cdots\right\}$是宽平稳过程

(2) 它的均值具有各态历经性吗？为什么？

**解** (1) 证明：$\mu_X(n)=E(X(n))=\mu$是常数，$C_X(n,n+m)=Cov(X_{n},X_{n+m})$，容易知道其满足
$$
C_X(n,n+m)=Cov(X_n,X_{n+m})=\begin{cases}
0,&若m\neq 0
\\\sigma^2，&若m=0
\end{cases}
$$
所以自协方差函数只是时间差$m$的函数，故$\left\{X_n\right\}$是宽平稳过程

(2) 可以知道
$$
\lim_{m\to \infty}C_X(m)=0
$$
所以它的均值具有各态历经性



**例** 设$\left\{X_k,k=0,\pm1,\pm2,\cdots\right\}$两两不相关，$EX_k=0,DX_k=1$，作$Y_n=\sum_{k=0}^Na_kX_{n-k}$，其中$N$是自然数，而$a_0,a_1,\cdots,a_N$是常数，问：$\left\{Y_n;n=0,\pm1,\pm2,\cdots\right\}$具有均值各态历经性吗？

**解** 移动平均我们之前讨论过，有
$$
C_Y(m)=R_Y(m)=\underset{0\leq m+k\leq N}{\sum_{k=0}^N}a_ka_{m+k}=0
$$
当$m>N$时，有
$$
\lim_{m\to \infty}C_Y(m)=0
$$
所以$\left\{Y_n\right\}$是均值各态历经的

**例** 令$X_n=\cos (nU)$，其中$U\sim U(-\pi,\pi)$

(1) 证明：$\left\{X_n;n=1,2,\cdots\right\}$是宽平稳过程

(2) 判断当$N\to\infty$时，$\frac{1}{N}\sum_{i=1}^NX_i$是否依概率收敛？如果收敛，收敛到什么，需说明理由

**解** 我们先考虑$E[\cos{k U}],k=0,1,\cdots$，有
$$
E[\cos (k U)]=\begin{cases}
1&k=0
\\
\int_{-\pi}^{\pi}\cos kx\frac{1}{2\pi}dx=0 &k\neq 0
\end{cases}
$$
所以有$E[X_n]=0$为常数
$$
E[X_nX_m]=\frac{1}{2}[E\cos(n+m)u+E\cos(n-m)u]=\begin{cases}
\frac{1}{2}&n=m\\
0&n\neq m
\end{cases}
$$
所以自相关函数也只是时间差的函数，故是宽平稳过程

又有
$$
\lim_{\tau\to\infty}C_X(\tau)=0
$$
故均值是各态历经的，所以当$N\to\infty$时，有
$$
\frac{1}{N}\sum_{i=1}^Nx_i\overset{L^2}{\to}0
$$
而均方收敛也能推出以概率收敛

**例** 设$\left\{X_n;n\geq 0\right\}$是一个时齐的遍历的Markov链，状态空间$I$有限，$f$是$I$上的函数，设$X_0$的分布是平稳分布$\pi$，令$Y_n=f(X_n)$

(1) 计算$\left\{Y_n;n\geq 0\right\}$的均值函数和自相关函数

(2) 证明：$\left\{Y_n;n\geq 0\right\}$是宽平稳过程

(3) 当$N\to \infty$时，$\frac{1}{N}\sum_{i=0}^NY_i$依概率收敛吗？如果收敛，收敛到什么？说明理由

**解** $EY_n=E(f(X_n))=\sum_{i}f(X_i)P(X_n=i)=\sum_i f_i\pi_i$，因为状态空间有限，所以$\sum_i f_i\pi_i$为定值，下面考虑自相关函数，不妨设$\tau>0$，则有
$$
EY_n Y_{n+\tau}=E[f(X_nX_{n+\tau})]=\sum_{i,j\in I}f_if_j P(X_n=i,X_{n+\tau}=j)=\sum_{i,j\in I}f_if_jP(X_n=i)p_{ij}^{(\tau)}\\=\sum_{i,j\in I}f_if_j\pi_ip_{ij}^{(\tau)}
$$
而当$\tau = 0$时，有$E[Y_n^2]=E[f^2(X_n)]=\sum_if_i^2\pi_i$，所以$R_X(\tau)=\sum_i f_if_j\pi_i p_{ij}^{(\tau)}$

均值函数为常数，自相关函数只是时间差的函数，所以是宽平稳过程

下面考虑其是否具有均值遍历性
$$
C_X(\tau)=R_X(\tau)-\mu_X^2=\sum_{i,j\in I}f(i)f(j)\pi_ip_{ij}^{(\tau)}-(\sum_{i\in I}f(i)\pi_i)^2
$$

又$\lim_{\tau \to \infty}p_{ij}^{(\tau)}=\pi_j,\ \ \lim_{\tau \to \infty}C_X(\tau)=\sum_{i,j\in I}f(i)f(j)\pi_i\pi_j-(\sum_{i\in I}f(i)\pi_i)^2=0$

所以$Y_n$具有均值遍历性，所以$\frac{1}{N}\sum_{i=0}^NY_i$依概率收敛到$\mu_X=0$



**例** 设$X_1,X_2,\cdots$相互独立，对$i\geq 1,E(X_i)=\mu,Var(X_i)=\sigma^2$，令$Y_n=X_nX_{n+1}X_{n+2}$

(1) 计算$\left\{Y_n;n\geq 1\right\}$的均值函数和自相关函数

(2) 证明$\left\{Y_n,n\geq 1\right\}$是宽平稳过程

(3) 当$N\to \infty$时，$\frac{1}{N}\sum_{i=1}^NY_i$以概率收敛吗？如果收敛，收敛到什么？说明理由

**解** (1)$E(Y_n)=E(X_nX_{n+1}X_{n+2})=\mu^3$为定值，下面考虑$Y_n$的自相关函数，有
$$
E[Y_nY_{n+\tau}]=\begin{cases}
E[X^2_{n}X^2_{n+1}X^2_{n+2}]=(\mu^2+\sigma^2)^3 &\tau=0\\
E[X_{n}X^2_{n+1}X^2_{n+2}X_{n+3}]=\mu^2(\mu^2+\sigma^2)^2 &\tau=1\\
E[X_{n}X_{n+1}X^2_{n+2}X_{n+3}X_{n+4}]=(\mu^2+\sigma^2)\mu^4&\tau = 2\\
E[X_{n}X_{n+1}X_{n+2}X_{n+\tau}X_{n+\tau+1}X_{n+\tau+2}]=\mu^6 &\tau \geq 3
\end{cases}
$$
只是时间差的函数，故$\left\{Y_n\right\}$是宽平稳过程

(2) 由(1)已知

(3) $C_X(\tau)=R_X(\tau)-\mu_X^2=\mu^6-(\mu^3)^2=0$

所以有
$$
\lim_{\tau \to \infty}C_X(\tau)=0
$$
故均值具有各态历经性，所以有
$$
\frac{1}{N}\sum_{i=1}^NY_i\overset{p}{\to}\mu^3
$$


