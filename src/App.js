import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ConfigProvider, theme } from 'antd';
import Graph from 'src/components/Graph';
import Interface from 'src/components/Interface';
import { useData, useEnv } from 'src/stores';

const App = () => {
  const { setData, loaded, error } = useData();
  const { initialCameraPosition } = useEnv();

  useEffect(() => {
    setData();
  }, []);

  return (
    <>
      {!error ? (
        loaded ? (
          <>
            <Canvas camera={{ position: initialCameraPosition }}>
              <Graph />
            </Canvas>
            <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
              <Interface />
            </ConfigProvider>
          </>
        ) : (
          <div className='loading'>Loading...</div>
        )
      ) : (
        <div className='error'>Error!</div>
      )}
    </>
  );
};

export default App;
