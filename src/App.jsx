import { useCallback, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Feature from './components/Feature.jsx';
import Modules from './components/Modules.jsx';
import Insights from './components/Insights.jsx';
import DesktopTabs from './components/DesktopTabs.jsx';
import { PromoStrip, VideoModal } from './components/Promo.jsx';
import { Problem, HowItWorks, AuditBody, Growth, Contact, Footer } from './components/Sections.jsx';
import { useReveal } from './hooks/useReveal.js';

export default function App() {
  const [playing, setPlaying] = useState(false);
  const opener = useRef(null); // the button that opened the player, so focus can return to it

  useReveal();

  const open = useCallback((btn) => { opener.current = btn; setPlaying(true); }, []);
  const close = useCallback(() => { setPlaying(false); opener.current?.focus(); }, []);

  return (
    <>
      <Header />
      <main id="top">
        <Hero onPlay={open} />
        <Problem />
        <PromoStrip onPlay={open} paused={playing} />
        <Modules />

        <Feature id="mobile" tint eyebrow="Mobile · Approvals" title="Approve in one tap. Signed."
          ticks={['See whose turn it is', 'Sign with your saved signature', 'Every signature is verified']}
          phones={[
            { src: '/img/ApprovalInbox.png', alt: 'Approval inbox with Document, Approve and Reject on each request' },
            { src: '/img/QuickApprove.png', alt: 'Quick approve sheet with the saved signature and a password field' }
          ]} />

        <Feature layout="flip" eyebrow="Mobile · Stores" title="Know what you hold. And what moved."
          ticks={['Below-minimum alerts', 'Every issue and receive in a ledger', 'Export to Excel or CSV']}
          phones={[
            { src: '/img/Inventory.png', alt: 'Inventory list with a below-minimum filter' },
            { src: '/img/StockIssues.png', alt: 'Stock issues ledger' }
          ]} />

        <Feature tint layout="stack" eyebrow="Mobile · Equipment" title="Every machine keeps its record."
          ticks={['Hours and last service', 'Downtime photos and documents', 'Request maintenance in a tap']}
          phones={[{ src: '/img/EquipmentDetail.png', alt: "An excavator's record with hours, last service and documents" }]} />

        <Feature eyebrow="Mobile · AI" title="Ask Nathan. Let insights find the rest."
          ticks={['Ask in plain words', 'Low stock and stalled approvals, flagged', 'Shows each person only their own data']}
          phones={[
            { src: '/img/NathanChat.png', alt: 'Ask Nathan: which items have the lowest balance' },
            { src: '/img/NathanInsights.png', alt: 'AI insights: critical low stock and a stalled approval' }
          ]} />

        <Insights />
        <DesktopTabs />
        <HowItWorks />

        <Feature id="audit" tint layout="flip" eyebrow="Built to be audited" title="Nothing happens you cannot trace."
          phones={[{ src: '/img/DocumentView.png', alt: 'A requisition being signed, with the signing chain below' }]}>
          <AuditBody />
        </Feature>

        <Growth />
        <Contact />
      </main>
      <VideoModal open={playing} onClose={close} />
      <Footer />
    </>
  );
}
