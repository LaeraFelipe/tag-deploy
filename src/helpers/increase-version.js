const increaseVersion = (fullVersion, indexToIncrease, modifier) => {
  let version, modifierVersion;

  [version, modifierVersion] = fullVersion.split("-");

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

  let resultVersion = `v${versionNumbers.join(".")}`;

  if (modifier && modifierVersion) {
    resultVersion = resultVersion.concat("-", modifierVersion);
  }

  return resultVersion;
};

module.exports = increaseVersion;
