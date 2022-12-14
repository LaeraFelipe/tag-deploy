const chalk = require("chalk");
const executeAsync = require("../helpers/execute-as-promise");
const loadConsole = require("../helpers/load-console");

const getTags = async (directory, modifier) => {
  console.log(chalk.bold.cyan(`fetching tags`));

  const stopLoad = loadConsole();
  const tags = await executeAsync(
    `cd ${directory} && git ls-remote --tags origin`
  );
  stopLoad();

  let expression = "v\\d*\\.\\d*.\\d*";

  if (modifier) {
    expression = expression.concat(`${modifier}\\d*`);
  }

  expression = expression.concat("$");

  const regexExpression = new RegExp(expression, "g");

  return tags
    .split("\n")
    .map((tag) => tag.match(regexExpression)?.[0])
    .filter(Boolean);
};

module.exports = getTags;
