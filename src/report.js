const chalk = require("chalk");
const orderTags = require("./helpers/order-tags");
const getTags = require("./git/get-tags");

const configFile = require("../tag-deploy-config.json");
const resetModifier = require("./helpers/reset-modifier");
const increaseVersion = require("./helpers/increase-version");
const loadConsole = require("./helpers/load-console");
const inquirer = require("inquirer");
const Fuse = require("fuse.js");

(async () => {
  console.clear();

  let configuration = configFile;

  const allProjects = configuration.projects ?? [];

  const projectsChoices = allProjects.map((item) => ({
    name: item.name,
    value: item,
  }));

  const lastArg = process.argv[process.argv.length - 1];

  let projects = [];

  if (lastArg === "--report") {
    ({ projects } = await inquirer.prompt([
      {
        type: "checkbox",
        name: "projects",
        choices: projectsChoices,
        message: "select the projects that you want to report",
      },
    ]));
  } else {
    const fuse = new Fuse(allProjects, {
      keys: ["name", "path"],
      minMatchCharLength: lastArg.length,
    });
    projects = fuse
      .search(lastArg)
      .map((item) => item.item)
      .slice(0, 1);
  }

  if (projects.length === 0) {
    console.log(chalk.bold.red(`no projects founded!`));
    return;
  }

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
      const currentRelease =
        orderTags(tags)
          .filter((item) => !item.match(/-.*/))
          .reverse()?.[0] ?? "0.0.0";

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
        current_release: currentRelease,
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
