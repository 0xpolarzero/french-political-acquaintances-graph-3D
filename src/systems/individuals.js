import * as THREE from 'three';
import Gradient from 'javascript-color-gradient';
import coordinates from './data/coordinates.json';

export const getIndividualsPositions = (group, basePos) => {
  const sorted = sortCoordinates(group.data.length);
  const positions = sorted.map((coord, index) => {
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

export const sortCoordinates = (amount) => {
  const positions = coordinates[amount];
  // Sort the positions based on their proximity to 0,0,0
  const sorted = positions.sort((a, b) => {
    const aDist = Math.sqrt(
      Math.pow(a.x, 2) + Math.pow(a.y, 2) + Math.pow(a.z, 2),
    );
    const bDist = Math.sqrt(
      Math.pow(b.x, 2) + Math.pow(b.y, 2) + Math.pow(b.z, 2),
    );

    return aDist - bDist;
  });

  return sorted;
};

export const getIndividualColor = (data, baseColor) => {
  let num = Number(data.scoreLoyaute) * 10;
  // Limit to 0.01 -> 10
  num = num > 10 ? 10 : num <= 0 ? 0.01 : num;

  const color = new Gradient()
    .setColorGradient('#ffffff', baseColor)
    .setMidpoint(10)
    .getColor(num);

  return color;
};
