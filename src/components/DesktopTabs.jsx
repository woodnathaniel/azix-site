import { useEffect, useRef, useState } from 'react';
import { Eyebrow, Split } from './Text.jsx';

const VIEWS = [
  { id: 'inbox', tab: 'Requests inbox', img: '/img/DesktopInbox.png', alt: 'Desktop requests inbox: a list of requests, the approval chain and the items', d: 'Approve with the live chain beside you.', w: 1266, h: 792 },
  { id: 'equip', tab: 'Equipment', img: '/img/DesktopEquipment.png', alt: 'Desktop equipment registry: photo cards with service intervals', d: 'The whole fleet at a glance.', w: 1266, h: 792 },
  { id: 'notif', tab: 'Notifications', img: '/img/DesktopNotifications.png', alt: 'Desktop notifications with approve and reject beside the detail', d: 'Act on an update where you read it.', w: 1266, h: 792 },
  { id: 'raise', tab: 'New request', img: '/img/DesktopRaise.png', alt: 'Desktop request form with several items, project, urgency and reason', d: 'Several items in one request.', w: 1266, h: 792 },
  { id: 'ins', tab: 'Insights', img: '/img/InsightsDesktop.png', alt: 'Desktop home with the insights dashboard', d: 'What needs you, on the home page.', w: 1405, h: 857 }
];

export default function DesktopTabs() {
  const [shown, setShown] = useState(0);   // the screen on display
  const [swap, setSwap] = useState(false); // fading between screens
  const timer = useRef(0);
  const view = VIEWS[shown];

  useEffect(() => { VIEWS.forEach((v) => { const im = new Image(); im.src = v.img; }); return () => clearTimeout(timer.current); }, []);

  const select = (i) => {
    if (i === shown) return;
    setSwap(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { setShown(i); setSwap(false); }, 180);
  };

  return (
    <section className="tint" id="desktop">
      <div className="wrap sec">
        <div className="dsk-head">
          <div>
            <Eyebrow>On the desktop too</Eyebrow>
            <Split className="h2">The same records. The big screen.</Split>
          </div>
          <div className="chips"><span className="chip">Setup</span><span className="chip">Bulk work</span><span className="chip">Reports</span><span className="chip">Excel export</span></div>
        </div>

        <div className="tabs" role="tablist" aria-label="Desktop screens">
          {VIEWS.map((v, i) => (
            <button key={v.id} className="tab" role="tab" id={`t-${v.id}`} aria-selected={i === shown} aria-controls="dsk-view" type="button" onClick={() => select(i)}>{v.tab}</button>
          ))}
        </div>
        <div id="dsk-view" role="tabpanel" aria-labelledby={`t-${view.id}`}>
          <div className="win rv">
            <img className={swap ? 'swap' : undefined} src={view.img} alt={view.alt} width={view.w} height={view.h} />
          </div>
          <p className="win-cap"><b>{view.tab}</b><span>{view.d}</span></p>
        </div>
      </div>
    </section>
  );
}
