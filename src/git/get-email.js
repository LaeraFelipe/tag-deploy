const executeAsync = require("../helpers/execute-as-promise");

const getGitEmail = async (directory) => {
  try {
    return await executeAsync(`cd ${directory} && git config --get user.email`);
  } catch (error) {
    throw error;
  }
};

module.exports = getGitEmail;
