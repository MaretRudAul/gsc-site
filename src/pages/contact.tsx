import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

type EmailEntry = {
  address: string;
  label: string;
  audience: string;
};

const emails: EmailEntry[] = [
  {address: 'gsc@vanderbilt.edu', label: 'General', audience: 'General questions, feedback, media'},
  {address: 'gsc_academic@vanderbilt.edu', label: 'Academic', audience: 'Travel grants, 3MT, academic events'},
  {address: 'gsc_community@vanderbilt.edu', label: 'Community', audience: 'Community programs, co-sponsorships'},
  {address: 'gsc_social@vanderbilt.edu', label: 'Social', audience: 'Social events and parties'},
];

export default function Contact(): ReactNode {
  return (
    <Layout title="Contact" description="How to reach the Vanderbilt GSC.">
      <div className="container" style={{paddingTop: '2rem', paddingBottom: '3rem', maxWidth: 820}}>
        <h1 style={{marginBottom: '0.25rem'}}>Contact</h1>
        <p style={{color: 'var(--ifm-color-secondary-darkest)'}}>
          We respond to email within a few business days.
        </p>

        <p className="gsc-section-label">Email</p>
        <div className="gsc-contact-grid">
          {emails.map((e) => (
            <div key={e.address} className="gsc-contact-card">
              <p className="gsc-contact-card__heading">{e.label}</p>
              <p>
                <Link href={`mailto:${e.address}`} style={{fontSize: 14, fontWeight: 600, color: 'var(--ifm-color-primary)'}}>
                  {e.address}
                </Link>
              </p>
              <p style={{fontSize: 13, color: 'var(--ifm-color-secondary-darkest)', margin: 0}}>
                {e.audience}
              </p>
            </div>
          ))}
        </div>

        <p className="gsc-section-label">Co-Sponsorship requests</p>
        <div className="gsc-card">
          <p style={{margin: '0 0 0.6rem'}}>
            Registered graduate student organizations can apply for co-sponsorship funding from the GSC.
            Co-sponsorships help fund events and activities that benefit the broader graduate community.
          </p>
          <p style={{margin: '0 0 1rem', fontSize: 14, color: 'var(--ifm-color-secondary-darkest)'}}>
            Allow 2–3 weeks for approval. Contact <Link href="mailto:gsc_community@vanderbilt.edu">gsc_community@vanderbilt.edu</Link> with questions.
          </p>
          <Link
            className="button button--primary button--md"
            to="https://anchorlink.vanderbilt.edu/organization/GSC"
          >
            Apply on AnchorLink →
          </Link>
        </div>

        <p className="gsc-section-label">Social media</p>
        <div className="gsc-contact-grid">
          <div className="gsc-contact-card">
            <p className="gsc-contact-card__heading">Instagram</p>
            <p><Link to="https://www.instagram.com/vu_graduate_student_council/">@vu_graduate_student_council</Link></p>
            <p style={{fontSize: 13, color: 'var(--ifm-color-secondary-darkest)', margin: 0}}>Event announcements and photos</p>
          </div>
          <div className="gsc-contact-card">
            <p className="gsc-contact-card__heading">AnchorLink</p>
            <p><Link to="https://anchorlink.vanderbilt.edu/organization/GSC">Join on AnchorLink</Link></p>
            <p style={{fontSize: 13, color: 'var(--ifm-color-secondary-darkest)', margin: 0}}>RSVP to events, get email updates</p>
          </div>
        </div>

        <p className="gsc-section-label">Stay in the loop</p>
        <div className="gsc-callout">
          <strong>Get GSC emails:</strong> Join the GSC on{' '}
          <Link to="https://anchorlink.vanderbilt.edu/organization/GSC">AnchorLink</Link> and opt in to
          organization emails. Note: unsubscribing from one AnchorLink email can unsubscribe you from all —
          if you stop receiving emails, re-subscribe on AnchorLink.
        </div>
      </div>
    </Layout>
  );
}
