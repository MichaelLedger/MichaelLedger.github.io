# iOS 启动优化

## 前言

作为开发人员，启动是App给用户的第一印象，对用户体验至关重要。任何开发的APP的业务迭代迅速，如果放任不管，启动速度会一点点劣化。为此iOS客户端团队做了大量优化工作，除了传统的修改业务代码方式，我们还做了些开拓性的探索，首先我们需要考虑的是，应用启动分为2种情况：

冷启动：指 app 被后台杀死后，在这个状态打开 app，这种启动方式叫做冷启动,根据测试结果并非是杀掉进程后直接启动，需要先开启5-10个应用后或者重启设备，然后在启动应用，才会完全冷启动

热启动：指 app 没有被后台杀死，仍然在后台运行，通常我们再次去打开这个 app，这种启动方式叫热启动。

而作为开发人员我们主要要做的启动优化，主要分为2种情况：

mian函数之后优化 & main函数之前优化

***

## main()方法调用前
启动过程大体分为如下步骤:

先是LLVM把项目翻译成IR文件然后到backend

LLVM clang

pre-main

main

binding – 符号绑定

rebase – 指针修复 （iOS14.3引进ASLR‘地址空间随机化’解决了虚拟内存从0开始的问题，物理内存地址随机 – 内存不够用’通过写入物理内存，使用时再从物理内存中读取‘ ）

MMU 内存管理单元 – 翻译地址 – page（页）

1、内核加载可执行文件

2、load dylibs image (加载程序所需的动态库镜像文件)

3、Rebase image / Bind image (由于ASLR(address space layout randomization)的存在，可执行文件和动态链接库在虚拟内 存中的加载地址每次启动都不固定，所以需要修复镜像中的资源指针)

4、Objc setup (注册Objc类、将Category中的方法插入方法列表)

5、initializers (调用Objc类的+load()方法、调用C++类的构造函数)

针对APP启动时间的优化还是很有必要的。

关于APP启动时间的分析和优化可以以main()为分界点，分为main()方法执行之前的加载时间(pre-main time)和main()之后的加载时间。

那么，如何定量的测量这两个阶段具体的执行时间呢，下面先给出测量方法，看一下自己项目启动时间是否合理：

**Xcode15可以通过 Instruments/App Launch 进行分析**

在Xcode中添加环境变量参数 `DYLD_PRINT_STATISTICS` 即可,这样运行APP时在控制台就会打印出pre-main花费的时间
如果想打印详细的pre-main中各个过程花费的时间，可以再添加一个 `DYLD_PRINT_STATISTICS_DETAILS` 参数

pre-main time和total time的值不一样，其实下边的total time - debugger pause time就和上边的pre-main time大

（PS：因为iOS13之后就失效了，这两个属性所以使用时需要使用一个iOS13以下的模拟器）

如果你想打印dyld装载动态库的顺序，可以设置这个环境变量 DYLD_PRINT_LIBRARIES。

main()方法调用之前启动过程的解析：

App开始启动后，系统内核(XNU)首先加载可执行文件（自身App的所有.o文件的集合），然后加载动态链接器dyld，dyld是一个专门用来加载动态链接库的库。 执行从dyld开始，dyld从可执行文件的依赖开始, 递归加载所有的依赖动态链接库。

（补充：用户点击图标之后，会发送一个系统调用 execve 到内核，内核创建进程。接着会把主二进制 mmap 进来，读取 load command 中的 LC_LOAD_DYLINKER，找到 dyld 的的路径。然后 mmap dyld 到虚拟内存，找到 dyld 的入口函数_dyld_start(最终调到dyld的_main函数)，把 PC 寄存器设置成_dyld_start，接下来启动流程交给了 dyld。）

动态链接库包括：iOS 中用到的所有系统 framework，加载OC runtime方法的libobjc，系统级别的libSystem，例如libdispatch(GCD)和libsystem_blocks (Block)。

### 优化动作

1、减少动态库的引用，将项目中不使用的Framework及时删除，将Xcode配置中General -> Linked Frameworks and Libraries中使用不到的系统库不再引用。(能合并的，可以尽量合并，苹果建议不要超过6个)

2、合并动态库。

3、尽量不使用内嵌（embedded）的dylib，加载内嵌dylib性能开销较大。

4、清理项目中冗余的类、category。对于同一个类有多个category的，建议进行合并。

5、将不必须在+load方法中做的事情延迟到+initialize中。尽量减少load 可修改为initalizer中+单例方式进行加载

6、尽量不要用C++虚函数(创建虚函数表有开销)，不要在C++构造函数中做大量耗时操作。

7、减少oc类，2万个类会增加800mm，这里的优化时间比较小，但是可以考虑将弃用类(每个工程总有一些迭代，但是已经弃用未删除的代码) 最好找工具删除没有用到的类、没有被调用的函数、没有被使用的图片资源（**删除须谨慎操作，人工审核!!!**）

8、swift比oc效率高,可以尝试用swift替换OC，老工程就不建议了

9、这里还有一个很牛逼的优化二进制重排，在链接阶段(编译期间)有这么个优化

## Detect unused methods by Xcode
Target -> Build Settings
- Apple Clang - Warning - All languages
Unused Functions/Labels/Parameters/Values/Variables
- Static Analysis - Issues - Objective-C
Unused Ivars
- Static Analysis - Issues - Unused Code
Dead Stores
Redundant Expressions
Redundant Nested 'if' Conditions

### Treating Warnings as Errors
Many developers prefer to instruct the compiler to treat warnings as errors as it prohibits a successful build if even a single warning remains unaddressed. To do this, in Xcode, check the corresponding check box in the build settings or include -Werror in your Other C Flags.

**Personally, I don’t use this setting because I find it sucks during development.** Warnings like “unused variable” that are perfectly fine during debugging cause more work than they should if you treat them as errors. That does not mean, however, that I tolerate unaddressed warnings in “real” builds. Activating -Werror only for release builds and on your continuous integration server (if you have one) is a good compromise.

Note that there is also -Werror=foo (lets you only treat specific warnings as errors) and -Wno-error=foo (treats specific warnings as simple warnings instead of errors if -Werror is enabled) for even more fine-grained control.

## 二进制重排

首先二进制重排Xcode给我们提供了一种方法，xcode中使用的链接器为LD，ld中有个文件叫做order_file,如果有一个order文件，将符号顺序写入在order文件，Xcode就会将按照order中的顺序进行排列。

通过创建.order 文件 与项目进行绑定，使APP启动的时候能够按照我们制定的内容把我们需要的符号排在前面， 减少我们的程序启动过程中page fault的次数，从而减少启动时间。至于怎么才能知道要优化正确的顺序呢?

**clang插桩**

方法:
通过在viewcontroller页面中重写方法并打印出 `__fun__`
```
void __sanitizer_cov_trace_pc_guard(uint32_t *guard) {

        if (!*guard) return;
            //可以根据函数找到对应符号的名称和地址。
    void *PC = __builtin_return_address(0);
    Dl_info info;
    dladdr(PC, &info);
    NSLog(@"\n dli_sname=%s",info.dli_sname);
}
```
系统会先在__sanitizer_cov_trace_pc_guard_init返回编译的文件个数，每次调用方法都会经过__sanitizer_cov_trace_pc_guard的回调方法，通过这里打印出来的先后顺序再到.order指定加载的顺序就可以搞掂二进制重排，通过把需要调用的类的方法优先加载好继而提高了APP的启动速度。
***
## 编译原理：LLVM初步介绍

> The LLVM Project is a collection of modular and reusable compiler and toolchain technologies.

LLVM是编译器工具链技术的一个集合，包括：

编译器前端：词法分析，语法分析，语义分析，生成中间代码。

优化器：**中间代码（Intermediate Representation, IR）**优化。

编译器后端：生成对应架构平台的机器码。如x86，ARM等。

一些工具：

编译器llc：对每个文件进行编译，生成Mach-O可执行文件。

链接器lld：将每个Mach-O文件合并成一个，将符号绑定到地址上。lld即LLVM的内置链接器。

![编译器架构](../image/developer/llvm_architecture.png)

**M1芯片介绍**

在PC领域，苹果在2005年之前采用IBM PowerPC芯片，从2005-2020年采用Intel x86芯片，2020年双十一则新发布了苹果M1芯片。M1是一款基于ARM架构的苹果自研芯片。

苹果新的M1芯片是一个完整的系统级芯片（SoC），采用了统一内存架构，将CPU、GPU、神经引擎（Neural Engine）、缓存、DRAM内存全部通过Fabric高速总线连接在一起，可带来足够高的带宽、足够低的延迟。官方称M1的CPU性能和GPU性能比之前的笔记本芯片都要快。

**LLVM特点（VS GCC）**

模块化

统一的中间代码IR，而前端、后端可以不一样。而GCC的前端、后端耦合在了一起，所以支持一门新语言或者新的平台，非常困难。

功能强大的Pass系统，根据依赖性自动对Pass（包括分析、转换和代码生成Pass）进行排序，管道化以提高效率。

### LLVM的主要子项目

|项目名称|描述|
| - | - |
| LLVM Core | 包含一个源代码和目标架构无关的独立配置器，一个针对很多主流(甚至于一些非主流)的CPU的汇编代码生成支持。这些核心库围绕IR来构建。 |
|Clang|一个C/C++/Objective-C编译器，提供高效快速的编译效率，风格良好、极其有用的错误和警告信息。|
|LLDB|基于LLVM提供的库和Clang构建的优秀的本地调试器。原生支持调试多线程程序。|
|LLD|clang/llvm内置的链接器|
|dragonegg|gcc插件，可将GCC的优化和代码生成器替换为LLVM的相应工具。|
|libc++, libc++ ABI|符合标准的，高性能的C++标准库实现，以及对C++11的完整支持。|
|compiler-rt|为动态测试工具（如AddressSanitizer，ThreadSanitizer，MemorySanitizer和DataFlowSanitizer）提供了运行时库的实现。为像“__fixunsdfdi”这样的低级代码生成器支持进程提供高层面的调整实现，也提供当目标没有用于实现核心IR操作的短序列本机指令时生成的其他调用。|
|OpenMP|提供一个OpenMP运行时，用于Clang中的OpenMP实现。|
|vmkit|基于LLVM的Java和.NET虚拟机实现。|
|polly|支持高级别的循环和数据本地化优化支持的LLVM框架，使用多面体模型实现一组缓存局部优化以及自动并行和矢量化。|
|libclc|OpenCL(开放运算语言)标准库的实现.|
|klee|基于LLVM编译基础设施的符号化虚拟机。它使用一个定理证明器来尝试评估程序中的所有动态路径，以发现错误并证明函数的属性。 klee的一个主要特性是它可以在检测到错误时生成测试用例。|
|SAFECode|用于C / C ++程序的内存安全编译器。 它通过运行时检查来检测代码，以便在运行时检测内存安全错误（例如，缓冲区溢出）。 它可用于保护软件免受安全攻击，也可用作Valgrind等内存安全错误调试工具。|

### 其他领域的编译器
#### GCC
GCC（GNU Compiler Collection，GNU编译器套装），是一套由 GNU 开发的编程语言编译器。它是一套以 GPL 及 LGPL 许可证所发行的自由软件，也是 GNU计划的关键部分，亦是自由的类Unix及苹果电脑 Mac OS X 操作系统的标准编译器。

GCC 原名为 GNU C 语言编译器，因为它原本只能处理 C语言。GCC 很快地扩展，变得可处理 C++。之后也变得可处理 Fortran、Pascal、Objective-C、Java, 以及 Ada与其他语言。

#### Android NDK(Native Development Kit)
Android NDK(Native Development Kit)。如Dart虚拟机，会在设备中生成JIT编译优化的本地代码。iOS上，Dart代码则由LLVM编译来成为本地可执行文件（AOT）。

### iOS相关

#### clang

clang只是LLVM的一种编译器前端而已，支持C/C++/OC。

```
C/C++/OC --- clang  --- 优化器 --- 后端 --- Machine Code
Swift    --- Swiftc --- 优化器 --- 后端 --- Machine Code
```
![OC->MachO](../image/developer/compile_oc_to_mach_o.png)

1、编译阶段

`clang -ccc-print-phases main.m`

结果：
```
0: input, "main.m", objective-c
1: preprocessor, {0}, objective-c-cpp-output
2: compiler, {1}, ir
3: backend, {2}, assembler // 生成汇编程序 .S文件
4: assembler, {3}, object
5: linker, {4}, image
6: bind-arch, "x86_64", {5}, image
```

2、预处理（preprocessor）过程
`clang -E main.m`
结果：
```
......
......
......
__attribute__((visibility("default"))) __attribute__((availability(macosx,introduced=10_8)))
@interface NSUserAutomatorTask : NSUserScriptTask {
    @private
    NSDictionary *_variables;
}


@property (nullable, copy) NSDictionary<NSString *, id> *variables;


typedef void (^NSUserAutomatorTaskCompletionHandler)(id _Nullable result, NSError * _Nullable error);
- (void)executeWithInput:(nullable id <NSSecureCoding>)input completionHandler:(nullable NSUserAutomatorTaskCompletionHandler)handler;

@end
#pragma clang assume_nonnull end
# 181 "/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.14.sdk/System/Library/Frameworks/Foundation.framework/Headers/Foundation.h" 2 3



# 1 "/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.14.sdk/System/Library/Frameworks/Foundation.framework/Headers/FoundationLegacySwiftCompatibility.h" 1 3
# 185 "/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.14.sdk/System/Library/Frameworks/Foundation.framework/Headers/Foundation.h" 2 3
# 2 "main.m" 2

int main(int argc, char *argv[]) {
    int a = 1;
    int b = 2;
    int c = a + b + 3;
    return 0;
}
```

将 `#include`, `@import`，`#import` 引入，引入头文件内容，宏定义的代码替换，条件编译（`#ifdef`），删除注释等。

3、词法分析，生成Token
将代码分解，生成一个个 Token。Token是代码的最小单元。
`clang -fmodules -E -Xclang -dump-tokens main.m`
Token类型包括：关键字，标识符，字面量，特殊符号。
结果：
```
annot_module_include '#import <F'        Loc=<main.m:1:1>
int 'int'     [StartOfLine]    Loc=<main.m:5:1>
identifier 'main'     [LeadingSpace]    Loc=<main.m:5:5>
l_paren '('        Loc=<main.m:5:9>
int 'int'        Loc=<main.m:5:10>
identifier 'argc'     [LeadingSpace]    Loc=<main.m:5:14>
comma ','        Loc=<main.m:5:18>
char 'char'     [LeadingSpace]    Loc=<main.m:5:20>
star '*'     [LeadingSpace]    Loc=<main.m:5:25>
identifier 'argv'        Loc=<main.m:5:26>
l_square '['        Loc=<main.m:5:30>
r_square ']'        Loc=<main.m:5:31>
r_paren ')'        Loc=<main.m:5:32>
l_brace '{'     [LeadingSpace]    Loc=<main.m:5:34>
identifier 'printf'     [StartOfLine] [LeadingSpace]    Loc=<main.m:6:5>
l_paren '('        Loc=<main.m:6:11>
string_literal '"这是一个main方法"'        Loc=<main.m:6:12>
r_paren ')'        Loc=<main.m:6:36>
semi ';'        Loc=<main.m:6:37>
int 'int'     [StartOfLine] [LeadingSpace]    Loc=<main.m:7:5>
identifier 'a'     [LeadingSpace]    Loc=<main.m:7:9>
equal '='     [LeadingSpace]    Loc=<main.m:7:11>
numeric_constant '1'     [LeadingSpace]    Loc=<main.m:7:13>
semi ';'        Loc=<main.m:7:14>
int 'int'     [StartOfLine] [LeadingSpace]    Loc=<main.m:8:5>
identifier 'b'     [LeadingSpace]    Loc=<main.m:8:9>
equal '='     [LeadingSpace]    Loc=<main.m:8:11>
numeric_constant '2'     [LeadingSpace]    Loc=<main.m:8:13>
semi ';'        Loc=<main.m:8:14>
int 'int'     [StartOfLine] [LeadingSpace]    Loc=<main.m:9:5>
identifier 'c'     [LeadingSpace]    Loc=<main.m:9:9>
equal '='     [LeadingSpace]    Loc=<main.m:9:11>
identifier 'a'     [LeadingSpace]    Loc=<main.m:9:13>
plus '+'     [LeadingSpace]    Loc=<main.m:9:15>
identifier 'b'     [LeadingSpace]    Loc=<main.m:9:17>
plus '+'     [LeadingSpace]    Loc=<main.m:9:19>
numeric_constant '3'     [LeadingSpace]    Loc=<main.m:9:21 <Spelling=main.m:3:19>>
semi ';'        Loc=<main.m:9:30>
return 'return'     [StartOfLine] [LeadingSpace]    Loc=<main.m:12:5>
numeric_constant '0'     [LeadingSpace]    Loc=<main.m:12:12>
semi ';'        Loc=<main.m:12:13>
r_brace '}'     [StartOfLine]    Loc=<main.m:13:1>
eof ''        Loc=<main.m:13:2>
```

4、语法分析，生成语法树AST
验证语法正确性，将所有Token组成AST抽象语法树。
`clang -fmodules -fsyntax-only -Xclang -ast-dump main.m`
根据上边的Token，生成的AST格式如下：
```
TranslationUnitDecl 0x7fe4d90052e8 <<invalid sloc>> <invalid sloc>
|-TypedefDecl 0x7fe4d9005b80 <<invalid sloc>> <invalid sloc> implicit __int128_t '__int128'
| `-BuiltinType 0x7fe4d9005880 '__int128'
|-TypedefDecl 0x7fe4d9005be8 <<invalid sloc>> <invalid sloc> implicit __uint128_t 'unsigned __int128'
| `-BuiltinType 0x7fe4d90058a0 'unsigned __int128'
|-TypedefDecl 0x7fe4d9005c80 <<invalid sloc>> <invalid sloc> implicit SEL 'SEL *'
| `-PointerType 0x7fe4d9005c40 'SEL *' imported
|   `-BuiltinType 0x7fe4d9005ae0 'SEL'
|-TypedefDecl 0x7fe4d9005d58 <<invalid sloc>> <invalid sloc> implicit id 'id'
| `-ObjCObjectPointerType 0x7fe4d9005d00 'id' imported
|   `-ObjCObjectType 0x7fe4d9005cd0 'id' imported
|-TypedefDecl 0x7fe4d9005e38 <<invalid sloc>> <invalid sloc> implicit Class 'Class'
| `-ObjCObjectPointerType 0x7fe4d9005de0 'Class' imported
|   `-ObjCObjectType 0x7fe4d9005db0 'Class' imported
|-ObjCInterfaceDecl 0x7fe4d9005e88 <<invalid sloc>> <invalid sloc> implicit Protocol
|-TypedefDecl 0x7fe4d98555e8 <<invalid sloc>> <invalid sloc> implicit __NSConstantString 'struct __NSConstantString_tag'
| `-RecordType 0x7fe4d9855400 'struct __NSConstantString_tag'
|   `-Record 0x7fe4d9005f50 '__NSConstantString_tag'
|-TypedefDecl 0x7fe4d9855680 <<invalid sloc>> <invalid sloc> implicit __builtin_ms_va_list 'char *'
| `-PointerType 0x7fe4d9855640 'char *'
|   `-BuiltinType 0x7fe4d9005380 'char'
|-TypedefDecl 0x7fe4d9855948 <<invalid sloc>> <invalid sloc> implicit __builtin_va_list 'struct __va_list_tag [1]'
| `-ConstantArrayType 0x7fe4d98558f0 'struct __va_list_tag [1]' 1
|   `-RecordType 0x7fe4d9855770 'struct __va_list_tag'
|     `-Record 0x7fe4d98556d0 '__va_list_tag'
|-ImportDecl 0x7fe4d99008f8 <main.m:1:1> col:1 implicit Foundation

这里才是main函数

|-FunctionDecl 0x7fe4d9900ba8 <line:5:1, line:13:1> line:5:5 main 'int (int, char **)'
| |-ParmVarDecl 0x7fe4d9900948 <col:10, col:14> col:14 argc 'int'
| |-ParmVarDecl 0x7fe4d9900a60 <col:20, col:31> col:26 argv 'char **':'char **'
| `-CompoundStmt 0x7fe4d9901518 <col:34, line:13:1>
|   |-CallExpr 0x7fe4d9901170 <line:6:5, col:36> 'int'
|   | |-ImplicitCastExpr 0x7fe4d9901158 <col:5> 'int (*)(const char *, ...)' <FunctionToPointerDecay>
|   | | `-DeclRefExpr 0x7fe4d9901088 <col:5> 'int (const char *, ...)' Function 0x7fe4d9900cb8 'printf' 'int (const char *, ...)'
|   | `-ImplicitCastExpr 0x7fe4d99011b8 <col:12> 'const char *' <BitCast>
|   |   `-ImplicitCastExpr 0x7fe4d99011a0 <col:12> 'char *' <ArrayToPointerDecay>
|   |     `-StringLiteral 0x7fe4d99010e8 <col:12> 'char [23]' lvalue "\350\277\231\346\230\257\344\270\200\344\270\252main\346\226\271\346\263\225"
|   |-DeclStmt 0x7fe4d9901268 <line:7:5, col:14>
|   | `-VarDecl 0x7fe4d99011e8 <col:5, col:13> col:9 used a 'int' cinit
|   |   `-IntegerLiteral 0x7fe4d9901248 <col:13> 'int' 1
|   |-DeclStmt 0x7fe4d9901318 <line:8:5, col:14>
|   | `-VarDecl 0x7fe4d9901298 <col:5, col:13> col:9 used b 'int' cinit
|   |   `-IntegerLiteral 0x7fe4d99012f8 <col:13> 'int' 2
|   |-DeclStmt 0x7fe4d99014c8 <line:9:5, col:30>
|   | `-VarDecl 0x7fe4d9901348 <col:5, line:3:19> line:9:9 c 'int' cinit
|   |   `-BinaryOperator 0x7fe4d99014a0 <col:13, line:3:19> 'int' '+'
|   |     |-BinaryOperator 0x7fe4d9901458 <line:9:13, col:17> 'int' '+'
|   |     | |-ImplicitCastExpr 0x7fe4d9901428 <col:13> 'int' <LValueToRValue>
|   |     | | `-DeclRefExpr 0x7fe4d99013a8 <col:13> 'int' lvalue Var 0x7fe4d99011e8 'a' 'int'
|   |     | `-ImplicitCastExpr 0x7fe4d9901440 <col:17> 'int' <LValueToRValue>
|   |     |   `-DeclRefExpr 0x7fe4d99013e8 <col:17> 'int' lvalue Var 0x7fe4d9901298 'b' 'int'
|   |     `-IntegerLiteral 0x7fe4d9901480 <line:3:19> 'int' 3
|   `-ReturnStmt 0x7fe4d9901500 <line:12:5, col:12>
|     `-IntegerLiteral 0x7fe4d99014e0 <col:12> 'int' 0
`-<undeserialized declarations>
```
TranslationUnitDecl 根节点，表示一个编译单元。
节点主要有三种：Type类型，Decl声明，Stmt陈述。
ObjCInterfaceDecl OC中Interface声明
FunctionDecl 函数声明
ParmVarDecl 参数声明
CompoundStmt 具体语句
DeclStmt 语句声明
VarDecl 变量声明
IntegerLiteral 整数字面量
BinaryOperator 操作符
ImplicitCastExpr 隐士转换
DeclRefExpr 引用类型声明
ReturnStmt 返回语句
使用clang的API可针对AST进行相应的分析及处理。

5、语义分析
在语法分析的基础上加一些检查等。 根据语法树，可以分析找出潜在的代码错误：如类型不匹配，OC向target发送一个未实现的消息等。

6、生成中间代码IR
CodeGen自顶向下，遍历AST，逐步翻译生成LLVM IR代码。 main.ll和main.bc即为IR的两种形式。

OC代码在这里进行runtime的桥接：property合成，ARC处理等。


***
**clang的优点（相对于GCC）**

编译速度快
生成的AST占用内存小
基于库的模块化设计，结构清晰，易于IDE集成和扩展
诊断信息可读性强，利于调试。在编译过程中，clang创建并保留了大量详细的元数据（metadata），有利于调试和错误报告。

到目前为止，我希望Clang绝对是编程时的方式，Clang是新版本Xcode中的默认编译器，支持ARC和新的和即将推出的语言结构（数组和字典下标，文字等） 。 几乎没有理由再用GCC进行编译，对于使用ARC和新功能的代码库，使用普通GCC不再具有相关性或可能性（LLVM-GCC可能支持这些功能，但是现在Clang完全没有优于Clang的优势稳定）。

到目前为止（LLVM-2.0包含在Xcode 4.0 beta中），LLVM已经足够成熟，可以用于生产代码。 它编译速度比GCC快一点，并且产生更快的代码，所以只要你可以使用它（很多，如果有更好的东西，尽量避免使用GCC）。 标准的Xcode 3.2.5安装包含LLVM-1.6（不是最新版本），因此我建议运行一些速度测试，看看GCC和LLVM之间是否存在明显差异，或者从源代码编译Clang并获取最新版本。

从本质上讲，不再需要GCC，LLVM + Clang绰绰有余。

**GCC、LLVM-GCC、LLVM Compiler这三个编译选项的不同点**

||Parser|Optimizer/Code Generator|
|:|:|:|
|GCC 4.2|GCC|GCC|
|LLVM-GCC|GCC|LLVM|
|LLVM Compiler|Clang|LLVM|

在XCode中，我们经常会看到: `GCC4.2`、`LLVM GCC 4.2`、`LLVM compliler 2.0` 三个编译选项

Build Settings -> Build Options -> Compiler for C/C++/Objective-C

目前最新XCode 8已经摒弃GCC，转而默认使用LLVM编译器.

Xcode15默认是 `Apple Clang` 目前是 `com.apple.compilers.llvm.clang.1_0`

#### clang static analyzer

静态分析工具，通过自动分析程序的逻辑，在编译时就找出程序可能的bug。

#### Swift
前端：swift/LLVM swift前端会多出SIL optimizer，把.swift生成的中间代码.sil属于High-Level IR。
方法调用不再是像OC那样的消息发送，这样编译就可以获得更多信息用于后面的后端优化。

[SIL程序员手册](https://www.jianshu.com/p/8c3331e9e68a)
[Swift的高级中间语言：SIL](https://www.jianshu.com/p/c2880460c6cd)

## GCC & Clang 探寻底层代码实现
block是如何实现的呢？下面是一个最简单的block的定义与使用
创建文件
```
mkdir testDir
cd testDir
vim block.c
```
编写代码
```
int main(int argc, const charchar * argv[]) {  
    void (^block)(void) = ^{printf("This is a block！");};  
    block();  
}
```

GCC编译
`gcc block.c`

这行命令会自动生成一个a.out文件 `./a.out`

就能看到控制台打印程序中写的 `This is a block！`

***

Clang命令
Xcode创建的OC项目，通过终端，我们找到main.m文件所在路径，然后输入
`clang -rewrite-objc main.m -o main.cpp`

通过clang编译器，我们可以获得在编译过程中生产的中间代码，看block时如何实现的

在当前目录下找到 `main.cpp` 文件，打开后能看到block生成了很多结构体如下：（简化后代码,可查找关键字）
```
struct __block_impl {  
    voidvoid *isa;//block存放位置，取值为_NSConcretGlobalBlock(全局区)、_NSConcretStackBlock(栈区)、_NSConcretMallocBlock(堆区)  
    int Flags;//用于按bit位表示一些block的附加信息，block copy的实现代码可以看到对该变量的使用。  
    int Reserved;//保留变量。  
    voidvoid *FuncPtr;  
};  
  
static struct __main_block_desc_0 {  
    size_t reserved;  
    size_t Block_size;  
} __main_block_desc_0_DATA = { 0, sizeof(struct __main_block_impl_0)};  
  
static void __main_block_func_0(struct __main_block_impl_0 *__cself) {  
    printf("This is a block！");  
}  
  
struct __main_block_impl_0 {  
    struct __block_impl impl;  
    struct __main_block_desc_0* Desc;  
    __main_block_impl_0(voidvoid *fp, struct __main_block_desc_0 *desc, int flags=0) { //构造函数  
        impl.isa = &_NSConcreteStackBlock;  
        impl.Flags = flags;  
        impl.FuncPtr = fp;  
        Desc = desc;  
    }  
};  
  
int main(int argc, const charchar * argv[]) {  
    void (*block)(void) = (void (*)())&__main_block_impl_0((voidvoid *)__main_block_func_0, &__main_block_desc_0_DATA);  
    ((void (*)(__block_impl *))((__block_impl *)block)->FuncPtr)((__block_impl *)block);
```

看上去很多，其实没那么难理解，一个一个来分别介绍他们的意思：
`__block_impl`：block的一些基础属性，像是block的基类。
`__main_block_desc_0`：block的描述，他有一个实例 `__main_block_desc_0_DATA`
`__main_block_impl_0`：block变量（包含上面两个结构体对象）。
`__main_block_func_0`：block的匿名函数。存放block内的语句。
命名规则：“main”为block所在函数名，如果定义在函数外为block的名字，末尾的“0”表示为当前函数中第“0”个block。
在末尾的main函数中，我们可以看到block的初始化是调用 `__main_block_impl_0` 的构造函数，所以block的内容简化后为：
```
struct __main_block_impl_0 {  
    voidvoid *isa;  
    int Flags;  
    int Reserved;  
    voidvoid *FuncPtr;  
    size_t reserved;  
    size_t Block_size;  
    __main_block_impl_0(#block匿名函数的指针#,#__main_block_desc_0的实例指针#, int flags=0);  
};
```
由此可见：block其实就是一个Object-c对象。

## LLVM 常见应用
### attribute

编译器指令，运行开发者指定更多的编译检查和优化。

```
//弃用API，用作API更新
#define __deprecated    __attribute__((deprecated)) 

//带描述信息的弃用
#define __deprecated_msg(_msg) __attribute__((deprecated(_msg)))

//遇到__unavailable的变量/方法，编译器直接抛出Error
#define __unavailable    __attribute__((unavailable))

//告诉编译器，即使这个变量/方法 没被使用，也不要抛出警告
#define __unused    __attribute__((unused))

//和__unused相反
#define __used        __attribute__((used))

//如果不使用方法的返回值，进行警告
#define __result_use_check __attribute__((__warn_unused_result__))

//OC方法在Swift中不可用
#define __swift_unavailable(_msg)    __attribute__((__availability__(swift, unavailable, message=_msg)))
```

### Clang警告处理
```
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wundeclared-selector"
///代码
#pragma clang diagnostic pop
```

### 预处理
如 DEBUG，可以自定义，在 Build Settings 的Preprocessor Macros中添加
`DEBUG=1 COCOAPODS=1`

### 插入脚本
比较常见的是Run Script， 以及 CocoaPods中的sh脚本。

### Reveal的原理
在UIApplicationMain添加Symbolic断点：
`expr (Class)NSClassFromString(@"IBARevealLoader") == nil ? (void *)dlopen("/Applications/Reveal.app/Contents/SharedSupport/iOS-Libraries/libReveal.dylib", 0x2) : ((void*)0)`

注意，这里使用到了dlopen，加载动态库。

另外，还有reveal的cocoapods添加方式。 比较二者的区别！！！

### 动态修改target的build版本号
勾选Run Script Only When installing
```
buildNumber=$(/usr/libexec/PlistBuddy -c "Print CFBundleVersion" "${PROJECT_DIR}/${INFOPLIST_FILE}")
buildNumber=$(($buildNumber + 1))
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $buildNumber" "${PROJECT_DIR}/${INFOPLIST_FILE}"
```

### 脚本编译打包
持续集成CI
```
//编译成.app
xcodebuild  -workspace $projectName.xcworkspace -scheme $projectName  -configuration $buildConfig clean build SYMROOT=$buildAppToDir
//打包
xcrun -sdk iphoneos PackageApplication -v $appDir/$projectName.app -o $appDir/$ipaName.ipa

通过info命令，可以查看到详细的文档
info xcodebuild
```
如 Fastlane， auto_ipa.sh。

### 提高编译速度
```
Compile mm files
    MBCARKernelFilter.mm 93.6s
    FlareblurRender.mm 96.3s
    FacialRemodelingTool.mm 96.8s
    EyesEnlargeTool.mm 97.1s
    DrawHairing.mm 97.3s
    BeautyTeethViewController.mm 99.7s

......
    
Build target AFNetworking
    Compile UIWebView+AFNetworking.m 13.1s
    Compile AFURLRequestSerialization.m 19.2s
    Compile AFNetworkReachabilityManager.m 18.6s
    Compile AFNetworkActivityIndicatorManager.m 18.2s
    Compile AFImageDownloader.m 18.0s
    Compile AFHTTPSessionManager.m 17.9s
    Compile AFAutoPurgingImageCahce.m 17.8s
    Create static library xxx/Build/Products/Debug-iphoneos/AFNetworking/libAFNetworking.a
```

### 制作clang插件

命名规范，代码检查等。

## LLVM其他实践

### 一些工具
libclang libTooling 应用：语法树AST分析，AST转换等。 如OC-Swift，JS->OC, OC-JS等。

### LLVM优化
- 编译时优化：编译前端将源码编译成LLVM IR

- 链接时优化：跨文件的分析优化

- 运行时优化：收集运行时的信息 profiling information

- 闲时优化：获得运行时的profiling information，生成更高效的代码。

### Pass开发
LLVM的优化即对中间代码IR优化，由多个Pass来完成，每个Pass完成特定的优化工作。可以分组。
clang命令的参数如-O2，-O3, -O4等。
Source Code --- 前端 --- IR - Pass - IR - Pass - IR --- 后端 --- Machine Code
Pass即为一层一层相互独立的IR优化器。可以做到代码优化，代码混淆等。
如开启bitcode，则苹果会做一个对应的Pass优化。
源码路径为llvm/lib/Transforms/，涉及FunctionPass等，类似clang插件。编译生成后也是dylib文件。

#### 使用Pass

Pass是作用于IR之上的，对IR文件执行Pass会得到另一个优化后的IR文件。
```
/xxx/llvm_build/bin/opt -load MyPass.dylib -MyPass < main.ll > another_main.ll
/xxx/llvm_build/bin/opt -load MyPass.dylib -MyPass < main.ll > another_main.bc
```

使用lli来执行ll或bc查看结果

```
/xxx/llvm_build/bin/lli another_main.ll
/xxx/llvm_build/bin/lli another_main.bc
```

### AOT和JIT

AOT：ahead-of-time 提前编译。执行前全部翻译成机器码.S文件，然后通过汇编程序来编译成指定架构的二进制文件。AOT，如C。
JIT：just-in-time 即时编译。一句一句边翻译边运行，代码可在运行时直接生成。JIT，如js，python等。如js可动态下发并执行代码。一般带有自省函数eval。

同时支持AOT和JIT

Python：可以直接翻译执行，也可以提前翻译成中间代码。
Dart：JIT快速开发周期，避免每次代码改动都重新编译；AOT发布运行高效的机器码。

热更新方案：
JSPatch，滴滴热更新，腾讯热更新

### 开发新的编程语言

[用LLVM开发新语言](https://llvm-tutorial-cn.readthedocs.io/en/latest/index.html)

[LLVM Tutorial](https://llvm.org/docs/tutorial/index.html)

[Kaileidoscope: LLVM Tutorial Chinese version(中文版)](https://kaleidoscope-llvm-tutorial-zh-cn.readthedocs.io/zh_CN/latest/)

***

## 使用MachOView来查看Mach-O文件
iOS, macOS平台上可执行文件的格式。有以下几种类型：

二进制文件
静态链接库 .a文件
动态链接库 .dylib文件
Bundle，不能被链接的dylib，只能在运行时使用dlopen()来加载
可重定向文件类型

通过MachOView可以看出：
a.out, main.native, main都为Mach-O文件，第一种。

***

### 参考资料
[编译原理：LLVM初步介绍](https://juejin.cn/post/6844904004594450440)
[iOS的启动优化](https://blog.csdn.net/lingjunjie/article/details/128386577)
[iOS开发优化的起步之启动优化](https://blog.csdn.net/ZhaiAlan/article/details/104923246)
[iphone - objc - 用于iOS开发的LLVM与GCC](https://code-examples.net/zh-CN/q/460717)
[GCC，LLVM，Clang编译器对比](https://www.cnblogs.com/qoakzmxncb/archive/2013/04/18/3029105.html)
[Clang - Features and Goals](https://clang.llvm.org/features.html#expressivediags)
[iOS利用gcc看底层](https://www.jianshu.com/p/d83b788b5847)
[How to detect unused methods and #import in Objective-C](https://stackoverflow.com/questions/1456966/how-to-detect-unused-methods-and-import-in-objective-c)
[Compiler Warnings for Objective-C Developers](https://oleb.net/blog/2013/04/compiler-warnings-for-objective-c-developers/)
