const semver = require("semver");

const orderTags = (tags) => {
  return tags.sort((one, other) => {
    semver.compare(semver.clean(one), semver.clean(other));
  });
};

module.exports = orderTags;
