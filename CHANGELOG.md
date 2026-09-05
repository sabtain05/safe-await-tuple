# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.0] - 2026-09-06

### Added
- Introduced `safeAll()` method to handle arrays of promises concurrently.
- `safeAll()` returns an array of typed `[Error, null] | [null, T]` tuples, ensuring that a single rejected promise no longer crashes the entire batch (solving the primary limitation of `Promise.all`).

## [1.1.0] - 2026-09-05

### Added
- Introduced `safeSync()` utility function to handle synchronous operations and functions that throw errors.

### Improved
- Standardized error-normalization logic to guarantee standard `Error` instance returns across both sync and async execution paths.

## [1.0.0] - 2026-09-04

### Added
- Initial release of `safe-await-tuple`.
- Core asynchronous `safe()` wrapper returning Go-style tuples.