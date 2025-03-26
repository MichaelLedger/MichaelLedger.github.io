# Amplitude - Best Practice

## [Home](https://app.amplitude.com/analytics)

Lookup user activity:

Create > Dashboard > User Activity

Create event/property entry:

Left Side Bar > Data > Events/Properties > Create Event/Property

User Profiles entry:

Left Side Bar > Users > User Profiles > Search user or device ID

## [Ampli CLI](https://amplitude.com/docs/sdks/ampli/ampli-cli)

### Install Ampli

```
brew tap amplitude/ampli
brew install ampli
```

To upgrade, run:
`brew upgrade ampli`

OR

`npm install -g @amplitude/ampli`

*Amplitude recommends installing Node with Homebrew and `brew install node`. Ampli requires Node v8.2.0+.*

### Initialize and connect Ampli and Amplitude Data
`ampli pull`

A browser window opens and automatically logs you in or prompt you for your credentials. Ampli stores your project-specific settings in ampli.json and your user-specific settings (such as your credentials) in ~/ampli.json. Depending on your Amplitude organization settings, the CLI might prompt you to choose your Organization or Workspace.

```
➜ ampli pull
Ampli project is not initialized. No existing `ampli.json` configuration found.
? Create a new Ampli project here? Yes
? Organization: My Organization
? Workspace: My Workspace
? Source: My Web Source
? Platform: Browser
? Language: TypeScript
? SDK: @amplitude/analytics-browser@^1.0
? Branch: main
✔ Pulling latest version (1.0.0)...
✔ Tracking library generated successfully.
  ↳ Path: ./src/ampli
```

### Generate your analytics SDK
`ampli pull {source-name}`
For example, a source might be `ios`, `android`, `web`, or `backend`.

### Instrument your product

After you have pulled down the latest tracking plan, learn how to [instrument your product](https://amplitude.com/docs/sdks/analytics).

### Verify the instrumentation

To make sure you’re tracking all the right events, and that you’re tracking those events correctly, Ampli can lint your source code and warn you about any errors. For example, Ampli can tell if you’ve forgotten to track any required events, or if you’re not passing along all required properties.
`ampli status --update`

 Include --update to update your company's tracking plan online and share the latest analytics implementation status with your team.
 
 You can configure your [CI pipeline](https://amplitude.com/docs/sdks/ampli/validate-in-ci) to automatically run the ampli status command at check-in.

### Ampli commands
- Pull
Pull down the latest tracking plan and generate a tracking library.

Run this command in the root folder of your project. For example:

Browser & Node.js: the folder with your package.json
iOS: the folder with your Info.plist
Android: the folder with your {project-name}.iml

By default, your tracking library is placed in:

|Platform|Default location|
|:|:|
|Browser|./src/ampli|
|Node.js|./src/ampli|
|iOS|./ampli|
|Android|./app/src/main/java/com/amplitude/ampli|
|JRE|./src/main/java/com/amplitude/ampli|

To override the default location, pass the -p argument. Ampli retains your custom location and uses it going forward.
`ampli pull web -p ./src/analytics`

Include `-b {branch}` to generate a tracking library from a particular branch, rather than main. By default, Ampli uses the last published version.

If you'd like to generate a tracking library for another version, include `-v {version}` and specify the tracking plan's version.

- Status

Check the status of your instrumentation by linting (verifying) your source code for analytics.

- Configure

Configure and update source runtime. Follow the prompts to select a specific platform, language, and underlying Amplitude SDK.

**[Migrate Amplitude-iOS to Amplitude-Swift](https://amplitude.com/docs/sdks/analytics/ios/ios-sdk-migration-guide)**

```
% ampli configure
? Select a platform iOS
? Select a language Swift
? Select a SDK AmplitudeSwift ~> 1.0 (recommended)
Requested operation requires additional permissions.: {"response":{"errors":[{"message":"Requested operation requires additional permissions.","locations":[{"line":2,"column":3}],"path":["editSource"],"extensions":{"code":"FORBIDDEN"}}],"data":null,"status":403},"request":{"query":"mutation editSource($input: EditSourceInput!) {\n  editSource(input: $input) {\n    id\n    name\n    description\n    versionId\n    __typename\n  }\n}\n","variables":{"input":{"id":"f14d65b1-d29b-43b8-8fbc-925008137f69","versionId":"25681128-c52b-48bf-8b33-caa1ff2f4e92","runtimeId":"ios-swift-ampli-v2"}}}}
```

*Need more permissions? Contact your Amplitude account admin.*

```
% ampli configure
? Select a platform iOS
? Select a language Swift
? Select a SDK AmplitudeSwift ~> 1.0 (recommended)
✔ Successfully configured source.
Run ampli setup for setup instructions or checkout full instructions at:
  https://www.docs.developers.amplitude.com/data/sdks/ios-swift/ampli/
⚠ WARNING We recommend running ampli pull to update to the latest tracking library.
? Update tracking library now? Yes
Source: ios
Branch: main
Platform: iOS
Language: Swift
SDK: AmplitudeSwift ~> 1.0
✔ Pulling version 2 (latest)
```

```
% cat ampli.json
{
  "Zone": "us",
  "OrgId": "xxx",
  "WorkspaceId": "xxxx-xxxx-xxxx",
  "SourceId": "xxxxxxxx-xxxx",
  "Runtime": "ios:swift-ampli-v2",
  "Platform": "iOS",
  "Language": "Swift",
  "SDK": "AmplitudeSwift ~> 1.0",
  "Branch": "main",
  "Path": "./Ampli",
  "Version": "2.0.0",
  "VersionId": "25681128-c52b-48bf-8b33-caa1ff2f4e92"
}%    
```

- Init

Initialize your workspace.

- Help

Display help for Ampli.

- Whoami

Display information about the user.

```
% ampli whoami
User: Michael Ledger <xxx@xxx.com>
Zone: us
Orgs: XXX
```

- [All Ampli commands](https://www.npmjs.com/package/%40amplitude/ampli)

```
ampli autocomplete [SHELL]
ampli branch
ampli checkout [<branch>]
ampli configure [--deprecated-runtimes]
ampli help [COMMAND]
ampli init
ampli login
ampli logout
ampli pull [<source>] [-p <path>] [-b <branch>]
ampli refresh
ampli setup
ampli source
ampli status
ampli whoami
```

## Use ampli with a [monorepo](https://www.atlassian.com/git/tutorials/monorepos)

The Ampli CLI works with a single source per project (folder). For single source projects, Amplitude recommends running `ampli pull` from the root directory of the repo.

In monorepos with multiple sources, you must run `ampli pull` and `ampli status` from each source's folder.

You have two sources: `web` and `backend` that are used in the same repo.
```
monorepo/
    web/
    ampli.json (for Browser source)
    package.json
    backend/
    ampli.json (for Node source)
    package.json
```
You run ampli pull in web/ for Browser and again in backend/ for Node.
To verify instrumentation status run `cd ~/monorepo/web && ampli status` for Browser, and `cd ~/monorepo/backend && ampli status` for Node.

## What is a monorepo?

Definitions vary, but we define a monorepo as follows:

- The repository contains more than one logical project (e.g. an iOS client and a web-application)
- These projects are most likely unrelated, loosely connected or can be connected by other means (e.g via dependency management tools)
- The repository is large in many ways:
    - Number of commits
    - Number of branches and/or tags
    - Number of files tracked
    - Size of content tracked (as measured by looking at the .git directory of the repository)
    
*The most radical workaround is splitting your monorepo into smaller, more focused git repositories.*

### [Split a repository in two](https://support.atlassian.com/bitbucket-cloud/docs/split-a-repository-in-two/?_ga=2.99382174.1474253475.1551115581-589830497.1549307786)

|Repository|Description|
|:|:|
|splitpractice|An existing Bitbucket repository created just to practice with.|
|bigdir|The directory in splitpractice you split out.|
|freshrepo|A new repository for holding the contents of bigdir. You'll create this using the directions below.|

To run this example, log into Bitbucket Cloud and do the following:
- Create new Git repository called freshrepo.
This repository is under your account. 
- On your local system, open a command-line window.
- Clone the splitpractice repository to your local system into the clone freshrepo.
`git clone git@bitbucket.org:tutorials/splitpractice.git freshrepo`
Cloning with this command creates a freshrepo directory on your local system that contains the splitpractice repository.
- Change directory into the root of the freshrepo.
- List the contents of directory.
You should see the following:
`bigdir    lildir    lildir2`
At this point, freshrepo is a git repository that is linked back to the splitpractice repository on Bitbucket.
- Remove the link back to the Bitbucket remote splitpractice repository.
`git remote rm origin`
You can verify the command worked by listing the contents of the freshrepo/.git/config file.
- Remove anything from the repository that is not in the bigdir directory.
`git filter-branch --index-filter 'git rm --cached -r lildir lildir2' -- --all`
 *This command goes through the history and files and removes anything that is not in `bigdir`.*
- Link the local freshrepo repository to the freshrepo remote repository on Bitbucket.
`git remote add origin https://tutorials@bitbucket.org/tutorials/freshrepo.git`
You can get the URL to add from the repo's Clone option on Bitbucket. This examples uses HTTPS but you could also use SSH.
- Push to the newly refactored repo back to Bitbucket.
`git push origin main`

Now, view your `freshrepo` repository on Bitbucket. You'll find source files and their history show only the bigdir directory activity. The history for the "lil" directories. How do you know? Compare the original commit of splitpractice against your freshrepo repository. Notice, however, the history for source file 1 was retained by the move.

The new `freshrepo/bigdir` is totally separate from the original `splitpractice/bigdir` directory. If you were splitting a repository in a production environment, you would probably remove the `splitptractice/bigdir` folder from splitpractice.  
