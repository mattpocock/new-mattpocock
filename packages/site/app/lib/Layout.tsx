import { Link } from '@remix-run/react';
import React from 'react';
import { ArrowRight } from './Icons';

const links = [
  {
    label: 'GitHub',
    href: '/github',
  },
  {
    label: 'Discord',
    href: '/discord',
  },
  {
    label: 'Twitch',
    href: '/twitch',
  },
  {
    label: 'YouTube',
    href: '/youtube',
  },
  {
    label: 'Twitter',
    href: '/twitter',
  },
  {
    label: 'Total TypeScript',
    href: 'https://totaltypescript.com',
    bold: true,
  },
];

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center px-4 py-3 space-y-2 text-white bg-blue-800 sm:space-y-0 sm:flex-row sm:space-x-4">
        <p>
          <span className="mr-2">👋</span> Looking for Matt's TypeScript course?
        </p>
        <a
          href="https://totaltypescript.com"
          className="flex items-center px-4 py-1 pr-3 text-sm font-bold tracking-tight bg-blue-900 rounded"
        >
          Learn more
          <ArrowRight className="w-4 h-4 ml-1" />
        </a>
      </div>
      <nav className="max-w-4xl px-4 py-4 mx-auto">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0">
          <Link
            className="flex items-center flex-1 space-x-3 text-xl font-semibold tracking-tighter text-gray-800"
            to="/"
          >
            <img src="/favicon.png" className="h-8"></img>
            <span>Matt Pocock</span>
          </Link>
          <div className="flex flex-col space-y-2 text-base tracking-tight text-gray-700 md:space-y-0 md:flex-row md:space-x-8 md:items-center">
            {links.map((link) => {
              const classes = link.bold ? 'font-semibold text-blue-600' : '';
              if (!link.href.startsWith('/')) {
                return (
                  <a key={link.href} href={link.href} className={classes}>
                    {link.label}
                  </a>
                );
              }
              return (
                <Link to={link.href} key={link.href} className={classes}>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
      <main className="max-w-4xl px-4 mx-auto prose-a:no-underline prose-a:text-blue-600">
        {children}
      </main>
    </div>
  );
};
