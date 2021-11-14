import { PROMOTE } from '@/constants';

export default [
  {
    name: PROMOTE,
    path: `/${PROMOTE}`,
    component: () => import(
      '@/views/Promote'
    )
  }
];
