import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logoImage from "@/assets/images/logo.png";
import { Button } from "@/components/ui/button";
import { FaDiscord, FaGithub, FaXTwitter } from "react-icons/fa6";
import NewsletterForm from "./NewsletterForm";

type FooterProps = React.ComponentProps<"footer">;

export default function Footer({ className, ...props }: FooterProps) {
  return (
    <div className="bg-layout relative">
      <footer
        className={cn(
          "flex flex-col gap-14 lg:grid lg:grid-cols-4 px-7 py-14 mx-auto lg:mr-0 xl:pr-20 container",
          className
        )}
        {...props}
      >
        <div>
          <div className="flex md:flex-col gap-5 lg:gap-10 items-center md:items-start justify-between lg:absolute lg:left-[29px]">
            <span className="inline-flex flex-col items-end">
              <Image
                src={logoImage}
                alt="mlayer logo"
                width={45}
                height={45}
              />
              <span className="text-[#B9B8BB] text-sm">by Fero Tech</span>
            </span>

            <ul className="list-none flex items-center gap-2">
              <li>
                <Button
                  className="p-0 w-10 h-10 bg-[#28303F]"
                  variant="secondary"
                  asChild
                >
                  <a
                    href="https://x.com/mlayerprotocol"
                    target="_blank"
                    rel="nofollow noopener"
                  >
                    <FaXTwitter size={24} />
                  </a>
                </Button>
              </li>
              <li>
                <Button
                  className="p-0 w-10 h-10 bg-[#28303F]"
                  variant="secondary"
                  asChild
                >
                  <a
                    href="https://discord.gg/QazYZYBqus"
                    target="_blank"
                    rel="nofollow noopener"
                  >
                    <FaDiscord size={24} />
                  </a>
                </Button>
              </li>
              <li>
                <Button
                  className="p-0 w-10 h-10 bg-[#28303F]"
                  variant="secondary"
                  asChild
                >
                  <a
                    href="https://github.com/mlayerprotocol"
                    target="_blank"
                    rel="nofollow noopener"
                  >
                    <FaGithub size={24} />
                  </a>
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <div className="ml-3 md:ml-0">
          <strong className="font-bold">Company</strong>
          <ul className="list-none space-y-4 mt-5">
            <li>
              <Button
                className="text-sm text-[#B9B8BB] p-0 font-normal h-auto"
                variant="link"
                asChild
              >
                <a href="https://www.mlayer.network">www.mlayer.network</a>
              </Button>
            </li>
            <li>
              <Button
                className="text-sm text-[#B9B8BB] p-0 font-normal h-auto"
                variant="link"
                asChild
              >
                <a target="_blank" href="https://mlayer.gitbook.io/white-paper">
                  Whitepaper
                </a>
              </Button>
            </li>
            <li>
              <Button
                className="text-sm text-[#B9B8BB] p-0 font-normal h-auto"
                variant="link"
                asChild
              >
                <a
                  target="_blank"
                  href="https://mlayer.gitbook.io/introduction"
                >
                  Documentation
                </a>
              </Button>
            </li>
          </ul>
        </div>

        <div className="ml-3 md:ml-0">
          <strong className="font-bold">Socials</strong>
          <ul className="list-none space-y-4 mt-5">
            <li>
              <Button
                className="text-sm text-[#B9B8BB] p-0 font-normal h-auto"
                variant="link"
                asChild
              >
                <a
                  href="https://github.com/mlayerprotocol"
                  target="_blank"
                  rel="nofollow noopener"
                >
                  Github
                </a>
              </Button>
            </li>
            <li>
              <Button
                className="text-sm text-[#B9B8BB] p-0 font-normal h-auto"
                variant="link"
                asChild
              >
                <a
                  href="https://x.com/mlayerprotocol"
                  target="_blank"
                  rel="nofollow noopener"
                >
                  X (formerly Twitter)
                </a>
              </Button>
            </li>
            <li>
              <Button
                className="text-sm text-[#B9B8BB] p-0 font-normal h-auto"
                variant="link"
                asChild
              >
                <a
                  href="https://discord.gg/QazYZYBqus"
                  target="_blank"
                  rel="nofollow noopener"
                >
                  Discord
                </a>
              </Button>
            </li>
          </ul>
        </div>

        <div className="ml-3 md:ml-0">
          <strong className="font-bold">Company</strong>
          <p className="text-[#B9B8BB] text-balance text-sm mt-5 leading-6">
            Signup for our newsletter to get the latest news in your inbox.
          </p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>
      </footer>
    </div>
  );
}
