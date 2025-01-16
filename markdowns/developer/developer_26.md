# Xcode - Improve compile speed and incremental compile for projects mixed with oc & swift

- Step 1. 
Reduce the code contained in the OC & Swift bridge file, abstract the middle layer to reduce dependencies, gradually modularize, delete the code and resources of obsolete&duplicate functions, and optimize the compilation time;

- Step 2. 
Cocoapods/Carthage is gradually replaced by [Swift package manager](https://github.com/swiftlang/swift-package-manager), and the underlying library that is not frequently changed can be accessed through the binary zip package to further reduce the compilation time;

- Step 3. 
All codes will be gradually converted to Swift in the future, and the OC library will be directly replaced by the Swift library, the bridge file will be removed, the ScanDependencies time will be reduced, and the compilation speed will be greatly improved.

- Step 4. 
Final solution: Tuist + SPM
[Scaling iOS at Bumble](https://medium.com/bumble-tech/scaling-ios-at-bumble-239e0fa009f2)
[Quick start](https://docs.tuist.dev/en/)
[Migrating from Swift Package Manager to Tuist](https://docs.tuist.dev/en/guides/start/migrate/swift-package#migrating-from-swift-package-manager-to-tuist)
[Setting up Tuist 4 to your existing project](https://toyboy2.medium.com/setting-tuist-to-your-exist-project-9136882c0d85)

## [Six principles in object-oriented programming(OOP)](https://hellolyh.xlog.app/mian-xiang-dui-xiang-bian-cheng-zhong-de-liu-da-yuan-ze)

- Single Responsibility Principle (SRP) 📏: A class should have only one reason for its change, that is, a class should be responsible for only one responsibility. For example, a Person class should only be responsible for work related to Person, and should not deal with other unrelated work.

- Open/Closed Principle (OCP) 🚪: Software entities should be open to extensions and closed to modifications. For example, define a graphic class, and then let different types of graphics inherit the class without modifying the graphic class itself.

- Liskov Substitution Principle (LSP) 🐯🦁: Subclass objects should be able to replace all parent objects.

- Interface Segregation Principle (ISP) 🛡️: The client should not rely on those interfaces it does not need, that is, the interface should be small and specialized.

- Dependency Inversion Principle (DIP) 🌱: High-level modules should not depend on underlying modules, and both should depend on abstraction; abstraction should not depend on details, and details should depend on abstraction. For example, a company class includes a department class, and a combination relationship should be considered instead of an inheritance relationship.

- Law of Demeter (LOD) 🤝: An object should have the least knowledge of other objects and only interact with its direct friends.

## Generate timing information using the xcodebuild command-line tool

`rm -rf ~/Library/Developer/Xcode/DerivedData`

Xcode Clean -> Cmd + K

**Clean DerivedData before building**

The "-list" option can be used to find the names of the schemes in the workspace.

`xcodebuild -workspace xxx.xcworkspace -list`

To generate timing information using the xcodebuild command-line tool, pass the `-showBuildTimingSummary` option to the tool.

`xcodebuild -workspace XXXX.xcworkspace -scheme <target-name> -showBuildTimingSummary`

**`xcodebuild` generated Build Timing Summary is different every time, so let's using Xcode to buiding.**

If you use Xcode, `Product->Perform Action->Build With Timing Summary`. And see `Build Timing Summary` in the Xcode building log.

**~~`MDBridgingManager`~~ do not work at all, even worse!!!**

|Status|Total|SwiftCompile|CompileC|ScanDependencies|CompileAssetCatalogVariant|PhaseScriptExecution|CompileXIB|SwiftEmitModule|
|:|:|:|:|:|:|:|:|:|
|Cold (Before)|221.3|599.3|372.2|212.1|90.2|239.6|47.7|55.3|
|Cold (Before)|211.2|598.9|386.1|215.6|95.7|145.4|43.5|53.6|
|Hot (Before)|22.8|0|0|0|0|12.8|0|0|
|----|----|----|----|----|----|----|----|----|
|Cold (After)|222.8|604.6|389.3|224.1|96.0|184.0|51.8|54.9|
|Cold (After)|215.7|588.5|373.6|214.7|92.4|193.9|55.4|53.9|
|Hot (After)|24.6|0|0|0|0|13.0|0|0|

```
//  Bridging-Header.h
//  Build Settings -> User-Defined: SWIFT_OBJC_BRIDGING_HEADER = $(SRCROOT)/Bridging-Header.h
//  Use this file to import your target's public headers that you would like to expose to Swift.
//
#import "MDBridgingManager.h"
```

```
//
//  MDBridgingManager.h
//
//  Created by Michael Ledger on 1/15/25.
//  Copyright © 2025 MichaelLedger. All rights reserved.
//

/*
 Why we create this?
 Decoupling and abstraction codes & Improving the speed of incremental builds
 */

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol MDWebServicesControllerBridgingDelegate <NSObject>

@required
+ (void)addStatistics:(NSDictionary *)params
              handler:(void (^ _Nullable)(BOOL, NSDictionary *))handler;

+ (void)trackEvent:(NSString *)event
   outerParameters:(nullable NSDictionary *)outerParams
            screen:(NSString *)screenId;

+ (void)getBookHolidaysWithStartDate:(NSDate *)startDate
                             endDate:(NSDate *)endDate
                             handler:(void (^ _Nullable)(BOOL, NSDictionary *))handler;

@end

#ifndef CALENDAR_SKIP
@protocol MDCStartDateDialogVcBridgingDelegate <NSObject>

@required
+ (UIViewController *)startDateDialogVCWithStartDate:(NSDate *)startDate
                                      didSelectMonth:(void (^) (NSInteger chosenYear, NSInteger selectedMonth))didSelectMonth;

@end
#endif

#ifndef CALENDAR_SKIP
@interface MDBridgingManager: NSObject <MDWebServicesControllerBridgingDelegate, MDCStartDateDialogVcBridgingDelegate>
#else
@interface MDBridgingManager: NSObject <MDWebServicesControllerBridgingDelegate>
#endif
@end

NS_ASSUME_NONNULL_END
```

### [Xcode project dependencies graph](https://stackoverflow.com/questions/62903739/xcode-project-dependencies-graph)

**Now is easy to check `Compute target dependency graph -> Target dependency graph` in Xcode build messages.**

Xcode -> View -> Navigators -> Reports (Cmd + 9) then choose Local -> All Messages

> [`xcgrapher`](https://itnext.io/graphing-xcode-project-dependencies-introducing-xcgrapher-cb99aa0a325e)

💡Module Migration Mayhem
Moving 10+ custom CocoaPods to Swift Packages is a tricky task — especially so when they are inter-dependent and are all used by three iOS/tvOS app projects. Deciding the order of migration and determining which dependencies will be affected quickly became difficult, so having a graph to show who is dependent on whom sounded like a very good idea.
There seems to be various dependency graphing tools already available however none of them fulfilled all my requirements. For my purposes, a graphing tool must:
- Graph at a module-level, not class-level
- Support private/in-house libraries
- Show both Swift Packages and CocoaPods in a single graph

If you want to install `xcgrapher` you’ll need to add my tap first.

```
$ brew tap maxchuquimia/scripts
$ brew install xcgrapher
$ xcgrapher --help
```

I chose to use my own tap for this rather than adding it to the main brew tap because I’m not really a fan of keeping everything centralized in the way that Homebrew and CocoaPods do (for speed reasons). I personally hope Swift Packages never go this way…

If you don’t use CocoaPods you’ll also need to install Xcodeproj.

[Professional architecture review and planning tool for every Swift developer.](https://swiftalyzer.com)
[Visualize Your iOS App’s Dependency Graph](https://betterprogramming.pub/visualizing-dependency-graph-in-project-71210a5de269)
[objc-dependency-visualizer](https://github.com/PaulTaykalo/objc-dependency-visualizer)

## [Tuist](https://tuist.dev)

Scale your Swift App development
We are an integrated and open core toolchain that extends Apple's official tools with insights, optimizations, and workflows to help you build better apps faster

We often come across developers and organizations that challenge the need for Tuist considering that Swift Package Manager can take a similar project management role. Some venture into a migration to later on realize that their developer experience has degraded signicantly. For instance, the rename of a file might take up to 15 seconds to re-index. 15 seconds!

**Whether Apple will make Swift Package Manager a built-for-scale project manager is uncertain.** However, we are not seeing any signs that it's happening. In fact, we are seeing quite the opposite. They are making Xcode-inspired decisions, like achieving convenience through implicit configurations, which as you might know, is the source of complications at scale. We believe it'd take Apple to go to first principles and revisit some decisions that made sense as a dependency manager but not as a project manager, for example the usage of a compiled language as an interface to define projects.

> **SPM AS JUST A DEPENDENCY MANAGER**
Tuist treats Swift Package Manager as a dependency manager, and it's a great one. We use it to resolve dependencies and to build them. We don't use it to define projects because it's not designed for that.

[Quick start](https://docs.tuist.dev/en/)

[Migrating from Swift Package Manager to Tuist](https://docs.tuist.dev/en/guides/start/migrate/swift-package#migrating-from-swift-package-manager-to-tuist)

[Setting up Tuist 4 to your existing project](https://toyboy2.medium.com/setting-tuist-to-your-exist-project-9136882c0d85)

## Reference
[Scaling iOS at Bumble: Part 2/3 — The Assessment](https://medium.com/bumble-tech/scaling-ios-at-bumble-239e0fa009f2)
[Swift package manager](https://github.com/swiftlang/swift-package-manager)
[Xcode 11 recompiles too much](https://stackoverflow.com/questions/60854743/xcode-11-recompiles-too-much)
[What are the differences between xcodebuild, xcrun and swift command line tools?](https://stackoverflow.com/questions/69030618/what-are-the-differences-between-xcodebuild-xcrun-and-swift-command-line-tools)
[How to enable build timing in Xcode?](https://stackoverflow.com/questions/1027923/how-to-enable-build-timing-in-xcode)
[Improving the speed of incremental builds](https://developer.apple.com/documentation/xcode/improving-the-speed-of-incremental-builds)
[Improving build efficiency with good coding practices](https://developer.apple.com/documentation/xcode/improving-build-efficiency-with-good-coding-practices#Minimize-the-number-of-symbols-you-share-between-Swift-and-Objective-C)
[Creating a multiplatform binary framework bundle](https://developer.apple.com/documentation/xcode/creating-a-multi-platform-binary-framework-bundle)
[Xcode build time frustration](https://forums.developer.apple.com/forums/thread/763913)
[Basic understanding of Abstract Syntax Tree (AST)](https://medium.com/jessica_lopez/basic-understanding-of-abstract-syntax-tree-ast-d40ff911c3bf)
[Six principles in object-oriented programming(OOP)](https://hellolyh.xlog.app/mian-xiang-dui-xiang-bian-cheng-zhong-de-liu-da-yuan-ze)
[Graphing Xcode project dependencies — Introducing](https://itnext.io/graphing-xcode-project-dependencies-introducing-xcgrapher-cb99aa0a325e)
[Graphviz - open source graph visualization software](https://graphviz.org)
[Tuist](https://tuist.dev)
[Quick start](https://docs.tuist.dev/en/)
[Migrating from Swift Package Manager to Tuist](https://docs.tuist.dev/en/guides/start/migrate/swift-package#migrating-from-swift-package-manager-to-tuist)
[Setting up Tuist 4 to your existing project](https://toyboy2.medium.com/setting-tuist-to-your-exist-project-9136882c0d85)
