import { isAddress } from 'viem';

export function parseArgs(argv) {
  const flags = {};
  const positionals = [];

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        flags[key] = next;
        i += 1;
      } else {
        flags[key] = true;
      }
    } else {
      positionals.push(arg);
    }
  }

  return { flags, positionals };
}

export function formatError(error) {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

export function coerceArg(value) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;
  if (value === 'undefined') return undefined;
  if (value.startsWith('0x')) return value;
  if (/^\d+$/.test(value)) return BigInt(value);
  return value;
}

export function ensureAddress(value, label) {
  if (!isAddress(value)) {
    throw new Error(`${label} is not a valid address.`);
  }
}

export function formatJson(payload) {
  return JSON.stringify(payload, null, 2);
}
