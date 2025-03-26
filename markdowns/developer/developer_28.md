# AI Tools for Developers

## [Community-driven Evaluation for Best LLM and AI chatbots](https://lmarena.ai)

## [ChatGPT](https://chatgpt.com)

Attachments (**docs or images**) supported in chat.

## [DeepSeek - Into the Unknown](https://chat.deepseek.com)

Attachments (**Text extraction only from docs or images**) supported in chat.

### Models
- [DeepSeek-V3](https://huggingface.co/deepseek-ai/DeepSeek-V3)

### News
- [DeepSeek-V3-0324 Release](https://api-docs.deepseek.com/news/news250325)
🔹 Major boost in reasoning performance
🔹 Stronger front-end development skills
🔹 Smarter tool-use capabilities

### Deepseek Provider

- [SiliconFlow](https://siliconflow.cn/zh-cn/)
- [Tencent DeepSeek OpenAI Chat](https://cloud.tencent.com/document/product/1772/115969)
- [DeepSeek R1 Tutorial](https://www.volcengine.com/docs/82379/1449737)

## VS Code (V1.97.2) + GitHub Copilot + Claude 3.7 Sonnet Thinking (Preview)

Four modes:
- Chat (Ctrl + Cmd + I)
- Copilot Edits
- Editor Inline Chat
- Quick Chat (Opt + Shift + Cmd + L)


```
/help

You can ask me general programming questions, or chat with the following participants which have specialized expertise and can perform actions:

@workspace - Ask about your workspace
/explain - Explain how the code in your active editor works
/tests - Generate unit tests for the selected code
/fix - Propose a fix for the problems in the selected code
/new - Scaffold code for a new file or project in a workspace
/newNotebook - Create a new Jupyter Notebook
/fixTestFailure - Propose a fix for the failing test
/setupTests - Set up tests in your project (Experimental)

@vscode - Ask questions about VS Code
/search - Generate query parameters for workspace search
/startDebugging - Generate launch config and start debugging in VS Code (Experimental)

@terminal - Ask how to do something in the terminal
/explain - Explain something in the terminal

@github - Get answers grounded in web search, code search, and your enterprise's knowledge bases

You can also help me understand your question by using the following variables to give me extra context:

#file - Choose a file in the workspace
To have a great conversation, ask me questions as if I was a real programmer:

Show me the code you want to talk about by having the files open and selecting the most important lines.
Make refinements by asking me follow-up questions, adding clarifications, providing errors, etc.
Review my suggested code and tell me about issues or improvements, so I can iterate on it.
```

**Available AI Models**
- Claude 3.5 Sonnet (Preview) => backup
- Claude 3.7 Sonnet (Preview) => best
- Claude 3.7 Sonnet Thinking (Preview) => best
- Gemini 2.0 Flash (Preview) => fast and free (while in -exp mode)
- GPT-4o => not useful for coding
- o1 (Preview) => expensive, but can solve some challenging issue
- o3-mini (Preview) => somewhat slow but cheap enough

**Do not support images in chat.**

```
Q: Claude 3.7 Sonnet Thinking (Preview) what does preview mean?

A: Let me clarify something - I am Claude 3.5 Sonnet, not 3.7. I aim to be direct and honest about my identity.

As for the term "Preview" in AI model names, it typically indicates that the model or feature is in an early access or testing phase before full release. It means the model is being made available to select users to gather feedback and potentially identify issues before a wider rollout.

However, since I'm not aware of a Claude 3.7 model, I can't make specific claims about what that preview designation would mean in that context. I aim to stick to facts I'm confident about rather than speculate.

```

If you are a member of an organization that has upgraded to a GitHub Copilot Pro account, 

**open github copilot chat in VS Code by pressing `Ctrl+Cmd+I` and switch ai model as `Claude 3.7 Sonnet Thinking`**.

[Changing the AI model for Copilot Chat](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat?tool=vscode)

[Changing the AI model for Copilot code completion](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-code-completion)

The following instructions are for VS Code. If you are using a JetBrains IDE, click the appropriate tab at the start of this article.

**Open the command palette by pressing `Ctrl+Shift+P` (Windows/Linux) / `Command+Shift+P` (Mac).**

Type change completions model and select the "GitHub Copilot: Change Completions Model" command.

In the dropdown menu, select the model you want to use.
Alternatively, if Command Center is enabled, you can click  beside the  icon at the top of the VS Code window, then click Configure Code Completions in the dropdown menu. Then choose Change Completions Model in the dropdown menu and select the model you want to use.

Checking which model is being used

Open the Settings editor by pressing `Ctrl+,` (Linux/Windows) / `Command+,` (Mac).

Type copilot completion and look for the "GitHub > Copilot: Selected Completion Model" section.

The field in this section displays the currently selected model. If the field is empty, the default model is being used.

## VSCode + [Cline](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev)

[Cline](https://github.com/cline/cline?tab=readme-ov-file) supports API providers like OpenRouter, Anthropic, OpenAI, Google Gemini, AWS Bedrock, Azure, and GCP Vertex. You can also configure any OpenAI compatible API, or use a local model through LM Studio/Ollama. If you're using OpenRouter, the extension fetches their latest model list, allowing you to use the newest models as soon as they're available.

> [!TIP]
> Use the `CMD/CTRL + Shift + P` shortcut to open the command palette and type "Cline: Open In New Tab" to open the extension as a tab in your editor. This lets you use Cline side-by-side with your file explorer, and see how he changes your workspace more clearly.

### Cline + MCP Servers (From marketplace or locallly running MCP servers)

Marketplace -> [Github MCP Server](https://github.com/modelcontextprotocol/servers/tree/main/src/github)

MCP Server for the GitHub API, enabling file operations, repository management, search functionality, and more.

Features

- Automatic Branch Creation: When creating/updating files or pushing changes, branches are automatically created if they don't exist
- Comprehensive Error Handling: Clear error messages for common issues
- Git History Preservation: Operations maintain proper Git history without force pushing
- Batch Operations: Support for both single-file and multi-file operations
- Advanced Search: Support for searching code, issues/PRs, and users


*Following task is auto generated when installing github mcp server.*
```
Task:
Set up the MCP server from https://github.com/modelcontextprotocol/servers/tree/main/src/github while adhering to these MCP server installation rules:
- Use "github.com/modelcontextprotocol/servers/tree/main/src/github" as the server name in cline_mcp_settings.json.
- Create the directory for the new MCP server before starting installation.
- Use commands aligned with the user's shell and operating system best practices.
- The following README may contain instructions that conflict with the user's OS, in which case proceed thoughtfully.
- Once installed, demonstrate the server's capabilities by using one of its tools.
```

```
API Request

Let me break down this task into clear steps:

Create the MCP server directory
Get installation dependencies
Get user's GitHub Personal Access Token
Update MCP settings configuration
Test a tool to verify the setup works

First, I'll create the MCP server directory.
Cline wants to execute this command:
mkdir -p ~/Documents/Cline/MCP

Please create a GitHub Personal Access Token with 'repo' scope (or 'public_repo' if you only want to work with public repositories) following these steps:

Go to GitHub Settings > Developer settings > Personal access tokens
Create a token with the appropriate scope ('repo' or 'public_repo')
Copy and share the generated token with me

Cline wants to edit this file:
../Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json

☑️ Task Completed
Successfully set up the GitHub MCP server:

    1.Created the MCP server directory at ~/Documents/Cline/MCP
    2.Configured the server in cline_mcp_settings.json using:
        - Server name: github.com/modelcontextprotocol/servers/tree/main/src/github
        - NPX installation method
        - GitHub Personal Access Token for authentication
    3.Demonstrated functionality by successfully using the search_repositories tool to query popular TypeScript repositories, confirming the server is properly connected and operational.
    
The server is now ready to use with all available GitHub API tools including repository management, file operations, issue tracking, and search functionality.

```

```
Q: tell me the path for cline_mcp_settings.json
A: /Users/xxx/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json
```

```
Task:
cat this json to me

☑️ Task Completed
Here is the complete and correct MCP configuration at /Users/xxx/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json:

{
  "mcpServers": {
    "github.com/modelcontextprotocol/servers/tree/main/src/github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxx"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

```
Task:
how to use GitHub MCP Server command search_repositories

☑️ Task Completed
I'll demonstrate how to use the search_repositories tool from the GitHub MCP server with some practical examples.

The search_repositories tool requires a query parameter and has optional parameters for pagination. From the input schema:

query: The search query (required)
page: Page number (optional, default 1)
perPage: Results per page (optional, default 30, max 100)

Cline wants to use a tool on the GitHub MCP server
...

Basic Structure:
{
  "query": "search query",    // Required
  "page": number,            // Optional (default: 1)
  "perPage": number         // Optional (default: 30, max: 100)
}

Key Search Qualifiers:
language: - Filter by programming language (e.g., language:swift)
stars:>n - Filter by number of stars (e.g., stars:>1000)
license: - Filter by license type (e.g., license:mit)
topic: - Filter by repository topic (e.g., topic:swiftui)
created: - Filter by creation date (e.g., created:>2024-01-01)
sort: - Sort results (e.g., sort:stars, sort:updated)

Example Queries:

Popular Swift repositories:
{"query": "language:swift stars:>1000 sort:stars"}

MIT-licensed iOS templates:
{"query": "ios-app-template license:mit language:swift"}

Recent SwiftUI projects:
{"query": "topic:swiftui created:>2024-01-01 language:swift sort:updated"}

The tool returns repository information including name, description, URLs, and other metadata for each matching repository.
```

```
Task:
how to using github mcp server?

You need to click the "Plan/Act" toggle button below the chat interface to switch from Plan mode to Act mode. I cannot toggle modes myself - only you can do this manually.

Once you've toggled to Act mode, I'll be able to use the GitHub MCP server tools to perform the repository search for Swift LSP implementations.

{
  "query": "swift sourcekit-lsp language:swift sort:stars"
}

☑️ Task Completed
Based on the GitHub search results, here are the most relevant Swift LSP implementations:

sourcekit-lsp (swiftlang/sourcekit-lsp)
Apple's official LSP implementation
Built on sourcekitd and clangd
Provides code-completion and jump-to-definition functionality
Supports both Swift Package Manager projects and projects with compile_commands.json
Included in official Swift toolchains and Xcode
Most actively maintained and widely used implementation

LSPService (codeface-io/LSPService)
Focuses on using local LSP servers via WebSockets
Good for network-based LSP implementations
LSP-Types (AuroraEditor/LSP-Types)
New implementation (2024) focusing on LSP 3.16.0 types
Includes support for proposed 3.17 features
Part of the AuroraEditor project

For implementing LSP in a Swift project, sourcekit-lsp is the recommended choice since it's:

Official Apple implementation
Well-maintained
Integrated with Swift toolchain
Supports both Swift and C-based languages
Has cross-language support and powerful source code indexing
```

## VSCode + [Roo Code](https://github.com/RooVetGit/Roo-Code)

Do you trust the publisher "Roo Code"?

The extension Roo Code (prev. Roo Cline) is published by Roo Code. This is the first extension you're installing from this publisher.

 **Roo Code is not verified.**

Visual Studio Code has no control over the behavior of third-party extensions, including how they manage your personal data. Proceed only if you trust the publisher.

## VSCode + [Continue](https://marketplace.visualstudio.com/items?itemName=Continue.continue)

 **Continue is verified.**
 
 Choose `Claude 3.7 Sonnet Thinking (Preview)` as your AI model.
 
**The only AI model + tool combination that can generate `UICollectionViewCell` and more accurate UI details for the provided figma snapshot.**

```
@objc func handleFavoriteTapped() {
    // Toggle favorite state
    let isFavorite = favoriteButton.tintColor == .red
    favoriteButton.tintColor = isFavorite ? .black : .red
    favoriteButton.setImage(UIImage(systemName: isFavorite ? "heart" : "heart.fill"), for: .normal)
}
```

*Tip*
> You can drag installed plugins (`copilot`, `cline`, `continue`)  from left primary bar to secondary side bar in the way that's most productive for you. 

![](../image/developer/vscode_extensions_layout.png)

[Custom Layout - Primary and Secondary Side Bar](https://code.visualstudio.com/docs/editor/custom-layout)

At any time, you can drag and drop views and panels into the Primary or Secondary Side Bar. VS Code will remember the layout of views and panels across your sessions.

## Xcode + [GitHub Copilot · Your AI pair programmer](https://github.com/features/copilot) (0.32.0)

**Available AI Models**
- GPT-4o
- o1 (Preview)
- o3-mini (Preview)
- Claude 3.5 Sonnet (Preview)
- Gemini 2.0 Flash (Preview)

[GitHub Copilot for Xcode](https://github.com/github/CopilotForXcode)

- In-line Code Suggestions
Receive context-aware code suggestions and text completion in your Xcode editor. Just press `Tab ⇥` to accept a suggestion.
- Full Suggestions
Press `Option ⌥` for full multi-line suggestions. Only the first line is shown inline. Use Copilot Chat to refine, explain, or improve them.
- Chat
Get real-time coding assistance, debug issues, and generate code snippets directly within Xcode.
- GitHub Context
Copilot gives smarter code suggestions using your GitHub and project context. Use chat to discuss your code, debug issues, or get explanations.

> Press `tab` to accept the first line of a suggestion, hold `option` to view the full suggestion, and press `option + tab` to accept the full suggestion.

[About Claude Sonnet in GitHub Copilot Chat](https://docs.github.com/en/copilot/using-github-copilot/ai-models/using-claude-sonnet-in-github-copilot)

Claude Sonnet 3.7 is currently available in:

Copilot Chat in Visual Studio Code
Copilot Chat in Visual Studio 2022 version 17.13 or later
Immersive mode in Copilot Chat in GitHub
Claude Sonnet 3.5 is currently available in:

Copilot Chat in Visual Studio Code
Copilot Chat in Visual Studio 2022 version 17.12 or later
Immersive mode in Copilot Chat in GitHub

```
Q: Which ai model do you using?
A: I am using the GPT-4o version of OpenAI's GPT models.
```

[Getting code suggestions in your IDE with GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot)

GitHub Copilot will automatically suggest an entire function body in grayed text. To accept the first line of a suggestion, press `Tab`. To view the full suggestion, hold `Option`, and to accept the full suggestion, press `Option`+`Tab`.

### Improving code suggestions

If you encounter issues with code suggestions, such as conflicting or missing suggestions, you can try the following:

Disable Xcode's native predictive text completion: To avoid receiving two sets of code suggestions, you can disable Xcode's native predictive text completion. You can find this setting in the Xcode settings in the "Editing" tab under "Text Editing".
Check for duplication detection in Copilot: If you receive limited or no suggestions from Copilot, you may have duplication detection enabled. For more information on duplication detection, see Managing Copilot policies as an individual subscriber.
Check for updates and restart Xcode: Ensure you have the latest version of Copilot for Xcode in the extension application and restart Xcode.

### [Asking GitHub Copilot questions in your IDE](https://docs.github.com/en/copilot/using-github-copilot/copilot-chat/asking-github-copilot-questions-in-your-ide)

Using keywords in your prompt

You can use special keywords to help Copilot understand your prompt.

**Slash commands**

Use slash commands to avoid writing complex prompts for common scenarios. To use a slash command, type `/` in the chat prompt box, followed by a command.

To see all available slash commands, type `/` in the chat prompt box. For more information, see [GitHub Copilot Chat cheat sheet](https://docs.github.com/en/copilot/using-github-copilot/github-copilot-chat-cheat-sheet?tool=xcode#slash-commands).

| Command | Description |
|---------|-------------|
| /doc | Generate documentation for this symbol. |
| /explain | Provide an explanation for the selected code. |
| /fix | Suggest fixes for code errors and typos. |
| /simplify | Simplify the current code selection. |
| /tests | Create a unit test for the current code selection. |
| /releaseNotes | What's New |

**File references**

By default, Copilot Chat will reference the file that you have open or the code that you have selected. To attach a specific file as reference, click  in the chat prompt box.

**Chat management**

You can open a conversation thread for each Xcode IDE to keep discussions organized across different contexts. You can also revisit previous conversations and reference past suggestions through the chat history.

## [Cursor - The AI Code Editor](https://www.cursor.com) (V0.46.9) + Claude-3.5-sonnet

**Chat Modes**
- Agent = General programming assistant
- Ask = Codebase-specific questions
- Edit = Direct code modifications

Attached figgma snapshot will generate UISwift codes running on Xcode.

*Cursor Settings -> General -> Privacy mode -> enabled
If on, none of your code will be stored by us. If off, we may save prompts and collect telemetry data to improve Cursor.*

### Models

Switch between AI models in Cursor using Chat, Composer, Tab, or Agent with different pricing tiers.

With Composer, ⌘ K, and Terminal Ctrl/⌘ K, you can easily switch between different models of your choice.

### Available models

Premium models count against your monthly request quota based on your subscription plan. Once you exceed your quota, additional requests can be purchased by enabling usage based pricing.

Pro and Business plans get 500 requests/month included, and can be extended by enabling usage based pricing.

| Model | Provider | Premium | Agent | Pricing | Note |
|-|-|-|-|-|-|
| [claude-3.7-sonnet](https://www.anthropic.com/claude/sonnet) | Anthropic | ✓ | ✓ | $0.04 | |
| [claude-3.7-sonnet-thinking](https://www.anthropic.com/claude/sonnet) | Anthropic | ✓ | ✓ | $0.04 | |
| [claude-3.5-sonnet](https://www.anthropic.com/claude/sonnet) | Anthropic | ✓ | ✓ | $0.04 | |
| [claude-3.5-haiku](https://www.anthropic.com/claude/haiku) | Anthropic | ✓ | | $0.01 | Counts as 1/3 fast request |
| [claude-3-opus](https://www.anthropic.com/news/claude-3-family) | Anthropic | ✓ | | $0.10 | 10 requests/day included on paid plan |
| cursor-small | Cursor | Free | | | |
| [deepseek-v3](https://www.deepseek.com/) | Fireworks | Soon | Free | | |
| [deepseek-r1](https://www.deepseek.com/) | Fireworks | ✓ | Soon | $0.04 | |
| [gpt-4o](https://openai.com/index/hello-gpt-4o/) | OpenAI | ✓ | ✓ | $0.04 | |
| [gpt-4o-mini](https://openai.com/gpt-4o-mini) | OpenAI | ✓ | | Free plan gets 500 requests/day | |
| [gpt-4.5-preview](https://openai.com/index/introducing-gpt-4-5/) | OpenAI | | | $2.00 | |
| [o1](https://openai.com/index/learning-to-reason-with-llms/) | OpenAI | | | $0.40 | |
| [o1-mini](https://openai.com/index/openai-o1-mini-advancing-cost-efficient-reasoning/) | OpenAI | | | $0.10 | 10 requests/day included on paid plan |
| [o3-mini-high](https://openai.com/index/openai-o3-mini/) | OpenAI | ✓ | ✓ | $0.01 | Counts as 1/3 fast request |
| [grok-2](https://x.ai/blog/grok-1212) | xAI | ✓ | | $0.04 | |

You can add additional models under `Cursor Settings` > `Models`. All models are hosted on US-based infrastructure.

### Model dropdown

Underneath the AI input box, you will see a dropdown that allows you to select the model you want to use.

### Context windows

In Chat and Composer, we use a 40,000 token context window by default. For Cmd-K, we limit to around 10,000 tokens to balance TTFT and quality. Agent starts at 60,000 tokens and supports up to 120,000 tokens. For longer conversations, we automatically summarize the context to preserve token space. Note that these threshold are changed from time to time to optimize the experience.

### [Create your Dream Apps with Cursor and Claude AI](https://designcode.io/cursor)

Learn to build your dream web apps from the ground up using Cursor, Claude AI, and a suite of powerful AI tools. This course covers everything you need, including React for frontend development, Firebase for backend integration, and Stripe for handling payments. You’ll also dive into advanced AI tools like Claude Artifacts, Galileo AI, v0.dev for UI, Ideogram for design generation, and Cursor Composer for full-scale development.

### [Figma to SwiftUI Code with ClaudeAI](https://designcode.io/swiftui-and-claude-ai-figma-to-code)

First off, Claude 3.7 Sonnet introduces Thinking Mode, which lets us see the model’s thought process. This means Anthropic is finally entering the reasoning models arena, and based on the benchmarks, it’s a worthy competitor to OpenAI’s o3-mini, DeepSeek-R1, and Grok 3.

## Cursor VS Copilot

| Feature | Cursor | Copilot |
|---------|---------|----------|
| Auto-completion | Faster, but provides only one suggestion at a time | Slower, but provides multiple suggestions |
| Code completion quality | Higher quality, fewer compilation errors | Relatively lower quality |
| Environment | Based on VSCode, no IDE plugin needed | Integrated with IDEA |
| Usability | One-click code application, automatic diff view and image-to-code generation | Manual copy-paste or insert at cursor position |
| Usage limits | 500 GPT-4/GPT-4o/Claude 3.5 chats per month; unlimited for standard models | No daily limits |

## [Github Copilot Extensions](https://github.com/marketplace?type=apps&copilot_app=true)

[About building Copilot Extensions](https://docs.github.com/en/copilot/building-copilot-extensions/about-building-copilot-extensions)

[Stack Overflow - copilot ex](https://github.com/marketplace/stack-overflow-extension-for-github-copilot)
Get answers to your most complex coding questions right where you’re already working.

[Models (GitHub) - copilot ex](https://github.com/marketplace/models-github)
The GitHub Models agent offers a chat interface to use the capabilities of GitHub Models. It lets you ask about and interact with [the LLMs listed on the GitHub Marketplace](https://github.com/marketplace/models) through Copilot Chat.

[GitBook for GitHub Copilot - copilot ex](https://github.com/marketplace/gitbook-for-github-copilot)
GitBook Copilot allows you to leverage your GitBook documentation to answer user queries, providing instant responses in your workflow. Available under `@gitbook-copilot`, simply ask questions related to your product, code, or anything else you have documented — and get personalized answers within the context of your code.

## Language Server Protocol (LSP)

> The Language Server Protocol (LSP) defines the protocol used between an editor or IDE and a language server that provides language features like auto complete, go to definition, find all references etc. The goal of the Language Server Index Format (LSIF, pronounced like "else if") is to support rich code navigation in development tools or a Web UI without needing a local copy of the source code.

[SourceKit-LSP](https://github.com/swiftlang/sourcekit-lsp)

SourceKit-LSP is an implementation of the Language Server Protocol (LSP) for Swift and C-based languages. It provides intelligent editor functionality like code-completion and jump-to-definition to editors that support LSP. SourceKit-LSP is built on top of sourcekitd and clangd for high-fidelity language support, and provides a powerful source code index as well as cross-language support. SourceKit-LSP supports projects that use the Swift Package Manager and projects that generate a compile_commands.json file, such as CMake.

**SourceKit-LSP is included in the the Swift toolchains available on swift.org and is bundled with Xcode.**

*Note*
> If you are using SourceKit-LSP with a SwiftPM project in which you need to pass additional arguments to the swift build invocation, as is commonly the case for embedded projects, you need to teach SourceKit-LSP about those arguments as described in Using SourceKit-LSP with Embedded Projects.

[Eclipse LSP4J](https://github.com/eclipse-lsp4j/lsp4j)

Java binding for the Language Server Protocol and the Debug Adapter Protocol.

[Kotlin Language Server](https://github.com/fwcd/kotlin-language-server)

## [Large Language Models (LLMs)](https://developers.google.com/machine-learning/resources/intro-llms)

### What is a language model?

A language model is a machine learning model that aims to predict and generate plausible language. Autocomplete is a language model, for example.

These models work by estimating the probability of a token or sequence of tokens occurring within a longer sequence of tokens. Consider the following sentence:

`When I hear rain on my roof, I _______ in my kitchen.`

If you assume that a token is a word, then a language model determines the probabilities of different words or sequences of words to replace that underscore. For example, a language model might determine the following probabilities:
```
cook soup 9.4%
warm up a kettle 5.2%
cower 3.6%
nap 2.5%
relax 2.2%
...
```
A "sequence of tokens" could be an entire sentence or a series of sentences. That is, a language model could calculate the likelihood of different entire sentences or blocks of text.

Estimating the probability of what comes next in a sequence is useful for all kinds of things: generating text, translating languages, and answering questions, to name a few.

### What is a large language model?

Modeling human language at scale is a highly complex and resource-intensive endeavor. The path to reaching the current capabilities of language models and large language models has spanned several decades.

As models are built bigger and bigger, their complexity and efficacy increases. Early language models could predict the probability of a single word; modern large language models can predict the probability of sentences, paragraphs, or even entire documents.

The size and capability of language models has exploded over the last few years as computer memory, dataset size, and processing power increases, and more effective techniques for modeling longer text sequences are developed.

### How large is large?

The definition is fuzzy, but "large" has been used to describe BERT (110M parameters) as well as PaLM 2 (up to 340B parameters).

Parameters are the weights the model learned during training, used to predict the next token in the sequence. "Large" can refer either to the number of parameters in the model, or sometimes the number of words in the dataset.

## [the Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction)

> MCP is an open protocol that standardizes how applications provide context to LLMs. Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect your devices to various peripherals and accessories, MCP provides a standardized way to connect AI models to different data sources and tools.

[Model Context Protocol servers](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file)

### [Smithery](https://smithery.ai)

**Extend your language model with 1075 capabilities via Model Context Protocol servers.**

[Cursor MCP Guide](https://cursor101.com/zh/article/cursor-what-is-mcp)

[Learn how to add and use custom MCP tools with the Agent in Cursor’s Composer feature](https://docs.cursor.com/context/model-context-protocol)

[Get started building your own server to use in Claude for Desktop and other clients.](https://modelcontextprotocol.io/quickstart/server)

[Figma MCP Server](https://github.com/GLips/Figma-Context-MCP)

### [Qdrant: Vector Search Engine for the next generation of AI applications](https://github.com/qdrant/qdrant)

Qdrant (read: quadrant) is a vector similarity search engine and vector database. It provides a production-ready service with a convenient API to store, search, and manage points—vectors with an additional payload Qdrant is tailored to extended filtering support. It makes it useful for all sorts of neural-network or semantic-based matching, faceted search, and other applications.

Qdrant is written in Rust 🦀, which makes it fast and reliable even under high load.

With Qdrant, embeddings or neural network encoders can be turned into full-fledged applications for matching, searching, recommending, and much more!

[Navigate Your Codebase with Semantic Search and Qdrant](https://qdrant.tech/documentation/advanced-tutorials/code-search/)

[mcp-server-qdrant: A Qdrant MCP server](https://github.com/qdrant/mcp-server-qdrant)

## [Prompt engineering for Copilot Chat](https://docs.github.com/en/copilot/using-github-copilot/copilot-chat/prompt-engineering-for-copilot-chat)

Follow these strategies to improve your Copilot results.

### Start general, then get specific

```
Write a function that tells me if a number is prime

The function should take an integer and return true if the integer is prime

The function should error if the input is not a positive integer
```

### Give examples
```
Write a function that finds all dates in a string and returns them in an array. Dates can be formatted like:

05/02/24
05/02/2024
5/2/24
5/2/2024
05-02-24
05-02-2024
5-2-24
5-2-2024
Example:

findDates("I have a dentist appointment on 11/14/2023 and book club on 12-1-23")

Returns: ["11/14/2023", "12-1-23"]
```

### Break complex tasks into simpler tasks
If you want Copilot to complete a complex or large task, break the task into multiple simple, small tasks.

For example, instead of asking Copilot to generate a word search puzzle, break the process down into smaller tasks, and ask Copilot to accomplish them one by one:

- Write a function to generate a 10 by 10 grid of letters.
- Write a function to find all words in a grid of letters, given a list of valid words.
- Write a function that uses the previous functions to generate a 10 by 10 grid of letters that contains at least 10 words.
- Update the previous function to print the grid of letters and 10 random words from the grid.

### Avoid ambiguity

Avoid ambiguous terms. For example, don’t ask "what does this do" if "this" could be the current file, the last Copilot response, or a specific code block. Instead, be specific:

- What does the `createUser` function do?
- What does the code in your last response do?

Ambiguity can also apply to libraries:

- If you are using an uncommon library, describe what the library does.
- If you want to use a specific library, set the import statements at the top of the file or specify what library you want to use.

### Indicate relevant code

If you are using Copilot in your IDE to get suggestions as you code, open any relevant files and close irrelevant files. Copilot will use the open files to understand your request.

If you are using Copilot Chat in your IDE, open the file or highlight the code that you want Copilot to reference. You can also use keywords to manually supply context to Copilot Chat. For example, you can add the `@workspace` chat participant in VS Code, or `@project` in JetBrains IDEs. See [GitHub Copilot Chat cheat sheet](https://docs.github.com/en/copilot/using-github-copilot/github-copilot-chat-cheat-sheet).

### Experiment and iterate

If you don’t get the result that you want, iterate on your prompt and try again.

If you are using Copilot to get suggestions as you code, you can delete the suggestion entirely and start over. Or you can keep the suggestion and request modifications.

If you are using Copilot Chat, you can reference the previous response in your next request. Or, you can delete the previous response and start over.

### Keep history relevant

Copilot Chat uses the chat history to get context about your request. To give Copilot only the relevant history:

- Use threads to start a new conversation for a new task
- Delete requests that are no longer relevant or that didn’t give you the desired result

### Follow good coding practices

If you aren't getting the responses you want when you ask Copilot for suggestions or explanations in your codebase, make sure that your existing code follows best practices and is easy to read. For example:

- Use a consistent code style and patterns
- Use descriptive names for variables and functions
- Comment your code
- Structure your code into modular, scoped components
- Include unit tests

*Tip*

> Use Copilot to help your code follow best practices. For example, ask Copilot to add comments or to break a large function into smaller functions.
