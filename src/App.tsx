import React, { useState, useEffect } from 'react';
import { InteractiveEnvelope } from './components/InteractiveEnvelope';
import { HeroSection } from './components/HeroSection';
import { EngagementDetails } from './components/EngagementDetails';
import { EventTimeline } from './components/EventTimeline';
import { InvitationMessage } from './components/InvitationMessage';
import { RsvpSection } from './components/RsvpSection';
import { LocationSection } from './components/LocationSection';
import { ClosingSection } from './components/ClosingSection';
import { TopBar } from './components/TopBar';
import { RsvpAdminDrawer } from './components/RsvpAdminDrawer';
import { CustomizeDrawer } from './components/CustomizeDrawer';
import { InvitationConfig } from './types';
import { weddingAudio } from './utils/audio';

const INITIAL_CONFIG: InvitationConfig = {
  groomName: 'Sunil',
  groomSurname: 'Eega',
  brideName: 'Sadhana',
  brideSurname: 'Dasu',
  parentsGroom: 'Sri Bala Krishna Murthy & Smt. Kumari',
  parentsBride: 'Sri Koteswarudu & Smt. Neeraja',
  engagementDate: '2026-10-25T18:00:00',
  displayDate: 'Sunday, 25th October 2026',
  displayTime: '6:00 PM onwards',
  venueName: 'The Royal Palace Courtyard & Ballroom',
  venueAddress: 'Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033',
  googleMapsUrl: 'https://maps.google.com/?q=Jubilee+Hills+Hyderabad',
  mapCoordinates: { lat: 17.4319, lng: 78.4073 },
  dressCode: 'Indian Traditional Festive / Indo-Western Royalty (Ivory, Gold & Jewel Tones)',
  googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Sunil+%26+Ananya+Engagement+Ceremony&dates=20261024T123000Z/20261024T173000Z&details=With+the+blessings+of+our+families,+we+invite+you+to+celebrate+the+beginning+of+our+forever!&location=The+Royal+Palace+Courtyard,+Jubilee+Hills,+Hyderabad',
  contactPhone: '+91 9848090278',
};

export default function App() {
  const [config, setConfig] = useState<InvitationConfig>(INITIAL_CONFIG);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);

  // Load config from backend
  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.groomName) {
          setConfig(data);
        }
      })
      .catch((err) => console.warn('Using default celebration config', err));
  }, []);

  const handleToggleMusic = () => {
    const isPlaying = weddingAudio.toggle();
    setIsPlayingMusic(isPlaying);
  };

  const handleScrollTo = (id: string) => {
    setEnvelopeOpened(true);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#0c1410] text-[#f7f4ed] font-sans selection:bg-[#d4af37]/30 selection:text-[#fffdfa] relative">
      {/* Background Subtle Sparkle Dust & Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#d4af37]/15 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[550px] h-[550px] rounded-full bg-[#1b3d2b]/35 blur-[130px]" />
        <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] rounded-full bg-[#d4af37]/10 blur-[140px]" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <TopBar
          config={config}
          isPlayingMusic={isPlayingMusic}
          onToggleMusic={handleToggleMusic}
          onOpenAdmin={() => setAdminOpen(true)}
          onOpenCustomize={() => setCustomizeOpen(true)}
          onScrollTo={handleScrollTo}
        />

        {/* 1. Interactive Envelope Opening Experience */}
        <InteractiveEnvelope
          config={config}
          isOpen={envelopeOpened}
          onOpen={() => setEnvelopeOpened(true)}
          onScrollToStory={() => handleScrollTo('hero')}
        />

        {/* Full Interactive Invitation Journey */}
        <main className={`transition-opacity duration-700 ${envelopeOpened ? 'opacity-100' : 'opacity-95'}`}>
          {/* 1. Hero & Real-time Countdown */}
          <HeroSection
            config={config}
            onScrollToRsvp={() => handleScrollTo('rsvp')}
            onScrollToVenue={() => handleScrollTo('location')}
          />

          {/* 2. Engagement Details */}
          <EngagementDetails config={config} />

          {/* 3. Event Timeline */}
          <EventTimeline />

          {/* 4. Traditional Invitation Message */}
          <InvitationMessage config={config} />

          {/* 5. RSVP System & Wishes Wall */}
          <RsvpSection
            config={config}
            onOpenAdmin={() => setAdminOpen(true)}
          />

          {/* 6. Interactive Location & Directions */}
          <LocationSection config={config} />

          {/* 7. Closing */}
          <ClosingSection
            config={config}
            onReopenEnvelope={() => {
              setEnvelopeOpened(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      </div>

      {/* RSVP Management Drawer */}
      <RsvpAdminDrawer
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        config={config}
        onUpdateConfig={(updated) => setConfig((prev) => ({ ...prev, ...updated }))}
      />

      {/* Customize Invitation Drawer */}
      <CustomizeDrawer
        isOpen={customizeOpen}
        onClose={() => setCustomizeOpen(false)}
        config={config}
        onSave={(updated) => setConfig(updated)}
      />
    </div>
  );
}
