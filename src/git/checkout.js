const chalk = require("chalk");
const executeAsync = require("../helpers/execute-as-promise");

const checkout = async (directory, branch) => {
  console.log(chalk.bold.cyan(`checkin out to ${branch}`));
  await executeAsync(`cd ${directory} && git checkout ${branch}`);
};

module.exports = checkout;
