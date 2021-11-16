import {
  PROFILE,
  PROFILE_URBAN,
  PROFILE_HOTEL,
  PROFILE_WATER,
  PROFILE_TRAFFIC,
  PROFILE_GEOTHERMAL,
  PROFILE_ECOLOGICAL,
  PROFILE_INDUSTRIAL,
  PROFILE_LIVELIHOOD,
  PROFILE_TRAFFIC_SERVICE,
  PROFILE_TRAFFIC_RAILWAY,
  PROFILE_TRAFFIC_HIGHWAY,
  PROFILE_TRAFFIC_NATIONAL,
  PROFILE_TRAFFIC_PROVINCIAL
} from '@/constants';

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
        name: PROFILE_TRAFFIC,
        path: 'traffic',
        component: () => import('@/views/Profile/Traffic'),

        children: [
          {
            name: PROFILE_TRAFFIC_SERVICE,
            path: 'service',
            component: () => import('@/views/Profile/TrafficService')
          },
          {
            name: PROFILE_TRAFFIC_RAILWAY,
            path: 'railway',
            component: () => import('@/views/Profile/TrafficService')
          },
          {
            name: PROFILE_TRAFFIC_HIGHWAY,
            path: 'highway',
            component: () => import('@/views/Profile/TrafficService')
          },
          {
            name: PROFILE_TRAFFIC_NATIONAL,
            path: 'national',
            component: () => import('@/views/Profile/TrafficService')
          },
          {
            name: PROFILE_TRAFFIC_PROVINCIAL,
            path: 'provincial',
            component: () => import('@/views/Profile/TrafficService')
          }
        ]
      },
      {
        name: PROFILE_GEOTHERMAL,
        path: 'geothermal',
        component: () => import('@/views/Profile/Geothermal')
      },
      {
        name: PROFILE_URBAN,
        path: 'urban',
        component: () => import('@/views/Profile/Urban')
      },
      {
        name: PROFILE_HOTEL,
        path: 'hotel',
        component: () => import('@/views/Profile/Hotel')
      },
      {
        name: PROFILE_WATER,
        path: 'water',
        component: () => import('@/views/Profile/Water')
      },
      {
        name: PROFILE_ECOLOGICAL,
        path: 'ecological',
        component: () => import('@/views/Profile/Ecological')
      },
      {
        name: PROFILE_INDUSTRIAL,
        path: 'industrial',
        component: () => import('@/views/Profile/Water')
      },
      {
        name: PROFILE_LIVELIHOOD,
        path: 'livelihood',
        component: () => import('@/views/Profile/Ecological')
      }
    ]
  }
];
