"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { IoMdInformationCircle } from "react-icons/io";

function PurchaseForm() {
  const form = useForm({
    defaultValues: {
      quantity: 1,
      promoCode: "",
    },
  });
  const { control } = form;
  return (
    <Card className="py-6 px-8 bg-layout border border-[#28303F]">
      <CardHeader className="p-0">
        <CardTitle className="font-bold text-base">Phase: 3</CardTitle>
      </CardHeader>
      <CardContent className="p-0 mt-12">
        <Form {...form}>
          <form method="POST">
            <div className="space-y-3">
              <div className="grid grid-cols-2">
                <p className="text-white text-base font-normal">Unit Price:</p>
                <p className="text-white text-base font-bold justify-self-center">
                  0.8 ETH
                </p>
              </div>
              <FormField
                control={control}
                name="quantity"
                render={({ field }) => (
                  <FormItem
                    className="grid grid-cols-2 items-center"
                    {...field}
                  >
                    <FormLabel className="text-white text-base font-normal">
                      Quantity
                    </FormLabel>
                    <FormControl className="justify-self-center">
                      <Input
                        type="number"
                        className="h-12 border border-[#AEB9E1] max-w-[132px] text-center"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2">
                <p className="text-white text-base font-normal">Sub Total:</p>
                <p className="text-white text-base font-bold justify-self-center">
                  10.8 ETH
                </p>
              </div>
              <FormField
                control={control}
                name="quantity"
                render={({ field }) => (
                  <FormItem
                    className="grid grid-cols-2 items-center"
                    {...field}
                  >
                    <FormLabel className="text-white text-base font-normal">
                      Quantity
                    </FormLabel>
                    <FormControl className="justify-self-center">
                      <Input
                        type="number"
                        className="h-12 border border-[#AEB9E1] max-w-[132px] text-center"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2">
                <p className="text-white text-base font-normal">Total</p>
                <p className="text-white text-base font-bold justify-self-center">
                  10.8 ETH
                </p>
              </div>
            </div>
            <Button className="max-w-[354.85px] mt-[92px] flex rounded-full w-full mx-auto">
              Purchase
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default function PurchaseLicenseContainer() {
  const searchParams = useSearchParams();
  const typeParams = searchParams.get("type");
  const activeTab = typeParams === "validator" ? "validator" : "sentry";

  return (
    <main className="px-5 py-10 md:px-20 md:py-20 container mx-auto">
      <div className="flex flex-col flex-wrap xl:flex-row gap-10 lg:gap-12 justify-center items-center">
        <div className="w-full max-w-[562px] relative">
          <Tabs value={activeTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-auto py-2 px-5 bg-layout border border-[#28303F] rounded-full">
              <TabsTrigger
                value="sentry"
                className="h-12 bg-[#040415] data-[state=active]:bg-primary rounded-full first-of-type:rounded-r-none last-of-type:rounded-l-none font-bold text-sm text-white"
                asChild
              >
                <Link
                  href={{
                    query: {
                      type: "sentry",
                    },
                  }}
                >
                  Sentry License
                </Link>
              </TabsTrigger>
              <TabsTrigger
                value="validator"
                className="h-12 bg-[#040415] data-[state=active]:bg-primary rounded-full first-of-type:rounded-r-none last-of-type:rounded-l-none font-bold text-sm text-white"
                asChild
              >
                <Link
                  href={{
                    query: {
                      type: "validator",
                    },
                  }}
                >
                  Validator License
                </Link>
              </TabsTrigger>
            </TabsList>
            <TabsContent className="mt-3" value="sentry">
              <PurchaseForm />
            </TabsContent>
            <TabsContent className="mt-3" value="validator">
              <PurchaseForm />
            </TabsContent>
          </Tabs>
        </div>
        <div className="space-y-8">
          <div>
            <p className="flex items-center gap-2 text-white">
              <span className="font-bold text-base">Sentry Nodes</span>
              <IoMdInformationCircle size={20} />
            </p>

            <ul className="list-disc px-3 py-5 mt-4 text-white font-normal text-sm bg-[#101020] max-w-[324px] rounded-sm">
              <li className="ml-6">Witness nodes for validators.</li>
              <li className="ml-6">
                System Requirement: &gt;= 1Gig RAM, 40Gig Storage, 2 cores
                recommended
              </li>
            </ul>
          </div>

          <div>
            <p className="flex items-center gap-2 text-white">
              <span className="font-bold text-base">Validator Node</span>
              <IoMdInformationCircle size={20} />
            </p>

            <ul className="list-disc px-3 py-5 mt-4 text-white font-normal text-sm bg-[#101020] max-w-[324px] rounded-sm">
              <li className="ml-6">Public node</li>
              <li className="ml-6">
                &gt;= 32Gig RAM, 500Gig Storage, 8 cores recommended
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
