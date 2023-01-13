import { useEffect, useMemo, useState } from 'react';
import { Float } from '@react-three/drei';
import Entity from './Entity';
import { getIndividualsPositions } from '../systems/individuals';

const Individuals = ({ group, basePosition = [0, 0, 0] }) => {
  // Get positions (sorted by their proximity to (0, 0, 0))
  const positions = useMemo(() => {
    return getIndividualsPositions(group, basePosition);
  }, [group, basePosition]);

  const individuals = useMemo(() => {
    return (
      group.data
        // Sort by loyalty (less loyal first)
        .sort((a, b) => {
          return b.scoreMajorite - a.scoreMajorite;
        })
        .map((individual, index) => {
          return {
            ...individual,
            position: positions[index],
          };
        })
    );
  }, [group, positions]);

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
            <Entity
              data={individual}
              position={positions[index]}
              baseColor={group.color}
              onClick={null}
              type='individual'
            />
          </Float>
        );
      })}
    </group>
  );
};

export default Individuals;
