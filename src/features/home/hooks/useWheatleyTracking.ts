import { useFrame } from "@react-three/fiber";
import { useRef, type RefObject } from "react";
import { MathUtils, type Object3D } from "three";

type WheatleyTrackingOptions = {
	body?: Object3D | null;
	bodyRef?: RefObject<Object3D | null>;
	eyeAim?: Object3D | null;
	eyelid?: Object3D | null;
	lerp?: number;
	bodyLerp?: number;
	bodyPitch?: number;
	bodyYaw?: number;
	blinkInterval?: number;
	blinkDuration?: number;
	blinkStrength?: number;
};

export const useWheatleyTracking = ({
	body,
	bodyRef,
	eyeAim,
	eyelid,
	lerp = 0.1,
	bodyLerp = 0.08,
	bodyPitch = 0.2,
	bodyYaw = 0.18,
	blinkInterval = 3,
	blinkDuration = 0.18,
	blinkStrength = 0.35,
}: WheatleyTrackingOptions) => {
	const baseRotation = useRef<{ x: number; y: number; z: number } | null>(
		null,
	);
	const lastBody = useRef<Object3D | null>(null);

	useFrame(({ pointer, clock }) => {
		const targetBody = bodyRef?.current ?? body ?? null;

		if (targetBody) {
			if (lastBody.current !== targetBody) {
				baseRotation.current = null;
				lastBody.current = targetBody;
			}

			if (!baseRotation.current) {
				baseRotation.current = {
					x: targetBody.rotation.x,
					y: targetBody.rotation.y,
					z: targetBody.rotation.z,
				};
			}

			const base = baseRotation.current;
			const targetBodyX = base.x + -pointer.y * bodyPitch;
			const targetBodyY = base.y + pointer.x * bodyYaw;
			targetBody.rotation.x = MathUtils.lerp(
				targetBody.rotation.x,
				targetBodyX,
				bodyLerp,
			);
			targetBody.rotation.y = MathUtils.lerp(
				targetBody.rotation.y,
				targetBodyY,
				bodyLerp,
			);
		}

		if (eyeAim) {
			const targetY = pointer.x * 0.6;
			const verticalSign = pointer.x >= 0 ? -1 : 1;
			const targetX = -pointer.y * 0.45 * verticalSign;
			eyeAim.rotation.y = MathUtils.lerp(eyeAim.rotation.y, targetY, lerp);
			eyeAim.rotation.x = MathUtils.lerp(eyeAim.rotation.x, targetX, lerp);
		}

		if (eyelid) {
			const t = clock.elapsedTime % blinkInterval;
			let blink = 0;
			if (t <= blinkDuration) {
				const phase = t / blinkDuration;
				blink = Math.sin(phase * Math.PI);
			}

			const target = blink * blinkStrength;
			eyelid.rotation.x = MathUtils.lerp(eyelid.rotation.x, target, lerp);
		}
	});
};
