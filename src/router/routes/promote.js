import { PROMOTE, PROMOTE_INDEX, PROMOTE_VILLAGE } from '@/constants';

export default [
  {
    name: PROMOTE,
    path: `/${PROMOTE}`,
    component: () => import(
      '@/views/Promote'
    ),
    redirect: { name: PROMOTE_INDEX },

    children: [
      {
        name: PROMOTE_INDEX,
        path: 'index',
        component: () => import('@/views/Promote/Promote')
      },
      {
        name: PROMOTE_VILLAGE,
        path: 'village',
        component: () => import('@/views/Promote/Village')
      }
    ]
  }
];
