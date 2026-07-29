# replit.md

## Overview

This is a Discord bot application built with Discord.js v13, designed as a multi-purpose bot with features including AI chat (OpenAI), ticket management, Roblox group integration, QR code generation, Discord Nitro link handling, voice channel support, and Google Cloud speech/text-to-speech capabilities. The bot runs on an Express server and uses MongoDB (via Mongoose) for data storage and Firebase Admin for additional backend services. The project originated as a Glitch-hosted template ("vainexio-template-1").

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Entry Point & Server
- **`server.js`** is the main entry point. It initializes both an Express HTTP server and the Discord.js client. The bot uses Discord.js v13 with specific intents (Guilds, Guild Messages, Direct Messages, Guild Members) and the "CHANNEL" partial.
- Express is used alongside the bot, likely for webhooks, API endpoints, or health checks. It uses `cors`, `body-parser`, and `express-rate-limit` middleware.
- The Discord client is exported from `server.js` and imported by other modules (`functions/others.js`, `functions/roles.js`, etc.).

### Module Structure
- **`functions/`** — Contains modular utility files, each exporting specific functionality:
  - `ai.js` — OpenAI integration for chat and image generation, with custom system prompts per "account" (e.g., NUX for a university assistant)
  - `commands.js` — Command parsing with prefix-based commands and alias support
  - `get.js` — Utility functions (timestamps, AI chat v2, nth formatting, Discord entity lookups)
  - `linksHandler.js` — Discord Nitro gift link generation using Discord API billing endpoints
  - `others.js` — General utilities (buttons, action rows, moderation, permission checks, string scanning)
  - `qrGen.js` — QR code generation for payment (Philippine P2P QR pay format) using qrcode-monkey API
  - `roblox.js` — Roblox API integration with CSRF token management for group rank changes
  - `roles.js` — Discord role management (add, remove, check roles by name or ID)
  - `sendMessage.js` — Message sending utilities with embed support and file fallback for long messages
  - `tickets.js` — Ticket system with channel creation, permissions, and category-based organization

- **`storage/`** — Configuration and settings:
  - `settings_.js` — Central configuration file containing colors, emojis, AI settings, command definitions, and various feature configs
  - `slashCommands.js` — Slash command registration definitions (Roblox eligibility checks, group registration, etc.)

### Design Patterns
- **Circular dependency awareness**: `server.js` exports the client, which is imported by function modules. Be careful when adding new imports to `server.js` that reference function files.
- **Configuration-driven**: Most behavior is controlled through `storage/settings_.js` — commands, emojis, colors, and feature flags are centralized there.
- **Environment variables**: Secrets (API keys, tokens, cookies) are stored in environment variables (e.g., `process.env.OPEN_AI`, `process.env.Cookie`, account tokens for link generation).

### Database
- **MongoDB via Mongoose** (`mongoose` v7) — Used for persistent data storage. Schemas are not visible in the provided files but Mongoose is imported in `server.js`.
- **Firebase Admin SDK** — Initialized via `serviceAccount.json` for Firebase/Firestore integration (likely for additional data or Android IoT project connectivity).

### Bot Framework
- **Discord.js v13** — Not the latest version. Uses the v13 API patterns (MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Intents.FLAGS).
- **Node.js 16.x** — Specified in `engines` field. This is an older Node version.

## External Dependencies

### APIs & Services
- **OpenAI API** — Used for chat completions and image generation. API key stored in environment variables with indexed naming (`AI_TEST`).
- **Discord API** — Both via discord.js library and direct REST calls (billing/payments endpoints for Nitro link generation).
- **Google Cloud Speech-to-Text** (`@google-cloud/speech`) — Voice recognition capabilities.
- **Google Cloud Text-to-Speech** (`@google-cloud/text-to-speech`) — TTS capabilities.
- **Firebase Admin** — Backend services via service account authentication (`serviceAccount.json`).
- **Roblox API** — Group management (rank changes, user lookups) with CSRF token refresh logic.
- **QRCode Monkey API** (`api.qrcode-monkey.com`) — QR code image generation for payment codes.

### Key npm Packages
- `discord.js` v13 — Discord bot framework
- `mongoose` v7 — MongoDB ODM
- `express` v4 — HTTP server
- `node-fetch` v2 — HTTP client (CommonJS compatible)
- `openai` v4 — OpenAI SDK
- `firebase-admin` v13 — Firebase backend
- `@discordjs/voice` — Voice channel support
- `discord-html-transcripts` — Ticket transcript generation
- `sharp` — Image processing
- `multer` — File upload handling
- `cheerio` — HTML parsing
- `moment` — Date/time formatting
- `express-rate-limit` — API rate limiting

### Environment Variables Required
- OpenAI API keys (e.g., `AI_TEST`)
- Discord bot token
- Roblox cookie (`Cookie`)
- Discord account tokens for link generation
- MongoDB connection string
- Google Cloud credentials (via `serviceAccount.json` or environment)