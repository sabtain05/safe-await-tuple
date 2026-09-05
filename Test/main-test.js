const { safe, safeSync } = require('../dist/index.js');

async function testV11() {
    console.log("Testing safe-await-tuple v1.1.0 (Sync & Async)...\n");

    const [err1, data1] = safeSync(()=> JSON.parse('{"name": "Sabtain"}'));
    console.log("--- Sync Success Case ---");
    console.log("Error is null?", err1 === null);
    console.log("Parsed data:", data1);
    console.log("");


    const [err2, data2] = safeSync(()=> JSON.parse('invalid-json'));
    console.log("--- Sync Failure Case ---");
    console.log("Error message:", err2.message);
    console.log("Data is null?", data2 === null);
}

testV11();