import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import bodies from '../generated/post-bodies.server.json';
import noteBodies from '../generated/note-bodies.server.json';
const postBodies: Record<string, string> = bodies;
export const getPostBody = createServerFn({ method: 'GET' })
  .validator(z.object({ slug: z.string().regex(/^[a-z0-9]+(?:-+[a-z0-9]+)*$/) }))
  .handler(({ data }) => (Object.hasOwn(postBodies, data.slug) ? postBodies[data.slug] : null));

export const getNoteBody = createServerFn({ method: 'GET' })
  .validator(z.object({ slug: z.string().regex(/^[a-z0-9]+(?:-+[a-z0-9]+)*$/) }))
  .handler(({ data }) =>
    Object.hasOwn(noteBodies, data.slug) ? (noteBodies as Record<string, string>)[data.slug] : null,
  );

import projectBodies from '../generated/project-bodies.server.json';
export const getProjectBody = createServerFn({ method: 'GET' })
  .validator(z.object({ slug: z.string().regex(/^[a-z0-9]+(?:-+[a-z0-9]+)*$/) }))
  .handler(({ data }) =>
    Object.hasOwn(projectBodies, data.slug)
      ? (projectBodies as Record<string, string>)[data.slug]
      : null,
  );
