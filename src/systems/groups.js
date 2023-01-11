import coordinates from './data/coordinates.json';

// export const getGroupsPositions = (groups) => {
//   let positions = {};
//   const majorityGroupDistance = 10;
//   const minorityGroupDistance = 40;

//   // Filter the groups
//   const majorityGroups = groups.filter((group) => group.maj);
//   const oppositionGroups = groups.filter((group) => !group.maj);

//   // Place the groups
//   majorityGroups.forEach((group, index) => {
//     const angle = (index / majorityGroups.length) * Math.PI * 2;
//     const x = Number((Math.cos(angle) * majorityGroupDistance).toFixed(2));
//     const z = Number((Math.sin(angle) * majorityGroupDistance).toFixed(2));
//     positions[group.symbol] = [x, 0, z];
//   });

//   oppositionGroups.forEach((group, index) => {
//     const angle = (index / oppositionGroups.length) * Math.PI * 2;
//     const x = Number((Math.cos(angle) * minorityGroupDistance).toFixed(2));
//     const z = Number((Math.sin(angle) * minorityGroupDistance).toFixed(2));
//     positions[group.symbol] = [x, 0, z];
//   });

//   return positions;
// };

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
