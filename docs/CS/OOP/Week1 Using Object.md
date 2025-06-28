## Format output

- 首先需要使用`<iomanip>`库，即`#include<iomanip>`

- `std::setw`用于设置输出字段的宽度，这只影响紧随其后的输出操作，例如

  ```c++
  std::cout << std::setw(10) << 42 <<std::endl;  // "        42"(加上42总共宽度为10)
  //下一个输出不受影响
  std::cout << 12 << std::endl                            // "42"
  ```

- `std::setprecision`用于设置浮点数的精度，与`std::fixed`一起使用时用于指定小数点后的位数；单独使用时用于指定有效数字总数

  ```c++
  double value = 123.456789
  std::cout << std::setprecision(4) << value << std::endl;                     // "123.5"
  std::cout << std::fixed << std::setprecision(2) << vlaue << std::endl // "123.46"
  ```

- `std::setfill`用于设置填充字符，与`std::setw`一起使用时特别有用：

  ``` c++
  // 默认填充字符是空格
  std::cout << std::setw(10) << 42 << std::endl;                        // "        42"
  std::cout << std::setw(10) << std::setfill('*') << 42 << std::endl // "********42"
  ```

## String类

需要先包含string类的头文件：`#<include string>`

### Input and Output

如果是想要读一个字符串。可以使用`cin/cout`即

```c++
cin >> str;
cout << str;
```

如果想要读取一整行（包含空格），则需要`getline(cin,str)`或者`getline(cin,str, ',')`表示读取直到遇到','就停止

我们通常还会清除之前可能留在缓冲区的换行符，用到`std::cin.ignore(std::numeric_limits<std::streamsize>::max(),'\n')`

```c++
std::string str;
// 清除之前可能留在缓冲区的换行符
std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); //numeric_limits<streamsize>::max()：设置最大忽略字符数，'\n'：指定终止字符为换行符（\n）。当遇到换行符时，忽略操作会停止。
std::getline(std::cin,str) // 读取整行文本到string类型变量str中
```

如果想要从文件中读取一行字符串，则需要先用`std::ifstream inputFile('example.txt')`打开文件，然后逐行读取`std::getline(inputFile,str`，下面举一个具体的例子：

```c++
 // 打开文件
std::ifstream inputFile("example.txt");
    
// 检查文件是否成功打开
if (!inputFile.is_open()) {
    std::cerr << "无法打开文件!" << std::endl;
    return 1;
}
    
// 逐行读取
std::string line;
while (std::getline(inputFile, line)) {
    // 处理每一行
    std::cout << "读取的行: " << line << std::endl;
}
    
// 关闭文件
inputFile.close();
```

### create a string

 ```c++
 string(const char *p,int len);
 string(const string & s2,int pos);
 string(const string & s3,int pos, int len);
 ```

### 一些字符串函数

Sub-string

- `substr(int pos,int len)`

Alter string

- `insert(size_t pos,const string&s);`
- `erase(size_t pos = 0, size_t len = npos);`
- `append(const string& str);`
- `replace(size_t pos, size_t len, const string &str);`

Search String

- `size_t find(const string& str, size_t pos = 0) const`，这里我们介绍一下，find函数的返回类型是`size_t`，所以如果没有找到，返回值是`string::npos`而非`-1`。两个参数分别表示要找的字符串，以及开始查找的位置，函数最后的`const`后缀表示这个方法不会修改调用它的字符串对象，举一个具体的使用例子

  ```c++
  size_t pos1 = text.find("Hello")
  ```

   
