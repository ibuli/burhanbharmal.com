import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { profile, seo, external } from '../lib/site';
import { getProjectBody } from '../lib/blog.functions';
import { Tags } from '../components/Cards';
import { ProjectGallery } from '../components/ProjectGallery';
export const Route = createFileRoute('/work/$slug')({
  loader: async ({ params }) => {
    const project = profile.projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    const html = await getProjectBody({ data: { slug: params.slug } });
    if (html === null) throw notFound();
    return { project, html };
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo(
          loaderData.project.name,
          loaderData.project.description,
          `/work/${loaderData.project.slug}`,
        )
      : {},
  component: ProjectPage,
});
function ProjectPage() {
  const { project, html } = Route.useLoaderData();
  const next =
    profile.projects[
      (profile.projects.findIndex((p) => p.slug === project.slug) + 1) % profile.projects.length
    ] || profile.projects[0];
  return (
    <article className="wrap work-page">
      <Link className="text-link" to="/">
        All work
      </Link>
      <header className="work-header">
        <h1>{project.name}</h1>
        <div>
          <p>{project.description}</p>
          <Tags items={project.stack} />
          {project.caseStudy && (
            <a className="text-link" href="#case-story">
              Read the case study
            </a>
          )}
          {project.slug === 'profile-pilot-for-antigravity' && (
            <a
              className="text-link"
              href="https://github.com/ibuli/antigravity-profile-pilot"
              {...external}
            >
              View source on GitHub
            </a>
          )}
        </div>
      </header>
      {project.caseStudy && (
        <dl className="case-context">
          <div>
            <dt>Project</dt>
            <dd>{project.caseStudy.kind}</dd>
          </div>
          <div>
            <dt>My role</dt>
            <dd>{project.caseStudy.role}</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>{project.caseStudy.focus}</dd>
          </div>
        </dl>
      )}
      <ProjectGallery key={project.slug} name={project.name} images={project.gallery} />
      <div className="work-story" id="case-story">
        <h2>Behind the build.</h2>
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <aside className="project-enquiry">
        <h2>Bring a similar challenge.</h2>
        <p>
          If your team is building a product or improving an existing frontend, let’s talk about
          where I can help.
        </p>
        <Link className="button primary" to="/work-with-me">
          Discuss a project
        </Link>
      </aside>
      <Link className="next-project" to="/work/$slug" params={{ slug: next.slug }}>
        <h2>{next.name}</h2>
        <span>Next project</span>
      </Link>
    </article>
  );
}
