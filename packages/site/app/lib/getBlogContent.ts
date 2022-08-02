import dayjs from 'dayjs';
import * as path from 'path';
import fm from 'front-matter';
import * as fs from 'fs';
import { z } from 'zod';

const PageAttributes = z.object({
  title: z.string(),
  publishedAt: z.string(),
  draft: z.boolean().optional().default(false),
  excerpt: z.string(),
});

export const getBlogContent = (fullContentPath: string) => {
  const rawFileContent = fs.readFileSync(fullContentPath, 'utf8');
  const slug = path.parse(fullContentPath).name;

  const { attributes, body } = fm(rawFileContent);

  const { title, publishedAt, draft, excerpt } =
    PageAttributes.parse(attributes);

  const cleanPublishedAt = dayjs(publishedAt).format('MMM D YYYY');

  return {
    body,
    excerpt,
    draft,
    slug,
    title,
    rawPublishedAt: publishedAt,
    cleanPublishedAt,
  };
};
