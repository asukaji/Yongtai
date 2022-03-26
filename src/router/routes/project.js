import { PROJECT, PROJECT_STREET, PROJECT_PROFILE } from '@/constants';

export default [
  {
    name: PROJECT,
    path: `/${PROJECT}`,
    component: () => import(
      '@/views/Project'
    ),
    redirect: { name: PROJECT_PROFILE },

    children: [

      {
        name: PROJECT_STREET,
        path: 'street/:name',
        component: () => import('@/views/Project/Street')
      },
      {
        name: PROJECT_PROFILE,
        path: 'profile',
        component: () => import('@/views/Project/Profile')
      }
    ]
  },
];
