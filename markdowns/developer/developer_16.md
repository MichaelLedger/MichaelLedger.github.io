**代码仓库检测**        
```$ cd '/Users/mxr/Desktop/4dbookcity'        
$ grep -R 'locationServicesEnabled:' *        
Binary file ios/Pods/MOBFoundation/MOBFoundation.framework/MOBFoundation matches        
$ grep -R 'allocBatch' *        
$ grep -R 'allocWithEntity' *```        
**IPA包检测**        
将ipa包后缀改为.zip，解压后包含两个文件夹：Payload、Symbols。        
```$ cd /Users/mxr/Desktop/XDS/BookCity_iPA/5.35.0/4dBookCity/Payload/4dBookCity.app        
$ strings - -a -arch armv7 "4dBookCity" | grep AVFullScreen```        
**静态库检测**        
```$ cd /Users/mxr/Desktop/XDS/Apple-API-Check        
$ ls        
libmil.a    libmtl.a        
$ find . | grep -v .svn | grep "\.a" | grep -v "\.app" | xargs grep locationServicesEnabled        
Binary file ./libmil.a matches        
或者        
$ grep -r locationServicesEnabled .```        
**被拒邮件**：        
Guideline 2.5.1 - Performance - Software Requirements        
Your app uses or references the following non-public APIs:        
Specifically, this app includes one or more Private API use, including but not limited to, "AVFullScreenViewController, allocWithEntity:, locationServicesEnabled:, allocBatch:withEntity:count:"        
The use of non-public APIs is not permitted on the App Store because it can lead to a poor user experience should these APIs change.        
Continuing to use or conceal non-public APIs in future submissions of this app may result in the termination of your Apple Developer account, as well as removal of all associated apps from the App Store.        
Next Steps        
If you are using third-party libraries, please update to the most recent version of those libraries. If you do not have access to the libraries' source, you may be able to search the compiled binary using the "strings" or "otool" command line tools. The "strings" tool can output a list of the methods that the library calls and "otool -ov" will output the Objective-C class structures and their defined methods. These tools can help you narrow down where the problematic code resides. You could also use the "nm" tool to verify if any third-party libraries are calling these APIs.        
Resources        
If there are no alternatives for providing the functionality your app requires, you can use Feedback Assistant to submit an enhancement request.        
准则2.5.1  - 性能 - 软件要求        
您的应用使用或引用以下非公共API：        
具体来说，这个应用程序包括一个或多个私有API使用，包括但不限于“AVFullScreenViewController，allocWithEntity：，locationServicesEnabled：，allocBatch：withEntity：count：”        
App Store上不允许使用非公共API，因为如果这些API发生变化，可能会导致糟糕的用户体验。        
在将来提交此应用程序时继续使用或隐藏非公共API可能会导致Apple Developer帐户被终止，以及从App Store中删除所有相关应用程序。        
下一步        
如果您使用的是第三方库，请更新到这些库的最新版本。如果您无权访问库的源，则可以使用“strings”或“otool”命令行工具搜索已编译的二进制文件。 “strings”工具可以输出库调用的方法列表，“otool -ov”将输出Objective-C类结构及其定义的方法。这些工具可以帮助您缩小有问题的代码所在的位置。您还可以使用“nm”工具验证是否有任何第三方库正在调用这些API。        
**备注**        
`locationServicesEnabled`类方法是可以调用的，但是`locationServicesEnabled:`实例方法为私有过期API，不可调用！        
MOB基础工具库：`MOBFoundation`低版本（V3.0.4）使用了上述私有API导致被拒，升级至最新版本（V3.2.4）即可。
        
