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
  PROFILE_TRAFFIC_PROVINCIAL,
  PROFILE_WATER_BRANCH,
  PROFILE_WATER_ELECTRIC,
  PROFILE_WATER_MAIN
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
        redirect: { name: PROFILE_TRAFFIC_SERVICE },

        children: [
          {
            name: PROFILE_TRAFFIC_SERVICE,
            path: 'service',
            component: () => import('@/views/Profile/TrafficService')
          },
          {
            name: PROFILE_TRAFFIC_RAILWAY,
            path: 'railway',
            component: () => import('@/views/Profile/TrafficRailway')
          },
          {
            name: PROFILE_TRAFFIC_HIGHWAY,
            path: 'highway',
            component: () => import('@/views/Profile/TrafficHighway')
          },
          {
            name: PROFILE_TRAFFIC_NATIONAL,
            path: 'national',
            component: () => import('@/views/Profile/TrafficNational')
          },
          {
            name: PROFILE_TRAFFIC_PROVINCIAL,
            path: 'provincial',
            component: () => import('@/views/Profile/TrafficProvincial')
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
        component: () => import('@/views/Profile/Water'),
        redirect: { name: PROFILE_WATER_ELECTRIC },

        children: [
          {
            name: PROFILE_WATER_BRANCH,
            path: 'branch',
            component: () => import('@/views/Profile/WaterBranch')
          },
          {
            name: PROFILE_WATER_ELECTRIC,
            path: 'electric',
            component: () => import('@/views/Profile/WaterElectric')
          },
          {
            name: PROFILE_WATER_MAIN,
            path: 'main',
            component: () => import('@/views/Profile/WaterBranch')
          }
        ]
      },
      {
        name: PROFILE_ECOLOGICAL,
        path: 'ecological',
        component: () => import('@/views/Profile/Ecological')
      },
      {
        name: PROFILE_INDUSTRIAL,
        path: 'industrial',
        component: () => import('@/views/Profile/Industrial')
      },
      {
        name: PROFILE_LIVELIHOOD,
        path: 'livelihood',
        component: () => import('@/views/Profile/Livelihood')
      }
    ]
  }
];
