import { PROFILE, TRAFFIC, GEOTHERMAL } from '@/constants';

export default [
  {
    name: PROFILE,
    path: `/${PROFILE}`,
    component: () => import(
      '@/views/Profile'
    ),
  },
  {
    name: TRAFFIC,
    path: `/${TRAFFIC}`,
    component: () => import(
      '@/views/Profile/Traffic'
    )
  },
  {
    name: GEOTHERMAL,
    path: `/${GEOTHERMAL}`,
    component: () => import(
      '@/views/Profile/Geothermal'
    )
  }
];
