import { redirect } from 'remix';

export const loader = () => {
  return redirect('https://www.youtube.com/c/mattpocockuk');
};
