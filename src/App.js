import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Graph from './components/Graph';
import useData from './stores/useData';
import useEnv from './stores/useEnv';

const App = () => {
  const { setAll, loaded } = useData();
  const { initialCameraPosition } = useEnv();

  useEffect(() => {
    setAll();
  }, []);

  return (
    <>
      {loaded ? (
        <Canvas camera={{ position: initialCameraPosition }}>
          {/* <OrbitControls /> */}
          <Graph />
        </Canvas>
      ) : (
        <div className='loading'>Loading...</div>
      )}
    </>
  );
};

export default App;
