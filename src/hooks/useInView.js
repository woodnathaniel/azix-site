import { useEffect, useState } from 'react';

const DEFAULTS = { threshold: 0.3, rootMargin: '0px 0px -8% 0px' };

// True once the element has scrolled into view (and stays true).
export function useInView(ref, options = DEFAULTS) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return undefined;
    if (typeof IntersectionObserver === 'undefined') { setSeen(true); return undefined; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setSeen(true); io.disconnect(); }
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, [ref, seen]); // eslint-disable-line react-hooks/exhaustive-deps
  return seen;
}
