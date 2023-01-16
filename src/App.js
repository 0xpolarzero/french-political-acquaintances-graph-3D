import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Graph from './components/Graph';
import useData from './stores/useData';
import useEnv from './stores/useEnv';

const App = () => {
  const { setData, loaded } = useData();
  const { initialCameraPosition } = useEnv();

  useEffect(() => {
    setData();
  }, []);

  return (
    <>
      {loaded ? (
        <Canvas camera={{ position: initialCameraPosition }}>
          <Graph />
        </Canvas>
      ) : (
        <div className='loading'>Loading...</div>
      )}
    </>
  );
};

export default App;
