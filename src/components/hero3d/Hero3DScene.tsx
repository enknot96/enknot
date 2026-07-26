"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import EnknotModel from "./EnknotModel";

type Props = {
  mouseRef: React.RefObject<{ x: number; y: number } | null>;
};

export default function Hero3DScene({ mouseRef }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.1} />
      <directionalLight
        position={[3, 4, 5]}
        intensity={0.1}
      />
      <directionalLight
        position={[-3, -2, 2]}
        intensity={0.2}
      />
      <Suspense fallback={null}>
        <EnknotModel mouseRef={mouseRef} />
      </Suspense>
    </Canvas>
  );
}
