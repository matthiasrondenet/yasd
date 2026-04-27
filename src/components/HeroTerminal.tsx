import React, { useState, useEffect } from 'react';
import { PALETTE } from '../theme';
import { useTyped } from '../hooks/useTyped';

type SequenceKind = 'cmd' | 'out' | 'md' | 'ok';

interface SequenceLine {
  prompt: string;
  kind: SequenceKind;
  text: string;
}

const SEQUENCE: SequenceLine[] = [
  { prompt: '$', kind: 'cmd', text: 'whoami' },
  { prompt: '', kind: 'out', text: 'yet-another-software-developer' },
  { prompt: '$', kind: 'cmd', text: 'cat ./README.md' },
  { prompt: '', kind: 'md', text: '# One dev. .NET + React. Finishes the work.' },
  { prompt: '$', kind: 'cmd', text: './hire --status' },
  { prompt: '', kind: 'ok', text: '● not available · until Q3 2026 · remote' },
];

const SEQUENCE_COLORS: Record<SequenceKind, string> = {
  cmd: PALETTE.ink,
  out: PALETTE.mute,
  md: PALETTE.cyan,
  ok: PALETTE.accent,
};

interface HeroTerminalProps {
  isMobile: boolean;
}

export const HeroTerminal: React.FC<HeroTerminalProps> = ({ isMobile }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= SEQUENCE.length) return;
    const line = SEQUENCE[step];
    const duration = line.kind === 'cmd' ? line.text.length * 28 + 260 : 360;
    const timer = setTimeout(() => setStep((s) => s + 1), duration);
    return () => clearTimeout(timer);
  }, [step]);

  const currentLine = step < SEQUENCE.length ? SEQUENCE[step] : null;
  const [typedText] = useTyped(
    currentLine?.kind === 'cmd' ? currentLine.text : '',
    0,
    28,
    currentLine?.kind === 'cmd'
  );

  const fontSize = isMobile ? 13 : 15;
  const gap = isMobile ? 10 : 14;

  return (
    <div style={{ marginBottom: isMobile ? 32 : 44, minHeight: isMobile ? 170 : 200 }}>
      {SEQUENCE.slice(0, step).map((line, i) => (
        <div
          key={i}
          style={{ display: 'flex', gap, alignItems: 'baseline', fontSize, lineHeight: 1.75 }}
        >
          <span
            style={{
              color: line.kind === 'cmd' ? PALETTE.accent : PALETTE.dim,
              width: 14,
              flexShrink: 0,
              userSelect: 'none',
            }}
          >
            {line.prompt || ' '}
          </span>
          <span style={{ color: SEQUENCE_COLORS[line.kind] }}>{line.text}</span>
        </div>
      ))}
      {currentLine && (
        <div style={{ display: 'flex', gap, alignItems: 'baseline', fontSize, lineHeight: 1.75 }}>
          <span
            style={{
              color: currentLine.kind === 'cmd' ? PALETTE.accent : PALETTE.dim,
              width: 14,
              flexShrink: 0,
              userSelect: 'none',
            }}
          >
            {currentLine.prompt || ' '}
          </span>
          <span style={{ color: SEQUENCE_COLORS[currentLine.kind] }}>
            {currentLine.kind === 'cmd' ? typedText : currentLine.text}
            {currentLine.kind === 'cmd' && (
              <span
                style={{
                  display: 'inline-block',
                  width: '0.55em',
                  height: '1em',
                  background: 'currentColor',
                  marginLeft: 4,
                  verticalAlign: '-0.14em',
                  animation: 'yasd-blink 1.1s steps(2) infinite',
                }}
              />
            )}
          </span>
        </div>
      )}
      {step >= SEQUENCE.length && (
        <div style={{ display: 'flex', gap, marginTop: 2 }}>
          <span style={{ color: PALETTE.accent, width: 14 }}>$</span>
          <span
            style={{
              width: '0.55em',
              height: '1em',
              background: PALETTE.ink,
              display: 'inline-block',
              animation: 'yasd-blink 1.1s steps(2) infinite',
            }}
          />
        </div>
      )}
    </div>
  );
};
