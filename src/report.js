const chalk = require("chalk");
const orderTags = require("./helpers/order-tags");
const getTags = require("./git/get-tags");

const configFile = require("../tag-deploy-config.json");
const resetModifier = require("./helpers/reset-modifier");
const increaseVersion = require("./helpers/increase-version");
const loadConsole = require("./helpers/load-console");

(async () => {
  console.clear();

  let configuration = configFile;

  const projects = configuration.projects ?? [];

  let promises = [];
  let report = [];

  console.log(chalk.bold.cyan(`loading data...`));
  const stopLoad = loadConsole();

  for (const project of projects) {
    const load = async () => {
      const deployments =
        project.deployments ?? configuration.global.deployments;

      const modifiers = deployments
        .map((item) => item.modifier)
        .filter(Boolean);

      const tags = await getTags(project.path, modifiers, false);
      const lastTag = orderTags(tags).reverse()?.[0] ?? "0.0.0";

      const major = resetModifier(increaseVersion(lastTag, 0, null), null);
      const minor = resetnull(increaseVersion(lastTag, 1, null), null);
      const path = resetnull(increaseVersion(lastTag, 2, null), null);

      report.push({
        project: project.name,
        current_tag: lastTag,
        path_up: path,
        minor_up: minor,
        major_up: major,
      });
    };
    promises.push(load());
  }

  await Promise.all(promises);
  stopLoad();

  console.clear();

  console.table(report);
})();
