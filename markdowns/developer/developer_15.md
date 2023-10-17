将脚本 `icon_gen.sh` 和1024尺寸的图片 `1024.png` 放在同级目录下执行脚本即可：`$ sh icon_gen.sh`        
`icon_gen.sh` 脚本如下：        
```
#!/bin/bash        
rm -rf AppIcon.appiconset        
mkdir AppIcon.appiconset        
function cut(){        
sips -Z $1 1024.png --out ./AppIcon.appiconset/$2@$3x.png        
}        
cut 80 40 2        
cut 180 60 3        
cut 29 29 1        
cut 58 29 2        
cut 87 29 3        
cut 80 40 2        
cut 120 40 3        
cut 57 57 1        
cut 114 57 2        
cut 120 60 2        
cut 180 60 3        
cut 20 20 1        
cut 40 20 2        
cut 29 29 1        
cut 58 29 2        
cut 40 40 1        
cut 80 40 2        
cut 76 76 1        
cut 152 76 2        
cut 167 83.5 2        
cut 1024 1024 1        
cut 120 60 2        
cut 180 60 3        
cut 48 24 2        
cut 55 27.5 2        
cut 58 29 2        
cut 87 29 3        
cut 40 40 1        
cut 172 86 2        
cut 196 98 2        
cut 1024 1024 1        
cut 60 20 3        
cut 50 50 1        
cut 100 50 2        
cut 72 72 1        
cut 144 72 2        
cut 88 44 2        
cut 216 108 2        
```
注意苹果要求AppIcon不能包含alpha通道，否则ipa包上传AppStore会报错:        
```
1 package(s) were not uploaded because they had problems:
/var/folders/jw/m70dpfj10vg2zv1200gyp4000000gn/T/6FD72DC4-0E2D-47AD-8CB6-083E4BD59BDE/842495919.itmsp - 
Error Messages:
ERROR ITMS-90717: "Invalid App Store Icon. The App Store Icon in the asset catalog in '4dBookCity.app' can't be transparent nor contain an alpha channel."
```       
通过右击图像->显示简介->更多信息->Alpha通道可确认是否包含透明通道        
利用Mac自带预览App将图片导出为不含透明通道的png图片![](developer-images/export-no-alpha-icon.png)
        
