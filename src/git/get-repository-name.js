const executeAsync = require("../helpers/execute-as-promise");

const getGitRepositoryName = async (directory) => {
  try {
    return await executeAsync(
      `cd ${directory} && git config --get remote.origin.url | sed -E 's#.*/([^/]+)\\.git#\\1#'`
    );
  } catch (error) {
    throw error;
  }
};

module.exports = getGitRepositoryName;
