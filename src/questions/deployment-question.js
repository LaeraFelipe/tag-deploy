const inquirer = require("inquirer");

const deploymentQuestion = async (deployments) => {
  if (!deployments) {
    throw new Error("no deployments set");
  }

  const deploymentOptions = deployments.map((deployment) => ({
    name: deployment.name,
    value: deployment,
  }));

  const { deployment } = await inquirer.prompt([
    {
      message: "select a deployment",
      name: "deployment",
      type: "list",
      choices: deploymentOptions,
    },
  ]);

  return deployment;
};

module.exports = deploymentQuestion;
