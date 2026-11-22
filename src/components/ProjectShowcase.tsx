'use client';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Link } from '@tanstack/react-router';
import { profile } from '../lib/site';
import { Tags } from './Cards';
export function ProjectShowcase() {
  return (
    <div className="showcase-list">
      {profile.projects.slice(0, 3).map((project, index) => (
        <ProjectScene key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
function ProjectScene({
  project,
  index,
}: {
  project: (typeof profile.projects)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [32, 0, -24]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 1.025]);
  const image = project.gallery?.[index === 0 ? 2 : 0] || `/assets/images/${project.image}`;
  return (
    <article className={`project-scene scene-${index}`} ref={ref}>
      <Link
        className="scene-visual"
        to="/work/$slug"
        params={{ slug: project.slug }}
        aria-label={`Explore ${project.name}`}
      >
        <motion.div className="scene-image" style={reduced ? undefined : { y, scale }}>
          <img
            src={image}
            alt={project.alt}
            loading="lazy"
            width={index === 1 ? 771 : 1784}
            height={index === 1 ? 1024 : 1080}
          />
        </motion.div>
        <span className="scene-open">Explore project</span>
      </Link>
      <div className="scene-copy">
        <div>
          <h3>
            <Link to="/work/$slug" params={{ slug: project.slug }}>
              {project.name}
            </Link>
          </h3>
          <p className="project-category">{project.category}</p>
        </div>
        <div>
          <p>{project.description}</p>
          <Tags items={project.stack} />
        </div>
      </div>
    </article>
  );
}
