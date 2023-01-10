import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Graph from './components/Graph';
import useData from './stores/useData';

const App = () => {
  const { data, setData } = useData();

  useEffect(() => {
    setData();
  }, []);

  return (
    <>
      {data.length === 0 ? (
        <div className='loading'>Loading...</div>
      ) : (
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Graph />
        </Canvas>
      )}
    </>
  );
};

export default App;
