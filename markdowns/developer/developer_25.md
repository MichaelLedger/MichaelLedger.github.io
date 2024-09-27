# MacOS - Unable to install ruby 3.x on M1 (Apple Silicon)

## Preface

> Ruby is a dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write.

This problem occurred because I had used a Time Machine backup from an x86_64 machine. That led to me having the wrong version of several libraries (such as ruby, should be `arm64-darwin23`), and possibly of Homebrew itself.
```
% ruby -v
ruby 3.0.0p0 (2020-12-25 revision 95aff21468) [x86_64-darwin20]
```
## Isssue

```
% rbenv install 3.3.5 --verbose
...
linking ruby
*** Following extensions are not compiled:
openssl:
    Could not be configured. It will not be installed.
    /private/var/folders/wk/frkkcch539lc6s2dk6dw9dy80000gn/T/ruby-build.20240925093641.38792.Zumu2y/ruby-3.3.5/ext/openssl/extconf.rb:122: OpenSSL library could not be found. You might want to use --with-openssl-dir=<dir> option to specify the prefix where OpenSSL is installed.
    Check ext/openssl/mkmf.log for more details.
psych:
    Could not be configured. It will not be installed.
    Check ext/psych/mkmf.log for more details.
*** Fix the problems, then remove these directories and try again if you want.
make[1]: *** [note] Error 1
make: *** [build-ext] Error 2
external command failed with status 2

BUILD FAILED (macOS 14.5 on arm64 using ruby-build 20240917)

You can inspect the build directory at /var/folders/wk/frkkcch539lc6s2dk6dw9dy80000gn/T/ruby-build.20240925093641.38792.Zumu2y
```

## Resolution

**At first, you need migrating Homebrew from Intel to M1!**

```
## Migrating Homebrew from Intel to M1

## You can copy and paste into the Terminal

## Go to home directory
cd ;

## Create list of installed Intel packages
brew bundle dump ;

## Install new version of Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)" ;

## Update the PATH to point to M1 version first
eval "$(/opt/homebrew/bin/brew shellenv)" ;
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc ;

## Migrate Intel packages (/usr/local/bin/brew) to M1 (/opt/Homebrew)
## You may need to enter your sysadmin password
brew bundle --file Brewfile ;

## Update packages
brew update ; 

## Upgrade packages
brew upgrade ;

## Clean up
brew cleanup ;

## Uninstall old Intel version

# Download uninstall script
curl -fsSL -o ./uninstall.sh https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh ;

# Run the uninstall specifying the old path
sudo /bin/bash ./uninstall.sh --path=/usr/local ;
# Enter password
# Type Y to uninstall

# Delete uninstall script
rm uninstall.sh ;

# Final cleanup
brew cleanup ;
```

**Install ruby 3.3.5 by rbenv**
`RUBY_CFLAGS="-Wno-error=implicit-function-declaration" RUBY_CONFIGURE_OPTS="--with-openssl-dir=/opt/homebrew/opt/openssl@3 --with-libyaml-dir=/opt/homebrew/opt/libyaml" rbenv install 3.3.5`

system openssl path: `/usr/local/Cellar/openssl@3` & `/usr/local/Cellar/libyaml`
```
% brew --prefix openssl
/usr/local/opt/openssl@3
% brew --prefix libyaml
/usr/local/opt/libyaml
```

Install ruby 3.x using `openssl@3` & `libyaml` opt in **homebrew**, not in system!

```
% opt git:(stable) pwd
/opt/homebrew/opt
% opt git:(stable) ls
ca-certificates openssl         openssl@3.3     ruby@3
libyaml         openssl@3       ruby            ruby@3.3
```

## [Terminal: run `source ~/.bash_profile` every time start new terminal [closed]](https://apple.stackexchange.com/questions/315985/terminal-run-source-bash-profile-every-time-start-new-terminal)
Need to run `source ~/.zshrc` OR `source ~/.bash_profile` for every new shell in terminal. 

If you are using [oh-my-zsh](https://ohmyz.sh), the default one that will be loaded automatically is `~/.zshrc`. All you need to do is adding the following at the end of `~/.zshrc`:

```
if [ -f ~/.bash_profile ]; then
  . ~/.bash_profile
fi
```

It works! 🎉🎉🎉

### RVM also need install `ruby-3.3.5 [arm64]`

```
% rvm list
   ruby-2.7.5 [ x86_64 ]
=* ruby-3.0.0 [ x86_64 ]

# => - current
# =* - current && default
#  * - default
```

Install RVM
`$ \curl -sSL https://get.rvm.io | bash`

`% RUBY_CFLAGS="-w" rbenv install 3.3.5`

`% RUBY_CFLAGS="-Wno-error=implicit-function-declaration -Wmacro-redefined" rvm reinstall "ruby-3.3.5" --with-openssl-dir=/opt/homebrew/opt/openssl@3 --with-libyaml-dir=/opt/homebrew/opt/libyaml`

```
% rvm gemset list
Warning! PATH is not properly set up, /Users/gavinxiang/.rvm/gems/ruby-3.3.5@global/bin is not at first place.
         Usually this is caused by shell initialization files. Search for PATH=... entries.
         You can also re-add RVM to your profile by running: rvm get stable --auto-dotfiles
         To fix it temporarily in this shell session run: rvm use ruby-3.3.5@global
         To ignore this error add rvm_silence_path_mismatch_check_flag=1 to your ~/.rvmrc file.

gemsets for ruby-3.3.5 (found in /Users/gavinxiang/.rvm/gems/ruby-3.3.5)
   (default)
   chat_app
=> global
```

`rvm use ruby-3.3.5@global`

```
% rvm list
   ruby-2.7.5 [ x86_64 ]
   ruby-3.0.0 [ x86_64 ]
=* ruby-3.3.5 [ arm64 ]

# => - current
# =* - current && default
#  * - default
```

```
% RUBY_CFLAGS="-Wno-error=implicit-function-declaration -Wmacro-redefined" rvm reinstall "ruby-3.3.5" --with-openssl-dir=/opt/homebrew/opt/openssl@3 --with-libyaml-dir=/opt/homebrew/opt/libyaml
ruby-3.3.5 - #removing src/ruby-3.3.5 - please wait
Checking requirements for osx.
Updating certificates bundle '/usr/local/etc/openssl@3/cert.pem'
Requirements installation successful.
Installing Ruby from source to: /Users/gavinxiang/.rvm/rubies/ruby-3.3.5, this may take a while depending on your cpu(s)...
ruby-3.3.5 - #downloading ruby-3.3.5, this may take a while depending on your connection...
ruby-3.3.5 - #extracting ruby-3.3.5 to /Users/gavinxiang/.rvm/src/ruby-3.3.5 - please wait
ruby-3.3.5 - #autogen.sh - please wait
ruby-3.3.5 - #configuring - please wait
ruby-3.3.5 - #post-configuration - please wait
ruby-3.3.5 - #compiling - please wait
ruby-3.3.5 - #installing - please wait
ruby-3.3.5 - #making binaries executable - please wait
Installed rubygems 3.5.16 is newer than 3.0.9 provided with installed ruby, skipping installation, use --force to force installation.
ruby-3.3.5 - #gemset created /Users/gavinxiang/.rvm/gems/ruby-3.3.5@global
ruby-3.3.5 - #importing gemset /Users/gavinxiang/.rvm/gemsets/global.gems - please wait
Error running 'command gem install /Users/gavinxiang/.rvm/gem-cache/gem-wrappers-1.4.0.gem --local --no-document',
please read /Users/gavinxiang/.rvm/log/1727401643_ruby-3.3.5/gem.install.gem-wrappers->=1.4.0.log
there was an error installing gem gem-wrappers
```

Switch current & default ruby version for RVM
`rvm --ruby-version use 3.3.5`
`rvm alias create default 3.3.5`

```
% rvm list
   ruby-2.7.5 [ x86_64 ]
   ruby-3.0.0 [ x86_64 ]
=* ruby-3.3.5 [ arm64 ]

# => - current
# =* - current && default
#  * - default
```

### rvm gemset
Let’s view the current list of RVM gemsets:
```
% rvm gemset create chat_app
ruby-3.3.5 - #gemset created /Users/gavinxiang/.rvm/gems/ruby-3.3.5@chat_app
ruby-3.3.5 - #generating chat_app wrappers...................
Error running 'run_gem_wrappers regenerate',
please read /Users/gavinxiang/.rvm/log/1727403709_ruby-3.3.5/gemset.wrappers.chat_app.log

% rvm gemset use chat_app
Using ruby-3.3.5 with gemset chat_app

% rvm gemset list
gemsets for ruby-3.3.5 (found in /Users/gavinxiang/.rvm/gems/ruby-3.3.5)
   (default)
=> chat_app
   global
```

`rvm gemset delete <gemset_name>`

### install old ruby with this openssl
```
$ rvm pkg install openssl
$ rvm install 2.3.1 --with-openssl-dir=$HOME/.rvm/usr
```

### Remark for Ruby version 3+
When install ruby v3, we may specific openssl location.
Check your openssl location before installation
- location A
```
$ ls /usr/local/opt | grep openssl
openssl
openssl@1.1
openssl@3
openssl@3.1
```
`$ rvm install ruby-3.1.0 --with-openssl-dir=/usr/local/opt/openssl@3.1`

- location B
```
$ ls /opt/homebrew/opt | grep openssl
openssl
openssl@1.1
openssl@3
openssl@3.1
```
`$ rvm install ruby-3.1.0 --with-openssl-dir=/opt/homebrew/opt/openssl@3.1`

## Exercises

```
% RUBY_CFLAGS="-Wno-error=implicit-function-declaration" RUBY_CONFIGURE_OPTS="--with-openssl-dir=/opt/homebrew/opt/openssl@3 --with-libyaml-dir=/opt/homebrew/opt/libyaml" rbenv install 3.3.5
==> Downloading ruby-3.3.5.tar.gz...
-> curl -q -fL -o ruby-3.3.5.tar.gz https://cache.ruby-lang.org/pub/ruby/3.3/ruby-3.3.5.tar.gz
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 21.1M  100 21.1M    0     0  3169k      0  0:00:06  0:00:06 --:--:-- 4960k
==> Installing ruby-3.3.5...
ruby-build: using gmp from homebrew
-> ./configure "--prefix=$HOME/.rbenv/versions/3.3.5" --enable-shared --with-gmp-dir=/usr/local/opt/gmp --with-ext=openssl,psych,+ --with-openssl-dir=/opt/homebrew/opt/openssl@3 --with-libyaml-dir=/opt/homebrew/opt/libyaml
-> make -j 10
-> make install
==> Installed ruby-3.3.5 to /Users/gavinxiang/.rbenv/versions/3.3.5
```

**Using `rbenv` to control multi ruby versions, which will generate `.ruby-version` file at current path.**

`echo '### rbenv\nexport PATH="$HOME/.rbenv/bin:$PATH"\neval "$(rbenv init -)"' >> ~/.bash_profile`
`source ~/.bash_profile`

`echo '### rbenv\nexport PATH="$HOME/.rbenv/bin:$PATH"\neval "$(rbenv init -)"' >> ~/.zshrc`
`source ~/.zshrc`

```
% ruby -v
ruby 2.7.5p203 (2021-11-24 revision f69aeb8314) [x86_64-darwin20]
% rbenv local 3.3.5
% cat .ruby-version 
3.3.5
% rbenv versions
  system
  2.3.8
  2.7.5
* 3.3.5 (set by /Users/gavinxiang/Downloads/synergy-ios/.ruby-version)
% source ~/.bash_profile 
% ruby -v
ruby 3.3.5 (2024-09-03 revision ef084cc8f4) [arm64-darwin23]
```

## Tips
### brew --prefix <formula>
Display the location in the cellar where formula is or would be installed.
```
% brew --prefix
/usr/local
% brew --prefix openssl@3
/usr/local/opt/openssl@3
```

### Find latest stable releases for each Ruby
```
% rbenv install -l
3.1.6
3.2.5
3.3.5
jruby-9.4.8.0
mruby-3.3.0
picoruby-3.0.0
truffleruby-24.1.0
truffleruby+graalvm-24.1.0

Only latest stable releases for each Ruby implementation are shown.
Use `rbenv install --list-all' to show all local versions.
```

### Check if you have other Ruby managers
Run these commands in your terminal:
`rbenv help`
`rvm help`
`asdf --help`
`frum versions`

### rbenv doctor
`curl -fsSL https://github.com/rbenv/rbenv-installer/raw/main/bin/rbenv-doctor | bash`

```
% curl -fsSL https://github.com/rbenv/rbenv-installer/raw/main/bin/rbenv-doctor | bash
Checking for `rbenv' in PATH: /usr/local/bin/rbenv
Checking for rbenv shims in PATH: found at wrong position
  The directory `/Users/gavinxiang/.rbenv/shims' is present in PATH, but is listed too late.
  The Ruby version found in `/Users/gavinxiang/.rvm/rubies/ruby-3.0.0/bin' will have precedence. Please reorder your PATH.

Checking `rbenv install' support: /usr/local/bin/rbenv-install (ruby-build 20240917)
Counting installed Ruby versions: 2 versions
Auditing installed plugins: OK
```
[Trying to install rbenv but running into this problem: "Checking for rbenv shims in PATH: not found" #1217](https://github.com/rbenv/rbenv/issues/1217)
I ran `source ~/.bash_profile` and then `echo 'eval "$(rbenv init -)"' >> ~/.bash_profile` and after that the rbenv doctor script printout matches that in the instructions, so I think this is resolved.

### Check terminal whether in Rosetta mode
If you’re on an Apple Silicon Mac, make sure Terminal is NOT in Rosetta mode.
You can check by running this command once Terminal opens:
`uname -m`
It should say `arm64` if you’re on an Apple Silicon Mac. If it says `x86_64`, that means Terminal (or whatever terminal app you’re using, such as iTerm) is in Rosetta mode.

### choose which version `openssl`?
As I have described in this blog post of mine, you need to specify the path to the version of OpenSSL that your version of Ruby requires:
Ruby `3.1` and `newer`, use:
`RUBY_CONFIGURE_OPTS="--with-openssl-dir=$(brew --prefix openssl@3)" rbenv install 3.1.0`
Ruby `2.4` to `3.0`, use:
`RUBY_CONFIGURE_OPTS="--with-openssl-dir=$(brew --prefix openssl@1.1)" rbenv install 2.4.0`
Ruby `2.3` and `older`, use
`RUBY_CONFIGURE_OPTS="--with-openssl-dir=$(brew --prefix openssl@1)" rbenv install 2.3.0`

### rbenv not changing ruby version?

To ensure that rbenv is correctly loaded when we start a new shell, I had to edit a couple of files. I added the following line to `.zshenv`:

`export PATH="$HOME/.rbenv/bin:$PATH"`

This adds gem-specific binaries to the PATH so that they are accessible to the shell without fully qualifying them with their path.

Then I added the following lines to `.zshrc`:

```
source $HOME/.zshenv
eval "$(rbenv init - zsh)"
```

This ensures that the previous file is sourced when a new session is started and that rbenv is initialized for Zsh.

At this point, you’ll want to source .zshrc (or simply restart the terminal of your choice like iTerm2, instead):

`$ source ~/.zshrc`

With `rbenv` ready to go, I installed the latest version of Ruby and set it as my global default for this machine.

`$ rbenv global 3.3.5` OR `$ rbenv local 3.3.5`

```
$ cat ~/.ruby-version 
3.3.5
```

Check that PATH contains `$HOME/.rbenv/shim`s and `$HOME/.rbenv/bin`
`$ env | grep PATH`
Also check that you have the following in your `~/.bash_profile` if using bash or `~/.zshenv` if using zsh
```
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
```
You can just run `echo 'eval "$(rbenv init -)"' >> ~/.bash_profile` to add text at the end of file.

After edited, just run `source ~/.bash_profile` or `source ~/.zshrc` in your terminal to make it work.

### Check your Xcode Command Line Tools version

```
% pkgutil --pkg-info=com.apple.pkg.CLTools_Executables | grep version
version: 15.3.0.0.1.1708646388
```

### where is ruby 3.0.0 on rbenv
You need to update the available versions via ruby-build
```
% git -C ~/.rbenv/plugins/ruby-build pull
% rbenv install 3.0.0
...
Installed ruby-3.0.0 to ~/.rbenv/versions/3.0.0
```

### Update Ruby
1. brew update && brew upgrade ruby-build
2. rbenv install 3.3.5
3. rbenv local 3.3.5  (with bundle) /   rbenv global 3.3.5 (without bundle)
4. ruby --version  (check ruby version)

### Update bundler
1. bundle update --bundler   
2. bundler --version  (check bundler version)

### [On My Zsh](https://ohmyz.sh)

`Oh My Zsh` is a delightful, open source, community-driven framework for managing your Zsh configuration. It comes bundled with thousands of helpful functions, helpers, plugins, themes, and a few things that make you shout...

`sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`

### common environment setups
```
1. Install homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

2. Install oh-my-zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

brew install autojump 
brew install zsh-autosuggestions
brew install zsh-syntax-highlighting

3. Install rbenv
brew install rbenv
echo 'eval "$(rbenv init -)"' >> ~/.zshrc

4. Install tree
brew install tree

5. Install ruby
rbenv install 3.3.5
```

### `.zshrc.pre-oh-my-zsh`
`% cat ~/.zshrc.pre-oh-my-zsh`
```
# Add RVM to PATH for scripting. Make sure this is the last PATH variable change.
export PATH="$PATH:$HOME/.rvm/bin"
```

`rvm install "ruby-3.3.5"`

### Zsh Shell

Now let me see the version of Bash that's shipped with macOS Sonoma 14.5 in Apple M1 Pro.

```
% sw_vers
ProductName:        macOS
ProductVersion:        14.5
BuildVersion:        23F79

% bash -version
GNU bash, version 3.2.57(1)-release (arm64-apple-darwin23)
Copyright (C) 2007 Free Software Foundation, Inc.
```

*What is Zsh?*

Zsh, read as Z shell is a Unix Shell (Bash is a Unix Shell as well)

Zsh shell is shipped as the default login and interactive shell with Apple macOS since Catalina

It is an extension of sh (Bourne shell)

Zsh is incorporated with most of the features from bash, zsh, tcsh and sh shell along with many new features.

Zsh is also a powerful scripting language.

*History of Zsh?*

The first version of Zsh was written by Paul Falstad in the 1990

The name zsh has been derived from the name of professor Zhong Shao of Yale University.

`~/.zshenv` : Zsh Environment File

`% nano ~/.zshenv`

Adding PATH and other environment variables:

```
PATH=$PATH:/opt/homebrew/bin
PROD_ENV_DIR=/usr/bin/mydir
```

Apply changes:

`% source ~/.zshenv`

Testing:
```
% echo $PROD_ENV_DIR
/usr/bin/mydir
```

## Backup `~/.bash_profile` & `~/.zshrc` & `~/.gitconfig`
`% cat ~/.bash_profile`
```
export SYSTEM_VERSION_COMPAT=0

alias ..='cd ..'

alias ...='cd ../../'

alias l='ls -lah'

alias md='x'
x(){
    mkdir $1
    cd $1
}

alias am='automerge'
automerge(){
    sh /Users/gavinxiang/Downloads/Shell-Collection/Git_auto-merge-pr/auto-merge-pr.sh $1 $2 $3
}

[[ -s "$HOME/.profile" ]] && source "$HOME/.profile" # Load the default .profile

[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*

### MANAGED BY RANCHER DESKTOP START (DO NOT EDIT)
export PATH="/Users/gavinxiang/.rd/bin:$PATH"
### MANAGED BY RANCHER DESKTOP END (DO NOT EDIT)

### rbenv
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"

```

`% cat ~/.zshrc`
```
# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH="$HOME/.oh-my-zsh"

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="robbyrussell"

# Set list of themes to pick from when loading at random
# Setting this variable when ZSH_THEME=random will cause zsh to load
# a theme from this variable instead of looking in $ZSH/themes/
# If set to an empty array, this variable will have no effect.
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion.
# Case-sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment one of the following lines to change the auto-update behavior
# zstyle ':omz:update' mode disabled  # disable automatic updates
# zstyle ':omz:update' mode auto      # update automatically without asking
# zstyle ':omz:update' mode reminder  # just remind me to update when it's time

# Uncomment the following line to change how often to auto-update (in days).
# zstyle ':omz:update' frequency 13

# Uncomment the following line if pasting URLs and other text is messed up.
# DISABLE_MAGIC_FUNCTIONS="true"

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# You can also set it to another string to have that shown instead of the default red dots.
# e.g. COMPLETION_WAITING_DOTS="%F{yellow}waiting...%f"
# Caution: this setting can cause issues with multiline prompts in zsh < 5.7.1 (see #5765)
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# You can set one of the optional three formats:
# "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# or set a custom format using the strftime function format specifications,
# see 'man strftime' for details.
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git)

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/Users/gavinxiang/miniconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/Users/gavinxiang/miniconda3/etc/profile.d/conda.sh" ]; then
        . "/Users/gavinxiang/miniconda3/etc/profile.d/conda.sh"
    else
        export PATH="/Users/gavinxiang/miniconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<


### MANAGED BY RANCHER DESKTOP START (DO NOT EDIT)
export PATH="/Users/gavinxiang/.rd/bin:$PATH"
### MANAGED BY RANCHER DESKTOP END (DO NOT EDIT)

### rbenv
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"

### automatically load .bash_profile
if [ -f ~/.bash_profile ]; then
  . ~/.bash_profile
fi

```

`% cat ~/.gitconfig`
```
[core]
    excludesfile = /Users/gavinxiang/.gitignore_global
    packedGitLimit = 512m 
        packedGitWindowSize = 512m
    compression = 0
[pack] 
        deltaCacheSize = 2047m 
        packSizeLimit = 2047m 
        windowMemory = 2047m
[difftool "sourcetree"]
    cmd = opendiff \"$LOCAL\" \"$REMOTE\"
    path = 
[mergetool "sourcetree"]
    cmd = /Applications/Sourcetree.app/Contents/Resources/opendiff-w.sh \"$LOCAL\" \"$REMOTE\" -ancestor \"$BASE\" -merge \"$MERGED\"
    trustExitCode = true
[filter "lfs"]
    required = true
    clean = git-lfs clean -- %f
    smudge = git-lfs smudge -- %f
    process = git-lfs filter-process
[alias]           
    co=checkout           
    ci=commit           
    st=status           
    pl=pull           
    ps=push           
    dt=difftool
    mt=mergetool           
    l=log—stat           
    cp=cherry-pick           
    ca=commit-a           
    b=branch
    sm=submodule
[user]
    name = GavinXiang
    email = gavin.xiang@planetart.cn
[merge]
    tool = opendiff
[diff]
    tool = opendiff
[difftool]
    prompt = false
[pull]
    rebase = false
[commit]
    template = /Users/gavinxiang/.stCommitMsg
[http]
    postBuffer = 524288000
    version = HTTP/2
    lowSpeedLimit = 0
    lowSpeedTime = 999999
    
```

## Reference
[Migrate from Intel (Rosetta2) to ARM brew on M1 #417](https://github.com/orgs/Homebrew/discussions/417)
[Install RVM in macOS (step by step)](https://nrogap.medium.com/install-rvm-in-macos-step-by-step-d3b3c236953b)
[Unable to install any ruby version through rvm on a Mac M1 Silicon Chip](https://stackoverflow.com/questions/73041561/unable-to-install-any-ruby-version-through-rvm-on-a-mac-m1-silicon-chip)
[Getting a warning when installing homebrew on MacOS Big Sur (M1 chip) [closed]](https://stackoverflow.com/questions/65487249/getting-a-warning-when-installing-homebrew-on-macos-big-sur-m1-chip)
[The fastest and easiest way to install Ruby on a Mac in 2024](https://www.moncefbelyamani.com/how-to-install-xcode-homebrew-git-rvm-ruby-on-mac/)
[Problems building Ruby on ARM-64 MacOS machine](https://stackoverflow.com/questions/76353900/problems-building-ruby-on-arm-64-macos-machine)
[rbenv not changing ruby version](https://stackoverflow.com/questions/10940736/rbenv-not-changing-ruby-version)
[where is ruby 3.0.0 on rbenv](https://stackoverflow.com/questions/66129103/where-is-ruby-3-0-0-on-rbenv)
[Unable to install ruby 3.1.x on M1 (Apple Silicon) #1961](https://github.com/rbenv/ruby-build/discussions/1961)
[onmyzsh - Wiki](https://github.com/ohmyzsh/ohmyzsh/wiki)
[ProgrammingInstalling rbenv on Zsh (on MacOS)](https://programmingzen.com/installing-rbenv-on-zsh-on-macos/)
[The Zsh Shell - Mac Tutorial](https://code2care.org/zsh/zsh-shell-mac-tutorial/#google_vignette)
[How to use RVM as a Ruby Version Manager](https://www.nikitakazakov.com/how-to-ruby-rvm/)
[Installing Ruby <3.0 on Mac M1](https://www.reddit.com/r/ruby/comments/xkyo92/installing_ruby_30_on_mac_m1/)
