import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import * as THREE from 'three';
import Individuals from './Individuals';
import useData from '../stores/useData';
import { getGroupsPositions } from '../systems/groups';
import { Float } from '@react-three/drei';

const Groups = () => {
  const { groups: entities } = useData();
  const [entitiesPositions, setEntitiesPositions] = useState({});
  const [groupPosition, setGroupPosition] = useState([0, 0, 0]);
  const [groupRotation, setGroupRotation] = useState([0, 0, 0]);

  const group = useRef();
  const clicked = useRef();
  const center = new THREE.Vector3(0, 0, 0);

  const { camera } = useThree();
  const { position: springedGroupPosition, rotation: springedGroupRotation } =
    useSpring({
      position: groupPosition,
      rotation: groupRotation,
    });

  /**
   * Zoom
   */
  const zoomIn = (e) => {
    e.stopPropagation();
    clicked.current = e.object;
    const groupVector = new THREE.Vector3(
      groupPosition[0],
      groupPosition[1],
      groupPosition[2],
    );

    // Get the vector center -> camera
    const centerToCamera = new THREE.Vector3();
    centerToCamera.subVectors(camera.position, center);

    // Get the vector center -> clicked object
    const centerToClicked = new THREE.Vector3();
    centerToClicked.subVectors(clicked.current.position, center);

    // Calculate the rotation that needs to be performed so that the originVector becomes the targetVector
    const rotationEuler = new THREE.Euler();
    rotationEuler.setFromQuaternion(
      new THREE.Quaternion().setFromUnitVectors(
        centerToCamera,
        centerToClicked,
      ),
    );

    // ! but need to pretend the angle 0 would be camera -> center
    // ! which may not be the case

    // Log new vectors for clicked->group and camera->center
    console.log('center -> clicked', centerToClicked);
    console.log('center -> camera', centerToCamera);

    console.log('clicked position now', clicked.current.position);
    setGroupRotation([rotationEuler.x, rotationEuler.y, rotationEuler.z]);

    /**
     * Position
     */
    // setGroupPosition([
    //   -clicked.current.position.x,
    //   -clicked.current.position.y,
    //   -clicked.current.position.z,
    // ]);
  };

  const zoomOut = () => {
    clicked.current = null;

    // Move and rotate the group back to its original position
    setGroupPosition([0, 0, 0]);
    setGroupRotation([0, 0, 0]);
  };

  useEffect(() => {
    setEntitiesPositions(getGroupsPositions(entities));
  }, [entities]);

  useEffect(() => {}, [groupRotation]);

  return (
    <animated.group
      ref={group}
      onPointerMissed={zoomOut}
      position={springedGroupPosition}
      rotation={springedGroupRotation}
    >
      {entities.map((group) => {
        return (
          <group key={group.symbol}>
            <Float speed={1} floatIntensity={0.1} rotationIntensity={0.1}>
              <mesh
                position={entitiesPositions[group.symbol]}
                userData={{ symbol: group.symbol }}
                onClick={zoomIn}
              >
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color={group.color} />
              </mesh>
            </Float>
            <Individuals
              group={group}
              basePosition={entitiesPositions[group.symbol]}
            />
          </group>
        );
      })}
    </animated.group>
  );
};

export default Groups;
