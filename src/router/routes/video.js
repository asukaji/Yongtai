import { VIDEO } from '@/constants';

export default [
  {
    name: VIDEO,
    path: `/${VIDEO}`,
    component: () => import(
      '@/views/Video'
    )
  }
];
