## Priority Queue Interface

之前学习 BST 的时候，我们知道 BST 搜索的时间复杂度为 $\Theta(\log N)$，如果我们更加关心的是快速找到最小或者最大的元素，而不是快速搜索呢？我们引入一种新的抽象数据结构——优先队列(Priority Queue)，PQ是一个具有 `add()`、`getSmallest()`、`removeSmallest()`、`size()`功能的数据结构（这里的定义事实上是 MinPQ，最小优先队列）。

MinPQ Interface 如下：

```java
public interface MinPQ<Item>{
    public void add(Item x);
    public Item getSmallest();
    public Item removeSmallest();
    public int size();
}
```

!!! note "Tip"

    若需要 MaxPQ，可以反转比较器，我们在后续给出讨论。

我们可以想象这样的一个优先队列的应用场景，假设你是某社会和谐组织的成员，你需要监控公民的文本信息，确保没有不和谐堆化，而你要做的事情就是每天从 Sniffer 手机消息，按照和谐度(使用 HarmoniousnessComparator)排序，并报告最不和谐的 M 条信息（即 Top-K 问题）。一个 Naive 的实现方法是收集所有的 $n$ 条消息到 ArrayList，排序后再去前 $M$ 条，如下实现：

```java
public List<String> unharmoniousTexts(Sniffer sniffer, int M){
    ArrayList<String> allMessages = new ArrayList<String>();
    for(Timer timer = new Timer(); timer.hours() < 24;){
        allMessages.add(sniffer.getNextMessage());
    }
    Comparator<String> cmptr = new HarmoniousnessComparator();
    Collections.sort(allMessages, cmptr, Collections.reverseOrder());
    return allMessages.sublist(0,M);
}
```

但是这样是有些浪费空间的，我们只需要 Top-M 却存储了所有的 $n$ 条信息。

一个**优化实现**是使用最小优先队列MinPQ维护Top-M的最不和谐信息（实际上是MaxPQ语义，但我们反转比较器实现这样的逻辑），添加消息，如果大小超过了 $M$，我们就移除 $M$ 个中最小的（也即最和谐的），使得最终内存为 $\Theta(M)$

```java
public List<String> unharmoniousTexts(Sniffer sniffer, int M){
    // 定义反转比较器以获取 Top-M 不和谐（最大）信息
    Comparator<String> cmptr = new HarmoniousnessComparator();
    MinPQ<String> unharmoniousTexts = new HeapMinPQ<String>(cmptr);
    
    
    for(Timer timer = new Timer(); timer.hours()<24; ){
        unharmoniousTexts.add(sniffer.getNextMessage());
        if(unharmoniousTexts.size()>M){
            unharmoniousTexts.removeSmallest(); // 移除最和谐的，保留 Top-M 不和谐
        }
    }
    ArrayList<String> textlist = new ArrayList<String>();
    while(unharmoniousTexts.size()>0){
        textlist.add(unharmoniousTexts.removeSmallest());
    }
    return textlist;
}
```

下面我们给出常见的数据结构实现 PQ 的最坏情况的运行时表格

| 数据结构      | `add`            | `getSmallest`    | `removeSmallest` |
| ------------- | ---------------- | ---------------- | ---------------- |
| Ordered Array | $\Theta(N)$      | $\Theta(1)$      | $\Theta(N)$      |
| Bushy BST     | $\Theta(\log N)$ | $\Theta(\log N)$ | $\Theta(\log N)$ |
| HashTable     | $\Theta(1)$      | $\Theta(N)$      | $\Theta(N)$      |

!!! note "Tip"

    对于有序数组，插入和移除元素都需要对元素进行移位；对于 Bushy BST，需要维持平衡，不过可以添加最小指针将 `getSmallest` 的时间复杂度优化为 $\Theta(1)$；对于Hash Table，由于是无序的，需要遍历全部的元素

## Heaps（堆）

### 堆的定义

从上一节可以看到，对于我们的 PQ 操作，已知数据结构中运行时间最优的是二叉搜索树，我们对二叉搜索树进行一些修改和约束，就可以得到二叉堆，下面我们给出堆的定义。

堆(heap)是一种满足特定条件的完全二叉树（完全二叉树**仅允许最底层的节点不完全填满**，且最底层的节点**必须从左至右依次连续填充**），主要可以分为以下几种类型：

- 小顶堆(min heap)：任意节点的值$\leq$ 其子节点的值
- 大顶堆(max heap)：任意节点的值 $\geq$ 其子节点的值

堆作为完全二叉树的一种特例，具有以下特性：

- **完全属性(Complete Property)：**树是完全二叉树，缺失节点仅在底层，且底层节点靠左填充
- **最小堆/最大堆属性(Min-Heap Property/Max-Heap Property)**：最大堆的堆顶元素（根节点）的值是最大的；最小堆的堆顶元素的值是最小的

!!! note "Tip"

    我们将二叉堆的根节点称为“堆顶”，将底层最靠右的节点称为“堆底”

### 堆操作

在 `Priority Queue Interface` 章节，我们介绍了 PQ 的几个主要函数 `getSmallest()`、`add(x)`、`removeSmallest()`，下面我们以最小堆为例介绍这几个函数的逻辑：

- `getSmallest()`：直接返回根节点，时间复杂度为 $\Theta(1)$
- `add(x)`：将新项 `x` 添加到二叉树的末尾（这是为了保持完全性），然后上浮(`swim`)恢复最小堆属性。上浮过程中如果新项<其父节点，则交换并递归上浮，直到满足属性或到达根节点。最好情况和最坏情况的时间复杂度均为 $\Theta(\log N)$，平均摊销更低
- `removeSmallest()`：移除根（最小项），将末尾项移到根，然后下沉(sink)恢复属性。下沉过程中如果根节点>其任意子节点，则和较小的子节点交换并递归下沉，直至满足属性或到达叶节点。时间复杂度为 $\Theta(\log N)$

## 树的表示方法

### Approach 1a/1b/1c：pointer-based

**1a：固定宽度节点：**即子节点数是固定的

```java
public class Tree1A<Key>{
    Key k;
    Tree1A left;
    Tree1A middle;
    Tree1A right;
    ...
}
```

**1b：变宽节点：**子节点是由数组存储的，子节点数可以发生改变

```java
public class Tree1B<key>{
    Key k;
    Tree1B[] children;
    ...
}
```

**1c：Sibling Tree：**每个树节点存储以下信息：

- **键值(`Key k`)：**存储节点的数据
- **favoredChild：**指向该节点的“首选孩子”（通常是第一个孩子，如左孩子）
- **sibling：**指向该节点的“兄弟姐妹”（比如右孩子）

类似下面的代码：

```java
public class Tree1C<Key>{
    key k;
    Tree1C favoredChild; // 通常指向第一个孩子
    Tree1C sibling; // 通常指向第一个孩子的下一个兄弟
}
```

这种表示法将树视为“长子/兄弟”的结构，其核心思想是避免为每个节点存储所有的子节点或者固定指针，而是用两个指针灵活表示树的层次关系。特别适合表示多叉树，但对于二叉堆来说比较复杂。

### Approach 2：数组+父指针

用 `keys` 数组来存键，`parents` 数组来存储父索引，例如：

```java
public class Tree2<Key>{
    Key[] keys;
    int[] parents;
    ...
}
```

其缺点是 `parents` 数组比较冗余，因为我们**可以由堆的完全性去推导每个节点与其父节点的索引关系**。

### Approach 3：纯数组

这是经常采用的方式，只用 `keys[]` 存键，并按层序遍历填充。

```java
public class Tree3<Key>{
    Key[] keys;
    ...
}
```

**索引对应公式：**对于给定的索引 $k$，有 `parent[k]=(k-1)/2`、`leftChild(k)=2k+1`、`rightChild(k)=2k+2`（是从索引0处开始的情形，如果将索引为0的位置空出，左、右子节点对应的索引应当为2k和2k+1）。

!!! note "Tip"

    这里提供 `getSmallest()` 和 `removeSmallest()` 会用到的 `swim()` 和 `sink()`函数

    ```java
    public void swim(int k){
        if(keys[parent(k)]>keys[k]){ // 这里的 > 是自定义的大于
            swap(k,parent(k));
            swim(parent(k)); // 递归地swim
        }
    }
    
    public void sink(int k){
        if(2*k+1>=N){
            return; // 没有子节点
        }
        int j = 2*k+1; // 左子节点
        if(j + 1 < N && keys[j] > keys[j+1]){ // 如果右子节点存在且更小，这里的大于逻辑需要自己定义
            j++; // 选择右子节点
        }
        if(keys[k] <= keys[j]){
            // 父节点比子节点小，到达递归终点
            return;
        }
        swap(k,j);
        sink(j);
    }
    ```

## Comparing to alternative implementations（与其他实现的比较）

| Methods            | Ordered Array | Bushy BST        | Hash Table  | Heap             |
| ------------------ | ------------- | ---------------- | ----------- | ---------------- |
| `add()`            | $\Theta(N)$   | $\Theta(\log N)$ | $\Theta(1)$ | $\Theta(\log N)$ |
| `getSmallest()`    | $\Theta(1)$   | $\Theta(\log N)$ | $\Theta(N)$ | $\Theta(1)$      |
| `removeSmallest()` | $\Theta(N)$   | $\Theta(\log N)$ | $\Theta(N)$ | $\Theta(\log N)$ |

有几点说明：

- 这里的 Heap operations 的分析是摊还分析。因为对于数组的实现来说，数组扩容的复杂度是 $\Theta(N)$，但是这样的高成本操作并不会在每次堆操作都发生，我们需要将这样偶尔发生的高成本操作平摊到多次常规操作上。
- BST 的实现是可以有常数时间复杂度的 `getSmallest()` 的，即用一个指针来指向最小元素

!!! note "Tip"

    还遗留了一些些实现问题，请思考思考：

    - Priority Queue 怎么知道该如何排序？比如有一个关于 dog 的PQ，它到底是按照体重排序还是按照品种排序？
    - 有没有方法可以灵活的定义排序的方式？
    - 我们如何将一个 MinPQ 变成一个 MaxPQ？