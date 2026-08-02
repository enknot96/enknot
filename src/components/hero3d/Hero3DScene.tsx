"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import EnknotModel from "./EnknotModel";

type Props = {
  mouseRef: React.RefObject<{ x: number; y: number } | null>;
};

export default function Hero3DScene({ mouseRef }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 35 }}
      gl={{
        alpha: true,
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1,
      }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <Environment
          preset="studio"
          environmentIntensity={0.5}
        />
        <EnknotModel mouseRef={mouseRef} />
      </Suspense>
    </Canvas>
  );
}
