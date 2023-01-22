import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ConfigProvider, theme } from 'antd';
import Graph from 'src/components/Graph';
import Interface from 'src/components/Interface';
import { useData, useEnv, useInterface } from 'src/stores';

const App = () => {
  const { setData, loaded, error } = useData();
  const { initialCameraPosition } = useEnv();

  const { setDrawer } = useInterface();

  useEffect(() => {
    setData();

    setDrawer(null, null, 'global');
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
