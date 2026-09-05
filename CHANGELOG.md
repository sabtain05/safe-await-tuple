### CHANGELOG.md

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-09-05

### Added
- Introduced `safeSync()` utility function to handle synchronous operations and functions that throw errors, returning a clean `[Error, null] | [null, T]` tuple.
- Expanded TypeScript test suite to cover both async promise rejections and synchronous error throwing (such as `JSON.parse` failures).

### Improved
- Standardized error-normalization logic to guarantee standard `Error` instance returns across both sync and async execution paths.

## [1.0.0] - 2026-09-04

### Added
- Initial release of `safe-await-tuple`.
- Core asynchronous `safe()` wrapper returning Go-style `[Error, null] | [null, T]` tuples.
- Full TypeScript generic support with zero dependencies.