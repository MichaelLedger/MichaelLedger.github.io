# AI Tools for Developers

## Xcode + [GitHub Copilot · Your AI pair programmer](https://github.com/features/copilot) (0.31.104)

### Chat in Xcode with GitHub Copilot
Get real-time coding assistance, debug issues, and generate code snippets directly within Xcode.

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

## [Model Context Protocol servers](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file)

### [Smithery](https://smithery.ai)

**Extend your language model with 1075 capabilities via Model Context Protocol servers.**

### [Qdrant: Vector Search Engine for the next generation of AI applications](https://github.com/qdrant/qdrant)

Qdrant (read: quadrant) is a vector similarity search engine and vector database. It provides a production-ready service with a convenient API to store, search, and manage points—vectors with an additional payload Qdrant is tailored to extended filtering support. It makes it useful for all sorts of neural-network or semantic-based matching, faceted search, and other applications.

Qdrant is written in Rust 🦀, which makes it fast and reliable even under high load.

With Qdrant, embeddings or neural network encoders can be turned into full-fledged applications for matching, searching, recommending, and much more!

### [mcp-server-qdrant: A Qdrant MCP server](https://github.com/qdrant/mcp-server-qdrant)
