const increaseVersion = (fullVersion, indexToIncrease, modifier) => {
  let version, modifierVersion;

  if (modifier) {
    [version, modifierVersion] = fullVersion.split(modifier ?? "");
  } else {
    version = fullVersion;
  }

  const versionNumbers = version
    .replace("v", "")
    .split(".")
    .map((item) => Number(item));

  versionNumbers[indexToIncrease]++;

  for (
    let index = indexToIncrease + 1;
    index < versionNumbers.length;
    index++
  ) {
    versionNumbers[index] = 0;
  }

  return `v${versionNumbers.join(".")}${modifier ?? ""}${
    modifierVersion ?? ""
  }`;
};

module.exports = increaseVersion;
