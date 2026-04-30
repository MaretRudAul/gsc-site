import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// ─────────────────────────────────────────────────────────────────────────────
// ANNOUNCEMENT BAR — "Next GBM" strip at the very top of every page
//
// HOW TO UPDATE each semester:
//   1. Change the `content` string with the new date, time, and location.
//   2. Change the `id` to something new (e.g. 'gbm_sep_2026').
//      This forces the bar to reappear for users who previously dismissed it.
//   3. Commit and push.
//
// NOTE: The dynamic NextMeetingBanner in index.tsx also shows next GBM info,
// but it only appears on the homepage. This announcement bar appears site-wide.
// ─────────────────────────────────────────────────────────────────────────────

const config: Config = {
  title: 'Vanderbilt Graduate Student Council',
  tagline: 'Representing graduate students across every department',
  favicon: 'img/gsc-logo-temp.png',

  future: {
    v4: true,
  },

  // Vercel deployment URL — update if the project is renamed
  url: 'https://gsc-site.vercel.app',
  baseUrl: '/',

  organizationName: 'Adam924',
  projectName: 'gsc-site',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexDocs: true,
        indexPages: true,
        docsRouteBasePath: '/docs',
        searchBarPosition: 'right',
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Adam924/gsc-site/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/gsc-logo-temp.png',

    // ── ANNOUNCEMENT BAR ──────────────────────────────────────────────────
    // Update `content` and `id` each time the next GBM date changes.
    // Changing `id` makes the bar reappear for users who dismissed the old one.
    announcementBar: {
      id: 'gbm_apr7_2026',
      content:
        'Next General Body Meeting: <strong>Apr 7, 2026 · 6–7 pm · Alumni Hall 201</strong> &nbsp;—&nbsp; <a href="https://anchorlink.vanderbilt.edu/organization/GSC" target="_blank">RSVP on AnchorLink</a>',
      backgroundColor: '#1a1a1a',
      textColor: '#CFAE70',
      isCloseable: true,
    },

    colorMode: {
      respectPrefersColorScheme: true,
    },

    navbar: {
      title: 'Vanderbilt GSC',
      logo: {
        alt: 'GSC Logo',
        src: 'img/gsc-logo-temp.png',
        width: 38,
        height: 48,
      },
      hideOnScroll: false,
      items: [
        {to: '/events',                                                    label: 'Events',    position: 'right'},
        {type: 'docSidebar', sidebarId: 'officersSidebar',                label: 'Officers',  position: 'right'},
        {type: 'docSidebar', sidebarId: 'resourcesSidebar',               label: 'Resources', position: 'right'},
        {type: 'docSidebar', sidebarId: 'advocacySidebar',                label: 'Advocacy',  position: 'right'},
        {type: 'docSidebar', sidebarId: 'policiesSidebar',                label: 'Policies',  position: 'right'},
        {type: 'docSidebar', sidebarId: 'aboutSidebar',                   label: 'About',     position: 'right'},
        {to: '/contact',                                                   label: 'Contact',   position: 'right'},
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Quick Links',
          items: [
            {label: 'Travel Grant',    to: '/docs/resources/travel-support'},
            {label: 'Co-Sponsorship',  to: '/docs/resources/funding-overview#co-sponsorships'},
            {label: 'Poster Printing', to: '/docs/resources/funding-overview#poster-printing'},
            {label: 'GBM Minutes',     to: '/docs/policies/governance-documents'},
          ],
        },
        {
          title: 'Officers & Governance',
          items: [
            {label: 'Executive Board', to: '/docs/officers/executive-board'},
            {label: 'Department Reps', to: '/docs/officers/representatives'},
            {label: 'Honor Council',   to: '/docs/policies/honor-council'},
            {label: 'Constitution',    to: '/docs/policies/governance-documents'},
          ],
        },
        {
          title: 'Connect',
          items: [
            {label: 'gsc@vanderbilt.edu', href: 'mailto:gsc@vanderbilt.edu'},
            {label: 'Instagram',          href: 'https://www.instagram.com/vu_graduate_student_council/'},
            {label: 'AnchorLink',         href: 'https://anchorlink.vanderbilt.edu/organization/GSC'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Vanderbilt Graduate Student Council · Built with Docusaurus`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
