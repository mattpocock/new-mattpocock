import { redirect } from '@remix-run/node';

export const loader = () => {
  return redirect('https://www.youtube.com/c/mattpocockuk');
};
