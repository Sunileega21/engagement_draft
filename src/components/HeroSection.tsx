import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Heart, Clock, Sparkles, Share2, Check } from 'lucide-react';
import { InvitationConfig } from '../types';

// High-fidelity generated image asset
import heroImage from '../assets/images/hero_engagement_couple_1790226795533.jpg';

interface HeroSectionProps {
  config: InvitationConfig;
  onScrollToRsvp: () => void;
  onScrollToVenue: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onScrollToRsvp,
  onScrollToVenue
}) => {
  const [copied, setCopied] = useState(false);

  // Real-time Countdown calculations
  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(config.engagementDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [config.engagementDate]);

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `💍 You are cordially invited to celebrate the Engagement Ceremony of *${config.groomName} & ${config.brideName}*!\n\n` +
      `📅 Date: ${config.displayDate}\n` +
      `📍 Venue: ${config.venueName}, Hyderabad\n\n` +
      `Kindly view the digital invitation and RSVP here:\n${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="hero" className="relative pt-8 pb-16 px-4 md:px-8 max-w-5xl mx-auto text-center">
      {/* Sacred Traditional Invocation */}
      <div className="mb-4">
        <span className="font-serif-custom text-xs sm:text-sm tracking-[0.3em] text-[#d4af37] uppercase font-semibold">
          ॥ श्री गणेशाय नमः ॥
        </span>
        <p className="text-[11px] text-[#afc2a7] tracking-widest mt-1 uppercase">
          With the divine blessings of our families
        </p>
      </div>

      {/* Main Couple Photo in Ornate Royal Frame */}
      <div className="relative mx-auto w-full max-w-xs sm:max-w-sm mb-8">
        <div className="relative rounded-t-[140px] rounded-b-2xl p-1.5 bg-gradient-to-b from-[#d4af37] via-[#eed88f] to-[#1b3d2b] shadow-2xl shadow-[#d4af37]/20">
          <div className="relative rounded-t-[136px] rounded-b-xl overflow-hidden aspect-[3/4] bg-[#122119]">
            <img
              src={heroImage}
              alt={`${config.groomName} & ${config.brideName} Engagement`}
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Subtle romantic gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1410] via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-3 left-0 right-0 px-4 text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-[#0c1410]/85 backdrop-blur-md border border-[#d4af37]/50 text-[11px] text-[#eed88f] font-medium tracking-wider shadow-lg">
                💍 Forever Begins Here
              </span>
            </div>
          </div>
        </div>

        {/* Decorative corner accent motifs */}
        <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]/60 rounded-tl-lg" />
        <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]/60 rounded-tr-lg" />
      </div>

      {/* Couple Names & Title */}
      <div className="space-y-2 mb-6">
        <div className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#eed88f]">
          <span>You're Invited To The</span>
        </div>

        <h1 className="font-display-custom text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight gold-gradient-text px-2">
          {config.groomName.toUpperCase()} <span className="text-[#d4af37] font-normal">&amp;</span> {config.brideName.toUpperCase()}
        </h1>

        <div className="font-cursive-custom text-2xl sm:text-3xl text-[#f3e5ab]">
          Engagement Ceremony
        </div>
      </div>

      {/* Date & Location Pill Banner */}
      <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 py-2 px-4 sm:px-6 rounded-full bg-[#12231b]/95 border border-[#d4af37]/45 shadow-lg mb-10 text-xs sm:text-sm text-[#f7f4ed]">
        <div className="flex items-center gap-1.5 text-[#eed88f] font-medium">
          <Calendar className="w-4 h-4 text-[#d4af37]" />
          <span>{config.displayDate}</span>
        </div>
        <span className="text-[#d4af37]/40">·</span>
        <div className="flex items-center gap-1.5 text-[#eed88f] font-medium">
          <Clock className="w-4 h-4 text-[#d4af37]" />
          <span>{config.displayTime}</span>
        </div>
        <span className="text-[#d4af37]/40 hidden sm:inline">·</span>
        <button
          onClick={onScrollToVenue}
          className="flex items-center gap-1.5 text-[#eed88f] hover:text-[#fff3b5] underline decoration-dotted transition-colors cursor-pointer"
        >
          <MapPin className="w-4 h-4 text-[#d4af37]" />
          <span>{config.venueName}</span>
        </button>
      </div>

      {/* ⏳ Real-Time Countdown Timer */}
      <div className="mb-10 max-w-lg mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-3 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Countdown to the Celebration</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        {timeLeft.isPast ? (
          <div className="p-4 rounded-xl bg-[#14261e] border border-[#d4af37]/40 text-[#eed88f]">
            The auspicious ceremony has commenced! Thank you for blessing Sunil &amp; {config.brideName}!
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#162a21] to-[#0f1d16] border border-[#d4af37]/40 shadow-md">
              <span className="block font-display-custom text-2xl sm:text-4xl font-bold text-[#eed88f] tabular-nums">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-[#afc2a7] uppercase tracking-wider font-medium">
                Days
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#162a21] to-[#0f1d16] border border-[#d4af37]/40 shadow-md">
              <span className="block font-display-custom text-2xl sm:text-4xl font-bold text-[#eed88f] tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-[#afc2a7] uppercase tracking-wider font-medium">
                Hours
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#162a21] to-[#0f1d16] border border-[#d4af37]/40 shadow-md">
              <span className="block font-display-custom text-2xl sm:text-4xl font-bold text-[#eed88f] tabular-nums">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-[#afc2a7] uppercase tracking-wider font-medium">
                Minutes
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#162a21] to-[#0f1d16] border border-[#d4af37]/40 shadow-md">
              <span className="block font-display-custom text-2xl sm:text-4xl font-bold text-[#f3e5ab] tabular-nums animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-[#afc2a7] uppercase tracking-wider font-medium">
                Seconds
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action CTA Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 max-w-md mx-auto">
        <button
          onClick={onScrollToRsvp}
          className="flex-1 min-h-[48px] px-6 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#eed88f] to-[#d4af37] text-black font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#d4af37]/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Heart className="w-4 h-4 fill-current text-[#14261e]" />
          <span>RSVP Attendance</span>
        </button>

        <a
          href={config.googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[48px] px-5 rounded-xl bg-[#14261e] border border-[#d4af37]/40 text-[#eed88f] font-medium text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#1a3328] active:scale-95 transition-all cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#d4af37]" />
          <span>Add to Calendar</span>
        </a>

        <button
          onClick={handleShareWhatsApp}
          className="min-h-[48px] px-4 rounded-xl bg-[#25d366]/20 border border-[#25d366]/40 text-[#71f09c] hover:bg-[#25d366]/30 transition-colors flex items-center justify-center gap-1.5 text-xs font-medium cursor-pointer"
          title="Share on WhatsApp"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share on WhatsApp</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="min-h-[48px] px-3.5 rounded-xl bg-[#14261e] border border-[#d4af37]/35 text-[#afc2a7] hover:text-[#eed88f] transition-colors flex items-center justify-center text-xs cursor-pointer"
          title="Copy Link"
        >
          {copied ? <Check className="w-4 h-4 text-[#eed88f]" /> : 'Copy Link'}
        </button>
      </div>
    </section>
  );
};
