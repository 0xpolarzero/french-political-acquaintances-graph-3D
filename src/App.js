import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ConfigProvider, theme } from 'antd';
import Graph from 'src/components/Graph';
import Interface from 'src/components/Interface';
import AlertModal from 'src/components/Interface/AlertModal';
import { useData, useEnv } from 'src/stores';
import { isMobile } from 'react-device-detect';

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
              {isMobile && (
                <AlertModal
                  type='warning'
                  message={
                    <span>
                      Nous vous conseillons de visiter le site sur un ordinateur
                      pour une meilleure expérience.
                      <br />
                      <br />
                      La version mobile ne permet pas de profiter pleinement de
                      toutes les fonctionnalités, et engendre des affichages
                      parfois illisibles.
                    </span>
                  }
                />
              )}
            </ConfigProvider>
          </>
        ) : (
          <div className='loading'>Chargement...</div>
        )
      ) : (
        <div className='error'>
          Il semblerait qu'une erreur ait survenu pendant le chargement des
          données. Vous pouvez tenter de recharger la page. Si le problème
          persiste, merci de{' '}
          <a href='mailto:0xpolarzero@gmail.com'>nous contacter</a>.
        </div>
      )}
    </>
  );
};

export default App;
