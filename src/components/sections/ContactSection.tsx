import React from 'react';
import { PALETTE } from '../../theme';
import { LINKEDIN, MALT, GITHUB, EMAIL } from '../../constants';
import { HoverLink } from '../HoverLink';
import { SectionLabel } from '../SectionLabel';

const CONTACT_INFO: [string, string][] = [
  ['// what to send', 'One paragraph: the problem, the stack, the rough shape of the timeline.'],
  ['// response', 'Within 24 hours, Mon–Fri. Usually a reply with one clarifying question.'],
  [
    '// engagement',
    'Fixed-scope projects, monthly retainers, or hourly advisory. Remote, EU hours.',
  ],
];

interface ContactSectionProps {
  isMobile: boolean;
  isNarrow: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isMobile, isNarrow }) => {
  const hp = isMobile ? 20 : 40;
  const spy = isMobile ? 64 : 96;

  return (
    <section
      id="contact"
      style={{
        padding: `${spy}px ${hp}px`,
        borderTop: `1px solid ${PALETTE.rule}`,
        position: 'relative',
        zIndex: 2,
      }}
    >
      <SectionLabel command="./contact --now" />
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: isMobile ? 8 : 14,
          fontSize: isMobile ? 32 : isNarrow ? 48 : 72,
          letterSpacing: '-.035em',
          flexWrap: 'wrap',
          lineHeight: 1.05,
        }}
      >
        <span style={{ color: PALETTE.dim }}>echo</span>
        <span style={{ color: PALETTE.mute }}>&ldquo;</span>
        <a
          href={`mailto:${EMAIL}`}
          style={{
            color: PALETTE.ink,
            textDecoration: 'none',
            borderBottom: `2px solid ${PALETTE.accent}`,
          }}
        >
          hello<span style={{ color: PALETTE.accent }}>@</span>yasd.dev
        </a>
        <span style={{ color: PALETTE.mute }}>&rdquo;</span>
        <span
          style={{ color: PALETTE.mute, fontSize: isMobile ? 14 : 22 }}
        >{`| mail -s "brief"`}</span>
      </div>

      <div
        style={{
          marginTop: isMobile ? 28 : 40,
          display: 'grid',
          gridTemplateColumns: isNarrow ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? 14 : 24,
          fontSize: 12,
          lineHeight: 1.75,
        }}
      >
        {CONTACT_INFO.map(([label, description], i) => (
          <div key={i} style={{ border: `1px solid ${PALETTE.rule}`, padding: isMobile ? 16 : 20 }}>
            <div style={{ color: PALETTE.accent, marginBottom: 8 }}>{label}</div>
            <div style={{ color: 'rgba(233,230,223,.76)' }}>{description}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: isMobile ? 28 : 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <HoverLink
          href={LINKEDIN}
          target="_blank"
          rel="noreferrer"
          style={{
            border: `1px solid ${PALETTE.ruleStrong}`,
            color: PALETTE.mute,
            padding: isMobile ? '10px 16px' : '12px 20px',
            fontSize: isMobile ? 10 : 11,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'color .15s, border-color .15s',
          }}
          hoverStyle={{ color: PALETTE.ink, borderColor: PALETTE.ink }}
        >
          ↗ linkedin
        </HoverLink>
        <HoverLink
          href={MALT}
          target="_blank"
          rel="noreferrer"
          style={{
            border: `1px solid ${PALETTE.ruleStrong}`,
            color: PALETTE.mute,
            padding: isMobile ? '10px 16px' : '12px 20px',
            fontSize: isMobile ? 10 : 11,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'color .15s, border-color .15s',
          }}
          hoverStyle={{ color: PALETTE.ink, borderColor: PALETTE.ink }}
        >
          ↗ malt
        </HoverLink>
        <HoverLink
          href={GITHUB}
          target="_blank"
          rel="noreferrer"
          style={{
            border: `1px solid ${PALETTE.ruleStrong}`,
            color: PALETTE.mute,
            padding: isMobile ? '10px 16px' : '12px 20px',
            fontSize: isMobile ? 10 : 11,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'color .15s, border-color .15s',
          }}
          hoverStyle={{ color: PALETTE.ink, borderColor: PALETTE.ink }}
        >
          ↗ github
        </HoverLink>
      </div>
    </section>
  );
};
