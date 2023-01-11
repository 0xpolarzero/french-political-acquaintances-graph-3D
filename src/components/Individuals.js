import { useMemo } from 'react';
import { getIndividualPosition } from '../systems/individuals';

const Individuals = ({ group, basePosition = [0, 0, 0] }) => {
  const positions = useMemo(() => {
    let pos = [];
    // Sort data to calculate the angle later
    group.data.sort((a, b) => b.scoreMajorite - a.scoreMajorite);

    for (let i = 0; i < group.data.length; i++) {
      pos.push(
        getIndividualPosition(
          group.data[i],
          basePosition,
          i,
          group.data.length,
        ),
      );
    }

    return pos;
  }, [group.data, basePosition]);

  return (
    <group>
      {group.data.map((individual, index) => {
        return (
          <mesh key={index} position={positions[index]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshBasicMaterial />
          </mesh>
        );
      })}
    </group>
  );
};

export default Individuals;
