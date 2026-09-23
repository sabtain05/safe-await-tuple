const { afterEach, describe, it } = require('node:test');
const assert = require('node:assert/strict');
const {
  configureSafe,
  safe,
  safeAll,
  safeRetry,
  safeSync,
} = require('../dist/index.js');

afterEach(() => {
  configureSafe({ onError: undefined });
});

describe('safe-await-tuple', () => {
  it('returns a value without an error for resolved promises', async () => {
    assert.deepEqual(await safe(Promise.resolve('ok')), [null, 'ok']);
  });

  it('normalizes rejected non-Error values', async () => {
    const [error, value] = await safe(Promise.reject('failed'));

    assert.equal(value, null);
    assert.equal(error.message, 'failed');
    assert.ok(error instanceof Error);
  });

  it('handles synchronous return values and thrown errors', () => {
    assert.deepEqual(safeSync(() => 42), [null, 42]);

    const [error, value] = safeSync(() => {
      throw new Error('invalid input');
    });

    assert.equal(value, null);
    assert.equal(error.message, 'invalid input');
  });

  it('settles every promise independently in a batch', async () => {
    const results = await safeAll([
      Promise.resolve('first'),
      Promise.reject(new Error('second failed')),
      Promise.resolve('third'),
    ]);

    assert.deepEqual(results[0], [null, 'first']);
    assert.equal(results[1][0].message, 'second failed');
    assert.equal(results[1][1], null);
    assert.deepEqual(results[2], [null, 'third']);
  });

  it('retries until the operation succeeds', async () => {
    let attempts = 0;
    const [error, value] = await safeRetry(async () => {
      attempts++;
      if (attempts < 3) throw new Error(`attempt ${attempts} failed`);
      return 'recovered';
    }, 3);

    assert.equal(error, null);
    assert.equal(value, 'recovered');
    assert.equal(attempts, 3);
  });

  it('reports the final retry error through the telemetry hook', async () => {
    const reported = [];
    configureSafe({ onError: error => reported.push(error.message) });

    const [error, value] = await safeRetry(
      async () => {
        throw new Error('service unavailable');
      },
      2,
    );

    assert.equal(value, null);
    assert.equal(error.message, 'service unavailable');
    assert.deepEqual(reported, ['service unavailable']);
  });
});
