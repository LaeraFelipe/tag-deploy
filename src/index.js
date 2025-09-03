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
const { postGoogleChatMessage } = require("./helpers/post-google-chat-message");
const getGitName = require("./git/get-name");
const getGitEmail = require("./git/get-email");
const getCommitUrl = require("./git/get-commit-url");
const getGitRepositoryName = require("./git/get-repository-name");
const getGitBranch = require("./git/get-branch");

(async () => {
  console.clear();
  console.log(chalk.cyan.bold("TAG-DEPLOY 1.0"), "\n");

  let configuration = configFile;
  configuration = await createDeploymentConfig();

  if (process.argv.includes("--report")) {
    require("./report");
    return;
  }

  if (process.argv.includes("--config")) {
    require("./open-config");
    return;
  }

  const project = await projectQuestion(configuration);

  const deployments = project.deployments ?? configuration.global.deployments;

  const modifiers = deployments.map((item) => item.modifier).filter(Boolean);

  const deployment = await deploymentQuestion(deployments);

  console.log("");

  await checkout(project.path, deployment.branch);

  const tags = await getTags(project.path, modifiers);

  const lastTag = orderTags(tags).reverse()?.[0] ?? "0.0.0";

  const targetTag = await tagQuestion(lastTag, deployment);

  await pull(project.path);

  const createdTag = await createTag(project.path, targetTag);

  if (!createdTag) {
    const force = await forceTag();
    if (force) {
      await deleteTag(project.path, targetTag);
      await createTag(project.path, targetTag);
    } else {
      console.log(chalk.bold.yellow(`tag (${targetTag}) canceled`));
      return;
    }
  }

  if (configuration.global.googleChatWebhook) {
    const userName = await getGitName(project.path);
    const userEmail = await getGitEmail(project.path);
    const commitUrl = await getCommitUrl(project.path);
    const repositoryName = await getGitRepositoryName(project.path);
    const branch = await getGitBranch(project.path);
    await postGoogleChatMessage({
      userName,
      userEmail,
      branch,
      commitUrl,
      repository: repositoryName,
      webhookUrl: configuration.global.googleChatWebhook,
      tag: targetTag,
      buildJobName: project.buildJobName,
      googleChatBuildButtonLink:
        project.googleChatBuildButtonLink ??
        configuration.global.googleChatBuildButtonLink,
      googleChatTagButtonLink:
        project.googleChatTagButtonLink ??
        configuration.global.googleChatTagButtonLink,
    });
  }

  console.log(
    `${chalk.bold.greenBright(`tag (${targetTag}) succesfuly published`)}`
  );
})();
