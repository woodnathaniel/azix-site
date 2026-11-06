import { useEffect } from 'react';

// Fades in every `.rv` element as it scrolls into view, staggered among its siblings.
export function useReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll('.rv')];
    els.forEach((el) => {
      if (!el.style.getPropertyValue('--d')) {
        const sibs = [...el.parentNode.children].filter((c) => c.classList.contains('rv'));
        el.style.setProperty('--d', Math.min(sibs.indexOf(el), 8));
      }
    });
    const reveal = (el) => el.classList.add('in');
    let io;
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      els.forEach((el) => io.observe(el));
    } else els.forEach(reveal);
    const failSafe = setTimeout(() => els.forEach(reveal), 6000);
    return () => { clearTimeout(failSafe); if (io) io.disconnect(); };
  }, []);
}
