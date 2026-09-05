const { safe, safeSync } = require('./dist/index.js');

async function testV11() {
    console.log("Testing safe-await-tuple v1.1.0 (Sync & Async)...\n");

    const [err1, data1] = safeSync(()=> JSON.parse('{"name": "Sabtain"}'));
}