import * as path from 'path';

export const getContentPath = (): string => {
  if (process.env.NODE_ENV === 'development') {
    return path.resolve(__dirname, '../content');
  }

  return path.resolve(__dirname, '../../../content');
};
