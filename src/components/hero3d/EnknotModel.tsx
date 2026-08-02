"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/models/enknot_logo02.glb";

// 目視調整用パラメータ（すべて仮値）。
const MODEL_SCALE = 1.08;
const TARGET_PLANE_Z = 2.2;
const TARGET_PLANE_RANGE = 0.6;
const DAMPING = 6;

// 425px以下でCanvas幅に応じてなめらかに縮小し、はみ出しを防ぐ。
const RESPONSIVE_REFERENCE_WIDTH = 425;
const RESPONSIVE_MIN_WIDTH = 320;
const RESPONSIVE_MIN_SCALE_FACTOR = 0.7;

type MouseRef = React.RefObject<{ x: number; y: number } | null>;

type Props = {
  mouseRef: MouseRef;
};

export default function EnknotModel({ mouseRef }: Props) {
  const { scene } = useGLTF(MODEL_PATH);
  const groupRef = useRef<THREE.Group>(null);
  const lookTarget = useRef(new THREE.Vector3(0, 0, TARGET_PLANE_Z));
  const dummy = useRef(new THREE.Object3D());
  const canvasWidth = useThree((state) => state.size.width);

  const scale = useMemo(() => {
    const t = THREE.MathUtils.clamp(
      (canvasWidth - RESPONSIVE_MIN_WIDTH) / (RESPONSIVE_REFERENCE_WIDTH - RESPONSIVE_MIN_WIDTH),
      0,
      1,
    );
    const factor = RESPONSIVE_MIN_SCALE_FACTOR + (1 - RESPONSIVE_MIN_SCALE_FACTOR) * t;
    return MODEL_SCALE * factor;
  }, [canvasWidth]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const mouse = mouseRef.current;
    if (mouse) {
      lookTarget.current.set(
        mouse.x * TARGET_PLANE_RANGE,
        mouse.y * TARGET_PLANE_RANGE,
        TARGET_PLANE_Z,
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
      <group scale={scale}>
        <Center>
          <primitive object={scene} />
        </Center>
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
