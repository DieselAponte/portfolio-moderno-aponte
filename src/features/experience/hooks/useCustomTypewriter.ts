import { useEffect, useState } from "react";

interface TypewriterOptions {
  text: string;
  speed?: number;
  startDelay?: number;
  enabled?: boolean;
  onComplete?: () => void;
  resetSignal?: number;
}

interface TypewriterState {
  typedText: string;
  isComplete: boolean;
  hasStarted: boolean;
}

export const useCustomTypewriter = ({
  text,
  speed = 40,
  startDelay = 0,
  enabled = true,
  onComplete,
  resetSignal,
}: TypewriterOptions): TypewriterState => {
  const [typedText, setTypedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setTypedText("");
      setIsComplete(false);
      setHasStarted(false);
      return;
    }

    let isActive = true;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let delayId: ReturnType<typeof setTimeout> | undefined;

    setTypedText("");
    setIsComplete(false);
    setHasStarted(false);

    delayId = setTimeout(() => {
      if (!isActive) return;
      setHasStarted(true);
      let index = 0;

      intervalId = setInterval(() => {
        if (!isActive) return;
        index += 1;
        setTypedText(text.slice(0, index));

        if (index >= text.length) {
          if (intervalId) clearInterval(intervalId);
          setIsComplete(true);
          if (onComplete) onComplete();
        }
      }, speed);
    }, startDelay);

    return () => {
      isActive = false;
      if (delayId) clearTimeout(delayId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay, enabled, onComplete, resetSignal]);

  return { typedText, isComplete, hasStarted };
};
