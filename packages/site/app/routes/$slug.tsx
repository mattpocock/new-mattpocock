import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { UseDataFunctionReturn } from '@remix-run/react/dist/components';
import type { DataFunctionArgs } from '@remix-run/server-runtime';
import * as fs from 'fs';
import * as path from 'path';
import * as remarkShikiTwoslash from 'remark-shiki-twoslash';
import { getBlogContent } from '~/lib/getBlogContent';
import { ArrowRight } from '~/lib/Icons';
import ortaStyles from '../orta-site.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: ortaStyles,
    },
  ];
};

export const meta = (result: {
  data: UseDataFunctionReturn<typeof loader>;
}) => {
  return {
    title: result.data.title,
    description: result.data.excerpt,
    'og:title': result.data.title,
    'og:description': result.data.excerpt,
    'twitter:description': result.data.excerpt,
    'twitter:title': result.data.title,
  };
};

export const loader = async ({ params }: DataFunctionArgs) => {
  const contentPath = path.resolve(__dirname, '../content');

  const fullContentPath = `${contentPath}/${params.slug}.md`;
  if (!fs.existsSync(fullContentPath)) {
    throw new Response('Not found', {
      status: 404,
    });
  }

  const { remark } = await import('remark');

  const { body, cleanPublishedAt, title, excerpt } =
    getBlogContent(fullContentPath);

  const markdownAST = remark().parse(body);

  await remarkShikiTwoslash.default({
    theme: 'dark-plus',
  })(markdownAST);

  const { toHast } = await import('mdast-util-to-hast');
  const { toHtml } = await import('hast-util-to-html');

  const hAST = toHast(markdownAST, { allowDangerousHtml: true });
  const html = toHtml(hAST!, { allowDangerousHtml: true });

  return {
    html,
    title: title,
    published: cleanPublishedAt,
    excerpt: excerpt,
  };
};

export default function Post() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <div className="py-16 pb-24">
        <div className="mx-auto prose prose-lg prose-code:rounded prose-code:before:hidden prose-code:after:hidden prose-a:no-underline prose-a:text-blue-600">
          <h1 className="mb-0 tracking-tight">{data.title}</h1>
          <p className="mt-4 text-sm tracking-tight text-gray-600">
            Matt Pocock - Published {data.published}
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: data.html,
            }}
          ></div>
        </div>
        <div className="px-8 py-8 mx-auto mt-16 space-y-6 prose-lg text-white bg-gray-800 rounded-lg max-w-prose">
          <h2 className="my-0 text-4xl font-bold tracking-tight">
            Enjoyed this article?
          </h2>
          <p className="text-lg leading-7 text-gray-100">
            Become a{' '}
            <span className="font-bold tracking-tight text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
              TypeScript Wizard
            </span>{' '}
            by signing up to Matt's upcoming video course - Total TypeScript.
          </p>
          <a
            href="https://totaltypescript.com"
            className="inline-flex items-center px-5 py-2 pr-4 text-base font-bold tracking-tight bg-gray-900 rounded"
          >
            Learn more
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </>
  );
}
