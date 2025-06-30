## 布朗运动的定义和性质

### 布朗运动的定义

浙大版定义：

随机过程 $\left\{X(t);t\geq 0\right\}$ 被称为 Brown 运动，如果它满足下面四个条件：

- $X(0)=0$
- 随机过程 $X(t)$ 是独立增量过程
- 对 $\forall t>s\geq0$，有 $X(t)-X(s)\sim N(0,\sigma^2(t-s))$
- 样本轨道连续（通常这个条件我们默认成立，不予讨论）

中科大版定义：

随机过程称为 Brown 运动，如果它满足如下三个条件：

- $X(0)=0$
- 随机过程 $X$ 有平稳独立增量
- 对每个 $t>0$，有 $X(t)\sim N(0,c^2t)$

后面我们都讨论 $\sigma(c)=1$ 的情况，称之为标准 Brown 运动。因为如果 $c\neq1$，则可以考虑 $\left\{X(t)/c,t\geq0\right\}$，则 $\left\{X(t)/c,t\geq0\right\}$ 就是标准 Brown 运动，不失一般性我们可以只考虑标准 Brown 运动的性质。

下面我们来看一个例子：

**例** 设 $\left\{B(t),t\geq0\right\}$ 是标准 Brown 运动，求：

(1) $B(1)+3B(2)$ 的分布

(2) $Cov(B(1)+B(3),B(3)-B(2))$

(3) $P\left\{B(7)\leq3|B(1)=1,B(3)=2\right\}$

**解** (1) $B(1)\sim N(0,1),B(2)\sim N(0,2)$

故可以得到
$$
B(1)+3B(2)=B(1)+3[B(1)+B(2)-B(1)]=4B(1)+3[B(2)-B(1)]\sim N(0,25)
$$

!!! note "Tip"

      这里是用到了正态过程的可加性，
      $$
      4B(1)\sim N(0,16)\qquad3[B(2)-B(1)]\sim N(0,9)
      $$
      所以有
      $$
      4B(1)+3[B(2)-B(1)]\sim N(0,25)
      $$

(2) 考虑将其分为几个独立的事件，即

$$\begin{aligned}
&Cov(B(1)+B(3),B(3)-B(2))=Cov(B(1)+B(2)+B(3)-B(2),B(3)-B(2))\\&=Cov(B(1),B(3)-B(2))+Cov(B(2),B(3)-B(2))+Cov(B(3)-B(2),B(3)-B(2))\\&=Var(B(3)-B(2))=1
\end{aligned}$$

(3) 

$$P[B(7)\leq3|B(1)=1,B(3)=2]=P[B(7)-B(3)\leq 1|B(1)=1,B(3)=2]=P[B(7)-B(3)\leq 1]$$

又我们知道 $B(7)-B(3)\sim N(0,4)$，所以有 $P(B(7)-B(3)\leq 1) =P(\frac{\xi-0}{\sqrt{4}}\leq \frac{1-0}{\sqrt{4}})$，其中 $\frac{\xi-0}{\sqrt{4}}$ 服从标准正态分布，则有
$$
P(B(7)-B(3)\leq 1)=\Phi(\frac{1}{2})
$$

### 布朗运动的性质

<br>
1. 样本轨道连续的随机过程 $\left\{B(t);t\geq 0\right\}$ 是布朗运动当且仅当它是正态过程，$E(B(t))=0$且 $E[B(t)B(s)]=\min(t,s)$（这是布朗运动的另一种定义）

<br>
2. **Markov性：**固定 $s>0$，$\left\{B(t+s)-B(s);t\geq 0\right\}$ 是布朗过程，且与 $\left\{B(u);u\leq s\right\}$ 独立

<br>
3. **自相似性：**固定 $a\neq 0$，有 $\left\{\frac{1}{a}B(a^2t);t\geq 0\right\}$ 是布朗运动

<br>
4. **$0$ 与 $\infty$ 的对称性**

   我们令

$$
\widetilde{B}=\begin{cases} 
tB(\frac{1}{t}),&t>0\\
0,&t=0
\end{cases}
$$

   则 $\left\{\widetilde{B}(t);t\geq 0\right\}$ 是布朗过程

下面我们给出上述几个性质的证明：

对于第一条性质，我们这里只证明必要性，充分性不作证明。下面证明 Brown 运动是正态过程：

也即证明 $\forall n,\forall t_1,\cdots,c_n$，$(B(t_1),\cdots,B(t_n))$ 是 $n$ 元正态分布。我们已知 $B(t_1),B(t_2),\cdots,B(t_n)$ 服从正态分布，但是边际正态分布无法证明联合分布也是正态分布，还需要独立性，而 $B(t_1),B(t_2),\cdots,B(t_n)$ 显然又不是对称的，所以我们考虑将时间分开，也即考虑 $X_1=B(t_1),X_2=B(t_2),\cdots,X_n=B(t_n)-B(t_{n-1})$，此时即有 $X_1,\cdots X_n$ 是相互独立的，而 $B(t_1),\cdots,B(t_n)$ 又是 $X_1,\cdots,X_n$ 的线性组合，所以 $(B(t_1),\cdots,B(t_n))$ 是联合正态分布

第二条性质和泊松过程是类似的

第三条性质，要证明 $\left\{\frac{1}{a}B(a^2t);t\geq 0\right\}$ 是布朗运动，容易说明其满足在0处的取值为0，且是独立增量过程，下面我们证明定义中的第三点，$\forall t>s$，有 $X(t)-X(s)=\frac{1}{a}[B(a^2 t)-B(a^2 s)]\sim N(0,\frac{1}{a^2}(a^2t-a^2s))$，也即 $X(t)-X(s)\sim N(0,t-s)$

!!! note "Tip"

      第三条性质在时间上的变换尺度是 $a^2$，在空间上的变换尺度是 $\frac{1}{a}$，但是最后的效果仍然和原来的布朗运动类似

第四条性质，要证明 $\left\{\widetilde{B}(t);t\geq 0\right\}$ 是正态过程，我们可以按照它的原本定义去证明，但是在证明独立增量性的时候可能会比较困难，这时候可以用到我们前面讲的第一条性质，这也是布朗运动的一个等价定义，下面我们证明 $\left\{\widetilde{B}(t);t\geq 0\right\}$ 是正态过程，也即要证明$\forall n,\forall t_1<t_2<\cdots<t_n$，有 $(B(t_1),B(t_2),\cdots,B(t_n))$ 是 $n$ 元正态过程，又 $\widetilde B(t_i)=t_iB(\frac{1}{t_i})$是$(B(\frac{1}{t_1}),B(\frac{1}{t_2}),\cdots,B(\frac{1}{t_n}))$ 的线性组合，而正态过程的任意有限维线性组合也是一个正态过程，所以 $\widetilde B(t)$ 是正态过程。下面我们证明均值函数和自相关函数的两个条件：

$$\begin{aligned}
E(\widetilde B(t))=\begin{cases}E(tB(\frac{1}{t})),&t>0\\0,&t=0 \end{cases}=\begin{cases} EtE(B(\frac{1}{t}))=0,&t>0\\0,&t=0\end{cases}\\
\\
E[\widetilde B(t) \widetilde B(s)]=\begin{cases}
tsE[B(\frac{1}{t})B(\frac{1}{s})] &s>0,t>0\\
0,&s=0或t=0
\end{cases}\\
\end{aligned}$$

又

$$E[B(\frac{1}{t})B(\frac{1}{s})]=\min\left\{\frac{1}{t},\frac{1}{s}\right\}=\frac{1}{\max\left\{t,s\right\}}
$$

所以有

$$
E[\widetilde B(t) \widetilde B(s)]=\frac{ts}{\max\left\{t,s\right\}}=\min\left\{t,s\right\}, t>0,s>0
$$

下面我们来看一些例子加深我们对布朗运动这些性质的理解

**例** 设 $\left\{B(t);t\geq 0\right\}$ 是标准布朗运动，求 $P(B(0.5)\leq 1| B(1)=1,B(2)=2)$

**解** 看到这个题，我们的第一想法肯定是去考虑条件概率的定义，这是我们在泊松过程那一章经常使用的方法，尝试一下我们会发现
$$
P(B(0.5)\leq 1|B(1)=1,B(2)=2)=\frac{P(B(0.5)\leq 1,B(1)=1,B(2)=2)}{P(B(1)=1,B(2)=2)}
$$
其中 $P(B(1)=1,B(2)=2)$ 是好计算的，拆成 $B(1),B(2)-B(1)$，利用标准正态分布的概率密度函数 $p(x)=\frac{1}{\sqrt{2\pi}}e^{-\frac{x^2}{2}}$ 即可，但是 $P(B(0.5)\leq1,B(1)=1,B(2)=2)$ 却是并不好计算的。

我们也可以考虑应用上述性质3，因为题目的类型是已知现在和将来，考虑过去，如果我们能够将时间翻转一下，变成已知现在和过去考虑将来，那么题目就会变得比较简单了，这时候我们会想到 $\widetilde B(t)=tB(\frac{1}{t})$，正好能将时间翻转，但是问题在于，现在我们有的是 $B$ 而非 $\widetilde B$，其实他们俩的关系是对称的，如果我们令 $m=\frac{1}{t}$，整理一下就可以得到

$$
B(t)=\begin{cases}
t\widetilde B(\frac{1}{t}),&t\geq 0\\
0,&t=0
\end{cases}
$$

应用上述式子可以得到

$$\begin{aligned}
P(B(0.5)\leq 1|B(1)=1,B(2)=2)&=P(0.5\widetilde B(2)\leq 1|\widetilde B(1)=1,2\widetilde B(0.5)=2)\\&=P(\widetilde B(2)\leq 2|\widetilde B(1)=1,\widetilde B(0.5)=1)\\&=P(\widetilde B(2)-\widetilde B(1) \leq 1|\widetilde B(1)=1,\widetilde B(0.5)=1)\\
&=P(\widetilde B(2)-\widetilde B(1)\leq 1)=\Phi(1)=0.8413
\end{aligned}$$

## 与布朗运动相关的过程

### 反射Brown运动

设 $\left\{B(t);t\geq 0\right\}$ 是 Brown 运动，我们令 $X(t)=|B(t)|$，则称 $\left\{X(t);t\geq 0\right\}$ 是反射 Brown 运动

需要注意的是，反射 Brown 运动并不是正态过程，因为正态过程的取值是可以取负值的，但是反射 Brown 运动的取值只有正值，所以反射 Brown 运动肯定不是正态过程，下面我们考虑**反射 Brown 运动的数字特征**，有两种方法供参考，第一种方法直接计算：

已知 $B(t)\sim N(0,t)$，则有

$$\begin{aligned}
E[X(t)]=E|B(t)|=\int_{-\infty}^{\infty}|x|\frac{1}{\sqrt{2\pi t}}e^{-\frac{x^2}{2t}}dx=\int_{-\infty}^0(-x)\frac{1}{\sqrt{2\pi t}}e^{-\frac{x^2}{2t}}dx+\int_0^{\infty}x\frac{1}{\sqrt{2\pi t}}e^{-\frac{x^2}{2t}}dx\\=\sqrt{\frac{t}{2\pi}}e^{-\frac{x^2}{2t}}\big|_{\infty}^0+\sqrt{\frac{t}{2\pi}}e^{-\frac{x^2}{2t}}\big|^{0}_{-\infty}=\sqrt{\frac{2t}{\pi}}
\end{aligned}$$

而 $Var X(t)=E[(X(t))^2]-[EX(t)]^2$，但是这里 $E[(X(t))^2]$ 的值我们还不清楚，而 $E[(X(t))^2]$ 其实也就是 $E[(B(t))^2]$，则有

$$
E[(B(t))^2]=Var(B(t))+[E(B(t))]^2=t
$$

所以有

$$
Var(X(t))=t-\frac{2t}{\pi}=(1-\frac{2}{\pi})t
$$

另一种方法则是去考虑标准正态分布随机变量绝对值的期望和方差，也即若 $X\sim N(0,1)$，考虑 $E|X|$ 和$Var|X|$

则有

$$\begin{aligned}
E|X|=\int_{-\infty}^{\infty}|x|\frac{1}{\sqrt{2\pi}}e^{-\frac{x^2}{2}}dx=\sqrt{\frac{2}{\pi}}
\\Var|X|=E(X^2)-(E|X|)^2=VarX+(E(X))^2+(E|X|)^2=1-\frac{2}{\pi}
\end{aligned}$$

而现在要求的是 $|B(t)|$ 的数字特征，由于我们已经求出了标准正态分布随机变量绝对值的数字特征，所以我们考虑将 $B(t)$ 标准化，也即令 $Z=\frac{B(t)}{\sqrt{t}}\sim N(0,1)$，则有 $E|Z|=\sqrt{\frac{2}{\pi}},Var|Z|=1-\frac{2}{\pi}$，且 $B(t)=\sqrt{t}Z$
$$
E(X(t))=E(\sqrt{t}|Z|)=\sqrt{t}E|Z|=\sqrt{\frac{2t}{\pi}},\qquad VarX(t)=(\sqrt{t})^2(1-\frac{2}{\pi})=(1-\frac{2}{\pi})t
$$
我们再考虑一下**反射 Brown 运动的分布函数**：

$$
F_{X(t)}(x)=\begin{cases}
0,&x<0\\
P(X(t)\leq x),&x\geq 0
\end{cases}
$$

对于 $x\geq 0$ 的情形，有 

$$P(X(t)\leq x)=P(|B(t)|\leq x)=P(-x\leq B(t)\leq x)=\Phi(\frac{x-0}{\sqrt{t}})-\Phi(\frac{-x-0}{\sqrt{t}})=2\Phi(\frac{x}{\sqrt{2}})-1$$

### 几何Brown运动

若 $\left\{B(t);t\geq 0\right\}$ 是 Brown 运动，$\alpha$ 是一个常数，我们令 $X(t)=e^{\alpha B(t)}$，则称 $X(t)$ 为几何 Brown 运动。同样的，由于正态过程是可以取正值的，而几何 Brown 运动不能取正值，所以几何 Brown 运动不是一个正态过程，下面我们考虑几何 Brown 运动的数字特征，仍然是设一个标准正态分布的随机变量 $Z\sim N(0,1)$，考虑 $Ee^{\alpha z}$ 和 $Var \ e^{\alpha z}$，则有

$$
Ee^{\alpha z}=\int_{-\infty}^{\infty}e^{\alpha x}\frac{1}{\sqrt{2\pi}}e^{-\frac{x^2}{2}}dx=e^{\frac{\alpha^2}{2}} \int_{-\infty}^{\infty}\frac{1}{\sqrt{2\pi}}  e^{-\frac{(x-\alpha)^2}{2}}dx=e^{\frac{\alpha^2}{2}}
$$

上面最右边的积分实际上是对服从 $N(\alpha,1)$ 的随机变量的概率密度函数的积分，显然积分值为1

对于 $Var \ e^{\alpha z}$，则有
$$
Var \ e^{\alpha z}=E(e^{\alpha z})^2-[Ee^{\alpha z}]^2=E(e^{2\alpha z})-e^{\alpha^2}
$$
其中 $e^{2\alpha z}$ 可以视为 $e^{(2\alpha) \cdot z}$，故有
$$
E(e^{(2\alpha )z})=e^{\frac{(2\alpha)^2}{2}}=e^{2\alpha^2}
$$
所以可以得到
$$
Var\ e^{\alpha z}=e^{2\alpha^2}-e^{\alpha^2}
$$
我们知道 $B(t)\sim N(0,t)$，考虑将其标准化为标准正态分布的随机变量，则有 $\frac{B(t)}{\sqrt{t}}\sim N(0,1)$，故有

$$\begin{aligned}
&E(X(t))=E(e^{\alpha B(t)})=E(e^{\alpha\sqrt{t}\frac{B(t)}{\sqrt{t}}})=e^{\frac{\alpha^2t}{2}}\\
&VarX(t)=Var(e^{\alpha B(t)})=Var(e^{\alpha \sqrt{t}\frac{B(t)}{\sqrt{t}}})=e^{2(\alpha \sqrt{t})^2}-e^{(\alpha\sqrt{t})^2}=e^{2\alpha^2t}-e^{\alpha^2 t}
\end{aligned}$$

!!! note "Tip"

      $\ln X(t)=\alpha B(t)$ 服从正态分布，所以我们称 $X(t)$ 服从对数正态分布

      且因为 $\alpha B(t)$ 与 $-\alpha B(t)$ 同分布，所以有 $e^{\alpha B(t)}$ 与 $e^{-\alpha B(t)}$ 同分布

下面我们考虑几何 Brown 运动的分布函数和概率密度函数，

所以对 $\alpha>0,x>0$

$$\begin{aligned}
P(X(t)\leq x)&=P(e^{\alpha B(t)}\leq x)=P(\alpha B(t)\leq \ln x)=P(B(t)\leq \frac{\ln x}{\alpha})\\&=P(\frac{B(t)}{\sqrt{t}}\leq \frac{\ln x}{\alpha \sqrt{t}})=\Phi(\frac{\ln x}{\alpha \sqrt{t}})
\end{aligned}$$

所以有

$$
f_{X(t)}(x)=\phi(\frac{\ln x}{\alpha \sqrt{t}})\frac{1}{\alpha x\sqrt{t}}1_\left\{x>0\right\}=\frac{1}{\alpha x \sqrt{2\pi t}}e^{-\frac{(\ln x)^2}{2\alpha ^2t}}1_\left\{x>0\right\}
$$

### 布朗桥过程

设 $X(t)=B(t)-tB(1)$，则称 $\left\{X(t),0\leq t\leq 1\right\}$ 为布朗桥过程

布朗桥过程有以下性质：

- $X(0)=0,X(1)=0$
- 布朗桥过程是正态过程，有限维分布完全由均值函数和自相关函数确定
- $\mu_X(t)=0$，且对$0\leq s \leq t \leq 1$，有 $C_X(t,s)=s(1-t)$
- 样本轨道是连续的

!!! note "Tip"

      布朗桥运动还有等价定义，满足上述2、3、4性质的过程即为布朗桥过程

下面我们证明布朗桥过程的第三条性质：

$\mu_X(t)=E[X(t)]=E(B(t)-tB(1))=E(B(t))-tE(B(1))=0$

设 $0\leq s \leq t\leq 1$，有

$$\begin{aligned}
C_X(t,s)=Cov(B(t)-tB(1),B(s)-sB(1))=Cov(B(t),B(s))-tCov(B(1),B(s))-sCov(B(t),B(1))+tsCov(B(1),B(1))
\end{aligned}$$

所以有
$$
C_X(t,s)=s-ts-st+ts=s(1-t)
$$

### 积分过程

我们定义
$$
X(t)=\int_0^tB(s)ds,\ t\geq 0
$$
则称 $X(t)$ 为 Brown 运动的积分过程，由 Riemann 积分可知
$$
\int_0^tB(s)ds=\lim_{n\to \infty}\sum_{k=1}^n (s_i-s_{i-1})B_{s_i}
$$
因为 $B=(B(t);t\geq 0)$ 是正态过程，所以有 $\sum_{k=1}^n (s_i-s_{i-1})B_{s_i}$ 为正态随机变量，又由于正态随机变量序列的极限仍为正态随机变量，所以有 $\lim_{n\to \infty}\sum_{k=1}^n (s_i-s_{i-1})B_{s_i}$ 为正态随机变量

可以证明，积分过程 $\left\{X(t)\right\}$ 是一个正态过程。

下面我们考虑积分过程 $\left\{X(t)\right\}$ 的数字特征，先考虑 $EX(t)$

因为
$$
\int_0^{t}E(|B(s)|)ds \leq \int_0^t\sqrt{E(B_s^2)}ds=\int_0^t\sqrt{s}ds<\infty
$$
所以由 Fubini 定理有
$$
EX(t)=E\int_0^tB(s)ds=\int_0^tE(B(s))ds=0
$$
下面我们考虑积分过程的自协方差函数

对 $s\leq t$，因为

$$\begin{aligned}
&\int_0^sdu \int_0^tE(|B(u)B(v)|)dv\leq \int_0^sdu \int_0^t\sqrt{E(B(u)^2)}\sqrt{E(B(v)^2)}dv\\&\leq \int_0^s du\int_0^t\sqrt{u}\sqrt{v}dv\leq \int_0^s du\int_0^t tdv=st^2<\infty
\end{aligned}$$

所以由 Fubini 定理

对 $0\leq s\leq t$，有

$$\begin{aligned}
Cov(X(s),X(t))&=E(X(s)X(t))=E(\int_0^sB(u)du\int_0^tB(v)dv)=E(\int_0^s\int_0^tB(u)B(v)dudv)\\&=\int_0^s\int_0^tE(B(u)B(v))dudv=\int_0^s\int_0^t\min(u,v)dudv=\int_0^sdu\int_0^uvdv+\int_0^sudu\int_u^tdv\\&=\frac{ts^2}{2}-\frac{s^3}{6}
\end{aligned}$$

## 最大值与首中时分布

设 $\left\{B(t);t\geq 0\right\}$ 是标准 Brown 运动，$a\neq 0$，记 $T_a=\inf \left\{t>0:B(t)=a\right\}$，表示首次击中 $a$ 的时刻，称为 $a$ 的首中时。

### 反射原理

固定实数 $a$，令

$$
\hat{B}(t)=\begin{cases}
B(t)&t<T_a
\\ 2a-B(t),&t \geq T_a
\end{cases}
$$

则有 $\left\{ \hat{B}(t);t\geq 0\right\}$ 也是布朗运动（标准布朗运动）

下面我们给出证明：对 $t \geq 0$，令 $Y(t) = B(t)1_\left\{t \leq T_a\right\}$，$Z(t) = B(t + T_a) - a$。 则 $Z = \left\{Z(t); t \geq 0\right\}$ 是独立于 $Y = \left\{Y(t); t \geq 0\right\}$ 的布朗运动。 所以 $-Z = \left\{-Z(t); t \geq 0\right\}$ 是独立于 $Y$ 的布朗运动。 所以 $(Y, Z)$ 与 $(Y, -Z)$ 具有相同的有限维分布。 

$$\varphi: (Y, Z) \rightarrow \left\{Y(t)1_\left\{t \leq T_a \right\} + (a + Z(t - T_a))1_\left\{t > T_a\right\}; t \geq 0\right\}$$ 

生成一个连续过程，$\varphi(Y, -Z)$ 也是一个连续过程，且两个具有相同的有限维分布。 

又 $\varphi(Y, Z) = B$，$\varphi(Y, -Z) = \widehat{B}$，所以 $\widehat{B}$ 也是布朗运动。

!!! note "Tip"

      当布朗运动首次达到水平 $a$ 后，其后续路径可以通过“反射”来构造，将路径在水平 $a$ 上“对称翻转”，得到的路径在概率意义上与原布朗运动等价

布朗运动有以下**几个非常关键的性质（主要是1、2两点）**：

我们记 $M_t=\sup_{0\leq s\leq t}B(s)$ 为布朗运动在时间区间 $[0,t]$ 内的最大值，则有：

<br>
1. 对任意的 $a,y,t\geq 0$
   $$
   P(M_t\geq a,B_t\leq a-y)=P(B_t\geq a+y)
   $$

<br>
2. $$
   P(M_t\geq a)=2P(B_t\geq a),\forall a\geq 0
   $$

   即有 $M_t$ 与 $|B_t|$ 同分布

<br>
3. 对任何的 $a\neq 0,P(T_a<\infty)=1$

$$
f_{T_a}(t)=\frac{a}{\sqrt{2\pi t^3}}e^{-\frac{a^2}{2t}} 1_\left\{t\geq 0\right\}
$$

   从而有 $E(T_a)=\infty$



下面我们对这几个性质给出证明：

(1) 对任意的 $a,y,t\geq 0$，由反射原理有

$$
P(M_t\geq a,B_t\leq a-y)=P(\hat{M}_t\geq a,\hat{B}_t\geq a+y)
$$

由于 $\hat{B}_t\geq a+y$ 其实是能推出 $\hat{M}_t\geq a$ 的，也就是说，这两个事件是包含关系，那么在概率上的反映就是

$$
P(\hat{M}_t\geq a,\hat{B}_t\geq a+y)=P(\hat{B}_t\geq a+y)=P(B_t\geq a+y)
$$

!!! warning "注意"

    需要说明的是，上述记号 $ \hat{M}_t $ 是反射后的布朗运动 $ \hat{B}_t $ 的最大值，而不是对原最大值 $ M_t $ 作反射操作。也即：

    $$
    \hat{M}_t = \max_{0 \leq s \leq t} \hat{B}_s
    $$

(2) 对 $a>0$，有
$$
P(M_t\geq a)=P(M_t\geq a,B_t> a)+P(M_t\geq a,B_t\leq a)
$$
其中 $P(M_t\geq a,B_t>a)=P(B_t>a)$，且由(1)可以得到
$$
P(M_t\geq a,B_t\leq a)=P(M_t\geq a,B_t\geq a)=P(B_t\geq a)
$$
故最终可以得到 $P(M_t\geq a)=2P(B_t\geq a)$

(3) 对 $a>0$ 和 $t>0$，有
$$
F_{T_a}(t)=P(T_a\leq t)=P(M_t\geq a)=2P(B_t\geq a)=2(1-P(B_t<a))=2(1-\Phi(\frac{a}{\sqrt{t}}))
$$
所以有
$$
f_{T_a}(t)=F_{T_a}'(t)=\frac{a}{\sqrt{2\pi t^3}}e^{-\frac{a^2}{2t}}
$$
所以有
$$
E(T_a)=\int_0^{\infty}\frac{a}{\sqrt{2\pi t}}e^{-\frac{a^2}{2t}}dt=\infty
$$

!!! note "Tip"

      由上式我们可以知道
      $$
      P(T_a<\infty)=\lim_{t\to \infty}P(T_a\leq t)=F(\infty)=1
      $$
      说明对几乎每条样本轨道，不管 $a$ 多大，总在有限时刻首次击中 $a$，但虽然 Brown 运动的几乎所有样本轨道初次击中 $a$ 的时刻都是有限的，或者说尽管几乎每条轨道都能在有限时间内击中 $a$，但是经过 $a$ 点的平均时间却是无穷的。对照 Markov 链中常返和瞬过的定义，我们知道每个状态 $a$ 都是“常返”的，但是“零常返”的

下面我们来看一些实际的例子：

**例** 设 $\left\{B(t);t\geq 0\right\}$ 是标准 Brown 运动，令 $X(t)=|\min_{0\leq s \leq t}B(s)|$，求 $X(t)$ 的分布函数

**解** 这里有一个很重要的理解，$|\min_{0\leq s\leq t}B(s)|=-\min_{0\leq s\leq t}B(s)$，这是因为 $B(0)=0$ 所以有 $\min_{0\leq s \leq t}B(s)\leq 0$，那么就有
$$
|\min_{0\leq s\leq t}B(s)|=-\min_{0\leq s\leq t }B(s)
$$
我们记 $B_1(s)=-B(s)$，因为 $\left\{-B(s);s\geq 0\right\}$ 是布朗运动，所以 $B_1(s)$ 也是 Brown 运动，因为 $X(t)\geq 0$，所以有当 $x<0$ 时，
$$
F_{X(t)}(x)=0
$$
当 $x>0$ 时，

$$\begin{aligned}
F_{X(t)}(x)=P(X(t)\leq x) =P(|\min_{0\leq s\leq t}B(s)|\leq x)=P(-\min_{0\leq s\leq t}B(s)\leq x)=P(\max_{0\leq s\leq t}B_1(s)\leq x)\\=1-P(\max_{0\leq s\leq t}B_1(s)>x)=1-2P(B(t)> x)=1-2(1-\Phi(\frac{x}{\sqrt{t}}))=2\Phi(\frac{x}{\sqrt{t}})-1
\end{aligned}$$

!!! tip "心得"

      这题我个人觉得有两个比较巧的地方，首先是，我们利用了 $B(0)=0$ 得出 $|\min_{0\leq s\leq t}B(s)|=-\min_{0\leq s\leq t }B(s)$，成功将绝对值去掉；其次是，我们记 $B_1(s)=-B(s)$，因为 $B(s)$ 在题中出现的形式是**最小值**；而我们学到的 Brown 运动的性质中出现的是**最大值**，我们将 $B(s)$ 的最小值转化为了同样为 Brown 运动的 $B_1(s)$ 的最大值，从而成功地应用了 Brown 运动的性质。

**例** 以 $X(t)$ 表示 $t$ 时刻的股票价格（单位：元），设 $X(t)=2^{B(t)}$，其中 $\left\{B(t);t\geq 0\right\}$ 是标准 Brown 运动，求 $[0,4]$ 内股票价格不曾达到8元的概率

**解** $P(X(t)_{t\leq4 }< 8)=P(\max_{t\leq 4}B(t)< 3)$，而我们知道

$$\begin{aligned}
&P(\max_{t\leq 4}B(t)< 3)=1-P(\max_{t\leq 4}B(t)\geq3)=1-2P(B(4)\geq 3)\\&=1-2(1-\Phi(\frac{3}{2}))=1-2(1-0.9332)=0.8664
\end{aligned}$$


## Ito积分

Ito积分实际上是指形如下式的积分：
$$
\int_0^t f(s)dB_s, t\geq 0
$$
其中 $f$ 是随机过程，通过 Ito 积分得到的是一个随机变量。对于一个适定过程 $f(s)$，Ito 积分表示在时间区间 $[0,t]$ 上对布朗运动的增量进行加权求和，其中 $f(s)$ 是权重函数，为了保证积分有意义，通常要求 $f(s)$ 满足平方可积条件，也即
$$
E[\int_0^t f^2(s)ds]<\infty
$$
为了理解 Ito 积分定义的微妙之处，我们首先回忆一下 Riemann 积分和 Riemann-Stieltjes 积分

### Riemann-Stieltjes积分

我们首先回忆一下
$$
\int_a^b f(x)dx
$$
是如何定义的。

首先作分割，在 $[a,b]$ 上插入 $n-1$ 个分点：$a=x_0<x_1<\cdots<x_n=b$；其次取点，在每一个 $[x_{i-1},x_i]$ 任取一点 $\xi_i$；再作 Riemann 和，有
$$
S_n=\sum_{i=1}^nf(\xi_i)(x_i-x_{i-1})
$$
再求极限：如果存在一个 $S$，使得对任意划分、任意取点，有
$$
\lim_{\max_{i}(x_i-x_{i-1})\to 0}S_n=S
$$
那么我们就称 $S$ 为函数 $f$ 在 $[a,b]$ 上的 Riemann 积分，记作
$$
\int_a^bf(x)dx=S
$$
那么什么时候 $f$ 在 $[a,b]$ 上 Riemann 可积呢？答案是** $f$ 连续或者逐段连续**的时候。



接下来我们再回忆一下 $f$ 关于 $G(x)$ 的积分
$$
\int_a^bf(x)dG(x)
$$
我们首先作分割，在 $[a,b]$ 上插入 $n-1$ 个分点：$a=x_0<x_1<\cdots<x_n=b$；然后在每一个 $[x_{i-1},x_i]$ 上任取一点 $\xi_i$；接着再作 Riemann-Stieltjes 和，也即
$$
S_n=\sum_{i=1}^nf(\xi_i)(G(x_i)-G(x_{i-1}))
$$
然后求极限，如果存在一个 $S$，使得对任意划分，任意取点
$$
\lim_{\max_i(x_i-x_{i-1})\to 0}S_n=S
$$
那么我们就称 $S$ 为函数 $f$ 在 $[a,b]$ 上的 Riemann-Stieltjes 积分，记作
$$
\int_a^bf(x)dG(x)=S
$$
什么条件下 $\int_a^bf(x)dG(x)$ 存在呢？答案是当且仅当 $f$ 是 $[a,b]$ 上的连续函数，$G(x)$ 是 $[a,b]$ 上的**有界变差函数**

### 有界变差函数

下面我们给出**有界变差函数**的定义

假设 $G$ 是 $[a,b]$ 上的实值函数，对 $[a,b]$ 进行分割，记
$$
\Delta :a=x_0<x_1<\cdots<x_n=b
$$
如果有
$$
\sup_{\Delta}\sum_{i=1}^n|G(x_i)-G(X_{i-1})|<\infty
$$
那么我们就称 $G$ 在 $[a,b]$ 上具有有界变差。

假设 $G$ 是 $[0,\infty)$ 上的实值函数，如果
$$
\sup_{t>0}\sup_{\Delta}\sum_{i=1}^n|G(x_i)-G(x_{i-1})|<\infty
$$
其中 $\Delta$ 是 $[0,t]$ 上的分割，那么称 $G$ 在 $[0,\infty)$ 上具有有界变差



有界变差函数有以下几点性质：

- 任何有界变差函数都可以写成两个单调增函数的差
- 任何有界变差函数都几乎处处可微
- $[a,b]$ 上具有有界导函数的函数是有界变差函数
- $[a,b]$ 上的单调函数是有界变差函数

但是非常遗憾的是，对于布朗运动 $\left\{B(t);t\geq 0\right\}$ 来说，尽管其**几乎所有轨道都连续**，但是：

- 几乎所有轨道在任何区间上不单调
- 几乎所有轨道在任何点不可导
- 几乎所有轨道在任何区间上都不是有界变差

下面我们证明一下**布朗运动的几乎所有轨道在任何区间上都不是有界变差**

**证明** 我们将 $[0,t]$ 区间作划分，划分成 $\frac{0}{2^n}t,\frac{1}{2^n}t,\cdots,t$ 等等，令
$$
V_n=\sum_{i=0}^{2^n-1}|B(\frac{(i+1)t}{2^n})-B(\frac{it}{2^n})|
$$
则有 $V_n$ 单调递增（这是因为将区间加细 $V_n$ 会变大，由绝对值不等式即可得到），所以如果我们如果能够证明 $V_n$ 的极限 是$+\infty$，就能证明其不是有界变差函数。和之前一样的思路，我们先考虑标准正态分布随机变量的方差和期望，若 $X\sim N(0,1)$，则有
$$
E(|X|)=\sqrt{\frac{2}{\pi}},\qquad D(X^2)=2
$$

!!! note "Tip"

      印象中是说 $D(X^2)=2$ 是由卡方分布得来的，但是我根本就不记得卡方分布🤣，所以我选择记了标准正态分布的矩公式：<br>
      如果 $X$ 是标准正态分布随机变量，也即 $X\sim N(0,1)$，则可以得到
      $$
      E[X^{2k-1}]=0
      $$
      $$
      E[X^{2k}]=\frac{(2k!)}{2^kk!}
      $$
      也即标准正态分布的奇数阶矩为0，偶数阶矩为 $\frac{(2k)!}{2^k k!}$

      所以我们可以得到
      $$
      Var X^2=E(X^4)-[EX^2]^2=\frac{4!}{2^2\times  2!}-(\frac{2!}{2^1\times 1!})=3-1=2
      $$

可以得出
$$
E(X^4)=3
$$

!!! warning "注意"

      上述过程其实是循环论证的，没啥逻辑，只是应试的时候记这个矩公式比较方便罢了🤣


所以
$$
E(V_n)=2^n\sqrt{\frac{t}{2^n}}\sqrt{\frac{2}{\pi}}=\sqrt{\frac{2^{n+1}t}{\pi}}\to \infty\\
D(V_n)=2^n\times \frac{t}{2^n}\times (1-\frac{2}{\pi})=(1-\frac{2}{\pi})t
$$
所以可以得出：
$$
P(V_n < \frac{EV_n}{2})\leq P(|V_n-EV_n|\geq \frac{EV_n}{2})\leq 4\frac{D(V_n)}{(EV_n)^2}\to0
$$

!!! note "Tip"

      上面用了著名的chebyshev不等式

所以可以得到 $P(V_n\geq \frac{EV_n}{2}\to 1)$，即 $V_n\overset{P}{\to}\infty$，又 $V_n$ 单调递增，所以可以得到
$$
V_n\to\infty
$$
也就证明了布朗运动的几乎所有轨道在任何区间上都不是有界变差。

尽管布朗运动不是有界变差的，但其却是二次变差的，也即对任何 $t>0$，对 $[0,t]$ 的任何划分列 $\left\{t_i\right\}_{i=0}^n$，当 $\delta_n=\max_{0\leq i\leq n-1}(t_{i+1}-t_i)\to 0$ 时，可以得到
$$
M_n=\sum_{i=1}^n[B(t_i)-B(t_{i-1})]^2\overset{L^2}{\to}t
$$

也即 $M_n=\sum_{i=1}^n[B(t_i)-B(t_{i-1})]^2$ 均方收敛到 $t$



下面我们给出证明：考虑布朗运动的二次变差，对任何 $t>0$，对 $[0,t]$ 的任何划分列 $\left\{t_i\right\}_{i=0}^n$，令 $\delta_n = \max_{0\leq i\leq n-1}(t_{i+1}-t_i)$，有
$$
E(M_n)=\sum_{i=1}^nE[B(t_i)-B(t_{i-1})]^2
$$
我们又知道 $B(t_i)-B(t_{i-1})\sim N(0,t_i-t_{i-1})$，所以可以得到
$$
E[B(t_i)-B(t_{i-1})]^2=Var(B(t_i)-B(t_{i-1}))+E[B(t_i)-B(t_{i-1})]=t_i-t_{i-1}
$$
所以有
$$
E(M_n)=\sum_{i=1}^n(t_i-t_{i-1})=t
$$
再考虑 $D(M_n)$，由独立增量性有

$$
D(M_n)=\sum_{i=1}^nD[B(t_i)-B(t_{i-1})]^2=\sum_{i=1}^n2(t_i-t_{i-1})^2\leq \sum_{i=1}^n 2\delta _n(t_i-t_{i-1})=2\delta_n t
$$

??? tip "未解决的问题"

      这里 $D[B(t_i)-B(t_{i-1})]^2$ 是如何考虑的笔者还是有点疑惑

所以有当 $\delta_n\to 0$ 时，
$$
E[M_n-t]^2=D(M_n)\to 0
$$
也即
$$
M_n\overset{L^2}{\to}t
$$

!!! note "Tip"

      推广到一般的区间$[a,b]$，可以得到$M_n\overset{L^2}{\to}b-a$

### Ito积分

这时候我们再回到最开始的问题，如何定义
$$
\int_0^TX(t)dB(t)
$$
比如如何定义 $\int_0^TB(t)dB(t)$ 呢，我们的思路可能是这样的：首先对 $[0,T]$ 作划分列 $\left\{t_i\right\}_{i=1}^n$，使得 $\delta_n=\max_{0\leq i\leq n-1}(t_{i+1}^n-t_i^n)\to 0$，然后在每个区间 $[t_i,t_{i+1}]$ 取点 $s_i$，则有
$$
S_n=\sum_{i=0}^{n-1}B(s_i)[B(t_{i+1})-B(t_i)]
$$
最后取极限，$S_n$的 极限就是
$$
\int_{0}^T B(t)dB(t)
$$
但是其实我们试着写一写就会发现，**极限是依赖于点的选取的**

比如若我们取 $s_i$ 为 $[t_i,t_{i+1}]$ 的左端点 $t_i$，就会得到

$$\begin{aligned}
S_n=\sum_{i=0}^{n-1}B(t_i)[B(t_{i+1})-B(t_i)]&=\sum_{i=0}^{n-1}[\frac{B(t_{i+1})+B(t_i)}{2}-\frac{B(t_{i+1})-B(t_i)}{2}][B(t_{i+1})-B(t_i)]\\&=\sum_{i=0}^{n-1}[\frac{B^2(t_{i+1})-B^2(t_i)}{2}]-\frac{1}{2}\sum_{i=0}^{n-1}[B(t_{i+1})-B(t_i)]^2\overset{L^2}{\to}\frac{1}{2}B^2(T)-\frac{1}{2}T
\end{aligned}$$

!!! note "Tip"

      其中二次变差均方收敛到 $T$ 我们已经证明过

若我们取 $S_i$ 为 $[t_i,t_{i+1}]$ 的右端点 $t_{i+1}$，则有

$$\begin{aligned}
S_n=\sum_{i=0}^{n-1}S_n&=\sum_{i=0}^{n-1}B(t_{i+1})[B(t_{i+1})-B(t_i)]\\&=\sum_{i=0}^{n-1}[\frac{B(t_{i+1})+B(t_i)}{2}+\frac{B(t_{i+1})-B(t_i)}{2}][B(t_{i+1})-B(t_i)]\\&=\sum_{i=0}^{n-1}[\frac{B^2(t_{i+1})-B^2(t_i)}{2}]+\frac{1}{2}\sum_{i=0}^{n-1}[B(t_{i+1})-B(t_i)]^2\overset{L^2}{\to}\frac{1}{2}B^2(T)+\frac{1}{2}T
\end{aligned}$$

所以我们可以发现，**极限是依赖于点的选取的**：

- 当我们选取左端点的时候，上述积分称为 $Ito$ 积分，记为
  $$
  \int_0^TB(t)dB(t)
  $$

- 当我们选取区间中点的时候，上述积分称为 $Stratonovich$ 积分，记为
  $$
  \int_0^TB(t)\circ dB(t)
  $$

下面我们给出 Ito 积分的定义

假设 $B=(B_t;t\geq 0)$ 是标准 Brown 运动，$f(t);t\geq 0$ 是一个关于 Brown 运动 $B$ 适应的随机过程（意思是 $f(t)$ 仅依赖于 $\left\{B_s;0\leq s\leq t\right\}$），进一步假设
$$
\int_0^{\infty}Ef(s)^2ds<\infty
$$
则对任意的 $t>0$，我们首先作分割，在 $[0,t]$ 上插入 $n-1$ 个分点：$0=s_0<s_1<\cdots<s_n=t$，使得
$$
\Delta=\max_{1\leq i\leq n}|s_i-s_{i-1}|\to 0
$$
然后取点，选择 $\xi_i=s_{i-1}$（区间的左端点），随后作和，有
$$
S_n(t)=\sum_{i=1}^nf(s_{i-1})(B(s_i)-B(s_{i-1}))
$$
则一定存在一个**随机变量** $X(t)$ 使得
$$
E(S_n(t)-X(t))^2\to 0,\qquad n\to\infty
$$
此时我们定义
$$
\int_0^t f(s)dB_s=X(t)
$$
称 $X(t)$ 是 $f$ 关于 Brown 运动 $B$ 的 Ito 积分

### Ito 积分的运算性质

<br>
1. 数学期望
   $$
   E\int_0^tf(s)dB_s=0
   $$

<br>
2. Ito 积分的等距性质
   $$
   E[(\int_0^t f(s)dB_s)^2]=\int_0^tEf^2(s)ds(这里的运算顺序是先平方、再取期望、再积分)
   $$
	
!!! warning "注意"

      需要注意的是，左侧是一个 Ito 积分，而右侧是一个 Riemann 积分，毕竟是取了期望之后。
      
      Ito 积分的等距公式表明，Ito 积分的二阶矩（即平方期望）等于其权重函数 $f(s)$ 的平方在时间区间 $[0,t]$ 上的期望积分。这个性质将随机积分的 $L^2$ 范数与确定性积分的 $L^2$ 范数联系起来，类似于经典的等距性质。
      
<br>      
3. 线性性质
   $$
   \int_0^t(af(s)+bg(s))dBs=a\int_0^tf(s)dB_s+b\int_0^tg(s)dB_s
   $$

<br>
4. 可加性
   $$
   \int_0^Tf(s)dB_s=\int_0^tf(s)dB_s+\int_t^Tf(s)dB_s
   $$

!!! note "Tip"

      证明部分就不详细展开了，感觉期末周时间不太够，推测 Ito 积分的掌握要求也仅仅是会算就行

上面我们给出了 $f(t)$ 关于 Brown 运动的 Ito 积分的定义，但是除了少数过程之外，我们很难从定义直接计算出 $\int_0^tf(s)dB_s$，所以需要一个基本公式来帮助我们计算 $\int_0^tf(s)dB_s$

### 适用于Brown运动的Ito积分公式

**1维Ito公式**：

设 $f$ 在 $R$ 上具有二阶连续导数，则有
$$
f(B_t)=f(B_0)+\int_0^tf'(B_s)dB_s+\frac{1}{2}\int_0^tf''(B_s)ds
$$

其对应的随机微分方程为
$$
df(B_t)=f'(B_t)dB_t+\frac{1}{2}f''(B_t)dt
$$

!!! note "Tip"

      而求 Ito 积分移一下项即可，也即有
      $$
      \int_0^tf'(B_s)dB_s=f(B_t)-f(B_0)-\frac{1}{2}\int_0^tf''(B_s)ds
      $$
      证明这里也不做展开了

下面我们来看一些例子：

**例** 计算 $\int_0^t B_sdB_s$

**解** 取 $f'(x)=x$，则有
$$
f(x)=\frac{1}{2}x^2\qquad f''(x)=1
$$
所以可以得到

$$\begin{aligned}
\int_0^t f'(B_s)dB_s=\int_0^tB_sdB_s=f(B_t)-f(B_0)-\int_0^t\frac{1}{2}f''(B_s)ds\\=\frac{1}{2}B_t^2-B_0-\frac{1}{2}\int_0^t1ds=\frac{1}{2}B_t^2-\frac{1}{2}t
\end{aligned}$$

**例** 计算 $\int_0^t B_s^2d B_s$

**解** 取 $f'(x)=x^2$，则有
$$
f(x)=\frac{1}{3}x^3,\qquad f''(x)=2x
$$
所以可以得到

$$\begin{aligned}
\int_0^tB_s^2dB_s=\int_0^tf'(B_s)dB_S=f(B_t)-f(B_0)-\frac{1}{2}\int_0^tf''(B_s)ds\\=\frac{1}{3}B_t^3-\frac{1}{2}\int_0^t2B_sds=\frac{1}{3}B_t^3-\int_0^tB_sds
\end{aligned}$$

**例** 计算 $\int_0^t \sin B_sdB_s$

**解** 取 $f'(x)=\sin x$，则有
$$
f(x)=-\cos x,\qquad f''(x)=\cos x
$$
则有

$$\begin{aligned}
&\int_0^t\sin B_sdB_s=f(B_t)-f(B_0)-\frac{1}{2}\int_0^tf''(B_s)ds\\&=-\cos B_t-(-\cos B_0)-\frac{1}{2}\int_0^t \cos B_sds=-\cos B_t +1 -\frac{1}{2}\int_0^t \cos B_sds
\end{aligned}$$

**例** 计算 $\int_0^t \cos(B_s)dB_s$

**解** 取 $f'(x)=\cos x$，则有
$$
f(x)=\sin x\qquad f''(x)=-\sin x
$$

则有

$$\begin{aligned}
&\int_0^t \cos B_s dB_s=f(B_t)-f(B_0)-\frac{1}{2}\int_0^tf''(B_s)ds\\&=\sin B_t -\sin B_0-\frac{1}{2}\int_0^t -\sin B_sds=\sin B_t+\frac{1}{2}\int_0^t\sin B_sds
\end{aligned}$$

**例** 计算 $\int_0^t e^{B_s}d B_s$

**解** 取$f'(x)=e^x$，则有
$$
f(x)=e^x,\qquad f''(x)=e^x
$$
所以

$$\begin{aligned}
\int_0^t e^{B_s}d B_s = f(B_t)-f(B_0)-\frac{1}{2}\int_0^t f''(B_s)ds\\=e^{B_t}-e^{B_0}-\frac{1}{2}\int_0^t e^{B_s}ds=e^{B_t}-1-\frac{1}{2}\int_0^t e^{B_s}ds
\end{aligned}$$

上面考虑的是一维情形，下面我们叙述**二维情形**的 Ito 积分计算公式

假设 $f(t,x)$ 是二元函数，关于 $t$ 和 $x$ 的二阶偏导数存在并且连续，我们记

$$\begin{aligned}
\frac{\partial f(t,x)}{\partial t}=f_1(t,x)\qquad \frac{\partial f(t,x)}{\partial x}=f_2(t,x)\\
\frac{\partial^2 f(t,x)}{\partial t^2}=f_{11}(t,x)\qquad \frac{\partial^2f(t,x)}{\partial x^2}=f_{22}(t,x)\\
\frac{\partial^2 f(t,x)}{\partial x \partial t}=\frac{\partial^2 f(t,x)}{\partial t \partial x}=f_{12}(t,x)
\end{aligned}$$

则有
$$
f(t,B_t)=f(0,0)+\int_0^t f_2(s,B_s)dB_s+\int_0^tf_1(s,B_s)ds+\frac{1}{2}\int_0^t f_{22}(s,B_s)ds
$$
其对应的随机微分方程为
$$
df(t,B_t)=f_1(t,B_t)dt+f_2(t,B_t)dB_t+\frac{1}{2}f_{22}(t,B_t)dt
$$
下面我们来看一个实际的例子：

**例** 考虑下列形式的几何 Brown 运动 $X(t)=e^{(\mu-\frac{\sigma^2}{2})t+\sigma B_t}$，问 $\left\{X(t);t\geq0 \right\}$ 所满足的随机微分方程

**解** 令 $f(x,t)=e^{(\mu-\frac{\sigma^2}{2})t+\sigma x}$，则 $X(t)=f(t,B_t)$

且有
$$
f_1=\frac{\partial f}{\partial t}=(\mu-\frac{\sigma^2}{2})e^{(\mu -\frac{\sigma^2}{2})t+\sigma x}\\
f_2=\frac{\partial f}{\partial x}=\sigma e^{(\mu-\frac{\sigma^2}{2})t+\sigma x}\\
f_{22}=\frac{\partial^2}{\partial x^2}=\sigma^2e^{(\mu-\frac{\sigma^2}{2})t+\sigma x}
$$
所以有
$$
f_1(t,B_t)=(\mu-\frac{\sigma^2}{2})X_t\\
f_2(t,B_t)=\sigma X_t\\
f_{22}(t,B_t)=\sigma^2X_t
$$
则由Ito公式
$$
dX_t=f_1(t,B_t)dt+f_2(t,B_t)dB_t+\frac{1}{2}f_{22}(t,B_t)dt=\mu X_t dt+\sigma X_td B_t
$$
所以$\left\{X(t);t\geq 0\right\}$满足随机微分方程为
$$
dX_t = \mu X_t dt+\sigma X_t d B_t
$$




下面是老师补充的一些讲解：

**例** 求

$$\begin{aligned}
&(1)E\int_0^TB^2(t)dB(t)\\
&(2)Var \int_0^T B^2(t)dB(t)\\
&(3)E\int_0^T B^2(t)dt
\end{aligned}$$

**解** 

(1) $\int_0^T B^2(t)dB(t)$ 是 Ito 积分，我们由 Ito 积分的性质可以知道，其期望为0，所以有
$$
E\int_0^T B^2(t)dB(t)=0
$$
(2) 求 Ito 积分的方差，其实我们不用想的太复杂，因为 Ito 积分得到的本身就是一个随机变量，所以我们就当成求解一个随机变量的方差即可，所以有
$$
Var \int_0^T B^2(t)dB(t)=E[(\int_0^T B^2(t)dB(t))^2]-[E\int^T_0 B^2(t)dB(t)]^2=E[(\int_0^TB^2(t)dB(t))^2]
$$
由Ito积分的等距性质可以得到
$$
E[(\int_0^TB^2(t)dB(t))^2]=\int_0^TEB^4(t)dt
$$
然后就可以用我们所熟悉的方法，考虑标准正态分布随机变量的期望，然后将 $B(t)$ 标准化。

我们知道对于一个标准正态分布随机变量 $\xi \sim N(0,1)$，有
$$
E[\xi^4]=\frac{4!}{2!2^2}=3
$$
且$\frac{B(t)}{\sqrt{t}}$也服从标准正态分布，所以可以得到
$$
E[(\frac{B(t)}{\sqrt{t}})^4]=3
$$
进而可以得到
$$
E[B^4(t)]=3t^2
$$
所以原式可以计算出来，为
$$
Var\int_0^T B^2(t)dB(t)=\int_0^T 3t^2 dt=t^3\big|_0^T = T^3
$$
(3) 由Fubini定理可以得到
$$
E\int_0^T B^2(t)dt=\int_0^T EB^2(t)dt=\int_0^Ttdt=\frac{T^2}{2}
$$


**例** 令 $\mu_n =E B^n(1)$，证明：$\mu_{n+2}=(n+1)\mu_n$

**证明** $\mu_{n+2}=EB^{n+2}(1)$

我们可以考虑使用 Ito 积分进行推导，取 $f(x)=x^{n+2}$ 则有

$$\begin{aligned}
f(B_1)=f(B_0)+\int_0^1 f'(B_s)dB_s+\frac{1}{2}f''(B_s)ds\iff 
\\B^{n+2}(1)=B^{n+2}(0)+\int_0^1(n+2)B^{n+1}(s)dB_s+\frac{1}{2}\int_0^1(n+2)(n+1)B^n(s)ds
\end{aligned}$$

!!! note "Tip"

      这里 $B^{n+2}(1)$ 实际上指的是 $(B(1))^{n+2}$

两边同时取期望可以得到

$$\begin{aligned}
&\mu_{n+2}=E[\int_0^1(n+2)B^{n+1}(s)dB_s]+E[\frac{1}{2}\int_0^1(n+2)(n+1)B^n(s)ds]\\&=0+\frac{1}{2}\int_0^1(n+2)(n+1)E[B^n(s)]ds\\&=\frac{1}{2}(n+2)(n+1)\int_0^1E[B^n(s)]ds
\end{aligned}$$

我们又知道 $\frac{B(s)}{\sqrt{s}}\overset{d}{=}B(1)$，所以可以得到 $E[B^n(s)]=s^{\frac{n}{2}}B^n(1)=s^{\frac{n}{2}}\mu_n$，所以可以得到

$$
\mu_{n+2}=\frac{1}{2}(n+2)(n+1)\int_0^1 s^{\frac{n}{2}}\mu_n ds = \frac{1}{2}(n+2)(n+1)\mu_n=\frac{1}{2}(n+2)(n+1)\mu_n\frac{2}{n+2}=(n+1)\mu_n
$$

证毕。

特别地，我们知道 $\mu_1 = EB(1)=0$，$\mu_2=EB^2(1)=1$，所以可以得到
$$
\mu_{2k-1}=0\qquad \mu_{2k}=(2k-1)!!
$$

!!! note "Tip"

      事实上，参考上面的我们计算 $E[B^4(t)]$ 的方法，我们甚至能把 $\mu_n$ 给求出来，结合一下标准正态分布随机变量的 $k$ 阶矩即可，不过老师的本意是希望我们能够用 Ito 积分公式完成这道题目，下面我们就直接求 $\mu_n$ 试试看

      考虑到对于标准正态分布随机变量 $\xi\sim N(0,1)$，有
      $$
      E[\xi^{2k}]=\frac{(2k)!}{k! 2^k},E[\xi^{2k-1}]=0
      $$
      而$\frac{B(t)}{\sqrt{t}}$也服从标准正态分布，所以有
      $$
      E[(\frac{B(t)}{\sqrt{t}})^{2k}]=\frac{(2k)!}{k! 2^k},\qquad E[(\frac{B(t)}{\sqrt{t}})^{2k-1}]=0
      $$
      所以有
      $$
      E[(B(t))^{2k}]=t^k\frac{(2k)!}{k!2^k}\qquad E[(B(t))^{2k-1}]=0
      $$
      故有
      $$
      E[(B(1))^{2k}]=\frac{(2k)!}{k!2^k}\qquad E[(B(1))^{2k-1}]=0
      $$
      即
      $$
      \mu_{2k}=\frac{(2k!)}{k!2^k}\qquad \mu_{2k-1}=0
      $$
      下面我们考虑 $\mu_{n+2}=(n+1)\mu_n$，若 $n+2$ 为偶数，则有
      $$
      \mu_{n+2}=\frac{(n+2)!}{(\frac{n}{2}+1)!2^{\frac{2}{n}+1}}\qquad \mu_n=\frac{n!}{\frac{n}{2}!2^{\frac{n}{2}}}
      $$
      验证即知
      $$
      \frac{\mu_{n+2}}{\mu_n}=\frac{(n+2)!}{(\frac{n}{2}+1)!2^{\frac{2}{n}+1}}\times \frac{\frac{n}{2}!2^{\frac{n}{2}}}{n!}=\frac{(n+2)(n+1)}{2\times \frac{n+2}{2}}=(n+1)
      $$
