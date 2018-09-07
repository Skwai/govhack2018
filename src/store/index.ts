import * as actions from '@/store/actions';
import * as getters from '@/store/getters';
import mutations from '@/store/mutations';
// import { getStoreAccessors } from 'vuex-typescript';
import State from '@/store/state';
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store<State>({
  state: new State(),
  actions,
  getters,
  mutations
});

// const { commit, read, dispatch } = getStoreAccessors<State, State>('');

// // Getters
// export const readExample = read(getters.example);

// // Actions
// export const dispatchGetMobs = dispatch(actions.getMobs);
