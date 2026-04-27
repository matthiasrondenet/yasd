import React from 'react';
import { PALETTE } from '../../theme';
import { SectionLabel } from '../SectionLabel';

const WORK_LOG: [string, string, string][] = [
  [
    'a4f9c2d',
    '2022',
    'feat: investment banking platform — trading blotter & research tools, .NET 8, React, Azure AKS',
  ],
  [
    'b7e3a11',
    '2021',
    'feat: ESG investment tools — Clean Architecture + DDD API rewrite, Angular → React migration',
  ],
  [
    'c9d2f87',
    '2018',
    'build: regulatory risk indicators (PRIIPs, SRI, ESG) — .NET Core, React, PostgreSQL',
  ],
  [
    '3a1e054',
    '2017',
    'feat: construction management — Xamarin iOS/Android mobile apps, .NET Core, Azure',
  ],
  ['8c2b731', '2015', 'feat: retail ERP — ASP.NET MVC, WCF, WPF, SQL Server, team of 10'],
];

interface WorkSectionProps {
  isMobile: boolean;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ isMobile }) => {
  const hp = isMobile ? 20 : 40;
  const spy = isMobile ? 64 : 96;

  return (
    <section
      id="work"
      style={{
        padding: `${spy}px ${hp}px`,
        borderTop: `1px solid ${PALETTE.rule}`,
        position: 'relative',
        zIndex: 2,
      }}
    >
      <SectionLabel command="git log --oneline --all" />
      <div style={{ fontSize: isMobile ? 12 : 13, lineHeight: 1.9 }}>
        {WORK_LOG.map(([sha, year, message], i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '78px 56px 1fr' : '100px 60px 1fr',
              gap: isMobile ? 10 : 20,
              padding: '10px 0',
              borderBottom: `1px dashed ${PALETTE.rule}`,
            }}
          >
            <span style={{ color: PALETTE.warn }}>{sha}</span>
            <span style={{ color: PALETTE.dim }}>{year}</span>
            <span style={{ color: 'rgba(233,230,223,.82)' }}>{message}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
