import { useEffect, useRef, useState } from 'react';
import { animated, useSpring } from '@react-spring/three';
import Individuals from './Individuals';
import Entity from './Entity';
import useData from '../stores/useData';
import { getGroupsPositions } from '../systems/groups';
import { Float, Html, PresentationControls } from '@react-three/drei';
import useControls from '../hooks/useControls';
import useInteract from '../stores/useInteract';

const Groups = () => {
  const { organizedData: entities } = useData();
  const { hovered, setHovered } = useInteract();
  const [entitiesPositions, setEntitiesPositions] = useState({});

  const clicked = useRef();
  const controls = useControls(clicked);

  useEffect(() => {
    setEntitiesPositions(getGroupsPositions(entities));
  }, [entities]);

  useEffect(() => {
    // window.addEventListener('mousewheel', zoom);
    window.addEventListener('keydown', controls.turnAroundObject);

    return () => {
      // window.removeEventListener('mousewheel', zoom);
      window.removeEventListener('keydown', controls.turnAroundObject);
    };
  });

  return (
    <group onPointerMissed={controls.reset}>
      {entities.map((group) => {
        return (
          <animated.group key={group.id}>
            <Html position={entitiesPositions[group.libelleAbrev]}>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  pointerEvents: 'none',
                }}
              >
                {group.libelleAbrev}
              </div>
            </Html>
            <Float speed={1} floatIntensity={0.1} rotationIntensity={0.1}>
              {/* <PresentationControls> */}
              <Entity
                data={group}
                position={entitiesPositions[group.libelleAbrev]}
                onClick={controls.goToObject}
                type='group'
                onMouseEnter={() => setHovered(group, 'group')}
                onMouseLeave={() => setHovered(null)}
              />
              {/* </PresentationControls> */}
            </Float>
            <Individuals
              group={group}
              basePosition={entitiesPositions[group.libelleAbrev]}
            />
          </animated.group>
        );
      })}
    </group>
  );
};

export default Groups;
