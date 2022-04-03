import { EFFECT, EFFECT_INDEX } from '@/constants';

export default [
  {
    name: EFFECT,
    path: `/${EFFECT}`,
    component: () => import(
      '@/views/Effect'
    ),
    redirect: { name: EFFECT_INDEX },
    
    children: [
      {
        name: EFFECT_INDEX,
        path: 'index',
        component: () => import('@/views/Effect/Effect')
      },
    ]
  }
];
