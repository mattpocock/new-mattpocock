import type {
  HeadersFunction,
  LinksFunction,
  MetaFunction,
} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  ScrollRestoration,
} from '@remix-run/react';
import { Layout } from './lib/Layout';
import styles from './tailwind.css';

export const meta: MetaFunction = () => {
  return {
    title: 'Matt Pocock',
    description:
      'Check out how Matt Pocock can help you level up as a TypeScript engineer.',
    'twitter:site': '@mattpocockuk',
    'twitter:creator': '@mattpocockuk',
    'twitter:card': 'summary_large_image',
    'twitter:title': 'Matt Pocock',
    'twitter:description':
      'Check out how Matt Pocock can help you level up as a TypeScript engineer.',
    'twitter:image': 'https://mattpocock.com/og-image.jpg',
    'og:title': 'Matt Pocock',
    'og:description':
      'Check out how Matt Pocock can help you level up as a TypeScript engineer.',
    'og:image': 'https://mattpocock.com/og-image.jpg',
    'og:url': 'https://mattpocock.com',
    'og:type': 'website',
    'og:site_name': 'Matt Pocock',
  };
};

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
    {
      rel: 'icon',
      href: '/favicon.png',
      type: 'image/png',
    },
  ];
};

export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'max-age=1800',
  };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-sans">
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        {/* <Scripts /> */}
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
