import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

// ─────────────────────────────────────────────────────────────────────────────
// IMAGES
// All pulled from Vanderbilt's own CDN — already publicly hosted, no CORS issues.
// To swap an image just change the URL constant below.
// ─────────────────────────────────────────────────────────────────────────────
const GSC_HERO =
  'https://cdn.vanderbilt.edu/t2-studentorg/studentorg-prd/wp-content/uploads/sites/10/2022/10/Vanderbilt-GSC-3.png';
const GSC_OFFICERS_2425 =
  'https://cdn.vanderbilt.edu/t2-studentorg/studentorg-prd/wp-content/uploads/sites/10/2024/10/GSC-24-25-Officers-e1728484606752-723x1024.jpg';

// ─────────────────────────────────────────────────────────────────────────────
// GOOGLE CALENDAR — live "Next Meeting" fetch
//
// The public Google Calendar JSON feed (v1) requires NO API key.
// It returns up to 25 future events in JSON format.
// We filter for events whose title contains "General Body" or "GBM".
//
// HOW TO UPDATE: The calendar ID is in docusaurus.config.ts as well.
//   If the GSC ever gets a new Google Calendar, update CALENDAR_ID here
//   and in the announcementBar in docusaurus.config.ts.
// ─────────────────────────────────────────────────────────────────────────────
const CALENDAR_ID =
  'ajc2ZGhzczIwZHE4Ymg2aG1jNDVpYmxkaGtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ';

const CALENDAR_ADD_URL = `https://calendar.google.com/calendar/u/0?cid=${CALENDAR_ID}`;

// Fallback shown while fetching or if fetch fails
const FALLBACK_MEETING = {
  title: 'General Body Meeting',
  dateLabel: 'Apr 7, 2026',
  time: '6–7 pm',
  location: 'Alumni Hall 201',
};

interface NextMeeting {
  title: string;
  dateLabel: string;
  time: string;
  location: string;
}

/** Parses a Google Calendar JSON feed entry into our shape, or returns null */
function parseCalEntry(entry: any): NextMeeting | null {
  try {
    const title: string = entry?.title?.$t ?? '';
    if (!/general body|gbm/i.test(title)) return null;
    const when = entry?.['gd$when']?.[0];
    if (!when?.startTime) return null;
    const start = new Date(when.startTime);
    if (isNaN(start.getTime()) || start < new Date()) return null;
    const end = new Date(when.endTime ?? when.startTime);
    const dateLabel = start.toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
    });
    const fmt = (d: Date) =>
      d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const time = `${fmt(start)}–${fmt(end)}`;
    const location =
      (entry?.['gd$where']?.[0]?.valueString ?? '').trim() || 'Alumni Hall 201';
    return { title: title.trim(), dateLabel, time, location };
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// QUICK-ACTION CARDS
//
// HOW TO UPDATE: Edit the quickActions array below.
//   - title: short card heading
//   - desc:  one-sentence description
//   - badge: small chip (deadline, amount, etc.)
//   - cta:   button label
//   - href:  destination URL (internal /docs/... or external)
//   - accent: 'gold' | 'teal' | 'blue' | 'coral'  (controls top border colour)
// ─────────────────────────────────────────────────────────────────────────────
type QuickAction = {
  icon: string;
  title: string;
  desc: string;
  badge: string;
  cta: string;
  href: string;
  accent: 'gold' | 'teal' | 'blue' | 'coral';
};

const quickActions: QuickAction[] = [
  {
    icon: '✈️',
    title: 'Travel Grant',
    desc: 'Monthly lottery funding for conference & professional development travel.',
    badge: 'Apply by month-end',
    cta: 'Apply now',
    href: '/docs/resources/travel-support',
    accent: 'gold',
  },
  {
    icon: '💰',
    title: 'Co-Sponsorship',
    desc: 'Funding for registered grad student orgs hosting community events.',
    badge: '2–3 week turnaround',
    cta: 'Request funds',
    href: '/docs/resources/funding-overview#co-sponsorships',
    accent: 'teal',
  },
  {
    icon: '🎤',
    title: '3-Minute Thesis',
    desc: 'Present your research in 3 minutes to a general audience. Win prizes.',
    badge: 'Spring 2026',
    cta: 'Learn more',
    href: '/docs/about/committees#3-minute-thesis-3mt',
    accent: 'blue',
  },
  {
    icon: '🖨️',
    title: 'Poster Printing',
    desc: 'Free large-format poster printing for graduate student researchers.',
    badge: 'Free',
    cta: 'Request',
    href: '/docs/resources/funding-overview#poster-printing',
    accent: 'coral',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// UPCOMING EVENTS (homepage preview — 3 items max)
//
// HOW TO UPDATE: Edit the upcomingEvents array below each semester.
// Format: month (3-letter all-caps), day (number), title, meta, badge, href.
// badgeType controls the pill colour: 'meeting' | 'social' | 'academic'
// ─────────────────────────────────────────────────────────────────────────────
type UpcomingEvent = {
  month: string;
  day: string;
  title: string;
  meta: string;
  badge: string;
  badgeType: 'meeting' | 'social' | 'academic';
  href: string;
};

const upcomingEvents: UpcomingEvent[] = [
  {
    month: 'APR',
    day: '7',
    title: 'General Body Meeting + Elections',
    meta: '6–7 pm · Alumni Hall 201 · All grad students welcome',
    badge: 'Meeting',
    badgeType: 'meeting',
    href: 'https://anchorlink.vanderbilt.edu/organization/GSC',
  },
  {
    month: 'MAR',
    day: '3',
    title: 'Dinner with Dores',
    meta: '6 pm · Location TBD',
    badge: 'Social',
    badgeType: 'social',
    href: '/events',
  },
  {
    month: 'SPR',
    day: '26',
    title: '3 Minute Thesis Competition',
    meta: "Spring 2026 · Open to all PhD & master's students",
    badge: 'Academic',
    badgeType: 'academic',
    href: '/docs/about/committees#3-minute-thesis-3mt',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: NextMeetingBanner
// Sticky dark bar at the top of the page that auto-fetches the next GBM date
// from the live Google Calendar feed. Falls back to FALLBACK_MEETING on error.
// ─────────────────────────────────────────────────────────────────────────────
function NextMeetingBanner() {
  const [meeting, setMeeting] = useState<NextMeeting>(FALLBACK_MEETING);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Google Calendar v1 JSON feed — public, no API key required
    const feedUrl =
      `https://www.google.com/calendar/feeds/${encodeURIComponent(CALENDAR_ID)}` +
      `/public/full?alt=json&orderby=starttime&sortorder=ascending&futureevents=true&max-results=25`;

    fetch(feedUrl)
      .then((r) => r.json())
      .then((data) => {
        const entries: any[] = data?.feed?.entry ?? [];
        for (const entry of entries) {
          const m = parseCalEntry(entry);
          if (m) {
            setMeeting(m);
            break;
          }
        }
      })
      .catch(() => {
        /* keep fallback silently — network or CORS failure */
      });
  }, []);

  if (dismissed) return null;

  return (
    <div className="gsc-next-meeting" role="banner" aria-label="Next General Body Meeting">
      <span className="gsc-next-meeting__dot" aria-hidden="true" />
      <span className="gsc-next-meeting__label">Next GBM</span>
      <span className="gsc-next-meeting__info">
        <strong>{meeting.dateLabel}</strong>
        &nbsp;·&nbsp;{meeting.time}
        &nbsp;·&nbsp;{meeting.location}
      </span>
      <a
        className="gsc-next-meeting__cta"
        href={CALENDAR_ADD_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        + Add to calendar
      </a>
      <button
        className="gsc-next-meeting__close"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss banner"
      >
        ✕
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: Hero
// Full-bleed background photo with text overlay.
// HOW TO UPDATE: change GSC_HERO constant at the top of this file.
// ─────────────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <div className="gsc-hero">
      <div
        className="gsc-hero__bg"
        style={{ backgroundImage: `url(${GSC_HERO})` }}
        aria-hidden="true"
      />
      <div className="gsc-hero__overlay" aria-hidden="true" />
      <div className="container gsc-hero__content">
        <h1 className="gsc-hero__title">Vanderbilt Graduate Student Council</h1>
        <p className="gsc-hero__subtitle">
          Serving all Ph.D. programs and many research-focused master's programs at
          Vanderbilt University — representing ~2,400 graduate students.
        </p>
        <div className="gsc-hero__actions">
          <Link className="button button--primary button--lg" to="/docs/about/mission-role">
            What we do
          </Link>
          <Link className="button button--outline button--lg" to="/events">
            Upcoming events
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: QuickActions
// The 4 resource cards below the hero.
// HOW TO UPDATE: edit the quickActions array above.
// ─────────────────────────────────────────────────────────────────────────────
function QuickActions() {
  const accentClass: Record<QuickAction['accent'], string> = {
    gold: 'gsc-quick-card--gold',
    teal: 'gsc-quick-card--teal',
    blue: 'gsc-quick-card--blue',
    coral: 'gsc-quick-card--coral',
  };
  return (
    <div className="container gsc-section">
      <p className="gsc-section-label">Funding &amp; programs — quick access</p>
      <div className="gsc-quick-grid">
        {quickActions.map((a) => (
          <Link key={a.title} to={a.href} className={`gsc-quick-card ${accentClass[a.accent]}`}>
            <span className="gsc-quick-card__icon" aria-hidden="true">{a.icon}</span>
            <span className="gsc-quick-card__title-row">
              <span className="gsc-quick-card__title">{a.title}</span>
              <span className="gsc-quick-card__badge">{a.badge}</span>
            </span>
            <span className="gsc-quick-card__desc">{a.desc}</span>
            <span className="gsc-quick-card__cta">{a.cta} &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: EventsAndPhoto
// Left: upcoming events list. Right: officers photo from CDN.
// HOW TO UPDATE events: edit upcomingEvents array above.
// HOW TO UPDATE photo: change GSC_OFFICERS_2425 constant above.
// ─────────────────────────────────────────────────────────────────────────────
function EventsAndPhoto() {
  return (
    <div className="gsc-events-photo-layout">
      <div className="container gsc-events-photo-inner">
        <div className="gsc-events-col">
          <p className="gsc-section-label">Upcoming events · 2025–26</p>
          <div className="gsc-event-list">
            {upcomingEvents.map((e) => (
              <Link key={e.title} to={e.href} style={{ textDecoration: 'none' }}>
                <div className="gsc-event-row">
                  <div className="gsc-event-row__date">
                    <span className="gsc-event-row__month">{e.month}</span>
                    <span className="gsc-event-row__day">{e.day}</span>
                  </div>
                  <div className="gsc-event-row__body">
                    <p className="gsc-event-row__title">{e.title}</p>
                    <p className="gsc-event-row__meta">{e.meta}</p>
                  </div>
                  <span className={`gsc-badge gsc-badge--${e.badgeType}`}>{e.badge}</span>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/events">View all events and calendar &rarr;</Link>
        </div>

        {/* Officers photo — hidden on mobile via CSS */}
        <div className="gsc-events-photo-col">
          <div className="gsc-img-wrap" style={{ height: '100%', minHeight: 280 }}>
            <img
              src={GSC_OFFICERS_2425}
              alt="GSC 2024–25 Executive Board"
              className="gsc-img-wrap__img"
              loading="lazy"
            />
            <span className="gsc-img-wrap__caption">2024–25 Executive Board</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: WhoWeAre
// Stats + description strip.
// HOW TO UPDATE: edit the stats array or paragraph text below.
// ─────────────────────────────────────────────────────────────────────────────
function WhoWeAre() {
  const stats = [
    { num: '~2,400', label: 'Graduate students represented' },
    { num: '59',     label: 'Academic programs' },
    { num: '$73K+',  label: 'Annual student funding' },
    { num: '10',     label: 'Travel grants per year' },
  ];
  return (
    <div className="gsc-strip">
      <div className="container">
        <div className="gsc-who-inner">
          <div className="gsc-who-text">
            <h2 style={{ marginBottom: '0.6rem', fontSize: '1.4rem', textAlign: 'left' }}>
              Who we are
            </h2>
            <p style={{ textAlign: 'left', margin: '0 0 0.75rem' }}>
              The GSC is the representative body for all Graduate School students — every Ph.D.
              program and many research master's programs. We coordinate events, advocate for
              graduate student interests with university administration, and fund student
              organization activities.
            </p>
            <p style={{ textAlign: 'left', margin: '0 0 1.25rem' }}>
              All graduate students are welcome at our meetings, events, and socials.
              Meetings are held the <strong>first Tuesday of each month</strong> at{' '}
              <strong>6 pm in Alumni Hall 201</strong>.
            </p>
            <Link to="/docs/about/mission-role" className="button button--primary button--sm">
              Learn more about our structure &rarr;
            </Link>
          </div>
          <div className="gsc-who-stats">
            {stats.map((s) => (
              <div className="gsc-stat" key={s.label}>
                <span className="gsc-stat__num">{s.num}</span>
                <span className="gsc-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Home"
      description="The Vanderbilt Graduate Student Council represents ~2,400 graduate students across every PhD and research master's program."
    >
      {/* Dynamic sticky banner — auto-fetches next GBM from Google Calendar */}
      <NextMeetingBanner />
      <Hero />
      <main>
        <QuickActions />
        <EventsAndPhoto />
        <WhoWeAre />
      </main>
    </Layout>
  );
}
