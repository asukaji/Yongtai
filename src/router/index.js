import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import About from '@/views/About';
import Control from '@/views/Control';
import Property from '@/views/Property';
import PropertyDetails from '@/views/Property/Details';
import PropertyFrame from '@/views/Property/Frame';
import Login from '@/views/Login';

import tour from './routes/tour';
import video from './routes/video';
import profile from './routes/profile';
import project from './routes/project';
import promote from './routes/promote';
import business from './routes/business';
import economy from './routes/economy';
import industryMap from './routes/industryMap';
import effect from './routes/effect';

import { TOKEN } from '@/constants';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: About
  },
  {
    path: '/control',
    name: 'control',
    component: Control
  },
  {
    path: '/control',
    name: 'control',
    component: Control
  },

  ...tour,
  ...video,
  ...profile,
  ...project,
  ...promote,
  ...business,
  ...economy,
  ...industryMap,
  ...effect,

  {
    path: '/property',
    name: 'property',
    component: Property,
  },

  {
    name: 'PropertyDetails',
    path: '/property/details/:name/:type',
    component: PropertyDetails,
  },

  {
    name: 'PropertyFrame',
    path: '/property/frame',
    component: PropertyFrame,
  },

  {
    name: 'Login',
    path: '/login',
    component: Login,
  },

  {
    path: '*',
    redirect: { name: 'Home' },
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    const token = sessionStorage.getItem(TOKEN);

    token ? next() : next('/login');
  }

  next();
});

export default router;
