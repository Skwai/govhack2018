import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Seed from './views/Seed.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/spawn/:spawnId',
      name: 'Spawn',
      component: () => import(/* webpackChunkName: "spawn" */ './views/Spawn.vue'),
      children: [
        {
          path: '',
          name: 'SpawnConfirm',
          component: () => import(/* webpackChunkName: "spawnConfirm" */ './views/SpawnConfirm.vue')
        },
        {
          path: 'stable',
          name: 'Stable',
          component: () => import(/* webpackChunkName: "stable" */ './views/Stable.vue')
        },
        {
          path: 'fight',
          name: 'Fight',
          component: () => import(/* webpackChunkName: "fight" */ './views/Fight.vue')
        }
      ]
    },
    {
      path: '/seed',
      name: 'Seed',
      component: Seed
    },
  ]
});
