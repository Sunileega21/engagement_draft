import React from 'react';
import { Heart, Sparkles, Compass, Coffee, Stars } from 'lucide-react';
import { InvitationConfig } from '../types';
import coupleStoryImage from '../assets/images/couple_story_moment_1790226825644.jpg';

interface OurStoryProps {
  config: InvitationConfig;
}

export const OurStory: React.FC<OurStoryProps> = ({ config }) => {
  const milestones = [
    {
      year: 'The First Hello',
      title: 'A Serendipitous Beginning',
      desc: 'What began with a warm introduction soon blossomed into hours of effortless conversations, shared laughter, and an unmistakable sense of home.',
      icon: Compass
    },
    {
      year: 'Growing Fondness',
      title: 'Countless Coffee Dates',
      desc: 'From discovering each other\'s favorite quirks to dreaming about the future over weekend breakfasts, every small moment made the bond stronger.',
      icon: Coffee
    },
    {
      year: 'The Certainty',
      title: 'Knowing in Our Hearts',
      desc: 'Surrounded by the warmth of our loved ones, we realized that our lives were infinitely brighter, richer, and happier together.',
      icon: Stars
    },
    {
      year: 'Forever Decided',
      title: 'The "Yes" to Forever',
      desc: 'With hands held and hearts full, we decided to embark on life\'s greatest adventure as partners, confidants, and best friends.',
      icon: Heart
    }
  ];

  return (
    <section id="story" className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Journey</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <h2 className="font-display-custom text-2xl sm:text-4xl font-bold tracking-tight text-[#f7f4ed]">
          Our Love Story
        </h2>

        <p className="font-cursive-custom text-2xl sm:text-3xl text-[#f3e5ab] mt-1">
          "Two hearts, one beautiful beginning."
        </p>

        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
      </div>

      {/* Story Narrative & Featured Photo */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-14">
        <div className="md:col-span-5">
          <div className="relative rounded-2xl p-1 bg-gradient-to-tr from-[#d4af37]/40 via-[#d4af37]/10 to-[#1b3d2b]/30 shadow-xl">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] md:aspect-[3/4] bg-[#122119]">
              <img
                src={coupleStoryImage}
                alt={`${config.groomName} and ${config.brideName} Story`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1410]/85 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <p className="text-xs text-[#eed88f] font-serif-custom italic">
                  "Every love story is beautiful, but ours is our favorite."
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 space-y-4 text-left">
          <p className="font-serif-custom text-lg sm:text-xl text-[#f7f4ed] leading-relaxed">
            Welcome to the celebration of our next chapter. We believe that true love is not just about finding someone you can live with—it's about finding the one you cannot imagine life without.
          </p>
          <p className="text-sm text-[#afc2a7] leading-relaxed">
            With the unconditional blessings and guidance of our cherished parents, we are thrilled to exchange rings and make our commitment official in front of the people who matter most to us.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <span className="font-cursive-custom text-2xl text-[#d4af37]">
              {config.groomName} &amp; {config.brideName}
            </span>
            <div className="h-[1px] flex-1 bg-[#d4af37]/20" />
          </div>
        </div>
      </div>

      {/* Timeline Milestones */}
      <div className="relative pl-6 sm:pl-8 border-l border-[#d4af37]/35 space-y-8 max-w-xl mx-auto text-left">
        {milestones.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="relative group">
              {/* Bullet Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full bg-[#122119] border-2 border-[#d4af37] flex items-center justify-center shadow-md shadow-[#d4af37]/20 group-hover:scale-110 transition-transform">
                <Icon className="w-3 h-3 text-[#eed88f]" />
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-[#14261e]/90 border border-[#d4af37]/25 hover:border-[#d4af37]/60 transition-colors shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-[#d4af37] tracking-wider uppercase">
                    {m.year}
                  </span>
                  <span className="text-[11px] text-[#afc2a7]">
                    Chapter 0{idx + 1}
                  </span>
                </div>
                <h3 className="font-serif-custom text-lg font-bold text-[#f7f4ed] mb-1">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#afc2a7] leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
