import React from 'react';
import { PALETTE } from '../theme';

interface FooterProps {
  isMobile: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isMobile }) => (
  <footer
    style={{
      borderTop: `1px solid ${PALETTE.rule}`,
      padding: isMobile ? '16px 20px' : '18px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12,
      fontSize: isMobile ? 10 : 11,
      color: PALETTE.mute,
      position: 'relative',
      zIndex: 2,
    }}
  >
    <span>
      yasd@home:~${' '}
      <span
        style={{
          display: 'inline-block',
          width: '0.55em',
          height: '1em',
          background: PALETTE.mute,
          verticalAlign: '-0.14em',
          animation: 'yasd-blink 1.1s steps(2) infinite',
        }}
      />
    </span>
    <span>© {new Date().getFullYear()} · compiled without warnings</span>
    <span>built by one human, on purpose</span>
  </footer>
);
