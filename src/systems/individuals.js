import * as THREE from 'three';
import Gradient from 'javascript-color-gradient';
import COORDINATES from 'src/systems/data/coordinates.json';

export const getIndividualsPositions = (group, basePos) => {
  const amount = group.data.length;
  const coords = COORDINATES[amount];

  const positions = coords.map((coord, index) => {
    // Give it a bit more radius if the parent sphere is bigger
    const multiplier = 10 + group.stats.power.percentage / 10;

    const multiplied = [
      Number(coord['x']) * multiplier,
      Number(coord['y']) * multiplier,
      Number(coord['z']) * multiplier,
    ];

    const pos = multiplied.map((coord, index) => {
      return coord + basePos[index];
    });

    return pos;
  });

  return positions;
};

export const attractIndividual = (data, position) => {
  // Don't attract if the group is a major group
  if (data.maj) return position;

  const vecPosition = new THREE.Vector3(position[0], position[1], position[2]);
  const majorityScore = data.majorityScore ? Number(data.majorityScore) : 0;
  const multiplier = 0.2;

  const vecToCenter = new THREE.Vector3(0, 0, 0).sub(vecPosition);

  const vecUpdated = vecPosition.add(
    vecToCenter.multiplyScalar(majorityScore * multiplier),
  );
  const updatedPos = [vecUpdated.x, vecUpdated.y, vecUpdated.z];

  return updatedPos;
};

// export const sortCoordinates = (positions, amount) => {
//   // Sort the positions based on their proximity to 0,0,0
//   const sorted = positions.sort((a, b) => {
//     const aDist = Math.hypot(a.x, a.y, a.z);
//     const bDist = Math.hypot(b.x, b.y, b.z);

//     return aDist - bDist;
//   });

//   return sorted;
// };

export const getIndividualColor = (data) => {
  const loyalty = data.loyaltyScore ? Number(data.loyaltyScore) : 0.5;
  let num = loyalty * 10;
  // Limit to 0.01 -> 10
  num = num > 10 ? 10 : num <= 0 ? 0.01 : num;

  const color = new Gradient()
    .setColorGradient('#ffffff', data.color)
    .setMidpoint(10)
    .getColor(num);

  return color;
};
