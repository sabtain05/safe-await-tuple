const { safe } = require('../dist/index.js');

// 1. Define a custom error class with extra properties
class CustomHttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "CustomHttpError";
    this.statusCode = statusCode;
  }
}

async function testV2() {
  console.log("Testing safe-await-tuple v2.0.0 (Custom Errors)...\n");

  // 2. Reject a promise using our custom error
  const failingApiCall = Promise.reject(new CustomHttpError("Resource Not Found", 404));
  
  const [err, data] = await safe(failingApiCall);

  console.log("--- Custom Error Case ---");
  if (err) {
    console.log("Error Name:", err.name);
    console.log("Error Message:", err.message);
    console.log("Custom Status Code:", err.statusCode); // TS now supports this property!
  }
}

testV2();