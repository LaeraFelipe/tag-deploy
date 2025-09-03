const executeAsync = require("../helpers/execute-as-promise");

const getGitBranch = async (directory) => {
  try {
    return await executeAsync(
      `cd ${directory} && echo $(git rev-parse --abbrev-ref HEAD)`
    );
  } catch (error) {
    throw error;
  }
};

module.exports = getGitBranch;
