import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Center,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";

import "./Product3DViewer.css";

function ShirtModel() {
  const modelRef = useRef();

  const { scene } = useGLTF("/models/shirt.glb");

  useFrame((state) => {
    if (!modelRef.current) return;

    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    const targetY = mouseX * 0.35;
    const targetX = mouseY * 0.12;

    modelRef.current.rotation.y +=
      (targetY - modelRef.current.rotation.y) * 0.04;

    modelRef.current.rotation.x +=
      (targetX - modelRef.current.rotation.x) * 0.04;
  });

  return (
    <group ref={modelRef}>
      <Center>
        <primitive
          object={scene}
          scale={2.8}
        />
      </Center>
    </group>
  );
}

function LoadingModel() {
  return (
    <mesh>
      <sphereGeometry args={[0.7, 32, 32]} />

      <meshStandardMaterial
        color="#d8d2c8"
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
}

function Product3DViewer() {
  return (
    <div className="product-3d-viewer">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 38,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        {/* Main lighting */}
        <ambientLight intensity={1.2} />

        {/* Front light */}
        <directionalLight
          position={[4, 5, 5]}
          intensity={2}
        />

        {/* Side light */}
        <directionalLight
          position={[-4, 2, 3]}
          intensity={1}
        />

        <Suspense fallback={<LoadingModel />}>
          <Environment preset="studio" />

          <ShirtModel />
        </Suspense>

        {/* User controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={7}
          rotateSpeed={0.8}
          zoomSpeed={0.7}
        />
      </Canvas>

      {/* 3D instruction */}
      <div className="product-3d-overlay">
        <span>3D PRODUCT</span>

        <p>DRAG TO ROTATE</p>
      </div>
    </div>
  );
}

useGLTF.preload("/models/shirt.glb");

export default Product3DViewer;