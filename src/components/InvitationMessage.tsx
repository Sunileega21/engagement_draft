import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { InvitationConfig } from '../types';

interface InvitationMessageProps {
  config: InvitationConfig;
}

export const InvitationMessage: React.FC<InvitationMessageProps> = ({ config }) => {
  return (
    <section className="py-16 px-4 md:px-8 max-w-3xl mx-auto text-center">
      <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#d4af37]/50 via-[#1b3d2b] to-[#0f1d16] shadow-2xl">
        <div className="relative rounded-[22px] bg-gradient-to-b from-[#14261e] via-[#102018] to-[#0c1611] p-6 sm:p-12 border border-[#d4af37]/35 shadow-2xl">
          {/* Top Traditional Motif */}
          <div className="flex items-center justify-center gap-2 text-[#eed88f] mb-4">
            <span className="text-xl">🌸</span>
            <span className="font-serif-custom text-xs uppercase tracking-[0.3em] font-semibold text-[#d4af37]">
              Subhamasthu
            </span>
            <span className="text-xl">🌸</span>
          </div>

          <p className="font-serif-custom text-lg sm:text-2xl text-[#f7f4ed] leading-relaxed max-w-xl mx-auto font-medium">
            "With the divine blessings of the Almighty and our beloved parents, we warmly invite you and your family to celebrate the auspicious Engagement Ceremony of"
          </p>

          <div className="my-6">
            <h3 className="font-display-custom text-3xl sm:text-4xl font-bold gold-gradient-text tracking-wide">
              {config.groomName.toUpperCase()} {config.groomSurname ? config.groomSurname.toUpperCase() : ''}
            </h3>
            <p className="text-xs text-[#afc2a7] font-medium mt-0.5">
              Son of {config.parentsGroom}
            </p>

            <div className="my-3 flex items-center justify-center gap-3">
              <div className="h-[1px] w-12 bg-[#d4af37]/40" />
              <Heart className="w-4 h-4 text-[#d4af37] fill-current" />
              <div className="h-[1px] w-12 bg-[#d4af37]/40" />
            </div>

            <h3 className="font-display-custom text-3xl sm:text-4xl font-bold gold-gradient-text tracking-wide">
              {config.brideName.toUpperCase()} {config.brideSurname ? config.brideSurname.toUpperCase() : ''}
            </h3>
            <p className="text-xs text-[#afc2a7] font-medium mt-0.5">
              Daughter of {config.parentsBride}
            </p>
          </div>

          <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto my-6" />

          <p className="text-xs sm:text-sm text-[#afc2a7] max-w-md mx-auto leading-relaxed">
            Please grace this momentous occasion with your presence and bless our new journey of togetherness, love, and laughter.
          </p>

          <div className="mt-8 pt-6 border-t border-[#d4af37]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#eed88f]">
            <div className="text-center sm:text-left">
              <span className="block text-[#afc2a7] uppercase text-[10px] tracking-wider">
                Groom's Family
              </span>
              <span className="font-medium text-[#f7f4ed]">{config.parentsGroom}</span>
            </div>

            <div className="text-center sm:text-right">
              <span className="block text-[#afc2a7] uppercase text-[10px] tracking-wider">
                Bride's Family
              </span>
              <span className="font-medium text-[#f7f4ed]">{config.parentsBride}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
