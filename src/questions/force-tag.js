const inquirer = require("inquirer");

const forceTag = async () => {


  const { force } = await inquirer.prompt([
    {
      message: "force tag?",
      name: "force",
      type: "confirm",
      default: false
    },
  ]);

  return force;
};

module.exports = forceTag;
