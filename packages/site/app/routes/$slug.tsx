import { LinksFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { DataFunctionArgs } from '@remix-run/server-runtime';
import dayjs from 'dayjs';
import fm from 'front-matter';
import * as fs from 'fs';
import * as path from 'path';
import * as remarkShikiTwoslash from 'remark-shiki-twoslash';
import { z } from 'zod';
import ortaStyles from '../orta-site.css';

const markdownToHtml = async (body: string) => {
  const { remark } = await import('remark');

  const markdownAST = remark().parse(body);

  await remarkShikiTwoslash.default({
    theme: 'dark-plus',
  })(markdownAST);

  const { toHast } = await import('mdast-util-to-hast');
  const { toHtml } = await import('hast-util-to-html');

  const hAST = toHast(markdownAST, { allowDangerousHtml: true });
  const html = toHtml(hAST!, { allowDangerousHtml: true });

  return html;
};

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: ortaStyles,
    },
  ];
};

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data.title,
  };
};

export const loader = async ({ params }: DataFunctionArgs) => {
  const contentPath = path.resolve(__dirname, '../../content');
  const fullContentPath = `${contentPath}/${params.slug}.md`;
  if (!fs.existsSync(fullContentPath)) {
    throw new Response('Not found', {
      status: 404,
    });
  }
  const rawFileContent = fs.readFileSync(fullContentPath, 'utf8');

  const { attributes, body } = fm(rawFileContent);

  const PageAttributes = z.object({
    title: z.string(),
    publishedAt: z.string(),
  });

  const parsedAttributes = PageAttributes.parse(attributes);

  return {
    html: await markdownToHtml(body),
    title: parsedAttributes.title,
    published: dayjs(parsedAttributes.publishedAt).format('MMM D YYYY'),
  };
};

export default function Post() {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  return (
    <div className="py-16 pb-24 mx-auto prose">
      <h1 className="mb-0 tracking-tight">{data.title}</h1>
      <p className="mt-3 text-sm tracking-tight text-gray-600">
        Matt Pocock - Published {data.published}
      </p>
      <div
        dangerouslySetInnerHTML={{
          __html: data.html,
        }}
      ></div>
    </div>
  );
}
