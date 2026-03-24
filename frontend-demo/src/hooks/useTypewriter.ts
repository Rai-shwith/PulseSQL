import { useState, useEffect, useCallback } from "react";

export function useTypewriter(text: string, speed: number = 30, startDelay: number = 0) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const reset = useCallback(() => {
    setDisplayText("");
    setIsComplete(false);
    setHasStarted(false);
  }, []);

  useEffect(() => {
    reset();
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, startDelay);
    return () => clearTimeout(startTimer);
  }, [text, startDelay, reset]);

  useEffect(() => {
    if (!hasStarted) return;
    if (displayText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [displayText, text, speed, hasStarted]);

  return { displayText, isComplete, reset };
}
