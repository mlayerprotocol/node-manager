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

const STATS: StatCardProps[] = [
  {
    title: "xMSG Earned",
    value: "23,2300",
    meta: {
      title: "Previous Cycle",
      value: "320023",
    },
    icon: <HiArrowUturnLeft size={20} />,
  },
  {
    title: "xMSG Accrued",
    value: "3,2300",
    meta: {
      title: "Current Cycle",
      value: "320024",
    },
    icon: <FaRecycle size={20} />,
  },
  {
    title: "xMSG Claimable",
    value: "3,2300",
    icon: <FaWallet size={20} />,
  },
];

const chartData = [
  { status: "delegated", percentage: 100, fill: "var(--color-delegated)" },
  { status: "pending", percentage: 0, fill: "var(--color-pending)" },
  { status: "free", percentage: 0, fill: "var(--color-free)" },
];

const chartConfig = {
  delegated: {
    label: "Delegated",
    color: "#AEB9E1",
  },
  pending: {
    label: "Pending",
    color: "#2F5ED2",
  },
  free: {
    label: "Free",
    color: "#5812C9",
  },
} satisfies ChartConfig;

export default function DashboardContainer() {
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
              ({chartData.find((data) => data.status === key)?.percentage}
              %)
            </span>
          </li>
        ))}
      </ul>
    );
  }, []);

  return (
    <main className="px-5 py-10 md:px-20 md:py-20 container mx-auto">
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
        {STATS.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="py-20 flex flex-col gap-10 lg:gap-14 lg:flex-row items-center justify-center">
        <Card className="py-4 px-8 w-full lg:w-max">
          <CardHeader className="p-0">
            <CardTitle>30 of 30 Licenses Delegated</CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-7">
            <div className="flex items-center justify-between gap-10 lg:gap-20">
              <Button
                variant="link"
                className="text-primary h-auto p-0 text-sm"
                asChild
              >
                <Link href="/purchase-license">Purchase license</Link>
              </Button>

              <Button
                variant="link"
                className="text-primary h-auto p-0 text-sm"
                asChild
              >
                <Link href="/manage-license">Manage license</Link>
              </Button>
            </div>
            <div className="mt-7">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent valuePostfix="%" hideLabel />}
                  />
                  <Pie
                    data={chartData}
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
            </div>
          </CardContent>
        </Card>
        <div className="lg:my-auto lg:mb-9">{legend}</div>
      </div>
    </main>
  );
}
