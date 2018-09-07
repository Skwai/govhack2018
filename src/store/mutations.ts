import { MutationTree } from 'vuex';
import State, { ILatLng } from './state';
import { MutationTypes } from '@/store/types';
import Spawn from '@/models/Spawn';

const mutations: MutationTree<State> = {
  [MutationTypes.ADD_SPAWN](state, spawn: Spawn) {
    state.spawns.push(spawn);
  },
  [MutationTypes.INSERT_SPAWNS](state, spawns: Spawn[]) {
    state.spawns = spawns;
  },
  [MutationTypes.UPDATE_COORDS](state, coords: ILatLng) {
    state.coords = coords;
  }
};

export default mutations;
