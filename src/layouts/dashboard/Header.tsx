import React from "react";
import Image from "next/image";
import logoImage from "@/assets/images/logo.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IoMdMenu } from "react-icons/io";
import { NavigationSheet } from "./Navigation";

type HeaderProps = React.ComponentProps<"header">;

export default function Header({ className, ...props }: HeaderProps) {
  return (
    <div className="bg-layout relative">
      <header
        className={cn(
          "pt-9 pb-5 px-7 flex items-center justify-between container mx-auto lg:mr-0",
          className
        )}
        {...props}
      >
        <div>
          <h1 className="lg:absolute lg:left-[29px] lg:top-[38px]">
            <Link href="/">
              <Image
                src={logoImage}
                alt="MLStudio logo"
                width={135.63}
                height={44.88}
              />
              <span className="sr-only">MLStudio</span>
            </Link>
          </h1>
        </div>
        <div className="flex items-center gap-x-3">
          <Button className="rounded-full w-[142px] hidden lg:inline-flex">
            KYC
          </Button>
          <Button className="rounded-full hidden lg:inline-flex">
            Connect Wallet
          </Button>

          <Button
            className="bg-[#1F1F2C] border-[#28303F] rounded-full gap-1"
            variant="secondary"
          >
            <Avatar className="w-6 h-6">
              <AvatarFallback className="bg-[#2F5ED2] rounded-full text-white">
                K
              </AvatarFallback>
            </Avatar>
            <span className="font-bold text-sm hidden lg:inline">
              cosm***xk3u
            </span>
          </Button>

          <NavigationSheet
            trigger={
              <Button
                className="bg-[#1F1F2C] rounded-full w-12 h-12 p-0 lg:hidden"
                variant="ghost"
              >
                <IoMdMenu size={24} />
              </Button>
            }
          />
        </div>
      </header>
    </div>
  );
}
