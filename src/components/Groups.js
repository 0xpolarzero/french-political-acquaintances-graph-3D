import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring } from '@react-spring/three';
import useData from '../stores/useData';
import useEnv from '../stores/useEnv';

const Groups = () => {
  const [positions, setPositions] = useState({});
  const { groups } = useData();
  const { initialCameraPosition } = useEnv();

  const clicked = useRef();

  /**
   * Set positions for each group
   */
  const getPositions = () => {
    let positions = {};
    const majorityGroupDistance = 3;
    const minorityGroupDistance = 40;

    // Filter the groups
    const majorityGroups = groups.filter((group) => group.maj);
    const oppositionGroups = groups.filter((group) => !group.maj);

    // Place the groups
    majorityGroups.forEach((group, index) => {
      const angle = (index / majorityGroups.length) * Math.PI * 2;
      const x = Math.cos(angle) * majorityGroupDistance;
      const z = Math.sin(angle) * majorityGroupDistance;
      positions[group.symbol] = [x, 0, z];
    });

    oppositionGroups.forEach((group, index) => {
      const angle = (index / oppositionGroups.length) * Math.PI * 2;
      const x = Math.cos(angle) * minorityGroupDistance;
      const z = Math.sin(angle) * minorityGroupDistance;
      positions[group.symbol] = [x, 0, z];
    });

    return positions;
  };

  /**
   * Zoom
   */
  const zoomIn = (e) => {
    console.log(e.object.userData);
    clicked.current = e.object;
  };

  const zoomOut = () => {
    // setCameraPosition({
    //   x: initialCameraPosition[0],
    //   y: initialCameraPosition[1],
    //   z: initialCameraPosition[2],
    // });
    clicked.current = null;
  };

  useFrame(({ camera }) => {
    if (clicked.current) {
      //   camera.lookAt(clicked.current.position);
      camera.position.lerp(
        {
          x: clicked.current.position.x,
          y: clicked.current.position.y + 10,
          z: clicked.current.position.z,
        },
        0.03,
      );
    } else {
      camera.lookAt(0, 0, 0);
    }
    return null;
  });

  useEffect(() => {
    setPositions(getPositions());
  }, [groups]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <group>
      {groups.map((group) => {
        return (
          <mesh
            key={group.symbol}
            position={positions[group.symbol]}
            userData={{ group: group.group }}
            onClick={zoomIn}
          >
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial color={getRandomColor()} />
          </mesh>
        );
      })}
    </group>
  );
};

export default Groups;
