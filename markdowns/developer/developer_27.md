# Swift Package Manager(SPM) Best Practice

## Environments
MacOS 15.2
Xcode 16.2

## Practice
Use Xcode to open `Package.swift`.

## Search Scope
Need switch search scope as `In Project/Workspace and Package Dependencies` to searching in all codes, including package codes.

## [PromiseKit installation](https://github.com/mxcl/PromiseKit/blob/master/Documentation/Installation.md)

### Accio
Add the following to your Package.swift:

`.package(url: "https://github.com/mxcl/PromiseKit.git", .upToNextMajor(from: "6.8.4")),`

Next, add `PromiseKit` to your App targets dependencies like so:

```
.target(
    name: "App",
    dependencies: [
        "PromiseKit",
    ]
),
```
Then run `accio update`.

### SwiftPM
```
package.dependencies.append(
    .package(url: "https://github.com/mxcl/PromiseKit", from: "6.8.0")
)
```
### Manually
You can just drop `PromiseKit.xcodeproj` into your project and then add `PromiseKit.framework` to your app’s embedded frameworks.

## [Accio](https://github.com/JamitLabs/Accio) - ⚠️Deprecated
A dependency manager driven by SwiftPM that works for iOS/tvOS/watchOS/macOS projects.
With the release of Xcode 12 which includes Swift 5.3, we feel like there is no gap left to fill by Accio on the move to SwiftPM anymore, thus we are deprecating support for Accio in those versions, instead please use the built-in SwiftPM feature in Xcode.

## [Tuist](https://docs.tuist.dev/en/) - 🔥Recommend
[Tuist](https://github.com/tuist/tuist) is a toolchain designed to accelerate and enhance app development. 

### [Cache](https://docs.tuist.dev/en/guides/quick-start/optimize-workflows)

If you clean build the project, which you usually do on CI or after cleaning the global cache in the hope of fixing cryptic compilation issues, you have to compile the whole project from scratch. When the project becomes large, this can take a long time.

Tuist solves that by re-using binaries from previous builds. Run the following command:

`tuist cache`
The command will build and share all the cacheable targets in your project in a local and remote cache. After it completes, try generating the project:

`tuist generate`
You'll notice your project groups includes a new group Cache containing the binaries from the cache.

An screenshot of a project group structure where you can see XCFrameworks in a cache group
If you push your changes upstream to a remote repository, other developers can clone the project, and run the following commands:
```
tuist install
tuist auth
tuist generate
```
And they'll suddenly get a project with the dependencies as binaries.

## [Linking the package only in debug builds](https://augmentedcode.io/2022/05/02/linking-a-swift-package-only-in-debug-builds/)
App target’s libraries.Then we’ll open build settings and look for “Excluded Source File Names” and configure release builds to ignore “[LookinServer*](https://github.com/QMUI/LookinServer)”.

Build settings configured to ignore the package in release builds.To verify this change, we can make a release build with shift+command+i (Product -> Build For -> Profiling which builds release configuration). If we check the latest build log with command+9 and clicking on the top most build item, scrolling to app target’s linker step, we can see that Xcode did not link “LookinServer”. Exactly what we wanted to achieve.

// Podfile
`pod 'LookinServer',    '1.2.6',    :configurations => ['Debug']`

// Build Settings -> Excluded Source File Names 
`"EXCLUDED_SOURCE_FILE_NAMES[arch=*]" = "LookinServer*";`

## [Is it okay to have both SPM and Cocoapods in your project?](https://www.reddit.com/r/iOSProgramming/comments/16dvujc/is_it_okay_to_have_both_spm_and_cocoapods_in_your/)

No one's mentioned this, but yes, it can work, as long as the dependencies on each side have independent trees.

**That is, all of the CocoaPods dependencies should be separate from all the SPM dependencies. Otherwise you're going to get duplicate symbol errors or other build issues.**

At best you'd increase your app size with duplicate libraries.

## SPM mixed with CocoaPods

[cocoapods-spm](https://github.com/trinhngocthuyen/cocoapods-spm)

This plugin will auto add swift packages to `Pods.xcodeproj` for spm_pkg in `Podfile`.

**NOTE: you may manully add the same swift package in your main project if this package is used in main project.**
 
// Gemfile

`gem "cocoapods-spm", '~>0.1.9'`

Run `bundle install`

**Use `bundle info [gemname]` to see where a bundled gem is installed.**

```
% bundle info cocoapods-spm
  * cocoapods-spm (0.1.11)
    Summary: CocoaPods plugin to add SPM dependencies to CocoaPods targets
    Homepage: https://github.com/trinhngocthuyen/cocoapods-spm
    Path: /Users/gavinxiang/.rbenv/versions/3.3.5/lib/ruby/gems/3.3.0/gems/cocoapods-spm-0.1.11
```

// Podfile
```
  spm_pkg 'SDWebImage',
  :url => "git@github.com:SDWebImage/SDWebImage.git",
  :version => "5.20.0",
  :products => ["SDWebImage-SPM"]
  
  spm_pkg 'SDWebImageWebPCoder',
  :url => "git@github.com:SDWebImage/SDWebImageWebPCoder.git",
  :version => "0.14.6",
  :products => ["SDWebImageWebPCoder-SPM"]
  
  pod 'XXXKit1', :git => "git@github.com:organization/XXXKit1.git", :branch => "Feature-SPM-001"
  pod 'XXXKit2', '~> 8.22.0'
  pod 'XXXKit3', :path => '../../XXXKit3'
```

Assume `XXXKit1`,`XXXKit2`,`XXXKit3` depends on `SDWebImage` & `YYYKit1`,`YYYKit2` depends on `SnapKit`.

**Add `.spm.pods/` & `.build/` to `.gitignore` when using spm with cocoapods-spm plugin.**

**⚠️ If library target name has been changed, you need manually delete these files:
```
`<targe_name>.json` in path: `.spm.pods/packages/metadata`
corresponding checkout in `.spm.pods/packages/.umbrella/.build/checkouts/<repo_name>`
corresponding basedOn/packageRef/state in `.spm.pods/packages/.umbrella/.build/workspace-state.json`
```
to force reload it then recall `bundle exec pod install --verbose`.**

**It is recommended to delete the entire folder `.spm.pods` directly. Complex nested dependencies make it difficult to accurately locate the libraries that need to be deleted.**

Below shows `FileDownloadManager` not been updated as `MDFileDownloadManager` which defined in Package.swift, which causing Xcode build always failed!

`Library/Developer/Xcode/DerivedData/XXX/Build/Intermediates.noindex/Pods.build/Debug-iphoneos/Pods-fpus.build/DerivedSources/Pods_fpus_vers.c module map file '/Users/gavinxiang/Library/Developer/Xcode/DerivedData/XXX/Build/Intermediates.noindex/GeneratedModuleMaps-iphoneos/FileDownloadManager.modulemap' not found`

`OTHER_CFLAGS = $(inherited) -fmodule-map-file="${GENERATED_MODULEMAP_DIR}/PRTHandwriting.modulemap" -fmodule-map-file="${GENERATED_MODULEMAP_DIR}/FileDownloadManager.modulemap"`

```
➜  metadata git:(FPA-000-SPM-Mix-CocoaPods-Feature-2) ✗ pwd
/Users/gavinxiang/Downloads/freeprints_ios_3/FreePrints/.spm.pods/packages/metadata

➜  metadata git:(FPA-000-SPM-Mix-CocoaPods-Feature-2) ✗ cat MDFileDownloadManager.json 
{"cLanguageStandard":null,"cxxLanguageStandard":null,"dependencies":[],"name":"MDFileDownloadManager","packageKind":{"root":["/Users/gavinxiang/Downloads/freeprints_ios_3/FreePrints/.spm.pods/packages/.umbrella/.build/checkouts/fp_ios_file_download_manager"]},"pkgConfig":null,"platforms":[],"products":[{"name":"MDFileDownloadManager","settings":[],"targets":["FileDownloadManager"],"type":{"library":["automatic"]}}],"providers":null,"swiftLanguageVersions":null,"targets":[{"dependencies":[],"exclude":[],"name":"FileDownloadManager","packageAccess":true,"path":"Sources/MDFileDownloadManager","resources":[],"settings":[],"type":"regular"}],"toolsVersion":{"_version":"6.0.0"}}%  
```

## swift package resolve & swift package update

We need to call `swift package resolve` this will only update the resolved file, while `swift package update` updates the swift file too with latest available updates.

```
➜  common_ios_prt_ui_components git:(add_spm) swift package update

diff --git a/Package.resolved b/Package.resolved
index 40109561..38c0ed2f 100644
--- a/Package.resolved
+++ b/Package.resolved
@@ -33,8 +33,8 @@
         "repositoryURL": "https://github.com/microsoft/clarity-apps.git",
         "state": {
           "branch": null,
-          "revision": "6bd0243fffab0d039810eb46c0a8b75d3a74a3e6",
-          "version": "3.0.2"
+          "revision": "1f6cca48f906eb09a1c338bebab369bd0723c012",
+          "version": "3.0.4"
         }
       },
       {
@@ -51,7 +51,7 @@
         "repositoryURL": "https://github.com/Planetart/fp_ios_file_download_manager.git",
         "state": {
           "branch": "add_spm",
-          "revision": "e3d0b3fba2353cdce91b4088a77f8eb771fcaaad",
+          "revision": "68051c09820665d725d1d68cf023de94a0a25e6d",
           "version": null
         }
       },
@@ -87,7 +87,7 @@
         "repositoryURL": "https://github.com/Planetart/MirrorSDK.git",
         "state": {
           "branch": "add_spm",
-          "revision": "618983d4c237d1dfdd69ab45e45d6a0c131d38b4",
+          "revision": "1d57c6c3d2d291c322f7f0311d13daa41c150f7a",
           "version": null
         }
       }
```

**⚠️ If using branch to integrate spm mixed with cocoaPods, make sure `xcshareddata/swiftpm/Package.resolved` is in the list of git tracked files.**

```
  spm_pkg "MDFileDownloadManager",
      :git => "https://github.com/Planetart/fp_ios_file_download_manager.git",
      :branch => "add_spm",
      :products => ["MDFileDownloadManager"]
```

```
diff --git a/FreePrints/FullBellyIntl.xcworkspace/xcshareddata/swiftpm/Package.resolved b/FreePrints/FullBellyIntl.xcworkspace/xcshareddata/swiftpm/Package.resolved
index 216842a7bb..9b90d3d12b 100644
--- a/FreePrints/FullBellyIntl.xcworkspace/xcshareddata/swiftpm/Package.resolved
+++ b/FreePrints/FullBellyIntl.xcworkspace/xcshareddata/swiftpm/Package.resolved
@@ -178,7 +178,7 @@
       "location" : "https://github.com/Planetart/fp_ios_file_download_manager.git",
       "state" : {
         "branch" : "add_spm",
-        "revision" : "48312b04bc2a016b7438978eda413d670d76f4f8"
+        "revision" : "6022bd6fc20801d508194e60876b02bc39ba28d3"
       }
     }
```

## `Package.swift` need add `cSettings` if this module may be used by Objective-C

```
.target(
    name: "MDFileDownloadManager",
    path: "Sources/MDFileDownloadManager",
    publicHeadersPath: "include",
    cSettings: [
        .headerSearchPath("include")
    ]
)
```

## [Using a post_install script to add SPM reps to cocoa pods targets to resolve no such module issues](https://github.com/CocoaPods/CocoaPods/issues/10049#issuecomment-819480131)
```
  post_integrate do |installer|
    add_spms_to_targets(installer)
    //other hooks...
  end

  def add_spm_to_target(project, target_name, url, requirement, product_name)
    project.targets.each do |target|
      if target.name == target_name
        pkg = project.root_object.package_references.find { |pkg| pkg.repositoryURL == url }
        if pkg.nil?
          pkg = project.new(Xcodeproj::Project::Object::XCRemoteSwiftPackageReference)
          pkg.repositoryURL = url
          pkg.requirement = requirement
          project.root_object.package_references << pkg
          puts "=====new swift package reference==#{pkg.repositoryURL}"
        else
          puts "=====matched swift package reference==#{pkg.repositoryURL}"
        end
        ref = project.new(Xcodeproj::Project::Object::XCSwiftPackageProductDependency)
        ref.package = pkg
        ref.product_name = product_name
        target.package_product_dependencies << ref
      end
    end
    project.save
  end

  # add spm to pod targets
  # spm dependency rules: (upToNextMajorVersion/ upToNextMinorVersion / exactVersion / versionRange)
  # Xcode will crash when setting duplicate spm dependencies with the same rule, so we set rule as `upToNextMajorVersion` for now.
  def add_spms_to_targets(installer)
    spm_specs = [{
      url: "git@github.com:SDWebImage/SDWebImage.git",
      requirement: {
        kind: "upToNextMajorVersion",
        minimumVersion: "5.20.0"
      },
      product_name: "SDWebImage",
      targets: ["XXXKit1", "XXXKit2", "XXXKit2"]
    },{
      url: "git@github.com:SnapKit/SnapKit.git",
      requirement: {
        kind: "upToNextMajorVersion",
        minimumVersion: "5.0.1"
      },
      product_name: "SnapKit",
      targets: ["YYYKit1", "YYYKit2"]
    }]
    spm_specs.each do | spm_spec |
      spm_spec[:targets].each do |target_name|
        puts "=====add_spm==#{spm_spec[:product_name]}==to_target==#{target_name}"
        add_spm_to_target(installer.pods_project,
                          target_name,
                          spm_spec[:url],
                          spm_spec[:requirement],
                          spm_spec[:product_name])
      end
    end
  end

```

Run before build project:

**NOTE: Before running `pod install`, keep main project opened by Xcode, causing package dependencies loaded from cache or remote.**

`bundle exec pod install --no-repo-update --verbose`

## PackageFrameworks duplicated issues: No such file or directory `PackageFrameworks/RxBlocking-Dynamic.framework/RxBlocking-Dynamic`

```
    {
      url: "https://github.com/ReactiveX/RxSwift.git",
      requirement: {
        kind: "upToNextMajorVersion",
        minimumVersion: "6.8.0"
      },
      product_names: ["RxSwift-Dynamic","RxCocoa-Dynamic","RxRelay-Dynamic","RxBlocking-Dynamic"],
      targets: ["PRTAddressKit", "PRTBaseNetwork", "PRTBusinessUnitGoogleLogin", "PRTSelectPhoto", "PRTBusinessUnitLogin", "PRTBusinessUnitCommon"].concat(podsShareExtensions)
    }
```

```
No such file or directory: '/Users/gavinxiang/Library/Developer/Xcode/DerivedData/XXX-dyjvmrzjyotgnpgeyliwnrbquytk/Build/Products/Debug-iphoneos/PackageFrameworks/RxBlocking-Dynamic.framework/RxBlocking-Dynamic'
```

```
➜  ~ cd /Users/gavinxiang/Library/Developer/Xcode/DerivedData/XXX-dyjvmrzjyotgnpgeyliwnrbquytk/Build/Products/Debug-iphoneos/PackageFrameworks
➜  PackageFrameworks ls
RxBlocking-Dynamic.framework
RxBlocking.framework
RxBlocking_CFFDE33F7EB8BFD_PackageProduct.framework
RxCocoa-Dynamic.framework
RxCocoa.framework
RxCocoaRuntime.framework
RxCocoa_38E61CAF42DDE0B6_PackageProduct.framework
RxRelay-Dynamic.framework
RxRelay.framework
RxSwift-Dynamic.framework
RxSwift.framework
SDWebImage_-382901E92613C85E_PackageProduct.framework
SnapKit_3965163F11347F41_PackageProduct.framework
```

**We can only integrate swift package as library for now, not framework!**

```
    {
      url: "https://github.com/ReactiveX/RxSwift.git",
      requirement: {
        kind: "upToNextMajorVersion",
        minimumVersion: "6.8.0"
      },
      product_names: ["RxSwift","RxCocoa","RxRelay","RxBlocking"],
      targets: ["PRTAddressKit", "PRTBaseNetwork", "PRTBusinessUnitGoogleLogin", "PRTSelectPhoto", "PRTBusinessUnitLogin", "PRTBusinessUnitCommon"].concat(podsShareExtensions)
    }
```

## unable to initiate PIF transfer session

Build service could not create build operation: unknown error while handling message: MsgHandlingError(message: "unable to initiate PIF transfer session (operation in progress?)")

relaunch Xcode to refetch the remote package dependencies.

## Module 'XXX' not found

Using Forward Declarations to resolve circular-import-error: Module 'BraintreeCore' not found

If spm module is not found, first check `Link Binary With Libraries`; then if import codes exists in C Header, there must exists circular import error.

Causing by specific Objective-C header imported spm swift module && Bridging Header imported this specific Objective-C header.

This problem has been bothering me all day to location. 

(reset package dependency -> relink library -> check framework/header search paths -> test Demo from braintree -> check target build phases shells)

Resolution: [Include Swift Classes in Objective-C Headers Using Forward Declarations](https://developer.apple.com/documentation/swift/importing-swift-into-objective-c)

```
//@import BraintreeCore;
//@import BraintreeLocalPayment;
//@import BraintreeSEPADirectDebit;
//@import BraintreeCard;
//@import BraintreeApplePay;
//@import BraintreePayPal;

@protocol BTLocalPaymentRequestDelegate, BTThreeDSecureRequestDelegate;
@class BTLocalPaymentRequest, BTSEPADirectDebitRequest, BTAPIClient, BTSEPADirectDebitClient, BTLocalPaymentClient, BTPayPalClient, BTThreeDSecureClient;
```

## Remaining issues

### Issue 1. two same spm depencies in `Pods.xcodeproj`
[cocoapods-spm](https://github.com/trinhngocthuyen/cocoapods-spm) hook after `running post integrate hooks`, so there may exists two same spm depencies in `Pods.xcodeproj`.

App extension & main project should **manully** add spm depencies & add spm library/framework in `Link Binary With Libraries` to avoid `no such module` issue.

### Issue 2. `pod lib lint` or `pod repo push` fails if replacing `dependency` with `spm_dependency` even install cocoapods-spm plugin.

`$ pod repo push mine_specs 'XXX.podspec' --sources='https://cdn.cocoapods.org/,git@github.com:XXX/mine_specs.git' --allow-warnings --skip-import-validation --skip-tests --verbose --local-only`

```
[!] Invalid `XXXKit.podspec` file: undefined method `spm_dependency' for an instance of Pod::Specification.

 #  from /Users/gavinxiang/Downloads/XXX/XXX.podspec:94
 #  -------------------------------------------
 #    s.dependency "Moya", "~> 15.0.0"
 >    s.spm_dependency "SnapKit", "~> 5.0.1"
 #    s.dependency "RxSwift", "~> 6.0.0"
 #  -------------------------------------------

[!] The `XXX.podspec` specification does not validate.
```
**We can only manually push `.podspec` or using feature branch to install pods for now. **

Fixed pod repo push failed while downloading dependencies & generating pods project in Gemfile:

`gem "cocoapods-spm2", '~>0.1.20'`

```
$ cat Gemfile
source "https://rubygems.org"

ruby "3.3.5"

git_source(:github) {|repo_name| "https://github.com/#{repo_name}" }

gem "cocoapods"
gem "fastlane"
gem 'fastools', :git => 'git@github.com:MichaelLedger/fastools.git', :branch => 'master'
gem "cocoapods-spm2", '~>0.1.20'
```

but still cannot find moudle

```
    - ERROR | xcodebuild:  XXXCustomDesignView.swift:9:8: error: no such module 'SDWebImage'
[!] The `XXXKit.podspec` specification does not validate.

/Users/gavinxiang/.rbenv/versions/3.3.5/lib/ruby/gems/3.3.0/gems/cocoapods-1.15.2/lib/cocoapods/command/repo/push.rb:156:in `block in validate_podspec_files'
```

because `plugin "cocoapods-spm"` is not in Podfile while lint. [cocoapods-spm2](https://github.com/MichaelLedger/cocoapods-spm.git)

[Cocoapod: how to push spec to my private repo without lint?](https://stackoverflow.com/questions/33206886/cocoapod-how-to-push-spec-to-my-private-repo-without-lint)

```
$ vim /Users/gavinxiang/.rbenv/versions/3.3.5/lib/ruby/gems/3.3.0/gems/cocoapods-1.15.2/lib/cocoapods/command/repo/push.rb
```

**force disable `validate_podspec_files` in `run` method in cocoapods `push.rb` works!**:
```
        def run
          open_editor if @commit_message && @message.nil?
          check_if_push_allowed
          update_sources if @update_sources
          #validate_podspec_files # This is disabled because it is not needed for SPM
          check_repo_status
          update_repo
          add_specs_to_repo
          push_repo unless @local_only
        end

```
```
$ bundle exec pod repo push mine_repos 'XXXKit.podspec' --sources='https://cdn.cocoapods.org/,git@github2.com:MichaelLedger/Specs.git' --allow-warnings --skip-import-validation --skip-tests --verbose --local-only

Updating the `mine_repos' repo

  $ /usr/bin/git -C /Users/gavinxiang/.cocoapods/repos/mine_repos pull
  Already up to date.

Adding the spec to the `mine_repos' repo

  $ /usr/bin/git -C /Users/gavinxiang/.cocoapods/repos/mine_repos status --porcelain
  ?? XXXKit/0.1.62/
 - [Update] XXXKit (0.1.62)
  $ /usr/bin/git -C /Users/gavinxiang/.cocoapods/repos/mine_repos add XXXKit
  $ /usr/bin/git -C /Users/gavinxiang/.cocoapods/repos/mine_repos commit --no-verify -m [Update] XXXKit (0.1.62)
  [master bd16046] [Update] XXXKit (0.1.62)
   1 file changed, 146 insertions(+)
   create mode 100644 XXXKit/0.1.62/XXXKit.podspec
```

### Issue3: adding plugin `cocoapods-spm` in Podfile before generating pods project.

[iOS] script_phases: Invalid execution position value `before_generate_project` in shell script `Configure Test Environment`. 

Available options are `before_compile, after_compile, before_headers, after_headers, any`.

```
// .podspec
# ――― Test Configurations ――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  s.test_spec 'Tests' do |test_spec|
    test_spec.source_files  = "Source/Classes/Address/*.swift", "Source/Classes/Account/*.swift", "Source/Classes/Foundation/*.swift",
    test_spec.exclude_files = "Classes/Exclude"

    # Specify plugins in the test environment
    test_spec.script_phase = {
      # :name => 'Configure Test Environment',
      # :script => 'echo "plugin \'cocoapods-spm\'" >> ${PODS_ROOT}/Podfile',
      # :execution_position => :before_compile

      :name => 'Add Plugins to Podfile',
      :script => '<<-SCRIPT
        PODFILE="${PODS_ROOT}/Podfile"
        if ! grep -q "plugin \'cocoapods-spm\'" "$PODFILE"; then
          # Create temp file
          tmp_file=$(mktemp)
          # Add plugin at the top
          echo "plugin \'cocoapods-spm\'" > "$tmp_file"
          # Append original Podfile content
          cat "$PODFILE" >> "$tmp_file"
          # Replace original file
          mv "$tmp_file" "$PODFILE"
        fi
      SCRIPT',
      :execution_position => :before_headers
    }
  end
```

`Adding Build Phase '[CP-User] Add Plugins to Podfile' to project.` is too later!

```
Comparing resolved specification to the sandbox manifest
  A Alamofire
  A Clarity
  A Moya
  A XXXKit
  A PRTBaseLog
  A PRTBaseTracker
  A RxCocoa
  A RxRelay
  A RxSwift
  A SwiftyBeaver

Resolving SPM dependencies
The following packages were not declared in Podfile:
  • SnapKit: used by XXXKit
  • SDWebImage: used by XXXKit
Use the `spm_pkg` method to declare those packages in Podfile.

Downloading dependencies
...

Integrating target `Clarity`
    Adding Build Phase '[CP] Copy XCFrameworks' to project.

Integrating target `XXXKit`
    Adding Build Phase '[CP] Embed Pods Frameworks' to project.
    Adding Build Phase '[CP] Copy Pods Resources' to project.
    Adding Build Phase '[CP-User] Add Plugins to Podfile' to project.
  - Stabilizing target UUIDs
  - Running post install hooks
  - Writing Xcode project file to `../../../../private/var/folders/wk/frkkcch539lc6s2dk6dw9dy80000gn/T/CocoaPods-Lint-20241230-99199-5dt736-XXXKit/Pods/Pods.xcodeproj`
  Cleaning up sandbox directory

Integrating client project

[!] Please close any current Xcode sessions and use `App.xcworkspace` for this project from now on.
```

In addition to the `post_install` hook function, there is another hook function in cocoapods, `pre_install`, which allows us to do something after the pod library has been downloaded but not installed, and the `post_install` hook function allows us to do something before the project is written to the hard disk.

```
# pre_install hook that removes unwanted localizations
pre_install do |installer|
    supported_locales = ['base', 'da', 'en']

    Dir.glob(File.join(installer.sandbox.pod_dir('FormatterKit'), '**', '*.lproj')).each do |bundle|
        if (!supported_locales.include?(File.basename(bundle, ".lproj").downcase))
            puts "Removing #{bundle}"
            FileUtils.rm_rf(bundle)
        end
    end
end
```

### Issue4: [critical cross-dependency bug](https://github.com/swiftlang/swift-package-manager/issues/4581)

Note: There is a critical cross-dependency bug affecting many projects including [RxSwift](https://github.com/ReactiveX/RxSwift?tab=readme-ov-file) in Swift Package Manager. We've filed a bug (SR-12303) in early 2020 but have no answer yet. Your mileage may vary. A partial workaround can be found [here](https://github.com/ReactiveX/RxSwift/issues/2127#issuecomment-717830502).

**For my project it work great. In build settings for main app in chapter build options I change `Enable Testing Search Path` from `NO` to `YES`. I think, that is allow to find path to XCTest framework and use necessary symbol.**

```
// swift-tools-version:5.0

import PackageDescription

let package = Package(
  name: "RxProject",
  dependencies: [
    .package(url: "https://github.com/ReactiveX/RxSwift.git", .upToNextMajor(from: "6.0.0"))
  ],
  targets: [
    .target(name: "RxProject", dependencies: ["RxSwift", .product(name: "RxCocoa", package: "RxSwift")]),
  ]
)
```

### Issue5: Compile is passed but archive failed with module not find in some cocoapods libraray generating process.

```
[0m/Volumes/ExDisk/Jenkins-workspace/FPA-000-SPM-Mix-CocoaPods-Feature/FreePrints/Pods/XXXSDK/LoginViewModel.swift:9:8: [31mno such module 'RxRelay'[0m
```

You can manullay add lost module in pod target's target dependencies to resolve this archive error. (e.g. add `RxRelay` in XXXSDK's `target dependencies`)

It's hard to add dependency via shell command because `pod install` will reset all `target dependencies`.

## Best practice: publish static library & dynamic framework simultaneously via [distributing binary frameworks](https://developer.apple.com/documentation/xcode/distributing-binary-frameworks-as-swift-packages)

*Maybe this resolution can resolve 'RxRelay' & 'RxSwift' critical cross-dependency bug.*

[AppsFlyerFramework/releases](https://github.com/AppsFlyerSDK/AppsFlyerFramework/releases)

```
 # For statically linked library
 https://github.com/AppsFlyerSDK/AppsFlyerFramework-Static

 # For dynamically linked library
 https://github.com/AppsFlyerSDK/AppsFlyerFramework-Dynamic

 # For Strict (No IDFA colection) library
 https://github.com/AppsFlyerSDK/AppsFlyerFramework-Strict
```
 
[AppsFlyerFramework-Static/Package.swift](https://github.com/AppsFlyerSDK/AppsFlyerFramework-Static/blob/main/Package.swift)
```
// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "AppsFlyerLib",
    products: [
        .library(
            name: "AppsFlyerLib-Static",
            targets: ["AppsFlyerLib"])
    ],
    targets: [
        .binaryTarget(
            name: "AppsFlyerLib",
            url: "https://github.com/AppsFlyerSDK/AppsFlyerFramework/releases/download/6.15.3/AppsFlyerLib-Static-SPM.xcframework.zip",
            checksum: "c256553d5fe6781b4525c424549e432765e6d8ec37357594d9d4862827f633d0"
        )
    ]
)
```

[AppsFlyerFramework-Dynamic/Package.swift](https://github.com/AppsFlyerSDK/AppsFlyerFramework-Dynamic/blob/main/Package.swift)
```
// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "AppsFlyerLib",
    products: [
        .library(
            name: "AppsFlyerLib-Dynamic",
            targets: ["AppsFlyerLib"])
    ],
    targets: [
        .binaryTarget(
            name: "AppsFlyerLib",
            url: "https://github.com/AppsFlyerSDK/AppsFlyerFramework/releases/download/6.15.3/AppsFlyerLib-Dynamic-SPM.xcframework.zip",
            checksum: "c0bee56914a3d09e99b9c9c36c1444b0926e050396777b3e470b09212bd9b4bf"
        )
    ]
)
```

[AppsFlyerFramework-Strict/Package.swift](https://github.com/AppsFlyerSDK/AppsFlyerFramework-Strict/blob/main/Package.swift)
```
// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "AppsFlyerLib",
    products: [
        .library(
            name: "AppsFlyerLib-Strict",
            targets: ["AppsFlyerLib"])
    ],
    targets: [
        .binaryTarget(
            name: "AppsFlyerLib",
            url: "https://github.com/AppsFlyerSDK/AppsFlyerFramework/releases/download/6.15.3/AppsFlyerLib-Strict-SPM.xcframework.zip",
            checksum: "5fc2d536d5059363e79aa82073c6cf26ef0e02c7f7ccd6787e593593db855b48"
        )
    ]
)
```

### [Checksums on zip files to verify whether zip files is modified](https://superuser.com/questions/1786609/zip-file-to-verify-if-not-modified)

On macOS in the terminal you can run the following to get **the SHA-256 checksum** of your ZIP archive:

```
$ shasum -a 256 AppsFlyerLib-Dynamic-SPM.xcframework.zip

c0bee56914a3d09e99b9c9c36c1444b0926e050396777b3e470b09212bd9b4bf  AppsFlyerLib-Dynamic-SPM.xcframework.zip
```

The checksum of the ZIP archive can the be checked/generated on any system (each system with their own method) and if it matches with the one you generated it means the file wasn't modified.

## Practice
### Could use different tags to distinguish between cocoapods and spm.

[GoogleUtilities - 8.0.2](https://github.com/google/GoogleUtilities/releases/tag/8.0.2)

[GoogleUtilities - CocoaPods-8.0.2](https://github.com/google/GoogleUtilities/releases/tag/CocoaPods-8.0.2)

- Swift Package Manager

By creating and pushing a tag for Swift PM, the newly tagged version will be immediately released for public use. Given this, please verify the intended time of release for Swift PM.

Add a version tag for Swift PM
```
git tag {version}
git push origin {version}
```
Note: Ensure that any inflight PRs that depend on the new GoogleUtilities version are updated to point to the newly tagged version rather than a checksum.

- CocoaPods

Publish the newly versioned pod to CocoaPods

It's recommended to point to the GoogleUtilities.podspec in staging to make sure the correct spec is being published.

`pod trunk push ~/.cocoapods/repos/staging/GoogleUtilities/{version}/GoogleUtilities.podspec.json`

Note: In some cases, it may be acceptable to `pod trunk push` with the `--skip-tests` flag. Please double check with the maintainers before doing so.

The pod push was successful if the above command logs: 🚀  GoogleUtilities ({version}) successfully published. In addition, a new commit that publishes the new version (co-authored by CocoaPodsAtGoogle) should appear in the CocoaPods specs repo. Last, the latest version should be displayed on GoogleUtilities's CocoaPods page.

### Integrate multiple libraries into the same package

[braintree_ios/Package.swift](https://github.com/braintree/braintree_ios/blob/main/Package.swift)

```
// swift-tools-version:5.9
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "Braintree",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "BraintreeAmericanExpress",
            targets: ["BraintreeAmericanExpress"]
        ),
        .library(
            name: "BraintreeApplePay",
            targets: ["BraintreeApplePay"]
        ),
        .library(
            name: "BraintreeCard",
            targets: ["BraintreeCard"]
        ),
        .library(
            name: "BraintreeCore",
            targets: ["BraintreeCore"]
        ),
        .library(
            name: "BraintreeDataCollector",
            targets: ["BraintreeDataCollector", "PPRiskMagnes"]
        ),
        .library(
            name: "BraintreeLocalPayment",
            targets: ["BraintreeLocalPayment", "PPRiskMagnes"]
        ),
        .library(
            name: "BraintreePayPal",
            targets: ["BraintreePayPal", "PPRiskMagnes"]
        ),
        .library(
            name: "BraintreePayPalMessaging",
            targets: ["BraintreePayPalMessaging"]
        ),
        .library(
            name: "BraintreePayPalNativeCheckout",
            targets: ["BraintreePayPalNativeCheckout"]
        ),
        .library(
            name: "BraintreeSEPADirectDebit",
            targets: ["BraintreeSEPADirectDebit"]
        ),
        .library(
            name: "BraintreeShopperInsights",
            targets: ["BraintreeShopperInsights"]
        ),
        .library(
            name: "BraintreeThreeDSecure",
            targets: ["BraintreeThreeDSecure", "CardinalMobile", "PPRiskMagnes"]
        ),
        .library(
            name: "BraintreeVenmo",
            targets: ["BraintreeVenmo"]
        ),
    ],
    targets: [
        // Targets are the basic building blocks of a package. A target can define a module or a test suite.
        // Targets can depend on other targets in this package, and on products in packages this package depends on.
        .target(
            name: "BraintreeAmericanExpress",
            dependencies: ["BraintreeCore"],
            resources: [.copy("PrivacyInfo.xcprivacy")]
        ),
        .target(
            name: "BraintreeApplePay",
            dependencies: ["BraintreeCore"],
            resources: [.copy("PrivacyInfo.xcprivacy")]
        ),
        .target(
            name: "BraintreeCard",
            dependencies: ["BraintreeCore"],
            resources: [.copy("PrivacyInfo.xcprivacy")]
        ),
        .target(
            name: "BraintreeCore",
            exclude: ["Info.plist", "Braintree.h"],
            resources: [.copy("PrivacyInfo.xcprivacy")]
        ),
        .target(
            name: "BraintreeDataCollector",
            dependencies: ["BraintreeCore", "PPRiskMagnes"],
            resources: [.copy("PrivacyInfo.xcprivacy")]
        ),
        .target(
            name: "BraintreeLocalPayment",
            dependencies: ["BraintreeCore", "BraintreeDataCollector"],
            resources: [.copy("PrivacyInfo.xcprivacy")]
        ),
        .target(
            name: "BraintreePayPal",
            dependencies: ["BraintreeCore", "BraintreeDataCollector"],
            resources: [.copy("PrivacyInfo.xcprivacy")]
        ),
        .target(
            name: "BraintreePayPalMessaging",
            dependencies: ["BraintreeCore", "PayPalMessages"],
            resources: [.copy("PrivacyInfo.xcprivacy")]
        ),
        .binaryTarget(
            name: "PayPalMessages",
            url: "https://github.com/paypal/paypal-messages-ios/releases/download/1.0.0/PayPalMessages.xcframework.zip",
            checksum: "565ab72a3ab75169e41685b16e43268a39e24217a12a641155961d8b10ffe1b4"
        ),
        .target(
            name: "BraintreePayPalNativeCheckout",
            dependencies: ["BraintreeCore", "BraintreePayPal", "PayPalCheckout"],
            path: "Sources/BraintreePayPalNativeCheckout",
            resources: [.copy("PrivacyInfo.xcprivacy")]
        ),
        .binaryTarget(
            name: "PayPalCheckout",
            url: "https://github.com/paypal/paypalcheckout-ios/releases/download/1.3.0/PayPalCheckout.xcframework.zip",
            checksum: "d65186f38f390cb9ae0431ecacf726774f7f89f5474c48244a07d17b248aa035"
        ),
        .target(
            name: "BraintreeSEPADirectDebit",
            dependencies: ["BraintreeCore"],
            path: "Sources/BraintreeSEPADirectDebit",
            resources: [.copy("PrivacyInfo.xcprivacy")]
        ),
        .target(
            name: "BraintreeShopperInsights",
            dependencies: ["BraintreeCore"],
            resources: [.copy("PrivacyInfo.xcprivacy")]
        ),
        .target(
            name: "BraintreeThreeDSecure",
            dependencies: ["BraintreeCard", "CardinalMobile", "PPRiskMagnes", "BraintreeCore"],
            resources: [.copy("PrivacyInfo.xcprivacy")]
        ),
        .binaryTarget(
            name: "CardinalMobile",
            path: "Frameworks/XCFrameworks/CardinalMobile.xcframework"
        ),
        .target(
            name: "BraintreeVenmo",
            dependencies: ["BraintreeCore"],
            resources: [.copy("PrivacyInfo.xcprivacy")]
        ),
        .binaryTarget(
            name: "PPRiskMagnes",
            path: "Frameworks/XCFrameworks/PPRiskMagnes.xcframework"
        )
    ]
)
```

[RxSwift/Package.swift](https://github.com/ReactiveX/RxSwift/blob/main/Package.swift)
```
// swift-tools-version:5.5

import PackageDescription

let buildTests = false

extension Product {
  static func allTests() -> [Product] {
    if buildTests {
      return [.executable(name: "AllTestz", targets: ["AllTestz"])]
    } else {
      return []
    }
  }
}

extension Target {
    static func rxTarget(name: String, dependencies: [Target.Dependency]) -> Target {
        .target(
            name: name,
            dependencies: dependencies,
            resources: [.copy("PrivacyInfo.xcprivacy")]
        )
    }
}

extension Target {
  static func rxCocoa() -> [Target] {
    #if os(Linux)
      return [.rxTarget(name: "RxCocoa", dependencies: ["RxSwift", "RxRelay"])]
    #else
      return [.rxTarget(name: "RxCocoa", dependencies: ["RxSwift", "RxRelay", "RxCocoaRuntime"])]
    #endif
  }

  static func rxCocoaRuntime() -> [Target] {
    #if os(Linux)
      return []
    #else
      return [.rxTarget(name: "RxCocoaRuntime", dependencies: ["RxSwift"])]
    #endif
  }

  static func allTests() -> [Target] {
    if buildTests {
      return [.target(name: "AllTestz", dependencies: ["RxSwift", "RxCocoa", "RxBlocking", "RxTest"])]
    } else {
      return []
    }
  }
}

let package = Package(
  name: "RxSwift",
  platforms: [.iOS(.v9), .macOS(.v10_10), .watchOS(.v3), .tvOS(.v9)],
  products: ([
    [
      .library(name: "RxSwift", targets: ["RxSwift"]),
      .library(name: "RxCocoa", targets: ["RxCocoa"]),
      .library(name: "RxRelay", targets: ["RxRelay"]),
      .library(name: "RxBlocking", targets: ["RxBlocking"]),
      .library(name: "RxTest", targets: ["RxTest"]),
      .library(name: "RxSwift-Dynamic", type: .dynamic, targets: ["RxSwift"]),
      .library(name: "RxCocoa-Dynamic", type: .dynamic, targets: ["RxCocoa"]),
      .library(name: "RxRelay-Dynamic", type: .dynamic, targets: ["RxRelay"]),
      .library(name: "RxBlocking-Dynamic", type: .dynamic, targets: ["RxBlocking"]),
      .library(name: "RxTest-Dynamic", type: .dynamic, targets: ["RxTest"]),
    ],
    Product.allTests()
  ] as [[Product]]).flatMap { $0 },
  targets: ([
    [
      .rxTarget(name: "RxSwift", dependencies: []),
    ],
    Target.rxCocoa(),
    Target.rxCocoaRuntime(),
    [
      .rxTarget(name: "RxRelay", dependencies: ["RxSwift"]),
      .target(name: "RxBlocking", dependencies: ["RxSwift"]),
      .target(name: "RxTest", dependencies: ["RxSwift"]),
    ],
    Target.allTests()
  ] as [[Target]]).flatMap { $0 },
  swiftLanguageVersions: [.v5]
)
```

### [`library(name:type:targets:)`](https://developer.apple.com/documentation/packagedescription/product/library(name:type:targets:))

> A library’s product can be either statically or dynamically linked. It’s recommended that you don’t explicitly declare the type of library, so Swift Package Manager can choose between static or dynamic linking based on the preference of the package’s consumer.

### [Understanding Static Library vs Dynamic Library in iOS Swift](https://medium.com/takodigital/understanding-static-library-vs-dynamic-library-in-ios-swift-f675f603a050)

Understanding the differences between static libraries and dynamic libraries is essential for iOS Swift developers.

**Static libraries provide simplicity, performance, and code protection, while dynamic libraries offer code sharing, versioning flexibility, and dynamic loading capabilities.**

By choosing the appropriate type of library based on your project’s requirements, you can optimize your development process and create efficient, scalable iOS applications.

### Try add swift package library to pod target's target denpendecies

[lib/xcodeproj/project/object/native_target.rb](https://github.com/CocoaPods/Xcodeproj/blob/master/lib/xcodeproj/project/object/native_target.rb)

```
# Add Target Dependency
#        container_proxy = Xcodeproj::Project::Object::PBXContainerItemProxy.new(
#          {
#            container_portal: project.root_object.uuid,
#            proxy_type: 1, # 1 for target, 2 for project
#            remote_global_id_string: pkg.uuid,
#            remote_info: product_name
#          }
#        )
#        container_proxy = Xcodeproj::Project::Object::PBXContainerItemProxy.new(
#          project.root_object.uuid, # container_portal
#          pkg.uuid # remote_global_id_string
#        )
        container_proxy = project.new(Xcodeproj::Project::PBXContainerItemProxy)
        container_proxy.container_portal = project.root_object.uuid
        container_proxy.proxy_type = "1"
        container_proxy.remote_global_id_string = ref.uuid
        container_proxy.remote_info = ref.product_name
        puts "=====container_proxy==#{container_proxy}"
#        target_dependency = Xcodeproj::Project::Object::PBXTargetDependency.new(
#          product_name,
#          container_proxy
#        )
        target_dependency = project.new(Xcodeproj::Project::PBXTargetDependency)
        target_dependency.name = ref.product_name
#        target_dependency.target = target if target.project == project
        target_dependency.target_proxy = container_proxy
        puts "=====target_dependency==#{target_dependency}"
        puts "=====add_target_dependency==#{product_name}==to_target==#{target_name}"
        target.dependencies << target_dependency
```

```
[!] An error occurred while processing the post-integrate hook of the Podfile.

undefined method `name' for an instance of Xcodeproj::Project::Object::XCRemoteSwiftPackageReference

/Users/gavinxiang/.rbenv/versions/3.3.5/lib/ruby/gems/3.3.0/gems/xcodeproj-1.27.0/lib/xcodeproj/project/object/native_target.rb:254:in `add_dependency'
```

New PBXTargetDependency and add target dependencies.

```
  def add_spm_to_target(project, target_name, url, requirement, product_name)
    project.targets.each do |target|
      if target.name == target_name
        pkg = project.root_object.package_references.find { |pkg| pkg.repositoryURL == url }
        if pkg.nil?
          pkg = project.new(Xcodeproj::Project::Object::XCRemoteSwiftPackageReference)
          pkg.repositoryURL = url
          pkg.requirement = requirement
          project.root_object.package_references << pkg
          puts "=====new swift package reference==#{pkg.repositoryURL}"
        else
          puts "=====matched swift package reference==#{pkg.repositoryURL}"
        end
        ref = project.new(Xcodeproj::Project::Object::XCSwiftPackageProductDependency)
        ref.package = pkg
        ref.product_name = product_name
        target.package_product_dependencies << ref
        
        # Add Target Dependency
        dependency = project.new(Xcodeproj::Project::Object::PBXTargetDependency)
        dependency.product_ref = ref
        target.dependencies << dependency
      end
    end
    project.save
  end
```

### Compile Error: XXX.xcodeproj Missing package product 'SDWebImageSVGNativeCoder' & duplicate output file 'XXX.app/SDWebImage_SDWebImage.bundle' on task: PhaseScriptExecution [CP] Copy Pods Resources

https://github.com/SDWebImage/SDWebImageSVGNativeCoder

```
  //spm_pkg "SDWebImage",
      //:url => "https://github.com/SDWebImage/SDWebImage.git",
      //:tag => "5.20.0"
  spm_pkg "SDWebImageSVGNativeCoder",
      :url => "https://github.com/SDWebImage/SDWebImageSVGNativeCoder.git",
      :tag => "0.2.0"
  spm_pkg "SDWebImageWebPCoder",
      :url => "https://github.com/SDWebImage/SDWebImageWebPCoder.git",
      :tag => "0.14.6"
  spm_pkg "SDWebImageSVGCoder",
      :url => "https://github.com/SDWebImage/SDWebImageSVGCoder.git",
      :tag => "1.7.0"
```
manually delete `SDWebImage*` libraries from main project's *Link binary with libraries*.
run `bundle exec pod install --no-repo-update --verbose`

## If you've previously used CocoaPods, remove them from the project with `pod deintegrate`.

[Swift Package Manager for Firebase](https://github.com/firebase/firebase-ios-sdk/blob/main/SwiftPackageManager.md)

### Removing empty `.xcworkspace` & other directories via `git clean -df`
```
% git clean -df
Removing XXX.xcworkspace/
Removing fastlane/metadata/
Removing fastlane/screenshots/
```

## [Should I git ignore xcodeproject/project.pbxproj file?](https://stackoverflow.com/questions/8026429/should-i-git-ignore-xcodeproject-project-pbxproj-file)
Update in the light of Swift Package Manager:
If you're building a project as a **Swift package (SDK: library/framework)** - you should definitely ignore this file as it can be generated using file system as source of truth. You can do that by using the following command:

```
$ cd ~/Projects/MyProjectFolder/
$ swift package generate-xcodeproj
```

For non-SwiftPM answer - see below.
This file holds the list of all the files in the project, settings of targets and which files belong to which targets. It's probably the meatiest file in project bundle. **You should not ignore this file**. There are few points for this:
    1    You may not want to work on this project alone or;
    2    You're planning on working on project from different machines;
    3    You'll want to share your code base with others;

## [Bundling resources with a Swift package](https://developer.apple.com/documentation/xcode/bundling-resources-with-a-swift-package#Explicitly-declare-or-exclude-resources)

Add resource files to your Swift package and access them in your code.

Explicitly declare or exclude resources

To add a resource that Xcode can’t handle automatically, explicitly declare it as a resource in your package manifest. The following example assumes that text.txt resides in Sources/MyLibrary and you want to include it in the MyLibrary target. To explicitly declare it as a package resource, you pass its file name to the target’s initializer in your package manifest:

```
targets: [
    .target(
        name: "MyLibrary",
        resources: [
            .process("text.txt")]
    ),
]
```

Note how the example code above uses the `process(_:localization:)` function. When you explicitly declare a resource, you must choose one of these rules to determine how Xcode treats the resource file:

*Process rule*

For most use cases, use `process(_:localization:)` to apply this rule and have Xcode process the resource according to the platform you’re building the package for. For example, Xcode may optimize image files for a platform that supports such optimizations. If you apply the process rule to a directory’s path, Xcode applies the rule recursively to the directory’s contents. If no special processing is available for a resource, Xcode copies the resource to the resource bundle’s top-level directory.

*Copy rule*

Some Swift packages may require a resource file to remain untouched or to retain a certain directory structure for resources. Use the `copy(_:)` function to apply this rule and have Xcode copy the resource as is to the top level of the resource bundle. If you pass a directory path to the copy rule, Xcode retains the directory’s structure.

If a file resides inside a target’s folder and you don’t want it to be a package resource, pass it to the target initializer’s exclude parameter. The next example assumes that instructions.md is a Markdown file that contains documentation, resides at Sources/MyLibrary and shouldn’t be part of the package’s resource bundle. This code shows how you can exclude the file from the target by adding it to the list of excluded files:

**Access a resource in code**

When you build your Swift package, Xcode treats each target as a Swift module. If a target includes resources, Xcode creates a resource bundle and an internal static extension on Bundle to access it for each module. Use the extension to locate package resources. For example, use the following to retrieve the URL of a property list you bundle with your package:

`let settingsURL = Bundle.module.url(forResource: "settings", withExtension: "plist")`

Important
**Always use Bundle.module when you access resources. A package shouldn’t make assumptions about the exact location of a resource.**

If you want to make a package resource available to apps that depend on your Swift package, declare a public constant for it. For example, use the following to expose a property list file to apps that use your Swift package:
`let settingsURL = Bundle.module.url(forResource: "settings", withExtension: "plist")`

```
// resource_bundle_accessor.swift (SPM auto generated)
import class Foundation.Bundle
import class Foundation.ProcessInfo
import struct Foundation.URL

private class BundleFinder {}

extension Foundation.Bundle {
    /// Returns the resource bundle associated with the current Swift module.
    static let module: Bundle = {
        let bundleName = "PRTAddressKit_PRTAddressKit"

        let overrides: [URL]
        #if DEBUG
        // The 'PACKAGE_RESOURCE_BUNDLE_PATH' name is preferred since the expected value is a path. The
        // check for 'PACKAGE_RESOURCE_BUNDLE_URL' will be removed when all clients have switched over.
        // This removal is tracked by rdar://107766372.
        if let override = ProcessInfo.processInfo.environment["PACKAGE_RESOURCE_BUNDLE_PATH"]
                       ?? ProcessInfo.processInfo.environment["PACKAGE_RESOURCE_BUNDLE_URL"] {
            overrides = [URL(fileURLWithPath: override)]
        } else {
            overrides = []
        }
        #else
        overrides = []
        #endif

        let candidates = overrides + [
            // Bundle should be present here when the package is linked into an App.
            Bundle.main.resourceURL,

            // Bundle should be present here when the package is linked into a framework.
            Bundle(for: BundleFinder.self).resourceURL,

            // For command-line tools.
            Bundle.main.bundleURL,
        ]

        for candidate in candidates {
            let bundlePath = candidate?.appendingPathComponent(bundleName + ".bundle")
            if let bundle = bundlePath.flatMap(Bundle.init(url:)) {
                return bundle
            }
        }
        fatalError("unable to find bundle named PRTAddressKit_PRTAddressKit")
    }()
}
```

```
// Alamofire/Tests/Bundle+AlamofireTests.swift
import Foundation
#if SWIFT_PACKAGE
import class Foundation.Bundle
#endif

extension Bundle {
    static var test: Bundle {
        let bundle: Bundle
        #if SWIFT_PACKAGE
        bundle = Bundle.module
        #else
        bundle = Bundle(for: BaseTestCase.self)
        #endif

        return bundle
    }
}

```

Load inner xxx.bundle in package bundle
```
public struct PRTAddressSDKBundle {
    
    public static let mainBundle: Bundle = {
#if SWIFT_PACKAGE
        let bundleURL = Bundle.module.url(forResource: "xxx", withExtension: "bundle")
        let bundle = Bundle(url: bundleURL!)!
        return bundle
#else
        let path = Bundle(for: Self.self).resourcePath! + "/xxx.bundle"
        let bundle = Bundle(path: path)
        return bundle!
#endif
    }()
    
}
```

## CI & Scripts Modifications
### fastlane - gym
```
gym(
    workspace: "XXX.xcworkspace",
    scheme: scheme,
    export_options: {
        thinning: "<none>",
        iCloudContainerEnvironment: "Production",
        uploadSymbols:  true,
        compileBitcode: false
    },
    export_method: "app-store",
    configuration: "Release",
    derived_data_path: dd_path
)
```
=>
```
gym(
    project: "XXX.xcodeproj",
    scheme: scheme,
    export_method: "app-store",
    export_options: {
        thinning: "<none>",
        iCloudContainerEnvironment: "Production",
        uploadSymbols:  true,
        compileBitcode: false
    }
)
```
### upload firebase crashlytics upload debug symbol(dSYM)
manully copy upload-symbols from FirebaseCrashlytics library at first
```
./Pods/FirebaseCrashlytics/upload-symbols -gsp ./XXX/GoogleService-Info.plist -p ios XXX.app.dSYM.zip
rm XXXX.app.dSYM.zip
```
=>
```
./scripts/FirebaseCrashlytics/upload-symbols -gsp ./XXX/GoogleService-Info.plist -p ios XXX.app.dSYM.zip
rm XXX.app.dSYM.zip
```
### CI - xcode clean
`xcodebuild -workspace XXX.xcworkspace -scheme fpus clean`
=>
`xcodebuild -project XXX.xcodeproj -scheme fpus clean`
### Xcode - Add github account with PAT (Personal Access Token)
xcode -> Settings... -> Accounts -> add GitHub account ➕
GitHub personal access tokens must have these scopes set:
```
☑️ admin:public_key
☑️ write:discussion
☑️ repo
☑️ user
```
Clong Using SSH, choose your `github-rsa` file.
### Jenkins - Private git repos need [PAT (Personal Access Token)](https://github.com/settings/tokens)
```
fatal: could not read Username for 'https://github.com':
terminal prompts disabledskipping cache due to an error:
Failed to clone repository https://github.com/XXX/xxx.git:
```
PAT generate method:
Github -> Avator -> Settings -> Developer Settings -> Tokens -> Generate new token -> Select scopes same as Xcode package dependencies required.

Copy the github url that the project is located. It should be https://github.com/GITHUB_USER_NAME/Project1.git

> Note: Starting from 13 Aug, 2021, you need to access github via personal access token therefore first you will need to create a personal access token in your github account and then you will access the repo url in this format: https://PERSONAL_ACCESS_TOKEN@github.com/GITHUB_USER_NAME/Project1.git

*Add PAT in Jenkins*
Manage Jenkins -> Credentials -> choose System(Store) + Global(Domain) -> Add Credentials -> Use PAT as password

*Add private git repositories in Jenkins Jobs*
Job -> Configure -> Source Code Management -> Git Repositories -> Add Repository (URL + Credentials)

## Manually expose headers in target namesake file header for OC package
```
➜  include git:(add_spm) pwd
/Users/gavinxiang/Downloads/fp_ios_file_download_manager/Sources/MDFileDownloadManager/include
➜  include git:(add_spm) ls
DownloadSessionConfiguration.h  MDFileDownloadManager.h
MDDownloadConfigModel.h         MDFileDownloadManagerDefine.h
MDDownloadOperation.h           MDFileDownloadManagerDelegate.h
MDFileDownloadCache.h           MDFileModel.h
MDFileDownloadConfig.h          NSString+MDFileDownloaderMD5.h
```

```
// swift-tools-version: 6.0
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "MDFileDownloadManager",
    products: [
        // Products define the executables and libraries a package produces, making them visible to other packages.
        .library(
            name: "MDFileDownloadManager",
            targets: ["MDFileDownloadManager"])
    ],
    targets: [
        // Targets are the basic building blocks of a package, defining a module or a test suite.
        // Targets can depend on other targets in this package and products from dependencies.
        .target(
            name: "MDFileDownloadManager",
            path: "Sources/MDFileDownloadManager",
            publicHeadersPath: "include"
        )
    ]
)
```

```
//
//  MDFileDownloadManager.h
//  MDFileDownloadManager

#import <Foundation/Foundation.h>
#import "MDFileDownloadConfig.h"
#import "MDDownloadOperation.h"
```

Although `MDFileDownloadCache.h` is contained in `include` directory, but we cannot use `MDFileDownloadCache` outside of the package, Xcode build failed with error:

`Use of undeclared identifier 'MDFileDownloadCache'`

Resolution:
Manually expose all `include` headers in target namesake file header `MDFileDownloadManager.h` for OC package like this:

```
//
//  MDFileDownloadManager.h
//  MDFileDownloadManager

#import <Foundation/Foundation.h>
#import "MDFileDownloadConfig.h"
#import "MDDownloadOperation.h"
#import "MDDownloadConfigModel.h"
#import "DownloadSessionConfiguration.h"
#import "MDFileDownloadCache.h"
#import "MDFileDownloadManagerDefine.h"
#import "MDFileDownloadManagerDelegate.h"
#import "MDFileModel.h"
#import "NSString+MDFileDownloaderMD5.h"
```

Another resolution is rename the target for this package like this (*Not recommended*):
```
// swift-tools-version: 6.0
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "MDFileDownloadManager",
    products: [
        // Products define the executables and libraries a package produces, making them visible to other packages.
        .library(
            name: "MDFileDownloadManager",
            targets: ["FileDownloadManager"])
    ],
    targets: [
        // Targets are the basic building blocks of a package, defining a module or a test suite.
        // Targets can depend on other targets in this package and products from dependencies.
        .target(
            name: "FileDownloadManager",
            path: "Sources/FileDownloadManager",
            publicHeadersPath: "include"
        )
    ]
)

```
