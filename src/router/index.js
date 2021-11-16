import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import tour from './routes/tour';
import video from './routes/video';
import profile from './routes/profile';
import project from './routes/project';
import promote from './routes/promote';
import business from './routes/business';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  ...tour,
  ...video,
  ...profile,
  ...project,
  ...promote,
  ...business
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
