# safe-await-tuple

A zero-dependency, Go-style async wrapper for Node.js and TypeScript that eliminates the need for messy `try/catch` blocks and `let` scope pollution.

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
// code flow is fragmented
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

// user is fully typed and ready to use immediately
console.log(user);

```

## Features

* **Zero Dependencies:** Microscopic footprint, perfect for serverless and Edge environments.
* **100% TypeScript:** First-class generic support. Result types are automatically inferred from your promises.
* **Scope Cleanliness:** Keeps your code reading top-to-bottom without temporary `let` declarations.
* **Guaranteed Error Types:** Automatically ensures caught rejections are formatted as standard `Error` objects.

## Usage Example

```typescript
import { safe } from 'safe-await-tuple';

// Simulating a database call
async function getUserProfile(userId: string) {
  const [error, profile] = await safe(database.findUser(userId));

  if (error) {
    // 'error' is strictly typed as an Error object
    return { success: false, reason: error.message };
  }

  // 'profile' is strictly typed based on the Promise return type
  return { success: true, data: profile };
}

```

## License

MIT 

```
<p align="center">
<strong>A Sabtain Ali production</strong>
</p>