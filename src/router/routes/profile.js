import { PROFILE, 
  TRAFFIC,
  GEOTHERMAL,
  ECOLOGICAL,
  INDUSTRIAL,
  URBAN,
  LIVELIHOOD,
  HOTEL,
  WATER } from '@/constants';

export default [
  {
    name: PROFILE,
    path: `/${PROFILE}`,
    component: () => import('@/views/Profile/Container'),
    redirect: { name: 'profileIndex' },

    children: [
      {
        name: 'profileIndex',
        path: 'index',
        component: () => import('@/views/Profile')
      },
      {
        name: TRAFFIC,
        path: TRAFFIC,
        component: () => import('@/views/Profile/Traffic')
      },
      {
        name: GEOTHERMAL,
        path: GEOTHERMAL,
        component: () => import('@/views/Profile/Geothermal')
      },
      {
        name: URBAN,
        path: URBAN,
        component: () => import('@/views/Profile/Urban')
      },
      {
        name: HOTEL,
        path: HOTEL,
        component: () => import('@/views/Profile/Hotel')
      },
      {
        name: WATER,
        path: WATER,
        component: () => import('@/views/Profile/Water')
      },
      {
        name: ECOLOGICAL,
        path: ECOLOGICAL,
        component: () => import('@/views/Profile/Ecological')
      }
    ]
  }
];
