import { useEffect, useState } from 'react';

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** True once the target moment has passed. */
  isComplete: boolean;
}

function compute(targetMs: number): CountdownValue {
  const diff = Math.max(0, targetMs - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
    isComplete: diff <= 0,
  };
}

/**
 * Live countdown to an ISO-8601 timestamp. The target carries its own
 * UTC offset (e.g. "+05:30" for Asia/Kolkata), so the result is correct for
 * guests in any timezone — no matter what their phone clock zone is.
 */
export function useCountdown(targetIso: string): CountdownValue {
  const targetMs = new Date(targetIso).getTime();
  const [value, setValue] = useState(() => compute(targetMs));

  useEffect(() => {
    setValue(compute(targetMs));
    let timer: number | undefined;
    // Align ticks to the start of each second for smooth updates.
    const tick = () => {
      const next = compute(targetMs);
      setValue(next);
      if (!next.isComplete) timer = window.setTimeout(tick, 1000 - (Date.now() % 1000) + 5);
    };
    timer = window.setTimeout(tick, 1000 - (Date.now() % 1000) + 5);
    // Re-sync when the tab becomes visible again (mobile browsers pause timers).
    const onVisible = () => document.visibilityState === 'visible' && setValue(compute(targetMs));
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [targetMs]);

  return value;
}
