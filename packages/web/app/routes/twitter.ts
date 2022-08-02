import { redirect } from 'remix';

export const loader = () => {
  return redirect('https://twitter.com/mattpocockuk');
};
