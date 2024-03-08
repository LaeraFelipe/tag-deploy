const convertTagToNumber = (tag) => {
  const [version, rc] = tag.split("-");

  const paths = version.replace("v", "").split(".");
  
  //padding zeros to handle modifiers.
  let number = Number(
    paths.reduce(
      (acc, number, index) =>
        acc +
        Number(number) *
          Number(`1${new Array(paths.length - index).fill("0").join("")}`),
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
