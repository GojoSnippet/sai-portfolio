import { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useFBX, Center, useTexture, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// ZooZoo Character with animation from Push_Stop_fbx.fbx
const ZooZooCharacter = ({ position, scale }: { position: [number, number, number]; scale: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  // Load the rigged FBX model with animation
  const fbx = useFBX("/models/Push_Stop_fbx.fbx");

  // Load the texture
  const texture = useTexture("/models/zoozoo-vodafone-better-version (1)/textures/0.jpeg");

  useEffect(() => {
    console.log("=== Push_Stop_fbx.fbx Loaded ===");
    console.log("Animations:", fbx.animations.length);

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
        console.log("Mesh:", mesh.name, "UV:", mesh.geometry.attributes.uv ? "yes" : "no");
      }
    });

    // Set up animation
    if (fbx.animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(fbx);
      const action = mixerRef.current.clipAction(fbx.animations[0]);
      action.play();
      console.log("Playing animation:", fbx.animations[0].name);
    }

    return () => {
      bodyMaterial.dispose();
    };
  }, [fbx, texture]);

  // Animation loop
  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={[0, -Math.PI / 2, 0]}>
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
      {/* ZooZoo Character - scale back to 1, let Center handle positioning */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <ZooZooCharacter position={[0, 0, 0]} scale={1} />
      </Suspense>
    </>
  );
};

// Canvas component
const AboutCanvas = () => {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: "400px" }}>
      <Canvas
        camera={{ position: [0, 100, 300], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <OrbitControls />
        <AboutScene />
      </Canvas>
    </div>
  );
};

export default AboutCanvas;
