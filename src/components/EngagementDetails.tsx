import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Navigation, Check, Shirt, Download } from 'lucide-react';
import { InvitationConfig } from '../types';
import ringsImage from '../assets/images/engagement_rings_close_1790226839210.jpg';

interface EngagementDetailsProps {
  config: InvitationConfig;
}

export const EngagementDetails: React.FC<EngagementDetailsProps> = ({ config }) => {
  const [downloadedIcs, setDownloadedIcs] = useState(false);

  // Generate iCal (.ics) file for Apple / Outlook / Mobile calendar
  const handleDownloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Sunil & ' + config.brideName + '//Engagement Ceremony//EN',
      'BEGIN:VEVENT',
      'UID:sunil-engagement-' + Date.now() + '@engagement.app',
      'DTSTAMP:20260924T000000Z',
      'DTSTART:20261024T123000Z',
      'DTEND:20261024T173000Z',
      'SUMMARY:Engagement Ceremony: Sunil & ' + config.brideName,
      'DESCRIPTION:With the blessings of our families\\, we invite you to celebrate the beginning of our forever! Rings exchange & dinner.',
      'LOCATION:' + config.venueName + '\\, ' + config.venueAddress,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Sunil_Engagement_Ceremony.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedIcs(true);
    setTimeout(() => setDownloadedIcs(false), 3000);
  };

  return (
    <section id="details" className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Save The Date</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <h2 className="font-display-custom text-2xl sm:text-4xl font-bold tracking-tight text-[#f7f4ed]">
          Ceremony & Venue Details
        </h2>

        <p className="text-sm text-[#afc2a7] mt-2 max-w-md mx-auto">
          We would be honored by your gracious presence as we exchange rings and celebrate this holy union.
        </p>

        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch mb-10">
        {/* Left card: Date & Time */}
        <div className="md:col-span-6 p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#14261e] to-[#0f1d16] border border-[#d4af37]/35 shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/35 flex items-center justify-center text-[#eed88f] mb-4">
              <Calendar className="w-6 h-6" />
            </div>

            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              The Auspicious Day
            </span>
            <h3 className="font-serif-custom text-2xl font-bold text-[#f7f4ed] mt-1">
              {config.displayDate}
            </h3>

            <div className="mt-4 space-y-2 border-t border-[#d4af37]/25 pt-4">
              <div className="flex items-center gap-2 text-sm text-[#f7f4ed]">
                <Clock className="w-4 h-4 text-[#d4af37]" />
                <span className="font-medium">Guest Arrival: 6:00 PM</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#eed88f]">
                <Sparkles className="w-4 h-4 text-[#eed88f]" />
                <span className="font-semibold">Ring Exchange Muhurtham: 6:30 PM</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#afc2a7]">
                <Clock className="w-4 h-4 text-[#d4af37]" />
                <span>Dinner &amp; Sangeet: 7:30 PM Onwards</span>
              </div>
            </div>
          </div>

          {/* Calendar Actions */}
          <div className="mt-6 pt-4 border-t border-[#d4af37]/25 flex flex-wrap gap-2">
            <a
              href={config.googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-h-[42px] px-3 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/45 text-xs font-semibold text-[#eed88f] flex items-center justify-center gap-1.5 hover:bg-[#d4af37]/30 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Google Calendar</span>
            </a>

            <button
              onClick={handleDownloadIcs}
              className="min-h-[42px] px-3 rounded-lg bg-[#14261e] border border-[#d4af37]/35 text-xs font-medium text-[#afc2a7] flex items-center justify-center gap-1.5 hover:text-[#eed88f] hover:border-[#d4af37]/50 transition-colors cursor-pointer"
            >
              {downloadedIcs ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#eed88f]" />
                  <span>Saved to Calendar</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Apple / iCal</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right card: Venue & Dress Code */}
        <div className="md:col-span-6 p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#14261e] to-[#0f1d16] border border-[#d4af37]/35 shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/35 flex items-center justify-center text-[#eed88f] mb-4">
              <MapPin className="w-6 h-6" />
            </div>

            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              The Venue
            </span>
            <h3 className="font-serif-custom text-2xl font-bold text-[#f7f4ed] mt-1">
              {config.venueName}
            </h3>

            <p className="text-sm text-[#afc2a7] mt-2 leading-relaxed">
              {config.venueAddress}
            </p>

            {/* Dress code advisory */}
            <div className="mt-5 p-3 rounded-xl bg-[#1a3328] border border-[#d4af37]/25 flex items-start gap-3">
              <Shirt className="w-5 h-5 text-[#eed88f] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#eed88f] font-semibold block">
                  Suggested Dress Code
                </span>
                <p className="text-xs text-[#f7f4ed] mt-0.5">
                  {config.dressCode}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#d4af37]/25 flex items-center gap-3">
            <a
              href={config.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-h-[44px] px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#eed88f] to-[#d4af37] text-black font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </div>

      {/* Rings Feature Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/35 p-6 sm:p-8 bg-[#122119]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] border border-[#d4af37]/35 shadow-lg">
              <img
                src={ringsImage}
                alt="Engagement Rings"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="md:col-span-8 text-left">
            <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-widest block mb-1">
              Symbol of Eternity
            </span>
            <h4 className="font-serif-custom text-xl sm:text-2xl font-bold text-[#f7f4ed]">
              The Sacred Ring Exchange
            </h4>
            <p className="text-xs sm:text-sm text-[#afc2a7] mt-2 leading-relaxed">
              As two circles with no beginning and no end, these rings reflect the endless love, mutual respect, and lifelong devotion Sunil and {config.brideName} pledge to each other.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-[#eed88f]">
              <span>✨ Muhurtham: 6:30 PM sharp</span>
              <span>·</span>
              <span>Lawn Amphitheatre</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
