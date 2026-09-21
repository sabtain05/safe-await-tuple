const { safe, configureSafe } = require('../dist/index.js');


configureSafe({
  onError: (error) => {
    console.log("\n[GLOBAL TELEMETRY HOOK FIRED]");
    console.log(`-> Sending error to Quicklyzer/Sentry: ${error.message}`);
  }
});

async function testV3() {
  console.log("Testing safe-await-tuple v3.0.0 (Global Interceptors)...\n");

  const failingApiCall = Promise.reject(new Error("Database connection refused"));
  
  console.log("Executing safe()...");
  
  const [err, data] = await safe(failingApiCall);

  if (err) {
    console.log("\n[LOCAL HANDLER]");
    console.log("Returning 500 status to user...");
  }
}

testV3();