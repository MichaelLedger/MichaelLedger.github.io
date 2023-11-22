# iOS 16.1 - 实时活动 (Live Activity) & 灵动岛 (Dynamic Island) 适配

## 前言

从去年的 iPhone 14 Pro 开始，苹果支持了灵动岛，搭配上动画，效果非常惊艳，成功的将一个 “缺陷” 改造成了一个“功能”。

灵动岛非常适合展示一下实时信息，比如：

体育赛事
计时应用
当前播放的音乐内容
显示导航信息
上传/下载速度

今天就来聊聊如何开发一个灵动岛的应用。

## 准备知识

Live Activities use WidgetKit and share many aspects of their design and implementation with the widgets in your app. If your app supports Live Activities, consider implementing them at the same time you add your widgets. For more information about Live Activities, see Displaying live data with Live Activities.

The widget extension template provides an initial implementation that conforms to the Widget protocol. The widget’s body property determines the type of content that the widget presents. Static widgets use a StaticConfiguration for the body property. Other types of widget configurations include:

`AppIntentConfiguration` that enables user customization, such as a weather widget that needs a zip or postal code for a city, or a package-tracking widget that needs a tracking number.

`ActivityConfiguration` to present live data, such as scores during a sporting event or a food delivery estimate.

Live Activity is shown on devices with and without Dynamic Island. On a locked screen, it will look like a normal push notification. For devices with Dynamic Island, Live Activity is shown around the cameras.

> The corners of the dynamic island are rounded at 44 points. This corresponds to the rounding of the TrueDepth camera.

## Background Tasks
Live Activity does not have a timeline like widgets. To update or close Live Activity when the application is in the background, you need to use [Background Tasks](https://developer.apple.com/documentation/backgroundtasks).

> Background Tasks are not guaranteed to run on time.

## Through Push Notifications

When we create a Live Activity, we get a pushToken. It is used to update the Live Activity via push notifications.

You need to register the application to receive push notifications beforehand.

```
"aps": {
    "timestamp": 1168364460,
    "event": "update", // or end
    "content-state": {
        "dynamicStringValue": "New String Value"
        "dynamicIntValue": 5
        "dynamicBoolValue": true
    },
    "alert": {
        "title": "Title of classic Push",
        "body": "Body or classic push",
    }
}
```

## Trace Press
Clicking on Live Activity is good to open the relay screen, for this you need to implement Deep Link. Set the modifier widgetURL(_:). You can set a different link for each area:
```
DynamicIslandExpandedRegion(.leading) {
    Text("Leading Text with merge region")
        .widgetURL(URL(string: "example://action"))
}
```

## SceneDelegate Required for Dynamic Island Display Correctly

Resolution: Migrate AppDelegate to SceneDelegate

```
// AppDelegate.Swift
import UIKit
@UIApplicationMain
class AppDelegate : UIResponder, UIApplicationDelegate {
    var window : UIWindow?
    func application(_ application: UIApplication,
        didFinishLaunchingWithOptions 
        launchOptions: [UIApplication.LaunchOptionsKey : Any]?)
        -> Bool {
            if #available(iOS 13, *) {
                // do only pure app launch stuff, not interface stuff
            } else {
                self.window = UIWindow()
                let vc = ViewController()
                self.window!.rootViewController = vc
                self.window!.makeKeyAndVisible()
                self.window!.backgroundColor = .red
            }
            return true
    }
}
```
```
// SceneDelegate.swift
import UIKit
@available(iOS 13.0, *)
class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window : UIWindow?
    func scene(_ scene: UIScene,
        willConnectTo session: UISceneSession,
        options connectionOptions: UIScene.ConnectionOptions) {
            if let windowScene = scene as? UIWindowScene {
                self.window = UIWindow(windowScene: windowScene) 
                let vc = ViewController()                      
                self.window!.rootViewController = vc             
                self.window!.makeKeyAndVisible()                 
                self.window!.backgroundColor = .red
            }
    }
}
```
```
// ViewController.swift
import UIKit
class ViewController : UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        print("view did load")
        self.view.backgroundColor = .green
    }
}
```

### Create a deep link into your app
People tap a Live Activity to launch your app. To improve the user experience, you can use widgetURL(_:) to create a deep link into your app from the Lock Screen, compact leading, compact trailing, and minimal presentations. When the compact leading and trailing presentations are visible, make sure both link to the same screen in your app.
The expanded presentation offers additional options to create deep links into your app for more utility using SwiftUI’s Link.
If you don’t explicitly provide a deep link into your app with widgetURL(_:) or Link, the system launches your app and passes a NSUserActivity object to the scene(_:willContinueUserActivityWithType:) and scene(_:continue:) callbacks. Implement both callbacks and check whether the NSUserActivity object’s activityType is NSUserActivityTypeLiveActivity, and add code to open a screen in your app that fits the context of the active Live Activity.
For additional information about deep linking into your app, see [Linking to specific app scenes from your widget or Live Activity](https://developer.apple.com/documentation/WidgetKit/Linking-to-specific-app-scenes-from-your-widget-or-Live-Activity).

### Create multiple widget extensions

You can include multiple widget types in your widget extension, although your app can contain multiple extensions. For example, if some of your widgets use location information and others don’t, keep the widgets that use location information in a separate extension. This allows the system to prompt someone for authorization to use location information only for the widgets from the extension that uses location information. For details about bundling multiple widgets in an extension, see [WidgetBundle](https://developer.apple.com/documentation/SwiftUI/WidgetBundle).

### 场景限制及建议（节选）
最多持续8小时，使用场景需要考虑，8小时之后无法再刷新(目前实际还可以，但是以官方文档为准，自行限制)，12小时后强制消失（因此跨天场景不考虑）
创建时，需要app在前台主动创建，没启动应用的时候不能自己出现（与特定业务绑定，比如下单后显示）
卡片本身禁止定位以及网络请求，少量(4KB)数据可通过通知发送，或通过后台活动刷新数据
同场景多卡片由于样式趋同且折叠，不建议同时创建多卡片

### 灵动岛适配必要性（节选）
与锁屏Live Activity共享数据，在支持灵动岛的机型下，用户在非锁屏页面时，信息的更新会以灵动岛的形式展示更新
Live Activity创建后，灵动岛就可以进行点击响应了，如果不适配的话，点击灵动岛会自动进入主程序，并且长按会变成一个没有任何信息的黑块
iPhone14 Pro、iPhone14 Pro Max用户占比逐渐升高

### 开发基础知识（节选）
设备只支持iPhone，并且是有“药丸屏”的iPhone14Pro和14Pro Max上；
Max系统版本、编译器及iOS系统版本：>=MacOS12.4、>=Xcode14.0+beta4、>=iOS16.1+beta；
使用 ActivityKit 用于配置、开始、更新、结束实现 Live Activity 能力。使用 WidgetKit 、SwiftUI在widget小组件中创建 Live Activity的用户界面，这样小组件和 Live Activity的代码是可以共享；
Live Activity目前只能通过 ActivityKit 从主工程获取数据，或者从 远程通知 获取最新数据；无法访问网络或者接受位置更新信息
ActivityKit 和 远程通知推送 更新的数据不能超过4KB；
Live Activity可以给不同的控制绑定不同的 deeplink，使其跳转到不同的页面；
Live Activity在用户主动结束前最多存活8小时；
已经结束的 Live Activity 在锁屏也最多保留4小时，所以一个Live Activity 最长可以停留12小时；
最多同时存在两组 Live Activity ，排列顺序待发现
Live Activity只有Swift版本，项目是 OC的话需要桥接。

## 环境
MacBook Pro Apple M1 Pro
macOS Sonoma 14.1.1
Xcode 15.0.1
Swift 5

## 创建小组件 `Widget Extension`
File -> New -> Target -> Widget Extension
**切记不要与系统的类同名，譬如：~~DynamicIsland~~
建议不要以Extension结尾，系统会自动生成后缀为`Extension.appex`的文件**
Product Name -> `UploadWidget`
☑️ Include Live Activity
创建完成后会在对应的Project的根目录创建同名的文件夹`UploadWidget`
## 修改 `UploadWidget` 配置
如果找不到新建的widget的target，可以通过Manage Schemes添加
Product -> Scheme -> Manage Schemes...

Target -> `UploadWidget`:

Generl 修改最低版本要求为16.1
Minimum Deployments -> iOS 16.1

主工程的targets和Widget的Info.plist都需要添加配置
`NSSupportsLiveActivities` -> YES
`NSSupportsLiveActivitiesFrequentUpdates` -> NO
否则调用`request`创建`Activity`会抛出异常：
`[UploadWidget]:The operation couldn’t be completed. Target does not include NSSupportsLiveActivities plist key`

Xcode15可以直接在Build Settings -> Info.plist Values修改，**实测还是需要手动取Info.plist里面加才生效**。
Supports Live Activities -> YES
Supports Frequent Updates of Live Activities -> NO (按需设置)

封装一个管理器 `UploadWidgetManager` 以供主工程调用
```
@objcMembers
@available(iOS 16.1, *)
@objc public class UploadWidgetManager: NSObject {
    static let shared = UploadWidgetManager()
    private override init() { super.init() }
    
    var activity: Activity<UploadWidgetAttributes>? = nil
    
    public func start() {
        let attributes = UploadWidgetAttributes(name: "World")
        let contentState = UploadWidgetAttributes.ContentState.smiley
        do {
            if #available(iOS 16.2, *) {
                let activityContent = ActivityContent(state: contentState, staleDate: nil)
                self.activity = try Activity<UploadWidgetAttributes>.request(attributes: attributes, content: activityContent)
            } else {
                 // Fallback on earlier versions
                self.activity = try Activity<UploadWidgetAttributes>.request(attributes: attributes, contentState: contentState)
            }
        } catch let error {
            print("[UploadWidget]:\(error.localizedDescription)")
        }
    }
    
    public func update() {
        let contentState = UploadWidgetAttributes.ContentState.starEyes
        Task {
            if #available(iOS 16.2, *) {
                let activityContent = ActivityContent(state: contentState, staleDate: nil)
                await activity?.update(activityContent)
            } else {
                await activity?.update(using: contentState)
            }
        }
    }
    
    public func end() {
        Task {
            await activity?.end()
        }
    }
}
```

```
import WidgetKit
import SwiftUI

@main
struct UploadWidgetBundle: WidgetBundle {
    var body: some Widget {
        UploadWidget()
        UploadWidgetLiveActivity()
    }
}

```

## 编译&签名报错解决
如果Swift的桥接文件编译报错，类似：Module not found
解决方案：
**将Widget的Objective-C Bridging Header的路径设置为空即可。**
As a temporary fix, I select Widget from target, and set its Bridging Header value to empty string (in build settings section), it starts building again.

手动加一下 `@available(iOS 17.0, *)`
```
@available(iOS 16.1, *)
struct UploadWidgetLiveActivity: Widget
```
```
@available(iOS 17.0, *)
#Preview("Notification", as: .content, using: UploadWidgetAttributes.preview) {
   UploadWidgetLiveActivity()
} contentStates: {
    UploadWidgetAttributes.ContentState.smiley
    UploadWidgetAttributes.ContentState.starEyes
}
```
```
@available(iOS 17.0, macOS 14.0, watchOS 10.0, *)
#Preview(as: .systemSmall) {
    UploadWidget()
} timeline: {
    SimpleEntry(date: .now, emoji: "😀")
    SimpleEntry(date: .now, emoji: "🤩")
}
```
```
// Different conditions
#available(iOSApplicationExtension 16.2, *)
#available(iOS 16.2, *)
@available(iOS, deprecated: 16.1)
```

**Widget签名报错解决:**
```
UploadWidgetExtension is automatically signed for development, but a conflicting code signing identity iPhone Distribution has been manually specified. Set the code signing identity value to "Apple Development" in the build settings editor, or switch to manual signing in the Signing & Capabilities editor.
```
Discovered if I turned off 'Automatically manage signing' and back on again, it solved the issue for me!

## Terminal Console终端查看日志Logs
支持通过 Library: `ActivityKit` 进行过滤
`Updating content for activity 1C404AC2-DC62-40AA-8EAD-C9645D87F5B8`

## OC主工程调用Widget方法
将Widget定义的文件共享给主工程的Target，此处为：`UploadWidgetLiveActivity.swift`
选中该文件，右侧栏Target Membership勾选☑️对应主工程的targets

## 多Target共享同一个Widget
TARGETS -> xxx -> General -> Frameworks, Libraries, and Embedded Content -> ➕
添加 `UploadWidgetExtension.appex`, Embed选择`Embed Without Signing`即可。（根据需求自行选择）

## Preview SwiftUI
Xcode 右上角 -> Adjust Editor Options:
☑️ Canvas (Alt + Cmd + Enter)
Layout -> Canvas on Right/Bottom

预览报错：
```
OptimizationLevelError: not building -Onone
”xxx.app” needs -Onone Swift optimization level to use previews
```
Target -> Build Settings -> Swift Compiler - Code Generation -> Optimization Level
Switch `Optimize for spped[-O]` to `No Optimization[-Onone]`

## 拓展知识
#### [SiriKit Intent Definition File](https://developer.apple.com/documentation/sirikit/adding_user_interactivity_with_siri_shortcuts_and_the_shortcuts_app?language=objc)
You can offer your app’s unique capabilities throughout the system by designing custom intents. You may also want to create a custom intent that provides the same functionality as a system intent, to offer users more flexibility for incorporating that functionality into a multi-step shortcut.
Define custom intents and their parameters in an intents definition file. Xcode uses this file to generate an INIntent subclass and related data types for each of your intents.
When the user invokes your shortcut with their voice, Siri starts a dialog to collect the additional information needed to complete the shortcut. In the Shortcuts app, the user can make changes to what the shortcut will do when it’s invoked. To get an app that integrates custom intents and parameters, see [Soup Chef: Accelerating App Interactions with Shortcuts](https://developer.apple.com/documentation/sirikit/soup_chef_accelerating_app_interactions_with_shortcuts?language=objc) and download the Soup Chef sample app.

#### SwiftUI
**应用的入口**
OC中的 `main.m` 替换为 `@main` 前缀的结构体 `App`

**SwiftUI application lifecycle**
```
- applicationDidBecomeActive
- applicationWillResignActive
- applicationDidEnterBackground
- applicationWillEnterForeground
```

```
import SwiftUI

@main
struct DynamicIsland_iOSApp: App {
    @Environment(\.scenePhase) private var scenePhase
    @StateObject private var vm = DynamicIslandViewModel()
    var body: some Scene {
        WindowGroup {
            if #available(iOS 17.0, *) {
                DynamicIslandView()
                    .environmentObject(vm)
                    .onChange(of: scenePhase) { oldPhase, newPhase in
                        switch newPhase {
                        case .background:
                            print("SchenePhase: Background from \(oldPhase)")
                        case .inactive:
                            print("SchenePhase: Inactive from \(oldPhase)")
                        case .active:
                            print("SchenePhase: Active/Foreground from \(oldPhase)")
                        @unknown default:
                            print("SchenePhase: Unknown scene phase \(newPhase) from \(oldPhase)")
                        }
                    }
                    .onReceive(NotificationCenter.default.publisher(for: UIApplication.willTerminateNotification)) { _ in
                        print("UIApplication.willTerminateNotification")
                        vm.stopActivityAnyway()
                    }
            } else {
                DynamicIslandView()
                    .environmentObject(vm)
                    .onReceive(NotificationCenter.default.publisher(for: UIApplication.willTerminateNotification)) { _ in
                        print("UIApplication.willTerminateNotification")
                        vm.stopActivityAnyway()
                    }
            }
        }
    }
}
```

#### `@StateObject` and `@ObservedObject` in SwiftUI

In iOS 13, we had two property wrappers available for using an ObservableObject in a SwiftUI `view`:

`@ObservedObject`, for when the ObservableObject is passed in to the view directly (likely through its initializer)
`@EnvironmentObject`, for when the ObservableObject is passed to the view indirectly through the environment

```
@StateObject private var vm = DynamicIslandViewModel()
NOTE: Accessing StateObject's object without being installed on a View. This will create a new instance each time.
```

#### Async await in Swift
```
// 1. Call the method
fetchImages { result in
    // 3. The asynchronous method returns
    switch result {
    case .success(let images):
        print("Fetched \(images.count) images.")
        
        // 4. Call the resize method
        resizeImages(images) { result in
            // 6. Resize method returns
            switch result {
            case .success(let images):
                print("Decoded \(images.count) images.")
            case .failure(let error):
                print("Decoding images failed with error \(error)")
            }
        }
        // 5. Fetch images method returns
    case .failure(let error):
        print("Fetching images failed with error \(error)")
    }
}
// 2. The calling method exits
```
```
do {
    // 1. Call the method
    let images = try await fetchImages()
    // 2. Fetch images method returns
    
    // 3. Call the resize method
    let resizedImages = try await resizeImages(images)
    // 4. Resize method returns
    
    print("Fetched \(images.count) images.")
} catch {
    print("Fetching images failed with error \(error)")
}
// 5. The calling method exits
```
```
final class ContentViewModel: ObservableObject {
    
    @Published var images: [UIImage] = []
    
    func fetchData() {
        Task.init {
            do {
                self.images = try await fetchImages()
            } catch {
                // .. handle error
            }
        }
    }
}
```
```
struct ImageFetcher {
    func fetchImages() async throws -> [UIImage] {
        // .. perform data request
    }
}
```
```
struct ImageFetcher {
    @available(*, deprecated, renamed: "fetchImages()")
    func fetchImages(completion: @escaping (Result<[UIImage], Error>) -> Void) {
        Task {
            do {
                let result = try await fetchImages()
                completion(.success(result))
            } catch {
                completion(.failure(error))
            }
        }
    }


    func fetchImages() async throws -> [UIImage] {
        // .. perform data request
    }
}
```

## 参考
[Displaying live data with Live Activities](https://developer.apple.com/documentation/ActivityKit/displaying-live-data-with-live-activities)
[10 questions with the Live Activities team](https://developer.apple.com/news/?id=qpqf1gru)
[iOS16.1 实时活动 （Live Activity）&灵动岛适配](https://blog.csdn.net/qq_38718912/article/details/128150549)
[Creating a widget extension](https://developer.apple.com/documentation/widgetkit/creating-a-widget-extension)
[iOS 小组件开发第八篇：灵动岛开发](https://zhuanlan.zhihu.com/p/662931856)
[盒马 iOS Live Activity &“灵动岛”配送场景实践](https://mp.weixin.qq.com/s?__biz=Mzg4MjE5OTI4Mw==&mid=2247497758&idx=1&sn=3cb172fcddbca8dc686dc32d0dc5cd94&scene=21#wechat_redirect)
[iOS灵动岛开发实践](https://juejin.cn/post/7153236337074634788)
[iOS 使用推送通知更新 Dynamic Island 和 Live Activity](https://xujiwei.com/blog/2022/10/update-dynamic-island-and-live-activity-with-push-notification/)
[Mastering Dynamic Island in SwiftUI](https://swiftwithmajid.com/2022/09/28/mastering-dynamic-island-in-swiftui/)
[Human Interface Guidelines: Live Activities](https://developer.apple.com/design/human-interface-guidelines/live-activities)
[DynamicIsland is an animated SwiftUI project](https://github.com/barisozgenn/DynamicIsland)
[Session 10184: Meet ActivityKit](https://developer.apple.com/videos/play/wwdc2023/10184)
[Session 10194: Design dynamic Live Activities](https://developer.apple.com/videos/play/wwdc2023/10194)
[Design dynamic Live Activities](https://developer.apple.com/videos/play/wwdc2023/10194/)
[Bridging header is getting added into the Widget/Extension as well causing build process to fail](https://github.com/cordova-rtc/cordova-plugin-iosrtc/issues/504)
[conflicting provisioning settings](https://developer.apple.com/forums/thread/63122)
[iOS小组件Widget踩坑](https://www.jianshu.com/p/a4d61a880bac?ivk_sa=1024320u)
[iOS14 Widget小组件开发(Today Extension)](https://www.jianshu.com/p/8bcd6060e9c8?ivk_sa=1024320u)
[WidgetKit - Keeping a widget up to date](https://developer.apple.com/documentation/widgetkit/keeping-a-widget-up-to-date)
[How to silence a warning in Swift?](https://www.appsloveworld.com/swift/100/33/how-to-suppress-a-specific-warning-in-swift)
[Async await in Swift explained with code examples](https://www.avanderlee.com/swift/async-await/)
[Adding User Interactivity with Siri Shortcuts and the Shortcuts App](https://developer.apple.com/documentation/sirikit/adding_user_interactivity_with_siri_shortcuts_and_the_shortcuts_app?language=objc)
[SwiftUI application lifecycle](https://stackoverflow.com/questions/64032039/swiftui-application-lifecycle)
[SwiftUI error with preview: "not building -Onone"](https://developer.apple.com/forums/thread/649814)
[@StateObject and @ObservedObject in SwiftUI](https://www.mattmoriarity.com/2020-07-03-stateobject-and-observableobject-in-swiftui/)
[Live Activity & Dynamic Island](https://sparrowcode.io/en/tutorials/live-activities)
[AppDelegate and SceneDelegate when supporting iOS 12 and 13](https://stackoverflow.com/questions/58405393/appdelegate-and-scenedelegate-when-supporting-ios-12-and-13)
