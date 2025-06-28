我们不妨先讲一讲为什么需要模板，可以考虑这样一个场景，当我们需要为不同数据类型（比如整数、浮点数、字符串等）实现相似逻辑的代码的时候，如果我们为所有的数据类型都写一份，那代码重复问题就很严重了，而模板能很好地解决这种问题。

## 模板概述

模板是**泛型编程(generic programming)**的核心，允许在类或函数的定义中使用类型作为参数，从而实现代码重用

模板的类型有**函数模板、类模板**两大类

## 函数模板

函数模板允许对不同类型的数据执行相同的操作，避免为每种类型编写重复代码。看下面这样一个例子：

```cpp
void swap(int &x,int &y){
    int temp = x;
    x = y;
    y = temp;
}
```

上面是一个普通`swap`函数的定义，用于交换两个`int`类型的变量的值，但是如果我们需要交换其他类型，比如`float`，`string`等等，就需要为每种类型编写类似的函数，就会造成代码重复问题。这时候我们可以使用**函数模板**，从而允许同意函数处理多种类型

### 函数模板的定义与语法

我们以`swap`函数作为模板介绍

```cpp
template<class T>
void swap(T &x, T&y){
    T temp = x;
    x = y;
    y = temp;
}
```

在上面的这个例子中，我们通过`template`关键字引入模板定义，`<class T>`则指定参数化类型`T`（这里可以用`class T`，也可以用`typename T`），`T`在函数体内作为类型名使用，代表任意的内置类型或用户定义类型。函数模板允许编译器根据调用时的参数类型生成具体函数。

### 模板实例化

模板实例化是指从模板类/函数和模板参数生成具体声明的过程。在模板实例化的过程中，类型会被替换到模板中，生成新的函数或类定义，编译器也会进行语法检查和类型检查

下面我们举一个具体的例子：

```cpp
template<class T>
void swap(T &x, T&y){
    T temp = x;
    x = y;
    y = temp;
}

int i = 3;
int j = 4;
swap(i,j); // 实例化 swap<int>

float k =4.5;
float m = 3.7;
swap(k.m); // 实例化 swap<float>

std::string s("Hello");
std::string t("World");
swap(s,t);  // 实例化swap<std::string>
```

在每次调用的时候，编译器都会根据参数类型（比如`int`、`flaot`、`std::string`）生成对应的函数实例。模板函数是函数模板实例化的结果。

但是需要注意的是，函数模板要求参数类型必须**精确匹配**，**不执行类型转换**，例如：

```cpp
swap(int,int); // 这是有效的
swap(double,double);  // 这是有效的
swap(int,double);  // 这是错误的，类型并不匹配
```

即使类型之间存在隐式转换（比如`int`到`double`），模板函数也不会自动去转换。

除此之外，模板函数和普通函数是可以共存的，在匹配的情况下，编译器会优先选择普通函数，然后才会考虑模板函数。函数选择（在有函数重载的情况下）的优先级如下：

- 首先查找是否有精确匹配的普通函数
- 然后查找是否有精确匹配的函数模板
- 最后考虑进行函数重载解析（即根据函数签名、参数类型和其他规则选择最佳匹配函数）

```cpp
void f(float i ,float k){}
template<class T>
void f(T t, T u){}

f(1.0,2.0);  // 此时会调用普通函数f(float,float)
f(1,2);  // 此时会调用模板函数 f(int,int)
f(1,2.0) // 此时会出现错误    
```

上面的例子中，编译器都是根据函数调用时的实际参数自动推导模板类型`T`，而在某些情况下，参数类型可能不在函数签名中，这个时候我们可以显示地指定模板类型。如下面例子：

```cpp
template<class T>
void foo(void){}

foo<int>();  // 显式指定 T 为 int
foo<float>(); // 显式指定 T 为 float
```

## 类模板

类模板是参数化类型的类，允许抽象出与类型无关的操作，实现代码重用。

### 类模板的定义与语法

我们以一个`Vector`类模板作为例子讲解一下类模板的定义和语法

```cpp
template<class T>
class Vector{
public:
    Vector(int);
    Vector();
    Vector(const & Vector);
    Vector& operator=(const Vector&);
    T& operator[](int);
private:
    T* m_elements; // 存储元素的动态数组
    int m_size  // 数组大小
};
```

我们需要使用`template<class T>`定义模板，其中`T`是参数化类型，类内的成员如`m_elements`使用`T`作为类型，允许存储任意类型的数据。`Vector`模板类中我们提供了构造函数、拷贝构造函数、赋值操作符、索引操作符等功能

定义了类模板后，类模板会通过具体类型（比如`int`、`Complex`）实例化，生成特定类型的类，比如`Vector<int>`，我们举一些使用的例子：

```cpp
Vector<int> v1(100); // 整数向量，大小为100
Vector<Complex> v2(256); // 复数向量，大小为256
v1[20] = 10; // 赋值整数
v2[20] = v1[10] // 将整数赋值给复数（需要int到Complex的转换）
```

### 特化

在讲特化之前，我们首先明确一下主模板的概念，主模板就是我们通常理解的模板，是最通用的模板定义，例如：

```c++
template<class T>
void print(T value){
    std::cout << "General:" << value << std::endl;
}
```

而当通用模板不适用于某些特定类型的时候，我们可以选择为这些类型提供特殊实现。需要注意的是，**特化会覆盖主模板的行为，但仅仅只针对指定的类型**。例如：

```c++
template<> // 这里是针对 int 类型的显式特化
void print<int>(int value){
    std::cout << "Special int:" << value << std::endl;
}
```

特化类型其实还分为以下两种：

- 显式特化（全特化）Explicit Specialization/Full Specialization，为模板的所有参数指定具体类型，其语法以`template<>`开头，并在函数/类名后面使用尖括号`<>`指定类型，例如：

  ```c++
  template<>
  void print<double>(double value){
      std::cout << "Double with precision:" << std::fixed << value << std::endl;
  }
  ```

- 偏特化（部分特化）Partial Specialization：仅对模板的部分参数进行特化（仅仅适用于类模板、函数模板不支持）例如：

  ```c++
  template<class T,class U> // 主模板
  class MyClass{...};
  
  template<class T> // 第二个参数为int时的偏特化
  class MyClass<T,int>{...};
  ```

  **特化的工作机制**：当使用模板的时候，编译器按照以下顺序匹配：

  - 最匹配的特化版本（显式特化或偏特化）
  - 主模板

  而且需要非常注意的是，特化的**类型必须精确匹配**，它要求类型严格一致，比如`const int`和`int`就被视为不同类型。特化也不是函数重载，因为特化在模板实例化阶段生效，而重载是在函数匹配阶段生效的。

### 类模板成员函数

- 成员函数定义在类外的时候，需要`template<class> T`和`Vector<T>::`作为前缀
- 构造函数分配类型为`T`的动态数组，`operator[]`返回`T&`支持读写

比如下面这个例子：

```cpp
template<class T>
Vector<T>::Vector(int size) : m_size(size){
    m_elements = new T[m_size];
} 

template<class T>
T& Vector<T>::operator[](int idx){
    if(indx < m_size && indx >=0){ // 边界检查
        return m_elements[indx];
    }else{
        
    }
}
```

### 多类型模板

类模板可以支持多个类型参数，增加灵活性，比如下面的这个例子：

```cpp
template<class Key,class Value>
class HashTable{
    const Value& lookup(const Key&) const;
    void install(const Key&, const Value&);
};
```

这个类模板就使用了`Key`和`Value`两个类型参数，并支持键值对操作查找`look`和插入`install`（具体的实现没提供）

### 非类型参数

模板的参数不仅仅局限于类型，还可以是常量表达式（非类型参数），如整数等等，比如下面的例子：

```cpp
template<class T,int bounds = 100>
class FixedVector{
public:
    FixedVector();
    T& operator[](int i);
private:
    T elements[bounds];  // 固定大小的数组
}
```

这个例子中非类型参数`bounds`指定数组的大小默认值为100

在使用的时候，如果我们提供了`bound`参数的值，就会使用提供值，如果没有提供就会使用默认值100，例如：

```cpp
FixedVector<int,50> v1;
FixedVector<int,10*5> v2;
FixedVector<int> v3;
```

## 模板与继承

类模板可以参与继承关系，具体来说有三种情况

- 模板类继承非模板类

  ```cpp
  template<class A>
  class Derived : public Base{};
  ```

- 模板类继承模板类

  ```cpp
  template<class A>
  class Derived : public List<A>{};
  ```

- 非模板类继承模板类

  ```cpp
  class SuperVisorGroup : public List<Employee>{};
  ```

!!! note "Tip"

    总结一些注意事项：

    - 模板的声明和定义通常放在头文件中
    - 编译器或链接器会处理多重定义问题，所以我们无需担心重复定义
    - 支持`friend`函数和`static`函数
