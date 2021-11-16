import { BUSINESS, BUSINESS_EVALUATION, BUSINESS_SCHEDULE } from '@/constants';

export default [
  {
    name: BUSINESS,
    path: `/${BUSINESS}`,
    component: () => import('@/views/Business'),
    redirect: { name: BUSINESS_EVALUATION },

    children: [
      {
        name: BUSINESS_EVALUATION,
        path: 'evaluation',
        component: () => import('@/views/Business/Evaluation')
      },
      {
        name: BUSINESS_SCHEDULE,
        path: 'schedule',
        component: () => import('@/views/Business/Schedule')
      }
    ]
  }
];
