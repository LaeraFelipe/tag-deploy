const {exec} = require('child_process');

const executeAsync = async (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (err, output) => {
      if (err) {
        reject(err);
      }
      resolve(output);
    });
  });
};

module.exports = executeAsync;
