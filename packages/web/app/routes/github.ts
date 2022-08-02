import { redirect } from 'remix';

export const loader = () => {
  return redirect('https://github.com/mattpocock');
};
