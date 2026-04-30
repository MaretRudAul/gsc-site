/**
 * OfficerCard.tsx
 *
 * Reusable officer profile card used in docs/officers/executive-board.md.
 *
 * Props:
 *   name   – Full name, e.g. "AC Lane"
 *   role   – Position title, e.g. "President"
 *   email  – Optional. Vanderbilt email address.
 *   bio    – Optional. 1–2 sentence description. Truncated to 3 lines via CSS.
 *   photo  – Optional. Path to a headshot image, e.g. "/img/officers/ac-lane.jpg"
 *            If omitted, a gold initials avatar is shown automatically.
 *
 * HOW TO ADD A REAL PHOTO:
 *   1. Save the photo as a .jpg or .png file (ideally square, at least 200×200px).
 *   2. Drop the file in  static/img/officers/<firstname-lastname>.jpg
 *   3. In executive-board.md, add  photo="/img/officers/<firstname-lastname>.jpg"
 *      to the relevant <OfficerCard> tag.
 *   4. Commit and push — Vercel will redeploy automatically.
 */

interface OfficerCardProps {
  name: string;
  role: string;
  email?: string;
  bio?: string;
  photo?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function OfficerCard({ name, role, email, bio, photo }: OfficerCardProps) {
  return (
    <div className="gsc-officer-card-v2">
      <div className="gsc-officer-card-v2__avatar-wrap">
        {photo ? (
          <img
            src={photo}
            alt={`${name} headshot`}
            className="gsc-officer-card-v2__avatar"
            loading="lazy"
          />
        ) : (
          <div className="gsc-officer-card-v2__initials" aria-label={name}>
            {getInitials(name)}
          </div>
        )}
      </div>
      <div className="gsc-officer-card-v2__body">
        <span className="gsc-officer-card-v2__role">{role}</span>
        <p className="gsc-officer-card-v2__name">{name}</p>
        {bio && <p className="gsc-officer-card-v2__bio">{bio}</p>}
        {email && (
          <a
            href={`mailto:${email}`}
            className="gsc-officer-card-v2__email"
            aria-label={`Email ${name}`}
          >
            {email}
          </a>
        )}
      </div>
    </div>
  );
}
