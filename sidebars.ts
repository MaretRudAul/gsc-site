import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  officersSidebar: [
    {
      type: 'category',
      label: 'Officers',
      collapsible: false,
      // "Officers" breadcrumb now links to executive-board
      link: {type: 'doc', id: 'officers/executive-board'},
      items: [
        'officers/representatives',
      ],
    },
  ],

  resourcesSidebar: [
    {
      type: 'category',
      label: 'Funding',
      collapsible: false,
      // "Funding" breadcrumb links to funding-overview
      link: {type: 'doc', id: 'resources/funding-overview'},
      items: [
        'resources/travel-support',
      ],
    },
    {
      type: 'category',
      label: 'Campus Support',
      collapsible: false,
      // "Campus Support" breadcrumb links to student-support
      link: {type: 'doc', id: 'resources/student-support'},
      items: [
        'resources/graduate-student-organizations',
        'resources/graduate-student-spaces',
      ],
    },
  ],

  advocacySidebar: [
    {
      type: 'category',
      label: 'Advocacy',
      collapsible: false,
      // "Advocacy" breadcrumb links to advocacy overview doc
      link: {type: 'doc', id: 'advocacy/advocacy'},
      items: [
        'advocacy/resolutions',
        'advocacy/student-health-insurance',
        'advocacy/graduate-student-survey',
      ],
    },
  ],

  policiesSidebar: [
    {
      type: 'category',
      label: 'Governance',
      collapsible: false,
      // "Governance" breadcrumb links to governance-documents
      link: {type: 'doc', id: 'policies/governance-documents'},
      items: [
        'policies/procedures',
        'policies/honor-council',
      ],
    },
  ],

  aboutSidebar: [
    {
      type: 'category',
      label: 'About GSC',
      collapsible: false,
      // "About GSC" breadcrumb links to mission-role
      link: {type: 'doc', id: 'about/mission-role'},
      items: [
        'about/committees',
        'about/meeting-information',
      ],
    },
  ],
};

export default sidebars;