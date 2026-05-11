"use client";

import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Noise } from "@react-three/postprocessing";
import { Suspense } from "react";
import { WheatleyModel } from "./WheatleyModel";

export const HeroSection = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0a0a0c]">
      <Canvas
        camera={{ position: [-0.6, 0.1, 5.2], fov: 35 }}
        dpr={[1, 2]}
        gl={{ powerPreference: "high-performance" }}
        className="h-full w-full"
      >
        <color attach="background" args={["#0a0a0c"]} />
        <ambientLight intensity={0.35} />
        <directionalLight intensity={1.15} position={[2.8, 2.4, 3.6]} />
        <pointLight
          intensity={0.9}
          position={[0.4, 0.2, 2.2]}
          color="#56ccf2"
        />
        <Suspense fallback={null}>
          <WheatleyModel />
        </Suspense>
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.6}
            intensity={0.6}
          />
          <Noise opacity={0.2} />
        </EffectComposer>
      </Canvas>

      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#56ccf2]">
            Aperture Archive // Subject 01
          </p>
          <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl md:text-7xl">
            DIESEL AUGUSTO
            <br />
            APONTE QUISPE
          </h1>
          <p className="mt-3 text-xl font-semibold text-[#f2994a] sm:text-2xl">
            Full-Stack Developer
          </p>
          <p className="mt-8 max-w-xl font-mono text-sm text-zinc-300 sm:text-base">
            "Innovacion tecnologica para el presente y el futuro"
          </p>
        </div>
      </div>
    </div>
  );
};
