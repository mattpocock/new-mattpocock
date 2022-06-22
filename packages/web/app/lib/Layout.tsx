import { Link } from '@remix-run/react';
import React from 'react';

const links = [
  {
    label: 'OSS',
    href: 'https://github.com/mattpocock',
  },
  {
    label: 'Advanced TypeScript',
    href: 'https://advancedtypescript.dev',
  },
];

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="">
      <nav className="max-w-4xl px-8 py-8 mx-auto">
        <div className="flex items-center">
          <Link
            className="flex-1 text-2xl tracking-tighter text-stone-800"
            to="/"
          >
            Matt Pocock
          </Link>
          <div className="space-x-8 text-base tracking-tight text-stone-700">
            {links.map((link) => {
              if (!link.href.startsWith('/')) {
                return (
                  <a key={link.href} href={link.href}>
                    {link.label}
                  </a>
                );
              }
              return (
                <Link to={link.href} key={link.href}>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
      <main className="max-w-4xl px-8 mx-auto prose-a:no-underline prose-a:text-blue-600">
        {children}
      </main>
    </div>
  );
};
