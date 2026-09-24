import React, { useState } from 'react';
import { X, Save, Settings2, Sparkles, Check, RefreshCw } from 'lucide-react';
import { InvitationConfig } from '../types';

interface CustomizeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: InvitationConfig;
  onSave: (updated: InvitationConfig) => void;
}

export const CustomizeDrawer: React.FC<CustomizeDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onSave
}) => {
  const [formData, setFormData] = useState<InvitationConfig>(config);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        onSave(formData);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 1200);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-lg bg-[#0c1611] border-l border-[#d4af37]/35 h-full flex flex-col shadow-2xl animate-slideLeft">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#d4af37]/25 flex items-center justify-between bg-[#122119]">
          <div className="flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-[#eed88f]" />
            <div>
              <h3 className="font-serif-custom text-lg font-bold text-[#f7f4ed]">
                Customize Celebration Details
              </h3>
              <p className="text-[11px] text-[#afc2a7]">
                Personalize couple names, date, venue, &amp; dress code
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#afc2a7] hover:text-white hover:bg-[#1a3328] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 text-left text-xs">
          {/* Couple Names */}
          <div className="p-3.5 rounded-xl bg-[#14261e] border border-[#d4af37]/25 space-y-3 shadow-sm">
            <span className="text-xs uppercase font-semibold text-[#eed88f] block tracking-wider">
              Couple Names
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#afc2a7] mb-1 font-medium">Groom First Name</label>
                <input
                  type="text"
                  value={formData.groomName}
                  onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0c1611] border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#eed88f]"
                />
              </div>
              <div>
                <label className="block text-[#afc2a7] mb-1 font-medium">Groom Surname</label>
                <input
                  type="text"
                  value={formData.groomSurname}
                  onChange={(e) => setFormData({ ...formData, groomSurname: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0c1611] border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#eed88f]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#afc2a7] mb-1 font-medium">Bride First Name</label>
                <input
                  type="text"
                  value={formData.brideName}
                  onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0c1611] border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#eed88f]"
                />
              </div>
              <div>
                <label className="block text-[#afc2a7] mb-1 font-medium">Bride Surname</label>
                <input
                  type="text"
                  value={formData.brideSurname}
                  onChange={(e) => setFormData({ ...formData, brideSurname: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0c1611] border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#eed88f]"
                />
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="p-3.5 rounded-xl bg-[#14261e] border border-[#d4af37]/25 space-y-3 shadow-sm">
            <span className="text-xs uppercase font-semibold text-[#eed88f] block tracking-wider">
              Engagement Date &amp; Countdown
            </span>

            <div>
              <label className="block text-[#afc2a7] mb-1 font-medium">ISO Countdown Date/Time</label>
              <input
                type="datetime-local"
                value={formData.engagementDate.slice(0, 16)}
                onChange={(e) => setFormData({ ...formData, engagementDate: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#0c1611] border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#eed88f]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#afc2a7] mb-1 font-medium">Display Date Text</label>
                <input
                  type="text"
                  value={formData.displayDate}
                  onChange={(e) => setFormData({ ...formData, displayDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0c1611] border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#eed88f]"
                />
              </div>
              <div>
                <label className="block text-[#afc2a7] mb-1 font-medium">Display Time Text</label>
                <input
                  type="text"
                  value={formData.displayTime}
                  onChange={(e) => setFormData({ ...formData, displayTime: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0c1611] border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#eed88f]"
                />
              </div>
            </div>
          </div>

          {/* Venue & Location */}
          <div className="p-3.5 rounded-xl bg-[#14261e] border border-[#d4af37]/25 space-y-3 shadow-sm">
            <span className="text-xs uppercase font-semibold text-[#eed88f] block tracking-wider">
              Venue &amp; Location
            </span>

            <div>
              <label className="block text-[#afc2a7] mb-1 font-medium">Venue Name</label>
              <input
                type="text"
                value={formData.venueName}
                onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#0c1611] border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#eed88f]"
              />
            </div>

            <div>
              <label className="block text-[#afc2a7] mb-1 font-medium">Full Address</label>
              <textarea
                rows={2}
                value={formData.venueAddress}
                onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#0c1611] border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#eed88f]"
              />
            </div>

            <div>
              <label className="block text-[#afc2a7] mb-1 font-medium">Dress Code Advice</label>
              <input
                type="text"
                value={formData.dressCode}
                onChange={(e) => setFormData({ ...formData, dressCode: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#0c1611] border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#eed88f]"
              />
            </div>

            <div>
              <label className="block text-[#afc2a7] mb-1 font-medium">Host WhatsApp Phone (For RSVPs)</label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#0c1611] border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#eed88f]"
              />
            </div>
          </div>

          {/* Parents' Names */}
          <div className="p-3.5 rounded-xl bg-[#14261e] border border-[#d4af37]/25 space-y-3 shadow-sm">
            <span className="text-xs uppercase font-semibold text-[#eed88f] block tracking-wider">
              Family &amp; Parents Invocation
            </span>

            <div>
              <label className="block text-[#afc2a7] mb-1 font-medium">Groom's Parents</label>
              <input
                type="text"
                value={formData.parentsGroom}
                onChange={(e) => setFormData({ ...formData, parentsGroom: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#0c1611] border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#eed88f]"
              />
            </div>

            <div>
              <label className="block text-[#afc2a7] mb-1 font-medium">Bride's Parents</label>
              <input
                type="text"
                value={formData.parentsBride}
                onChange={(e) => setFormData({ ...formData, parentsBride: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#0c1611] border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#eed88f]"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-2 sticky bottom-0 bg-[#0c1611] py-3">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#eed88f] to-[#d4af37] text-black font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving Updates...</span>
                </>
              ) : success ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved Successfully!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Invitation Changes</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
