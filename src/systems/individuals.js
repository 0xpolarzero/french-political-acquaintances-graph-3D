import * as THREE from 'three';

export const getIndividualPosition = (data, basePos, index, total) => {
  // Calculate the angle to place the individual sphere around the basePos sphere
  const angle = (index / total) * 2 * Math.PI;

  // Calculate the distance from the basePos sphere based on the data value
  // using a function to map the data value to a distance
  const distanceFn = (data) => data.scoreMajorite * 10;
  const distance = distanceFn(data);

  // Calculate the x, y, z position of the individual sphere
  const x = basePos[0] + distance * Math.cos(angle);
  const y = basePos[1];
  const z = basePos[2] + distance * Math.sin(angle);

  return [x, y, z];
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

export const getIndividualsPositions = (group, basePos) => {
  const minRadius = 5;
  const amount = group.data.length;
  basePos = { x: basePos[0], y: basePos[1], z: basePos[2] };
  let d = 10;

  let spheres = [];
  let currRadius = minRadius;
  let currAmount = 0;
  let currPhi = 0;
  let currTheta = 0;
  let phiStep = Math.PI / (amount / 2);
  let thetaStep = (2 * Math.PI) / amount;
  while (currAmount < amount) {
    let x = basePos.x + currRadius * Math.sin(currPhi) * Math.cos(currTheta);
    let y = basePos.y + currRadius * Math.sin(currPhi) * Math.sin(currTheta);
    let z = basePos.z + currRadius * Math.cos(currPhi);
    spheres.push({ x, y, z });
    currTheta += thetaStep;
    currPhi += phiStep;
    currAmount++;
    if (currAmount % amount === 0) {
      currRadius += d;
      currTheta = 0;
      currPhi = 0;
    }
  }

  let positions = [];
  spheres.forEach((sphere) => {
    positions.push([sphere.x, sphere.y, sphere.z]);
  });

  return positions;
};
