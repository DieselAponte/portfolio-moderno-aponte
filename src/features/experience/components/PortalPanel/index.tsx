"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import type { TrajectoryStatus } from "../../types";

interface PortalPanelProps {
  id?: string;
  title?: string;
  subtitle?: string;
  status?: TrajectoryStatus;
  className?: string;
}

const joinClassNames = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(" ");

const BARCODE_HEIGHT = 28;
const BARCODE_WIDTH = 3;
const BARCODE_COUNT = 36;

const createBarcode = () =>
  Array.from({ length: BARCODE_COUNT }).map(() => ({
    width: BARCODE_WIDTH,
    height: BARCODE_HEIGHT,
  }));

const renderPictogram = (index: number) => {
  const variant = index % 4;

  if (variant === 0) {
    return <div className="h-3 w-3 bg-black/50" />;
  }

  if (variant === 1) {
    return <div className="h-3 w-3 rounded-full bg-black/50" />;
  }

  if (variant === 2) {
    return <div className="h-3 w-3 rotate-45 bg-black/50" />;
  }

  return (
    <div
      className="h-3 w-3 bg-black/50"
      style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
    />
  );
};

export default function PortalPanel({
  id = "01",
  title = "Computer Science",
  subtitle = "Aperture Education Initiative",
  status = "COMPLETED",
  className,
}: PortalPanelProps) {
  const panelControls = useAnimation();
  const numberControls = useAnimation();
  const [isBooting, setIsBooting] = useState(true);
  const [idleFlicker, setIdleFlicker] = useState(false);
  const barcodeBars = useMemo(createBarcode, []);
  const pictograms = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);

  useEffect(() => {
    let isActive = true;

    const runSequence = async () => {
      await panelControls.set({ opacity: 0, filter: "brightness(0.2)" });
      await numberControls.set({
        opacity: 0,
        clipPath: "inset(100% 0% 0% 0%)",
      });

      await new Promise((resolve) => setTimeout(resolve, 200));
      if (!isActive) return;

      await panelControls.start({
        opacity: [0, 1, 0.2, 1, 0.3, 1],
        filter: [
          "brightness(0.2)",
          "brightness(1.3)",
          "brightness(0.4)",
          "brightness(1.1)",
          "brightness(0.6)",
          "brightness(1)",
        ],
        transition: {
          duration: 0.9,
          times: [0, 0.2, 0.35, 0.55, 0.75, 1],
        },
      });

      if (!isActive) return;

      await panelControls.start({
        filter: [
          "brightness(0.9)",
          "brightness(1.2)",
          "brightness(0.85)",
          "brightness(1.05)",
          "brightness(1)",
        ],
        transition: { duration: 1.2, ease: "easeInOut" },
      });

      if (!isActive) return;

      await numberControls.start({
        opacity: 1,
        clipPath: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
        transition: { duration: 1.1, ease: "easeOut" },
      });

      if (!isActive) return;

      await panelControls.start({ opacity: 1, filter: "brightness(1)" });
      if (isActive) setIsBooting(false);
    };

    runSequence();

    return () => {
      isActive = false;
    };
  }, [panelControls, numberControls]);

  useEffect(() => {
    let flickerTimer: ReturnType<typeof setTimeout> | undefined;
    let startTimer: ReturnType<typeof setTimeout> | undefined;

    const scheduleFlicker = () => {
      const delay = 3000 + Math.random() * 3200;
      flickerTimer = setTimeout(() => {
        setIdleFlicker(true);
        setTimeout(() => setIdleFlicker(false), 120);
        scheduleFlicker();
      }, delay);
    };

    startTimer = setTimeout(scheduleFlicker, 2000);

    return () => {
      if (flickerTimer) clearTimeout(flickerTimer);
      if (startTimer) clearTimeout(startTimer);
    };
  }, []);

  return (
    <motion.div
      className={joinClassNames(
        "relative group h-[520px] w-[260px] overflow-hidden rounded-[6px] border border-black/20 bg-[#f0f0f0] text-black shadow-[0_0_22px_rgba(0,0,0,0.25)] md:h-[560px] md:w-[280px] lg:h-[620px] lg:w-[320px]",
        className,
      )}
      animate={panelControls}
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_0%,#ffffff_0%,#f0f0f0_40%,#e6e6e6_100%)]" />

      <div
        className={joinClassNames(
          "absolute inset-0 pointer-events-none transition-opacity duration-200",
          isBooting || idleFlicker ? "opacity-70" : "opacity-30",
        )}
      >
        <div className="absolute inset-0 bg-[#56ccf2] blur-3xl opacity-15" />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.08] bg-[linear-gradient(to_bottom,transparent_0%,transparent_50%,black_51%,transparent_52%)] bg-[length:100%_4px]" />

      <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.25)]" />

      <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
        <div className="text-[10px] font-mono tracking-[0.45em] text-black/70">
          APERTURE LABS
        </div>
        <div className="text-[10px] font-mono text-black/60">{title}</div>
      </div>

      <div className="absolute top-16 left-1/2 -translate-x-1/2">
        <motion.h1
          className="text-[12rem] font-black leading-none tracking-[-8px] text-black"
          style={{ fontFamily: "DIN, Helvetica, Arial, sans-serif" }}
          animate={numberControls}
        >
          {id}
        </motion.h1>
      </div>

      <div className="absolute top-[300px] right-0 z-10 h-[2px] w-[74%] bg-black/70" />

      <div className="absolute top-[328px] left-6 z-10 w-[75%]">
        <div className="mb-2 text-sm font-mono font-semibold tracking-wider">
          {id}/{id}
        </div>
        <div className="flex h-8 items-end justify-between">
          {barcodeBars.map((bar, index) => (
            <div
              key={`${index}-${bar.height}`}
              className="bg-black"
              style={{ width: `${bar.width}px`, height: `${bar.height}px` }}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-20 left-6 right-6 z-20">
        <div className="grid grid-cols-6 gap-2">
          {pictograms.map((index) => (
            <div
              key={index}
              className="flex aspect-square items-center justify-center border border-black/20 bg-black/5"
            >
              {renderPictogram(index)}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-6 right-6 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="relative h-5 w-5 rounded-full border border-black/60">
              <div className="absolute inset-[3px] border-l-2 border-black/70 rotate-[35deg]" />
            </div>
            <p className="text-[10px] font-mono tracking-[0.35em]">
              APERTURE
            </p>
          </div>
          <p className="mt-2 text-[10px] font-mono text-black/60">
            {subtitle}
          </p>
        </div>

        <div
          className={joinClassNames(
            "px-2 py-1 text-xs font-mono font-bold tracking-widest border",
            status === "COMPLETED"
              ? "border-green-600 text-green-700"
              : "border-orange-500 text-orange-600",
          )}
        >
          {status}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-10 bg-gradient-to-r from-[#56ccf2]/10 via-white/10 to-[#56ccf2]/5 blur-3xl" />
      </div>
    </motion.div>
  );
}
