import * as THREE from 'three';
import Gradient from 'javascript-color-gradient';
import coordinates from './data/coordinates.json';

export const getIndividualsPositions = (group, basePos) => {
  const amount = group.data.length;
  const coords = coordinates[amount];

  const positions = coords.map((coord, index) => {
    const multiplier = 10;
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
  const vecPosition = new THREE.Vector3(position[0], position[1], position[2]);
  const scoreMajorite = data.scoreMajorite ? Number(data.scoreMajorite) : 0;
  const multiplier = 0.2;

  const vecToCenter = new THREE.Vector3(0, 0, 0).sub(vecPosition);

  const vecUpdated = vecPosition.add(
    vecToCenter.multiplyScalar(scoreMajorite * multiplier),
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

export const getIndividualColor = (data, baseColor) => {
  const loyalty = data.scoreLoyaute ? Number(data.scoreLoyaute) : 0.5;
  let num = loyalty * 10;
  // Limit to 0.01 -> 10
  num = num > 10 ? 10 : num <= 0 ? 0.01 : num;

  const color = new Gradient()
    .setColorGradient('#ffffff', baseColor)
    .setMidpoint(10)
    .getColor(num);

  return color;
};
