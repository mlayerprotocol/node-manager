"use client";
import React, { useEffect, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm, UseFormReturn } from "react-hook-form";
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
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdInformationCircle,
} from "react-icons/io";
import CurrencyInput from "react-currency-input-field";
import { useAccount, useBalance } from "wagmi";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  useReadSentryLicenseContractLicensePrice,
  useReadSubnetContractAddressInfo,
  useReadValidatorLicenseContractLicensePrice,
  useWriteSentryNodeContractPurchaseLicense,
  useWriteSentryNodeContractPurchaseLicenseFor,
  useWriteValidatorNodeContractPurchaseLicense,
} from "@mlayer-contracts";
import { useDebounce } from "@react-hook/debounce";
import { formatEther } from "viem";
import Decimal from "decimal.js";
import { toast } from "sonner";
import { get } from "http";
import { cn } from "@/lib/utils";
import { getQueryClient } from "@/contexts/ClientQueryClientProvider";

type PurchaseFormPayload = {
  quantity: number;
  promoCode: string;
};

function PurchaseForm({
  form,
  isConnected,
  balance,
  balanceLoading,
  unitPrice,
  subTotal,
  total,
  onSubmit: handleOnSubmit,
}: {
  form: UseFormReturn<PurchaseFormPayload>;
  isConnected: boolean;
  balance: string | number | bigint;
  balanceLoading: boolean;
  unitPrice: {
    value: number | string;
    loading: boolean;
  };
  subTotal: {
    value: number | string;
    loading: boolean;
  };
  total: {
    value: number | string;
    loading: boolean;
  };
  onSubmit: (data: PurchaseFormPayload) => void;
}) {
  const { control, setError, clearErrors, handleSubmit } = form;
  useEffect(() => {
    if (!balanceLoading && new Decimal(balance.toString()).lt(total.value)) {
      setError("quantity", {
        type: "manual",
        message: "Insufficient balance",
      });
    } else {
      clearErrors("quantity");
    }
  }, [balance, total.value, setError, clearErrors, balanceLoading]);

  const onSubmit = handleSubmit(handleOnSubmit);

  return (
    <Card className="py-6 px-8 bg-layout border border-[#28303F]">
      <CardHeader className="p-0">
        <CardTitle className="font-bold text-base">Phase: 3</CardTitle>
      </CardHeader>
      <CardContent className="p-0 mt-12">
        <Form {...form}>
          <form method="POST" onSubmit={onSubmit}>
            <div className="space-y-3">
              <div className="grid grid-cols-2">
                <p className="text-white text-base font-normal">Unit Price:</p>
                {isConnected ? (
                  unitPrice.loading ? (
                    <Skeleton className="justify-self-center h-4 w-40" />
                  ) : (
                    <p className="text-white text-base font-bold justify-self-center">
                      {unitPrice.value} ETH
                    </p>
                  )
                ) : (
                  <Badge className="justify-self-center" variant="destructive">
                    connect wallet to fetch
                  </Badge>
                )}
              </div>
              <FormField
                control={control}
                name="quantity"
                rules={{
                  required: "Quantity is required",
                  min: {
                    value: 1,
                    message: "Minimum quantity is 1",
                  },
                }}
                render={({ field }) => (
                  <FormItem className="grid grid-cols-2 items-center">
                    <FormLabel className="text-white text-base font-normal">
                      Quantity
                    </FormLabel>
                    <div className="relative justify-self-center">
                      <button
                        type="button"
                        onClick={() =>
                          field.onChange(Math.max(field.value - 1, 1))
                        }
                        className="absolute top-1/2 -translate-y-1/2 left-2 cursor-pointer bg-transparent border-none z-10"
                      >
                        <IoIosArrowDown size={20} />
                      </button>
                      <FormControl>
                        <CurrencyInput
                          className="h-12 border border-[#AEB9E1] max-w-[132px] text-center bg-transparent rounded-md"
                          value={field.value}
                          onValueChange={(_val, _name, values) => {
                            field.onChange(values?.float || 0);
                          }}
                          allowDecimals={false}
                          allowNegativeValue={false}
                          min={1}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => field.onChange(field.value + 1)}
                        className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer bg-transparent border-none z-10"
                      >
                        <IoIosArrowUp size={20} />
                      </button>
                    </div>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2">
                <p className="text-white text-base font-normal">Sub Total:</p>
                {isConnected ? (
                  subTotal.loading ? (
                    <Skeleton className="justify-self-center h-4 w-40" />
                  ) : (
                    <p className="text-white text-base font-bold justify-self-center">
                      {subTotal.value} ETH
                    </p>
                  )
                ) : (
                  <Badge className="justify-self-center" variant="destructive">
                    connect wallet to fetch
                  </Badge>
                )}
              </div>
              <FormField
                control={control}
                name="promoCode"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-2 items-center">
                    <FormLabel className="text-white text-base font-normal">
                      Promo Code
                    </FormLabel>
                    <FormControl className="justify-self-center">
                      <Input
                        type="text"
                        className="h-12 border border-[#AEB9E1] max-w-[132px] text-center bg-transparent rounded-md"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2">
                <p className="text-white text-base font-normal">Total</p>
                {isConnected ? (
                  total.loading ? (
                    <Skeleton className="justify-self-center h-4 w-40" />
                  ) : (
                    <p className="text-white text-base font-bold justify-self-center">
                      {total.value} ETH
                    </p>
                  )
                ) : (
                  <Badge className="justify-self-center" variant="destructive">
                    connect wallet to fetch
                  </Badge>
                )}
              </div>
            </div>
            <div className="min-h-[92px] pt-5 pb-16">
              {form.formState.errors.quantity && (
                <p className="text-destructive">
                  {form.formState.errors.quantity.message}
                </p>
              )}
            </div>
            <Button
              className="max-w-[354.85px] flex rounded-full w-full mx-auto"
              disabled={
                unitPrice.loading ||
                subTotal.loading ||
                total.loading ||
                !isConnected ||
                balanceLoading
              }
              loading={form.formState.isSubmitting}
            >
              Purchase
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function SentryLicensePurchaseForm() {
  const { isConnected, address } = useAccount();
  const { data: balance, isFetching: balanceIsFetching } = useBalance({
    address,
    query: {
      structuralSharing: false,
    },
  });
  const form = useForm<PurchaseFormPayload>({
    defaultValues: {
      quantity: 1,
      promoCode: "",
    },
  });
  const watchedQuantity = form.watch("quantity");
  const watchedPromoCode = form.watch("promoCode");
  const [quantity, setQuantity] = useDebounce(watchedQuantity, 500);
  const [promoCode, setPromoCode] = useDebounce(watchedPromoCode, 500);
  const { data: getLicensePrice, isFetching: getLicensePriceIsFetching } =
    useReadSentryLicenseContractLicensePrice({
      args: [BigInt(1), ""],
      query: {
        enabled: isConnected && quantity > 0,
      },
    });
  const {
    data: getLicensePriceSubTotal,
    isFetching: getLicensePriceSubTotalIsFetching,
  } = useReadSentryLicenseContractLicensePrice({
    args: quantity ? [BigInt(quantity), ""] : undefined,
    query: {
      enabled: isConnected && quantity > 0,
    },
  });

  const {
    data: getLicensePriceTotal,
    isFetching: getLicensePriceTotalIsFetching,
  } = useReadSentryLicenseContractLicensePrice({
    args: (quantity ?? promoCode) ? [BigInt(quantity), promoCode] : undefined,
    query: {
      enabled: isConnected && quantity > 0,
    },
  });
  const { writeContractAsync } = useWriteSentryNodeContractPurchaseLicense();
  const { queryKey } = useReadSubnetContractAddressInfo({
    args: address && [address],
    query: {
      enabled: isConnected,
    },
  });

  useEffect(() => {
    setQuantity(watchedQuantity);
  }, [watchedQuantity, setQuantity]);

  useEffect(() => {
    setPromoCode(promoCode);
  }, [promoCode, setPromoCode]);

  return (
    <PurchaseForm
      form={form}
      onSubmit={async (data) => {
        if (getLicensePriceTotal) {
          await writeContractAsync({
            args: [BigInt(data.quantity), data.promoCode],
            value: getLicensePriceTotal,
          });
          form.reset();

          const queryClient = getQueryClient();
          await queryClient.invalidateQueries({ queryKey });
          toast.success("Sentry license purchased successfully");
        }
      }}
      isConnected={isConnected}
      balance={balance?.value || 0}
      balanceLoading={balanceIsFetching}
      unitPrice={{
        value: formatEther(BigInt(getLicensePrice || 0)),
        loading: getLicensePriceIsFetching,
      }}
      subTotal={{
        value: formatEther(BigInt(getLicensePriceSubTotal || 0)),
        loading: getLicensePriceSubTotalIsFetching,
      }}
      total={{
        value: formatEther(BigInt(getLicensePriceTotal || 0)),
        loading: getLicensePriceTotalIsFetching,
      }}
    />
  );
}

function ValidatorLicensePurchaseForm() {
  const { isConnected, address } = useAccount();
  const { data: balance, isFetching: balanceIsFetching } = useBalance({
    address,
    query: {
      structuralSharing: false,
    },
  });
  const form = useForm<PurchaseFormPayload>({
    defaultValues: {
      quantity: 1,
      promoCode: "",
    },
  });
  const watchedQuantity = form.watch("quantity");
  const watchedPromoCode = form.watch("promoCode");
  const [quantity, setQuantity] = useDebounce(watchedQuantity, 500);
  const [promoCode, setPromoCode] = useDebounce(watchedPromoCode, 500);
  const { data: getLicensePrice, isFetching: getLicensePriceIsFetching } =
    useReadValidatorLicenseContractLicensePrice({
      args: [BigInt(1), ""],
      query: {
        enabled: isConnected && quantity > 0,
      },
    });
  const {
    data: getLicensePriceSubTotal,
    isFetching: getLicensePriceSubTotalIsFetching,
  } = useReadValidatorLicenseContractLicensePrice({
    args: quantity ? [BigInt(quantity), ""] : undefined,
    query: {
      enabled: isConnected && quantity > 0,
    },
  });

  const {
    data: getLicensePriceTotal,
    isFetching: getLicensePriceTotalIsFetching,
  } = useReadValidatorLicenseContractLicensePrice({
    args: (quantity ?? promoCode) ? [BigInt(quantity), promoCode] : undefined,
    query: {
      enabled: isConnected && quantity > 0,
    },
  });
  const { writeContractAsync } = useWriteValidatorNodeContractPurchaseLicense();
  const { queryKey } = useReadSubnetContractAddressInfo({
    args: address && [address],
    query: {
      enabled: isConnected,
    },
  });

  useEffect(() => {
    setQuantity(watchedQuantity);
  }, [watchedQuantity, setQuantity]);

  useEffect(() => {
    setPromoCode(promoCode);
  }, [promoCode, setPromoCode]);

  return (
    <PurchaseForm
      form={form}
      onSubmit={async (data) => {
        if (getLicensePriceTotal) {
          await writeContractAsync({
            args: [BigInt(data.quantity), data.promoCode],
            value: getLicensePriceTotal,
          });
          form.reset();

          const queryClient = getQueryClient();
          await queryClient.invalidateQueries({ queryKey });
          toast.success("Validator license purchased successfully");
        }
      }}
      isConnected={isConnected}
      balance={balance?.value || 0}
      balanceLoading={balanceIsFetching}
      unitPrice={{
        value: formatEther(BigInt(getLicensePrice || 0)),
        loading: getLicensePriceIsFetching,
      }}
      subTotal={{
        value: formatEther(BigInt(getLicensePriceSubTotal || 0)),
        loading: getLicensePriceSubTotalIsFetching,
      }}
      total={{
        value: formatEther(BigInt(getLicensePriceTotal || 0)),
        loading: getLicensePriceTotalIsFetching,
      }}
    />
  );
}

export default function PurchaseLicenseContainer() {
  const searchParams = useSearchParams();
  const typeParams = searchParams.get("type");
  const activeTab = typeParams === "validator" ? "validator" : "sentry";
  const { address, isConnected } = useAccount();
  const { data: getAddressInfo, isLoading: getAddressInfoIsLoading } =
    useReadSubnetContractAddressInfo({
      args: address && [address],
      query: {
        enabled: isConnected,
      },
    });

  const firstPurchasedLicense = useMemo(() => {
    if (!getAddressInfo || getAddressInfo[2].length === 0) {
      return;
    }
    return getAddressInfo[2][0].isValidator ? "validator" : "sentry";
  }, [getAddressInfo]);

  if (getAddressInfoIsLoading) {
    return (
      <main className="px-5 py-10 md:px-20 md:py-20 container mx-auto">
        <Skeleton className="h-[560px]" />
      </main>
    );
  }

  return (
    <main className="px-5 py-10 md:px-20 md:py-20 container mx-auto">
      <div className="flex flex-col flex-wrap xl:flex-row gap-10 lg:gap-12 justify-center items-center">
        <div className="w-full max-w-[562px] relative">
          <Tabs
            value={firstPurchasedLicense ? firstPurchasedLicense : activeTab}
            className="w-full"
          >
            <TabsList
              className={cn(
                "grid w-full grid-cols-2 h-auto py-2 px-5 bg-layout border border-[#28303F] rounded-full",
                firstPurchasedLicense && "grid-cols-1"
              )}
            >
              {firstPurchasedLicense !== "validator" && (
                <TabsTrigger
                  value="sentry"
                  className={cn(
                    "h-12 bg-[#040415] data-[state=active]:bg-primary rounded-full first-of-type:rounded-r-none last-of-type:rounded-l-none font-bold text-sm text-white",
                    firstPurchasedLicense && "!rounded-full"
                  )}
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
              )}
              {firstPurchasedLicense !== "sentry" && (
                <TabsTrigger
                  value="validator"
                  className={cn(
                    "h-12 bg-[#040415] data-[state=active]:bg-primary rounded-full first-of-type:rounded-r-none last-of-type:rounded-l-none font-bold text-sm text-white",
                    firstPurchasedLicense && "!rounded-full"
                  )}
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
              )}
            </TabsList>
            <TabsContent className="mt-3" value="sentry">
              <SentryLicensePurchaseForm />
            </TabsContent>
            <TabsContent className="mt-3" value="validator">
              <ValidatorLicensePurchaseForm />
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
