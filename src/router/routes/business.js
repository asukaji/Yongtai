import {
  BUSINESS,
  BUSINESS_EVALUATION,
  BUSINESS_SCHEDULE,
  BUSINESS_PROJECT,
  BUSINESS_TASK,
  BUSINESS_EVALUATION_PROFILE,
  BUSINESS_EVALUATION_UNIT,
  BUSINESS_EVALUATION_UNIT_TOWN,
  BUSINESS_EVALUATION_UNIT_STREET,
  BUSINESS_SCHEDULE_UNIT,
  BUSINESS_SCHEDULE_TOWN,
  BUSINESS_SCHEDULE_STREET,
  BUSINESS_TASK_UNIT,
  BUSINESS_TASK_TOWN,
  BUSINESS_TASK_STREET
} from '@/constants';

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
        component: () => import('@/views/Business/Evaluation'),
        redirect: { name: BUSINESS_EVALUATION_UNIT },

        children: [
          {
            name: BUSINESS_EVALUATION_PROFILE,
            path: 'profile',
            component: () => import('@/views/Business/EvaluationProfile')
          },
          {
            name: BUSINESS_EVALUATION_UNIT,
            path: 'unit',
            component: () => import('@/views/Business/EvaluationUnit')
          },
          {
            name: BUSINESS_EVALUATION_UNIT_TOWN,
            path: 'town',
            component: () => import('@/views/Business/EvaluationUnit')
          },
          {
            name: BUSINESS_EVALUATION_UNIT_STREET,
            path: 'street',
            component: () => import('@/views/Business/EvaluationUnit')
          }
        ]
      },
      {
        name: BUSINESS_SCHEDULE,
        path: 'schedule',
        component: () => import('@/views/Business/Schedule'),
        redirect: { name: BUSINESS_SCHEDULE_UNIT },

        children: [
          {
            name: BUSINESS_SCHEDULE_UNIT,
            path: 'unit',
            component: () => import('@/views/Business/ScheduleUnit')
          },
          {
            name: BUSINESS_SCHEDULE_TOWN,
            path: 'town',
            component: () => import('@/views/Business/ScheduleUnit')
          },
          {
            name: BUSINESS_SCHEDULE_STREET,
            path: 'street',
            component: () => import('@/views/Business/ScheduleUnit')
          }
        ]
      },
      {
        name: BUSINESS_PROJECT,
        path: 'project',
        component: () => import('@/views/Business/Project')
      },
      {
        name: BUSINESS_TASK,
        path: 'task',
        component: () => import('@/views/Business/Task'),
        redirect: { name: BUSINESS_TASK_UNIT },

        children: [
          {
            name: BUSINESS_TASK_UNIT,
            path: 'unit',
            component: () => import('@/views/Business/TaskUnit')
          },
          {
            name: BUSINESS_TASK_TOWN,
            path: 'town',
            component: () => import('@/views/Business/TaskUnit')
          },
          {
            name: BUSINESS_TASK_STREET,
            path: 'town',
            component: () => import('@/views/Business/TaskUnit')
          }
        ]
      }
    ]
  }
];
