import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Persistent data directory
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const RSVP_FILE = path.join(DATA_DIR, 'rsvps.json');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');

// Default celebration config
const DEFAULT_CONFIG = {
  groomName: 'Sunil',
  groomSurname: 'Eaga',
  brideName: 'Sadhana',
  brideSurname: 'Dasu',
  parentsGroom: 'Sri Bala Krishna Murthy & Smt. Kumari',
  parentsBride: 'Sri Koteswarudu & Smt. Neeraja',
  engagementDate: '2026-10-25T18:00:00',
  displayDate: 'Sunday, 25th October 2026',
  displayTime: '6:00 PM onwards',
  venueName: 'The Royal Palace Courtyard & Ballroom',
  venueAddress: 'Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033',
  googleMapsUrl: 'https://maps.google.com/?q=Jubilee+Hills+Hyderabad',
  mapCoordinates: { lat: 17.4319, lng: 78.4073 },
  dressCode: 'Indian Traditional Festive / Indo-Western Royalty (Ivory, Gold & Jewel Tones)',
  googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Sunil+%26+Sadhana+Engagement+Ceremony&dates=20261025T123000Z/20261025T173000Z&details=With+the+blessings+of+our+families,+we+invite+you+to+celebrate+the+beginning+of+our+forever!&location=The+Royal+Palace+Courtyard,+Jubilee+Hills,+Hyderabad',
  contactPhone: '+91 9741275595',
  googleSheetsWebhookUrl: '', // Optional Google Apps Script webhook
};

// Initial sample RSVPs to demonstrate rich guestbook & responses if empty
const INITIAL_RSVPS = [
  {
    id: 'rsvp_sample_1',
    name: 'Rajesh & Kavitha Varma',
    phone: '+91 98490 12345',
    guestCount: 2,
    attendance: 'attending',
    dietary: 'Vegetarian',
    message: 'Heartiest congratulations Sunil and Ananya! So thrilled to celebrate this milestone with both of you. Wishing you a lifetime of love and joy!',
    createdAt: '2026-09-22T10:15:00.000Z',
  },
  {
    id: 'rsvp_sample_2',
    name: 'Dr. Srinivas & Family',
    phone: '+91 94400 98765',
    guestCount: 3,
    attendance: 'attending',
    dietary: 'Vegetarian',
    message: 'May God bless you with abundant happiness and harmony on your engagement day. Looking forward to the grand evening!',
    createdAt: '2026-09-23T14:30:00.000Z',
  },
  {
    id: 'rsvp_sample_3',
    name: 'Vikram & Swathi Mehta',
    phone: '+91 99887 76655',
    guestCount: 2,
    attendance: 'attending',
    dietary: 'No restrictions',
    message: 'Can\'t wait for the ring exchange ceremony and dancing the night away! Lots of love from the Mehta family.',
    createdAt: '2026-09-23T18:45:00.000Z',
  }
];

// Helper to load RSVPs
function getRSVPs(): any[] {
  try {
    if (fs.existsSync(RSVP_FILE)) {
      const data = fs.readFileSync(RSVP_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading RSVPs file:', err);
  }
  return INITIAL_RSVPS;
}

// Helper to save RSVPs
function saveRSVPs(rsvps: any[]) {
  try {
    fs.writeFileSync(RSVP_FILE, JSON.stringify(rsvps, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving RSVPs file:', err);
  }
}

// Helper to load Config
function getConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
      return { ...DEFAULT_CONFIG, ...JSON.parse(data) };
    }
  } catch (err) {
    console.error('Error reading config file:', err);
  }
  return DEFAULT_CONFIG;
}

function saveConfig(config: any) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving config file:', err);
  }
}

// Ensure initial files exist
if (!fs.existsSync(RSVP_FILE)) {
  saveRSVPs(INITIAL_RSVPS);
}
if (!fs.existsSync(CONFIG_FILE)) {
  saveConfig(DEFAULT_CONFIG);
}

// ---------------- API ROUTES ----------------

// Get configuration
app.get('/api/config', (_req, res) => {
  res.json(getConfig());
});

// Update configuration
app.put('/api/config', (req, res) => {
  const current = getConfig();
  const updated = { ...current, ...req.body };
  saveConfig(updated);
  res.json({ success: true, config: updated });
});

// Get all RSVPs + summary statistics
app.get('/api/rsvps', (_req, res) => {
  const rsvps = getRSVPs();
  
  let attendingCount = 0;
  let totalAttendingGuests = 0;
  let notAttendingCount = 0;

  for (const r of rsvps) {
    if (r.attendance === 'attending') {
      attendingCount += 1;
      totalAttendingGuests += Number(r.guestCount) || 1;
    } else {
      notAttendingCount += 1;
    }
  }

  res.json({
    rsvps,
    stats: {
      totalSubmissions: rsvps.length,
      attendingFamilies: attendingCount,
      totalGuestsAttending: totalAttendingGuests,
      notAttendingCount,
    }
  });
});

// Submit a new RSVP
app.post('/api/rsvps', async (req, res) => {
  const { name, phone, guestCount, attendance, message, dietary } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Please provide your full name.' });
  }

  if (!attendance || (attendance !== 'attending' && attendance !== 'not_attending')) {
    return res.status(400).json({ error: 'Please choose whether you will be attending.' });
  }

  const parsedGuests = attendance === 'attending' 
    ? Math.max(1, Math.min(10, parseInt(guestCount, 10) || 1))
    : 0;

  const newRsvp = {
    id: 'rsvp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    name: name.trim(),
    phone: phone ? String(phone).trim() : '',
    guestCount: parsedGuests,
    attendance,
    dietary: dietary ? String(dietary).trim() : 'Vegetarian',
    message: message ? String(message).trim() : '',
    createdAt: new Date().toISOString(),
  };

  const rsvps = getRSVPs();
  rsvps.unshift(newRsvp);
  saveRSVPs(rsvps);

  // Optional: Forward to Google Sheets webhook if configured
  const config = getConfig();
  if (config.googleSheetsWebhookUrl && config.googleSheetsWebhookUrl.startsWith('http')) {
    fetch(config.googleSheetsWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRsvp)
    }).catch(err => console.error('Failed to sync with Google Sheet webhook:', err));
  }

  res.status(201).json({
    success: true,
    message: attendance === 'attending'
      ? `Thank you, ${newRsvp.name}! We can't wait to celebrate with you!`
      : `Thank you for letting us know, ${newRsvp.name}. We will miss you!`,
    rsvp: newRsvp
  });
});

// Delete an RSVP (admin)
app.delete('/api/rsvps/:id', (req, res) => {
  const { id } = req.params;
  const rsvps = getRSVPs();
  const filtered = rsvps.filter(r => r.id !== id);
  
  if (filtered.length === rsvps.length) {
    return res.status(404).json({ error: 'RSVP not found' });
  }

  saveRSVPs(filtered);
  res.json({ success: true, message: 'RSVP deleted successfully' });
});

// Export CSV for Excel / Google Sheets
app.get('/api/rsvps/export.csv', (_req, res) => {
  const rsvps = getRSVPs();
  
  let csv = '\uFEFF'; // UTF-8 BOM
  csv += 'ID,Date Submitted,Guest Name,Phone / WhatsApp,Status,Guests Count,Dietary Preference,Wishes / Message\n';

  for (const r of rsvps) {
    const cleanDate = r.createdAt ? new Date(r.createdAt).toLocaleString() : '';
    const cleanName = `"${(r.name || '').replace(/"/g, '""')}"`;
    const cleanPhone = `"${(r.phone || '').replace(/"/g, '""')}"`;
    const cleanStatus = r.attendance === 'attending' ? 'Attending' : 'Not Attending';
    const cleanDiet = `"${(r.dietary || '').replace(/"/g, '""')}"`;
    const cleanMsg = `"${(r.message || '').replace(/"/g, '""')}"`;

    csv += `${r.id},${cleanDate},${cleanName},${cleanPhone},${cleanStatus},${r.guestCount},${cleanDiet},${cleanMsg}\n`;
  }

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="Sunil_Engagement_RSVPs.csv"');
  res.send(csv);
});

// ---------------- VITE MIDDLEWARE / PRODUCTION STATIC ----------------

async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Celebration server listening on http://localhost:${PORT}`);
  });
}

setupServer();
