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

  for (let index = 0; index < projects.length; index++) {
    const project = projects[index];

    const load = async () => {
      const deployments =
        project.deployments ?? configuration.global.deployments;

      const modifiers = deployments
        .map((item) => item.modifier)
        .filter(Boolean);

      const tags = await getTags(project.path, modifiers, false);
      const lastTag = orderTags(tags).reverse()?.[0] ?? "0.0.0";

      const major = resetModifier(increaseVersion(lastTag, 0, null), null);
      const minor = resetModifier(increaseVersion(lastTag, 1, null), null);
      const path = resetModifier(increaseVersion(lastTag, 2, null), null);

      let release = "none";
      const hasModifier = lastTag.match(/-.*/);
      if (hasModifier) {
        release = lastTag.replace(/-.*/, "");
      }

      report[index] = {
        project: project.name,
        current_tag: lastTag,
        next_release: release,
        path_up: path,
        minor_up: minor,
        major_up: major,
      };
    };
    promises.push(load());
  }

  await Promise.all(promises);
  stopLoad();

  console.clear();

  console.table(report);
})();
