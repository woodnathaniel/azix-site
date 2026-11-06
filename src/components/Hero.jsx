import { useEffect, useRef, useState } from 'react';
import Devices3D from './Devices3D.jsx';

const WORDS = ['Run', 'the', 'whole', 'site', 'from', 'your'];

export default function Hero({ onPlay }) {
  const h1 = useRef(null);
  const [gl, setGl] = useState(false);

  // the headline tilts slightly with the pointer
  useEffect(() => {
    const el = h1.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const on = (e) => {
      const x = e.clientX / window.innerWidth - 0.5, y = e.clientY / window.innerHeight - 0.5;
      el.style.setProperty('--ry', `${(x * 7).toFixed(2)}deg`);
      el.style.setProperty('--rx', `${(-y * 5).toFixed(2)}deg`);
    };
    window.addEventListener('pointermove', on, { passive: true });
    return () => window.removeEventListener('pointermove', on);
  }, []);

  return (
    <section className="hero">
      <div className="wrap grid">
        <div className="hcopy">
          <h1 ref={h1}>
            {WORDS.map((w, i) => (<span key={w}><span className="w" style={{ '--i': i }}>{w}</span>{' '}</span>))}
            <em className="w" style={{ '--i': 6 }}>pocket.</em>
          </h1>
          <p className="lead">Stores, procurement, equipment and approvals in one place, with AI watching.</p>
          <div className="cta">
            <a className="btn pri" href="#contact">Talk to Axis</a>
            <button className="btn alt play" type="button" aria-haspopup="dialog" onClick={(e) => onPlay(e.currentTarget)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="currentColor" opacity=".12" /><path d="M10 8l6 4-6 4z" fill="currentColor" /></svg>
              Watch the promo
            </button>
          </div>
        </div>

        <div className={`fan${gl ? ' has-gl' : ''}`} aria-label="Azix on a phone and on the desktop: the dashboard, the approval inbox and the AI assistant">
          <Devices3D preset="hero" onReady={setGl} />
          <div className="dw" aria-hidden="true"><img src="/img/InsightsDesktop.png" alt="" width="1405" height="857" /></div>
          <div className="ph p-l"><div className="phone"><img src="/img/ApprovalInbox.png" alt="Approval inbox showing whose turn it is to sign" width="780" height="1688" /></div></div>
          <div className="ph p-r"><div className="phone"><img src="/img/NathanChat.png" alt="Ask Nathan listing the lowest-balance items" width="780" height="1688" /></div></div>
          <div className="ph p-c"><div className="phone"><img src="/img/Dashboard.png" alt="Azix dashboard with pending approvals and open requests" width="780" height="1688" /></div></div>
          <span className="pop a"><i></i>Your turn to sign</span>
          <span className="pop o b"><i></i>Signed · audit-logged</span>
          <span className="pop c"><i></i>Low stock spotted</span>
        </div>
      </div>
    </section>
  );
}
