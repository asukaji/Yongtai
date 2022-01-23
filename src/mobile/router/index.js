import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/mobile/views/Home';
import Login from '@/mobile/views/Login';
import Record from '@/mobile/views/Record';
import Upload from '@/mobile/views/Upload';
import Projects from '@/mobile/views/Projects';
import Appendix from '@/mobile/views/Appendix';
import Individual from '@/mobile/views/Individual';
import Passwords from '@/mobile/views/Passwords';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'projects',
    component: Projects
  },
  {
    path: '/home/:id',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/record/:id',
    name: 'record',
    component: Record
  },
  {
    path: '/upload/:id',
    name: 'upload',
    component: Upload
  },
  {
    path: '/appendix/:id/:index',
    name: 'appendix',
    component: Appendix
  },
  {
    path: '/individual',
    name: 'individual',
    component: Individual
  },
  {
    path: '/passwords',
    name: 'passwords',
    component: Passwords
  },
  {
    path: '*',
    redirect: { name: 'projects' },
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: '/m/',
  routes
});

export default router;
