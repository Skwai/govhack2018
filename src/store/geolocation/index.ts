import AuthState, { ILatLng } from './state';
import { Module } from 'vuex';
import * as geolocationService from '@/services/geolocation';
import RootState from '@/store/state';
import GeolocationState from './state';

enum Mutations {
  UPDATE_COORDS = 'UPDATE_COORDS'
}

const module: Module<AuthState, RootState> = {
  namespaced: true,
  state: new GeolocationState(),

  actions: {
    getCurrentPosition: async ({ commit }) => {
      const { coords } = await geolocationService.getCurrentPosition();
      commit(Mutations.UPDATE_COORDS, { lat: coords.latitude, lng: coords.longitude });
    },
    watchPosition: async ({ commit }) => {
      geolocationService.watchPosition(({ coords }) => {
        commit(Mutations.UPDATE_COORDS, { lat: coords.latitude, lng: coords.longitude });
      });
    }
  },

  mutations: {
    [Mutations.UPDATE_COORDS]: (state: AuthState, coords: ILatLng) => {
      state.coords = coords;
    }
  },

  getters: {
    coords: ({ coords }: AuthState) => coords
  }
};

export default module;
