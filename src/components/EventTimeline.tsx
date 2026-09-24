import React from 'react';
import { Sparkles, Users, HeartHandshake, Utensils, Music2, Clock } from 'lucide-react';
import { TimelineEvent } from '../types';

export const EventTimeline: React.FC = () => {
  const events: TimelineEvent[] = [
    {
      id: 'e1',
      time: '6:00 PM',
      title: 'Swagatham: Guest Arrival',
      description: 'Traditional welcome with fragrant rose water, jasmine garlands, and refreshing artisanal coolers.',
      iconName: 'Users',
      tag: 'Welcome'
    },
    {
      id: 'e2',
      time: '6:30 PM',
      title: 'Engagement & Ring Exchange',
      description: 'Auspicious Vedic chants, exchange of traditional vows, and official ring ceremony with family blessings.',
      iconName: 'HeartHandshake',
      tag: 'Auspicious Muhurtham'
    },
    {
      id: 'e3',
      time: '7:30 PM',
      title: 'Grand Royal Banquet',
      description: 'An exquisite gastronomic feast featuring authentic regional Hyderabadi delicacies and live royal counters.',
      iconName: 'Utensils',
      tag: 'Celebratory Feast'
    },
    {
      id: 'e4',
      time: '8:30 PM',
      title: 'Celebrations & Sangeet',
      description: 'Joyful music, couple dance, candid portraits with friends, and heartfelt toasts to the newly engaged couple.',
      iconName: 'Music2',
      tag: 'Festivities'
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-5 h-5 text-[#eed88f]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[#eed88f]" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-[#eed88f]" />;
      case 'Music2':
        return <Music2 className="w-5 h-5 text-[#eed88f]" />;
      default:
        return <Clock className="w-5 h-5 text-[#eed88f]" />;
    }
  };

  return (
    <section id="timeline" className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Itinerary of the Evening</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <h2 className="font-display-custom text-2xl sm:text-4xl font-bold tracking-tight text-[#f7f4ed]">
          Event Timeline
        </h2>

        <p className="text-sm text-[#afc2a7] mt-2">
          Join us as each moment unfolds throughout this unforgettable evening.
        </p>

        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
      </div>

      <div className="relative">
        {/* Central connecting line */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#d4af37]/45 to-transparent" />
        <div className="md:hidden absolute left-6 top-4 bottom-4 w-[1px] bg-gradient-to-b from-transparent via-[#d4af37]/45 to-transparent" />

        <div className="space-y-8">
          {events.map((event, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={event.id}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Card */}
                <div className="w-full md:w-[45%] pl-14 md:pl-0">
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#14261e]/90 border border-[#d4af37]/30 shadow-lg hover:border-[#d4af37]/60 transition-all text-left">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#eed88f] font-mono tracking-wider">
                        <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                        {event.time}
                      </span>
                      {event.tag && (
                        <span className="text-[11px] text-[#afc2a7] tracking-wider uppercase font-medium">
                          {event.tag}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif-custom text-xl font-bold text-[#f7f4ed] mb-1">
                      {event.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#afc2a7] leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Center Node Icon */}
                <div className="absolute left-2.5 md:left-1/2 -translate-x-0 md:-translate-x-1/2 top-4 w-10 h-10 rounded-full bg-[#122119] border-2 border-[#d4af37] flex items-center justify-center shadow-lg shadow-[#d4af37]/30 z-10">
                  {getIcon(event.iconName)}
                </div>

                {/* Spacer for desktop symmetry */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
