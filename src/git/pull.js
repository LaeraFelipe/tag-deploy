const chalk = require("chalk");
const executeAsync = require("../helpers/execute-as-promise");
const loadConsole = require("../helpers/load-console");

const pull = async (directory) => {
  console.log(chalk.bold.cyan(`pulling`));

  const stopLoad = loadConsole();
  await executeAsync(`cd ${directory} && git pull`);

  stopLoad();
};

module.exports = pull;
