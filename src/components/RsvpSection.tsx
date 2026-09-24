import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Send, CheckCircle2, MessageSquare, Users, ShieldCheck, Share2, AlertCircle } from 'lucide-react';
import { InvitationConfig, RSVP, RSVPStats } from '../types';

interface RsvpSectionProps {
  config: InvitationConfig;
  onOpenAdmin: () => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ config, onOpenAdmin }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guestCount: 2,
    attendance: 'attending' as 'attending' | 'not_attending',
    dietary: 'Vegetarian',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionSuccessMsg, setSubmissionSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  // Stored RSVPs & live wishes list
  const [recentRsvps, setRecentRsvps] = useState<RSVP[]>([]);
  const [stats, setStats] = useState<RSVPStats | null>(null);

  // Fetch RSVPs from backend database
  const fetchRSVPs = async () => {
    try {
      const res = await fetch('/api/rsvps');
      if (res.ok) {
        const data = await res.json();
        setRecentRsvps(data.rsvps || []);
        setStats(data.stats || null);
      }
    } catch (e) {
      console.warn('Could not fetch RSVPs', e);
    }
  };

  useEffect(() => {
    fetchRSVPs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit RSVP');
      }

      setSubmitted(true);
      setSubmissionSuccessMsg(data.message || 'Thank you for your RSVP!');

      if (formData.attendance === 'attending') {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#d4af37', '#f3e5ab', '#25d366', '#ffffff']
        });
      }

      // Refresh guestbook
      fetchRSVPs();
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while saving your RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp quick RSVP forward
  const handleWhatsAppSend = () => {
    const isAttending = formData.attendance === 'attending';
    const msg = encodeURIComponent(
      `Hi ${config.groomName} & ${config.brideName}!\n\n` +
      `Here is my RSVP for your Engagement Ceremony:\n` +
      `👤 *Name:* ${formData.name}\n` +
      `✨ *Status:* ${isAttending ? 'Joyfully Attending! 🎉' : 'Regretfully Unable to Attend'}\n` +
      (isAttending ? `👥 *Number of Guests:* ${formData.guestCount}\n` : '') +
      (isAttending ? `🥗 *Dietary:* ${formData.dietary}\n` : '') +
      (formData.message ? `💌 *Wishes:* "${formData.message}"\n` : '') +
      `\nCan't wait for your special day! ❤️`
    );

    const cleanPhone = config.contactPhone.replace(/[^0-9]/g, '');
    window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${msg}`, '_blank');
  };

  return (
    <section id="rsvp" className="py-16 px-4 md:px-8 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Kindly Respond</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <h2 className="font-display-custom text-2xl sm:text-4xl font-bold tracking-tight text-[#f7f4ed]">
          RSVP for the Celebration
        </h2>

        <p className="text-sm text-[#afc2a7] mt-2 max-w-md mx-auto">
          Please let us know if you will be attending by <strong>October 15, 2026</strong> so we can reserve the finest hospitality for you.
        </p>

        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
      </div>

      {/* Main Form Box */}
      <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#d4af37]/45 via-[#1b3d2b] to-[#0f1d16] shadow-2xl mb-12">
        <div className="bg-[#122119] rounded-[22px] p-6 sm:p-8 border border-[#d4af37]/35 text-left">
          
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border-2 border-[#d4af37] flex items-center justify-center mx-auto text-[#eed88f]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="font-serif-custom text-2xl font-bold text-[#f7f4ed]">
                {formData.attendance === 'attending' ? 'Celebration Confirmed!' : 'Thank You for Letting Us Know'}
              </h3>

              <p className="text-sm text-[#afc2a7] max-w-md mx-auto">
                {submissionSuccessMsg}
              </p>

              {formData.attendance === 'attending' && (
                <div className="p-4 rounded-xl bg-[#162d22] border border-[#d4af37]/30 max-w-sm mx-auto text-xs text-[#f7f4ed] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#afc2a7]">Guest Name:</span>
                    <span className="font-semibold text-[#f7f4ed]">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#afc2a7]">Guests Count:</span>
                    <span className="font-semibold text-[#eed88f]">{formData.guestCount} Person(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#afc2a7]">Dietary:</span>
                    <span className="font-medium text-[#f7f4ed]">{formData.dietary}</span>
                  </div>
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleWhatsAppSend}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25d366] text-black font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#22bf5b] transition-all shadow-md cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Send Direct WhatsApp Note to Sunil</span>
                </button>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      phone: '',
                      guestCount: 2,
                      attendance: 'attending',
                      dietary: 'Vegetarian',
                      message: ''
                    });
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#1a3328] text-xs text-[#afc2a7] hover:text-white transition-colors cursor-pointer"
                >
                  Submit Another RSVP
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Attendance Choice Buttons */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                  Will You Grace Our Engagement? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendance: 'attending' })}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 text-left transition-all cursor-pointer ${
                      formData.attendance === 'attending'
                        ? 'bg-gradient-to-r from-[#d4af37]/25 to-[#1c3a2a] border-[#eed88f] text-[#f7f4ed] shadow-md shadow-[#d4af37]/15 ring-1 ring-[#eed88f]'
                        : 'bg-[#0e1a14] border-[#d4af37]/20 text-[#afc2a7] hover:border-[#d4af37]/40'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      formData.attendance === 'attending' ? 'border-[#eed88f] bg-[#eed88f]' : 'border-[#d4af37]/40'
                    }`}>
                      {formData.attendance === 'attending' && <div className="w-1.5 h-1.5 rounded-full bg-[#0e1a14]" />}
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-[#f7f4ed]">
                        Joyfully Attending 🎉
                      </span>
                      <span className="text-[10px] text-[#eed88f]">
                        Will be there to celebrate with you
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendance: 'not_attending' })}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 text-left transition-all cursor-pointer ${
                      formData.attendance === 'not_attending'
                        ? 'bg-gradient-to-r from-red-900/40 to-[#1c3a2a] border-red-400 text-[#f7f4ed] shadow-md ring-1 ring-red-400'
                        : 'bg-[#0e1a14] border-[#d4af37]/20 text-[#afc2a7] hover:border-[#d4af37]/40'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      formData.attendance === 'not_attending' ? 'border-red-400 bg-red-400' : 'border-[#d4af37]/40'
                    }`}>
                      {formData.attendance === 'not_attending' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-[#f7f4ed]">
                        Regretfully Decline
                      </span>
                      <span className="text-[10px] text-[#afc2a7]">
                        Sending warm blessings from afar
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Guest Name & WhatsApp Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="rsvp-name" className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    required
                    placeholder="e.g. Suresh Reddy & Family"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#0c1611] border border-[#d4af37]/35 text-xs text-[#f7f4ed] placeholder-[#6b8577] focus:outline-none focus:border-[#eed88f] focus:ring-1 focus:ring-[#eed88f]"
                  />
                </div>

                <div>
                  <label htmlFor="rsvp-phone" className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-1.5">
                    WhatsApp / Phone Number
                  </label>
                  <input
                    id="rsvp-phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#0c1611] border border-[#d4af37]/35 text-xs text-[#f7f4ed] placeholder-[#6b8577] focus:outline-none focus:border-[#eed88f] focus:ring-1 focus:ring-[#eed88f]"
                  />
                </div>
              </div>

              {/* Guest count & Dietary (only if attending) */}
              {formData.attendance === 'attending' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#0e1a14] border border-[#d4af37]/25">
                  <div>
                    <label htmlFor="rsvp-guests" className="block text-xs uppercase tracking-wider text-[#eed88f] font-semibold mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Number of Guests Attending *</span>
                    </label>
                    <select
                      id="rsvp-guests"
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                      className="w-full h-11 px-3 rounded-xl bg-[#162a20] border border-[#d4af37]/35 text-xs text-[#f7f4ed] focus:outline-none focus:border-[#eed88f]"
                    >
                      <option value={1}>1 Guest (Just Me)</option>
                      <option value={2}>2 Guests (Couple)</option>
                      <option value={3}>3 Guests (Family)</option>
                      <option value={4}>4 Guests (Family)</option>
                      <option value={5}>5 Guests (Family)</option>
                      <option value={6}>6+ Guests</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="rsvp-diet" className="block text-xs uppercase tracking-wider text-[#eed88f] font-semibold mb-1.5">
                      Dietary Preference
                    </label>
                    <select
                      id="rsvp-diet"
                      value={formData.dietary}
                      onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                      className="w-full h-11 px-3 rounded-xl bg-[#162a20] border border-[#d4af37]/35 text-xs text-[#f7f4ed] focus:outline-none focus:border-[#eed88f]"
                    >
                      <option value="Vegetarian">Pure Vegetarian</option>
                      <option value="Non-Vegetarian">Non-Vegetarian / Multi-Cuisine</option>
                      <option value="Jain Food">Jain Vegetarian</option>
                      <option value="Vegan">Vegan</option>
                      <option value="No restrictions">No Restrictions</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Message / Blessings */}
              <div>
                <label htmlFor="rsvp-msg" className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Blessings &amp; Wishes for the Couple</span>
                </label>
                <textarea
                  id="rsvp-msg"
                  rows={3}
                  placeholder="Share a heartfelt message, blessings, or your favorite memory with Sunil & Ananya..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#0c1611] border border-[#d4af37]/35 text-xs text-[#f7f4ed] placeholder-[#6b8577] focus:outline-none focus:border-[#eed88f] focus:ring-1 focus:ring-[#eed88f]"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#eed88f] to-[#d4af37] text-black font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#d4af37]/25 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Recording Your Response...' : 'Confirm RSVP'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#afc2a7] pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#eed88f]" />
                  Saved securely to engagement database
                </span>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="text-[#eed88f] hover:underline cursor-pointer"
                >
                  Family Admin View
                </button>
              </div>
            </form>
          )}

        </div>
      </div>

      {/* Guest Wishes Wall / Guestbook */}
      <div className="text-left space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#d4af37] fill-current" />
            <h3 className="font-serif-custom text-xl font-bold text-[#eed88f]">
              Wishes &amp; Blessings Wall
            </h3>
          </div>
          {stats && (
            <span className="text-xs text-[#afc2a7]">
              {stats.attendingFamilies} families attending ({stats.totalGuestsAttending} guests)
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentRsvps
            .filter((r) => r.message && r.message.trim().length > 0)
            .slice(0, 4)
            .map((r) => (
              <div
                key={r.id}
                className="p-4 rounded-xl bg-[#14261e] border border-[#d4af37]/25 flex flex-col justify-between shadow-sm"
              >
                <p className="font-serif-custom text-sm text-[#f7f4ed] italic leading-relaxed">
                  "{r.message}"
                </p>
                <div className="mt-3 flex items-center justify-between text-xs border-t border-[#d4af37]/20 pt-2">
                  <span className="font-semibold text-[#eed88f]">{r.name}</span>
                  <span className="text-[10px] text-[#afc2a7]">
                    {r.attendance === 'attending' ? 'Attending' : 'Well Wisher'}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
