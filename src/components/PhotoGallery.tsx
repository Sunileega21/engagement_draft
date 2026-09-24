import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, Maximize2, X, Play, Pause, Image as ImageIcon } from 'lucide-react';
import { GalleryPhoto } from '../types';

import imgCouple from '../assets/images/hero_engagement_couple_1790226795533.jpg';
import imgStory from '../assets/images/couple_story_moment_1790226825644.jpg';
import imgRings from '../assets/images/engagement_rings_close_1790226839210.jpg';
import imgVenue from '../assets/images/venue_banquet_celebration_1790226850997.jpg';

export const PhotoGallery: React.FC = () => {
  const photos: GalleryPhoto[] = [
    {
      id: 'p1',
      src: imgCouple,
      title: 'A New Chapter Begins',
      caption: 'Sunil and Ananya in their royal engagement attire, sharing a tender candid smile surrounded by floral grace.',
      location: 'Pre-Engagement Shoot, Hyderabad'
    },
    {
      id: 'p2',
      src: imgStory,
      title: 'Laughter & Lifelong Friendship',
      caption: 'Golden hour moments filled with effortless laughter and quiet understanding.',
      location: 'Botanical Courtyard, Jubilee Hills'
    },
    {
      id: 'p3',
      src: imgRings,
      title: 'Vows of Devotion',
      caption: 'Solitaire diamond and platinum engagement rings, blessed with fragrant jasmine buds.',
      location: 'The Ring Ceremony'
    },
    {
      id: 'p4',
      src: imgVenue,
      title: 'The Celebratory Courtyard',
      caption: 'Opulent banquet ballroom and illuminated lawns prepared to welcome our cherished family and friends.',
      location: 'The Royal Palace Ballroom'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-slide when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, photos.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const scrollToPhoto = (index: number) => {
    setCurrentIndex(index);
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.children[index] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  return (
    <section id="gallery" className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Moments Captured in Time</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <h2 className="font-display-custom text-2xl sm:text-4xl font-bold tracking-tight text-[#f7f4ed]">
          Engagement Photo Gallery
        </h2>

        <p className="text-sm text-[#afc2a7] mt-2 max-w-md mx-auto">
          Glimpses of our favorite memories, intimate smiles, and the journey leading to our special day.
        </p>

        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
      </div>

      {/* Featured Cinematic Showcase */}
      <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/35 shadow-2xl bg-[#0f1d16] mb-6">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-[#0c1611]">
          {photos.map((photo, idx) => (
            <div
              key={photo.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Cinematic Bottom Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1410] via-black/40 to-transparent" />

              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-20">
                <div className="text-left max-w-lg">
                  {photo.location && (
                    <span className="text-[11px] font-mono tracking-widest text-[#d4af37] uppercase block mb-1">
                      {photo.location}
                    </span>
                  )}
                  <h3 className="font-serif-custom text-xl sm:text-2xl font-bold text-[#f7f4ed]">
                    {photo.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#afc2a7] mt-1 line-clamp-2">
                    {photo.caption}
                  </p>
                </div>

                <button
                  onClick={() => setLightboxPhoto(photo)}
                  className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-[#0c1410]/80 backdrop-blur-md border border-[#d4af37]/45 text-[#eed88f] text-xs font-medium flex items-center gap-1.5 hover:bg-[#d4af37]/25 transition-all cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Full Screen</span>
                </button>
              </div>
            </div>
          ))}

          {/* Nav Arrow buttons */}
          <button
            onClick={handlePrev}
            aria-label="Previous Photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/40 text-[#eed88f] flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/40 text-[#eed88f] flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Gallery Controls Bar */}
        <div className="p-3 bg-[#14261e] border-t border-[#d4af37]/25 flex items-center justify-between text-xs text-[#eed88f]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-2.5 py-1 rounded-md bg-[#1a3328] border border-[#d4af37]/35 flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Slideshow' : 'Auto Play'}</span>
            </button>
            <span className="text-[#afc2a7]">
              Photo {currentIndex + 1} of {photos.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToPhoto(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === currentIndex ? 'w-6 bg-[#eed88f]' : 'w-2 bg-[#d4af37]/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Thumbnails Strip */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-3 overflow-x-auto pb-4 pt-1 snap-x scrollbar-none"
        >
          {photos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => scrollToPhoto(idx)}
              className={`relative shrink-0 w-32 sm:w-44 aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                idx === currentIndex
                  ? 'border-[#eed88f] scale-105 shadow-lg shadow-[#d4af37]/20'
                  : 'border-[#d4af37]/20 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20" />
              <span className="absolute bottom-1 left-2 text-[10px] text-white font-medium truncate max-w-[90%]">
                {photo.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white rounded-full bg-white/10"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={lightboxPhoto.src}
              alt={lightboxPhoto.title}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg border border-[#d4af37]/40 shadow-2xl"
              referrerPolicy="no-referrer"
            />

            <div className="mt-4 text-center max-w-xl text-[#f7f4ed]">
              <h3 className="font-serif-custom text-xl font-bold text-[#eed88f]">
                {lightboxPhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#afc2a7] mt-1">
                {lightboxPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
