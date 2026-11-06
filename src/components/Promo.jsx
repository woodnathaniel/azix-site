import { useEffect, useRef } from 'react';
import { Eyebrow, Split } from './Text.jsx';
import { useNarrow } from '../hooks/useNarrow.js';

function mediaFor(narrow) {
  return narrow
    ? { src: '/video/azix-promo-portrait.mp4', poster: '/img/promo-poster-portrait.jpg', ratio: '9 / 16' }
    : { src: '/video/azix-promo-wide.mp4', poster: '/img/promo-poster.jpg', ratio: '16 / 9' };
}

// Promo strip: a muted, looping preview that plays while it is on screen. Tapping opens the player with sound.
export function PromoStrip({ onPlay, paused }) {
  const narrow = useNarrow();
  const media = mediaFor(narrow);
  const video = useRef(null);

  useEffect(() => {
    const v = video.current;
    if (!v) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const play = () => { const p = v.play(); if (p && p.catch) p.catch(() => { /* the poster stays; a tap opens the player */ }); };
    if (paused || reduce) { v.pause(); return undefined; }
    if (typeof IntersectionObserver === 'undefined') { play(); return undefined; }
    const io = new IntersectionObserver((en) => en.forEach((x) => (x.isIntersecting ? play() : v.pause())), { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, [paused, media.src]);

  return (
    <section id="promo">
      <div className="wrap sec">
        <div className="promo-strip">
          <div>
            <Eyebrow>The promo</Eyebrow>
            <Split className="h2">See Azix in 70 seconds.</Split>
            <div className="cta"><button className="btn pri" type="button" onClick={(e) => onPlay(e.currentTarget)}>Watch with sound</button></div>
          </div>
          <button className="promo-thumb rv from-r" type="button" aria-label="Watch the Azix promo with sound, 1 minute 10 seconds" onClick={(e) => onPlay(e.currentTarget)}>
            <video ref={video} key={media.src} src={media.src} poster={media.poster} muted loop playsInline preload="auto" tabIndex={-1} style={{ aspectRatio: media.ratio }} />
            <span className="snd">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H3v6h3l5 4z" /><path d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13" /></svg>
              Tap for sound
            </span>
            <span className="len">1:10</span>
          </button>
        </div>
      </div>
    </section>
  );
}

// Full player with sound. Closes on Escape or a click outside the video.
export function VideoModal({ open, onClose }) {
  const narrow = useNarrow();
  const media = mediaFor(narrow);
  const video = useRef(null);
  const closeBtn = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    const v = video.current;
    if (!v) return undefined;
    if (open) {
      v.currentTime = 0;
      const p = v.play(); if (p && p.catch) p.catch(() => { /* the viewer presses play */ });
      document.documentElement.style.overflow = 'hidden';
      closeBtn.current?.focus();
      requestAnimationFrame(() => boxRef.current?.classList.add('on'));
    } else {
      v.pause();
      boxRef.current?.classList.remove('on');
      document.documentElement.style.overflow = '';
    }
    return () => { document.documentElement.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const on = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', on);
    return () => document.removeEventListener('keydown', on);
  }, [open, onClose]);

  return (
    <div ref={boxRef} className="vid" role="dialog" aria-modal="true" aria-label="Azix promo video" hidden={!open} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="vid-box">
        <button ref={closeBtn} className="vid-x" type="button" onClick={onClose}>Close</button>
        <video ref={video} controls playsInline preload="none" poster={media.poster} src={open ? media.src : undefined}></video>
      </div>
    </div>
  );
}
