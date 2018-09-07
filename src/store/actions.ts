import { ActionContext } from 'vuex';
import StoreState from '@/store/state';
import db from '@/services/firestore';
import Spawn, { ISpawnProperties } from '@/models/Spawn';
import { MutationTypes } from '@/store/types';
import * as geolocation from '@/services/geolocation';
import { SPAWN_COOLDOWN_DURATION_MINUTES } from '@/config';
import { firestore } from 'firebase';
import Mob from '@/models/Mob';

type Context = ActionContext<StoreState, StoreState>;

export const getSpawns = async ({ commit }: Context) => {
  const docs = await db.collection('spawns').get();
  const spawns: Spawn[] = [];
  docs.forEach((doc) => {
    const { id } = doc;
    const data = doc.data() as ISpawnProperties;
    const mob = new Spawn({ id, ...data });
    spawns.push(mob);
  });
  commit(MutationTypes.INSERT_SPAWNS, spawns);
};

export const getCurrentPosition = async ({ commit }: Context) => {
  const { coords } = await geolocation.getCurrentPosition();
  commit(MutationTypes.UPDATE_COORDS, { lat: coords.latitude, lng: coords.longitude });
};

export const watchPosition = async ({ commit }: Context) => {
  geolocation.watchPosition(({ coords }) => {
    commit(MutationTypes.UPDATE_COORDS, { lat: coords.latitude, lng: coords.longitude });
  });
};

export const updateSpawnCooldown = async ({ commit }: Context, spawnId: string) => {
  const docRef = db.collection('spawns').doc(spawnId);
  await db.runTransaction(async (transaction: firebase.firestore.Transaction) => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + SPAWN_COOLDOWN_DURATION_MINUTES);
    const cooldown = firestore.Timestamp.fromDate(now);
    transaction.update(docRef, {
      cooldown
    });
    commit(MutationTypes.UPDATE_SPAWN_COOLDOWN, cooldown);
  });
};

export const setCurrentMob = async ({ commit }: Context, mob: Mob) => {
  commit(MutationTypes.SET_CURRENT_MOB, mob);
};

export const unsetCurrentMob = async ({ commit }: Context) => {
  commit(MutationTypes.SET_CURRENT_MOB, null);
};
