export const getPositions = (groups) => {
  let positions = {};
  const majorityGroupDistance = 10;
  const minorityGroupDistance = 40;

  // Filter the groups
  const majorityGroups = groups.filter((group) => group.maj);
  const oppositionGroups = groups.filter((group) => !group.maj);

  // Place the groups
  majorityGroups.forEach((group, index) => {
    const angle = (index / majorityGroups.length) * Math.PI * 2;
    const x = Math.cos(angle) * majorityGroupDistance;
    const z = Math.sin(angle) * majorityGroupDistance;
    positions[group.symbol] = [x, 0, z];
  });

  oppositionGroups.forEach((group, index) => {
    const angle = (index / oppositionGroups.length) * Math.PI * 2;
    const x = Math.cos(angle) * minorityGroupDistance;
    const z = Math.sin(angle) * minorityGroupDistance;
    positions[group.symbol] = [x, 0, z];
  });

  return positions;
};
