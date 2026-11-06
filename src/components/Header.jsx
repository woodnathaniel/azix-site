import { useEffect, useState } from 'react';

export function Logo() {
  return (
    <svg viewBox="-110 -110 220 220" aria-hidden="true">
      <g stroke="#0d2440" strokeWidth="9" strokeLinecap="round">
        <line x1="0" y1="0" x2="0" y2="-92" /><line x1="0" y1="0" x2="79.7" y2="-46" /><line x1="0" y1="0" x2="79.7" y2="46" />
        <line x1="0" y1="0" x2="0" y2="92" /><line x1="0" y1="0" x2="-79.7" y2="46" /><line x1="0" y1="0" x2="-79.7" y2="-46" />
      </g>
      <circle cx="0" cy="-92" r="15" fill="#0d2440" /><circle cx="79.7" cy="-46" r="15" fill="#f4791f" /><circle cx="79.7" cy="46" r="15" fill="#0d2440" />
      <circle cx="0" cy="92" r="15" fill="#f4791f" /><circle cx="-79.7" cy="46" r="15" fill="#0d2440" /><circle cx="-79.7" cy="-46" r="15" fill="#f4791f" />
      <circle cx="0" cy="0" r="42" fill="#0d2440" /><circle cx="0" cy="0" r="16" fill="#f7f9fd" />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <header className={`top${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap">
        <a className="brand" href="#top" aria-label="Azix, home">
          <Logo /><span>AZIX</span><span className="by">by Axis</span>
        </a>
        <nav className="nav" aria-label="Sections">
          <a className="l" href="#modules">Modules</a>
          <a className="l" href="#mobile">Mobile</a>
          <a className="l" href="#desktop">Desktop</a>
          <a className="l" href="#audit">Audit</a>
          <a className="btn pri sm" href="#contact">Talk to Axis</a>
        </nav>
      </div>
    </header>
  );
}
