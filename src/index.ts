/**
 * Wraps an asynchronous promise to return a Go-style tuple: [error, result].
 *
 * @param promise The asynchronous operation to wrap.
 * @returns A promise that resolves to a tuple of [Error, null] or [null, Data].
 */
export async function safe<T>(
    promise: Promise<T> 
): Promise<[Error, null] | [null, T]> {
    try {
        const data = await promise;
        return [null, data];
    } catch (error) { 
      if (error instanceof Error) {
        return [error, null];
    }

    return [new Error(String(error)), null];
}
}

/**
 * Wraps a synchronous function execution to return a Go-style tuple: [error, result].
 * 
 * @param fn The synchronous function or execution block to wrap.
 * @returns A tuple of [Error, null] or [null, Data].
 */
export function safeSync<T> (
    fn: () => T
): [Error, null] | [null, T] {
    try {
        const data = fn();
        return [null, data];
    }
}