import coordinates from './data/coordinates.json';

export const getGroupsPositions = (groups) => {
  let positions = {};
  const majorityGroupRadius = 30;
  const minorityGroupRadius = 80;

  // Filter the groups
  const majorityGroups = groups.filter((group) => group.maj);
  const oppositionGroups = groups.filter((group) => !group.maj);

  // Get the appropriate coordinates
  const majorityCoords = coordinates[majorityGroups.length];
  const oppositionCoords = coordinates[oppositionGroups.length];

  // Place the groups
  majorityGroups.forEach((group, index) => {
    const x = Number(majorityCoords[index].x) * majorityGroupRadius;
    const y = Number(majorityCoords[index].y) * majorityGroupRadius;
    const z = Number(majorityCoords[index].z) * majorityGroupRadius;
    positions[group.symbol] = [x, y, z];
  });

  oppositionGroups.forEach((group, index) => {
    const x = Number(oppositionCoords[index].x) * minorityGroupRadius;
    const y = Number(oppositionCoords[index].y) * minorityGroupRadius;
    const z = Number(oppositionCoords[index].z) * minorityGroupRadius;
    positions[group.symbol] = [x, y, z];
  });

  return positions;
};
