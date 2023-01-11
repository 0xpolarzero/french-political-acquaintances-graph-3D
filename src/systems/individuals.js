import * as THREE from 'three';
import coordinates from './data/coordinates.json';

export const getIndividualsPositions = (group, basePos) => {
  const positions = coordinates[group.data.length].map((coord, index) => {
    // Base the multiplier on the length so all groups have the same size
    // const multiplier = group.data.length / 10;
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

export const attractIndividual = (data, basePos) => {
  // Calculate the attraction to 0,0,0
  // Get the angle of its reference to 0,0,0 based on the basePos
};

export const getIndividualColor = (data, baseColor) => {
  // Based on the baseColor and data.scoreLoyaute, calculate the color
  // The higher the scoreLoyaute, the closer to the baseColor
  // The lower the scoreLoyaute, the closer to white

  // Calculate the color
  const color = baseColor.clone();
  color.lerp(new THREE.Color(0xffffff), 1 - data.scoreLoyaute);

  // Return the color
  return color;
};
