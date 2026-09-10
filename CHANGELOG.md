# Changelog

## [2.0.0] - 2026-09-10

### Added
- Introduced a second generic parameter `<T, E>` to all functions (`safe`, `safeSync`, `safeAll`).
- Developers can now explicitly define expected custom error types (e.g., `safe<UserData, AxiosError>(...)`), restoring full IDE autocomplete for properties like `error.status` or `error.code`.

## [1.5.0] - 2026-09-06
### Added
- Introduced `safeAll()` method to handle arrays of promises concurrently without failing the batch.

## [1.1.0] - 2026-09-05
### Added
- Introduced `safeSync()` utility function to handle synchronous operations.

## [1.0.0] - 2026-09-04
### Added
- Initial release of `safe-await-tuple` with core `safe()` wrapper.