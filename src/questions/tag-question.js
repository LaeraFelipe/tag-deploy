const chalk = require("chalk");
const inquirer = require("inquirer");
const increaseVersion = require("../helpers/increase-version");
const increaseModifier = require("../helpers/increase-modifier");
const resetModifier = require("../helpers/reset-modifier");

const getTagsOptions = (lastTag, modifier) => {
  const majorVersion = resetModifier(
    increaseVersion(lastTag, 0, modifier),
    modifier
  );
  const minorVersion = resetModifier(
    increaseVersion(lastTag, 1, modifier),
    modifier
  );
  const pathVersion = resetModifier(
    increaseVersion(lastTag, 2, modifier),
    modifier
  );

  let customOptions = [];
  let commonOptions = [
    {
      name: `${chalk.bold.blue("patch")} (${chalk.bold.yellow(pathVersion)})`,
      value: pathVersion,
    },
    {
      name: `${chalk.bold.blue("minor")} (${chalk.bold.yellow(minorVersion)})`,
      value: minorVersion,
    },
    {
      name: `${chalk.bold.blue("major")} (${chalk.bold.yellow(majorVersion)})`,
      value: majorVersion,
    },
  ];

  if (modifier) {
    customOptions.push({
      name: `${chalk.bold.blue("modifier")} (${chalk.bold.yellow(
        increaseModifier(lastTag, modifier)
      )})`,
      value: increaseModifier(lastTag, modifier),
    });
  }

  return [...customOptions, ...commonOptions];
};

const tagQuestion = async (lastTag, deployment) => {
  const tagOptions = getTagsOptions(lastTag, deployment.modifier);

  console.log(`${chalk.bold.cyan(`last tag`)} (${chalk.bold.yellow(lastTag)})`);

  const { targetTag } = await inquirer.prompt([
    {
      message: `select target tag`,
      name: "targetTag",
      type: "list",
      choices: tagOptions,
    },
  ]);

  return targetTag;
};

module.exports = tagQuestion;
