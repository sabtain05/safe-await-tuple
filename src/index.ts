interface SafeConfig {
  onError?: (error: Error) => void;
}

const globalConfig: SafeConfig = {};

/**
 * @param config Configuration options including global error hooks.
 */
export function configureSafe(config: SafeConfig): void {
  if (config.onError) {
    globalConfig.onError = config.onError;
  }
}


function triggerErrorHook(error: Error): void {
  if (globalConfig.onError) {
    try {
      globalConfig.onError(error);
    } catch (hookError) {
      console.error("safe-await-tuple: Global onError hook threw an error", hookError);
    }
  }
}

export async function safe<T, E extends Error = Error>(
  promise: Promise<T>
): Promise<[E, null] | [null, T]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    triggerErrorHook(err);
    return [err as E, null];
  }
}

export function safeSync<T, E extends Error = Error>(
  fn: () => T
): [E, null] | [null, T] {
  try {
    const data = fn();
    return [null, data];
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    triggerErrorHook(err);
    return [err as E, null];
  }
}

export async function safeAll<T, E extends Error = Error>(
  promises: Promise<T>[]
): Promise<Array<[E, null] | [null, T]>> {
  return Promise.all(promises.map(promise => safe<T, E>(promise)));
}

export async function safeRetry<T, E extends Error = Error>(
  fn: () => Promise<T>,
  maxRetries: number = 3
): Promise<[E, null] | [null, T]> {
  let lastError: Error | undefined;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const data = await fn();
      return [null, data];
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
  }
  
  if (lastError) {
    triggerErrorHook(lastError);
    return [lastError as E, null];
  }
  
  const fallbackErr = new Error("safeRetry: maxRetries exhausted with no errors caught.");
  triggerErrorHook(fallbackErr);
  return [fallbackErr as E, null];
}