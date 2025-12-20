import { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useFBX, useTexture } from "@react-three/drei";
import * as THREE from "three";

// ZooZoo Character with animation that plays once
const ZooZooCharacter = ({ isInView }: { isInView: boolean }) => {
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionRef = useRef<THREE.AnimationAction | null>(null);
  const hasPlayedRef = useRef(false);
  const fbx = useFBX("/models/Push_Stop_fbx.fbx");
  const texture = useTexture("/models/zoozoo-vodafone-better-version (1)/textures/0.jpeg");

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = true;
    texture.needsUpdate = true;

    const bodyMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Black eyes

    fbx.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry.attributes.color) mesh.geometry.deleteAttribute('color');
        // Check if this mesh is for eyes (common naming conventions)
        const name = mesh.name.toLowerCase();
        if (name.includes('eye') || name.includes('pupil') || name.includes('iris')) {
          mesh.material = eyeMaterial;
        } else {
          mesh.material = bodyMaterial;
        }
      }
    });

    if (fbx.animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(fbx);
      actionRef.current = mixerRef.current.clipAction(fbx.animations[0]);
      actionRef.current.setLoop(THREE.LoopOnce, 1);
      actionRef.current.clampWhenFinished = true;
    }

    return () => {
      bodyMaterial.dispose();
      eyeMaterial.dispose();
    };
  }, [fbx, texture]);

  // Play animation once when section comes into view
  useEffect(() => {
    if (isInView && !hasPlayedRef.current && actionRef.current) {
      actionRef.current.reset();
      actionRef.current.play();
      hasPlayedRef.current = true;
    }
  }, [isInView]);

  useFrame((_, delta) => mixerRef.current?.update(delta));

  return <primitive object={fbx} scale={1} position={[0.3, -1, 0]} rotation={[0, -Math.PI / 2, 0]} />;
};

// Scene wrapper to receive isInView prop
const AboutScene = ({ isInView }: { isInView: boolean }) => (
  <Suspense fallback={null}>
    <ZooZooCharacter isInView={isInView} />
  </Suspense>
);

interface AboutCanvasProps {
  isInView?: boolean;
}

const AboutCanvas = ({ isInView = false }: AboutCanvasProps) => (
  <div style={{ width: "100%", height: "100%", minHeight: "450px" }}>
    <Canvas camera={{ position: [0, 0.5, 4], fov: 45 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
      <ambientLight intensity={1} />
      <AboutScene isInView={isInView} />
    </Canvas>
  </div>
);

export default AboutCanvas;
