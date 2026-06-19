// Shared configuration used by every example in this project.
//
// The SDK reads the project ID from (in order):
//   1. `walletconnect config set project-id <id>` (stored in ~/.walletconnect-cli/)
//   2. the WALLETCONNECT_PROJECT_ID environment variable
// `resolveProjectId()` checks both for us. We load a local `.env` first so the
// env var is populated before we ask.
import { resolveProjectId } from "@walletconnect/cli-sdk";

// Node 20.12+ can load a .env file without any dependency. Ignore if missing.
try {
  process.loadEnvFile(new URL("../.env", import.meta.url));
} catch {
  // No .env file — that's fine, we'll fall back to the real environment.
}

export const projectId = resolveProjectId();

if (!projectId) {
  console.error(
    "Missing WalletConnect project ID.\n" +
      "  1. Copy .env.example to .env and set WALLETCONNECT_PROJECT_ID, or\n" +
      "  2. export WALLETCONNECT_PROJECT_ID=<your-id>\n" +
      "Get a free project ID at https://cloud.walletconnect.com",
  );
  process.exit(1);
}

// App metadata shown to the wallet during the pairing/approval prompt.
export const metadata = {
  name: "WC Agent SDK Sample",
  description: "A learning sample for the WalletConnect Agents SDK",
  url: "https://example.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};
