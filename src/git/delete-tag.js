const chalk = require("chalk");
const executeAsync = require("../helpers/execute-as-promise");
const loadConsole = require("../helpers/load-console");

const deleteTag = async (directory, tag) => {
  console.log(chalk.bold.cyan(`deleting tag`));
  const stopLoad = loadConsole();

  await executeAsync(`cd ${directory} && git tag -d ${tag}`);
  stopLoad();
};

module.exports = deleteTag;
