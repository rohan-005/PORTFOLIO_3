import React, { useRef, Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF, Center, Bounds } from '@react-three/drei';

const CustomGLBModel = ({ url }) => {
  const { scene } = useGLTF(url);
  const groupRef = useRef();

  // Clone the scene and compute offsets once to avoid polluting Drei's global GLTF cache
  const { clonedScene, scale } = React.useMemo(() => {
    const clone = scene.clone();
    let meshCount = 0;
    
    // Traverse the cloned raw GLB geometry
    clone.traverse((child) => {
      if (child.isMesh) {
        meshCount++;
        child.castShadow = true;
        child.receiveShadow = true;
        
        const isGame = url.includes('game');
        child.material = new THREE.MeshPhysicalMaterial({
          color: isGame ? '#A2CB8B' : '#E8F5BD',
          metalness: 0.5,
          roughness: 0.3,
          clearcoat: 0.8,
          emissive: isGame ? '#102010' : '#202020',
        });
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const calculatedScale = maxDim > 0 ? 3.0 / maxDim : 1;

    // Center the geometry inside its local wrapper exactly
    clone.position.x = -center.x;
    clone.position.y = -center.y;
    clone.position.z = -center.z;

    console.log(`[3D_DEBUG] Cloned ${url} (Meshes: ${meshCount}, OrigSize: ${maxDim.toFixed(2)}, AppliedScale: ${calculatedScale.toFixed(2)})`);

    return { clonedScene: clone, scale: calculatedScale };
  }, [scene, url]);

  useFrame((state, delta) => {
    // Gentle floating rotation using the safe cumulative delta instead of deprecated clock
    if (groupRef.current) {
      // Create a persistent time accumulator attached to the group to replace state.clock
      groupRef.current.userData.time = (groupRef.current.userData.time || 0) + delta;
      const t = groupRef.current.userData.time;
      
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.2 + 0.5;
      groupRef.current.rotation.x = Math.cos(t * 0.5) * 0.1 + 0.2;
      groupRef.current.position.y = Math.sin(t) * 0.1; // Floating vertical motion added natively
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      <primitive object={clonedScene} />
    </group>
  );
};

export const Hero3DModel = ({ type }) => {
  const modelUrl = type === 'game' ? '/game_fixed.glb' : '/full_fixed.glb';

  return (
    <div style={{ width: '100%', height: '500px', position: 'relative', cursor: 'grab' }}>
      <Canvas shadows={{ type: THREE.PCFShadowMap }} camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight castShadow position={[10, 10, 5]} intensity={2} color="#ffffff" shadow-mapSize={[1024, 1024]} shadow-bias={-0.001} />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#A2CB8B" />
        <Environment preset="city" />
        
        <Suspense fallback={null}>
           <CustomGLBModel url={modelUrl} />
        </Suspense>
        
        <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.6} far={10} color="#000000" position={[0, -2.5, 0]} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

// Preload the fixed models so they cache instantly
useGLTF.preload('/game_fixed.glb');
useGLTF.preload('/full_fixed.glb');
