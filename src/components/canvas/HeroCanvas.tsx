import { useRef, Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Float, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

// Zoo Zoo Character with animations
const ZooZooCharacter = ({ position, scale }: { position: [number, number, number]; scale: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/character.glb");
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAnimation = Object.values(actions)[0];
      if (firstAnimation) {
        firstAnimation.reset().fadeIn(0.5).play();
      }
    }
  }, [actions]);

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={groupRef} position={position} scale={scale} rotation={[0, -0.4, 0]}>
        <primitive object={scene} />
      </group>
    </Float>
  );
};

// Loading placeholder
const LoadingPlaceholder = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
      <group position={[2.5, 0, 0]} scale={1.2}>
        <mesh>
          <capsuleGeometry args={[0.6, 1, 16, 32]} />
          <meshStandardMaterial color="#f0f0f0" roughness={0.8} metalness={0} />
        </mesh>
      </group>
    </Float>
  );
};

// Clamp helper function (like CSS clamp)
const clamp = (min: number, value: number, max: number) => Math.min(Math.max(value, min), max);

// Main scene with responsive positions
const SkyScene = () => {
  const { size } = useThree();
  const vw = size.width;

  // Mobile: center the character, otherwise position to the right
  const isMobile = vw < 576;

  // Viewport-relative positioning using clamp
  // X: 0 on mobile, scales from 1.5 to 3 based on viewport width
  const xPos = isMobile ? 0 : clamp(1.5, vw * 0.002, 3);

  // Y: slightly lower on mobile for text space above
  const yPos = isMobile ? -2.5 : clamp(-2, -vw * 0.0012, -1.5);

  // Scale: grows with viewport, clamped between 1.2 and 1.8
  const characterScale = clamp(1.2, vw / 900, 1.8);

  const characterPosition: [number, number, number] = [xPos, yPos, 0];

  return (
    <>
      {/* Bright, cheerful lighting */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 10, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-3, 5, 3]} intensity={0.6} color="#ffffff" />
      <hemisphereLight intensity={0.6} groundColor="#6366f1" color="#ffffff" />

      {/* ZooZoo Character */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <ZooZooCharacter position={characterPosition} scale={characterScale} />
      </Suspense>
    </>
  );
};

// Canvas component
const HeroCanvas = () => {
  return (
    <div className="w-100 h-100">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SkyScene />
      </Canvas>
    </div>
  );
};

useGLTF.preload("/models/character.glb");

export default HeroCanvas;
