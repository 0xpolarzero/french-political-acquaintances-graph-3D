import { Environment } from '@react-three/drei';
import Groups from './components';
import useGraphics from '../../stores/useGraphics';
import useInteraction from '../../stores/useInteraction';

const Graph = () => {
  const { highQuality } = useGraphics();
  const { hovered } = useInteraction();

  return (
    <>
      <Groups />
      {highQuality && <Environment preset='city' />}
    </>
  );
};

export default Graph;
