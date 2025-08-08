const increaseModifier = (fullVersion, modifier) => {
  const [versionPart, modifierVersion] = fullVersion.split(modifier);
  return `${versionPart}${modifier}${String(Number(modifierVersion ?? 0) + 1).padStart(2,'0')}`;
};

module.exports = increaseModifier;
