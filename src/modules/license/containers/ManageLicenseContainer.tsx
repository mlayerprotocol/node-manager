"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { IoIosCheckmarkCircle } from "react-icons/io";
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdOutlineAccessTimeFilled,
} from "react-icons/md";
import { Button } from "@/components/ui/button";
import DelegateLicenseModal from "../components/DelegateLicenseModal";
import { useAccount } from "wagmi";
import {
  useReadSubnetContractAddressInfo,
  useWriteSentryNodeContractDeRegisterNodeOperator,
  useWriteValidatorNodeContractDeRegisterNodeOperator,
} from "@mlayer-contracts";
import RCPagination from "rc-pagination";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ImSpinner } from "react-icons/im";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa6";

const PAGE_SIZE = 10;

export default function ManageLicenseContainer() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [undelegdatePopoverOpen, setUndelegatePopoverOpen] =
    React.useState(false);
  const { address, isConnected } = useAccount();
  const {
    data: getAddressInfo,
    isLoading: getAddressInfoIsLoading,
    queryKey,
  } = useReadSubnetContractAddressInfo({
    args: address && [address],
    query: {
      enabled: isConnected,
    },
  });
  const [licenseIdToDelegate, setLicenseIdToDelegate] = React.useState<
    { id: BigInt; type: "sentry" | "validator" } | undefined
  >();
  const {
    writeContract: deRegisterSentryOperator,
    isPending: deRegisterSentryOperatorIsPending,
  } = useWriteSentryNodeContractDeRegisterNodeOperator();
  const {
    writeContract: deRegisterValidatorOperator,
    isPending: deRegisterValidatorOperatorIsPending,
  } = useWriteValidatorNodeContractDeRegisterNodeOperator();
  const queryClient = useQueryClient();

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
            {/* <TableHead className="font-bold text-sm text-[#AEB9E1] py-4 text-center border border-[#28303F] border-x-0 whitespace-nowrap">
              Cycle Delegated
            </TableHead> */}
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
          {!isConnected && (
            <TableRow className="bg-layout">
              <TableCell
                colSpan={5}
                className="text-center text-white px-10 py-20"
              >
                Connect wallet to fetch license
              </TableCell>
            </TableRow>
          )}
          {getAddressInfoIsLoading && (
            <TableRow className="bg-layout">
              <TableCell colSpan={5}>
                <div className="text-white px-10 py-20 flex justify-center items-center">
                  <ImSpinner className="text-3xl animate-spin duration-1000" />
                </div>
              </TableCell>
            </TableRow>
          )}
          {getAddressInfo && getAddressInfo[2].length === 0 && (
            <TableRow className="bg-layout">
              <TableCell
                colSpan={5}
                className="text-center text-white px-10 py-20"
              >
                No license purchased
              </TableCell>
            </TableRow>
          )}
          {getAddressInfo?.[2]
            .slice(
              PAGE_SIZE * (currentPage - 1),
              PAGE_SIZE * (currentPage - 1) + PAGE_SIZE
            )
            .map((licenseInfo) => (
              <TableRow className="bg-layout" key={licenseInfo.id}>
                <TableCell className="font-normal text-white text-sm text-center">
                  {licenseInfo.id.toString()}
                </TableCell>
                <TableCell>
                  {licenseInfo.delegatedTo !== "0x" ? (
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
                {/* <TableCell className="text-center">
                {data.cycleDelegated ?? "-"}
              </TableCell> */}
                <TableCell className="text-center">
                  {licenseInfo.delegatedTo.replace("0x", "") ? (
                    <CopyToClipboard
                      text={licenseInfo.delegatedTo.replace("0x", "")}
                      onCopy={() => {
                        toast.info("Operator ID copied successfully", {
                          position: "top-center",
                        });
                      }}
                    >
                      <Button
                        className="p-0 h-auto !no-underline text-white"
                        variant="link"
                      >
                        <span>
                          {licenseInfo.delegatedTo
                            .replace("0x", "")
                            .slice(0, 4)}
                          ...
                          {licenseInfo.delegatedTo.replace("0x", "").slice(-4)}
                        </span>
                        <FaRegCopy className="ml-2" size={16} />
                      </Button>
                    </CopyToClipboard>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {licenseInfo.earned || "-"}
                </TableCell>
                <TableCell className="text-center py-4">
                  {licenseInfo.delegatedTo !== "0x" ? (
                    <Popover
                      open={undelegdatePopoverOpen}
                      onOpenChange={setUndelegatePopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          className="w-full rounded-full"
                          variant="secondary"
                        >
                          Undelegate
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[400px] p-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">
                              Are you sure?
                            </h3>
                            <p className="text-muted-foreground">
                              Are you sure you want undelegate this license?
                            </p>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              onClick={() => setUndelegatePopoverOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => {
                                if (licenseInfo.isValidator) {
                                  deRegisterValidatorOperator(
                                    {
                                      args: [
                                        [BigInt(licenseInfo.id.toString())],
                                      ],
                                    },
                                    {
                                      onSuccess() {
                                        toast.success(
                                          "License undelegated successfully"
                                        );
                                        queryClient.invalidateQueries({
                                          queryKey,
                                        });
                                        setUndelegatePopoverOpen(false);
                                      },
                                    }
                                  );
                                } else {
                                  deRegisterSentryOperator(
                                    {
                                      args: [
                                        [BigInt(licenseInfo.id.toString())],
                                      ],
                                    },
                                    {
                                      onSuccess() {
                                        toast.success(
                                          "License undelegated successfully"
                                        );
                                        queryClient.invalidateQueries({
                                          queryKey,
                                        });
                                        setUndelegatePopoverOpen(false);
                                      },
                                    }
                                  );
                                }
                              }}
                              loading={
                                deRegisterSentryOperatorIsPending ||
                                deRegisterValidatorOperatorIsPending
                              }
                            >
                              Confirm
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <Button
                      className="w-full rounded-full"
                      onClick={() =>
                        setLicenseIdToDelegate({
                          id: licenseInfo.id,
                          type: licenseInfo.isValidator
                            ? "validator"
                            : "sentry",
                        })
                      }
                    >
                      Delegate
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div>
        <Pagination>
          <PaginationContent className="flex items-center justify-end py-5 w-full">
            <RCPagination
              current={currentPage}
              total={getAddressInfo?.[2].length}
              pageSize={PAGE_SIZE}
              onChange={setCurrentPage}
              className="flex gap-2"
              itemRender={(page, type) => {
                if (type === "prev") {
                  return (
                    <PaginationItem>
                      <Button
                        className="w-10 h-10 p-0"
                        variant="secondary"
                        disabled={currentPage <= 1}
                      >
                        <MdArrowBackIosNew size={20} />
                      </Button>
                    </PaginationItem>
                  );
                }
                if (type === "next") {
                  return (
                    <PaginationItem>
                      <Button
                        className="w-10 h-10 p-0"
                        variant="secondary"
                        disabled={
                          getAddressInfo &&
                          currentPage >=
                            Math.ceil(getAddressInfo[2].length / PAGE_SIZE)
                        }
                      >
                        <MdArrowForwardIos size={20} />
                      </Button>
                    </PaginationItem>
                  );
                }
                if (type === "jump-prev" || type === "jump-next") {
                  return (
                    <PaginationItem>
                      <Button className="w-10 h-10 p-0" variant="secondary">
                        ...
                      </Button>
                    </PaginationItem>
                  );
                }
                if (type === "page") {
                  return (
                    <PaginationItem>
                      <Button
                        className="w-10 h-10 p-0"
                        variant={page === currentPage ? "default" : "secondary"}
                      >
                        {page}
                      </Button>
                    </PaginationItem>
                  );
                }
                return null;
              }}
              hideOnSinglePage
            />
          </PaginationContent>
        </Pagination>
      </div>
      <DelegateLicenseModal
        license={licenseIdToDelegate}
        open={Boolean(licenseIdToDelegate)}
        onOpenChange={(open) => !open && setLicenseIdToDelegate(undefined)}
      />
    </main>
  );
}
