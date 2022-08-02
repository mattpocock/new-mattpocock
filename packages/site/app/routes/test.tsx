import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import * as fs from 'fs/promises';

export const loader = async () => {
  const files = await fs.readdir(process.cwd());

  return json(files);
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
