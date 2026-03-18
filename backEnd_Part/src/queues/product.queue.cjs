const { Queue } = require("bullmq");
const { redisConnection } = require("../config/redis.cjs");

// import { Queue } from "bullmq";
// import { redisConnection } from "../config/redis";
const productQueue = new Queue("productQueue", {
   connection: redisConnection,
});

module.exports = { productQueue };
