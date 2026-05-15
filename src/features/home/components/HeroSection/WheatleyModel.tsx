"use client";

import { Center, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Object3D } from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { useWheatleyTracking } from "../../hooks/useWheatleyTracking";

export const WheatleyModel = () => {
  const { scene } = useGLTF("/models/wheatley-rigged.glb");
  const { size } = useThree();

  const clonedScene = useMemo(() => clone(scene), [scene]);
  const isCompact = size.width < 1024;
  const modelPosition = useMemo<[number, number, number]>(
    () => (isCompact ? [0, -0.35, -1] : [2.3, -0.3, -1]),
    [isCompact],
  );
  const modelScale = useMemo(() => (isCompact ? 0.085 : 0.1), [isCompact]);
  const modelRotation = useMemo<[number, number, number]>(
    () => (isCompact ? [0, -Math.PI / 1.8, 0] : [0, -Math.PI / 1.4, 0]),
    [isCompact],
  );
  const trackingOptions = useMemo(
    () => ({
      bodyLerp: isCompact ? 0.08 : 0.06,
      bodyPitch: isCompact ? 0.18 : 0.12,
      bodyYaw: isCompact ? 0.2 : 0.14,
      eyeYaw: isCompact ? 0.45 : 0.6,
      eyePitch: isCompact ? 0.32 : 0.45,
    }),
    [isCompact],
  );

  const groupRef = useRef<Group>(null);

  const eyeAim = useMemo<Object3D | null>(
    () => clonedScene.getObjectByName("eyelight_aimjoint_011") ?? null,
    [clonedScene],
  );

  const eyelid = useMemo<Object3D | null>(
    () => clonedScene.getObjectByName("eyelid_upper_main_061") ?? null,
    [clonedScene],
  );

  useWheatleyTracking({
    bodyRef: groupRef,
    eyeAim,
    eyelid,
    resetKey: isCompact,

    lerp: 0.1,

    ...trackingOptions,

    blinkInterval: 3,
    blinkDuration: 0.18,
  });

  return (
    <group
      ref={groupRef}
      position={modelPosition}
      rotation={modelRotation}
      scale={modelScale}
    >
      <Center>
        <primitive object={clonedScene} />
      </Center>
    </group>
  );
};

useGLTF.preload("/models/wheatley-rigged.glb");