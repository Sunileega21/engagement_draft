export interface InvitationConfig {
  groomName: string;
  groomSurname: string;
  brideName: string;
  brideSurname: string;
  parentsGroom: string;
  parentsBride: string;
  engagementDate: string; // ISO string e.g. 2026-10-24T18:00:00
  displayDate: string;
  displayTime: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl: string;
  mapCoordinates: { lat: number; lng: number };
  dressCode: string;
  googleCalendarUrl: string;
  contactPhone: string;
  googleSheetsWebhookUrl?: string;
}

export interface RSVP {
  id: string;
  name: string;
  phone?: string;
  guestCount: number;
  attendance: 'attending' | 'not_attending';
  dietary?: string;
  message?: string;
  createdAt: string;
}

export interface RSVPStats {
  totalSubmissions: number;
  attendingFamilies: number;
  totalGuestsAttending: number;
  notAttendingCount: number;
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  iconName: string;
  tag?: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  location?: string;
}
