import { useRef, useState, useEffect } from 'react';

export function useMeasure() {
  const ref = useRef<Element>(null);
  const [bounds, set] = useState<any>({ left: 0, top: 0, width: 0, height: 0 });
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => set(entry.contentRect));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [{ ref }, bounds];
}
