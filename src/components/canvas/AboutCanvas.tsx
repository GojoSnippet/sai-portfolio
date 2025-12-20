import { useRef, Suspense, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

// ZooZoo Character - clone the scene to avoid affecting HeroCanvas
const ZooZooCharacter = ({ position, scale }: { position: [number, number, number]; scale: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/character.glb");
  const { actions } = useAnimations(animations, groupRef);

  // Clone the scene so we don't modify the cached original
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    // Apply white material to the CLONED scene only
    clonedScene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide,
        });
      }
    });

    // Play animations
    if (actions && Object.keys(actions).length > 0) {
      const firstAnimation = Object.values(actions)[0];
      if (firstAnimation) {
        firstAnimation.reset().fadeIn(0.5).play();
      }
    }
  }, [actions, clonedScene]);

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={[0, -Math.PI / 2, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
};

// Loading placeholder
const LoadingPlaceholder = () => {
  return (
    <group position={[0, 0, 0]} scale={1}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
    </group>
  );
};

// Scene
const AboutScene = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={2} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />

      {/* ZooZoo Character */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <ZooZooCharacter position={[0, -1.5, 0]} scale={1.5} />
      </Suspense>
    </>
  );
};

// Canvas component
const AboutCanvas = () => {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: "400px" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <AboutScene />
      </Canvas>
    </div>
  );
};

useGLTF.preload("/models/character.glb");

export default AboutCanvas;
