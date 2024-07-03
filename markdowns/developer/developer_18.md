# How to remove files permanently from git history

Imagine you have a secure file or a big file that does not need to be sent to git, but as you didn’t know how to do that you sent tenths of commits with this file and now you decided to remove it.
If you just remove it normally and add to `.gitgnore` it will remove from your current commit but not from all the pasts commit.
You will need to use BFG Repo-Cleaner to remove this file from all the past commits.

## Step 1 — Remove from current commit

As in this StackOverFlow answer remove the file from your current commit using the following code:
```
git rm my_password.txt
git commit -m "Remove sensitive data"
git push origin master
```

## Step 2 —Ignore the file from your future commits
Add the file name to your `.gitgnore` file in the root of your project.

- Create a file named `.gitgnore`. If you have difficulties to do that check this StackOverFlow answer. The answer is for Windows and in the comments you check how to do it for MacOS.

- Insert the file you want to ignore to `.gitgnore`
```
# git ls-files --others --exclude-from=.git/info/exclude
# Lines that start with '#' are comments.
# For a project mostly in C, the following would be a good set of
# exclude patterns (uncomment them if you want to use them):
# *.[oa]
# *~
# ignore passwords
my_password.txt
```

## Step 3 — Remove the file from history
In this final step you will use [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/).
- Download the file from the link
- Rename it to bfg.jar
- Paste it in the root of your git repository.
- Run java -jar bfg.jar --delete-files my_password.txt . You will get a message saying BFG run is complete!.
- Push your changes to git.

## [BFG Repo-Cleaner](https://github.com/rtyley/bfg-repo-cleaner)
Removes large or troublesome blobs like git-filter-branch does, but faster. And written in Scala

## Mine Resolution
Make sure all stashed blobs are saved in your feature branches and all your local branches are pushed to remote!
Delete the repo directory completely and re-clone it from latest branch, usually is `master` or `main`, only check out branches which you need to develop on!

### Reference
[How to remove files permanently from git history](https://soonsantos.medium.com/how-to-remove-files-permanently-from-git-history-d0916202fdf7)
