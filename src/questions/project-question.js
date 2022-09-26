const inquirer = require("inquirer");

const projectQuestion = async (config) => {
  const projectOptions = config.projects.map((project) => ({
    name: project.name,
    value: project,
  }));

  const { project } = await inquirer.prompt([
    {
      message: "select a project",
      name: "project",
      type: "list",
      choices: projectOptions,
    },
  ]);
  return project;
};

module.exports = projectQuestion;
