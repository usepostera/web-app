import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  multiInjectedProviderDiscovery: false,
  connectors: [
    coinbaseWallet({
      appName: "Postera",
      preference: "all", // set this to `all` to use EOAs as well
      version: "4",
    }),
  ],
  ssr: true,
  transports: {
    [baseSepolia.id]: http(
      "https://api.developer.coinbase.com/rpc/v1/base-sepolia/Mpvo9ZhDVRL9PeM0rYK27NTxWh7CeJXu"
    ),
  },
});
