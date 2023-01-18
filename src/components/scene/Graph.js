import { Environment } from '@react-three/drei';
import Groups from './Groups';
import useGraphics from '../../stores/useGraphics';
import useInteraction from '../../stores/useInteraction';
import { useEffect } from 'react';

const Graph = () => {
  const { highQuality } = useGraphics();
  const { hovered } = useInteraction();

  useEffect(() => {
    console.log(hovered);
  }, [hovered]);

  return (
    <>
      <Groups />
      {highQuality && <Environment preset='city' />}
    </>
  );
};

export default Graph;
