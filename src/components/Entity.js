import { animated, useSpring } from '@react-spring/three';
import { useEffect } from 'react';
import { attractIndividual, getIndividualColor } from '../systems/individuals';
import useGraphics from '../stores/useGraphics';

const Entity = ({ data, position, baseColor, onClick, type }) => {
  const { highQuality } = useGraphics();

  const color =
    type === 'individual' ? getIndividualColor(data, baseColor) : baseColor;

  const scale =
    type === 'individual'
      ? // Scale the score participation that is between 0 and 1 into 0.3 and 1.5
        0.5 * (data.scoreParticipation * 1.2 + 0.3)
      : 1.5 + data.stats.power.percentage / 10;

  const { pos } = useSpring({
    from: { pos: [0, 0, 0] },
    to: {
      pos: type === 'individual' ? attractIndividual(data, position) : position,
    },
  });

  const logIndividual = (e) => {
    e.stopPropagation();
    console.log(e.object.userData.scoreParticipation);
    console.log(e.object.userData);
  };

  return (
    <animated.mesh
      position={pos}
      userData={data}
      scale={scale}
      onClick={onClick ? onClick : logIndividual}
    >
      <sphereGeometry args={[1, 32, 32]} />
      {highQuality ? (
        // <meshStandardMaterial color={color || baseColor} />
        <meshPhysicalMaterial
          color={color || baseColor}
          wireframe={type === 'group'}
        />
      ) : (
        <meshBasicMaterial
          color={color || baseColor}
          wireframe={type === 'group'}
        />
      )}
    </animated.mesh>
  );
};

export default Entity;
