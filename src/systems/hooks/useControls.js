import { useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useEnv, useInteraction } from 'src/stores';

const OFFSET = 20;

const useControls = (clicked) => {
  const { initialCameraPositionVector, cameraLookAt } = useEnv();
  const { setIsCameraMoving, setIsCameraRotating } = useInteraction();
  const { camera } = useThree();

  const [cameraTarget, setCameraTarget] = useState(initialCameraPositionVector);
  const [isMoving, setIsMoving] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  useFrame(() => {
    camera.position.lerp(cameraTarget, 0.02);
    cameraLookAt.lerp(
      clicked.current ? clicked.current.position : new THREE.Vector3(0, 0, 0),
      0.02,
    );
    camera.lookAt(cameraLookAt);

    // Is the camera moving?
    if (camera.position.distanceTo(cameraTarget) > 0.1) {
      setIsMoving(true);
    } else {
      setIsMoving(false);
    }
    // Is the camera rotating?
    if (camera.position.distanceTo(cameraTarget) < 0.1) setIsRotating(false);
  });

  // Needs to be in a useEffect or it makes the whole scene very laggy
  useEffect(() => {
    setIsCameraMoving(isMoving);
  }, [isMoving, setIsCameraMoving]);

  useEffect(() => {
    setIsCameraRotating(isRotating);
  }, [isRotating, setIsCameraRotating]);

  useEffect(() => {
    // When clicked.current changes, set isMoving to true
    if (clicked.current) setIsCameraMoving(true);
  }, [clicked.current, setIsMoving]);

  return {
    goToObject: (e) => {
      e.stopPropagation();
      clicked.current = e.object;

      // Target a little above the clicked object
      const target = new THREE.Vector3()
        .subVectors(clicked.current.position, new THREE.Vector3(0, 0, 0))
        .normalize()
        .multiplyScalar(OFFSET)
        .add(clicked.current.position);

      // Draw a vector perpendicular to center -> object
      const vector = new THREE.Vector3()
        .subVectors(clicked.current.position, new THREE.Vector3(0, 0, 0))
        .normalize()
        .cross(new THREE.Vector3(0, 2, 0))
        .multiplyScalar(OFFSET);
      // target.add(vector);

      setCameraTarget(target);
    },

    reset: () => {
      clicked.current = null;
      setCameraTarget(initialCameraPositionVector);
    },

    zoom: (e) => {
      if (!clicked.current) return;

      const zoomFactor = 0.005;
      const zoom = e.deltaY > 0 ? zoomFactor : -zoomFactor;

      // Limit the zoom in
      if (clicked.current.position.distanceTo(cameraTarget) < 25) {
        if (zoom < 0) return;
        // and zoom out
      } else if (clicked.current.position.distanceTo(cameraTarget) > 100) {
        if (zoom > 0) return;
      }

      setCameraTarget(cameraTarget.multiplyScalar(1 + zoom));
    },

    turnAroundObject: (e) => {
      if (isRotating || !clicked.current) return;
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;

      e.stopPropagation();
      setIsRotating(true);

      // Set up the vectors
      let vecDirection;
      const vecLeft = new THREE.Vector3(0, -1, 0);
      const vecRight = new THREE.Vector3(0, 1, 0);

      // Get the direction
      if (e.key === 'ArrowRight') vecDirection = vecRight;
      if (e.key === 'ArrowLeft') vecDirection = vecLeft;

      // Find out the destination
      const vector = new THREE.Vector3()
        .subVectors(clicked.current.position, camera.position)
        // Rotate it in the right direction
        .cross(vecDirection)
        // Add the same offset as when going to the object
        .multiplyScalar(OFFSET)
        .normalize()
        // Multiply it by the distance between camera and object
        .multiplyScalar(camera.position.distanceTo(clicked.current.position));

      // Add the vector to the object position
      const target = new THREE.Vector3().addVectors(
        clicked.current.position,
        vector,
      );

      setCameraTarget(target);
    },
  };
};

export default useControls;
