组合是一种`"has-a"`关系，通过将现有的对象嵌入到新对象中来重用代码，每个对象拥有自己的内存，又包含其他对象。

组合的实现方式有两种：

- **完全嵌入(Fully)：** 子对象作为新对象的一部分，构造和析构也是由新对象自动管理的
- **引用嵌入(By Reference)：** 子对象通过引用或指针包含，需要手动管理构造和析构，适用于逻辑关系不完全、动态分配或大小未知的场景 

我们可以看一个组合的例子：

```cpp
class Person{...};
class Currency{...};
class SavingAccount{
public:
    SavingsAccount(const char* name, const char* address, int cents);
    ~SavingAccount();
    void print();
private:
    Person m_saver;
    Currency m_balance;
};
```

这个例子中`SavingsAccount`类就是通过嵌入`Person`和`Currency`对象来实现组合的

## 嵌入对象(Embedded objects)

### 嵌入对象的初始化

- 所有嵌入对象在构造新对象的时候都会被自动初始化
- 如果没有为嵌入对象提供构造函数的参数（外层类的构造函数中没有使用**初始化列表**来为嵌入对象制定构造参数），且嵌入对象的类有默认构造函数（或可以自动生成默认构造函数），则会调用默认构造函数（如果有的话）
- 嵌入对象的初始化是由编译器自动管理的，无需手动调用

### 初始化列表

- 构造函数可以使用初始化列表来为嵌入对象提供构造参数
- 初始化列表是可选的，可以包含任意数量的嵌入对象，用逗号分隔
- 初始化列表的作用是在对象构造时直接传递参数给嵌入对象的构造函数，避免先调用默认构造函数再赋值的低效操作

我们分别举两个例子：

**调用默认构造函数的情况：**

```cpp
class Person {
public:
    void set_name(const char* name) { /* 设置姓名 */ }
    void set_address(const char* address) { /* 设置地址 */ }
};

class SavingsAccount {
public:
    SavingsAccount(const char* name, const char* address, int cents) {
        m_saver.set_name(name);    // 赋值
        m_saver.set_address(address); // 赋值
        m_balance.set_cents(cents);   // 赋值
    }
private:
    Person m_saver;
    Currency m_balance;
};
```

在上面的例子中，我们在`SavingsAccount`类的构造函数中并没有使用初始化列表来为`m_saver`和`m_balance`赋值，那么`m_saver`和`m_balance`就会在构造`SavingsAccount`时调用它们的默认构造函数，然后在构造函数体内再通过`set_name`和`set_address`方法赋值来修改对象的状态。（先调用默认构造函数构造出嵌入对象，然后再对嵌入对象的成员变量等进行赋值。需要强调的是，在构造函数体内的是**赋值操作，不是初始化**，**初始化只发生在初始化列表或编译器自动调用默认构造函数的时候！！**，在C++中，**对象成员在进入宿主构造函数体之前必须完成初始化**。）

**在初始化列表中提供参数的情况：**

```cpp
class SavingsAccount{
public:
    SavingsAccount(const char* name, const char *address, int cents):m_saver(name,address),m_balance(0,cents){
        
    }
private:
    Person m_saver;
    Currency m_balance;
}
```

在这个了例子中，初始化列表`m_saver(name,address)`就是直接调用`Person`的构造函数，并传递了`name`和`address`参数；而`m_balance(0,cents)`则是调用`Currency`的构造函数，传递`0`和`cents`参数；嵌入对象`m_saver`和`m_balance`在构造时直接根据提供的参数初始化，而不是先调用默认构造函数。

!!! warning "注意"

    初始化列表提供参数的顺序并不会影响嵌入对象构造的顺序，**嵌入对象构造的顺序是由它们在类中声明的顺序决定的**，比如：

    ```cpp
    class SavingsAccount {
    public:
        SavingsAccount(const char* name, const char* address, int cents)
            : m_saver(name, address), m_balance(0, cents) {}
    private:
        Person m_saver;    // 声明顺序：第一个
        Currency m_balance; // 声明顺序：第二个
    };
    ```

    无论初始化列表写成：`m_saver(name, address), m_balance(0, cents)`还是`m_balance(0, cents), m_saver(name, address)`，构造顺序总是先构造`m_saver`，然后再构造`m_balance`

### 嵌入对象的析构

- 当包含嵌入对象的外层对象被销毁时，嵌入对象的析构函数会被自动调用
- 析构过程也是由编译器管理的，我们无需显式地调用嵌入对象的析构函数



一般来说，**嵌入对象我们通常声明为`private`**，不过如果我们希望嵌入对象的整个公共接口都直接对外部可用的话，也可以将嵌入对象声明为`public`

## 完全嵌入(Fully)与引用嵌入(by reference)的比较

### 完全嵌入

嵌入对象是外层对象的一部分，存储在同一块内存中，并且与外层对象紧密绑定，生命周期由外层对象完全管理，所以它的构造和析构都是自动管理的，其内存也与外层对象一起分配，固定且静态，适用于这些场景：嵌入对象是外层对象不可分割的一部分、嵌入对象的大小在编译时已知、需要强生命周期管理

### 引用嵌入

嵌入对象存储在其他地方（通过指针或引用指向外部对象），外层对象仅持有对嵌入对象的引用，不直接拥有其内存，所以我们需要手动地去管理它的构造和析构。除此之外，引用的对象可以动态分配，可以指向已经存在的对象，比较灵活。多个外层对象也可以引用同一个嵌入对象。适用于以下场景：嵌入对象不完全属于外层对象，可能被其他对象共享；嵌入对象的大小在编译的时候是未知的；嵌入对象需要再运行时动态分配或链接

!!! note "Tip"

    有意思的是，其他面向对象语言，诸如Python、Java等等通常都是只使用引用嵌入的
