const executeAsync = require("./helpers/execute-as-promise");
const path = require("path");
const configFile = require("../tag-deploy-config.json");

(async () => {
  await executeAsync(
    `${configFile.global.editor} ${path.join(
      path.dirname(require.main.filename),
      "../",
      "tag-deploy-config.json"
    )}`
  );
  console.clear();
})();
