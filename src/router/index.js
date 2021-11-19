import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import Control from '@/views/Control';
import tour from './routes/tour';
import video from './routes/video';
import profile from './routes/profile';
import project from './routes/project';
import promote from './routes/promote';
import business from './routes/business';
import economy from './routes/economy';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
  ...economy
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
