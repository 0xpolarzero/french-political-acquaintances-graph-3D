import { Environment } from '@react-three/drei';
import Groups from './components';
import { useGraphics } from 'src/stores';

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
