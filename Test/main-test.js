const { safe } = require('../dist/index.js');


class CustomHttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "CustomHttpError";
    this.statusCode = statusCode;
  }
}

async function testV2() {
  console.log("Testing safe-await-tuple v2.0.0...\n");

  
  const failingApiCall = Promise.reject(new CustomHttpError("Resource Not Found", 404));
  
  const [err, data] = await safe(failingApiCall);

  console.log("--- Custom Error Case ---");
  if (err) {
    console.log("Error Name:", err.name);
    console.log("Error Message:", err.message);
    console.log("Custom Status Code:", err.statusCode);
  }
}

testV2();