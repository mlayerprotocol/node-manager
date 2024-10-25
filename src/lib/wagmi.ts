import { cookieStorage, createStorage, createConfig, http } from "wagmi";
import { configurations } from "@/utils/configurations";
import { AppKitNetwork, base, baseSepolia } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

if (!configurations.walletconnect.projectId) {
  throw new Error("Project ID is not defined");
}

export const metadata = {
  name: "NodeManager",
  description: "mlayer node manager",
  url: configurations.app.url,
  icons: [`${configurations.app.url}/images/icon.png`],
};

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
  baseSepolia,
  base,
];

export const wagmiAdapter = new WagmiAdapter({
  networks: [baseSepolia, base],
  projectId: configurations.walletconnect.projectId,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
