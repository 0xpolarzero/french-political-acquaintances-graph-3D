import { animated, useSpring } from '@react-spring/three';
import { attractIndividual, getIndividualColor } from 'src/systems';
import { useGraphics, useInteraction, useInterface } from 'src/stores';

const Entity = ({
  data,
  position,
  onClick,
  type,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { highQuality } = useGraphics();
  const { hovered, search } = useInteraction();
  const { setDrawer } = useInterface();

  const color = search
    ? search.item.id === data.id
      ? 'red'
      : 'white'
    : type === 'individual'
    ? getIndividualColor(data)
    : data.associatedColor;

  let scale =
    type === 'individual'
      ? // Scale the score participation that is between 0 and 1 into 0.3 and 1.5
        0.5 * (data.participationScore * 1.2 + 0.3)
      : 1.5 + data.stats.average.power / 10;
  // Increase the scale if it's hovered
  if (hovered.item && hovered.item.id === data.id) {
    if (type === 'group') scale *= 1.5;
    if (type === 'individual') scale *= 2;
  }
  // Increase the scale if it's searched and decrease other entities
  if (search && search.item.id === data.id) scale *= 1.5;
  if (search && search.item.id !== data.id) scale *= 0.5;

  const opacity = search ? (search.item.id === data.id ? 1 : 0.2) : 1;

  const { pos } = useSpring({
    from: { pos: [0, 0, 0] },
    to: {
      pos: type === 'individual' ? attractIndividual(data, position) : position,
    },
  });

  const { scale: scaleSpring } = useSpring({
    from: { scale: 0 },
    to: { scale: scale },
    config: { mass: 1, tension: 200, friction: 20 },
  });

  return (
    <animated.mesh
      position={pos}
      userData={data}
      scale={scaleSpring}
      onClick={onClick ? onClick : (e) => setDrawer(e, data, type)}
      onPointerEnter={onMouseEnter}
      onPointerLeave={onMouseLeave}
    >
      <sphereGeometry args={[1, 32, 32]} />
      {highQuality ? (
        // <meshPhysicalMaterial
        //   color={color || data.color}
        //   wireframe={type === 'group'}
        // />
        <meshStandardMaterial
          color={color}
          wireframe={type === 'group'}
          opacity={opacity}
          transparent
        />
      ) : (
        <meshBasicMaterial
          color={color}
          wireframe={type === 'group'}
          opacity={opacity}
          transparent
        />
      )}
    </animated.mesh>
  );
};

export default Entity;
