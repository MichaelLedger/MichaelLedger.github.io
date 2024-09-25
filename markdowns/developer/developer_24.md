# Xcode - Improve compile speed and incremental compile for projects mixed with oc & swift

> dependency priority: Swift Package Manager(SPM) > Carthage > CocoaPods

**iOS Dependency manager**

When you do not use a Dependency manager as a developer you are responsible for:

- finding a dependency
- resolving a dependency graph and versioning
- downloading the sources
- add the dependency into Xcode

And when you decide to upgrade the dependency you should start this process from the beginning

Dependency manager is a tool that helps user to add a dependency into a project with a minimum affords

## CocoaPods
CocoaPods is an open-source, centralised dependency manager for Swift and Objective-C Cocoa projects which is being written on Ruby. It Supports Dynamic Frameworks and Static Libraries

Notes:

- CocoaPods needs to have a workspace
- A consumer project does not have a clean view of dependencies `<Pods_target-name.framework>`
- All dependencies are rebuild every time when you build the project. It increases build time as a workaround take a look at cocoapods-binary
- It is not possible to use different pod versions in the same workspace
`CocoaPods could not find compatible versions for pod`

## Carthage
Carthage is an open-source, decentralised dependency manager for Swift and Objective-C Cocoa projects which is being written on Swift. It supports Dynamic Frameworks and Static Libraries

Notes:

As a consumer project developer you are responsible for setup Xcode with a dependency. It creates some extra steps in IDE
As a dependency developer you do not have some instruments(e.g. subspecs)

这个方案跟 cocoapods-packager 比较类似，优缺点都差不多，但 Carthage 可以比较方便地调试源码。因为我们目前已经大规模使用 CocoaPods，转用 Carthage 来做包管理需要做大量的转换工作，所以不考虑这个方案了。

```
$ brew install carthage
$ carthage version
```

Create an empty Cartfile with the touch command:
`touch Cartfile`

Then open the file in Xcode for editing:
`open -a Xcode Cartfile`

Add the following lines to the Cartfile and save it:
```
github "Alamofire/Alamofire" == 4.9.0
github "Alamofire/AlamofireImage" ~> 3.4
```
These two lines tell Carthage that your project requires Alamofire version 4.9.0 and the latest version of AlamofireImage that’s compatible with version 3.4.

Now open the Terminal App on your Mac and type

`carthage update`

["Building universal frameworks with common architectures is not possible." error #3146](https://github.com/Carthage/Carthage/issues/3146)

**I've encountered a similar problem and it is not the perfect solution, but you can use the same workaround as described here [Xcode12Workaround.md](https://github.com/Carthage/Carthage/blob/master/Documentation/Xcode12Workaround.md) to fix this problem. Cheers**

```
➜  ~ which carthage
/usr/local/bin/carthage
➜  ~ chmod +x /usr/local/bin/carthage
```

You have successfully integrated your dependency! 🎉

Let's see what you have done:

You have specified that your dependency is on GitHub and is on the Alamofire/Alamofire repository.
That’s all! But a lot of things happened under the hood.

Carthage created a `Cartfile.resolved` file to let other developers, or you, add the same version of the same dependencies to your app. If your project is under version control, you would normally push this file to the repository.

It created a `Carthage` folder in your project root folder. Inside this folder, it checked out every dependency declared in your Cartfile. If your project is under version control, you would normally push this file to the repository as well.

It also created a `Build` folder inside it, where you will find a folder for every platform that your dependencies support. For example, for Alamofire, a framework that supports all Apple platforms, you will find iOS, Mac, tvOS, and watchOS folders.

If you want to only build dependencies for a specified platform, use `carthage update --platform iOS` command.

Inside every platform folder, you will find all the frameworks that support that platform (you will also find other files and a `.dSYM` file, which is used for desymbolising crash logs).

There are a few other steps we need to do (from official repository documentation):

1. Drag the built `.framework` binaries from `Carthage/Build/<platform>` into your application’s Xcode project.

2. On your application targets’ Build Phases settings tab, click the + icon and choose New Run Script Phase. Create a Run Script in which you specify your shell (ex: `/bin/sh`), add the following contents to the script area below the shell:
`/usr/local/bin/carthage copy-frameworks`

3. Add the paths to the frameworks you want to use under “Input Files":
`$(SRCROOT)/Carthage/Build/iOS/Alamofire.framework`

4. Add the paths to the copied frameworks to the “Output Files”:
`$(BUILT_PRODUCTS_DIR)/$(FRAMEWORKS_FOLDER_PATH)/Alamofire.framework`

Go to your Swift file and type
`import Alamofire`

You can now use Alamofire inside your file!

Note: This Carthage tutorial uses Swift 5. At the time of writing, Swift 5 is only available in Xcode 11. Ensure you’ve configured your command line tools to use Xcode 11 by running the following command from Terminal:
`sudo xcode-select -s <path to Xcode 11>/Xcode.app/Contents/Developer`

Be sure to replace path to Xcode 11 with your machine’s specific path to Xcode 11.

This instructs Carthage to clone the Git repositories from the Cartfile, then to build each dependency into a framework. 

```
carthage update --use-xcframeworks --platform iOS
```

Build with `--use-xcframeworks` to create an xcframework bundle instead.

## Swift Package Manager(SPM)
Swift Package Manager(SPM) is an open-source, decentralised dependency manager which is being written on Swift. It supports Dynamic and Static library. .xcodeproj is not used. If you want to distribute closed-source(binary framework) you should use XCFramework.

**CocoaPods by default builds open-source pods every time(after clean or any unknown reason) which increase build time(but you can use [cocoapods-binary](https://guides.cocoapods.org/plugins/pre-compiling-dependencies.html)), Carthage and SPM pre-builds framework by default.**

**closed-source allows you to close the source code and save build time, but can have issues with [Application Binary Interface(ABI) stability](https://stackoverflow.com/a/59271017/4770877)**

### Usage

*Environment*
MacBook Pro: Apple M1 Pro
macOS: Sonoma 14.5
Xcode: 15.4
Swift Language Version: Swift 5

----

In Getting Started, a simple command-line tool is built with the Swift Package Manager.

To provide a more complete look at what the Swift Package Manager can do, the following example consists of four interdependent packages:

PlayingCard - Defines PlayingCard, Suit, and Rank types.
FisherYates - Defines an extension that implements the shuffle() and shuffleInPlace() methods.
DeckOfPlayingCards - Defines a Deck type that shuffles and deals an array of PlayingCard values.
Dealer - Defines an executable that creates a DeckOfPlayingCards, shuffles it, and deals the first 10 cards.
You can build and run the complete example by downloading the source code of the Dealer project from GitHub and running the following commands:

```
$ git clone https://github.com/apple/example-package-dealer.git
$ cd example-package-dealer
$ swift run dealer <count>
```

*Console logs*
```
➜  Downloads git clone https://github.com/apple/example-package-dealer.git
Cloning into 'example-package-dealer'...
remote: Enumerating objects: 108, done.
remote: Counting objects: 100% (25/25), done.
remote: Compressing objects: 100% (6/6), done.
remote: Total 108 (delta 21), reused 19 (delta 19), pack-reused 83 (from 1)
Receiving objects: 100% (108/108), 26.99 KiB | 75.00 KiB/s, done.
Resolving deltas: 100% (44/44), done.

➜  Downloads cd example-package-dealer 

➜  example-package-dealer git:(main) swift run dealer 10
Fetching https://github.com/apple/swift-argument-parser.git
Fetching https://github.com/apple/example-package-deckofplayingcards.git
Fetched https://github.com/apple/example-package-deckofplayingcards.git from cache (6.33s)
Fetched https://github.com/apple/swift-argument-parser.git from cache (6.33s)
Computing version for https://github.com/apple/swift-argument-parser.git
Computed https://github.com/apple/swift-argument-parser.git at 0.5.0 (1.82s)
Computed https://github.com/apple/swift-argument-parser.git at 0.5.0 (0.00s)
Computing version for https://github.com/apple/example-package-deckofplayingcards.git
Computed https://github.com/apple/example-package-deckofplayingcards.git at 3.0.4 (3.51s)
Fetching https://github.com/apple/example-package-fisheryates.git
Fetching https://github.com/apple/example-package-playingcard.git
Fetched https://github.com/apple/example-package-fisheryates.git from cache (3.15s)
Fetched https://github.com/apple/example-package-playingcard.git from cache (3.15s)
Computed https://github.com/apple/example-package-deckofplayingcards.git at 3.0.4 (0.00s)
Computing version for https://github.com/apple/example-package-playingcard.git
Computed https://github.com/apple/example-package-playingcard.git at 3.0.5 (1.95s)
Computing version for https://github.com/apple/example-package-fisheryates.git
Computed https://github.com/apple/example-package-fisheryates.git at 2.0.6 (1.86s)
Creating working copy for https://github.com/apple/swift-argument-parser.git
Working copy of https://github.com/apple/swift-argument-parser.git resolved at 0.5.0
Creating working copy for https://github.com/apple/example-package-playingcard.git
Working copy of https://github.com/apple/example-package-playingcard.git resolved at 3.0.5
Creating working copy for https://github.com/apple/example-package-deckofplayingcards.git
Working copy of https://github.com/apple/example-package-deckofplayingcards.git resolved at 3.0.4
Creating working copy for https://github.com/apple/example-package-fisheryates.git
Working copy of https://github.com/apple/example-package-fisheryates.git resolved at 2.0.6
Building for debugging...
[62/62] Applying dealer
Build complete! (6.89s)
♡ 5    ♣︎ 4    ♣︎ 3    ♢ 2    ♢ 7    ♠︎ 7    ♠︎ J    ♣︎ 5    ♣︎ 6    ♡ 7
```

### Step1: Creation and Source Control

The creation of a new Swift Package with Xcode is fairly easy and self-explanatory: Just choose “File” from the menu bar and “New” → “Package...” -> ”Multiplatform - Library”.

In the following window I gave the new Swift Package a name — “XXXPackage” — and put the new package under source control by choosing the checkbox: ”Create Git repository on my Mac”.

Then I clicked on “Create” . If I had forgotten to put the package under source control, I could have done it afterwards by choosing “Source Control” from the menu bar and “New Git Repositories”, Then ”New XXXPakage Remote...”.

![](../image/developer/spm-1.png)

Add github account with Personal Access Token (must have these scopes set: admin:public_key, write:discussion, repo, user)

[Create a Token on Github](https://github.com/settings/tokens/new)

![](../image/developer/github-access-token.png)

![](../image/developer/add_github_account.png)

You can choose to make the new remote repository public or private.

### Step2: Add submodule dependencies

```
// swift-tools-version: 5.10
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "XXXPackage",
    products: [
        // Products define the executables and libraries a package produces, making them visible to other packages.
        .library(
            name: "XXXPackage",
            targets: ["XXXPackage"]),
    ],
    dependencies: [
        .package(url: "git@github.com:<organization>/<repo-name>.git", branch: "<branch-name>")
    ],
    targets: [
        // Targets are the basic building blocks of a package, defining a module or a test suite.
        // Targets can depend on other targets in this package and products from dependencies.
        .target(
            name: "XXXPackage"),
        .testTarget(
            name: "XXXPackageTests",
            dependencies: ["XXXPackage"]),
    ]
)

```

**Error: skipping cache due to an error: Authentication failed because no credentials were provided.**

Resolution: Settings -> Accounts -> Source Control Accounts -> Clone Using -> ☑️ SSH

**Error: the package manifest at '/Package.swift' cannot be accessed**
```
Showing All Errors Only
the package manifest at '/Package.swift' cannot be accessed (/Package.swift doesn't exist in file system) in git@github.com:<organization>/<repo-name>.git
Reloading Package ‘xxxpackage’ Failed    2024/8/30, 17:12    12.0 seconds
```
Resolution: dependencies should contains `Package.swift` which defined the package manifest.


Showing All Errors Only
Building for 'iOS-simulator', but linking in dylib (/Users/xxx/Downloads/synergy-ios/Pods/_Prebuild/GeneratedFrameworks/AGGeometryKit/AGGeometryKit.framework/AGGeometryKit) built for 'iOS'

Resolution: `pod 'AGGeometryKit', '~> 1.2.9', :binary => false`


Showing All Errors Only
/Users/xxx/Downloads/xxx-ios/Shared/Classes/Views/Checkout/XXXCheckoutViewController.m:42:9: 'AFURLResponseSerialization.h' file not found

Resolution:
```
//#import "AFHTTPSessionManager.h"
#import "AFNetworking/AFHTTPSessionManager.h" //@import AFNetworking;
```

**[Do we need prebuild?](https://github.com/leavez/cocoapods-binary/issues/168)**
I did some experiment to check in which case xcode will rebuild imported libraries.
and I found that, xcode will not rebuild the libraries(imported by cocoapod) that doesn't have code change since the last build.
I check this by looking at the build log carefully.
so just want to confirm this & get clear in which situation I need cocoapod-binary.

## [cocoapods-packager](https://github.com/CocoaPods/cocoapods-packager)

### Installation
`$ gem install cocoapods-packager`
or add a line to your Gemfile:
`gem "cocoapods-packager"`
then run `bundle install`.
This installs Packager as a CocoaPods plugin.

### Usage
`$ pod package KFData.podspec`

CocoaPods plugin which allows you to generate a static library from a podspec.
cocoapods-packager 可以将任意的 pod 打包成 Static Library，省去重复编译的时间，一定程度上可以加快编译时间，但是也有自身的缺点：

- 优化不彻底，只能优化第三方和私有 Pod 的编译速度，对于其他改动频繁的业务代码无能为力
- 私有库和第三方库的后续更新很麻烦，当有源码修改后，需要重新打包上传到内部的 Git 仓库
- 过多的二进制文件会拖慢 Git 的操作速度（目前还没部署 Git 的 LFS）
- 难以调试源码

### Logs
```
➜  AFNetworking-4.0.1 ls
AFNetworking.podspec
➜  AFNetworking-4.0.1 pod package AFNetworking.podspec 
    ...
    error: The armv7 architecture is deprecated. You should update your ARCHS build setting to remove the armv7 architecture. (in target 'Pods-packager' from project 'Pods')
    error: The armv7s architecture is deprecated. You should update your ARCHS build setting to remove the armv7s architecture. (in target 'Pods-packager' from project 'Pods')
    /var/folders/wk/frkkcch539lc6s2dk6dw9dy80000gn/T/cocoapods-4z5yjq2u/Pods/Pods.xcodeproj: warning: The iOS deployment target 'IPHONEOS_DEPLOYMENT_TARGET' is set to 9.0, but the range of supported deployment target versions is 12.0 to 17.5.99. (in target 'AFNetworking' from project 'Pods')
    error: The armv7 architecture is deprecated. You should update your ARCHS build setting to remove the armv7 architecture. (in target 'AFNetworking' from project 'Pods')
    error: The armv7s architecture is deprecated. You should update your ARCHS build setting to remove the armv7s architecture. (in target 'AFNetworking' from project 'Pods')
    ** BUILD FAILED **
```

**cocoapods-packager 目前依旧停留在 2016 年的 1.5.0 版本，已渐失于维护。我在适配 Xcode 15 时，遇到一些问题，这里做下记录。**

- Unknown option: `--local`

pod package --local 允许使用本地代码打包，而无需从发布的版本上下载，这个参数非常适合本地测试开发。如果直接按如下方式安装 cocoapods-packager，并不会支持 --local 参数：

`sudo gem install cocoapods-packager`

这是因为 https://github.com/CocoaPods/cocoapods-packager 仓库中最新 1.5.0 Tag 不支持 --local 参数。正确的做法是取 `master` 最新的代码：
```
gem install specific_install
gem specific_install https://github.com/CocoaPods/cocoapods-packager
```
`gem install` 到底安装到了哪里？

通过 `gem` 安装的依赖库，可能会被安装到系统中的不同路径，后面会有修改 cocoapods-packager 源码的需求，实际安装路径没找对修改错了源码是不起作用的。

**可以借助 `gem-path` 插件 查看 gem 安装库（生效的）的实际位置。**

```
gem install gem-path
gem path cocoapods-packager
```

- The armv7/armv7s architecture is deprecated

**从 Xcode 14 开始，已经不再支持 armv7/armv7s 架构了**

直接使用 pod package 默认会编译 x86_64、i386、arm64、armv7、armv7s 的包，将报错：
```
error: The armv7 architecture is deprecated. You should update your ARCHS build setting to remove the armv7 architecture.
error: The armv7s architecture is deprecated. You should update your ARCHS build setting to remove the armv7s architecture. 
```
修复方式：

通过 `gem path cocoapods-packager` 找到 cocoapods-packager 实际安装位置，修改 `lib/cocoapods-packager/builder.rb`:

```
def ios_architectures
  #archs = %w(x86_64 i386 arm64 armv7 armv7s)
  archs = %w(x86_64 arm64)
  vendored_libraries.each do |library|
    archs = `lipo -info #{library}`.split & archs
  end
  archs
end
```

- Building for 'iOS', but linking in object file built for 'iOS-simulator'

在 Xcode 15 中，通过 cocoapods-packager 打包 framework 静态库，编译产出都没有问题，但在使用时报这个错误。

在 Xcode 支持 Apple silicon 以后，模拟器和真机都需要包含 arm64 架构代码，如果同时包含就存在冲突，需要配置排除模拟器版本的 arm64 架构：

`EXCLUDED_ARCHS[sdk=iphonesimulator*] = 'arm64'`

cocoapods-packager 依然没有处理这个问题，需要手动修改。

```
vim lib/cocoapods-packager/pod_utils.rb

unless static_installer.nil?
  static_installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['CLANG_MODULES_AUTOLINK'] = 'NO'
      config.build_settings['GCC_GENERATE_DEBUGGING_SYMBOLS'] = 'NO'
      config.build_settings['EXCLUDED_ARCHS[sdk=iphonesimulator*]'] = 'arm64' // add
    end
  end
  static_installer.pods_project.save
end
```

- 如何设置 OTHER_CFLAGS 参数？

cocoapods-packager 并没有暴露设置 xcodebuild 编译参数的设置入口，从 `pod package` 命令行尝试设置编译参数是无法生效的，相关代码在：

```
//lib/cocoapods-packager/builder.rb
def ios_build_options
      "ARCHS=\'#{ios_architectures.join(' ')}\' OTHER_CFLAGS=\'-fembed-bitcode -Qunused-arguments\'"
end
```

### 最佳实践

我已经在 cocoapods-packager 上面踩过不少坑，索性直接 fork 一份 cocoapods-packager 来维护，Github 地址在：[cocoapods-packager](https://github.com/ckanchuan/cocoapods-packager)。相对官方仓库的改动点有：

- 修复了 armv7/armv7s 的问题；
- 增加 --other-c-flags 以支持自定义编译参数，对我个人而言这个参数非常实用。比如开启混淆：
```
pod package kanchuan.podspec --force --embedded --local --no-mangle --exclude-deps --spec-sources="" --verbose --other-c-flags="-mllvm -enable-allobf"
```

如果你喜欢这个特性，可以按照以下方式部署：

安装 cocoapods-packager：
`sudo gem install cocoapods-packager`

查看安装路径：
`gem path cocoapods-packager`

将从 [cocoapods-packager](https://github.com/ckanchuan/cocoapods-packager) 下载的文件全部覆盖至安装路径中。

## Buck

Buck 是一套通用的构建系统，由 Facebook 开源。最大的特色是智能的增量编译可以极大地提高构建速度。最早听说 Buck 的时候，它还只能用在安卓上，现在已经适配了 iOS。

它能增快构建速度的主要原因是缓存了编译结果，通过持续监视项目目录的文件变化，每次编译时只编译有改动的文件。另外一个让我很受启发的功能是 HTTP Cache Server，通过一台缓存文件服务器来保存大家的编译结果，这样只要团队里其中一人编译过的文件，其他人就不用再编译了，直接下载就行。

Buck 是个相当完备的解决方案，很多国外的大公司例如 Uber 都已经用上。我也花了很多时间来研究，最终还是认为对我们的项目和团队来说，目前并不是很适合，主要原因是：

Buck 抛弃了 Xcode 的项目文件，需要手工编写配置文件来指定编译规则，这要对现有项目作出大幅度的调整。我们目前还在快速迭代新功能，没有余暇和人手来实施。
开发和调试的流程都得做出很大的改变。因为 Buck 接管了项目编译的过程，想调试项目不能简单地在 Xcode 里面 ?+R 了，得先反过来让 Buck 生成 Xcode 的项目文件。Uber 的工程师甚至推荐使用 Nuclide 来代替 Xcode 作为开发环境。虽然原理上是可行的，但是团队需要花不少时间来适应，短期内效率降低无可避免。
用 Xcode 调试代码享受不到加快编译速度的好处。虽然可以用 buck 命令启动 App，然后在命令行里启动 lldb 来调试，但那就无法使用 Xcode 的调试工具 例如 View Debugging 和 Memory Graph Debugger。

## [Bazel](https://bazel.build/)

Bazel 跟 Buck 很相似，是 Google 开源的，优缺点跟 Buck 都差不多，不再详细说了。

## distcc 分布式编译

原理是把一部分需要编译的文件发送到服务器上，服务器编译完成后把编译产物传回来。我尝试了一下比较出名的 distcc，搭建过程比较简单，最后也能成功地把编译任务分派到内网的多台服务器上。但是其他编译服务器的 CPU 占用总是很低，只有 20% 左右；也就是说分派任务的速度甚至还赶不上服务器编译的速度，分派任务然后回传编译产物这个过程所耗费的时间超过了本地直接编译。不停调整参数反复试验了很多次，最后发现编译时间完全没有变快，甚至还有点变慢了。可能以我们目前项目的规模并不适合使用分布式编译。

## [Ccache](https://ccache.dev/platform-compiler-language-support.html)

|Level|Description|
|:|:|
|A|Supported. Built and tested regularly and before new releases. High attention to bug reports.|
|B|Probably works, may work or is partially supported. Not part of the test procedure before a new release. Bug fixing and testing largely depend on contributions from the community.|
|C|Not supported.|

|Language|Level|
|:|:|
|Objective-C (.m)|B| 
|Objective-C preprocessed (.mi)|B|
|Objective-C++ (.mm, .M)|B|
|Objective-C++ preprocessed (.mii)|B|
|Swift (.swift)|C|

## [Cocoapods-Binary](https://github.com/leavez/cocoapods-binary)

社区创建，已多年未维护，与最新Xcode和M1编译有很多兼容问题，目前还没找到解决方案！

应用案例

假设你有一个大型 iOS 项目，其中包含多个依赖库。通过使用 Cocoapods-Binary，你可以显著减少编译时间，特别是在频繁构建和测试的开发阶段。

最佳实践

选择合适的依赖库进行预编译：并非所有库都适合预编译。选择那些稳定且不经常更新的库进行预编译，可以获得最佳效果。
定期更新预编译缓存：当依赖库有更新时，及时更新预编译缓存，以确保项目的稳定性和性能。
避免预编译动态库：预编译动态库可能会导致一些兼容性问题，建议预编译静态库。
典型生态项目

Cocoapods-Binary 可以与以下典型生态项目结合使用：

CocoaPods：作为 CocoaPods 插件，Cocoapods-Binary 自然与 CocoaPods 生态紧密结合。
Xcode：通过预编译框架，减少 Xcode 项目的编译时间，提高开发效率。
Fastlane：结合 Fastlane 自动化工具，可以进一步优化和自动化预编译流程。
通过以上步骤和最佳实践，你可以充分利用 Cocoapods-Binary 插件，提升 iOS 项目的开发效率和编译速度。

Project Introduction

CocoaPods Binary Cache is a plug-in for CocoaPods. Its main function is to pre-compile Pod libraries and store them in a remote repository for quick access and reuse on different machines. In this way, each time a new build is made, it no longer takes a lot of time to compile existing libraries, but directly pulls them from the cache, which greatly improves the construction speed of the project.

Technical Analysis

This plug-in is written in Ruby and is compatible with Ruby 2.4 and above and CocoaPods 1.5.0 and above. It uses Bundler for dependency management and uses CocoaPods as the basic dependency management tool. In addition, it uses the two projects cocoapods-rome and cocoapods-binary to achieve Pod pre-compilation and storage.

Application Scenarios

It is suitable for any large Xcode project that needs to be built frequently or across machines, especially in a continuous integration (CI) environment. If your team has multiple people collaborating, or your project relies on a large number of CocoaPods libraries, this plug-in will greatly improve your work efficiency.

Project Features

Reduce build time - Precompile and store Pod frameworks to avoid repeated compilation.
Share across machines - Cached binaries can be shared by multiple developers or CI servers.
Simple configuration - Just add a line of code to the Podfile and configure the cache repository to enable the plugin.
Flexible CLI - Provides multiple command line interfaces, such as fetch, prebuild, and push, to facilitate the management and update of caches.

Requirements

Ruby: >= 2.4
CocoaPods: >= 1.5.0
Via Bundler

To update CocoaPods you simply install the gem again

`$ [sudo] gem install cocoapods`

A CocoaPods plugin to integrate pods in form of prebuilt frameworks, not source code, by adding just one flag in podfile. Speed up compiling dramatically.

*Why*

You may wonder why CocoaPods doesn't have a function to integrate libs in form of binaries, if there are dozens or hundreds of pods in your podfile and compile them for a great many times meaninglessly. Too many source code of libs slow down your compile and the response of IDE (e.g. code completion), and then reduce work efficiency, leaving us time to think about the meaning of life.

This plugin implements this simple wish. Replace the source code in pod target with prebuilt frameworks.

Why don't use Carthage? While Carthage also integrates libs in form of frameworks, there several reasons to use CocoaPods with this plugin:

- Pod is a good simple form to organize files, manage dependencies. (private or local pods)
- Fast switch between source code and binary, or partial source code, partial binaries.
- Some libs don't support Carthage.

### Installation

`$ sudo gem install cocoapods-binary`

```
sudo gem install cocoapods cocoapods-binary
sudo gem install -n /usr/local/bin cocoapods cocoapods-binary
```

```
ERROR:  Error installing cocoapods-binary:
    The last version of activesupport (>= 5.0, < 8) to support your Ruby & RubyGems was 7.1.4. Try installing it with `gem install activesupport -v 7.1.4` and then running the current command again
    activesupport requires Ruby version >= 3.1.0. The current ruby version is 2.7.5.203.
```
```
➜  synergy-ios git:(release/1.1_sti) ✗ sudo gem install activesupport -v 7.1.4
Password:
Fetching activesupport-7.1.4.gem
Successfully installed activesupport-7.1.4
Parsing documentation for activesupport-7.1.4
Installing ri documentation for activesupport-7.1.4
Done installing documentation for activesupport after 2 seconds
1 gem installed
```

```
➜  synergy-ios git:(release/1.1_sti) ✗ sudo gem install cocoapods-binary      
Successfully installed cocoapods-core-1.15.2
Successfully installed cocoapods-1.15.2
Successfully installed cocoapods-binary-0.4.4
Parsing documentation for cocoapods-core-1.15.2
Installing ri documentation for cocoapods-core-1.15.2
Parsing documentation for cocoapods-1.15.2
Installing ri documentation for cocoapods-1.15.2
Parsing documentation for cocoapods-binary-0.4.4
Installing ri documentation for cocoapods-binary-0.4.4
Done installing documentation for cocoapods-core, cocoapods, cocoapods-binary after 2 seconds
3 gems installed
```

### Usage

**Customizable xcodebuild option for the prebuild action ([detail](https://github.com/leavez/cocoapods-binary/blob/fe6d66649b88833f4472b39743563cbd9d2100ca/lib/cocoapods-binary/Main.rb#L27)). (So dSYM, archs and more other things are in your control.)**

```[!] Your Podfile requires that the plugin `cocoapods-binary` be installed. Please install it and try installation again.```

**Add the gem cocoapods-binary-cache to the Gemfile of your project.**

`gem "cocoapods-binary-cache", :git => "https://github.com/grab/cocoapods-binary-cache.git", :tag => "0.1.11"`

`gem "cocoapods-binary", :git => "https://github.com/leavez/cocoapods-binary.git", :tag => "v0.4.1"`

**Then, run `bundle install` to install the added gem.**

In case you're not familiar with [bundler](https://bundler.io/), take a look at [Learn how to set it up here](https://www.mokacoding.com/blog/ruby-for-ios-developers-bundler/).

```
plugin 'cocoapods-binary'

use_frameworks!
# all_binary!

target "HP" do
    pod "ExpectoPatronum", :binary => true
end
```

Add plugin `cocoapods-binary` in the head of Podfile
Add `:binary => true` as a option of one specific pod, or add `all_binary!` before all targets, which makes all pods binaries.
`pod install`, and that's all

Note: cocoapods-binary require `use_frameworks!`. If your worry about the boot time and other problems introduced by dynamic framework, static framework is a good choice. Another [plugin](https://github.com/leavez/cocoapods-static-swift-framework) made by me to make all pods static frameworks is recommended.

```
$ bundle exec pod install --no-repo-update --verbose
  Preparing
    - Running pre install hooks
      - cocoapods-binary from `/Users/xxx/.rvm/gems/ruby-2.7.5/bundler/gems/cocoapods-binary-668abc78abdb/lib/cocoapods-binary/Main.rb`
🚀  Prebuild frameworks
        Preparing
          - Running pre install hooks
            - cocoapods-binary from `/Users/xxx/.rvm/gems/ruby-2.7.5/bundler/gems/cocoapods-binary-668abc78abdb/lib/cocoapods-binary/Main.rb`
```

Build Error
Showing All Messages
Multiple commands produce '/Users/XXX/Library/Developer/Xcode/DerivedData/xxx-xxxgqzphmhuovkaxcuqnlsxcnxxx/Build/Products/Debug-iphonesimulator/AFNetworking/AFNetworking.framework.dSYM'

I have the same problem. Although I can use version 0.4.1 on an ad hoc basis.
I updated my Gemfile to this:
```
source 'https://rubygems.org'
gem 'cocoapods', '~> 1.10.0'
gem 'cocoapods-binary', '0.4.1'
```
```
➜  synergy-ios git:(release/1.1_sti) ✗ bundle install
Fetching https://github.com/leavez/cocoapods-binary.git
fatal: Needed a single revision
Git error: command `git rev-parse --verify 0.4.1` in directory /Users/xxx/.rvm/gems/ruby-2.7.5/cache/bundler/git/cocoapods-binary-b00c3629553e161546c77edd9809eb9d2b0b7ea1 has
failed.
Revision 0.4.1 does not exist in the repository https://github.com/leavez/cocoapods-binary.git. Maybe you misspelled it?
If this error persists you could try removing the cache directory '/Users/xxx/.rvm/gems/ruby-2.7.5/cache/bundler/git/cocoapods-binary-b00c3629553e161546c77edd9809eb9d2b0b7ea1'
```
`$ rm -rf /Users/xxx/.rvm/gems/ruby-2.7.5/cache/bundler/git/cocoapods-binary-b00c3629553e161546c77edd9809eb9d2b0b7ea1`

Is the accepted workaround to just run `gem uninstall cocoapods-binary` and then `gem install cocoapods-binary -v 0.4.1` to downgrade to 0.4.1? That seems to work for me. 

**Same issue here, but downgrading to 0.4.1 didn't help me...**

You can fix this by hand ，for example
`Pods/Target Support Files/AFNetworking/AFNetworking-copy-dsyms-output-files.xcfilelist`

Delete duplicate lines，left only one line
`${DWARF_DSYM_FOLDER_PATH}/AFNetworking.framework.dSYM`

Cumbersome to delete all duplicate lines in all `output-files.xcfilelist` and `input-files.xcfilelist` files, but surprised the issue was that simple.
If you want to fix this automatically you can put this in your `Podfile`.
```
post_integrate do |installer|
  patch_cocoapods_binary_dsyms(installer)
end

def patch_cocoapods_binary_dsyms(installer)
  installer.generated_projects.each do |project|
    project.targets.each do |target|
      target.shell_script_build_phases.each do |phase|
        
        shell_file = phase.shell_script.strip.gsub!(/\A"|"\Z/, '').delete_prefix "${PODS_ROOT}"
        shell_file = File.join("./Pods", shell_file)
        
        shell_script = File.read(shell_file, chomp: true)
        fixed_shell_script = shell_script.gsub("\"${DERIVED_FILES_DIR}\"", "\"${DERIVED_FILES_DIR}/\"")

        File.open(shell_file, "w") do |f|
          f.write(fixed_shell_script)
        end
        
        phase.input_file_list_paths.each do |file_list_path|
          dedupe_file_list(file_list_path)
        end
        
        phase.output_file_list_paths.each do |file_list_path|
          dedupe_file_list(file_list_path)
        end
      end
    end
  end
end

def dedupe_file_list(file_list_path)
  file_list_path = file_list_path.delete_prefix "${PODS_ROOT}"
  file_list_path = File.join("./Pods", file_list_path)
  
  contents = File.readlines(file_list_path, chomp: true)
  contents = contents.uniq
  File.open(file_list_path, "w") do |file|
    file.puts contents
  end
end
```

### Options

**If you want to disable binary for a specific pod when using `all_binary!`, place a `:binary => false` to it.**

If your Pods folder is excluded from git, you may add `keep_source_code_for_prebuilt_frameworks!` in the head of Podfile to speed up pod install, as it won't download all the sources every time prebuilt pods have changes.

If bitcode is needed, add a `enable_bitcode_for_prebuilt_frameworks!` before all targets in Podfile

*Performance Optimization Results*

According to official benchmarks, in a project with multiple commonly used libraries, using the plugin can achieve about 10% build time optimization. This is undoubtedly a big improvement in large-scale projects.

*Conclusion*

The CocoaPods binary cache plugin brings a new speed experience to iOS development with its simple design and powerful performance. We strongly recommend that all projects facing build time issues try to adopt this technology. Join now and enjoy a faster development process!

## References

[Swift Package Manager vs CocoaPods vs Carthage for All Platforms](https://www.codementor.io/blog/swift-package-manager-5f85eqvygj#why-should-i-use-it)
[cocoapods-packager 插件的错误修复和适配](https://kanchuan.com/blog/200-cocoapods-packager)
[cocoapods-binary](https://github.com/leavez/cocoapods-binary)
[cocoapods-binary-cache](https://github.com/grab/cocoapods-binary-cache)
[Your Podfile requires that the plugin cocoapods-binary be installed](https://github.com/leavez/cocoapods-binary/issues/43)
[CocoaPods and Carthage](https://stackoverflow.com/questions/37744365/cocoapods-and-carthage/59257708#59257708)
[Enable prebuiding for all pods it has a lower priority to other binary settings](https://www.rubydoc.info/gems/cocoapods-binary/Pod%2FPodfile%2FDSL:all_binary!)
[Pre-compiling dependencies](https://guides.cocoapods.org/plugins/pre-compiling-dependencies.html)
[Apple Documentation - Swift packages](https://developer.apple.com/documentation/xcode/swift-packages)
[Creating a standalone Swift package with Xcode](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode)
[Bundling resources with a Swift package](https://developer.apple.com/documentation/xcode/bundling-resources-with-a-swift-package)
[Swift Package Manager的使用](https://blog.csdn.net/nogodoss2018/article/details/126473728)
[Swift Package in a Private Github Repo and as dependency with Xcode](https://medium.com/%40jens.tenter/swift-package-in-a-private-github-repo-and-as-dependency-with-xcode-25996d5998b3)
[How to Create your First Package with Swift Package Manager](https://www.swiftyplace.com/blog/modular-code-with-swift-package-manager)
[Package Manager](https://www.swift.org/documentation/package-manager/)
[Creating Swift Packages in Xcode](https://nathankrishnan.medium.com/creating-swift-packages-in-xcode-2a5486809773)
[Carthage Tutorial: Getting Started](https://www.kodeco.com/7649117-carthage-tutorial-getting-started)
[前言：加速你的iOS构建流程，CocoaPods二进制缓存插件](https://blog.csdn.net/gitblog_00076/article/details/139108772)
[Cocoapods-Binary 使用教程](https://blog.csdn.net/gitblog_00024/article/details/141151109)
["Multiple commands produce..." errors in Xcode 12.2, Big Sur #136](https://github.com/leavez/cocoapods-binary/issues/136)
[iOS - Xcode提高编译速度，增量编译，ccache](https://blog.csdn.net/icefishlily/article/details/80267223)
[Ccache — a fast C/C++ compiler cache](https://ccache.dev)
[Carthage Tutorial: Getting Started](https://www.kodeco.com/7649117-carthage-tutorial-getting-started)
[Step by step guide on using Carthage dependency manager](https://kevinle.medium.com/step-by-step-guide-on-using-carthage-dependency-manager-a29c15f9a1ac)
[iOS利用cocoapods-pachager打包静态库](https://www.jianshu.com/p/88228c68cdfb)
[iOS Devices: Releases, Firmware, Instruction Sets, Screen Sizes](https://www.innerfence.com/howto/apple-ios-devices-dates-versions-instruction-sets)
