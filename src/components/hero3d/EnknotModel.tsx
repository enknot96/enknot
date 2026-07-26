"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/models/enknot.glb";

// 目視調整用パラメータ（すべて仮値）。
const MODEL_SCALE = 0.6;
const TARGET_PLANE_Z = 2.2;
const TARGET_PLANE_RANGE = 2.4;
const DAMPING = 6;

type MouseRef = React.RefObject<{ x: number; y: number } | null>;

type Props = {
  mouseRef: MouseRef;
  onReady?: () => void;
};

export default function EnknotModel({ mouseRef, onReady }: Props) {
  const { scene } = useGLTF(MODEL_PATH);
  const groupRef = useRef<THREE.Group>(null);
  const lookTarget = useRef(new THREE.Vector3(0, 0, TARGET_PLANE_Z));
  const dummy = useRef(new THREE.Object3D());
  const readyFired = useRef(false);

  // useGLTFはSuspenseで待機するため、マウント=ロード完了のタイミング。
  useEffect(() => {
    if (!readyFired.current) {
      readyFired.current = true;
      onReady?.();
    }
  }, [onReady]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const mouse = mouseRef.current;
    if (mouse) {
      lookTarget.current.set(
        mouse.x * TARGET_PLANE_RANGE,
        mouse.y * TARGET_PLANE_RANGE,
        TARGET_PLANE_Z
      );
    } else {
      // マウスがHero外に出た場合は正面(初期姿勢)へ戻す。
      lookTarget.current.set(0, 0, TARGET_PLANE_Z);
    }

    dummy.current.position.copy(group.position);
    dummy.current.lookAt(lookTarget.current);

    const t = 1 - Math.exp(-DAMPING * delta);
    group.quaternion.slerp(dummy.current.quaternion, t);
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} scale={MODEL_SCALE} />
      </Center>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
