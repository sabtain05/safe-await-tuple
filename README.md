# safe-await-tuple

A zero-dependency, Go-style async and sync wrapper for Node.js and TypeScript that eliminates the need for messy `try/catch` blocks and `let` scope pollution.

## Installation

```bash
npm install safe-await-tuple

```

## Usage

### 1. Asynchronous Handling (`safe`)

```typescript
import { safe } from 'safe-await-tuple';

async function getUserProfile(userId: string) {
  const [error, profile] = await safe(database.findUser(userId));
  if (error) return { success: false, reason: error.message };
  return { success: true, data: profile };
}

```

### 2. Custom Error Types

You can pass an expected error type (e.g., `AxiosError`) for full IDE autocomplete.

```typescript
import { safe } from 'safe-await-tuple';
import { AxiosError } from 'axios';

const [err, data] = await safe<UserData, AxiosError>(axios.get('/user'));
if (err) console.log(err.response?.status);

```

### 3. Automatic Retries (`safeRetry`) - *New in v2.1.0*

Automatically retry flaky API calls or database connections before failing. Pass a function that returns a Promise, and specify the maximum number of attempts.

```typescript
import { safeRetry } from 'safe-await-tuple';


const [err, data] = await safeRetry(() => fetch('[https://api.example.com/data](https://api.example.com/data)'), 3);

if (err) {
  console.error("Failed after 3 attempts:", err.message);
} else {
  console.log("Success:", data);
}

```

### 4. Synchronous Handling (`safeSync`)

```typescript
import { safeSync } from 'safe-await-tuple';

const [error, config] = safeSync(() => JSON.parse(rawJson));

```

### 5. Batching Promises (`safeAll`)

Resolves an array of promises concurrently. If one promise fails, it does not crash the rest of the batch.

```typescript
import { safeAll } from 'safe-await-tuple';

const results = await safeAll([ fetchUsers(), fetchMetrics() ]);

```

## Features

* **Zero Dependencies:** Microscopic footprint.
* **100% TypeScript:** First-class generic support, including custom typed errors.
* **Sync, Async, Batch & Retry Support:** A complete suite for elegant error handling without `try/catch`.

## License

MIT © Sabtain Ali

---


<p align="center">
<strong>A Sabtain Ali production</strong>
</p>
