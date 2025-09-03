const executeAsync = require("../helpers/execute-as-promise");

const getGitName = async (directory, tag) => {
  try {
    return await executeAsync(
      `cd ${directory} && git config --get user.name`
    );
  } catch (error) {
    throw error;
  }
};

module.exports = getGitName;
