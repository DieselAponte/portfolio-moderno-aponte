"use client";

import { Center, useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group, Object3D } from "three";
import { useWheatleyTracking } from "../../hooks/useWheatleyTracking";

export const WheatleyModel = () => {
  const { scene } = useGLTF("/models/wheatley-rigged.glb");

  const groupRef = useRef<Group>(null);

  const eyeAim = useMemo<Object3D | null>(
    () => scene.getObjectByName("eyelight_aimjoint_011") ?? null,
    [scene],
  );

  const eyelid = useMemo<Object3D | null>(
    () => scene.getObjectByName("eyelid_upper_main_061") ?? null,
    [scene],
  );

  useWheatleyTracking({
    bodyRef: groupRef,
    eyeAim,
    eyelid,

    lerp: 0.1,

    bodyLerp: 0.06,
    bodyPitch: 0.12,
    bodyYaw: 0.14,

    blinkInterval: 3,
    blinkDuration: 0.18,
  });

  return (
    <group
      ref={groupRef}
      position={[2.3, -0.3, -1]}
      rotation={[0, -Math.PI / 1.4, 0]}
      scale={0.1}
    >
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
};

useGLTF.preload("/models/wheatley-rigged.glb");