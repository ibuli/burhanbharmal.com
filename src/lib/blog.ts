import metadata from '../generated/posts.json';
import notes from '../generated/notes.json';
export interface Article {
  title: string;
  slug: string;
  date: string;
  description: string;
  topic: string;
  readingMinutes: number;
  cover?: string;
  outline?: { id: string; title: string; level: number }[];
}
export interface Note {
  title: string;
  slug: string;
  description: string;
  topic: string;
  date?: string;
  order: number;
  attribution?: string;
  cover?: string;
}
export const articles: Article[] = metadata;
export const posts: Note[] = notes;
