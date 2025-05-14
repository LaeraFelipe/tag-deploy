const inquirer = require("inquirer");
const CacheHelper = require("../helpers/cache");

inquirer.registerPrompt("search-list", require("inquirer-search-list"));

const saveRecentProject = (project) => {
  const recentProjects = CacheHelper.get("recentProjects") ?? [];

  const existentIndexInRecent = recentProjects.findIndex(
    (item) => item.name === project.name
  );

  if (existentIndexInRecent > -1) {
    recentProjects.splice(existentIndexInRecent);
  }

  recentProjects.unshift(project.name);
  CacheHelper.set("recentProjects", recentProjects);
};

const sortAndFlagProjectsByRecentUsage = (projects) => {
  const recentProjects = CacheHelper.get("recentProjects") ?? [];

  const sorted = projects.sort((one, other) => {
    let oneRecentProjectsIndex = recentProjects.findIndex(
      (item) => one.name === item
    );
    let otherRecentProjectsIndex = recentProjects.findIndex(
      (item) => other.name === item
    );

    oneRecentProjectsIndex =
      oneRecentProjectsIndex === -1
        ? recentProjects.length
        : oneRecentProjectsIndex;
    otherRecentProjectsIndex =
      otherRecentProjectsIndex === -1
        ? recentProjects.length
        : otherRecentProjectsIndex;

    if (oneRecentProjectsIndex < otherRecentProjectsIndex) {
      return -1;
    } else if (otherRecentProjectsIndex < oneRecentProjectsIndex) {
      return 1;
    } else {
      return 0;
    }
  });

  return sorted.map((item) => ({
    ...item,
    recent: recentProjects.some((recent) => recent === item.name),
  }));
};

const projectQuestion = async (config) => {
  const sorted = sortAndFlagProjectsByRecentUsage(config.projects);

  const options = sorted.map(
    (project) => project.name + (project.recent ? " - (recent)" : "")
  );

  const { project } = await inquirer.prompt([
    {
      message: "select a project",
      name: "project",
      type: "search-list",
      choices: options,
    },
  ]);

  const parsedSelection = project.replace(" - (recent)", "");
  const selectedProject = sorted.find((item) => item.name === parsedSelection);

  saveRecentProject(selectedProject);

  return selectedProject;
};

module.exports = projectQuestion;
