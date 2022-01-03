import { useEffect, useRef, useState } from "react";

export const useDebounce = (
  callback: (...args: any[]) => void,
  delay: number
) => {
  const latestCallback = useRef<typeof callback>();
  const [lastCalledAt, setLastCalledAt] = useState<null | number>(null);

  useEffect(() => {
    latestCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (lastCalledAt) {
      const fire = () => {
        setLastCalledAt(null);
        if (latestCallback.current) {
          latestCallback.current();
        }
      };

      const fireAt: number = lastCalledAt + delay;
      const id = setTimeout(fire, fireAt - Date.now());
      return () => clearTimeout(id);
    }
  }, [lastCalledAt, delay]);

  return () => setLastCalledAt(Date.now());
};
