const { safe, safeSync } = require('./dist/index.js');

async function testV11() {
    console.log("Testing safe-await-tuple v1.1.0 (Sync & Async)...\n");

    const [err1, data1] = safeSync(()=> JSON.parse('{"name": "Sabtain"}'));
    console.log("--- Sync Success Case ---");
    console.log("Error is null?", err1 === null);
    console.log("Parsed data:", data1);
    console.log("");
}