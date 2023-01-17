import { animated, useSpring } from '@react-spring/three';
import { useEffect } from 'react';
import { attractIndividual, getIndividualColor } from '../systems/individuals';
import useGraphics from '../stores/useGraphics';

const Entity = ({
  data,
  position,
  onClick,
  type,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { highQuality } = useGraphics();

  const color =
    type === 'individual' ? getIndividualColor(data) : data.couleurAssociee;
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
    console.log(e.object.userData.scoreLoyaute);
    console.log(e.object.userData);
  };

  return (
    <animated.mesh
      position={pos}
      userData={data}
      scale={scale}
      onClick={onClick ? onClick : logIndividual}
      onPointerEnter={onMouseEnter}
      onPointerLeave={onMouseLeave}
    >
      <sphereGeometry args={[1, 32, 32]} />
      {highQuality ? (
        // <meshPhysicalMaterial
        //   color={color || data.color}
        //   wireframe={type === 'group'}
        // />
        <meshStandardMaterial color={color} wireframe={type === 'group'} />
      ) : (
        <meshBasicMaterial
          color={color || data.color}
          wireframe={type === 'group'}
        />
      )}
    </animated.mesh>
  );
};

export default Entity;
