// Example 3 — Send a transaction (eth_sendTransaction).
//
// Run with:  npm run send
//
// ⚠️  SAFETY: by default this sends a 0-value, no-op transaction FROM your wallet
// TO your own address on Optimism. It still costs a tiny amount of gas and your
// wallet will prompt you to approve it. Read it before approving. Nothing is sent
// until you approve in your wallet.
import { withWallet } from "@walletconnect/cli-sdk";
import { projectId, metadata } from "./config.ts";

const CHAIN = "eip155:10"; // Optimism — cheap gas, good for experiments

await withWallet(
  {
    projectId: projectId!,
    metadata,
    chains: [CHAIN],
    ui: "terminal",
  },
  async (wallet, { accounts }) => {
    const from = accounts[0].split(":").pop()!;
    console.log("\nFrom:", from);

    const txHash = await wallet.request<string>({
      chainId: CHAIN,
      request: {
        method: "eth_sendTransaction",
        params: [
          {
            from,
            to: from, // send to self — a harmless no-op
            value: "0x0", // 0 wei
            data: "0x",
          },
        ],
      },
    });

    console.log("\n✅ Transaction submitted!");
    console.log("Tx hash:", txHash);
    console.log(`Explorer: https://optimistic.etherscan.io/tx/${txHash}`);
  },
);
