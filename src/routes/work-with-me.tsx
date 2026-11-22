import { createFileRoute, Link } from '@tanstack/react-router';
import { profile, seo } from '../lib/site';
import { services, workingSteps } from '../lib/services';
import { EnquiryForm } from '../components/EnquiryForm';
export const Route = createFileRoute('/work-with-me')({
  head: () =>
    seo(
      'Work with me',
      'React product development, frontend architecture, and component systems for founders and product teams. Discuss your project with Burhan Bharmal.',
      '/work-with-me',
    ),
  component: WorkWithMe,
});
function WorkWithMe() {
  return (
    <div className="wrap collaborate-page">
      <section className="collaborate-intro">
        <h1>
          Good ideas deserve
          <br />
          <span>a working product.</span>
        </h1>
        <div>
          <p>
            I help founders and product teams build React products, improve existing frontends, and
            create reusable component systems.
          </p>
          <p>
            {profile.role} at {profile.company}, building for the web since 2017. This is where we
            can discuss an independent project or collaboration.
          </p>
          <a className="button primary" href="#enquiry">
            Discuss a project
          </a>
        </div>
      </section>
      <section className="service-section" aria-labelledby="services-heading">
        <h2 id="services-heading">Where I can help.</h2>
        <div className="service-list">
          {services.map((service) => (
            <article className="service-row" id={service.id} key={service.id}>
              <div>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
              </div>
              <div>
                <p>{service.fit}</p>
                <ul>
                  {service.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {service.slug && (
                  <Link className="text-link" to="/work/$slug" params={{ slug: service.slug }}>
                    Explore {service.example}
                  </Link>
                )}
                {service.id === 'systems' && (
                  <Link className="text-link" to="/resume">
                    Explore my component-library experience
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="collaboration-process" aria-labelledby="process-heading">
        <div>
          <h2 id="process-heading">
            A clear way
            <br />
            to work together.
          </h2>
          <p>
            The scope and timing depend on the project. We’ll establish both before committing to
            the work.
          </p>
        </div>
        <ol>
          {workingSteps.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="engagement-proof">
        <h2>
          See the work
          <br />
          behind the offer.
        </h2>
        <div>
          <Link to="/work/$slug" params={{ slug: 'arkive' }}>
            <h3>Arkive</h3>
            <p>A local-first home for bookmarks, notes, and feeds.</p>
            <span>Read the case study</span>
          </Link>
          <Link to="/work/$slug" params={{ slug: 'profile-pilot-for-antigravity' }}>
            <h3>Profile Pilot</h3>
            <p>An account-switching and quota tool for Antigravity.</p>
            <span>Read the case study</span>
          </Link>
          <p className="field-hint">
            Independent products, showing how I approach product and engineering decisions.
          </p>
        </div>
      </section>
      <section className="enquiry-section">
        <EnquiryForm />
      </section>
    </div>
  );
}
