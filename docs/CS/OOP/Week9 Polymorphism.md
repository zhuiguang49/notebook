多态允许不同类型的对象以统一的方式被处理，是基于继承和虚函数机制实现的，其核心思想在于通过基类的接口来操作派生类的对象，从而实现代码的通用性和灵活性。

## Subtyping（子类型化）

Subtyping 指的是通过类继承的关系，派生类定义了一个与基类兼容的类型，我们称之为子类型。子类型的对象可以在需要基类型对象的场景中被使用，这种特性称为**替代原则**

在多态中，Subtyping 允许我们使用子类类型的对象来替代其父类类型的对象，这意味着如果某个函数期望接收一个基类类型的参数，我们可以传递一个派生类的对象给它，并且该对象的行为将基于其实际的派生类类型。

### 基于公共继承的类型转换规则

公共继承意味着子类是基类的一种，子类对象可以在需要基类对象的场景中使用。比如如果类B是类A的子类（B is a A），那么任何需要A的地我们都可以使用B，A的所有属性和行为对B同样适用。

**类型转换规则：**

当D是B的派生类时，以下转换是合法的：

- D $\to$ B，子类对象可以隐式转换为基类对象
- `D*` $\to$ `B*`，子类指针可以隐式转换为基类指针
- `D&` $\to$ `B&`，子类引用可以隐式转换为基类引用

需要注意的是，这些转换通常是**上行转换(Upcasting)**的，从派生类到基类的转换编译器会自动处理；如果是下行转换(Downcasting)，即基类到子类，通常需要显式地类型`etype conversion(cast)`或`dynamic_cast`。上行转换Upcasting总是安全的。

举一个具体的例子，上课的时候有提到过`Manager`类型和`Employee`类型，其中`Manager`类型是`Employee`类型的子类型：

```cpp
Manager pete("Pete","444-55-6666","Bakery");
Employee *ep=&pete;
Employee &er= pete;
```

上述的两个例子都是Upcasting的，将`Manager`对象赋给`Employee`类型的指针或引用 

但是这样的**Upcasting会造成`Lose type information about the object`**，也就是说，在将一个派生类对象转换为基类对象、指针或引用的过程中，程序会丢失派生类的特有类型信息。因为在进行upcasting的时候，**编译器和运行时环境会将对象视为基类类型**，而非实际的派生类类型，这意味着我们**只能访问基类的成员**，因为通过基类的指针或引用只能调用基类中定义的方法或访问基类的成员变量，而无法直接访问派生类中定义的特有方法或成员；并且还会**丢失派生类的特定行为**，因为如果基类和派生类中有同名方法且该方法**不是虚函数**的话，调用的会是基类版本而不是派生类版本（静态绑定），比如我们举个例子：

```cpp
class A{
  int i = 1;
public:
    void prt(){
        cout << "A::prt()" << 1 << endl;
    }
};

class B1 : public A{
    int i = 2;
public:
    void prt(){
        cout << "B1::prt()" << i << endl;
    }
};

class B2 : public A{
    int i = 3;
public:
    void prt(){
        cout << "B2::prt()" << i << endl;
    }
}

int main(){
    B1 b1;
    B2 b2;
    A* p1 =&b1;
    p1->prt();
}
```

得到的输出会是`A::prt()1`，也就是说，尽管`b1`是一个`B1`类型的对象，我们将其赋给了`A`类型的指针，做了一次upcasting，那么通过`p1`访问的函数`prt()`和变量`i`就都是类型`A`的。

那么我们就有一个问题，**怎么解决upcasting可能带来的信息丢失问题的呢**？答案是虚函数`virtual`，在介绍虚函数之前我们先讲讲静态绑定和动态绑定

## 静态绑定&动态绑定

### 静态绑定

静态绑定是指在**编译**的时候，根据变量的**静态类型（即变量声明时的类型）**确定调用哪个函数实现，编译器在生成代码的时候直接将函数调用绑定到具体的函数地址。

静态绑定有以下几点特点：

- 静态绑定发生在**编译阶段**，运行时无需额外开销，执行效率高
- 适用于**非虚函数**或**通过对象直接调用函数（包括虚函数）**
- 不考虑对象的实际类型（动态类型），只依赖于声明的类型

### 动态绑定

动态绑定是指在**运行**的时候，根据对象的**动态类型（即实际类型）**决定调用哪个函数实现，通常通过**虚表**查找正确的函数地址

动态绑定具有以下几点特点：

- 发生在**运行时**，需要通过虚表解析，略有性能开销
- 适用于**虚函数**，且**通过基类指针或引用调用**的时候触发（**虚函数**+**通过基类指针或引用调用**两个条件缺一不可）
- 能根据对象的实际类型调用派生类的实现，支持多态。

我们可以参考下面的例子加深理解：

```cpp
class Shape {
public:
    virtual void render() { cout << "Shape render"; } // 虚函数
};

class Ellipse : public Shape {
public:
    void render() override { cout << "Ellipse render"; } // 重写
};

class Circle : public Ellipse {
public:
    void render() override { cout << "Circle render"; } // 重写
};

void render(Shape* p) {
    p->render(); // 动态绑定
}

void func() {
    Ellipse ell(10, 20);
    ell.render();        // 静态绑定：这是通过对象直接调用 Ellipse::render()
    Circle circ(40);
    circ.render();      // 静态绑定：这是通过对象直接调用 Circle::render()
    render(&ell);       /* 动态绑定：Shape的render函数声明为了虚函数，且是通过引用调用，
    编译器生成代码在运行的时候通过虚表查找p指向对象的实际类型*/
    render(&circ);      // 动态绑定：调用 Circle::render()
}
```

每个包含虚函数的类都有一个虚函数表，表中存放该类所有虚函数的实际地址，编译器会自动为每个对象添加隐藏的`vptr`指针指向其`vtable`，在动态绑定的过程中，如下面的代码：

```c++
void render(Shape *p){
    p->render();
}
```

这里在调用`p->render()`的时候，编译器会先通过`p`找到对象的`vptr`，再通过`vptr`找到类的`vtable`，然后在`vtable`中找到`render`函数的槽位，调用该槽位存储的实际函数地址。

### 多态变量(Polymorphic variables)

多态变量是指能够持有基类类型或派生类类型对象的**指针或引用变量**，这些变量的静态类型是基类，但它们可以在运行时指向或引用不同派生类的对象，从而支持多态行为

- 多态变量的静态类型是基类，比如`Shape*`或`Shape&`
- 其动态类型可以是基类或任何派生类，比如`Ellipse`或`Circle`
- 多态变量通过上行转换Upcasting和虚函数实现多态

我们举个多态变量的实际例子，比如一个`Vehicle*`类型的指针可以指向`Vehicle`，`Car`，`Bicycle`对象（这里`Car`，`Bicycle`都是`Vehicle`的子类，是上课提到的例子）

## 虚函数(Virtual functions)

虚函数是C++中实现**运行时多态**的核心机制，允许在运行时根据对象的实际类型（动态类型）调用相应的函数，而不是基于指针或引用的声明类型（静态类型）

虚函数是使用`virtual`关键字声明的，派生类可以选择**重写(Override)**基类的虚函数（如果不重写，就会使用基类的实现；如果重写，就会使用自己的实现）。且虚函数通过动态绑定在运行时决定调用哪个版本的函数

```cpp
class Base{
public:
    virtual void show{
        cout << "Base class show" << endl;
    }
};

class Derived : public Base{
public:
    void show() override{ // 这里override关键字是一个标识符，不是必须的
        cout << "Derived class show" << endl;
    }
};
```

我们只需要在基类中声明一次`virtual`，后续派生类无需重复声明该函数为虚函数，它们会自动继承这种属性。

### 虚函数(virtual)与非虚函数(non-virtual)

**非虚函数：**非虚函数的绑定方式为静态绑定，在**编译时**根据指针或引用的静态类型决定调用哪个函数

**虚函数：**虚函数的绑定方式为动态绑定，在**运行时**通过对象的动态类型决定调用哪个函数，允许基类指针或引用调用派生类的函数实现，派生类可以选择重写虚函数，覆盖基类的实现。

### 虚函数的工作原理

虚函数的实现机制是通过**虚函数表（vtable）**实现的

每个包含虚函数的类都有一个**虚函数表**，这是一个函数指针的数组，存储该类所有虚函数的地址。而每个对象实例包含一个指向其类`vtable`的指针，我们称之为虚指针(`vptr`)，通常存储在对象的内存布局的开头。

虚函数的工作流程大致如下：

- 对象创建时，编译器为其分配`vptr`，指向所属类的`vtable`（具体来说，当我们创建某个对象的时候，构造函数会被调用以初始化这个对象，而对于有虚函数或者继承自带有虚函数的类的对象，其`vptr`会在构造函数执行期间被设置为指向相应的`vtable`）
- 调用虚函数的时候，程序通过`vptr`查找`vtable`，找到正确的函数地址并调用

而有了虚函数，我们就能够实现动态绑定。当我们通过基类指针或引用调用虚函数的时候，编译器会生成代码并检查对象的`vptr`，然后通过`vptr`查找`vtable`，找到对应虚函数的地址，并调用实际的函数。

### 虚函数的声明与重写

我们在基类中使用`virtual`关键字声明虚函数

派生类通过提供与基类虚函数相同签名的函数来重写，比如

```cpp
class Shape{
public:
    virtual void render() =0;
    virtual void resize();
    virtual ~Shape();
};

class Ellipse : public Shape{
public:
    void render() override{
        std::cout << "Rendering Ellipse\n";
    }
    void resize() override{}
    ~Ellipse() override{}
};
```

`override`关键字用于显式声明函数是重写基类的虚函数，并且帮助编译器检查签名是否匹配，避免错误，但不是必需的。

!!! warning "注意"

    需要注意的是，当我们执行**对象到对象**的拷贝赋值操作的时候，虚函数表`vtable`并不会被复制，因为`vtable`是类级别的静态结构，并且会产生**对象切片**（发生于对象到对象的拷贝赋值）问题（派生类的额外数据被丢弃，只保留了基类的部分），比如我们假设类层次的结构如下：

    ```cpp
    class Shape {
    public:
        virtual void render() = 0;
        virtual ~Shape();
    protected:
        XYPos center;
    };
    
    class Ellipse : public Shape {
    public:
        Ellipse(float majr, float minr) : major_axis(majr), minor_axis(minr) {}
        virtual void render() override { /* 绘制椭圆 */ }
    protected:
        float major_axis, minor_axis;
    };

    class Circle : public Ellipse {
    public:
        Circle(float radius) : Ellipse(radius, radius) {}
        virtual void render() override { /* 绘制圆形 */ }
    protected:
        float area; // Circle独有的成员
    };
    ```

    ```cpp
    Ellipse elly(20.0f,40.0f); // elly是基类对象
    Circle circ(60.0f); // circ 是子类对象
    elly = circ // 将 Circle 对象赋值给 Ellipse 对象
    ```

    这里`elly`的类型仍然是`Ellipse`，不会变成`Circle`，调用`elly.render`的时候执行的仍然是`Ellipse::render()`，这是因为`elly`的`vtable`是`Ellipse`的。并且`circ`的`area`成员会被完全忽略，丢失了`Circle`的信息。为了解决将派生类对象赋值给基类对象导致的切片问题，我们可以使用**指针或引用**来操作对象，以保留动态类型信息，比如下面的例子：

    ```cpp
    Ellipse* elly = new Ellipse(20.0f,40.0f);
    Circle* circ = new Circle(60.0f);
    elly = circ;
    ```

    这就是一个指针赋值，`elly`（类型为`Ellipse*`）被赋值为`circ`（类型为`Circle*`），在赋值后`elly`和`circ`都指向同一个`Circle`对象（内存地址相同），那么在调用`elly->render()`的时候，C++通过虚函数表`vtable`查找对象的动态类型将会是`Circle`，因此执行的就是`Circle::render()`。但是需要注意的是，原来的`Ellipse`对象会失去引用，这样可能导致内存泄漏。

    通过引用实现上述操作也是可以的，比如下面这个例子：

    ```cpp
    void func(Ellipse & elly){
        elly.render();
    }
    Circle circ(60.0f);
    func(circ);
    ```

    这里函数`func`接受了一个`Ellipse&`类型的引用参数，在调用`func(circ)`时，`circ`被隐式转换为`Ellipse&`，绑定到`elly`，那么在调用`elly.render()`的时候，就会通过虚函数表进行查找，最终执行`Circle::render()`

### 虚析构函数

首先我们不妨来考虑一下虚析构函数为什么是必要的，对于这样一个例子：

```cpp
class Shape {
public:
    virtual void render() = 0;
    virtual ~Shape();
};
class Ellipse : public Shape {
public:
    Ellipse(float majr, float minr);
    virtual void render() override;
    ~Ellipse() override { /* 清理资源 */ }
};

Shape* p = new Ellipse(100.0f, 200.0f);
delete p;
```

如果`shape`的析构函数不是虚函数的话，那么我们通过`Shape*`指针删除`Ellipse`对象的时候，只会调用`Shape::~Shape()`，而不会调用`Ellipse::~Ellipse()`，这就有可能导致派生类的资源未被释放，造成内存泄漏等等，所以**将基类的析构函数声明为虚函数是很有必要的**

## Overriding（重写）

### 虚函数重写

虚函数的重写是指派生类提供与基类虚函数相同签名（函数名、参数列表、返回类型均一致）的实现，从而使得在通过基类指针或引用调用虚函数的时候，运行时根据对象的实际类型（动态类型）取调用派生类的实现。比如下面这个例子：

```cpp
class Base{
public:
    virtual void func(){
        cout << "Base::func\b";
    }
};

class Derived : public Base{
public:
    void func(){
        cout << "Derived::func\n";
    }
};

Base *ptr = new Derived();
prt->func; // 调用的是 Derived::func()
```

这里`Base`定义了虚函数`func`，`Derived`重写了`func`，`ptr`虽然是`Base*`类型，但是指向了`Derived`对象，调用`ptr->func()`时执行`Derived::func()`

前面我们也提到过`override`关键字用于显式声明派生类函数重写基类的虚函数，并且如果函数签名不匹配基类的虚函数的话，编译器会报错。

那么我们如何在派生类的重写函数中调用基类的虚函数版本呢，答案是使用**域解析运算符(`::`)**，比如下面这个例子：

```cpp
class Derived : public Base{
public:
    void func() override{
        cout << "In Derived::func\n";
        Base::func();
    }
};
```

上面的例子就是`Derived::func`先打印自己的信息，然后调用`Base::func`

### 返回类型放宽(Relaxation of return types)

返回类型放宽指的是虚函数重写时，派生类的返回类型可以是基类返回类型的子类（仅限于指针或引用）。具体来说，如果基类虚函数的返回类型是`T*`或`T&`，那么派生类重写函数可以返回`U*`或`U&`，其中`U`是`T`的子类。这是因为派生类的返回类型`Derived*`可以安全转换为基类类型`Base*`，符合替代原则。比如下面这个例子：

```cpp
class Base{
public:
    virtual Base* clone(){
        return new Base(*this);
    }
};

class Derived:public Base{
public:
    Derivde* clone() override{
        return new Derived(*this);
    }
};

Base * ptr = new Derived();
Base * new_ptr = ptr->clone(); //返回的是 Derived*，但是存储在了Base*
```

!!! warning "注意"

    需要注意的是**只适用于指针或引用返回类型，不适用于值类型**，比如基类返回`Base`，派生类不能返回`Derived`

### Overloading and virtual functions(重载与虚函数)

!!! warning "注意"

    要注意区分overload（重载）和override（重写）

当基类有多个重载的虚函数时，派生类必须重写所有变体，否则可能导致隐藏问题，我们以下面的例子进行讲解：

```cpp
class Base{
public:
    virtual void func(){
        cout << "Base::func\n";
    }
    virtual void func(int x){
        cout << "Base::func(int)\n";
    }
};

class Derived : public Base{
public:
    void func() override{
        cout << "Derived::func()\n";
    }
    // 没有重写func(int)
};
Derived d;
d.func(5); // 这里会出错，因为func(int)被隐藏
```

这里的隐藏规则是这样的：派生类中的函数名会隐藏基类的所有同名函数（即使参数不同）；未重写的虚函数变体将无法通过派生类对象调用。

解决方法有如下两种：

1. 重写所有的重载变体，比如对于上面的`Derived`类，`void func(int x) override{cout << "Derived::func(int)\n;"}`

2. 使用`using`声明引入基类函数，如

   ```cpp
   class Derived : public Base{
   public:
       using Base::func;
       void func() override{
           cout << "Derived::func()\n";
       }
   }
   ```

!!! warning "注意"

    总结一下虚函数有以下几点注意事项：

    1. 不要重定义非虚函数：因为非虚函数是静态绑定的，重定义并不会触发多态，调用基于静态类型

    2. 不要重定义继承的默认参数值，这是因为**默认参数是静态绑定的**，基于静态类型而非动态类型，其值在编译的时候就已经确定。比如下面这个例子：

    ```cpp
    class Base {
    public:
        virtual void func(int x = 10) { cout << "Base: " << x << "\n"; }
    };
    class Derived : public Base {
    public:
        void func(int x = 20) override { cout << "Derived: " << x << "\n"; }
    };
    Base* ptr = new Derived();
    ptr->func(); // 输出：Derived: 10（默认参数来自Base）
    ```

    在上面的这个例子中，输出的值为10，尽管我们发现调用的是`Derived`函数。所以我们要**避免在虚函数中使用默认参数**，或确保基类和派生类的默认值是一致的

    3. 避免在构造函数中调用虚函数，**构造函数中调用虚函数的时候不会触发动态绑定**，而只会调用当前类的版本。这是因为对象的构造过程是分阶段的，先构造基类，再构造派生类。而**在基类构造函数执行的时候，派生类的部分尚未初始化，动态类型仍为基类**。

## Abstract Classes（抽象类）

抽象类是指至少包含一个**纯虚函数**的类，抽象类不能实例化（无法用抽象类创建对象），且派生类必须实现所有纯虚函数才能实例化（否则派生类本身也是抽象类），如：

```cpp
class Shape{
public:
    virtual void render()=0; // render()是一个纯虚函数
};
Shape s; // 这是错误的，因为抽象类Shape并不能被实例化
```

### 纯虚函数

纯虚函数是一种没有实现，仅有声明接口的虚函数，其声明如下：

```cpp
virtual void render()=0
```

也就是在一般的虚函数后面加`=0`，其强制派生类提供实现。

那么可能会有人问，为什么我们要有抽象类这个东西呢？我们以生活中的例子作说明。抽象类表示的是没有具体实例的概念，比如“形状”，这就是一个抽象的概念，我们无法在生活中找到形状这个抽象的东西对应的实体，但是具体的形状如椭圆、圆等等是存在的，这正对应着抽象类和具体的子类之间的关系。
