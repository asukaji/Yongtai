import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import profile from './routes/profile';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  ...profile
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
