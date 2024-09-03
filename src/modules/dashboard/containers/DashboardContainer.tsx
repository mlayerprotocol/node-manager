"use client";
import React, { useMemo } from "react";
import StatCard, { StatCardProps } from "../components/StatCard";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { FaRecycle, FaWallet } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";
import { useAccount } from "wagmi";
import {
  useReadChainInfoContractGetCurrentCycle,
  useReadSubnetContractAddressInfo,
} from "@mlayer-contracts";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ImSpinner } from "react-icons/im";

// const chartData = [
//   { status: "delegated", percentage: 100, fill: "var(--color-delegated)" },
//   { status: "pending", percentage: 0, fill: "var(--color-pending)" },
//   // { status: "free", percentage: 0, fill: "var(--color-free)" },
// ];

const chartConfig = {
  delegated: {
    label: "Delegated",
    color: "#AEB9E1",
  },
  pending: {
    label: "Pending",
    color: "#2F5ED2",
  },
  // free: {
  //   label: "Free",
  //   color: "#5812C9",
  // },
} satisfies ChartConfig;

function getPercentage(value: number, total: number) {
  if (total === 0) {
    return 0;
  }
  return (value / total) * 100;
}

export default function DashboardContainer() {
  const { address, isConnected } = useAccount();
  const { data: getAddressInfo, isLoading: getAddressInfoIsLoading } =
    useReadSubnetContractAddressInfo({
      args: address && [address],
      query: {
        enabled: isConnected,
      },
    });
  const { data: getCurrentCycle, isLoading: getCurrentCycleIsLoading } =
    useReadChainInfoContractGetCurrentCycle({
      query: {
        enabled: isConnected,
      },
    });

  const licenses = useMemo(() => {
    if (!getAddressInfo) {
      return {
        total: 0,
        pending: 0,
        delegated: 0,
      };
    }
    return getAddressInfo[2].reduce<{ total: 0; pending: 0; delegated: 0 }>(
      (acc, license) => {
        acc.total += 1;
        if (Boolean(license.delegatedTo) && license.delegatedTo !== "0x") {
          acc.delegated += 1;
        } else {
          acc.pending += 1;
        }
        return acc;
      },
      {
        total: 0,
        pending: 0,
        delegated: 0,
      }
    );
  }, [getAddressInfo]);

  const legend = useMemo(() => {
    return (
      <ul className="list-none space-y-5">
        {Object.entries(chartConfig).map(([key, config]) => (
          <li key={key} className="flex items-center gap-3">
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: config.color }}
            ></span>
            <span className="text-white text-sm">{config.label}</span>
            <span className="text-white text-sm">
              (
              {key === "delegated"
                ? getPercentage(licenses.delegated, licenses.total)
                : getPercentage(licenses.pending, licenses.total)}
              %)
            </span>
          </li>
        ))}
      </ul>
    );
  }, [licenses]);

  return (
    <main className="px-5 py-10 md:px-20 md:py-20 container mx-auto">
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
        <StatCard
          title="xMSG Earned"
          value={`${getAddressInfo?.[0] || 0}`}
          meta={{
            title: "Previous Cycle",
            ...(isConnected
              ? {
                  value: `${getCurrentCycle ? `${Number(getCurrentCycle) - 1}` : 1}`,
                }
              : { requiresConnection: true }),
          }}
          icon={<HiArrowUturnLeft size={20} />}
          loading={getAddressInfoIsLoading || getCurrentCycleIsLoading}
        />

        <StatCard
          title="xMSG Accrued"
          value={`${getAddressInfo?.[1] || 0}`}
          meta={{
            title: "Current Cycle",
            ...(isConnected
              ? {
                  value: `${getCurrentCycle ? `${Number(getCurrentCycle)}` : 1}`,
                }
              : { requiresConnection: true }),
          }}
          icon={<FaRecycle size={20} />}
          loading={getAddressInfoIsLoading || getCurrentCycleIsLoading}
        />

        <StatCard
          title="xMSG Claimable"
          value={`${getAddressInfo?.[3] || 0}`}
          icon={<FaWallet size={20} />}
          loading={getAddressInfoIsLoading}
        />
      </div>

      <div className="py-20 flex flex-col gap-10 lg:gap-14 lg:flex-row items-center justify-center">
        <Card className="py-4 px-8 w-full lg:w-max">
          <CardHeader className="p-0">
            <CardTitle>
              {getAddressInfoIsLoading ? (
                <Skeleton className="w-60 h-6" />
              ) : (
                `${licenses.delegated} of ${licenses.total} Licenses Delegated`
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-7">
            <div className="flex items-center justify-between gap-10 lg:gap-20">
              <Button
                variant="link"
                className="text-primary h-auto p-0 text-sm"
                asChild
              >
                <Link href="/license/purchase">Purchase license</Link>
              </Button>

              <Button
                variant="link"
                className="text-primary h-auto p-0 text-sm"
                asChild
              >
                <Link href="/license/manage">Manage license</Link>
              </Button>
            </div>
            <div className="mt-7">
              {licenses.total > 0 ? (
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent valuePostfix="%" hideLabel />
                      }
                    />
                    <Pie
                      data={[
                        {
                          status: "delegated",
                          percentage: getPercentage(
                            licenses.delegated,
                            licenses.total
                          ),
                        },
                        {
                          status: "pending",
                          percentage: getPercentage(
                            licenses.pending,
                            licenses.total
                          ),
                        },
                      ]}
                      dataKey="percentage"
                      nameKey="status"
                      innerRadius={60}
                      strokeWidth={5}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-2xl font-bold"
                                >
                                  100%
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              ) : (
                <div className="w-full aspect-square flex justify-center items-center max-h-[250px]">
                  {getAddressInfoIsLoading ? (
                    <ImSpinner className="text-5xl animate-spin duration-1000" />
                  ) : (
                    <Badge variant="outline">
                      {isConnected
                        ? "No License purchased"
                        : "Connect wallet to fetch chart"}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        {!getAddressInfoIsLoading && (
          <div className="lg:my-auto lg:mb-9">{legend}</div>
        )}
      </div>
    </main>
  );
}
