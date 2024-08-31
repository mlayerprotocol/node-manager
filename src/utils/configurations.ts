export const configurations = {
  app: {
    url: `${process.env.NEXT_PUBLIC_APP_URL || ""}`,
  },
  walletconnect: {
    projectId: `${process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ""}`,
  },
};
