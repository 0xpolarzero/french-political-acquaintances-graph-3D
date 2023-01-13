import { animated, useSpring } from '@react-spring/three';
import { useEffect } from 'react';
import { attractIndividual, getIndividualColor } from '../systems/individuals';

const Entity = ({ data, position, baseColor, onClick, type }) => {
  const color =
    type === 'individual' ? getIndividualColor(data, baseColor) : baseColor;

  const { pos } = useSpring({
    from: { pos: [0, 0, 0] },
    to: {
      pos: type === 'individual' ? attractIndividual(data, position) : position,
    },
  });

  const logIndividual = (e) => {
    e.stopPropagation();
    console.log(e.object.userData.scoreLoyaute);
  };

  useEffect(() => {}, [position]);

  return (
    <animated.mesh
      position={pos}
      userData={data}
      onClick={onClick ? onClick : logIndividual}
    >
      <sphereGeometry args={[type === 'individual' ? 0.5 : 1, 32, 32]} />
      <meshBasicMaterial color={color || baseColor} />
    </animated.mesh>
  );
};

export default Entity;
