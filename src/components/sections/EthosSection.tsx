import React, { type ReactNode } from 'react';
import { PALETTE } from '../../theme';
import { SectionLabel } from '../SectionLabel';

const ETHOS_LINES: [string, string, ReactNode][] = [
  [PALETTE.accent, '#', ' There are millions of developers.'],
  [
    PALETTE.accent,
    '#',
    <>
      {' '}
      There is one <span style={{ color: PALETTE.warn }}>you&apos;re emailing</span>.
    </>,
  ],
  [PALETTE.accent, '#', ' That one writes the tests, deletes the dead code,'],
  [
    PALETTE.accent,
    '#',
    <>
      {' '}
      and <span style={{ color: PALETTE.accent }}>ships</span>.
    </>,
  ],
];

const ETHOS_PRINCIPLES: [string, string][] = [
  [
    'small diffs',
    'Pull requests you can read on a Monday morning without coffee. Fewer bugs, fewer arguments.',
  ],
  [
    'boring infra',
    'Postgres before Kafka. A cron job before an event bus. Complexity is paid for in outages.',
  ],
  [
    'written trails',
    'Weekly notes, tidy commits, docs that outlive the author. You should be able to fire me cleanly.',
  ],
];

interface EthosSectionProps {
  isMobile: boolean;
  isNarrow: boolean;
}

export const EthosSection: React.FC<EthosSectionProps> = ({ isMobile, isNarrow }) => {
  const hp = isMobile ? 20 : 40;
  const spy = isMobile ? 64 : 96;

  return (
    <section
      id="ethos"
      style={{
        padding: `${spy}px ${hp}px`,
        borderTop: `1px solid ${PALETTE.rule}`,
        position: 'relative',
        zIndex: 2,
      }}
    >
      <SectionLabel command="cat /etc/principles" />
      <div
        style={{
          fontSize: isMobile ? 20 : isNarrow ? 26 : 34,
          lineHeight: 1.4,
          maxWidth: 1040,
          letterSpacing: '-.01em',
        }}
      >
        {ETHOS_LINES.map(([color, hash, content], i) => (
          <div key={i} style={{ display: 'flex', gap: isMobile ? 10 : 16 }}>
            <span style={{ color }}>{hash}</span>
            <span>{content}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: isMobile ? 48 : 72,
          display: 'grid',
          gridTemplateColumns: isNarrow ? '1fr' : '1fr 1fr 1fr',
          gap: isMobile ? 20 : 32,
          fontSize: isMobile ? 13 : 14,
          lineHeight: 1.7,
        }}
      >
        {ETHOS_PRINCIPLES.map(([heading, detail], i) => (
          <div key={i} style={{ borderTop: `1px solid ${PALETTE.rule}`, paddingTop: 18 }}>
            <div
              style={{
                color: PALETTE.accent,
                fontSize: 11,
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              // {heading}
            </div>
            <div style={{ color: 'rgba(233,230,223,.75)' }}>{detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
