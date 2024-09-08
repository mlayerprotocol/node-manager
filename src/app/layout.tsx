import type { Metadata } from "next";
import { aeonikFont } from "@/theme/font";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { cookieToInitialState } from "wagmi";
import { config } from "@/lib/wagmi";
import { headers } from "next/headers";
import ClientWagmiProvider from "@/contexts/ClientWagmiProvider";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import ConnectWalletGuard from "@/components/HOC/ConnectWalletGuard";

export const metadata: Metadata = {
  title: "mLayer Node Manager",
  description: "Purchase and manage mLayer validator and sentry nodes",
};

export const runtime = "edge";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en" className="w-full h-full dark">
        <head>
     <link rel="icon" href="/favicon.png" type="image/png" />
  </head>
   
      <body
        className={cn(
          aeonikFont.variable,
          "font-aeonik before:bg-node-texture before:fixed before:inset-0 relative before:bg-[length:861px_528px] before:opacity-[0.04] before:-z-10 w-full h-full"
        )}
      >
        <ClientWagmiProvider initialState={initialState}>
          <DashboardLayout>
            <ConnectWalletGuard>{children}</ConnectWalletGuard>
          </DashboardLayout>
        </ClientWagmiProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
