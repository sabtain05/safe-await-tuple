 Changelog

## [2.1.0] - 2026-09-17

### Added
- Introduced `safeRetry()` method to automatically re-attempt flaky asynchronous operations.
- Accepts a factory function `() => Promise<T>` and a `maxRetries` count to elegantly handle network timeouts or cold starts before returning the standard tuple.

## [2.0.0] - 2026-09-10
### Added
- Introduced a second generic parameter `<T, E>` to allow explicit custom error types, restoring full IDE autocomplete.

## [1.5.0] - 2026-09-06
### Added
- Introduced `safeAll()` method to handle arrays of promises concurrently.

## [1.1.0] - 2026-09-05
### Added
- Introduced `safeSync()` utility function.

## [1.0.0] - 2026-09-04
### Added
- Initial release of `safe-await-tuple` with core `safe()` wrapper.
