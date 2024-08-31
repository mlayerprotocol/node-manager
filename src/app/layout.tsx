import type { Metadata } from "next";
import { aeonikFont } from "@/theme/font";
import { cn } from "@/lib/utils";
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
    <html lang="en">
      <body className={cn(aeonikFont.variable, "font-aeonik dark")}>
        {children}
      </body>
    </html>
  );
}
