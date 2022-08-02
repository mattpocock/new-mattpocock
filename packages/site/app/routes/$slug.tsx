import type { LinksFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { UseDataFunctionReturn } from '@remix-run/react/dist/components';
import type { DataFunctionArgs } from '@remix-run/server-runtime';
import type { BlogContent } from '~/lib/getBlogContent';
import { ArrowRight } from '~/lib/Icons';
import allContent from '../content.json';
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
  const content: BlogContent | undefined = (allContent as any)[params.slug!];

  if (!content) {
    throw new Response('Not Found', {
      status: 404,
    });
  }
  return {
    html: content.html,
    title: content.title,
    published: content.cleanPublishedAt,
    excerpt: content.excerpt,
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
        <div className="max-w-xl px-8 py-8 mx-auto mt-16 space-y-6 prose-lg text-white bg-gray-800 rounded-lg">
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
