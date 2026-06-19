// Example 2 — Connect a wallet and sign a message (personal_sign).
//
// Run with:  npm run sign -- "Your message here"
//            (defaults to a sample message if none is given)
//
// This shows the lower-level client API directly so you can see each step:
//   new WalletConnectCLI(...) -> connect() -> request() -> disconnect() -> destroy()
import { WalletConnectCLI } from "@walletconnect/cli-sdk";
import { projectId, metadata } from "./config.ts";

const message = process.argv[2] ?? "Hello from the WalletConnect Agents SDK!";

const wallet = new WalletConnectCLI({
  projectId: projectId!,
  metadata,
  chains: ["eip155:1"],
  ui: "terminal",
});

try {
  const { accounts } = await wallet.connect();
  const address = accounts[0].split(":").pop()!; // strip "eip155:1:" prefix
  console.log("\nSigning as:", address);

  // personal_sign expects a hex-encoded message. Encode the UTF-8 string to hex.
  const hexMessage = "0x" + Buffer.from(message, "utf8").toString("hex");

  const signature = await wallet.request<string>({
    chainId: "eip155:1",
    request: {
      method: "personal_sign",
      params: [hexMessage, address],
    },
  });

  console.log("\n✅ Signed message:", JSON.stringify(message));
  console.log("Signature:", signature);
} finally {
  // Always clean up: end the session and free the client's resources.
  await wallet.disconnect();
  await wallet.destroy();
}
