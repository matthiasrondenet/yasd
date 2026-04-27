import React from 'react';
import { PALETTE, MONO } from '../../theme';
import { HoverLink } from '../HoverLink';
import { HeroTerminal } from '../HeroTerminal';

const UPTIME_BARS = Array.from({ length: 30 }, (_, i) => ({
  height: 14 + Math.abs(Math.sin(i * 1.7)) * 22,
  isRecent: i > 25,
}));

const SYSTEM_INFO: [string, string][] = [
  ['user', '@matthias'],
  ['role', 'freelance_dev'],
  ['stack', '.NET · React · TS'],
  ['years', '12+'],
  ['tz', 'GMT+1'],
  ['status', '● not available'],
  ['rate', 'on request'],
];

interface HeroSectionProps {
  isMobile: boolean;
  isNarrow: boolean;
}

const launchTerminal = () => {
  const input = document.getElementById('terminal-input') as HTMLInputElement | null;
  input?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => input?.focus({ preventScroll: true }), 400);
};

export const HeroSection: React.FC<HeroSectionProps> = ({ isMobile, isNarrow }) => {
  const hp = isMobile ? 20 : 40;
  const spy = isMobile ? 64 : 96;

  return (
    <section
      id="top"
      style={{
        padding: `${isMobile ? 56 : 96}px ${hp}px ${spy}px`,
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isNarrow ? '1fr' : '1fr 320px',
          gap: isNarrow ? 40 : 56,
          alignItems: 'start',
        }}
      >
        <div>
          <div
            style={{
              fontSize: isMobile ? 10 : 11,
              color: PALETTE.dim,
              letterSpacing: '.15em',
              marginBottom: 20,
              textTransform: 'uppercase',
            }}
          >
            yasd.sh · session opened
          </div>

          <HeroTerminal isMobile={isMobile} />

          <h1
            style={{
              fontSize: isMobile ? 44 : isNarrow ? 64 : 80,
              lineHeight: 0.98,
              margin: 0,
              letterSpacing: '-.04em',
              fontWeight: 500,
              fontFamily: MONO,
            }}
          >
            <span style={{ color: PALETTE.dim }}>&gt; </span>Yet_Another
            <br />
            <span style={{ color: 'transparent' }}>&gt; </span>Software_
            <wbr />
            <span style={{ color: PALETTE.accent }}>Developer</span>
          </h1>

          <p
            style={{
              marginTop: isMobile ? 24 : 36,
              maxWidth: 560,
              fontSize: isMobile ? 14 : 15,
              lineHeight: 1.75,
              color: 'rgba(233,230,223,.76)',
            }}
          >
            A freelance full-stack practice. <span style={{ color: PALETTE.ink }}>.NET</span> on the
            backend, <span style={{ color: PALETTE.ink }}>React</span> on the frontend, shipped by
            one human who reads the stack trace before asking the channel.
          </p>

          <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <HoverLink
              href="#contact"
              style={{
                border: `1px solid ${PALETTE.accent}`,
                color: PALETTE.accent,
                padding: isMobile ? '12px 18px' : '14px 22px',
                fontSize: isMobile ? 11 : 12,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'background .15s',
              }}
              hoverStyle={{ background: 'rgba(126,231,135,.1)' }}
            >
              &gt; ./start-project
            </HoverLink>
            <button
              onClick={launchTerminal}
              style={{
                border: `1px solid ${PALETTE.warn}`,
                color: PALETTE.warn,
                padding: isMobile ? '12px 18px' : '14px 22px',
                fontSize: isMobile ? 11 : 12,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = PALETTE.ink;
                e.currentTarget.style.borderColor = PALETTE.ink;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = PALETTE.mute;
                e.currentTarget.style.borderColor = PALETTE.ruleStrong;
              }}
            >
              ./cli
            </button>
          </div>
        </div>

        <aside
          style={{
            border: `1px solid ${PALETTE.rule}`,
            padding: isMobile ? 18 : 22,
            fontSize: isMobile ? 11 : 12,
            lineHeight: 1.9,
            background: 'rgba(255,255,255,.012)',
          }}
        >
          <div
            style={{
              color: PALETTE.dim,
              marginBottom: 14,
              fontSize: 10,
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>— system —</span>
            <span>↻</span>
          </div>
          {SYSTEM_INFO.map(([key, value], i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '5px 0',
                borderBottom: i < SYSTEM_INFO.length - 1 ? `1px dashed ${PALETTE.rule}` : 'none',
              }}
            >
              <span style={{ color: PALETTE.mute }}>{key}</span>
              <span style={{ color: key === 'status' ? PALETTE.accent : undefined }}>{value}</span>
            </div>
          ))}
          <div style={{ marginTop: 18, fontSize: 10, color: PALETTE.mute }}>// uptime (30d)</div>
          <div style={{ display: 'flex', gap: 2, marginTop: 8, alignItems: 'end', height: 36 }}>
            {UPTIME_BARS.map((bar, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: bar.height,
                  background: bar.isRecent ? PALETTE.accent : 'rgba(126,231,135,.32)',
                }}
              />
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
};
