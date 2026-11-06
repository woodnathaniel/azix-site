import { Eyebrow, Split } from './Text.jsx';

const MODULES = [
  { title: 'Stores & inventory', text: 'What you hold, and what moved.', icon: <><path d="M3 8l9-5 9 5v8l-9 5-9-5z" /><path d="M3 8l9 5 9-5M12 13v8" /></> },
  { title: 'Procurement', text: 'Orders, from request to delivery.', icon: <><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 13h7M9 17h5" /></> },
  { title: 'Equipment', text: 'Every machine keeps its record.', icon: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" /></> },
  { title: 'Approvals', text: 'Raise, sign and track in one place.', icon: <><path d="M4 20l4-1 11-11-3-3L5 16z" /><path d="M14 6l3 3" /></> },
  { title: 'Insights', text: 'Problems flagged before they stop a job.', icon: <><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" /><path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z" /></> },
  { title: 'Setup', text: 'Made to fit your site and your people.', icon: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></> }
];

export default function Modules() {
  return (
    <section id="modules">
      <div className="wrap sec">
        <Eyebrow>The modules</Eyebrow>
        <Split className="h2">Everything your site runs on. One core.</Split>
        <div className="modgrid">
          {MODULES.map((m) => (
            <article key={m.title} className="mcard rv">
              <div className="ic"><svg viewBox="0 0 24 24">{m.icon}</svg></div>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
