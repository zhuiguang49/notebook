!!! note "Tip"

    这里的一些英文术语：

    - Super class 即父类、基类

    - Sub class 即子类、派生类

## 继承的基本概念

继承是一种机制，允许一个类（派生类）基于另一个类（基类）定义其行为或实现，派生类是基类的扩展。

之前我们提到，组合表示的是"has-a"的关系，通过包含其他对象来构建新对象，而继承表示的是"is-a"关系，派生类继承基类的属性和方法，并可以添加或修改功能。

通过继承基类的接口（方法等），派生类可以扩展或重写这些接口，能够避免代码重复，提高维护性和扩展性

## 继承语法与访问控制

```c++
class Derived : [access-specifier] Base
```

C++中我们使用上述语句来定义继承关系，`Derived`是我们继承之后得到的派生类，`Base`是继承的基类，`access-specifier`是访问控制符，可以是`public`、`protected`、`private`（如果我们没有加`access-specifier`的话那么将默认为`private`继承）例如：

```c++
class Subject{/*这是基类的定义*/};
class Math : public Subject{
  /*派生类的定义*/  
};
```

回忆一下，前面在讲访问控制符的时候我们只介绍了`public`和`private`两个，这里我们将会介绍`protected`的规则：

- `public`成员对所有客户端可见，也即可以被任何代码访问
- `protected`成员对派生类和友元可见（无论继承类型是`public`、`protected`还是`private`，派生类的成员函数都可以访问基类的`protected`成员）
- `private`成员仅对类本身和友元可见，派生类和客户端代码都无法直接访问`private`成员

其中`public`继承最为常见，其保持基类的访问级别，而`protected`和`private`继承改变了成员的可见性。比如，`public`继承下，基类的`public`成员在派生类中仍然为`public`，`protected`成员仍然为`protected`，`private`成员不可见；`protected`继承下，基类的`public`成员和`protected`成员在派生类中都变为`protected`，`private`成员仍然保持不可见 ；而在`private`继承下，基类的`public`和`protected`成员在派生类中变为`private`（这里指的可见性影响的是派生类外部对基类成员的访问权限，而不是派生类本身的成员函数对基类成员的直接访问能力。）

## 继承到底继承了什么

这里我们主要讲解的是基类的哪些部分被派生类继承，继承后又有什么特性。

### 私有成员变量(Private Member Variables)

- 基类的`private`成员变量存在于派生类对象中，但是派生类无法直接访问

- 这些变量是基类子对象的一部分（不是派生类的成员），占用派生类对象的内存，但却只能通过基类的`public`或`protected`方法间接访问

!!! note "Tip"

    这里我们注意理解一下**基类子对象**和**派生类对象**这两个概念，基类子对象是派生类的子集，派生类对象包括**基类子对象**和**派生类特有成员**两部分

- 如果派生类定义了同名变量，则是独立的新变量，不会影响基类的`private`变量

下面我们来看一个实际的例子：

```cpp
class Base{
private:
    int m_value;
public:
    void set_value(int v){
        m_value = v;
    }
    int get_value() const{
        return m_value;
    }
}

class Derived : public Base{
public:
    void modify(){
        // m_value = 10 这就是错误的，因为m_value是Base的一个私有成员变量，private成员不可访问
        set_value(10); // 这是正确的，通过 public 方法访问
        std::cout << getvalue() << endl;
    }
}
```

### 公共成员函数(Public Member Functions)

- 基类的`public`成员函数被派生类继承，成为派生类的公共接口

!!! note "Tip"

    可以结合下面的例子加深对这句话的理解：

    ```cpp
    class Item{
    public:
        void print() const{
            std::cout << "Item\n";
        }
    }
    
    class CD : public Item{
        // 继承 Item::print 作为公共接口
    }

    int main(){
        CD cd;
        cd.print();   // CD类就是继承了Item的print函数，CD类的所有对象都可以直接调用print函数
        return 0;
    }
    ```

- 这些函数定义了类的行为，派生类可以直接调用或重写

### 私有成员函数(Private Member Functions)

- 基类的`private`成员函数被派生类继承（存在于派生类对象中，但不属于派生类的成员函数），但是**派生类无法直接调用**
- 私有成员函数只能通过基类的其他`public`或`protected`方法间接调用

比如我们看下面这样的例子：

```cpp
class Base{
private:
    void privateFunc(){
        std::cout << "Private\n";
    }
public:
    void callPrivate(){
        privateFunc();
    }
};
    
class Derived : public Base{
public:
    void test(){
        // privateFunc();    // 这是错误的，因为privateFunc()是基类的私有成员函数，不可以被派生类直接访问
        callPrivate(); // 这是正确的，通过public访问
    }
};
```

### `protected`类型成员变量(Protected Members)

- 基类的`protected`成员（变量或函数）被派生类继承，且派生类是可以直接访问的（我们之前提到过`protected`类型的成员变量能够被派生类和友元访问）
- `protected`成员对派生类完全可见，适合共享实现
- 在`public`继承中，`protected`成员保持`protected`；在`protected`继承中则仍然为`protected`；在`private`继承中变为`private`

### 静态成员(Static Members)

- 基类的`static`成员（变量或函数）被派生类继承，仍然是**类级成员**，不属于对象实例
- 派生类可以通过类名或对象访问基类的`static`成员，访问权限取决于继承的访问控制符`public`，`protected`，`private`等

比如下面这个例子

```cpp
class Base {
public:
    static int count;
    static void increment() { count++; }
};
int Base::count = 0;

class Derived : public Base {};

int main() {
    Derived::increment(); // 访问基类的 static 成员
    std::cout << Derived::count << "\n"; // 输出：1
    return 0;
}
```

这个例子我们需要再强调一下，`static int count`是静态成员变量的声明，在类定义中进行；而静态成员变量的定义和初始化是要在类定义之外的，这和我们之前讲静态成员变量的内容是相符合的。

其次是我们知道，静态成员是类级的成员，那么`count`和`increment`都应该是`Base`的类级成员，为什么最后使用的时候却是`Derived::increment`和`Derived::count`呢，这是因为`Derived`通过`public`继承了`Base`，也就继承了`Base`的静态成员，因此可以通过`Derived::count`和`Derived::increment`访问，但是需要注意的是，**`Derived::count`和`Base::count`实际上引用的是同一个变量**，因为静态成员变量在内存中只有一份。

!!! note "Tip"

    这里我们注意一下，我们是通过类直接访问的静态成员变量和静态成员函数，而不是先定义一个对象（类的实例），通过这个实例再访问静态成员。这当然是可以的，但是我们并不推荐，因为静态成员本身是类级成员，其不依赖对象而存在。

## 继承中的构造和析构

### 构造函数

- **基类的构造函数不会被继承**，派生类需要定义自己的构造函数

- 派生类的构造函数必须**显式地调用基类的构造函数（通过初始化列表）**来初始化基类子对象，如下面例子：

  ```cpp
  Employee::Employee(const std::srting &name, const std::string& ssn):m_name(name),m_ssn(ssn){}
  Manager::Manager(const std::string&names, const str::string &ssn,const std::string& title):Employee(name,ssn),m_title(title){}
  ```

- 在创建派生类对象时，**基类的构造函数总是先于派生类的构造函数调用**。初始化列表确保了基类子对象会在派生类之前构造。

  如果派生类的构造函数没有显式调用基类的构造函数，编译器会自动调用基类的**默认构造函数**。如果基类没有默认构造函数，则派生类必须显式调用基类的构造函数，否则会产生编译错误。

  初始化列表中指定基类构造函数的位置并不会影响其被调用的顺序，无论基类构造函数在初始化列表中的位置如何，编译器都会首先调用基类的构造函数来初始化基类子对象，然后按照它们在类中声明的顺序依次初始化成员变量，而不是依赖于成员变量在初始化列表中出现的先后顺序

### 析构函数

- **析构函数不会被派生类继承**
- 析构函数的调用顺序与构造函数完全相反，我们知道构造函数是先调用基类的构造函数，在调用派生类的构造函数；对于析构函数来说则是**先调用派生类的析构函数，清理派生类特有的成员，再调用基类的析构函数，清理基类的部分**。

## Name Hiding（名称隐藏）

`Name Hiding`反映的是这样一种情况：在C++继承中，如果派生类中定义了一个与基类同名的成员函数（即使参数列表不同），基类中所有同名的重载函数都会在派生类中变得不可访问。

`Name Hiding`是C++作用域规则的结果，派生类的作用域会“遮挡”基类的同名函数，这是因为编译器在解析函数调用的时候，会优先在派生类的作用域中查找匹配的函数名，如果找到了同名函数，将不会继续查找基类的作用域，即使基类的函数有匹配的重载版本。

!!! note "Tip"

    重用总结：

    **Reusing the implementation（代码重用，通过组合实现）**：

    组合是一种实现代码重用的方式，允许新对象利用已有对象的实现，而无需重复编写代码

    **Reusing the interface（接口重用，通过继承实现）**：

    继承允许派生类复用基类的接口（方法签名），并根据需要定制实现，从而实现代码的灵活性和可扩展性