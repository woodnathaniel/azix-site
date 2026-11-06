import { useEffect, useRef } from 'react';

// Draws 3D devices into a canvas. The 3D code (three.js) is loaded on demand, so the page
// paints first. Calls onReady(true) once WebGL works, so the parent can hide its flat
// fallback images; without WebGL (or while loading) the flat images stay.
export default function Devices3D({ preset, srcs, onReady }) {
  const ref = useRef(null);
  const key = Array.isArray(srcs) ? srcs.join('|') : '';
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    let dispose = null, cancelled = false;
    import('../three/devices.js').then(({ mountDevices, presets }) => {
      if (cancelled) return;
      const cfg = preset === 'hero' ? presets.hero() : presets[preset](srcs);
      dispose = mountDevices(canvas, cfg);
      onReady?.(Boolean(dispose));
    }).catch(() => onReady?.(false));
    return () => { cancelled = true; if (dispose) dispose(); onReady?.(false); };
  }, [preset, key]); // eslint-disable-line react-hooks/exhaustive-deps
  return <canvas ref={ref} className="gl" aria-hidden="true" />;
}
