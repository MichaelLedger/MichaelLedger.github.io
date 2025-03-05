# HotReloading for Swift, Objective-C & C++

## [InjectionIII](https://github.com/johnno1962/InjectionIII?tab=readme-ov-file)

Code injection allows you to update the implementation of functions and any method of a class, struct or enum incrementally in **the iOS simulator only** without having to perform a full rebuild or restart your application. This saves the developer a significant amount of time tweaking code or iterating over a design. Effectively it changes Xcode from being a "source editor" to being a "program editor" where source changes are not just saved to disk but into your running program directly.

## Codes
```
#if DEBUG
Bundle(path: "/Applications/InjectionIII.app/Contents/Resources/iOSInjection.bundle")?.load()
//for tvOS:
Bundle(path: "/Applications/InjectionIII.app/Contents/Resources/tvOSInjection.bundle")?.load()
//Or for macOS:
Bundle(path: "/Applications/InjectionIII.app/Contents/Resources/macOSInjection.bundle")?.load()
#endif
```

```
//
//  UIViewController+HotReload.m

#import "UIViewController+HotReload.h"

@implementation UIViewController (HotReload)

- (void)customHotReload {
#ifdef DEBUG
    for (UIView *v in self.view.subviews) {
        [v removeFromSuperview];
    }
    [self viewDidLoad];
    [self viewWillAppear:YES];
    [self viewDidAppear:YES];
#endif
}

@end
```

```
//
//  AppDelegate+HotReload.m

#import "AppDelegate+HotReload.h"

@implementation AppDelegate (HotReload)

#if DEBUG
- (void)injectHotReload {
    [[NSBundle bundleWithPath:@"/Applications/InjectionIII.app/Contents/Resources/iOSInjection.bundle"] load];
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(refreshCurrentController) name:@"INJECTION_BUNDLE_NOTIFICATION" object:nil];
}

- (void)refreshCurrentController {
    UIWindow *window = nil;
    NSArray  *windows = [[UIApplication sharedApplication] windows];
    for (UIWindow *win in windows) {
        if (win.isKeyWindow) {
            window = win;
            break;
        }
    }
    UINavigationController *nc = nil;
    UIViewController *viewController = window.rootViewController;
    if([viewController isKindOfClass:[UINavigationController class]]){
        nc = (UINavigationController*)viewController;
    }
    if (nc == nil) {
        NSArray *reverseArray = [[viewController.childViewControllers reverseObjectEnumerator] allObjects];
        for (UINavigationController *controller in reverseArray) {
            if ([controller isKindOfClass:[UITabBarController class]]) {
                UITabBarController *tabBarController = (UITabBarController *)controller;
                nc = [tabBarController.viewControllers objectAtIndex:tabBarController.selectedIndex];
                break;
            }
        }
    }
    if (nc == nil) {
        for (UINavigationController *controller in reverseArray) {
            if ([controller isKindOfClass:[UINavigationController class]]) {
                nc = controller;
                break;
            }
        }
    }
    
    UINavigationController *rootNavigation = nc;
    UIViewController *controller = rootNavigation.visibleViewController;
    if (!controller) {
        controller = rootNavigation.viewControllers.lastObject;
    }

    if (!controller) {
        return;
    }

    NSArray<UIViewController *> *childControllers = [controller childViewControllers];
    [childControllers enumerateObjectsUsingBlock:^(UIViewController * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        if (obj.view.hidden) {
            return;
        }
        NSLog(@"Injection reload childController: %@", @(class_getName(obj.class)));
        [obj customHotReload];
    }];
   
    NSLog(@"Injection reload: %@", @(class_getName(controller.class)));
    [controller customHotReload];
}
#endif


@end
```

```
// AppDelegate.m
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    //...
    #if DEBUG
        [self injectHotReload];
    #endif
    return YES;
}
```

## Steps
- Install Server: https://github.com/johnno1962/InjectionIII/releases
- Server only needs to select the project folder contains `.xcodeproj` when opening for the first time, and does not need to be opened during debugging
- Modify the code in Xcode, `CMD + S` triggers the file update
- Default response `- (void)viewDidLoad` method, override `- (void)customHotReload` to customize
- Add or modify to complete real-time drawing. If you delete an existing element (view) on the page, you need to exit the page and re-enter to see the effect

## Practice
```
💉 InjectionIII connected /Users/xxx/Downloads/xxx/xxx/xxx.xcworkspace
Injection reload: XXXViewController
```

## What injection can't do

You can't inject changes to how data is laid out in memory i.e. you cannot add, remove or reorder properties with storage. For non-final classes this also applies to adding or removing methods as the vtable used for dispatch is itself a data structure which must not change over injection. Injection also can't work out what pieces of code need to be re-executed to update the display as discussed above. Also, don't get carried away with access control. private properties and methods can't be injected directly, particularly in extensions as they are not a global interposable symbol. They generally inject indirectly as they can only be acessed inside the file being injected but this can cause confusion. Finally, Injection doesn't cope well with source files being added/renamed/deleted during injection. You may need to build and relaunch your app or even close and reopen your project to clear out old Xcode build logs.

### Xcode 16

New in Xcode 16 is `SWIFT_ENABLE_OPAQUE_TYPE_ERASURE` build setting. This setting is turned ON by default and you don't need to erase view body explicitly. You'll still need to `@ObserveInjection` to force redraws.

## How it works

Injection has worked various ways over the years, starting out using the "Swizzling" apis for Objective-C but is now largely built around a feature of `Apple's linker` called "interposing" which provides a solution for any Swift method or computed property of any type.

When your code calls a function in Swift, it is generally "statically dispatched", i.e. linked using the `mangled symbol` of the function being called. Whenever you link your application with the `-interposable` option however, an additional level of indirection is added where it finds the address of all functions being called through a section of writable memory. Using the operating system's ability to load executable code and the fishhook library to "rebind" the call it is therefore possible to "interpose" new implementations of any function and effectively stitch them into the rest of your program at runtime. From that point it will perform as if the new code had been built into the program.

Injection uses the `FSEventSteam` api to watch for when a source file has been changed and scans the last Xcode build log for how to recompile it and links a dynamic library that can be loaded into your program. Runtime support for injection then loads the dynamic library and scans it for the function definitions it contains which it then "interposes" into the rest of the program. This isn't the full story as the dispatch of non-final class methods uses a "vtable" (think C++ virtual methods) which also has to be updated but the project looks after that along with any legacy Objective-C "swizzling".

## [ViewController Life Cycle in iOS](https://medium.com/%40knoo/viewcontroller-life-cycle-in-ios-29f7da4acfc7)
```
init()
loadView()
viewDidLoad()
viewWillAppear()
viewIsAppearing()
viewWillLayoutSubviews()
viewDidLayoutSubviews()
viewDidAppear()
viewWillTransition()
viewWillDisappear()
viewDidDisappear()
deinit()
```

![](../image/developer/transaction.webp)

- `viewDidLoad()`: This method is called after the view controller has loaded its view hierarchy into memory. This method is called regardless of whether the view hierarchy was loaded from a nib file or created programmatically in the `loadView()` method. You usually override this method to perform additional initialization on views that were loaded from nib files. It’s a good place to perform one-time setup tasks for your view controller, such as initializing data, setting up UI elements, or loading data from external sources. **This method is called only once during the view controller’s lifecycle.**

- `viewIsAppearing()`: The system calls this method once each time a view controller’s view appears after the `viewWillAppear(_:)` call. In contrast to `viewWillAppear(_:)`, the system calls this method after it adds the view controller’s view to the view hierarchy, and the superview lays out the view controller’s view. By the time the system calls this method, both the view controller and its view have received updated trait collections and the view has accurate geometry.

- `viewWillTransition()`: This method is called when the view controller’s trait collection is changed by its parent. UIKit calls this method before changing the size of a presented view controller’s view. You can override this method in your own objects and use it to perform additional tasks related to the size change. For example, a container view controller might use this method to override the traits of its embedded child view controllers. Use the provided coordinator object to animate any changes you make.
If you override this method, you should either call super to propagate the change to children or manually forward the change to children.

- `deinit()`: This method is automatically called when an instance of a class is being deallocated or destroyed. It's the counterpart to the `init()` method, which is called when an instance is being initialized. You can use the `deinit()` method to perform cleanup tasks, release resources, or unregister from observers when the object is no longer needed.
For view controllers, `deinit()` can be useful for cleaning up any resources that were allocated during the view controller's lifecycle but are no longer needed. For example, you might **use `deinit()` to release memory, close network connections, or perform any other necessary cleanup** before the view controller is removed from memory.
