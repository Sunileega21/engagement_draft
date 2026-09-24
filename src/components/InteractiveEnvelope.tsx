import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ChevronDown, Music, VolumeX, MailOpen, RotateCcw, Crown } from 'lucide-react';
import { InvitationConfig } from '../types';
import { weddingAudio } from '../utils/audio';

interface InteractiveEnvelopeProps {
  config: InvitationConfig;
  isOpen: boolean;
  onOpen: () => void;
  onScrollToStory: () => void;
}

export const InteractiveEnvelope: React.FC<InteractiveEnvelopeProps> = ({
  config,
  isOpen,
  onOpen,
  onScrollToStory
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);

    // Trigger royal gold & ruby confetti burst
    try {
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#d4af37', '#f7d779', '#ffffff', '#8a1127', '#e8c468']
      });
    } catch (e) {
      // safe fallback
    }

    // Start serene music
    weddingAudio.play();
    setAudioEnabled(true);

    setTimeout(() => {
      onOpen();
      setIsOpening(false);
    }, 750);
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    const playing = weddingAudio.toggle();
    setAudioEnabled(playing);
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 py-10 overflow-hidden bg-gradient-to-b from-[#0a120e] via-[#0f1d16] to-[#0c1410]">
      {/* Background Royal Mandala & Gold Ambient Warmth */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#d4af37]/30 animate-spin-slow">
          <div className="absolute inset-6 rounded-full border border-dashed border-[#d4af37]/25" />
          <div className="absolute inset-20 rounded-full border border-[#d4af37]/15" />
        </div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#1b3d2b]/25 rounded-full blur-3xl" />
      </div>

      {/* Top Auspicious Header Banner */}
      <div className="relative z-10 text-center mb-6 max-w-md">
        <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.3em] text-[#eed88f] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#eed88f]" />
          <span>|| श्री गणेशाय नमः ||</span>
          <Sparkles className="w-3.5 h-3.5 text-[#eed88f]" />
        </div>
        <h1 className="text-sm md:text-base font-serif-custom text-[#f7f4ed] mt-1.5 tracking-widest uppercase">
          Engagement Ceremony Invitation
        </h1>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-2" />
      </div>

      {/* Interactive 3D Envelope Container */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md perspective-1000">
        <div
          className={`relative w-full rounded-2xl transition-all duration-700 shadow-2xl ${
            isOpen ? 'shadow-[#d4af37]/25' : 'hover:scale-[1.01]'
          }`}
        >
          {/* Main Outer Envelope Body */}
          <div className="relative bg-gradient-to-b from-[#1c3328] via-[#14261e] to-[#0e1a14] border-2 border-[#d4af37]/60 rounded-2xl p-1 overflow-hidden shadow-2xl">
            
            {/* Ornate Gold Filigree Corner Accents */}
            <div className="absolute top-1.5 left-1.5 w-6 h-6 border-t-2 border-l-2 border-[#eed88f]/70 pointer-events-none rounded-tl-sm" />
            <div className="absolute top-1.5 right-1.5 w-6 h-6 border-t-2 border-r-2 border-[#eed88f]/70 pointer-events-none rounded-tr-sm" />
            <div className="absolute bottom-1.5 left-1.5 w-6 h-6 border-b-2 border-l-2 border-[#eed88f]/70 pointer-events-none rounded-bl-sm" />
            <div className="absolute bottom-1.5 right-1.5 w-6 h-6 border-b-2 border-r-2 border-[#eed88f]/70 pointer-events-none rounded-br-sm" />

            {/* Inner Envelope Frame */}
            <div className="relative bg-gradient-to-b from-[#122119] to-[#0d1812] rounded-xl p-5 sm:p-7 border border-[#d4af37]/35 min-h-[360px] flex flex-col items-center justify-between text-center overflow-hidden">
              
              {/* ================= CLOSED STATE: PROPER ENVELOPE WITH WAX SEAL ================= */}
              {!isOpen && (
                <>
                  {/* Top Postage / Royal Hallmark */}
                  <div className="w-full flex justify-between items-center text-[#eed88f]/80 text-[11px] font-serif-custom tracking-widest uppercase pb-2 border-b border-[#d4af37]/20">
                    <span className="flex items-center gap-1">
                      <span>👑</span> Hyderabad, India
                    </span>
                    <span className="text-[#eed88f] font-semibold">24 · 10 · 2026</span>
                  </div>

                  {/* Envelope Flap Graphic Simulation */}
                  <div className="relative w-full my-auto flex flex-col items-center py-4">
                    {/* Triangular Flap Lines */}
                    <div className="absolute -top-1 left-0 right-0 h-28 pointer-events-none opacity-40">
                      <svg viewBox="0 0 400 120" className="w-full h-full fill-none stroke-[#eed88f] stroke-[1.5]">
                        <path d="M 0,0 L 200,95 L 400,0" />
                        <path d="M 0,10 L 200,102 L 400,10" strokeDasharray="4 4" strokeWidth="1" opacity="0.6" />
                      </svg>
                    </div>

                    {/* Central Proper Wax Seal with "S & S" */}
                    <button
                      type="button"
                      onClick={handleOpenEnvelope}
                      disabled={isOpening}
                      className="relative z-20 group cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#eed88f]/50 rounded-full transition-transform active:scale-95"
                      title="Tap Wax Seal to Open Invitation"
                    >
                      {/* Pulsing Golden Aura Ring */}
                      <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#d4af37]/40 via-[#f3e5ab]/30 to-[#d4af37]/40 blur-md animate-pulse group-hover:scale-110 transition-transform duration-500" />
                      
                      {/* Outer Wax Melt Droplet Organic Rim */}
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#9c142b] via-[#750e20] to-[#480613] wax-seal-shadow flex items-center justify-center p-1.5 transition-transform duration-300 group-hover:scale-105">
                        
                        {/* Wavy scalloped decorative ring mimicking melted stamp rim */}
                        <div className="absolute inset-1 rounded-full border border-[#eed88f]/30" />
                        <div className="absolute inset-2 rounded-full border border-dashed border-[#eed88f]/40 opacity-70" />

                        {/* Recessed Wax Center Stamped Disc */}
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#800f23] via-[#630a1a] to-[#420510] wax-seal-inner flex flex-col items-center justify-center text-center relative border border-[#eed88f]/50">
                          
                          {/* Royal Crown Icon above Monogram */}
                          <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#eed88f] mb-0.5 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />

                          {/* PROPER EMBOSSED "S & S" MONOGRAM */}
                          <div className="flex items-center justify-center gap-1 font-display-custom font-extrabold text-base sm:text-xl text-[#fef3c7] tracking-wider filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]">
                            <span>S</span>
                            <span className="text-[#eed88f] text-xs sm:text-sm font-sans mx-0.5">&amp;</span>
                            <span>S</span>
                          </div>

                          {/* Subtext on seal */}
                          <span className="text-[8px] sm:text-[9px] font-serif-custom tracking-[0.2em] text-[#f8e7b9] uppercase mt-0.5 font-bold filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                            ROYAL SEAL
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* Inviting Interactive Callout */}
                    <div className="mt-5 space-y-1.5">
                      <p className="font-serif-custom text-base sm:text-lg text-[#f7f4ed] font-medium tracking-wide">
                        {config.groomName} &amp; {config.brideName}
                      </p>
                      
                      <button
                        type="button"
                        onClick={handleOpenEnvelope}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#182c23] border border-[#d4af37]/60 text-xs text-[#eed88f] font-medium shadow-md hover:bg-[#223d30] transition-colors animate-bounce cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-[#eed88f]" />
                        <span>Tap Wax Seal to Open</span>
                        <ChevronDown className="w-3 h-3 text-[#eed88f]" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Auspicious Subtitle */}
                  <div className="w-full pt-2 border-t border-[#d4af37]/20 text-[11px] text-[#afc2a7] tracking-widest uppercase">
                    Auspicious Engagement Ceremony
                  </div>
                </>
              )}

              {/* ================= OPENED STATE: ROYAL INVITATION CARD PEEK ================= */}
              {isOpen && (
                <div className="w-full py-2 flex flex-col items-center justify-center text-center animate-fadeIn">
                  
                  {/* Miniature Stamped "S & S" Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#182c23] border border-[#d4af37]/50 text-[#eed88f] text-xs font-serif-custom tracking-wider mb-2">
                    <Crown className="w-3 h-3 text-[#eed88f]" />
                    <span className="font-display-custom font-bold">S &amp; S</span>
                    <span className="text-[10px] text-[#afc2a7]">· Royal Engagement</span>
                  </div>

                  <span className="text-[11px] text-[#eed88f] font-serif-custom tracking-[0.25em] uppercase mb-1">
                    || शुभ विवाह पूर्व सगाई ||
                  </span>

                  <h2 className="font-display-custom text-2xl sm:text-3xl font-bold tracking-tight gold-gradient-text mt-1">
                    {config.groomName.toUpperCase()} &amp; {config.brideName.toUpperCase()}
                  </h2>

                  <p className="font-cursive-custom text-2xl sm:text-3xl text-[#f3e5ab] mt-1">
                    Two hearts, one beautiful beginning
                  </p>

                  <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent my-3.5" />

                  <p className="text-xs sm:text-sm text-[#f7f4ed] font-medium tracking-wide">
                    {config.displayDate}
                  </p>
                  <p className="text-xs text-[#afc2a7] mt-0.5">
                    {config.displayTime} · {config.venueName}
                  </p>

                  {/* Primary Scroll / Enter Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onScrollToStory();
                    }}
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#eed88f] to-[#d4af37] text-[#0c1410] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#d4af37]/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Explore Royal Invitation</span>
                    <ChevronDown className="w-4 h-4 animate-bounce" />
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* Auxiliary Controls: Music toggle & Re-seal option */}
      <div className="relative z-10 mt-6 flex items-center gap-3">
        <button
          onClick={toggleAudio}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#122119]/90 border border-[#d4af37]/40 text-xs text-[#eed88f] hover:bg-[#1a3025] transition-colors shadow-sm"
          title="Toggle ambient Indian celebration music"
        >
          {audioEnabled ? (
            <>
              <Music className="w-3.5 h-3.5 text-[#eed88f] animate-pulse" />
              <span>Music: Playing</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#afc2a7]" />
              <span>Music: Muted (Tap to Play)</span>
            </>
          )}
        </button>

        {isOpen && (
          <button
            onClick={() => onScrollToStory()}
            className="text-xs text-[#afc2a7] underline hover:text-[#eed88f] transition-colors"
          >
            Scroll to Ceremony ↓
          </button>
        )}
      </div>
    </div>
  );
};
