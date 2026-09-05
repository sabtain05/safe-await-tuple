# Contributing to safe-await-tuple

First off, thank you for taking the time to contribute! `safe-await-tuple` is built to keep developer workflows clean, lightweight, and type-safe. 

Please follow these guidelines when contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by its terms. Keep interactions respectful, constructive, and focused on improving code quality.

## How Can I Contribute?

### Reporting Bugs
If you find a bug, please open an issue on GitHub and include:
* A clear description of the issue.
* Steps to reproduce the bug.
* Expected vs. actual behavior.

### Suggesting Enhancements
Open an issue to propose new features or API changes (e.g., batching helpers, custom error classes). Explain why the feature would benefit the wider developer community.

### Pull Requests
1. **Fork the repository** and create your branch from `main`.
2. **Install dependencies:** `npm install`
3. **Make your changes** in the `src/` directory.
4. **Build and Test:** Run `npm run build` and ensure local tests pass successfully.
5. **Commit your changes** using clear commit messages (e.g., `feat: add safeSync utility`).
6. **Push to your fork** and submit a Pull Request to `main`.

## Development Setup

```bash
git clone [https://github.com/sabtain05/safe-await-tuple.git](https://github.com/sabtain05/safe-await-tuple.git)
cd safe-await-tuple
npm install
npm run build