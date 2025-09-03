const executeAsync = require("../helpers/execute-as-promise");

const getGitCommitUrl = async (directory) => {
  try {
    return await executeAsync(
      `cd ${directory} && echo "$(git remote get-url origin | sed -E 's#(git@|https://)([^:/]+)[:/]#https://\\2/#; s/\\.git$//')/commits/$(git rev-parse HEAD)"`
    );
  } catch (error) {
    throw error;
  }
};

module.exports = getGitCommitUrl;
