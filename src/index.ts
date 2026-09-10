/**
 * @param promise The asynchronous operation to wrap.
 * @template T The type of the resolved data.
 * @template E The expected error type (defaults to standard Error).
 * @returns A promise that resolves to a tuple of [E, null] or [null, T].
 */
export async function safe<T, E extends Error = Error>(
  promise: Promise<T>
): Promise<[E, null] | [null, T]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    if (error instanceof Error) {
      return [error as E, null];
    }
    return [new Error(String(error)) as unknown as E, null];
  }
}

/**
 * @param fn The synchronous function or execution block to wrap.
 * @template T The type of the returned data.
 * @template E The expected error type (defaults to standard Error).
 * @returns A tuple of [E, null] or [null, T].
 */
export function safeSync<T, E extends Error = Error>(
  fn: () => T
): [E, null] | [null, T] {
  try {
    const data = fn();
    return [null, data];
  } catch (error) {
    if (error instanceof Error) {
      return [error as E, null];
    }
    return [new Error(String(error)) as unknown as E, null];
  }
}

/** 
 * @param promises An array of asynchronous operations to wrap.
 * @template T The type of the resolved data.
 * @template E The expected error type (defaults to standard Error).
 * @returns A promise that resolves to an array of tuples.
 */
export async function safeAll<T, E extends Error = Error>(
  promises: Promise<T>[]
): Promise<Array<[E, null] | [null, T]>> {
  return Promise.all(promises.map(promise => safe<T, E>(promise)));
}