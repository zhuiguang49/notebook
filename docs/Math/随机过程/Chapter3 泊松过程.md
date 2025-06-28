## Chapter3 泊松过程

### 计数过程

**计数过程**：以$N(t)$表示在时间间隔$(0,t]$内事件发生的数目，$\left\{N(t),t\geq0\right\}$是取非负整数、时间连续的随机过程，称为计数过程

计数过程$\left\{N(t)\right\}$如果满足以下条件，则被称作参数为$\lambda$的泊松过程：

- $N(0)=0$
- 独立增量
- $P\left\{N(t+h)-N(t)=1\right\}=\lambda h+o(h)$——稀有性
- $P\left\{N(t+h)-N(t)\geq 2\right\}=o(h)$——相继性

泊松过程也可以用另一形式定义：

称$\left\{N(t),t\geq0\right\}$是参数为$\lambda$的泊松过程，若满足：

- $N(0)=0$
- 独立增量
- 对任意的$t>s\geq0,N(t)-N(s)\sim P(\lambda(t-s))$

而由上述定义我们可以得到$N(t)=N(t)-N(0)\sim P(\lambda t)$

所以有$P(N(t)=k)=e^{-\lambda t}\frac{(\lambda t)^k}{k!},k=0,1,\cdot\cdot\cdot$

那么就有$EN(t)=\lambda t,DN(t)=\lambda t$，

当$t \geq s$时，$Cov(N_s,N_t)=Cov(N_s,N_s+(N_t-N_s))=Cov(N_s,N_s)=DN_s$，

这条其实可以写作$Cov(N_s,N_t)=DN_{min(s,t)}$



下面我们来看一道例题

**例1** 顾客依泊松过程到达某商店，速率为4人/小时，已知商店上午9:00开门

（1）求到9:30时仅到一位顾客，而到11:30时已到5位顾客的概率？

（2）求第2位顾客在10点前到达的概率？

（3）求第一位顾客在9:30前到达且第二位顾客在10:00前到达的概率

**解** 以上午九点作为0时刻，以1小时作为单位时间，以$N(t)$表示$(0,t]$内来到的顾客数，则$\left\{N(t)\right\}$是$\lambda=4$的泊松过程

（1）$P\left\{N(0.5)=1,N(2.5)=5\right\}=P\left\{N(0.5)=1\right\}P\left\{N(2.5)-N(0.5)=4\right\}=(2e^{-2})(\frac{e^{-8}8^4}{4!})=0.0155$

（2）令$S_n$表示第$n$个顾客达到的时刻
$$
P(S_2\leq1)=P(N(1)\geq 2)=1-e^{-4}-4e^{-4}=1-5e^{-4}
$$
（3）
$$
P[S_1 \leq 0.5,S_2 \leq 1]=P[N(0.5)\geq 1,N(1)\geq 2]=P[N(0.5)=1,N(1)-N(0.5)\geq1]+P[N(0.5)\geq 2]\\=0.5\lambda e^{-0.5\lambda}(1-e^{-0.5\lambda})+1-e^{-0.5\lambda}-0.5\lambda e^{-0.5\lambda}=1-e^{-2}-2e^{-4}
$$

> 第三问这里有个坑要搞清楚，$P[N(0.5\geq1),N(1)\geq 2]\neq P[N(0.5)\geq1,N(1)-N(0.5)\geq1] $，因为当$N(0.5)\geq 2$时，就不需要$N(1)-N(0.5)\geq 1$的条件了



### 泊松过程的两种定义及其等价性证明

前面我们提到，泊松过程有两种定义形式，下面我们证明一下这两种定义其实是等价的。

**定义1**：计数过程$\left\{N(t)\right\}$如果满足以下条件，则被称作参数为$\lambda$的泊松过程：

- $N(0)=0$
- 独立增量
- $P\left\{N(t+h)-N(t)=1\right\}=\lambda h+o(h)$——稀有性
- $P\left\{N(t+h)-N(t)\geq 2\right\}=o(h)$——相继性

**定义2**：称$\left\{N(t),t\geq0\right\}$是参数为$\lambda$的泊松过程，若满足：

- $N(0)=0$
- 独立增量
- 对任意的$t>s\geq0,N(t)-N(s)\sim P(\lambda(t-s))$



下面我们用**定义2来推定义1**：

这里我们需要用到$e^x$的$Taylor$展开，也即
$$
e^x=1+x+\frac{x^2}{2}+\frac{x^3}{3!}+\cdot\cdot\cdot+\frac{x^n}{n!}+o(x^n)
$$
先证明**稀有性**
$$
P\left\{N(t+h)-N(t)=1\right\}=\frac{(\lambda h)^1}{1!}e^{-\lambda h}=\lambda h e^{-\lambda h}=\lambda h(1-\lambda h+o(h))=\lambda h+o(h)
$$
再证明**相继性**
$$
P\left\{N(t+h)-N(t)\geq2\right\}=1-P\left\{N(t+h)-N(t)=0\right\}-P\left\{N(t+h)-N(t)=1\right\}\\=1-\frac{(\lambda h)^0}{0!}e^{-\lambda h}-\frac{(\lambda h)}{1}e^{-\lambda h}=1-e^{-\lambda h}-\lambda h e^{-\lambda h}=1-(1-\lambda h)-\lambda h(1-\lambda h)=\lambda^2h^2=o(h)
$$


下面我们用**定义1来推定义2**：

我们先从直观地角度去考虑一下，为了能够用上泊松过程的独立增量性，我们将时间差分成小段，也即将$(s,t]$进行$n$等分，设为$t_0<t_1<\cdot\cdot\cdot<t_n$，也即有$t_0=s,t_n=t,t_{i+1}-t_i=h=\frac{t-s}{n}$，利用独立增量性，我们考虑
$$
P\left\{N_{t_i+1}-N_{t_i}\leq1, \forall i\right\}=\prod_{i}P\left\{N_{t_i+1}-N_{t_i}\leq1\right\}=(1-o(h))^n=[(1-o(h))^{\frac{1}{o(h)}}]^{no(h)}\to 1
$$
所以就有当$h$足够小的时候，$N_t-N_s$近似服从二项分布$B(n,\lambda h +o(h))$

> 这里的逻辑是我们证明了$P\left\{N_{t_i+1}-N_{t_i}\leq1, \forall i\right\}$的概率几乎是1，也就是说我们可以近似的只考虑$N_{t_i+1}-N_{t_i}$为0或1两种情形，而为1的情形我们由定义1知道其概率是$\lambda h+o(h)$，所以这近似就是一个二项分布
>
> 而令$h \to 0$时，我们可以得到$n\cdot(\lambda h+o(h))=n\lambda h=\lambda(t-s)$为一个定值，这里用到概率论中学到的，$n$很大，$p$很小且$np$为定值时，二项分布可以近似为泊松分布$P(np)$

所以我们令$h\to0$时得到，$N_t-N_s\sim P(\lambda(t-s))$



下面我们给出严格的证明

**证明方法1**：考虑通过概率密度函数进行证明

对 $t > s \geq 0$，我们记 $N(s, t] = N(t) - N(s)$，然后我们固定 $s$，对 $t \geq s$，令 $P_k(t) = P(N(s, t] = k)$。

我们不妨先从最简单的$P_0(t)$开始考虑：

对 $h > 0$，有$P_0(t + h) = P(N(s, t] = 0, N(t, t + h] = 0)$（这里我们希望利用独立增量将交事件的概率转化为概率的乘积）
由独立增量性，可知其等于$P(N(s, t] = 0)P(N(t, t + h] = 0)= P_0(t)[1 - \lambda h + o(h)]= P_0(t)[1 - \lambda h] + o(h)$

接下来我们移项构造$P_0(t)$的导数得到微分方程进而求解$P_0(t)$，由上式可以得到：
$$
\frac{P_0(t + h) - P_0(t)}{h} = -\lambda P_0(t) + \frac{o(h)}{h}
$$
令$h\to0$，则可以得到
$$
\frac{dP_0(t)}{dt}=-\lambda P_0(t)
$$
又由于初值$P_0(s)=1$，可以得到$P_0(t)=e^{-\lambda(t-s)}$

接下来我们用数学归纳法进行证明：

假设$P_k(t)=e^{-\lambda(t-s)}\frac{[\lambda(t-s)]^k}{k!}$，下面我们证明$P_{k+1}(t)=e^{-\lambda(t-s)}\frac{[\lambda(t-s)]^{k+1}}{(k+1)!}$
$$
P_{k+1}(t+h)\\=P(N(s,t]=k+1,N(t,t+h]=0)+P(N(s,t]=k,N(t,t+h]=1)+P(N(s,t+h]=k+1,N(t,t+h]\geq2)\\=P_{k+1}(t)P(N(t,t+h]=0)+P_{k}(t)P(N(t,t+h]=1)+P(N(s,t+h]=k+1,N(t,t+h]\geq2)\\=P_{k+1}(t)(1-\lambda h+o(h))+P_{k}(t)(\lambda h+o(h))+o(h)\\=P_{k+1}(t)(1-\lambda h)+P_{k}(t)(\lambda h)+o(h)
$$
同样，我们构造关于$P_{k+1}(t)$的导数可以得到
$$
\frac{P_{k+1}(t+h)-P_{k+1}(t)}{h}=-\lambda P_{k+1}(t)+\lambda P_{k}(t)+\frac{o(h)}{h}
$$
令$h\to 0$，则可以得到微分方程
$$
\frac{dP_{k+1}(t)}{dt}=-\lambda P_{k+1}(t)+\lambda P{k}(t)
$$
又由初值$P_{k+1}(s)=0$，可以解得
$$
P_{k+1}(t)=e^{-\lambda(t-s)}\frac{[\lambda(t-s)]^{k+1}}{(k+1)!}
$$

### 泊松过程的性质

设$\left\{N(t),t\geq0 \right\}$是参数为$\lambda$的泊松过程，则该过程有以下几点性质：

1. $E[N(t)]=D[N(t)]=\lambda t$

2. $C_{N}(s,t)=D[N(\min(s,t))]=\lambda \min(s,t)$

3. 对任何$s>0$，$\left\{N(t+s)-N(s),t\geq0\right\}$也是参数为$\lambda$的泊松过程，且其与$\left\{N(u),u\geq s\right\}$独立

4. 对$t\geq s,n \geq m$，有

   - $P(N_t=n|N_s=m)=e^{-\lambda(t-s)}\frac{[\lambda(t-s)]^{n-m}}{(n-m)!}$

     > 上式的证明我们可以这么考虑，运用泊松过程的**独立增量**性质将条件概率转化为无条件概率，并且运用到$N_t-N_s$也是泊松过程的性质。其证明如下：
     > $$
     > P(N_t=n|N_s=m)=P(N_t-N_s=n-m|N_s=m)=P(N_t-N_s=n-m)=e^{-\lambda(t-s)}\frac{[\lambda(t-s)]^{n-m}}{(n-m)!}
     > $$

   - $P(N_s=m|N_t=n)=C_n^m(\frac{s}{t})^m(1-\frac{s}{t})^{n-m}$
   
     > 这个性质证明可能得难点在我们发现$N_t$其实是更大范围的那个，我们似乎没法利用独立增量性将其转化为两个独立事件，所以这个时候我们就可以选择回到条件概率的定义：
     > $$
     > P(N_s=m|N_t=n)=\frac{P(N_s=m,N_t=n)}{P(N_t=n)}=\frac{P(N_s=m,N_t-N_s=n-m)}{P(N_t=n)}\\=\frac{P(N_s=m)P(N_t-N_s=n-m)}{P(N_t=n)}=\frac{\frac{(\lambda s)^m}{m!}e^{-\lambda s}\cdot\frac{(\lambda(t-s))^{n-m}}{(n-m)!}e^{-\lambda (t-s)}}{\frac{(\lambda t)^n}{n!}e^{-\lambda t}}\\=C_n^m(\frac{s}{t})^m(1-\frac{s}{t})^{n-m}
     > $$
   	> 这时候我们不难发现，这遵循的是一个二项分布，所以我们可以得到一个很有意思的结论：
   	>
   	> 在$N_t=n$的条件下，$N_s \sim B(n,\frac{s}{t})$，服从$p=\frac{s}{t}$的**二项分布**，并且这个$p$还跟时间长度之比有关，又有些类似均匀分布
   

### 与泊松过程联系的若干分布

#### 第$n$个事件发生的时刻$S_n$服从伽马分布

我们记第$n$个事件发生的时刻为$S_n$，考虑$S_n$的分布函数$F_{S_n}(t)=P(S_n \leq t)$，有
$$
P(S_n \leq t)=P(N(t) \geq n)=1-P(N(t)\leq n-1)=1-\sum_{i=0}^{n-1}\frac{(\lambda t)^i}{i!}e^{-\lambda t}
$$
考虑其概率密度函数，对分布函数求导可得：
$$
f_{S_n}(t)=\sum_{i=0}^{n-1}\lambda e^{-\lambda t}\frac{(\lambda t)^i}{i!}-\sum_{i=1}^{n-1}\frac{\lambda(\lambda t)^{i-1}}{(i-1)!}e^{-\lambda}=\lambda(e^{-\lambda t})\frac{(\lambda t)^{n-1}}{(n-1)!}
$$

> 这里我们有两个需要注意的地方：
>
> 1. $P(S_n \leq t)=P(N(t) \geq n)=1-P(N(t)\leq n-1)$，将第$n$个事件发生的时刻$S_n$转化为$t$时刻事件发生的次数$N_t$，这是因为$N(t)$是服从泊松分布的，其性质我们易于研究。
> 2. 对分布函数求导变成密度函数的时候，求和涉及了级数，但是注意这并不是无穷级数，不要贸然使用无穷级数求和的公式

最终我们可以得到
$$
f_{S_n}(t)=\begin{cases}
\frac{\lambda(\lambda t)^{n-1}}{(n-1)!}e^{-\lambda t},&t>0
\\
0,&\text{其他}
\end{cases}
$$
也即有$S_n\sim \Gamma(n,\lambda)$

> 虽然笔者根本就不记得伽马函数的密度函数和分布函数🤣

#### 第$i-1$和第$i$个事件发生的时间间隔$T_i$服从指数分布

> 首先，我们先总结一下$N(t),T_n,S_n$三者之间相互刻画的关系
>
> - $T_i=S_i-S_{i-1}$
> - $S_0=0,S_n=T_1+\cdot\cdot\cdot+T_n,n\geq1$
> - $S_n=\inf\left\{t>0:N(t)=n\right\},n\geq1$
> - $N(t)=\sup\left\{n\geq0:S_n \leq t\right\}$
>
> 不过我个人觉得第三和第四条其实并不需要记得这么精确，用到上确界和下确界，实际上我们记得二者之间的转化关系即可，也即$S_n\leq t \iff N(t)\geq n$

下面我们给出一个关于**泊松过程事件发生之间的时间间隔的分布**的定理：$\left\{N(t)\right\}$是参数为$\lambda$的泊松过程当且仅当其时间间隔$T_1,\cdot\cdot\cdot,T_n$独立同分布，且服从参数为$\lambda$，均值为$\frac{1}{\lambda}$的指数分布

下面我们给出证明：

我们先由**泊松过程**推**时间间隔独立同分布且服从指数分布**

先考虑$T_1$，$F_{T_1}(t)=P(T_1\leq t)=P(N(t)\geq 1)=1-P(N(t)=0)=1-e^{-\lambda t}$，这当然是指数分布的分布函数，看不出来的话我们也可以求导看密度函数，都可以知道$T_1\sim Exp(\lambda)$，下面我们用数学归纳法对结论进行证明。假设$T_1,T_2,\cdot\cdot\cdot,T_n$独立同分布，且有$T_i\sim Exp(\lambda)$，下面我们证明$T_{n+1}\sim Exp(\lambda)$且与$(T_1,T_2,\cdot\cdot\cdot,T_n)$独立，则对$t_1,t_2,\cdot\cdot\cdot,t_n,t>0$，有
$$
P(T_{n+1}\leq t |T_1=t_1,\cdot\cdot\cdot,T_n=t_n)=P(T_{n+1}\leq t|S_1=t_1,S_2=t_1+t_2,\cdot\cdot\cdot,S_n=t_1+\cdot\cdot\cdot+t_n)\\=P(N(t+t_1+\cdot\cdot\cdot+t_{n})-N(t_1+\cdot\cdot\cdot+t_n)\geq1|S_1=t_1,S_2=t_1+t_2,\cdot\cdot\cdot,S_n=t_1+\cdot\cdot\cdot+t_n)\qquad(*)
$$

> 这里其实还算是有一点技巧的，我们通过将$T_n$转化为$S_n$在转化为$N(t)$，利用$N(t)$是已知的服从泊松分布的性质，这也启示着我们后续可以将$T_n,S_n,N(t)$三者联系得更紧密一些，毕竟$T_n,N(t)$两者的分布都是已知的

而由独立增量性，可以得到

$(*)=P(N(t+t_1+\cdot\cdot\cdot+t_n)-N(t_1+\cdot\cdot\cdot+t_n)\geq 1)=1-P(N(t+t_1+\cdot\cdot\cdot+t_n)-N(t_1+\cdot\cdot\cdot+t_n)=0)=1-e^{-\lambda t}$

我们发现其与$t_1,t_2,\cdot\cdot\cdot,t_n$无关，这一方面说明了$T_{n+1}$与$(T_n,T_2,\cdot\cdot\cdot,T_n)$独立，一方面也说明了$P(T_{n+1}\leq t)=1-e^{-\lambda t}$，也即$T_{n+1}\sim Exp(\lambda)$

由**时间间隔独立同分布且服从指数分布**推**泊松过程**这里就不进行证明了，老师说不必掌握（偷个懒，后面有时间补上）



下面我们来看一道例题：

**例** 上午8点开始某台取款机开始工作，此时有一大堆人排队等待取款，设每人的取款时间独立且都服从均值为10分钟的指数分布，记$A$为事件“到上午9点钟为止恰有10人完成取款”，$B$为事件“到上午8:30为止恰有4人完成取款”，求$P(A),P(B|A)$

**解** 我们以上午8点钟作为0时刻，以1小时作为单位时间，以$N_t$表示$(0,t]$时间中完成取款的人数，则$\left\{N(t);t\geq0\right\}$是$\lambda=6$的泊松过程

> 因为间隔时间10分钟为单位时间的$\frac{1}{6}$，也就是间隔时间的均值为$\frac{1}{6}$，所以参数$\lambda =6$

则有$A=\left\{N(1)=10\right\},\ B=\left\{N(0.5)=4\right\}$

显然由于间隔时间是服从均值为$\lambda$的指数分布，完成取款的人数$N(t)$应当是服从参数为$\lambda$的泊松分布，所以我们可以得到
$$
P(A)=\frac{6^{10}}{10!}e^{-6}\\
P(B|A)=\frac{P(AB)}{P(A)}=\frac{P\left\{N(0.5)=4\right\}P\left\{N(1)-N(0.5)=6\right\}}{P\left\{N(1)=10\right\}}\\=\frac{(e^{-3}\frac{3^4}{4!})(e^{-3}\frac{3^6}{6!})}{e^{-6}\frac{6^{10}}{10!}}=C_{10}^4(\frac{1}{2})^{10}
$$


### 生成函数（母函数）与泊松分布

#### 生成函数的定义

假设$\xi$是**非负整数值**的随机变量，其分布律为$P(\xi = k) = p_k,\ k=0,1,\cdot\cdot\cdot$，我们定义
$$
\phi(x)=Ex^{\xi}=\sum_{k=0}^{\infty}p_k x^k,\qquad 0\leq x \leq1
$$
则我们称$\phi(\cdot)$为随机变量$\xi$的生成函数或母函数

#### 生成函数的性质

1. $0\leq \phi(x)\leq1,\phi(0)=p_0,\phi(1)=1$，这里我们定义$0^0=1$

2. $\phi(x)$在$[0,1]$单调递增且一致连续

3. 和特征函数一样，非负整数值随机变量$\xi$的分布和其生成函数$\phi(\cdot)$相互唯一确定，这是因为我们将$\phi(x)$进行$Taylor$展开，可以得到$p_0=\phi(0),\ p_1=\phi'(0),\cdot\cdot\cdot,p_k=\frac{\phi^{(k)}(0)}{k!}$

4. 生成函数可以唯一决定各阶矩

   > 由定义我们知道，$\phi(x)=Ex^{\xi}=\sum_{k=0}^{\infty}p_kx^k$，则有
   > $$
   > \phi'(x)=\sum_{k=0}^{\infty}p_k(x^k)'=\sum_{k=1}^{\infty}p_kkx^{k-1}=E[\xi x^{\xi-1}]
   > $$
   > 依次类推，有
   > $$
   > \phi^{(k)}(x)=E[\xi(\xi-1)\cdot\cdot\cdot(\xi-(k-1))x^{\xi-k}]
   > $$
   > 其中$\phi^{(k)}(1)$我们定义为$\lim_{x\to1}\phi^{(k)}(x)$
   >
   > 从而我们可以得到$E\xi=\phi'(1),\ E[\xi(\xi-1)]=E(\xi^2)-E(\xi)=\phi''(1)$，进而就能计算出$E(\xi^2)$，其余各阶矩依此类推可以计算得出。

下面我们举一个具体例子来看生成函数计算各阶矩的应用

**例** 设随机变量$x\sim B(n,p)$，令$q=1-p$

则有$\psi_x(t)=E(t^x)=\sum_{k=0}^n t^kP(x=k)=\sum_{k=0}^nt^kC_n^kp^k q^{n-k}=\sum_{k=0}^nC_n^k(pt)^kq^{n-k}=(pt+1-p)^n$

$\psi_x'(t)=np(pt+1-p)^{n-1}$，则有$\psi_x'(1)=np$，所以$EX=np$



**例** 假设$\xi$服从几何分布，$P(\xi = k)=p(1-p)^{k-1},\qquad k\geq1$

则有$\phi(x)=Ex^{\xi}=\sum_{k=1}^{\infty}s^kp(1-p)^{k-1}=\frac{ps}{1-(1-p)s}$

5. 如果$X$和$Y$都是取值非负整数值的随机变量，那么当$X$与$Y$独立时，对$0\leq s\leq1$都有
   $$
   \phi_{X+Y}(s)=\phi_X(s)\phi_Y(s)
   $$
   这里$\phi_{X+Y},\phi_X,\phi_Y$分别是$X+Y,X,Y$的生成函数

   > 这个证明其实很简单
   > $$
   > \phi_{X+Y}(s)=E(s^{X+Y})=E(s^Xs^Y)=E(s^X)E(s^{Y})=\phi_{X}(s)\phi_{Y}(s)
   > $$
   >



#### 泊松分布的生成函数

> $\phi_X(t)=Et^X=\sum_{k=0}^{\infty}t^ke^{-\lambda}\frac{\lambda^k}{k!}$

设$X\sim P(\lambda)$，也即服从参数为$\lambda$的泊松分布，则有：

1. $P(X=k)=e^{-\lambda}\frac{\lambda^k}{k!},k=0,1,2,\cdot\cdot\cdot$
2. $E(X)=Var(X)=\lambda$

3. $X$的生成函数（或母函数）
   $$
   \phi(t)=Et^X=e^{\lambda(t-1)},\ 0\leq t\leq1
   $$

> $$
> \phi(t)=Et^{\xi}=\sum_{k=0}^{\infty}P(\xi=k)t^k=\sum_{k=0}^{\infty}\frac{\lambda^k}{k!}e^{-\lambda}t^k=\sum_{k=0}^{\infty}\frac{(\lambda t)^k}{k!}e^{-\lambda t}e^{\lambda(t-1)}=e^{\lambda t}e^{-\lambda t }e^{\lambda(t-1)}=e^{\lambda(t-1)}
> $$

4. $E[(X(X-1)\cdot\cdot\cdot(X-k+1))]=\lambda^k$

>我们知道，生成函数的$k$阶导数$\phi(t)^{(k)}=E[X(X-1)\cdot\cdot\cdot(X-k+1)t^{X-k}]=(e^{\lambda(t-1)})^k=\lambda^ke^{\lambda(t-1)}$，故有
>$$
>\phi(1)^{(k)}=E[X(X-1)\cdot\cdot\cdot(X-k+1)]=\lambda^k
>$$

#### 泊松分布的可加性和可分性

在考虑泊松分布的可加性和可分性之前，我们先给出一个定理：

设$X_1,\cdot\cdot\cdot,X_n$是离散型随机变量，若对任何$x_1,\cdot\cdot\cdot,x_n$，$P(X_1=x_1,\cdot\cdot\cdot,X_n=x_n)=p_1(x_1)\cdot\cdot\cdot p_n(x_n)$，这里$p_i$满足$p_i(x)\geq0,\sum_xp_i(x)=1$，那么$X_i$具有分布律$p_i(x)$，且$X_1,\cdot\cdot\cdot,X_n$相互独立

**其证明如下：**对任何$x_1$，$P(X_1=x_1)=\sum_{X_2,\cdot\cdot\cdot,X_n}p_1(x_1)\cdot\cdot\cdot p_n(x_n)=p_1(x_1)$，所以$X_1$分布律为$p_1(x)$，同理有$X_i$分布律为$p_i(x)$



下面我们正式提出泊松分布的可加性和可分性

1. **可加性**：设$X\sim P(\lambda),Y\sim P(\mu)$，且二者相互独立，则有$X+Y\sim P(\lambda + \mu)$

2. **可分性：**设$N \sim P(\lambda)$，则在$N=n$的条件下，这$n$个事件独立地以概率$p_i$为类型$i$，

   这里$i=1,2,\cdot\cdot\cdot,k,\ p_1+p_2+\cdot\cdot\cdot+p_k=1$，那么我们以$N_i$表示事件$i$发生的个数，则有$N_i\sim P(\lambda p_i)$，且$N_1,\cdot\cdot\cdot,N_k$相互独立



这两条定理的证明如下：

对于**可加性的证明**，我们可以从生成函数的角度进行考虑，因为$X$和$Y$相互独立，所以对$0\leq s\leq1$，有
$$
\phi_{X+Y}(s)=\phi_X(s)\phi_Y(s)=e^{\lambda(s-1)}e^{\mu(s-1)}=e^{(\lambda+\mu)(s-1)}
$$
所以有$X+Y\sim P(\lambda + \mu)$



对于**可分性**的证明：对任意非负整数$i_1,\cdot\cdot\cdot i_k$，令$n=i_1+\cdot\cdot\cdot+i_k$，则有
$$
P(N_1=i_1,\cdot\cdot\cdot,N_k=i_k)=P(N_1=i_1,\cdot\cdot\cdot,N_k=i_k|N=n)P(N=n)=\frac{n!}{i_1!\cdot\cdot\cdot i_k!}p_1^{i_1}\cdot\cdot\cdot p_k^{i_k}e^{-\lambda}\frac{\lambda^n}{n!}\\=e^{-\lambda p_1}\frac{(\lambda p_1)^{i_1}}{i_1!}\cdot\cdot\cdot e^{-\lambda p_k}\frac{(\lambda p_k)^{i_k}}{i_k!}
$$

> 这是一个多项分布

### 泊松过程的合成和分解

#### 泊松过程的合成

我们设$\left\{N_1(t)\right\}$和$\left\{N_2(t)\right\}$是强度为$\lambda_1$和$\lambda_2$的泊松过程，且相互独立，则$\left\{N_1(t)+N_2(t)\right\}$是强度为$\lambda_1+\lambda_2$的泊松过程

> - 该定理也可以推广到有限个泊松过程
>
> - $\left\{N_1(t)+N_2(t)\right\}$是强度为$\lambda_1+\lambda_2$的泊松过程的证明：
>
>   对任意的$t>s$，有$N(t)-N(s)=N_1(t)-N_1(s)+N_2(t)-N_2(s)$，其中$N_1(t)-N_1(s)\sim P(\lambda_1(t-s))$，$N_2(t)-N_2(s)\sim P(\lambda_2(t-s))$，由泊松分布的可加性可知，$N(t)-N(s)\sim P((\lambda_1+\lambda_2)(t-s))$，所以$\left\{N_1(t)+N_2(t)\right\}$是强度为$\lambda_1+\lambda_2$的泊松过程

要证其是强度为$\lambda_1+\lambda_2$的泊松过程，就需要证明其满足泊松过程的三个性质：

- $N(0)=0$
- 独立增量过程
- $\forall \ t>s,N(t)-N(s)\sim P(\lambda(t-s))$

其中$N(0)=0$是容易证明的，因为$N(0)=N_1(0)+N_2(0)=0$，而第三点我们在上面也已经进行了证明，下面我们看第二点独立增量过程的证明。

对任意的$0\leq t_1 <t_2<\cdot\cdot\cdot<t_n,(N_1(t_2)-N_1(t_1),\cdot\cdot\cdot,N_1(t_{n})-N_1(t_{n-1}))$与$(N_2(t_2)-N_2(t(1)),\cdot\cdot\cdot,N_2(t_n)-N_2(t_{n-1}))$相互独立，**这是因为$N_1(t)$与$N_2(t)$两个泊松过程本身是相互独立的**。且我们又知道**每个泊松过程又是独立增量过程**，也就是说，在泊松过程的内部，$N_1(t_2)-N_1(t_1)$，$N_1(t_3)-N_1(t_2)$，$\cdot\cdot\cdot$，$N_1(t_n)-N_1(t_{n-1})$是相互独立的，对于$N_2(t)$也是如此，所以就推出了$N_1(t_2)-N_1(t_1),\cdot\cdot\cdot,N_1(t_n)-N_1(t_{n-1}),N_2(t_2)-N_2(t_1),\cdot\cdot\cdot,N_2(t_n)-N_2(t_{n-1})$是相互独立的，因此就有$N(t_2)-N(t_1),\cdot\cdot\cdot,N(t_n)-N(t_{n-1})$是相互独立的，独立增量过程就证完了

#### 泊松过程的分解

我们设$\left\{N(t)\right\}$是强度为$\lambda$的泊松过程，若每个事件**独立地**（也独立于过程$\left\{N(t)\right\}$）以概率$p$为类型1，以$1-p$为类型2，令$\left\{N_1(t)\right\}$和$\left\{N_2(t)\right\}$分别表示到$t$为止类型1和类型2发生的个数，则$\left\{N_1(t)\right\}$和$\left\{N_2(t)\right\}$分别是强度为$\lambda p $和$\lambda(1-p)$的泊松过程，且相互独立

证明也需要按照泊松过程的定义来，证明泊松过程的三条性质，下面我们给出证明：

- 因为$N(0)=0$，所以$N_1(0)=0,\ N_2(0)=0$是显然的

- 对任意$t>S\geq0$，由泊松分布的可分性可知：$N_1(t)-N_1(s)\sim P(\lambda p(1-s)),\ N_2(t)-N_2(s)\sim P(\lambda(1-p)(t-s))$，且$N_1(t)-N_1(s)$与$N_2(t)-N_2(s)$相互独立

- 独立增量过程

  由于$\left\{N(t)\right\}$是独立增量过程，且各事件属于哪种类型是相互独立的，那么就有对任何$0=t_0<t_1<\cdot\cdot\cdot<t_n$，$(N_1(t_1)-N_1(t_0),N_2(t_1)-N_2(t_0)),\cdot\cdot\cdot,(N_1(t_n)-N_1(t_{n-1}),N_2(t_n)-N_2(t_{n-1}))$这$n$个二维随机变量是相互独立的，又对所有的$0\leq i<n$，$N_1(t_{i+1})-N_1(t_i)$与$N_2(t_{i+1})-N_2(t_i)$是相互独立的，所以可以得到$N_1(t_1)-N_1(t_0),N_2(t_1)-N_2(t_0),\cdot\cdot\cdot,N_1(t_n)-N_1(t_{n-1}),N_2(t_n)-N_2(t_{n-1})$这$2n$个随机变量是相互独立的。

  这一方面说明$\left\{N_1(t)\right\}$和$\left\{N_2(t)\right\}$是独立增量过程，另一方面也说明$(N_1(t_1),\cdot\cdot\cdot,N_1(t_n))$与$(N_2(t_1),\cdot\cdot\cdot,N_2(t_n))$相互独立

> 这里我们发现，在证明泊松过程的差也是泊松过程的时候，我们都会运用泊松分布和泊松过程之间的关系，这点似乎也贯穿了泊松过程始终，当我们考虑随机过程遇到一点困难的时候，我们不妨从概率分布的角度去考虑一下



**例** 某银行有两个窗口可以接受服务。上午九点钟，小王到达这个银行，此时两个窗口分别有一个顾客在接受服务，另外有2个顾客排在小王的前面等待接受服务，一会儿又来了很多顾客，假设服务的规则是先来先服务，那么排在队伍中的第一个顾客就马上在此窗口接受服务。假设各个顾客接受服务的时间独立同分布，而且服从均值为20分钟的指数分布。问：小王在十点钟之前能够接受服务的概率为？

**解** 我们以上午九点钟作为0时刻，以1小时作为单位时间，对$i=1,2$，我们令$\left\{N_i(t);t\geq0\right\}$是强度为3的泊松过程，且$\left\{N_1(t)\right\}$和$\left\{N_2(t)\right\}$是相互独立的，令$N(t)$表示$(0,t]$时间内这两个窗口完成服务的顾客总数，则$N(t)=N_1(t)+N_2(t)$，由泊松过程的合成可知，$N(t)$是强度为6的泊松过程。

并且我们知道当第3个顾客服务完成时，小王就能够接受服务。所以我们记$S_i$表示第$i$个顾客服务完成的时刻，那么我们要求解的概率为：
$$
P(S_3 \leq 1)=P(N(1)\geq 3)=1-P(N(1)=0)-P(N(1)=1)-P(N(1)=2)\\=1-e^{-6}-6e^{-6}-18e^{-6}=0.938
$$

> 这里很多同学可能会纠结我们并不知道已经在服务的顾客的时长，不知道他还有多久才服务完，这怎么计算呢？但是从这道题我们可以发现，我们的逻辑是利用了泊松过程的无记忆性，剩余等待时长仍然服从泊松过程，进而我们确定了服务完成的人数$N(t)$是服从泊松过程的，而小王需要等待的时间是一小时，一小时内完成的人数是$N(1)$，这就是这类题的思路。我们避开了单独的每一个人的计算，而是转为考虑9-10点这一个小时内三个人服务完三个人的概率



**例** 设$N(t)$表示手机在$(0,t]$天内收到的短信数，假设$\left\{N(t);t\geq 0\right\}$是强度为10条的泊松过程，其中每条短信独立地以概率0.2是垃圾短信，求：

(1) 一天内没有收到垃圾短信的概率

(2) 第一天内收到3条有用短信，1条垃圾短信，第二天没有收到垃圾短信的概率？

**解** 我们分别以$X(t),Y(t)$表示手机在$(0,t]$天内收到的垃圾短信数和有用短信数，则$\left\{X(t);t\geq0\right\}$和$\left\{Y(t);t\geq0\right\}$分别是强度为2和8的泊松过程，且相互独立。

(1) $P\left\{X(1)=0\right\}=e^{-2}=0.135$

(2)
$$
P\left\{Y(1)=3,X(1)=1,X(2)-X(1)=0\right\}=P\left\{Y(1)=3\right\}P\left\{X(1)=1,X(2)-X(1)=0\right\}\\=P\left\{Y(1)=3\right\}P\left\{X(1)=1\right\}P\left\{X(2)-X(1)=0\right\}=e^{-8}\cdot\frac{8^3}{3!}\cdot e^{-2}\cdot2\cdot e^{-2}=\frac{512}{3}e^{-12}
$$

### 到达时刻的条件分布

#### 次序统计量的密度函数

我们先介绍一下**次序统计量**的密度函数

设$X_1,X_2,\cdot\cdot\cdot,X_n$是来自密度函数为$f$的总体的简单样本（即$X_1,X_2,\cdot\cdot\cdot,X_n$独立同分布，具有密度函数$f$），把$X_1,X_2,\cdot\cdot\cdot,X_n$按从小到大的次序排列得到$X_{(1)}\leq X_{(2)}\leq\cdot\cdot\cdot\leq X_{(n)}$，即$(X_{(1)},X_{(2)},\cdot\cdot\cdot,X_{(n)})$具有密度函数
$$
g(x_1,x_2,\cdot\cdot\cdot,x_n)=\begin{cases}
n!f(x_1)f(x_2)\cdot\cdot\cdot f(x_n), & x_1<x_2<\cdot\cdot\cdot x_n
\\
0,&其他
\end{cases}
$$

**证明**：对$x_1<x_2<\cdot\cdot\cdot<x_n$，以及$\xi_i>0$且使得$x_i+\varepsilon_i<x_{i+1}$有
$$
P(X_{(i)}\in (x_i,x_i+\varepsilon_i],\forall 1\leq i\leq n)=\sum_{\tau是1,2,\cdot\cdot\cdot,n的排列}P(X_{\tau_i}\in(x_i,x_i+\varepsilon_i],\forall 1 \leq i \leq n)=n!\prod_{i=1}^n[F(x_i+\varepsilon_i)-F(x_i)]
$$
所以有$g(x_1,x_2,\cdot\cdot\cdot,x_n)=\lim_{max(\varepsilon_1,\cdot\cdot\cdot,\varepsilon_n)\to 0}\frac{P(X_{(i)}\in(x_i,x_i+\varepsilon_i],\forall 1 \leq i\leq n)}{\varepsilon_1\cdot\cdot\cdot\varepsilon_n}=n!f(x_1)\cdot\cdot\cdot f(x_n)$

#### 泊松过程的次序统计量（第n个事件发生的时刻$S_n$）

而对于泊松过程来说，就有如下**定理**：

设$\left\{N(t)\right\}$是强度为$\lambda$的泊松过程，令$S_1,S_2,\cdot\cdot\cdot$分别为第1个事件，第2个事件，$\cdot\cdot\cdot$的发生时刻，对任意给定的$t>0$和正整数$n$，有
$$
(S_1,S_2,\cdot\cdot\cdot,S_n|N(t)=n)和(U_{(1)},\cdot\cdot\cdot,U_{(n)})同分布
$$
其中$(U_{(1)},\cdot\cdot\cdot,U_{(n)})$为$n$个独立且服从$U(0,t)$分布的随机变量$U_1,\cdot\cdot\cdot,U_n$的次序统计量

> 这里的意思是，$U_1,\cdot\cdot\cdot,U_n$是独立同服从$U(0,t)$的，而$(U_{(1)},\cdot\cdot\cdot,U_{(n)})$是其次序统计量。

下面我们给出证明：

对任意 $0 \leq s_1 < t_1 < s_2 < t_2 < \dots < s_n < t_n \leq t$，有
$$
P(s_1 < S_1 \leq t_1, s_2 < S_2 \leq t_2, \dots, s_n < S_n \leq t_n \mid N(t) = n)\\= \frac{P(s_1 < S_1 \leq t_1, s_2 < S_2 \leq t_2, \dots, s_n < S_n \leq t_n, N(t) = n)}{P(N(t) = n)}\\= \frac{P(N(s_1, t_1] = 1, \dots, N(s_n, t_n] = 1, N(s_1) = 0, N(t_1, s_2] = 0, \dots, N(t - t_n) = 0)}{P(N(t) = n)}\\= \frac{e^{-\lambda t} \lambda^n (t_1 - s_1) \dots (t_n - s_n)}{e^{-\lambda t} \frac{(\lambda t)^n}{n!}}\\= \frac{n! (t_1 - s_1) \dots (t_n - s_n)}{t^n}
$$
因此就有在$N(t)=n$的条件下，$(S_1,\cdot\cdot\cdot,S_n)$的密度函数为
$$
g(x_1, x_2, \ldots, x_n)
= \lim_{\max(\varepsilon_1, \ldots, \varepsilon_n) \to 0} \frac{P(S_i \in (x_i, x_i + \varepsilon_i], \forall 1 \leq i \leq n \mid N(t) = n)}{\varepsilon_1 \cdots \varepsilon_n}
= \frac{n!}{t^n}, \quad 0 < x_1 < x_2 < \ldots < x_n < t
$$
这正是$(U_{(1)}, U_{(2)}, \ldots, U_{(n)})$ 的联合密度函数。



我们还可以得到一个**推论**：设$\left\{N(t)\right\}$是强度为$\lambda$的泊松过程，对$t>s\geq0$，令$W_1,W_2,\cdot\cdot\cdot$分别为$(s,t]$内发生的第一个事件，第二个事件，$\cdot\cdot\cdot$的到达时刻，任意给定正整数，有
$$
(W_1,W_2,\cdot\cdot\cdot,W_n|N(t)-N(s)=n)与(U_{(1)},U_{(2)},\cdot\cdot\cdot U_{(n)})同分布
$$
其中$(U_{(1)},U_{(2)},\cdot\cdot\cdot U_{(n)})$为$n$个独立同服从$U(s,t)$分布的随机变量$U_1,\cdot\cdot\cdot,U_n$的次序统计量



下面我们来看一道例题：

**例:** 保险理赔按速率 $\lambda$ 的泊松过程到达。设各人理赔金额独立同分布（且独立于此泊松过程），具有均值为 $\mu$ 的分布 $G$。以 $S_i$ 和 $C_i$ 分别表示第 $i$ 次理赔的时间和金额。采用贴现算法，即 $t$ 时刻的 1 元相当于 0 时刻的 $e^{-\alpha t}$ 元。则到 $t$ 为止总理赔的贴现价值为

$$
D(t) = \sum_{i=1}^{N(t)} e^{-\alpha S_i} C_i,
$$

计算 $E(D(t))$

> 解释一下这里的贴现价值，就相当于通货膨胀，钱越来越不值钱。以及上面的式子中$N(t)$指的是$t$时刻已经完成赔付的人数

**解** 这题有一个需要注意的地方就是求和的上界$N(t)$并不是一个常数，而是一个变量，我们运用**全期望公式**，有
$$
E(D(t))=E[E(D(t))|N(t)]
$$
在$N(t)=n$的条件下，$(S_1,\cdot\cdot\cdot,S_n)$与$n$个独立的$U(0,t)$随机变量$U_1,\cdot\cdot\cdot,U_n$的次序统计量$(U_{(1)},U_{(2)},\cdot\cdot\cdot,U_{(n)})$同分布，所以有
$$
E(D(t)|N(t)=n)=E[\sum_{i=1}^nC_ie^{-\alpha U_{(i)}}]=\sum_{i=1}^nE(C_i)E[e^{-\alpha U_{(i)}}]=\mu E[\sum_{i=1}^ne^{-\alpha U_{(i)}}]
$$

> 在最后一个等式，我们选择了将利用数学期望的线性性将求和放到期望里面，这是因为次序统计量的求和 与 原本的求和是相等的，则有

$$
\mu E[\sum_{i=1}^ne^{-\alpha U_{(i)}}]=\mu E[\sum_{i=1}^ne^{-\alpha U_i}]=n\mu \int_{0}^t \frac{1}{t}e^{-\alpha x}dx=\frac{n\mu}{\alpha t}(1-e^{-\alpha t})
$$

所以有$E(D(t))=E[E(D(t)|N(t))]=E[N(t)\frac{\mu}{\alpha t}(1-e^{-\alpha t})]=\frac{\lambda \mu}{\alpha}(1-e^{-\alpha t})$，这个最外层的期望是对$N(t)$求数学期望，由于$N(t)$是一个参数为$\lambda$的泊松过程，其期望是$\lambda t$

> 并且上面我们曾经提到过，$S_n$是服从伽马分布的，但是在$N(t)=n$的条件下$S_n$是否还服从伽马分布呢？显然是不服从的，我们可以这么理解，因为$N(t)=n$其实是会影响$S_1,\cdot\cdot\cdot,S_n$的，比如必须都在$t$时刻之前

#### Beta分布的定义

下面我们简单介绍一下**$Beta$分布**

$X$ 服从参数为 $\alpha > 0$, $\beta > 0$ 的 Beta 分布，记作 $X \sim \text{Beta}(\alpha, \beta)$。其密度函数为：

$$
f(x; \alpha, \beta) = \text{constant} \cdot x^{\alpha-1}(1-x)^{\beta-1}
$$

具体形式如下：

$$
f(x; \alpha, \beta) = \frac{x^{\alpha-1}(1-x)^{\beta-1}}{\int_0^1 u^{\alpha-1}(1-u)^{\beta-1} \, du}
$$

进一步化简为：

$$
f(x; \alpha, \beta) = \frac{\Gamma(\alpha + \beta)}{\Gamma(\alpha)\Gamma(\beta)} x^{\alpha-1}(1-x)^{\beta-1}
$$

最终形式为：

$$
f(x; \alpha, \beta) = \frac{1}{\mathrm{B}(\alpha, \beta)} x^{\alpha-1}(1-x)^{\beta-1}, \quad \text{for } 0 < x < 1
$$

#### Beta分布的性质

1. 如果 $X \sim \text{Beta}(\alpha, \beta)$，那么 $E(X) = \frac{\alpha}{\alpha + \beta}$。

2. $\text{Beta}(1, 1) = U(0, 1)$。

3. 如果 $X_1, \dots, X_n$ 独立同服从 $U(0, 1)$，对应的次序统计量为 $X_{(1)} \leq \dots \leq X_{(n)}$，那么

   $$
   X_{(k)} \sim \text{Beta}(k, n-k+1), \quad E(X_{(k)}) = \frac{k}{n+1}
   $$

   这里 $k = 1, 2, \dots, n$。



下面我们再看一道例题：

设$\left\{N(t),t\geq 0\right\}$是参数为$\lambda$的泊松过程，对$1\leq k \leq n$，计算$E(S_k|N(t)=n)$

**解** 在$N(t)=n$的条件下，$(S_1,\cdot\cdot\cdot,S_n)$与$n$个独立的$U(0,t)$随机变量$U_1,\cdot\cdot\cdot,U_n$的次序统计量$(U_{(1)},\cdot\cdot\cdot,U_{(n)})$同分布

所以有$E(S_k|N(t)=n)=E[U_{(k)}]=\frac{k}{n+1}t$

> 这个结论似乎还挺重要的，作业题考到了这样的题

> 其推导过程如下，似乎要用到Beta分布，仅做介绍：
> 在给定泊松过程 $N(t) = n$ 的条件下，事件发生时间 $S_1, S_2, \dots, S_n$ 的条件分布等价于区间 $[0, t]$ 上 $n$ 个独立均匀分布随机变量 $U_1, \dots, U_n$ 的顺序统计量 $U_{(1)}, \dots, U_{(n)}$。对于均匀分布的顺序统计量 $U_{(k)}$，其期望推导如下：
>
> 1. **顺序统计量的概率密度函数**： 
>    $U_{(k)}$的密度函数为  
>    $$
>    f_{U_{(k)}}(u) = \frac{n!}{(k-1)!(n-k)!} \left(\frac{u}{t}\right)^{k-1} \left(1 - \frac{u}{t}\right)^{n-k} \cdot \frac{1}{t}.
>    $$
>    
>    
>
> 2. **期望计算**： 
>    通过变量替换 $v = u/t$，积分转化为 Beta 函数形式：  
>    $$
>    E[U_{(k)}] = t \cdot \int_0^1 v \cdot \frac{n!}{(k-1)!(n-k)!} v^{k-1} (1-v)^{n-k} \, dv.
>    $$
>    积分部分对应 Beta 函数 $B(k+1, n-k+1)$，其值为 $\frac{k!(n-k)!}{(n+1)!}$。化简后得到：  _
>    $$
>    E[U_{(k)}] = t \cdot \frac{k}{n+1}.
>    $$
>
> **验证**： 
> 当 $k=1$ 时，$E[U_{(1)}] = \frac{t}{n+1}$；当 $k=n$ 时，$E[U_{(n)}] = \frac{nt}{n+1}$，均与均匀分布顺序统计量的性质一致。
>
> 因此，给定 \(N(t) = n\) 时，\(S_k\) 的条件期望为：
> $$
> E(S_k | N(t) = n) = \frac{k}{n+1}t.
> $$



### 非齐次泊松过程

#### 非齐次泊松过程的定义

定义：计数过程$\left\{N(t)\right\}$若满足以下四条性质，则被称作**强度为$\lambda(t)$的非齐次泊松过程**：

1. $N(0)=0$
2. 独立增量性
3. $P\left\{N(t+h)-N(t)\right\}=\lambda(t)h+o(h)$
4. $P\left\{N(t+h)-N(t)\geq 2\right\}=o(h)$

> 其实齐次泊松过程和非齐次泊松过程的差别就是强度是否随时间变化，非齐次泊松过程的强度$\lambda(t)$就是随时间变化的

我们知道，其次泊松过程是有两个等价定义的，非齐次泊松过程亦是如此

定义：计数过程$\left\{N(t),t\geq 0\right\}$是强度为$\lambda(t)$的非齐次泊松过程当且仅当：

1. $N(0)=0$
2. 独立增量性
3. 对任意的$t> s\geq 0$，有$N(t)-N(s)\sim P(\int_s^t\lambda(u)du)$

> 其中若我们令$m(t)=\int_0^t\lambda(u)du$，则有$N(t)\sim P(m(t))$，其中$m(t)$称作是$\left\{N(t)\right\}$的均值函数

容易发现，非齐次泊松过程并**不是平稳增量过程，但其是独立增量过程**

下面我们来看一些简单的计算：

**例:** 设 $\{N(t), t \geq 0\}$ 是非齐次泊松过程，强度为 $\lambda(t) = t^2$。计算：

1. $E(N(2))$；
2. $P(N(1) = 1, N(2) = 2)$；
3. $P(N(2) = 2 \mid N(1) = 1)$；
4. $P(N(1) = 1 \mid N(2) = 2)$。

**解：**

1. $E(N(2)) = \int_0^2 \lambda(t) \, dt = \int_0^2 t^2 \, dt = \frac{8}{3}$

2. $\int_0^1 \lambda(t) \, dt = \int_0^1 t^2 \, dt = \frac{1}{3}, \quad \int_1^2 \lambda(t) \, dt = \frac{8}{3} - \frac{1}{3} = \frac{7}{3}$

   $$
   P(N(1) = 1, N(2) = 2) = P(N(1) = 1) P(N(2) - N(1) = 1)
   $$

   $$
   = \left(\frac{1}{3} e^{-1/3}\right) \left(\frac{7}{3} e^{-7/3}\right) = \frac{7}{9} e^{-8/3}
   $$

3. $P(N(2) = 2 \mid N(1) = 1) = P(N(2) - N(1) = 1) = \frac{7}{3} e^{-7/3}$

4. $P(N(1) = 1 \mid N(2) = 2) = \frac{P(N(1) = 1, N(2) = 2)}{P(N(2) = 2)}$

   $$
   = \frac{\frac{7}{9} e^{-8/3}}{\left(\frac{8}{3}\right)^2 e^{-8/3} / 2} = \frac{\frac{7}{9} e^{-8/3}}{\frac{64}{9} e^{-8/3} / 2} = \frac{\frac{7}{9}}{\frac{32}{9}} = \frac{7}{32}
   $$

#### 非齐次泊松过程事件发生的时间间隔

**例：**设 $\{N(t)\}$ 是强度为 $\lambda(t) = t$ 的泊松过程。令 $S_i$ 表示第 $i$ 个事件发生的时刻，且 $S_0 = 0$。对 $i \geq 1$，令 $T_i = S_i - S_{i-1}$ 为第 $i-1$ 与第 $i$ 个事件发生的时间间隔。计算 $T_1, T_2$ 的密度函数，并判断它们是否独立？

> 注意我们这里讨论的是强度为$\lambda(t)=t$的情况，并非对所有非齐次泊松过程的一般性讨论
>
> 
>
> 其次是对于$T_1,T_2$是否独立，从直观上我们应该是能判断出来他们并不独立的，因为如若$T_1$的时间比较长，那么累计强度函数的值就比较大，这时$T_2$应该会较小

**解：**

1. **计算 $T_1$ 的分布：**先考虑$T_1$的分布函数进而求其密度函数
$$
   F_{T_1}(t) = P(T_1 \leq t) = P(N(t) \geq 1) = 1 - P(N(t) = 0)
$$

泊松过程的累积强度函数为：
$$
   m(t) = \int_0^t \lambda(u) \, du = \int_0^t u \, du = \frac{t^2}{2}.
$$

因此：
$$
   P(N(t) = 0) = e^{-m(t)} = e^{-\frac{t^2}{2}}.
$$

所以：
$$
   F_{T_1}(t) = 1 - e^{-\frac{t^2}{2}}.
$$

$T_1$ 的概率密度函数为：
$$
   f_{T_1}(t) = F_{T_1}'(t) = \frac{d}{dt} \left(1 - e^{-\frac{t^2}{2}}\right) = t e^{-\frac{t^2}{2}}.
$$
   从这个结果我们也能看出来，$T_1$并非服从指数分布。

2. **计算 $T_2$ 的条件分布：**

   $$
   P(T_2 \leq t \mid T_1 = s) = P(N(t+s) - N(s) \geq 1 \mid T_1 = s).
   $$

   由于泊松过程具有独立增量性质，$N(t+s) - N(s)$ 服从参数为 $m(t+s) - m(s)$ 的泊松分布。因此：
   $$
   P(N(t+s) - N(s) \geq 1) = 1 - P(N(t+s) - N(s) = 0).
   $$

   其中：
   $$
   m(t+s) - m(s) = \int_s^{t+s} u \, du = \frac{(t+s)^2}{2} - \frac{s^2}{2} = \frac{t^2 + 2ts}{2}.
   $$

   所以：
   $$
   P(N(t+s) - N(s) = 0) = e^{-(m(t+s) - m(s))} = e^{-\frac{t^2 + 2ts}{2}}.
   $$

   因此：
   $$
   P(T_2 \leq t \mid T_1 = s) = 1 - e^{-\frac{t^2 + 2ts}{2}}.
   $$

   $T_2$ 的条件概率密度函数为：
   $$
   f_{T_2 \mid T_1}(t \mid s) = \frac{d}{dt} \left(1 - e^{-\frac{t^2 + 2ts}{2}}\right) = (t + s) e^{-\frac{t^2 + 2ts}{2}}.
   $$

3. **判断 $T_1$ 和 $T_2$ 是否独立：**

   从上述计算可以看出，$T_2$ 的分布依赖于 $T_1$ 的值（即 $f_{T_2 \mid T_1}(t \mid s)$ 中包含 $s$）。因此，$T_1$ 和 $T_2$ 不是独立的。
   
   我们上面求出来的是$T_2$的条件概率密度函数，我们也可以求出$T_2$的概率密度函数并与其条件概率密度函数进行对比，如若不相同也能够说明是并不独立的：
   $$
   f_{T_2}(t) = \int_0^\infty f_{T_2 \mid T_1}(t \mid s) f_{T_1}(s) \, ds
   $$
   
   $$
   = \int_0^\infty (t + s) s e^{-(t+s)^2/2} \, ds
   $$
   
   $$
   = \int_t^\infty u (u - t) e^{-u^2/2} \, du
   $$
   
   $$
   = \int_t^\infty -(u - t) \, d\left(e^{-u^2/2}\right)
   $$
   
   $$
   = \int_t^\infty e^{-u^2/2} \, du = \sqrt{2\pi} \left[1 - \Phi(t)\right]
   $$
   
   $$
   \because f_{T_1} \neq f_{T_2}, \therefore T_1 \text{ 与 } T_2 \text{ 不同分布}
   $$
   
   $$
   \text{对 } s > 0, \, f_{T_2 \mid T_1}(\cdot \mid s) \neq f_{T_2}(\cdot), \text{ 所以 } T_1 \text{ 与 } T_2 \text{ 不独立}
   $$

#### 非齐次泊松过程的次序统计量

设 $\{N(t)\}$ 是强度为 $\lambda(t)$ 的泊松过程。对任何 $T > 0$，在 $N(T) = n$ 的条件下，第 1 个、第 2 个、…、第 $n$ 个事件发生的时刻 $(S_1, S_2, \dots, S_n)$ 与 $(X_{(1)}, X_{(2)}, \dots, X_{(n)})$ 同分布。

这里 $X_1, X_2, \dots, X_n$ 独立同分布，具有概率密度

$$
f(x) = \frac{\lambda(x) \mathbf{1}_{\{0 < x \leq T\}}}{\int_0^T \lambda(u) \, du},
$$

其中 $X_{(1)} < X_{(2)} < \dots < X_{(n)}$ 是 $X_1, X_2, \dots, X_n$ 的次序统计量。

#### 非齐次泊松过程的合成与分解

**合成：**设$\left\{N_1(t)\right\}$和$\left\{N_2(t)\right\}$是强度为$\lambda_1(t)$和$\lambda_2(t)$的泊松过程，且**相互独立**，则$\left\{\lambda_1(t)+\lambda_2(t)\right\}$的泊松过程

**分解：**设 $\{N(t)\}$ 是强度为 $\lambda$ 的泊松过程。在 $t$ 时刻发生的事件独立地（也独立于过程 $\{N(t)\}$）以概率 $p(t)$ 为类型 1，以概率 $1 - p(t)$ 为类型 2。令 $\{N_1(t)\}$ 和 $\{N_2(t)\}$ 分别表示到 $t$ 为止类型 1 和类型 2 发生的个数，则 $\{N_1(t)\}$ 和 $\{N_2(t)\}$ 分别是强度为 $\lambda p(t)$ 和 $\lambda (1 - p(t))$ 的泊松过程，且相互独立。

> 需要注意的是，上面的分解部分并不是强度$\lambda$随着时间$t$变化，而是为类型1和类型2的概率$p(t),1-p(t)$会随着时间变化。强度$\lambda(t)$，也就是随着时间变化时上述分解的定理仍然成立

#### 时间变换定理

设$\{N(t)\}$是强度为1的泊松过程，令$\lambda(u)$是$[0, \infty)$上非负的在任何有界区间上可积的函数,若我们令
$$
m(t) = \int_{0}^{t} \lambda(u) du,\ M(t) = N(m(t))
$$


则 $\{M(t)\}$ 是强度为 $\lambda(t)$ 的泊松过程。

> $M(t)-M(s)=\int_{s}^{t}\lambda(u)du$
>
> 该定理的意义在于它提供了一种方法可以将强度为1的泊松过程（标准泊松过程）转化为一个强度为任意函数的泊松过程，比如在这里$N(t)$就是一个强度为1的泊松过程，我们通过变换时间尺度，将一个标准的泊松过程转换成了一个具有更一般强度函数的泊松过程

#### 无穷条服务线的排队问题（M/G/$\infty$）

顾客按速率$\lambda$的泊松过程到达服务站，到达后马上接受服务，服务时间独立同服从分布G，令$X(t)$表示到$t$为止完成服务的顾客数，$Y(t)$表示$t$时正在接受服务的顾客数，问：$X(t)$和$Y(t)$服从什么分布？

**解** 我们记$t$时刻累积到达的顾客数为$N(t)$，其服从参数为$\lambda$的泊松分布，即$N(t)\sim P(\lambda t)$，我们知道$N(t)$的所有顾客可以分为已完成服务和未完成服务的顾客。

> 我们可以这么考虑，衡量顾客服务完成和未完成服务可以关注其离开的时间，如果其离开的时间$\leq$当前时刻$t$，那么他就是已完成服务的顾客，如果其离开的时间$>$当前时刻$t$，那么他就是未完成服务的顾客。而其离开的时间就等于其到达的时间+服务的时间，其中所有顾客到达的时间也就是泊松过程中事件发生时刻$S_n$，而此处我们也不考虑其先后顺序，只关注发生的个数，那么$S_n$就独立且同服从$(0,t]$上的均匀分布

不妨将到达时刻记为$U_1,\cdots,U_n$，这里的$U_1,\cdots,U_n$独立同分布且服从$(0,t]$上的均匀分布；而顾客的服务时间也是独立同服从分布G的，我们将其记为$\xi_1,\cdots,\xi_n$，则离开时间可表示为$U_1+\xi_1,\cdots,U_n+\xi_n$，且其独立同分布。不妨记$p=P(U_i+\xi_i\leq t)$为该名顾客已离开的概率（类型1），则顾客仍在服务（类型2）的概率为$1-p$，那么我们就可以用泊松分布的可分性将其分为$X(t)$和$Y(t)$，即有
$$
X(t)\sim P(\lambda tp)\qquad Y(t)\sim P(\lambda t (1-\lambda))
$$
那么接下来我们的任务就是计算$p=P(U_i+\xi_i \leq t)$

我们马上就能想到卷积计算，也即
$$
p=\int_RP(U_1+\xi_1\leq t |U_1 =s)f_{U_1}(s)ds=\int_0^t \frac{1}{t}P(\xi_1 \leq t-s|U_1=s)ds=\int_0^t \frac{1}{t}G(t-s)ds
$$
令$u=t-s$，则有原式等于
$$
p=\int_0^t\frac{1}{t}G(t-s)ds=\int_t^0-\frac{1}{t}G(u)du=\int_0^t\frac{1}{t}G(u)du=\frac{1}{t}\int_0^t G(u)du
$$
最终我们可以得到
$$
X(t)\sim P(\int_0^t\lambda G(s)ds)\qquad Y(t)\sim P(\int_0^t\lambda(1-G(s))ds)
$$

### 复合泊松过程

随机过程$\left\{X(t);t\geq 0\right\}$满足
$$
X(t)=\sum_{k=1}^{N(t)}Y_k
$$
被称作复合泊松过程，其中$\left\{N(t);t\geq 0\right\}$是速率为$\lambda$的泊松过程，$\left\{Y_k;k\geq 1\right\}$是独立于$\left\{N(t);t\geq 0\right\}$的一组独立同分布的随机变量

#### 复合泊松过程的性质

1. $E(X(t))=\lambda tE(Y_1)$

   > 可以用全期望公式，$E[X(t)|N(t)= n]=\sum_{k=1}^nE(Y_i)=n E(Y_1)$
   >
   > 则$E[X(t)]=E[E[X(t)|N(t)]]=E[N(t)E(Y_1)]=\lambda tE(Y_1)  $

2. $Var(X(t))=\lambda t E(Y_1^2)$

   > 由$Var(X(t))=E(X^2(t))-E(X(t))^2$，我们考虑$E(X^2(t))=E[E(X^2(t)|N(t))]$
   >
   > 有$E(X^2(t)|N(t)=n)=E[(\sum_{i=1}^nY_i)^2|N(t)=n]=E(\sum_{i=1}^nY_i)^2$
   >
   > 又有$E(\sum_{i=1}^nY_i)^2=Var(\sum_{i=1}^nY_i)+[E(\sum_{i=1}^nY_i)]^2=nVarY_1+n^2(EY_1)^2$
   >
   > 于是$E(X^2(t))=E[N(t)VarY_1+N(t)^2(EY_1)^2]=\lambda t Var(Y_1)+(\lambda t +\lambda^2 t^2)(EY_1)^2$（这里对于$E(N(t)^2)$的计算可以回顾概率论中讲泊松分布那一块，其实也就是 方差 与 期望的平方 平方的期望 三者的联系）
   >
   > 所以有$Var(X(t))=E(X^2(t))-[E(X(t))]^2=\lambda t E(Y_1^2)$

3. $X(0)=0$且$\left\{X(t);t \geq 0\right\}$是平稳独立增量过程

   > $X(0)=0$显然，而要证明是平稳增量过程，即$\forall t>s,X(t)-X(s)$只是时间差$(t-s)$的函数
   >
   > 这里我们考虑特征函数，因为特征函数和分布函数是一一对应的。对于$t>s\geq 0$和$u\in R$，我们令$\phi(u)=E(e^{iuY_1})$，则有
   > $$
   > E(e^{iu(X(t)-X(s))})=E(e^{iu\sum_{k=N(s)+1}^{N(t)}Y_k})=E[E(e^{iu\sum_{k=N(s)+1}^{N(t)}Y_l}|N(s),N(t))]\\=E[\phi(u)^{N(t)-N(s)}]=E[\phi(u)^{N(t-s)}]
   > $$
   > 其只是时间差$t-s$的函数，所以是平稳增量过程
   >
   > 下面我们再证明是独立增量过程，也可以从特征函数的角度入手考虑：
   >
   > 对 $t_n > t_{n-1} > \dots > t_0 \geq 0$ 和 $u_1, \dots, u_n \in \mathbb{R}$，
   >
   > $$
   > E\left(e^{i \sum_{j=1}^n u_j (X(t_j) - X(t_{j-1}))}\right) = E\left(\prod_{j=1}^n e^{i u_j \sum_{k=N(t_{j-1})+1}^{N(t_j)} Y_k}\right)
   > $$
   >
   > $$
   > = E\left[E\left(\prod_{j=1}^n e^{i u_j \sum_{k=N(t_{j-1})+1}^{N(t_j)} Y_k} \mid N(t_0), \dots, N(t_n)\right)\right]
   > $$
   >
   > $$
   > = E\left[\prod_{j=1}^n \phi(u_j)^{N(t_j) - N(t_{j-1})}\right] = \prod_{j=1}^n E\left(\phi(u_j)^{N(t_j) - N(t_{j-1})}\right)
   > $$
   >
   > $$
   > = \prod_{j=1}^n E\left(e^{i u_j (X(t_j) - X(t_{j-1}))}\right)
   > $$
   >
   > 所以 $X(t_1) - X(t_0), \dots, X(t_n) - X(t_{n-1})$ 相互独立，因此 $\{X(t)\}$ 是独立增量过程。

下面我们来看一道例题：

**例** 某零件在运行中会受到撞击，记在$(0,t]$内受到撞击次数为$N(t)$，设$\left\{N(t)\right\}$是参数为$\lambda$的泊松过程，各次撞击带来的磨损量分别为$\xi_1,\xi_2,\cdots$，假设它们独立同服从参数为$\beta$的指数分布，且与$\left\{N(t)\right\}$独立，如果磨损量大于$\alpha$，其中$\alpha >0$，那么就需要更换零件，请计算零件的平均寿命

**解** 记$Z(t)$为总的磨损量，则其可以表示为$Z(t)=\sum_{i=1}^{N(t)}\xi_i$，很明显这是一个复合泊松过程，记$\eta$为零件寿命，则$\eta=\inf\left\{t \geq 0: Z(t) >\alpha\right\}$，我们的目标是计算$E\eta$，在第一节课的时候有提到过，对于非负随机变量$\eta$，有$E\eta=\int_0^{\infty}P(\eta > t)dt$，我们现在需要计算$P(\eta > t)$，其等价于$P(Z(t)\leq \alpha)$，我们可以运用**全概率公式**：
$$
P(Z(t)\leq \alpha)=\sum_n P(N(t)=n)P(Z(t)\leq \alpha|N(t)=n)=\sum_n P(N(t)=n)P(\sum_{k=1}^n\xi_k \leq \alpha | N(t)=n)\\=\sum_nP(N(t)=n)P(\sum_{k=1}^n \xi_k \leq \alpha)
$$
则我们可以得到
$$
E\eta = \int_0^{\infty}\sum_{n=0}^{\infty}P(N(t)=n)P(\sum_{k=1}^n \xi_k \leq \alpha)dt
$$
因为非负，积分与求和可以交换次序，则我们能得到
$$
E\eta = \sum_{n=0}^{\infty}\int_0^{\infty}P(N(t)=n)P(\sum_{k=1}^{n}\xi_k \leq \alpha)dt\\=\sum_{n=0}^{\infty}P(\sum_{k=1}^n \xi_k \leq \alpha)\int_0^{\infty}P(N(t)=n)dt\qquad (*)
$$
那么我们的目标就转化为了求$P(\sum_{k=1}^n \xi_k \leq \alpha)$与$\int_0^{\infty}P(N(t)=n)dt$
$$
\int_0^{\infty}e^{-\lambda t}\frac{(\lambda t)^n}{n!}dt\overset{令u = \lambda t}{=}\frac{1}{\lambda n!}\int_0^{\infty}e^{-u}u^ndu = \frac{1}{\lambda}
$$
上面用到了伽马函数的积分

我们也可以用概率角度来计算上面的积分
$$
\int_0^{\infty}P(N(t)=n)dt=\int_0^{\infty}E1_{N(t=n)dt}=E\int_0^{\infty}1_{N(t=n)}dt
$$
而我们知道$1_{N(t)=n}$只在$S_n\sim S_{n+1}$这一段为1，所以上式可以表示为
$$
E\int_{S_n}^{S_{n+1}}dt=E(S_{n+1}-S_n)=E(T_{n+1})=\frac{1}{\lambda}
$$

> 因为时间间隔独立且服从参数为$\lambda$的指数分布

下面我们求解$P(\sum_{k=1}^n \xi_k \leq \alpha)$，这个求和服从伽马分布，由于$\xi_k$是服从参数为$\beta$的指数分布，而我们还要计算其求和，我们不难想到可以将其构造成为一个参数为$\beta$的泊松过程，而$\xi_k$为该泊松过程的时间间隔，那么$\sum_{k=1}^n\xi_k$也就是$S_n$，而$S_n \leq \alpha$又可以转化为$N(\alpha) \geq n$，所以$(*)$式可以转化为
$$
\sum_{n=0}^{\infty}P(N(\alpha)\geq n)\frac{1}{\lambda}\qquad(1)
$$
而$\sum_{n=0}^{\infty}P(N(\alpha) \geq n)$该怎么计算呢，他其实是和期望有关的一个量，我们不妨回顾一下一个普通的非负离散型随机变量$\xi$是如何求其期望的，$E\xi = \sum_{k=1}^{\infty}kp_k$，我们可以将其写为下面这样的矩阵的形式
$$
\begin{bmatrix}
p_1 & p_2 & p_3 & p_4 &\cdots  \\
0 & p_2 & p_3 & p_4 &\cdots \\
0 & 0 & p_3 & p_4 &\cdots \\
0& 0 & 0 & p_4 &\cdots\\
\vdots & \vdots  & \ddots  &\vdots                               \\

\end{bmatrix}
$$
我们在求期望的时候相当于将其先对列求和，再求和；由于非负，我们也可以先行求和，再求和。

而行求和即$P(\xi \geq 1),P(\xi \geq 2),\dots$，所以期望的结果可以表示为$\sum_{k=1}^{\infty}P(\xi \geq k)$

所以$(1)$式即可转化为
$$
[E(N(\alpha))+P(N(\alpha)\geq 0)]\cdot \frac{1}{\lambda}=\frac{1}{\lambda}(\alpha\beta+1)
$$
