import { useEffect } from 'react';
import * as THREE from 'three';
import Groups from './Groups';
import useData from '../stores/useData';

const geometry = new THREE.SphereGeometry(1, 32, 32);

const Graph = () => {
  const { groups } = useData();

  const texture = new THREE.TextureLoader().load(groups[0].data[0].image);

  useEffect(() => {
    console.log(groups);
  }, [groups]);

  return (
    // <div>
    //   {data.map((el) => {
    //     return (
    //       <div key={el.id}>
    //         <img src={el.image} alt={el.nom} />
    //         <div>{el.nom}</div>
    //       </div>
    //     );
    //   })}
    // </div>
    <Groups />
  );
};

export default Graph;
