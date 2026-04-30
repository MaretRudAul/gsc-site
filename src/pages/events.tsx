import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

// ─────────────────────────────────────────────────────────────────────────────
// IMAGES
// HOW TO UPDATE: change BANNER_SRC to any publicly accessible image URL.
// ─────────────────────────────────────────────────────────────────────────────
const BANNER_SRC =
  'https://cdn.vanderbilt.edu/t2-studentorg/studentorg-prd/wp-content/uploads/sites/10/2022/10/Vanderbilt-GSC-3.png';


// ─────────────────────────────────────────────────────────────────────────────
// GOOGLE CALENDAR ID
// HOW TO UPDATE: change CALENDAR_ID to id of current Google calendar.
// ─────────────────────────────────────────────────────────────────────────────
const CALENDAR_ID =
  'ajc2ZGhzczIwZHE4Ymg2aG1jNDVpYmxkaGtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ';

// ─────────────────────────────────────────────────────────────────────────────
// UPCOMING EVENTS
//
// HOW TO UPDATE each semester:
//   1. Change or add objects in the `events` array below.
//   2. Move old events into `pastEvents`.
//   3. Run `npm run build` (or just save — hot-reload handles dev).
//
// badgeType options: 'meeting' | 'social' | 'academic'
// ─────────────────────────────────────────────────────────────────────────────
type Event = {
  month: string;   // 3-letter all-caps, e.g. 'APR'
  day: string;     // day number as string
  title: string;
  time: string;
  location: string;
  description: string;
  badgeType: 'meeting' | 'social' | 'academic';
  badge: string;
  rsvpUrl?: string;
};

const events: Event[] = [
  {
    month: 'MAR',
    day: '3',
    title: 'Dinner with Dores',
    time: '6 pm',
    location: 'TBD',
    description: 'Community dinner bringing together grad students and Vanderbilt community members.',
    badge: 'Social',
    badgeType: 'social',
    rsvpUrl: 'https://anchorlink.vanderbilt.edu/organization/GSC',
  },
  {
    month: 'APR',
    day: '7',
    title: 'General Body Meeting + Elections',
    time: '6–7 pm',
    location: 'Alumni Hall 201 (+ Zoom)',
    description:
      'Monthly general body meeting. Spring elections for the 2026–27 executive board.',
    badge: 'Meeting',
    badgeType: 'meeting',
    rsvpUrl: 'https://anchorlink.vanderbilt.edu/organization/GSC',
  },
  {
    month: 'SPR',
    day: '26',
    title: '3 Minute Thesis Competition',
    time: 'TBD',
    location: 'TBD',
    description:
      "Annual competition where grad students present their research in 3 minutes to a general audience. Open to all PhD and research master's students.",
    badge: 'Academic',
    badgeType: 'academic',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAST EVENTS
//
// HOW TO UPDATE: move items from `events` here once they've passed.
// Keep the 5–6 most recent; older history lives in governance-documents.md.
// ─────────────────────────────────────────────────────────────────────────────
const pastEvents = [
  { title: 'De-Stress & Decompress', date: 'Nov 5, 2025',  badge: 'Social',  badgeType: 'social'  as const },
  { title: 'Fall Social',            date: 'Sept 12, 2025', badge: 'Social',  badgeType: 'social'  as const },
  { title: 'General Body Meeting',   date: 'Dec 2, 2025',   badge: 'Meeting', badgeType: 'meeting' as const },
  { title: 'General Body Meeting',   date: 'Nov 4, 2025',   badge: 'Meeting', badgeType: 'meeting' as const },
  { title: 'General Body Meeting',   date: 'Oct 7, 2025',   badge: 'Meeting', badgeType: 'meeting' as const },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: CalendarEmbed
//
// WHY THIS FIX: The original embed used a static URL with no date range, so
// Google Calendar defaulted to its original creation date (2022-23 era).
//
// THE FIX: We compute today's date and 4 months ahead at render time and pass
// them as `dates=YYYYMMDD/YYYYMMDD`. This forces the embed to always open at
// the current date range — no code change needed each semester.
//
// HOW TO UPDATE: No update needed — it's fully automatic.
// If you want to change the view mode, change `mode=AGENDA` to `mode=MONTH`
// or `mode=WEEK` in the src string below.
// ─────────────────────────────────────────────────────────────────────────────
function CalendarEmbed() {
  // Build date strings: today → 4 months ahead (covers a full semester)
  const today = new Date();
  const ahead = new Date(today);
  ahead.setMonth(ahead.getMonth() + 4);

  const fmt = (d: Date) =>
    `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(
      d.getDate()
    ).padStart(2, '0')}`;

  const src = [
    `https://calendar.google.com/calendar/embed`,
    `?src=${encodeURIComponent(CALENDAR_ID)}`,
    `&ctz=America%2FChicago`,          // Nashville / Central time
    `&mode=AGENDA`,                     // cleanest view for a list of events
    `&dates=${fmt(today)}%2F${fmt(ahead)}`, // ← KEY: always anchors to today
    `&showTitle=0`,
    `&showNav=1`,
    `&showDate=1`,
    `&showPrint=0`,
    `&showTabs=0`,
    `&showCalendars=0`,
    `&showTz=1`,
  ].join('');

  return (
    <div className="gsc-calendar-wrap">
      <iframe
        src={src}
        style={{ border: 0, width: '100%', height: 480, borderRadius: 10 }}
        frameBorder="0"
        scrolling="no"
        title="GSC Google Calendar — current semester"
      />
      <p style={{ fontSize: 13, color: 'var(--gsc-text-muted)', marginTop: '0.5rem' }}>
        Can't see the calendar?{' '}
        <a
          href={`https://calendar.google.com/calendar/u/0?cid=${CALENDAR_ID}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Google Calendar →
        </a>
      </p>
    </div>
  );
}

export default function Events(): ReactNode {
  return (
    <Layout title="Events" description="Upcoming GSC events, socials, and general body meetings.">

      {/* Page banner photo */}
      <div className="gsc-page-banner">
        <img src={BANNER_SRC} alt="GSC graduate students" className="gsc-page-banner__img" />
        <div className="gsc-page-banner__overlay" />
        <div className="gsc-page-banner__text">
          <h1>Events</h1>
          <p>All graduate students are welcome — no RSVP required unless noted</p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem', maxWidth: 860 }}>

        {/* Calendar subscribe callout */}
        <div className="gsc-callout">
          <strong>Never miss an event:</strong> Subscribe to the GSC Google Calendar and get
          all meetings and events automatically.{' '}
          <a
            href={`https://calendar.google.com/calendar/u/0?cid=${CALENDAR_ID}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Add to Google Calendar →
          </a>
        </div>

        {/* Upcoming events list */}
        <p className="gsc-section-label" style={{ marginTop: '2rem' }}>
          Upcoming — 2025–26
        </p>
        <div className="gsc-event-list">
          {events.map((e) => (
            <div key={e.title} className="gsc-card" style={{ padding: '1.25rem 1.5rem' }}>
              <div
                style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}
              >
                <div className="gsc-event-row__date">
                  <span className="gsc-event-row__month">{e.month}</span>
                  <span className="gsc-event-row__day">{e.day}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      flexWrap: 'wrap',
                      marginBottom: 4,
                    }}
                  >
                    <strong style={{ fontSize: 16 }}>{e.title}</strong>
                    <span className={`gsc-badge gsc-badge--${e.badgeType}`}>{e.badge}</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--gsc-text-muted)', margin: '0 0 6px' }}>
                    {e.time} · {e.location}
                  </p>
                  <p style={{ fontSize: 14, margin: '0 0 12px', lineHeight: 1.65 }}>
                    {e.description}
                  </p>
                  {e.rsvpUrl && (
                    <Link
                      className="button button--sm button--outline button--primary"
                      to={e.rsvpUrl}
                    >
                      RSVP on AnchorLink
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Google Calendar embed — always shows current semester */}
        <p className="gsc-section-label" style={{ marginTop: '2.5rem' }}>
          Live calendar
        </p>
        <CalendarEmbed />

        {/* Past events */}
        <p className="gsc-section-label" style={{ marginTop: '2.5rem' }}>
          Past events &amp; meeting minutes
        </p>
        <div className="gsc-event-list">
          {pastEvents.map((e) => (
            <div key={e.title + e.date} className="gsc-event-row">
              <div style={{ flex: 1 }}>
                <p className="gsc-event-row__title">{e.title}</p>
                <p className="gsc-event-row__meta">{e.date}</p>
              </div>
              <span className={`gsc-badge gsc-badge--${e.badgeType}`}>{e.badge}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '0.5rem' }}>
          <Link to="/docs/policies/governance-documents">View all GBM minutes →</Link>
        </p>
      </div>
    </Layout>
  );
}
