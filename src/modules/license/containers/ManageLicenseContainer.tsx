"use client";
import React from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { Button } from "@/components/ui/button";
import DelegateLicenseModal from "../components/DelegateLicenseModal";

const DATA: {
  id: string;
  status: string;
  cycleDelegated?: number;
  operatorId?: string;
  msgEarned?: string;
}[] = [
  {
    id: "104",
    status: "delegated",
    cycleDelegated: 1,
    operatorId: "f29lsd0290",
    msgEarned: "3,340",
  },
  {
    id: "105",
    status: "pending",
  },
];

export default function ManageLicenseContainer() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <main className="px-5 py-10 md:px-20 md:py-20 container mx-auto">
      <Table className="xl:table-fixed overflow-x-auto">
        <TableHeader>
          <TableRow className="bg-layout">
            <TableHead className="font-bold text-sm text-[#AEB9E1] py-4 text-center border border-[#28303F] border-r-0 rounded-tl-lg whitespace-nowrap">
              License ID
            </TableHead>
            <TableHead className="font-bold text-sm text-[#AEB9E1] py-4 text-center border border-[#28303F] border-x-0">
              Status
            </TableHead>
            <TableHead className="font-bold text-sm text-[#AEB9E1] py-4 text-center border border-[#28303F] border-x-0 whitespace-nowrap">
              Cycle Delegated
            </TableHead>
            <TableHead className="font-bold text-sm text-[#AEB9E1] py-4 text-center border border-[#28303F] border-x-0 whitespace-nowrap">
              Operator Id
            </TableHead>
            <TableHead className="font-bold text-sm text-[#AEB9E1] py-4 text-center border border-[#28303F] border-x-0 whitespace-nowrap">
              MSG Earned
            </TableHead>
            <TableHead className="font-bold text-sm text-[#AEB9E1] py-4 text-center border border-[#28303F] border-l-0 rounded-tr-lg">
              Operation
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {DATA.map((data) => (
            <TableRow className="bg-layout" key={data.id}>
              <TableCell className="font-normal text-white text-sm text-center">
                {data.id}
              </TableCell>
              <TableCell>
                {data.status === "delegated" ? (
                  <div className="flex items-center justify-center gap-3 text-[#14CA74]">
                    <span>Delegated</span>
                    <IoIosCheckmarkCircle size={20} />
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3 text-[#DD9F00]">
                    <span>Pending</span>
                    <MdOutlineAccessTimeFilled size={20} />
                  </div>
                )}
              </TableCell>
              <TableCell className="text-center">
                {data.cycleDelegated ?? "-"}
              </TableCell>
              <TableCell className="text-center">
                {data.operatorId ?? "-"}
              </TableCell>
              <TableCell className="text-center">
                {data.msgEarned ?? "-"}
              </TableCell>
              <TableCell className="text-center py-4">
                {data.status === "delegated" ? (
                  <Button className="w-full rounded-full" variant="secondary">
                    Undelegate
                  </Button>
                ) : (
                  <Button
                    className="w-full rounded-full"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Delegate
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DelegateLicenseModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </main>
  );
}
