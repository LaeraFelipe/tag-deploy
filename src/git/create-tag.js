const chalk = require("chalk");
const executeAsync = require("../helpers/execute-as-promise");
const loadConsole = require("../helpers/load-console");

const createTag = async (directory, tag) => {
  console.log(chalk.bold.cyan(`publishing tag`));
  const stopLoad = loadConsole();

  try {
    await executeAsync(
      `cd ${directory} && git tag ${tag} && git push origin ${tag}`
    );
    stopLoad();
    return true;
  } catch (error) {
    stopLoad();
    if (/tag.*already exists*/.test(error.message)) {
      return false;
    }
    throw error;
  }
};

module.exports = createTag;
