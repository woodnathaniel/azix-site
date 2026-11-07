import { useRef, useState } from 'react';
import { Eyebrow, Split } from './Text.jsx';

export function Problem() {
  return (
    <section className="tint">
      <div className="wrap sec">
        <Eyebrow>The problem</Eyebrow>
        <Split className="h2">Every site stops when one of these is missing.</Split>
        <div className="three">
          <div className="rv"><h3>A part</h3><p>Nobody knew it was low.</p></div>
          <div className="rv"><h3>A machine</h3><p>Its history is in a notebook.</p></div>
          <div className="rv"><h3>A signature</h3><p>The order sits for days.</p></div>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  ['Raise', 'From the phone.'], ['Notified', 'In order.'], ['Sign', 'Approve = sign.'],
  ['Issue', 'Stock updates as it goes out.'], ['Sealed', 'Logged for good.']
];

export function HowItWorks() {
  return (
    <section>
      <div className="wrap sec">
        <Eyebrow>How it works</Eyebrow>
        <Split className="h2">Request to record. Five steps.</Split>
        <div className="steps">
          {STEPS.map(([t, d]) => <div key={t} className="step rv"><h3>{t}</h3><p>{d}</p></div>)}
        </div>
      </div>
    </section>
  );
}

const AUDIT = [
  ['Who signed', 'Name, title and time, every time.'], ['Sealed documents', 'Locked once everyone has signed.'],
  ['Corrections', 'Every change is recorded.'], ['Stock records', 'Always up to date.'],
  ['Access', 'Each person sees what they should.'], ['Your data', "Kept separate from everyone else's."]
];

export function AuditBody() {
  return (
    <>
      <div className="audit-grid">
        {AUDIT.map(([t, d]) => <div key={t} className="a-item rv"><h3>{t}</h3><p>{d}</p></div>)}
      </div>
      <div className="seal">
        <div className="rows" role="group" aria-label="Sample of a completed document">
          <b>Document</b><span>Requisition REQ-2291</span>
          <b>Status</b><span><span className="g">Completed</span> · 2 of 2 signed</span>
        </div>
      </div>
    </>
  );
}

export function Growth() {
  return (
    <section id="growth">
      <div className="wrap sec">
        <Eyebrow>Grow with it</Eyebrow>
        <Split className="h2">Less waiting. More jobs done.</Split>
        <div className="grow">
          <div className="g-item rv"><h3>Faster approvals</h3><p>Signed where the approver is.</p></div>
          <div className="g-item rv"><h3>Fewer stock-outs</h3><p>Reorder before it stops a job.</p></div>
          <div className="g-item rv"><h3>Audit-ready</h3><p>The trail builds itself.</p></div>
          <div className="g-item rv"><h3>New sites, same flow</h3><p>No rebuilding paperwork.</p></div>
        </div>
        <div className="who"><span className="rv">Store teams</span><span className="rv">Procurement</span><span className="rv">Site managers</span><span className="rv">Owners &amp; CEOs</span></div>
      </div>
    </section>
  );
}

const CONTACTS = [
  { label: 'Email', text: 'nathanielwood002@gmail.com', href: 'mailto:nathanielwood002@gmail.com' },
  { label: 'Phone', text: '0532529444', href: 'tel:+233532529444' },
  { label: 'Phone', text: '0554038446', href: 'tel:+233554038446' }
];

function CopyButton({ text, rowRef }) {
  const [label, setLabel] = useState('Copy');
  const flash = (msg) => { setLabel(msg); setTimeout(() => setLabel('Copy'), 1600); };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      flash('Copied');
    } catch (e) {
      // no clipboard access: select the text so it can be copied by hand
      const el = rowRef.current && rowRef.current.querySelector('a');
      if (el && window.getSelection) { const r = document.createRange(); r.selectNodeContents(el); const s = window.getSelection(); s.removeAllRanges(); s.addRange(r); }
      flash('Selected');
    }
  };
  return <button className="copy" type="button" onClick={copy}>{label}</button>;
}

function ContactRow({ label, text, href }) {
  const ref = useRef(null);
  return (
    <div className="row" ref={ref}>
      <div><small>{label}</small><a href={href}>{text}</a></div>
      <CopyButton text={text} rowRef={ref} />
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="wrap sec">
        <div className="grid">
          <div>
            <Split>Run the whole site from your pocket.</Split>
            <p>Azix, by Axis. Built for mining and construction.</p>
          </div>
          <div className="card" aria-label="Contact Axis">
            {CONTACTS.map((c, i) => <ContactRow key={i} {...c} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap"><span>Azix by Axis · Built for mining &amp; construction</span></div>
    </footer>
  );
}
