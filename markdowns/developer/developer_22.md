# Markdown - 绘制项目目录结构图

## 使用 [tree](https://formulae.brew.sh/formula/tree) 命令（推荐，功能强大，全局可用）

功能：以树状图列出目录的内容

[Display directories as trees (with optional color/HTML output)](https://github.com/Homebrew/homebrew-core/blob/77d12436329c7118b6080039c551d2dff3b34c8a/Formula/t/tree.rb)

环境：macOS

安装：`brew install tree`

`tree` displays the directory structure of the current directory.

`tree -L 1`To limit the recursion you can pass an -L flag and specify the maximum depth tree will use when searching.

`-d` option displays only directories.

```
➜  Documents ls
Android-APK   Beta-Software Developer     Meeting       PDF           Python        WWDC          pgyer
Applications  CASA          IPAs          OpenVPN       Private       Resources     Workflow      plantuml
Architecture  Corporation   Jenkins       Overtime      ProcessOn     Tickets       Xcodes

➜  Documents tree -d CASA PDF -L 1
CASA
└── codes
PDF
└── ARKit_by_Tutorials_v3.0.0

4 directories
```

`-I` option allows to exclude directories that match specific pattern e.g.

`tree -I node_modules`

In order to exclude multiple directories at once, their names must be separated by `|` sign, i.e.

`tree -I 'node_modules|cache|test_*'`

This command will skip `node_modules`, `cache` directories (along with their content) from the output, and all directories that match `test_*` wildcard expression.

----

环境：windows

```
tree [drive][path] [/F] [/A]
#/f 显示所有目录及目录下的所有文件，省略时，只显示目录，不显示目录下的文件
#/a 使用ASCII字符，而不使用扩展字符
```
```
C:\Users\Acer>tree /?
以图形显示驱动器或路径的文件夹结构。

TREE [drive:][path] [/F] [/A]

   /F   显示每个文件夹中文件的名称。
   /A   使用 ASCII 字符，而不使用扩展字符。
```

注意事项：
1、导出符<前后空格可以省略
2、tree命令涉及的文件名不能有空格

优点：windows下啥都不用安装，直接使用
缺点：需要使用cmd进入特定目录或者打出目录

## 使用 [treer](https://www.npmjs.com/package/treer) 工具（快速简便，全局可用，但是功能比较简单）
`npm install treer -g`
`treer --version`

```
➜  ~ treer --help
Usage: treer [options]

Options:
  -V, --version          output the version number
  -d, --directory [dir]  Please specify a directory to generate structure tree (default: "/Users/gavinxiang")
  -i, --ignore [ig]      You can ignore specific directory name
  -e, --export [epath]   export into file
  -h, --help             output usage information
```

```
treer //查看目录树
treer -d <指定路径>//查看指定路径的目录树
treer -e <导出路径>//导出当前目录的目录树到特定路径下文件
treer -i "/^regex$/"//忽略目录或文件
```

`% treer -d ~/Downloads/codes -e ./directoryList.md -i Pods`

## 使用mddir命令(不推荐，文件较多时比较耗时，而且污染当前目录)

```
% cd <dir-path>
% node install mddir --save
% cd node_modules/mddir/src
% node mddir ../../..
% ls
directoryList.md mddir.js
```

列出了每一个文件，但是不包括node_modules和.git文件夹，这是如果觉得有些东西冗余，根据自己的需要裁剪就可以啦！
```
# directoryList.md
|-- Documents
    |-- .DS_Store
    |-- CASA_Fluid_Guide_iOS.pdf
    |-- Rancher.Desktop-1.11.1.aarch64.dmg
    |-- package-lock.json
    |-- package.json
    |-- codes
        |-- .DS_Store
        |-- Fluid-Attacks-Results.csv
        |-- config.yaml
        |-- fp_ios_freeprints
            |-- .DS_Store
            |-- CommonLibs
            |   |-- .DS_Store
            |-- Externals
            |   |-- .DS_Store
            |-- FreePrints
                |-- .DS_Store
```

## 参考
[markdown如何写出项目目录结构](https://www.jianshu.com/p/e38a07f824a2)
[tree: recursive directory listing command](https://sourabhbajaj.com/mac-setup/iTerm/tree.html)
[tree: ignore directories with patterns](https://zaiste.net/posts/tree-ignore-directories-patterns/)

