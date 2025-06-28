操作符重载允许用户定义类型像内置类型一样使用操作符，操作符重载是一个以操作符命名的函数，其使用`operator`关键字作为前缀，本质上是一种特殊的函数调用。

不可重载的操作符有`.()`、`.*`、`::`、`?:`、`sizeof`、`typeid`以及`static_cast`、`dynamic_cast`、`const_cast`等

但是运算符重载有一些限制：

- 我们只能重载现有运算符，不能创建新的运算符（比如Python中可以用`**`来表达幂次，但是在C++中这并不是运算符，所以我们不能重载）
- 重载必须基于类或枚举类型
- 运算符重载需要保持操作符的操作数数量和优先级、结合性

操作符重载既可以作为成员函数，也可以作为全局函数，下面我们展开具体讲讲

## 运算符重载的实现方式

在讲运算符重载之前，我们先介绍一下**接收者**这个概念，在C++的运算符重载中，接收者（**仅当运算符被重载为成员函数时才有接收者这个概念**）指的是调用操作符的那个对象，通常是通过成员函数隐式传递的`this`指针所代表的对象。当操作符被重载为成员函数的时候，操作符的调用是通过接收者发起的，**接收者是左侧的对象（对于二元操作符）或唯一操作的对象（对于一元操作符）**。比如在表达式`x+y`中，如果`+`是`Integer`类的成员函数，`x`是接收者，那么`x+y`等价于调用`x.operator+(y)`。当运算符被重载为全局函数时，就没有接收者这个概念了，因为两个参数都是显式传递的。

```cpp
const Integer operator+(const Integer &lhs,const Integer & rhs);
```

在这个例子中，`x+y`调用`operator+(x,y)`，`x`和`y`是对等的参数，没有隐式的`this`。

### 作为成员函数

- 运算符重载作为成员函数的时候，第一个参数是通过`this`指针隐式传递的

- **不对接收者（调用对象）进行类型转换**，但**参数（显式传递的操作数）可能需要进行类型转换**，这种情况通常发生在操作符的参数类型与实际传入的类型不完全匹配的时候

- 成员函数需要类定义的访问权限，且成员函数需要对类数据有完全访问权

- 二元操作符的成员函数需要一个参数，一元操作符的成员函数不需要参数

  这里我们举一个例子：

  ```cpp
  // 二元操作符示例
  class Complex {
  public:
      double real;
      double imag;
  
      // 构造函数
      Complex(double r = 0, double i = 0) : real(r), imag(i) {}
  
      // 重载 + 运算符
      Complex operator+(const Complex& c2) const {
          return Complex(real + c2.real, imag + c2.imag); // 这里的 real 其实是 this->real，imag 其实是 this->imag
      }
  };
  
  // 一元操作符示例
  class Complex {
  public:
      double real;
      double imag;
  
      // 构造函数
      Complex(double r = 0, double i = 0) : real(r), imag(i) {}
  
      // 重载 ++ 前置运算符
      Complex& operator++() {
          ++real; // 只增加实部
          return *this;
      }
  
      // 重载 ++ 后置运算符
      Complex operator++(int) {
          Complex temp = *this; // 复制当前对象
          ++real; // 增加当前对象的实部
          return temp; // 返回之前的状态
      }
  };
  ```

### 作为全局函数

- 运算符重载作为全局函数的时候，第一个参数是显式传递的
- 支持对两个参数进行类型转换
- 可以通过`friend`关键字来访问类的私有成员
- 全局函数的二元操作符需要两个参数，一元操作符需要一个参数

下面我们展示一个全局函数调用的示例：

```cpp
const Integer operator+(const Integer & rhs, const Integer & lhs);
Integer x,y;
x+y; // 等价于 operator+(x,y)
```

再展示一个使用`friend`定义全局操作符的例子：

```cpp
class Integer {
  friend const Integer operator+(const Integer& lhs, const Integer& rhs);
};
const Integer operator+(const Integer& lhs, const Integer& rhs) {
  return Integer(lhs.i + rhs.i);
}
```

`friend`允许全局函数访问类的私有成员，非常适合需要直接操作类内部数据的全局操作符



对于类型转换这条我们举一个例子说明重载为成员函数和重载为全局函数的不同：

假设我们有一个`Integer`类，表示整数，并且重载了`+`操作符作为成员函数，我们希望支持`Integer`对象与内置`int`类型的加法运算，例如`Integer + int`或`int + Integer`

```cpp
class Integer {
public:
    // 构造函数，支持从 int 构造 Integer
    Integer(int n = 0) : i(n) {}

    // 重载 + 作为成员函数
    const Integer operator+(const Integer& other) const {
        return Integer(i + other.i);
    }

    // 获取内部值，用于输出
    int value() const { return i; }

private:
    int i;
};

// 全局函数：支持 int + Integer
const Integer operator+(int left, const Integer& right) {
    return Integer(left) + right;  // 利用 Integer 的构造函数和成员函数 operator+
}

int main() {
    Integer x(5); // Integer 对象
    int y = 3;    // 内置 int 类型

    // 情况 1: Integer + int
    Integer result1 = x + y; // 需要类型转换
    cout << "x + y = " << result1.value() << endl;

    // 情况 2: int + Integer
    Integer result2 = y + x; // 需要全局函数和类型转换
    cout << "y + x = " << result2.value() << endl;

    return 0;
}
```

在上面的代码中，`Integer`类中的`operator+`被定义为成员函数，其接收者是调用对象，参数为`const Integer&other`期望另一个`Integer`对象，返回值是一个新的`Integer`对象，表示加法的结果。

对于情况1，`Integer+int`型，由于`operator+`的期望参数是`Integer`类型，而`y`是`int`，且编译器发现`Integer`类有单参数构造函数，那么编译器就会自动将`y`通过调用构造函数`Integer(int n = 0)`转换为`Integer`对象，转换后的`Integer`对象作为参数传递给`operator+`；而对于情况2，由于接收者是不能做类型转换的，`y`不是`Integer`对象，不能调用`y.operator+(x)`，所以`y+x`会失败

为了解决上面提到的情况2失效的问题，我们定义一个全局函数`const Integer operator+(int left, const Integer& right);`，`left`通过`Integer`的构造函数转换为`Integer`对象，然后调用成员函数`operator+`可以得到`Integer(left)+right`。比如情况2正是`y+x`调用`operator+(y,x)`，转换为`Integer(y)+x`，最终返回`Integer(3+5)`。所以其实全局函数在类型转换方面是更为灵活的。

!!! note "Tip"

    总结一下成员函数和全局函数的选择：

    - 一元操作符（如`++`、`-`）最好为成员函数
    - `=`、`[]`、`->*`，`->()`必须为成员函数
    - 其他二元操作符（如`+`、`-`）建议为全局函数

    参数传递的一些建议：

    - 如果是只读参数的话可以使用`const T&`传递
    - 不修改对象的成员函数（如`+`、`-`、`==`）应当声明为`const`
    - 全局函数中，如果左侧对象会改变（比如赋值操作符），应该传递为非`const`引用

    返回值的一些建议：

    - 返回值类型要根据操作符的预期语义选择，比如`+`操作符生成新对象，可以返回`const`对象防止作为左值修改；逻辑操作符(如`==`、`!=`)返回`bool`（或者`int`）

## 常见的运算符的重载

!!! warning "注意"

    wk老师说期末考试每年都会考一些运算符的原型

### The prototypes of operators（运算符原型）

- `+ - * / % ^ & | ~`：`const T operatorX(const T& l,const T&r)`
- `! && || < <= == != >= >`：`bool operatorX(const T&l,const T&r)`
- `[]`：`E& T::operator[](int index)`

!!! note "Tip"

    这里`E`是容器中存储的元素类型，如`int`、`string`、自定类等等，并且一定要注意返回的是**引用**，`T::`则是类限定，表示这是类`T`的成员函数。运算符`operator[]`**必须是成员函数**。

    再记一个赋值运算符的原型：

    ```c++
    T& T::operator=(const T& other);
    ```

### operators`++` and `--`

我们该如何区分前缀和后缀形式的递增和递减操作符呢？

前缀形式无需额外的参数，后缀形式带一个`int`参数，但是我们通常不使用，编译器会传递`0`以区分，比如下面的例子：

```cpp
class Integer{
public:
    const Integer& operator++();   // 前缀++
    const Integer operator++(int); // 后缀++
    const Integer& operator--(); // 前缀--
    const Integer operator--(int); // 后缀--
    
}
```

前缀操作符直接修改对象并返回引用（前缀操作符如`++a`这种例子，直接在`a`上加1然后返回`a`即可，需要直接修改对象）；后缀操作符返回修改前的对象副本（因为`a++`这种实际上是让`a`作为表达式的值，然后`a=a+1`，所以我们返回的是旧值），需要额外存储旧值，因为要创建临时对象所以效率更低。下面我们以`++`操作符为例看看具体的实现

!!! note "Tip"

    对运算符重载来说，一般遵循下面的这个原则：

    - 修改操作数的状态->返回引用
    - 不修改操作数的状态->返回值（非引用）

    而前缀的`++`和`--`是先`++`或`--`再返回，也即修改了操作数的状态，所以返回值是引用；而后缀的`++`、`--`返回的是修改前的对象副本，所以返回值不是引用。我们可以这么记，返回值少了一个引用符号，那就在后面多加一个int参数（这个int参数只是用来区分前缀和后缀，避免编译器警告的，并无实质性作用）

```cpp
const Integer& Integer::operator++(){
    *this +=1;
    return *this;   // 直接在当前对象上修改，并返回当前对象
}
const Integer Integer::operator++(int){
    Integer old(*this);
    ++(*this);
    return old;
}// 这里需要说明的是后缀形式中的int参数我们并未使用，仅仅用于区分前缀和后缀，避免编译器警告
```

在使用重载操作符`++`和`--`的时候，就可以这样调用：

```cpp
Integer x(5);
++x;  // 相当于调用x.operator++()
--x;  // 相当于调用x.operator--()
x++;  // 相当于调用x.operator++(0);
```

### 关系操作符

我们建议通过较少的关系操作符来实现其他操作符，比如用`==`实现`!=`，用`<`实现`>`、`>=`、`<=`，下面我们就来详细看看

```cpp
class Integer{
public:
    bool operator==(const Integer& rhs) const;
    bool operator!=(const Integer& rhs) const;
    bool operator<(const Integer&rhs) const;
    bool operator>(const Integer& rhs) const;
    bool operator <=(const Integer & rhs) const;
    bool operator >=(const Integer &rhs) const;
}

bool Integer::operator==(const Integer& rhs) const {
    return i == rhs.i;
}
bool Integer::operator!=(const Integer& rhs) const {
    return !(*this == rhs); // 这里我们用 == 实现了 !=
}
bool Integer::operator<(const Integer& rhs) const {
    return i < rhs.i;
}

bool Integer::operator>(const Integer& rhs) const {
    return rhs < *this;
}
bool Integer::operator<=(const Integer& rhs) const {
    return !(rhs < *this);
}
bool Integer::operator>=(const Integer& rhs) const {
    return !(*this < rhs);
}
```

### 运算符`[]`

`[]`运算符必须是成员函数，返回引用以支持数组式访问：

```cpp
Vector v(100);
v[10] = 45; // 通常返回E&（元素引用），以支持读写操作
E& T::operator[](int index)
```

### 流提取器`>>`和流插入器`<<`

流提取器`>>`**必须是全局函数**，接收`istream&`和目标对象的引用

```cpp
istream& operator>>(istream& is,T&obj){
    return is; // 返回流对象是为了支持链式调用
}
// 第一个参数是输入流的引用，第二个参数是要操作对象的引用，返回流引用
```

全局函数允许访问标准输入流，链式操作依赖返回`istream&`

流插入器`<<`**必须是全局函数**，接收`ostream&`和对象（通常为`const`引用）

```cpp
ostream& operator<<(ostream&os, const T& obj){
    return os; // 返回流对象是为了支持链式调用
}
// 第一个参数是输出流的引用，第二个参数是要操作对象的引用，返回流引用
```

全局函数适合与标准输出流交互，参数为`const`引用以保护对象

### 格式控制符(manipulator)

格式控制符是简单的全局函数

```cpp
ostream & manip(ostream& out){
    return out;
}
ostream & tab(ostream& out){
    return out << '\t';
}
cout << "Hello" << tab << "World!" << endl;
```

### 赋值操作符

赋值操作符**必须是成员函数**，如果我们不提供的话，编译器会自动生成`opeator=`，这种自动生成的赋值运算符的行为与自动拷贝构造函数类似，是逐成员赋值的。并且我们**一定要检查自赋值行为**，返回`*this`以支持链式赋值。

```cpp
T& T::operator=(const T& rhs){
    if(this != &rhs){
        
    }
    return *this;
}
```

**对于动态分配内存的类，我们必须显式定义赋值操作符或者拷贝构造函数**，若要禁止赋值，可以将`operator=`声明为`private`

## Value Classes（值类）

- 可以作为函数参数和返回值
- 常重载操作符
- 支持类型转换

## 自定义的类型转换

类型转换操作符可以将一个类对象转换为另一个类对象或内置类型。编译器可以通过 单参数构造函数 或 隐式类型转换操作符 两种方式进行隐式转换。

### 单参数构造函数

单参数构造函数是常见的类型转换方式，其支持隐式类型转换，比如下面这个例子：

```cpp
class PathName{
    string name;
public:
    PathName(const string&);
    PathName();
};
string abc("abc");
PathName xyz(abc); // 这是可以的，构造函数
xyz = abc; // 这也是可以的，编译器会将"abc"做一个隐式类型转换变成PathName类对象，然后赋值给xyz
```

但是单参数构造函数也有可能**导致意外的隐式转换**，为了防止意外的隐式转换发生，我们可以使用`explicit`关键字来防止意外的隐式转换，比如下面这个例子：

```cpp
class PathName{
    string name;
public:
    explicit PathName(const string&);
    PathName();
};
string abc("abc");
PathName xyz(abc); 
xyz = abc; /*这是错误的，因为我们已经用explicit作用于类的单参数构造函数，
编译器无法通过单参数构造函数进行隐式转换*/
```

### Conversion operations（转换操作符）

转换操作符是自动调用的，返回指定类型，但是我们需要谨慎使用，以避免意外的转换。

转换操作符的通用形式如下：

```cpp
X::operator T()
```

其没有显式参数，**转换操作符不需要声明返回类型**（隐式为`T`），编译器将其视为从`X`到`T`的类型转换，比如下面这个例子：

```cpp
class Rational {
public:
    operator double() const; // 转换为 double
};
Rational::operator double() const {
    return numerator_ / (double)denominator_;
}
Rational r(1,3);
double d = 1.3 * r; // r 转换为 double
```

!!! note "Tip"

    C++的类型转换大致有以下三种：

    - 内置转换，如`char -> short -> int -> float -> double`
    - 隐式转换，如`T->T&`、`T*->void*`、`T[]->T*`
    - 用户定义转换，我们可以通过构造函数或`operator T()`进行转换

    但是我们最好避免过多使用隐式类型转换，因为其可能导致函数被意外调用，可以选择使用显式转换函数。
