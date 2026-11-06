import { useState } from 'react';
import { Eyebrow, Split } from './Text.jsx';
import { Ticks } from './Feature.jsx';
import Devices3D from './Devices3D.jsx';

const DESK = '/img/InsightsDesktopUrgent.png';
const PHONE = '/img/InsightsPhoneUrgent.png';

export default function Insights() {
  const [gl, setGl] = useState(false);
  return (
    <section id="insights">
      <div className="wrap sec">
        <div className="ins-top">
          <div>
            <Eyebrow>Insights dashboard</Eyebrow>
            <Split className="h2">Know what needs you. Before it stops a job.</Split>
          </div>
          <Ticks items={['Urgent and worth-a-look problems', 'New against fixed, week by week', 'Usage spikes and run-outs']} />
        </div>
        <div className={`ins-stage${gl ? ' has-gl' : ''}`}>
          <Devices3D preset="insights" srcs={[DESK, PHONE]} onReady={setGl} />
          <div className="ins-desk rv">
            <img src={DESK} alt="Desktop insights dashboard: nine open problems, the urgent ones expanded with Done, Snooze and N/A, and a weekly new-against-fixed chart" width="1405" height="957" loading="lazy" />
          </div>
          <div className="phone ins-ph rv from-r" style={{ '--d': 2 }}>
            <img src={PHONE} alt="Phone home with the insight card open on the urgent problems" width="780" height="1688" loading="lazy" />
          </div>
        </div>
        <p className="ins-cap">One dashboard on the home page. Tap a number, a bar or a week to see the problems behind it.</p>
      </div>
    </section>
  );
}
