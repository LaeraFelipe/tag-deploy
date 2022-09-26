const resetModifier = (fullVersion, modifier) => {
  if (modifier) {
    const [versionPart, modifierVersion] = fullVersion.split(modifier);
    return `${versionPart}${modifier}01`;
  }
  return fullVersion;
};

module.exports = resetModifier;
