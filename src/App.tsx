import React from 'react';
import { PALETTE, MONO } from './theme';
import { useMediaQuery } from './hooks/useMediaQuery';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { TerminalSection } from './components/sections/TerminalSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { EthosSection } from './components/sections/EthosSection';
import { WorkSection } from './components/sections/WorkSection';
import { ContactSection } from './components/sections/ContactSection';

const App: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 760px)');
  const isNarrow = useMediaQuery('(max-width: 1020px)');

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: PALETTE.bg,
        color: PALETTE.ink,
        fontFamily: MONO,
        fontSize: 14,
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          background:
            'repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(255,255,255,.014) 3px, rgba(255,255,255,.014) 4px)',
        }}
        aria-hidden
      />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,.55) 100%)',
        }}
        aria-hidden
      />

      <Header isMobile={isMobile} isNarrow={isNarrow} />
      <HeroSection isMobile={isMobile} isNarrow={isNarrow} />
      <ServicesSection isMobile={isMobile} />
      <EthosSection isMobile={isMobile} isNarrow={isNarrow} />
      <WorkSection isMobile={isMobile} />
      <ContactSection isMobile={isMobile} isNarrow={isNarrow} />
      <TerminalSection isMobile={isMobile} />
      <Footer isMobile={isMobile} />
    </div>
  );
};

export default App;
