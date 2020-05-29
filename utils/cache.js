const redis = require("redis");
const util = require("util");

const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
client.hget = util.promisify(client.hget);

// the redis middleware
exports.redisCheck = async (req, res, next) => {
  // if the key is there the return the value for get request,
  if (req.method === "GET") {
    const cachedValue = await client.hget(req.path, "GET");
    console.log(cachedValue, "method :", req.method);
    if (cachedValue) {
      // if the data is there in the redis server
      console.log("from cache");
      return res.json(JSON.parse(cachedValue));
    }
  } else {
    //for post request remove the key value pair
    console.log("cache cleared");
    client.del(req.path);
  }

  next();
};

exports.client = client;
