const chalk = require("chalk");

const loadConsole = () => {
  const chars = ["\\", "|", "/", "-"];
  let index = 0;
  const intervalRef = setInterval(() => {
    process.stdout.write(chalk.blue("\r" + chars[index++]));
    index &= 3;
  }, 250);

  return  () => {
    process.stdout.write('\r');
    clearInterval(intervalRef)
  }

};

module.exports = loadConsole;
