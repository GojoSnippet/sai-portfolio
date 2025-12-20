import { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useFBX, Center, useTexture } from "@react-three/drei";
import * as THREE from "three";

// ZooZoo Character from new FBX with texture
const ZooZooCharacter = ({ position, scale }: { position: [number, number, number]; scale: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Load the FBX model
  const fbx = useFBX("/models/zoozoo-vodafone-better-version (1)/source/ZooZoo Vodafone Better Version.fbx");

  // Load the texture from the textures folder
  const texture = useTexture("/models/zoozoo-vodafone-better-version (1)/textures/0.jpeg");

  useEffect(() => {
    // Configure texture for UV mapping
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = true;
    texture.needsUpdate = true;

    // Create material with texture (white/gray body, black eyes)
    const bodyMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });

    // Apply to all meshes
    fbx.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // Remove vertex colors if they exist (they can override material)
        if (mesh.geometry.attributes.color) {
          mesh.geometry.deleteAttribute('color');
        }

        mesh.material = bodyMaterial;
        mesh.frustumCulled = false;
      }
    });

    return () => {
      bodyMaterial.dispose();
    };
  }, [fbx, texture]);

  // Add gentle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <Center>
        <primitive object={fbx} />
      </Center>
    </group>
  );
};

// Loading placeholder
const LoadingPlaceholder = () => {
  return (
    <group position={[0, 0, 0]} scale={1}>
      <mesh>
        <capsuleGeometry args={[0.3, 0.8, 16, 32]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
    </group>
  );
};

// Scene
const AboutScene = () => {
  return (
    <>
      {/* ZooZoo Character */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <ZooZooCharacter position={[0, -0.3, 0]} scale={1.3} />
      </Suspense>
    </>
  );
};

// Canvas component
const AboutCanvas = () => {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: "400px" }}>
      <Canvas
        camera={{ position: [0, 0.5, 3], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <AboutScene />
      </Canvas>
    </div>
  );
};

export default AboutCanvas;
