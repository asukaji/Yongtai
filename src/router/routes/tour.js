import { TOUR } from '@/constants';

export default [
  {
    name: TOUR,
    path: `/${TOUR}`,
    component: () => import(
      '@/views/Tour'
    )
  }
];
