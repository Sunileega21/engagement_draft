import React, { useState, useEffect } from 'react';
import { X, Download, Users, CheckCircle2, XCircle, Search, Trash2, Sheet, RefreshCw, AlertCircle } from 'lucide-react';
import { RSVP, RSVPStats, InvitationConfig } from '../types';

interface RsvpAdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: InvitationConfig;
  onUpdateConfig: (newConfig: Partial<InvitationConfig>) => void;
}

export const RsvpAdminDrawer: React.FC<RsvpAdminDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig
}) => {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [stats, setStats] = useState<RSVPStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'attending' | 'not_attending'>('all');
  const [sheetsUrl, setSheetsUrl] = useState(config.googleSheetsWebhookUrl || '');
  const [sheetsSaved, setSheetsSaved] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/rsvps');
      if (res.ok) {
        const data = await res.json();
        setRsvps(data.rsvps || []);
        setStats(data.stats || null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchList();
    }
  }, [isOpen]);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Remove RSVP for "${name}"?`)) return;

    try {
      const res = await fetch(`/api/rsvps/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchList();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveSheetsWebhook = async () => {
    try {
      const res = await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleSheetsWebhookUrl: sheetsUrl })
      });
      if (res.ok) {
        onUpdateConfig({ googleSheetsWebhookUrl: sheetsUrl });
        setSheetsSaved(true);
        setTimeout(() => setSheetsSaved(false), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!isOpen) return null;

  const filteredRsvps = rsvps.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.phone && r.phone.includes(search)) ||
      (r.message && r.message.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;
    if (filter === 'attending') return r.attendance === 'attending';
    if (filter === 'not_attending') return r.attendance === 'not_attending';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-2xl bg-[#0c1611] border-l border-[#d4af37]/35 h-full flex flex-col shadow-2xl animate-slideLeft">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#d4af37]/25 flex items-center justify-between bg-[#122119]">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">
              Host Management
            </span>
            <h3 className="font-serif-custom text-xl font-bold text-[#f7f4ed]">
              Guest RSVP Database
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/api/rsvps/export.csv"
              download="Sunil_Engagement_RSVPs.csv"
              className="px-3 py-1.5 rounded-lg bg-[#d4af37] text-black font-bold text-xs flex items-center gap-1.5 hover:bg-[#eed88f] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#afc2a7] hover:text-white hover:bg-[#1a3328] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="p-4 bg-[#0e1a14] border-b border-[#d4af37]/20 grid grid-cols-3 gap-3 text-center">
          <div className="p-2.5 rounded-lg bg-[#14261e] border border-[#d4af37]/25 shadow-sm">
            <span className="text-[10px] text-[#afc2a7] uppercase block font-medium">
              Attending Guests
            </span>
            <span className="text-xl font-bold text-[#eed88f] font-mono">
              {stats?.totalGuestsAttending || 0}
            </span>
            <span className="text-[10px] text-[#afc2a7]/70 block">
              ({stats?.attendingFamilies || 0} families)
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#14261e] border border-[#d4af37]/25 shadow-sm">
            <span className="text-[10px] text-[#afc2a7] uppercase block font-medium">
              Not Attending
            </span>
            <span className="text-xl font-bold text-red-400 font-mono">
              {stats?.notAttendingCount || 0}
            </span>
            <span className="text-[10px] text-[#afc2a7]/70 block">Regrets</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#14261e] border border-[#d4af37]/25 shadow-sm">
            <span className="text-[10px] text-[#afc2a7] uppercase block font-medium">
              Total Responses
            </span>
            <span className="text-xl font-bold text-[#f7f4ed] font-mono">
              {stats?.totalSubmissions || 0}
            </span>
            <span className="text-[10px] text-[#afc2a7]/70 block">Submissions</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-[#d4af37]/20 flex flex-wrap gap-2 items-center justify-between">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="w-4 h-4 text-[#afc2a7]/60 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guest name, phone, or wishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#122119] border border-[#d4af37]/30 text-xs text-white placeholder-[#6b8577] focus:outline-none focus:border-[#eed88f]"
            />
          </div>

          <div className="flex items-center gap-1 bg-[#122119] p-1 rounded-lg border border-[#d4af37]/25 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-[#d4af37] text-black font-bold' : 'text-[#afc2a7]'
              }`}
            >
              All ({rsvps.length})
            </button>
            <button
              onClick={() => setFilter('attending')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filter === 'attending' ? 'bg-[#d4af37] text-black font-bold' : 'text-[#afc2a7]'
              }`}
            >
              Attending ({rsvps.filter(r => r.attendance === 'attending').length})
            </button>
            <button
              onClick={() => setFilter('not_attending')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filter === 'not_attending' ? 'bg-[#d4af37] text-black font-bold' : 'text-[#afc2a7]'
              }`}
            >
              Regrets ({rsvps.filter(r => r.attendance === 'not_attending').length})
            </button>
          </div>
        </div>

        {/* Guest List Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="py-12 text-center text-xs text-[#eed88f] flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Loading RSVP database...</span>
            </div>
          ) : filteredRsvps.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#afc2a7]/70">
              No guest responses match the current filter.
            </div>
          ) : (
            filteredRsvps.map((rsvp) => (
              <div
                key={rsvp.id}
                className="p-3.5 rounded-xl bg-[#14261e] border border-[#d4af37]/25 hover:border-[#d4af37]/45 transition-all text-left shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm text-[#f7f4ed]">
                        {rsvp.name}
                      </h4>
                      {rsvp.attendance === 'attending' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Attending ({rsvp.guestCount} guests)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-300 bg-red-950/60 px-2 py-0.5 rounded-full border border-red-500/40">
                          <XCircle className="w-3 h-3" />
                          <span>Regretfully Unable</span>
                        </span>
                      )}
                    </div>

                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#afc2a7]">
                      {rsvp.phone && (
                        <span>Phone: <strong className="text-[#f7f4ed]">{rsvp.phone}</strong></span>
                      )}
                      {rsvp.dietary && (
                        <span>Diet: <strong className="text-[#eed88f]">{rsvp.dietary}</strong></span>
                      )}
                      <span className="text-[10px] text-[#afc2a7]/60">
                        {new Date(rsvp.createdAt).toLocaleString()}
                      </span>
                    </div>

                    {rsvp.message && (
                      <p className="mt-2 text-xs text-[#f7f4ed] italic bg-[#0c1611] p-2 rounded-lg border border-[#d4af37]/15">
                        "{rsvp.message}"
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(rsvp.id, rsvp.name)}
                    className="p-1.5 text-[#afc2a7]/60 hover:text-red-400 hover:bg-red-950/50 rounded-lg transition-colors cursor-pointer"
                    title="Delete RSVP"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Google Sheets Sync integration footer */}
        <div className="p-4 bg-[#122119] border-t border-[#d4af37]/25 text-xs">
          <div className="flex items-center gap-1.5 text-[#eed88f] font-medium mb-1.5">
            <Sheet className="w-4 h-4" />
            <span>Google Sheets Auto-Sync Webhook (Optional)</span>
          </div>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="Paste Google Apps Script / Sheet webhook URL"
              value={sheetsUrl}
              onChange={(e) => setSheetsUrl(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg bg-[#0c1611] border border-[#d4af37]/30 text-xs text-white placeholder-[#6b8577] focus:outline-none focus:border-[#eed88f]"
            />
            <button
              onClick={handleSaveSheetsWebhook}
              className="px-3 py-1.5 rounded-lg bg-[#1a3328] border border-[#d4af37]/35 text-[#eed88f] font-medium hover:bg-[#234537] cursor-pointer"
            >
              {sheetsSaved ? 'Saved!' : 'Save'}
            </button>
          </div>
          <p className="text-[10px] text-[#afc2a7]/70 mt-1">
            Every guest RSVP is stored locally in the database and automatically exported to your Google Sheet if provided.
          </p>
        </div>

      </div>
    </div>
  );
};
