"use client";
import React from "react";
import { State, WagmiProvider } from "wagmi";
import ClientQueryClientProvider from "./ClientQueryClientProvider";
import { metadata, networks, wagmiAdapter } from "@/lib/wagmi";
import { configurations } from "@/utils/configurations";
import { createAppKit } from "@reown/appkit/react";

export type ClientWagmiProviderProps = {
  children: React.ReactNode;
  initialState?: State;
};

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  metadata,
  projectId: configurations.walletconnect.projectId,
  features: {
    analytics: false,
  },
});

export default function ClientWagmiProvider({
  children,
  initialState,
}: ClientWagmiProviderProps) {
  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig}
      initialState={initialState}
    >
      <ClientQueryClientProvider>{children}</ClientQueryClientProvider>
    </WagmiProvider>
  );
}
