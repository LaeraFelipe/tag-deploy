const convertTagToNumber = (tag) => {
  const [version, rc] = tag.split("-");
  //padding zeros to handle modifiers.
  let number = Number(
    version.replace("v", "").replace(/\./g, "").trim() + "000"
  );
  if (rc) {
    number += Number(rc.replace("rc", "").trim());
  }
  return number;
};

const orderTags = (tags) => {
  return tags.sort((one, other) => {
    return convertTagToNumber(one) - convertTagToNumber(other);
  });
};

module.exports = orderTags;
