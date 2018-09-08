import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Seed from './views/Seed.vue';
import Spawn from './views/Spawn.vue';
import SpawnConfirm from './views/SpawnConfirm.vue';
import Stable from './views/Stable.vue';
import Fight from './views/Fight.vue';

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
      component: Spawn,
      children: [
        {
          path: '',
          name: 'Spawn',
          component: SpawnConfirm
        },
        {
          path: 'stable',
          name: 'Stable',
          component: Stable
        },
        {
          path: 'fight',
          name: 'Fight',
          component: Fight
        }
      ]
    },
    {
      path: '/seed',
      name: 'Seed',
      component: Seed
    }
  ]
});
