import { wedding, type WeddingEvent } from '../config/wedding';

/** 2026-11-16T06:00:00+05:30 → 20261116T003000Z (UTC, Google/ICS format). */
export function toUtcStamp(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function eventTitle(event: WeddingEvent): string {
  const names = `${wedding.bride.shortName.en} & ${wedding.groom.shortName.en}`;
  return `${names} — ${event.title.en}`;
}

function eventLocation(): string {
  return [wedding.venue.name.en, wedding.venue.subtitle.en, ...wedding.venue.addressLines.en].join(', ');
}

function eventDescription(event: WeddingEvent): string {
  const lines = [
    `${event.title.en} of ${wedding.bride.fullName.en} & ${wedding.groom.fullName.en}`,
    `${event.dayLabel.en}, ${event.timeLabel.en} (IST)`,
    `Venue: ${eventLocation()}`,
    `Map: ${wedding.venue.mapsUrl}`,
  ];
  return lines.join('\n');
}

/** Google Calendar "add event" link, generated from the event config. */
export function googleCalendarUrl(event: WeddingEvent): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: eventTitle(event),
    dates: `${toUtcStamp(event.start)}/${toUtcStamp(event.end)}`,
    details: eventDescription(event),
    location: eventLocation(),
    ctz: wedding.timeZone,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const escapeIcs = (s: string) => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\;');

/** RFC 5545 calendar file for Apple Calendar / Outlook. */
export function buildIcs(event: WeddingEvent): string {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Vignesh & Kreethika Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}-${toUtcStamp(event.start)}@vk-wedding`,
    `DTSTAMP:${toUtcStamp(new Date().toISOString())}`,
    `DTSTART:${toUtcStamp(event.start)}`,
    `DTEND:${toUtcStamp(event.end)}`,
    `SUMMARY:${escapeIcs(eventTitle(event))}`,
    `DESCRIPTION:${escapeIcs(eventDescription(event))}`,
    `LOCATION:${escapeIcs(eventLocation())}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT3H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeIcs(eventTitle(event))}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadIcs(event: WeddingEvent): void {
  const blob = new Blob([buildIcs(event)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${event.id}-${wedding.groom.shortName.en}-${wedding.bride.shortName.en}.ics`.toLowerCase();
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/** Editorial date parts in India time, regardless of the guest's timezone. */
export function dateParts(iso: string, locale: 'en' | 'ta') {
  const d = new Date(iso);
  const tz = wedding.timeZone;
  const fmt = (o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale === 'ta' ? 'ta-IN' : 'en-IN', { timeZone: tz, ...o }).format(d);
  return {
    day: new Intl.DateTimeFormat('en-IN', { timeZone: tz, day: 'numeric' }).format(d),
    month: fmt({ month: 'long' }),
    year: new Intl.DateTimeFormat('en-IN', { timeZone: tz, year: 'numeric' }).format(d),
  };
}
