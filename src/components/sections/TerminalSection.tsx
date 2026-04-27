import React from 'react';
import { PALETTE } from '../../theme';
import { InteractiveTerminal } from '../terminal/InteractiveTerminal';

interface TerminalSectionProps {
  isMobile: boolean;
}

export const TerminalSection: React.FC<TerminalSectionProps> = ({ isMobile }) => {
  const hp = isMobile ? 20 : 40;
  const spy = isMobile ? 64 : 96;

  return (
    <section style={{ padding: `0 ${hp}px ${spy}px`, position: 'relative', zIndex: 2 }}>
      <div style={{ color: PALETTE.dim, fontSize: isMobile ? 10 : 11, letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 16 }}>
        <span style={{ color: PALETTE.accent }}>$</span> ./cli --interactive
      </div>
      <InteractiveTerminal isMobile={isMobile} />
    </section>
  );
};
