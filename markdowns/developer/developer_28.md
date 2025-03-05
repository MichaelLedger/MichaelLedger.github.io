# AI Tools for Developers

## [ChatGPT](https://chatgpt.com)

Attachments (**docs or images**) supported in chat.

## [DeepSeek - Into the Unknown](https://chat.deepseek.com)

Attachments (**Text extraction only from docs or images**) supported in chat.

## VS Code + GitHub Copilot + Claude 3.7 Sonnet Thinking (Preview)

```
Q: Claude 3.7 Sonnet Thinking (Preview) what does preview mean?

A: Let me clarify something - I am Claude 3.5 Sonnet, not 3.7. I aim to be direct and honest about my identity.

As for the term "Preview" in AI model names, it typically indicates that the model or feature is in an early access or testing phase before full release. It means the model is being made available to select users to gather feedback and potentially identify issues before a wider rollout.

However, since I'm not aware of a Claude 3.7 model, I can't make specific claims about what that preview designation would mean in that context. I aim to stick to facts I'm confident about rather than speculate.

```

If you are a member of an organization that has upgraded to a GitHub Copilot Pro account, 

**open github copilot chat in VS Code by pressing `Ctrl+Cmd+I` and switch ai model as `Claude 3.7 Sonnet Thinking`**.

### AI Models:
- Claude 3.5 Sonnet (Preview)
- Claude 3.7 Sonnet (Preview)
- Claude 3.7 Sonnet Thinking (Preview)
- Gemini 2.0 Flash (Preview)
- GPT-4o
- o1 (Preview)
- o3-mini (Preview)

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

## Xcode + [GitHub Copilot · Your AI pair programmer](https://github.com/features/copilot) (0.31.104)

```
Q: Which ai model do you using?
A: I am using the GPT-4o version of OpenAI's GPT models.
```

### Chat in Xcode with GitHub Copilot
Get real-time coding assistance, debug issues, and generate code snippets directly within Xcode.

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

## [Cursor - The AI Code Editor](https://www.cursor.com) (0.43.6) + Claude-3.5-sonnet

Attached figgma snapshot will generate UISwift codes running on Xcode.

### Models

Switch between AI models in Cursor using Chat, Composer, Tab, or Agent with different pricing tiers.

With Composer, ⌘ K, and Terminal Ctrl/⌘ K, you can easily switch between different models of your choice.

### Available models

Premium models count against your monthly request quota based on your subscription plan. Once you exceed your quota, additional requests can be purchased by enabling usage based pricing.

Pro and Business plans get 500 requests/month included, and can be extended by enabling usage based pricing.

| Model | Provider | Premium | Agent | Pricing | Note |
|-------|----------|----------|--------|----------|------|
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

## [Github Copilot Extensions](https://github.com/marketplace?type=apps&copilot_app=true)

**[About building Copilot Extensions](https://docs.github.com/en/copilot/building-copilot-extensions/about-building-copilot-extensions)**

### [Stack Overflow - copilot ex](https://github.com/marketplace/stack-overflow-extension-for-github-copilot)
Get answers to your most complex coding questions right where you’re already working.

### [Models (GitHub) - copilot ex](https://github.com/marketplace/models-github)
The GitHub Models agent offers a chat interface to use the capabilities of GitHub Models. It lets you ask about and interact with [the LLMs listed on the GitHub Marketplace](https://github.com/marketplace/models) through Copilot Chat.

### [GitBook for GitHub Copilot - copilot ex](https://github.com/marketplace/gitbook-for-github-copilot)
GitBook Copilot allows you to leverage your GitBook documentation to answer user queries, providing instant responses in your workflow. Available under `@gitbook-copilot`, simply ask questions related to your product, code, or anything else you have documented — and get personalized answers within the context of your code.

## [Model Context Protocol servers](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file)

### [Smithery](https://smithery.ai)

**Extend your language model with 1075 capabilities via Model Context Protocol servers.**

### [Qdrant: Vector Search Engine for the next generation of AI applications](https://github.com/qdrant/qdrant)

Qdrant (read: quadrant) is a vector similarity search engine and vector database. It provides a production-ready service with a convenient API to store, search, and manage points—vectors with an additional payload Qdrant is tailored to extended filtering support. It makes it useful for all sorts of neural-network or semantic-based matching, faceted search, and other applications.

Qdrant is written in Rust 🦀, which makes it fast and reliable even under high load.

With Qdrant, embeddings or neural network encoders can be turned into full-fledged applications for matching, searching, recommending, and much more!

### [mcp-server-qdrant: A Qdrant MCP server](https://github.com/qdrant/mcp-server-qdrant)

### [Figma MCP Server](https://github.com/GLips/Figma-Context-MCP)
