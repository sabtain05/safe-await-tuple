/**
 * Wraps a promise to return a Go-style tuple: [error, result].
 * If the promise resolves successfully, the error is null.
 * If the promise rejects, the result is null and the error is guaranteed to be an Error object.
 *
 * @param promise The asynchronous operation to wrap.
 * @returns A promise that resolves to a tuple of [Error, null] or [null, Data].
 */
export async function safe<T>(
    promise: Promise<T> 
): 