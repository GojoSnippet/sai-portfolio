import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useFBX } from "@react-three/drei";
import * as THREE from "three";

// ZooZoo Character watching the timeline (FBX version)
const ZooZooWatcher = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const fbx = useFBX("/models/ZooZoo.fbx");

  // Make the character look down as user scrolls through timeline
  useFrame(() => {
    if (groupRef.current) {
      const targetRotationX = scrollProgress * 0.3;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        0.05
      );
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group
        ref={groupRef}
        position={[0, -1, 0]}
        scale={0.02}
        rotation={[0, -0.6, 0]}
      >
        <primitive object={fbx} />
      </group>
    </Float>
  );
};

// Loading placeholder
const LoadingPlaceholder = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group position={[0, 0, 0]} scale={1}>
        <mesh>
          <capsuleGeometry args={[0.4, 0.8, 16, 32]} />
          <meshStandardMaterial color="#f0f0f0" roughness={0.8} metalness={0} />
        </mesh>
      </group>
    </Float>
  );
};

// Scene with character
const WatcherScene = ({ scrollProgress }: { scrollProgress: number }) => {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 10, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-3, 5, 3]} intensity={0.6} color="#ffffff" />
      <hemisphereLight intensity={0.5} groundColor="#0f172a" color="#ffffff" />

      <Suspense fallback={<LoadingPlaceholder />}>
        <ZooZooWatcher scrollProgress={scrollProgress} />
      </Suspense>
    </>
  );
};

// Canvas component
const ExperienceCanvas = ({ scrollProgress = 0 }: { scrollProgress?: number }) => {
  return (
    <div className="experience-canvas">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <WatcherScene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};

export default ExperienceCanvas;
