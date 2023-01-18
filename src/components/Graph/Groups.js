import { useEffect, useRef, useState } from 'react';
import { animated, useSpring } from '@react-spring/three';
import Individuals from './Individuals';
import Entity from './Entity';
import useData from '../../stores/useData';
import { getGroupsPositions } from '../../systems/groups';
import { Float, Html, PresentationControls } from '@react-three/drei';
import useControls from '../../systems/hooks/useControls';
import useInteraction from '../../stores/useInteraction';
import useInterface from '../../stores/useInterface';

const Groups = () => {
  const { organizedData: entities } = useData();
  const { setGroup, setHovered } = useInteraction();
  const { setDrawer } = useInterface();
  const [entitiesPositions, setEntitiesPositions] = useState({});

  const clicked = useRef();
  const controls = useControls(clicked);

  const onClick = (e) => {
    if (e.object.userData.id === clicked.current?.userData.id) {
      setDrawer(e, clicked.current.userData, 'group');
    } else {
      controls.goToObject(e);
    }
  };

  useEffect(() => {
    setEntitiesPositions(getGroupsPositions(entities));
    entities.map((entity) => {
      console.log(entity.majorityScore);
    });
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
                position={entitiesPositions[group.shortName]}
                onClick={onClick}
                type='group'
                onMouseEnter={(e) => setHovered(e, group, 'group')}
                onMouseLeave={(e) => setHovered(e, null, null)}
              />
              {/* </PresentationControls> */}
            </Float>
            <Individuals
              group={group}
              basePosition={entitiesPositions[group.shortName]}
            />
          </animated.group>
        );
      })}
    </group>
  );
};

export default Groups;
