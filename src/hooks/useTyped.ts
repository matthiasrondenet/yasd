import { useState, useEffect } from 'react';

export const useTyped = (full: string, delay = 0, speed = 22, on = true): [string, boolean] => {
  const [output, setOutput] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!on) {
      setOutput(full);
      setDone(true);
      return;
    }
    setOutput('');
    setDone(false);
    let charIndex = 0;
    let cancelled = false;
    let tickId: ReturnType<typeof setTimeout> | undefined;

    const start = setTimeout(() => {
      const tick = () => {
        if (cancelled) return;
        charIndex++;
        setOutput(full.slice(0, charIndex));
        if (charIndex < full.length) tickId = setTimeout(tick, speed);
        else setDone(true);
      };
      tick();
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(start);
      clearTimeout(tickId);
    };
  }, [full, delay, speed, on]);

  return [output, done];
};
