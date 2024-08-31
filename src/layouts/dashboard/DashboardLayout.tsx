import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-full flex flex-col pt-[104px]">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header className="shrink-0" />
      </div>
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
