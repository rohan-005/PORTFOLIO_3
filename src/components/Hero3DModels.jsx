import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Environment, RoundedBox, Sphere, Cylinder, Box, Torus, ContactShadows } from '@react-three/drei';

// Generic 3D Game Controller made from primitives
const GameController3D = () => {
  const groupRef = useRef();

  useFrame((state) => {
    // Gentle rotation
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 + 0.5;
    groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.5) * 0.1 + 0.2;
  });

  return (
    <group ref={groupRef} scale={1.5}>
      {/* Main Body */}
      <RoundedBox args={[3, 1.5, 0.5]} radius={0.2} smoothness={4} position={[0, 0, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial color="#1f2326" roughness={0.6} metalness={0.7} clearcoat={0.3} />
      </RoundedBox>
      
      {/* Left Grip */}
      <RoundedBox args={[1, 1.5, 0.5]} radius={0.3} smoothness={4} position={[-1.2, -0.5, 0]} rotation={[0, 0, -0.5]} castShadow receiveShadow>
         <meshPhysicalMaterial color="#0f1115" roughness={0.8} />
      </RoundedBox>

      {/* Right Grip */}
      <RoundedBox args={[1, 1.5, 0.5]} radius={0.3} smoothness={4} position={[1.2, -0.5, 0]} rotation={[0, 0, 0.5]} castShadow receiveShadow>
         <meshPhysicalMaterial color="#0f1115" roughness={0.8} />
      </RoundedBox>

      {/* D-Pad */}
      <group position={[-0.8, 0.2, 0.3]} castShadow>
         <Box args={[0.5, 0.15, 0.1]} castShadow><meshPhysicalMaterial color="#84B179" roughness={0.4} metalness={0.2} /></Box>
         <Box args={[0.15, 0.5, 0.1]} castShadow><meshPhysicalMaterial color="#84B179" roughness={0.4} metalness={0.2} /></Box>
      </group>

      {/* Action Buttons */}
      <group position={[0.8, 0.2, 0.3]}>
        <Sphere args={[0.1, 16, 16]} position={[0, 0.25, 0]} castShadow><meshPhysicalMaterial color="#E8F5BD" emissive="#84B179" emissiveIntensity={0.8} /></Sphere>
        <Sphere args={[0.1, 16, 16]} position={[0, -0.25, 0]} castShadow><meshPhysicalMaterial color="#A2CB8B" /></Sphere>
        <Sphere args={[0.1, 16, 16]} position={[-0.25, 0, 0]} castShadow><meshPhysicalMaterial color="#A2CB8B" /></Sphere>
        <Sphere args={[0.1, 16, 16]} position={[0.25, 0, 0]} castShadow><meshPhysicalMaterial color="#A2CB8B" /></Sphere>
      </group>

      {/* Joysticks */}
      <Cylinder args={[0.2, 0.2, 0.2, 32]} position={[-0.4, -0.3, 0.3]} rotation={[Math.PI/2, 0, 0]} castShadow>
         <meshPhysicalMaterial color="#1a221f" roughness={0.9} />
      </Cylinder>
      <Cylinder args={[0.2, 0.2, 0.2, 32]} position={[0.4, -0.3, 0.3]} rotation={[Math.PI/2, 0, 0]} castShadow>
         <meshPhysicalMaterial color="#1a221f" roughness={0.9} />
      </Cylinder>
    </group>
  );
};

// 3D React Logo created with Torus geometries
const ReactLogo3D = () => {
  const groupRef = useRef();

  useFrame((state) => {
    groupRef.current.rotation.y += 0.01;
    groupRef.current.rotation.x += 0.005;
  });

  const material = <meshPhysicalMaterial color="#E8F5BD" emissive="#84B179" emissiveIntensity={0.4} metalness={0.9} roughness={0.1} clearcoat={1} />;

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Center Core */}
      <Sphere args={[0.3, 32, 32]} castShadow>
        <meshPhysicalMaterial color="#E8F5BD" emissive="#A2CB8B" emissiveIntensity={1} metalness={1} roughness={0} />
      </Sphere>
      
      {/* Electron Rings */}
      <Torus args={[1.5, 0.05, 32, 100]} rotation={[0, 0, 0]} castShadow receiveShadow>{material}</Torus>
      <Torus args={[1.5, 0.05, 32, 100]} rotation={[Math.PI/2, 0, Math.PI/3]} castShadow receiveShadow>{material}</Torus>
      <Torus args={[1.5, 0.05, 32, 100]} rotation={[Math.PI/2, 0, -Math.PI/3]} castShadow receiveShadow>{material}</Torus>
    </group>
  );
};

export const Hero3DModel = ({ type }) => {
  return (
    <div style={{ width: '100%', height: '500px', cursor: 'grab' }}>
      <Canvas shadows camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight castShadow position={[10, 10, 5]} intensity={1.5} color="#ffffff" shadow-mapSize={[1024, 1024]} shadow-bias={-0.001} />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#A2CB8B" />
        <Environment preset="city" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
           {type === 'game' ? <GameController3D /> : <ReactLogo3D />}
        </Float>
        
        <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.6} far={10} color="#000000" position={[0, -2.5, 0]} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};
