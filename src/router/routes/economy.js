import { ECONOMY, ECONOMY_PROFILE, ECONOMY_DETAIL } from '@/constants';

export default [
  {
    name: ECONOMY,
    path: `/${ECONOMY}`,
    component: () => import('@/views/Economy'),
    redirect: { name: ECONOMY_PROFILE },

    children: [
      {
        name: ECONOMY_PROFILE,
        path: 'profile',
        component: () => import('@/views/Economy/Profile')
      },
      {
        name: ECONOMY_DETAIL,
        path: 'detail',
        component: () => import('@/views/Economy/Profile')
      }
    ]
  }
];
