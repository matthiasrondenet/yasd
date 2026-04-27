import React from 'react';
import { PALETTE } from '../theme';

interface SectionLabelProps {
  command: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ command }) => (
  <div
    style={{
      color: PALETTE.dim,
      fontSize: 11,
      letterSpacing: '.2em',
      textTransform: 'uppercase',
      marginBottom: 28,
    }}
  >
    <span style={{ color: PALETTE.accent }}>$</span> {command}
  </div>
);
