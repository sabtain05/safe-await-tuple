## [3.0.0] - 2026-09-21

### Added
- Introduced `configureSafe()` for global telemetry hooks.
- Developers can now pass an `onError` hook once at application startup. Any error caught by `safe`, `safeSync`, `safeAll`, or `safeRetry` is automatically piped through this hook, making Sentry/Datadog integration effortless.

## [2.1.0] - 2026-09-17
### Added
- Introduced `safeRetry()` method to automatically re-attempt flaky asynchronous operations.

## [2.0.0] - 2026-09-10
### Added
- Introduced explicit custom error types `<T, E>` restoring full IDE autocomplete.

## [1.5.0] - 2026-09-06
### Added
- Introduced `safeAll()` method to handle arrays of promises concurrently.

## [1.1.0] - 2026-09-05
### Added
- Introduced `safeSync()` utility function.

## [1.0.0] - 2026-09-04
### Added
- Initial release of `safe-await-tuple`.