import React, { useState } from 'react';
import { Music, VolumeX, Settings2, Heart, Users, Menu, X, Share2 } from 'lucide-react';
import { InvitationConfig } from '../types';

interface TopBarProps {
  config: InvitationConfig;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onOpenAdmin: () => void;
  onOpenCustomize: () => void;
  onScrollTo: (id: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  config,
  isPlayingMusic,
  onToggleMusic,
  onOpenAdmin,
  onOpenCustomize,
  onScrollTo
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (id: string) => {
    setMobileMenuOpen(false);
    onScrollTo(id);
  };

  return (
    <header className="sticky top-0 z-40 w-full h-14 bg-[#0e1b15]/95 backdrop-blur-md border-b border-[#d4af37]/30 px-4 md:px-8">
      <div className="max-w-6xl h-full mx-auto flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNav('hero')}
          className="font-display-custom text-base sm:text-lg font-bold tracking-wider text-[#eed88f] hover:text-[#fff3b5] transition-colors whitespace-nowrap truncate max-w-[200px] sm:max-w-none text-left"
        >
          {config.groomName.toUpperCase()} &amp; {config.brideName.toUpperCase()}
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-[#afc2a7]">
          <button
            onClick={() => handleNav('hero')}
            className="hover:text-[#eed88f] transition-colors whitespace-nowrap cursor-pointer"
          >
            Invitation
          </button>
          <button
            onClick={() => handleNav('details')}
            className="hover:text-[#eed88f] transition-colors whitespace-nowrap cursor-pointer"
          >
            Details
          </button>
          <button
            onClick={() => handleNav('timeline')}
            className="hover:text-[#eed88f] transition-colors whitespace-nowrap cursor-pointer"
          >
            Timeline
          </button>
          <button
            onClick={() => handleNav('rsvp')}
            className="hover:text-[#eed88f] transition-colors whitespace-nowrap cursor-pointer"
          >
            RSVP
          </button>
          <button
            onClick={() => handleNav('location')}
            className="hover:text-[#eed88f] transition-colors whitespace-nowrap cursor-pointer"
          >
            Venue
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          {/* Music toggle button */}
          <button
            onClick={onToggleMusic}
            className="min-h-[38px] min-w-[38px] px-2.5 rounded-lg bg-[#14261e] border border-[#d4af37]/40 text-[#eed88f] hover:bg-[#1a3328] transition-colors flex items-center gap-1.5 text-xs font-medium"
            title={isPlayingMusic ? 'Mute Celebration Music' : 'Play Celebration Music'}
          >
            {isPlayingMusic ? (
              <>
                <Music className="w-3.5 h-3.5 text-[#eed88f] animate-pulse" />
                <span className="hidden sm:inline">Music On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#afc2a7]" />
                <span className="hidden sm:inline text-[#afc2a7]">Music Off</span>
              </>
            )}
          </button>

          {/* RSVP Primary CTA button */}
          <button
            onClick={() => handleNav('rsvp')}
            className="min-h-[38px] px-3.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#eed88f] to-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all whitespace-nowrap flex items-center gap-1.5 shadow-sm"
          >
            <Heart className="w-3.5 h-3.5 fill-current text-[#14261e]" />
            <span>RSVP</span>
          </button>

          {/* Quick Settings / Host button */}
          <button
            onClick={onOpenCustomize}
            className="min-h-[38px] min-w-[38px] p-2 rounded-lg bg-[#14261e] border border-[#d4af37]/30 text-[#afc2a7] hover:text-[#eed88f] transition-colors flex items-center justify-center"
            title="Customize names, date, venue"
          >
            <Settings2 className="w-4 h-4" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden min-h-[38px] min-w-[38px] p-2 rounded-lg bg-[#14261e] border border-[#d4af37]/30 text-[#afc2a7] hover:text-[#eed88f] transition-colors flex items-center justify-center"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-14 left-0 right-0 bg-[#0e1b15]/98 backdrop-blur-xl border-b border-[#d4af37]/30 p-4 shadow-2xl space-y-2 animate-fadeIn text-left text-xs">
          <button
            onClick={() => handleNav('hero')}
            className="w-full py-2.5 px-3 rounded-lg text-[#f7f4ed] hover:bg-[#14261e] flex items-center justify-between cursor-pointer"
          >
            <span>✨ The Invitation</span>
          </button>
          <button
            onClick={() => handleNav('details')}
            className="w-full py-2.5 px-3 rounded-lg text-[#f7f4ed] hover:bg-[#14261e] flex items-center justify-between cursor-pointer"
          >
            <span>📅 Ceremony Details &amp; Dress Code</span>
          </button>
          <button
            onClick={() => handleNav('timeline')}
            className="w-full py-2.5 px-3 rounded-lg text-[#f7f4ed] hover:bg-[#14261e] flex items-center justify-between cursor-pointer"
          >
            <span>🕐 Event Timeline</span>
          </button>
          <button
            onClick={() => handleNav('rsvp')}
            className="w-full py-2.5 px-3 rounded-lg text-[#eed88f] font-semibold bg-[#1a3328] border border-[#d4af37]/40 flex items-center justify-between cursor-pointer"
          >
            <span>💌 RSVP Now</span>
          </button>
          <button
            onClick={() => handleNav('location')}
            className="w-full py-2.5 px-3 rounded-lg text-[#f7f4ed] hover:bg-[#14261e] flex items-center justify-between cursor-pointer"
          >
            <span>📍 Venue &amp; Directions</span>
          </button>

          <div className="pt-2 border-t border-[#d4af37]/20 flex items-center justify-between text-[11px] text-[#afc2a7]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-[#eed88f] hover:underline"
            >
              Host Guestbook (Admin)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomize();
              }}
              className="text-[#a3b899] hover:underline"
            >
              Customize Details
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
