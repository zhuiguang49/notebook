One thing that we would not have been able to easily do when using arrays is to change the number of objects after the simulation had begun. This is because arrays have a fixed size in Java that can never change.

An alternative approach would have been to use a list type. While Java have built-in List type, we're going to eschew using it right now but build our own list from scratch instead.

## IntList

The courses first introduce a class `IntList` as follows:

```java
public class IntList{
    public int first;
    public Intrest rest;
    
    public IntList(int f, IntList r){
        first = f;
        rest = r;
    }
}
```

If you have learnt List in C, you may find that is kind of different from the mode in C, which is based on the ListNode, while the IntList here is a naked recursive data structure. Without doubt it is fairly awkward to use, resulting in code that is hard to read and maintain. To use `IntList` correctly, the programmer must understand and utilize recursion even for simple list related tasks, which limits its usefulness to novice programmers, and may introduces tricky errors

So the lec wants to build a new class `SLList`,which much more closely resembles the list implementations that programmers use in modern languages.

## SLLists

### Improvement1 Rebranding

Just introduce class IntNode and make it the basic.

```java
public class IntNode{
    public int item;
    public IntNode next;
    
    public IntNode(int i,IntNode n){
        item = i;
        next = n;
    }
}
```

### Improvement2 Bureaucracy

create a separate class called `SLList` that we user will interact with:

```java
public class SLList{
    public IntNode first;
    
    public SLList(int x){
        first = new IntNode(x,null);
    }
}
```

Just compare the creation of an `IntList` of one item to the creation of a `SLList` of one item `IntList L1 = new IntList(5,null)`，`SLList L2 = new SLList(5)` 

We can see that the `SLList` hides the detail that there exists a null link from the user. We can add some help method such as `addFirst` , `getFirst` and so on.

```java
// Adds an item to the front of the list
public void addFirst(int x){
    first = new IntNode(x,first);
}

// Retrieves the front item from the list
public int getFirst(){
    return first.item;
}
```

In fact, the `SLList` class acts as a middleman between the list user and the naked recursive data structure.



### Improvement3 Public vs. Private

!!! note "Tip"

    similar to access specifiers in C++

Private variables and methods can only be accessed by code inside the same `.java` file. That means the class below will fail to compile, yielding a `first has private access in SLList` error

```java
public class SLLTroubleMaker{
    public static void main(String[] args){
        SLList L = new SLList(15);
        L.addFirst(10);
        L.first.next.next = L.first.next;
    }
}
```

By contrast, any code inside the file will be able to access the `first` variable.

It may seem a little silly to restrict access for the only thing that the `private` keyword does is break programs that otherwise compile. However, in large software engineering projects, the `private` keyword is an invaluable signal that certain pieces of code should be ignored(and thus need not to be understood) by the end user. Likewise, the `public` keyword should be thought of as a declaration that a method is available and will work forever exactly as it does now.

**When you create a `public` member(method or variable), you should be careful because you're effectively committing to supporting that member's behavior exactly as it is now, forever.**



### Improvement4 Nested Classes

In the previous code, the professor got tow `.java` files: `IntNode` and `SLList`, while `IntNode` is just a supporting character in the story of `SLList`. Java allows us to embed a class declaration inside of another for just this situation. The syntax is straightforward and intuitive:

```java
public class SLList{
    public class IntNode{
        public int item;
        public IntNode next;
        public IntNode(int i, IntNode n){
            item = i;
            next = n;
        }
    }
    
    private IntNode first;
    
    public SLList(int x){
        first = new IntNode(x,null);
    }
}
```

Having a nested class has no meaningful effect on code performance, and is simply a tool for keeping code organized.

What's more, if the nested class has no need to use any of the instance methods or variables of `SLList`, we may declare the nested class `static` as follows:

```java
public class SLList{
    public static class IntNode{
        public int item;
        public IntNode next;
        public IntNode(int i, IntNode n){
            item = i;
            next = n;
        }
    }
    
    private IntNode first;
    ...
}
```

Declaring a nested class as `static` means that methods inside the static class can not access any of the members of the enclosing class(外部类). In this case, it means that no method in `IntNode` would be able to access `first`, `addFirst`, `getFirst`.

This can save a bit of memory for each `IntNode` no longer needs to keep track of how to access its enclosing `SLList`.

!!! note "Tip"

    在 Java 中，当一个类（如`IntNode`）嵌套在另一个类（如`SLList`）内部且**非静态**时，每个`IntNode`实例都会隐式持有一个指向其外部`SLList`实例的引用，以便在需要时访问外部类的成员（变量或方法）。

    而当`IntNode`被声明为`static`时，它与外部`SLList`类的关联被解除，不再需要持有这个指向外部类实例的引用。由于`IntNode`的功能仅涉及自身的`item`和`next`，完全不需要访问`SLList`的成员（如`first`或`size`），这个引用就成了多余的。因此，声明为`static`后，每个`IntNode`实例会减少这部分引用所需的内存开销，从而 “节省一点内存”。

We can also add `addLast(int x)` and `size()` methods as follows:

```java
public void addLast(int x){
    IntNode p = first;
    
    while(p.next != null){
        p=p.next;
    }
    
    p.next = new IntNode(x,null);
}

public static int size(IntNode p){
    int size = 0;
    IntNode temp = p;
    while(temp != null){
        size += 1;
        temp = temp.next;
    }
    return size;
}
```

### Improvement5 Caching（缓存）

But the `size` method is very slow for large lists, which is unacceptable. It is possible to rewrite the `size` so that it takes the same amount of time, no matter how large the list is. The solution in this lesson is to simply add a `size` variable to the `SLList` class that tracks the current size（a little beyond my expectation, cause I assumed which would be a ingenious method）. This practice of saving important data to speed up retrieval（检索） is sometimes known as **caching**（缓存）.

```java
public class SLList{
    ... // IntNode declaration omitted
    private IntNode first;
    private int size;
    
    public SLList(int x){
        first = new IntNode(x,null);
        size = 1;
    }
    
    public void addFirst(int x){
        first = new IntNode(x,first);
        size += 1;
    }
    
    public int size(){
        return size;
    }
    ...
        
    // we update "size" each time we revise or create the SLList
}
```

This modification makes our `size` method incredibly fast. Of course, it will also slow down our `addFirst` and `addLast` methods, and also increase the memory of usage of our class, but only by a trivial amount. In this case, the tradeoff is clearly in favor of creating a cache for size.

Another natural advantage is that we will be able to easily implement a constructor that creates an empty list.(Just set `first` to `null` if the list is empty)

```java
public SLList(){
    first = null;
    size = 0;
}
```

**Unfortunately, there is a subtle fault that we may neglect.** In `addLast` method, when `first` is `null`, the attempt to access `p.next` in `while(p.next != null)` causes a null pointer exception. So how can we fix the bug, the answer is improvement 6—— Sentinel Nodes（哨兵节点）

### Improvement6 Sentinel Nodes（哨兵节点）



























