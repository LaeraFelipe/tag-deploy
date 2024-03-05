const convertTagToNumber = (tag) => {
  const [version, rc] = tag.split("-");

  const paths = version.replace("v", "").split(".");

  //padding zeros to handle modifiers.
  let number = Number(
    paths.reduce(
      (acc, number, index) =>
        acc + Number(number) * ((paths.length - index) * 1000),
      0
    )
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
