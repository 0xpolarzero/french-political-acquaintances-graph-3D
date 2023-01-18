import { useMemo } from 'react';
import { Float } from '@react-three/drei';
import Entity from './Entity';
import { getIndividualsPositions } from 'src/systems';
import { useInteraction } from 'src/stores';

const Individuals = ({ group, basePosition = [0, 0, 0] }) => {
  const { setHovered } = useInteraction();

  // Get positions (sorted by their proximity to (0, 0, 0))
  const positions = useMemo(() => {
    return getIndividualsPositions(group, basePosition);
  }, [group, basePosition]);

  const individuals = useMemo(() => {
    return (
      group.data
        // Sort by loyalty (less loyal first)
        .sort((a, b) => {
          return b.majorityScore - a.majorityScore;
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
            floatIntensity={0.01}
            rotationIntensity={0.01}
          >
            <Entity
              data={individual}
              position={positions[index]}
              onClick={null}
              type='individual'
              onMouseEnter={(e) => setHovered(e, individual, 'individual')}
              onMouseLeave={(e) => setHovered(e, null, null)}
            />
          </Float>
        );
      })}
    </group>
  );
};

export default Individuals;
