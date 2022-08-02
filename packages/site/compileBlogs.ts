import * as fs from 'fs/promises';
import * as remarkShikiTwoslash from 'remark-shiki-twoslash';
import { getBlogContent } from './app/lib/getBlogContent';
import { getContentPath } from './app/lib/getContentPath';
import * as path from 'path';

const run = async () => {
  const contentPath = getContentPath();

  const files = await fs.readdir(contentPath);

  const json: Record<
    string,
    ReturnType<typeof getBlogContent> & { html: string }
  > = {};

  for (const file of files) {
    const fullContentPath = `${contentPath}/${file}`;

    const { remark } = await import('remark');

    const blogContent = getBlogContent(fullContentPath);

    const markdownAST = remark().parse(blogContent.body);

    await remarkShikiTwoslash.default({
      theme: 'dark-plus',
    })(markdownAST);

    const { toHast } = await import('mdast-util-to-hast');
    const { toHtml } = await import('hast-util-to-html');

    const hAST = toHast(markdownAST, { allowDangerousHtml: true });
    const html = toHtml(hAST!, { allowDangerousHtml: true });

    json[blogContent.slug] = {
      ...blogContent,
      html,
    };
  }

  await fs.writeFile(
    path.resolve(process.cwd(), 'app', 'content.json'),
    JSON.stringify(json, null, 2),
  );
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
