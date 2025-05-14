const fs = require("fs");
const path = require("path");

const CACHE_PATH = path.resolve(
  path.dirname(require.main.filename, "../"),
  "cache.json"
);

module.exports = class CacheHelper {
  static _getAll() {
    try {
      return JSON.parse(fs.readFileSync(CACHE_PATH, { encoding: "utf-8" }));
    } catch (error) {
      return {};
    }
  }
  static set(key, value) {
    const all = CacheHelper._getAll();
    all[key] = value;
    fs.writeFileSync(CACHE_PATH, JSON.stringify(all), { encoding: "utf-8" });
  }

  static get(key) {
    const all = CacheHelper._getAll();
    return all[key];
  }
};
