import { useEffect, useState } from 'react';

const formatTime = (timeZone) =>
  new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone }).format(new Date());

/** Current time in a given IANA zone, refreshed on the minute. */
export function useLocalTime(timeZone) {
  const [time, setTime] = useState(() => formatTime(timeZone));

  useEffect(() => {
    let interval;
    const tick = () => setTime(formatTime(timeZone));
    tick();
    // Align to the next minute boundary, then tick every minute.
    const timeout = window.setTimeout(
      () => {
        tick();
        interval = window.setInterval(tick, 60_000);
      },
      60_000 - (Date.now() % 60_000),
    );
    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, [timeZone]);

  return time;
}
