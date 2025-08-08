const chalk = require("chalk");
const orderTags = require("./helpers/order-tags");
const tagQuestion = require("./questions/tag-question");
const deploymentQuestion = require("./questions/deployment-question");
const projectQuestion = require("./questions/project-question");
const checkout = require("./git/checkout");
const getTags = require("./git/get-tags");
const pull = require("./git/pull");
const createTag = require("./git/create-tag");

const configFile = require("../tag-deploy-config.json");
const forceTag = require("./questions/force-tag");
const deleteTag = require("./git/delete-tag");
const createDeploymentConfig = require("./questions/create-deployment-config");

(async () => {
  console.clear();
  console.log(chalk.cyan.bold("TAG-DEPLOY 1.0"), "\n");

  let configuration = configFile;

  configuration = await createDeploymentConfig();

  const project = await projectQuestion(configuration);

  const deployments = project.deployments ?? configuration.global.deployments;

  const modifiers = deployments.map(item => item.modifier).filter(Boolean);

  const deployment = await deploymentQuestion(deployments);

  console.log("");

  await checkout(project.path, deployment.branch);

  const tags = await getTags(project.path, modifiers);

  const lastTag = orderTags(tags).reverse()?.[0] ?? "0.0.0";

  const targetTag = await tagQuestion(lastTag, deployment);

  await pull(project.path);

  const tagCreated = await createTag(project.path, targetTag);

  if (!tagCreated) {
    const force = await forceTag();
    if (force) {
      await deleteTag(project.path, targetTag);
      await createTag(project.path, targetTag);
    } else {
      console.log(chalk.bold.yellow(`tag (${targetTag}) canceled`));
      return;
    }
  }

  console.log(
    `${chalk.bold.greenBright(`tag (${targetTag}) succesfuly published`)}`
  );
})();
