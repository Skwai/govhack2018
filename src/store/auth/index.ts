import AuthState from '@/store/auth/state';
import { Module } from 'vuex';
import RootState from '@/store/state';
import * as authService from '@/services/auth';

enum Mutations {
  SET_CURRENT_USER = 'SET_CURRENT_USER'
}

const module: Module<AuthState, RootState> = {
  namespaced: true,
  state: new AuthState(),

  actions: {
    authenticate: async ({ commit }) => {
      try {
        // Get a currently authenticated user
        const user = await authService.getCurrentUser();
        if (user) {
          commit(Mutations.SET_CURRENT_USER, user.toJSON());
        }
      } catch (err) {
        // If no current user, sign in anonymously and get that user
        await authService.signInAnonymously();
        const user = await authService.getCurrentUser();
        if (user) {
          commit(Mutations.SET_CURRENT_USER, user.toJSON());
        }
      }
    }
  },

  mutations: {
    [Mutations.SET_CURRENT_USER]: (state, user: object) => {
      state.currentUser = user;
    }
  },

  getters: {
    currentUser: ({ currentUser }) => currentUser
  }
};

export default module;
