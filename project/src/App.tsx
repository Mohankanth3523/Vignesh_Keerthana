import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MusicPlayer from './components/layout/MusicPlayer';
import SectionDivider from './components/layout/SectionDivider';
import OpeningScreen from './components/sections/OpeningScreen';
import HeroSection from './components/sections/HeroSection';
import CoupleSection from './components/sections/CoupleSection';
import StorySection from './components/sections/StorySection';
import EventsSection from './components/sections/EventsSection';
import CountdownSection from './components/sections/CountdownSection';
import VideoSection from './components/sections/VideoSection';
import GallerySection from './components/sections/GallerySection';
import VenueSection from './components/sections/VenueSection';
import ClosingSection from './components/sections/ClosingSection';
import { LanguageProvider, useLang } from './i18n/LanguageContext';
import { MusicProvider, useMusic } from './hooks/useMusic';

function Site() {
  const { t } = useLang();
  const { start } = useMusic();
  const [revealed, setRevealed] = useState(false);
  const [openingVisible, setOpeningVisible] = useState(true);

  return (
    <>
      <a href="#main" className="sr-only-focusable fixed left-3 top-3 z-[80] bg-maroon px-4 py-2 text-sm text-cream">
        {t.nav.skip}
      </a>
      {openingVisible && (
        <OpeningScreen
          onOpen={() => {
            start(); // music begins only after this explicit tap
            setRevealed(true);
          }}
          onDone={() => setOpeningVisible(false)}
        />
      )}

      {revealed && <Header />}
      <main id="main" aria-hidden={openingVisible && !revealed ? true : undefined}>
        <HeroSection revealed={revealed} />
        <SectionDivider />
        <CoupleSection />
        <StorySection />
        <EventsSection />
        <CountdownSection />
        <VideoSection />
        <SectionDivider />
        <GallerySection />
        <VenueSection />
        <ClosingSection />
      </main>
      <Footer />
      {revealed && <MusicPlayer />}
    </>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <MusicProvider>
          <Site />
        </MusicProvider>
      </LanguageProvider>
    </MotionConfig>
  );
}
