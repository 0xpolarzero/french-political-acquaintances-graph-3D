import * as THREE from 'three';

export const getIndividualPosition = (data, basePos, index, total) => {
  // Place the individuals in a circle around the basePos
  // The first one will be the closest to [0, 0, 0]
  // The last one will be the farthest from [0, 0, 0]
  // So it can't just turn around the basePos but needs to be placed
  // from closest to [0, 0, 0] to farthest from [0, 0, 0]

  // To calculate the angle and distance, start for a distance of 10
  // Each 50 individuals, divide the distance by 2
  // The end circle should be filled (if there are 120, the angle for the last 20 should be higher)
  // Remember that the first ones need to be the closest to [0, 0, 0]
  // So the angle needs to be lower for the first ones

  // Calculate the distance
  const distance = 10 / Math.pow(2, Math.floor(index / 50));

  // Calculate the angle
  const remaining = total - index;
  const remainder = total % 50;
  // Do const angle = ((index % 50) / 50) * Math.PI * 2;
  // BUT if there are less than 50 remaining, calculate the angle based on the remaining
  const angle =
    ((index % 50) / (remaining > 50 ? 50 : remainder)) * Math.PI * 2;

  // Calculate the position
  const x = Math.cos(angle) * distance;
  const z = Math.sin(angle) * distance;

  // Return the position
  return [basePos[0] + x, basePos[1], basePos[2] + z];
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
