import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage';
import EditEvent from '@/components/EditEvent';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/events/create',
      component: EditEvent,
    },
  ],
});
