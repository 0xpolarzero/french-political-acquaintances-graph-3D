import { Float } from '@react-three/drei';
import { useMemo } from 'react';
import {
  getIndividualPosition,
  getIndividualsPositions,
} from '../systems/individuals';

const Individuals = ({ group, basePosition = [0, 0, 0] }) => {
  const positions = useMemo(() => {
    // let pos = [];
    // // Sort data to calculate the angle later
    // group.data.sort((a, b) => b.scoreMajorite - a.scoreMajorite);

    // for (let i = 0; i < group.data.length; i++) {
    //   pos.push(
    //     getIndividualPosition(
    //       group.data[i],
    //       basePosition,
    //       i,
    //       group.data.length,
    //     ),
    //   );
    // }

    // return pos;
    const pos = getIndividualsPositions(group, basePosition);
    console.log(pos);
    return getIndividualsPositions(group, basePosition);
  }, [group.data, basePosition]);

  return (
    <group>
      {group.data.map((individual, index) => {
        return (
          <Float
            key={index}
            speed={1}
            floatIntensity={0.1}
            rotationIntensity={0.1}
          >
            <mesh position={positions[index]}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshBasicMaterial />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
};

export default Individuals;
