import { Environment } from '@react-three/drei';
import Groups from './Groups';
import useGraphics from '../stores/useGraphics';

const Graph = () => {
  const { highQuality } = useGraphics();

  return (
    <>
      <Groups />
      {highQuality && <Environment preset='city' />}
    </>
  );
};

export default Graph;
