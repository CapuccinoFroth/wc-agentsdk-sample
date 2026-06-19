// Example 1 — Connect a wallet and inspect the session.
//
// Run with:  npm run connect
//
// This uses the `withWallet` helper, which handles the full lifecycle:
//   connect (shows a QR code in the terminal) -> run your callback -> disconnect & cleanup.
// Scan the QR code with any WalletConnect-compatible wallet (e.g. MetaMask, Rainbow).
import { withWallet } from "@walletconnect/cli-sdk";
import { projectId, metadata } from "./config.ts";

await withWallet(
  {
    projectId: projectId!,
    metadata,
    // Request a couple of chains so you can see multi-chain accounts.
    chains: ["eip155:1", "eip155:10"], // Ethereum mainnet + Optimism
    ui: "terminal", // set to "browser" to open a QR page in your browser instead
  },
  async (wallet, { accounts, topic }) => {
    console.log("\n✅ Connected!");
    console.log("Session topic:", topic);
    console.log("Accounts (CAIP-10):");
    for (const account of accounts) {
      // Format: <namespace>:<chainId>:<address>, e.g. eip155:1:0xABC...
      console.log("  -", account);
    }
    // withWallet automatically disconnects and cleans up when this returns.
  },
);
