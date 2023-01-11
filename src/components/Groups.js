import { useEffect, useRef, useState } from 'react';
import { animated, useSpring } from '@react-spring/three';
import Individuals from './Individuals';
import useData from '../stores/useData';
import { getPositions } from '../systems/groups';

const Groups = () => {
  const { groups } = useData();
  const [positions, setPositions] = useState({});
  const [groupPosition, setGroupPosition] = useState([0, 0, 0]);
  const [groupRotation, setGroupRotation] = useState([0, 0, 0]);

  const clicked = useRef();

  const { position, rotation } = useSpring({
    position: groupPosition,
    rotation: groupRotation,
  });

  /**
   * Set positions for each group
   */

  /**
   * Zoom
   */
  const zoomIn = (e) => {
    clicked.current = e.object;

    // Move and rotate the group so it gets close to the camera
    setGroupPosition([
      -clicked.current.position.x,
      -clicked.current.position.y + 30,
      -clicked.current.position.z,
    ]);
    setGroupRotation([
      -clicked.current.rotation.x,
      -clicked.current.rotation.y,
      -clicked.current.rotation.z,
    ]);
  };

  const zoomOut = () => {
    clicked.current = null;

    // Move and rotate the group back to its original position
    setGroupPosition([0, 0, 0]);
    setGroupRotation([0, 0, 0]);
  };

  useEffect(() => {
    setPositions(getPositions(groups));
  }, [groups]);

  return (
    <animated.group
      onPointerMissed={zoomOut}
      position={position}
      rotation={rotation}
    >
      {groups.map((group) => {
        return (
          <group key={group.symbol}>
            <mesh
              position={positions[group.symbol]}
              userData={{ group: group.group }}
              onClick={zoomIn}
            >
              <sphereGeometry args={[1, 32, 32]} />
              <meshBasicMaterial />
            </mesh>
            <Individuals group={group} basePosition={positions[group.symbol]} />
          </group>
        );
      })}
    </animated.group>
  );
};

export default Groups;
