import { INDUSTRY_MAP, INDUSTRY_MAP_NATURAL, INDUSTRY_MAP_NATIVE, INDUSTRY_MAP_PROFILE } from '@/constants';

export default [
  {
    name: INDUSTRY_MAP,
    path: `/${INDUSTRY_MAP}/:street?/:village?`,
    component: () => import('@/views/IndustryMap'),
    redirect: { name: INDUSTRY_MAP_PROFILE },

    children: [
      {
        name: INDUSTRY_MAP_PROFILE,
        path: 'profile',
        component: () => import('@/views/IndustryMap/Profile')
      },
      {
        name: INDUSTRY_MAP_NATURAL,
        path: 'natural',
        component: () => import('@/views/IndustryMap/Natural')
      },
      {
        name: INDUSTRY_MAP_NATIVE,
        path: 'native',
        component: () => import('@/views/IndustryMap/Native')
      }
    ]
  }
];
