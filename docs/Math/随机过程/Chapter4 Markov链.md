## Chapter4 Markov链

### Markov链的定义

#### 马尔科夫链的定义

> 我们约定对于条件概率$P(A|B)$都是在假设$P(B)>0$的条件下

定义1：设随机过程$\left\{X_n;n=0,1,2,\dots\right\}$的状态空间$I$有限或可列，如果具有Markov性（无后效性或无记忆性），也即
$$
P(X_{n+1}=j|X_0=i_0,\cdots,X_{n-1}=i_{n-1}，X_n=i)=P(X_{n+1}=j|X_n = i)
$$
则称$\left\{X_n\right\}$是马尔科夫链(Markov chain)。如果状态空间$I$是有限的，我们称$\left\{X_n\right\}$是有限马尔科夫链

> Markov性的直观含义：
>
> 我们令$A=\left\{X_0=i_0,\dots,X_{n-1}=i_{n-1}\right\},B=\left\{X_n = i\right\},C=\left\{X_{n+1}=j\right\}$，其分别代表过去、现在、将来，则Markov性可以表示为$P(C|AB)=P(C|B)$，即已知到现在为止的所有状态，则将来的分布只与现在状态有关，而与过去的状态无关。
>
> 我们记$P_B(D)=P(D|B)$，则Markov性可以表示为：
> $$
> P(C|AB)=P(C|B) \iff P_B(C|A)=P_B(C)
> $$
> 也就是说，**在已知现在状态的条件下，过去与将来是相互独立的**，在本题的情境下，即已知$X_n=i$的条件下，则有$(X_0,\dots,X_{n-1})$与$(X_{n+1})$是相互独立的，但是**过去与将来并非独立，这种独立是条件性的**

下面我们进行一些记号的说明：

- 对$n\geq m \geq 0$和状态$i,j$，我们记
  $$
  P_{ij}(m,n)=P(X_n=j|X_m =i)
  $$
  它表示在$m$时处于状态$i$的条件下，到$n$时转移到状态$j$的转移概率

  其有以下性质：

  - $p_{ij}(m,n)\geq 0$
  - $\sum_{j \in I}p_{ij}(m,n) =1$

  > 如若状态空间$I = \left\{x_1,x_2,\dots\right\}$，其元素个数为$K$，我们令
  > $$
  > P(m,n) = (p_{x_i,x_j}(m,n))_{K \times K}
  > \\\\=
  > \begin{pmatrix}
  > p_{x_1,x_1}(m,n) & p_{x_1,x_2}(m,n) & \cdots & p_{x_1,x_K}(m,n) \\
  > p_{x_2,x_1}(m,n) & p_{x_2,x_2}(m,n) & \cdots & p_{x_2,x_K}(m,n) \\
  > \vdots & \vdots & \ddots & \vdots \\
  > p_{x_K,x_1}(m,n) & p_{x_K,x_2}(m,n) & \cdots & p_{x_K,x_K}(m,n)
  > \end{pmatrix}
  > $$
  > 我们称其为$m$时到$n$时的转移矩阵（矩阵的第$i+1$行就是给定$X_n=i$时，$X_{n+1}$的条件概率分布），其具有以下性质：
  >
  > - 各元素非负，每行元素之和为1
  

定义2：如果对任何状态$i,j$，转移概率$P(X_{n+1}=j|X_n = i)$与$n$无关，则称$\left\{X_n\right\}$是时间齐次的Markov链，也称该Markov链有平稳转移概率，此时我们将$P(X_{n+1}=j|X_n=i)$记为$p_{ij}$，称其为从$i$到$j$的一步转移概率，令$P=P(n,n+1)$，则称它为一步转移矩阵

> 对于这种时间齐次的Markov链$\left\{X_n\right\}$，一旦我们到达了状态$i$，就独立于过去，也忘记所处的时间，接下来的行为就如同0时刻从$i$出发的行为，下一步以概率$p_{ij}$到达状态$j$

#### 马尔科夫链的例子

**例1** （车险中的NCD系统）欧亚洲大部分汽车保险年金由所谓的好-坏系统确定，也就是无赔款优待系统，即NCD(No Claim Discount)系统，按照如下方式定义：

1. 保险人被分成级别$1,2,\dots,m$
2. 每年的保费只依赖于被保险人当年的级别
3. 下一年被保险人所处的级别由今年的级别和今年的理赔次数唯一确定

> 低级别对应于低的保险年金，无理赔是好的，一般会导致级别和保费下降；而有理赔是坏的，一般会导致级别和保费上升；理赔次数越多，级别和保费就会上升越多，下面我们以一个只有三个级别的NCD系统来说明问题：
>
> ![image-20250404113919659](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250404113919659.png)

我们设某参保人的初始级别是2，各年理赔次数独立同分布，且都服从均值为$\lambda>0$的泊松分布，令$X_i$是他在第$i$年的级别，则$\left\{X_n;n\geq 0\right\}$是时齐Markov链，状态空间为$I=\left\{1,2,3\right\}$，则一步转移矩阵为
$$
\begin{pmatrix}
p_0+p_1 & 1-p_0-p_1 & 0\\
p_0 &p_1&1-p_0-p_1\\
0&p_0&1-p_0
\end{pmatrix}
$$
这里$p_k=\frac{\lambda^k}{k!}e^{-\lambda},k=0,1$

> 回顾一下一步转移矩阵的元素$p_{11}(n,n+1)=P(X_{n+1}=1|X_n=1)=p_0+p_1$

**例2** （排队模型）有一个修理店，每天只能修好一个机器，不修当天送来的机器，假定第$n$天有$\xi_n$个机器损坏，则第$n+1$天把这$\xi_n$个机器送往此店维修，令$X_n$表示第$n$天结束时此店中机器的个数，则有
$$
X_{n+1}=\max(X_n-1,0)+\xi_n
$$
如果有$\xi_1,\xi_2,\dots$独立同分布，且与$X_0$独立，则$\left\{X_n;n\geq 0\right\}$是时齐Markov链，状态空间$I=\left\{0,1,2,\dots\right\}$

> 这里要取$\max(X_n-1,0)$是因为店里有可能没有损坏的机器，在这种情况下$X_{N+1}$取0

我们令$P(\xi_1=k)=a_k,k\geq 0$，则根据$X_{n+1}=\max(X_n-1,0)+\xi_n$得一步转移概率为：
$$
p_{ij}=\begin{cases}
a_j,&i=0\\
a_{j-i+1},&i>0且j\geq i-1\\
0，&其他
\end{cases}
$$

> 这里的推导是这样的，对于$i\geq 1,p_{ij}=P(X_{n+1}=j|X_n=i)=P(i-1+\xi_n=j)=P(\xi_n=j-i+1)=a_{j-i+1}$

**例3** （波利亚罐子模型）设一个罐子中装有$r$个红球，$b$个黑球，每次从罐子中任取一球，记录其颜色后将球放回，并加入$a$个相同颜色的球，持续进行这一过程，令$X_n$表示第$n$次试验结束时罐子中的红球数，则随机过程$\left\{X_n;n\geq 0\right\}$的状态空间为$I=\left\{r,r+a,r+2a,\dots\right\}$，这是一个Markov链吗

**解** 要说明这是一个Markov链，则要证明对正整数$n$和状态$i_0,i_1,\dots,i_{n-1},i,j$，在$X_0=i_0,\cdots,X_{n-1}=i_{n-1},X_n=i$的条件下，第$n+1$次取球时罐子中共有$r+b+na$个球，其中有$i$个红球，考虑
$$
P(X_{n+1}=j|X_0=i_0,\cdots,X_{n-1}=i_{n-1},X_n=i)=\begin{cases}
\frac{i}{r+b+na},&j=i+a\\
1-\frac{i}{r+b+na},&j=i\\
0,&其他
\end{cases}
$$
其与$i_0,i_1,\dots,i_{n-1}$无关，但是其与$n$有关，所以这是一个Markov链，但不是一个时间齐次的Markov链

**例4** 独立同分布的随机变量序列是时间齐次的Markov链

**例5** （定期清理模型）假设某人在某周一0:00（把这个当成0时刻）开始使用某部手机，他会在每周日下午整理并清空除本周和上周之外的所有照片，对于$i\geq 0$，我们令$X_i$表示第$i+1$周新产生的手机照片的数量，令$Y_i$表示第$i+2$周最后时刻手机里的照片数量，则有$Y_i=X_i+X_{i+1}$，设$X_0,X_1,\dots$独立同分布，都服从均值为$\lambda >0$的泊松分布，则$\left\{X_n;n\geq 0\right\}$是时间齐次的Markov链，问$\left\{Y_n;n\geq 0\right\}$是Markov链吗，为什么

> 提示，计算$P(Y_2=0|Y_0=0,Y_1=1)$和$P(Y_2=0|Y_1=1)$，如果具有Markov性，两者应该相等
>
> $Y_0=0\iff X_0=0,X_1=0\qquad Y_1=1\iff X_1=0,X_2=1 \qquad Y_2=0 \iff X_2=0,X_3=0$
>
> 我们发现这是矛盾的，所以左边的条件概率值必然为0；而对于右边的条件概率，则有
> $$
> P(Y_2=0|Y_1=1)=P(X_2+X_3=0|X_1+X_2=1)=\frac{P(X_2=0,X_3=0,X_1=1)}{P(X_1=0,X_2=1)+P(X_1=1,X_2=0}\\=\frac{P(X_2=0)P(X_3=0)P(X_1=1)}{P(X_1=0)P(X_2=1)+P(X_1=1)P(X_2=0)}=\frac{P(X_2=0)}{2}=\frac{e^{-\lambda}}{2}\neq 0
> $$
> 故$Y_n$不是Markov链

#### 马尔科夫链的有限维分布

从这一讲开始，我们只考虑**时间齐次**的Markov链

首先我们介绍它的各步转移概率之间满足著名的Chapman-Kolmogorov方程，简称C-K方程

**引理 C-K方程**：

对任何$n\geq 0,m,l\geq 1,i,j\in R  $，有
$$
p_{ij}(n,n+m+l)=\sum_{k\in I}p_{ik}(n,n+m)p_{kj}(n+m,n+m+l)
$$

> 即先从$i$转移到$k$，再从$k$转移到$j$

写成矩阵形式就是
$$
P(n,n+m+l)=P(n,n+m)P(n+m,n+m+l)
$$
其证明用到了全概率公式和Markov性：
$$
p_{ij}(n,n+m+l)=P(X_{n+m+l}=j|X_n=i)=\sum_{k\in I}P(X_{n+m}=k|X_n=i)P(X_{n+m+l=j}=j|X_n=i,X_{n+m}=k)\\=\sum_{k\in I}P(X_{n+m}=k|X_n=i)P(X_{n+m+l}=j|X_{n+m}=k)=\sum_{k\in I}p_{ik}(n,n+m)p_{kj}(n+m,n+m+l)
$$


若我们记$P(n,n+1)=P$那么由C-K方程我们就可以得到，对任何$n\geq 0$和$m\geq 1$，有
$$
P(n,n+m)=P^m
$$
不依赖于$n$，其证明可以由归纳法完成：

因为$\left\{X_n\right\}$是一个时间齐次的Markov过程，所以有$P(n,n+1)$不依赖于$n$，即结论对于$m=1$成立，我们假设对于$m=k$成立，则由C-K方程可以得到：
$$
P(n,n+k+1)=P(n,n+k)P(n+k,n+k+1)=P^kP=P^{k+1}
$$
也即结论对于$m=k+1$也成立，那么由数学归纳法可以知道，结论对于所有的$m\geq 1$均成立。

我们记$P^{(m)}=P(n,n+m)=P^m$，称为$m$步转移矩阵，即$p_{ij}^{(m)}=p_{ij}(n,n+m)$，其表示从$i$到$j$的$m$步转移概率

> 简单来说，$P^n$是Markov链的$n$步转移矩阵，而$P^{(n)}$可以通过转移概率矩阵$P$求出，即
> $$
> P^{(n)}=P\times P\times \cdots\times P=P^n
> $$
> 也即$n$步转移矩阵$P^n$可以由一步转移矩阵$P$自乘$n$次得到

我们希望**由初始分布和一步转移矩阵写出Markov链的有限维分布**，则有以下命题：

> 下面这个命题是非常重要的，我个人觉得对初学者理解Markov链很重要

(1) 对任何$n\geq 1$，有$P(X_n=j)=\sum_{i\in I}P(X_0=i)P(X_n=j|X_0=i)=\sum_{i}P(X_0=i)p_{ij}^{(n)}$

(2) 对任何$n_1<n_2<\dots<n_k$（这里时间是按照递增顺序排列的），有
$$
P(X_{n_1}=i_1,X_{n_2}=i_2,\dots,X_{n_k}=i_k)=P(X_{n_1}=i_1)P(X_{n_2}=i_2|X_{n_1}=i_1)P(X_{n_3}=i_3|X_{n_2}=i_2,X_{n_1}=i_1)\cdots\\=P(X_{n_1}=i_1)p_{i_1i_2}^{(n_2-n_1)}\cdots p_{i_{k-1}i_k}^{n_k-n_{k-1}}
$$
若我们把初始分布和$n$步分布分别写成行向量的形式，则可以得到：
$$
\mu^{(0)}=(P(X_0=x_1),P(X_0=x_2),\dots)\\
\mu^{(n)}=(P(X_n=x_1),P(X_n=x_2),\dots)
$$
则有$\mu^{(n)}=\mu^{(0)}P^n$

即我们可以得到结论：一个Markov链可由它的初始状态$X_0$，或初始状态的概率分布以及转移概率矩阵完全确定（有限维分布由初始分布和一步转移概率决定）



下面我们来看一道例题

**例** 设$\left\{X_n;n\geq 0\right\}$是具有三个状态0,1,2的时间齐次的Markov链，一步转移矩阵为：



![image-20250404172534443](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250404172534443.png)

且初始分布为$P(X_0=0)=P(X_0=1)=\frac{1}{2}$，计算

(1)$P(X_0=0,X_1=1,X_3=1)$

(2)$P(X_3=1,X_1=1|X_0=0)$

(3)$P(X_3=1)$

(4)$P(X_0=0|X_3=1)$

**解** 

对于第一问，则有
$$
P(X_0=0,X_1=1,X_3=1)=P(X_0=0)P(X_1=1|X_0=0)P(X_3=1|X_1=1,X_0=1)\\=P(X_0=0)p_{01}p_{11}^{(2)}=\frac{1}{2}\times1\times \frac{7}{8}=\frac{7}{16}
$$
上面用到了两步转移矩阵，也即

![image-20250404173636490](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250404173636490.png)

对于第二问，也就是初始分布发生了变化，从$X_0=0$出发
$$
P(X_3=1,X_1=1|X_0=0)=p_{01}p_{11}^{(2)}=\frac{7}{8}
$$
对于第三问，利用全概率公式
$$
P(X_3=1)=\sum_{i}P(X_0=i)p_{i1}^{(3)}\\=P(X_0=0)p_{01}^{(3)}+P(X_0=1)p_{11}^{(3)}+P(X_0=2)p_{21}^{(3)}\\=\frac{1}{2}\times\frac{7}{8}+\frac{1}{2}\times \frac{3}{32}+0=\frac{31}{64}
$$
上面用到了三步转移矩阵，也即

![image-20250404173719708](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250404173719708.png)

对于第四问，我们回到条件概率的定义，则有
$$
P(X_0=0|X_3=1)=\frac{P(X_0=0,X_3=1)}{P(X_3=1)}=\frac{P(X_3=1|X_0=0)P(X_0=0)}{P(X_3=1)}\\=\frac{\frac{1}{2}p_{01}^{(3)}}{\frac{31}{64}}=\frac{28}{31}
$$

> 我们也可以不计算两步转移矩阵和三步转移矩阵$P^2,P^3$，而是根据状态转移图和C-K方程来计算$p_{11}^{(2)},p_{01}^{(3)},p_{11}^{(3)}$
>
> ![image-20250404174304709](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250404174304709.png)
>
> 则我们可以得到
> $$
> p_{11}^{(2)}=p_{10}p_{01}+p_{12}p_{21}=\frac{7}{8}\\
> p_{01}^{(3)}=p_{01}p_{11}^{(2)}=\frac{7}{8}\\
> p_{11}^{(3)}=p_{12}p_{22}p_{21}=\frac{3}{32}
> $$

**例** 淘宝网上有5家网店卖同一种产品，设每位购买此种产品的顾客独立地任选一家网店进行购买，问经过5名顾客购买后，恰有3个网店被购买过的概率？

**解** 我们以$X_n$表示前$n+1$个顾客购买后被购买过的网店数目，那么$\left\{X_n\right\}$是以$I=\left\{1,2,3,4,5\right\}$为状态空间的时齐Markov链

$X_0=1$，我们考虑其转移概率，
$$
P(X_{n+1}=j|X_n=i)=\begin{cases}
\frac{i}{5} &j=i\\
1-\frac{i}{5} & j=i+1
\end{cases}
$$
我们需要计算$P(X_4=3)=p_{13}^{(4)}$

![image-20250404191139659](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250404191139659.png)

有$p_{13}^{(4)}=\sum_{i=1}^5p_{1i}^{(2)}p_{i3}^{(2)}=0.04\times0.48+0.48\times0.60+0.48\times0.3=0.48$

### Markov链的状态分类

#### 常返和暂留（瞬过）的定义（浙大版）

我们提出一些问题：

1. 从一个状态出发是不是一定能够在有限时间内返回该状态？（是不一定的，如果是就称为常返态，否则称为暂留态）
2. 如果能够返回，那么平均返回时间（平均回转时）一定有限吗？（不一定，如果是则称为正常返，否则称为零常返）
3. 如果平均回转时有限，那么它的精确值是多少？（和平稳分布有关）

定义$\tau_i=\min\left\{n\geq 1:X_n=i\right\}$（我们约定$\min \emptyset=\infty$），称为$i$的首中时（首次击中$i$的时刻）

则$\tau_i$的取值范围为$\left\{1,2,3,\dots\right\}\cup\left\{ \infty\right\}$

> $T_i=\min\left\{n\geq 0, X_n=i\right\}$，称为$i$的首访时（后面在讲吸收概率与平均吸收时间的时候会提到）

则有
$$
状态i\begin{cases}
常返：&P(\tau_i<\infty|X_0=i)=1\\
暂留：&P(\tau_i<\infty|X_0=i)<1
\end{cases}
$$
$i$常返：从$i$出发以概率1在有限时间内返回$i$

$i$暂留：从$i$出发以正概率不再返回状态$i$



若$i$常返，我们定义
$$
\mu_i=E(\tau_i|X_0=i)
$$
为$i$的平均回转时

则有
$$
i常返\begin{cases}
正常返：&\mu_i<\infty\\
零常返:  &\mu_i=\infty
\end{cases}
$$

从平均回转时来看，正常返返回速度快于零常返态

为了计算$P(\tau_i<\infty|X_0=i),\mu_i$，我们需要引进概率，令
$$
f_{ij}^{(n)}=P(X_n=j,X_{n-1}\neq j,\cdots,X_1\neq j|X_0=i)=P(\tau_j=n|X_0=i)
$$
表示从$i$出发第$n$步首次击中$j$的概率，令
$$
f_{ij}=P(\tau_j<\infty|X_0=i)
$$
表示从$i$出发有限时间内击中$j$的概率，特别地，$f_{ii}=P(\tau_i<\infty|X_0=i)$

则有
$$
f_{ij}=\sum_{n=1}^{\infty}f_{ij}^{(n)}=\lim_{N\to \infty}\sum_{n=1}^{N}f_{ij}^{(n)}
$$

> - $i$常返$\iff$$f_{ii}=1$，$i$暂留$\iff$$f_{ii}<1$
> - 若$i$常返，则有$\mu_i=\sum_{n=1}^{\infty}nf_{ii}^{(n)}$

下面我们给出**吸收态**的定义

如果$p_{ii}=1$，则称状态$i$是吸收态，其具有以下性质：

- Markov链一旦到达吸收态$i$，就将永远待在状态$i$
- 如果$i$是吸收态，则$f_{ii}=1,\mu_i=1,i$是正常返态

下面我们看一个例子：如下图所示的两状态Markov链，判断状态0的常返性

![image-20250411091258009](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250411091258009.png)

**解** $f_{00}^{(1)}=0.2,n\geq 2时，f_{00}^{(n)}=0$

所以有$f_{00}=0.2<1$，故$0$是暂留态

##### 常返和暂留的等价概率含义

若我们以$N_i$表示$X_0,X_1,\cdots$访问$i$的次数，则$i$**常返**$\iff P(N_i=\infty|X_0=i)=1$，也即从$i$出发以概率1返回$i$无穷多次（经常返回），如下所示
$$
i\overset{以概率1返回}{\to}i\overset{以概率1返回}{\to}i\overset{以概率1返回}{\to}i\cdots
$$
$i$**暂留**$\iff P(N_i=\infty|X_0=i)=0$，也即从$i$出发以概率1返回$i$有限多次，如下图所示

![image-20250411092631018](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250411092631018.png)

则有
$$
P(N_i\geq2|X_0=i)=f_{ii}\qquad P(N_i\geq n+1|X_0=i)=f_{ii}^{(n)}\\
n\to \infty ,\ P(N_i=\infty|X_0=i)=0
$$
下面我们看一些例题

<a id="section-1"></a>  

![image-20250411093310288](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250411093310288.png)

这里看状态转移图会比看矩阵容易一些，矩阵的话就是计算矩阵的乘积（这里和离散数学中的图有点像）

先考虑状态$0$，$f_{00}^{(1)}=0,f_{00}^{(2)}=p_{03}p_{30}=\frac{1}{4},f_{00}^{(3)}=p_{03}p_{33}p_{30}=\frac{1}{8}$

$n\geq 4$时，$f_{00}^{(n)}=p_{03}p_{33}^{(n-2)}p_{30}+p_{01}p_{12}p_{23}p_{33}^{(n-4)}p_{30}=\frac{1}{2^n}+\frac{1}{2^{n-2}}$

所以有$f_{00}=\sum_{n=1}^{\infty}f_{00}^{(n)}=\sum_{n=2}^{\infty}\frac{1}{2^n}+\sum_{n=4}^{\infty}\frac{1}{2^{n-2}}=1$，故$0$是常返态。进一步我们考虑平均回转时，有
$$
\mu_0=\sum_{n=2}^{\infty}n\frac{1}{2^n}+\sum_{n=4}^{\infty}n\frac{1}{2^{n-2}}=4
$$
所以$0$是正常返态

再考虑状态$3$，有$f_{33}^{(1)}=\frac{1}{2},f_{33}^{(2)}=p_{30}p_{03}=\frac{1}{4},f_{33}^{(4)}=p_{30}p_{01}p_{12}p_{23}=\frac{1}{4}$

当$n\geq 5$时，有$f_{33}^{(n)}=0$（不可能是这种情况，最多4步即返回，而且上面三个概率的和也已经为1了）

所以有$f_{33}=\sum_{n=1}^{\infty}f_{33}^{(n)}=1$，故3是常返态，又有$\mu_3=1*\frac{1}{2}+2*\frac{1}{4}+4*\frac{1}{4}=2$，所以3也是正常返态

> 虽然状态0和状态3都是正常返态，但是考虑到平均回转时，状态3的平均回转时更小，所以返回状态3更频繁
>
> 这里计算$f_{11}^{(n)},f_{22}^{(n)}$很复杂，需要引入新的方法

<a id="section-2"></a>  

![image-20250411095147289](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250411095147289.png)

$f_{00}^{(1)}=p_{00}=q_0$，对$n\geq2$
$$
f_{00}^{(n)}=p_{01}p_{12}\cdots p_{n-2,n-1}p_{n-1,0}=p_0p_1\cdots p_{n-2}(1-p_{n-1})\\=p_0p_1\cdots p_{n-2}-p_0p_1\cdots p_{n-1}
$$
 我们记$u_0=1,u_n=p_0p_1\cdots p_{n-1},\forall n\geq 1$，则有
$$
f_{00}^{(n)}=u_{n-1}-u_{n},\forall n\geq 1
$$
所以$f_{00}=(1-u_1)+(u_1-u_2)+\cdots+(u_{n-1}-u_n)+\cdots=1-\lim_{n\to \infty}u_n$

所以$0$是常返态$\iff \lim_{n\to \infty}u_n =0$

当$0$是常返态时，$u_n$递减且$\lim_{n\to \infty }u_n=0$，我们接着考虑平均回转时，以确定$0$是正常返还是零常返，考虑到
$$
\sum_{n=1}^{k}nf_{00}^{(n)}=(u_0-u_1)+2(u_1-u_2)+\cdots+k(u_{k-1}-u_k)=u_0+u_1+\cdots+u_{k-1}-ku_k\\=(u_0-u_k)+(u_1-u_k)+\cdots+(u_{k-1}-u_k)
$$
则有
$$
\mu_0=\sum_{n=1}^{\infty}nf_{00}^{(n)}=\lim_{k\to \infty}\sum_{n=1}^{k}nf_{00}^{(n)}=\lim_{k\to\infty}\sum_{n=0}^{\infty}(u_n-u_k)=\sum_{n=0}^{\infty}u_n
$$
所以$0$是正常返态$\iff \lim_{n\to \infty }u_n =0,\ \sum_{n=0}^{\infty}u_n<\infty$（第一个条件保证常返，第二个条件保证平均回转时有限）

又由于$\sum_{n=0}^{\infty}u_n<\infty$包含了$\lim_{n\to \infty }u_n =0$的条件，所以$0$是正常返态$\iff \sum_{n=0}^{\infty}u_n<\infty$

那么总结一下可以得到
$$
0\begin{cases}
暂留&\lim_{n\to\infty}u_n > 0\\
零常返 &\lim_{n\to \infty}u_n=0但\sum_{n}u_n=\infty\\
正常返 &\sum_{n}u_n<\infty
\end{cases}
$$

> 其实状态$0$的常返性还可以这么考虑，对$n\geq1$，我们考虑
> $$
> P(\tau_0>n|X_0=0)=p_0p_1\cdots p_{n-1}记为u_n
> $$
> 则有$P(\tau_0=\infty|X_0=0)=\lim_{n\to \infty}u_n$
>
> 所以有$0$是常返态当且仅当$\lim_{n\to\infty}u_n=0$
>
> 这样怎么考虑平均回转时$\mu_0=E[\tau_0|X_0=i]$呢，我们可以考虑伪概率的和，也即
> $$
> E[\tau_0|X_0=i]=\sum_{n=0}^{\infty}P(\tau_0>n|X_0=i)=\sum_{n=0}^{\infty}u_n
> $$

例如

- 如果 $ p_i = e^{-\frac{1}{(i+1)^2}} $，那么 $ u_n = e^{-(1 + \frac{1}{2^2} + \cdots + \frac{1}{n^2})} \to e^{-\sum_{i=1}^\infty \frac{1}{i^2}} > 0 $， 因此 $ 0 $ 是暂留态。 
- 如果 $ p_i = \frac{i+1}{i+2} $，那么 $ u_n = \frac{1}{n+1} $，$\lim_{n \to \infty} u_n = 0$，$\sum_{n=0}^\infty u_n = \infty$，因此 $ 0 $ 是零常返态。 
- 如果 $ p_i = \frac{(i+1)^2}{(i+2)^2} $，那么 $ u_n = \frac{1}{(n+1)^2} $，$\lim_{n \to \infty} u_n = 0$，$\sum_{n=0}^\infty u_n < \infty$，因此 $ 0 $ 是正常返态。

其样本轨道如下图所示

![image-20250411102400163](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250411102400163.png)

那么我们再提出一个问题，其他状态的常返性怎么去判断呢，我们给出的答案是：考虑**互达关系**

#### 常返和暂留（瞬过）的定义（中科大版）

首先引入一个重要的概率$f_{ij}^{(n)}$，它表示从$i$出发在$n$步转移时首次到达$j$的概率，用式子表达即
$$
f_{ij}^{(n)}=0\\
f_{ij}^{(n)}=P\left\{X_n=j,X_k\neq j,k=1,\cdots,n-1|X_0=i\right\}
$$
而$f_{ii}^{(n)}$就代表从$i$出发在第$n$次转移时首次回到状态$i$的概率，因不曾出发就不可能有回来，所以约定$f_{ii}^{(0)}=0$，同样定义
$$
f_{ii}^{(n)}=P\left\{X_n=i,X_k\neq i,k=1,\cdots,n-1|X_0=i\right\}
$$
记$f_{ij}=\sum_{n=1}^{\infty}f_{ij}^{(n)}$，它是从$i$出发最终转入状态$j$的概率，当$i\neq j$时，$i\to j$当且仅当$f_{ij}>0$（这是因为$f_{ij}$囊括了所有从$i$经过有限步到达$j$的可能，如果$f_{ij}=0$，就说明不可能经过有限步到达$j$）



引入这个概率之后，就可以给出**常返和瞬过的定义：**

如果$f_{ii}=1$，我们称状态$i$是常返的，一个非常返状态就称为瞬过的

> 从定义知道如果$i$是常返的状态，那么从$i$出发经过有限步转移后最终又回到$i$的概率为1

而我们怎么去判断一个状态$i$是常返的呢？我们给出用$n$步转移概率$P_{ii}^{(n)}$表示的一个判别准则：

**定理：**状态$i$常返的充分必要条件是
$$
\sum_{n=1}^{\infty}P_{ii}^{(n)}=\infty
$$
当然与此等价地有，状态$i$是瞬过的当且仅当
$$
\sum_{n=1}^{\infty}P_{ii}^{(n)}<\infty
$$
其证明如下：先考虑瞬过状态$i$，这时过程从$i$出发至少返回$i$一次的概率为$f_{ii}$且$f_{ii}<1$，由过程的Markov性，一旦回到$i$，过程以后得发展只依赖当前，因此从$i$出发至少回到$i$两次的概率为$f_{ii}^2$，这样不断地重复，并记随机变量$K$为过程返回$i$的次数，则$K$在给定$X_0=i$下的条件概率分布应该满足
$$
P\left\{K\geq k|X_0=i\right\}=f_{ii}^{k}
$$
这正是参数为$f_{ii}$的几何分布，于是$K$的条件期望为
$$
E(K|X_0=i)=\sum_{k=1}^{\infty}P(K\geq k|X_0=i)=\sum_{k=1}^{\infty}f_{ii}^k=\frac{f_{ii}}{1-f_{ii}}
$$
显然，当$f_{ii}<1$时，$E(K|X_0=i)<\infty$，即过程从$i$出发平均返回$i$的次数是有限的，另一方面记
$$
I_n=\begin{cases}
1,&若X_n=i\\
0,&其他
\end{cases}
$$
则有$K=\sum_{n=1}^{\infty}I_n$，于是有
$$
\sum_{n=1}^{\infty}P_{ii}^{(n)}=\sum_{n=1}^{\infty}P\left\{X_n=i|X_0=i\right\}=\sum_{n=1}^{\infty}E\left\{I_n|X_0=i\right\}\\=E\left\{\sum_{n=1}^{\infty}I_n|X_0=i\right\}=E\left\{K|X_0=i\right\}<\infty
$$
反之，如果有$\sum_{n=1}^{\infty}P_{ii}^{(n)}<\infty$，则必有$i$为瞬过的，如若不然，设$i$是常返的，则从$i$出发最终回到$i$的概率为1，由Markov性过程继续不断的重复，不断地返回$i$，因此以概率1，过程返回$i$的次数是无穷大，也即$E\left\{K|X_0=i\right\}=\infty$，与$\sum_{n=1}^{\infty}P_{ii}^{(n)}$收敛相矛盾，证毕

对于常返状态$i$，我们定义$T_i$为首次返回状态$i$的时刻，称作常返时，记$\mu_i=ET_i$，则有
$$
\mu_i=\sum_{n=1}^{\infty}nf_{ii}^{(n)}
$$
回想$f_{ii}^{(n)}$代表从$i$出发在第$n$步转移时首次回到$i$的概率，所有$\mu_i$是首次返回$i$的期望步数，也叫状态$i$的平均常返时，利用$\mu_i$可以对常返状态进行进一步的分类，分为零常返和正常返，也即以下定义：

一个常返状态$i$当且仅当$\mu_i=\infty$时称为零常返的，而当且仅当$\mu_i<\infty$时称为正常返的

> 对于只有有限多个状态的Markov链，$\mu_i$总是有限的，所以只有在有可列无穷多个状态时才可能出现零常返的状态

#### 常返和暂留（瞬过）的等价刻画

**定理1：**

- 状态$i$常返$\iff$ $\sum_{n=0}^{\infty}p_{ii}^{(n)}=\infty$

- 状态$i$暂留$\iff$$\sum_{n=0}^{\infty}p_{ii}^{(n)}<\infty \Rightarrow \lim_{n\to \infty}p_{ii}^{(n)}=0$

 其证明如下，用$N_i$表示$X_0,X_1,\cdots$访问$i$的总次数，我们先证明$\sum_{n=0}^{\infty}p_{ii}^{(n)}=E[N_i|X_0=i]$

令
$$
Y_n=\begin{cases}
1 &若X_n=i\\
0 &若X_n\neq i
\end{cases}
$$
则有$N_i=\sum_{n=0}^{\infty}Y_n$，所以有
$$
E[N_i|X_0=i]=\sum_{n=0}^{\infty}E[Y_n|X_0=i]=\sum_{n=0}^{\infty}P(X_n=i|X_0=i)=\sum_{n=0}^{\infty}p_{ii}^{(n)}
$$
这时再去理解上面的式子就很好理解了，$\sum_{n=0}^{\infty}p_{ii}^{(n)}$的含义其实是在$X_0=i$的条件下访问$i$的平均次数，状态$i$常返意味着平均访问次数是无穷的，状态$i$暂留意味着平均访问次数是有限的

并且我们可以得到：

(1) 若$i$常返，则$P(N_i=\infty|x_0=i)=1$，所以有$E(N_i|X_0=i)=\infty$

(2) 若$i$暂留，则有$1-f_{ii}>0$，在$X_0=i$的条件下，$N_i$服从参数为$1-f_{ii}$的几何分布，也即对$n=1,2,\cdots$，有
$$
P(N_i=n|X_0=i)=f_{ii}^{n-1}(1-f_{ii})
$$
所以有$E(N_i|X_0=i)=\frac{1}{1-f_{ii}}<\infty$

**定理2：** （定理1判断状态时常返还是暂留，定理2则判断是正常返还是零常返）

- 状态$i$正常返$\iff \lim_{n\to \infty}\frac{1}{n}\sum_{k=1}^{n}p_{ii}^{(k)}=\frac{1}{\mu_i}>0\iff \lim_{n\to \infty }\sup \ p_{ii}^{(n)}>0$

- 状态$i$零常返$\iff \sum_{n=0}^{\infty}p_{ii}^{(n)}=\infty$但$\lim_{n\to \infty}p_{ii}^{(n)}=0$（暂留其实也有右边这个极限性质，由级数收敛就可以知道）

  > 并且其实我们知道，由$\lim_{n\to \infty}p_{ii}^{(n)}=0$可以推出$\lim_{n\to \infty}\frac{1}{n}\sum_{k=1}^{n}p_{ii}^{(k)}=0$，所以其实$\lim_{n\to \infty}\frac{1}{n}\sum_{k=1}^{n}p_{ii}^{(k)}$也是区分正常返和零常返的一个标志，正常返结果是平均回转时的倒数，大于0；零常返的结果就是0

下面我们给出上面定理第1条的证明思路 ：

若$i$常返且$X_0=i$，则以概率1返回$i$无穷次，记这些返回$i$的时间间隔分别是$\sigma_1,\sigma_2,\sigma_3,\cdots$，则由Markov性可以知道，$\sigma_1,\sigma_2,\sigma_3,\cdots$独立同分布，且$E(\sigma_1)=\mu_1$，我们令$S_n=\tau_1+\tau_2+\cdots+\tau_n$，由大数定律可知，当$n\to \infty$时，有$\frac{S_n}{n}\to \mu_i$，令$N_i^{(n)}$表示$X_1,X_2,\cdots,X_n$访问$i$的次数，则有$S_{N_{i}^{(n)}}\leq n < S_{N_i^{(n)}+1}$，因此有
$$
\frac{S_{N_i^{(n)}}}{N_{i}^{(n)}}\leq \frac{n}{N_i^{(n)}}<\frac{S_{N_i^{(n)}+1}}{N_{i}^{(n)}+1}\frac{N_{i}^{(n)}+1}{N_i^{(n)}}
$$

注意到$\lim_{n\to \infty}N_i^{(n)}=\infty$，所以
$$
\lim_{n\to \infty}\frac{N_i^{(n)}}{n}=\frac{1}{\mu_i}\\
\lim_{n\to \infty}\frac{E(N_i^{(n)})}{n}=\lim_{n\to \infty}\frac{1}{n}\sum_{k=1}^{n}p_{ii}^{(k)}=\frac{1}{\mu_i}
$$

则当$n\to \infty$时，有
$$
\frac{1}{n}\sum_{k=1}^{n}p_{ii}^{(k)} \to \frac{1}{\mu_i}=\begin{cases}
>0 &正常返\\
=0 &零常返
\end{cases}
$$
也就是说，若$i$正常返，则从$i$出发长远来看，访问$i$的时间比例为$\frac{1}{\mu_i}>0$，$\mu_i$越小，访问越频繁；若$i$零常返，则从$i$的出发长远来看，访问$i$的时间比例为0

> 这个证明反正我有点看不明白

下面我们来看一个例子

**例**（对称随机游动）设$d$是正整数，$X=\left\{X_n;n\geq 0\right\}$是$Z^d$上的对称随机游动，讨论状态$0$的常返性，这里$0$表示原点 

**解** (1)当$d=1$时，对任意整数$i$有：
$$
p_{i,i-1}=p_{i,i+1}=\frac{1}{2}
$$
![image-20250411225242167](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250411225242167.png)

如上图所示，我们想去计算$f_{00}$肯定是不好计算的，但是我们可以考虑其等价刻画$p_{00}$，显然，奇数步是不可能从0回到0的，只有偶数步才可以，于是我们就得到
$$
p_{00}^{(2n-1)}=0,\ p_{00}^{(2n)}=C_{2n}^{n}(\frac{1}{2})^{2n}=\frac{(2n)!}{n!n!}(\frac{1}{2})^{2n},\qquad n=1,2,\cdots
$$
则由$Strling$公式可以得到$n! \sim \sqrt{2\pi n}e^{-n}n^n$得$p_{00}^{2n}\sim \frac{1}{\sqrt{\pi n }}$，所以可以得到
$$
\sum_{n}p_{00}^{(n)}=\infty但\lim_{n\to\infty}p_{00}^{(n)}=0
$$
于是可以得到状态$0$是零常返的

(2) 若$d=2$ ，则对每一对整数$(i,j)$有
$$
p_{(i,j),(i,j+1)}=p_{(i,j),(i,j-1)}=p_{(i,j),(i-1,j)}=p_{(i,j),(i+1,j)}=\frac{1}{4}
$$
并且同样地有$p_{00}^{(2n-1)}=0$，
$$
p_{00}^{(2n-1)}=\sum_{k=0}^{n}P(前2n步中往上走k步，往下走k步，往左走n-k步，往右走n-k步)\\=\sum_{k=0}^nC_{2n}^nC_n^kC_n^k\frac{1}{4^{2n}}=\frac{1}{4^{2n}}(C_{2n}^{n})^2\sim \frac{1}{\pi n}
$$
（左上占n步，从2n中选n；左上对应的n中有k步向上，右下对应的n中有k步向下）

这说明$\sum_{n}p_{00}^{(n)}=\infty$但$\lim_{n\to \infty}p_{00}^{(n)}=0$，因此状态$0$零常返

(3) 已有：

$$ d = 1 \text{ 时, } p_{00}^{(2n-1)} = 0, \quad p_{00}^{(2n)} \sim \frac{1}{\sqrt{\pi n}} $$ 

$d = 2 \text{ 时, } p_{00}^{(2n-1)} = 0, \quad p_{00}^{(2n)} \sim \frac{1}{\pi n}$

事实上$d \geq 3$，则$p_{00}^{(2n-1)} = 0, \quad p_{00}^{(2n)} = O(n^{-d/2}) $

>这个收敛半径有更直观的理解 

 $$ \therefore \sum_{n} p_{00}^{(n)} < \infty$$，因此状态 0 **暂留**

比如在3维对称随机游动中：必然有往上的步数等于往下的步数，往左的步数等于往右的步数，往前的步数等于往后的步数，那么对于$p_{00}^{2n}$来说，2n中有n步是往上往左往前的和，有n步是往下往右往后的和，不妨记往上$k_1$步，往左$k_2$步，往前$k_3$步，则$k_1+k_2+k_3=n$
$$
p_{00}^{(2n)}=\frac{1}{6^{2n}}C_{2n}^{2n}\sum_{k_1+k_2+k_3=n}(\frac{n!}{k_1!k_2!k_3!})^2\leq \frac{1}{6^{2n}}C_{2n}^{n}3^n\max_{k_1\leq k_2 \leq k_3,k_1+k_2+k_3=n}(\frac{n!}{k_1!k_2!k_3!})
$$
上面这一步是用到了放缩$\sum a_n^2 \leq (\sum a_n) \times \max\left\{a_n\right\}$，以及$\sum_{k_1+k_2+k_3=n}\frac{n!}{k_1!k_2!k_3!}=3^n$，接下来我们就需要估计上面的最大值在何处取得，和二维情形类似，当$k_1,k_2,k_3$最接近时取得最大值，也即
$$
\max_{k_1\leq k_2 \leq k_3,k_1+k_2+k_3=n}(\frac{n!}{k_1!k_2!k_3!})在k_3=k_1或k_3=k_1+1时达到
$$
则由$Stirling$公式有
$$
\max_{k_1\leq k_2 \leq k_3,k_1+k_2+k_3=n}\frac{n!}{k_1!k_2!k_3!}\sim \frac{3^n}{n!}
$$
所以有$p_{00}^{(2n)}=O(n^{-\frac{3}{2}})$，因为$\sum_{n}p_{00}^{(2n)}<\infty$，因此暂留

> 一维和二维对称随机游动都是零常返的
>
> 三维和三维以上的对称随机游动都是暂留的

**例**（$Z$上的随机游动）设$X=\left\{X_n;n\geq 0\right\}$是$Z$上的随机游动，且有$p_{i,i+1}=p=1-p_{i,i-1},i=0,\pm 1.\pm 2,\cdots, 0<p<1$，讨论状态0的常返性，这里0表示原点

**解** 显然我们知道$p_{00}^{(2n-1)}=0$，下面我们考虑$p_{00}^{(2n)}$，有
$$
p_{00}^{(2n)}=C_{2n}^{n}p^n(1-p)^n=\frac{(2n)!}{n!n!}[p(1-p)]^n,n=1,2,\cdots
$$
那么由$Stirling$公式可以得到
$$
p_{00}^{(2n)} \sim \frac{[4p(1-p)]^n}{\sqrt{\pi n}}\to 0
$$
> 这里还要再回顾一下数学分析的内容斟酌一下

由均值不等式知$p\neq\frac{1}{2}$时$p_{00}^{(2n)}< \frac{1}{\sqrt{\pi n}}$那么$\sum_{n}p_{00}^{(2n)}$（等比数列求和）有限，$\sum_{n} p_{00}^{(n)}=\infty$当且仅当$p=\frac{1}{2}$

所以我们得到一个结论，当$p=\frac{1}{2}$是，状态$0$是零常返的；否则状态$0$是暂留的

#### 互达性和周期性

##### 周期性

设$i$为Markov的一个状态，使$P_{ii}^{(n)}>0$的所有正整数$n(n\geq1)$的最大公约数称作是状态$i$的**周期**（也即可以返回$i$的步数的最大公约数），记作$d(i)$，如果对所有$n\geq 1$，都有$P_{ii}^{(n)}=0$则约定周期为$\infty$（浙大版规定周期为0）；$d(i)=1$的状态$i$则称为是**非周期的**。若$i$是非周期且正常返的，我们则称$i$是**遍历的**

> 由定义我们很容易知道，如果$n$不能被周期$d(i)$整除，则必有$P_{ii}^{(n)}=0$

##### 互达性

如果对某一$n\geq 0$，有$P_{ij}^{(n)}>0$，则称状态$j$是从状态$i$可达的（$i$可达$j$），记作$i\to j$，它表示从状态$i$经过有限步的转移可以达到状态$j$。两个互相可达的状态$i,j$则称为是互达的，记作$i\leftrightarrow j$。

如果两个状态$i,j$不是互达的，那么对所有的$n\geq0,P_{ij}^{(n)}=0$或者对所有$n\geq 0,P_{ji}^{(n)}=0$或两者都成立，三种情况必居其一。

互达性是一种等价关系，满足自反性、对称性和传递性，由所有与$i$互达的状态组成的集合成为状态$i$的**互达等价类**，而我们知道，互达等价类有以下性质：

- 对任何状态$i$和$j$，$i$的互达等价类和$j$的互达等价类相等或者互斥
- 状态空间可以表示成互不相交的互达等价类的并

下面我们给出**随机过程**与其状态空间的一些联系：

> 下文的$X_n$代表一个马尔科夫链，它有一个状态空间$I$，表示所有可能状态的集合

- 如果任意两个状态互达我们就称$\left\{X_n\right\}$不可约，也即其状态空间$I$是一个互达等价类
- 若所有状态常返（暂留、正常返、零常返、非周期），我们就称$\left\{X_n\right\}$常返（暂留、正常返、零常返、非周期）

- 若$\left\{X_n\right\}$不可约、非周期、正常返，我们就称$\left\{X_n\right\}$遍历

##### 互达等价类的同一性质

如果$i \leftrightarrow j$，则有：

- $d(i)=d(j)$
- $i$常返$\iff j$常返
- $i$正常返$\iff j$正常返 

下面我们给出**定理的证明**：

设$i\iff j, j\neq i$，则存在正整数$m,n$使得$p_{ij}^{(m)}>0,p_{ji}^{(n)}>0$

(1) 如果$p_{ii}^{(k)}>0$，则有$p_{jj}^{(k+m+n)}\geq p_{ji}^{(n)}p_{ii}^{(k)}p_{ij}^{(m)}>0$，所以$d(j)|k+m+n$，特别地有$d(j)|m+n$，这是考虑$p_{ii}^{(0)}>0$的情况，所以有$d(j)|k$，这里可以得到$d(j)|d(i)$，同理也有$d(i)|d(j)$，最终我们可以得到$d(i)=d(j)$

(2) 我们已经得到$p_{jj}^{(k+m+n)}\geq p_{ji}^{(n)}p_{ii}^{(k)}p_{ij}^{(m)}$，如果$i$常返，则有$\sum_{k}p_{ii}^{(k)}=\infty$，所以有
$$
\sum_{k}p_{jj}^{(k+m+n)}\geq (p_{ji}^{n}p_{ij}^{(m)})\sum_{k}p_{ii}^{(k)}=\infty
$$
所以即有$j$也是常返的

(3) 如果$i$正常返，则有$\lim_{k\to \infty} \sup p_{ii}^{(k)}>\infty$，所以有
$$
\lim_{k\to \infty} \sup p_{jj}^{(k+m+n) }\geq (p_{ji}^{(n)}p_{ij}^{(m)})\lim_{k\to \infty}\sup p_{ii}^{(k)}>0
$$
即$j$也是正常返的

> 同一个互达等价类具有相同的周期和常返性（平均回转时不一定相同）
>
> 互达等价类给我们的启示是，当我们判断一个状态的性质时，我们可以从它的互达等价类中找出一个容易判断的状态来判断

下面我们来看一道例题，比如我们曾经在上面的[例子](#section-1)（按住ctrl点击即可跳转）

![image-20250412102138330](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250412102138330.png)

我们已经计算得到状态$0$是正常返的，且我们容易看出各状态互达的，而$d(3)=1$，那么由互达等价类的性质就可以得到，各状态是非周期正常返的，则这是一个遍历的Markov链



再比如之前的[例题](#section-2)

![image-20250412102327927](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250412102327927.png)

由于$p_{00}>0,d(0)=1$，且各状态是互达的，那么所有状态都是非周期的，且与0具有相同的常返性：

- 当$\lim_{n\to \infty}u_n >0$时，各状态是暂留的
- 当$\lim_{n \to \infty} u_n =0$但$\sum_{n=0}^{\infty} u_n =\infty$时，各状态是零常返的
- 当$\sum_{n=0}^{\infty}u_n<\infty$时，各状态是正常返的



再比如之前提到的对称随机游动，由于各状态是互达的，随机过程$X_n$不可约，且$p_{00}^{(n)}>0$当且仅当$n$是偶数，所以$d(0)=2$，所以所有状态周期为2，且与状态0具有相同的常返性



> 在引入互达性、周期性之后，正常返和零常返就有了一些新的等价描述：
>
> - $i$正常返$\iff \lim_{n\to \infty} \frac{1}{n} \sum_{k=1}^{n}p_{ii}^{(k)}=\frac{1}{\mu_i}>0 \iff \lim_{n\to \infty} \sup p_{ii}^{(n)}>0 \iff \lim_{n\to \infty} p_{ii}^{(nd)}=\frac{d}{\mu_i}>0$，这里$d=d(i)$
> - $i$零常返$\iff \sum_{n=0}^{\infty} p_{ii}^{(n)}=\infty$但$\lim_{n\to \infty}p_{ii}^{(n)}=0$

下面我们考虑一下$p_{ij}$与$f_{ij}$的关系，设$i\neq j$

1. 如果$j$常返且$f_{ij}>0$，则有
   $$
   \sum_{n}p_{ij}^{(n)}=E(N_j|X_0=i)=\infty
   $$
   且
   $$
   P(N_j=\infty | X_0=i)=f_{ij}
   $$

   > 其实上式是比较好理解的，从$i$出发以$f_{ij}$概率访问$j$，以$1-f_{ij}$概率不访问$j$，而一旦访问了$j$之后，概率$P(N_j=\infty | X_0=j)=1$，所以其实这个概率就等于前置的从$i$出发访问$j$的概率$f_{ij}$

2. 如果$j$暂留，则有
   $$
   \sum_{n}p_{ij}^{(n)}=E[N_j|X_0=i]=f_{ij}E[N_j|X_0=j]<\infty
   $$
   且
   $$
   P(N_j=\infty|X_0=i)=0
   $$

3. $p_{ij}^{(n)}$与$f_{ij}^{(n)}$的关系：

   $n=1$时
   $$
   p_{ij}^{(0)}=\begin{cases}
   1 &若i=j\\
   0,&若i\neq j
   \end{cases}
   \qquad
   f_{ij}^{(0)}=0
   $$
   当$n\geq 1$时，
   $$
   p_{ij}^{(n)}=\sum_{k=1}^{n}f_{ij}^{(k)}p_{jj}^{(n-k)}
   $$

   > 上式很好理解，$f_{ij}^{(k)}$表示第一次击中$i$用了$k$步的概率，则剩下$n-k$步只需要返回就行，其严格证明如下：
   > $$
   > p_{ij}^{(n)} = P(X_n = j \mid X_0 = i)   = \sum_{k=1}^n P(\tau_j = k \mid X_0 = i) P(X_n = j \mid \tau_j = k, X_0 = i) \\ = \sum_{k=1}^n f_{ij}^{(k)} P(X_n = j \mid X_k = j, X_{k-1} \neq j, \ldots, X_1 \neq j, X_0 = i) \\ = \sum_{k=1}^n f_{ij}^{(k)} P(X_n = j \mid X_k = j) = \sum_{k=1}^n f_{ij}^{(k)} p_{jj}^{(n-k)}
   > $$

### 平稳分布

>平稳分布最开始可能不太好理解它的意思，它指的是一个随机过程的概率分布在时间推移中保持不变的特性，意味着如果系统在某一时刻处于平稳分布，那么在下一时刻仍然将保持这个分布

#### 平稳分布的定义

设$\pi = (\pi_j;j \in I)$，$P(x_0=i)=\pi_i$满足：

- **分布律：**$\pi_j \geq 0,\sum_{j} \pi_j=1$

- **平稳性：**$\pi =\pi P$（矩阵形式），也即$\pi_k= \sum_{i}\pi_i p_{ik},\ \forall k$ 
  $$
  (\pi_1,\pi_2,\cdots,\pi_n)=(\pi_1,\pi_2,\cdots,\pi_n)\begin{pmatrix}
  p_{11}&p_{12}&\cdots&p_{1n}\\
  p_{21}&p_{22}&\cdots&p_{2n}\\
  \vdots & \vdots & \ddots & \vdots \\
  p_{n1}&p_{n2}&\cdots&p_{nn}
  \end{pmatrix}
  $$
  

则称$\pi$是$\left\{X_n\right\}$的平稳分布

**平稳分布的性质：**

设初始分布为平稳分布$\pi$，则对任意$k\geq 1$，有：

- $X_k$的分布为$\pi$
- $\left\{X_k,X_{k+1},\cdots\right\}$与$\left\{X_0,X_1,\cdots\right\}$具有相同的有限维分布
- 当初始分布为平稳分布时，Markov链为**严平稳过程**

证明如下：

(1) $X_n$的分布为$\pi P^n=(\pi P)P^{n-1}=\pi P^{n-1}$与$X_n$的分布相同，所以所有的$X_n$的分布均为$\pi$

(2) 对$0\leq n_1 < n_2 <\cdots < n_k$和状态$i_1,i_2,\cdots,i_k$有
$$
P(X_{n_1} = i_1,X_{n_2}=i_2,\cdots,X_{n_k}=i_k)=P(X_{n_1}=i_1)p_{i_1,i_2}^{(n_2-n_1)}p_{i_2,i_3}^{(n_3-n_2)}\cdots p_{i_{k-1},i_k}^{(n_k-n_{k-1})}\\=\pi_{i_1}p_{i_1,i_2}^{(n_2-n_1)}p_{i_2,i_3}^{(n_3-n_2)}\cdots p_{i_{k-1},i_k}^{(n_k-n_{k-1})}
$$

> 1. 我们发现，对于平稳分布，它的定义里由分布律和平稳性两条性质似乎可以得到$k+1$个方程，但却只有$k$个未知数，我们可能会担心这样的方程组没有解，但事实上，这$k+1$个方程其实是线性相关的，因此方程可以少一个（在实际计算中我们可以把难算的那个方程去掉）
>
>    我们对方程组$\pi_k=\sum_i \pi_i p_{ik} ,\forall k\in I$两边进行求和可以得到，$LHS=\sum_k \pi_k$，
>
>    $RHS=\sum_k\sum_i \pi_i p_{ik}=\sum_{i}\sum_{k}\pi_ip_{ik}=\sum_i \pi_i \sum_{k}p_{ik}=\sum_i \pi_i$
>
> 2. 假设初始分布是平稳分布$\pi$，则有$\pi_k=\sum_i \pi_i p_{ik}=\pi_k p_{kk}+\sum_{i\neq j}\pi_i p_{ik}$，又可以写成
>    $$
>    \pi_k(1-p_{kk})=\sum_{i\neq k}\pi_i p_{ik}
>    $$
>    这也就是说，**离开k的概率与进入k的概率相等**，从而保证了平稳性

下面我们来做一些平稳分布的计算，

![image-20250417184734956](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250417184734956.png)

试求上图中的平稳分布

**解** 显然，状态空间$I=\left\{0,1,2,3\right\}$，我们设平稳分布$\pi=(\pi_0,\pi_1,\pi_2,\pi_3)$

那么由平稳分布的定义则有
$$
(\pi_1,\pi_2,\pi_3,\pi_4)=(\pi_1,\pi_2,\pi_3,\pi_4)\begin{pmatrix}

0&0.5&0&0.5\\0&0&1&0\\0 & 0& 0 & 1 \\0.5&0&0&0.5
\end{pmatrix}
$$
则可以得到
$$
\begin{cases}
\pi_0+\pi_1+\pi_2+\pi-3=1\\
\pi_0=\frac{1}{2}\pi_3\\
\pi_1=\frac{1}{2}\pi_0\\
\pi_2=\pi_1
\end{cases}
$$
解得$\pi=(\frac{1}{4},\frac{1}{8},\frac{1}{8},\frac{1}{2})$，而我们之前已经算得$\mu_0=4,\mu_3=2$，我们发现其恰好就是$\frac{1}{\pi_0},\frac{1}{\pi_3}$，这时我们不禁要问，是否也有$\pi_1=\frac{1}{\mu_1},\pi_2=\frac{1}{\mu_2}$甚至$\forall i,\pi_i=\frac{1}{\mu_i}$呢？答案是肯定的。



再来看一道题

![image-20250417185516023](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250417185516023.png)

求这个例子中的平稳分布

**解** 我们设平稳分布为$\pi$，则有$\pi_1=p_0\pi_0,\pi_2=\pi_1 p_1=\pi_0p_0p_1,\cdots,\pi_n=p_0p_1\cdots p_{n-1}\pi_0=u_n\pi_0$

而我们知道，$\sum_{n=0}^{\infty}\pi_n=(\sum_{n=0}^{\infty}u_n)\pi_0=1$，则有$\pi_0=\frac{1}{\sum_{n=0}^{\infty}u_n}$，但是需要注意的是，我们还需要保证$\sum_{n=0}^{\infty}u_n$是收敛的，否则就会有$\pi_0=0,\pi_1=0,\cdots,\pi_n=0$，这就不符合分布律的条件了，所以我们可以得到：

平稳分布存在$\iff\sum_{n=0}^{\infty}u_n <\infty \iff \left\{X_n\right\}$正常返

最终我们可以得到，当$\left\{X_n\right\}$正常返时，有唯一的平稳分布
$$
\pi_i = \frac{u_i}{\sum_{n=0}^{\infty}u_n},\ i=0,1,\cdots
$$
且我们之前已经算得$\mu_0=\sum_{n=0}^{\infty}u_n$，也就是说$\pi_0=\frac{1}{\mu_0}$，事实上是有$\pi_i=\frac{1}{\mu_i},\forall i$的，这与我们在上一题中得到的结果一致，我们在后面给出证明





下面我们再来看**几个定理：**

1. 设状态$j$是暂留或者零常返的，则有
   - 对所有状态$i$，有$\lim_{n \to \infty} p_{ij}^{(n)}=0$
   - 不管初始分布如何，恒有$\lim_{n\to \infty} P(X_n=j)=0$
   - 设$\pi$是$\left\{X_n\right\}$的平稳分布，则有$\pi_j=0$
2. 若$\left\{X_n\right\}$是有限Markov链，则至少存在一个正常返态
3. 若$\left\{X_n\right\}$是不可约的有限Markov链，则$\left\{X_n\right\}$正常返

> 形象的来说，这个定理的意义是其保证了有限马尔科夫链存在平稳分布，正常返状态是构成平稳分布的“支柱”，平稳分布会在这些状态上赋予正的概率
>
> 这几个定理也共同描述了Markov链长期行为的本质特征，也即系统会逐渐“忘记”初始状态，最终概率质量会集中在正常返状态上，形成稳定的平稳分布

证明如下：

对于定理第一条

(1) 因为状态$j$是暂留的或者零常返的，所以我们知道有$\lim_{n\to \infty }p_{jj}^{(n)}=0$，我们知道了$p_{jj}$的性质，现在要考虑$p_{ij}$的性质，我们不妨将其进行转化，对于$n\geq 1$，有
$$
p_{ij}^{(n)}=\sum_{k=1}^{n}f_{ij}^{(k)}p_{jj}^{(n-k)}=\sum_{k=1}^{\infty}f_{ij}(k)p_{jj}^{(n-k)}\qquad(这里我们令p_{jj}^{(n-k)}在k>n时值为0)
$$
上面这一步的转化相当于引入了示性随机变量，将求和上限从变量$n$转化成了$\infty$，由控制收敛定理，知
$$
\lim_{n \to \infty}p_{ij}^{(n)}=\sum_{k=1}^{\infty}f_{ij}^{(k)}\lim_{n\to \infty}p_{jj}^{(n-k)}=0
$$
(2) 由控制收敛定理和(1)知，
$$
\lim_{n \to \infty }P(X_n = j) = \lim_{n\to \infty}\sum_{i \in I}P(X_0=i)p_{ij}^{(n)}=\sum_{i \in I}P(X_0=i)\lim_{n\to \infty}p_{ij}^{(n)}=0
$$
(3) 设$\pi$是$\left\{X_n\right\}$的平稳分布，$X_0 \sim \pi$，则对所有$n$，$X_n\sim \pi,P(X_n=j)=\pi_j$，由(2)知$\pi_j=0$



对于定理第二条 ，我们可以使用反证法，假设$\left\{X_n\right\}$没有正常返态，则对所有的状态暂留或零常返，则由定理第一条的(1)，可以得到$\lim_{n\to \infty}p_{ij}^{(n)}=0$对所有的$i,j$成立，而对任何$n$，显然有$\sum_{j\in I}p_{ij}^{(n)}=1$，两边取极限可以得到
$$
1=\lim_{n\to\infty}\sum_{j \in I}p_{ij}^{(n)}=\sum_{j\in I}\lim_{n\to \infty}p_{ij}^{(n)}=0
$$
矛盾了，所以$\left\{X_n\right\}$至少存在一个正常返态

上述极限和求和可以交换次序是因为这是**有限项求和（状态空间是有限的）**



对于定理第三条，因为$\left\{X_n\right\}$不可约，所以所有状态的常返性相同，由定理第二条我们又知道，有限Markov链至少存在一个正常返态，所以对不可约的有限的Markov链来说，其所有状态都是正常返的，也即$\left\{X_n\right\}$正常返

#### 平稳分布的存在性

定理1：设$\left\{X_n\right\}$不可约，则有

(1) 存在平稳分布当且仅当$\left\{X_n\right\}$正常返

(2)当$\left\{X_n\right\}$正常返时：平稳分布$\pi$唯一且对任何状态$i$有$\pi_i=\frac{1}{\mu_i}$；对任何状态$i,j$有$\lim_{n\to \infty}\frac{1}{n}\sum_{k=1}^{n}p_{ij}^{(k)}=\pi_j$

(3) 若$\left\{X_n\right\}$遍历（不可约、非周期、正常返），则对任何状态$i,j$有$\lim_{n\to \infty}p_{ij}^{(n)}=\pi_j$



证明如下：

(1) 因为$\left\{X_n\right\}$是不可约的，所以$\left\{X_n\right\}$正常返，零常返或暂留，设$\left\{X_n\right\}$有平稳分布$\pi$，则若$\left\{X_n\right\}$零常返或暂留，将有$\pi_j=0$，这与$\sum_{j\in I}\pi_j=1$矛盾，所以$\left\{X_n\right\}$是正常返的。

反之，若有$\left\{X_n\right\}$是正常返的，我们需要找到一个平稳分布 

> 只需要会用就行，懒得写了（）

当$\left\{X_n\right\}$不可约正常返我们就可以先计算平稳分布$\pi$，再利用$\mu_i=\frac{1}{\pi_i}$来计算平均回转时。从长远来看，访问$j$的时间比例为$\pi_j$，与出发点无关，$\pi_j$越大访问$j$越频繁。进一步地，若$\left\{X_n\right\}$还是非周期的（**此时这个随机过程是遍历的**），则**极限分布存在，极限分布就是平稳分布，与出发点无关**（与初始分布无关）。下面我们介绍Markov链的极限分布

#### Markov链的极限分布

对于时间齐次的Markov链$\left\{X_n\right\}$，如果存在状态空间$I$上的概率分布$\mu=(\mu_i;i \in I)$使得对所有状态$i$，有$\lim_{n \to \infty}(X_n=i)=\mu_i$，则称$\mu$是$\left\{X_n\right\}$的极限分布

> - 极限分布可以不存在，比如
>
>   ![image-20250417205010937](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250417205010937.png)
>
>   有$P(X_n=0)=\begin{cases}0&n为奇数\\1,&n为偶数  \end{cases}$，所以$\lim_{n\to \infty}P(X_n=0)$不存在，极限分布也就不存在
>
> - 极限分布可以依赖于初始分布，如下图，$P(X_0=0)=\alpha=1-P(X_0=1,0\leq \alpha \leq1)$
>
>   ![image-20250417205158852](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250417205158852.png)
>
>   则有$P(X_n=0)=\alpha \to \alpha,\ P(X_n=1)=1-\alpha \to 1-\alpha$

下面我们再看一道例题：

**例1** 对于如图所示的0-1传输系统，计算它的平稳分布，对$i,j \in I,\lim_{n\to \infty}p_{ij}^{(n)}$存在吗，如存在，计算之

![image-20250417205635741](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250417205635741.png)

我们对$p$的情形分三种情况考虑，因为$p$的情况会影响互达等价类。

(1)若有$0<p<1$，则$I=\left\{0,1\right\}$是一个互达等价类，所以$\left\{X_n\right\}$是不可约的有限的Markov链，则$\left\{X_n\right\}$是正常返的，又由$d(X_0)=1$知其是非周期的，则平稳分布存在，且Markov极限分布就是平稳分布。因此我们设平稳分布为$\pi=(\pi_0,\pi_1)$，则可以得到
$$
\pi_0+\pi_1=1\\\pi_0=p\pi_0+(1-p)\pi_1
$$
解得$(\pi_0,\pi_1)=(\frac{1}{2},\frac{1}{2})$，且$\lim_{n\to \infty}P_{ij}^{(n)}=\pi_j,\forall i,j$

(2) 若$p=1$，则$\left\{X_n\right\}$非周期正常返，但是可约，可以得到
$$
\lim_{n \to \infty}p_{00}^{(n)}=\lim_{n\to \infty}p_{11}^{(n)}=1,\qquad \lim_{p\to \infty}p_{10}^{(n)}=\lim_{n\to \infty}p_{01}^{(n)}=0
$$
这说明$\lim_{n\to \infty}p_{ij}^{(n)}$存在但是依赖于出发点，我们设平稳分布为$(\pi_0,\pi_1)$，则可以得到
$$
\pi_0+\pi_1=1,\qquad \pi_0=\pi_0
$$
解得$(\pi_0,\pi_1)=(\pi_0,1-\pi_0)$，这里$0\leq \pi_0\leq 1$，所以有无穷个平稳分布

(3) 若$p=0$，在$\left\{X_n\right\}$不可约正常返，但是周期为2（不是非周期），对$i \in I$，有
$$
p_{ii}^{(n)}=\begin{cases}
0&n是奇数\\
1&n是偶数
\end{cases} \qquad p_{i,1-i}^{(n)}=\begin{cases}
0&n是偶数\\
1&n是奇数
\end{cases}
$$
所以$\forall i,j \in I,\lim_{n\to \infty}p_{ij}^{(n)}$不存在，设平稳分布为$(\pi_0,\pi_1)$，则有
$$
\pi_0+\pi_1=1,\pi_0=\pi_1
$$
解得$(\pi_0,\pi_1)=(\frac{1}{2},\frac{1}{2})$，也即从长远来看访问状态$i$的时间比例是$\pi_i=\frac{1}{2}$

> 如果Markov链不可约、正常返，但不是非周期的，那么Markov链就不存在极限分布，因为周期性会导致状态分布无法收敛到单一的固定分布，其状态的访问具有周期性规律

**例2**（图上的简单随机游动）设V是一个无向图的顶点集，并且每个定点至少有一个邻居，按下面方式访问V的顶点：对任意$n\geq 0$，若第$n$步在顶点$i$，则独立于过去下一步等概率地访问$i$的邻居，若以$X_n$表示第$n$步访问的顶点，则$\left\{X_n\right\}$是时间齐次的Markov链，状态空间为V，一步转移概率为
$$
 p_{ij}=\begin{cases}
 \frac{1}{d_i} &j是i的邻居\\
 0 &其他
 \end{cases}
$$
这里$d_i$为$i$的邻居数

![image-20250418001654743](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250418001654743.png)

上图简单随机游动对应的状态空间为$I=\left\{0,1,2,3\right\}$，一步转移矩阵
$$
P=\begin{pmatrix}
0&\frac{1}{3}&\frac{1}{3}&\frac{1}{3}\\
\frac{1}{2}&0&\frac{1}{2}&0\\
\frac{1}{2}&\frac{1}{2}&0&0\\
1&0&0&0
\end{pmatrix}
$$
可以证明这是一个遍历的Markov链，求得平稳分布为$\pi=(0.375,0.25,0.25,0.125)$

而因为这个Markov链是遍历的，则极限分布就是平稳分布，也即有$\lim_{n\to \infty}p_{ij}^{(n)}=\pi_j$

**例3**

![image-20250418002344831](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250418002344831.png)

如果$\lambda=0.5$，问长远来看此参保人平均所付的保险年金是多少？

**解** 当$\lambda = 0.5$时，可以证明，$\left\{X_n\right\}$是遍历的，设它的平稳分布为$\pi=(\pi_1,\pi_2,\pi_3)$则可以求得平稳分布为$\pi=(0.8541,0.1270,0.0189)$，这里$\pi_i$代表的是长远来看此人位于级别$i$的时间比例，所以长远来看此参保人平均所付的保险年金为
$$
3000\pi_1+4000\pi_2+6000\pi_3=3000*0.8541+4000*0.1270+6000*0.0189=3183.7
$$

### 闭集

#### 闭集的定义

对于状态空间$I$的子集$C$，如果对任意的状态$i \in C$和任意状态$j \notin C$，都有$p_{ij}=0$，就称$C$为闭集。

闭集具有以下性质：若$C$是闭集，$P(X_0\in C)=1$，则有$P(X_n \in C,\forall n)=1$（即C是封闭的，从C出发将永远留在C中），此时我们可以将$\left\{X_n\right\}$看作是状态空间$C$上的Markov链



定理1：

1. 如果$i$常返且$i \to j$，则有$i \leftrightarrow j$且$f_{ij}=f_{ji}=1$
2. 如果$i$常返，则$i$的互达等价类是闭的（如果$i$的互达等价类不闭，则$i$暂留）
3. 如果$i$的互达等价类是有限闭集，则$i$正常返

证明如下：

(1) 因为$i\to j$，所以存在$n$使得$p_{ij}^{(n)}>0$，又因为$i$常返，所以有
$$
0=P(N_i<\infty|X_0=i)=p_{ij}^{(n)}P(N_i <\infty|X_n=j,X_0=i)+(1-p_{ij}^{(n)})P(N_i<\infty|X_n\neq j,X_0=i)
$$
又因为$p_{ij}^{(n)}>0$，所以有$P(N_i<\infty|X_n=j,X_0=i)=0$，也即$P(N_i=\infty|X_n=j,X_0=i)=1$，则由Markov性，$P(N_i=\infty|X_0=j)=1$，所以有$f_{ij}=1$，因此$i\leftrightarrow j$，$j$也常返，从而$f_{ij}=1$

> 上面根据第$n$步是否在$j$应用了全概率公式

(2) 用反证法，假设$i$的互达等价类不闭，则存在$j\in C,K\notin C$使得$p_{jk}>0$于是又$i \to k$，由于$i$常返，则$k \to i$否则与$i$常返矛盾，所以有$i \leftrightarrow k$，即$k \in C$这与$k \notin C$矛盾

(3) 如果$i$的互达等价类$C$是有限闭集，则把$\left\{X_n\right\}$限制在C上得到一个不可约的有限Markov链，那么它是正常返的

> 总结一下，有如下结论：
>
> 假设$I$有限，则有
>
> - $i$正常返$\iff i$的互达等价类是闭集
> - $i$暂留$\iff i$的互达等价类不是闭集
> - $\left\{X_n\right\}$没有零常返态（有限Markov链是没有零常返态的）
>
> 假设$I$可数，则
>
> - $i$的互达等价类不是闭集$\Rightarrow$状态$i$暂留
> - $i$的互达等价类是闭集，则状态$i$都有可能（例如爬梯子模型是不可约的，$I$可数，但它可能正常返，也可能零常返，也可能）

下面我们来看一些例题：
![image-20250418092433995](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250418092433995.png)

**解** 

(1) 互达等价类有$\left\{0,1,2\right\},\left\{3\right\}$，而$\left\{0,1,2\right\}$是闭的，正常返，$\left\{3\right\}$是不闭的，因此为暂留态。

且容易知道，$d(0)=1,d(3)=\infty$，所以0,1,2是非周期的

(2) 只考虑状态0,1,2，把$\left\{X_n\right\}$限制在$\left\{0,1,2\right\}$上得到一个遍历的Markov链$\left\{Y_n\right\}$，其一步转移矩阵为P的前三列前三行，设$\left\{Y_n\right\}$的平稳分布为$(\pi_0,\pi_1,\pi_2)$，则可以得到
$$
\pi_0+\pi_1+\pi_2=1\\
\pi_1=0.7\pi_2\\
\pi_2=\pi_0
$$
于是可以得到$(\pi_0,\pi_1,\pi_2)=(\frac{10}{27},\frac{7}{27},\frac{10}{27})$，所以最终可以得到$(\mu_0,\mu_1,\mu_2)=(\frac{1}{\pi_0},\frac{1}{\pi_1},\frac{1}{\pi_2})=(\frac{27}{10},\frac{27}{7},\frac{27}{10})$

(3) 相邻两次变空的平均时间间隔为$\mu_0=2.7$

### 吸收概率与平均吸收时间

有限Markov链的状态可以分解为
$$
I=T\cup C_1\cup C_2\cup \cdots\cup C_k
$$
这里$C_1,C_2,\cdots,C_k$是所有闭的互达等价类（所有状态都是正常返态），$T$是所有暂留态的集合（互达等价类不是闭集的全体），则有以下结论：

- 如果$X_0\in C_i$，则将永远待在$C_i$，那么我们可以把$\left\{X_n\right\}$限制在$C_i$上得到不可约正常返的Markov链
- 如果$X_0 \in T$，则最终会进入某个$C_i$并将不再离开（被某个互达等价类所吸收）

那么我们就会提出这样的问题：进入$C_1,\cdots,C_k$的概率分别是多少？进入$C=C_1\cup C_2\cup\cdots\cup C_k$的平均时间是多少？

我们首先先引入一些定义：

对状态$i$，我们记$T_i=\min\left\{n \geq 0:X_n=i\right\}$为首次访问状态$i$的时刻；对状态空间$I$的子集$A$，令$T_A=\min\left\{n\geq 0:X_n \in A\right\}$为首次访问子集$A$的时刻。并且我们约定$\min \emptyset = \infty$ 

下面来看一个经典的例题

**例1** （赌徒输光问题）甲乙两人独立重复玩游戏，每一局甲赢1元和输1元的概率都是$\frac{1}{2}$，游戏一直到某人输光结束，一开始甲带有$i$元钱，乙带有$m-i$元钱，这里$i$与$m-i$都是非负整数，计算：

(1) 游戏在有限时间内结束的概率

(2) 甲输光的概率

(3) 游戏平均持续时间

**解**  (1) 我们以$S_n$表示$n$局游戏后甲所拥有的钱数，则$\left\{S_n;n\geq 0\right\}$是时间齐次的Markov链，状态空间为$I=\left\{0,1,\cdots,m\right\}$，一步转移概率为$p_{00}=p_{mm}=1,p_{i,i+1}=p_{i,i-1}=\frac{1}{2}$，共有三个互达等价类$\left\{0\right\},\left\{1,2,\cdots,m-1\right\},\left\{m\right\}$，其中只有$\left\{0\right\},\left\{m\right\}$是闭集，令$C_1=\left\{0\right\},C_2=\left\{m\right\},T=\left\{1,2,\cdots,m-1\right\}$，则有$I=T\cup C_1\cup C_2$，则有$T$中状态暂留，所以最终会进入$C_1\cup C_2 $此时游戏结束，因此游戏在有限时间内结束的概率为1

(2)![image-20250418102036561](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250418102036561.png)  

显然输光概率与最开始带的钱数是有关系的，我们不妨令$h_i=P(输光|S_0=i)=P(T_0<\infty|S_0=i)$，则$h_0=1,h_m=0$，则对$0<i<m$，由全概率公式和Markov性可以得到：
$$
h_i=h_{i+1}\times \frac{1}{2}+h_{i-1}\times \frac{1}{2}
$$
也即$h_i$是等差数列，则容易得到
$$
h_i=\frac{m-i}{m},\qquad \forall 0\leq i\leq m
$$

> 通用公式为
> $$
> h_i=\sum_{j}P(S_1=j|S_0=i)P(T_0<\infty|S_1=j,S_0=i)=\sum_{j}p_{ij}P(T_0<\infty|S_0=j)\\=\sum_{j}p_{ij}h_j
> $$
> 其中$P(S_1=j|S_0=i)$表示从$i$转移到$j$的一步转移概率，$P(T_0<\infty|S_1=j,S_0=i)$考虑到Markov性即$P(T_0<\infty|S_0=j)$

(3) ![image-20250418102100892](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250418102100892.png)



我们令$C=\left\{0,m\right\}$，$T_c$为游戏结束时间，令$a_i=E[T_c|S_0=i]$，则有$a_0=0,a_m=0$，下面我们考虑$0<i<m$，则显然能得到
$$
a_i=1+\frac{1}{2}(a_{i+1}+a_{i-1})
$$

> 严格推理如下：
> $$
> a_i=1+E[T_c-1|S_0=i]=1+\sum_{j}P(S_1=j|S_0=i)E[T_c-1|S_1=j,S_0=i]\\=1+\sum_{j}p_{ij}E[T_c|S_0=j](这一步用到了Markov性)\\=1+\sum_{j}p_{ij}a_j=1+\frac{1}{2}(a_{i+1}+a_{i-1})
> $$

最后容易解得
$$
a_i=i(m-1),\forall 0\leq i\leq m
$$
**例2** （迷宫中的老鼠）

![image-20250418102955323](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250418102955323.png)

**解** 一旦老鼠跑到3号或7号房间，我们就认为老鼠将永远呆在那个房间，我们用$X_n$表示$n$步后老鼠所在的位置，则$\left\{X_n\right\}$是时间齐次的Markov链，状态空间为$I=\left\{1,2,\cdots,9\right\}$，其中3和7是两个吸收态，其他状态组成$T$，我们**所要求的就是从2出发最终被7吸收的概率**

我们令$h_i=P(T_7<\infty |X_0=i)$，则有$h_7=1,h_3=0$，则利用位置对称性可以得到，$h_1=h_5=h_9=\frac{1}{2}$，那么我们利用全概率公式和Markov性就可以得到：
$$
h_2=\sum_{j}p_{2j}h_j=\frac{1}{3}h_1+\frac{1}{3}h_5+\frac{1}{3}h_3=\frac{1}{3}
$$
**例3**

![image-20250418103518259](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250418103518259.png)

**解** (1) 因为我们其实并不关心股票价格涨到4元或跌到1元之后如何，且我们所求的概率为$P(T_4<T_1)$，这个值与到达1或4之后的过程没有关系，所以我们可以将1和4看成是吸收态，令
$$
h_i=P(T_4<T_1|X_0=i)
$$
则我们可以得到，$h_1=0,h_4=1$，且
$$
h_2=\sum_{j}p_{2j}h_j=\frac{1}{3}h_1+\frac{1}{3}h_2+\frac{1}{3}h_3\\
h_3=\sum_{j}p_{3j}h_j=\frac{1}{4}h_2+\frac{1}{4}h_3+\frac{1}{2}h_4
$$
可以解得$h_2=\frac{2}{5},h_3=\frac{4}{5}$

由全概率公式可以得到
$$
P(T_4<T_1)=\sum_{i=1}^4 P(X_0=i)h_i=\frac{1}{2}h_2+\frac{1}{2}h_3=\frac{3}{5}
$$
(2) 第二问我们并不关心股票价格涨到4元之后如何，且我们所求为$E(T_4)$，这个值与到达4之后的过程没有关系，所以我们可以将4看成是吸收态，令$a_i=E[T_4|X_0=i]$，则$a_4=0$，对于$i\neq 4$，有$a_i=1+\sum_{j}p_{ij}a_j$

![image-20250418104403468](C:\Users\25213\AppData\Roaming\Typora\typora-user-images\image-20250418104403468.png)

则有
$$
a_4=0,\\a_1=1+\frac{1}{2}a_1+\frac{1}{2}a_2\\
a_2=1+\frac{1}{3}a_1+\frac{1}{3}a_2+\frac{1}{3}a_3\\
a_3=1+\frac{1}{4}a_2+\frac{1}{4}a_3+\frac{1}{2}a_4
$$
则可以解得$a_1=\frac{23}{2},a_2=\frac{19}{2},a_3=\frac{9}{2}$

所以最后我们可以得到$E(T_4)=\sum_{i=1}^4P(X_0=i)E(T_4|X_0=i)=\frac{1}{2}a_2+\frac{1}{2}a_3=7$

### 可逆Markov链

设$\left\{X_n\right\}$是不可约的Markov链，且$X_0$的分布为平稳分布$\pi$，则对任何$n>m\geq 1$，任何状态$i,j,i_{m+1},\cdots,i_n$有
$$
P(X_{m-1}=j|X_m=i,X_{m+1}=i_{m+1},\cdots,X_n=i_n)=P(X_{m-1}=j|X_m=i)=\frac{P(X_{m-1}=j,X_m=i)}{P(X_m=i)}\\=\frac{P(X_{m-1}=j)p_{ji}}{P(X_m=i)}=\frac{\pi_jp_{ji}}{\pi_{i}}
$$
也就是说，对于任何$n$，随机序列$X_n,X_{n-1},\cdots,X_{0}$都是时间齐次的Markov链，我们将上式其定义为$q_{ij}$，代表这个Markov链的一步转移概率。

而可逆Markov链要求逆过来的Markov链的一步转移概率$q_{ij}$和原来的一步转移概率$p_{ij}$是相等的，也即如下定义：

**可逆分布：**一个概率分布$\pi$若对所有的状态$i,j$满足$\pi_ip_{ij}=\pi_jp_{ji}$（称为细致平衡条件），则这个概率分布$\pi$称为是可逆分布。

**可逆Markov链：**设$\left\{X_n\right\}$是不可约的具有平稳分布$\pi$的Markov链，如果对所有状态$i,j$有$q_{ij}=p_{ij}$，也即$\pi_ip_{ij}=\pi_jp_{ji}$，则称$\left\{X_n\right\}$为可逆的Markov链。（满足细致平衡条件的Markov链即可逆的Markov链）

> **可逆分布一定是平稳分布**，其条件比平稳分布更强，下面我们给出证明：
>
> 设$\pi$是可逆分布，则对任何状态$j$都有
> $$
> \sum_i\pi_ip_{ij}=\sum_i\pi_j p_{ji}=\pi_j
> $$
> 也即满足了$\pi=\pi P$

下面我们来看一些可逆分布的例子：

**例1** 有A，B两只容器，中间有一细管相连，有$m$只跳蚤，每次有一只随机地从一个容器跳到另一个容器，以$X_n$表示$n$次后A中跳蚤数，则$\left\{X_n\right\}$是时间齐次的Markov链，转移概率为
$$
p_{i,i+1}=\frac{m-i}{m},\qquad p_{i,i-1}=\frac{i}{m},\ i=0,\cdots,m
$$
求其平稳分布

**解** 这题如果选择直接求平稳分布，用最开始的方法$\pi=\pi P$解方程组显然非常难计算，而我们又知道可逆分布一定是平稳分布，且这是一个不可约的Markov链，我们不妨先考虑其是否是可逆分布，如果是可逆分布，那么这个可逆分布也是唯一的平稳分布。

对于可逆分布$\pi$，有$\pi_ip_{i,i-1}=\pi_{i-1}p_{i-1,i},i=1,\cdots,m$，则可以得到：
$$
\pi_i=\frac{m-i+1}{i}\pi_{i-1}=\cdots=\frac{(m-i+1)(m-i+2)\cdots m}{i!}\pi_0=\frac{m!}{(m-i)!i!}\pi_0=C_m^i \pi_0,\ i=0,\cdots,m
$$
所以可以得到$\pi_i=\frac{C_m^i}{2^m},i=0,1,\cdots,m$

又因为$\left\{X_n\right\}$不可约，所以这个可逆分布$\pi$也是唯一的平稳分布



**例2** 设$\left\{X_n\right\}$是平稳的时齐Markov链，状态空间$I=\left\{1,2\right\}$，一步转移矩阵为
$$
P=\begin{pmatrix}

0&1\\
0.5&0.5
\end{pmatrix}
$$
问$\left\{X_n\right\}$是否可逆

**解** 我们设$\pi=(\pi_1,\pi_2)$是可逆分布，则有$\pi_1p_{12}=\pi_2p_{21}$，即有$\pi_1=0.5\pi_2$，又$\pi_1+\pi_2=1$，所以有$\pi=(\frac{1}{3},\frac{2}{3})$，又$\left\{X_n\right\}$不可约且可逆分布存在，所以$\left\{X_n\right\}$可逆



**例3**设$\{X_n\}$是平稳的时序Markov链, 状态空间$=\{1,2,3\}$,

一步转移矩阵为$P=\begin{pmatrix}
0 & 0.6 & 0.4 \\
0.1 & 0.7 & 0.2 \\
0.3 & 0 & 0.7
\end{pmatrix}$

问:$\{X_n\}$可逆吗？

**解** 设$\pi=(\pi_1,\pi_2,\pi_3)$是可逆分布,

则$\pi_2P_{23}=\pi_3P_{32}$, 即$\pi_2=0$,

又$\pi_1P_{12}=\pi_2P_{21}$, 得到$\pi_1=0$,

再有$\pi_1P_{13}=\pi_3P_{31}$, 得到$\pi_3=0$

但$\pi_1+\pi_2+\pi_3=0\neq 1$,所以不满足可逆分布,

所以$\{X_n\}$不可逆



#### Kolmogorov准则

设$\{X_n\}$是不可约的时齐Markov链，初始分布为平稳分布$\pi$，则该Markov链可逆当且仅当对于任意正整数$N$和任意状态$i_0,i_1,\ldots,i_{N-1}$有：$$P_{i_0 i_1} P_{i_1 i_2} \cdots P_{i_{N-1} i_0} = P_{i_0 i_{N-1}} P_{i_{N-1} i_{N-2}} \cdots P_{i_1 i_0}$$

> Kolmogorov准则指出，当Markov链对于任意一个闭合路径，如$i_0\to i_1\to \cdots \to i_{N-1}\to i_0$，正向转移概率的乘积等于逆向转移概率的乘积时，这个Markov链是可逆的

那么由Kolmogorov准则，对于例3，我们考虑$1\to2\to3\to1$和$1\to3\to2\to1$这样的一个闭合路径，因为
$$
p_{13}p_{32}p_{21}=0,\qquad p_{12}p_{23}p_{31}>0
$$
所以其不是可逆的Markov链



