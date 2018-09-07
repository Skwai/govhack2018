import { MutationTree } from 'vuex';
import State, { ILatLng } from './state';
import { MutationTypes } from '@/store/types';
import Spawn from '@/models/Spawn';
import Mob from '@/models/Mob';

const mutations: MutationTree<State> = {
  [MutationTypes.ADD_SPAWN](state, spawn: Spawn) {
    state.spawns.push(spawn);
  },
  [MutationTypes.INSERT_SPAWNS](state, spawns: Spawn[]) {
    state.spawns = spawns;
  },
  [MutationTypes.UPDATE_COORDS](state, coords: ILatLng) {
    state.coords = coords;
  },
  [MutationTypes.UPDATE_SPAWN_COOLDOWN](
    { spawns },
    { spawnId, cooldown }: { spawnId: string; cooldown: firebase.firestore.Timestamp }
  ) {
    const spawn = spawns.find(({ id }) => id === spawnId);
    if (spawn) {
      spawn.cooldown = cooldown;
    }
  },
  [MutationTypes.SET_CURRENT_MOB](state, mob: Mob) {
    state.currentMob = mob;
  }
};

export default mutations;
