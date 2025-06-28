## W2 Grouping object

### Container/Collection（容器）

capacity 指能存储的容量，size 指现在存储的量

#### STL : Standard Template Library

Library includes:

- A Pair class（pairs of anything）
- Containers:
  - vector(expandable array)
  - deque(expandable array, expands at both ends)
  - list(double-linked)
  - sets and maps(映射/字典)
- Basic Algorithms(sort, search, etc)
- 都在 `std`命名空间里

##### `std::sort`

这里我们讲一下`std::sort`的基本用法，其通常用于对指定范围内的元素进行排序，**默认是按照升序排列的**，主要有两个版本：

1. 无比较函数（默认排序）：

   ```c++
   std::sort(first,last)
   ```

   使用默认比较器`std::less<T>`，即按照升序排序(`a<b`)，要求元素类型`T`是支持`<`运算符的

2. 带比较函数的版本：

   ```c++
   std::sort(first,last,comp);
   ```

   `comp`是一个比较器，可以是函数、函数对象（仿函数）、`lambda`表达式或者`std::greater<T>`等等。`comp(a,b)`返回`true`表示`a`应该排在`b`之前。

`std::sort`的必选参数是`first`和`last`，这两个参数是迭代器，这是迭代器的范围。

#### Vector

需要`#include<vector>`，创建vector：`vector<int> x`，vector放入元素是有序的

常用的简单方法：

- `capacity`
- `size`
- `empty`
- `swap`，如`V.swap(v2)`

获取元素：

- `V.at(index)`或`V[index]`

- `.front()`返回向量的第一个元素
- `.back()`返回向量的最后一个元素

迭代器：

`vector<int>::iterator p`创造了迭代器p

- `.begin()`返回指向向量第一个元素的迭代器
- `.end()`返回指向向量末尾之后位置的迭代器（**并不指向最后一个元素，而是指向最后一个元素的下一个位置**）

添加、删除、查找元素

- `V.push_back`
- `V.pop_back()`
- `V.insert(pos,e)`（这里的pos是迭代器）
- `V.erase(pos)`（这里的pos是迭代器）
- `V.clear()`
- `V.find(first,last,item)`

!!! note "Tip"

    在用`vector`进行构造的时候是可以设定有几个元素的，元素初始化为什么的，例如：

    ```c++
    vector<int> array(c,0)
    ```
    我们使用`std::vector<int>`的构造函数，创建了一个包含`c`个元素的向量，且将所有的元素初始化为0

#### List

需要包含头文件`#include<list>`

List和Vector有一点不同，List是双向列表，其在列表前后端都是可以添加或删除元素的

变更元素：

- `X.front()`表示列表的前端，`X.back()`表示列表的后端
- `X.push_back()`表示在列表的后端添加元素，`X.push_front()`表示在列表的前端添加元素
- `X.pop_back()`表示在列表的后端删除元素，`X.pop_front()`表示在列表的前端删除元素
- `X.erase(pos1,pos2)`：删除pos1与pos2之间的元素

!!! warning "注意"

    需要注意的是，vector在使用迭代器进行循环的时候，其空间是连续的，所以我们在vector的for循环可以写成这样

    ```c++
    for(p=x.begin(); p < x.end();p++){
        
    }
    ```

    但是对于列表list来说，由于其空间是动态分配的，后申请的空间不能保证在先申请的空间的后面，所以我们不能够采用`p=x.begin(); p < x.end()`，而应当如下使用for循环

    ```c++
    for(p=x.begin();p!=x.end();p++){
        
    }
    ```

    再比如，下面这段代码就是错的：

    ```c++
    list<int> lst1;
    list<int>::iterator iter1 = lst1.begin();
    list<int>::iterator iter2 = lst1.end();
    while(iter1<iter2){
        
    }
    // 不能使用 iter1<iter2 的循环判断条件
    ```

#### Deque

需要包含头文件`#include<deque>`

基本操作：

1. 添加或删除元素：

   `dq.push_back()`在尾部添加元素，`dq.push_front()`在头部添加元素，`dq.insert(pos,number)`在指定位置添加元素

   `dq.pop_back()`在尾部删除元素，`dq.pop_front()`在头部删除元素，`dq.erase(pos)`在指定位置删除元素，`dq.erase(pos1,pos2)`删除`(pos1,pos2)`范围内的元素，`dq.clear()`清空容器

2. 访问元素：

   `dq.front()`，`dq.back()`

3. 大小和容量：
   `dq.size()`，`dq.empty()`，`dq.resize()`

!!! warning "注意"

    需要注意的是，`Deque`是没有`capacity()`函数的，与`vector`不同。这是因为`std::vector`是一段连续的内存块，它的容量是指当前分配的内存空间可以容纳多少元素；而`deque`内部实现通常是分段的，由多个固定大小的内存块组成，这些内存块并不一定是连续的，所以`deque`并没有一个统一的“容量”的概念



Choose Between Sequential Containers:

- Use `Vector` unless you have other reasons

- Don't use `list` or `forward_list` if your program has lots of small elements and space overheard matters（如果你的程序需要存储大量小体积的元素，且内存空间的开销很重要，那么不要使用`list`或`forward_list`）

!!! note "Tip"
    
    这是因为链表（无论是双向链表`std::list`还是单向链表`std::forward_list`）对于每个元素都有额外的内存开销用于存储指针，对于小体积的元素来说，这些额外的指针开销可能会明显大于元素本身的大小，在这种情况下使用像`std::vector`，`std::deque`或`std::array`这样的连续内存容器通常会更加节省空间，因为它们不需要为每个元素存储额外的指针

- Use `vector` or `deque` if the program requires random access to elements（如果你的程序需要随机访问元素（即通过索引直接访问任意位置的元素），那么你应该使用`vector`或`deque`容器）

!!! note "Tip"

    这是因为`std::vector`和`std::deque`都支持高效的随机访问操作，比如通过`[]`或`at()`方法，它们都可以在$O(1)$时间内访问任意位置的元素，而列表只支持顺序访问，

- use `list` or `forward_list` if the program needs to insert elements in the middle of the container（如果程序需要频繁的在容器中间位置插入元素，应该使用`std::list`或`std::forward_list`）

!!! note "Tip"

    这是因为链表结构在任意位置插入元素的操作非常高效（在拥有指向该位置的迭代器的前提下），相比之下，连续内存容器如`std::vector`等在中间插入元素时，需要将插入点后面的所有元素都向后移动一个位置，时间复杂度为$O(n)$，可能非常耗时

- use `deque` if the program needs to insert elements at the front and the back, but not in the middle（如果你的程序需要频繁地在容器的前端和后端插入元素，但不需要在容器中间位置插入元素，那么应该使用双端队列`std::deque`）

!!! note "Tip"
  
    这是因为双端队列支持在前端和后端以常数时间$O(1)$插入和删除元素

#### Map

Map提供了一种键值对的数据结构，允许通过键来快速查找对应的值，需要包含头文件`#include<map>`，创建一个map对象的示例如下：

```c++
std::map<std::string,int> studentScores; // 创建一个map对象，键为string类型，值为int类型
```

插入元素：

```c++
studentScores["张三"] = 85
```

访问元素：

```c++
studentScores["张三"]
```

删除元素：

```c++
studentScores.erase("张三")
```

检查键是否存在：

```c++
if(studentScores.find("张三") != studentScores.end()){
    std::cout << "找到了张三的记录" << std::endl;
}
```

统计特定键的元素个数：

```c++
studentScores.count("张三")
```

键值对可以用`first`和`second`来表示值，比如我们有一个名为`count`的`map`，就可以这样：

```c++
for(const auto &it : count){
    max_number = it.first;
    most_frequency = it.second;
}// 当然这个例子并没有什么实际意义，只是说明一下有first和second这两个方法而已
```

### Iterator（迭代器）

声明

```c++
list<int>::iterator li;
```

容器的`begin()`和`end()`迭代器

```c++
list<int> L;
li = L.begin(); // begin()指向的是容器的头部
li = L.end();    // end()指向的是容器的尾部的下一个
```

#### for-each loop(C++11)

很经典的

```c++
for(type variable_name : array/vector_name){
    
}
// 比如
for (auto i : arr){
    
}
```

对于map来说，每一个i取出来的是一个键值对，`i.first`取出的是键，`i.second`取出来的是指

!!! warning "注意"

    C++中传统的for-each循环在默认情况下是只读的，比如

    ```c++
    for(auto i :vec){
        i=1;
    }
    ```

    上述代码实际上是在创建集合中每个元素的拷贝，而不是引用，因此这些修改只会影响循环内的局部变量i，而不会改变原始vector中的元素，如果我们想要修改原始的元素，就需要使用引用，比如

    ```c++
    for(auto &i : vec){
        i=1;
    }
    ```

    这样i成为vector中每个元素的引用，通过引用修改值就能直接影响到vector中的元素；

    除此之外，如果我们只需要读取元素而不修改，可以使用常量引用，比如

    ```c++
    for(const auto &i : vec){
        
    }
    ```

    这样可以避免不必要的拷贝，同时防止意外修改

由于container的名字很长，我们可以用typedef来简化，比如

```c++
// map<string,list<string>> phonebook;
// map<string,list<string>>::iterator finger;
typedef map<string,list<string>> PB;
PB phonebook;
PB::iterator finger;
```

或者也可以使用`using`：

```c++
using PB = map<string, list<string>>;
```
