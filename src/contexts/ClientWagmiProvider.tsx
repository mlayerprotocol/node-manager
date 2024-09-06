"use client";
import React from "react";
import { State, WagmiProvider } from "wagmi";
import ClientQueryClientProvider from "./ClientQueryClientProvider";
import { config, metadata } from "@/lib/wagmi";
import { configurations } from "@/utils/configurations";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

export type ClientWagmiProviderProps = {
  children: React.ReactNode;
  initialState?: State;
};

export const web3ModalConfig = defaultWagmiConfig({
  metadata,
  chains: config.chains,
  projectId: configurations.walletconnect.projectId,
  ssr: true,
  storage: config.storage,
});

createWeb3Modal({
  metadata,
  wagmiConfig: web3ModalConfig,
  projectId: configurations.walletconnect.projectId,
});

export default function ClientWagmiProvider({
  children,
  initialState,
}: ClientWagmiProviderProps) {
  return (
    <WagmiProvider config={web3ModalConfig} initialState={initialState}>
      <ClientQueryClientProvider>{children}</ClientQueryClientProvider>
    </WagmiProvider>
  );
}
