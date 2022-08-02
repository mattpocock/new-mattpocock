import * as path from 'path';

export const getContentPath = (): string => {
  return path.resolve(process.cwd(), './content');
};
