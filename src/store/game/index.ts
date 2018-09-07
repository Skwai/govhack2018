import { Module } from 'vuex';
import Spawn, { ISpawnProperties } from '@/models/Spawn';
import Mob from '@/models/Mob';
import GameState from './state';
import RootState from '@/store/state';
import { SPAWN_COOLDOWN_DURATION_MINUTES } from '@/config';
import { firestore } from 'firebase';
import db from '@/services/firestore';

enum Mutations {
  ADD_SPAWN = 'ADD_SPAWN',
  INSERT_SPAWNS = 'INSERT_SPAWNS',
  UPDATE_SPAWN_COOLDOWN = 'UPDATE_SPAWN_COOLDOWN',
  SET_CURRENT_MOB = 'SET_CURRENT_MOB'
}

const module: Module<GameState, RootState> = {
  namespaced: true,
  state: new GameState(),

  actions: {
    getSpawns: async ({ commit }) => {
      const docs = await db.collection('spawns').get();
      const spawns: Spawn[] = [];
      docs.forEach((doc) => {
        const { id } = doc;
        const data = doc.data() as ISpawnProperties;
        const mob = new Spawn({ id, ...data });
        spawns.push(mob);
      });
      commit(Mutations.INSERT_SPAWNS, spawns);
    },
    updateSpawnCooldown: async ({ commit }, spawnId: string) => {
      const docRef = db.collection('spawns').doc(spawnId);
      await db.runTransaction(async (transaction: firestore.Transaction) => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + SPAWN_COOLDOWN_DURATION_MINUTES);
        const cooldown = firestore.Timestamp.fromDate(now);
        transaction.update(docRef, {
          cooldown
        });
        commit(Mutations.UPDATE_SPAWN_COOLDOWN, cooldown);
      });
    },
    setCurrentMob: async ({ commit }, mob: Mob) => {
      commit(Mutations.SET_CURRENT_MOB, mob);
    },
    unsetCurrentMob: async ({ commit }) => {
      commit(Mutations.SET_CURRENT_MOB, null);
    }
  },

  mutations: {
    [Mutations.ADD_SPAWN](state: GameState, spawn: Spawn) {
      state.spawns.push(spawn);
    },
    [Mutations.INSERT_SPAWNS](state: GameState, spawns: Spawn[]) {
      state.spawns = spawns;
    },
    [Mutations.UPDATE_SPAWN_COOLDOWN](
      { spawns }: GameState,
      { spawnId, cooldown }: { spawnId: string; cooldown: firebase.firestore.Timestamp }
    ) {
      const spawn = spawns.find(({ id }) => id === spawnId);
      if (spawn) {
        spawn.cooldown = cooldown;
      }
    },
    [Mutations.SET_CURRENT_MOB](state: GameState, mob: Mob) {
      state.currentMob = mob;
    }
  },

  getters: {
    spawns: ({ spawns }: GameState) => spawns,
    currentMob: ({ currentMob }: GameState) => currentMob,
    spawnById: ({ spawns }: GameState) => (spawnId: string) => spawns.find(({ id }) => id === spawnId)
  }
};

export default module;
