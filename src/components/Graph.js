import { useEffect } from 'react';
import useData from '../stores/useData';

const Graph = () => {
  const { data } = useData();

  useEffect(() => {
    console.log(data);
  });

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
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color='hotpink' />
    </mesh>
  );
};

export default Graph;
