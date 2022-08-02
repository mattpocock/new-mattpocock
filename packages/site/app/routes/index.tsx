import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import dayjs from 'dayjs';
import allContent from '../content.json';

export const loader = async () => {
  return json(
    Object.values(allContent)
      .filter((file) => !file.draft)
      .sort((a, b) => b.rawPublishedAt.localeCompare(a.rawPublishedAt)),
  );
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="max-w-xl py-16 mx-auto">
      <div className="prose prose-lg prose-a:no-underline prose-a:text-blue-600">
        <h1 className="text-center">Hey, I'm Matt!</h1>
        <p>
          I'm a developer advocate, full-stack engineer, and{' '}
          <a href="https://twitter.com/wesbos/status/1385610868805685248">
            the Rodney Mullen of TypeScript
          </a>
          . I'm working on a video course called{' '}
          <a href="https://totaltypescript.com">Total TypeScript</a> as well as
          a series of workshops.
        </p>
        <p>
          As an ex-voice coach, talking to folks about code is my natural
          habitat. You might have seen some of my{' '}
          <a href="https://www.youtube.com/watch?v=lMfGp29Ht8c&list=PLIvujZeVDLMx040-j1W4WFs1BxuTGdI_b">
            2-minute TypeScript videos
          </a>
          , my{' '}
          <a href="https://www.youtube.com/watch?v=hBk4nV7q6-w&t=40s">
            live stream appearances
          </a>
          , or maybe been to a{' '}
          <a href="https://jsconfbp.com/workshops/stately-statecharts/">
            workshop I've given
          </a>
          .
        </p>
        <p>
          If I'm not on <a href="https://twitter.com/mattpocockuk">Twitter</a>,
          I'll be walking around the Oxfordshire countryside, playing board
          games, or hanging out with my cats.
        </p>
      </div>
      <div className="max-w-xl mx-auto mt-24">
        <div className="mb-12 prose prose-lg">
          <h1 className="text-center">Latest Articles</h1>
        </div>
        <div className="space-y-8">
          {data.map((post) => {
            return (
              <Link key={post.slug} to={`/${post.slug}`} className="block">
                <div className="flex items-center space-x-4">
                  <h2 className="text-2xl font-extrabold tracking-tight">
                    {post.title}
                  </h2>
                  {dayjs(post.rawPublishedAt).isAfter(
                    dayjs().subtract(3, 'day'),
                  ) && (
                    <span className="px-2 py-1 text-xs font-semibold text-blue-100 uppercase bg-blue-600 rounded">
                      New
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm tracking-tight text-gray-600">
                  Matt Pocock - Published {post.cleanPublishedAt}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
