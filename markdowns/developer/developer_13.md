资源库 `/Users/user/Library` 下文件夹占用系统内存的绝大部分，多大情况可以达到100G以上，建议手动进行删除无用的或者已卸载App的缓存文件，切记不可全选删除！        
建议使用命令`$ ls -la`或者 `$ ls -lhtr` 进行查看文件最近访问时间并使用Finder排序文件大小进行判断是否需要删除，删除切记谨慎！！！        
Xcode会占用很大的内存空间，特别是各个版本的iOS的runtime文件,文件目录在        
`~/Library/Developer/Xcode/iOS\ DeviceSupport`        
这个根据个人手动筛选删除，建议每个大版本保留一个即可（**方便使用模拟器测试版本兼容问题**），需要的小版本可以后续使用的时候下载。        
**`Xcode_clean.sh` 脚本如下：**        
```#!/bin/bash        
# manual delete device support version in '~/Library/Developer/Xcode/iOS\ DeviceSupport'        
rm -rf ~/Library/Developer/Xcode/Archives        
rm -rf ~/Library/Developer/Xcode/DerivedData        
rm -rf ~/Library/Developer/Xcode/iOS\ Device\ Logs```        
*特别提醒，请勿在终端输入 `rm -rf ~` 会删除当前用户根目录下面的全部文件!!!*        
        
**`Git_clean.sh` 脚本如下：**        
```#!bin/bash        
echo '====git size before clean===='        
# 查看 Git 仓库占用空间        
du -hs .git/objects        
# 进行 Git 垃圾回收        
git gc --prune=now        
# 删除提交记录中无用的大文件(比较耗时，可忽略)        
git filter-branch --force --index-filter \        
'git rm --cached --ignore-unmatch bigfile' \        
--prune-empty --tag-name-filter cat -- --all        
echo '====git size after clean===='        
# 查看 Git 仓库占用空间        
du -hs .git/objects```        
**终端实例：**        
```
$ cd /Users/mxr/Desktop/4dbookcity        
$ sh /Users/mxr/Desktop/XDS/git_clean.sh        
====git size before clean====        
5.4G    .git/objects        
Enumerating objects: 1140152, done.        
Counting objects: 100% (1140152/1140152), done.        
Delta compression using up to 4 threads
            Compressing objects: 100% (83088/83088), done.        
Writing objects: 100% (1140152/1140152), done.        
Total 1140152 (delta 1065385), reused 1127589 (delta 1054145)        
Removing duplicate objects: 100% (256/256), done.        
Checking connectivity: 1140152, done.        
...        
WARNING: Ref 'refs/heads/5.33.0' is unchanged        
WARNING: Ref 'refs/remotes/origin/5.33.0' is unchanged        
iOS_5.33.0 -> iOS_5.33.0 (5be804ae21213b0aff32525167fc5eed70b1dbd9 -> 5be804ae21213b0aff32525167fc5eed70b1dbd9)        
====git size after clean====        
5.2G    .git/objects
```        
**Git 正确的工作方式 - `git rebase`**        
当然也有人会说，这是你不断地粗鲁地 `merge` 造成的结果，所以也可以去使用 `rebase` 命令来衍合你的分支代码，让整个历史 `log` 变成干净清晰的一条直线。        
`git rebase` 相对来说是比较复杂的一个命令了,但只要掌握了使用方式,你会深深地喜欢上他。        
如果连续多次的 `hotfix` 功能一致，建议使用 `git rebase` 将多个提交合并为一个，便于 `code review` 以及避免污染分支，遵循项目规范才能提高团队协作效率，而不是随心所欲。        
合并的时候需要修改合并规则，默认都是 `pick`，需要手动编辑修改，`squach` 或者 `fixup` 掉不需要的提交记录        
`$ git rebase -i HEAD~2` 编辑模式下终端实例 ：        
```
pick ed181cb005b Translation:Shark iPhone to back to turn        
squash 3171e58005e Add Description        
# Rebase 67a42ee1665..3171e58005e onto 67a42ee1665 (2 commands)        
#        
# Commands:        
# p, pick commit = use commit        
# r, reword commit = use commit, but edit the commit message        
# e, edit commit = use commit, but stop for amending        
# s, squash commit = use commit, but meld into previous commit        
# f, fixup commit = like "squash", but discard this commit's log message        
# x, exec command = run command (the rest of the line) using shell        
# b, break = stop here (continue rebase later with 'git rebase --continue')        
# d, drop commit = remove commit        
# l, label label = label current HEAD with a name        
# t, reset label = reset HEAD to a label        
# m, merge [-C commit | -c commit] label [# oneline]        
# .       create a merge commit using the original merge commit's        
# .       message (or the oneline, if no original merge commit was        
# .       specified). Use -c commit to reword the commit message.        
#        
# These lines can be re-ordered; they are executed from top to bottom.        
#        
# If you remove a line here THAT COMMIT WILL BE LOST.#        
# However, if you remove everything, the rebase will be aborted.        
#        
# Note that empty commits are commented out
```        
编辑完毕后：`Esc+:wq` 后执行`$ git rebase --continue` 即可将多个提交合并为一个。        
*现将 `git rebase` 的正确使用步骤总结如下:*        
*Git 操作步骤*        
假设Git目前只有一个分支 `master`。开发人员的工作流程是        
`git clone master branch`        
在自己本地 `checkout -b local` 创建一个本地开发分支        
在本地的开发分支上开发和测试        
阶段性开发完成后（包含功能代码和单元测试），可以准备提交代码        
首先切换到 `master` 分支，`git pull` 拉取最新的分支状态        
然后切回 `local` 分支        
通过 `git rebase -i` 将本地的多次提交合并为一个，以简化提交历史。本地有多个提交时,如果不进行这一步,在 `git rebase master` 时会多次解决冲突(最坏情况下,每一个提交都会相应解决一个冲突)        
`git rebase master` 将 `master` 最新的分支同步到本地，这个过程可能需要手动解决冲突(如果进行了上一步的话,只用解决一次冲突)        
然后切换到 `master` 分支，`git merge` 将本地的 `local` 分支内容合并到 `master` 分支        
`git push` 将 `master` 分支的提交上传        
*本地开发分支可以灵活管理*        
```git checkout master        
git pull        
git checkout local        
git rebase -i HEAD~2  //合并提交 --- 2表示合并两个        
git rebase master---->解决冲突--->git rebase --continue(执行修改完毕后的合并规则)        
git checkout master        
git merge local        
git push```        
关于 `rebase` 的更多使用可以参考官方文档，一旦你接受了这种方式，你的 `git log` 会变得更美观，也更符合人性。        
*但是也需要注意避免滥用 `rebase`:*        
如果你想要一个干净的，没有 `merge commit` 的线性历史树，那么你应该选择 `git rebase`;        
如果你想保留完整的历史记录，并且想要避免重写 `commit history` 的风险，你应该选择使用 `git merge`。
        
