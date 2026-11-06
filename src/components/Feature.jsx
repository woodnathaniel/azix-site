import { useState } from 'react';
import { Eyebrow, Split } from './Text.jsx';
import Devices3D from './Devices3D.jsx';

export function Ticks({ items }) {
  return (
    <ul className="ticks">
      {items.map((t) => <li key={t} className="rv">{t}</li>)}
    </ul>
  );
}

// A phone screenshot, flat. Hidden when the 3D version is running.
function Phone({ src, alt, from }) {
  return (
    <div className={`phone rv${from ? ` from-${from}` : ''}`}>
      <img src={src} alt={alt} width="780" height="1688" loading="lazy" />
    </div>
  );
}

// One or two phones: 3D when WebGL works, the screenshots otherwise.
function PhoneMedia({ phones }) {
  const [gl, setGl] = useState(false);
  const two = phones.length > 1;
  return (
    <div className={`media${two ? ' two' : ''}${gl ? ' has-gl' : ''}`}>
      <div className="stage"></div>
      <Devices3D preset="phones" srcs={phones.slice(0, 2).map((p) => p.src)} onReady={setGl} />
      {phones.map((p, i) => <Phone key={p.src} {...p} from={two ? (i ? 'r' : 'l') : undefined} />)}
    </div>
  );
}

// layout: '' (text left), 'flip' (text right) or 'stack' (centred, media below)
export default function Feature({ id, tint, layout = '', eyebrow, title, ticks, children, phones }) {
  return (
    <section id={id} className={tint ? 'tint' : undefined}>
      <div className="wrap sec">
        <div className={`show${layout ? ` ${layout}` : ''}`}>
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <Split>{title}</Split>
            {ticks ? <Ticks items={ticks} /> : children}
          </div>
          <PhoneMedia phones={phones} />
        </div>
      </div>
    </section>
  );
}
