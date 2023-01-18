import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { BufferGeometry, BufferAttribute, Vector3 } from 'three';

const FragmentedSphere = ({
  position,
  scale,
  color,
  opacity,
  fragmentedFactor,
}) => {
  const { camera, gl } = useThree();
  const sphereRef = useRef();

  useEffect(() => {
    if (!sphereRef.current) return;

    const sphereGeometry = sphereRef.current.geometry;
    const originalPositions = sphereGeometry.attributes.position.array;
    const positions = new Float32Array(originalPositions.length);

    for (let i = 0; i < originalPositions.length; i += 3) {
      const x = originalPositions[i];
      const y = originalPositions[i + 1];
      const z = originalPositions[i + 2];

      // Apply fragmentation
      const radius = Math.sqrt(x * x + y * y + z * z);
      const r = radius + (Math.random() - 0.5) * fragmentedFactor * radius;
      const phi = Math.acos(z / radius);
      const theta = Math.atan2(y, x);

      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);
    }

    // Update the geometry
    sphereGeometry.setAttribute('position', new BufferAttribute(positions, 3));
    sphereGeometry.computeVertexNormals();
  }, [fragmentedFactor]);

  return (
    <mesh
      ref={sphereRef}
      position={position}
      scale={scale}
      //   geometry={BufferGeometry}
    >
      <sphereGeometry />
      <meshStandardMaterial color={color} opacity={opacity} transparent />
    </mesh>
  );
};

export default FragmentedSphere;
