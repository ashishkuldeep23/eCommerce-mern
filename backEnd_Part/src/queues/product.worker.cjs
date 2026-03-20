// const { Worker } = require("bullmq");
// const {
//    increaseView,
//    addToHistory,
// } = require("../services/product.service.cjs");
// const { redisConnection } = require("../config/redis.cjs");

// const worker = new Worker(
//    "productQueue",
//    // "productSideEffects",
//    async (job) => {
//       console.log(job);

//       const { productId, userId } = job.data;

//       const res = await Promise.all([
//          increaseView(productId),
//          addToHistory(userId, productId),
//       ]);

//       console.log({ res });
//    },
//    {
//       connection: redisConnection,
//       concurrency: 5,
//    },
// );

// worker.on("completed", (job) => {
//    console.log("✅ Job done:", job.id);
// });

// worker.on("failed", (job, err) => {
//    console.log("❌ Job failed:", err);
// });
