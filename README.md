# safe-await-tuple

A zero-dependency, Go-style async and sync wrapper for Node.js and TypeScript that eliminates the need for messy `try/catch` blocks and `let` scope pollution.

## Installation

```bash
npm install safe-await-tuple

```

## Why?

Standard `try/catch` blocks force you to declare variables outside the block and write verbose error handling.

**❌ The Old Way:**

```typescript
let user;
try {
  user = await fetchUser(id);
} catch (error) {
  if (error instanceof Error) console.error(error.message);
  return;
}

```

**✅ The New Way:**

```typescript
import { safe } from 'safe-await-tuple';

const [err, user] = await safe(fetchUser(id));
if (err) return console.error(err.message);

```

## Usage

### 1. Asynchronous Handling (`safe`)

```typescript
import { safe } from 'safe-await-tuple';

async function getUserProfile(userId: string) {
  const [error, profile] = await safe(database.findUser(userId));
  
  if (error) {
    return { success: false, reason: error.message };
  }
  
  return { success: true, data: profile };
}

```

### 2. Custom Error Types (New in v2.0.0)

If you are using libraries that throw specific error types (like `AxiosError` or `ZodError`), you can pass the error type as a second generic parameter. This gives you full TypeScript autocomplete for custom error properties.

```typescript
import { safe } from 'safe-await-tuple';
import { AxiosError } from 'axios';

interface UserData { name: string; }
const [err, data] = await safe<UserData, AxiosError>(axios.get('/user'));

if (err) {
  console.log("Status Code:", err.response?.status);
  return;
}

```

### 3. Synchronous Handling (`safeSync`)

```typescript
import { safeSync } from 'safe-await-tuple';

function parseConfig(rawJson: string) {
  const [error, config] = safeSync(() => JSON.parse(rawJson));
  
  if (error) {
    return null;
  }
  
  return config;
}

```

### 4. Batching Promises (`safeAll`)

Resolves an array of promises concurrently. If one promise fails, it does not crash the rest of the batch (solving the primary limitation of standard `Promise.all`).

```typescript
import { safeAll } from 'safe-await-tuple';

async function fetchDashboard() {
  const results = await safeAll([ 
    fetchUsers(), 
    fetchMetrics() 
  ]);
  
  results.forEach(([err, data], index) => {
    if (err) {
      console.error(`Task ${index} failed:`, err.message);
    } else {
      console.log(`Task ${index} succeeded:`, data);
    }
  });
}

```

## Features

* **Zero Dependencies:** Microscopic footprint, perfect for edge environments.
* **100% TypeScript:** First-class generic support, including custom typed errors.
* **Sync, Async & Batch Support:** Handles single promises, synchronous functions, and concurrent arrays.
* **Guaranteed Error Types:** Automatically ensures caught exceptions are formatted as standard `Error` objects unless overridden.

## License

MIT

```

<p align="center">
<strong>A Sabtain Ali production</strong>
</p>