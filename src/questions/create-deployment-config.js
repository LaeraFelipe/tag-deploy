const fs = require("fs");
const inquirer = require("inquirer");
const config = require("../../tag-deploy-config.json");
const path = require("path");

const DEFAULT_CONFIGURATION = {
  global: {
    deployments: [
      {
        name: "homolog",
        branch: "develop",
        modifier: "-rc",
      },
      {
        name: "production",
        branch: "master",
      },
    ],
  },
  projects: [],
};

async function createDeploymentConfig() {
  const configuration = config ?? DEFAULT_CONFIGURATION;
  const directory = path.resolve(require.main.filename, "../../");

  if (config.projects.length) {
    return config;
  }

  const { addProject } = await inquirer.prompt([
    {
      message: "Want to add a project?",
      name: "addProject",
      type: "confirm",
    },
  ]);

  if (!addProject) {
    return config;
  }

  const { mode } = await inquirer.prompt([
    {
      message: "Do you want to insert manually or automatically from a path?",
      name: "mode",
      type: "list",
      choices: ["Manual", "From a path"],
      validate: function (input) {
        return Boolean(input) || "Enter a value";
      },
    },
  ]);

  if (mode === "Manual") {
    await fromManualExecute(configuration);
  } else {
    await fromPathExecute(configuration);
  }

  fs.writeFileSync(
    `${directory}/tag-deploy-config.json`,
    JSON.stringify(configuration, null, 2)
  );

  return configuration;
}

async function fromPathExecute(configuration) {
  const { path } = await inquirer.prompt([
    {
      message: "Enter the file path",
      name: "path",
      type: "input",
      validate: function (input) {
        if (!input) {
          return "Enter a value";
        }
        return fs.existsSync(input) || "Path not found";
      },
    },
  ]);

  const files = await fs.readdirSync(path, { withFileTypes: true });

  const foldersNames = files
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const { projects } = await inquirer.prompt([
    {
      message: "Select the projects",
      name: "projects",
      type: "checkbox",
      choices: foldersNames,
      validate: function (input) {
        return Boolean(input.length) || "Choose a project";
      },
    },
  ]);

  if (!projects.length) {
    throw "No projects selected";
  }

  for (const projectName of projects) {
    const pathProject = `${path}/${projectName}`;
    const alreadyIndex = configuration.projects.findIndex(
      (project) => project.path === pathProject
    );

    const project = {
      name: projectName,
      path: pathProject,
    };

    if (alreadyIndex > 0) {
      configuration.projects[alreadyIndex] = project;
    } else {
      configuration.projects.push(project);
    }
  }
}

async function fromManualExecute(configuration) {
  const project = await inquirer.prompt([
    {
      message: "Enter the name",
      name: "name",
      type: "input",
      validate: function (input) {
        return Boolean(input) || "Enter the name";
      },
    },
    {
      message: "Enter the file path",
      name: "path",
      type: "input",
      validate: function (input) {
        if (!input) {
          return "Enter a value";
        }
        return fs.existsSync(input) || "Path not found";
      },
    },
  ]);

  const alreadyIndex = configuration.projects.findIndex(
    (alreadyProject) => alreadyProject.path === project.path
  );

  if (alreadyIndex > 0) {
    configuration.projects[alreadyIndex] = project;
  } else {
    configuration.projects.push(project);
  }
}

module.exports = createDeploymentConfig;
