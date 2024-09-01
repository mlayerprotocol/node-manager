"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoMdInformationCircle } from "react-icons/io";
import Image from "next/image";
import iconImage from "../../../../public/images/icon.png";
import { MdOutlineSwapCalls } from "react-icons/md";
import { Label } from "@/components/ui/label";

export default function ClaimContainer() {
  return (
    <main className="px-5 py-10 md:px-20 md:py-20 container mx-auto">
      <div className="max-w-[492px] mx-auto">
        <div className="relative">
          <IoMdInformationCircle
            className="absolute -left-10 top-1/2 hidden lg:inline -translate-y-1/2"
            size={20}
          />
          <p className="bg-layout py-3 px-4 text-white text-sm rounded relative leading-5 before:hidden lg:before:block before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-5 before:w-0 before:h-0 before:border-[10px] before:border-r-layout before:border-transparent">
            Please note that <span className="font-bold">xMSG</span> has waiting
            periods to redeem for <span className="font-bold">MSG</span>. More
            information can be found{" "}
            <Button className="text-primary p-0 h-auto" variant="link" asChild>
              <a href="#">here</a>
            </Button>
            .
          </p>
        </div>

        <div className="mt-14 space-y-4 relative">
          <div className="bg-layout border border-[#28303F] py-5 px-6 rounded-xl">
            <div className="flex items-center justify-between">
              <strong className="text-lg text-white font-bold">
                You redeem
              </strong>
              <div className="flex items-center gap-16">
                <span className="text-base text-[#B9B8BB]">Available:</span>
                <Button
                  className="h-auto p-0 text-primary text-base"
                  variant="link"
                >
                  Max
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-10">
              <Input
                className="w-full bg-transparent border-transparent text-white font-bold text-3xl outline-transparent !ring-transparent ring-offset-0 p-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                defaultValue={0}
                type="number"
              />
              <div className="flex items-center justify-self-end gap-3">
                <Image
                  src={iconImage}
                  alt=""
                  height={30}
                  className="-rotate-[35deg]"
                />
                <strong className="text-xl text-white font-bold">MSG</strong>
              </div>
            </div>
          </div>
          <Button className="h-[44px] w-[44px] rounded-full p-0 absolute left-1/2 -translate-y-[30px] -translate-x-1/2">
            <MdOutlineSwapCalls size={24} />
          </Button>
          <div className="bg-layout border border-[#28303F] py-5 px-6 rounded-xl">
            <div className="flex items-center justify-between">
              <strong className="text-lg text-white font-bold">
                You receive
              </strong>
            </div>
            <div className="grid grid-cols-2 mt-10">
              <Input
                className="w-full bg-transparent border-transparent text-white font-bold text-3xl outline-transparent !ring-transparent ring-offset-0 p-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                defaultValue={0}
                type="number"
              />
              <div className="flex items-center justify-self-end gap-3">
                <Image
                  src={iconImage}
                  alt=""
                  height={30}
                  className="-rotate-[35deg]"
                />
                <strong className="text-xl text-white font-bold">xMSG</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[38px]">
          <p className="text-lg text-[#B9B8BB]">Choose a redemption period</p>

          <ul className="mt-6 space-y-[18px]">
            <li>
              <Label className="has-[:checked]:border-primary p-5 rounded-lg border block border-[#28303F] cursor-pointer transition duration-300">
                <input
                  type="radio"
                  className="hidden peer"
                  value="15d"
                  name="redemptionPeriod"
                  defaultChecked
                />
                <div className="flex items-center justify-between peer-[:checked]:[&_svg_circle:last-of-type]:visible">
                  <div className="flex items-center gap-5">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="10" cy="10" r="9.5" stroke="#2F5ED2" />
                      <circle
                        cx="10"
                        cy="10"
                        r="4.5"
                        fill="#2F5ED2"
                        stroke="#2F5ED2"
                        className="active-indicator invisible"
                      />
                    </svg>

                    <p className="font-bold text-lg text-white">15 days</p>
                  </div>
                  <p className="text-[#B9B8BB] text-lg font-bold">
                    25% redemption rate
                  </p>
                </div>
              </Label>
            </li>

            <li>
              <Label className="has-[:checked]:border-primary p-5 rounded-lg border block border-[#28303F] cursor-pointer transition duration-100">
                <input
                  type="radio"
                  className="hidden peer"
                  value="90d"
                  name="redemptionPeriod"
                />
                <div className="flex items-center justify-between peer-[:checked]:[&_svg_circle:last-of-type]:opacity-100">
                  <div className="flex items-center gap-5">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="10" cy="10" r="9.5" stroke="#2F5ED2" />
                      <circle
                        cx="10"
                        cy="10"
                        r="4.5"
                        fill="#2F5ED2"
                        stroke="#2F5ED2"
                        className="active-indicator opacity-0 transition-opacity duration-100"
                      />
                    </svg>

                    <p className="font-bold text-lg text-white">90 days</p>
                  </div>
                  <p className="text-[#B9B8BB] text-lg font-bold">
                    62.5% redemption rate
                  </p>
                </div>
              </Label>
            </li>

            <li>
              <Label className="has-[:checked]:border-primary p-5 rounded-lg border block border-[#28303F] cursor-pointer transition duration-300">
                <input
                  type="radio"
                  className="hidden peer"
                  value="180"
                  name="redemptionPeriod"
                />
                <div className="flex items-center justify-between peer-[:checked]:[&_svg_circle:last-of-type]:visible">
                  <div className="flex items-center gap-5">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="10" cy="10" r="9.5" stroke="#2F5ED2" />
                      <circle
                        cx="10"
                        cy="10"
                        r="4.5"
                        fill="#2F5ED2"
                        stroke="#2F5ED2"
                        className="active-indicator invisible"
                      />
                    </svg>

                    <p className="font-bold text-lg text-white">180 days</p>
                  </div>
                  <p className="text-[#B9B8BB] text-lg font-bold">
                    100% redemption rate
                  </p>
                </div>
              </Label>
            </li>
          </ul>
        </div>

        <Button className="mt-[50px] flex rounded-full w-full">Continue</Button>
      </div>
    </main>
  );
}
