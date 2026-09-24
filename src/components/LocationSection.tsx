import React from 'react';
import { Sparkles, MapPin, Navigation, Car, ExternalLink, Compass } from 'lucide-react';
import { InvitationConfig } from '../types';

interface LocationSectionProps {
  config: InvitationConfig;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ config }) => {
  return (
    <section id="location" className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Find Your Way</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <h2 className="font-display-custom text-2xl sm:text-4xl font-bold tracking-tight text-[#f7f4ed]">
          Venue &amp; Directions
        </h2>

        <p className="text-sm text-[#afc2a7] mt-2 max-w-md mx-auto">
          We look forward to welcoming you at our venue. Follow the map below for seamless navigation.
        </p>

        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
      </div>

      <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/35 shadow-2xl bg-[#122119]">
        {/* Interactive Google Map Embed / Clean fallback */}
        <div className="relative w-full h-80 sm:h-96 bg-[#0c1611] overflow-hidden">
          <iframe
            title="Venue Location Map"
            src="https://maps.google.com/maps?q=Jubilee+Hills,+Road+No+36,+Hyderabad,+Telangana&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0 filter contrast-[1.05] brightness-[0.85] invert-[0.9] hue-rotate-[180deg]"
            loading="lazy"
            allowFullScreen
          />

          {/* Floating Venue Tag on Map */}
          <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-sm p-3.5 rounded-xl bg-[#0e1a14]/90 backdrop-blur-md border border-[#d4af37]/45 shadow-xl text-left">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#eed88f] shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif-custom text-base font-bold text-[#f7f4ed]">
                  {config.venueName}
                </h4>
                <p className="text-xs text-[#afc2a7] mt-0.5 line-clamp-2">
                  {config.venueAddress}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Venue Information Grid */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-[#14261e] to-[#0f1d16] border-t border-[#d4af37]/25 text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-4 rounded-xl bg-[#1a3328] border border-[#d4af37]/25 shadow-sm">
              <div className="flex items-center gap-2 text-[#eed88f] mb-1.5">
                <Car className="w-4 h-4 text-[#d4af37]" />
                <span className="text-xs font-semibold uppercase tracking-wider">Valet Parking</span>
              </div>
              <p className="text-xs text-[#afc2a7] leading-relaxed">
                Complimentary valet assistance is arranged at the main portico for all guests.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#1a3328] border border-[#d4af37]/25 shadow-sm">
              <div className="flex items-center gap-2 text-[#eed88f] mb-1.5">
                <Compass className="w-4 h-4 text-[#d4af37]" />
                <span className="text-xs font-semibold uppercase tracking-wider">Landmark</span>
              </div>
              <p className="text-xs text-[#afc2a7] leading-relaxed">
                Adjacent to Jubilee Hills Metro Station (Blue Line) &amp; Peddamma Gudi junction.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#1a3328] border border-[#d4af37]/25 shadow-sm">
              <div className="flex items-center gap-2 text-[#eed88f] mb-1.5">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                <span className="text-xs font-semibold uppercase tracking-wider">Hall Entry</span>
              </div>
              <p className="text-xs text-[#afc2a7] leading-relaxed">
                Proceed towards Grand Ballroom lawn entrance with floral welcome arch.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={config.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none min-h-[44px] px-6 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#eed88f] to-[#d4af37] text-black font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              <span>Open in Google Maps</span>
            </a>

            <a
              href={`https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(config.venueAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-4 rounded-xl bg-[#1a3328] border border-[#d4af37]/35 text-xs font-medium text-[#eed88f] hover:bg-[#224435] transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Book Uber to Venue</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
