import { cookieStorage, createStorage, createConfig, http } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
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

const chains = [base, baseSepolia] as const;
export const config = createConfig({
  chains,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});
