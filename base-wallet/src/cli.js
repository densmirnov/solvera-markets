#!/usr/bin/env node
import { parseAbi, formatEther, formatUnits, parseEther, parseUnits } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import {
  parseArgs,
  coerceArg,
  ensureAddress,
  formatError,
  formatJson,
} from "./lib/cli.js";
import {
  resolveWalletPath,
  resolveWalletPackDir,
  writeWalletPack,
} from "./lib/storage.js";
import {
  createWallet,
  getWalletInfo,
  hasWallet,
  persistWallet,
  getAccount,
} from "./lib/wallet.js";
import { getPublicClient, getWalletClient } from "./lib/clients.js";
import { erc20Abi } from "./lib/erc20.js";
import {
  DEFAULT_CHAIN_KEY,
  normalizeChainKey,
  resolveChainConfig,
} from "./lib/config.js";
import { getChainKeyFromEnv, getPrivateKeyFromEnv } from "./lib/env.js";

function resolveChainKey(flags) {
  return normalizeChainKey(flags.chain || getChainKeyFromEnv() || DEFAULT_CHAIN_KEY);
}

function printHelp(chain) {
  console.log(`Solvera Wallet CLI

Commands:
  setup [--force] [--wallet <path>] [--json] [--chain <status-sepolia|base>]
  address [--wallet <path>] [--private-key <hex>] [--json] [--chain <status-sepolia|base>]
  balance [token] [--address <addr>] [--wallet <path>] [--private-key <hex>] [--json] [--rpc <url>] [--chain <status-sepolia|base>]
  send <to> <amount> [--token <addr>] [--wallet <path>] [--private-key <hex>] [--json] [--rpc <url>] [--chain <status-sepolia|base>]
  tx --to <addr> --data <hex> [--value <eth>] [--value-wei <wei>] [--wallet <path>] [--private-key <hex>] [--json] [--rpc <url>] [--chain <status-sepolia|base>]
  contract <contract> <signature> [args...] [--read] [--value <eth>] [--wallet <path>] [--private-key <hex>] [--json] [--rpc <url>] [--chain <status-sepolia|base>]
  pack [--out <dir>] [--wallet <path>] [--private-key <hex>] [--json] [--chain <status-sepolia|base>]

Notes:
  - Default chain: ${chain.name} (chainId ${chain.id})
  - Wallet file default: ~/.solvera-wallet.json (legacy ~/.solvera-base-wallet.json still supported)
  - Wallet pack default: ~/.solvera-wallet-pack
  - Private key overrides: --private-key, DEPLOYER_PRIVATE_KEY, STATUS_PRIVATE_KEY, STATUS_DEPLOYER_PRIVATE_KEY, BASE_DEPLOYER_PRIVATE_KEY, BASE_PRIVATE_KEY, PRIVATE_KEY
`);
}

function getFunctionName(signature) {
  const cleaned = signature.replace(/^function\s+/, "").trim();
  return cleaned.split("(")[0];
}

function resolvePrivateKey(flags) {
  const inline = flags["private-key"] || getPrivateKeyFromEnv(resolveChainKey(flags));
  if (!inline) return null;
  const normalized = inline.startsWith("0x") ? inline : `0x${inline}`;
  if (!normalized.startsWith("0x") || normalized.length !== 66) {
    throw new Error("Invalid private key format. Expected 0x-prefixed 32-byte hex.");
  }
  return normalized;
}

function resolveAccountOrThrow(flags, walletPath) {
  const privateKey = resolvePrivateKey(flags);
  if (privateKey) {
    return privateKeyToAccount(privateKey);
  }
  if (hasWallet(walletPath)) {
    return getAccount(walletPath);
  }
  throw new Error("Wallet not found. Run setup first or provide --private-key.");
}

function resolveAddress(flags, walletPath) {
  const privateKey = resolvePrivateKey(flags);
  if (privateKey) {
    return privateKeyToAccount(privateKey).address;
  }
  return getWalletInfo(walletPath)?.address || null;
}

async function main() {
  const { flags, positionals } = parseArgs(process.argv.slice(2));
  const command = positionals[0];
  const args = positionals.slice(1);
  const json = Boolean(flags.json);
  const chainKey = resolveChainKey(flags);
  const chain = resolveChainConfig(chainKey);
  const rpcOverride = flags.rpc;
  const walletPath = resolveWalletPath(flags.wallet);

  if (!command || command === "help" || flags.help) {
    printHelp(chain);
    return;
  }

  if (command === "setup") {
    if (hasWallet(walletPath) && !flags.force) {
      const info = getWalletInfo(walletPath);
      const payload = {
        error: "Wallet already exists",
        wallet: info,
        hint: "Use --force to overwrite.",
      };
      if (json) {
        console.log(formatJson(payload));
      } else {
        console.error("Wallet already exists.");
        console.error(`Address: ${info?.address}`);
        console.error("Use --force to overwrite.");
      }
      process.exitCode = 1;
      return;
    }

    const wallet = createWallet();
    persistWallet(walletPath, wallet);
    const output = {
      ok: true,
      chain: chain.name,
      wallet: {
        address: wallet.address,
        createdAt: wallet.createdAt,
        path: walletPath,
      },
    };
    if (json) {
      console.log(formatJson(output));
    } else {
      console.log("Wallet created.");
      console.log(`Chain: ${chain.name}`);
      console.log(`Address: ${wallet.address}`);
      console.log(`Created: ${wallet.createdAt}`);
      console.log(`Path: ${walletPath}`);
    }
    return;
  }

  if (command === "pack") {
    const outDir = resolveWalletPackDir(flags.out);
    const privateKey = resolvePrivateKey(flags);
    let wallet = null;

    if (privateKey) {
      const account = privateKeyToAccount(privateKey);
      wallet = {
        address: account.address,
        privateKey,
        createdAt: new Date().toISOString(),
      };
    } else if (hasWallet(walletPath)) {
      const info = getWalletInfo(walletPath);
      const account = getAccount(walletPath);
      wallet = {
        address: info?.address || account.address,
        privateKey: account.privateKey,
        createdAt: info?.createdAt || new Date().toISOString(),
      };
    } else {
      wallet = createWallet();
    }

    const savedPath = writeWalletPack(outDir, wallet);
    const payload = {
      ok: true,
      chain: chain.name,
      outDir,
      wallet: {
        address: wallet.address,
        createdAt: wallet.createdAt,
        path: savedPath,
      },
      warning: "Do not commit wallet packs; they contain a private key.",
    };
    if (json) {
      console.log(formatJson(payload));
    } else {
      console.log("Wallet pack created.");
      console.log(`Chain: ${chain.name}`);
      console.log(`Address: ${wallet.address}`);
      console.log(`Created: ${wallet.createdAt}`);
      console.log(`Path: ${savedPath}`);
      console.log("Warning: Do not commit wallet packs to git.");
    }
    return;
  }

  if (command === "address") {
    const address = resolveAddress(flags, walletPath);
    if (!address) {
      throw new Error("Wallet not found. Run setup first or provide --private-key.");
    }
    if (json) {
      console.log(formatJson({ ok: true, address, chain: chain.name }));
    } else {
      console.log(address);
    }
    return;
  }

  if (command === "balance") {
    const token = flags.token || args[0];
    const address = flags.address || resolveAddress(flags, walletPath);
    if (!address) {
      throw new Error(
        "No address provided. Use --address, --private-key, or create a wallet first.",
      );
    }

    ensureAddress(address, "Address");
    const { client, rpcUrl, chain } = await getPublicClient(chainKey, rpcOverride);

    if (!token) {
      const balance = await client.getBalance({ address });
      const payload = {
        ok: true,
        address,
        chain: chain.name,
        chainId: chain.id,
        rpcUrl,
        balance: {
          wei: balance.toString(),
          eth: formatEther(balance),
        },
      };
      if (json) {
        console.log(formatJson(payload));
      } else {
        console.log(`Chain: ${chain.name}`);
        console.log(`Address: ${address}`);
        console.log(`Balance: ${formatEther(balance)} ETH`);
      }
      return;
    }

    ensureAddress(token, "Token address");
    const [decimals, symbol, rawBalance] = await Promise.all([
      client.readContract({
        address: token,
        abi: erc20Abi,
        functionName: "decimals",
      }),
      client.readContract({
        address: token,
        abi: erc20Abi,
        functionName: "symbol",
      }),
      client.readContract({
        address: token,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address],
      }),
    ]);

    const payload = {
      ok: true,
      address,
      token,
      chain: chain.name,
      chainId: chain.id,
      rpcUrl,
      balance: {
        raw: rawBalance.toString(),
        formatted: formatUnits(rawBalance, decimals),
        symbol,
      },
    };

    if (json) {
      console.log(formatJson(payload));
    } else {
      console.log(`Chain: ${chain.name}`);
      console.log(`Address: ${address}`);
      console.log(`Token: ${symbol}`);
      console.log(`Balance: ${formatUnits(rawBalance, decimals)}`);
    }
    return;
  }

  if (command === "send") {
    const to = args[0];
    const amount = args[1];
    const token = flags.token;

    if (!to || !amount) {
      throw new Error("Usage: send <to> <amount> [--token <addr>]");
    }
    ensureAddress(to, "Recipient");

    const account = resolveAccountOrThrow(flags, walletPath);
    const { client: publicClient } = await getPublicClient(chainKey, rpcOverride);
    const { client: walletClient, chain } = await getWalletClient(
      account,
      chainKey,
      rpcOverride,
    );

    if (!token) {
      const value = parseEther(amount);
      const balance = await publicClient.getBalance({ address: account.address });
      if (balance < value) {
        throw new Error("Insufficient ETH balance.");
      }
      const hash = await walletClient.sendTransaction({ to, value });
      const payload = {
        ok: true,
        chain: chain.name,
        hash,
        explorer: `${chain.blockExplorers.default.url}/tx/${hash}`,
      };
      if (json) {
        console.log(formatJson(payload));
      } else {
        console.log(`Tx: ${hash}`);
        console.log(`Explorer: ${payload.explorer}`);
      }
      return;
    }

    ensureAddress(token, "Token address");
    const [decimals, balance] = await Promise.all([
      publicClient.readContract({
        address: token,
        abi: erc20Abi,
        functionName: "decimals",
      }),
      publicClient.readContract({
        address: token,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account.address],
      }),
    ]);
    const amountWei = parseUnits(amount, decimals);
    if (balance < amountWei) {
      throw new Error("Insufficient token balance.");
    }
    const hash = await walletClient.writeContract({
      address: token,
      abi: erc20Abi,
      functionName: "transfer",
      args: [to, amountWei],
    });
    const payload = {
      ok: true,
      chain: chain.name,
      hash,
      explorer: `${chain.blockExplorers.default.url}/tx/${hash}`,
    };
    if (json) {
      console.log(formatJson(payload));
    } else {
      console.log(`Tx: ${hash}`);
      console.log(`Explorer: ${payload.explorer}`);
    }
    return;
  }

  if (command === "tx") {
    const to = flags.to || args[0];
    const data = flags.data || args[1];
    const valueEth = flags.value;
    const valueWei = flags["value-wei"];

    if (!to || !data) {
      throw new Error("Usage: tx --to <addr> --data <hex> [--value <eth>]");
    }
    ensureAddress(to, "Recipient");

    const account = resolveAccountOrThrow(flags, walletPath);
    const { client: walletClient, chain } = await getWalletClient(
      account,
      chainKey,
      rpcOverride,
    );

    let value = 0n;
    if (valueWei) {
      value = BigInt(valueWei);
    } else if (valueEth) {
      value = parseEther(String(valueEth));
    }

    const hash = await walletClient.sendTransaction({ to, data, value });
    const payload = {
      ok: true,
      chain: chain.name,
      hash,
      explorer: `${chain.blockExplorers.default.url}/tx/${hash}`,
    };
    if (json) {
      console.log(formatJson(payload));
    } else {
      console.log(`Tx: ${hash}`);
      console.log(`Explorer: ${payload.explorer}`);
    }
    return;
  }

  if (command === "contract") {
    const contract = args[0];
    const signature = args[1];
    const callArgs = args.slice(2).map(coerceArg);

    if (!contract || !signature) {
      throw new Error("Usage: contract <contract> <signature> [args...]");
    }
    ensureAddress(contract, "Contract address");

    const normalizedSignature = signature.startsWith("function")
      ? signature
      : `function ${signature}`;
    const abi = parseAbi([normalizedSignature]);
    const functionName = getFunctionName(signature);
    const readOnly = Boolean(flags.read || flags.view);

    if (readOnly) {
      const { client } = await getPublicClient(chainKey, rpcOverride);
      const result = await client.readContract({
        address: contract,
        abi,
        functionName,
        args: callArgs,
      });
      if (json) {
        console.log(formatJson({ ok: true, chain: chain.name, result }));
      } else {
        console.log(result);
      }
      return;
    }

    const account = resolveAccountOrThrow(flags, walletPath);
    const { client: walletClient, chain } = await getWalletClient(
      account,
      chainKey,
      rpcOverride,
    );

    let value = 0n;
    if (flags.value) {
      value = parseEther(String(flags.value));
    }

    const hash = await walletClient.writeContract({
      address: contract,
      abi,
      functionName,
      args: callArgs,
      value,
    });
    const payload = {
      ok: true,
      chain: chain.name,
      hash,
      explorer: `${chain.blockExplorers.default.url}/tx/${hash}`,
    };
    if (json) {
      console.log(formatJson(payload));
    } else {
      console.log(`Tx: ${hash}`);
      console.log(`Explorer: ${payload.explorer}`);
    }
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

main().catch((error) => {
  const message = formatError(error);
  console.error(message);
  process.exitCode = 1;
});
