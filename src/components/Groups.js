import { useEffect, useRef, useState } from 'react';
import { animated, useSpring } from '@react-spring/three';
import Individuals from './Individuals';
import Entity from './Entity';
import useData from '../stores/useData';
import { getGroupsPositions } from '../systems/groups';
import { Float, PresentationControls } from '@react-three/drei';
import useControls from '../hooks/useControls';

const Groups = () => {
  const { groups: entities } = useData();
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
          <animated.group key={group.symbol}>
            <Float speed={1} floatIntensity={0.1} rotationIntensity={0.1}>
              {/* <PresentationControls> */}
              <Entity
                data={{ symbol: group.symbol, stats: group.stats }}
                position={entitiesPositions[group.symbol]}
                baseColor={group.color}
                onClick={controls.goToObject}
                type='group'
              />
              {/* </PresentationControls> */}
            </Float>
            <Individuals
              group={group}
              basePosition={entitiesPositions[group.symbol]}
            />
          </animated.group>
        );
      })}
    </group>
  );
};

export default Groups;
