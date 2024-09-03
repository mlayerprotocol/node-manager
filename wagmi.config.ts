import { defineConfig, loadEnv } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { baseSepolia } from "wagmi/chains";
import IcmTokenAbi from "./contracts/abis/IcmTokenAbi.json";
import NewtworkAbi from "./contracts/abis/NetworkAbi.json";
import SentryNodeAbi from "./contracts/abis/SentryNodeAbi.json";
import SubnetAbi from "./contracts/abis/SubnetAbi.json";
import NodeLicenseAbi from "./contracts/abis/NodeLicenseAbi.json";
import { Abi } from "viem";

export default defineConfig(async () => {
  loadEnv({
    mode: process.env.NODE_ENV,
    envDir: process.cwd(),
  });
  const { configurations } = await import("./src/utils/configurations");

  return {
    out: "contracts/generated.ts",
    contracts: [
      {
        name: "token_contract",
        abi: IcmTokenAbi as Abi,
        address: {
          [baseSepolia.id]: configurations.contracts.testnet.token_contract,
        },
      },
      {
        name: "x_token_contract",
        abi: IcmTokenAbi as Abi,
        address: {
          [baseSepolia.id]: configurations.contracts.testnet.x_token_contract,
        },
      },
      {
        name: "chain_info_contract",
        abi: NewtworkAbi as Abi,
        address: {
          [baseSepolia.id]:
            configurations.contracts.testnet.chain_info_contract,
        },
      },
      {
        name: "sentry_node_contract",
        abi: SentryNodeAbi as Abi,
        address: {
          [baseSepolia.id]:
            configurations.contracts.testnet.sentry_node_contract,
        },
      },
      {
        name: "validator_node_contract",
        abi: SentryNodeAbi as Abi,
        address: {
          [baseSepolia.id]:
            configurations.contracts.testnet.validator_node_contract,
        },
      },
      {
        name: "subnet_contract",
        abi: SubnetAbi as Abi,
        address: {
          [baseSepolia.id]: configurations.contracts.testnet.subnet_contract,
        },
      },
      {
        name: "validator_license_contract",
        abi: NodeLicenseAbi as Abi,
        address: {
          [baseSepolia.id]:
            configurations.contracts.testnet.validator_license_contract,
        },
      },
      {
        name: "sentry_license_contract",
        abi: NodeLicenseAbi as Abi,
        address: {
          [baseSepolia.id]:
            configurations.contracts.testnet.sentry_license_contract,
        },
      },
    ],
    plugins: [react()],
  };
});
