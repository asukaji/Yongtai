import { PROJECT } from '@/constants';

export default [
  {
    name: PROJECT,
    path: `/${PROJECT}`,
    component: () => import(
      '@/views/Project'
    )
  }
];
