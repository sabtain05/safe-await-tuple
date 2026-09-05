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
  if (error instanceof Error) {
    console.error(error.message);
  }
  return;
}
console.log(user);

```

**✅ The New Way:**

```typescript
import { safe } from 'safe-await-tuple';

const [err, user] = await safe(fetchUser(id));

if (err) {
  console.error(err.message);
  return;
}

console.log(user);

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

### 2. Synchronous Handling (`safeSync`)

```typescript
import { safeSync } from 'safe-await-tuple';

function parseConfig(rawJson: string) {
  const [error, config] = safeSync(() => JSON.parse(rawJson));
  if (error) return null;
  return config;
}

```

### 3. Batching Promises (`safeAll`)

Resolves an array of promises concurrently. If one promise fails, it does not crash the rest of the batch.

```typescript
import { safeAll } from 'safe-await-tuple';

async function fetchDashboard() {
  const results = await safeAll([
    fetchUsers(),
    fetchMetrics(),
    fetchSettings()
  ]);

  
  results.forEach(([err, data], index) => {
    if (err) console.error(`Task ${index} failed:`, err.message);
    else console.log(`Task ${index} succeeded:`, data);
  });
}

```

## Features

* **Zero Dependencies:** Microscopic footprint, perfect for serverless and Edge environments.
* **100% TypeScript:** First-class generic support with automatic type inference.
* **Sync, Async & Batch Support:** Handles single promises, synchronous functions, and concurrent arrays.
* **Guaranteed Error Types:** Automatically ensures caught rejections are formatted as standard `Error` objects.

## License

MIT


<p align="center">
<strong>A Sabtain Ali production</strong>
</p>