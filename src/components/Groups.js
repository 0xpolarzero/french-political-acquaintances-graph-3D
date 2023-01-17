import { useEffect, useRef, useState } from 'react';
import { animated, useSpring } from '@react-spring/three';
import Individuals from './Individuals';
import Entity from './Entity';
import useData from '../stores/useData';
import { getGroupsPositions } from '../systems/groups';
import { Float, Html, PresentationControls } from '@react-three/drei';
import useControls from '../systems/hooks/useControls';
import useInteraction from '../stores/useInteraction';

const Groups = () => {
  const { organizedData: entities } = useData();
  const { setGroup, setHovered } = useInteraction();
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
  }, [controls]);

  useEffect(() => {
    if (clicked.current) {
      setGroup(clicked.current.userData);
    } else {
      setGroup(null);
    }
  }, [clicked.current, setGroup]);

  return (
    <group onPointerMissed={controls.reset}>
      {entities.map((group) => {
        return (
          <animated.group key={group.id}>
            <Float speed={1} floatIntensity={0.05} rotationIntensity={0.05}>
              {/* <PresentationControls> */}
              <Entity
                data={group}
                position={entitiesPositions[group.libelleAbrev]}
                onClick={controls.goToObject}
                type='group'
                onMouseEnter={(e) => setHovered(e, group, 'group')}
                onMouseLeave={(e) => setHovered(e, null, null)}
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
