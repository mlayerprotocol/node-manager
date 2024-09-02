import { Address } from "viem";

export const configurations = {
  app: {
    url: `${process.env.NEXT_PUBLIC_APP_URL || ""}`,
  },
  walletconnect: {
    projectId: `${process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ""}`,
  },
  contracts: {
    testnet: {
      token_contract: `${process.env.TESTNET_TOKEN_CONTRACT || ""}`,
      x_token_contract: `${process.env.TESTNET_X_TOKEN_CONTRACT || ""}`,
      chain_info_contract: `${process.env.TESTNET_CHAIN_INFO_CONTRACT || ""}`,
      sentry_node_contract: `${process.env.TESTNET_SENTRY_NODE_CONTRACT || ""}`,
      validator_node_contract: `${process.env.TESTNET_VALIDATOR_NODE_CONTRACT || ""}`,
      subnet_contract: `${process.env.TESTNET_SUBNET_CONTRACT || ""}`,
      validator_license_contract: `${process.env.TESTNET_VALIDATOR_LICENSE_CONTRACT || ""}`,
      sentry_license_contract: `${process.env.TESTNET_SENTRY_LICENSE_CONTRACT || ""}`,
    } as unknown as Record<string, Address>,
  },
};
