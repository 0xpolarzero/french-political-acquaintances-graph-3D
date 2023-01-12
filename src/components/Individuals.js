import { Float } from '@react-three/drei';
import { useEffect, useMemo, useState } from 'react';
import {
  getIndividualColor,
  getIndividualPosition,
  getIndividualsPositions,
} from '../systems/individuals';

const Individuals = ({ group, basePosition = [0, 0, 0] }) => {
  const [individuals, setIndividuals] = useState(group.data);
  const [colors, setColors] = useState(
    Array(group.data.length).fill(group.color),
  );

  const positions = useMemo(
    () => getIndividualsPositions(group, basePosition),
    [group.data, basePosition],
  );

  // const colors = useMemo(() => {
  //   console.log(group);
  //   return group.data.map((individual) => {
  //     return individual.color;
  //   });
  // }, [group.data]);

  useEffect(() => {
    const sorted = group.data.sort((a, b) => {
      return b.scoreMajorite - a.scoreMajorite;
    });
    const col = sorted.map((individual) => {
      return getIndividualColor(individual, group.color);
    });

    setIndividuals(sorted);
    setColors(col);
  }, [group.data]);

  return (
    <group>
      {individuals.map((individual, index) => {
        return (
          <Float
            key={index}
            speed={1}
            floatIntensity={0.1}
            rotationIntensity={0.1}
          >
            <mesh position={positions[index]}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshBasicMaterial color={colors[index]} />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
};

export default Individuals;
