import React from "react";
import Image from "next/image";
import logoImage from "@/assets/images/logo.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IoMdMenu } from "react-icons/io";
import { NavigationSheet } from "./Navigation";
import ConnectWalletButton from "@/components/ui/ConnectWalletButton";

type HeaderProps = React.ComponentProps<"header">;

export default function Header({ className, ...props }: HeaderProps) {
  return (
    <div className="bg-layout relative">
      <header
        className={cn(
          "pt-7 md:pt-9 pb-4 md:pb-5 px-7 flex items-center justify-between container mx-auto lg:mr-0 xl:pr-20",
          className
        )}
        {...props}
      >
        <div>
          <h1 className="lg:absolute lg:left-[29px] lg:top-[38px] text-nowrap">
            <Link
              href="/"
              className="flex flex-col md:gap-2 md:items-center md:flex-row"
            >
              <Image src={logoImage} alt="mLayer" width={40} height={40} />
              <span>
                <span className="md:text-xl font-bold">ml</span>/
                <span className=" md:text-xl">node manager</span>
              </span>
            </Link>
          </h1>
        </div>
        <div className="flex items-center gap-x-3">
          {/* <Button className="rounded-full w-[142px] hidden lg:inline-flex">
            KYC
          </Button> */}
          <ConnectWalletButton
            buttonClassNames={{
              disconnected: "rounded-full",
            }}
          />

          <NavigationSheet
            trigger={
              <Button
                className="bg-[#1F1F2C] rounded-full w-10 h-10 p-0 lg:hidden"
                variant="ghost"
              >
                <IoMdMenu size={18} />
              </Button>
            }
          />
        </div>
      </header>
    </div>
  );
}
