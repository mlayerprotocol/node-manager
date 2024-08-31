import type { Metadata } from "next";
import { aeonikFont } from "@/theme/font";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Mlayer - License Dashboard",
  description: "Mlayer - License Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-full dark">
      <body
        className={cn(
          aeonikFont.variable,
          "font-aeonik before:bg-node-texture before:absolute before:inset-0 relative before:bg-[length:861px_528px] before:opacity-[0.04] before:-z-10 w-full h-full"
        )}
      >
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
