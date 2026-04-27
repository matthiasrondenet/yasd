import React from 'react';
import { PALETTE } from '../../theme';
import { HoverLink } from '../HoverLink';
import { SectionLabel } from '../SectionLabel';

const SERVICES: [string, string, string][] = [
  ['drwxr-xr-x', 'fullstack/', 'ASP.NET Core + React — soup to nuts'],
  ['drwxr-xr-x', 'backend/', 'C#, EF Core, SQL, queues, background jobs'],
  ['drwxr-xr-x', 'frontend/', 'React, TypeScript, component systems'],
  ['drwxr-xr-x', 'rescue/', 'legacy codebases, pulled back from the brink'],
  ['-rwxr-xr-x', 'advisory.sh', 'architecture reviews · hiring · second opinions'],
];
interface ServicesSectionProps {
  isMobile: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ isMobile }) => {
  const hp = isMobile ? 20 : 40;
  const spy = isMobile ? 64 : 96;

  return (
    <section
      id="services"
      style={{
        padding: `${spy}px ${hp}px`,
        borderTop: `1px solid ${PALETTE.rule}`,
        position: 'relative',
        zIndex: 2,
      }}
    >
      <SectionLabel command="cd ~/services && ls -la" />
      <div style={{ fontSize: isMobile ? 12 : 14, lineHeight: isMobile ? 1.8 : 2 }}>
        {SERVICES.map(([permissions, name, description], i) => (
          <HoverLink
            key={i}
            href="#contact"
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '140px 220px 1fr',
              gap: isMobile ? 2 : 24,
              borderBottom: `1px dashed ${PALETTE.rule}`,
              padding: '12px 0',
              color: 'inherit',
              textDecoration: 'none',
              transition: 'background .15s, padding-left .15s',
            }}
            hoverStyle={{ background: 'rgba(255,255,255,.025)', paddingLeft: 8 }}
          >
            {!isMobile && <span style={{ color: PALETTE.dim }}>{permissions}</span>}
            <span
              style={{ color: name.endsWith('/') ? PALETTE.accent : PALETTE.warn, fontWeight: 500 }}
            >
              {name}
            </span>
            <span style={{ color: 'rgba(233,230,223,.72)' }}>{description}</span>
          </HoverLink>
        ))}
      </div>
    </section>
  );
};
