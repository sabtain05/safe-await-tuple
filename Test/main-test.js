const { safeRetry } = require('../dist/index.js');

async function testV2_1() {
  console.log("Testing safe-await-tuple v2.1.0...\n");

  let attemptCount = 0;

  const flakyApiCall = async () => {
    attemptCount++;
    console.log(`  -> Executing attempt ${attemptCount}...`);
    
    if (attemptCount < 3) {
      throw new Error("Network timeout!");
    }
    return { status: 200, message: "Connected successfully!" };
  };

  console.log("--- Testing safeRetry (Max 3 attempts) ---");
  
 
  const [err, data] = await safeRetry(flakyApiCall, 3);

  console.log("");
  if (err) {
    console.log("Result: FAILED after all retries.");
    console.log("Final Error:", err.message);
  } else {
    console.log("Result: SUCCESS!");
    console.log("Final Data:", data);
  }
}

testV2_1();