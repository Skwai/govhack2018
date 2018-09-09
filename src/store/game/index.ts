import { Module } from 'vuex';
import Spawn, { SpawnProperties } from '@/models/Spawn';
import Mob from '@/models/Mob';
import GameState from './state';
import RootState from '@/store/state';
import { SPAWN_COOLDOWN_DURATION_MINUTES } from '@/config';
import { firestore } from 'firebase';
import db from '@/services/firestore';
import { ILatLng } from '@/store/geolocation/state';
import User, { UserProperties } from '@/models/User';
import mobs, { MobTypes } from '@/data/mobs';
import Trashemon from '@/models/Trashemon';

enum Mutations {
  ADD_SPAWN = 'ADD_SPAWN',
  INSERT_SPAWNS = 'INSERT_SPAWNS',
  UPDATE_SPAWN_COOLDOWN = 'UPDATE_SPAWN_COOLDOWN',
  SET_CURRENT_MOB = 'SET_CURRENT_MOB',
  UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER',
  INSERT_USERS = 'INSERT_USERS',
  ADD_TRASHEMON = 'ADD_TRASHEMON',
  SET_CURRENT_TRASHEMON = 'SET_CURRENT_TRASHEMON'
}

const AREA_LAT = 0.001;
const AREA_LONG = 0.001;

const inBetween = (target: ILatLng, loc1: ILatLng, loc2: ILatLng): boolean => {
  return target.lat >= loc1.lat && target.lat <= loc2.lat && target.lng >= loc1.lng && target.lng <= loc2.lng;
};
const module: Module<GameState, RootState> = {
  namespaced: true,
  state: new GameState(),

  actions: {
    getSpawns: async ({ commit }, coords: ILatLng) => {
      const { lat, lng } = coords;
      const loc1 = { lat: lat - AREA_LAT, lng: lng - AREA_LONG };
      const loc2 = { lat: lat + AREA_LAT, lng: lng + AREA_LONG };

      const collection = db.collection('spawns');
      const docs = await collection.get();

      const spawns: Spawn[] = [];

      docs.forEach((doc) => {
        const { id } = doc;
        const data = doc.data() as SpawnProperties;
        if (inBetween(data, loc1, loc2) && data.cooldown.toMillis() < Date.now()) {
          const mob = new Spawn({ id, ...data });
          spawns.push(mob);
        }
      });

      if (spawns.length === 0) {
        const count = Math.floor(1 + Math.random() * 4);
        for (let i = 0; i < count; i++) {
          const newLat = lat + (Math.random() * AREA_LAT * 2 - AREA_LAT);
          const newLng = lng + (Math.random() * AREA_LONG * 2 - AREA_LONG);
          const ref = await collection.add({
            coordinates: new firestore.GeoPoint(newLat, newLng),
            lat: newLat,
            lng: newLng,
            type: MobTypes.WINDOSAUR,
            cooldown: firestore.Timestamp.now()
          });
          const doc = await ref.get();
          const { id } = doc;
          const data = doc.data() as SpawnProperties;
          const mob = new Spawn({ id, ...data });
          spawns.push(mob);
        }
      }

      commit(Mutations.INSERT_SPAWNS, spawns);
    },

    getUsers: async ({ commit, state }) => {
      db.collection('users').onSnapshot((docs) => {
        const users: User[] = [];
        docs.forEach((doc) => {
          const { id } = doc;
          if (!state.currentUser || id !== state.currentUser.id) {
            const data = doc.data() as UserProperties;
            const user = new User({ id, ...data });
            users.push(user);
          }
        });
        commit(Mutations.INSERT_USERS, users);
      });
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
        return transaction;
      });
    },

    setCurrentMob: async ({ commit }, mob: Mob) => {
      commit(Mutations.SET_CURRENT_MOB, mob);
    },

    unsetCurrentMob: async ({ commit }) => {
      commit(Mutations.SET_CURRENT_MOB, null);
    },

    getOrCreateUser: async ({ commit }, { uid, coords }: { uid: string; coords: ILatLng }) => {
      if (!uid) {
        throw TypeError('Missing `uid`');
      }
      if (!coords) {
        throw TypeError('Missing `coords`');
      }
      await db.runTransaction(async (transaction: firestore.Transaction) => {
        const docRef = db.collection('users').doc(uid);
        const doc = await transaction.get(docRef);
        const data = doc.exists ? doc.data() : undefined;

        const user = new User({
          coordinates: new firestore.GeoPoint(coords.lat, coords.lng),
          updated: firestore.Timestamp.fromDate(new Date()),
          username: data && data.username ? data.username : `Trashemon ${new Date().getTime()}`,
          id: uid
        });
        await transaction.set(docRef, { ...user }, { merge: true });
        commit(Mutations.UPDATE_CURRENT_USER, user);
      });
    },

    updateCurrentUserCoordinates: async ({ commit, state: { currentUser } }, coords) => {
      if (!currentUser) {
        throw TypeError('There is no current user');
      }
      if (!coords) {
        throw TypeError('Missing `coords`');
      }
      const { id } = currentUser;
      const data = {
        coordinates: new firestore.GeoPoint(coords.lat, coords.lng),
        updated: firestore.Timestamp.fromDate(new Date())
      };

      const docRef = db.collection('users').doc(id);
      await docRef.update(data);
      const doc = await docRef.get();
      const user = new User({ id: doc.id, ...doc.data() });
      commit(Mutations.UPDATE_CURRENT_USER, user);
    },

    addTrashemonToCurrentUserStable: async ({ commit, state: { currentUser } }, trashemon: Trashemon) => {
      if (!currentUser) {
        throw TypeError('There is no current user');
      }
      if (!trashemon) {
        throw TypeError('Missing `trashemon`');
      }
      const docRef = db
        .collection('users')
        .doc(currentUser.id)
        .collection('trashemon')
        .doc();
      // Clone object to prevent mutation of original
      const clone = { ...trashemon };
      clone.userId = currentUser.id;
      clone.id = docRef.id;
      await docRef.update(clone);
      commit(Mutations.ADD_TRASHEMON, clone);
    },

    getUsersTrashemon: async ({ commit }, { uid }: { uid: string }) => {
      if (!uid) {
        throw TypeError('Missing `uid`');
      }
      const snapshots = await db
        .collection('users')
        .doc(uid)
        .collection('trashemon')
        .get();

      if (!snapshots.empty) {
        snapshots.forEach((doc) => {
          commit(Mutations.ADD_TRASHEMON, doc.data());
        });
        return;
      }

      const docRef = db
        .collection('users')
        .doc(uid)
        .collection('trashemon')
        .doc();
      const trashemon = Trashemon.fromType(mobs.get(MobTypes.TRASHOSAUR)!) as Trashemon;
      trashemon.userId = uid;
      trashemon.id = docRef.id;
      await docRef.set({ ...trashemon });
      commit(Mutations.ADD_TRASHEMON, trashemon);
    },

    setCurrentTrashemon: async ({ commit }, mob: Trashemon) => {
      commit(Mutations.SET_CURRENT_TRASHEMON, mob);
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
    },

    [Mutations.UPDATE_CURRENT_USER](state: GameState, user: User) {
      state.currentUser = user;
    },

    [Mutations.INSERT_USERS](state: GameState, users: User[]) {
      state.users = users;
    },

    [Mutations.ADD_TRASHEMON](state: GameState, trashemon: Trashemon) {
      state.trashemons.push(trashemon);
    },

    [Mutations.SET_CURRENT_TRASHEMON](state: GameState, trashemon: Trashemon) {
      state.currentTrashemon = trashemon;
    }
  },

  getters: {
    spawns: ({ spawns }: GameState) => spawns,
    users: ({ users }: GameState) => users,
    currentMob: ({ currentMob }: GameState) => currentMob,
    currentTrashemon: ({ currentTrashemon }: GameState) => currentTrashemon,
    spawnById: ({ spawns }: GameState) => (spawnId: string) => spawns.find(({ id }) => id === spawnId),
    currentUserTrashemons: ({ trashemons, currentUser }) =>
      trashemons.filter(({ userId }) => currentUser && userId === currentUser.id)
  }
};

export default module;
