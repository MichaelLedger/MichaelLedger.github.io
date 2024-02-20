# CASA (Cloud Application Security Assessment)

## Environment

**Network**: External network connection speed affects command execution time!

Recommend Wi-Fi `PAC-SDWAN`: All traffic will go through the United States. If you access resources in China, it will also go around the United States and come back.
*After the command is executed, switch back to `PAC-WORK`.*

**Rancher Desktop Version**: 1.12.3

**Kubernetes**: 1.28.4

**CE (Container Engine)**: containerd

## Preface

From: API OAuth Dev Verification `api-oauth-dev-verification-reply+3mlsafi239g8i1d@google.com`

Hello Google Developer,

Thank you for your patience while we reviewed your submission for project **** and for addressing our concern about the privacy policy. We need you to address the following items for us to continue your app’s verification or approval:

You are required to complete a CASA security assessment for your application (project number: 73******08) by the following date: 2024-03-06. This assessment is required annually; to learn more, please visit the [CASA website](https://appdefensealliance.dev/casa).

CASA assessment is done on a "first-come-first-serve" basis. This  can take up to 6 weeks depending on how engaged and responsive you are in the whole process. Hence we strongly suggest you get started with the assessment as soon as possible. To know how, please read the instructions below.

You have the following options to complete your assessment:

### 1 - Tier 2 Self Scan Using CASA Portal Built-in Scanning 

[Register](https://rc.products.pwc.com/login/casa/register) or [log-in](https://rc.products.pwc.com/login/casa/) to the CASA portal and initiate your security assessment
Follow the instruction on the portal to package your application for scanning
Fix all CWEs flagged by your scan
Fill out the CASA questionnaire on the portal
Receive the results and validation report in the CASA portal
The CASA portal will automatically share the Letter of Validation with Google

### 2 - Tier 2 Self Scan Using Open Source Tool

[Register](https://rc.products.pwc.com/login/casa/register) or [log-in](https://rc.products.pwc.com/login/casa/) to the CASA portal and initiate your security assessment
Follow the [CASA Tier 2 procedures](https://appdefensealliance.dev/casa/tier-2/tier2-overview) to self scan your application
Fix all CWEs flagged by your scan
Submit your scan results and fill out the CASA questionnaire on the portal
Receive the results and validation report in the CASA portal
The CASA portal will automatically share the Letter of Validation with Google

### 3 - Tier 2 Self Scan Using Commercial Tools

Follow the [CASA Tier 2 procedures](https://appdefensealliance.dev/casa/tier-2/tier2-overview) to self scan your application using [commercial pre-approved tools](https://appdefensealliance.dev/casa/tier-2/ast-guide/custom-scan)
Fix any high severity CWEs flagged by your scan
Register or log-in to the CASA portal and initiate your security assessment
Submit your scan results and fill out the CASA questionnaire on the portal
Receive the results and validation report in the CASA portal
The CASA portal will automatically share the Letter of Validation with Google.
You can use any CWE-compatible app scanning tool(s) that meet the [CASA scan requirements](https://appdefensealliance.dev/casa/tier-2/ast-guide/custom-scan).

### 4 - Tier 2 Authorized Lab Scan

Alternatively, we worked with the CASA authorized labs to provide a low cost Tier 2 alternative for developers who want to work with a lab to conduct the assessment. Contact any [CASA authorized lab](https://appdefensealliance.dev/casa/casa-assessors) to conduct your Assessment.

NOTE: If you opt to complete a Tier 2 assessment with a CASA authorized lab, you are not required to initiate an assessment on the CASA portal and fill out the questionnaire.

### 5 - Tier 3 CASA Assessment

You can also opt-in to complete a [Tier 3 assessment](https://appdefensealliance.dev/casa/casa-tiering#:~:text=Tier%203%20(Lab,Authorized%20Lab%20Verified) by contacting one of the [CASA authorized labs](https://appdefensealliance.dev/casa/casa-assessors). CASA Tier 3 is a comprehensive assessment that tests the application, the application deployment infrastructure and any user data storage location.

Tier 3 assessments have the following benefits:

Conducted and validated by the authorized labs giving your application high assurance of compliance with CASA standard
If your application is listed on the Google WorkSpace Marketplace you will receive an independent security verification badge

**NOTE: If you opt to complete a Tier 2 or Tier 3 assessment with a CASA authorized lab, you are not required to initiate an assessment on the CASA portal and fill out the questionnaire.**

### 6 - CASA Support and Extension Requests

If you have any questions on the Tier 2 Self Scan assessment or need a due date extension, please [register](https://rc.products.pwc.com/login/casa/register) or [log-in](https://rc.products.pwc.com/login/casa/) to the CASA portal and use the portal messaging feature to contact the assessor for support.

For any questions on the Tier 2 or Tier 3 Authorized Lab Scan/Assessment, or if you need a due date extension, please reach out to your [CASA authorized lab](https://appdefensealliance.dev/casa/casa-assessors).

### Useful resources

Refer to the following documentation for more information:

- [CASA Website](https://appdefensealliance.dev/casa)
- [CASA Tiering](https://appdefensealliance.dev/casa/casa-tiering)
- [Tier 2 Process](https://appdefensealliance.dev/casa/tier-2/tier2-overview)
- [Other Tiers Process](https://appdefensealliance.dev/casa/casa-start)

**Important! Once you have addressed the issues above, reply directly to this email to confirm. You must reply to this email after fixing the highlighted issues to continue with the app verification process.**

### Tiers

|Tier|Name|Estimated Lab Hours|Description|
|:|:|:|:|
| 3 | Lab Tested - Lab Verified | 60 | During this assessment, the authorized lab will test and validate all CASA requirements. This is a comprehensive assessment that tests the application, the application deployment infrastructure and any user data storage location for compliance with all of CASA requirements (when applicable) |
| 2 | Lab Tested - Lab Verified | 4 | Tier 2 has a lab tested and validated assurance level where developers can opt-in to contact one of the authorized labs to complete a Tier 2 assessment. See assessment process below. |
| 2 | Developer Tested - Lab Verified | 1 | During this assessment the application developer scans their application utilizing CASA recommended scanning tools and provides the scan result to the ADA for validation. |
| 1 | Developer Tested - Developer Verified | 0 | The self assessment tier is not an assurance level, because it is not validated. This tier is used to allow the developer to understand their application readiness for CASA assessment |

**Note: Framework users can decide their risk tolerance by requiring all applications to meet a certain CASA level, or the lowest required level.**

 
*Need to make changes to your verification request?*

Please make direct changes on the [Cloud Console](https://console.developers.google.com/). Save and submit the changes when finished.

*No longer need access to these scopes?*

Please reply to this email to cancel the verification request.

*Need other help?*

For more information on OAuth Verification, you can read the terms or policies for the APIs or products your app uses, as well as the following resources:

[Link to OAuth Verification FAQ](https://support.google.com/cloud/answer/9110914#%20target=)

Thank you,

The Third Party Data Safety Team

--------

## Mine Exercise

**Step1: resgister & log-in [Cloud Application Security Assessment Portal](https://rc.products.pwc.com/casa/dmh-external-survey-portal)**

Welcome, Gavin Xiang `gavin@planetart.com <gavin@planetart.com>`

Click “Start New Assessment” or select an existing Assessment ID below. As a Respondent, you can upload documents and send messages within the assessment.

Assuming each step is successful and does not require any follow ups, our assessment process is as follows:

- Assessment Submission and Initial Review: Initial high-level review of your scan results, questionnaire, and evidence submissions
- Detailed Review: Detailed review of your questionnaire submission and related supporting evidence
- Final QA and Completion: Final review, after which your LOA will be issued

If you have not met all the CASA requirements or your submission is unclear, an assessor may reach out to you to obtain clarification and to resolve any open questions. Please respond to your assessor in a timely manner to ensure your assessment can be completed before its due date.

**Step2: [Scan Your App](https://appdefensealliance.dev/casa/tier-2/ast-guide?hl=en)**

- Install “[Rancher Desktop](https://rancherdesktop.io)” and config

Preferences -> Virtual Machine -> Hardware -> Memory(GB): 8 -> # CPUs: 7

- Switch container engine

Preferences -> Container Engine -> containerd

```
➜  ~ nerdctl run -v ~/Documents/CASA/codes:/working-dir ghcr.io/fluidattacks/makes/arm64 m gitlab:fluidattacks/universe@trunk /skims scan ./config.yaml
FATA[0000] cannot access containerd socket "/run/k3s/containerd/containerd.sock" (hint: try running with `--address /var/run/docker/containerd/containerd.sock` to connect to Docker-managed containerd): no such file or directory 
Error: exit status 1
```

- Run command to download the latest fluid image:

Rancher Desktop -> Images -> Add Image -> Name of image to pull:

`apache/tika`
`ghcr.io/fluidattacks/makes/arm64:latest`
`nginx`

- Prepare the config file and put it with the project folder
*Directory structure*
```
|-- CASA
    |-- codes
        |-- Fluid-Attacks-Results.csv
        |-- config.yaml
        |-- project_directory
```

*config.yaml*
```
namespace: OWASP
output:
  file_path: ./Fluid-Attacks-Results.csv
  format: CSV
working_dir: .
sast:
  include:
    - .
sca:
  include:
    - .
  exclude:
    - caches
    - .idea
    - .git
    - .gradle
    - build
    - daemon
    - gradle
    - py_tools
    - wrapper
    - jdks
    - .tmp
    - common_libs_android/.git
    - synergy-lib-android/.git
    - common_libs_android/.settings
    - play_assets
    - misc
# Note: uncomment this if you want to analyze .apk files.
# apk:
  # include:
    #- /app/app-arm-debug-Android5.apk
    #- /app/app-arm-debug.apk
checks:
- F001
- F004
- F008
- F009
- F010
- F011
- F012
- F015
- F016
- F017
- F020
- F021
- F022
- F023
- F031
- F034
- F035
- F037
- F042
- F043
- F052
- F055
- F056
- F058
- F073
- F075
- F079
- F080
- F082
- F085
- F086
- F089
- F091
- F092
- F094
- F096
- F098
- F099
- F100
- F103
- F107
- F112
- F120
- F127
- F128
- F129
- F130
- F131
- F132
- F133
- F134
- F143
- F160
- F176
- F177
- F182
- F200
- F203
- F206
- F207
- F211
- F234
- F239
- F246
- F247
- F250
- F252
- F256
- F257
- F258
- F259
- F266
- F267
- F268
- F277
- F281
- F300
- F313
- F320
- F325
- F333
- F335
- F338
- F346
- F363
- F372
- F380
- F381
- F393
- F394
- F396
- F398
- F400
- F401
- F402
- F406
- F407
- F408
- F409
- F411
- F412
- F413
- F414
- F416
- F418
language: EN

```

- Run the container to scan the codes in Terminal

**Rancher Desktop is not running. Please start Rancher Desktop to use nerdctl**

`% nerdctl run -v ~/Documents/CASA/codes:/working-dir ghcr.io/fluidattacks/makes/arm64 m gitlab:fluidattacks/universe@trunk /skims scan ./config.yaml`

- If the result is success, find the result file (`Fluid-Attacks-Results.csv`) at the working-dir

```
% nerdctl run -v ~/Documents/CASA/codes:/working-dir ghcr.io/fluidattacks/makes/arm64 m gitlab:fluidattacks/universe@trunk /skims scan ./config.yaml

                                    🦄 Makes                                    
                                  v23.07-linux                                  

───────────────── Fetching gitlab:fluidattacks/universe@trunk ──────────────────

Initialized empty Git repository in /tmp/makes-ra4o046e/.git/
From gitlab:fluidattacks/universe@trunk
From https://gitlab.com/fluidattacks/universe
 * [new branch]        trunk      -> trunk
Switched to branch 'trunk'

──────────────────────── Building project configuration ────────────────────────

...

[INFO] Analysis finished, writing results
[INFO] An output file has been written: /working-dir/Fluid-Attacks-Results.csv
[INFO] Summary: No vulnerabilities were found in your targets.

───────────────────────────────── 🥊 Success! ──────────────────────────────────
```

|title|cwe|description|cvss|finding|stream|kind|where|snippet|method|
|:|:|:|:|:|:|:|:|:|:|
|Summary: No vulnerabilities were found in your targets.|||||||||||

- Check results if there’s any issue must be fixed. Search in this CACA framework could find which issue is required to be fixed. Fix all required issues and scan again.

|title|cwe|description|cvss|finding|stream|kind|where|snippet|method|
|:|:|:|:|:|:|:|:|:|:|
|011. Use of software with known vulnerabilities|CWE-377|Use of activesupport at version 7.0.4.3 with ['GHSA-cr5q-6q9f-rq6q', 'CVE-2023-38037'] in OWASP/XXX/Gemfile.lock|CVSS:3.1/AV:N/AC:H/PR:L/UI:N/S:U/C:L/I:L/A:L/E:P/RL:O/RC:C|https://docs.fluidattacks.com/criteria/vulnerabilities/011| skims|SCA|66|> 66 activesupport (7.0.4.3)|gem.gem_gemfile_lock|
|Summary: 1 vulnerabilities were found in your targets.|||||||||||

Resolution:
Upgrade [CocoaPods](https://github.com/CocoaPods/CocoaPods/releases) & [activesupport](https://rubygems.org/gems/activesupport) to the lastest
```
% sudo gem install cocoapods
% pod --version
1.14.3
```

Update Gemfile.lock: `% bundle update activesupport`

GEMFILE: `gem 'activesupport', '~> 7.1', '>= 7.1.2'`

INSTALL: `% sudo gem install activesupport`

**Step3: After all issues were cleaned, we need to provide below files to CASA**

[lookerstudio](https://lookerstudio.google.com/u/0/reporting/757d8fab-9682-4b74-9acc-58efb5e3081c/page/p_ana6axxq4c?s=tug3GYx0bmg)

- iOS & Android: Copy the last time terminal logs as text file, it’s the evidence file of the scan.
- iOS & Android: Merger iOS and Android Fluid-Attacks-Results.csv in one text file
- iOS & Android: the config.yaml
- The Google CASA review notification email to CASA also.

```
AST_Fluid_config_XX_Android.txt
AST_Fluid_config_XX_iOS.txt
AST_Fluid_scan_logs_XX_Android.txt
AST_Fluid_scan_logs_XX_iOS.txt
AST_Fluid_scan_results_XX_Android.txt
AST_Fluid_scan_results_XX_iOS.txt
CASA_Tier_2_notification_email.pdf
```

## PS: Terminal Logs
```
% bundle update
Fetching git@github.com:Planetart/fastools.git
Fetching git@github.com:Planetart/cocoapods_select.git
Fetching git@github.com:Planetart/fastlane.git
Fetching gem metadata from https://rubygems.org/........
Resolving dependencies...
Fetching rake 13.1.0 (was 13.0.6)
Installing rake 13.1.0 (was 13.0.6)
Using rexml 3.2.6 (was 3.2.5)
Fetching json 2.7.1 (was 2.6.3)
Using connection_pool 2.4.1
Using ruby2_keywords 0.0.5
Fetching minitest 5.20.0 (was 5.18.0)
Fetching mutex_m 0.2.0
Using public_suffix 4.0.7
Using httpclient 2.8.3
Fetching aws-eventstream 1.3.0 (was 1.2.0)
Fetching aws-partitions 1.864.0 (was 1.834.0)
Using concurrent-ruby 1.2.2
Using jmespath 1.6.2
Using atomos 0.1.3
Using bundler 2.3.13
Fetching bigdecimal 3.1.4
Using claide 1.1.0
Using babosa 1.0.4
Fetching base64 0.2.0
Using artifactory 3.0.15
Using fuzzy_match 2.0.4
Using nap 1.1.0
Using ffi 1.16.3 (was 1.15.5)
Using netrc 0.11.0
Using cocoapods-downloader 2.1 (was 1.6.3)
Using cocoapods-deintegrate 1.0.5
Using colored2 3.1.2
Using escape 0.0.4
Using cocoapods-search 1.0.1
Using fourflusher 2.3.1
Using molinillo 0.8.0
Using cocoapods-try 1.2.0
Using nanaimo 0.3.0
Using cocoapods-select 0.0.1 from git@github.com:Planetart/cocoapods_select.git (at main@c3c741b)
Using gh_inspector 1.1.3
Using ruby-macho 2.5.1
Using highline 2.0.3
Using declarative 0.0.20
Using colored 1.2
Using diff-lcs 1.5.0
Using digest-crc 0.6.5
Fetching domain_name 0.6.20231109 (was 0.5.20190701)
Using dotenv 2.8.1
Using emoji_regex 3.2.3
Fetching excon 0.105.0 (was 0.104.0)
Using faraday-em_http 1.0.0
Using faraday-em_synchrony 1.0.0
Using faraday-excon 1.1.0
Using faraday-httpclient 1.0.1
Using multipart-post 2.3.0
Using faraday-net_http 1.0.1
Using faraday-net_http_persistent 1.2.0
Using faraday-patron 1.0.0
Using faraday-rack 1.0.0
Using faraday-retry 1.0.3
Using fastimage 2.2.7
Using jwt 2.7.1
Using multi_json 1.15.0
Using os 1.1.4
Using mini_mime 1.1.5
Using trailblazer-option 0.1.2
Using uber 0.1.0
Using retriable 3.1.2
Using webrick 1.8.1
Using google-cloud-errors 1.3.1
Using mini_magick 4.12.0
Using naturally 2.2.1
Using optparse 0.1.1
Using plist 3.7.0
Using rubyzip 2.3.2
Using security 0.1.3
Using terminal-notifier 2.0.0
Fetching unicode-display_width 2.5.0
Installing mutex_m 0.2.0
Using tty-screen 0.8.1
Using tty-cursor 0.7.1
Using word_wrap 1.0.0
Using rouge 2.0.7
Using fastlane-plugin-appcenter 2.1.0
Fetching fastlane-plugin-pgyer 0.2.8 (was 0.2.6)
Installing aws-eventstream 1.3.0 (was 1.2.0)
Installing base64 0.2.0
Using fastools 0.1.6 from git@github.com:Planetart/fastools.git (at master@df2d6bc)
Fetching rspec-support 3.12.1 (was 3.12.0)
Using CFPropertyList 3.0.6
Using ruby-graphviz 1.2.5
Fetching drb 2.2.0
Installing unicode-display_width 2.5.0
Fetching addressable 2.8.6 (was 2.8.4)
Installing json 2.7.1 (was 2.6.3) with native extensions
Installing aws-partitions 1.864.0 (was 1.834.0)
Installing minitest 5.20.0 (was 5.18.0)
Using i18n 1.14.1 (was 1.13.0)
Using tzinfo 2.0.6
Using ethon 0.16.0
Using cocoapods-plugins 1.0.0
Using cocoapods-trunk 1.6.0
Using commander 4.6.0
Using faraday-multipart 1.0.4
Using representable 3.2.0
Using tty-spinner 0.9.3
Using xcpretty 0.3.0
Fetching aws-sigv4 1.8.0 (was 1.6.0)
Installing bigdecimal 3.1.4 with native extensions
Using xcodeproj 1.23.0 (was 1.22.0)
Using simctl 1.6.10
Using cocoapods-dependencies 1.3.0
Fetching terminal-table 3.0.2
Installing domain_name 0.6.20231109 (was 0.5.20190701)
Installing excon 0.105.0 (was 0.104.0)
Fetching typhoeus 1.4.1 (was 1.4.0)
Installing fastlane-plugin-pgyer 0.2.8 (was 0.2.6)
Using faraday 1.10.3
Using xcpretty-travis-formatter 1.0.1
Using http-cookie 1.0.5
Using faraday_middleware 1.2.0
Fetching google-cloud-env 2.0.1 (was 1.6.0)
Using faraday-cookie_jar 0.0.7
Installing drb 2.2.0
Installing rspec-support 3.12.1 (was 3.12.0)
Using rspec-core 3.12.2
Fetching rspec-mocks 3.12.6 (was 3.12.5)
Using rspec-expectations 3.12.3
Installing aws-sigv4 1.8.0 (was 1.6.0)
Fetching aws-sdk-core 3.190.0 (was 3.185.1)
Installing addressable 2.8.6 (was 2.8.4)
Installing terminal-table 3.0.2
Fetching signet 0.18.0
Installing google-cloud-env 2.0.1 (was 1.6.0)
Fetching google-cloud-core 1.6.1 (was 1.6.0)
Installing typhoeus 1.4.1 (was 1.4.0)
Installing rspec-mocks 3.12.6 (was 3.12.5)
Installing signet 0.18.0
Fetching googleauth 1.9.0 (was 1.8.1)
Using rspec 3.12.0
Installing google-cloud-core 1.6.1 (was 1.6.0)
Installing aws-sdk-core 3.190.0 (was 3.185.1)
Fetching aws-sdk-kms 1.74.0 (was 1.72.0)
Installing googleauth 1.9.0 (was 1.8.1)
Fetching google-apis-core 0.11.2 (was 0.11.1)
Installing google-apis-core 0.11.2 (was 0.11.1)
Using google-apis-playcustomapp_v1 0.13.0
Using google-apis-iamcredentials_v1 0.17.0
Fetching google-apis-storage_v1 0.29.0 (was 0.19.0)
Fetching google-apis-androidpublisher_v3 0.53.0 (was 0.50.0)
Installing aws-sdk-kms 1.74.0 (was 1.72.0)
Fetching aws-sdk-s3 1.141.0 (was 1.136.0)
Installing google-apis-storage_v1 0.29.0 (was 0.19.0)
Installing google-apis-androidpublisher_v3 0.53.0 (was 0.50.0)
Fetching google-cloud-storage 1.45.0 (was 1.44.0)
Installing aws-sdk-s3 1.141.0 (was 1.136.0)
Installing google-cloud-storage 1.45.0 (was 1.44.0)
Using fastlane 2.216.0 from git@github.com:Planetart/fastlane.git (at master@8267d99)
Using algoliasearch 1.27.5
Using activesupport 7.1.2 (was 7.0.4.3)
Using cocoapods-core 1.14.3 (was 1.12.1)
Using cocoapods 1.14.3 (was 1.12.1)
Using cocoapods-check 1.1.0
Bundle updated!

```

Gemfile.lock (Updated)
```
GIT
  remote: git@github.com:Planetart/cocoapods_select.git
  revision: c3c741bf769a547f2c755916d3df181405b1ac50
  branch: main
  specs:
    cocoapods-select (0.0.1)

GIT
  remote: git@github.com:Planetart/fastlane.git
  revision: 8267d992515922e5e856fe131875bbd1cd946ef4
  branch: master
  specs:
    fastlane (2.216.0)
      CFPropertyList (>= 2.3, < 4.0.0)
      addressable (>= 2.8, < 3.0.0)
      artifactory (~> 3.0)
      aws-sdk-s3 (~> 1.0)
      babosa (>= 1.0.3, < 2.0.0)
      bundler (>= 1.12.0, < 3.0.0)
      colored
      commander (~> 4.6)
      dotenv (>= 2.1.1, < 3.0.0)
      emoji_regex (>= 0.1, < 4.0)
      excon (>= 0.71.0, < 1.0.0)
      faraday (~> 1.0)
      faraday-cookie_jar (~> 0.0.6)
      faraday_middleware (~> 1.0)
      fastimage (>= 2.1.0, < 3.0.0)
      gh_inspector (>= 1.1.2, < 2.0.0)
      google-apis-androidpublisher_v3 (~> 0.3)
      google-apis-playcustomapp_v1 (~> 0.1)
      google-cloud-storage (~> 1.31)
      highline (~> 2.0)
      http-cookie (~> 1.0.5)
      json (< 3.0.0)
      jwt (>= 2.1.0, < 3)
      mini_magick (>= 4.9.4, < 5.0.0)
      multipart-post (>= 2.0.0, < 3.0.0)
      naturally (~> 2.2)
      optparse (~> 0.1.1)
      plist (>= 3.1.0, < 4.0.0)
      rubyzip (>= 2.0.0, < 3.0.0)
      security (= 0.1.3)
      simctl (~> 1.6.3)
      terminal-notifier (>= 2.0.0, < 3.0.0)
      terminal-table (~> 3)
      tty-screen (>= 0.6.3, < 1.0.0)
      tty-spinner (>= 0.8.0, < 1.0.0)
      word_wrap (~> 1.0.0)
      xcodeproj (>= 1.13.0, < 2.0.0)
      xcpretty (~> 0.3.0)
      xcpretty-travis-formatter (>= 0.0.3)

GIT
  remote: git@github.com:Planetart/fastools.git
  revision: df2d6bc7a2a2add6cd114241b9d44a85c2613aba
  branch: master
  specs:
    fastools (0.1.6)

GEM
  remote: https://rubygems.org/
  specs:
    CFPropertyList (3.0.6)
      rexml
    activesupport (7.1.2)
      base64
      bigdecimal
      concurrent-ruby (~> 1.0, >= 1.0.2)
      connection_pool (>= 2.2.5)
      drb
      i18n (>= 1.6, < 2)
      minitest (>= 5.1)
      mutex_m
      tzinfo (~> 2.0)
    addressable (2.8.6)
      public_suffix (>= 2.0.2, < 6.0)
    algoliasearch (1.27.5)
      httpclient (~> 2.8, >= 2.8.3)
      json (>= 1.5.1)
    artifactory (3.0.15)
    atomos (0.1.3)
    aws-eventstream (1.3.0)
    aws-partitions (1.864.0)
    aws-sdk-core (3.190.0)
      aws-eventstream (~> 1, >= 1.3.0)
      aws-partitions (~> 1, >= 1.651.0)
      aws-sigv4 (~> 1.8)
      jmespath (~> 1, >= 1.6.1)
    aws-sdk-kms (1.74.0)
      aws-sdk-core (~> 3, >= 3.188.0)
      aws-sigv4 (~> 1.1)
    aws-sdk-s3 (1.141.0)
      aws-sdk-core (~> 3, >= 3.189.0)
      aws-sdk-kms (~> 1)
      aws-sigv4 (~> 1.8)
    aws-sigv4 (1.8.0)
      aws-eventstream (~> 1, >= 1.0.2)
    babosa (1.0.4)
    base64 (0.2.0)
    bigdecimal (3.1.4)
    claide (1.1.0)
    cocoapods (1.14.3)
      addressable (~> 2.8)
      claide (>= 1.0.2, < 2.0)
      cocoapods-core (= 1.14.3)
      cocoapods-deintegrate (>= 1.0.3, < 2.0)
      cocoapods-downloader (>= 2.1, < 3.0)
      cocoapods-plugins (>= 1.0.0, < 2.0)
      cocoapods-search (>= 1.0.0, < 2.0)
      cocoapods-trunk (>= 1.6.0, < 2.0)
      cocoapods-try (>= 1.1.0, < 2.0)
      colored2 (~> 3.1)
      escape (~> 0.0.4)
      fourflusher (>= 2.3.0, < 3.0)
      gh_inspector (~> 1.0)
      molinillo (~> 0.8.0)
      nap (~> 1.0)
      ruby-macho (>= 2.3.0, < 3.0)
      xcodeproj (>= 1.23.0, < 2.0)
    cocoapods-check (1.1.0)
      cocoapods (~> 1.0)
    cocoapods-core (1.14.3)
      activesupport (>= 5.0, < 8)
      addressable (~> 2.8)
      algoliasearch (~> 1.0)
      concurrent-ruby (~> 1.1)
      fuzzy_match (~> 2.0.4)
      nap (~> 1.0)
      netrc (~> 0.11)
      public_suffix (~> 4.0)
      typhoeus (~> 1.0)
    cocoapods-deintegrate (1.0.5)
    cocoapods-dependencies (1.3.0)
      ruby-graphviz (~> 1.2)
    cocoapods-downloader (2.1)
    cocoapods-plugins (1.0.0)
      nap
    cocoapods-search (1.0.1)
    cocoapods-trunk (1.6.0)
      nap (>= 0.8, < 2.0)
      netrc (~> 0.11)
    cocoapods-try (1.2.0)
    colored (1.2)
    colored2 (3.1.2)
    commander (4.6.0)
      highline (~> 2.0.0)
    concurrent-ruby (1.2.2)
    connection_pool (2.4.1)
    declarative (0.0.20)
    diff-lcs (1.5.0)
    digest-crc (0.6.5)
      rake (>= 12.0.0, < 14.0.0)
    domain_name (0.6.20231109)
    dotenv (2.8.1)
    drb (2.2.0)
      ruby2_keywords
    emoji_regex (3.2.3)
    escape (0.0.4)
    ethon (0.16.0)
      ffi (>= 1.15.0)
    excon (0.105.0)
    faraday (1.10.3)
      faraday-em_http (~> 1.0)
      faraday-em_synchrony (~> 1.0)
      faraday-excon (~> 1.1)
      faraday-httpclient (~> 1.0)
      faraday-multipart (~> 1.0)
      faraday-net_http (~> 1.0)
      faraday-net_http_persistent (~> 1.0)
      faraday-patron (~> 1.0)
      faraday-rack (~> 1.0)
      faraday-retry (~> 1.0)
      ruby2_keywords (>= 0.0.4)
    faraday-cookie_jar (0.0.7)
      faraday (>= 0.8.0)
      http-cookie (~> 1.0.0)
    faraday-em_http (1.0.0)
    faraday-em_synchrony (1.0.0)
    faraday-excon (1.1.0)
    faraday-httpclient (1.0.1)
    faraday-multipart (1.0.4)
      multipart-post (~> 2)
    faraday-net_http (1.0.1)
    faraday-net_http_persistent (1.2.0)
    faraday-patron (1.0.0)
    faraday-rack (1.0.0)
    faraday-retry (1.0.3)
    faraday_middleware (1.2.0)
      faraday (~> 1.0)
    fastimage (2.2.7)
    fastlane-plugin-appcenter (2.1.0)
    fastlane-plugin-pgyer (0.2.8)
    ffi (1.16.3)
    fourflusher (2.3.1)
    fuzzy_match (2.0.4)
    gh_inspector (1.1.3)
    google-apis-androidpublisher_v3 (0.53.0)
      google-apis-core (>= 0.11.0, < 2.a)
    google-apis-core (0.11.2)
      addressable (~> 2.5, >= 2.5.1)
      googleauth (>= 0.16.2, < 2.a)
      httpclient (>= 2.8.1, < 3.a)
      mini_mime (~> 1.0)
      representable (~> 3.0)
      retriable (>= 2.0, < 4.a)
      rexml
      webrick
    google-apis-iamcredentials_v1 (0.17.0)
      google-apis-core (>= 0.11.0, < 2.a)
    google-apis-playcustomapp_v1 (0.13.0)
      google-apis-core (>= 0.11.0, < 2.a)
    google-apis-storage_v1 (0.29.0)
      google-apis-core (>= 0.11.0, < 2.a)
    google-cloud-core (1.6.1)
      google-cloud-env (>= 1.0, < 3.a)
      google-cloud-errors (~> 1.0)
    google-cloud-env (2.0.1)
      faraday (>= 1.0, < 3.a)
    google-cloud-errors (1.3.1)
    google-cloud-storage (1.45.0)
      addressable (~> 2.8)
      digest-crc (~> 0.4)
      google-apis-iamcredentials_v1 (~> 0.1)
      google-apis-storage_v1 (~> 0.29.0)
      google-cloud-core (~> 1.6)
      googleauth (>= 0.16.2, < 2.a)
      mini_mime (~> 1.0)
    googleauth (1.9.0)
      faraday (>= 1.0, < 3.a)
      google-cloud-env (~> 2.0, >= 2.0.1)
      jwt (>= 1.4, < 3.0)
      multi_json (~> 1.11)
      os (>= 0.9, < 2.0)
      signet (>= 0.16, < 2.a)
    highline (2.0.3)
    http-cookie (1.0.5)
      domain_name (~> 0.5)
    httpclient (2.8.3)
    i18n (1.14.1)
      concurrent-ruby (~> 1.0)
    jmespath (1.6.2)
    json (2.7.1)
    jwt (2.7.1)
    mini_magick (4.12.0)
    mini_mime (1.1.5)
    minitest (5.20.0)
    molinillo (0.8.0)
    multi_json (1.15.0)
    multipart-post (2.3.0)
    mutex_m (0.2.0)
    nanaimo (0.3.0)
    nap (1.1.0)
    naturally (2.2.1)
    netrc (0.11.0)
    optparse (0.1.1)
    os (1.1.4)
    plist (3.7.0)
    public_suffix (4.0.7)
    rake (13.1.0)
    representable (3.2.0)
      declarative (< 0.1.0)
      trailblazer-option (>= 0.1.1, < 0.2.0)
      uber (< 0.2.0)
    retriable (3.1.2)
    rexml (3.2.6)
    rouge (2.0.7)
    rspec (3.12.0)
      rspec-core (~> 3.12.0)
      rspec-expectations (~> 3.12.0)
      rspec-mocks (~> 3.12.0)
    rspec-core (3.12.2)
      rspec-support (~> 3.12.0)
    rspec-expectations (3.12.3)
      diff-lcs (>= 1.2.0, < 2.0)
      rspec-support (~> 3.12.0)
    rspec-mocks (3.12.6)
      diff-lcs (>= 1.2.0, < 2.0)
      rspec-support (~> 3.12.0)
    rspec-support (3.12.1)
    ruby-graphviz (1.2.5)
      rexml
    ruby-macho (2.5.1)
    ruby2_keywords (0.0.5)
    rubyzip (2.3.2)
    security (0.1.3)
    signet (0.18.0)
      addressable (~> 2.8)
      faraday (>= 0.17.5, < 3.a)
      jwt (>= 1.5, < 3.0)
      multi_json (~> 1.10)
    simctl (1.6.10)
      CFPropertyList
      naturally
    terminal-notifier (2.0.0)
    terminal-table (3.0.2)
      unicode-display_width (>= 1.1.1, < 3)
    trailblazer-option (0.1.2)
    tty-cursor (0.7.1)
    tty-screen (0.8.1)
    tty-spinner (0.9.3)
      tty-cursor (~> 0.7)
    typhoeus (1.4.1)
      ethon (>= 0.9.0)
    tzinfo (2.0.6)
      concurrent-ruby (~> 1.0)
    uber (0.1.0)
    unicode-display_width (2.5.0)
    webrick (1.8.1)
    word_wrap (1.0.0)
    xcodeproj (1.23.0)
      CFPropertyList (>= 2.3.3, < 4.0)
      atomos (~> 0.1.3)
      claide (>= 1.0.2, < 2.0)
      colored2 (~> 3.1)
      nanaimo (~> 0.3.0)
      rexml (~> 3.2.4)
    xcpretty (0.3.0)
      rouge (~> 2.0.7)
    xcpretty-travis-formatter (1.0.1)
      xcpretty (~> 0.2, >= 0.0.7)

PLATFORMS
  ruby

DEPENDENCIES
  cocoapods
  cocoapods-check
  cocoapods-dependencies
  cocoapods-select!
  fastlane!
  fastlane-plugin-appcenter (= 2.1.0)
  fastlane-plugin-pgyer (>= 0.2.6)
  fastools!
  rake
  rspec

BUNDLED WITH
   2.3.13

```
