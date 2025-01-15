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

**Clean DerivedData before building**

The "-list" option can be used to find the names of the schemes in the workspace.

`xcodebuild -workspace xxx.xcworkspace -list`

To generate timing information using the xcodebuild command-line tool, pass the `-showBuildTimingSummary` option to the tool.

`xcodebuild -workspace XXXX.xcworkspace -scheme <target-name> -showBuildTimingSummary`

**`xcodebuild` generated Build Timing Summary is different every time, so let's using Xcode to buiding.**

If you use Xcode, `Product->Perform Action->Build With Timing Summary`. And see `Build Timing Summary` in the Xcode building log.

**Focus on `ScanDependencies` part cost, it saved 16 seconds after we used `MDBridgingManager` below!!!**

*Optimize before: Total cost 262.6 seconds & ScanDependencies (2496 tasks) | 252.598 seconds*
```
//Xcode
Showing Recent Messages

Build Timing Summary

SwiftCompile (411 tasks) | 657.265 seconds

CompileC (2499 tasks) | 382.242 seconds

ScanDependencies (2496 tasks) | 252.598 seconds

CompileAssetCatalogVariant (10 tasks) | 150.908 seconds

PhaseScriptExecution (23 tasks) | 86.691 seconds

CompileXIB (166 tasks) | 69.241 seconds

SwiftEmitModule (54 tasks) | 60.158 seconds

Ld (103 tasks) | 20.394 seconds

CopyPNGFile (13 tasks) | 7.172 seconds

ValidateEmbeddedBinary (3 tasks) | 6.368 seconds

CopyStringsFile (67 tasks) | 2.596 seconds

SwiftDriver (54 tasks) | 2.250 seconds

GenerateAssetSymbols (1 task) | 1.818 seconds

CodeSign (8 tasks) | 1.683 seconds

SwiftGeneratePch (1 task) | 1.606 seconds

ProcessInfoPlistFile (153 tasks) | 1.362 seconds

AppIntentsSSUTraining (48 tasks) | 1.330 seconds

GenerateTAPI (84 tasks) | 1.056 seconds

ProcessPCH (3 tasks) | 1.014 seconds

CpResource (274 tasks) | 0.870 seconds

CpHeader (816 tasks) | 0.853 seconds

WriteAuxiliaryFile (1991 tasks) | 0.802 seconds

Touch (153 tasks) | 0.769 seconds

CompileMetalFile (2 tasks) | 0.680 seconds

Copy (324 tasks) | 0.660 seconds

RegisterExecutionPolicyException (153 tasks) | 0.592 seconds

Libtool (10 tasks) | 0.509 seconds

CopySwiftLibs (1 task) | 0.477 seconds

CompileStoryboard (3 tasks) | 0.330 seconds

MetalLink (2 tasks) | 0.191 seconds

ExtractAppIntentsMetadata (48 tasks) | 0.081 seconds

SwiftMergeGeneratedHeaders (54 tasks) | 0.059 seconds

ConstructStubExecutorLinkFileList (2 tasks) | 0.057 seconds

ProcessProductPackagingDER (4 tasks) | 0.036 seconds

CopyPlistFile (11 tasks) | 0.030 seconds

CompileXCStrings (1 task) | 0.028 seconds

LinkAssetCatalog (10 tasks) | 0.021 seconds

LinkStoryboards (1 task) | 0.013 seconds

ProcessProductPackaging (8 tasks) | 0.012 seconds

SwiftDriver Compilation (54 tasks) | 0.003 seconds

Validate (1 task) | 0.001 seconds

SwiftDriver Compilation Requirements (54 tasks) | 0.001 seconds

```

*optimize after for now: Total cost: 306.4 seconds & ScanDependencies (2497 tasks) | 235.958 seconds*

```
//Xcode
Showing Recent Messages

Build Timing Summary

SwiftCompile (411 tasks) | 664.061 seconds

CompileC (2500 tasks) | 363.420 seconds

PhaseScriptExecution (23 tasks) | 289.402 seconds

ScanDependencies (2497 tasks) | 235.958 seconds

CompileAssetCatalogVariant (10 tasks) | 152.440 seconds

SwiftEmitModule (54 tasks) | 62.942 seconds

CompileXIB (166 tasks) | 60.728 seconds

Ld (103 tasks) | 19.641 seconds

CopyPNGFile (13 tasks) | 7.575 seconds

ValidateEmbeddedBinary (3 tasks) | 6.461 seconds

CopyStringsFile (67 tasks) | 2.653 seconds

GenerateAssetSymbols (1 task) | 2.300 seconds

SwiftGeneratePch (1 task) | 2.099 seconds

SwiftDriver (54 tasks) | 2.008 seconds

CodeSign (8 tasks) | 1.828 seconds

ProcessInfoPlistFile (153 tasks) | 1.413 seconds

AppIntentsSSUTraining (48 tasks) | 1.292 seconds

GenerateTAPI (84 tasks) | 1.033 seconds

WriteAuxiliaryFile (1991 tasks) | 0.925 seconds

CpResource (274 tasks) | 0.924 seconds

CpHeader (816 tasks) | 0.893 seconds

ProcessPCH (3 tasks) | 0.795 seconds

CompileMetalFile (2 tasks) | 0.691 seconds

Copy (324 tasks) | 0.639 seconds

Touch (153 tasks) | 0.587 seconds

CopySwiftLibs (1 task) | 0.568 seconds

RegisterExecutionPolicyException (153 tasks) | 0.562 seconds

Libtool (10 tasks) | 0.497 seconds

CompileStoryboard (3 tasks) | 0.438 seconds

MetalLink (2 tasks) | 0.167 seconds

ExtractAppIntentsMetadata (48 tasks) | 0.088 seconds

SwiftMergeGeneratedHeaders (54 tasks) | 0.066 seconds

ConstructStubExecutorLinkFileList (2 tasks) | 0.066 seconds

ProcessProductPackagingDER (4 tasks) | 0.039 seconds

SwiftDriver Compilation (54 tasks) | 0.031 seconds

CopyPlistFile (11 tasks) | 0.026 seconds

CompileXCStrings (1 task) | 0.021 seconds

LinkAssetCatalog (10 tasks) | 0.021 seconds

ProcessProductPackaging (8 tasks) | 0.019 seconds

LinkStoryboards (1 task) | 0.012 seconds

Validate (1 task) | 0.001 seconds

SwiftDriver Compilation Requirements (54 tasks) | 0.001 seconds


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

**Now is easy to check `Compute target dependency graph -> Target dependency graph` in Xcode build messages.**

Xcode -> View -> Navigators -> Reports (Cmd + 9) then choose Local -> All Messages

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
[How to enable build timing in Xcode?](https://stackoverflow.com/questions/1027923/how-to-enable-build-timing-in-xcode)
[Improving the speed of incremental builds](https://developer.apple.com/documentation/xcode/improving-the-speed-of-incremental-builds)
[Improving build efficiency with good coding practices](https://developer.apple.com/documentation/xcode/improving-build-efficiency-with-good-coding-practices#Minimize-the-number-of-symbols-you-share-between-Swift-and-Objective-C)
[Creating a multiplatform binary framework bundle](https://developer.apple.com/documentation/xcode/creating-a-multi-platform-binary-framework-bundle)
[Xcode build time frustration](https://forums.developer.apple.com/forums/thread/763913)
[Basic understanding of Abstract Syntax Tree (AST)](https://medium.com/jessica_lopez/basic-understanding-of-abstract-syntax-tree-ast-d40ff911c3bf)
[Six principles in object-oriented programming(OOP)](https://hellolyh.xlog.app/mian-xiang-dui-xiang-bian-cheng-zhong-de-liu-da-yuan-ze)
[Graphing Xcode project dependencies — Introducing](https://itnext.io/graphing-xcode-project-dependencies-introducing-xcgrapher-cb99aa0a325e)
[Graphviz - open source graph visualization software](https://graphviz.org)
