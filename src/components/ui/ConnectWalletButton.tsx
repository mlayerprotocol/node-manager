"use client";
import React, { useMemo } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Button } from "./button";
import { Avatar, AvatarImage } from "./avatar";
import { cn } from "../../lib/utils";
import { createAvatar } from "@dicebear/core";
import { identicon } from "@dicebear/collection";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { LuWallet } from "react-icons/lu";
import { IoMdLogOut } from "react-icons/io";
import { toast } from "sonner";
import { getQueryClient } from "@/contexts/ClientQueryClientProvider";

export type ConnectWalletButtonProps = {
  buttonClassNames?: {
    disconnected: string;
  };
};

export default function ConnectWalletButton({
  buttonClassNames,
}: ConnectWalletButtonProps) {
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { isConnected, address, isConnecting } = useAccount();

  const avatar = useMemo(() => {
    if (!address) {
      return null;
    }
    const result = createAvatar(identicon, {
      seed: address,
    });
    return result.toDataUri();
  }, [address]);

  if (!isConnected) {
    return (
      <Button
        className={cn(buttonClassNames?.disconnected)}
        onClick={() =>
          open().catch((err) => {
            console.error("Failed to connect wallet", err);
            toast.error("Failed to connect wallet");
          })
        }
      >
        Connect Wallet
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="bg-[#1F1F2C] border-[#28303F] rounded-full gap-1"
          variant="secondary"
          loading={isConnecting}
        >
          <Avatar className="w-6 h-6">
            {avatar && <AvatarImage src={avatar} alt="" />}
          </Avatar>
          <span className="font-bold text-sm hidden lg:inline">
            {address?.slice(0, 4)}***{address?.slice(-4)}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="min-w-80 w-max max-w-[100vw] p-4"
        sideOffset={12}
        align="end"
      >
        <div className="flex items-center gap-10 justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary p-3 text-primary-foreground">
              <LuWallet className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium break-all">{address}</p>
              <p className="text-xs text-muted-foreground">
                Your Wallet Address
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="rounded-full shrink-0"
            size="icon"
            onClick={() => {
              const queryClient = getQueryClient();
              disconnect();
              queryClient.clear();
              toast.info("Wallet Disconnected");
            }}
          >
            <IoMdLogOut className="h-5 w-5" />
            <span className="sr-only">Disconnect</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
