const redis = require("redis");

const client = redis.createClient({ url: process.env.REDIS_URL });

client.on("connect", () => {
  console.log("Connected to Redis...");
});

(async () => {
  try {
    await client.connect();
  } catch (err) {
    console.log("Error while connecting to redis...?", err);
  }
})();

module.exports = client;
