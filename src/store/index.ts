import Vuex from 'vuex';
import Vue from 'vue';
import geolocation from '@/store/geolocation';
import game from '@/store/game';
import auth from '@/store/auth';
import RootState from '@/store/state';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: new RootState(),
  modules: {
    geolocation,
    auth,
    game
  }
});
