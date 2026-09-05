const { safe, safeSync, safeAll } = require('../dist/index.js');

async function testV15() {
    console.log("Testing safe-await-tuple v1.5.0...\n");

    const p1 = Promise.resolve("Data 1");
    const p2 = Promise.reject(new Error("Database timeout"));
    const p3 = Promise.resolve({ id: 3, status: "active" });

    console.log("Running safeAll...");

    const results = await safeAll([p1, p2, p3]);
}