import { CompanyLink } from '../components/CompanyLink';
import { createFileRoute, Link } from '@tanstack/react-router';
import { profile, external, seo } from '../lib/site';
import { posts } from '../lib/blog';
import { PostCard } from '../components/Cards';
import { ProjectShowcase } from '../components/ProjectShowcase';
import { StartReading } from '../components/StartReading';
import { services } from '../lib/services';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
export const Route = createFileRoute('/')({
  head: () =>
    seo(
      profile.name,
      'I help founders and product teams build reliable web products. Explore my projects, experience, and writing on software engineering and AI.',
      '/',
    ),
  component: Home,
});
function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: profile.name,
            url: 'https://burhanbharmal.com',
            jobTitle: profile.role,
            sameAs: [profile.github, profile.linkedin],
          }).replace(/</g, '\\u003c'),
        }}
      />
      <section className="cinema-hero wrap">
        <div className="hero-title-row">
          <div className="hero-identity">
            <h1>
              Burhan
              <br />
              <span>Bharmal.</span>
            </h1>
            <p className="hero-role">{profile.role} · Bengaluru, India</p>
          </div>
          <div className="hero-note">
            <p>I help founders and product teams build reliable React products.</p>
            <p>
              Frontend architecture, performance, and component systems. {profile.role} at{' '}
              {profile.company}.
            </p>
            <div className="hero-business-actions">
              <Link className="button primary" to="/work-with-me">
                Discuss a project
              </Link>
              <a className="text-link" href="#projects">
                Explore my work
              </a>
            </div>
          </div>
        </div>
        <Link
          className="hero-stage"
          to="/work/$slug"
          params={{ slug: 'arkive' }}
          aria-label="Explore Arkive, a local-first home for your digital life"
        >
          <div className="hero-stage-word" aria-hidden="true">
            Arkive
          </div>
          <div className="hero-screen">
            <img
              src="/assets/projects/arkive-1.png"
              alt="Arkive’s actual dashboard, bringing RSS feeds, notes, and saved links together"
              width={1784}
              height={1080}
              fetchPriority="high"
            />
          </div>
          <div className="hero-stage-caption">
            <span>Ideas deserve a place to live.</span>
            <span>
              Explore Arkive <ArrowUpRight size={20} aria-hidden="true" />
            </span>
          </div>
        </Link>
        <div className="hero-footnote">
          <span>Independent projects. Real problems. Made for people.</span>
          <nav className="hero-shortcuts" aria-label="Explore this page">
            <a href="#projects">
              Work <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a href="#writing">
              Writing <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a href="#about">
              About <ArrowDown size={16} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </section>
      <section className="home-services section wrap">
        <div>
          <h2>
            A useful partner
            <br />
            for the next build.
          </h2>
          <p>From a new product to a frontend that needs a clearer direction.</p>
          <Link className="text-link" to="/work-with-me">
            Ways we can work together
          </Link>
        </div>
        <ul>
          {services.map((service) => (
            <li key={service.id}>
              <Link className="home-service-link" to="/work-with-me" hash={service.id}>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                </div>
                <ArrowUpRight size={24} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section id="projects" className="section work-section wrap">
        <div className="section-heading">
          <h2>
            Built out
            <br /> of curiosity.
          </h2>
          <p>
            Tools I wanted to use.
            <br />
            Experiments I needed to make.
            <br />A few things that became real.
          </p>
        </div>
        <ProjectShowcase />
        <div className="more-projects">
          {profile.projects.slice(3).map((project) => (
            <Link
              className="small-project"
              to="/work/$slug"
              params={{ slug: project.slug }}
              key={project.slug}
            >
              <img
                src={`/assets/images/${project.icon}`}
                alt=""
                width={56}
                height={56}
                loading="lazy"
              />
              <div>
                <h3>{project.name}</h3>
                <p className="project-category">{project.category}</p>
                <p>{project.description}</p>
              </div>
              <span className="small-project-action">Explore</span>
            </Link>
          ))}
        </div>
        <a className="text-link section-link" href={profile.github} {...external}>
          More experiments on GitHub
        </a>
      </section>
      <section className="experience-preview section wrap">
        <div className="experience-intro">
          <h2>
            A good interface
            <br />
            starts underneath.
          </h2>
          <p>
            I work on the details people see and the systems they don’t. Frontend architecture,
            shared components, and helping teams build better software together.
          </p>
          <ul className="experience-evidence">
            <li>Test framework setup for 13 micro frontends.</li>
            <li>Product theming and shared component systems.</li>
            <li>Navigation across different product experiences.</li>
          </ul>
          <Link className="text-link" to="/resume">
            Explore my experience
          </Link>
        </div>
        <div className="career-summary">
          {[profile.experience[0], profile.experience[4], profile.experience[5]].map((role) => (
            <div key={role.company}>
              <span className="career-date">{role.current ? '2021 - Present' : role.date}</span>
              <h3>
                <CompanyLink company={role.company} />
              </h3>
              <p>{role.role}</p>
              {role.current && (
                <span className="career-note">Frontend Engineer to {profile.role}</span>
              )}
            </div>
          ))}
        </div>
      </section>
      <StartReading />
      <section className="section wrap notes-section">
        <div className="section-heading">
          <h2>
            Still figuring
            <br /> things out.
          </h2>
          <div>
            <p>
              Small thoughts, things I’m reading,
              <br />
              and notes from building in public.
            </p>
            <Link className="text-link" to="/posts">
              Browse the notebook
            </Link>
          </div>
        </div>
        <div className="post-preview">
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
      <section id="about" className="about section wrap">
        <div className="about-person">
          <div className="about-identity">
            <img
              src="/assets/images/avatar.jpg"
              alt="Burhan Bharmal’s illustrated avatar"
              width={112}
              height={119}
              loading="lazy"
            />
            <div>
              <span>Burhan Bharmal</span>
              <p>{profile.role} · Bengaluru</p>
            </div>
          </div>
          <h2>
            Engineer by trade.
            <br />
            Curious by default.
          </h2>
          <p>
            I’m Burhan, a lead engineer based in Bengaluru. At {profile.company}, I lead frontend
            initiatives and mentor engineers. Outside work, I build tools, explore browser AI, and
            write about what I learn.
          </p>
          <div className="about-links">
            <a className="text-link" href={profile.linkedin} {...external}>
              Find me on LinkedIn
            </a>
          </div>
        </div>
        <div className="about-toolkit">
          <h3>The things I reach for.</h3>
          <p className="toolkit-intro">From the first component to the system behind it.</p>
          {Object.entries(profile.skills).map(([name, items]) => (
            <div className="toolkit-group" key={name}>
              <h4>{name}</h4>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
