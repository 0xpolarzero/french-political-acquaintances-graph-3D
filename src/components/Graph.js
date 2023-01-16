import { Environment } from '@react-three/drei';
import Groups from './Groups';
import useGraphics from '../stores/useGraphics';
import useInteract from '../stores/useInteract';
import { useEffect } from 'react';

const Graph = () => {
  const { highQuality } = useGraphics();
  const { hovered } = useInteract();

  useEffect(() => {
    // console.log(hovered);
  }, [hovered]);

  return (
    <>
      <Groups />
      {highQuality && <Environment preset='city' />}
    </>
  );
};

export default Graph;
