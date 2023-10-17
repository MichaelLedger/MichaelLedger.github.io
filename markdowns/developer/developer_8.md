[**Gitbox免费下载地址**](https://github.com/MichaelLedger/Applications)        
**Gitbox激活码**        
`TNTCKVLSAXRJYIWROYLHNCZRVJNNWREOROBU6117904f`        
![](developer-images/gitbox-license-number.png)        
**GitBox默认使用Xcode自带的FileMerge打开diff页面**        
![](developer-images/gitbox-filemerge.png)        
正常情况下，选中左侧提交记录后，在右侧detail页面双击即可打开diff页面查看本次提交的所做的修改内容        
若打不开，则可按照以下方法解决：        
终端输入：        
`$ sudo /usr/bin/xcode-select -switch /Applications/Xcode.app/Contents/Developer`        
关闭GitBox后重新启动，尝试是否能够打开，如果仍然打不开，则按照以下步骤：        
1. 安装最新Xcode        
2. 安装Xcode对应版本的Command line tools工具：        
`$ xcode-select --install`        
3. 终端重新输入上面的命令。
        
