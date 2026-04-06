export function getChainKeyFromEnv() {
  return (
    process.env.SOLVERA_CHAIN ||
    process.env.NETWORK_NAME ||
    process.env.CHAIN ||
    ""
  );
}

export function getRpcUrlsFromEnv(defaults, chainKey) {
  const raw =
    chainKey === "base"
      ? process.env.BASE_RPC_URLS ||
        process.env.BASE_RPC_URL ||
        process.env.SOLVERA_RPC_URLS ||
        process.env.SOLVERA_RPC_URL ||
        process.env.RPC_URLS ||
        process.env.RPC_URL ||
        ""
      : process.env.STATUS_RPC_URLS ||
        process.env.STATUS_RPC_URL ||
        process.env.SOLVERA_RPC_URLS ||
        process.env.SOLVERA_RPC_URL ||
        process.env.RPC_URLS ||
        process.env.RPC_URL ||
        process.env.BASE_RPC_URLS ||
        process.env.BASE_RPC_URL ||
        "";

  const urls = raw
    .split(/[,\s]+/)
    .map((value) => value.trim())
    .filter(Boolean);

  return urls.length > 0 ? urls : defaults;
}

export function getWalletPathFromEnv(defaultPath) {
  return (
    process.env.SOLVERA_WALLET_PATH ||
    process.env.STATUS_WALLET_PATH ||
    process.env.BASE_WALLET_PATH ||
    defaultPath
  );
}

export function getPrivateKeyFromEnv(chainKey) {
  const chainSpecific =
    chainKey === "base"
      ? process.env.BASE_PRIVATE_KEY || process.env.BASE_DEPLOYER_PRIVATE_KEY
      : process.env.STATUS_PRIVATE_KEY ||
        process.env.STATUS_DEPLOYER_PRIVATE_KEY ||
        process.env.BASE_DEPLOYER_PRIVATE_KEY;

  return (
    process.env.DEPLOYER_PRIVATE_KEY ||
    chainSpecific ||
    process.env.BASE_DEPLOYER_PRIVATE_KEY ||
    process.env.BASE_PRIVATE_KEY ||
    process.env.PRIVATE_KEY ||
    null
  );
}
