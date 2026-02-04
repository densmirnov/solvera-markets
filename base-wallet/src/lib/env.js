export function getRpcUrlsFromEnv(defaults) {
  const raw = process.env.BASE_RPC_URLS || process.env.BASE_RPC_URL || '';
  const urls = raw
    .split(/[,\s]+/)
    .map((value) => value.trim())
    .filter(Boolean);

  return urls.length > 0 ? urls : defaults;
}

export function getWalletPathFromEnv(defaultPath) {
  return process.env.BASE_WALLET_PATH || defaultPath;
}
