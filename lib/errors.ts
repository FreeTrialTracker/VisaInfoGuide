export function isTransientError(err: unknown): boolean {
  if (!err) return false;

  const msg = (() => {
    if (err instanceof Error) return err.message.toLowerCase();
    if (typeof err === 'string') return err.toLowerCase();
    return String(err).toLowerCase();
  })();

  const transientSignals = [
    'timeout',
    'timed out',
    'aborted',
    'abort',
    'network',
    'econnreset',
    'econnrefused',
    'enotfound',
    'etimedout',
    'fetch failed',
    'connection refused',
    'socket hang up',
    'unavailable',
    '503',
    '502',
    '429',
    'too many requests',
    'internal server error',
    'upstream',
    'gateway',
    'rpc_error:',
    'db_error:',
    'permission denied',
    'insufficient_privilege',
    'jwt expired',
    'connection terminated',
    'pool is full',
  ];

  return transientSignals.some(signal => msg.includes(signal));
}

export type DataResult<T> =
  | { ok: true; data: T }
  | { ok: false; transient: boolean };

export async function safeLoad<T>(
  fn: () => Promise<T | null>
): Promise<DataResult<T>> {
  try {
    const data = await fn();
    if (data === null || data === undefined) {
      return { ok: false, transient: false };
    }
    return { ok: true, data };
  } catch (err) {
    return { ok: false, transient: isTransientError(err) };
  }
}
