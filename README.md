# WalletConnect Agents SDK — Sample Project

A small, heavily-commented TypeScript project for learning the
[WalletConnect Agents SDK](https://docs.walletconnect.com/), specifically the
[`@walletconnect/cli-sdk`](https://www.npmjs.com/package/@walletconnect/cli-sdk)
package, which brings wallet connection, message signing, and transactions to the
terminal / AI agent environments.

> **Beta (v0.x)** — APIs may change between releases. Built against `@walletconnect/cli-sdk@0.8.5`.

## What's inside

| File | What it teaches |
| --- | --- |
| `src/config.ts` | Loading your project ID and defining app metadata (shared by all examples) |
| `src/connect.ts` | Connecting a wallet via terminal QR code and inspecting the session (`withWallet` helper) |
| `src/sign.ts` | Signing a message with `personal_sign` (lower-level `WalletConnectCLI` client) |
| `src/send-tx.ts` | Sending a transaction with `eth_sendTransaction` (a safe 0-value no-op) |

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Get a WalletConnect project ID** (free) from
   [cloud.walletconnect.com](https://cloud.walletconnect.com).

3. **Configure it** — copy the example env file and paste in your ID:

   ```bash
   cp .env.example .env
   # then edit .env and set WALLETCONNECT_PROJECT_ID=...
   ```

   (Alternatively `export WALLETCONNECT_PROJECT_ID=<id>` in your shell.)

4. **Have a WalletConnect-compatible wallet ready** on your phone or as a browser
   extension (MetaMask, Rainbow, Trust, etc.) to scan the QR code.

## Run the examples

```bash
# 1. Connect a wallet and print the session accounts
npm run connect

# 2. Sign a message
npm run sign -- "Hello, WalletConnect!"

# 3. Send a transaction (0-value no-op to yourself on Optimism — costs only gas)
npm run send
```

Each command prints a QR code in the terminal. Scan it with your wallet, approve
the session, and the script continues. Signing/sending will prompt your wallet
for approval too — **read each prompt before approving.**

## How it works

The core flow is always the same:

```
new WalletConnectCLI({ projectId, metadata, chains })
  └─ .connect()                         → returns { accounts, topic, session }
       └─ .request({ chainId, request }) → JSON-RPC call routed to the wallet
            └─ .disconnect() + .destroy()→ end session and free resources
```

`withWallet(options, callback)` (used in `connect.ts` and `send-tx.ts`) wraps that
whole lifecycle so you don't have to manage cleanup manually. Use the direct
`WalletConnectCLI` client (as in `sign.ts`) when you need finer control.

Accounts come back in [CAIP-10](https://chainagnostic.org/CAIPs/caip-10) format,
e.g. `eip155:1:0xABC...` (namespace : chainId : address). Use
`account.split(":").pop()` to get the raw address.

## Beyond this sample

The Agents SDK has two more CLI packages worth exploring:

- **`@walletconnect/staking-cli`** — stake/unstake WCT and claim rewards on Optimism.
- **`@walletconnect/pay-cli`** — create and complete WalletConnect Pay payments.

You can also try the CLIs directly without writing code:

```bash
npm install -g @walletconnect/cli-sdk
walletconnect connect
walletconnect sign "Hello from the terminal"
walletconnect whoami
```

And install the companion Claude Code / agent skills:

```bash
npx skills add WalletConnect/agent-sdk
```

## Reference

- Docs: https://docs.walletconnect.com/
- Docs index (for agents): https://docs.walletconnect.com/llms.txt
- Source: https://github.com/walletconnect/agent-sdk
