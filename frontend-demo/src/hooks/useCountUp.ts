import { useEffect, useState } from "react";
import { useScrollAnimation } from "./useScrollAnimation";

export function useCountUp(target: number, duration: number = 2000) {
  const { ref, isVisible } = useScrollAnimation(0.3);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return { ref, count };
}
