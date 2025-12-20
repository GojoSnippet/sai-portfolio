import { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useFBX, useTexture } from "@react-three/drei";
import * as THREE from "three";

// ZooZoo Character with push animation, turn, then sitting idle
const ZooZooCharacter = ({ isInView }: { isInView: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const sittingRef = useRef<THREE.Group>(null);
  const pushMixerRef = useRef<THREE.AnimationMixer | null>(null);
  const sittingMixerRef = useRef<THREE.AnimationMixer | null>(null);
  const pushActionRef = useRef<THREE.AnimationAction | null>(null);
  const sittingActionRef = useRef<THREE.AnimationAction | null>(null);
  const hasPlayedRef = useRef(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [hasTurnedToCamera, setHasTurnedToCamera] = useState(false);
  const [showSitting, setShowSitting] = useState(false);
  const currentRotation = useRef(-Math.PI / 2);
  const targetRotation = useRef(-Math.PI / 2);
  const basePosition = useRef({ x: 0.2, y: -0.8, z: 0 });
  
  // Load FBX for push and sitting
  const pushFbx = useFBX("/models/Push_Stop_fbx.fbx");
  const sittingFbx = useFBX("/models/Sitting.fbx");
  const texture = useTexture("/models/zoozoo-vodafone-better-version (1)/textures/0.jpeg");

  useEffect(() => {
    // Apply texture to push FBX
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = true;
    texture.needsUpdate = true;

    const bodyMaterial = new THREE.MeshBasicMaterial({ 
      map: texture, 
      side: THREE.DoubleSide,
      color: 0xcccccc
    });
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x111111 });

    pushFbx.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry.attributes.color) mesh.geometry.deleteAttribute('color');
        const name = mesh.name.toLowerCase();
        mesh.material = name.includes('eye') ? eyeMaterial : bodyMaterial;
      }
    });


    // Apply SAME material to sitting FBX
    sittingFbx.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry.attributes.color) mesh.geometry.deleteAttribute('color');
        const name = mesh.name.toLowerCase();
        mesh.material = name.includes('eye') ? eyeMaterial : bodyMaterial;
      }
    });

    // Set up push animation mixer
    pushMixerRef.current = new THREE.AnimationMixer(pushFbx);
    if (pushFbx.animations.length > 0) {
      pushActionRef.current = pushMixerRef.current.clipAction(pushFbx.animations[0]);
      pushActionRef.current.setLoop(THREE.LoopOnce, 1);
      pushActionRef.current.clampWhenFinished = true;
    }
    // Listen for push animation finished
    pushMixerRef.current.addEventListener('finished', (e) => {
      if (e.action === pushActionRef.current) {
        setAnimationFinished(true);
        targetRotation.current = 0;
      }
    });

    // Set up sitting animation mixer
    sittingMixerRef.current = new THREE.AnimationMixer(sittingFbx);
    if (sittingFbx.animations.length > 0) {
      sittingActionRef.current = sittingMixerRef.current.clipAction(sittingFbx.animations[0]);
      sittingActionRef.current.setLoop(THREE.LoopRepeat, Infinity);
    }

    return () => {
      pushMixerRef.current?.stopAllAction();
      sittingMixerRef.current?.stopAllAction();
      bodyMaterial.dispose();
      eyeMaterial.dispose();
    };
  }, [pushFbx, sittingFbx, texture]);

  // Play push animation when section comes into view
  useEffect(() => {
    if (isInView && !hasPlayedRef.current && pushActionRef.current) {
      pushActionRef.current.reset();
      pushActionRef.current.play();
      hasPlayedRef.current = true;
    }
  }, [isInView]);

  // Start sitting animation after turn completes
  useEffect(() => {
    if (hasTurnedToCamera && !showSitting && sittingActionRef.current) {
      sittingActionRef.current.reset();
      sittingActionRef.current.play();
      setShowSitting(true);
    }
  }, [hasTurnedToCamera, showSitting]);

  useFrame((_, delta) => {
    // Update the active mixer
    if (showSitting) {
      sittingMixerRef.current?.update(delta);
    } else {
      pushMixerRef.current?.update(delta);
    }
    
    if (groupRef.current && animationFinished) {
      const rotationSpeed = 2.5;
      const diff = targetRotation.current - currentRotation.current;
      
      if (Math.abs(diff) > 0.01) {
        currentRotation.current += diff * delta * rotationSpeed;
        groupRef.current.rotation.y = currentRotation.current;
      } else if (!hasTurnedToCamera) {
        setHasTurnedToCamera(true);
      }
    }
  });

  return (
    <group ref={groupRef} position={[basePosition.current.x, basePosition.current.y, basePosition.current.z]} rotation={[0, -Math.PI / 2, 0]}>
      {/* Show push model until sitting starts, then show sitting model */}
      {!showSitting && <primitive object={pushFbx} scale={1.15} />}
      {showSitting && (
        <primitive 
          ref={sittingRef}
          object={sittingFbx}
          scale={1.15}
        />
      )}
    </group>
  );
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
    <Canvas camera={{ position: [0, 0.3, 3.2], fov: 50 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <AboutScene isInView={isInView} />
    </Canvas>
  </div>
);

export default AboutCanvas;
