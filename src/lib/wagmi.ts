import { cookieStorage, createStorage, createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { configurations } from "@/utils/configurations";

if (!configurations.walletconnect.projectId) {
  throw new Error("Project ID is not defined");
}

export const metadata = {
  name: "MLStudio",
  description: "Mlayer MLStudio",
  url: configurations.app.url,
  icons: [`${configurations.app.url}/images/icon.png`],
};

const chains = [mainnet, sepolia] as const;
export const config = createConfig({
  chains,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
