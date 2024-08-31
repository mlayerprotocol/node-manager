import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-full flex flex-col">
      <Header className="shrink-0" />
      <div className="min-h-0 grow flex">
        <div className="self-stretch shrink-0 hidden lg:block">
          <Navigation />
        </div>
        <div className="grow min-w-0">{children}</div>
      </div>
      <Footer className="shrink-0" />
    </div>
  );
}
