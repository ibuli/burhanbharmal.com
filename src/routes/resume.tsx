import { CompanyLink } from '../components/CompanyLink';
import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight, Download, Mail, MapPin } from 'lucide-react';
import { profile, external, seo } from '../lib/site';
export const Route = createFileRoute('/resume')({
  head: () =>
    seo(
      'Resume',
      `Complete career history, education, certifications, and skills of Burhan Bharmal, ${profile.role} at ${profile.company}.`,
      '/resume',
    ),
  component: Resume,
});
const employers = profile.careerHighlights.map((employer) => ({
  ...employer,
  roles: profile.experience.filter((role) => role.company === employer.company),
}));
function Resume() {
  return (
    <article className="wrap professional-resume" aria-labelledby="resume-name">
      <header className="cv-header">
        <div>
          <h1 id="resume-name">{profile.name}</h1>
          <p className="cv-title">{profile.role}</p>
          <p className="cv-summary">
            Building web products since 2017. Experience spans configurable product experiences,
            compensation workflows, and test infrastructure for 13 micro frontends.
          </p>
        </div>
        <div className="cv-actions">
          <button
            className="button primary cv-download"
            type="button"
            disabled
            aria-describedby="resume-download-status"
          >
            <Download size={18} aria-hidden="true" />
            Download resume
          </button>
          <p id="resume-download-status">PDF coming soon.</p>
        </div>
        <ul className="cv-contact" aria-label="Contact details">
          <li>
            <MapPin size={17} aria-hidden="true" />
            <span>{profile.location}</span>
          </li>
          <li>
            <Mail size={17} aria-hidden="true" />
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          <li>
            <a href={profile.linkedin} {...external}>
              LinkedIn
              <ArrowUpRight size={15} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={profile.github} {...external}>
              GitHub
              <ArrowUpRight size={15} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </header>
      <div className="cv-layout">
        <section className="cv-experience" aria-labelledby="cv-experience-heading">
          <h2 id="cv-experience-heading">Experience</h2>
          {employers.map(({ company, period, description, details, roles }) => (
            <section className="cv-employer" key={company} aria-label={`Experience at ${company}`}>
              <header className="cv-employer-heading">
                <h3>
                  <CompanyLink company={company} />
                </h3>
                <p className="cv-date">{period}</p>
              </header>
              <h4 className="cv-position">{roles[0].role}</h4>
              <p className="cv-role-summary">{description}</p>
              <ul className="cv-responsibilities">
                {details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              {roles.length > 1 && (
                <div className="cv-progression">
                  <h4>Role progression</h4>
                  <ol>
                    {[...roles].reverse().map((role) => (
                      <li key={role.start}>
                        <span>{role.role}</span>
                        <span className="cv-date">{role.start}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </section>
          ))}
        </section>
        <aside className="cv-sidebar" aria-label="Contributions, education, and certifications">
          <section className="cv-side-section">
            <h2>Areas of contribution</h2>
            <ul className="cv-contribution-areas">
              {profile.contributionAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </section>
          <section className="cv-side-section">
            <h2>Education</h2>
            {profile.education.map((item) => (
              <article className="cv-qualification" key={item.school}>
                <h3>{item.degree}</h3>
                <p>{item.school}</p>
                <p className="cv-date">{item.date}</p>
              </article>
            ))}
          </section>
          <section className="cv-side-section">
            <h2>Certifications</h2>
            {profile.certifications.map((item) => (
              <article className="cv-qualification" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.issuer}</p>
                <p className="cv-date">{item.date}</p>
                <a className="cv-credential" href={item.credentialUrl} {...external}>
                  View credential
                  <span className="sr-only"> for {item.title} (opens in a new tab)</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </article>
            ))}
          </section>
        </aside>
      </div>
    </article>
  );
}
