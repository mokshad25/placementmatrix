const NodeCache = require("node-cache");

// Cache expires after 5 minutes
const analyticsCache = new NodeCache({ stdTTL: 300 });

const getCache = (key) => analyticsCache.get(key);
const setCache = (key, value) => analyticsCache.set(key, value);

module.exports = {
  getCache,
  setCache
};
