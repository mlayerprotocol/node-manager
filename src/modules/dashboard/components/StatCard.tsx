import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type StatCardProps = {
  title: string;
  value: string;
  meta?: {
    title: string;
    value: string;
  };
  icon: React.ReactNode;
};

export default function StatCard({ title, value, meta, icon }: StatCardProps) {
  return (
    <Card className="border border-[#28303F] rounded-lg bg-[#101020]">
      <CardHeader>
        <CardTitle className="font-bold text-base text-primary">
          {title}
        </CardTitle>
        <CardContent className="p-0 mt-2 pb-7">
          <p className="font-bold text-2xl text-white">{value}</p>
        </CardContent>
        <CardFooter className="p-0 flex items-center justify-between">
          {meta && (
            <div>
              <strong className="text-sm text-[#AEB9E1] font-bold">
                {meta.title}
              </strong>
              <p className="text-sm text-white font-bold">{meta.value}</p>
            </div>
          )}
          <Button className="bg-gradient-texture w-10 h-10 p-0 ml-auto" asChild>
            <span>{icon}</span>
          </Button>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
