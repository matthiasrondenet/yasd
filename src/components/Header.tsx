import React from 'react';
import { PALETTE } from '../theme';
import { HoverLink } from './HoverLink';

const NAV_ITEMS = [
  { label: '~/work', href: '#work' },
  { label: '~/services', href: '#services' },
  { label: '~/ethos', href: '#ethos' },
  { label: '~/contact', href: '#contact' },
];

interface HeaderProps {
  isMobile: boolean;
  isNarrow: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isMobile, isNarrow }) => (
  <header
    style={{
      position: 'sticky',
      top: 0,
      zIndex: 5,
      backdropFilter: 'blur(10px)',
      background: 'rgba(11,11,12,.78)',
      borderBottom: `1px solid ${PALETTE.rule}`,
      padding: isMobile ? '14px 20px' : '16px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
    }}
  >
    <a
      href="#top"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        textDecoration: 'none',
        color: PALETTE.ink,
        fontSize: isMobile ? 12 : 13,
      }}
    >
      <span
        style={{
          width: 9,
          height: 9,
          borderRadius: '50%',
          background: PALETTE.accent,
          boxShadow: `0 0 10px ${PALETTE.accent}`,
          display: 'inline-block',
        }}
      />
      <span>
        yasd<span style={{ color: PALETTE.mute }}>@home</span>:
        <span style={{ color: PALETTE.accent }}>~</span>$
      </span>
    </a>
    {!isNarrow && (
      <nav style={{ display: 'flex', gap: 24, fontSize: 12 }}>
        {NAV_ITEMS.map((item) => (
          <HoverLink
            key={item.label}
            href={item.href}
            style={{ color: PALETTE.mute, textDecoration: 'none' }}
            hoverStyle={{ color: PALETTE.ink }}
          >
            {item.label}
          </HoverLink>
        ))}
      </nav>
    )}
    <HoverLink
      href="#contact"
      style={{
        border: `1px solid ${PALETTE.accent}`,
        color: PALETTE.accent,
        padding: isMobile ? '6px 10px' : '8px 14px',
        fontSize: isMobile ? 10 : 11,
        letterSpacing: '.14em',
        textTransform: 'uppercase',
        textDecoration: 'none',
      }}
      hoverStyle={{ background: 'rgba(126,231,135,.1)' }}
    >
      ./hire
    </HoverLink>
  </header>
);
