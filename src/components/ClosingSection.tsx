import React, { useState } from 'react';
import { Heart, Sparkles, Share2, Check, ArrowUp, RefreshCw } from 'lucide-react';
import { InvitationConfig } from '../types';

interface ClosingSectionProps {
  config: InvitationConfig;
  onReopenEnvelope: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ config, onReopenEnvelope }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const text = encodeURIComponent(
      `💍 You're cordially invited to celebrate the Engagement Ceremony of *${config.groomName} & ${config.brideName}*!\n\n` +
      `📅 Date: ${config.displayDate}\n` +
      `📍 Venue: ${config.venueName}\n\n` +
      `Please view the digital invitation and RSVP here:\n${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-16 pb-24 px-4 md:px-8 border-t border-[#d4af37]/30 bg-[#0e1b15] text-center overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto space-y-6">
        <div className="w-12 h-12 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/35 flex items-center justify-center mx-auto text-[#eed88f]">
          <Heart className="w-6 h-6 text-[#eed88f] fill-current" />
        </div>

        <p className="font-serif-custom text-xl sm:text-2xl text-[#f7f4ed] leading-relaxed">
          “We can't wait to celebrate this beautiful beginning with you”
        </p>

        <div className="font-display-custom text-2xl sm:text-3xl font-bold gold-gradient-text tracking-wider">
          SEE YOU THERE!
        </div>

        <div className="font-cursive-custom text-3xl sm:text-4xl text-[#eed88f]">
          With Love, {config.groomName} &amp; {config.brideName}
        </div>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto my-6" />

        {/* WhatsApp Share & Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleShare}
            className="px-5 py-2.5 rounded-xl bg-[#25d366] text-black font-semibold text-xs flex items-center gap-2 hover:bg-[#22bf5b] transition-colors shadow-md cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Forward Invitation on WhatsApp</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-[#14261e] border border-[#d4af37]/35 text-xs text-[#eed88f] hover:bg-[#1a3328] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : null}
            <span>{copied ? 'Link Copied' : 'Copy Invitation Link'}</span>
          </button>
        </div>

        <div className="pt-8 flex items-center justify-center gap-4 text-xs text-[#afc2a7]">
          <button
            onClick={onReopenEnvelope}
            className="flex items-center gap-1.5 hover:text-[#eed88f] transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>View Envelope Again</span>
          </button>
          <span>·</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#eed88f] transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to Top</span>
          </button>
        </div>

        <p className="text-[11px] text-[#afc2a7]/70 pt-6">
          Designed with heartfelt blessings for Sunil &amp; {config.brideName}'s Engagement Ceremony
        </p>
      </div>
    </footer>
  );
};
