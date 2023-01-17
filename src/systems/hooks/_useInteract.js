import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import useInteraction from '../../stores/useInteraction';

const useInteract = () => {
  const { camera, raycaster, scene, mouse } = useThree();
  const { hovered, setHovered, group } = useInteraction();

  const handleFrame = useRef((/* { raycaster, scene, mouse } */) => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const [first] = intersects;
      const { distance, object } = first;
      const { userData } = object;

      setHovered([userData]);
    } else {
      setHovered([]);
    }
  }).current;

  //   useFrame(handleFrame);
  useEffect(() => {
    const interval = setInterval(() => {
      handleFrame();
    }, 100);
  }, []);

  return null;
};

export default useInteract;
