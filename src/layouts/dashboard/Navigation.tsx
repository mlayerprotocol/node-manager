"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RiDashboardFill, RiLockStarFill } from "react-icons/ri";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type NavigationProps = React.ComponentProps<"nav">;

export function NavigationSheet({
  trigger,
  ...props
}: NavigationProps & { trigger?: React.ReactNode }) {
  return (
    <Sheet>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent side="left" className="w-max p-0">
        <Navigation {...props} />
      </SheetContent>
    </Sheet>
  );
}

export default function Navigation({ className, ...props }: NavigationProps) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  return (
    <nav className={cn("bg-layout min-w-[300px] h-full", className)} {...props}>
      <ul className="pt-24 px-7 space-y-1">
        <li>
          <Button
            className={cn(
              "w-full justify-start text-[#AEB9E1] relative overflow-hidden",
              selectedLayoutSegment === null &&
                "bg-[#040415] text-white before:absolute before:w-[3.19px] before:top-0 before:left-0 before:h-full before:bg-[#2F5ED2]"
            )}
            variant="ghost"
            asChild
          >
            <Link href="/">
              <RiDashboardFill
                size={20}
                className={cn(
                  selectedLayoutSegment === null && "text-[#2F5ED2]"
                )}
              />
              <span className="ml-[6px]">Dashboard</span>
            </Link>
          </Button>
        </li>
        <li>
          <Button
            className={cn(
              "w-full justify-start text-[#AEB9E1] relative overflow-hidden",
              selectedLayoutSegment === "purchase-license" &&
                "bg-[#040415] text-white before:absolute before:w-[3.19px] before:top-0 before:left-0 before:h-full before:bg-[#2F5ED2]"
            )}
            variant="ghost"
            asChild
          >
            <Link href="/purchase-license">
              <BiSolidPurchaseTag
                size={20}
                className={cn(
                  selectedLayoutSegment === "purchase-license" &&
                    "text-[#2F5ED2]"
                )}
              />
              <span className="ml-[6px]">Purchase License Keys</span>
            </Link>
          </Button>
        </li>
        <li>
          <Button
            className={cn(
              "w-full justify-start text-[#AEB9E1] relative overflow-hidden",
              selectedLayoutSegment === "purchase-license" &&
                "bg-[#040415] text-white before:absolute before:w-[3.19px] before:top-0 before:left-0 before:h-full before:bg-[#2F5ED2]"
            )}
            variant="ghost"
            asChild
          >
            <Link href="/manage-license">
              <AiFillSetting
                size={20}
                className={cn(
                  selectedLayoutSegment === "manage-license" && "text-[#2F5ED2]"
                )}
              />
              <span className="ml-[6px]">Manage License Keys</span>
            </Link>
          </Button>
        </li>
        <li>
          <Button
            className={cn(
              "w-full justify-start text-[#AEB9E1] relative overflow-hidden",
              selectedLayoutSegment === "purchase-license" &&
                "bg-[#040415] text-white before:absolute before:w-[3.19px] before:top-0 before:left-0 before:h-full before:bg-[#2F5ED2]"
            )}
            variant="ghost"
            asChild
          >
            <Link href="/claim">
              <RiLockStarFill
                size={20}
                className={cn(
                  selectedLayoutSegment === "claim" && "text-[#2F5ED2]"
                )}
              />
              <span className="ml-[6px]">Claim</span>
            </Link>
          </Button>
        </li>
      </ul>
    </nav>
  );
}
