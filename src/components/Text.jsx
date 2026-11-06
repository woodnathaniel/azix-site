import { Fragment, useRef } from 'react';
import { useInView } from '../hooks/useInView.js';

// Section label that slides in.
export function Eyebrow({ children }) {
  const ref = useRef(null);
  const seen = useInView(ref);
  return <div ref={ref} className={`eyebrow tx-e${seen ? ' in' : ''}`}>{children}</div>;
}

// Heading whose words flip in one after another.
export function Split({ as: Tag = 'h2', className, children }) {
  const ref = useRef(null);
  const seen = useInView(ref);
  const words = String(children).split(/\s+/).filter(Boolean);
  return (
    <Tag ref={ref} className={[className, 'tx3d', seen ? 'in' : ''].filter(Boolean).join(' ')}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="tw" style={{ '--i': i }}>{w}</span>{' '}
        </Fragment>
      ))}
    </Tag>
  );
}
