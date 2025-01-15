# Xcode - Improve compile speed and incremental compile for projects mixed with oc & swift

- Step 1. 
Reduce the code contained in the OC & Swift bridge file, abstract the middle layer to reduce dependencies, gradually modularize, delete the code and resources of obsolete&duplicate functions, and optimize the compilation time;

- Step 2. 
Cocoapods/Carthage is gradually replaced by Swift package manager, and the underlying library that is not frequently changed can be accessed through the binary zip package to further reduce the compilation time;

- Step 3. 
All codes will be gradually converted to Swift in the future, and the OC library will be directly replaced by the Swift library, the bridge file will be removed, the ScanDependencies time will be reduced, and the compilation speed will be greatly improved.

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

The "-list" option can be used to find the names of the schemes in the workspace.

`xcodebuild -workspace xxx.xcworkspace -list`

To generate timing information using the xcodebuild command-line tool,

pass the `-showBuildTimingSummary` option to the tool.

`xcodebuild -workspace XXXX.xcworkspace -scheme <target-name> -showBuildTimingSummary`

*Optimize before*
```
Build Timing Summary

ScanDependencies (2496 tasks) | 675.098 seconds

CompileC (2493 tasks) | 467.794 seconds

CompileAssetCatalogVariant (10 tasks) | 97.362 seconds

Ld (101 tasks) | 20.580 seconds

PhaseScriptExecution (23 tasks) | 15.082 seconds

ValidateEmbeddedBinary (3 tasks) | 7.566 seconds

CopyPNGFile (13 tasks) | 7.471 seconds

SwiftCompile (1 task) | 2.140 seconds

CodeSign (7 tasks) | 1.906 seconds

SwiftEmitModule (1 task) | 1.352 seconds

GenerateTAPI (84 tasks) | 1.180 seconds

ProcessInfoPlistFile (153 tasks) | 1.125 seconds

ProcessPCH (3 tasks) | 0.733 seconds

CopySwiftLibs (1 task) | 0.520 seconds

Libtool (10 tasks) | 0.471 seconds

CpResource (8 tasks) | 0.240 seconds

SwiftDriver (1 task) | 0.121 seconds

ExtractAppIntentsMetadata (48 tasks) | 0.086 seconds

ConstructStubExecutorLinkFileList (2 tasks) | 0.063 seconds

Copy (5 tasks) | 0.043 seconds

ProcessProductPackagingDER (4 tasks) | 0.028 seconds

LinkAssetCatalog (10 tasks) | 0.025 seconds

ProcessProductPackaging (4 tasks) | 0.003 seconds

SwiftDriver Compilation (1 task) | 0.002 seconds

Validate (1 task) | 0.001 seconds

SwiftDriver Compilation Requirements (1 task) | 0.000 seconds

warning: Run script build phase 'Run Script' will be run during every build because it does not specify any outputs. To address this issue, either add output dependencies to the script phase, or configure it to run in every build by unchecking "Based on dependency analysis" in the script phase. (in target 'xxx' from project 'XXX')
warning: Run script build phase 'Run Script' will be run during every build because it does not specify any outputs. To address this issue, either add output dependencies to the script phase, or configure it to run in every build by unchecking "Based on dependency analysis" in the script phase. (in target 'xxx' from project 'XXX')
** BUILD SUCCEEDED **
```

*optimize after*
```
//TODO...
```

## Obj-C/Swift bridge

1 [REPEATABLE STEP] Build Swift code, which is needed to compile Obj-C code
2 [REPEATABLE STEP] Build Obj-C code, which is needed to compile Swift code
3 Repeat 1 & 2 until you have only non-dependable Swift & Obj-C code left
4 Build Obj-C code
5 Build Swift code

So the first advice is to lower coupling. Your project parts have to be independent of each other.

Problem with those trees if you're using a Obj-C/Swift bridge, Xcode has to go through more phases than usual:
Perfect world:
    1    Builds Obj-C code
    2    Build Swift code

## Abstract the middle layer to reduce dependencies

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

💡Module Migration Mayhem
Moving 10+ custom CocoaPods to Swift Packages is a tricky task — especially so when they are inter-dependent and are all used by three iOS/tvOS app projects. Deciding the order of migration and determining which dependencies will be affected quickly became difficult, so having a graph to show who is dependent on whom sounded like a very good idea.
There seems to be various dependency graphing tools already available however none of them fulfilled all my requirements. For my purposes, a graphing tool must:
- Graph at a module-level, not class-level
- Support private/in-house libraries
- Show both Swift Packages and CocoaPods in a single graph

If you want to install [`xcgrapher`](https://itnext.io/graphing-xcode-project-dependencies-introducing-xcgrapher-cb99aa0a325e) you’ll need to add my tap first.

```
$ brew tap maxchuquimia/scripts
$ brew install xcgrapher
$ xcgrapher --help
```

I chose to use my own tap for this rather than adding it to the main brew tap because I’m not really a fan of keeping everything centralized in the way that Homebrew and CocoaPods do (for speed reasons). I personally hope Swift Packages never go this way…

**If you don’t use CocoaPods you’ll also need to install Xcodeproj.**

[Professional architecture review and planning tool for every Swift developer.](https://swiftalyzer.com)
[Visualize Your iOS App’s Dependency Graph](https://betterprogramming.pub/visualizing-dependency-graph-in-project-71210a5de269)
[objc-dependency-visualizer](https://github.com/PaulTaykalo/objc-dependency-visualizer)

## Reference
[Xcode 11 recompiles too much](https://stackoverflow.com/questions/60854743/xcode-11-recompiles-too-much)
[What are the differences between xcodebuild, xcrun and swift command line tools?](https://stackoverflow.com/questions/69030618/what-are-the-differences-between-xcodebuild-xcrun-and-swift-command-line-tools)
[Improving the speed of incremental builds](https://developer.apple.com/documentation/xcode/improving-the-speed-of-incremental-builds)
[Improving build efficiency with good coding practices](https://developer.apple.com/documentation/xcode/improving-build-efficiency-with-good-coding-practices#Minimize-the-number-of-symbols-you-share-between-Swift-and-Objective-C)
[Creating a multiplatform binary framework bundle](https://developer.apple.com/documentation/xcode/creating-a-multi-platform-binary-framework-bundle)
[Xcode build time frustration](https://forums.developer.apple.com/forums/thread/763913)
[Basic understanding of Abstract Syntax Tree (AST)](https://medium.com/jessica_lopez/basic-understanding-of-abstract-syntax-tree-ast-d40ff911c3bf)
[Six principles in object-oriented programming(OOP)](https://hellolyh.xlog.app/mian-xiang-dui-xiang-bian-cheng-zhong-de-liu-da-yuan-ze)
[Graphing Xcode project dependencies — Introducing](https://itnext.io/graphing-xcode-project-dependencies-introducing-xcgrapher-cb99aa0a325e)
[Graphviz - open source graph visualization software](https://graphviz.org)
