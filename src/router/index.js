import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import profile from './routes/profile';
import project from './routes/project';
import tour from './routes/tour';
import promote from './routes/promote';
import video from './routes/video';
import business from './routes/business';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  ...profile,
  ...project,
  ...promote,
  ...tour,
  ...video,
  ...business
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
