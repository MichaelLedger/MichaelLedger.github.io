# WWDC2023 - Dynamic Island 灵动岛开发

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

### Create multiple widget extensions

You can include multiple widget types in your widget extension, although your app can contain multiple extensions. For example, if some of your widgets use location information and others don’t, keep the widgets that use location information in a separate extension. This allows the system to prompt someone for authorization to use location information only for the widgets from the extension that uses location information. For details about bundling multiple widgets in an extension, see [WidgetBundle](https://developer.apple.com/documentation/SwiftUI/WidgetBundle).

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

Info.plist 添加配置
NSSupportsLiveActivities -> YES

## 编译&签名报错解决
如果Swift的桥接文件编译报错，类似：Module not found
解决方案：
**将Widget的Objective-C Bridging Header的路径设置为空即可。**
As a temporary fix, I select Widget from target, and set its Bridging Header value to empty string (in build settings section), it starts building again.

WidgetKit:
```
/// Preview a widget with an activity configuration, using the specified attributes and content states.
/// - Note: The attributes must be of the type expected by the widget. (This will be enforced at run-time.)
@available(iOS 17.0, *)
@freestanding(declaration) public macro Preview<Widget, Attributes>(_ name: String? = nil, as viewKind: ActivityPreviewViewKind, using attributes: Attributes, widget: @escaping () -> Widget, @PreviewActivityBuilder<Attributes> contentStates: @escaping @MainActor () async -> [Attributes.ContentState]) = #externalMacro(module: "PreviewsMacros", type: "Common") where Widget : Widget, Attributes : ActivityAttributes
```

手动加一下 `@available(iOS 17.0, *)`
```
@available(iOS 17.0, *)
#Preview("Notification", as: .content, using: UploadWidgetAttributes.preview) {
   UploadWidgetLiveActivity()
} contentStates: {
    UploadWidgetAttributes.ContentState.smiley
    UploadWidgetAttributes.ContentState.starEyes
}
```

**Widget签名报错解决:**
```
UploadWidgetExtension is automatically signed for development, but a conflicting code signing identity iPhone Distribution has been manually specified. Set the code signing identity value to "Apple Development" in the build settings editor, or switch to manual signing in the Signing & Capabilities editor.
```
Discovered if I turned off 'Automatically manage signing' and back on again, it solved the issue for me!

## 多Target共享同一个Widget
TARGETS -> xxx -> General -> Frameworks, Libraries, and Embedded Content -> ➕
添加 `UploadWidgetExtension.appex`即可

## Preview SwiftUI
Xcode 右上角 -> Adjust Editor Options:
☑️ Canvas (Alt + Cmd + Enter)
Layout -> Canvas on Right/Bottom


## 参考
[Creating a widget extension](https://developer.apple.com/documentation/widgetkit/creating-a-widget-extension)
[iOS 小组件开发第八篇：灵动岛开发](https://zhuanlan.zhihu.com/p/662931856)
[Human Interface Guidelines: Live Activities](https://developer.apple.com/design/human-interface-guidelines/live-activities)
[DynamicIsland is an animated SwiftUI project](https://github.com/barisozgenn/DynamicIsland)
[Session 10184: Meet ActivityKit](https://developer.apple.com/videos/play/wwdc2023/10184)
[Session 10194: Design dynamic Live Activities](https://developer.apple.com/videos/play/wwdc2023/10194)
[Displaying live data with Live Activities](https://developer.apple.com/documentation/ActivityKit/displaying-live-data-with-live-activities)
[Design dynamic Live Activities](https://developer.apple.com/videos/play/wwdc2023/10194/)
[Bridging header is getting added into the Widget/Extension as well causing build process to fail](https://github.com/cordova-rtc/cordova-plugin-iosrtc/issues/504)
[conflicting provisioning settings](https://developer.apple.com/forums/thread/63122)
