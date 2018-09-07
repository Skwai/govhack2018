import { ActionContext } from 'vuex';
import StoreState from '@/store/state';
import db from '@/services/firestore';
import Spawn, { ISpawnProperties } from '@/models/Spawn';
import { MutationTypes } from '@/store/types';
import * as geolocation from '@/services/geolocation';

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
